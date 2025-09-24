'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import SignInModal from '@/components/SignInModal'

export default function TestAuthPage() {
  const { user, session, login, loginAsGuest, logout, isLoading } = useAuth()
  const [showModal, setShowModal] = useState(false)

  const handleLogin = async (email: string, name?: string) => {
    try {
      console.log('Test page: Attempting login', { email, name })
      const userData = await login(email, name)
      console.log('Test page: Login successful', userData)
      setShowModal(false)
    } catch (error) {
      console.error('Test page: Login failed', error)
    }
  }

  const handleGuestLogin = () => {
    console.log('Test page: Guest login')
    loginAsGuest('en')
    setShowModal(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Authentication Test Page</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Current State</h2>
          <div className="space-y-2 text-sm">
            <p><strong>Loading:</strong> {isLoading ? 'Yes' : 'No'}</p>
            <p><strong>User:</strong> {user ? `${user.email || 'Guest'} (${user.isGuest ? 'Guest' : 'Registered'})` : 'None'}</p>
            <p><strong>User ID:</strong> {user?.id || 'None'}</p>
            <p><strong>Session:</strong> {session ? session.sessionId.substring(0, 8) + '...' : 'None'}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Actions</h2>
          <div className="space-y-4">
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Open Sign-In Modal
            </button>
            
            <button
              onClick={handleGuestLogin}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-4"
            >
              Guest Login
            </button>
            
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-4"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Direct Login Test</h2>
          <form onSubmit={async (e) => {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)
            const email = formData.get('email') as string
            const name = formData.get('name') as string
            await handleLogin(email, name)
          }}>
            <div className="space-y-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full px-3 py-2 border rounded text-gray-900 placeholder-gray-500"
                required
              />
              <input
                type="text"
                name="name"
                placeholder="Name (optional)"
                className="w-full px-3 py-2 border rounded text-gray-900 placeholder-gray-500"
              />
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Direct Login
              </button>
            </div>
          </form>
        </div>
      </div>

      <SignInModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        lang="en"
        title="Test Sign-In Modal"
        subtitle="Testing the sign-in modal functionality"
      />
    </div>
  )
}
