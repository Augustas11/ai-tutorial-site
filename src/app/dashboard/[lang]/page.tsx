'use client'

import { notFound } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import UserDashboard from '@/components/UserDashboard'

const supportedLanguages = ['en', 'vn']

export default function DashboardPage({ params }: { params: { lang: string } }) {
  const { lang } = params
  const { user, isLoading } = useAuth()

  if (!supportedLanguages.includes(lang)) {
    notFound()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!user) {
    // Redirect to home page if not logged in
    if (typeof window !== 'undefined') {
      window.location.href = `/${lang}`
    }
    return null
  }

  return (
    <div className="min-h-screen">
      <UserDashboard lang={lang} userId={user.id} />
    </div>
  )
}

export function generateStaticParams() {
  return supportedLanguages.map((lang) => ({
    lang,
  }))
}
