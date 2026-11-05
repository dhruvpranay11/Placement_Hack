import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Sparkles,
  Shield,
  Zap,
  Target,
  Trophy,
  Code2,
  Brain,
  GraduationCap,
  Users2,
  FileText,
  BarChart3,
  Bot,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Flame,
  Award,
  BookOpen,
  Compass,
} from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Button from '../components/common/Button'
import GlassCard from '../components/common/GlassCard'
import RankBadge from '../components/common/RankBadge'

export default function LandingPage() {
  const navigate = useNavigate()
  const [openFaq, setOpenFaq] = useState(0)

  const features = [
    {
      icon: Compass,
      title: 'AI-Powered Roadmap',
      desc: 'Adaptive week-by-week curriculum tailored to your target role, college timeline, and current skill baseline.',
      color: 'from-blue-500 to-indigo-600',
    },
    {
      icon: Code2,
      title: 'DSA Arena',
      desc: 'Curated 100+ placement-verified DSA questions with optimal Python/Java solutions, complexity breakdowns, and test cases.',
      color: 'from-cyan-500 to-blue-600',
    },
    {
      icon: Brain,
      title: 'Aptitude Training',
      desc: 'Topic-wise quantitative math, logical reasoning, and verbal tests with detailed step-by-step shortcuts.',
      color: 'from-purple-500 to-pink-600',
    },
    {
      icon: GraduationCap,
      title: 'Technical Academy',
      desc: 'Core CS fundamentals in OOP, DBMS, OS, Computer Networks, and System Design with an AI "Explain This Concept" engine.',
      color: 'from-amber-500 to-orange-600',
    },
    {
      icon: Users2,
      title: 'AI Interview Arena',
      desc: 'Simulated technical and HR mock interviews powered by Gemini. Real-time follow-ups and comprehensive evaluation reports.',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      icon: FileText,
      title: 'Resume Forge',
      desc: 'Extract and analyze your resume for clarity, metrics, and bullet-point impact without hallucinating fake experience.',
      color: 'from-rose-500 to-red-600',
    },
    {
      icon: Trophy,
      title: 'Gamified Hunter Ranks',
      desc: 'Level up from E-Rank to National Elite. Earn XP for genuine learning milestones, solve daily quests, and defeat Boss Battles.',
      color: 'from-yellow-500 to-amber-600',
    },
    {
      icon: BarChart3,
      title: 'Placement Readiness Engine',
      desc: 'Transparent, explainable preparation scoring across DSA, aptitude, core CS, and communication with weakness detection.',
      color: 'from-indigo-500 to-violet-600',
    },
  ]

  const ranks = [
    { rank: 'E-Rank', label: 'Beginner', xp: '0 - 200 XP', desc: 'Starting your placement preparation journey' },
    { rank: 'D-Rank', label: 'Developing', xp: '200 - 500 XP', desc: 'Grasping foundational algorithms and aptitude' },
    { rank: 'C-Rank', label: 'Intermediate', xp: '500 - 1200 XP', desc: 'Comfortable with core CS subjects and standard DSA' },
    { rank: 'B-Rank', label: 'Advanced', xp: '1200 - 2500 XP', desc: 'Solving medium-hard problems and passing mock tests' },
    { rank: 'A-Rank', label: 'Expert', xp: '2500 - 5000 XP', desc: 'Mastering system design and complex algorithmic paradigms' },
    { rank: 'S-Rank', label: 'Elite', xp: '5000+ XP', desc: 'Consistently excelling in mock company assessments' },
    { rank: 'National Elite', label: 'Apex', xp: 'Top 1% Performers', desc: 'Exceptional mastery across technical and interview domains' },
  ]

  const faqs = [
    {
      q: 'What is PlaceReady AI?',
      a: 'PlaceReady AI is an AI-powered, gamified placement training system built specifically for Computer Science students. It transforms traditional exam cramming into an immersive quest-based training journey with personalized AI roadmaps, DSA training, aptitude quizzes, core CS academies, and mock interviews.',
    },
    {
      q: 'How does the Solo Leveling-inspired gamification work?',
      a: 'Every student begins as an E-Rank Hunter. By completing verified learning activities—like solving coding questions, acing aptitude tests, completing mock interviews, and clearing weekly Boss Battles—you earn XP and level up your character stats (Intelligence, Problem Solving, Technical Knowledge, Communication). No arbitrary XP is awarded just for logging in.',
    },
    {
      q: 'What is the Placement Preparation Score?',
      a: 'It is a transparent, explainable metric calculated from your verified performance in DSA, aptitude, core CS fundamentals, and mock interviews. It highlights your top 3 weaknesses and suggests immediate quests to close those gaps. We do not make false guarantees about job offers.',
    },
    {
      q: 'Is PlaceReady AI free to use?',
      a: 'Yes! PlaceReady AI offers a generous Free Plan that gives you access to the student profile, basic placement roadmap, curated DSA practice, aptitude quizzes, and the placement application tracker. An optional Pro Plan (₹799 / 3 months) unlocks full question banks, unlimited academy access, and expanded AI mock interviews.',
    },
    {
      q: 'How does the AI Mock Interview system work?',
      a: 'Our AI Interview Arena engages you in structured text-based technical, DSA, core CS, and HR interviews. It asks one question at a time, evaluates your answers for technical correctness and depth, poses intelligent follow-ups, and delivers a question-by-question diagnostic report at the end.',
    },
    {
      q: 'Can I track my campus placement applications?',
      a: 'Yes. The built-in Placement Tracker allows you to manage all your job applications via Kanban board and list views, track interview deadlines, log notes, and review your application funnel.',
    },
  ]

  return (
    <div className="min-h-screen bg-[#080b1e] text-slate-100 bg-system-grid overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-radial-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-mono glow-blue">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>SYSTEM AWAKENING: PLACEMENT READINESS RE-ENGINEERED</span>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-tight">
                Your Placement Journey <br />
                <span className="text-gradient-electric">Starts Here.</span>
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans">
                An AI-powered training system that helps you master coding, aptitude, technical interviews, and communication — one level at a time. Awaken your true engineering potential through Solo Leveling-inspired progression.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate('/register')}
                  icon={Shield}
                  className="w-full sm:w-auto glow-blue"
                >
                  Start Your Journey
                </Button>
                <a href="#how-it-works" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Explore the System
                  </Button>
                </a>
              </div>

              {/* Highlights */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-800/80">
                <div>
                  <h4 className="text-2xl font-bold font-display text-cyan-400">100+</h4>
                  <p className="text-xs text-slate-400">Curated DSA Problems</p>
                </div>
                <div>
                  <h4 className="text-2xl font-bold font-display text-blue-400">7 Ranks</h4>
                  <p className="text-xs text-slate-400">Hunter Progression</p>
                </div>
                <div>
                  <h4 className="text-2xl font-bold font-display text-purple-400">AI Powered</h4>
                  <p className="text-xs text-slate-400">Mock Mentorship</p>
                </div>
              </div>
            </motion.div>

            {/* Right: Solo Leveling System Interface Mock */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative mx-auto max-w-md">
                {/* Outer Glow Halo */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 opacity-30 blur-2xl animate-pulse" />

                {/* System Window Card */}
                <div className="relative rounded-2xl bg-[#0a0f30]/90 backdrop-blur-2xl border border-blue-500/40 p-6 shadow-2xl glow-blue">
                  {/* System Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-blue-500/20">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                      <span className="text-xs font-mono uppercase tracking-widest text-cyan-300">
                        [ SYSTEM STATUS: ACTIVE ]
                      </span>
                    </div>
                    <RankBadge rank="B-Rank" size="sm" />
                  </div>

                  {/* Player Info */}
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-400 font-mono">PLAYER</p>
                      <h3 className="text-lg font-bold font-display text-white">Shadow Coder</h3>
                      <p className="text-xs text-blue-400 font-mono">Level 24 Hunter</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-400 font-mono">READINESS SCORE</p>
                      <h3 className="text-2xl font-extrabold font-display text-gradient-gold">84.5%</h3>
                    </div>
                  </div>

                  {/* Stats Bars */}
                  <div className="mt-6 space-y-3 font-mono text-xs">
                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>PROBLEM SOLVING (DSA)</span>
                        <span className="text-cyan-400">82 / 100</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-900 overflow-hidden border border-blue-500/20">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 w-[82%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>INTELLIGENCE (APTITUDE)</span>
                        <span className="text-purple-400">88 / 100</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-900 overflow-hidden border border-purple-500/20">
                        <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-400 w-[88%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>TECH KNOWLEDGE (CORE CS)</span>
                        <span className="text-emerald-400">76 / 100</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-900 overflow-hidden border border-emerald-500/20">
                        <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 w-[76%]" />
                      </div>
                    </div>
                  </div>

                  {/* Current Daily Quest */}
                  <div className="mt-6 p-4 rounded-xl bg-blue-950/40 border border-blue-500/30">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-mono text-cyan-300 flex items-center gap-1.5">
                        <Flame className="w-3.5 h-3.5 text-amber-400" />
                        TODAY'S MISSION
                      </span>
                      <span className="text-amber-400 font-mono">+120 XP</span>
                    </div>
                    <p className="text-xs text-slate-200 font-medium">
                      Solve 2 Sliding Window Problems & Revise OS Deadlock Conditions
                    </p>
                    <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Progress: 1/2 Tasks</span>
                      <span className="text-cyan-400 font-mono">In Progress</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How The System Works */}
      <section id="how-it-works" className="py-20 relative border-t border-slate-800/80 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/30 px-3 py-1 rounded-full border border-cyan-500/30">
              TRAINING PROTOCOL
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white mt-4">
              How the System Awakens You
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              A structured 4-phase preparation journey calibrated to computer science engineering placements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Hunter Awakening',
                desc: 'Complete the multi-step onboarding. Establish your target role, college timeline, and current skill baseline.',
                icon: Shield,
              },
              {
                step: '02',
                title: 'AI Roadmap Generation',
                desc: 'Receive an intelligent week-by-week curriculum covering DSA, aptitude, core CS, and interview preparation.',
                icon: Compass,
              },
              {
                step: '03',
                title: 'Daily Quests & Arena',
                desc: 'Train with daily curated coding problems, aptitude speed tests, and concept revisions to earn XP and rank up.',
                icon: Zap,
              },
              {
                step: '04',
                title: 'Placement Readiness',
                desc: 'Conquer Boss Battle simulations and AI mock interviews to master company placement drives with confidence.',
                icon: Trophy,
              },
            ].map((s, idx) => (
              <GlassCard key={idx} className="relative overflow-hidden group">
                <div className="text-4xl font-black font-display text-blue-500/20 mb-4">
                  {s.step}
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                  <s.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Showcase */}
      <section id="features" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-400 bg-blue-950/30 px-3 py-1 rounded-full border border-blue-500/30">
              COMPLETE ARSENAL
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white mt-4">
              Everything Needed to Ace Placements
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              Eight unified modules designed to turn students into well-rounded, high-performing candidates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, idx) => (
              <GlassCard key={idx} hover={true} className="flex flex-col justify-between">
                <div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feat.color} p-0.5 mb-5`}>
                    <div className="w-full h-full bg-[#0b1033] rounded-[10px] flex items-center justify-center">
                      <feat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{feat.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-cyan-400 font-medium">
                  <span>Explore module</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Solo Leveling Gamified Rank System */}
      <section id="gamification" className="py-20 border-t border-slate-800/80 bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 bg-amber-950/30 px-3 py-1 rounded-full border border-amber-500/30">
              RANK ADVANCEMENT
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white mt-4">
              The Seven Hunter Tiers
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              Rank progression is tied strictly to genuine assessment performance, completed modules, and streak persistence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ranks.map((r, i) => (
              <div
                key={i}
                className="glass-panel p-5 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <RankBadge rank={r.rank} size="md" />
                    <span className="text-xs font-mono text-cyan-400">{r.xp}</span>
                  </div>
                  <h4 className="text-base font-bold text-white">{r.label} Tier</h4>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{r.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-500">
                  TIER {i + 1} OF 7
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/30 px-3 py-1 rounded-full border border-cyan-500/30">
              TRANSPARENT PRICING
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white mt-4">
              Invest in Your Career
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              Fair, student-friendly plans with transparent entitlements and zero false promises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <GlassCard className="flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-white font-display">Starter Hunter</h3>
                <p className="text-xs text-slate-400 mt-1">Foundational placement prep tools</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white font-display">₹0</span>
                  <span className="text-xs text-slate-400">/ forever free</span>
                </div>

                <ul className="mt-6 space-y-3 text-xs text-slate-300">
                  {[
                    'Hunter Profile & Level Progression',
                    'Basic Placement Roadmap',
                    '25 Curated DSA Problems',
                    'Foundational Aptitude Quizzes',
                    '1 Initial AI Resume Review',
                    'Basic Placement Application Tracker',
                    'Gamification XP & Rank Engine',
                  ].map((feat, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800">
                <Button
                  variant="outline"
                  onClick={() => navigate('/register')}
                  className="w-full"
                >
                  Start Free
                </Button>
              </div>
            </GlassCard>

            {/* Pro Plan */}
            <div className="relative rounded-2xl p-0.5 bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-600 shadow-2xl glow-blue">
              <div className="h-full rounded-[15px] bg-[#0a0f30] p-6 flex flex-col justify-between">
                <div>
                  <div className="inline-block px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400 text-[11px] font-mono text-cyan-300 mb-3">
                    RECOMMENDED FOR FINAL YEARS
                  </div>
                  <h3 className="text-xl font-bold text-white font-display">Pro Hunter</h3>
                  <p className="text-xs text-slate-400 mt-1">Unrestricted access to the entire arsenal</p>
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-gradient-electric font-display">₹799</span>
                    <span className="text-xs text-slate-400">/ 3 months</span>
                  </div>

                  <ul className="mt-6 space-y-3 text-xs text-slate-200">
                    {[
                      'Everything in Starter Hunter',
                      'Full 100+ DSA Verified Problem Bank',
                      'Unlimited Aptitude Module Speed Tests',
                      'Complete Technical Academy (All 9 CS Subjects)',
                      'Up to 5 AI Resume Reviews per period',
                      'Up to 10 Gemini AI Mock Interview Simulations',
                      'Advanced Placement Preparation Score Analytics',
                      'Priority Boss Battle Challenges',
                    ].map((feat, i) => (
                      <li key={i} className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-800">
                  <Button
                    variant="primary"
                    onClick={() => navigate('/register')}
                    className="w-full glow-blue"
                  >
                    Awaken Pro Status
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials (Clearly Labelled as Dev Sample) */}
      <section className="py-20 border-t border-slate-800/80 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[11px] font-mono text-amber-400/90 bg-amber-950/40 border border-amber-500/30 px-3 py-1 rounded-full">
              [ SAMPLE TESTIMONIALS — FOR DEVELOPMENT / PREVIEW ONLY ]
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white mt-4">
              Student Hunter Experiences
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Aarav Sharma',
                role: 'Placed at Tier-1 Product Co',
                college: 'NIT Trichy • CSE 2024',
                quote: 'The Solo Leveling progression kept me consistent every single day. Daily quests turned DSA practice into a gaming habit rather than a chore.',
                rank: 'S-Rank',
              },
              {
                name: 'Priya Venkatesh',
                role: 'Placed as Cloud Engineer',
                college: 'PES University • ISE 2024',
                quote: 'The AI mock interviews pointed out exactly where my explanations were vague. I felt remarkably composed during my real technical rounds.',
                rank: 'A-Rank',
              },
              {
                name: 'Rohan Deshmukh',
                role: 'Placed as Full Stack Developer',
                college: 'Vellore Institute of Technology • CSE 2024',
                quote: 'The Placement Readiness Engine showed me that my aptitude was lagging behind my coding skills. Fixing that gap made all the difference.',
                rank: 'A-Rank',
              },
            ].map((t, idx) => (
              <GlassCard key={idx} className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <RankBadge rank={t.rank} size="sm" />
                    <span className="text-[10px] font-mono text-slate-500">SAMPLE TESTIMONIAL</span>
                  </div>
                  <p className="text-xs text-slate-300 italic leading-relaxed">"{t.quote}"</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800">
                  <h4 className="text-sm font-bold text-white">{t.name}</h4>
                  <p className="text-xs text-cyan-400">{t.role}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{t.college}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section id="faq" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/30 px-3 py-1 rounded-full border border-cyan-500/30">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white mt-4">
              System Intel & Inquiries
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="glass-panel border border-blue-500/20 rounded-xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between text-sm sm:text-base font-semibold text-slate-100 hover:text-cyan-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
                      openFaq === idx ? 'rotate-180 text-cyan-400' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 font-sans">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-blue-500/20 bg-[#060818] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center glow-blue">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="font-display font-extrabold text-lg text-white">
                  PLACEREADY <span className="text-cyan-400">AI</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Prepare Smarter. Level Up. Get Placement Ready. Built specifically for Computer Science Engineering students.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
                Modules
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><Link to="/register" className="hover:text-cyan-400 transition-colors">DSA Arena</Link></li>
                <li><Link to="/register" className="hover:text-cyan-400 transition-colors">Aptitude Training</Link></li>
                <li><Link to="/register" className="hover:text-cyan-400 transition-colors">Technical Academy</Link></li>
                <li><Link to="/register" className="hover:text-cyan-400 transition-colors">AI Interview Arena</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
                System
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><Link to="/register" className="hover:text-cyan-400 transition-colors">Hunter Rank Rules</Link></li>
                <li><Link to="/register" className="hover:text-cyan-400 transition-colors">Readiness Engine</Link></li>
                <li><Link to="/register" className="hover:text-cyan-400 transition-colors">Resume Forge</Link></li>
                <li><Link to="/register" className="hover:text-cyan-400 transition-colors">Placement Tracker</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
                Philosophy
              </h4>
              <p className="text-xs text-slate-400 italic leading-relaxed">
                "Every student starts somewhere. Your current skills do not determine your final potential. Your progress does."
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
            <p>© {new Date().getFullYear()} PlaceReady AI. All rights reserved.</p>
            <p className="mt-2 sm:mt-0 font-mono text-[11px]">
              SYSTEM PROTOCOL 1.0.0 • POWERED BY GEMINI & SUPABASE
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
