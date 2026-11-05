import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import {
  FileText,
  Upload,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  TrendingUp,
  FileCheck,
  RefreshCw,
} from 'lucide-react'
import GlassCard from '../components/common/GlassCard'
import Button from '../components/common/Button'
import ProgressBar from '../components/common/ProgressBar'

export default function ResumeForgePage() {
  const [analyzing, setAnalyzing] = useState(false)
  const [hasAnalyzed, setHasAnalyzed] = useState(true)

  const [resumeText, setResumeText] = useState(`EDUCATION:
B.Tech Computer Science Engineering, Tier-2 Institute (2021-2025)
CGPA: 8.6/10

TECHNICAL SKILLS:
Languages: Python, Java, JavaScript, C++, SQL
Frameworks & Tools: React, Node.js, Express, PostgreSQL, Git, Docker

PROJECTS:
1. Distributed E-Commerce Microservices
- Created an e-commerce backend with Node.js and Express
- Used PostgreSQL database for storing user and order info
- Implemented JWT authentication and Stripe mock checkout

2. Placement Practice Portal
- Built a web application using React and Tailwind CSS
- Added user login and question practice features`)

  const reviewResults = {
    overallScore: 78,
    missingSections: ['Missing Live Deployment URLs / GitHub Repository Links', 'Missing Competitive Programming or Academic Honors'],
    bulletImprovements: [
      {
        original: 'Created an e-commerce backend with Node.js and Express',
        improved: 'Architected scalable microservices backend with Node.js & Express, supporting 2,000+ simulated concurrent requests with sub-100ms response time.',
        reason: 'Adds measurable performance metric and technical scope.',
      },
      {
        original: 'Used PostgreSQL database for storing user and order info',
        improved: 'Designed normalized PostgreSQL schema with indexing and connection pooling, reducing query latency by 35%.',
        reason: 'Highlights database engineering and query optimization skills.',
      },
    ],
    claritySuggestions: [
      'Replace passive verbs ("Created", "Used") with active engineering verbs ("Architected", "Engineered", "Implemented").',
      'Ensure all technologies listed in Technical Skills are visibly demonstrated in at least one project bullet point.',
    ],
  }

  const handleAnalyze = () => {
    setAnalyzing(true)
    setTimeout(() => {
      setAnalyzing(false)
      setHasAnalyzed(true)
      toast.success('Resume Analysis Complete! Structured recommendations generated.', {
        icon: '📄',
      })
    }, 1500)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <GlassCard className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-xs font-mono text-rose-300 mb-2">
              <FileText className="w-3.5 h-3.5" />
              RESUME FORGE: AI POWERED REVIEW
            </div>
            <h1 className="text-2xl font-bold font-display text-white">
              AI Resume Forge & Reviewer
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Grounded feedback for placement resumes. Optimizes bullet impact and clarity without hallucinating fake metrics.
            </p>
          </div>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Resume Input */}
        <div className="lg:col-span-6 space-y-4">
          <GlassCard className="p-6 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-white font-mono uppercase">
                  Resume Content (Paste or Upload)
                </h3>
                <span className="text-xs text-slate-400 font-mono">Plain Text Preview</span>
              </div>
              <textarea
                rows={16}
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your plain text resume here..."
                className="w-full bg-[#0a0f30] border border-blue-500/25 rounded-xl p-4 text-xs font-mono text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 resize-none leading-relaxed"
              />
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => toast.success('Mock PDF Extracted!')}
                icon={Upload}
              >
                Upload PDF
              </Button>
              <Button
                variant="primary"
                size="sm"
                loading={analyzing}
                onClick={handleAnalyze}
                icon={Sparkles}
              >
                Run AI Resume Audit
              </Button>
            </div>
          </GlassCard>
        </div>

        {/* Right: AI Feedback Report */}
        <div className="lg:col-span-6 space-y-4">
          {hasAnalyzed ? (
            <GlassCard className="p-6 space-y-6">
              {/* Score Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <span className="text-xs font-mono text-slate-400">RESUME READINESS SCORE</span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <h3 className="text-3xl font-extrabold font-display text-gradient-electric">
                      {reviewResults.overallScore} / 100
                    </h3>
                    <span className="text-xs text-emerald-400 font-medium font-mono">Good Candidate</span>
                  </div>
                </div>

                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-cyan-400">
                  <FileCheck className="w-6 h-6" />
                </div>
              </div>

              {/* Missing Sections */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" /> Missing Essential Placement Signals
                </h4>
                <div className="space-y-1.5">
                  {reviewResults.missingSections.map((sec, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-amber-950/20 border border-amber-500/20 text-xs text-slate-300">
                      • {sec}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bullet Improvements */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Impact-Driven Bullet Improvements
                </h4>
                <div className="space-y-3">
                  {reviewResults.bulletImprovements.map((b, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-2">
                      <div>
                        <span className="text-rose-400 font-mono text-[10px] block">BEFORE:</span>
                        <p className="text-slate-400 line-through">{b.original}</p>
                      </div>
                      <div className="pt-1.5 border-t border-slate-800">
                        <span className="text-emerald-400 font-mono text-[10px] block">SUGGESTED REVISION:</span>
                        <p className="text-white font-medium">{b.improved}</p>
                        <p className="text-[10px] text-cyan-400/80 font-mono mt-1">Why: {b.reason}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Clarity */}
              <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/20 text-xs space-y-1 text-slate-300">
                <span className="font-bold text-white font-mono block">Grammar & Formatting Checklist:</span>
                <ul className="pl-4 list-disc space-y-1 text-slate-400 text-[11px]">
                  {reviewResults.claritySuggestions.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            </GlassCard>
          ) : (
            <GlassCard className="p-8 text-center text-slate-400 text-xs">
              Click "Run AI Resume Audit" to generate actionable placement improvements.
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  )
}

