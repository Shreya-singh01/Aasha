"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, Clock, MapPin, User, Phone, Camera, MessageSquare } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

interface Report {
  id: string
  type: "photo" | "whatsapp" | "web" | "phone"
  status: "pending" | "verified" | "investigating" | "resolved" | "false_alarm"
  priority: "low" | "medium" | "high" | "critical"
  submittedAt: string
  location: string
  description: string
  submitterInfo: {
    anonymous: boolean
    contact?: string
  }
  assignedTo?: string
  evidence: string[]
  aiConfidence?: number
}

const mockReports: Report[] = [
  {
    id: "RPT-001",
    type: "photo",
    status: "pending",
    priority: "high",
    submittedAt: "2024-01-15T14:30:00Z",
    location: "Downtown District 7, Mumbai",
    description: "Suspicious activity near transport hub. Multiple young individuals appearing distressed.",
    submitterInfo: { anonymous: true },
    evidence: ["photo_001.jpg", "location_metadata.json"],
    aiConfidence: 87,
  },
  {
    id: "RPT-002",
    type: "whatsapp",
    status: "investigating",
    priority: "critical",
    submittedAt: "2024-01-15T12:15:00Z",
    location: "Port Area East, Mumbai",
    description: "Urgent: Witnessed forced labor at shipping container facility. Multiple victims identified.",
    submitterInfo: { anonymous: false, contact: "+91-XXXX-XXXX" },
    assignedTo: "Team Alpha",
    evidence: ["whatsapp_conversation.txt", "audio_recording.mp3"],
    aiConfidence: 94,
  },
  {
    id: "RPT-003",
    type: "web",
    status: "verified",
    priority: "medium",
    submittedAt: "2024-01-14T18:45:00Z",
    location: "Industrial Zone North, Mumbai",
    description: "Report of underage workers in textile factory. Working conditions appear unsafe.",
    submitterInfo: { anonymous: true },
    assignedTo: "NGO Rescue International",
    evidence: ["web_form_submission.json"],
    aiConfidence: 72,
  },
  {
    id: "RPT-004",
    type: "phone",
    status: "resolved",
    priority: "high",
    submittedAt: "2024-01-13T09:20:00Z",
    location: "Suburban Area West, Mumbai",
    description: "Domestic servitude case. Victim successfully rescued and provided support.",
    submitterInfo: { anonymous: false, contact: "hotline@rescue.org" },
    assignedTo: "Team Delta",
    evidence: ["call_recording.mp3", "rescue_report.pdf"],
  },
]

export default function ReportsPage() {
  const { user } = useAuth()
  const [reports, setReports] = useState<Report[]>(mockReports)
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterPriority, setFilterPriority] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || report.status === filterStatus
    const matchesPriority = filterPriority === "all" || report.priority === filterPriority
    return matchesSearch && matchesStatus && matchesPriority
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "default"
      case "verified":
        return "secondary"
      case "investigating":
        return "default"
      case "resolved":
        return "secondary"
      case "false_alarm":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "destructive"
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "photo":
        return Camera
      case "whatsapp":
        return MessageSquare
      case "phone":
        return Phone
      case "web":
        return AlertTriangle
      default:
        return AlertTriangle
    }
  }

  const pendingReports = reports.filter((r) => r.status === "pending").length
  const highPriorityReports = reports.filter((r) => r.priority === "high" || r.priority === "critical").length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports & Alerts</h1>
        <p className="text-muted-foreground">Multichannel tip submission and AI-powered report triage system</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reports.length}</div>
            <p className="text-xs text-muted-foreground">All time submissions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingReports}</div>
            <p className="text-xs text-muted-foreground">Awaiting verification</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{highPriorityReports}</div>
            <p className="text-xs text-muted-foreground">Urgent attention needed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18m</div>
            <p className="text-xs text-muted-foreground">Average response time</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4 items-center flex-wrap">
        <Input
          placeholder="Search reports..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="verified">Verified</SelectItem>
            <SelectItem value="investigating">Investigating</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="false_alarm">False Alarm</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterPriority} onValueChange={setFilterPriority}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {filteredReports.map((report) => {
          const TypeIcon = getTypeIcon(report.type)
          return (
            <Card
              key={report.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedReport(report)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <TypeIcon className="h-5 w-5" />
                    <div>
                      <CardTitle className="text-lg">{report.id}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <MapPin className="h-3 w-3" />
                        {report.location}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={getPriorityColor(report.priority)}>{report.priority.toUpperCase()}</Badge>
                    <Badge variant={getStatusColor(report.status)}>
                      {report.status.replace("_", " ").toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{report.description}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span>Submitted: {new Date(report.submittedAt).toLocaleString()}</span>
                    {report.aiConfidence && <span>AI Confidence: {report.aiConfidence}%</span>}
                    {report.assignedTo && <span>Assigned: {report.assignedTo}</span>}
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-3 w-3" />
                    <span>{report.submitterInfo.anonymous ? "Anonymous" : "Identified"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {selectedReport && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedReport(null)}
        >
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Report Details - {selectedReport.id}</CardTitle>
                <Button variant="ghost" onClick={() => setSelectedReport(null)}>
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Report Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex gap-2">
                        <Badge variant={getPriorityColor(selectedReport.priority)}>
                          {selectedReport.priority.toUpperCase()} PRIORITY
                        </Badge>
                        <Badge variant={getStatusColor(selectedReport.status)}>
                          {selectedReport.status.replace("_", " ").toUpperCase()}
                        </Badge>
                      </div>
                      <p>
                        <strong>Type:</strong> {selectedReport.type.toUpperCase()}
                      </p>
                      <p>
                        <strong>Submitted:</strong> {new Date(selectedReport.submittedAt).toLocaleString()}
                      </p>
                      <p>
                        <strong>Location:</strong> {selectedReport.location}
                      </p>
                      {selectedReport.aiConfidence && (
                        <p>
                          <strong>AI Confidence:</strong> {selectedReport.aiConfidence}%
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Submitter Information</h3>
                    <div className="space-y-1 text-sm">
                      <p>
                        <strong>Status:</strong> {selectedReport.submitterInfo.anonymous ? "Anonymous" : "Identified"}
                      </p>
                      {selectedReport.submitterInfo.contact && (
                        <p>
                          <strong>Contact:</strong> {selectedReport.submitterInfo.contact}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Assignment</h3>
                    <div className="space-y-1 text-sm">
                      {selectedReport.assignedTo ? (
                        <p>
                          <strong>Assigned to:</strong> {selectedReport.assignedTo}
                        </p>
                      ) : (
                        <p className="text-muted-foreground">Not yet assigned</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Evidence</h3>
                    <div className="space-y-1">
                      {selectedReport.evidence.map((item, index) => (
                        <Badge key={index} variant="outline" className="mr-1 mb-1">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-sm bg-muted p-3 rounded-md">{selectedReport.description}</p>
              </div>

              {user?.role === "admin" && (
                <div className="flex gap-2 pt-4 border-t">
                  <Button>Assign Team</Button>
                  <Button variant="outline">Update Status</Button>
                  <Button variant="outline">Generate Alert</Button>
                  <Button variant="outline">Export Report</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
