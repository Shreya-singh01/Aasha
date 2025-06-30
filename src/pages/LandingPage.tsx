import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, Users, MapPin, AlertTriangle, Heart, Database, X, UserCheck } from 'lucide-react'
import { useAuth } from '../components/auth-provider'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Alert, AlertDescription } from '../components/ui/alert'
import { SignupForm } from '../components/signup-form'

function LoginModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [loginType, setLoginType] = useState("credentials")
  const { login, loginAsGuest, error, clearError } = useAuth()
  const navigate = useNavigate()

  if (!open) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    clearError()

    const success = await login(email, password)
    if (success) {
      onClose()
      navigate("/dashboard")
    }
    setIsLoading(false)
  }

  const handleGuestLogin = () => {
    loginAsGuest()
    onClose()
    navigate("/dashboard")
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-blue-600" />
              <CardTitle>Access Platform</CardTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription>Choose your access method to continue</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant={loginType === "credentials" ? "default" : "outline"}
              onClick={() => setLoginType("credentials")}
              className="flex flex-col items-center p-4 h-auto"
            >
              <UserCheck className="h-6 w-6 mb-2" />
              <span className="text-sm">Staff Login</span>
            </Button>
            <Button
              variant={loginType === "guest" ? "default" : "outline"}
              onClick={() => setLoginType("guest")}
              className="flex flex-col items-center p-4 h-auto"
            >
              <Users className="h-6 w-6 mb-2" />
              <span className="text-sm">Guest Access</span>
            </Button>
          </div>

          {loginType === "credentials" ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>Demo credentials:</strong></p>
                <p>Admin: admin@guardian.com / password123</p>
                <p>NGO: ngo@rescue.org / password123</p>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="text-center space-y-2">
                <Users className="h-12 w-12 mx-auto text-blue-600" />
                <h3 className="font-semibold">Guest Access</h3>
                <p className="text-sm text-gray-600">
                  Access survivor stories, submit reports, and get help without creating an account.
                </p>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>View survivor stories and resources</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Submit reports and get help</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Chat with AI support bot</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Access red zone mapping</span>
                </div>
              </div>
              <Button onClick={handleGuestLogin} className="w-full">
                Continue as Guest
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default function LandingPage() {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)

  const features = [
    {
      icon: Users,
      title: "Survivor Stories Database",
      description: "Comprehensive survivor profiles with rescue details, aspirations, and recovery progress.",
      color: "text-blue-600",
    },
    {
      icon: MapPin,
      title: "Red Zone Mapping",
      description: "GIS-based risk visualization and real-time mission tracking dashboard.",
      color: "text-red-600",
    },
    {
      icon: AlertTriangle,
      title: "Real-time Reporting",
      description: "Multi-channel tip submission with AI-powered triage and alert systems.",
      color: "text-yellow-600",
    },
    {
      icon: Heart,
      title: "Therapy Network",
      description: "Specialized therapist matching system for trauma recovery and healing.",
      color: "text-pink-600",
    },
    {
      icon: Shield,
      title: "Case Tracking",
      description: "Post-rescue updates and comprehensive survivor support monitoring.",
      color: "text-green-600",
    },
    {
      icon: Database,
      title: "Integrated Database",
      description: "Secure role-based access to comprehensive anti-trafficking data.",
      color: "text-purple-600",
    },
  ]

  const stats = [
    { number: "24.9M", label: "People in forced labor worldwide", subtext: "According to latest ILO estimates" },
    { number: "150+", label: "Countries actively combating trafficking", subtext: "Global coalition members" },
    { number: "40.3M", label: "People in modern slavery", subtext: "Requiring immediate assistance" },
    { number: "1 in 4", label: "Victims are children", subtext: "Most vulnerable population" },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Guardian Angel</h1>
              <p className="text-sm text-blue-600 font-medium">Alliance</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
              Features
            </a>
            <a href="#impact" className="text-gray-600 hover:text-gray-900 transition-colors">
              Impact
            </a>
            <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">
              About
            </a>
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={() => setShowLoginModal(true)}>
                Sign In
              </Button>
              <Button onClick={() => setShowSignupModal(true)}>
                Sign Up
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-center mb-6">
            <Shield className="h-16 w-16 text-blue-600" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Guardian Angel
            <span className="block text-blue-600">Alliance</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            A comprehensive digital platform designed to combat human trafficking through survivor-centered support,
            real-time reporting, data-driven mapping, and coordinated response.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3"
              onClick={() => setShowLoginModal(true)}
            >
              Access Platform
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-3 bg-transparent"
              onClick={() => setShowSignupModal(true)}
            >
              Join Us
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-3 bg-transparent"
              onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Comprehensive Anti-Trafficking Solution</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform integrates multiple tools and services to create a holistic approach to combating human
              trafficking and supporting survivors.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-3 rounded-full bg-gray-50">
                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-center leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section id="impact" className="py-20 px-4 bg-blue-600 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Making a Difference</h2>
            <p className="text-xl text-blue-100">Understanding the scale of human trafficking drives our mission</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg font-medium mb-1">{stat.label}</div>
                <div className="text-sm text-blue-200">{stat.subtext}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gray-900 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Join the Fight Against Human Trafficking</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Together, we can create a world where every person is free from exploitation. Access our platform to
            contribute to this vital mission.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3"
              onClick={() => setShowLoginModal(true)}
            >
              Get Started Today
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-3 border-white text-white hover:bg-white hover:text-gray-900"
              onClick={() => setShowSignupModal(true)}
            >
              Create Account
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-50 border-t">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Shield className="h-6 w-6 text-blue-600" />
              <div>
                <div className="font-bold text-gray-900">Guardian Angel Alliance</div>
                <div className="text-sm text-gray-600">© 2024 Guardian Angel Alliance. All rights reserved.</div>
              </div>
            </div>
            <div className="text-sm text-gray-600 text-center md:text-right">
              <p>Dedicated to ending human trafficking through technology and collaboration.</p>
            </div>
          </div>
        </div>
      </footer>

      <LoginModal open={showLoginModal} onClose={() => setShowLoginModal(false)} />
      <SignupForm open={showSignupModal} onClose={() => setShowSignupModal(false)} />
    </div>
  )
} 