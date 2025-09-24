import { notFound } from 'next/navigation'
import UserDashboard from '@/components/UserDashboard'

const supportedLanguages = ['en', 'vn']

export default function DashboardPage({ params }: { params: { lang: string } }) {
  const { lang } = params

  if (!supportedLanguages.includes(lang)) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <UserDashboard lang={lang} userId="default-user" />
    </div>
  )
}

export function generateStaticParams() {
  return supportedLanguages.map((lang) => ({
    lang,
  }))
}
