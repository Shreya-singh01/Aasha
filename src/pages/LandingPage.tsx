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
                <p>Admin: admin@aasha.com / password123</p>
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
                {[
                  "View survivor stories and resources",
                  "Submit reports and get help",
                  "Chat with AI support bot",
                  "Access red zone mapping",
                ].map((text, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>{text}</span>
                  </div>
                ))}
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
    { icon: Users, title: "Survivor Stories Database", description: "Comprehensive survivor profiles with rescue details, aspirations, and recovery progress.", color: "text-blue-600" },
    { icon: MapPin, title: "Red Zone Mapping", description: "GIS-based risk visualization and real-time mission tracking dashboard.", color: "text-red-600" },
    { icon: AlertTriangle, title: "Real-time Reporting", description: "Multi-channel tip submission with AI-powered triage and alert systems.", color: "text-yellow-600" },
    { icon: Heart, title: "Therapy Network", description: "Specialized therapist matching system for trauma recovery and healing.", color: "text-pink-600" },
    { icon: Shield, title: "Case Tracking", description: "Post-rescue updates and comprehensive survivor support monitoring.", color: "text-green-600" },
    { icon: Database, title: "Integrated Database", description: "Secure role-based access to comprehensive anti-trafficking data.", color: "text-purple-600" },
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
              <h1 className="text-xl font-bold text-gray-900">Aasha</h1>
              <p className="text-sm text-blue-600 font-medium">Hope for the Forgotten</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
            <a href="#impact" className="text-gray-600 hover:text-gray-900">Impact</a>
            <a href="#about" className="text-gray-600 hover:text-gray-900">About</a>
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={() => setShowLoginModal(true)}>Sign In</Button>
              <Button onClick={() => setShowSignupModal(true)}>Sign Up</Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto max-w-4xl">
          <Shield className="h-16 w-16 text-blue-600 mx-auto mb-6" />
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Aasha<span className="block text-blue-600">Hope for the Forgotten</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            A comprehensive digital platform designed to combat human trafficking through survivor-centered support, real-time reporting, data-driven mapping, and coordinated response.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gray-900 text-white px-8 py-3" onClick={() => setShowLoginModal(true)}>
              Access Platform
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-3" onClick={() => setShowSignupModal(true)}>
              Join Us
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-3" onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}>
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
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Our platform integrates multiple tools and services to create a holistic approach to combating human trafficking and supporting survivors.</p>
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
                  <CardDescription className="text-gray-600 text-center leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="impact" className="py-20 px-4 bg-blue-600 text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold mb-4">Making a Difference</h2>
          <p className="text-xl text-blue-100 mb-12">Understanding the scale of human trafficking drives our mission</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg font-medium">{stat.label}</div>
                <div className="text-sm text-blue-200">{stat.subtext}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gray-900 text-white text-center">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-6">Join the Fight Against Human Trafficking</h2>
          <p className="text-xl text-gray-300 mb-8">Together, we can create a world where every person is free from exploitation.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-gray-900" onClick={() => setShowLoginModal(true)}>Get Started Today</Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900" onClick={() => setShowSignupModal(true)}>Create Account</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-50 border-t">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-blue-600" />
            <div>
              <div className="font-bold text-gray-900">Aasha</div>
              <div className="text-sm text-gray-600">© 2024. All rights reserved.</div>
            </div>
          </div>
          <div className="text-sm text-gray-600 text-center md:text-right mt-4 md:mt-0">
            Dedicated to ending human trafficking through technology and collaboration.
          </div>
        </div>
      </footer>

      {/* Modals */}
      <LoginModal open={showLoginModal} onClose={() => setShowLoginModal(false)} />
      <SignupForm open={showSignupModal} onClose={() => setShowSignupModal(false)} />

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/14155238886?text=Hi"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 99999,
          background: '#25D366',
          color: 'white',
          borderRadius: '50%',
          width: 64,
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="16" fill="#25D366"/>
          <path d="M23.5 17.5c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.37.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.08-.13-.27-.2-.57-.35z" fill="#fff"/>
          <path d="M16 6C10.48 6 6 10.48 6 16c0 1.76.46 3.48 1.34 5L6 26l5.12-1.34A9.96 9.96 0 0016 26c5.52 0 10-4.48 10-10S21.52 6 16 6zm0 17.99a7.96 7.96 0 01-4.07-1.17l-.29-.17-3.04.8.81-2.96-.19-.3A7.96 7.96 0 018 16c0-4.42 3.58-8 8-8s8 3.58 8 8-3.58 8-8 8z" fill="#fff"/>
        </svg>
      </a></div>)
}
