"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { type User, getCurrentUser, saveUser, removeUser } from "@/lib/auth"

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing user on mount
    const existingUser = getCurrentUser()
    setUser(existingUser)
    setLoading(false)
  }, [])

  const login = (userData: User) => {
    setUser(userData)
    saveUser(userData)
  }

  const logout = () => {
    setUser(null)
    removeUser()
  }

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
