import Link from 'next/link'
import { ArrowRight, Play, Star } from 'lucide-react'

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-primary-50 to-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-1 bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-sm font-medium">
              <Star className="h-4 w-4" />
              <span>Join 10,000+ AI learners</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Master AI with
            <span className="text-primary-600"> Practical Examples</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Learn artificial intelligence through hands-on tutorials, ready-to-use prompts, 
            and powerful automation tools. From beginner to expert, we've got you covered.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/tutorials"
              className="bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 transition-colors flex items-center space-x-2"
            >
              <span>Start Learning</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            
            <Link
              href="/demo"
              className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors flex items-center space-x-2"
            >
              <Play className="h-5 w-5" />
              <span>Watch Demo</span>
            </Link>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">100+</div>
              <div className="text-gray-600">Tutorials</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">50+</div>
              <div className="text-gray-600">AI Tools</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">10K+</div>
              <div className="text-gray-600">Students</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}