import React from 'react'
import { motion } from 'framer-motion'

export default function GlassCard({
  children,
  className = '',
  hover = true,
  glow = '', // 'blue', 'violet', 'cyan', 'gold', 'emerald'
  delay = 0,
  onClick,
  ...props
}) {
  const glowClasses = {
    blue: 'glow-blue',
    violet: 'glow-violet',
    cyan: 'glow-cyan',
    gold: 'glow-gold',
    emerald: 'glow-emerald',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.25, 0.1, 0.25, 1.0] }}
      onClick={onClick}
      className={`glass-panel p-6 ${hover ? 'glass-panel-hover' : ''} ${glow ? glowClasses[glow] : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}

