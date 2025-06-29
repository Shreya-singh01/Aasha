"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Bot, Send, Phone, MessageSquare, AlertTriangle, Heart } from "lucide-react"

export default function AIChatPage() {
  const { toast } = useToast()
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      message: "Hello! I'm here to help you 24/7. How can I assist you today?",
      timestamp: new Date().toISOString(),
      options: ["Report suspicious activity", "Get help resources", "Find safe locations", "Talk to someone"],
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const quickResponses = [
    { text: "I need help", type: "urgent" },
    { text: "Report suspicious activity", type: "report" },
    { text: "Find safe locations", type: "safety" },
    { text: "Get resources", type: "resources" },
  ]

  const handleSendMessage = async (message) => {
    if (!message.trim()) return

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: "user",
      message: message,
      timestamp: new Date().toISOString(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(message)
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes("help") || lowerMessage.includes("urgent")) {
      return {
        id: Date.now() + 1,
        type: "bot",
        message: "I understand you need help. Your safety is our priority. Here are immediate options:",
        timestamp: new Date().toISOString(),
        options: [
          "Call emergency services (911)",
          "Find nearest safe location",
          "Connect with counselor",
          "Anonymous chat support",
        ],
        urgent: true,
      }
    } else if (lowerMessage.includes("report") || lowerMessage.includes("suspicious")) {
      return {
        id: Date.now() + 1,
        type: "bot",
        message: "Thank you for wanting to report suspicious activity. I can help you submit a secure report:",
        timestamp: new Date().toISOString(),
        options: ["Submit anonymous report", "Upload evidence", "Provide location details", "Speak with investigator"],
      }
    } else if (lowerMessage.includes("safe") || lowerMessage.includes("location")) {
      return {
        id: Date.now() + 1,
        type: "bot",
        message: "I can help you find safe locations and resources in your area:",
        timestamp: new Date().toISOString(),
        options: ["Find safe houses", "Locate police stations", "Emergency shelters", "Support centers"],
      }
    } else if (lowerMessage.includes("resources") || lowerMessage.includes("support")) {
      return {
        id: Date.now() + 1,
        type: "bot",
        message: "Here are support resources available to you:",
        timestamp: new Date().toISOString(),
        options: ["Legal assistance", "Medical support", "Counseling services", "Financial aid"],
      }
    } else {
      return {
        id: Date.now() + 1,
        type: "bot",
        message: "I'm here to help with various needs. What would you like assistance with?",
        timestamp: new Date().toISOString(),
        options: ["Get immediate help", "Report activity", "Find resources", "Safety information"],
      }
    }
  }

  const handleOptionClick = (option) => {
    handleSendMessage(option)
  }

  const handleQuickResponse = (response) => {
    handleSendMessage(response.text)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Chat Support</h1>
        <p className="text-muted-foreground">24/7 AI-powered support for immediate assistance and guidance</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="border-b">
              <div className="flex items-center space-x-2">
                <Bot className="h-6 w-6 text-blue-600" />
                <div>
                  <CardTitle>Guardian Angel AI Assistant</CardTitle>
                  <CardDescription>Secure, confidential support available 24/7</CardDescription>
                </div>
                <Badge variant="secondary" className="ml-auto">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Online
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      msg.type === "user"
                        ? "bg-blue-600 text-white"
                        : msg.urgent
                          ? "bg-red-50 border border-red-200"
                          : "bg-gray-100"
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                    <p className="text-xs opacity-70 mt-1">{new Date(msg.timestamp).toLocaleTimeString()}</p>

                    {msg.options && (
                      <div className="mt-3 space-y-2">
                        {msg.options.map((option, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="w-full justify-start text-left h-auto p-2 bg-transparent"
                            onClick={() => handleOptionClick(option)}
                          >
                            {option}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>

            <div className="border-t p-4">
              <div className="flex space-x-2 mb-3">
                {quickResponses.map((response, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickResponse(response)}
                    className={response.type === "urgent" ? "border-red-300 text-red-700" : ""}
                  >
                    {response.text}
                  </Button>
                ))}
              </div>

              <div className="flex space-x-2">
                <Input
                  placeholder="Type your message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage(inputMessage)}
                  className="flex-1"
                />
                <Button onClick={() => handleSendMessage(inputMessage)}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-900 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Emergency
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-red-800 mb-3">
                If you're in immediate danger, contact emergency services immediately.
              </p>
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white">Call 911</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Alternative Support</CardTitle>
              <CardDescription>Other ways to get help</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Phone className="h-4 w-4 mr-2" />
                National Hotline
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <MessageSquare className="h-4 w-4 mr-2" />
                WhatsApp Support
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Heart className="h-4 w-4 mr-2" />
                Crisis Counseling
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Privacy & Safety</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>End-to-end encrypted</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>No personal data stored</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Anonymous by default</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>24/7 availability</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
