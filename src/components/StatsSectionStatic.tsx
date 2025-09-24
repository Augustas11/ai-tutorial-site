interface StatsSectionStaticProps {
  lang: string
}

export default function StatsSectionStatic({ lang }: StatsSectionStaticProps) {
  const isVietnamese = lang === 'vn'
  
  const stats = [
    {
      number: '10,000+',
      label: isVietnamese ? 'Người học tích cực' : 'Active Learners',
      description: isVietnamese ? 'Tham gia cộng đồng đang phát triển của chúng tôi' : 'Join our growing community'
    },
    {
      number: '100+',
      label: isVietnamese ? 'Hướng dẫn' : 'Tutorials',
      description: isVietnamese ? 'Hướng dẫn AI toàn diện' : 'Comprehensive AI guides'
    },
    {
      number: '50+',
      label: isVietnamese ? 'Công cụ AI' : 'AI Tools',
      description: isVietnamese ? 'Tài nguyên sẵn sàng sử dụng' : 'Ready-to-use resources'
    },
    {
      number: '95%',
      label: isVietnamese ? 'Tỷ lệ thành công' : 'Success Rate',
      description: isVietnamese ? 'Học viên có việc làm AI' : 'Students land AI jobs'
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">
                {stat.number}
              </div>
              <div className="text-xl font-semibold text-gray-900 mb-2">
                {stat.label}
              </div>
              <div className="text-gray-600">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
