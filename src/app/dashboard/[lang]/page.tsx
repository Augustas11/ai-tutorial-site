'use client'

import { notFound, useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import UserDashboard from '@/components/UserDashboard'
import { useEffect } from 'react'

const supportedLanguages = ['en', 'vn']

export default function DashboardPage({ params }: { params: { lang: string } }) {
  const { lang } = params
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push(`/${lang}`)
    }
  }, [user, isLoading, router, lang])

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
    // Show loading while checking authentication
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <UserDashboard lang={lang} userId={user.id} />
    </div>
  )
}

// generateStaticParams removed because we're using 'use client' for authentication
