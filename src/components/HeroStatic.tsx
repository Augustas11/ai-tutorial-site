'use client'

import { Star } from 'lucide-react'
import { useState } from 'react'

interface HeroStaticProps {
  lang: string
}

export default function HeroStatic({ lang }: HeroStaticProps) {
  const [inputValue, setInputValue] = useState('')
  const isVietnamese = lang === 'vn'
  
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      console.log('User asked:', inputValue)
      // Here you can add your AI response logic
      // For now, we'll just log the input
      setInputValue('') // Clear the input after submission
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

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

          {/* ChatGPT-style interface */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              {t.chatTitle}
            </h2>
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-gray-800 rounded-xl shadow-lg p-4">
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  className="p-2 rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
                >
                  <span className="text-lg font-light">+</span>
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={t.chatPlaceholder}
                    className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-full py-2 pl-4 pr-16 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <button
                      type="button"
                      className="p-2 rounded-full bg-gray-600 text-gray-300 hover:bg-gray-500 transition-colors mr-1"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button
                      type="submit"
                      disabled={!inputValue.trim()}
                      className="p-2 rounded-full bg-primary-600 text-white hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </form>
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
    </section>
  )
}
