"use client"

import { useState } from "react"
import { useAuth } from "./auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRouter } from "next/navigation"
import { X, Shield, Users, UserCheck } from "lucide-react"

export function LoginModal({ open, onClose }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [loginType, setLoginType] = useState("credentials") // "credentials" or "guest"
  const { login, loginAsGuest } = useAuth()
  const router = useRouter()

  if (!open) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const success = await login(email, password)
    if (success) {
      router.push("/dashboard")
      onClose()
    } else {
      setError("Invalid credentials. Please try again.")
    }
    setIsLoading(false)
  }

  const handleGuestLogin = () => {
    loginAsGuest()
    router.push("/dashboard")
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
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
          {/* Login Type Selection */}
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
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
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
                <p>
                  <strong>Demo credentials:</strong>
                </p>
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
