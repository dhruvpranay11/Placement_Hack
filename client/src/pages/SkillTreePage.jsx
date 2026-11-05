import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import {
  GitFork,
  Lock,
  Unlock,
  CheckCircle2,
  Sparkles,
  Zap,
  Code2,
  Brain,
  GraduationCap,
  Users2,
  Shield,
  Layers,
} from 'lucide-react'
import GlassCard from '../components/common/GlassCard'
import Button from '../components/common/Button'

export default function SkillTreePage() {
  const [selectedBranch, setSelectedBranch] = useState('dsa')
  const [selectedNode, setSelectedNode] = useState(null)

  const skillTreeData = {
    dsa: [
      {
        id: 'node-1',
        title: 'Arrays & Pointer Basics',
        state: 'mastered', // 'mastered', 'completed', 'in_progress', 'available', 'locked'
        xp: 150,
        desc: 'Mastered Two Pointers, Prefix Sum, and Sliding Window techniques.',
        prereqs: 'None',
      },
      {
        id: 'node-2',
        title: 'Binary Search & Boundary Proofs',
        state: 'completed',
        xp: 200,
        desc: 'Search space reductions, rotated sorted arrays, and monotonicity proofs.',
        prereqs: 'Arrays & Pointer Basics',
      },
      {
        id: 'node-3',
        title: 'Monotonic Stacks & Queues',
        state: 'in_progress',
        xp: 250,
        desc: 'Next greater elements, sliding window maximum, and operator precedence.',
        prereqs: 'Arrays & Pointer Basics',
      },
      {
        id: 'node-4',
        title: 'Tree Traversals & Binary Search Trees',
        state: 'available',
        xp: 300,
        desc: 'Recursive DFS, iterative BFS, BST validation, and LCA algorithms.',
        prereqs: 'Binary Search',
      },
      {
        id: 'node-5',
        title: 'Dynamic Programming & Memoization',
        state: 'locked',
        xp: 500,
        desc: '1D/2D DP recurrence relations, knapsack variations, and state compression.',
        prereqs: 'Tree Traversals',
      },
      {
        id: 'node-6',
        title: 'Graph Theory & Shortest Paths',
        state: 'locked',
        xp: 600,
        desc: 'Dijkstra, Bellman-Ford, Topological Sort, and Disjoint Set Union (DSU).',
        prereqs: 'Tree Traversals',
      },
    ],
    aptitude: [
      {
        id: 'apt-1',
        title: 'Percentages & Profit/Loss',
        state: 'mastered',
        xp: 150,
        desc: 'Successive percentage changes and shortcut formula derivations.',
        prereqs: 'None',
      },
      {
        id: 'apt-2',
        title: 'Time, Speed & Work',
        state: 'completed',
        xp: 200,
        desc: 'Relative speed, pipes & cisterns, and efficiency ratios.',
        prereqs: 'Percentages & Profit/Loss',
      },
      {
        id: 'apt-3',
        title: 'Permutations, Combinations & Probability',
        state: 'in_progress',
        xp: 250,
        desc: 'Combinatorial selection, conditional probability, and Bayes Theorem.',
        prereqs: 'Time, Speed & Work',
      },
      {
        id: 'apt-4',
        title: 'Analytical Seating & Puzzles',
        state: 'available',
        xp: 300,
        desc: 'Multi-variable circular and matrix arrangement deductions.',
        prereqs: 'Permutations',
      },
    ],
    core_cs: [
      {
        id: 'cs-1',
        title: 'OOP 4 Pillars & Design Principles',
        state: 'mastered',
        xp: 150,
        desc: 'Encapsulation, Polymorphism, Abstraction, Inheritance, and SOLID design.',
        prereqs: 'None',
      },
      {
        id: 'cs-2',
        title: 'Database Normalization & ACID',
        state: 'completed',
        xp: 200,
        desc: '1NF through BCNF, transaction isolation levels, and write-ahead logs.',
        prereqs: 'OOP Principles',
      },
      {
        id: 'cs-3',
        title: 'Operating Systems & Concurrency',
        state: 'in_progress',
        xp: 300,
        desc: 'Process scheduling, Coffman deadlocks, and virtual memory paging.',
        prereqs: 'Database Normalization',
      },
      {
        id: 'cs-4',
        title: 'Computer Networks (OSI & TCP/IP)',
        state: 'available',
        xp: 300,
        desc: 'Three-way handshake, DNS resolution, and HTTP/HTTPS protocol headers.',
        prereqs: 'Operating Systems',
      },
    ],
  }

  const activeNodes = skillTreeData[selectedBranch] || skillTreeData.dsa

  const getNodeBadge = (state) => {
    switch (state) {
      case 'mastered':
        return <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px] border border-emerald-500/40">MASTERED</span>
      case 'completed':
        return <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-[10px] border border-cyan-500/40">COMPLETED</span>
      case 'in_progress':
        return <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[10px] border border-amber-500/40">TRAINING</span>
      case 'available':
        return <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono text-[10px] border border-blue-500/40">UNLOCKED</span>
      case 'locked':
      default:
        return <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-500 font-mono text-[10px] border border-slate-700">LOCKED</span>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <GlassCard className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-xs font-mono text-cyan-300 mb-2">
              <GitFork className="w-3.5 h-3.5" />
              HUNTER SKILL CONSTELLATION
            </div>
            <h1 className="text-2xl font-bold font-display text-white">
              Interactive Placement Skill Tree
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Visualize your placement readiness journey. Unlock advanced nodes by conquering prerequisite fundamentals.
            </p>
          </div>

          <div className="flex gap-2">
            {[
              { id: 'dsa', label: 'DSA & Algorithms' },
              { id: 'aptitude', label: 'Aptitude Hub' },
              { id: 'core_cs', label: 'Core CS Subjects' },
            ].map((b) => (
              <button
                key={b.id}
                onClick={() => {
                  setSelectedBranch(b.id)
                  setSelectedNode(null)
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all border ${
                  selectedBranch === b.id
                    ? 'bg-blue-600/30 border-cyan-400 text-cyan-200 glow-blue'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Constellation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activeNodes.map((node, i) => {
          const isLocked = node.state === 'locked'
          return (
            <div
              key={node.id}
              onClick={() => setSelectedNode(node)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                isLocked
                  ? 'bg-slate-950/40 border-slate-800/80 opacity-60'
                  : node.state === 'mastered'
                  ? 'bg-emerald-950/20 border-emerald-500/40 hover:border-emerald-400 glow-emerald'
                  : node.state === 'in_progress'
                  ? 'bg-amber-950/20 border-amber-500/40 hover:border-amber-400'
                  : 'bg-[#0a0f30] border-blue-500/30 hover:border-cyan-400 glow-blue'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400">
                    {isLocked ? (
                      <Lock className="w-4 h-4 text-slate-500" />
                    ) : node.state === 'mastered' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Sparkles className="w-4 h-4 text-cyan-400" />
                    )}
                  </div>
                  {getNodeBadge(node.state)}
                </div>

                <h3 className="text-sm font-bold text-white font-display">{node.title}</h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed font-sans">{node.desc}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Prereq: {node.prereqs}</span>
                <span className="text-amber-400 font-bold">+{node.xp} XP</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

