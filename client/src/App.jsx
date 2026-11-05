import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './context/AuthContext'
import LoadingScreen from './components/common/LoadingScreen'
import DashboardLayout from './components/layout/DashboardLayout'

// Public Pages
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import OnboardingPage from './pages/OnboardingPage'

// Protected Dashboard Pages
import DashboardPage from './pages/DashboardPage'
import RoadmapPage from './pages/RoadmapPage'
import DsaArenaPage from './pages/DsaArenaPage'
import AptitudePage from './pages/AptitudePage'
import TechnicalAcademyPage from './pages/TechnicalAcademyPage'
import InterviewArenaPage from './pages/InterviewArenaPage'
import ResumeForgePage from './pages/ResumeForgePage'
import AiMentorPage from './pages/AiMentorPage'
import PlacementTrackerPage from './pages/PlacementTrackerPage'
import SkillTreePage from './pages/SkillTreePage'
import AchievementsPage from './pages/AchievementsPage'
import AnalyticsPage from './pages/AnalyticsPage'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage'

// Protected Route Guard
function ProtectedRoute({ children }) {
  const { user, profile, loading } = useAuth()

  if (loading) {
    return <LoadingScreen message="Verifying Hunter Clearance..." />
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  // If user hasn't completed onboarding, enforce onboarding route
  if (profile && !profile.onboarding_completed && window.location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" replace />
  }

  return children
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              background: '#0a0f30',
              color: '#e2e8f0',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)',
              fontSize: '13px',
              fontFamily: 'Inter, sans-serif',
            },
          }}
        />

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* Onboarding Wizard Route */}
          <Route
            path="/onboarding"
            element={
              <ProtectedRoute>
                <OnboardingPage />
              </ProtectedRoute>
            }
          />

          {/* Protected Command Centre Modules */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="roadmap" element={<RoadmapPage />} />
            <Route path="dsa" element={<DsaArenaPage />} />
            <Route path="aptitude" element={<AptitudePage />} />
            <Route path="technical" element={<TechnicalAcademyPage />} />
            <Route path="interview" element={<InterviewArenaPage />} />
            <Route path="resume" element={<ResumeForgePage />} />
            <Route path="mentor" element={<AiMentorPage />} />
            <Route path="tracker" element={<PlacementTrackerPage />} />
            <Route path="skill-tree" element={<SkillTreePage />} />
            <Route path="achievements" element={<AchievementsPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
