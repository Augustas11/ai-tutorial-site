// Streak system utilities and types

export interface StreakData {
  currentStreak: number
  longestStreak: number
  lastActivityDate: string | null
  streakType: 'learning' | 'chat' | 'overall'
  isActive: boolean
  nextMilestone: number
  daysToNextMilestone: number
}

export interface StreakActivity {
  id: string
  userId: string
  activityType: 'login' | 'tutorial' | 'chat' | 'subscription'
  pointsEarned: number
  streakBonus: number
  createdAt: Date
}

export interface StreakMilestone {
  days: number
  title: string
  description: string
  badgeIcon: string
  pointsReward: number
  isUnlocked: boolean
}

// Streak milestones configuration
export const STREAK_MILESTONES: StreakMilestone[] = [
  {
    days: 3,
    title: 'Getting Started',
    description: '3-day streak achieved!',
    badgeIcon: '🔥',
    pointsReward: 10,
    isUnlocked: false
  },
  {
    days: 7,
    title: 'Week Warrior',
    description: '7-day streak! You\'re on fire!',
    badgeIcon: '🔥🔥',
    pointsReward: 25,
    isUnlocked: false
  },
  {
    days: 14,
    title: 'Two Week Champion',
    description: '14 days of dedication!',
    badgeIcon: '🔥🔥🔥',
    pointsReward: 50,
    isUnlocked: false
  },
  {
    days: 30,
    title: 'Monthly Master',
    description: '30 days! You\'re unstoppable!',
    badgeIcon: '👑',
    pointsReward: 100,
    isUnlocked: false
  },
  {
    days: 100,
    title: 'Century Streak',
    description: '100 days! Legendary status!',
    badgeIcon: '🏆',
    pointsReward: 500,
    isUnlocked: false
  }
]

// Calculate streak based on activity dates
export function calculateStreak(activityDates: Date[], streakType: 'learning' | 'chat' | 'overall' = 'overall'): StreakData {
  if (activityDates.length === 0) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      lastActivityDate: null,
      streakType,
      isActive: false,
      nextMilestone: 3,
      daysToNextMilestone: 3
    }
  }

  // Sort dates in descending order
  const sortedDates = activityDates.sort((a, b) => b.getTime() - a.getTime())
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  let currentStreak = 0
  let longestStreak = 0
  let tempStreak = 0

  // Calculate current streak
  for (let i = 0; i < sortedDates.length; i++) {
    const activityDate = new Date(sortedDates[i])
    const daysDiff = Math.floor((today.getTime() - activityDate.getTime()) / (1000 * 60 * 60 * 24))

    if (i === 0) {
      // Check if the most recent activity was today or yesterday
      if (daysDiff <= 1) {
        currentStreak = 1
        tempStreak = 1
      } else {
        currentStreak = 0
        tempStreak = 0
      }
    } else {
      const prevActivityDate = new Date(sortedDates[i - 1])
      const daysBetween = Math.floor((prevActivityDate.getTime() - activityDate.getTime()) / (1000 * 60 * 60 * 24))

      if (daysBetween === 1) {
        tempStreak++
        if (i === 0 || daysDiff <= 1) {
          currentStreak = tempStreak
        }
      } else if (daysBetween === 0) {
        // Same day activity, don't increment
        continue
      } else {
        // Gap in streak
        longestStreak = Math.max(longestStreak, tempStreak)
        tempStreak = 1
        if (i === 0 || daysDiff <= 1) {
          currentStreak = 1
        }
      }
    }
  }

  longestStreak = Math.max(longestStreak, tempStreak, currentStreak)

  // Find next milestone
  const nextMilestone = STREAK_MILESTONES.find(milestone => milestone.days > currentStreak) || STREAK_MILESTONES[STREAK_MILESTONES.length - 1]
  const daysToNextMilestone = Math.max(0, nextMilestone.days - currentStreak)

  return {
    currentStreak,
    longestStreak,
    lastActivityDate: sortedDates[0]?.toISOString() || null,
    streakType,
    isActive: currentStreak > 0,
    nextMilestone: nextMilestone.days,
    daysToNextMilestone
  }
}

// Check if user should get streak bonus
export function shouldGetStreakBonus(currentStreak: number): boolean {
  return currentStreak >= 7
}

// Get streak bonus points
export function getStreakBonusPoints(currentStreak: number): number {
  if (currentStreak < 7) return 0
  
  // Bonus increases with streak length
  if (currentStreak >= 100) return 50
  if (currentStreak >= 30) return 30
  if (currentStreak >= 14) return 20
  if (currentStreak >= 7) return 10
  
  return 0
}

// Get unlocked milestones
export function getUnlockedMilestones(currentStreak: number): StreakMilestone[] {
  return STREAK_MILESTONES.map(milestone => ({
    ...milestone,
    isUnlocked: currentStreak >= milestone.days
  }))
}

// Format streak display
export function formatStreakDisplay(streak: number): string {
  if (streak === 0) return 'No streak'
  if (streak === 1) return '1 day'
  return `${streak} days`
}

// Get streak status message
export function getStreakStatusMessage(streak: StreakData): string {
  if (!streak.isActive) {
    return 'Start your learning streak today!'
  }
  
  if (streak.currentStreak === 1) {
    return 'Great start! Keep it going! 🔥'
  }
  
  if (streak.currentStreak >= 7) {
    return `Amazing! ${streak.currentStreak} days strong! 🔥🔥`
  }
  
  return `Keep it up! ${streak.currentStreak} days in a row! 🔥`
}
