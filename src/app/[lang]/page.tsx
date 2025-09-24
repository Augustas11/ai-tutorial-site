import { notFound } from 'next/navigation'
import Hero from '@/components/Hero'
import FeaturedTutorials from '@/components/FeaturedTutorials'
import ToolsSection from '@/components/ToolsSection'
import NewsletterSignup from '@/components/NewsletterSignup'
import StatsSection from '@/components/StatsSection'
import { LanguageProvider } from '@/contexts/LanguageContext'

const supportedLanguages = ['en', 'vi']

export default function LanguagePage({ params }: { params: { lang: string } }) {
  const { lang } = params

  if (!supportedLanguages.includes(lang)) {
    notFound()
  }

  return (
    <LanguageProvider initialLanguage={lang as 'en' | 'vi'}>
      <div className="min-h-screen">
        <Hero />
        <StatsSection />
        <FeaturedTutorials />
        <ToolsSection />
        <NewsletterSignup />
      </div>
    </LanguageProvider>
  )
}

export function generateStaticParams() {
  return supportedLanguages.map((lang) => ({
    lang,
  }))
}
