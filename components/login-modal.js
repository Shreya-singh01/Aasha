"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LoginModal } from "@/components/login-modal"
import { useState } from "react"
import { Shield, Users, MapPin, AlertTriangle, Heart, Database } from "lucide-react"

export function LandingPage() {
  const [showLoginModal, setShowLoginModal] = useState(false)

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
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
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
            <Button variant="outline" onClick={() => setShowLoginModal(true)}>
              Sign In
            </Button>
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
              onClick={() => document.getElementById("features").scrollIntoView({ behavior: "smooth" })}
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
                    <feature.icon className={h-8 w-8 ${feature.color}} />
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
          <Button
            size="lg"
            className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3"
            onClick={() => setShowLoginModal(true)}
          >
            Get Started Today
          </Button>
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
    </div>
  )
}