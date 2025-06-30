import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './components/auth-provider'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import AIChat from './pages/AIChat'
import GetHelp from './pages/GetHelp'
import SurvivorStories from './pages/SurvivorStories'
import RedZoneMapping from './pages/RedZoneMapping'
import SubmitReport from './pages/SubmitReport'
import MyCases from './pages/MyCases'
import TherapyNetwork from './pages/TherapyNetwork'
import Database from './pages/Database'
import Reports from './pages/Reports'
import Missions from './pages/Missions'
import { AppSidebar } from './components/app-sidebar'
import { Link } from "react-router-dom";
import { SignupForm } from '@/components/signup-form'


function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

function DashboardLayout() {
  return (
    <div className="flex h-screen bg-gray-50">
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-auto p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/ai-chat" element={<AIChat />} />
            <Route path="/get-help" element={<GetHelp />} />
            <Route path="/survivor-stories" element={<SurvivorStories />} />
            <Route path="/red-zone-mapping" element={<RedZoneMapping />} />
            <Route path="/submit-report" element={<SubmitReport />} />
            <Route path="/my-cases" element={<MyCases />} />
            <Route path="/therapy-network" element={<TherapyNetwork />} />
            <Route path="/database" element={<Database />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/missions" element={<Missions />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

function App() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <LandingPage />} />
      <Route 
        path="/dashboard/*" 
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        } 
      />
    </Routes>
  )
}

function AppWrapper() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  )
}

export default AppWrapper 
