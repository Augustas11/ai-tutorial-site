'use client'

import { useState, useEffect } from 'react'
import { Flame, Trophy, Star, Zap } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import SignInModal from './SignInModal'

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
  lang?: string
}

export default function StreakHeader({ userId, className = '', refreshTrigger, lang = 'en' }: StreakHeaderProps) {
  const { user, session } = useAuth()
  const [streakData, setStreakData] = useState<StreakData | null>(null)
  const [loading, setLoading] = useState(true)
  const [showSignInModal, setShowSignInModal] = useState(false)
  const isVietnamese = lang === 'vn'
  
  // Use authenticated user ID or fallback to provided userId
  const currentUserId = user?.id || userId || 'default-user'

  const content = {
    en: {
      startStreak: 'Start',
      streak: 'Streak',
      day: 'Day',
      days: 'Days',
      best: 'Best',
      signInRequired: 'Sign in to track streaks',
      signInRequiredSubtitle: 'Create an account to start tracking your learning streaks and earn points!'
    },
    vn: {
      startStreak: 'Bắt đầu',
      streak: 'Chuỗi',
      day: 'Ngày',
      days: 'Ngày',
      best: 'Tốt nhất',
      signInRequired: 'Đăng nhập để theo dõi chuỗi',
      signInRequiredSubtitle: 'Tạo tài khoản để bắt đầu theo dõi chuỗi học tập và kiếm điểm!'
    }
  }

  const t = content[isVietnamese ? 'vn' : 'en']

  useEffect(() => {
    fetchStreakData()
  }, [currentUserId, refreshTrigger, lang, user?.id, session?.sessionId])

  const fetchStreakData = async () => {
    try {
      console.log('StreakHeader: Fetching streak data for user:', currentUserId)
      const params = new URLSearchParams({
        userId: currentUserId,
        type: 'overall'
      })
      
      if (session?.sessionId) {
        params.append('sessionId', session.sessionId)
      }
      
      console.log('StreakHeader: API URL:', `/api/streak?${params}`)
      const response = await fetch(`/api/streak?${params}`)
      const result = await response.json()
      
      console.log('StreakHeader: API response:', result)
      
      if (result.success) {
        setStreakData(result.data)
        console.log('StreakHeader: Streak data set:', result.data)
      } else {
        console.error('StreakHeader: API returned error:', result.error)
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
        <button 
          onClick={() => {
            if (!user || user.isGuest) {
              setShowSignInModal(true)
            } else {
              window.location.href = `/dashboard/${user?.language || lang}`
            }
          }}
          className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-200 transition-colors cursor-pointer"
        >
          <Zap className="h-4 w-4 text-gray-600" />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-700 leading-none">{t.startStreak}</span>
            <span className="text-xs text-gray-500 leading-none">{t.streak}</span>
          </div>
        </button>
        
        <SignInModal
          isOpen={showSignInModal}
          onClose={() => setShowSignInModal(false)}
          lang={lang}
          title={t.signInRequired}
          subtitle={t.signInRequiredSubtitle}
        />
      </div>
    )
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Streak Display */}
      <button 
        onClick={() => {
          console.log('StreakHeader: Button clicked', { user, isGuest: user?.isGuest })
          if (!user || user.isGuest) {
            console.log('StreakHeader: Opening sign-in modal')
            setShowSignInModal(true)
          } else {
            console.log('StreakHeader: Redirecting to dashboard')
            window.location.href = `/dashboard/${user?.language || lang}`
          }
        }}
        className={`flex items-center space-x-2 bg-gradient-to-r ${getStreakColor(streakData.currentStreak)} px-4 py-2 rounded-full text-white shadow-sm hover:shadow-md transition-all cursor-pointer`}
      >
        {getStreakIcon(streakData.currentStreak)}
        <div className="flex flex-col">
          <span className="font-bold text-sm leading-none">
            {streakData.currentStreak} {streakData.currentStreak === 1 ? t.day : t.days}
          </span>
          <span className="text-xs opacity-80 leading-none">
            {t.streak}
          </span>
        </div>
      </button>

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
          {t.best}: {streakData.longestStreak} {streakData.longestStreak === 1 ? t.day : t.days}
        </div>
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
          {isVietnamese ? 'Chuỗi dài nhất' : 'Longest streak'}: {streakData.longestStreak} {streakData.longestStreak === 1 ? t.day : t.days}
        </div>
      </div>
      
      <SignInModal
        isOpen={showSignInModal}
        onClose={() => {
          console.log('StreakHeader: Closing sign-in modal')
          setShowSignInModal(false)
        }}
        lang={lang}
        title={t.signInRequired}
        subtitle={t.signInRequiredSubtitle}
      />
    </div>
  )
}
