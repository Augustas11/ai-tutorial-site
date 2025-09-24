import Link from 'next/link'
import { Clock, User, ArrowRight, BookOpen } from 'lucide-react'

export default function FeaturedTutorials() {
  const tutorials = [
    {
      id: 1,
      title: 'Getting Started with ChatGPT',
      description: 'Learn the fundamentals of prompt engineering and how to get the best results from ChatGPT.',
      category: 'Beginner',
      readTime: '5 min read',
      author: 'AI Expert',
      image: '/api/placeholder/400/250'
    },
    {
      id: 2,
      title: 'Building AI-Powered Web Apps',
      description: 'Create interactive web applications using AI APIs and modern frameworks.',
      category: 'Intermediate',
      readTime: '12 min read',
      author: 'Dev Team',
      image: '/api/placeholder/400/250'
    },
    {
      id: 3,
      title: 'Advanced Prompt Engineering',
      description: 'Master advanced techniques for creating complex, multi-step AI prompts.',
      category: 'Advanced',
      readTime: '8 min read',
      author: 'AI Expert',
      image: '/api/placeholder/400/250'
    }
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Beginner':
        return 'bg-green-100 text-green-800'
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800'
      case 'Advanced':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Tutorials</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start your AI journey with our most popular tutorials, designed for all skill levels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutorials.map((tutorial) => (
            <div key={tutorial.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                <BookOpen className="h-16 w-16 text-primary-600" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(tutorial.category)}`}>
                    {tutorial.category}
                  </span>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {tutorial.readTime}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{tutorial.title}</h3>
                <p className="text-gray-600 mb-4">{tutorial.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <User className="h-4 w-4 mr-1" />
                    {tutorial.author}
                  </div>
                  <Link
                    href={`/tutorials/${tutorial.id}`}
                    className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Read More
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/tutorials"
            className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
          >
            View All Tutorials
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  )
}