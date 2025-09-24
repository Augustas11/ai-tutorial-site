'use client'

import { useState } from 'react'
import StreakWidget from '@/components/StreakWidget'
import StreakNotification, { useStreakNotifications } from '@/components/StreakNotification'
import { Button } from '@/components/ui/button'

export default function StreakDemoPage() {
  const [userId, setUserId] = useState('demo-user')
  const { currentNotification, addNotification, closeNotification } = useStreakNotifications()

  const handleMilestoneUnlock = (milestone: any) => {
    addNotification(milestone)
  }

  const demoMilestones = [
    {
      days: 3,
      title: 'Getting Started',
      description: '3-day streak achieved!',
      badgeIcon: '🔥',
      pointsReward: 10,
      isUnlocked: true
    },
    {
      days: 7,
      title: 'Week Warrior',
      description: '7-day streak! You\'re on fire!',
      badgeIcon: '🔥🔥',
      pointsReward: 25,
      isUnlocked: true
    },
    {
      days: 14,
      title: 'Two Week Champion',
      description: '14 days of dedication!',
      badgeIcon: '🔥🔥🔥',
      pointsReward: 50,
      isUnlocked: false
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🔥 Streak System Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the gamified learning system that keeps users engaged with daily streaks, 
            milestone rewards, and achievement badges.
          </p>
        </div>

        {/* Demo Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Demo Controls</h2>
          <div className="flex flex-wrap gap-4">
            <Button
              onClick={() => setUserId(`user-${Math.random().toString(36).substr(2, 9)}`)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Generate New User
            </Button>
            <Button
              onClick={() => handleMilestoneUnlock(demoMilestones[0])}
              className="bg-green-600 hover:bg-green-700"
            >
              Trigger 3-Day Milestone
            </Button>
            <Button
              onClick={() => handleMilestoneUnlock(demoMilestones[1])}
              className="bg-orange-600 hover:bg-orange-700"
            >
              Trigger 7-Day Milestone
            </Button>
            <Button
              onClick={() => handleMilestoneUnlock(demoMilestones[2])}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Trigger 14-Day Milestone
            </Button>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Current User ID: <code className="bg-gray-100 px-2 py-1 rounded">{userId}</code>
          </div>
        </div>

        {/* Streak Widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Full Streak Widget */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Full Streak Widget</h3>
            <StreakWidget 
              userId={userId}
              streakType="overall"
              showMilestones={true}
              compact={false}
            />
          </div>

          {/* Compact Streak Widget */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Compact Streak Widget</h3>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <StreakWidget 
                userId={userId}
                streakType="overall"
                showMilestones={false}
                compact={true}
              />
            </div>
          </div>
        </div>

        {/* Different Streak Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Learning Streak</h3>
            <StreakWidget 
              userId={userId}
              streakType="learning"
              showMilestones={false}
              compact={true}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Chat Streak</h3>
            <StreakWidget 
              userId={userId}
              streakType="chat"
              showMilestones={false}
              compact={true}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Overall Streak</h3>
            <StreakWidget 
              userId={userId}
              streakType="overall"
              showMilestones={false}
              compact={true}
            />
          </div>
        </div>

        {/* Features Overview */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Streak System Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">🔥</div>
              <h3 className="font-semibold text-gray-800 mb-2">Daily Streaks</h3>
              <p className="text-gray-600 text-sm">
                Track consecutive days of learning activity with visual progress indicators
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🏆</div>
              <h3 className="font-semibold text-gray-800 mb-2">Milestone Rewards</h3>
              <p className="text-gray-600 text-sm">
                Unlock special badges and bonus points at 3, 7, 14, 30, and 100 days
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="font-semibold text-gray-800 mb-2">Streak Bonuses</h3>
              <p className="text-gray-600 text-sm">
                Earn extra points for maintaining streaks of 7+ days
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">📊</div>
              <h3 className="font-semibold text-gray-800 mb-2">Progress Tracking</h3>
              <p className="text-gray-600 text-sm">
                Visual progress bars and next milestone indicators
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="font-semibold text-gray-800 mb-2">Multiple Types</h3>
              <p className="text-gray-600 text-sm">
                Track learning, chat, and overall activity streaks separately
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🔔</div>
              <h3 className="font-semibold text-gray-800 mb-2">Notifications</h3>
              <p className="text-gray-600 text-sm">
                Celebrate achievements with beautiful milestone notifications
              </p>
            </div>
          </div>
        </div>

        {/* Integration Examples */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Integration Examples</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-2">Header Integration</h4>
              <p className="text-gray-600 text-sm mb-3">
                Add streak display to your header for constant visibility and motivation
              </p>
              <code className="text-xs bg-gray-100 p-2 rounded block">
                {`<StreakHeader userId={userId} className="ml-4" />`}
              </code>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-2">Dashboard Widget</h4>
              <p className="text-gray-600 text-sm mb-3">
                Full-featured streak widget for user dashboards and profile pages
              </p>
              <code className="text-xs bg-gray-100 p-2 rounded block">
                {`<StreakWidget userId={userId} showMilestones={true} />`}
              </code>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-2">Milestone Notifications</h4>
              <p className="text-gray-600 text-sm mb-3">
                Celebrate user achievements with animated notifications
              </p>
              <code className="text-xs bg-gray-100 p-2 rounded block">
                {`const { addNotification } = useStreakNotifications()`}
              </code>
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
