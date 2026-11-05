import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export default function LoadingScreen({ message = 'Accessing PlaceReady System...' }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#080b1e] bg-system-grid">
      <div className="relative flex flex-col items-center">
        {/* Glowing animated rune / logo */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="w-24 h-24 rounded-2xl border-2 border-blue-500/40 bg-blue-950/30 flex items-center justify-center glow-blue"
        >
          <Sparkles className="w-10 h-10 text-cyan-400 animate-pulse" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-center"
        >
          <h2 className="text-xl font-bold font-display text-gradient-electric tracking-wider uppercase">
            PLACEREADY AI
          </h2>
          <p className="text-sm text-slate-400 mt-2 font-mono flex items-center justify-center gap-1">
            <span>[ SYSTEM ]</span> {message}
          </p>
        </motion.div>

        {/* Progress bar */}
        <div className="w-48 h-1 bg-slate-800 rounded-full mt-6 overflow-hidden">
          <motion.div
            animate={{ x: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
            className="w-1/2 h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
          />
        </div>
      </div>
    </div>
  )
}

