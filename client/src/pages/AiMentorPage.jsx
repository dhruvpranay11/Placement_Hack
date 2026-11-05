import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import {
  Bot,
  User,
  Send,
  Sparkles,
  Code2,
  Brain,
  Lightbulb,
  Trash2,
  Terminal,
} from 'lucide-react'
import GlassCard from '../components/common/GlassCard'
import Button from '../components/common/Button'
import { useAuth } from '../context/AuthContext'

export default function AiMentorPage() {
  const { profile, hunterStats } = useAuth()
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: `Greetings, Hunter ${profile?.full_name?.split(' ')[0] || 'Candidate'}! I am your AI Placement Mentor. I have your current ${hunterStats?.hunter_rank || 'E-Rank'} profile and target objectives in context. How can I guide your preparation today?`,
    },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)

  const quickPrompts = [
    'How do I approach a hard dynamic programming problem when stuck?',
    'Explain the Sliding Window technique with an intuitive mental model.',
    'What are the most common traps in Operating System deadlock questions?',
    'How should I structure my final year project explanation in 2 minutes?',
  ]

  const handleSend = (textToSend) => {
    const query = textToSend || input
    if (!query.trim()) return

    const userMsg = { role: 'user', text: query }
    const updated = [...messages, userMsg]
    setMessages(updated)
    setInput('')
    setTyping(true)

    setTimeout(() => {
      setTyping(false)
      let reply = "That's a vital placement question. Remember, the key is to communicate your thought process aloud before jumping to the optimal solution."
      if (query.toLowerCase().includes('sliding window')) {
        reply = "Here's the mental model for Sliding Window: Think of two pointers (`left` and `right`) defining a rubber band over your array. Expand `right` until a condition is broken (e.g. duplicate character). Then shrink `left` until the condition is restored. At each valid state, record the window size (`right - left + 1`). This reduces an O(N^2) brute force to clean O(N) time!"
      } else if (query.toLowerCase().includes('dynamic programming')) {
        reply = "When tackling DP: 1) Identify the recurrence relation on smaller subproblems. 2) Write the recursive base cases. 3) Cache results using memoization (Top-Down). 4) Convert to an iterative table (Bottom-Up) if space optimization is required. Never start by writing loops—start by defining what `dp[i]` represents in plain English!"
      } else if (query.toLowerCase().includes('deadlock')) {
        reply = "For OS Deadlocks, interviewers specifically test the 4 Coffman conditions: Mutual Exclusion, Hold & Wait, No Preemption, and Circular Wait. If you break even ONE condition, deadlock is mathematically impossible. Mention this principle first to demonstrate deep systems intuition!"
      } else if (query.toLowerCase().includes('project')) {
        reply = "Use the STAR framework strictly: \n- Situation: Problem your project solved.\n- Task: Your specific architectural responsibility.\n- Action: Tech stack chosen, tradeoffs considered, APIs engineered.\n- Result: Performance achieved (e.g. sub-100ms response, 99.9% uptime)."
      }

      setMessages([...updated, { role: 'assistant', text: reply }])
    }, 1000)
  }

  const handleClear = () => {
    setMessages([
      {
        role: 'assistant',
        text: 'Conversation cleared. How can I assist your placement preparation next?',
      },
    ])
    toast.success('Chat history cleared')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <GlassCard className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-2">
              <Bot className="w-3.5 h-3.5" />
              AI SENIOR PLACEMENT MENTOR
            </div>
            <h1 className="text-2xl font-bold font-display text-white">
              AI Senior Placement Mentor
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Your 24/7 senior engineer mentor. Ask for conceptual clarifications, DSA debugging intuition, and interview strategies.
            </p>
          </div>

          <Button variant="outline" size="sm" onClick={handleClear} icon={Trash2}>
            Clear Session
          </Button>
        </div>
      </GlassCard>

      {/* Main Chat Container */}
      <GlassCard className="p-6 h-[600px] flex flex-col justify-between">
        {/* Messages */}
        <div className="overflow-y-auto space-y-4 pr-2 flex-1 mb-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex gap-3 text-xs sm:text-sm ${
                m.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {m.role === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-2xl p-4 rounded-2xl leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-slate-900/80 border border-blue-500/25 text-slate-200 rounded-tl-none whitespace-pre-line'
                }`}
              >
                {m.text}
              </div>

              {m.role === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-blue-600/30 text-cyan-300 border border-blue-400/40 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {typing && (
            <div className="flex gap-3 items-center text-xs text-slate-400 font-mono">
              <Bot className="w-4 h-4 text-cyan-400 animate-spin" />
              <span>Senior Mentor is formulating guidance...</span>
            </div>
          )}
        </div>

        {/* Quick Prompts Bar */}
        <div className="pt-3 pb-3 border-t border-slate-800 flex flex-wrap gap-2">
          {quickPrompts.map((qp, i) => (
            <button
              key={i}
              onClick={() => handleSend(qp)}
              className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/30 transition-all truncate max-w-xs"
            >
              💡 {qp}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask a technical, DSA, or interview question..."
            className="flex-1 bg-[#0a0f30] border border-blue-500/30 rounded-xl px-4 py-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
          />
          <Button variant="primary" size="md" onClick={() => handleSend()} icon={Send}>
            Send
          </Button>
        </div>
      </GlassCard>
    </div>
  )
}

