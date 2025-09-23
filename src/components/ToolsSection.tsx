import Link from 'next/link'
import { Wrench, Image, Code, Zap, ArrowRight } from 'lucide-react'

const tools = [
  {
    id: 1,
    title: 'AI Prompt Builder',
    description: 'Create perfect prompts for any AI model with our interactive builder.',
    icon: Wrench,
    href: '/tools/prompt-builder',
    color: 'bg-blue-100 text-blue-600'
  },
  {
    id: 2,
    title: 'Image Generator',
    description: 'Generate stunning images using AI with our easy-to-use tool.',
    icon: Image,
    href: '/tools/image-generator',
    color: 'bg-purple-100 text-purple-600'
  },
  {
    id: 3,
    title: 'Code Assistant',
    description: 'Get AI-powered code suggestions and debugging help.',
    icon: Code,
    href: '/tools/code-assistant',
    color: 'bg-green-100 text-green-600'
  },
  {
    id: 4,
    title: 'Automation Hub',
    description: 'Discover and use pre-built AI automation workflows.',
    icon: Zap,
    href: '/tools/automation-hub',
    color: 'bg-orange-100 text-orange-600'
  }
]

export default function ToolsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            AI Tools & Resources
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Access powerful AI tools and resources to accelerate your learning and productivity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon
            return (
              <Link
                key={tool.id}
                href={tool.href}
                className="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-primary-300 transition-all duration-200"
              >
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg ${tool.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {tool.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4">
                  {tool.description}
                </p>
                
                <div className="flex items-center text-primary-600 font-medium text-sm group-hover:text-primary-700">
                  Try Now
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/tools"
            className="inline-flex items-center px-6 py-3 border border-primary-600 text-primary-600 font-semibold rounded-lg hover:bg-primary-600 hover:text-white transition-colors"
          >
            Explore All Tools
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  )
}