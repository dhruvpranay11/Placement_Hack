import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import {
  Settings,
  Bell,
  Eye,
  Shield,
  Trash2,
  Save,
} from 'lucide-react'
import GlassCard from '../components/common/GlassCard'
import Button from '../components/common/Button'

export default function SettingsPage() {
  const [soundEffects, setSoundEffects] = useState(true)
  const [dailyReminders, setDailyReminders] = useState(true)
  const [reducedMotion, setReducedMotion] = useState(false)

  const handleSave = () => {
    toast.success('System Preferences Saved!')
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <GlassCard className="p-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-xs font-mono text-cyan-300 mb-2">
          <Settings className="w-3.5 h-3.5" />
          SYSTEM CONFIGURATION
        </div>
        <h1 className="text-2xl font-bold font-display text-white">
          System Preferences & Settings
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Customize notifications, interface motion, accessibility, and account security.
        </p>
      </GlassCard>

      <GlassCard className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h4 className="text-sm font-bold text-white">Daily Mission Quests Notifications</h4>
              <p className="text-xs text-slate-400">Receive reminders for uncompleted daily preparation quests.</p>
            </div>
            <input
              type="checkbox"
              checked={dailyReminders}
              onChange={(e) => setDailyReminders(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 bg-slate-900 border-slate-700"
            />
          </div>

          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h4 className="text-sm font-bold text-white">Solo Leveling Sound & Visual Effects</h4>
              <p className="text-xs text-slate-400">Play energetic visual rank-up and quest completion celebrations.</p>
            </div>
            <input
              type="checkbox"
              checked={soundEffects}
              onChange={(e) => setSoundEffects(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 bg-slate-900 border-slate-700"
            />
          </div>

          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h4 className="text-sm font-bold text-white">Reduced Motion Mode</h4>
              <p className="text-xs text-slate-400">Disable background float and glowing pulse animations for accessibility.</p>
            </div>
            <input
              type="checkbox"
              checked={reducedMotion}
              onChange={(e) => setReducedMotion(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 bg-slate-900 border-slate-700"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <Button variant="primary" size="sm" onClick={handleSave} icon={Save}>
            Save Preferences
          </Button>
        </div>
      </GlassCard>
    </div>
  )
}

