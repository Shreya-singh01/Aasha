"use client"

import { useAuth } from "@/components/auth-provider"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { redirect } from "next/navigation"
import { useEffect } from "react"

export default function DashboardLayout({ children }) {
  const { user, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && !user) {
      redirect("/")
    }
  }, [user, isLoading])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const getRoleDisplayName = (role) => {
    switch (role) {
      case "admin":
        return "Administrator"
      case "ngo":
        return "NGO Coordinator"
      case "guest":
        return "Guest User"
      default:
        return "User"
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold">Guardian Angel Alliance</h1>
            <span className="text-sm text-muted-foreground">| {getRoleDisplayName(user.role)}</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-sm">{user.name}</span>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
