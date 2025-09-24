import { NextRequest, NextResponse } from 'next/server'
import { calculateStreak, getStreakBonusPoints, getUnlockedMilestones, STREAK_MILESTONES } from '@/lib/streak'
import { SessionManager, UserStorage } from '@/lib/auth'

// In-memory storage for development (replace with database in production)
const sessionManager = SessionManager.getInstance()
const userStorage = UserStorage.getInstance()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId') || 'default-user'
    const sessionId = searchParams.get('sessionId')
    const streakType = searchParams.get('type') as 'learning' | 'chat' | 'overall' || 'overall'

    // Validate session if provided
    if (sessionId) {
      const session = sessionManager.getSession(sessionId)
      if (!session || session.userId !== userId) {
        return NextResponse.json(
          { error: 'Invalid session' },
          { status: 401 }
        )
      }
    }

    // Get user activities
    const activities = userStorage.getUserActivities(userId)
    
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
    const { userId, activityType, pointsEarned = 0, sessionId } = await request.json()
    
    if (!userId || !activityType) {
      return NextResponse.json(
        { error: 'userId and activityType are required' },
        { status: 400 }
      )
    }

    // Validate session if provided
    if (sessionId) {
      const session = sessionManager.getSession(sessionId)
      if (!session || session.userId !== userId) {
        return NextResponse.json(
          { error: 'Invalid session' },
          { status: 401 }
        )
      }
    }

    // Record activity using userStorage
    userStorage.recordActivity(userId, activityType, pointsEarned)
    
    // Get updated activities
    const activities = userStorage.getUserActivities(userId)

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
