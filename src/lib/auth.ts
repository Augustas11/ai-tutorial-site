// User authentication utilities and types

export interface User {
  id: string
  email: string
  name?: string
  avatar?: string
  language: 'en' | 'vn'
  createdAt: Date
  lastActiveAt: Date
  isGuest: boolean
  preferences: {
    streakNotifications: boolean
    achievementSharing: boolean
    publicProfile: boolean
  }
}

export interface UserSession {
  userId: string
  sessionId: string
  expiresAt: Date
  isActive: boolean
}

// Generate a unique user ID
export function generateUserId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// Generate a session ID
export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// Create a guest user
export function createGuestUser(language: 'en' | 'vn' = 'en'): User {
  return {
    id: generateUserId(),
    email: '',
    name: 'Guest User',
    language,
    createdAt: new Date(),
    lastActiveAt: new Date(),
    isGuest: true,
    preferences: {
      streakNotifications: true,
      achievementSharing: false,
      publicProfile: false
    }
  }
}

// Create a registered user
export function createUser(email: string, name?: string, language: 'en' | 'vn' = 'en'): User {
  return {
    id: generateUserId(),
    email,
    name: name || email.split('@')[0],
    language,
    createdAt: new Date(),
    lastActiveAt: new Date(),
    isGuest: false,
    preferences: {
      streakNotifications: true,
      achievementSharing: true,
      publicProfile: true
    }
  }
}

// Session management
export class SessionManager {
  private static instance: SessionManager
  private sessions: Map<string, UserSession> = new Map()

  static getInstance(): SessionManager {
    if (!SessionManager.instance) {
      SessionManager.instance = new SessionManager()
    }
    return SessionManager.instance
  }

  createSession(userId: string): UserSession {
    const session: UserSession = {
      userId,
      sessionId: generateSessionId(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      isActive: true
    }
    
    this.sessions.set(session.sessionId, session)
    return session
  }

  getSession(sessionId: string): UserSession | null {
    const session = this.sessions.get(sessionId)
    if (!session || !session.isActive || session.expiresAt < new Date()) {
      this.sessions.delete(sessionId)
      return null
    }
    return session
  }

  invalidateSession(sessionId: string): void {
    const session = this.sessions.get(sessionId)
    if (session) {
      session.isActive = false
      this.sessions.delete(sessionId)
    }
  }

  updateLastActive(sessionId: string): void {
    const session = this.sessions.get(sessionId)
    if (session) {
      session.expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // Extend session
    }
  }
}

// User storage (in production, this would be a database)
export class UserStorage {
  private static instance: UserStorage
  private users: Map<string, User> = new Map()

  static getInstance(): UserStorage {
    if (!UserStorage.instance) {
      UserStorage.instance = new UserStorage()
    }
    return UserStorage.instance
  }

  saveUser(user: User): void {
    this.users.set(user.id, user)
  }

  getUser(userId: string): User | null {
    return this.users.get(userId) || null
  }

  getUserByEmail(email: string): User | null {
    const usersArray = Array.from(this.users.values())
    for (let i = 0; i < usersArray.length; i++) {
      const user = usersArray[i]
      if (user.email === email) {
        return user
      }
    }
    return null
  }

  updateUser(userId: string, updates: Partial<User>): User | null {
    const user = this.users.get(userId)
    if (user) {
      const updatedUser = { ...user, ...updates, lastActiveAt: new Date() }
      this.users.set(userId, updatedUser)
      return updatedUser
    }
    return null
  }

  deleteUser(userId: string): boolean {
    return this.users.delete(userId)
  }

  // Activity tracking methods
  recordActivity(userId: string, activityType: string, pointsEarned: number = 0): void {
    const user = this.users.get(userId)
    if (user) {
      // For now, we'll just update the lastActiveAt timestamp
      // In a real app, you'd store this in a separate activities table
      user.lastActiveAt = new Date()
      this.users.set(userId, user)
    }
  }

  getUserActivities(userId: string): Date[] {
    const user = this.users.get(userId)
    if (!user) return []
    
    // For now, return a simple array with the last active date
    // In a real app, you'd query the activities table
    return user.lastActiveAt ? [user.lastActiveAt] : []
  }
}

// Authentication context for React components
export interface AuthContextType {
  user: User | null
  session: UserSession | null
  login: (email: string, name?: string) => Promise<User>
  loginAsGuest: (language: 'en' | 'vn') => User
  logout: () => void
  updateUser: (updates: Partial<User>) => void
  isLoading: boolean
}

// Helper functions for client-side usage
export function getStoredUserId(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('userId')
}

export function setStoredUserId(userId: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('userId', userId)
}

export function getStoredSessionId(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('sessionId')
}

export function setStoredSessionId(sessionId: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('sessionId', sessionId)
}

export function clearStoredAuth(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem('userId')
  localStorage.removeItem('sessionId')
}
