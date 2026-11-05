import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'

export default function StatCard({
  title,
  value,
  subvalue,
  icon: Icon,
  trend = null, // { value: '+12%', isPositive: true }
  color = 'blue', // 'blue', 'violet', 'cyan', 'gold', 'emerald'
  delay = 0,
  className = '',
}) {
  const iconBg = {
    blue: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    violet: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
    cyan: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
    gold: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    emerald: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      className={`glass-panel p-5 relative overflow-hidden glass-panel-hover ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs uppercase font-semibold tracking-wider text-slate-400">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold font-display text-white tracking-tight">{value}</h3>
            {subvalue && <span className="text-xs text-slate-400 font-normal">{subvalue}</span>}
          </div>
        </div>

        {Icon && (
          <div className={`p-2.5 rounded-xl border ${iconBg[color] || iconBg.blue}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {trend && (
        <div className="mt-3 flex items-center gap-1.5 text-xs">
          {trend.isPositive ? (
            <span className="text-emerald-400 flex items-center font-medium">
              <TrendingUp className="w-3.5 h-3.5 mr-0.5" />
              {trend.value}
            </span>
          ) : (
            <span className="text-rose-400 flex items-center font-medium">
              <TrendingDown className="w-3.5 h-3.5 mr-0.5" />
              {trend.value}
            </span>
          )}
          {trend.label && <span className="text-slate-400">{trend.label}</span>}
        </div>
      )}
    </motion.div>
  )
}

