import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { MapPin, AlertTriangle, Shield, Users, Clock, TrendingUp, RefreshCw } from 'lucide-react'
import MapView from '../components/MapView'
import { useRedZones, RedZone } from '../hooks/useRedZones'

export default function RedZoneMapping() {
  const { zones, stats, loading, error, refreshData } = useRedZones()
  const [selectedZone, setSelectedZone] = useState<RedZone | null>(null)
  const [filterRisk, setFilterRisk] = useState<string>("all")

  const filteredZones = zones.filter(zone => 
    filterRisk === "all" || zone.riskLevel === filterRisk
  )

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high": return "bg-red-500"
      case "medium": return "bg-yellow-500"
      case "low": return "bg-green-500"
      default: return "bg-gray-500"
    }
  }

  const getRiskText = (risk: string) => {
    switch (risk) {
      case "high": return "High Risk"
      case "medium": return "Medium Risk"
      case "low": return "Low Risk"
      default: return "Unknown"
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Red Zone Mapping</h1>
          <p className="text-gray-600">GIS-based risk visualization and real-time mission tracking</p>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 text-gray-400 mx-auto mb-4 animate-spin" />
            <p className="text-gray-600">Loading red zone data...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Red Zone Mapping</h1>
          <p className="text-gray-600">GIS-based risk visualization and real-time mission tracking</p>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <AlertTriangle className="h-8 w-8 text-red-400 mx-auto mb-4" />
            <p className="text-red-600 mb-4">Error loading data: {error}</p>
            <Button onClick={refreshData} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Red Zone Mapping</h1>
          <p className="text-gray-600">GIS-based risk visualization and real-time mission tracking</p>
        </div>
        <Button onClick={refreshData} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Map */}
      <Card className="h-[500px]">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            Interactive Risk Map
          </CardTitle>
          <CardDescription>Real-time visualization of high-risk areas and active missions</CardDescription>
        </CardHeader>
        <CardContent className="p-0 overflow-hidden rounded-lg">
          <div className="w-full h-96">
            <MapView zones={filteredZones} />
           </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <select 
          value={filterRisk} 
          onChange={(e) => setFilterRisk(e.target.value)}
          className="h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
        >
          <option value="all">All Risk Levels</option>
          <option value="high">High Risk</option>
          <option value="medium">Medium Risk</option>
          <option value="low">Low Risk</option>
        </select>
        <Badge variant="outline">{filteredZones.length} zones found</Badge>
      </div>

      {/* Red Zones Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredZones.map((zone) => (
          <Card 
            key={zone._id} 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedZone(zone)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{zone.name}</CardTitle>
                <Badge 
                  variant={zone.riskLevel === "high" ? "destructive" : "secondary"}
                  className="flex items-center gap-1"
                >
                  <div className={`w-2 h-2 rounded-full ${getRiskColor(zone.riskLevel)}`}></div>
                  {getRiskText(zone.riskLevel)}
                </Badge>
              </div>
              <CardDescription className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {zone.location}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">{zone.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-600" />
                  <span>{zone.activeCases} active cases</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-600" />
                  <span>{zone.lastReport}</span>
                </div>
              </div>

              <Button variant="outline" size="sm" className="w-full">
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Zone Detail Modal */}
      {selectedZone && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.5)", zIndex: 99999 }}
          onClick={() => setSelectedZone(null)}
        >
          <div
            className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Zone Details - {selectedZone.name}</CardTitle>
                <Button variant="ghost" onClick={() => setSelectedZone(null)}>
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Location Details
                  </h3>
                  <p><strong>Area:</strong> {selectedZone.location}</p>
                  <p><strong>Coordinates:</strong> {selectedZone.coordinates.lat}, {selectedZone.coordinates.lng}</p>
                  <p><strong>Risk Level:</strong> {getRiskText(selectedZone.riskLevel)}</p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Activity Summary
                  </h3>
                  <p><strong>Active Cases:</strong> {selectedZone.activeCases}</p>
                  <p><strong>Last Report:</strong> {selectedZone.lastReport}</p>
                  <p><strong>Status:</strong> Under surveillance</p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Description</h3>
                <p>{selectedZone.description}</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Recommended Actions
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Increase patrol frequency</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Install surveillance cameras</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Coordinate with local law enforcement</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button className="w-full">Update Zone Status</Button>
              </div>
            </CardContent>
          </div>
        </div>
      )}

      {/* Statistics */}
      {stats && (
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Red Zones</CardTitle>
              <AlertTriangle className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalZones}</div>
              <p className="text-xs text-gray-600">Active monitoring</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Risk Areas</CardTitle>
              <TrendingUp className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.highRiskZones}</div>
              <p className="text-xs text-gray-600">Require immediate attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Cases</CardTitle>
              <Users className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalActiveCases}</div>
              <p className="text-xs text-gray-600">Across all zones</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recent Reports</CardTitle>
              <Clock className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.recentReports}</div>
              <p className="text-xs text-gray-600">Last 24 hours</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
} 