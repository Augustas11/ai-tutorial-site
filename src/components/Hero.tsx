import Link from 'next/link'
import { ArrowRight, Play, Star } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import ChatInterface from './ChatInterface'

export default function Hero() {
  const { t } = useLanguage()

  const handleChatMessage = (message: string) => {
    console.log('User asked:', message)
    // Add your AI response logic here
  }

  return (
    <section className="bg-gradient-to-br from-primary-50 to-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-1 bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-sm font-medium">
              <Star className="h-4 w-4" />
              <span>{t('hero.badge')}</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {t('hero.title')}
            <span className="text-primary-600"> {t('hero.titleHighlight')}</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {t('hero.description')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              href="/tutorials"
              className="bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 transition-colors flex items-center space-x-2"
            >
              <span>{t('hero.startLearning')}</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            
            <Link
              href="/demo"
              className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors flex items-center space-x-2"
            >
              <Play className="h-5 w-5" />
              <span>{t('hero.watchDemo')}</span>
            </Link>
          </div>

          {/* ChatGPT-style interface */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              {t('hero.title')} - {t('hero.titleHighlight')}
            </h2>
            <ChatInterface 
              placeholder={t('chat.placeholder')}
              onSendMessage={handleChatMessage}
            />
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">100+</div>
              <div className="text-gray-600">{t('hero.tutorials')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">50+</div>
              <div className="text-gray-600">{t('hero.tools')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">10K+</div>
              <div className="text-gray-600">{t('hero.students')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}