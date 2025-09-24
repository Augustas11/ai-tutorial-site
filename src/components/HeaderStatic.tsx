'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Zap, BookOpen, Wrench, Users, Globe, Menu, X, BarChart3 } from 'lucide-react'
import StreakHeader from './StreakHeader'

interface HeaderStaticProps {
  lang: string
}

export default function HeaderStatic({ lang }: HeaderStaticProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isVietnamese = lang === 'vn'
  
  const navigation = [
    { 
      name: isVietnamese ? 'Hướng dẫn' : 'Tutorials', 
      href: '#tutorials', 
      icon: BookOpen 
    },
    { 
      name: isVietnamese ? 'Công cụ' : 'Tools', 
      href: '#tools', 
      icon: Wrench 
    },
    { 
      name: isVietnamese ? 'Bảng điều khiển' : 'Dashboard', 
      href: `/${lang}/dashboard`, 
      icon: BarChart3 
    },
    { 
      name: isVietnamese ? 'Cộng đồng' : 'Community', 
      href: 'https://www.facebook.com/share/g/1Ak4MKnUBB/?mibextid=NSMWBT', 
      icon: Users 
    },
  ]

  const brandName = isVietnamese ? 'Trường Sáng Tạo AI' : 'AI Creator School'
  const subscribeText = isVietnamese ? 'Đăng ký' : 'Subscribe'

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href={`/${lang}`} className="flex items-center space-x-2">
              <Zap className="h-6 w-6 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">{brandName}</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon
              const isAnchor = item.href.startsWith('#')
              const isExternal = item.href.startsWith('http')
              
              if (isAnchor) {
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-primary-600 transition-colors flex items-center space-x-1"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </a>
                )
              }
              
              if (isExternal) {
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-primary-600 transition-colors flex items-center space-x-1"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </a>
                )
              }
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-primary-600 transition-colors flex items-center space-x-1"
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Streak Display */}
            <StreakHeader userId="default-user" />
            
            <div className="relative group">
              <button className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors">
                <Globe className="h-4 w-4" />
                <span className="text-sm">{isVietnamese ? '🇻🇳' : '🇺🇸'}</span>
              </button>
              
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  <a
                    href="/en"
                    className={`w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors flex items-center space-x-3 ${
                      !isVietnamese ? 'bg-primary-50 text-primary-600' : 'text-gray-700'
                    }`}
                  >
                    <span className="text-lg">🇺🇸</span>
                    <span className="text-sm font-medium">English</span>
                    {!isVietnamese && (
                      <span className="ml-auto text-primary-600">✓</span>
                    )}
                  </a>
                  <a
                    href="/vn"
                    className={`w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors flex items-center space-x-3 ${
                      isVietnamese ? 'bg-primary-50 text-primary-600' : 'text-gray-700'
                    }`}
                  >
                    <span className="text-lg">🇻🇳</span>
                    <span className="text-sm font-medium">Tiếng Việt</span>
                    {isVietnamese && (
                      <span className="ml-auto text-primary-600">✓</span>
                    )}
                  </a>
                </div>
              </div>
            </div>
            <a
              href="#newsletter"
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              {subscribeText}
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => {
                const Icon = item.icon
                const isAnchor = item.href.startsWith('#')
                const isExternal = item.href.startsWith('http')
                
                if (isAnchor) {
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 flex items-center space-x-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </a>
                  )
                }
                
                if (isExternal) {
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 flex items-center space-x-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </a>
                  )
                }
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 flex items-center space-x-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
              <div className="pt-4 space-y-2">
                <div className="px-3 py-2">
                  <div className="flex items-center space-x-2 text-gray-700">
                    <Globe className="h-4 w-4" />
                    <span className="text-sm">{isVietnamese ? '🇻🇳' : '🇺🇸'}</span>
                  </div>
                </div>
                <a
                  href="#newsletter"
                  className="block px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {subscribeText}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
