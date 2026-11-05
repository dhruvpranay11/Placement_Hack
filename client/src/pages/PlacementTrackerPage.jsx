import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-hot-toast'
import {
  Briefcase,
  Plus,
  Calendar,
  Building,
  CheckCircle2,
  Clock,
  MoreVertical,
  X,
  ExternalLink,
} from 'lucide-react'
import GlassCard from '../components/common/GlassCard'
import Button from '../components/common/Button'

export default function PlacementTrackerPage() {
  const [viewMode, setViewMode] = useState('kanban') // 'kanban', 'list'
  const [modalOpen, setModalOpen] = useState(false)

  const [applications, setApplications] = useState([
    {
      id: 'app-1',
      company: 'Google',
      role: 'Software Engineer (Campus 2025)',
      stage: 'online_assessment',
      appliedDate: '2024-10-15',
      deadline: '2024-11-12',
      notes: 'OA consists of 2 algorithmic questions (DP and Graph BFS).',
    },
    {
      id: 'app-2',
      company: 'Microsoft',
      role: 'Software Development Engineer',
      stage: 'technical_interview',
      appliedDate: '2024-10-20',
      deadline: '2024-11-15',
      notes: 'Round 1 cleared. Focus on OOP design and Trees traversal for Round 2.',
    },
    {
      id: 'app-3',
      company: 'Amazon',
      role: 'SDE-1',
      stage: 'applied',
      appliedDate: '2024-10-28',
      deadline: '2024-11-20',
      notes: 'Applied with referral. Awaiting OA link.',
    },
    {
      id: 'app-4',
      company: 'Atlassian',
      role: 'Graduate Software Developer',
      stage: 'selected',
      appliedDate: '2024-09-10',
      deadline: '2024-10-30',
      notes: 'Offer letter received! CTC verified.',
    },
  ])

  const [newApp, setNewApp] = useState({
    company: '',
    role: '',
    stage: 'applied',
    deadline: '',
    notes: '',
  })

  const stages = [
    { id: 'applied', label: 'Applied', color: 'border-blue-500/40' },
    { id: 'online_assessment', label: 'Online Assessment', color: 'border-purple-500/40' },
    { id: 'technical_interview', label: 'Technical Rounds', color: 'border-amber-500/40' },
    { id: 'selected', label: 'Offer / Selected', color: 'border-emerald-500/40' },
  ]

  const handleAddApplication = (e) => {
    e.preventDefault()
    if (!newApp.company || !newApp.role) {
      toast.error('Company and Role are required')
      return
    }

    const item = {
      id: 'app-' + Math.random().toString(36).substring(2, 7),
      ...newApp,
      appliedDate: new Date().toISOString().split('T')[0],
    }

    setApplications([...applications, item])
    setModalOpen(false)
    setNewApp({ company: '', role: '', stage: 'applied', deadline: '', notes: '' })
    toast.success('Application added to your Placement Tracker!')
  }

  const moveStage = (appId, nextStage) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === appId ? { ...a, stage: nextStage } : a))
    )
    toast.success('Stage updated!')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <GlassCard className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-xs font-mono text-cyan-300 mb-2">
              <Briefcase className="w-3.5 h-3.5" />
              PERSONAL APPLICATION TRACKER
            </div>
            <h1 className="text-2xl font-bold font-display text-white">
              Placement Application Tracker
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Track your campus placement drives, OA test deadlines, technical interviews, and final results.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex bg-[#0a0f30] border border-slate-800 rounded-xl p-1 text-xs font-mono">
              <button
                onClick={() => setViewMode('kanban')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  viewMode === 'kanban' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400'
                }`}
              >
                Kanban
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400'
                }`}
              >
                Table List
              </button>
            </div>

            <Button
              variant="primary"
              size="sm"
              onClick={() => setModalOpen(true)}
              icon={Plus}
            >
              Add Application
            </Button>
          </div>
        </div>
      </GlassCard>

      {/* Kanban Board View */}
      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stages.map((stg) => {
            const appsInStage = applications.filter((a) => a.stage === stg.id)
            return (
              <div key={stg.id} className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-xs font-bold font-mono text-white uppercase tracking-wider">
                    {stg.label}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800">
                    {appsInStage.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {appsInStage.map((app) => (
                    <div
                      key={app.id}
                      className="p-4 rounded-xl bg-[#0a0f30]/90 border border-blue-500/20 hover:border-blue-500/40 transition-all space-y-2.5 shadow-md"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-sm font-bold text-white font-display">
                            {app.company}
                          </h4>
                          <p className="text-xs text-cyan-400">{app.role}</p>
                        </div>
                      </div>

                      {app.deadline && (
                        <div className="flex items-center gap-1.5 text-[11px] font-mono text-amber-400">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Deadline: {app.deadline}</span>
                        </div>
                      )}

                      {app.notes && (
                        <p className="text-[11px] text-slate-400 font-sans line-clamp-2">
                          {app.notes}
                        </p>
                      )}

                      {/* Advance Stage Dropdown / Buttons */}
                      <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                        <span className="text-slate-500 font-mono">Move:</span>
                        <div className="flex gap-1">
                          {stages
                            .filter((s) => s.id !== app.stage)
                            .map((s) => (
                              <button
                                key={s.id}
                                onClick={() => moveStage(app.id, s.id)}
                                className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white transition-colors"
                              >
                                {s.label.split(' ')[0]}
                              </button>
                            ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        /* Table View */
        <GlassCard className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0b1033] border-b border-blue-500/20 text-slate-400 font-mono uppercase">
                <tr>
                  <th className="py-3 px-4">Company</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Stage</th>
                  <th className="py-3 px-4">Applied Date</th>
                  <th className="py-3 px-4">Deadline</th>
                  <th className="py-3 px-4">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-900/40">
                    <td className="py-3 px-4 font-bold text-white">{app.company}</td>
                    <td className="py-3 px-4 text-cyan-300">{app.role}</td>
                    <td className="py-3 px-4 font-mono capitalize">
                      <span className="px-2 py-0.5 rounded bg-blue-500/10 text-cyan-400 border border-blue-500/20">
                        {app.stage.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-400 font-mono">{app.appliedDate}</td>
                    <td className="py-3 px-4 text-amber-400 font-mono">{app.deadline || '-'}</td>
                    <td className="py-3 px-4 text-slate-400 truncate max-w-xs">{app.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      )}

      {/* Add Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-[#0a0f30] border border-blue-500/40 rounded-2xl p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-base font-bold text-white font-display">
                  Add Placement Application
                </h3>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddApplication} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={newApp.company}
                    onChange={(e) => setNewApp({ ...newApp, company: e.target.value })}
                    placeholder="e.g. Microsoft, Google, Oracle"
                    className="w-full bg-[#080b1e] border border-blue-500/30 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Job Role *</label>
                  <input
                    type="text"
                    required
                    value={newApp.role}
                    onChange={(e) => setNewApp({ ...newApp, role: e.target.value })}
                    placeholder="e.g. Software Engineer, SDE-1"
                    className="w-full bg-[#080b1e] border border-blue-500/30 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Current Stage</label>
                  <select
                    value={newApp.stage}
                    onChange={(e) => setNewApp({ ...newApp, stage: e.target.value })}
                    className="w-full bg-[#080b1e] border border-blue-500/30 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                  >
                    {stages.map((s) => (
                      <option key={s.id} value={s.id}>{s.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Upcoming Deadline</label>
                  <input
                    type="date"
                    value={newApp.deadline}
                    onChange={(e) => setNewApp({ ...newApp, deadline: e.target.value })}
                    className="w-full bg-[#080b1e] border border-blue-500/30 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Notes</label>
                  <textarea
                    rows={2}
                    value={newApp.notes}
                    onChange={(e) => setNewApp({ ...newApp, notes: e.target.value })}
                    placeholder="OA formats, referral details, or round notes..."
                    className="w-full bg-[#080b1e] border border-blue-500/30 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 resize-none"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" size="sm" type="submit">
                    Save Application
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

