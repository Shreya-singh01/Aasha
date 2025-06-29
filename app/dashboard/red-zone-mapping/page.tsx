"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, AlertTriangle, Users, Clock, TrendingUp } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

interface RedZone {
  id: string
  name: string
  coordinates: { lat: number; lng: number }
  riskLevel: "high" | "medium" | "low"
  lastUpdated: string
  activeCases: number
  vulnerabilityFactors: string[]
  recentActivity: string
  assignedTeams: string[]
}

const mockRedZones: RedZone[] = [
  {
    id: "1",
    name: "Downtown District 7",
    coordinates: { lat: 19.076, lng: 72.8777 },
    riskLevel: "high",
    lastUpdated: "2024-01-15T10:30:00Z",
    activeCases: 12,
    vulnerabilityFactors: ["High poverty rate", "Major transport hub", "Limited law enforcement"],
    recentActivity: "3 suspicious reports in last 24 hours",
    assignedTeams: ["Team Alpha", "NGO Rescue International"],
  },
  {
    id: "2",
    name: "Industrial Zone North",
    coordinates: { lat: 19.1136, lng: 72.8697 },
    riskLevel: "medium",
    lastUpdated: "2024-01-14T15:45:00Z",
    activeCases: 7,
    vulnerabilityFactors: ["Migrant worker concentration", "Unregulated factories"],
    recentActivity: "1 labor trafficking report filed",
    assignedTeams: ["Team Beta"],
  },
  {
    id: "3",
    name: "Port Area East",
    coordinates: { lat: 18.9388, lng: 72.8354 },
    riskLevel: "high",
    lastUpdated: "2024-01-15T08:20:00Z",
    activeCases: 15,
    vulnerabilityFactors: ["International transit point", "Corruption issues", "Hidden locations"],
    recentActivity: "Active rescue operation in progress",
    assignedTeams: ["Team Alpha", "Team Gamma", "Local Police Unit 5"],
  },
  {
    id: "4",
    name: "Suburban Area West",
    coordinates: { lat: 19.033, lng: 72.857 },
    riskLevel: "low",
    lastUpdated: "2024-01-13T12:00:00Z",
    activeCases: 2,
    vulnerabilityFactors: ["Isolated residential areas"],
    recentActivity: "Routine monitoring, no recent incidents",
    assignedTeams: ["Team Delta"],
  },
]

export default function RedZoneMappingPage() {
  const { user } = useAuth()
  const [zones, setZones] = useState<RedZone[]>(mockRedZones)
  const [selectedZone, setSelectedZone] = useState<RedZone | null>(null)
  const [filterRisk, setFilterRisk] = useState<string>("all")

  const filteredZones = zones.filter((zone) => filterRisk === "all" || zone.riskLevel === filterRisk)

  const getRiskColor = (level: string) => {
    switch (level) {
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

  const totalActiveCases = zones.reduce((sum, zone) => sum + zone.activeCases, 0)
  const highRiskZones = zones.filter((zone) => zone.riskLevel === "high").length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Red Zone Mapping</h1>
        <p className="text-muted-foreground">GIS-based risk visualization and mission coordination dashboard</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Red Zones</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{zones.length}</div>
            <p className="text-xs text-muted-foreground">{highRiskZones} high-risk areas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Cases</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalActiveCases}</div>
            <p className="text-xs text-muted-foreground">Across all zones</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">Within 30 minutes</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4 items-center">
        <Select value={filterRisk} onValueChange={setFilterRisk}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by risk level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Risk Levels</SelectItem>
            <SelectItem value="high">High Risk</SelectItem>
            <SelectItem value="medium">Medium Risk</SelectItem>
            <SelectItem value="low">Low Risk</SelectItem>
          </SelectContent>
        </Select>
        {user?.role === "admin" && <Button>Update Risk Assessment</Button>}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Interactive Risk Map</CardTitle>
            <CardDescription>GIS visualization of high-risk trafficking zones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96 bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center space-y-2">
                <MapPin className="h-12 w-12 mx-auto text-muted-foreground" />
                <p className="text-muted-foreground">Interactive Map Component</p>
                <p className="text-sm text-muted-foreground">Integration with ArcGIS Pro for spatial analysis</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Zone Details</CardTitle>
            <CardDescription>Detailed information about selected zones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {filteredZones.map((zone) => (
                <div
                  key={zone.id}
                  className="p-4 border rounded-lg cursor-pointer hover:bg-muted/50"
                  onClick={() => setSelectedZone(zone)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{zone.name}</h3>
                    <Badge variant={getRiskColor(zone.riskLevel)}>{zone.riskLevel.toUpperCase()} RISK</Badge>
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Users className="h-3 w-3" />
                      <span>{zone.activeCases} active cases</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      <span>Updated {new Date(zone.lastUpdated).toLocaleDateString()}</span>
                    </div>
                    <p>{zone.recentActivity}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {selectedZone && (
        <Card>
          <CardHeader>
            <CardTitle>Zone Details: {selectedZone.name}</CardTitle>
            <CardDescription>Comprehensive information and mission coordination</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-semibold mb-2">Risk Assessment</h4>
                <Badge variant={getRiskColor(selectedZone.riskLevel)} className="mb-2">
                  {selectedZone.riskLevel.toUpperCase()} RISK
                </Badge>
                <div className="space-y-1 text-sm">
                  <p>
                    <strong>Active Cases:</strong> {selectedZone.activeCases}
                  </p>
                  <p>
                    <strong>Last Updated:</strong> {new Date(selectedZone.lastUpdated).toLocaleString()}
                  </p>
                  <p>
                    <strong>Recent Activity:</strong> {selectedZone.recentActivity}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Vulnerability Factors</h4>
                <div className="space-y-1">
                  {selectedZone.vulnerabilityFactors.map((factor, index) => (
                    <Badge key={index} variant="outline" className="mr-1 mb-1">
                      {factor}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Assigned Teams</h4>
              <div className="flex gap-2">
                {selectedZone.assignedTeams.map((team, index) => (
                  <Badge key={index} variant="secondary">
                    {team}
                  </Badge>
                ))}
              </div>
            </div>

            {user?.role === "admin" && (
              <div className="flex gap-2 pt-4">
                <Button>Deploy Team</Button>
                <Button variant="outline">Update Risk Level</Button>
                <Button variant="outline">Generate Report</Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
