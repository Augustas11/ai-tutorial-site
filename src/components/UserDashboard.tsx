'use client'

import { useState, useEffect } from 'react'
import { Flame, Trophy, Star, Target, Zap, BookOpen, MessageCircle, Mail } from 'lucide-react'
import StreakWidget from './StreakWidget'
import StreakNotification, { useStreakNotifications } from './StreakNotification'

interface UserDashboardProps {
  lang: string
  userId?: string
}

interface ActivityStats {
  totalTutorials: number
  totalChatMessages: number
  totalSubscriptions: number
  currentStreak: number
  longestStreak: number
  totalPoints: number
}

export default function UserDashboard({ lang, userId = 'default-user' }: UserDashboardProps) {
  const [stats, setStats] = useState<ActivityStats>({
    totalTutorials: 0,
    totalChatMessages: 0,
    totalSubscriptions: 0,
    currentStreak: 0,
    longestStreak: 0,
    totalPoints: 0
  })
  const [loading, setLoading] = useState(true)
  const isVietnamese = lang === 'vn'
  const { currentNotification, addNotification, closeNotification } = useStreakNotifications()

  useEffect(() => {
    fetchUserStats()
  }, [userId])

  const fetchUserStats = async () => {
    try {
      setLoading(true)
      // In production, this would fetch from your database
      // For now, we'll simulate some data
      const mockStats: ActivityStats = {
        totalTutorials: 12,
        totalChatMessages: 45,
        totalSubscriptions: 1,
        currentStreak: 7,
        longestStreak: 14,
        totalPoints: 285
      }
      setStats(mockStats)
    } catch (err) {
      console.error('Failed to fetch user stats:', err)
    } finally {
      setLoading(false)
    }
  }

  const content = {
    en: {
      title: 'Your Learning Dashboard',
      subtitle: 'Track your progress and achievements',
      stats: {
        tutorials: 'Tutorials Completed',
        chatMessages: 'AI Chat Messages',
        subscriptions: 'Newsletter Subscriptions',
        currentStreak: 'Current Streak',
        longestStreak: 'Longest Streak',
        totalPoints: 'Total Points'
      },
      activities: {
        title: 'Recent Activities',
        completeTutorial: 'Complete a tutorial',
        sendMessage: 'Send AI chat message',
        subscribe: 'Subscribe to newsletter'
      },
      achievements: {
        title: 'Achievements',
        viewAll: 'View All'
      }
    },
    vn: {
      title: 'Bảng Điều Khiển Học Tập',
      subtitle: 'Theo dõi tiến độ và thành tích của bạn',
      stats: {
        tutorials: 'Hướng dẫn đã hoàn thành',
        chatMessages: 'Tin nhắn AI Chat',
        subscriptions: 'Đăng ký bản tin',
        currentStreak: 'Chuỗi hiện tại',
        longestStreak: 'Chuỗi dài nhất',
        totalPoints: 'Tổng điểm'
      },
      activities: {
        title: 'Hoạt động gần đây',
        completeTutorial: 'Hoàn thành hướng dẫn',
        sendMessage: 'Gửi tin nhắn AI chat',
        subscribe: 'Đăng ký bản tin'
      },
      achievements: {
        title: 'Thành tích',
        viewAll: 'Xem tất cả'
      }
    }
  }

  const t = content[isVietnamese ? 'vn' : 'en']

  const handleActivity = async (activityType: string, points: number) => {
    try {
      const response = await fetch('/api/streak', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          activityType,
          pointsEarned: points
        }),
      })
      
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          // Update local stats
          setStats(prev => ({
            ...prev,
            currentStreak: data.data.streakData.currentStreak,
            longestStreak: Math.max(prev.longestStreak, data.data.streakData.currentStreak),
            totalPoints: prev.totalPoints + points + data.data.streakBonus
          }))
          
          // Show milestone notifications
          if (data.data.newMilestones?.length > 0) {
            data.data.newMilestones.forEach((milestone: any) => {
              addNotification(milestone)
            })
          }
        }
      }
    } catch (err) {
      console.error('Failed to record activity:', err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t.title}
          </h1>
          <p className="text-gray-600">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{t.stats.tutorials}</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalTutorials}</p>
                  </div>
                  <BookOpen className="h-8 w-8 text-blue-500" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{t.stats.chatMessages}</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalChatMessages}</p>
                  </div>
                  <MessageCircle className="h-8 w-8 text-green-500" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{t.stats.subscriptions}</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalSubscriptions}</p>
                  </div>
                  <Mail className="h-8 w-8 text-purple-500" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{t.stats.totalPoints}</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalPoints}</p>
                  </div>
                  <Trophy className="h-8 w-8 text-yellow-500" />
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {t.activities.title}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => handleActivity('tutorial', 10)}
                  className="flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <BookOpen className="h-6 w-6 text-blue-600" />
                  <div className="text-left">
                    <p className="font-medium text-blue-900">{t.activities.completeTutorial}</p>
                    <p className="text-sm text-blue-600">+10 points</p>
                  </div>
                </button>

                <button
                  onClick={() => handleActivity('chat', 2)}
                  className="flex items-center space-x-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                >
                  <MessageCircle className="h-6 w-6 text-green-600" />
                  <div className="text-left">
                    <p className="font-medium text-green-900">{t.activities.sendMessage}</p>
                    <p className="text-sm text-green-600">+2 points</p>
                  </div>
                </button>

                <button
                  onClick={() => handleActivity('subscription', 30)}
                  className="flex items-center space-x-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
                >
                  <Mail className="h-6 w-6 text-purple-600" />
                  <div className="text-left">
                    <p className="font-medium text-purple-900">{t.activities.subscribe}</p>
                    <p className="text-sm text-purple-600">+30 points</p>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Streak Widget */}
            <StreakWidget 
              userId={userId}
              streakType="overall"
              showMilestones={true}
              compact={false}
            />

            {/* Achievements Preview */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {t.achievements.title}
                </h3>
                <button className="text-sm text-blue-600 hover:text-blue-800">
                  {t.achievements.viewAll}
                </button>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">🔥</div>
                  <div>
                    <p className="font-medium text-gray-800">Getting Started</p>
                    <p className="text-sm text-gray-500">3-day streak</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">🔥🔥</div>
                  <div>
                    <p className="font-medium text-gray-800">Week Warrior</p>
                    <p className="text-sm text-gray-500">7-day streak</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 opacity-50">
                  <div className="text-2xl">🔒</div>
                  <div>
                    <p className="font-medium text-gray-500">Two Week Champion</p>
                    <p className="text-sm text-gray-400">14-day streak</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      {currentNotification && (
        <StreakNotification
          milestone={currentNotification}
          onClose={closeNotification}
          autoClose={true}
          duration={5000}
        />
      )}
    </div>
  )
}
