"use client"

import { useAuth } from "@/components/auth-provider"
import { LoginForm } from "@/components/login-form"
import { redirect } from "next/navigation"
import { useEffect } from "react"

export default function HomePage() {
  const { user, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && user) {
      redirect("/dashboard")
    }
  }, [user, isLoading])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Anti-Trafficking Platform</h1>
          <p className="text-gray-600">Comprehensive system for combating human trafficking</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
