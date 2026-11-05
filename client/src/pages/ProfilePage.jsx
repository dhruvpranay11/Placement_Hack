import React from 'react'
import { motion } from 'framer-motion'
import {
  User,
  Shield,
  GraduationCap,
  Target,
  Clock,
  Sparkles,
  Award,
  Terminal,
} from 'lucide-react'
import GlassCard from '../components/common/GlassCard'
import RankBadge from '../components/common/RankBadge'
import ProgressBar from '../components/common/ProgressBar'
import { useAuth } from '../context/AuthContext'

export default function ProfilePage() {
  const { user, profile, hunterStats } = useAuth()

  const rank = hunterStats?.hunter_rank || 'E-Rank'
  const level = hunterStats?.level || 1
  const xp = hunterStats?.total_xp || 100

  return (
    <div className="space-y-6">
      {/* Header */}
      <GlassCard className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 border border-cyan-400/40 flex items-center justify-center text-xl font-bold font-display text-white shadow-xl glow-blue">
              {(profile?.full_name || 'H').charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <RankBadge rank={rank} size="md" />
                <span className="text-xs font-mono font-bold text-cyan-300">
                  LEVEL {level}
                </span>
              </div>
              <h1 className="text-2xl font-bold font-display text-white">
                {profile?.full_name || user?.user_metadata?.full_name || 'Hunter Candidate'}
              </h1>
              <p className="text-xs text-slate-400 font-mono">
                {profile?.email || user?.email}
              </p>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Profile Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Academic Credentials */}
        <div className="lg:col-span-6 space-y-4">
          <GlassCard className="p-6 space-y-4">
            <h3 className="text-sm font-bold text-white font-mono uppercase flex items-center gap-2 border-b border-slate-800 pb-3">
              <GraduationCap className="w-4 h-4 text-cyan-400" /> Academic & College Credentials
            </h3>
            <div className="space-y-3 text-xs font-mono">
              <div className="flex justify-between py-2 border-b border-slate-800/60">
                <span className="text-slate-400">College / University:</span>
                <span className="text-white font-semibold">{profile?.college || 'National Institute of Technology'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800/60">
                <span className="text-slate-400">Degree & Branch:</span>
                <span className="text-cyan-300 font-semibold">{profile?.degree || 'B.Tech'} - {profile?.branch || 'CSE'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800/60">
                <span className="text-slate-400">Academic Year:</span>
                <span className="text-white font-semibold">{profile?.academic_year || '3rd Year'} (Grad 2025)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800/60">
                <span className="text-slate-400">Target Role:</span>
                <span className="text-purple-300 font-semibold">{profile?.target_role || 'Software Developer'}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-400">Primary Weapon:</span>
                <span className="text-amber-400 font-semibold uppercase">{profile?.preferred_language || 'Python'}</span>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Right: Attributes */}
        <div className="lg:col-span-6 space-y-4">
          <GlassCard className="p-6 space-y-4">
            <h3 className="text-sm font-bold text-white font-mono uppercase flex items-center gap-2 border-b border-slate-800 pb-3">
              <Shield className="w-4 h-4 text-emerald-400" /> Current Character Stats
            </h3>
            <div className="space-y-3">
              <ProgressBar
                value={hunterStats?.problem_solving || 20}
                max={100}
                label="Problem Solving (DSA)"
                color="cyan"
                size="sm"
              />
              <ProgressBar
                value={hunterStats?.intelligence || 25}
                max={100}
                label="Intelligence (Aptitude)"
                color="violet"
                size="sm"
              />
              <ProgressBar
                value={hunterStats?.technical_knowledge || 20}
                max={100}
                label="Technical Knowledge (CS)"
                color="emerald"
                size="sm"
              />
              <ProgressBar
                value={hunterStats?.communication || 15}
                max={100}
                label="Communication & Interview"
                color="gold"
                size="sm"
              />
              <ProgressBar
                value={hunterStats?.development_skills || 18}
                max={100}
                label="Development & Projects"
                color="electric"
                size="sm"
              />
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}

