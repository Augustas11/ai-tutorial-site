import { Users, BookOpen, Zap, Award } from 'lucide-react'

const stats = [
  {
    icon: Users,
    value: '10,000+',
    label: 'Active Learners',
    description: 'Join our growing community'
  },
  {
    icon: BookOpen,
    value: '100+',
    label: 'Tutorials',
    description: 'Comprehensive AI guides'
  },
  {
    icon: Zap,
    value: '50+',
    label: 'AI Tools',
    description: 'Ready-to-use resources'
  },
  {
    icon: Award,
    value: '95%',
    label: 'Success Rate',
    description: 'Students land AI jobs'
  }
]

export default function StatsSection() {
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
                    <Icon className="h-8 w-8 text-primary-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-gray-700 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-500">
                  {stat.description}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}