import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  AlertTriangle, 
  MapPin, 
  Calendar,
  Download,
  Filter,
  Eye
} from 'lucide-react'

interface ReportData {
  id: string
  title: string
  type: "analytics" | "mission" | "incident" | "summary"
  date: string
  status: "completed" | "pending" | "draft"
  priority: "high" | "medium" | "low"
  description: string
  metrics: {
    cases: number
    rescues: number
    arrests: number
    locations: number
  }
}

const mockReports: ReportData[] = [
  {
    id: "1",
    title: "Q4 2023 Trafficking Analysis",
    type: "analytics",
    date: "2024-01-15",
    status: "completed",
    priority: "high",
    description: "Comprehensive analysis of trafficking patterns and trends in Q4 2023",
    metrics: {
      cases: 156,
      rescues: 89,
      arrests: 67,
      locations: 23
    }
  },
  {
    id: "2",
    title: "Operation Safe Harbor Report",
    type: "mission",
    date: "2024-01-20",
    status: "completed",
    priority: "high",
    description: "Detailed report on the successful rescue mission in downtown area",
    metrics: {
      cases: 12,
      rescues: 8,
      arrests: 5,
      locations: 3
    }
  },
  {
    id: "3",
    title: "Border Watch Monthly Summary",
    type: "summary",
    date: "2024-01-25",
    status: "completed",
    priority: "medium",
    description: "Monthly summary of border surveillance activities and findings",
    metrics: {
      cases: 45,
      rescues: 23,
      arrests: 18,
      locations: 8
    }
  },
  {
    id: "4",
    title: "Digital Investigation Findings",
    type: "incident",
    date: "2024-01-30",
    status: "pending",
    priority: "high",
    description: "Analysis of online trafficking networks and digital footprints",
    metrics: {
      cases: 78,
      rescues: 34,
      arrests: 29,
      locations: 15
    }
  }
]

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState<ReportData | null>(null)
  const [filterType, setFilterType] = useState<string>("all")

  const filteredReports = mockReports.filter(report => 
    filterType === "all" || report.type === filterType
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-500"
      case "pending": return "bg-yellow-500"
      case "draft": return "bg-gray-500"
      default: return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed": return "Completed"
      case "pending": return "Pending"
      case "draft": return "Draft"
      default: return "Unknown"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "analytics": return BarChart3
      case "mission": return AlertTriangle
      case "incident": return MapPin
      case "summary": return TrendingUp
      default: return BarChart3
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
        <p className="text-gray-600">Comprehensive reporting and data analysis dashboard</p>
      </div>

      {/* Analytics Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cases</CardTitle>
            <AlertTriangle className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">291</div>
            <p className="text-xs text-gray-600">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Successful Rescues</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">154</div>
            <p className="text-xs text-gray-600">+8% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Arrests Made</CardTitle>
            <MapPin className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">119</div>
            <p className="text-xs text-gray-600">+15% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Locations</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">49</div>
            <p className="text-xs text-gray-600">Under surveillance</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart Placeholder */}
      <Card className="h-80">
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Monthly Trends
          </CardTitle>
          <CardDescription>Case volume and rescue success rates over time</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-48 bg-gray-100 rounded-lg">
          <div className="text-center">
            <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Interactive charts coming soon...</p>
            <p className="text-sm text-gray-500">Chart.js or Recharts integration</p>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <select 
          value={filterType} 
          onChange={(e) => setFilterType(e.target.value)}
          className="h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
        >
          <option value="all">All Report Types</option>
          <option value="analytics">Analytics</option>
          <option value="mission">Mission</option>
          <option value="incident">Incident</option>
          <option value="summary">Summary</option>
        </select>
        <Badge variant="outline">{filteredReports.length} reports found</Badge>
      </div>

      {/* Reports Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {filteredReports.map((report) => {
          const IconComponent = getTypeIcon(report.type)
          return (
            <Card 
              key={report.id} 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedReport(report)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{report.title}</CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {report.type.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  <Badge 
                    variant={report.status === "completed" ? "default" : "secondary"}
                    className="flex items-center gap-1"
                  >
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(report.status)}`}></div>
                    {getStatusText(report.status)}
                  </Badge>
                </div>
                <CardDescription className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(report.date).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">{report.description}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-gray-600" />
                    <span>{report.metrics.cases} cases</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-600" />
                    <span>{report.metrics.rescues} rescues</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-600" />
                    <span>{report.metrics.arrests} arrests</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-gray-600" />
                    <span>{report.metrics.locations} locations</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Report Detail Modal */}
      {selectedReport && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedReport(null)}
        >
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Report Details - {selectedReport.title}</CardTitle>
                <Button variant="ghost" onClick={() => setSelectedReport(null)}>
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Report Information
                  </h3>
                  <p><strong>Type:</strong> {selectedReport.type.toUpperCase()}</p>
                  <p><strong>Status:</strong> {getStatusText(selectedReport.status)}</p>
                  <p><strong>Priority:</strong> {selectedReport.priority.toUpperCase()}</p>
                  <p><strong>Date:</strong> {new Date(selectedReport.date).toLocaleDateString()}</p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Key Metrics
                  </h3>
                  <p><strong>Cases:</strong> {selectedReport.metrics.cases}</p>
                  <p><strong>Rescues:</strong> {selectedReport.metrics.rescues}</p>
                  <p><strong>Arrests:</strong> {selectedReport.metrics.arrests}</p>
                  <p><strong>Locations:</strong> {selectedReport.metrics.locations}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Description</h3>
                <p>{selectedReport.description}</p>
              </div>

              <div className="pt-4 border-t flex gap-2">
                <Button className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Download Report
                </Button>
                <Button variant="outline" className="flex-1">Share Report</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
} 