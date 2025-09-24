'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { Globe } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'

export default function LanguageSwitcher() {
  const { language } = useLanguage()
  const router = useRouter()
  const pathname = usePathname()

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'vn', name: 'Tiếng Việt', flag: '🇻🇳' }
  ] as const

  const handleLanguageChange = (newLang: string) => {
    // Update localStorage
    localStorage.setItem('language', newLang)
    
    // Navigate to the new language route
    const newPath = pathname.replace(/^\/[a-z]{2}/, `/${newLang}`)
    router.push(newPath)
  }

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors">
        <Globe className="h-4 w-4" />
        <span className="text-sm font-medium">
          {languages.find(lang => lang.code === language)?.flag}
        </span>
      </button>
      
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="py-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors flex items-center space-x-3 ${
                language === lang.code ? 'bg-primary-50 text-primary-600' : 'text-gray-700'
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span className="text-sm font-medium">{lang.name}</span>
              {language === lang.code && (
                <span className="ml-auto text-primary-600">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}