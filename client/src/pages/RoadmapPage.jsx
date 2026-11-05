import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import {
  Compass,
  CheckCircle2,
  Clock,
  BookOpen,
  Calendar,
  Sparkles,
  ChevronRight,
  Filter,
  RefreshCw,
} from 'lucide-react'
import GlassCard from '../components/common/GlassCard'
import Button from '../components/common/Button'
import ProgressBar from '../components/common/ProgressBar'

export default function RoadmapPage() {
  const [selectedWeek, setSelectedWeek] = useState(1)

  const [roadmapData, setRoadmapData] = useState([
    {
      week: 1,
      title: 'Week 1: Foundations & Algorithmic Awakening',
      focus: 'Python Basics, Array Manipulations & Fundamental Aptitude',
      tasks: [
        {
          id: 'w1-1',
          title: 'Master Array Two-Pointer & Sliding Window Techniques',
          topic: 'Data Structures',
          duration: '120 mins',
          difficulty: 'Medium',
          completed: true,
          objective: 'Solve LeetCode #1 Two Sum and #121 Best Time to Buy and Sell Stock with O(N) time.',
        },
        {
          id: 'w1-2',
          title: 'Quantitative Aptitude: Percentages, Ratios & Variations',
          topic: 'Aptitude Hub',
          duration: '60 mins',
          difficulty: 'Easy',
          completed: true,
          objective: 'Practice 20 shortcut methods for percentage increase/decrease and successive ratios.',
        },
        {
          id: 'w1-3',
          title: 'Core CS: OOP Principles in Depth',
          topic: 'Technical Academy',
          duration: '90 mins',
          difficulty: 'Medium',
          completed: false,
          objective: 'Understand Abstraction, Polymorphism, Encapsulation, and Inheritance with real examples.',
        },
        {
          id: 'w1-4',
          title: 'Communication Drill: Project Walkthrough Formulation',
          topic: 'Interview Arena',
          duration: '45 mins',
          difficulty: 'Easy',
          completed: false,
          objective: 'Structure your flagship resume project using the STAR (Situation, Task, Action, Result) method.',
        },
      ],
    },
    {
      week: 2,
      title: 'Week 2: String Processing, Searching & Hashing',
      focus: 'Binary Search, Hash Tables & Logical Reasoning',
      tasks: [
        {
          id: 'w2-1',
          title: 'Binary Search Mastery & Boundary Conditions',
          topic: 'Data Structures',
          duration: '120 mins',
          difficulty: 'Medium',
          completed: false,
          objective: 'Solve search in rotated sorted array and find first/last position of element.',
        },
        {
          id: 'w2-2',
          title: 'Hash Maps & Hash Sets Frequency Counting',
          topic: 'Data Structures',
          duration: '90 mins',
          difficulty: 'Medium',
          completed: false,
          objective: 'Longest Consecutive Sequence and Group Anagrams problem solving.',
        },
        {
          id: 'w2-3',
          title: 'Logical Reasoning: Syllogisms & Seating Arrangements',
          topic: 'Aptitude Hub',
          duration: '60 mins',
          difficulty: 'Medium',
          completed: false,
          objective: 'Solve 15 linear and circular seating arrangement puzzles under timed pressure.',
        },
        {
          id: 'w2-4',
          title: 'Database Management: SQL Queries & Normalization',
          topic: 'Technical Academy',
          duration: '90 mins',
          difficulty: 'Medium',
          completed: false,
          objective: 'Master JOINs, GROUP BY, HAVING, and 1NF through BCNF normalization concepts.',
        },
      ],
    },
    {
      week: 3,
      title: 'Week 3: Linear Linked Lists, Stacks & Operating Systems',
      focus: 'Pointers, Monotonic Stacks & OS Processes',
      tasks: [
        {
          id: 'w3-1',
          title: 'Linked List Reversals & Cycle Detection (Floyd Algorithm)',
          topic: 'Data Structures',
          duration: '100 mins',
          difficulty: 'Medium',
          completed: false,
          objective: 'Implement slow/fast pointer technique and reverse linked list iteratively & recursively.',
        },
        {
          id: 'w3-2',
          title: 'Monotonic Stack & Valid Parentheses',
          topic: 'Data Structures',
          duration: '90 mins',
          difficulty: 'Medium',
          completed: false,
          objective: 'Next Greater Element and Daily Temperatures implementations.',
        },
        {
          id: 'w3-3',
          title: 'Operating Systems: Concurrency, Deadlocks & Memory Paging',
          topic: 'Technical Academy',
          duration: '120 mins',
          difficulty: 'Hard',
          completed: false,
          objective: 'Explain Coffman conditions, Banker algorithm, Mutex vs Semaphore, and Virtual Memory.',
        },
      ],
    },
    {
      week: 4,
      title: 'Week 4: Trees, Graphs & Boss Battle Simulation',
      focus: 'Binary Trees, BFS/DFS Traversal & Full Mock Assessment',
      tasks: [
        {
          id: 'w4-1',
          title: 'Tree Traversals (Inorder, Preorder, Postorder, Level Order)',
          topic: 'Data Structures',
          duration: '120 mins',
          difficulty: 'Medium',
          completed: false,
          objective: 'Master recursive and iterative DFS and BFS queue traversal patterns.',
        },
        {
          id: 'w4-2',
          title: 'Computer Networks: TCP/IP Stack & HTTP/HTTPS Handshake',
          topic: 'Technical Academy',
          duration: '90 mins',
          difficulty: 'Medium',
          completed: false,
          objective: 'Understand 3-way handshake, DNS lookup cycle, OSI layers, and socket communication.',
        },
        {
          id: 'w4-3',
          title: 'Full Placement Boss Battle Simulation',
          topic: 'Boss Arena',
          duration: '120 mins',
          difficulty: 'Hard',
          completed: false,
          objective: 'Timed 90-minute online assessment mimicking top-tier campus placement filters.',
        },
      ],
    },
  ])

  const toggleTask = (taskId) => {
    setRoadmapData((prev) =>
      prev.map((w) => ({
        ...w,
        tasks: w.tasks.map((t) => {
          if (t.id === taskId) {
            const next = !t.completed
            if (next) toast.success('Roadmap milestone verified! +30 XP')
            return { ...t, completed: next }
          }
          return t
        }),
      }))
    )
  }

  const activeWeekData = roadmapData.find((w) => w.week === selectedWeek) || roadmapData[0]
  const totalTasks = roadmapData.flatMap((w) => w.tasks).length
  const completedTasks = roadmapData.flatMap((w) => w.tasks).filter((t) => t.completed).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <GlassCard className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-xs font-mono text-cyan-300 mb-2">
              <Compass className="w-3.5 h-3.5" />
              AI PERSONALIZED ROADMAP
            </div>
            <h1 className="text-2xl font-bold font-display text-white">
              Placement Preparation Roadmap
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Curated week-by-week curriculum based on your target role, college timeline, and baseline assessment.
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.success('Roadmap regenerated with latest performance data!')}
            icon={RefreshCw}
          >
            Regenerate Future Weeks
          </Button>
        </div>

        {/* Global Progress Bar */}
        <div className="mt-6 pt-4 border-t border-slate-800">
          <ProgressBar
            value={completedTasks}
            max={totalTasks}
            label={`OVERALL ROADMAP PROGRESS (${completedTasks} of ${totalTasks} Milestones Verified)`}
            color="cyan"
            size="md"
          />
        </div>
      </GlassCard>

      {/* Week Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {roadmapData.map((w) => {
          const wTasks = w.tasks.length
          const wDone = w.tasks.filter((t) => t.completed).length
          const isSelected = selectedWeek === w.week
          return (
            <button
              key={w.week}
              onClick={() => setSelectedWeek(w.week)}
              className={`p-4 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-blue-600/25 border-cyan-400 text-white glow-blue'
                  : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-display font-bold text-sm">WEEK {w.week}</span>
                <span className="text-[10px] font-mono font-bold text-cyan-300">
                  {wDone}/{wTasks} DONE
                </span>
              </div>
              <p className="text-[11px] truncate text-slate-400">{w.focus}</p>
            </button>
          )
        })}
      </div>

      {/* Selected Week Tasks List */}
      <GlassCard className="p-6">
        <div className="border-b border-slate-800 pb-4 mb-6">
          <h2 className="text-lg font-bold text-white font-display">
            {activeWeekData.title}
          </h2>
          <p className="text-xs text-cyan-400 font-mono mt-0.5">
            Key Objectives: {activeWeekData.focus}
          </p>
        </div>

        <div className="space-y-4">
          {activeWeekData.tasks.map((task) => (
            <div
              key={task.id}
              className={`p-4 rounded-xl border transition-all ${
                task.completed
                  ? 'bg-blue-950/20 border-emerald-500/40 text-slate-300'
                  : 'bg-slate-900/50 border-slate-800 hover:border-blue-500/30 text-white'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center transition-colors shrink-0 ${
                      task.completed
                        ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                        : 'border-slate-600 hover:border-cyan-400'
                    }`}
                  >
                    {task.completed && <CheckCircle2 className="w-4 h-4 stroke-[3]" />}
                  </button>
                  <div className="space-y-1">
                    <h4 className={`text-sm font-semibold ${task.completed ? 'line-through text-slate-400' : ''}`}>
                      {task.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">
                      {task.objective}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 pt-2 text-[11px] text-slate-400 font-mono">
                      <span className="px-2 py-0.5 rounded bg-blue-500/10 text-cyan-300 border border-blue-500/20">
                        {task.topic}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {task.duration}
                      </span>
                      <span
                        className={`font-semibold ${
                          task.difficulty === 'Easy'
                            ? 'text-emerald-400'
                            : task.difficulty === 'Medium'
                            ? 'text-amber-400'
                            : 'text-red-400'
                        }`}
                      >
                        {task.difficulty}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0">
                  <span
                    className={`text-xs font-mono px-2.5 py-1 rounded-full border ${
                      task.completed
                        ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                        : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}
                  >
                    {task.completed ? 'VERIFIED' : 'PENDING'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}

