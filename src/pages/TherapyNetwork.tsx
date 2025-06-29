import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { 
  Heart, 
  MapPin, 
  Phone, 
  Mail, 
  Star, 
  Clock, 
  Users, 
  Filter,
  Calendar,
  MessageSquare
} from 'lucide-react'

interface Therapist {
  id: string
  name: string
  specialization: string
  location: string
  rating: number
  experience: string
  languages: string[]
  availability: string
  contact: {
    phone: string
    email: string
  }
  description: string
  specialties: string[]
  image: string
}

const mockTherapists: Therapist[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialization: "Trauma Therapy",
    location: "Downtown Counseling Center",
    rating: 4.9,
    experience: "15+ years",
    languages: ["English", "Spanish"],
    availability: "Mon-Fri 9AM-6PM",
    contact: {
      phone: "(555) 123-4567",
      email: "sarah.johnson@therapy.com"
    },
    description: "Specialized in trauma-informed care for survivors of human trafficking with extensive experience in PTSD treatment.",
    specialties: ["PTSD", "Trauma Recovery", "Anxiety", "Depression"],
    image: "/placeholder-user.jpg"
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialization: "Family Therapy",
    location: "Community Mental Health",
    rating: 4.8,
    experience: "12+ years",
    languages: ["English", "Mandarin"],
    availability: "Mon-Sat 10AM-7PM",
    contact: {
      phone: "(555) 234-5678",
      email: "michael.chen@therapy.com"
    },
    description: "Expert in family dynamics and reintegration therapy for survivors returning to their families.",
    specialties: ["Family Therapy", "Reintegration", "Communication", "Trust Building"],
    image: "/placeholder-user.jpg"
  },
  {
    id: "3",
    name: "Dr. Maria Rodriguez",
    specialization: "Art Therapy",
    location: "Creative Healing Center",
    rating: 4.7,
    experience: "8+ years",
    languages: ["English", "Spanish", "Portuguese"],
    availability: "Tue-Sat 11AM-8PM",
    contact: {
      phone: "(555) 345-6789",
      email: "maria.rodriguez@therapy.com"
    },
    description: "Creative arts therapist specializing in non-verbal expression and healing through artistic mediums.",
    specialties: ["Art Therapy", "Creative Expression", "Emotional Processing", "Self-Discovery"],
    image: "/placeholder-user.jpg"
  },
  {
    id: "4",
    name: "Dr. James Wilson",
    specialization: "Group Therapy",
    location: "Recovery Support Center",
    rating: 4.6,
    experience: "10+ years",
    languages: ["English"],
    availability: "Mon-Fri 8AM-5PM",
    contact: {
      phone: "(555) 456-7890",
      email: "james.wilson@therapy.com"
    },
    description: "Group therapy specialist focusing on peer support and community healing for survivors.",
    specialties: ["Group Therapy", "Peer Support", "Community Building", "Social Skills"],
    image: "/placeholder-user.jpg"
  }
]

export default function TherapyNetwork() {
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterSpecialty, setFilterSpecialty] = useState<string>("all")

  const filteredTherapists = mockTherapists.filter(therapist => {
    const matchesSearch = 
      therapist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      therapist.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      therapist.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterSpecialty === "all" || therapist.specialties.includes(filterSpecialty)
    return matchesSearch && matchesFilter
  })

  const allSpecialties = Array.from(new Set(mockTherapists.flatMap(t => t.specialties)))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Therapy Network</h1>
        <p className="text-gray-600">Connect with specialized therapists and mental health professionals</p>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4 items-center flex-wrap">
        <Input
          placeholder="Search therapists, specializations, or locations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <select 
          value={filterSpecialty} 
          onChange={(e) => setFilterSpecialty(e.target.value)}
          className="h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
        >
          <option value="all">All Specialties</option>
          {allSpecialties.map(specialty => (
            <option key={specialty} value={specialty}>{specialty}</option>
          ))}
        </select>
        <Badge variant="outline">{filteredTherapists.length} therapists found</Badge>
      </div>

      {/* Therapists Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTherapists.map((therapist) => (
          <Card 
            key={therapist.id} 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedTherapist(therapist)}
          >
            <CardHeader>
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                  <Heart className="h-8 w-8 text-gray-400" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{therapist.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {therapist.location}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Badge variant="secondary" className="mb-2">
                  {therapist.specialization}
                </Badge>
                <p className="text-sm text-gray-600">{therapist.description}</p>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < Math.floor(therapist.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="font-medium">{therapist.rating}</span>
                <span className="text-gray-600">({therapist.experience})</span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-600" />
                  <span>{therapist.availability}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-600" />
                  <span>{therapist.languages.join(", ")}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Session
                </Button>
                <Button variant="outline" size="sm">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Therapist Detail Modal */}
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
              <div className="flex items-start space-x-4">
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                  <Heart className="h-10 w-10 text-gray-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{selectedTherapist.name}</h3>
                  <p className="text-gray-600">{selectedTherapist.specialization}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < Math.floor(selectedTherapist.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="font-medium">{selectedTherapist.rating}</span>
                    <span className="text-gray-600">({selectedTherapist.experience})</span>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Location & Availability
                  </h3>
                  <p><strong>Location:</strong> {selectedTherapist.location}</p>
                  <p><strong>Availability:</strong> {selectedTherapist.availability}</p>
                  <p><strong>Languages:</strong> {selectedTherapist.languages.join(", ")}</p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Contact Information
                  </h3>
                  <p><strong>Phone:</strong> {selectedTherapist.contact.phone}</p>
                  <p><strong>Email:</strong> {selectedTherapist.contact.email}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">About</h3>
                <p>{selectedTherapist.description}</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedTherapist.specialties.map((specialty, index) => (
                    <Badge key={index} variant="outline">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t flex gap-2">
                <Button className="flex-1">
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Appointment
                </Button>
                <Button variant="outline" className="flex-1">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Additional Resources */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Emergency Support</CardTitle>
            <CardDescription>24/7 crisis counseling and immediate assistance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Phone className="h-4 w-4 mr-2" />
              Crisis Hotline: 1-800-CRISIS
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <MessageSquare className="h-4 w-4 mr-2" />
              Text Support: HOME to 741741
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Support Groups</CardTitle>
            <CardDescription>Connect with other survivors in a safe environment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Users className="h-4 w-4 mr-2" />
              Survivor Support Group
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Heart className="h-4 w-4 mr-2" />
              Family & Friends Group
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 