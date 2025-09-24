'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User, UserSession, AuthContextType, SessionManager, UserStorage, createGuestUser, createUser } from '@/lib/auth'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<UserSession | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const sessionManager = SessionManager.getInstance()
  const userStorage = UserStorage.getInstance()

  // Initialize authentication on mount
  useEffect(() => {
    initializeAuth()
  }, [])

  const initializeAuth = async () => {
    try {
      setIsLoading(true)
      console.log('AuthContext: Initializing auth...')
      
      // Check for stored session
      const storedSessionId = localStorage.getItem('sessionId')
      const storedUserId = localStorage.getItem('userId')
      
      if (storedSessionId && storedUserId) {
        console.log('AuthContext: Found stored session', { storedSessionId, storedUserId })
        const activeSession = sessionManager.getSession(storedSessionId)
        if (activeSession && activeSession.userId === storedUserId) {
          const userData = userStorage.getUser(storedUserId)
          if (userData) {
            console.log('AuthContext: Restored user session', userData)
            setUser(userData)
            setSession(activeSession)
            sessionManager.updateLastActive(storedSessionId)
            return
          }
        }
      }
      
      // If no valid session, create guest user
      console.log('AuthContext: Creating guest user...')
      const guestUser = createGuestUser('en')
      userStorage.saveUser(guestUser)
      const guestSession = sessionManager.createSession(guestUser.id)
      
      console.log('AuthContext: Guest user created', guestUser)
      setUser(guestUser)
      setSession(guestSession)
      
      // Store in localStorage
      localStorage.setItem('userId', guestUser.id)
      localStorage.setItem('sessionId', guestSession.sessionId)
      
    } catch (error) {
      console.error('Failed to initialize auth:', error)
      // Fallback to guest user
      const guestUser = createGuestUser('en')
      userStorage.saveUser(guestUser)
      const guestSession = sessionManager.createSession(guestUser.id)
      
      setUser(guestUser)
      setSession(guestSession)
    } finally {
      console.log('AuthContext: Auth initialization complete')
      setIsLoading(false)
    }
  }

  const login = async (email: string, name?: string): Promise<User> => {
    try {
      // Check if user already exists
      let userData = userStorage.getUserByEmail(email)
      
      if (!userData) {
        // Create new user
        userData = createUser(email, name, 'en')
        userStorage.saveUser(userData)
      }
      
      // Create new session
      const newSession = sessionManager.createSession(userData.id)
      
      setUser(userData)
      setSession(newSession)
      
      // Store in localStorage
      localStorage.setItem('userId', userData.id)
      localStorage.setItem('sessionId', newSession.sessionId)
      
      return userData
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }

  const loginAsGuest = (language: 'en' | 'vn'): User => {
    const guestUser = createGuestUser(language)
    userStorage.saveUser(guestUser)
    const guestSession = sessionManager.createSession(guestUser.id)
    
    setUser(guestUser)
    setSession(guestSession)
    
    // Store in localStorage
    localStorage.setItem('userId', guestUser.id)
    localStorage.setItem('sessionId', guestSession.sessionId)
    
    return guestUser
  }

  const logout = () => {
    if (session) {
      sessionManager.invalidateSession(session.sessionId)
    }
    
    setUser(null)
    setSession(null)
    
    // Clear localStorage
    localStorage.removeItem('userId')
    localStorage.removeItem('sessionId')
  }

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = userStorage.updateUser(user.id, updates)
      if (updatedUser) {
        setUser(updatedUser)
      }
    }
  }

  const value: AuthContextType = {
    user,
    session,
    login,
    loginAsGuest,
    logout,
    updateUser,
    isLoading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
