import { NextRequest, NextResponse } from 'next/server'
import { UserStorage } from '@/lib/auth'
import { calculateStreak, getStreakBonusPoints } from '@/lib/streak'

// In-memory storage for development
const userStorage = UserStorage.getInstance()

export async function GET(request: NextRequest) {
  try {
    // Simple admin check (in production, use proper admin authentication)
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.includes('admin')) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      )
    }

    // Get all users from storage
    const allUsers = userStorage.getAllUsers()
    
    // Get streak data for each user
    const usersWithStreak = allUsers.map(user => {
      const activities = userStorage.getUserActivities(user.id)
      const streakData = calculateStreak(activities, 'overall')
      const streakBonus = getStreakBonusPoints(streakData.currentStreak)
      
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        isGuest: user.isGuest,
        language: user.language,
        createdAt: user.createdAt,
        lastActiveAt: user.lastActiveAt,
        streakData: {
          currentStreak: streakData.currentStreak,
          longestStreak: streakData.longestStreak,
          streakBonus: streakBonus,
          isActive: streakData.isActive
        }
      }
    })

    // Sort by streak (highest first)
    usersWithStreak.sort((a, b) => b.streakData.currentStreak - a.streakData.currentStreak)

    return NextResponse.json({
      success: true,
      data: {
        users: usersWithStreak,
        totalUsers: usersWithStreak.length,
        activeUsers: usersWithStreak.filter(u => u.streakData.isActive).length,
        guestUsers: usersWithStreak.filter(u => u.isGuest).length,
        registeredUsers: usersWithStreak.filter(u => !u.isGuest).length
      }
    })

  } catch (error) {
    console.error('Admin users API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users data' },
      { status: 500 }
    )
  }
}
