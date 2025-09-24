import Link from 'next/link'
import { Clock, User, ArrowRight } from 'lucide-react'

interface FeaturedTutorialsStaticProps {
  lang: string
}

export default function FeaturedTutorialsStatic({ lang }: FeaturedTutorialsStaticProps) {
  const isVietnamese = lang === 'vn'
  
  const content = {
    en: {
      title: 'Featured Tutorials',
      description: 'Start your AI journey with our most popular tutorials, designed for all skill levels.',
      viewAll: 'View All Tutorials',
      readMore: 'Read More',
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
      minRead: 'min read',
      author: 'AI Expert'
    },
    vn: {
      title: 'Hướng dẫn nổi bật',
      description: 'Bắt đầu hành trình AI của bạn với các hướng dẫn phổ biến nhất, được thiết kế cho mọi cấp độ kỹ năng.',
      viewAll: 'Xem tất cả hướng dẫn',
      readMore: 'Đọc thêm',
      beginner: 'Người mới bắt đầu',
      intermediate: 'Trung cấp',
      advanced: 'Nâng cao',
      minRead: 'phút đọc',
      author: 'Chuyên gia AI'
    }
  }

  const tutorials = [
    {
      id: 1,
      title: isVietnamese ? 'Bắt đầu với ChatGPT' : 'Getting Started with ChatGPT',
      description: isVietnamese 
        ? 'Học những điều cơ bản về kỹ thuật prompt và cách có được kết quả tốt nhất từ ChatGPT.'
        : 'Learn the fundamentals of prompt engineering and how to get the best results from ChatGPT.',
      category: isVietnamese ? 'Người mới bắt đầu' : 'Beginner',
      readTime: '5',
      author: isVietnamese ? 'Chuyên gia AI' : 'AI Expert',
      image: '/api/placeholder/400/250'
    },
    {
      id: 2,
      title: isVietnamese ? 'Xây dựng ứng dụng web AI' : 'Building AI-Powered Web Apps',
      description: isVietnamese 
        ? 'Tạo các ứng dụng web tương tác sử dụng AI APIs và các framework hiện đại.'
        : 'Create interactive web applications using AI APIs and modern frameworks.',
      category: isVietnamese ? 'Trung cấp' : 'Intermediate',
      readTime: '12',
      author: isVietnamese ? 'Đội phát triển' : 'Dev Team',
      image: '/api/placeholder/400/250'
    },
    {
      id: 3,
      title: isVietnamese ? 'Kỹ thuật Prompt nâng cao' : 'Advanced Prompt Engineering',
      description: isVietnamese 
        ? 'Thành thạo các kỹ thuật nâng cao để tạo ra các prompt AI phức tạp, nhiều bước.'
        : 'Master advanced techniques for creating complex, multi-step AI prompts.',
      category: isVietnamese ? 'Nâng cao' : 'Advanced',
      readTime: '8',
      author: isVietnamese ? 'Chuyên gia AI' : 'AI Expert',
      image: '/api/placeholder/400/250'
    }
  ]

  const t = content[isVietnamese ? 'vn' : 'en']

  return (
    <section id="tutorials" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {tutorials.map((tutorial) => (
            <div key={tutorial.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-primary-100 to-blue-100 flex items-center justify-center">
                <div className="text-6xl">🤖</div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded-full">
                    {tutorial.category}
                  </span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    {tutorial.readTime} {t.minRead}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {tutorial.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {tutorial.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <User className="h-4 w-4 mr-2" />
                    {tutorial.author}
                  </div>
                  <Link
                    href={`/${lang}/tutorials/${tutorial.id}`}
                    className="text-primary-600 hover:text-primary-700 font-medium flex items-center"
                  >
                    {t.readMore}
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href={`/${lang}/tutorials`}
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
          >
            {t.viewAll}
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  )
}
