'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Zap, BookOpen, Wrench, Users } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useLanguage()

  const navigation = [
    { name: t('nav.tutorials'), href: '/tutorials', icon: BookOpen },
    { name: t('nav.tools'), href: '/tools', icon: Wrench },
    { name: t('nav.community'), href: '/community', icon: Users },
  ]

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Zap className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">AI Tutorial Hub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors"
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <Link
              href="/newsletter"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              {t('nav.newsletter')}
            </Link>
            <Link
              href="/get-started"
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              {t('nav.getStarted')}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
              <div className="pt-4 space-y-2">
                <div className="px-3 py-2">
                  <LanguageSwitcher />
                </div>
                <Link
                  href="/newsletter"
                  className="block px-3 py-2 text-gray-700 hover:text-primary-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.newsletter')}
                </Link>
                <Link
                  href="/get-started"
                  className="block px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.getStarted')}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}