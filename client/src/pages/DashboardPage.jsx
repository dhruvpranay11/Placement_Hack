import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import {
  Code2,
  Brain,
  GraduationCap,
  Users2,
  FileText,
  Bot,
  Briefcase,
  Flame,
  Sparkles,
  Trophy,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Clock,
  Compass,
  Play,
  Zap,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import GlassCard from '../components/common/GlassCard'
import StatCard from '../components/common/StatCard'
import ProgressBar from '../components/common/ProgressBar'
import RankBadge from '../components/common/RankBadge'
import Button from '../components/common/Button'

export default function DashboardPage() {
  const { user, profile, hunterStats } = useAuth()
  const navigate = useNavigate()

  // State for interactive daily quest tasks
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Solve 2 Array Problems (Two Sum & Max Subarray)',
      topic: 'DSA Arena',
      xp: 20,
      time: '35 mins',
      completed: true,
      link: '/dashboard/dsa',
    },
    {
      id: 2,
      title: 'Complete 10 Questions on Profit & Loss',
      topic: 'Aptitude Training',
      xp: 20,
      time: '20 mins',
      completed: false,
      link: '/dashboard/aptitude',
    },
    {
      id: 3,
      title: 'Revise OOP 4 Pillars & Common Interview Traps',
      topic: 'Technical Academy',
      xp: 20,
      time: '25 mins',
      completed: false,
      link: '/dashboard/technical',
    },
    {
      id: 4,
      title: 'Practice 1 Behavioral "Tell Me About Yourself" Answer',
      topic: 'Interview Arena',
      xp: 30,
      time: '15 mins',
      completed: false,
      link: '/dashboard/interview',
    },
  ])

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextState = !t.completed
          if (nextState) {
            toast.success(`Task Complete! +${t.xp} XP awarded to your Hunter profile!`, {
              icon: '⚔️',
            })
          }
          return { ...t, completed: nextState }
        }
        return t
      })
    )
  }

  const hunterRank = hunterStats?.hunter_rank || 'E-Rank'
  const level = hunterStats?.level || 1
  const xp = hunterStats?.total_xp || 100
  const readinessScore = hunterStats?.placement_readiness_score || 35.0
  const streak = hunterStats?.current_streak || 3

  const completedCount = tasks.filter((t) => t.completed).length

  return (
    <div className="space-y-6">
      {/* Top Banner: Hunter Awakening Command Header */}
      <GlassCard className="p-6 sm:p-8 border-blue-500/30 relative overflow-hidden bg-radial-gradient">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <RankBadge rank={hunterRank} size="lg" />
              <span className="px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold">
                HUNTER LEVEL {level}
              </span>
              <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-400 text-xs font-semibold">
                <Flame className="w-3.5 h-3.5 fill-amber-400/40" />
                {streak} Day Streak
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
              Command Centre • {profile?.full_name || 'Candidate'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-sans">
              System is tracking your placement preparation. Complete your daily quests to level up and advance your Hunter Rank.
            </p>
          </div>

          {/* Quick CTA to AI Mentor / Roadmap */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate('/dashboard/roadmap')}
              icon={Compass}
            >
              View Active Roadmap
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => navigate('/dashboard/mentor')}
              icon={Bot}
            >
              Consult AI Mentor
            </Button>
          </div>
        </div>

        {/* Level XP Progress */}
        <div className="mt-6 pt-5 border-t border-slate-800">
          <ProgressBar
            value={xp % 100}
            max={100}
            label={`EXP PROGRESSION (LEVEL ${level} → LEVEL ${level + 1})`}
            color="electric"
            size="md"
          />
        </div>
      </GlassCard>

      {/* Main Placement Preparation Scores Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Placement Prep Score"
          value={`${readinessScore}%`}
          subvalue="Explainable metric"
          icon={Trophy}
          color="gold"
          trend={{ value: '+4.5%', isPositive: true, label: 'this week' }}
        />
        <StatCard
          title="Problem Solving (DSA)"
          value={`${hunterStats?.problem_solving || 20}/100`}
          subvalue="Medium arrays active"
          icon={Code2}
          color="blue"
        />
        <StatCard
          title="Aptitude Mastery"
          value={`${hunterStats?.intelligence || 25}/100`}
          subvalue="Quant & logic tested"
          icon={Brain}
          color="violet"
        />
        <StatCard
          title="Core CS Fundamentals"
          value={`${hunterStats?.technical_knowledge || 20}/100`}
          subvalue="OOP & DBMS reviewed"
          icon={GraduationCap}
          color="emerald"
        />
      </div>

      {/* Two Column Grid: Today's Mission & Recommended Action */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Today's Mission (Daily Quests) */}
        <div className="lg:col-span-8 space-y-4">
          <GlassCard className="p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-display">
                    Today's Mission Protocol
                  </h3>
                  <p className="text-xs text-slate-400">
                    {completedCount} of {tasks.length} Daily Quests Fulfilled
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded-full border border-cyan-500/30">
                +{tasks.reduce((acc, t) => acc + (t.completed ? t.xp : 0), 0)} XP Earned
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                    task.completed
                      ? 'bg-blue-950/20 border-emerald-500/40 text-slate-300'
                      : 'bg-slate-900/40 border-slate-800 hover:border-blue-500/30 text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                        task.completed
                          ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                          : 'border-slate-600 hover:border-cyan-400'
                      }`}
                    >
                      {task.completed && <CheckCircle2 className="w-4 h-4 stroke-[3]" />}
                    </button>
                    <div>
                      <p className={`text-xs font-semibold ${task.completed ? 'line-through text-slate-400' : ''}`}>
                        {task.title}
                      </p>
                      <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-0.5">
                        <span className="text-cyan-400 font-mono">{task.topic}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {task.time}
                        </span>
                        <span>•</span>
                        <span className="text-amber-400 font-mono">+{task.xp} XP</span>
                      </div>
                    </div>
                  </div>

                  <Link to={task.link}>
                    <Button variant="ghost" size="sm" className="text-xs">
                      Practice <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Quick Access Arsenal Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { to: '/dashboard/dsa', title: 'DSA Arena', desc: '100+ Problems', icon: Code2, color: 'text-cyan-400' },
              { to: '/dashboard/aptitude', title: 'Aptitude Hub', desc: 'Speed Quizzes', icon: Brain, color: 'text-purple-400' },
              { to: '/dashboard/technical', title: 'CS Academy', desc: '9 Core Subjects', icon: GraduationCap, color: 'text-amber-400' },
              { to: '/dashboard/interview', title: 'Mock Arena', desc: 'AI Interviewer', icon: Users2, color: 'text-emerald-400' },
            ].map((arena, i) => (
              <Link key={i} to={arena.to}>
                <div className="glass-panel p-4 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-all group flex flex-col justify-between h-full">
                  <div className={`p-2 rounded-lg bg-slate-900/80 w-fit mb-3 ${arena.color} group-hover:scale-110 transition-transform`}>
                    <arena.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {arena.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">{arena.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Right: Weakness Radar & Recommended Next Action */}
        <div className="lg:col-span-4 space-y-4">
          {/* AI Recommended Next Action */}
          <GlassCard className="p-5 border-cyan-500/30">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 mb-2">
              <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>AI RECOMMENDATION ENGINE</span>
            </div>
            <h4 className="text-sm font-bold text-white">Target Your Critical Weakness</h4>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Based on your initial skill assessment, your <strong className="text-cyan-300">DSA Dynamic Programming</strong> and <strong className="text-purple-300">Probability Aptitude</strong> have the highest placement weight.
            </p>
            <div className="mt-4 p-3 rounded-lg bg-blue-950/40 border border-blue-500/20 text-xs text-slate-300">
              <p className="font-semibold text-white">Recommended Action:</p>
              <p className="text-[11px] text-slate-400 mt-1">
                Complete the 15-minute "Permutations & Combinations" drill in Aptitude Hub.
              </p>
            </div>
            <Link to="/dashboard/aptitude" className="block mt-4">
              <Button variant="primary" size="sm" className="w-full" icon={Play}>
                Launch Targeted Drill
              </Button>
            </Link>
          </GlassCard>

          {/* Radar / Stat Breakdown */}
          <GlassCard className="p-5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-display">
              Hunter Attributes
            </h4>
            <div className="space-y-3">
              <ProgressBar
                value={hunterStats?.problem_solving || 20}
                max={100}
                label="Problem Solving"
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
                label="Technical Knowledge"
                color="emerald"
                size="sm"
              />
              <ProgressBar
                value={hunterStats?.communication || 15}
                max={100}
                label="Communication & HR"
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

