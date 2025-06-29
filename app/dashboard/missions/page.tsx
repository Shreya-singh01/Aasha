"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Shield, MapPin, Users, Clock, AlertTriangle, CheckCircle } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

interface Mission {
  id: string
  name: string
  status: "planning" | "active" | "completed" | "cancelled"
  priority: "low" | "medium" | "high" | "critical"
  location: string
  assignedTeams: string[]
  startDate: string
  estimatedDuration: string
  targetVictims: number
  rescuedVictims?: number
  missionType: "rescue" | "investigation" | "surveillance" | "support"
  description: string
  updates: {
    timestamp: string
    message: string
    status: string
  }[]
}

const mockMissions: Mission[] = [
  {
    id: "MISSION-001",
    name: "Operation Delta",
    status: "active",
    priority: "critical",
    location: "Port Area East, Mumbai",
    assignedTeams: ["Team Alpha", "Team Gamma", "Local Police Unit 5"],
    startDate: "2024-01-15T06:00:00Z",
    estimatedDuration: "8 hours",
    targetVictims: 12,
    rescuedVictims: 8,
    missionType: "rescue",
    description: "Large-scale rescue operation targeting shipping container facility with suspected labor trafficking.",
    updates: [
      {
        timestamp: "2024-01-15T14:30:00Z",
        message: "8 victims successfully rescued and secured",
        status: "rescue_initiated",
      },
      {
        timestamp: "2024-01-15T12:15:00Z",
        message: "Teams in position, beginning entry procedures",
        status: "operation_started",
      },
      {
        timestamp: "2024-01-15T06:00:00Z",
        message: "Mission commenced, teams deployed",
        status: "mission_started",
      },
    ],
  },
  {
    id: "MISSION-002",
    name: "Operation Phoenix",
    status: "planning",
    priority: "high",
    location: "Downtown District 7, Mumbai",
    assignedTeams: ["Team Beta", "NGO Rescue International"],
    startDate: "2024-01-16T20:00:00Z",
    estimatedDuration: "6 hours",
    targetVictims: 5,
    missionType: "rescue",
    description: "Nighttime operation targeting suspected sex trafficking location based on recent intelligence.",
    updates: [
      {
        timestamp: "2024-01-15T16:00:00Z",
        message: "Final briefing scheduled, equipment check in progress",
        status: "planning",
      },
      {
        timestamp: "2024-01-15T10:00:00Z",
        message: "Mission approved, team assignments confirmed",
        status: "approved",
      },
    ],
  },
  {
    id: "MISSION-003",
    name: "Operation Guardian",
    status: "completed",
    priority: "medium",
    location: "Industrial Zone North, Mumbai",
    assignedTeams: ["Team Delta"],
    startDate: "2024-01-13T14:00:00Z",
    estimatedDuration: "4 hours",
    targetVictims: 3,
    rescuedVictims: 3,
    missionType: "investigation",
    description: "Investigation and documentation of labor conditions at textile factory following anonymous report.",
    updates: [
      {
        timestamp: "2024-01-13T18:00:00Z",
        message: "Mission completed successfully, all victims secured",
        status: "completed",
      },
      {
        timestamp: "2024-01-13T16:30:00Z",
        message: "Evidence collected, 3 victims identified and rescued",
        status: "victims_secured",
      },
      {
        timestamp: "2024-01-13T14:00:00Z",
        message: "Investigation team deployed to location",
        status: "investigation_started",
      },
    ],
  },
]

export default function MissionsPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [missions, setMissions] = useState<Mission[]>(mockMissions)
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const filteredMissions = missions.filter((mission) => filterStatus === "all" || mission.status === filterStatus)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "planning":
        return "default"
      case "active":
        return "destructive"
      case "completed":
        return "secondary"
      case "cancelled":
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

  const getMissionTypeIcon = (type: string) => {
    switch (type) {
      case "rescue":
        return Shield
      case "investigation":
        return AlertTriangle
      case "surveillance":
        return MapPin
      case "support":
        return Users
      default:
        return Shield
    }
  }

  const activeMissions = missions.filter((m) => m.status === "active").length
  const completedMissions = missions.filter((m) => m.status === "completed").length
  const totalRescued = missions.reduce((sum, m) => sum + (m.rescuedVictims || 0), 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Mission Dashboard</h1>
        <p className="text-muted-foreground">Real-time mission coordination and progress tracking</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Missions</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{missions.length}</div>
            <p className="text-xs text-muted-foreground">All time operations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Missions</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeMissions}</div>
            <p className="text-xs text-muted-foreground">Currently in progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedMissions}</div>
            <p className="text-xs text-muted-foreground">Successfully finished</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lives Saved</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRescued}</div>
            <p className="text-xs text-muted-foreground">Victims rescued</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4 items-center">
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="planning">Planning</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        {user?.role === "admin" && <Button>Create New Mission</Button>}
      </div>

      <div className="grid gap-4">
        {filteredMissions.map((mission) => {
          const MissionIcon = getMissionTypeIcon(mission.missionType)
          return (
            <Card
              key={mission.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedMission(mission)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MissionIcon className="h-5 w-5" />
                    <div>
                      <CardTitle className="text-lg">{mission.name}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <MapPin className="h-3 w-3" />
                        {mission.location}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={getPriorityColor(mission.priority)}>{mission.priority.toUpperCase()}</Badge>
                    <Badge variant={getStatusColor(mission.status)}>{mission.status.toUpperCase()}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{mission.description}</p>
                <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3" />
                    <span>Duration: {mission.estimatedDuration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-3 w-3" />
                    <span>
                      Targets: {mission.rescuedVictims || 0}/{mission.targetVictims}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-3 w-3" />
                    <span>Teams: {mission.assignedTeams.length}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3" />
                    <span>Started: {new Date(mission.startDate).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-xs text-muted-foreground mb-1">Assigned Teams:</p>
                  <div className="flex flex-wrap gap-1">
                    {mission.assignedTeams.map((team, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {team}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {selectedMission && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedMission(null)}
        >
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Mission Details - {selectedMission.name}</CardTitle>
                <Button variant="ghost" onClick={() => setSelectedMission(null)}>
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Mission Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex gap-2">
                        <Badge variant={getPriorityColor(selectedMission.priority)}>
                          {selectedMission.priority.toUpperCase()} PRIORITY
                        </Badge>
                        <Badge variant={getStatusColor(selectedMission.status)}>
                          {selectedMission.status.toUpperCase()}
                        </Badge>
                      </div>
                      <p>
                        <strong>Type:</strong> {selectedMission.missionType.toUpperCase()}
                      </p>
                      <p>
                        <strong>Location:</strong> {selectedMission.location}
                      </p>
                      <p>
                        <strong>Start Date:</strong> {new Date(selectedMission.startDate).toLocaleString()}
                      </p>
                      <p>
                        <strong>Duration:</strong> {selectedMission.estimatedDuration}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Progress</h3>
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>Target Victims:</strong> {selectedMission.targetVictims}
                      </p>
                      {selectedMission.rescuedVictims !== undefined && (
                        <p>
                          <strong>Rescued:</strong> {selectedMission.rescuedVictims}
                        </p>
                      )}
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{
                            width: `${((selectedMission.rescuedVictims || 0) / selectedMission.targetVictims) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Assigned Teams</h3>
                    <div className="space-y-1">
                      {selectedMission.assignedTeams.map((team, index) => (
                        <Badge key={index} variant="secondary" className="mr-1 mb-1">
                          {team}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-sm bg-muted p-3 rounded-md">{selectedMission.description}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Mission Updates</h3>
                <div className="space-y-3">
                  {selectedMission.updates.map((update, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <Badge variant="outline" className="text-xs">
                            {update.status.replace("_", " ").toUpperCase()}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(update.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm">{update.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {user?.role === "admin" && (
                <div className="flex gap-2 pt-4 border-t">
                  <Button>Update Status</Button>
                  <Button variant="outline">Add Update</Button>
                  <Button variant="outline">Assign Team</Button>
                  <Button variant="outline">Generate Report</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
