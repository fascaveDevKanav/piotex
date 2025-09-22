// Authentication utilities for localStorage-based auth
export interface User {
  id: string
  name: string
  email: string
  createdAt: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

// Get current user from localStorage
export const getCurrentUser = (): User | null => {
  if (typeof window === "undefined") return null

  const userData = localStorage.getItem("user")
  return userData ? JSON.parse(userData) : null
}

// Save user to localStorage
export const saveUser = (user: User): void => {
  localStorage.setItem("user", JSON.stringify(user))
}

// Remove user from localStorage
export const removeUser = (): void => {
  localStorage.removeItem("user")
}

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null
}

// Login function
export const login = (email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> => {
  return new Promise((resolve) => {
    // Simulate API call delay
    setTimeout(() => {
      // Check if user exists in localStorage (for demo purposes)
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]")
      const user = existingUsers.find((u: any) => u.email === email && u.password === password)

      if (user) {
        const { password: _, ...userWithoutPassword } = user
        saveUser(userWithoutPassword)
        resolve({ success: true, user: userWithoutPassword })
      } else {
        resolve({ success: false, error: "Invalid email or password" })
      }
    }, 1000)
  })
}

// Signup function
export const signup = (
  name: string,
  email: string,
  password: string,
): Promise<{ success: boolean; user?: User; error?: string }> => {
  return new Promise((resolve) => {
    // Simulate API call delay
    setTimeout(() => {
      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]")
      const userExists = existingUsers.find((u: any) => u.email === email)

      if (userExists) {
        resolve({ success: false, error: "User already exists with this email" })
        return
      }

      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        createdAt: new Date().toISOString(),
      }

      // Save to users array (for login validation)
      const userWithPassword = { ...newUser, password }
      existingUsers.push(userWithPassword)
      localStorage.setItem("users", JSON.stringify(existingUsers))

      // Save current user
      saveUser(newUser)
      resolve({ success: true, user: newUser })
    }, 1000)
  })
}

// Logout function
export const logout = (): void => {
  removeUser()
}
