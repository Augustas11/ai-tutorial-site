import Link from 'next/link'
import { ArrowRight, Wrench, Image, Code, Zap } from 'lucide-react'

interface ToolsSectionStaticProps {
  lang: string
}

export default function ToolsSectionStatic({ lang }: ToolsSectionStaticProps) {
  const isVietnamese = lang === 'vn'
  
  const content = {
    en: {
      title: 'AI Tools & Resources',
      description: 'Access powerful AI tools and resources to accelerate your learning and productivity.',
      tryNow: 'Try Now',
      exploreAll: 'Explore All Tools'
    },
    vn: {
      title: 'Công cụ & Tài nguyên AI',
      description: 'Truy cập các công cụ và tài nguyên AI mạnh mẽ để tăng tốc việc học và năng suất của bạn.',
      tryNow: 'Thử ngay',
      exploreAll: 'Khám phá tất cả công cụ'
    }
  }

  const tools = [
    {
      id: 1,
      title: isVietnamese ? 'Trình tạo Prompt AI' : 'AI Prompt Builder',
      description: isVietnamese 
        ? 'Tạo prompt hoàn hảo cho bất kỳ mô hình AI nào với trình tạo tương tác của chúng tôi.'
        : 'Create perfect prompts for any AI model with our interactive builder.',
      icon: Wrench,
      href: `/${lang}/tools/prompt-builder`
    },
    {
      id: 2,
      title: isVietnamese ? 'Trình tạo hình ảnh' : 'Image Generator',
      description: isVietnamese 
        ? 'Tạo hình ảnh tuyệt đẹp bằng AI với công cụ dễ sử dụng của chúng tôi.'
        : 'Generate stunning images using AI with our easy-to-use tool.',
      icon: Image,
      href: `/${lang}/tools/image-generator`
    },
    {
      id: 3,
      title: isVietnamese ? 'Trợ lý mã' : 'Code Assistant',
      description: isVietnamese 
        ? 'Nhận gợi ý mã và trợ giúp debug được hỗ trợ bởi AI.'
        : 'Get AI-powered code suggestions and debugging help.',
      icon: Code,
      href: `/${lang}/tools/code-assistant`
    },
    {
      id: 4,
      title: isVietnamese ? 'Trung tâm tự động hóa' : 'Automation Hub',
      description: isVietnamese 
        ? 'Khám phá và sử dụng các quy trình tự động hóa AI có sẵn.'
        : 'Discover and use pre-built AI automation workflows.',
      icon: Zap,
      href: `/${lang}/tools/automation`
    }
  ]

  const t = content[isVietnamese ? 'vn' : 'en']

  return (
    <section id="tools" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {tools.map((tool) => {
            const Icon = tool.icon
            return (
              <div key={tool.id} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-center w-12 h-12 bg-primary-100 text-primary-600 rounded-lg mb-4">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {tool.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {tool.description}
                </p>
                <Link
                  href={tool.href}
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                >
                  {t.tryNow}
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            )
          })}
        </div>

        <div className="text-center">
          <Link
            href={`/${lang}/tools`}
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
          >
            {t.exploreAll}
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  )
}
