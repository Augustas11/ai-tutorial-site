import { notFound } from 'next/navigation'
import HeroStatic from '@/components/HeroStatic'
import FeaturedTutorialsStatic from '@/components/FeaturedTutorialsStatic'
import ToolsSectionStatic from '@/components/ToolsSectionStatic'
import NewsletterSignupStatic from '@/components/NewsletterSignupStatic'
import StatsSectionStatic from '@/components/StatsSectionStatic'

const supportedLanguages = ['en', 'vn']

export default function LanguagePage({ params }: { params: { lang: string } }) {
  const { lang } = params

  if (!supportedLanguages.includes(lang)) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <HeroStatic lang={lang} />
      <StatsSectionStatic lang={lang} />
      <FeaturedTutorialsStatic lang={lang} />
      <ToolsSectionStatic lang={lang} />
      <NewsletterSignupStatic lang={lang} />
    </div>
  )
}

export function generateStaticParams() {
  return supportedLanguages.map((lang) => ({
    lang,
  }))
}