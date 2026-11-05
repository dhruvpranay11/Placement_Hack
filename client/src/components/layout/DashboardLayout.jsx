import React, { useState } from 'react'
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Compass,
  Code2,
  Brain,
  GraduationCap,
  Users2,
  FileText,
  Bot,
  Briefcase,
  GitFork,
  Trophy,
  BarChart3,
  User,
  Settings,
  LogOut,
  Flame,
  Bell,
  Menu,
  X,
  Sparkles,
  ChevronRight,
  Shield,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import RankBadge from '../common/RankBadge'
import PageTransition from '../common/PageTransition'

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, profile, hunterStats, signOut } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  const navItems = [
    { to: '/dashboard', label: 'Command Centre', icon: LayoutDashboard, end: true },
    { to: '/dashboard/roadmap', label: 'My Roadmap', icon: Compass },
    { to: '/dashboard/dsa', label: 'DSA Arena', icon: Code2, badge: '500+' },
    { to: '/dashboard/aptitude', label: 'Aptitude Training', icon: Brain },
    { to: '/dashboard/technical', label: 'Technical Academy', icon: GraduationCap },
    { to: '/dashboard/interview', label: 'Interview Arena', icon: Users2, highlight: true },
    { to: '/dashboard/resume', label: 'Resume Forge', icon: FileText },
    { to: '/dashboard/mentor', label: 'AI Mentor', icon: Bot, highlight: true },
    { to: '/dashboard/tracker', label: 'Placement Tracker', icon: Briefcase },
    { to: '/dashboard/skill-tree', label: 'Skill Tree', icon: GitFork },
    { to: '/dashboard/achievements', label: 'Achievements', icon: Trophy },
    { to: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
  ]

  const userRank = hunterStats?.hunter_rank || 'E-Rank'
  const userLevel = hunterStats?.level || 1
  const userXP = hunterStats?.total_xp || 0
  const xpNeeded = userLevel * 100
  const currentLevelXP = userXP % 100
  const streak = hunterStats?.current_streak || 1

  return (
    <div className="min-h-screen bg-[#080b1e] text-slate-100 flex overflow-hidden bg-system-grid">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-64 bg-[#0a0f30]/95 backdrop-blur-xl border-r border-blue-500/20 flex flex-col transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand / Logo */}
        <div className="p-4 border-b border-blue-500/15 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center glow-blue">
              <Sparkles className="w-4 h-4 text-cyan-300" />
            </div>
            <div>
              <span className="font-display font-extrabold text-lg text-white tracking-wider">
                PLACEREADY <span className="text-cyan-400">AI</span>
              </span>
              <p className="text-[9px] font-mono text-blue-300/60 uppercase tracking-widest">
                SYSTEM INTERFACE
              </p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hunter Status Mini-Card */}
        <div className="p-3 mx-3 my-3 rounded-xl bg-blue-950/40 border border-blue-500/20">
          <div className="flex items-center justify-between mb-2">
            <RankBadge rank={userRank} size="sm" showLabel={false} />
            <span className="text-xs font-mono font-bold text-cyan-300">
              LVL {userLevel}
            </span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>EXP</span>
              <span className="font-mono">{currentLevelXP} / {100} XP</span>
            </div>
            <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-blue-500/20">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500"
                style={{ width: `${(currentLevelXP / 100) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600/20 text-cyan-300 border border-blue-500/40 glow-blue font-semibold'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-white/5 border border-transparent'
                  }`
                }
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${item.highlight ? 'text-cyan-400' : ''}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded-full font-mono border border-blue-500/30">
                    {item.badge}
                  </span>
                )}
                {item.highlight && (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                )}
              </NavLink>
            )
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-3 border-t border-blue-500/15 space-y-1">
          <NavLink
            to="/dashboard/profile"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-blue-600/20 text-cyan-300 border border-blue-500/40'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
              }`
            }
          >
            <User className="w-4 h-4" />
            <span>Hunter Profile</span>
          </NavLink>
          <NavLink
            to="/dashboard/settings"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-blue-600/20 text-cyan-300 border border-blue-500/40'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
              }`
            }
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </NavLink>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Leave System</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-[#0a0f30]/80 backdrop-blur-md border-b border-blue-500/20 px-4 sm:px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>Welcome, Hunter {profile?.full_name?.split(' ')[0] || user?.user_metadata?.full_name || 'Candidate'}</span>
                <span className="hidden sm:inline-block text-xs font-mono font-normal text-cyan-400/80">
                  [{userRank}]
                </span>
              </h1>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Daily preparation quest active • Level {userLevel}
              </p>
            </div>
          </div>

          {/* Quick Stats Header Bar */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Streak Counter */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
              <Flame className="w-4 h-4 text-amber-400 animate-pulse fill-amber-400/30" />
              <span>{streak} Day Streak</span>
            </div>

            {/* Total XP Badge */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>{userXP} XP</span>
            </div>

            {/* Notification Bell */}
            <button
              onClick={() => navigate('/dashboard/achievements')}
              className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400" />
            </button>

            {/* Profile Avatar */}
            <button
              onClick={() => navigate('/dashboard/profile')}
              className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-violet-600 border border-cyan-400/40 flex items-center justify-center text-xs font-bold text-white shadow-md shadow-blue-500/30 hover:scale-105 transition-transform"
            >
              {(profile?.full_name || user?.user_metadata?.full_name || 'H').charAt(0).toUpperCase()}
            </button>
          </div>
        </header>

        {/* Dynamic Route Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </main>
      </div>
    </div>
  )
}

