'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'staff' | 'client'
  tenantId: number
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (token: string, user: User) => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('auth_token')
    const userRole = localStorage.getItem('user_role')
    const userName = localStorage.getItem('user_name')
    const userEmail = localStorage.getItem('user_email')
    const userId = localStorage.getItem('user_id')
    const tenantId = localStorage.getItem('tenant_id')

    if (token && userRole && userName && userEmail && userId && tenantId) {
      setUser({
        id: parseInt(userId),
        name: userName,
        email: userEmail,
        role: userRole as 'admin' | 'staff' | 'client',
        tenantId: parseInt(tenantId),
      })
    }
    setIsLoading(false)
  }, [])

  const login = (token: string, userData: User) => {
    localStorage.setItem('auth_token', token)
    localStorage.setItem('user_role', userData.role)
    localStorage.setItem('user_name', userData.name)
    localStorage.setItem('user_email', userData.email)
    localStorage.setItem('user_id', userData.id.toString())
    localStorage.setItem('tenant_id', userData.tenantId.toString())
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_role')
    localStorage.removeItem('user_name')
    localStorage.removeItem('user_email')
    localStorage.removeItem('user_id')
    localStorage.removeItem('tenant_id')
    setUser(null)
    router.push('/auth')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
