import React from 'react'
import { motion } from 'framer-motion'

export default function ProgressBar({
  value = 0,
  max = 100,
  label = '',
  showValue = true,
  color = 'electric', // 'electric', 'violet', 'cyan', 'gold', 'emerald'
  size = 'md', // 'sm', 'md', 'lg'
  className = '',
}) {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)))

  const colors = {
    electric: 'from-blue-600 to-cyan-400 shadow-blue-500/30',
    violet: 'from-purple-600 to-indigo-400 shadow-purple-500/30',
    cyan: 'from-cyan-500 to-teal-400 shadow-cyan-500/30',
    gold: 'from-amber-500 to-yellow-300 shadow-amber-500/30',
    emerald: 'from-emerald-600 to-teal-400 shadow-emerald-500/30',
  }

  const heights = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  }

  return (
    <div className={`w-full space-y-1.5 ${className}`}>
      {(label || showValue) && (
        <div className="flex justify-between items-center text-xs text-slate-300 font-medium">
          {label && <span>{label}</span>}
          {showValue && <span className="font-mono text-slate-400">{percentage}%</span>}
        </div>
      )}
      <div className={`w-full bg-slate-900/90 rounded-full overflow-hidden border border-slate-700/40 p-0.5 ${heights[size]}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`h-full rounded-full bg-gradient-to-r ${colors[color]} shadow-md`}
        />
      </div>
    </div>
  )
}

