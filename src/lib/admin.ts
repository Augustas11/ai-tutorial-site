// Simple admin authentication system
// In production, use proper admin authentication with database

export interface AdminUser {
  id: string
  email: string
  name: string
  role: 'admin'
  createdAt: Date
}

export interface UserWithStreak {
  id: string
  email: string
  name?: string
  isGuest: boolean
  language: string
  createdAt: Date
  lastActiveAt: Date
  streakData: {
    currentStreak: number
    longestStreak: number
    streakBonus: number
    isActive: boolean
  }
}

// Simple admin credentials (in production, use proper authentication)
const ADMIN_CREDENTIALS = {
  email: 'admin@ai-creator-school.com',
  password: 'admin123' // In production, use hashed passwords
}

export function validateAdminCredentials(email: string, password: string): boolean {
  return email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password
}

export function createAdminUser(email: string, name: string): AdminUser {
  return {
    id: `admin_${Date.now()}`,
    email,
    name,
    role: 'admin',
    createdAt: new Date()
  }
}
