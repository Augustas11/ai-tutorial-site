'use client'

import { useState } from 'react'
import { X, User, Mail, LogIn, UserPlus } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

interface SignInModalProps {
  isOpen: boolean
  onClose: () => void
  lang: string
  title?: string
  subtitle?: string
}

export default function SignInModal({ 
  isOpen, 
  onClose, 
  lang, 
  title,
  subtitle 
}: SignInModalProps) {
  const { user, login, loginAsGuest, logout, isLoading } = useAuth()
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  
  const isVietnamese = lang === 'vn'

  const content = {
    en: {
      title: title || 'Sign In to Continue',
      subtitle: subtitle || 'Create an account or sign in to track your learning streaks and save your progress.',
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
      currentUser: 'Signed in as',
      close: 'Close'
    },
    vn: {
      title: title || 'Đăng nhập để tiếp tục',
      subtitle: subtitle || 'Tạo tài khoản hoặc đăng nhập để theo dõi chuỗi học tập và lưu tiến độ của bạn.',
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
      currentUser: 'Đăng nhập với tên',
      close: 'Đóng'
    }
  }

  const t = content[isVietnamese ? 'vn' : 'en']

  const handleSubmit = async () => {
    console.log('SignInModal: Form submitted', { email, name, isSubmitting })
    setError('')
    setIsSubmitting(true)

    try {
      if (!email || !email.trim()) {
        throw new Error(isVietnamese ? 'Vui lòng nhập email' : 'Please enter your email')
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        throw new Error(isVietnamese ? 'Email không hợp lệ' : 'Please enter a valid email')
      }

      await login(email.trim(), name?.trim() || undefined)
      onClose()
    } catch (err) {
      console.error('SignInModal: Login error', err)
      setError(err instanceof Error ? err.message : t.error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGuestLogin = () => {
    loginAsGuest(isVietnamese ? 'vn' : 'en')
    onClose()
  }

  const handleLogout = () => {
    logout()
    onClose()
  }

  if (!isOpen) {
    console.log('SignInModal: Not open')
    return null
  }
  
  console.log('SignInModal: Rendering modal', { isOpen, user, isSubmitting })

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-4">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        </div>
      </div>
    )
  }

  if (user && !user.isGuest) {
    console.log('SignInModal: Showing logged-in user modal')
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-4 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          
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
              onClick={() => {
                console.log('Profile button clicked!')
                alert('Profile button clicked!')
                onClose()
                window.location.href = `/dashboard/${lang}`
              }}
              className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
            >
              <User className="h-4 w-4" />
              <span>{t.profile}</span>
            </button>
            
            <button
              onClick={() => {
                console.log('Logout button clicked!')
                alert('Logout button clicked!')
                handleLogout()
              }}
              className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
            >
              <LogIn className="h-4 w-4" />
              <span>{t.logout}</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (user && user.isGuest && !isLoginMode) {
    console.log('SignInModal: Showing guest user modal')
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-4 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          
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
              onClick={() => {
                console.log('Guest login button clicked!')
                alert('Guest login button clicked!')
                setIsLoginMode(true)
              }}
              className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
            >
              <LogIn className="h-4 w-4" />
              <span>{t.login}</span>
            </button>
            
            <button
              onClick={() => {
                console.log('Guest continue button clicked!')
                alert('Guest continue button clicked!')
                handleGuestLogin()
              }}
              className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
            >
              <User className="h-4 w-4" />
              <span>{t.guest}</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  console.log('SignInModal: Showing main sign-in modal')
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" 
      style={{ zIndex: 9999 }}
      onClick={(e) => {
        console.log('Modal backdrop clicked', e.target === e.currentTarget)
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >
      <div 
        className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-4 relative" 
        style={{ zIndex: 10000 }}
        onClick={(e) => {
          console.log('Modal content clicked')
          e.stopPropagation()
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
        
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

            <div className="space-y-4">
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
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 placeholder-gray-500"
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
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 placeholder-gray-500"
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
                onClick={() => {
                  console.log('SignInModal: Button clicked!', { email, name })
                  handleSubmit()
                }}
                disabled={isSubmitting}
                className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
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
            </div>

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
    </div>
  )
}
