import { NextRequest, NextResponse } from 'next/server'
import { calculateStreak, getStreakBonusPoints, getUnlockedMilestones, STREAK_MILESTONES } from '@/lib/streak'

// Mock user data - in production, this would come from your database
const mockUserActivities = new Map<string, Date[]>()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId') || 'default-user'
    const streakType = searchParams.get('type') as 'learning' | 'chat' | 'overall' || 'overall'

    // Get user activities (in production, fetch from database)
    const activities = mockUserActivities.get(userId) || []
    
    // Calculate streak data
    const streakData = calculateStreak(activities, streakType)
    
    // Get unlocked milestones
    const unlockedMilestones = getUnlockedMilestones(streakData.currentStreak)
    
    // Calculate streak bonus
    const streakBonus = getStreakBonusPoints(streakData.currentStreak)
    
    return NextResponse.json({
      success: true,
      data: {
        ...streakData,
        unlockedMilestones,
        streakBonus,
        allMilestones: STREAK_MILESTONES
      }
    })

  } catch (error) {
    console.error('Streak API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch streak data' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, activityType, pointsEarned = 0 } = await request.json()
    
    if (!userId || !activityType) {
      return NextResponse.json(
        { error: 'userId and activityType are required' },
        { status: 400 }
      )
    }

    // Record activity
    const today = new Date()
    const activities = mockUserActivities.get(userId) || []
    
    // Add today's activity if not already recorded
    const todayStr = today.toDateString()
    const hasTodayActivity = activities.some(date => date.toDateString() === todayStr)
    
    if (!hasTodayActivity) {
      activities.push(today)
      mockUserActivities.set(userId, activities)
    }

    // Calculate new streak data
    const streakData = calculateStreak(activities)
    const streakBonus = getStreakBonusPoints(streakData.currentStreak)
    
    // Check for milestone unlocks
    const unlockedMilestones = getUnlockedMilestones(streakData.currentStreak)
    const newMilestones = unlockedMilestones.filter(m => m.isUnlocked)
    
    // Calculate total points earned
    const totalPointsEarned = pointsEarned + streakBonus

    return NextResponse.json({
      success: true,
      data: {
        streakData,
        pointsEarned: totalPointsEarned,
        streakBonus,
        newMilestones,
        message: streakData.currentStreak > 0 
          ? `Great! You're on a ${streakData.currentStreak}-day streak! 🔥`
          : 'Start your streak today!'
      }
    })

  } catch (error) {
    console.error('Streak recording error:', error)
    return NextResponse.json(
      { error: 'Failed to record activity' },
      { status: 500 }
    )
  }
}
