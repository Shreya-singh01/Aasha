import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'
import {
  Phone,
  MapPin,
  Heart,
  Shield,
  Clock,
  Users,
  AlertTriangle,
  Home,
  Briefcase,
  GraduationCap,
  Scale,
} from 'lucide-react'

export default function GetHelp() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchLocation, setSearchLocation] = useState("")

  const emergencyContacts = [
    {
      name: "National Human Trafficking Hotline",
      number: "1-888-373-7888",
      description: "24/7 confidential support in 200+ languages",
      type: "hotline",
      available: "24/7",
    },
    {
      name: "Emergency Services",
      number: "911",
      description: "Immediate emergency response",
      type: "emergency",
      available: "24/7",
    },
    {
      name: "Crisis Text Line",
      number: "Text HOME to 741741",
      description: "Free, confidential crisis support via text",
      type: "text",
      available: "24/7",
    },
  ]

  const resources = [
    {
      id: 1,
      title: "Safe House Network",
      description: "Secure temporary housing for survivors",
      category: "housing",
      icon: Home,
      location: "Multiple locations",
      availability: "24/7 intake",
      contact: "1-800-SAFE-HOME",
    },
    {
      id: 2,
      title: "Legal Aid Services",
      description: "Free legal assistance for trafficking survivors",
      category: "legal",
      icon: Scale,
      location: "Downtown Legal Center",
      availability: "Mon-Fri 9AM-5PM",
      contact: "1-800-LEGAL-AID",
    },
    {
      id: 3,
      title: "Trauma Counseling Center",
      description: "Specialized therapy for trafficking survivors",
      category: "mental_health",
      icon: Heart,
      location: "Multiple locations",
      availability: "Mon-Sat 8AM-8PM",
      contact: "1-800-THERAPY",
    },
    {
      id: 4,
      title: "Job Training Program",
      description: "Vocational training and employment assistance",
      category: "employment",
      icon: Briefcase,
      location: "Skills Development Center",
      availability: "Mon-Fri 9AM-5PM",
      contact: "1-800-JOB-HELP",
    },
    {
      id: 5,
      title: "Education Support Services",
      description: "GED, ESL, and college preparation programs",
      category: "education",
      icon: GraduationCap,
      location: "Community Learning Center",
      availability: "Mon-Thu 6PM-9PM",
      contact: "1-800-EDUCATION",
    },
    {
      id: 6,
      title: "Medical Clinic",
      description: "Free healthcare services for survivors",
      category: "medical",
      icon: Heart,
      location: "Community Health Center",
      availability: "Mon-Fri 8AM-6PM",
      contact: "1-800-MEDICAL",
    },
  ]

  const safetyTips = [
    "Trust your instincts - if something feels wrong, it probably is",
    "Keep important documents in a safe place",
    "Have a safety plan and know emergency contacts",
    "Stay connected with trusted friends or family",
    "Know your rights and available resources",
    "Document any suspicious activities safely",
  ]

  const filteredResources = resources.filter(
    (resource) =>
      (selectedCategory === "all" || resource.category === selectedCategory) &&
      (searchLocation === "" || resource.location.toLowerCase().includes(searchLocation.toLowerCase())),
  )

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "housing":
        return Home
      case "legal":
        return Scale
      case "mental_health":
        return Heart
      case "employment":
        return Briefcase
      case "education":
        return GraduationCap
      case "medical":
        return Heart
      default:
        return Shield
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Get Help</h1>
        <p className="text-gray-600">Find immediate assistance, resources, and support services in your area</p>
      </div>

      {/* Emergency Contacts */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-900 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Emergency Contacts
          </CardTitle>
          <CardDescription className="text-red-700">
            If you're in immediate danger, use these contacts right away
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="bg-white p-4 rounded-lg border border-red-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-red-900">{contact.name}</h3>
                  <Badge variant="destructive">{contact.available}</Badge>
                </div>
                <p className="text-2xl font-bold text-red-700 mb-2">{contact.number}</p>
                <p className="text-sm text-red-600">{contact.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <div className="flex gap-4 items-center flex-wrap">
        <Input
          placeholder="Search by location..."
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          className="max-w-sm"
        />
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-48 h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
        >
          <option value="all">All Categories</option>
          <option value="housing">Housing</option>
          <option value="legal">Legal Aid</option>
          <option value="mental_health">Mental Health</option>
          <option value="employment">Employment</option>
          <option value="education">Education</option>
          <option value="medical">Medical</option>
        </select>
      </div>

      {/* Resources Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredResources.map((resource) => {
          const IconComponent = getCategoryIcon(resource.category)
          return (
            <Card key={resource.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <IconComponent className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    <Badge variant="outline" className="text-xs">
                      {resource.category.replace("_", " ").toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-600">{resource.description}</p>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-600" />
                    <span>{resource.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-600" />
                    <span>{resource.availability}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-600" />
                    <span className="font-medium">{resource.contact}</span>
                  </div>
                </div>

                <Button className="w-full bg-transparent" variant="outline">
                  Contact Now
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Safety Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Safety Tips
          </CardTitle>
          <CardDescription>Important safety information for your protection</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            {safetyTips.map((tip, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-blue-900">{tip}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Support */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Online Support Groups</CardTitle>
            <CardDescription>Connect with other survivors and supporters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Users className="h-4 w-4 mr-2" />
              Survivor Support Group
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Heart className="h-4 w-4 mr-2" />
              Family & Friends Support
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Shield className="h-4 w-4 mr-2" />
              Recovery Community
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Know Your Rights</CardTitle>
            <CardDescription>Important legal protections for survivors</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Right to safe housing and protection</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Right to medical care and counseling</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Right to legal representation</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Right to privacy and confidentiality</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Right to interpretation services</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 