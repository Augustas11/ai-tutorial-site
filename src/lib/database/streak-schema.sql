-- Streak System Database Schema
-- This file contains the SQL schema for implementing the streak system

-- Users table extension (if not already exists)
-- Add streak-related columns to existing users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS current_streak INT DEFAULT 0;
ALTER TABLE users ADD COLUMN IF NOT EXISTS longest_streak INT DEFAULT 0;
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_activity_date TIMESTAMP DEFAULT NULL;
ALTER TABLE users ADD COLUMN IF NOT EXISTS streak_type VARCHAR(20) DEFAULT 'overall';
ALTER TABLE users ADD COLUMN IF NOT EXISTS total_points INT DEFAULT 0;

-- User activities table for tracking daily activities
CREATE TABLE IF NOT EXISTS user_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  activity_type VARCHAR(50) NOT NULL, -- 'login', 'tutorial', 'chat', 'subscription'
  activity_date DATE NOT NULL DEFAULT CURRENT_DATE,
  points_earned INT DEFAULT 0,
  streak_bonus INT DEFAULT 0,
  metadata JSONB DEFAULT '{}', -- Additional activity data
  created_at TIMESTAMP DEFAULT NOW(),
  
  -- Ensure one activity per type per day per user
  UNIQUE(user_id, activity_type, activity_date)
);

-- User streak milestones for tracking achievements
CREATE TABLE IF NOT EXISTS user_streak_milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  milestone_days INT NOT NULL,
  milestone_title VARCHAR(100) NOT NULL,
  unlocked_at TIMESTAMP DEFAULT NOW(),
  points_rewarded INT DEFAULT 0,
  
  -- Ensure one milestone per user per day count
  UNIQUE(user_id, milestone_days)
);

-- Streak recovery table for grace periods
CREATE TABLE IF NOT EXISTS streak_recoveries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  recovery_date DATE NOT NULL,
  original_streak_length INT NOT NULL,
  recovered_at TIMESTAMP DEFAULT NOW(),
  used BOOLEAN DEFAULT FALSE
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_activities_user_date ON user_activities(user_id, activity_date DESC);
CREATE INDEX IF NOT EXISTS idx_user_activities_type ON user_activities(activity_type);
CREATE INDEX IF NOT EXISTS idx_user_streak_milestones_user ON user_streak_milestones(user_id);
CREATE INDEX IF NOT EXISTS idx_streak_recoveries_user ON streak_recoveries(user_id);

-- Function to update user streak when activity is recorded
CREATE OR REPLACE FUNCTION update_user_streak()
RETURNS TRIGGER AS $$
DECLARE
  user_streak INT;
  user_longest_streak INT;
  activity_count INT;
BEGIN
  -- Get current streak for the user
  SELECT 
    COALESCE(MAX(CASE 
      WHEN activity_date = CURRENT_DATE THEN 
        (SELECT COUNT(DISTINCT activity_date) 
         FROM user_activities ua2 
         WHERE ua2.user_id = NEW.user_id 
         AND ua2.activity_date >= CURRENT_DATE - INTERVAL '30 days'
         AND ua2.activity_date <= CURRENT_DATE
         AND NOT EXISTS (
           SELECT 1 FROM user_activities ua3 
           WHERE ua3.user_id = NEW.user_id 
           AND ua3.activity_date = ua2.activity_date + INTERVAL '1 day'
           AND ua2.activity_date < CURRENT_DATE
         ))
      ELSE 0
    END), 0),
    COALESCE(MAX(longest_streak), 0)
  INTO user_streak, user_longest_streak
  FROM users 
  WHERE id = NEW.user_id;

  -- Calculate longest streak
  WITH streak_calculation AS (
    SELECT 
      activity_date,
      ROW_NUMBER() OVER (ORDER BY activity_date) - 
      ROW_NUMBER() OVER (PARTITION BY DATE_TRUNC('day', activity_date - (ROW_NUMBER() OVER (ORDER BY activity_date) || ' days')::INTERVAL) ORDER BY activity_date) as streak_group
    FROM user_activities 
    WHERE user_id = NEW.user_id
    ORDER BY activity_date
  )
  SELECT COALESCE(MAX(streak_length), user_longest_streak)
  INTO user_longest_streak
  FROM (
    SELECT COUNT(*) as streak_length
    FROM streak_calculation
    GROUP BY streak_group
  ) streaks;

  -- Update user streak information
  UPDATE users 
  SET 
    current_streak = user_streak,
    longest_streak = GREATEST(longest_streak, user_longest_streak),
    last_activity_date = CURRENT_TIMESTAMP
  WHERE id = NEW.user_id;

  -- Check for milestone unlocks
  INSERT INTO user_streak_milestones (user_id, milestone_days, milestone_title, points_rewarded)
  SELECT 
    NEW.user_id,
    milestone.days,
    milestone.title,
    milestone.pointsReward
  FROM (VALUES 
    (3, 'Getting Started', 10),
    (7, 'Week Warrior', 25),
    (14, 'Two Week Champion', 50),
    (30, 'Monthly Master', 100),
    (100, 'Century Streak', 500)
  ) AS milestone(days, title, pointsReward)
  WHERE milestone.days = user_streak
  AND NOT EXISTS (
    SELECT 1 FROM user_streak_milestones 
    WHERE user_id = NEW.user_id AND milestone_days = milestone.days
  );

  -- Add milestone points to user total
  UPDATE users 
  SET total_points = total_points + (
    SELECT COALESCE(SUM(points_rewarded), 0)
    FROM user_streak_milestones 
    WHERE user_id = NEW.user_id 
    AND unlocked_at >= CURRENT_DATE
  )
  WHERE id = NEW.user_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update streak when activity is recorded
CREATE TRIGGER trigger_update_user_streak
  AFTER INSERT ON user_activities
  FOR EACH ROW
  EXECUTE FUNCTION update_user_streak();

-- Function to get user streak data
CREATE OR REPLACE FUNCTION get_user_streak(user_uuid UUID)
RETURNS TABLE (
  current_streak INT,
  longest_streak INT,
  last_activity_date TIMESTAMP,
  streak_type VARCHAR,
  total_points INT,
  next_milestone INT,
  days_to_next_milestone INT
) AS $$
DECLARE
  user_data RECORD;
  next_milestone_days INT;
BEGIN
  -- Get user data
  SELECT 
    current_streak,
    longest_streak,
    last_activity_date,
    streak_type,
    total_points
  INTO user_data
  FROM users 
  WHERE id = user_uuid;

  -- Find next milestone
  SELECT COALESCE(
    (SELECT days FROM (VALUES (3), (7), (14), (30), (100)) AS milestones(days)
     WHERE days > user_data.current_streak
     ORDER BY days
     LIMIT 1),
    100
  ) INTO next_milestone_days;

  RETURN QUERY SELECT 
    user_data.current_streak,
    user_data.longest_streak,
    user_data.last_activity_date,
    user_data.streak_type,
    user_data.total_points,
    next_milestone_days,
    GREATEST(0, next_milestone_days - user_data.current_streak);
END;
$$ LANGUAGE plpgsql;
