import React, { createContext, useContext, useState, useEffect } from "react"

type UserRole = "admin" | "ngo" | "guest" | null

interface User {
  id: string
  name: string
  email: string
  role: UserRole
  organization?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  loginAsGuest: () => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored auth
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication
    const mockUsers = [
      {
        id: "1",
        name: "Admin User",
        email: "admin@guardian.com",
        role: "admin" as UserRole,
      },
      {
        id: "2",
        name: "NGO Coordinator",
        email: "ngo@rescue.org",
        role: "ngo" as UserRole,
        organization: "Rescue International",
      },
    ]

    const foundUser = mockUsers.find((u) => u.email === email)
    if (foundUser && password === "password123") {
      setUser(foundUser)
      localStorage.setItem("user", JSON.stringify(foundUser))
      return true
    }
    return false
  }

  const loginAsGuest = async (): Promise<boolean> => {
    const guestUser = {
      id: "guest",
      name: "Guest User",
      email: "guest@platform.com",
      role: "guest" as UserRole,
    }
    setUser(guestUser)
    localStorage.setItem("user", JSON.stringify(guestUser))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, login, loginAsGuest, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
} 