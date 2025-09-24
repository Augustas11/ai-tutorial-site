'use client'

import { Mail, CheckCircle } from 'lucide-react'
import { useState } from 'react'

interface NewsletterSignupStaticProps {
  lang: string
}

export default function NewsletterSignupStatic({ lang }: NewsletterSignupStaticProps) {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')
  const isVietnamese = lang === 'vn'
  
  const content = {
    en: {
      title: 'Stay Updated with AI',
      description: 'Get weekly tutorials, AI news, and exclusive resources delivered to your inbox.',
      placeholder: 'Enter your email',
      subscribe: 'Subscribe',
      successTitle: 'Welcome to our community!',
      successDescription: 'You\'ll receive our weekly AI insights and tutorials directly in your inbox.',
      disclaimer: 'Join 100+ AI enthusiasts. No spam, unsubscribe anytime.'
    },
    vn: {
      title: 'Cập nhật với AI',
      description: 'Nhận hướng dẫn hàng tuần, tin tức AI và tài nguyên độc quyền được gửi trực tiếp vào hộp thư của bạn.',
      placeholder: 'Nhập email của bạn',
      subscribe: 'Đăng ký',
      successTitle: 'Chào mừng đến với cộng đồng của chúng tôi!',
      successDescription: 'Bạn sẽ nhận được những hiểu biết và hướng dẫn AI hàng tuần trực tiếp trong hộp thư của mình.',
      disclaimer: 'Tham gia 100+ người đam mê AI. Không spam, hủy đăng ký bất cứ lúc nào.'
    }
  }

  const t = content[isVietnamese ? 'vn' : 'en']

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!email.trim()) {
      setError(isVietnamese ? 'Vui lòng nhập email của bạn' : 'Please enter your email')
      return
    }
    
    if (!isValidEmail(email)) {
      setError(isVietnamese ? 'Email không hợp lệ' : 'Please enter a valid email')
      return
    }
    
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          language: isVietnamese ? 'vn' : 'en'
        }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe')
      }
      
      setIsSuccess(true)
      setEmail('')
      
      // Reset success state after 5 seconds
      setTimeout(() => {
        setIsSuccess(false)
      }, 5000)
      
    } catch (err) {
      console.error('Subscription error:', err)
      setError(isVietnamese ? 'Có lỗi xảy ra. Vui lòng thử lại.' : 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    if (error) setError('')
  }

  return (
    <section id="newsletter" className="py-20 bg-primary-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <div className="flex justify-center mb-4">
            <div className="flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full">
              <Mail className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            {t.description}
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder={t.placeholder}
              className={`flex-1 px-4 py-3 rounded-lg border-0 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 ${
                error ? 'ring-2 ring-red-300' : ''
              }`}
              disabled={isSubmitting}
            />
            <button
              type="submit"
              disabled={!email.trim() || isSubmitting}
              className="px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-primary-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting 
                ? (isVietnamese ? 'Đang đăng ký...' : 'Subscribing...') 
                : t.subscribe
              }
            </button>
          </form>
          
          {error && (
            <p className="text-red-200 text-sm mt-2 text-left">
              {error}
            </p>
          )}
          
          <p className="text-primary-100 text-sm mt-4">
            {t.disclaimer}
          </p>
        </div>

        {/* Success state */}
        {isSuccess && (
          <div className="max-w-md mx-auto mt-8 p-6 bg-white bg-opacity-10 rounded-lg">
            <div className="flex items-center justify-center mb-4">
              <CheckCircle className="h-12 w-12 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {t.successTitle}
            </h3>
            <p className="text-primary-100">
              {t.successDescription}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
