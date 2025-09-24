'use client'

import { useState } from 'react'
import { X, User, Mail, LogIn, UserPlus } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

interface SimpleSignInModalProps {
  isOpen: boolean
  onClose: () => void
  lang: string
}

export default function SimpleSignInModal({ isOpen, onClose, lang }: SimpleSignInModalProps) {
  const { login, loginAsGuest } = useAuth()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  
  const isVietnamese = lang === 'vn'

  const handleSubmit = async () => {
    console.log('SimpleSignInModal: Form submitted', { email, name })
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

      console.log('SimpleSignInModal: Calling login function')
      await login(email.trim(), name.trim() || undefined)
      console.log('SimpleSignInModal: Login successful')
      
      onClose()
    } catch (err) {
      console.error('SimpleSignInModal: Login error', err)
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGuestLogin = () => {
    console.log('SimpleSignInModal: Guest login')
    loginAsGuest(isVietnamese ? 'vn' : 'en')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>
        
        <h2 className="text-xl font-bold mb-4">Sign In</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-gray-900"
              placeholder="your@email.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name (optional)</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-gray-900"
              placeholder="Your name"
            />
          </div>
          
          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}
          
          <button
            onClick={() => {
              console.log('SIMPLE BUTTON CLICKED!')
              alert('Simple button works!')
              handleSubmit()
            }}
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
          
          <button
            onClick={() => {
              console.log('GUEST BUTTON CLICKED!')
              alert('Guest button works!')
              handleGuestLogin()
            }}
            className="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
          >
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  )
}
