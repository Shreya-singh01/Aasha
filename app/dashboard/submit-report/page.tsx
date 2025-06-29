"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Camera, Upload, MapPin, Phone, MessageSquare } from "lucide-react"

export default function SubmitReportPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    reportType: "",
    location: "",
    description: "",
    priority: "",
    anonymous: true,
    contactInfo: "",
    evidenceFiles: [] as File[],
  })

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        evidenceFiles: [...prev.evidenceFiles, ...Array.from(e.target.files!)],
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate required fields
    if (!formData.reportType || !formData.location || !formData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Simulate report submission
    toast({
      title: "Report Submitted Successfully",
      description: "Your report has been received and will be reviewed within 30 minutes.",
    })

    // Reset form
    setFormData({
      reportType: "",
      location: "",
      description: "",
      priority: "",
      anonymous: true,
      contactInfo: "",
      evidenceFiles: [],
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Submit Report</h1>
        <p className="text-muted-foreground">
          Report suspicious activities or request assistance through our secure platform
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Report Details</CardTitle>
              <CardDescription>Provide as much detail as possible to help our response teams</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="reportType">Report Type *</Label>
                    <Select
                      value={formData.reportType}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, reportType: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="suspicious_activity">Suspicious Activity</SelectItem>
                        <SelectItem value="victim_sighting">Victim Sighting</SelectItem>
                        <SelectItem value="labor_trafficking">Labor Trafficking</SelectItem>
                        <SelectItem value="sex_trafficking">Sex Trafficking</SelectItem>
                        <SelectItem value="request_help">Request Help</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority Level</Label>
                    <Select
                      value={formData.priority}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, priority: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low - General Information</SelectItem>
                        <SelectItem value="medium">Medium - Suspicious Activity</SelectItem>
                        <SelectItem value="high">High - Immediate Attention</SelectItem>
                        <SelectItem value="critical">Critical - Emergency</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="location"
                      placeholder="Enter specific location or address"
                      value={formData.location}
                      onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide detailed description of the situation, including what you observed, when it occurred, and any other relevant information..."
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    className="min-h-32"
                    required
                  />
                </div>

                <div className="space-y-4">
                  <Label>Evidence Upload</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                    <div className="text-center space-y-2">
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                      <div>
                        <Label
                          htmlFor="file-upload"
                          className="cursor-pointer text-sm font-medium text-primary hover:underline"
                        >
                          Click to upload files
                        </Label>
                        <Input
                          id="file-upload"
                          type="file"
                          multiple
                          accept="image/*,audio/*,video/*,.pdf,.doc,.docx"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Photos, videos, audio recordings, or documents (Max 10MB each)
                      </p>
                    </div>
                  </div>

                  {formData.evidenceFiles.length > 0 && (
                    <div className="space-y-2">
                      <Label>Uploaded Files:</Label>
                      <div className="space-y-1">
                        {formData.evidenceFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                            <span className="text-sm">{file.name}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                setFormData((prev) => ({
                                  ...prev,
                                  evidenceFiles: prev.evidenceFiles.filter((_, i) => i !== index),
                                }))
                              }
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="anonymous"
                      checked={formData.anonymous}
                      onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, anonymous: checked as boolean }))}
                    />
                    <Label htmlFor="anonymous">Submit anonymously</Label>
                  </div>

                  {!formData.anonymous && (
                    <div className="space-y-2">
                      <Label htmlFor="contactInfo">Contact Information</Label>
                      <Input
                        id="contactInfo"
                        placeholder="Phone number or email for follow-up"
                        value={formData.contactInfo}
                        onChange={(e) => setFormData((prev) => ({ ...prev, contactInfo: e.target.value }))}
                      />
                    </div>
                  )}
                </div>

                <Button type="submit" className="w-full">
                  Submit Report
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Alternative Reporting Methods</CardTitle>
              <CardDescription>Other ways to submit reports or get help</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <Phone className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Emergency Hotline</p>
                  <p className="text-sm text-muted-foreground">1-800-HELP-NOW</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <MessageSquare className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">WhatsApp Bot</p>
                  <p className="text-sm text-muted-foreground">+1-555-RESCUE</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <Camera className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Photo Upload</p>
                  <p className="text-sm text-muted-foreground">Drag & drop above</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Safety Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="font-medium text-yellow-800">⚠️ Your Safety First</p>
                <p className="text-yellow-700">
                  Do not put yourself at risk. If in immediate danger, call local emergency services.
                </p>
              </div>

              <ul className="space-y-2 text-muted-foreground">
                <li>• Report from a safe location</li>
                <li>• Do not confront suspected traffickers</li>
                <li>• Preserve evidence when safe to do so</li>
                <li>• All reports are treated confidentially</li>
                <li>• Response teams are dispatched within 30 minutes</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
