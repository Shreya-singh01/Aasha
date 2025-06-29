import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Progress } from '../components/ui/progress'
import { 
  Target, 
  Users, 
  Clock, 
  MapPin, 
  AlertTriangle, 
  CheckCircle, 
  Play, 
  Pause,
  TrendingUp,
  Calendar
} from 'lucide-react'

interface Mission {
  id: string
  title: string
  description: string
  status: "active" | "completed" | "pending" | "failed"
  priority: "high" | "medium" | "low"
  progress: number
  teamSize: number
  location: string
  startDate: string
  endDate: string
  objectives: string[]
  teamMembers: string[]
}

const mockMissions: Mission[] = [
  {
    id: "1",
    title: "Operation Safe Harbor",
    description: "Rescue mission targeting human trafficking ring in downtown area",
    status: "active",
    priority: "high",
    progress: 75,
    teamSize: 8,
    location: "Downtown District",
    startDate: "2024-01-15",
    endDate: "2024-02-15",
    objectives: [
      "Identify trafficking locations",
      "Rescue victims safely",
      "Arrest perpetrators",
      "Provide immediate support"
    ],
    teamMembers: ["Agent Smith", "Agent Johnson", "Agent Williams", "Agent Brown"]
  },
  {
    id: "2",
    title: "Border Watch Initiative",
    description: "Surveillance operation at major transportation hubs",
    status: "active",
    priority: "medium",
    progress: 45,
    teamSize: 12,
    location: "Transportation Hub",
    startDate: "2024-01-20",
    endDate: "2024-03-20",
    objectives: [
      "Monitor suspicious activity",
      "Document patterns",
      "Coordinate with local authorities",
      "Prevent trafficking attempts"
    ],
    teamMembers: ["Agent Davis", "Agent Miller", "Agent Wilson", "Agent Moore"]
  },
  {
    id: "3",
    title: "Community Outreach Program",
    description: "Educational campaign to raise awareness in vulnerable communities",
    status: "completed",
    priority: "medium",
    progress: 100,
    teamSize: 6,
    location: "Multiple Locations",
    startDate: "2023-12-01",
    endDate: "2024-01-31",
    objectives: [
      "Conduct awareness sessions",
      "Distribute educational materials",
      "Train community leaders",
      "Establish support networks"
    ],
    teamMembers: ["Agent Taylor", "Agent Anderson", "Agent Thomas", "Agent Jackson"]
  },
  {
    id: "4",
    title: "Digital Investigation Unit",
    description: "Online monitoring and investigation of trafficking networks",
    status: "pending",
    priority: "high",
    progress: 0,
    teamSize: 5,
    location: "Cyber Division",
    startDate: "2024-02-01",
    endDate: "2024-04-01",
    objectives: [
      "Track online recruitment",
      "Identify digital footprints",
      "Coordinate with tech companies",
      "Develop prevention strategies"
    ],
    teamMembers: ["Agent White", "Agent Harris", "Agent Martin", "Agent Garcia"]
  }
]

export default function Missions() {
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const filteredMissions = mockMissions.filter(mission => 
    filterStatus === "all" || mission.status === filterStatus
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-blue-500"
      case "completed": return "bg-green-500"
      case "pending": return "bg-yellow-500"
      case "failed": return "bg-red-500"
      default: return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active": return "Active"
      case "completed": return "Completed"
      case "pending": return "Pending"
      case "failed": return "Failed"
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
        <h1 className="text-3xl font-bold tracking-tight">Missions</h1>
        <p className="text-gray-600">Active operations and mission management dashboard</p>
      </div>

      {/* Mission Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Missions</CardTitle>
            <Play className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockMissions.filter(m => m.status === "active").length}</div>
            <p className="text-xs text-gray-600">Currently running</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockMissions.filter(m => m.status === "completed").length}</div>
            <p className="text-xs text-gray-600">Successfully finished</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockMissions.reduce((sum, m) => sum + m.teamSize, 0)}</div>
            <p className="text-xs text-gray-600">Total deployed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-gray-600">Mission completion</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <select 
          value={filterStatus} 
          onChange={(e) => setFilterStatus(e.target.value)}
          className="h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
        <Badge variant="outline">{filteredMissions.length} missions found</Badge>
      </div>

      {/* Missions Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {filteredMissions.map((mission) => (
          <Card 
            key={mission.id} 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedMission(mission)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{mission.title}</CardTitle>
                <Badge 
                  variant={mission.status === "active" ? "default" : "secondary"}
                  className="flex items-center gap-1"
                >
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(mission.status)}`}></div>
                  {getStatusText(mission.status)}
                </Badge>
              </div>
              <CardDescription className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {mission.location}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">{mission.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Progress</span>
                  <span className="font-medium">{mission.progress}%</span>
                </div>
                <Progress value={mission.progress} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-600" />
                  <span>{mission.teamSize} team members</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-600" />
                  <span>Ends {new Date(mission.endDate).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${getPriorityColor(mission.priority)}`}>
                  Priority: {mission.priority.toUpperCase()}
                </span>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mission Detail Modal */}
      {selectedMission && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedMission(null)}
        >
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Mission Details - {selectedMission.title}</CardTitle>
                <Button variant="ghost" onClick={() => setSelectedMission(null)}>
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Mission Overview
                  </h3>
                  <p><strong>Status:</strong> {getStatusText(selectedMission.status)}</p>
                  <p><strong>Priority:</strong> {selectedMission.priority.toUpperCase()}</p>
                  <p><strong>Location:</strong> {selectedMission.location}</p>
                  <p><strong>Team Size:</strong> {selectedMission.teamSize} members</p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Timeline
                  </h3>
                  <p><strong>Start Date:</strong> {new Date(selectedMission.startDate).toLocaleDateString()}</p>
                  <p><strong>End Date:</strong> {new Date(selectedMission.endDate).toLocaleDateString()}</p>
                  <p><strong>Progress:</strong> {selectedMission.progress}%</p>
                  <p><strong>Status:</strong> {selectedMission.status}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Description</h3>
                <p>{selectedMission.description}</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Mission Objectives
                </h3>
                <div className="space-y-2">
                  {selectedMission.objectives.map((objective, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>{objective}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Team Members
                </h3>
                <div className="grid gap-2 md:grid-cols-2">
                  {selectedMission.teamMembers.map((member, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>{member}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t flex gap-2">
                <Button className="flex-1">Update Mission</Button>
                <Button variant="outline" className="flex-1">View Reports</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
} 