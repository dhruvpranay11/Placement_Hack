import React, { createContext, useContext, useEffect, useState, useMemo } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { api } from '../services/api'

const AuthContext = createContext(null)

const DEMO_USER_KEY = 'placeready_demo_user'
const DEMO_PROFILE_KEY = 'placeready_demo_profile'
const DEMO_HUNTER_KEY = 'placeready_demo_hunter'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [session, setSession] = useState(null)
  const [profile, setProfile] = useState(null)
  const [hunterStats, setHunterStats] = useState(null)
  const [loading, setLoading] = useState(true)

  // Initialize demo data if needed for standalone preview
  const initDemoHunter = (name = 'Shadow Coder') => {
    return {
      hunter_rank: 'E-Rank',
      level: 1,
      total_xp: 65,
      current_streak: 3,
      longest_streak: 5,
      intelligence: 18,
      problem_solving: 15,
      technical_knowledge: 20,
      communication: 14,
      development_skills: 16,
      interview_readiness: 12,
      placement_readiness_score: 32.5,
      name,
    }
  }

  // Load profile & hunter stats
  const fetchUserData = async (currentUserId) => {
    try {
      if (isSupabaseConfigured) {
        const profileRes = await api.get('/profile')
        if (profileRes?.data) {
          setProfile(profileRes.data.profile)
          setHunterStats(profileRes.data.hunter_stats)
          return
        }
      }
    } catch (err) {
      console.warn('API profile fetch error, checking local state:', err.message)
    }

    // Local / Demo fallback
    const savedProfile = localStorage.getItem(DEMO_PROFILE_KEY)
    const savedHunter = localStorage.getItem(DEMO_HUNTER_KEY)
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile))
    }
    if (savedHunter) {
      setHunterStats(JSON.parse(savedHunter))
    } else {
      const defaultHunter = initDemoHunter()
      setHunterStats(defaultHunter)
      localStorage.setItem(DEMO_HUNTER_KEY, JSON.stringify(defaultHunter))
    }
  }

  useEffect(() => {
    let mounted = true

    async function initAuth() {
      try {
        if (isSupabaseConfigured) {
          const { data: { session: currentSession } } = await supabase.auth.getSession()
          if (mounted && currentSession) {
            setSession(currentSession)
            setUser(currentSession.user)
            await fetchUserData(currentSession.user.id)
          }
        } else {
          // Check local mock user
          const savedMockUser = localStorage.getItem(DEMO_USER_KEY)
          if (savedMockUser && mounted) {
            const parsed = JSON.parse(savedMockUser)
            setUser(parsed)
            await fetchUserData(parsed.id)
          }
        }
      } catch (err) {
        console.error('Auth initialization error:', err)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    initAuth()

    let authListener = null
    if (isSupabaseConfigured) {
      const { data } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
        setSession(newSession)
        setUser(newSession?.user || null)
        if (newSession?.user) {
          await fetchUserData(newSession.user.id)
        } else {
          setProfile(null)
          setHunterStats(null)
        }
        setLoading(false)
      })
      authListener = data.subscription
    }

    return () => {
      mounted = false
      if (authListener) authListener.unsubscribe()
    }
  }, [])

  // Auth Actions
  const signUp = async (email, password, fullName = '') => {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
        },
      })
      if (error) throw error
      return data
    } else {
      // Mock Sign Up for rapid hackathon testing
      const mockId = 'mock-' + Math.random().toString(36).substring(2, 9)
      const mockUser = { id: mockId, email, user_metadata: { full_name: fullName } }
      localStorage.setItem(DEMO_USER_KEY, JSON.stringify(mockUser))
      localStorage.setItem('placeready_mock_token', 'mock_token_' + mockId)
      setUser(mockUser)
      const initialProfile = {
        user_id: mockId,
        full_name: fullName,
        email,
        onboarding_completed: false,
      }
      setProfile(initialProfile)
      localStorage.setItem(DEMO_PROFILE_KEY, JSON.stringify(initialProfile))
      const hStats = initDemoHunter(fullName)
      setHunterStats(hStats)
      localStorage.setItem(DEMO_HUNTER_KEY, JSON.stringify(hStats))
      return { user: mockUser }
    }
  }

  const signIn = async (email, password) => {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      return data
    } else {
      // Mock Sign In
      const existing = localStorage.getItem(DEMO_USER_KEY)
      let mockUser = existing ? JSON.parse(existing) : null
      if (!mockUser || mockUser.email !== email) {
        const mockId = 'mock-' + Math.random().toString(36).substring(2, 9)
        mockUser = { id: mockId, email, user_metadata: { full_name: email.split('@')[0] } }
        localStorage.setItem(DEMO_USER_KEY, JSON.stringify(mockUser))
      }
      localStorage.setItem('placeready_mock_token', 'mock_token_' + mockUser.id)
      setUser(mockUser)
      await fetchUserData(mockUser.id)
      return { user: mockUser }
    }
  }

  const signOut = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut()
    }
    localStorage.removeItem(DEMO_USER_KEY)
    localStorage.removeItem('placeready_mock_token')
    localStorage.removeItem(DEMO_PROFILE_KEY)
    localStorage.removeItem(DEMO_HUNTER_KEY)
    setUser(null)
    setSession(null)
    setProfile(null)
    setHunterStats(null)
  }

  const resetPassword = async (email) => {
    if (isSupabaseConfigured) {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })
      if (error) throw error
    }
    return true
  }

  const updateProfileOnboarding = async (onboardingData) => {
    try {
      if (isSupabaseConfigured) {
        const res = await api.post('/onboarding', onboardingData)
        if (res?.data?.profile) {
          setProfile(res.data.profile)
          if (res.data.hunter_stats) setHunterStats(res.data.hunter_stats)
          return res.data
        }
      }
    } catch (err) {
      console.warn('Backend onboarding API sync failed, saving locally:', err.message)
    }

    // Local fallback update
    const updated = {
      ...(profile || {}),
      ...onboardingData,
      onboarding_completed: true,
      updated_at: new Date().toISOString(),
    }
    setProfile(updated)
    localStorage.setItem(DEMO_PROFILE_KEY, JSON.stringify(updated))

    // Calculate initial hunter stats from answers
    const updatedHunter = {
      ...(hunterStats || initDemoHunter(updated.full_name)),
      hunter_rank: 'E-Rank',
      level: 1,
      total_xp: 100, // Welcome bonus
      intelligence: onboardingData.aptitude_proficiency === 'advanced' ? 30 : onboardingData.aptitude_proficiency === 'intermediate' ? 20 : 12,
      problem_solving: onboardingData.dsa_experience === 'advanced' ? 35 : onboardingData.dsa_experience === 'intermediate' ? 22 : 10,
      technical_knowledge: onboardingData.core_cs_proficiency === 'advanced' ? 30 : onboardingData.core_cs_proficiency === 'intermediate' ? 20 : 12,
      communication: 15,
      development_skills: onboardingData.development_experience === 'advanced' ? 35 : onboardingData.development_experience === 'intermediate' ? 20 : 10,
      interview_readiness: 12,
      placement_readiness_score: 28.0,
    }
    setHunterStats(updatedHunter)
    localStorage.setItem(DEMO_HUNTER_KEY, JSON.stringify(updatedHunter))

    return { profile: updated, hunter_stats: updatedHunter }
  }

  const value = useMemo(() => ({
    user,
    session,
    profile,
    hunterStats,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updateProfileOnboarding,
    refreshUserData: () => user && fetchUserData(user.id),
  }), [user, session, profile, hunterStats, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

