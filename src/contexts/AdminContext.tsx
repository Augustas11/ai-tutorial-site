'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { AdminUser, validateAdminCredentials, createAdminUser } from '@/lib/admin'

interface AdminContextType {
  admin: AdminUser | null
  isAdminLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

interface AdminProviderProps {
  children: ReactNode
}

export function AdminProvider({ children }: AdminProviderProps) {
  const [admin, setAdmin] = useState<AdminUser | null>(null)
  const [isAdminLoading, setIsAdminLoading] = useState(true)

  useEffect(() => {
    // Check for stored admin session
    const storedAdmin = localStorage.getItem('adminUser')
    if (storedAdmin) {
      try {
        const adminData = JSON.parse(storedAdmin)
        setAdmin(adminData)
      } catch (error) {
        console.error('Failed to parse stored admin data:', error)
        localStorage.removeItem('adminUser')
      }
    }
    setIsAdminLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      if (validateAdminCredentials(email, password)) {
        const adminUser = createAdminUser(email, 'Admin User')
        setAdmin(adminUser)
        localStorage.setItem('adminUser', JSON.stringify(adminUser))
        return true
      }
      return false
    } catch (error) {
      console.error('Admin login error:', error)
      return false
    }
  }

  const logout = () => {
    setAdmin(null)
    localStorage.removeItem('adminUser')
  }

  return (
    <AdminContext.Provider value={{ admin, isAdminLoading, login, logout }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider')
  }
  return context
}
