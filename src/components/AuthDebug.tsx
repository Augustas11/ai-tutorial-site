'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useState } from 'react'
import SignInModal from './SignInModal'

export default function AuthDebug() {
  const { user, session, login, loginAsGuest, logout, isLoading } = useAuth()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [showSignInModal, setShowSignInModal] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      if (!email.trim()) {
        throw new Error('Please enter your email')
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        throw new Error('Please enter a valid email')
      }

      console.log('Attempting login with:', { email, name })
      const userData = await login(email.trim(), name.trim() || undefined)
      console.log('Login successful:', userData)
    } catch (err) {
      console.error('Login error:', err)
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGuestLogin = () => {
    console.log('Attempting guest login')
    const guestUser = loginAsGuest('en')
    console.log('Guest login successful:', guestUser)
  }

  const handleLogout = () => {
    console.log('Logging out')
    logout()
  }

  return (
    <div className="fixed top-4 right-4 bg-white p-4 border rounded-lg shadow-lg z-50 max-w-sm">
      <h3 className="font-bold mb-2">Auth Debug</h3>
      
      <div className="text-xs mb-4">
        <p><strong>Loading:</strong> {isLoading ? 'Yes' : 'No'}</p>
        <p><strong>User:</strong> {user ? `${user.email || 'Guest'} (${user.isGuest ? 'Guest' : 'Registered'})` : 'None'}</p>
        <p><strong>User ID:</strong> {user?.id || 'None'}</p>
        <p><strong>Session:</strong> {session ? session.sessionId.substring(0, 8) + '...' : 'None'}</p>
        <p><strong>User Object:</strong> {JSON.stringify(user, null, 2)}</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-2 mb-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full px-2 py-1 border rounded text-xs text-gray-900 placeholder-gray-500"
          required
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name (optional)"
          className="w-full px-2 py-1 border rounded text-xs text-gray-900 placeholder-gray-500"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 text-white py-1 px-2 rounded text-xs disabled:opacity-50"
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div className="space-y-1">
        <button
          onClick={() => setShowSignInModal(true)}
          className="w-full bg-green-500 text-white py-1 px-2 rounded text-xs"
        >
          Test Sign-In Modal
        </button>
        <button
          onClick={handleGuestLogin}
          className="w-full bg-gray-500 text-white py-1 px-2 rounded text-xs"
        >
          Guest Login
        </button>
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-1 px-2 rounded text-xs"
        >
          Logout
        </button>
      </div>
      
      <SignInModal
        isOpen={showSignInModal}
        onClose={() => setShowSignInModal(false)}
        lang="en"
        title="Test Sign-In Modal"
        subtitle="Testing the sign-in modal functionality"
      />

      {error && (
        <div className="text-red-500 text-xs mt-2">
          {error}
        </div>
      )}
    </div>
  )
}
