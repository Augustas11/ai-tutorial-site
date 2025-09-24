'use client'

import { useState } from 'react'
import { Mail, User, LogIn, UserPlus, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

interface UserAuthProps {
  lang: string
  onClose?: () => void
}

export default function UserAuth({ lang, onClose }: UserAuthProps) {
  const { user, login, loginAsGuest, logout, isLoading } = useAuth()
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  
  const isVietnamese = lang === 'vn'

  const content = {
    en: {
      title: 'Welcome to AI Creator School',
      subtitle: 'Sign in to track your learning streaks and achievements',
      email: 'Email Address',
      name: 'Full Name (Optional)',
      login: 'Sign In',
      register: 'Create Account',
      guest: 'Continue as Guest',
      logout: 'Sign Out',
      profile: 'My Profile',
      switchToRegister: 'Don\'t have an account? Sign up',
      switchToLogin: 'Already have an account? Sign in',
      error: 'Something went wrong. Please try again.',
      success: 'Welcome! You\'re now signed in.',
      guestMode: 'You\'re in guest mode. Sign in to save your progress.',
      currentUser: 'Signed in as'
    },
    vn: {
      title: 'Chào mừng đến với Trường Sáng Tạo AI',
      subtitle: 'Đăng nhập để theo dõi chuỗi học tập và thành tích của bạn',
      email: 'Địa chỉ Email',
      name: 'Họ và tên (Tùy chọn)',
      login: 'Đăng nhập',
      register: 'Tạo tài khoản',
      guest: 'Tiếp tục với tài khách',
      logout: 'Đăng xuất',
      profile: 'Hồ sơ của tôi',
      switchToRegister: 'Chưa có tài khoản? Đăng ký',
      switchToLogin: 'Đã có tài khoản? Đăng nhập',
      error: 'Có lỗi xảy ra. Vui lòng thử lại.',
      success: 'Chào mừng! Bạn đã đăng nhập thành công.',
      guestMode: 'Bạn đang ở chế độ khách. Đăng nhập để lưu tiến độ.',
      currentUser: 'Đăng nhập với tên'
    }
  }

  const t = content[isVietnamese ? 'vn' : 'en']

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      if (!email.trim()) {
        throw new Error(isVietnamese ? 'Vui lòng nhập email' : 'Please enter your email')
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        throw new Error(isVietnamese ? 'Email không hợp lệ' : 'Please enter a valid email')
      }

      await login(email.trim(), name.trim() || undefined)
      
      if (onClose) {
        onClose()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t.error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGuestLogin = () => {
    loginAsGuest(isVietnamese ? 'vn' : 'en')
    if (onClose) {
      onClose()
    }
  }

  const handleLogout = () => {
    logout()
    if (onClose) {
      onClose()
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (user && !user.isGuest) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="h-8 w-8 text-primary-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {t.currentUser}
          </h3>
          <p className="text-gray-600">{user.name || user.email}</p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => window.location.href = `/dashboard/${lang}`}
            className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
          >
            <User className="h-4 w-4" />
            <span>{t.profile}</span>
          </button>
          
          <button
            onClick={handleLogout}
            className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
          >
            <LogIn className="h-4 w-4" />
            <span>{t.logout}</span>
          </button>
        </div>
      </div>
    )
  }

  if (user && user.isGuest) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="h-8 w-8 text-orange-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {t.guestMode}
          </h3>
          <p className="text-gray-600 text-sm">
            {isVietnamese 
              ? 'Đăng nhập để lưu tiến độ và đồng bộ trên các thiết bị' 
              : 'Sign in to save your progress and sync across devices'
            }
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => setIsLoginMode(true)}
            className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
          >
            <LogIn className="h-4 w-4" />
            <span>{t.login}</span>
          </button>
          
          <button
            onClick={handleGuestLogin}
            className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
          >
            <User className="h-4 w-4" />
            <span>{t.guest}</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <UserPlus className="h-8 w-8 text-primary-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {t.title}
        </h3>
        <p className="text-gray-600 text-sm">
          {t.subtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t.email}
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder={isVietnamese ? 'your@email.com' : 'your@email.com'}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t.name}
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder={isVietnamese ? 'Tên của bạn' : 'Your name'}
            />
          </div>
        </div>

        {error && (
          <div className="text-red-600 text-sm text-center">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            <>
              {isLoginMode ? <LogIn className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
              <span>{isLoginMode ? t.login : t.register}</span>
            </>
          )}
        </button>
      </form>

      <div className="mt-4 text-center">
        <button
          onClick={() => setIsLoginMode(!isLoginMode)}
          className="text-sm text-primary-600 hover:text-primary-800 transition-colors"
        >
          {isLoginMode ? t.switchToRegister : t.switchToLogin}
        </button>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <button
          onClick={handleGuestLogin}
          className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
        >
          <User className="h-4 w-4" />
          <span>{t.guest}</span>
        </button>
      </div>
    </div>
  )
}
