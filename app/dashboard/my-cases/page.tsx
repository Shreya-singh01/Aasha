"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Calendar, MapPin, User, Clock, FileText, Heart } from "lucide-react"

interface Case {
  id: string
  survivorId: string
  status: "active" | "monitoring" | "closed" | "transferred"
  priority: "low" | "medium" | "high"
  assignedDate: string
  lastUpdate: string
  location: string
  caseType: "sex_trafficking" | "labor_trafficking" | "domestic_servitude"
  survivorInfo: {
    age: number
    gender: string
    nationality: string
  }
  currentNeeds: string[]
  nextSteps: string
  notes: string
}

const mockCases: Case[] = [
  {
    id: "CASE-001",
    survivorId: "SUR-2024-001",
    status: "active",
    priority: "high",
    assignedDate: "2024-01-10",
    lastUpdate: "2024-01-15",
    location: "Mumbai Safe House #3",
    caseType: "sex_trafficking",
    survivorInfo: {
      age: 19,
      gender: "Female",
      nationality: "Indian",
    },
    currentNeeds: ["Medical care", "Legal documentation", "Trauma counseling"],
    nextSteps: "Schedule therapy session and legal consultation",
    notes: "Survivor showing good progress in recovery. Expressed interest in vocational training.",
  },
  {
    id: "CASE-002",
    survivorId: "SUR-2024-002",
    status: "monitoring",
    priority: "medium",
    assignedDate: "2024-01-05",
    lastUpdate: "2024-01-14",
    location: "Community Integration Program",
    caseType: "labor_trafficking",
    survivorInfo: {
      age: 17,
      gender: "Male",
      nationality: "Bangladeshi",
    },
    currentNeeds: ["Education support", "Family reunification"],
    nextSteps: "Coordinate with family services for repatriation process",
    notes: "Family contact established. Preparing for safe return home.",
  },
  {
    id: "CASE-003",
    survivorId: "SUR-2024-003",
    status: "active",
    priority: "high",
    assignedDate: "2024-01-12",
    lastUpdate: "2024-01-15",
    location: "Emergency Shelter",
    caseType: "domestic_servitude",
    survivorInfo: {
      age: 22,
      gender: "Female",
      nationality: "Nepali",
    },
    currentNeeds: ["Immediate medical attention", "Legal protection", "Safe housing"],
    nextSteps: "Medical examination and legal status assessment",
    notes: "Recently rescued. Requires immediate comprehensive support services.",
  },
]

export default function MyCasesPage() {
  const { toast } = useToast()
  const [cases, setCases] = useState<Case[]>(mockCases)
  const [selectedCase, setSelectedCase] = useState<Case | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [updateNotes, setUpdateNotes] = useState("")

  const filteredCases = cases.filter((caseItem) => {
    const matchesSearch =
      caseItem.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || caseItem.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "monitoring":
        return "secondary"
      case "closed":
        return "secondary"
      case "transferred":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
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

  const handleUpdateCase = (caseId: string) => {
    if (!updateNotes.trim()) {
      toast({
        title: "Update Required",
        description: "Please add notes for the case update.",
        variant: "destructive",
      })
      return
    }

    setCases((prev) =>
      prev.map((c) =>
        c.id === caseId ? { ...c, lastUpdate: new Date().toISOString().split("T")[0], notes: updateNotes } : c,
      ),
    )

    toast({
      title: "Case Updated",
      description: "Case notes have been updated successfully.",
    })

    setUpdateNotes("")
    setSelectedCase(null)
  }

  const activeCases = cases.filter((c) => c.status === "active").length
  const highPriorityCases = cases.filter((c) => c.priority === "high").length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Cases</h1>
        <p className="text-muted-foreground">Manage and track survivor cases assigned to your organization</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cases</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cases.length}</div>
            <p className="text-xs text-muted-foreground">All assigned cases</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Cases</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCases}</div>
            <p className="text-xs text-muted-foreground">Requiring active support</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <Clock className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{highPriorityCases}</div>
            <p className="text-xs text-muted-foreground">Urgent attention needed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">Cases updated</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4 items-center">
        <Input
          placeholder="Search cases..."
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
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="monitoring">Monitoring</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
            <SelectItem value="transferred">Transferred</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {filteredCases.map((caseItem) => (
          <Card
            key={caseItem.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setSelectedCase(caseItem)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{caseItem.id}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <MapPin className="h-3 w-3" />
                    {caseItem.location}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Badge variant={getPriorityColor(caseItem.priority)}>{caseItem.priority.toUpperCase()}</Badge>
                  <Badge variant={getStatusColor(caseItem.status)}>{caseItem.status.toUpperCase()}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-3 w-3" />
                    <span>
                      {caseItem.survivorInfo.gender}, {caseItem.survivorInfo.age} years
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-3 w-3" />
                    <span>Assigned: {new Date(caseItem.assignedDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-3 w-3" />
                    <span>Last update: {new Date(caseItem.lastUpdate).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Current Needs:</p>
                  <div className="flex flex-wrap gap-1">
                    {caseItem.currentNeeds.slice(0, 3).map((need, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {need}
                      </Badge>
                    ))}
                    {caseItem.currentNeeds.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{caseItem.currentNeeds.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedCase && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedCase(null)}
        >
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Case Details - {selectedCase.id}</CardTitle>
                <Button variant="ghost" onClick={() => setSelectedCase(null)}>
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Case Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex gap-2">
                        <Badge variant={getPriorityColor(selectedCase.priority)}>
                          {selectedCase.priority.toUpperCase()} PRIORITY
                        </Badge>
                        <Badge variant={getStatusColor(selectedCase.status)}>{selectedCase.status.toUpperCase()}</Badge>
                      </div>
                      <p>
                        <strong>Survivor ID:</strong> {selectedCase.survivorId}
                      </p>
                      <p>
                        <strong>Case Type:</strong> {selectedCase.caseType.replace("_", " ").toUpperCase()}
                      </p>
                      <p>
                        <strong>Assigned Date:</strong> {new Date(selectedCase.assignedDate).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Last Update:</strong> {new Date(selectedCase.lastUpdate).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Location:</strong> {selectedCase.location}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Survivor Information</h3>
                    <div className="space-y-1 text-sm">
                      <p>
                        <strong>Age:</strong> {selectedCase.survivorInfo.age} years
                      </p>
                      <p>
                        <strong>Gender:</strong> {selectedCase.survivorInfo.gender}
                      </p>
                      <p>
                        <strong>Nationality:</strong> {selectedCase.survivorInfo.nationality}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Current Needs</h3>
                    <div className="space-y-1">
                      {selectedCase.currentNeeds.map((need, index) => (
                        <Badge key={index} variant="outline" className="mr-1 mb-1">
                          {need}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Next Steps</h3>
                    <p className="text-sm bg-muted p-3 rounded-md">{selectedCase.nextSteps}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Case Notes</h3>
                <p className="text-sm bg-muted p-3 rounded-md mb-4">{selectedCase.notes}</p>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Add Update:</label>
                  <Textarea
                    placeholder="Enter case update notes..."
                    value={updateNotes}
                    onChange={(e) => setUpdateNotes(e.target.value)}
                    className="min-h-20"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <Button onClick={() => handleUpdateCase(selectedCase.id)}>Update Case</Button>
                <Button variant="outline">
                  <Heart className="h-4 w-4 mr-2" />
                  Schedule Therapy
                </Button>
                <Button variant="outline">Transfer Case</Button>
                <Button variant="outline">Generate Report</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
