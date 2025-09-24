import Link from 'next/link'
import { Zap, BookOpen, Wrench, Users, Globe } from 'lucide-react'

export default function Header() {
  const navigation = [
    { name: 'Tutorials', href: '/tutorials', icon: BookOpen },
    { name: 'Tools', href: '/tools', icon: Wrench },
    { name: 'Community', href: '/community', icon: Users },
  ]

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <Zap className="h-6 w-6 text-primary-600" />
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
            <div className="flex items-center space-x-2 text-gray-700">
              <Globe className="h-4 w-4" />
              <span className="text-sm">🇺🇸</span>
            </div>
            <Link
              href="/newsletter"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              Newsletter
            </Link>
            <Link
              href="/get-started"
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-primary-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}