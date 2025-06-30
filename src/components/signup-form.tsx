import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, X, UserPlus, Building, User } from 'lucide-react'
import { useAuth } from './auth-provider'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Alert, AlertDescription } from './ui/alert'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

interface SignupFormProps {
  open: boolean
  onClose: () => void
}

export function SignupForm({ open, onClose }: SignupFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    organization: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [validationError, setValidationError] = useState("")
  const { signup, error, clearError } = useAuth()
  const navigate = useNavigate()

  if (!open) return null

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    // Clear validation error when user starts typing
    if (validationError) {
      setValidationError("")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    clearError()
    setValidationError("")

    // Basic validation
    if (!formData.name || !formData.email || !formData.role) {
      setValidationError("Please fill in all required fields")
      setIsLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setValidationError("Password must be at least 6 characters long")
      setIsLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setValidationError("Passwords do not match")
      setIsLoading(false)
      return
    }

    // Call signup method
    const success = await signup({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role as 'admin' | 'ngo',
      organization: formData.organization
    })
    
    if (success) {
      onClose()
      navigate("/dashboard")
    }
    
    setIsLoading(false)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-blue-600" />
              <CardTitle>Create Account</CardTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription>Join Guardian Angel Alliance to help combat human trafficking</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input 
                id="name" 
                type="text" 
                value={formData.name} 
                onChange={(e) => handleInputChange('name', e.target.value)} 
                required 
                placeholder="Enter your full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input 
                id="email" 
                type="email" 
                value={formData.email} 
                onChange={(e) => handleInputChange('email', e.target.value)} 
                required 
                placeholder="Enter your email address"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role *</Label>
              <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>Administrator</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="ngo">
                    <div className="flex items-center space-x-2">
                      <Building className="h-4 w-4" />
                      <span>NGO Staff</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.role === 'ngo' && (
              <div className="space-y-2">
                <Label htmlFor="organization">Organization Name</Label>
                <Input 
                  id="organization" 
                  type="text" 
                  value={formData.organization} 
                  onChange={(e) => handleInputChange('organization', e.target.value)} 
                  placeholder="Enter your organization name"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                required
                placeholder="Create a password (min 6 characters)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password *</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                required
                placeholder="Confirm your password"
              />
            </div>

            {(validationError || error) && (
              <Alert variant="destructive">
                <AlertDescription>{validationError || error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <UserPlus className="h-4 w-4 animate-spin" />
                  <span>Creating Account...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <UserPlus className="h-4 w-4" />
                  <span>Create Account</span>
                </div>
              )}
            </Button>

            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Note:</strong></p>
              <p>• Administrator accounts have full system access</p>
              <p>• NGO accounts can manage cases and reports</p>
              <p>• All accounts are subject to verification</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 