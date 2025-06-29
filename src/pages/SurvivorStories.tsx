import React, { useState } from 'react'
import { useAuth } from '../components/auth-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Calendar, MapPin, User, GraduationCap, Briefcase, Home, X } from 'lucide-react'

interface SurvivorStory {
  id: string
  rescueDate: string
  location: string
  exploitationType: "sex" | "labor"
  duration: string
  currentStatus: string
  aspirations: string
  livingConditions: string
  age: number
  gender: string
  source: string
}

const mockStories: SurvivorStory[] = [
  {
    id: "1",
    rescueDate: "2024-01-15",
    location: "Mumbai, India",
    exploitationType: "sex",
    duration: "18 months",
    currentStatus: "Enrolled in vocational training",
    aspirations: "Wants to become a social worker to help other survivors",
    livingConditions: "Living in secure shelter, receiving counseling",
    age: 19,
    gender: "Female",
    source: "Polaris Project Case Study #247",
  },
  {
    id: "2",
    rescueDate: "2024-02-03",
    location: "Bangkok, Thailand",
    exploitationType: "labor",
    duration: "2 years",
    currentStatus: "Reintegrated with family",
    aspirations: "Plans to complete high school education",
    livingConditions: "Stable housing, part-time employment",
    age: 17,
    gender: "Male",
    source: "NGO Rescue International Report",
  },
  {
    id: "3",
    rescueDate: "2023-12-20",
    location: "Lagos, Nigeria",
    exploitationType: "sex",
    duration: "8 months",
    currentStatus: "Undergoing trauma therapy",
    aspirations: "Interested in pursuing nursing career",
    livingConditions: "Transitional housing, medical support",
    age: 22,
    gender: "Female",
    source: "Local Law Enforcement Collaboration",
  },
  {
    id: "4",
    rescueDate: "2024-01-28",
    location: "Mexico City, Mexico",
    exploitationType: "labor",
    duration: "14 months",
    currentStatus: "Learning computer skills",
    aspirations: "Wants to start own small business",
    livingConditions: "Independent living with support services",
    age: 25,
    gender: "Male",
    source: "Cross-border Operation Delta",
  },
]

export default function SurvivorStories() {
  const { user } = useAuth()
  const [stories, setStories] = useState<SurvivorStory[]>(mockStories)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<string>("all")
  const [selectedStory, setSelectedStory] = useState<SurvivorStory | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newStory, setNewStory] = useState<Omit<SurvivorStory, 'id'>>({
    rescueDate: "",
    location: "",
    exploitationType: "sex",
    duration: "",
    currentStatus: "",
    aspirations: "",
    livingConditions: "",
    age: 0,
    gender: "",
    source: "",
  })

  const filteredStories = stories.filter((story) => {
    const matchesSearch =
      story.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.aspirations.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || story.exploitationType === filterType
    return matchesSearch && matchesFilter
  })

  const handleInputChange = (field: keyof Omit<SurvivorStory, 'id'>, value: any) => {
    setNewStory(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Create new story with generated ID
    const storyToAdd: SurvivorStory = {
      ...newStory,
      id: (stories.length + 1).toString()
    }
    
    // Add to stories array
    setStories(prev => [storyToAdd, ...prev])
    
    // Reset form and close modal
    setNewStory({
      rescueDate: "",
      location: "",
      exploitationType: "sex",
      duration: "",
      currentStatus: "",
      aspirations: "",
      livingConditions: "",
      age: 0,
      gender: "",
      source: "",
    })
    setShowAddForm(false)
  }

  const resetForm = () => {
    setNewStory({
      rescueDate: "",
      location: "",
      exploitationType: "sex",
      duration: "",
      currentStatus: "",
      aspirations: "",
      livingConditions: "",
      age: 0,
      gender: "",
      source: "",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Survivor Stories</h1>
        <p className="text-gray-600">
          Flashcard-style profiles showcasing survivor resilience and recovery journeys
        </p>
      </div>

      <div className="flex gap-4 items-center">
        <Input
          placeholder="Search by location or aspirations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <select 
          value={filterType} 
          onChange={(e) => setFilterType(e.target.value)}
          className="w-48 h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
        >
          <option value="all">All Types</option>
          <option value="sex">Sex Trafficking</option>
          <option value="labor">Labor Trafficking</option>
        </select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredStories.map((story) => (
          <Card
            key={story.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedStory(story)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Case #{story.id}</CardTitle>
                <Badge variant={story.exploitationType === "sex" ? "destructive" : "secondary"}>
                  {story.exploitationType === "sex" ? "Sex Trafficking" : "Labor Trafficking"}
                </Badge>
              </div>
              <CardDescription className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {story.location}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4" />
                <span>Rescued: {new Date(story.rescueDate).toLocaleDateString()}</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4" />
                <span>
                  {story.gender}, {story.age} years old
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <GraduationCap className="h-4 w-4 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Aspirations</p>
                    <p className="text-sm text-gray-600">{story.aspirations}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Briefcase className="h-4 w-4 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Current Status</p>
                    <p className="text-sm text-gray-600">{story.currentStatus}</p>
                  </div>
                </div>
              </div>

              <Button variant="outline" size="sm" className="w-full bg-transparent">
                View Full Profile
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add New Story Form Modal */}
      {showAddForm && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setShowAddForm(false)}
        >
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Add New Survivor Story</CardTitle>
                <Button variant="ghost" onClick={() => setShowAddForm(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Rescue Date</label>
                    <Input
                      type="date"
                      value={newStory.rescueDate}
                      onChange={(e) => handleInputChange('rescueDate', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Location</label>
                    <Input
                      placeholder="e.g., Mumbai, India"
                      value={newStory.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Exploitation Type</label>
                    <select 
                      value={newStory.exploitationType}
                      onChange={(e) => handleInputChange('exploitationType', e.target.value as "sex" | "labor")}
                      className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                      required
                    >
                      <option value="sex">Sex Trafficking</option>
                      <option value="labor">Labor Trafficking</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Duration of Exploitation</label>
                    <Input
                      placeholder="e.g., 18 months"
                      value={newStory.duration}
                      onChange={(e) => handleInputChange('duration', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Age</label>
                    <Input
                      type="number"
                      min="0"
                      max="120"
                      value={newStory.age}
                      onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 0)}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Gender</label>
                    <select 
                      value={newStory.gender}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                      required
                    >
                      <option value="">Select gender</option>
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Non-binary">Non-binary</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Current Status</label>
                  <Input
                    placeholder="e.g., Enrolled in vocational training"
                    value={newStory.currentStatus}
                    onChange={(e) => handleInputChange('currentStatus', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Future Aspirations</label>
                  <textarea
                    placeholder="e.g., Wants to become a social worker to help other survivors"
                    value={newStory.aspirations}
                    onChange={(e) => handleInputChange('aspirations', e.target.value)}
                    className="w-full h-20 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 resize-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Current Living Conditions</label>
                  <textarea
                    placeholder="e.g., Living in secure shelter, receiving counseling"
                    value={newStory.livingConditions}
                    onChange={(e) => handleInputChange('livingConditions', e.target.value)}
                    className="w-full h-20 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 resize-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Source</label>
                  <Input
                    placeholder="e.g., Polaris Project Case Study #247"
                    value={newStory.source}
                    onChange={(e) => handleInputChange('source', e.target.value)}
                    required
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1">
                    Add Story
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Reset Form
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {selectedStory && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedStory(null)}
        >
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Survivor Profile - Case #{selectedStory.id}</CardTitle>
                <Button variant="ghost" onClick={() => setSelectedStory(null)}>
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Rescue Details
                  </h3>
                  <p>
                    <strong>Date:</strong> {new Date(selectedStory.rescueDate).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Location:</strong> {selectedStory.location}
                  </p>
                  <p>
                    <strong>Duration of Exploitation:</strong> {selectedStory.duration}
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Demographics
                  </h3>
                  <p>
                    <strong>Age:</strong> {selectedStory.age} years
                  </p>
                  <p>
                    <strong>Gender:</strong> {selectedStory.gender}
                  </p>
                  <p>
                    <strong>Type:</strong>{" "}
                    {selectedStory.exploitationType === "sex" ? "Sex Trafficking" : "Labor Trafficking"}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  Future Aspirations
                </h3>
                <p>{selectedStory.aspirations}</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Current Living Conditions
                </h3>
                <p>{selectedStory.livingConditions}</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  Current Status
                </h3>
                <p>{selectedStory.currentStatus}</p>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-gray-600">
                  <strong>Source:</strong> {selectedStory.source}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {user?.role === "admin" && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Story</CardTitle>
            <CardDescription>Document a new survivor story for the database</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setShowAddForm(true)}>Add New Survivor Story</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 