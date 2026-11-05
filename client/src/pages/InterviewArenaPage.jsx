import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-hot-toast'
import {
  Users2,
  Bot,
  User,
  Send,
  Play,
  Award,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Clock,
  ChevronRight,
  Shield,
} from 'lucide-react'
import GlassCard from '../components/common/GlassCard'
import Button from '../components/common/Button'
import ProgressBar from '../components/common/ProgressBar'

export default function InterviewArenaPage() {
  const [sessionActive, setSessionActive] = useState(false)
  const [interviewType, setInterviewType] = useState('technical')
  const [difficulty, setDifficulty] = useState('medium')
  const [currentStep, setCurrentStep] = useState(0) // question index
  const [candidateInput, setCandidateInput] = useState('')
  const [completed, setCompleted] = useState(false)
  const [evaluating, setEvaluating] = useState(false)

  const interviewScenarios = {
    technical: [
      {
        question: 'Welcome to your Placement Technical Round. To begin, could you explain how a Hash Map resolves collisions, and compare Separate Chaining with Open Addressing?',
        followUp: 'Good explanation. In a scenario with a high load factor and frequent deletions, which collision technique would you prefer and why?',
        expectedKeywords: ['chaining', 'probing', 'load factor', 'linked list', 'tombstone'],
      },
      {
        question: 'Let’s pivot to Database Systems. Explain what happens under the hood during a SQL JOIN between two large tables. How does the database optimizer decide between Nested Loop, Hash Join, and Sort Merge Join?',
        followUp: 'Excellent. If one of the tables has a cluster index on the join key, how does that impact the optimizer choice?',
        expectedKeywords: ['hash join', 'nested loop', 'sort merge', 'index', 'optimizer'],
      },
      {
        question: 'In Operating Systems, what are the Coffman conditions required for a deadlock to occur? How does an OS prevent or avoid deadlocks in practice?',
        followUp: 'Can you briefly differentiate between Deadlock Prevention and Deadlock Avoidance with reference to Banker’s Algorithm?',
        expectedKeywords: ['mutual exclusion', 'hold and wait', 'no preemption', 'circular wait', 'banker'],
      },
    ],
    behavioral: [
      {
        question: 'Welcome to your HR round. Tell me about a time when you faced a severe conflict or disagreement in a team project. How did you handle it and what was the outcome?',
        followUp: 'Looking back, is there anything you would handle differently if you faced that situation today?',
        expectedKeywords: ['communication', 'compromise', 'objective', 'outcome', 'star'],
      },
      {
        question: 'Where do you see your engineering career evolving in the next 3 to 5 years, and why did you choose our company?',
        followUp: 'What steps are you taking currently during college to prepare for that trajectory?',
        expectedKeywords: ['growth', 'learning', 'mentorship', 'impact', 'values'],
      },
    ],
  }

  const activeScenario = interviewScenarios[interviewType] || interviewScenarios.technical

  const [conversation, setConversation] = useState([])

  const handleStartInterview = () => {
    setSessionActive(true)
    setCompleted(false)
    setCurrentStep(0)
    setConversation([
      {
        role: 'system',
        text: `[ SYSTEM AWAKENING: ${interviewType.toUpperCase()} MOCK INTERVIEW INITIALIZED • ${difficulty.toUpperCase()} DIFFICULTY ]`,
      },
      {
        role: 'interviewer',
        text: activeScenario[0].question,
      },
    ])
  }

  const handleSendResponse = () => {
    if (!candidateInput.trim()) return

    const userText = candidateInput
    setCandidateInput('')
    setEvaluating(true)

    // Add candidate response
    const newConv = [...conversation, { role: 'candidate', text: userText }]
    setConversation(newConv)

    setTimeout(() => {
      setEvaluating(false)
      const nextIndex = currentStep + 1

      if (nextIndex < activeScenario.length) {
        // Next question
        setCurrentStep(nextIndex)
        setConversation([
          ...newConv,
          {
            role: 'interviewer',
            evaluation: {
              clarityScore: 8.5,
              feedback: 'Strong structured answer. Good technical keyword coverage.',
            },
            text: activeScenario[nextIndex].question,
          },
        ])
      } else {
        // Conclude interview
        setCompleted(true)
        setConversation([
          ...newConv,
          {
            role: 'interviewer',
            text: 'Thank you for your responses. The mock technical round is now complete. Your performance assessment report is generated below.',
          },
        ])
        toast.success('Mock Interview Completed! +40 XP awarded to Hunter profile!', {
          icon: '🎓',
        })
      }
    }, 1200)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <GlassCard className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-xs font-mono text-emerald-300 mb-2">
              <Users2 className="w-3.5 h-3.5" />
              AI INTERVIEW ARENA: MOCK PLACEMENT SIMULATOR
            </div>
            <h1 className="text-2xl font-bold font-display text-white">
              AI Mock Interview Arena
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Simulate campus placement technical, core CS, and HR interviews powered by Gemini with diagnostic feedback reports.
            </p>
          </div>
        </div>
      </GlassCard>

      {!sessionActive ? (
        <GlassCard className="p-8 max-w-2xl mx-auto space-y-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto glow-emerald">
            <Users2 className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-xl font-bold font-display text-white">
              Configure Your Mock Interview
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Select your interview track and difficulty to launch the AI interviewer.
            </p>
          </div>

          {/* Mode Select */}
          <div className="grid grid-cols-2 gap-3 text-left">
            {[
              { id: 'technical', title: 'Technical CS Round', desc: 'DSA, DBMS, OS & Networks questions' },
              { id: 'behavioral', title: 'HR & Behavioral Round', desc: 'Teamwork, culture, leadership & STAR answers' },
            ].map((m) => (
              <div
                key={m.id}
                onClick={() => setInterviewType(m.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  interviewType === m.id
                    ? 'bg-emerald-950/40 border-emerald-400 glow-emerald'
                    : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                }`}
              >
                <h4 className="text-xs font-bold text-white font-mono uppercase">{m.title}</h4>
                <p className="text-[11px] text-slate-400 mt-1">{m.desc}</p>
              </div>
            ))}
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={handleStartInterview}
            icon={Play}
            className="w-full sm:w-auto glow-blue"
          >
            Launch Interview Session
          </Button>
        </GlassCard>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Chat Feed */}
          <div className="lg:col-span-8 space-y-4">
            <GlassCard className="p-6 h-[500px] flex flex-col justify-between">
              {/* Message List */}
              <div className="overflow-y-auto space-y-4 pr-2">
                {conversation.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex gap-3 text-xs ${
                      msg.role === 'candidate' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {msg.role === 'interviewer' && (
                      <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shrink-0">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}

                    <div
                      className={`max-w-xl p-3.5 rounded-2xl ${
                        msg.role === 'candidate'
                          ? 'bg-blue-600 text-white rounded-tr-none'
                          : msg.role === 'system'
                          ? 'bg-slate-900 border border-slate-800 text-cyan-300 font-mono text-[11px] w-full text-center'
                          : 'bg-slate-900/80 border border-blue-500/20 text-slate-200 rounded-tl-none'
                      }`}
                    >
                      {msg.evaluation && (
                        <div className="mb-2 pb-2 border-b border-emerald-500/30 text-[11px] text-emerald-400 font-mono flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>EVALUATION: {msg.evaluation.feedback}</span>
                        </div>
                      )}
                      <p className="leading-relaxed font-sans text-xs sm:text-sm">{msg.text}</p>
                    </div>

                    {msg.role === 'candidate' && (
                      <div className="w-7 h-7 rounded-lg bg-blue-600/30 text-cyan-300 border border-blue-400/40 flex items-center justify-center shrink-0">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                ))}

                {evaluating && (
                  <div className="flex gap-3 items-center text-xs text-slate-400 font-mono">
                    <Bot className="w-4 h-4 text-emerald-400 animate-spin" />
                    <span>AI Interviewer is analyzing your response & structuring follow-up...</span>
                  </div>
                )}
              </div>

              {/* Input Area */}
              {!completed ? (
                <div className="pt-4 border-t border-slate-800 flex gap-2">
                  <textarea
                    rows={2}
                    value={candidateInput}
                    onChange={(e) => setCandidateInput(e.target.value)}
                    placeholder="Type your structured answer here (explain principles, trade-offs, and examples)..."
                    className="flex-1 bg-[#0a0f30] border border-blue-500/30 rounded-xl p-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 resize-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handleSendResponse()
                      }
                    }}
                  />
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleSendResponse}
                    disabled={!candidateInput.trim() || evaluating}
                    icon={Send}
                  >
                    Submit
                  </Button>
                </div>
              ) : (
                <div className="pt-4 border-t border-slate-800 text-center">
                  <Button variant="outline" size="sm" onClick={() => setSessionActive(false)} icon={RotateCcw}>
                    Start New Simulation
                  </Button>
                </div>
              )}
            </GlassCard>
          </div>

          {/* Right: Real-time Evaluation / Diagnostic Report */}
          <div className="lg:col-span-4 space-y-4">
            <GlassCard className="p-5 border-emerald-500/30">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-300 mb-3">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>INTERVIEW EVALUATION REPORT</span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-slate-400">SESSION READINESS</span>
                    <span className="text-emerald-400 font-bold">82 / 100</span>
                  </div>
                  <ProgressBar value={82} max={100} color="emerald" size="sm" />
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-2">
                  <div className="text-slate-300">
                    <strong className="text-white block mb-0.5">Key Strengths Demonstrated:</strong>
                    <ul className="text-slate-400 pl-4 list-disc space-y-1">
                      <li>Clear explanation of collision handling mechanisms</li>
                      <li>Accurate articulation of database query optimizer roles</li>
                    </ul>
                  </div>
                  <div className="text-slate-300 pt-2 border-t border-slate-800">
                    <strong className="text-amber-400 block mb-0.5">Area for Revision:</strong>
                    <p className="text-slate-400 text-[11px]">
                      Detail the exact memory paging translation and virtual memory overhead.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-500/20 text-xs font-mono text-cyan-300">
                  XP EARNED: +40 XP
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      )}
    </div>
  )
}

