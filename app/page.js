"use client"

import { useAuth } from "@/components/auth-provider"
import { LandingPage } from "@/components/landing-page"
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

  return <LandingPage />
}
