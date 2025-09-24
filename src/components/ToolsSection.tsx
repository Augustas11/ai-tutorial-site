import Link from 'next/link'
import { Wrench, Image, Code, Zap, ArrowRight } from 'lucide-react'

export default function ToolsSection() {
  const tools = [
    {
      id: 1,
      title: 'AI Prompt Builder',
      description: 'Create perfect prompts for any AI model with our interactive builder.',
      icon: Wrench,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 2,
      title: 'Image Generator',
      description: 'Generate stunning images using AI with our easy-to-use tool.',
      icon: Image,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      id: 3,
      title: 'Code Assistant',
      description: 'Get AI-powered code suggestions and debugging help.',
      icon: Code,
      color: 'bg-green-100 text-green-600'
    },
    {
      id: 4,
      title: 'Automation Hub',
      description: 'Discover and use pre-built AI automation workflows.',
      icon: Zap,
      color: 'bg-orange-100 text-orange-600'
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">AI Tools & Resources</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access powerful AI tools and resources to accelerate your learning and productivity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tools.map((tool) => {
            const Icon = tool.icon
            return (
              <div key={tool.id} className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className={`w-12 h-12 ${tool.color} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{tool.title}</h3>
                <p className="text-gray-600 mb-4">{tool.description}</p>
                <Link
                  href={`/tools/${tool.id}`}
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                >
                  Try Now
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/tools"
            className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Explore All Tools
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  )
}