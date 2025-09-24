'use client'

import { useState, useEffect } from 'react'
import { Flame, Trophy, Star, Target, Zap } from 'lucide-react'
import { useStreakNotifications } from './StreakNotification'
import { useAuth } from '@/contexts/AuthContext'
import SignInModal from './SignInModal'

interface StreakData {
  currentStreak: number
  longestStreak: number
  lastActivityDate: string | null
  streakType: 'learning' | 'chat' | 'overall'
  isActive: boolean
  nextMilestone: number
  daysToNextMilestone: number
  unlockedMilestones: Array<{
    days: number
    title: string
    description: string
    badgeIcon: string
    pointsReward: number
    isUnlocked: boolean
  }>
  streakBonus: number
}

interface StreakWidgetProps {
  userId?: string
  streakType?: 'learning' | 'chat' | 'overall'
  showMilestones?: boolean
  compact?: boolean
  lang?: string
}

export default function StreakWidget({ 
  userId = 'default-user', 
  streakType = 'overall',
  showMilestones = true,
  compact = false,
  lang = 'en'
}: StreakWidgetProps) {
  const { user, session } = useAuth()
  const [streakData, setStreakData] = useState<StreakData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showSignInModal, setShowSignInModal] = useState(false)
  const { addNotification } = useStreakNotifications()
  const isVietnamese = lang === 'vn'

  // Use authenticated user ID or fallback to provided userId
  const currentUserId = user?.id || userId

  useEffect(() => {
    fetchStreakData()
  }, [currentUserId, streakType, user?.id])

  const fetchStreakData = async () => {
    if (!currentUserId) {
      console.log('StreakWidget: No currentUserId, skipping fetch')
      setLoading(false)
      return
    }
    
    try {
      setLoading(true)
      console.log('StreakWidget: Fetching streak data', { currentUserId, user: user?.id, session: session?.sessionId })
      
      const params = new URLSearchParams({
        userId: currentUserId,
        type: streakType
      })
      
      if (session?.sessionId) {
        params.append('sessionId', session.sessionId)
      }
      
      const response = await fetch(`/api/streak?${params}`)
      const result = await response.json()
      
      console.log('StreakWidget: Streak data response', result)
      
      if (result.success) {
        setStreakData(result.data)
      } else {
        setError(result.error || 'Failed to load streak data')
      }
    } catch (err) {
      setError('Failed to load streak data')
    } finally {
      setLoading(false)
    }
  }

  const recordActivity = async (activityType: string, pointsEarned: number = 0) => {
    if (!currentUserId) {
      setShowSignInModal(true)
      return
    }
    
    try {
      const response = await fetch('/api/streak', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: currentUserId,
          activityType,
          pointsEarned,
          sessionId: session?.sessionId
        }),
      })
      
      const result = await response.json()
      
      if (result.success) {
        setStreakData(result.data.streakData)
        
        // Show milestone notifications
        if (result.data.newMilestones?.length > 0) {
          result.data.newMilestones.forEach((milestone: any) => {
            addNotification(milestone)
          })
        }
        
        return result.data
      } else {
        throw new Error(result.error)
      }
    } catch (err) {
      console.error('Failed to record activity:', err)
      throw err
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
        <div className="h-8 bg-gray-200 rounded w-1/2"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600 text-sm">{error}</p>
      </div>
    )
  }

  if (!streakData) {
    // Show sign-in prompt for non-logged users
    if (!user || user.isGuest) {
      const content = {
        en: {
          title: 'Sign in to track streaks',
          subtitle: 'Create an account to start tracking your learning streaks and earn points!',
          signIn: 'Sign In',
          guest: 'Continue as Guest'
        },
        vn: {
          title: 'Đăng nhập để theo dõi chuỗi',
          subtitle: 'Tạo tài khoản để bắt đầu theo dõi chuỗi học tập và kiếm điểm!',
          signIn: 'Đăng nhập',
          guest: 'Tiếp tục với tài khách'
        }
      }
      
      const t = content[isVietnamese ? 'vn' : 'en']
      
      return (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Flame className="h-8 w-8 text-primary-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{t.title}</h3>
          <p className="text-gray-600 text-sm mb-6">{t.subtitle}</p>
          
          <div className="space-y-3">
            <button
              onClick={() => setShowSignInModal(true)}
              className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors"
            >
              {t.signIn}
            </button>
          </div>
          
          <SignInModal
            isOpen={showSignInModal}
            onClose={() => setShowSignInModal(false)}
            lang={lang}
            title={t.title}
            subtitle={t.subtitle}
          />
        </div>
      )
    }
    
    return null
  }

  const getStreakIcon = (streak: number) => {
    if (streak >= 100) return <Trophy className="h-6 w-6 text-yellow-500" />
    if (streak >= 30) return <Star className="h-6 w-6 text-purple-500" />
    if (streak >= 7) return <Flame className="h-6 w-6 text-orange-500" />
    return <Zap className="h-6 w-6 text-blue-500" />
  }

  const getStreakColor = (streak: number) => {
    if (streak >= 100) return 'from-yellow-400 to-yellow-600'
    if (streak >= 30) return 'from-purple-400 to-purple-600'
    if (streak >= 7) return 'from-orange-400 to-orange-600'
    return 'from-blue-400 to-blue-600'
  }

  if (compact) {
    return (
      <div className="flex items-center space-x-2 bg-gradient-to-r from-orange-100 to-red-100 px-3 py-2 rounded-full">
        {getStreakIcon(streakData.currentStreak)}
        <span className="font-bold text-orange-800">
          {streakData.currentStreak}
        </span>
        <span className="text-orange-700 text-sm">
          {streakData.currentStreak === 1 ? 'day' : 'days'}
        </span>
        {streakData.streakBonus > 0 && (
          <span className="text-xs bg-orange-200 text-orange-800 px-2 py-1 rounded-full">
            +{streakData.streakBonus} bonus
          </span>
        )}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
          <Flame className="h-5 w-5 text-orange-500" />
          <span>Learning Streak</span>
        </h3>
        {streakData.streakBonus > 0 && (
          <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
            +{streakData.streakBonus} bonus points
          </div>
        )}
      </div>

      {/* Streak Display */}
      <div className="text-center mb-6">
        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r ${getStreakColor(streakData.currentStreak)} text-white mb-3`}>
          {getStreakIcon(streakData.currentStreak)}
        </div>
        <div className="text-3xl font-bold text-gray-800 mb-1">
          {streakData.currentStreak}
        </div>
        <div className="text-gray-600 mb-2">
          {streakData.currentStreak === 1 ? 'day streak' : 'days streak'}
        </div>
        <div className="text-sm text-gray-500">
          Best: {streakData.longestStreak} days
        </div>
      </div>

      {/* Progress to Next Milestone */}
      {streakData.daysToNextMilestone > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Next milestone</span>
            <span>{streakData.daysToNextMilestone} days to go</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${Math.min(100, ((streakData.nextMilestone - streakData.daysToNextMilestone) / streakData.nextMilestone) * 100)}%` 
              }}
            ></div>
          </div>
        </div>
      )}

      {/* Milestones */}
      {showMilestones && (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-800 mb-3">Milestones</h4>
          <div className="grid grid-cols-2 gap-2">
            {streakData.unlockedMilestones.map((milestone, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border-2 transition-all ${
                  milestone.isUnlocked
                    ? 'border-green-200 bg-green-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-lg">
                    {milestone.isUnlocked ? milestone.badgeIcon : '🔒'}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm font-medium ${
                      milestone.isUnlocked ? 'text-green-800' : 'text-gray-500'
                    }`}>
                      {milestone.title}
                    </div>
                    <div className="text-xs text-gray-500">
                      {milestone.days} days
                    </div>
                  </div>
                  {milestone.isUnlocked && (
                    <div className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full">
                      +{milestone.pointsReward}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-6 space-y-2">
        <button
          onClick={() => recordActivity('login', 5)}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 px-4 rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-200"
        >
          Record Today's Activity
        </button>
        <button
          onClick={() => recordActivity('tutorial', 10)}
          className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
        >
          Complete Tutorial (+10 pts)
        </button>
      </div>
      
      <SignInModal
        isOpen={showSignInModal}
        onClose={() => setShowSignInModal(false)}
        lang={lang}
        title={isVietnamese ? 'Đăng nhập để theo dõi chuỗi' : 'Sign in to track streaks'}
        subtitle={isVietnamese ? 'Tạo tài khoản để bắt đầu theo dõi chuỗi học tập và kiếm điểm!' : 'Create an account to start tracking your learning streaks and earn points!'}
      />
    </div>
  )
}
