import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-hot-toast'
import {
  User,
  GraduationCap,
  Target,
  Clock,
  Code2,
  Brain,
  Layers,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Shield,
  Zap,
  Terminal,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Button from '../components/common/Button'
import FormInput from '../components/common/FormInput'
import FormSelect from '../components/common/FormSelect'
import GlassCard from '../components/common/GlassCard'
import RankBadge from '../components/common/RankBadge'

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const { user, profile, updateProfileOnboarding } = useAuth()
  const navigate = useNavigate()

  // Form State across steps
  const [formData, setFormData] = useState({
    // Step 1: Personal Info
    full_name: profile?.full_name || user?.user_metadata?.full_name || '',
    college: '',
    degree: 'B.Tech',
    branch: 'CSE',
    academic_year: '3rd Year',
    graduation_year: '2025',

    // Step 2: Target & Goals
    target_role: 'Software Developer',
    placement_timeline: '3-6 months',
    daily_prep_time: '120', // minutes
    learning_goals: ['Master DSA', 'Ace Interviews'],

    // Step 3: Skill Self-Assessment
    coding_proficiency: 'intermediate',
    dsa_experience: 'intermediate',
    aptitude_proficiency: 'intermediate',
    core_cs_proficiency: 'intermediate',
    development_experience: 'beginner',

    // Step 4: Weapon
    preferred_language: 'python',
  })

  const totalSteps = 5

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleGoal = (goal) => {
    setFormData((prev) => {
      const current = prev.learning_goals
      if (current.includes(goal)) {
        return { ...prev, learning_goals: current.filter((g) => g !== goal) }
      } else {
        return { ...prev, learning_goals: [...current, goal] }
      }
    })
  }

  const handleNext = () => {
    // Basic validation
    if (currentStep === 1) {
      if (!formData.full_name.trim()) {
        toast.error('Please specify your Hunter Name')
        return
      }
      if (!formData.college.trim()) {
        toast.error('Please specify your College/University')
        return
      }
    }
    setCurrentStep((prev) => Math.min(totalSteps, prev + 1))
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1))
  }

  const handleComplete = async () => {
    setSubmitting(true)
    try {
      const payload = {
        ...formData,
        academic_year: parseInt(formData.academic_year.replace(/\D/g, '')) || 3,
        graduation_year: parseInt(formData.graduation_year) || 2025,
        daily_prep_time: parseInt(formData.daily_prep_time) || 120,
      }

      await updateProfileOnboarding(payload)
      toast.success('Hunter Profile Awakened! Entering Command Centre...', {
        icon: '⚔️',
      })
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.message || 'Error completing onboarding')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#080b1e] bg-system-grid text-slate-100 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[32rem] h-[32rem] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header / Progress */}
      <div className="max-w-2xl mx-auto w-full mb-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-xs font-mono text-cyan-300 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          SYSTEM PROTOCOL: HUNTER AWAKENING WIZARD
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
          Awaken Your Hunter Identity
        </h1>

        {/* Progress Bar */}
        <div className="mt-5 max-w-md mx-auto">
          <div className="flex justify-between text-xs font-mono text-slate-400 mb-2">
            <span>PHASE {currentStep} OF {totalSteps}</span>
            <span>{Math.round((currentStep / totalSteps) * 100)}% COMPLETE</span>
          </div>
          <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-blue-500/20 p-0.5">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500 rounded-full"
              initial={{ width: '20%' }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Wizard Card Container */}
      <div className="max-w-2xl mx-auto w-full relative z-10">
        <GlassCard className="p-6 sm:p-8 border-blue-500/30 glow-blue">
          <AnimatePresence mode="wait">
            {/* STEP 1: Personal & College Info */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="border-b border-slate-800 pb-3 mb-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <User className="w-5 h-5 text-cyan-400" />
                    Phase 1: Candidate Verification
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Establish your academic profile and college credentials.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormInput
                    label="Full Name"
                    name="full_name"
                    value={formData.full_name}
                    onChange={(e) => updateField('full_name', e.target.value)}
                    placeholder="Jinwoo Sung"
                    required
                  />

                  <FormInput
                    label="College / University"
                    name="college"
                    value={formData.college}
                    onChange={(e) => updateField('college', e.target.value)}
                    placeholder="National Institute of Technology"
                    required
                  />

                  <FormSelect
                    label="Degree"
                    name="degree"
                    value={formData.degree}
                    onChange={(e) => updateField('degree', e.target.value)}
                    options={['B.Tech', 'B.E.', 'BCA', 'MCA', 'M.Tech', 'Other']}
                  />

                  <FormSelect
                    label="Branch"
                    name="branch"
                    value={formData.branch}
                    onChange={(e) => updateField('branch', e.target.value)}
                    options={['CSE', 'IT', 'ECE', 'EEE', 'AI & DS', 'Mechanical', 'Other']}
                  />

                  <FormSelect
                    label="Current Academic Year"
                    name="academic_year"
                    value={formData.academic_year}
                    onChange={(e) => updateField('academic_year', e.target.value)}
                    options={['1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduated']}
                  />

                  <FormSelect
                    label="Expected Graduation Year"
                    name="graduation_year"
                    value={formData.graduation_year}
                    onChange={(e) => updateField('graduation_year', e.target.value)}
                    options={['2024', '2025', '2026', '2027', '2028']}
                  />
                </div>
              </motion.div>
            )}

            {/* STEP 2: Mission Objectives & Goals */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="border-b border-slate-800 pb-3 mb-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Target className="w-5 h-5 text-cyan-400" />
                    Phase 2: Mission Objectives & Timelines
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Calibrate your AI preparation roadmap to your desired outcome.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormSelect
                    label="Target Engineering Role"
                    name="target_role"
                    value={formData.target_role}
                    onChange={(e) => updateField('target_role', e.target.value)}
                    options={[
                      'Software Developer (Generalist)',
                      'Frontend Developer',
                      'Backend Developer',
                      'Full Stack Developer',
                      'Data Analyst / Scientist',
                      'DevOps / Cloud Engineer',
                      'Product Engineer',
                    ]}
                  />

                  <FormSelect
                    label="Expected Placement Timeline"
                    name="placement_timeline"
                    value={formData.placement_timeline}
                    onChange={(e) => updateField('placement_timeline', e.target.value)}
                    options={[
                      'Within 30 Days (Urgent)',
                      '1 - 3 Months',
                      '3 - 6 Months',
                      '6 - 12 Months',
                      'More than 1 Year',
                    ]}
                  />
                </div>

                <FormSelect
                  label="Daily Available Preparation Time"
                  name="daily_prep_time"
                  value={formData.daily_prep_time}
                  onChange={(e) => updateField('daily_prep_time', e.target.value)}
                  options={[
                    { value: '45', label: '45 Minutes (Light Pace)' },
                    { value: '90', label: '1.5 Hours (Standard)' },
                    { value: '120', label: '2 Hours (Recommended)' },
                    { value: '180', label: '3 Hours (Intensive)' },
                    { value: '240', label: '4+ Hours (Hardcore)' },
                  ]}
                />

                <div className="pt-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Primary Learning Focus (Select All That Apply)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      'Master DSA',
                      'Quantitative Aptitude',
                      'Logical Reasoning',
                      'Core CS Subjects',
                      'System Design',
                      'Ace Mock Interviews',
                      'Resume Optimization',
                      'Project Explanations',
                    ].map((goal) => {
                      const selected = formData.learning_goals.includes(goal)
                      return (
                        <button
                          type="button"
                          key={goal}
                          onClick={() => toggleGoal(goal)}
                          className={`p-2.5 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between ${
                            selected
                              ? 'bg-blue-600/25 border-cyan-400 text-cyan-200 glow-blue'
                              : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <span>{goal}</span>
                          {selected && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Skill Self-Assessment */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="border-b border-slate-800 pb-3 mb-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Zap className="w-5 h-5 text-cyan-400" />
                    Phase 3: Current Powers Baseline
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Honest self-assessment ensures your initial quests and challenges are matched accurately.
                  </p>
                </div>

                {[
                  {
                    key: 'dsa_experience',
                    title: 'DSA & Algorithms',
                    desc: 'Arrays, Trees, Graphs, DP, Time Complexity',
                  },
                  {
                    key: 'aptitude_proficiency',
                    title: 'Quantitative & Logical Aptitude',
                    desc: 'Speed math, series, probability, puzzles',
                  },
                  {
                    key: 'core_cs_proficiency',
                    title: 'Core CS Knowledge',
                    desc: 'OOP, DBMS, OS, Computer Networks',
                  },
                  {
                    key: 'development_experience',
                    title: 'Practical Development & Projects',
                    desc: 'Web apps, APIs, Git, real-world implementations',
                  },
                ].map((skill) => (
                  <div key={skill.key} className="space-y-1.5 p-3 rounded-xl bg-slate-900/40 border border-slate-800/80">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs font-bold text-white">{skill.title}</span>
                      <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">{skill.desc}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 pt-1">
                      {['beginner', 'intermediate', 'advanced'].map((lvl) => {
                        const selected = formData[skill.key] === lvl
                        return (
                          <button
                            type="button"
                            key={lvl}
                            onClick={() => updateField(skill.key, lvl)}
                            className={`py-1.5 px-2 rounded-lg text-xs font-semibold capitalize border transition-all ${
                              selected
                                ? 'bg-blue-600/30 border-cyan-400 text-cyan-300'
                                : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
                            }`}
                          >
                            {lvl}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* STEP 4: Choose Your Weapon */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="border-b border-slate-800 pb-3 mb-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-cyan-400" />
                    Phase 4: Choose Your Weapon
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Select your primary language for code explanations and DSA arena practice.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      id: 'python',
                      name: 'Python 3',
                      desc: 'Clean syntax, high interview velocity, standard in competitive placement tests.',
                      badge: 'FULL MVP SUPPORT',
                      color: 'border-cyan-500 text-cyan-400',
                    },
                    {
                      id: 'java',
                      name: 'Java',
                      desc: 'Industry enterprise standard with strong OOP principles and collections.',
                      badge: 'DSA REFERENCE READY',
                      color: 'border-amber-500 text-amber-400',
                    },
                    {
                      id: 'cpp',
                      name: 'C++',
                      desc: 'Maximum execution speed, raw STL performance, standard for top-tier OA rounds.',
                      badge: 'COMING IN M3',
                      color: 'border-purple-500 text-purple-400',
                    },
                    {
                      id: 'javascript',
                      name: 'JavaScript / TS',
                      desc: 'Web-native, versatile problem-solving for modern full-stack development roles.',
                      badge: 'COMING IN M3',
                      color: 'border-yellow-500 text-yellow-400',
                    },
                  ].map((lang) => {
                    const selected = formData.preferred_language === lang.id
                    return (
                      <div
                        key={lang.id}
                        onClick={() => updateField('preferred_language', lang.id)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                          selected
                            ? 'bg-blue-950/60 border-cyan-400 glow-blue'
                            : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-base font-bold text-white font-display">{lang.name}</h4>
                            <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
                              {lang.badge}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed">{lang.desc}</p>
                        </div>
                        <div className="mt-4 flex items-center justify-end text-xs font-medium">
                          {selected ? (
                            <span className="text-cyan-400 flex items-center gap-1 font-mono">
                              <CheckCircle2 className="w-4 h-4" /> Selected Weapon
                            </span>
                          ) : (
                            <span className="text-slate-500">Click to Select</span>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 5: Profile Summary & Awakening Confirmation */}
            {currentStep === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="space-y-6 text-center"
              >
                <div className="inline-block p-3 rounded-2xl bg-blue-600/20 border border-cyan-400/50 glow-blue">
                  <Shield className="w-10 h-10 text-cyan-400 animate-pulse" />
                </div>

                <div>
                  <h2 className="text-2xl font-black font-display text-white tracking-wider">
                    YOUR HUNTER PROFILE IS READY
                  </h2>
                  <p className="text-xs text-cyan-300 font-mono mt-1">
                    [ SYSTEM ASSESSMENT INITIALIZED • E-RANK ASSIGNED ]
                  </p>
                </div>

                {/* Hunter Card Preview */}
                <div className="p-5 rounded-2xl bg-[#0a0f30] border border-blue-500/40 shadow-xl text-left space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <h4 className="text-lg font-bold text-white">{formData.full_name}</h4>
                      <p className="text-xs text-slate-400 font-mono">
                        {formData.degree} ({formData.branch}) • {formData.college}
                      </p>
                    </div>
                    <RankBadge rank="E-Rank" size="md" />
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                    <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">TARGET ROLE</span>
                      <span className="text-cyan-300 font-bold">{formData.target_role}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">WEAPON OF CHOICE</span>
                      <span className="text-purple-300 font-bold uppercase">{formData.preferred_language}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">DAILY TRAINING</span>
                      <span className="text-amber-300 font-bold">{formData.daily_prep_time} Minutes</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">AWAKENING XP</span>
                      <span className="text-emerald-400 font-bold">+100 BONUS XP</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Click below to generate your personalized AI placement roadmap and unlock your first daily quest.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="mt-8 pt-5 border-t border-slate-800 flex items-center justify-between">
            {currentStep > 1 ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                icon={ArrowLeft}
                iconPosition="left"
              >
                Back
              </Button>
            ) : (
              <div />
            )}

            {currentStep < totalSteps ? (
              <Button
                variant="primary"
                size="md"
                onClick={handleNext}
                icon={ArrowRight}
                iconPosition="right"
              >
                Continue Phase
              </Button>
            ) : (
              <Button
                variant="gold"
                size="lg"
                loading={submitting}
                onClick={handleComplete}
                icon={Sparkles}
                className="w-full sm:w-auto glow-gold"
              >
                Commence Placement Training
              </Button>
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
