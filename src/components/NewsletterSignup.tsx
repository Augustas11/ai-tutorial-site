'use client'

import { useState } from 'react'
import { Mail, CheckCircle } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function NewsletterSignup() {
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubscribed(true)
    setIsLoading(false)
    setEmail('')
  }

  if (isSubscribed) {
    return (
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <CheckCircle className="h-16 w-16 text-white mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">
            {t('newsletter.success.title')}
          </h2>
          <p className="text-xl text-primary-100">
            {t('newsletter.success.description')}
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-primary-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {t('newsletter.title')}
        </h2>
        <p className="text-xl text-primary-100 mb-8">
          {t('newsletter.description')}
        </p>
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('newsletter.placeholder')}
                className="w-full pl-10 pr-4 py-3 rounded-lg border-0 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-primary-300 focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? t('newsletter.subscribing') : t('newsletter.subscribe')}
            </button>
          </div>
        </form>
        
        <p className="text-primary-200 text-sm mt-4">
          {t('newsletter.disclaimer')}
        </p>
      </div>
    </section>
  )
}