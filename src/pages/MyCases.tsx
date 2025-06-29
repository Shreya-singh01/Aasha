import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { 
  FolderOpen, 
  Clock, 
  User, 
  MapPin, 
  AlertTriangle, 
  CheckCircle, 
  Calendar,
  Search,
  Filter,
  Eye,
  Edit
} from 'lucide-react'

interface Case {
  id: string
  title: string
  status: "active" | "closed" | "pending" | "urgent"
  priority: "high" | "medium" | "low"
  assignedTo: string
  location: string
  createdAt: string
  lastUpdated: string
  description: string
  victimCount: number
  perpetratorCount: number
  evidence: string[]
  notes: string[]
}

const mockCases: Case[] = [
  {
    id: "CASE-001",
    title: "Downtown Hotel Trafficking Ring",
    status: "active",
    priority: "high",
    assignedTo: "Agent Smith",
    location: "Downtown District",
    createdAt: "2024-01-15",
    lastUpdated: "2024-01-28",
    description: "Investigation into human trafficking operation operating from multiple downtown hotels",
    victimCount: 8,
    perpetratorCount: 3,
    evidence: ["Surveillance footage", "Witness statements", "Financial records"],
    notes: ["Primary suspect identified", "Search warrant obtained", "Victim interviews scheduled"]
  },
  {
    id: "CASE-002",
    title: "Online Recruitment Network",
    status: "active",
    priority: "medium",
    assignedTo: "Agent Johnson",
    location: "Cyber Division",
    createdAt: "2024-01-20",
    lastUpdated: "2024-01-27",
    description: "Digital investigation of online recruitment and grooming activities",
    victimCount: 12,
    perpetratorCount: 5,
    evidence: ["Digital communications", "IP addresses", "Social media profiles"],
    notes: ["Tech company cooperation secured", "Digital forensics in progress", "International coordination needed"]
  },
  {
    id: "CASE-003",
    title: "Border Crossing Operation",
    status: "closed",
    priority: "high",
    assignedTo: "Agent Williams",
    location: "Border Region",
    createdAt: "2023-12-10",
    lastUpdated: "2024-01-25",
    description: "Successfully dismantled trafficking network operating across border",
    victimCount: 15,
    perpetratorCount: 7,
    evidence: ["Border crossing records", "Vehicle tracking", "Confessions"],
    notes: ["All victims rescued", "Perpetrators arrested", "Case closed successfully"]
  },
  {
    id: "CASE-004",
    title: "Suburban Recruitment Case",
    status: "pending",
    priority: "medium",
    assignedTo: "Agent Brown",
    location: "Suburban Area",
    createdAt: "2024-01-25",
    lastUpdated: "2024-01-26",
    description: "Investigation into recruitment activities targeting suburban youth",
    victimCount: 3,
    perpetratorCount: 2,
    evidence: ["Social media posts", "School records", "Parent interviews"],
    notes: ["Initial assessment complete", "Waiting for additional evidence", "Community outreach planned"]
  }
]

export default function MyCases() {
  const [selectedCase, setSelectedCase] = useState<Case | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const filteredCases = mockCases.filter(caseItem => {
    const matchesSearch = 
      caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || caseItem.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-blue-500"
      case "closed": return "bg-green-500"
      case "pending": return "bg-yellow-500"
      case "urgent": return "bg-red-500"
      default: return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active": return "Active"
      case "closed": return "Closed"
      case "pending": return "Pending"
      case "urgent": return "Urgent"
      default: return "Unknown"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-600"
      case "medium": return "text-yellow-600"
      case "low": return "text-green-600"
      default: return "text-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Cases</h1>
        <p className="text-gray-600">Case management and tracking dashboard</p>
      </div>

      {/* Case Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Cases</CardTitle>
            <FolderOpen className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockCases.filter(c => c.status === "active").length}</div>
            <p className="text-xs text-gray-600">Currently investigating</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Closed Cases</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockCases.filter(c => c.status === "closed").length}</div>
            <p className="text-xs text-gray-600">Successfully resolved</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Victims</CardTitle>
            <User className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockCases.reduce((sum, c) => sum + c.victimCount, 0)}</div>
            <p className="text-xs text-gray-600">Across all cases</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Arrests Made</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockCases.reduce((sum, c) => sum + c.perpetratorCount, 0)}</div>
            <p className="text-xs text-gray-600">Perpetrators apprehended</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4 items-center flex-wrap">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search cases..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select 
          value={filterStatus} 
          onChange={(e) => setFilterStatus(e.target.value)}
          className="h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="closed">Closed</option>
          <option value="pending">Pending</option>
          <option value="urgent">Urgent</option>
        </select>
        <Badge variant="outline">{filteredCases.length} cases found</Badge>
      </div>

      {/* Cases Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {filteredCases.map((caseItem) => (
          <Card 
            key={caseItem.id} 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedCase(caseItem)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{caseItem.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <FolderOpen className="h-4 w-4" />
                    {caseItem.id}
                  </CardDescription>
                </div>
                <Badge 
                  variant={caseItem.status === "active" ? "default" : "secondary"}
                  className="flex items-center gap-1"
                >
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(caseItem.status)}`}></div>
                  {getStatusText(caseItem.status)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">{caseItem.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-600" />
                  <span>{caseItem.victimCount} victims</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-gray-600" />
                  <span>{caseItem.perpetratorCount} perpetrators</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-600" />
                  <span>{caseItem.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-600" />
                  <span>{new Date(caseItem.lastUpdated).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${getPriorityColor(caseItem.priority)}`}>
                  Priority: {caseItem.priority.toUpperCase()}
                </span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Case Detail Modal */}
      {selectedCase && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedCase(null)}
        >
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Case Details - {selectedCase.title}</CardTitle>
                <Button variant="ghost" onClick={() => setSelectedCase(null)}>
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <FolderOpen className="h-4 w-4" />
                    Case Information
                  </h3>
                  <p><strong>Case ID:</strong> {selectedCase.id}</p>
                  <p><strong>Status:</strong> {getStatusText(selectedCase.status)}</p>
                  <p><strong>Priority:</strong> {selectedCase.priority.toUpperCase()}</p>
                  <p><strong>Assigned To:</strong> {selectedCase.assignedTo}</p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Timeline
                  </h3>
                  <p><strong>Created:</strong> {new Date(selectedCase.createdAt).toLocaleDateString()}</p>
                  <p><strong>Last Updated:</strong> {new Date(selectedCase.lastUpdated).toLocaleDateString()}</p>
                  <p><strong>Location:</strong> {selectedCase.location}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Description</h3>
                <p>{selectedCase.description}</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Victims & Perpetrators
                  </h3>
                  <p><strong>Victims:</strong> {selectedCase.victimCount}</p>
                  <p><strong>Perpetrators:</strong> {selectedCase.perpetratorCount}</p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Evidence
                  </h3>
                  <div className="space-y-1">
                    {selectedCase.evidence.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Edit className="h-4 w-4" />
                  Case Notes
                </h3>
                <div className="space-y-2">
                  {selectedCase.notes.map((note, index) => (
                    <div key={index} className="flex items-start space-x-2 p-2 bg-gray-50 rounded">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm">{note}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t flex gap-2">
                <Button className="flex-1">Update Case</Button>
                <Button variant="outline" className="flex-1">Add Note</Button>
                <Button variant="outline">Export Report</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
} 