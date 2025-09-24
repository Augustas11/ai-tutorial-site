'use client'

import { useState, useEffect } from 'react'
import { X, Trophy, Star, Flame, Zap, Target } from 'lucide-react'

interface Milestone {
  days: number
  title: string
  description: string
  badgeIcon: string
  pointsReward: number
  isUnlocked: boolean
}

interface StreakNotificationProps {
  milestone: Milestone
  onClose: () => void
  autoClose?: boolean
  duration?: number
}

export default function StreakNotification({ 
  milestone, 
  onClose, 
  autoClose = true, 
  duration = 5000 
}: StreakNotificationProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        handleClose()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [autoClose, duration])

  const handleClose = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setIsVisible(false)
      onClose()
    }, 300)
  }

  const getMilestoneIcon = (days: number) => {
    if (days >= 100) return <Trophy className="h-8 w-8 text-yellow-500" />
    if (days >= 30) return <Star className="h-8 w-8 text-purple-500" />
    if (days >= 7) return <Flame className="h-8 w-8 text-orange-500" />
    return <Zap className="h-8 w-8 text-blue-500" />
  }

  const getMilestoneColor = (days: number) => {
    if (days >= 100) return 'from-yellow-400 to-yellow-600'
    if (days >= 30) return 'from-purple-400 to-purple-600'
    if (days >= 7) return 'from-orange-400 to-orange-600'
    return 'from-blue-400 to-blue-600'
  }

  if (!isVisible) return null

  return (
    <div className={`fixed top-4 right-4 z-50 transform transition-all duration-300 ${
      isAnimating ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'
    }`}>
      <div className={`bg-white rounded-xl shadow-2xl border-2 border-gray-200 overflow-hidden min-w-80 max-w-md ${
        milestone.days >= 7 ? 'border-orange-200' : 'border-blue-200'
      }`}>
        {/* Header */}
        <div className={`bg-gradient-to-r ${getMilestoneColor(milestone.days)} p-4 text-white`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getMilestoneIcon(milestone.days)}
              <div>
                <h3 className="font-bold text-lg">{milestone.title}</h3>
                <p className="text-sm opacity-90">{milestone.description}</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="text-2xl">{milestone.badgeIcon}</div>
              <div>
                <div className="font-semibold text-gray-800">
                  {milestone.days} Day Streak!
                </div>
                <div className="text-sm text-gray-600">
                  You're on fire! 🔥
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">
                +{milestone.pointsReward}
              </div>
              <div className="text-xs text-gray-500">points earned</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Streak Progress</span>
              <span>{milestone.days} days</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`bg-gradient-to-r ${getMilestoneColor(milestone.days)} h-2 rounded-full transition-all duration-1000`}
                style={{ width: '100%' }}
              ></div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <button
              onClick={handleClose}
              className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Awesome!
            </button>
            <button
              onClick={() => {
                // Share achievement
                if (navigator.share) {
                  navigator.share({
                    title: `I just achieved a ${milestone.days}-day streak!`,
                    text: `I'm on fire! 🔥 Just completed ${milestone.days} days of learning on AI Creator School!`,
                    url: window.location.href
                  })
                } else {
                  // Fallback to copying to clipboard
                  navigator.clipboard.writeText(`I just achieved a ${milestone.days}-day streak on AI Creator School! 🔥`)
                }
                handleClose()
              }}
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 px-4 rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all"
            >
              Share
            </button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-white bg-opacity-10 rounded-full -translate-y-10 translate-x-10"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-white bg-opacity-10 rounded-full translate-y-8 -translate-x-8"></div>
      </div>
    </div>
  )
}

// Hook for managing streak notifications
export function useStreakNotifications() {
  const [notifications, setNotifications] = useState<Milestone[]>([])
  const [currentNotification, setCurrentNotification] = useState<Milestone | null>(null)

  const addNotification = (milestone: Milestone) => {
    setNotifications(prev => [...prev, milestone])
    if (!currentNotification) {
      setCurrentNotification(milestone)
    }
  }

  const closeNotification = () => {
    setCurrentNotification(null)
    setNotifications(prev => {
      const remaining = prev.slice(1)
      if (remaining.length > 0) {
        setTimeout(() => setCurrentNotification(remaining[0]), 100)
      }
      return remaining
    })
  }

  const clearAllNotifications = () => {
    setNotifications([])
    setCurrentNotification(null)
  }

  return {
    notifications,
    currentNotification,
    addNotification,
    closeNotification,
    clearAllNotifications
  }
}
