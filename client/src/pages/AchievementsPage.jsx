import React from 'react'
import { motion } from 'framer-motion'
import {
  Trophy,
  CheckCircle2,
  Lock,
  Sparkles,
  Flame,
  Award,
  Shield,
  Zap,
} from 'lucide-react'
import GlassCard from '../components/common/GlassCard'

export default function AchievementsPage() {
  const achievements = [
    {
      id: 'ach-1',
      title: 'First Blood',
      desc: 'Complete your first placement preparation challenge or quiz.',
      category: 'Milestone',
      unlocked: true,
      xp: 25,
      date: '2024-10-12',
    },
    {
      id: 'ach-2',
      title: 'Code Initiate',
      desc: 'Solve your first 5 verified DSA problems in the Arena.',
      category: 'DSA',
      unlocked: true,
      xp: 50,
      date: '2024-10-14',
    },
    {
      id: 'ach-3',
      title: 'Logic Awakening',
      desc: 'Score above 80% in an Aptitude Speed Sprint.',
      category: 'Aptitude',
      unlocked: true,
      xp: 50,
      date: '2024-10-18',
    },
    {
      id: 'ach-4',
      title: 'Consistency Hunter',
      desc: 'Maintain a 7-day continuous placement learning streak.',
      category: 'Streak',
      unlocked: false,
      xp: 100,
      progress: '3 / 7 Days',
    },
    {
      id: 'ach-5',
      title: 'Interview Challenger',
      desc: 'Complete your first Gemini AI mock technical interview.',
      category: 'Interview',
      unlocked: true,
      xp: 75,
      date: '2024-10-22',
    },
    {
      id: 'ach-6',
      title: 'DSA Warrior',
      desc: 'Solve 50 verified DSA problems across Arrays, DP, and Trees.',
      category: 'DSA',
      unlocked: false,
      xp: 200,
      progress: '14 / 50 Problems',
    },
    {
      id: 'ach-7',
      title: 'Technical Specialist',
      desc: 'Demonstrate strong core CS fundamentals across OOP, DBMS & OS.',
      category: 'Technical',
      unlocked: false,
      xp: 150,
      progress: '2 / 3 Subjects',
    },
    {
      id: 'ach-8',
      title: 'Rank Breaker',
      desc: 'Break through your limits and ascend from E-Rank to D-Rank.',
      category: 'Rank',
      unlocked: false,
      xp: 150,
      progress: '100 / 200 XP',
    },
  ]

  const unlockedCount = achievements.filter((a) => a.unlocked).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <GlassCard className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-xs font-mono text-amber-300 mb-2">
              <Trophy className="w-3.5 h-3.5" />
              HUNTER TROPHY ROOM
            </div>
            <h1 className="text-2xl font-bold font-display text-white">
              Placement Achievements
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Verify your placement milestones. Achievements award server-validated XP directly to your Hunter ledger.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-amber-400 bg-amber-950/60 px-3 py-1.5 rounded-xl border border-amber-500/30">
              UNLOCKED: {unlockedCount} / {achievements.length} ({Math.round((unlockedCount / achievements.length) * 100)}%)
            </span>
          </div>
        </div>
      </GlassCard>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {achievements.map((ach) => (
          <GlassCard
            key={ach.id}
            className={`p-5 flex flex-col justify-between ${
              ach.unlocked
                ? 'border-amber-500/30 glow-gold'
                : 'border-slate-800/80 opacity-70'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                    ach.unlocked
                      ? 'bg-amber-500/20 text-amber-300 border-amber-400/40'
                      : 'bg-slate-900 text-slate-600 border-slate-800'
                  }`}
                >
                  {ach.unlocked ? <Trophy className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                </div>

                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400">
                  +{ach.xp} XP
                </span>
              </div>

              <h4 className="text-sm font-bold text-white font-display">{ach.title}</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed font-sans">{ach.desc}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono flex items-center justify-between">
              <span className="text-slate-500">{ach.category}</span>
              {ach.unlocked ? (
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {ach.date}
                </span>
              ) : (
                <span className="text-amber-400/80">{ach.progress}</span>
              )}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}

