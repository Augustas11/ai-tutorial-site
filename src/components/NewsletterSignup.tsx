import { Mail, CheckCircle } from 'lucide-react'

export default function NewsletterSignup() {
  return (
    <section className="py-16 bg-primary-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated with AI</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
            Get weekly tutorials, AI news, and exclusive resources delivered to your inbox.
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-l-lg border-0 focus:outline-none focus:ring-2 focus:ring-primary-300"
              />
              <button className="bg-primary-700 text-white px-6 py-3 rounded-r-lg hover:bg-primary-800 transition-colors font-medium">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-primary-200 mt-3">
              Join 100+ AI enthusiasts. No spam, unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}