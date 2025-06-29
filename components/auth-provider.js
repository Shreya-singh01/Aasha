"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext(undefined)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored auth
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email, password) => {
    // Mock authentication with 3 user types
    const mockUsers = [
      {
        id: "1",
        name: "Admin User",
        email: "admin@guardian.com",
        role: "admin",
      },
      {
        id: "2",
        name: "NGO Coordinator",
        email: "ngo@rescue.org",
        role: "ngo",
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

  const loginAsGuest = () => {
    const guestUser = {
      id: "guest",
      name: "Guest User",
      email: "guest@platform.com",
      role: "guest",
    }
    setUser(guestUser)
    localStorage.setItem("user", JSON.stringify(guestUser))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider value={{ user, login, loginAsGuest, logout, isLoading }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
