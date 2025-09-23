import Hero from '@/components/Hero'
import FeaturedTutorials from '@/components/FeaturedTutorials'
import ToolsSection from '@/components/ToolsSection'
import NewsletterSignup from '@/components/NewsletterSignup'
import StatsSection from '@/components/StatsSection'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <StatsSection />
      <FeaturedTutorials />
      <ToolsSection />
      <NewsletterSignup />
    </div>
  )
}