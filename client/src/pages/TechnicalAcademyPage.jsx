import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import {
  GraduationCap,
  BookOpen,
  Database,
  Cpu,
  Network,
  Code2,
  Server,
  Layers,
  Sparkles,
  ChevronDown,
  ChevronRight,
  Bot,
  HelpCircle,
  AlertTriangle,
} from 'lucide-react'
import GlassCard from '../components/common/GlassCard'
import Button from '../components/common/Button'

export default function TechnicalAcademyPage() {
  const [selectedSubject, setSelectedSubject] = useState('oop')
  const [activeTopicIndex, setActiveTopicIndex] = useState(0)
  const [aiExplanationMode, setAiExplanationMode] = useState('interview') // 'beginner', 'realworld', 'interview'

  const subjects = [
    { id: 'oop', title: 'Object Oriented Programming', icon: Code2, count: '6 Topics' },
    { id: 'dbms', title: 'Database Management Systems', icon: Database, count: '8 Topics' },
    { id: 'os', title: 'Operating Systems', icon: Cpu, count: '7 Topics' },
    { id: 'cn', title: 'Computer Networks', icon: Network, count: '6 Topics' },
    { id: 'sql', title: 'SQL & Query Optimization', icon: Layers, count: '5 Topics' },
    { id: 'sd', title: 'System Design Basics', icon: Server, count: '4 Topics' },
  ]

  const curriculum = {
    oop: [
      {
        title: 'The 4 Core Pillars of OOP',
        summary: 'Encapsulation, Abstraction, Inheritance, and Polymorphism form the architectural backbone of enterprise software.',
        definitions: [
          { term: 'Encapsulation', def: 'Bundling data (attributes) and methods that manipulate them into a single unit (class), while restricting direct access via private variables and getters/setters.' },
          { term: 'Abstraction', def: 'Hiding complex implementation details and showing only the essential public interface to the outside world.' },
          { term: 'Inheritance', def: 'Mechanism where a child class acquires properties and behaviors of a parent class, promoting code reusability.' },
          { term: 'Polymorphism', def: 'Ability of an entity to take multiple forms. Compile-time (Method Overloading) vs Runtime (Method Overriding via virtual dispatch).' },
        ],
        mistakes: [
          'Confusing Abstraction (what it does) with Encapsulation (how data is hidden and protected).',
          'Violating Liskov Substitution Principle when subclassing.',
          'Believing Python does not support encapsulation because private variables are name-mangled (_className__var).',
        ],
        interviewQA: [
          {
            q: 'Can we achieve multiple inheritance in Java? If not, how is it solved?',
            a: 'Java does not support multiple class inheritance to avoid the "Diamond Problem" (ambiguity in method resolution). Instead, Java supports multiple inheritance through Interfaces, where multiple contracts can be implemented.',
          },
          {
            q: 'What is the difference between Method Overloading and Method Overriding?',
            a: 'Overloading happens at compile time in the same class (same method name, different parameter types/count). Overriding happens at runtime between parent and child classes (exact same signature and return type).',
          },
        ],
      },
      {
        title: 'Interfaces vs Abstract Classes',
        summary: 'Deep dive into abstract contracts, default methods, and design trade-offs in modern languages.',
        definitions: [
          { term: 'Abstract Class', def: 'A class that cannot be instantiated and may contain both abstract methods (without body) and concrete methods with state.' },
          { term: 'Interface', def: 'A pure contract specifying what a class must do without carrying state or implementation (prior to Java 8 default methods).' },
        ],
        mistakes: [
          'Using an abstract class when classes do not share an "is-a" relationship.',
        ],
        interviewQA: [
          {
            q: 'When would you pick an Abstract Class over an Interface?',
            a: 'Use an abstract class when you want to share code among several closely related classes that have common fields or methods. Use an interface when you want unrelated classes to implement a common set of behaviors.',
          },
        ],
      },
    ],
    dbms: [
      {
        title: 'ACID Properties & Transactions',
        summary: 'Ensuring database reliability, consistency, and crash recovery in concurrent environments.',
        definitions: [
          { term: 'Atomicity', def: 'All changes in a transaction succeed or all fail together ("all or nothing"). Managed by write-ahead logs (WAL).' },
          { term: 'Consistency', def: 'Database transitions from one valid state to another without violating schema constraints.' },
          { term: 'Isolation', def: 'Concurrent transactions do not interfere with each other. Isolation levels: Read Uncommitted, Read Committed, Repeatable Read, Serializable.' },
          { term: 'Durability', def: 'Once committed, changes survive system crashes or power failures.' },
        ],
        mistakes: [
          'Assuming "Read Committed" isolation prevents non-repeatable reads or phantom reads.',
        ],
        interviewQA: [
          {
            q: 'What is a Dirty Read vs Phantom Read?',
            a: 'A Dirty Read occurs when Transaction A reads uncommitted data written by Transaction B (which may roll back). A Phantom Read occurs when Transaction A re-executes a query with a range condition and finds newly inserted rows committed by Transaction B.',
          },
        ],
      },
    ],
  }

  const activeCurriculum = curriculum[selectedSubject] || curriculum.oop
  const activeTopic = activeCurriculum[activeTopicIndex] || activeCurriculum[0]

  return (
    <div className="space-y-6">
      {/* Header */}
      <GlassCard className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-xs font-mono text-amber-300 mb-2">
              <GraduationCap className="w-3.5 h-3.5" />
              TECHNICAL ACADEMY: CORE CS MASTERY
            </div>
            <h1 className="text-2xl font-bold font-display text-white">
              Computer Science Technical Academy
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Curated concept guides, important definitions, common interview traps, and real-world explanations.
            </p>
          </div>
        </div>

        {/* Subjects Carousel / Selector */}
        <div className="mt-6 pt-5 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {subjects.map((sub) => {
            const Icon = sub.icon
            const isSelected = selectedSubject === sub.id
            return (
              <button
                key={sub.id}
                onClick={() => {
                  setSelectedSubject(sub.id)
                  setActiveTopicIndex(0)
                }}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-amber-600/25 border-amber-400 text-amber-200 glow-gold'
                    : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <Icon className={`w-5 h-5 mb-2 ${isSelected ? 'text-amber-400' : 'text-slate-400'}`} />
                <h4 className="text-xs font-bold text-white truncate">{sub.title}</h4>
                <p className="text-[10px] font-mono text-slate-400 mt-0.5">{sub.count}</p>
              </button>
            )
          })}
        </div>
      </GlassCard>

      {/* Main Study Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Topic Navigator */}
        <div className="lg:col-span-4 space-y-3">
          <GlassCard className="p-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 font-mono">
              Subject Modules
            </h3>
            <div className="space-y-1.5">
              {activeCurriculum.map((top, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTopicIndex(idx)}
                  className={`w-full p-3 rounded-xl text-left text-xs font-semibold transition-all flex items-center justify-between ${
                    activeTopicIndex === idx
                      ? 'bg-blue-600/20 text-cyan-300 border border-blue-500/40 glow-blue'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent'
                  }`}
                >
                  <span className="truncate">{top.title}</span>
                  <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                </button>
              ))}
            </div>
          </GlassCard>

          {/* AI Concept Assistant Card */}
          <GlassCard className="p-5 border-cyan-500/30">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 mb-2">
              <Bot className="w-4 h-4 text-cyan-400" />
              <span>AI CONCEPT EXPLORER</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Need a custom perspective on <strong>{activeTopic.title}</strong>? Choose an AI lens:
            </p>
            <div className="grid grid-cols-3 gap-1.5 mt-3 text-[11px] font-mono">
              {['beginner', 'realworld', 'interview'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => {
                    setAiExplanationMode(mode)
                    toast.success(`AI Perspective shifted to: ${mode}`)
                  }}
                  className={`py-1.5 px-2 rounded-lg border capitalize transition-all ${
                    aiExplanationMode === mode
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Topic Content Body */}
        <div className="lg:col-span-8 space-y-6">
          <GlassCard className="p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                MODULE STUDY GUIDE
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white mt-1">
                {activeTopic.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                {activeTopic.summary}
              </p>
            </div>

            {/* Definitions Section */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-amber-400" />
                Key Definitions & Architectural Principles
              </h3>
              <div className="grid grid-cols-1 gap-2.5">
                {activeTopic.definitions.map((def, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
                    <span className="font-bold text-cyan-300 font-mono block mb-1">{def.term}</span>
                    <p className="text-slate-300 leading-relaxed font-sans">{def.def}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Common Mistakes */}
            {activeTopic.mistakes && (
              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-2 text-xs">
                <span className="font-bold text-amber-400 font-mono flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" /> COMMON PLACEMENT INTERVIEW TRAPS
                </span>
                <ul className="space-y-1.5 text-slate-300 pl-4 list-disc">
                  {activeTopic.mistakes.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Interview Q&A Section */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-cyan-400" />
                Frequently Asked Interview Questions
              </h3>
              <div className="space-y-3">
                {activeTopic.interviewQA.map((qa, i) => (
                  <div key={i} className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/20 space-y-2 text-xs">
                    <h4 className="font-bold text-white text-sm">Q: {qa.q}</h4>
                    <p className="text-slate-300 leading-relaxed font-sans pl-2 border-l-2 border-cyan-400">
                      <strong>Model Answer:</strong> {qa.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}

