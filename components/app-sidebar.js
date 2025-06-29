"use client"

import {
  BarChart3,
  Database,
  FileText,
  Heart,
  Home,
  MapPin,
  MessageSquare,
  Shield,
  Users,
  AlertTriangle,
  LogOut,
  Bot,
  HelpCircle,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { useAuth } from "./auth-provider"
import Link from "next/link"
import { Button } from "./ui/button"

const adminItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Survivor Stories", url: "/dashboard/survivor-stories", icon: FileText },
  { title: "Red Zone Mapping", url: "/dashboard/red-zone-mapping", icon: MapPin },
  { title: "Reports & Alerts", url: "/dashboard/reports", icon: AlertTriangle },
  { title: "Mission Dashboard", url: "/dashboard/missions", icon: Shield },
  { title: "Therapy Network", url: "/dashboard/therapy-network", icon: Heart },
  { title: "Database Management", url: "/dashboard/database", icon: Database },
  { title: "Analytics", url: "/dashboard/analytics", icon: BarChart3 },
]

const ngoItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Survivor Stories", url: "/dashboard/survivor-stories", icon: FileText },
  { title: "Red Zone Mapping", url: "/dashboard/red-zone-mapping", icon: MapPin },
  { title: "Submit Report", url: "/dashboard/submit-report", icon: MessageSquare },
  { title: "My Cases", url: "/dashboard/my-cases", icon: Users },
  { title: "Therapy Network", url: "/dashboard/therapy-network", icon: Heart },
]

const guestItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Survivor Stories", url: "/dashboard/survivor-stories", icon: FileText },
  { title: "Red Zone Mapping", url: "/dashboard/red-zone-mapping", icon: MapPin },
  { title: "Submit Report", url: "/dashboard/submit-report", icon: MessageSquare },
  { title: "AI Chat Support", url: "/dashboard/ai-chat", icon: Bot },
  { title: "Get Help", url: "/dashboard/get-help", icon: HelpCircle },
]

export function AppSidebar() {
  const { user, logout } = useAuth()

  const getItems = () => {
    switch (user?.role) {
      case "admin":
        return adminItems
      case "ngo":
        return ngoItems
      case "guest":
        return guestItems
      default:
        return guestItems
    }
  }

  const items = getItems()

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="px-2 py-2">
          <h2 className="text-lg font-semibold">Guardian Angel</h2>
          <p className="text-sm text-muted-foreground">{user?.organization || "Anti-Trafficking Platform"}</p>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-2">
          <Button variant="outline" className="w-full justify-start bg-transparent" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
