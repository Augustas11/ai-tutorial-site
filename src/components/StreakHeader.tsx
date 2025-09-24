'use client'

import { useState, useEffect } from 'react'
import { Flame, Trophy, Star, Zap } from 'lucide-react'

interface StreakData {
  currentStreak: number
  longestStreak: number
  streakBonus: number
  isActive: boolean
}

interface StreakHeaderProps {
  userId?: string
  className?: string
  refreshTrigger?: number
}

export default function StreakHeader({ userId = 'default-user', className = '', refreshTrigger }: StreakHeaderProps) {
  const [streakData, setStreakData] = useState<StreakData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStreakData()
  }, [userId, refreshTrigger])

  const fetchStreakData = async () => {
    try {
      const response = await fetch(`/api/streak?userId=${userId}&type=overall`)
      const result = await response.json()
      
      if (result.success) {
        setStreakData(result.data)
      }
    } catch (err) {
      console.error('Failed to load streak data:', err)
    } finally {
      setLoading(false)
    }
  }

  const getStreakIcon = (streak: number) => {
    if (streak >= 100) return <Trophy className="h-4 w-4 text-yellow-200" />
    if (streak >= 30) return <Star className="h-4 w-4 text-purple-200" />
    if (streak >= 7) return <Flame className="h-4 w-4 text-orange-200" />
    return <Zap className="h-4 w-4 text-blue-200" />
  }

  const getStreakColor = (streak: number) => {
    if (streak >= 100) return 'from-yellow-400 to-yellow-600'
    if (streak >= 30) return 'from-purple-400 to-purple-600'
    if (streak >= 7) return 'from-orange-400 to-orange-600'
    return 'from-blue-400 to-blue-600'
  }

  if (loading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="h-8 w-20 bg-gray-200 rounded-full"></div>
      </div>
    )
  }

  if (!streakData || streakData.currentStreak === 0) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-full border border-gray-200">
          <Zap className="h-4 w-4 text-gray-600" />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-700 leading-none">Start</span>
            <span className="text-xs text-gray-500 leading-none">Streak</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Streak Display */}
      <div className={`flex items-center space-x-2 bg-gradient-to-r ${getStreakColor(streakData.currentStreak)} px-4 py-2 rounded-full text-white shadow-sm`}>
        {getStreakIcon(streakData.currentStreak)}
        <div className="flex flex-col">
          <span className="font-bold text-sm leading-none">
            {streakData.currentStreak} {streakData.currentStreak === 1 ? 'Day' : 'Days'}
          </span>
          <span className="text-xs opacity-80 leading-none">
            Streak
          </span>
        </div>
      </div>

      {/* Streak Bonus Indicator */}
      {streakData.streakBonus > 0 && (
        <div className="flex items-center space-x-1 bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
          <Flame className="h-3 w-3" />
          <span className="text-xs font-medium">
            +{streakData.streakBonus}
          </span>
        </div>
      )}

      {/* Longest Streak (on hover) */}
      <div className="group relative">
        <div className="text-xs text-gray-600 cursor-help font-medium">
          Best: {streakData.longestStreak} {streakData.longestStreak === 1 ? 'day' : 'days'}
        </div>
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
          Longest streak: {streakData.longestStreak} {streakData.longestStreak === 1 ? 'day' : 'days'}
        </div>
      </div>
    </div>
  )
}
