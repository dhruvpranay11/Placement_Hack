import React from 'react'
import { motion } from 'framer-motion'
import {
  BarChart3,
  TrendingUp,
  Award,
  Zap,
  Target,
  Clock,
  Code2,
  Brain,
  GraduationCap,
} from 'lucide-react'
import GlassCard from '../components/common/GlassCard'
import StatCard from '../components/common/StatCard'
import ProgressBar from '../components/common/ProgressBar'

export default function AnalyticsPage() {
  const dsaDistribution = [
    { label: 'Easy (Foundational)', count: 8, total: 15, pct: 53, color: 'emerald' },
    { label: 'Medium (Core Placement)', count: 5, total: 20, pct: 25, color: 'cyan' },
    { label: 'Hard (Top-Tier OA)', count: 1, total: 10, pct: 10, color: 'violet' },
  ]

  const aptitudeBreakdown = [
    { topic: 'Percentages & Ratios', accuracy: '88%', attempts: 25 },
    { topic: 'Time & Work', accuracy: '76%', attempts: 18 },
    { topic: 'Number Series & Codes', accuracy: '92%', attempts: 30 },
    { topic: 'Permutations & Probability', accuracy: '54%', attempts: 12 }, // Weakness
    { topic: 'Reading Comprehension', accuracy: '80%', attempts: 15 },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <GlassCard className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-xs font-mono text-cyan-300 mb-2">
              <BarChart3 className="w-3.5 h-3.5" />
              INTELLIGENT PROGRESS TELEMETRY
            </div>
            <h1 className="text-2xl font-bold font-display text-white">
              Placement Preparation Analytics
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Data-backed evaluation of your coding velocity, aptitude accuracy, and overall placement readiness trajectory.
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Top 3 KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Overall Placement Readiness"
          value="35.0%"
          subvalue="Explainable metric"
          icon={Award}
          color="gold"
          trend={{ value: '+4.5%', isPositive: true, label: 'this week' }}
        />
        <StatCard
          title="Total Verified XP"
          value="165 XP"
          subvalue="Rank: E-Rank (Level 1)"
          icon={Zap}
          color="blue"
        />
        <StatCard
          title="Daily Study Consistency"
          value="3 Days"
          subvalue="Longest: 5 Days"
          icon={TrendingUp}
          color="emerald"
        />
      </div>

      {/* Analytics Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: DSA Solved By Difficulty */}
        <div className="lg:col-span-6 space-y-4">
          <GlassCard className="p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white font-mono uppercase flex items-center gap-2">
                <Code2 className="w-4 h-4 text-cyan-400" /> DSA Problem Solving Distribution
              </h3>
              <span className="text-xs font-mono text-cyan-300">14 Solved</span>
            </div>

            <div className="space-y-4 pt-2">
              {dsaDistribution.map((d, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>{d.label}</span>
                    <span className="font-mono text-cyan-400">{d.count} / {d.total} ({d.pct}%)</span>
                  </div>
                  <ProgressBar value={d.count} max={d.total} color={d.color} size="md" showValue={false} />
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Right: Aptitude Accuracy by Topic */}
        <div className="lg:col-span-6 space-y-4">
          <GlassCard className="p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white font-mono uppercase flex items-center gap-2">
                <Brain className="w-4 h-4 text-purple-400" /> Aptitude Accuracy By Domain
              </h3>
              <span className="text-xs font-mono text-purple-300">100 Attempts</span>
            </div>

            <div className="space-y-2.5 pt-2 text-xs">
              {aptitudeBreakdown.map((apt, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-slate-900/50 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-white block">{apt.topic}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{apt.attempts} questions answered</span>
                  </div>
                  <span
                    className={`font-mono font-bold px-2 py-0.5 rounded ${
                      parseInt(apt.accuracy) >= 80
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : parseInt(apt.accuracy) >= 70
                        ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}
                  >
                    {apt.accuracy}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}

