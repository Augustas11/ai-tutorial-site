'use client'

import { Users, BookOpen, Zap, Award } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function StatsSection() {
  const { t } = useLanguage()

  const stats = [
    {
      icon: Users,
      value: '10,000+',
      label: t('stats.learners'),
      description: t('stats.learnersDesc')
    },
    {
      icon: BookOpen,
      value: '100+',
      label: t('stats.tutorials'),
      description: t('stats.tutorialsDesc')
    },
    {
      icon: Zap,
      value: '50+',
      label: t('stats.tools'),
      description: t('stats.toolsDesc')
    },
    {
      icon: Award,
      value: '95%',
      label: t('stats.success'),
      description: t('stats.successDesc')
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary-100 rounded-full">
                    <Icon className="h-6 w-6 text-primary-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-lg font-semibold text-gray-700 mb-1">{stat.label}</div>
                <div className="text-sm text-gray-500">{stat.description}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}