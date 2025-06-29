"use client"

import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Users, MapPin, Heart, TrendingUp, Shield, Bot, HelpCircle } from "lucide-react"

export default function DashboardPage() {
  const { user } = useAuth()

  const getStatsForRole = () => {
    switch (user?.role) {
      case "admin":
        return [
          { title: "Active Cases", value: "127", description: "Currently being tracked", icon: Users, trend: "+12%" },
          { title: "Red Zones", value: "23", description: "High-risk areas identified", icon: MapPin, trend: "+3" },
          {
            title: "Survivors Helped",
            value: "1,847",
            description: "Total since platform launch",
            icon: Heart,
            trend: "+156",
          },
          {
            title: "Active Missions",
            value: "8",
            description: "Ongoing rescue operations",
            icon: Shield,
            trend: "2 completed today",
          },
        ]
      case "ngo":
        return [
          {
            title: "My Cases",
            value: "34",
            description: "Cases assigned to your organization",
            icon: Users,
            trend: "+5 this week",
          },
          {
            title: "Pending Reports",
            value: "7",
            description: "Reports awaiting review",
            icon: AlertTriangle,
            trend: "2 urgent",
          },
          {
            title: "Therapy Sessions",
            value: "89",
            description: "Sessions completed this month",
            icon: Heart,
            trend: "+23%",
          },
          {
            title: "Success Rate",
            value: "94%",
            description: "Successful interventions",
            icon: TrendingUp,
            trend: "+2%",
          },
        ]
      case "guest":
        return [
          {
            title: "Resources Available",
            value: "1,200+",
            description: "Help resources and guides",
            icon: HelpCircle,
            trend: "Updated daily",
          },
          {
            title: "Support Channels",
            value: "24/7",
            description: "Always available assistance",
            icon: Bot,
            trend: "Instant response",
          },
          {
            title: "Safe Locations",
            value: "150+",
            description: "Verified safe houses nearby",
            icon: MapPin,
            trend: "Real-time updates",
          },
          {
            title: "Success Stories",
            value: "500+",
            description: "Inspiring survivor journeys",
            icon: Heart,
            trend: "New stories weekly",
          },
        ]
      default:
        return []
    }
  }

  const getRecentAlerts = () => {
    switch (user?.role) {
      case "admin":
        return [
          {
            id: 1,
            type: "High Priority",
            message: "Suspicious activity reported in Zone 7",
            time: "2 minutes ago",
            status: "active",
          },
          {
            id: 2,
            type: "Rescue Update",
            message: "Operation Delta completed successfully",
            time: "1 hour ago",
            status: "completed",
          },
          {
            id: 3,
            type: "New Report",
            message: "Anonymous tip received via WhatsApp",
            time: "3 hours ago",
            status: "pending",
          },
        ]
      case "ngo":
        return [
          {
            id: 1,
            type: "Case Update",
            message: "Survivor SUR-001 therapy session completed",
            time: "30 minutes ago",
            status: "completed",
          },
          {
            id: 2,
            type: "New Assignment",
            message: "Case CASE-045 assigned to your team",
            time: "2 hours ago",
            status: "active",
          },
          {
            id: 3,
            type: "Report Review",
            message: "Report RPT-123 requires your attention",
            time: "4 hours ago",
            status: "pending",
          },
        ]
      case "guest":
        return [
          {
            id: 1,
            type: "Safety Alert",
            message: "New safe location added in your area",
            time: "1 hour ago",
            status: "active",
          },
          {
            id: 2,
            type: "Resource Update",
            message: "New support resources available",
            time: "3 hours ago",
            status: "completed",
          },
          {
            id: 3,
            type: "Success Story",
            message: "New survivor story published",
            time: "6 hours ago",
            status: "completed",
          },
        ]
      default:
        return []
    }
  }

  const getQuickActions = () => {
    switch (user?.role) {
      case "admin":
        return [
          { icon: AlertTriangle, text: "Review Pending Reports", href: "/dashboard/reports" },
          { icon: MapPin, text: "Update Red Zone Map", href: "/dashboard/red-zone-mapping" },
          { icon: Users, text: "Assign New Case", href: "/dashboard/database" },
        ]
      case "ngo":
        return [
          { icon: AlertTriangle, text: "Submit New Report", href: "/dashboard/submit-report" },
          { icon: Heart, text: "Schedule Therapy Session", href: "/dashboard/therapy-network" },
          { icon: Users, text: "Update Case Status", href: "/dashboard/my-cases" },
        ]
      case "guest":
        return [
          { icon: AlertTriangle, text: "Submit Report", href: "/dashboard/submit-report" },
          { icon: Bot, text: "Chat with AI Support", href: "/dashboard/ai-chat" },
          { icon: HelpCircle, text: "Get Immediate Help", href: "/dashboard/get-help" },
        ]
      default:
        return []
    }
  }

  const stats = getStatsForRole()
  const recentAlerts = getRecentAlerts()
  const quickActions = getQuickActions()

  const getWelcomeMessage = () => {
    switch (user?.role) {
      case "admin":
        return "Here's an overview of the platform's current status."
      case "ngo":
        return "Here's your organization's current activity summary."
      case "guest":
        return "Access resources, submit reports, and get help safely."
      default:
        return "Welcome to the platform."
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name}</h1>
        <p className="text-muted-foreground">{getWelcomeMessage()}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
              <div className="mt-2">
                <Badge variant="secondary" className="text-xs">
                  {stat.trend}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent {user?.role === "guest" ? "Updates" : "Alerts"}</CardTitle>
            <CardDescription>Latest system notifications and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="flex items-center space-x-4">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          alert.status === "active"
                            ? "destructive"
                            : alert.status === "completed"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {alert.type}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{alert.time}</span>
                    </div>
                    <p className="text-sm">{alert.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used platform features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              {quickActions.map((action, index) => (
                <Button key={index} variant="ghost" className="justify-start h-auto p-3" asChild>
                  <a href={action.href} className="flex items-center space-x-2">
                    <action.icon className="h-4 w-4" />
                    <span>{action.text}</span>
                  </a>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {user?.role === "guest" && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-900">Need Immediate Help?</CardTitle>
            <CardDescription className="text-blue-700">
              If you're in immediate danger, contact emergency services. For non-emergency support, use our resources
              below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-3">
              <Button className="bg-red-600 hover:bg-red-700 text-white">Emergency: 911</Button>
              <Button variant="outline" asChild>
                <a href="/dashboard/ai-chat">Chat with AI Support</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/dashboard/get-help">Find Local Resources</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
