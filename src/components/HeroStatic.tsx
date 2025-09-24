'use client'

import { Star } from 'lucide-react'
import { useState } from 'react'
import ChatInterface from './ChatInterface'
import StreakNotification, { useStreakNotifications } from './StreakNotification'

interface HeroStaticProps {
  lang: string
}

export default function HeroStatic({ lang }: HeroStaticProps) {
  const isVietnamese = lang === 'vn'
  const [userId] = useState('default-user') // In production, this would come from user authentication
  const [streakData, setStreakData] = useState(null)
  const { currentNotification, addNotification, closeNotification } = useStreakNotifications()
  
  const content = {
    en: {
      badge: 'Join 100+ AI learners',
      title: 'Master AI with',
      titleHighlight: 'Practical Examples',
      description: 'Learn artificial intelligence through hands-on tutorials, ready-to-use prompts, and powerful automation tools. From beginner to expert, we\'ve got you covered.',
      chatTitle: 'What\'s on your mind today?',
      chatPlaceholder: 'Ask anything',
      tutorials: 'Tutorials',
      tools: 'AI Tools',
      students: 'Students'
    },
    vn: {
      badge: 'Tham gia 100+ người học AI',
      title: 'Thành thạo AI với',
      titleHighlight: 'Ví dụ thực tế',
      description: 'Học trí tuệ nhân tạo thông qua các hướng dẫn thực hành, gợi ý sẵn sàng sử dụng và các công cụ tự động hóa mạnh mẽ. Từ người mới bắt đầu đến chuyên gia, chúng tôi có đầy đủ.',
      chatTitle: 'Hôm nay bạn nghĩ gì?',
      chatPlaceholder: 'Hỏi bất cứ điều gì',
      tutorials: 'Hướng dẫn',
      tools: 'Công cụ AI',
      students: 'Học viên'
    }
  }

  const t = content[isVietnamese ? 'vn' : 'en']

  return (
    <section id="hero" className="bg-gradient-to-br from-primary-50 to-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-1 bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-sm font-medium">
              <Star className="h-4 w-4" />
              <span>{t.badge}</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {t.title}
            <span className="text-primary-600"> {t.titleHighlight}</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {t.description}
          </p>

          {/* AI Chat Interface */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              {t.chatTitle}
            </h2>
            <ChatInterface 
              lang={lang}
              placeholder={t.chatPlaceholder}
              userId={userId}
              onStreakUpdate={setStreakData}
            />
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">100+</div>
              <div className="text-gray-600">{t.tutorials}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">50+</div>
              <div className="text-gray-600">{t.tools}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">100+</div>
              <div className="text-gray-600">{t.students}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Streak Notifications */}
      {currentNotification && (
        <StreakNotification
          milestone={currentNotification}
          onClose={closeNotification}
          autoClose={true}
          duration={5000}
        />
      )}
    </section>
  )
}
