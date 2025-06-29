import React from "react"
import { Link, useLocation } from "react-router-dom"
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
import { useAuth } from "./auth-provider"
import { Button } from "./ui/button"

const adminItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Survivor Stories",
    url: "/dashboard/survivor-stories",
    icon: FileText,
  },
  {
    title: "Red Zone Mapping",
    url: "/dashboard/red-zone-mapping",
    icon: MapPin,
  },
  {
    title: "Reports & Alerts",
    url: "/dashboard/reports",
    icon: AlertTriangle,
  },
  {
    title: "Mission Dashboard",
    url: "/dashboard/missions",
    icon: Shield,
  },
  {
    title: "Therapy Network",
    url: "/dashboard/therapy-network",
    icon: Heart,
  },
  {
    title: "Database Management",
    url: "/dashboard/database",
    icon: Database,
  },
  {
    title: "Analytics",
    url: "/dashboard/analytics",
    icon: BarChart3,
  },
]

const ngoItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Survivor Stories",
    url: "/dashboard/survivor-stories",
    icon: FileText,
  },
  {
    title: "Red Zone Mapping",
    url: "/dashboard/red-zone-mapping",
    icon: MapPin,
  },
  {
    title: "Submit Report",
    url: "/dashboard/submit-report",
    icon: MessageSquare,
  },
  {
    title: "My Cases",
    url: "/dashboard/my-cases",
    icon: Users,
  },
  {
    title: "Therapy Network",
    url: "/dashboard/therapy-network",
    icon: Heart,
  },
]

const guestItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Survivor Stories",
    url: "/dashboard/survivor-stories",
    icon: FileText,
  },
  {
    title: "Red Zone Mapping",
    url: "/dashboard/red-zone-mapping",
    icon: MapPin,
  },
  {
    title: "Submit Report",
    url: "/dashboard/submit-report",
    icon: MessageSquare,
  },
  {
    title: "AI Chat Support",
    url: "/dashboard/ai-chat",
    icon: Bot,
  },
  {
    title: "Get Help",
    url: "/dashboard/get-help",
    icon: HelpCircle,
  },
]

export function AppSidebar() {
  const { user, logout } = useAuth()
  const location = useLocation()
  
  const getItems = () => {
    switch (user?.role) {
      case "admin":
        return adminItems
      case "ngo":
        return ngoItems
      case "guest":
        return guestItems
      default:
        return []
    }
  }

  const items = getItems()

  return (
    <div className="w-64 bg-white border-r h-screen flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">ATP System</h2>
        <p className="text-sm text-gray-600">{user?.organization || "Anti-Trafficking Platform"}</p>
      </div>
      
      <div className="flex-1 p-4">
        <div className="space-y-2">
          {items.map((item) => (
            <Link
              key={item.title}
              to={item.url}
              className={`w-full flex items-center space-x-2 px-3 py-2 rounded-md text-left transition-colors ${
                location.pathname === item.url 
                  ? "bg-gray-900 text-white" 
                  : "hover:bg-gray-100"
              }`}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="p-4 border-t">
        <Button 
          variant="outline" 
          className="w-full justify-start bg-transparent" 
          onClick={logout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  )
} 