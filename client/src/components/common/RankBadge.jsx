import React from 'react'
import { Shield, Sparkles, Flame, Crown } from 'lucide-react'

export default function RankBadge({ rank = 'E-Rank', size = 'md', showLabel = true, className = '' }) {
  const rankConfigs = {
    'E-Rank': {
      class: 'rank-badge-e',
      border: 'border-slate-500/40',
      text: 'text-slate-300',
      icon: Shield,
      glow: '',
      title: 'Beginner Hunter',
    },
    'D-Rank': {
      class: 'rank-badge-d',
      border: 'border-emerald-500/40',
      text: 'text-emerald-400',
      icon: Shield,
      glow: 'shadow-emerald-500/20 shadow-md',
      title: 'Developing Hunter',
    },
    'C-Rank': {
      class: 'rank-badge-c',
      border: 'border-blue-500/40',
      text: 'text-blue-400',
      icon: Shield,
      glow: 'shadow-blue-500/25 shadow-md',
      title: 'Intermediate Hunter',
    },
    'B-Rank': {
      class: 'rank-badge-b',
      border: 'border-purple-500/40',
      text: 'text-purple-400',
      icon: Sparkles,
      glow: 'shadow-purple-500/30 shadow-lg',
      title: 'Advanced Hunter',
    },
    'A-Rank': {
      class: 'rank-badge-a',
      border: 'border-amber-500/50',
      text: 'text-amber-300',
      icon: Flame,
      glow: 'shadow-amber-500/40 shadow-xl',
      title: 'Expert Hunter',
    },
    'S-Rank': {
      class: 'rank-badge-s',
      border: 'border-red-500/60',
      text: 'text-red-400',
      icon: Crown,
      glow: 'shadow-red-500/50 shadow-2xl animate-pulse',
      title: 'Elite Hunter',
    },
    'National Elite': {
      class: 'rank-badge-national',
      border: 'border-yellow-400/80',
      text: 'text-yellow-200',
      icon: Crown,
      glow: 'shadow-yellow-400/60 shadow-2xl animate-pulse',
      title: 'National Elite Hunter',
    },
  }

  const current = rankConfigs[rank] || rankConfigs['E-Rank']
  const Icon = current.icon

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs px-3 py-1 gap-1.5 font-semibold',
    lg: 'text-sm px-4 py-1.5 gap-2 font-bold tracking-wide',
    xl: 'text-base px-5 py-2.5 gap-2.5 font-extrabold tracking-wider',
  }

  return (
    <span
      className={`inline-flex items-center rounded-full border ${current.class} ${current.border} ${current.glow} ${sizeClasses[size]} ${className}`}
      title={current.title}
    >
      <Icon className={size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5'} />
      <span className="font-display uppercase tracking-wider">{rank}</span>
      {showLabel && size !== 'sm' && (
        <span className="text-[10px] text-slate-400 font-normal border-l border-white/20 pl-1.5 hidden sm:inline">
          {current.title.split(' ')[0]}
        </span>
      )}
    </span>
  )
}

