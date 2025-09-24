'use client'

import { useState } from 'react'
import { X, User, LogIn } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import UserAuth from './UserAuth'

interface UserLoginModalProps {
  isOpen: boolean
  onClose: () => void
  lang: string
}

export default function UserLoginModal({ isOpen, onClose, lang }: UserLoginModalProps) {
  const { user } = useAuth()
  const isVietnamese = lang === 'vn'

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />
        
        {/* Modal */}
        <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-primary-600" />
              <h2 className="text-lg font-semibold text-gray-800">
                {isVietnamese ? 'Đăng nhập' : 'Sign In'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Content */}
          <div className="p-6">
            <UserAuth lang={lang} onClose={onClose} />
          </div>
        </div>
      </div>
    </div>
  )
}
