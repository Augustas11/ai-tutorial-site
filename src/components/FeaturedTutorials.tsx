import Link from 'next/link'
import { Clock, User, ArrowRight, BookOpen } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function FeaturedTutorials() {
  const { t } = useLanguage()

  const tutorials = [
    {
      id: 1,
      title: t('tutorials.chatgpt.title'),
      description: t('tutorials.chatgpt.desc'),
      duration: `15 ${t('common.minRead')}`,
      author: t('common.author'),
      category: t('tutorials.beginner'),
      image: '/api/placeholder/400/200',
      href: '/tutorials/chatgpt-basics'
    },
    {
      id: 2,
      title: t('tutorials.webapps.title'),
      description: t('tutorials.webapps.desc'),
      duration: `25 ${t('common.minRead')}`,
      author: t('common.devTeam'),
      category: t('tutorials.intermediate'),
      image: '/api/placeholder/400/200',
      href: '/tutorials/ai-web-apps'
    },
    {
      id: 3,
      title: t('tutorials.prompts.title'),
      description: t('tutorials.prompts.desc'),
      duration: `30 ${t('common.minRead')}`,
      author: t('common.author'),
      category: t('tutorials.advanced'),
      image: '/api/placeholder/400/200',
      href: '/tutorials/advanced-prompts'
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('tutorials.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('tutorials.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutorials.map((tutorial) => (
            <div
              key={tutorial.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                <BookOpen className="h-16 w-16 text-primary-600" />
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded-full">
                    {tutorial.category}
                  </span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    {tutorial.duration}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {tutorial.title}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {tutorial.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-500 text-sm">
                    <User className="h-4 w-4 mr-1" />
                    {tutorial.author}
                  </div>
                  
                  <Link
                    href={tutorial.href}
                    className="flex items-center text-primary-600 hover:text-primary-700 font-medium"
                  >
                    {t('tutorials.readMore')}
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/tutorials"
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
          >
            {t('tutorials.viewAll')}
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  )
}