"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Heart, User, Calendar, MapPin, Star, Phone, Video, Users } from "lucide-react"

interface Therapist {
  id: string
  name: string
  specialization: string[]
  languages: string[]
  availability: "available" | "busy" | "offline"
  rating: number
  experience: number
  location: string
  sessionTypes: ("video" | "phone" | "in_person")[]
  completedSessions: number
  successRate: number
}

interface Session {
  id: string
  therapistId: string
  survivorId: string
  type: "video" | "phone" | "in_person"
  scheduledDate: string
  status: "scheduled" | "completed" | "cancelled"
  notes?: string
}

const mockTherapists: Therapist[] = [
  {
    id: "T001",
    name: "Dr. Sarah Johnson",
    specialization: ["Trauma-focused CBT", "PTSD", "Sex trafficking survivors"],
    languages: ["English", "Spanish", "Hindi"],
    availability: "available",
    rating: 4.9,
    experience: 8,
    location: "Mumbai, India",
    sessionTypes: ["video", "phone", "in_person"],
    completedSessions: 247,
    successRate: 94,
  },
  {
    id: "T002",
    name: "Dr. Michael Chen",
    specialization: ["NET (Narrative Exposure Therapy)", "Labor trafficking", "Youth counseling"],
    languages: ["English", "Mandarin", "Thai"],
    availability: "available",
    rating: 4.8,
    experience: 6,
    location: "Bangkok, Thailand",
    sessionTypes: ["video", "phone"],
    completedSessions: 189,
    successRate: 91,
  },
  {
    id: "T003",
    name: "Dr. Priya Sharma",
    specialization: ["Group therapy", "Family counseling", "Cultural trauma"],
    languages: ["Hindi", "English", "Nepali"],
    availability: "busy",
    rating: 4.7,
    experience: 10,
    location: "Delhi, India",
    sessionTypes: ["video", "in_person"],
    completedSessions: 312,
    successRate: 96,
  },
  {
    id: "T004",
    name: "Dr. James Wilson",
    specialization: ["EMDR", "Complex PTSD", "Male survivors"],
    languages: ["English", "French"],
    availability: "available",
    rating: 4.6,
    experience: 5,
    location: "Remote",
    sessionTypes: ["video", "phone"],
    completedSessions: 156,
    successRate: 89,
  },
]

const mockSessions: Session[] = [
  {
    id: "S001",
    therapistId: "T001",
    survivorId: "SUR-2024-001",
    type: "video",
    scheduledDate: "2024-01-16T14:00:00Z",
    status: "scheduled",
  },
  {
    id: "S002",
    therapistId: "T002",
    survivorId: "SUR-2024-002",
    type: "phone",
    scheduledDate: "2024-01-15T10:30:00Z",
    status: "completed",
    notes: "Good progress, survivor showing improved coping mechanisms",
  },
]

export default function TherapyNetworkPage() {
  const { toast } = useToast()
  const [therapists, setTherapists] = useState<Therapist[]>(mockTherapists)
  const [sessions, setSessions] = useState<Session[]>(mockSessions)
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null)
  const [filterSpecialization, setFilterSpecialization] = useState<string>("all")
  const [filterAvailability, setFilterAvailability] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTherapists = therapists.filter((therapist) => {
    const matchesSearch =
      therapist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      therapist.specialization.some((spec) => spec.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesSpecialization =
      filterSpecialization === "all" ||
      therapist.specialization.some((spec) => spec.toLowerCase().includes(filterSpecialization.toLowerCase()))
    const matchesAvailability = filterAvailability === "all" || therapist.availability === filterAvailability
    return matchesSearch && matchesSpecialization && matchesAvailability
  })

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "available":
        return "secondary"
      case "busy":
        return "default"
      case "offline":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const handleScheduleSession = (therapistId: string) => {
    toast({
      title: "Session Scheduled",
      description: "Therapy session has been scheduled successfully.",
    })
  }

  const totalTherapists = therapists.length
  const availableTherapists = therapists.filter((t) => t.availability === "available").length
  const scheduledSessions = sessions.filter((s) => s.status === "scheduled").length
  const completedSessions = sessions.filter((s) => s.status === "completed").length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Therapy Network</h1>
        <p className="text-muted-foreground">Psychology volunteer database and survivor-therapist matching system</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Therapists</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTherapists}</div>
            <p className="text-xs text-muted-foreground">Registered volunteers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Now</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{availableTherapists}</div>
            <p className="text-xs text-muted-foreground">Ready for sessions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{scheduledSessions}</div>
            <p className="text-xs text-muted-foreground">Upcoming sessions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedSessions + 23}</div>
            <p className="text-xs text-muted-foreground">Sessions completed</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4 items-center flex-wrap">
        <Input
          placeholder="Search therapists..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={filterSpecialization} onValueChange={setFilterSpecialization}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by specialization" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Specializations</SelectItem>
            <SelectItem value="trauma">Trauma-focused CBT</SelectItem>
            <SelectItem value="ptsd">PTSD</SelectItem>
            <SelectItem value="net">NET Therapy</SelectItem>
            <SelectItem value="emdr">EMDR</SelectItem>
            <SelectItem value="group">Group Therapy</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterAvailability} onValueChange={setFilterAvailability}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by availability" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Availability</SelectItem>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="busy">Busy</SelectItem>
            <SelectItem value="offline">Offline</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTherapists.map((therapist) => (
          <Card
            key={therapist.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedTherapist(therapist)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{therapist.name}</CardTitle>
                <Badge variant={getAvailabilityColor(therapist.availability)}>
                  {therapist.availability.toUpperCase()}
                </Badge>
              </div>
              <CardDescription className="flex items-center gap-2">
                <MapPin className="h-3 w-3" />
                {therapist.location}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{therapist.rating}</span>
                <span className="text-sm text-muted-foreground">({therapist.completedSessions} sessions)</span>
              </div>

              <div>
                <p className="text-sm font-medium mb-1">Specializations:</p>
                <div className="flex flex-wrap gap-1">
                  {therapist.specialization.slice(0, 2).map((spec, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {spec}
                    </Badge>
                  ))}
                  {therapist.specialization.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{therapist.specialization.length - 2}
                    </Badge>
                  )}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-1">Languages:</p>
                <p className="text-sm text-muted-foreground">{therapist.languages.join(", ")}</p>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{therapist.experience} years exp.</span>
                <span>{therapist.successRate}% success rate</span>
              </div>

              <div className="flex gap-1">
                {therapist.sessionTypes.map((type) => {
                  const Icon = type === "video" ? Video : type === "phone" ? Phone : Users
                  return (
                    <Badge key={type} variant="secondary" className="text-xs">
                      <Icon className="h-3 w-3 mr-1" />
                      {type.replace("_", " ")}
                    </Badge>
                  )
                })}
              </div>

              <Button
                className="w-full"
                disabled={therapist.availability !== "available"}
                onClick={(e) => {
                  e.stopPropagation()
                  handleScheduleSession(therapist.id)
                }}
              >
                Schedule Session
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedTherapist && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedTherapist(null)}
        >
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Therapist Profile - {selectedTherapist.name}</CardTitle>
                <Button variant="ghost" onClick={() => setSelectedTherapist(null)}>
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold mb-2">Professional Details</h3>
                    <div className="space-y-1 text-sm">
                      <p>
                        <strong>Experience:</strong> {selectedTherapist.experience} years
                      </p>
                      <p>
                        <strong>Location:</strong> {selectedTherapist.location}
                      </p>
                      <p>
                        <strong>Rating:</strong> {selectedTherapist.rating}/5.0
                      </p>
                      <p>
                        <strong>Success Rate:</strong> {selectedTherapist.successRate}%
                      </p>
                      <p>
                        <strong>Completed Sessions:</strong> {selectedTherapist.completedSessions}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Availability</h3>
                    <Badge variant={getAvailabilityColor(selectedTherapist.availability)}>
                      {selectedTherapist.availability.toUpperCase()}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold mb-2">Languages</h3>
                    <div className="flex flex-wrap gap-1">
                      {selectedTherapist.languages.map((lang, index) => (
                        <Badge key={index} variant="secondary">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Session Types</h3>
                    <div className="flex flex-wrap gap-1">
                      {selectedTherapist.sessionTypes.map((type, index) => {
                        const Icon = type === "video" ? Video : type === "phone" ? Phone : Users
                        return (
                          <Badge key={index} variant="outline">
                            <Icon className="h-3 w-3 mr-1" />
                            {type.replace("_", " ")}
                          </Badge>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Specializations</h3>
                <div className="flex flex-wrap gap-1">
                  {selectedTherapist.specialization.map((spec, index) => (
                    <Badge key={index} variant="outline">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <Button
                  disabled={selectedTherapist.availability !== "available"}
                  onClick={() => handleScheduleSession(selectedTherapist.id)}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Session
                </Button>
                <Button variant="outline">
                  <Heart className="h-4 w-4 mr-2" />
                  Add to Favorites
                </Button>
                <Button variant="outline">View Reviews</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Recent Sessions</CardTitle>
          <CardDescription>Latest therapy sessions and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sessions.map((session) => {
              const therapist = therapists.find((t) => t.id === session.therapistId)
              return (
                <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium">{therapist?.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {session.type.toUpperCase()} session with {session.survivorId}
                    </p>
                    <p className="text-xs text-muted-foreground">{new Date(session.scheduledDate).toLocaleString()}</p>
                  </div>
                  <Badge variant={session.status === "completed" ? "secondary" : "default"}>
                    {session.status.toUpperCase()}
                  </Badge>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
