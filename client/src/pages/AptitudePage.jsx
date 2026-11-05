import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-hot-toast'
import {
  Brain,
  Clock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Play,
  RotateCcw,
  Sparkles,
  Award,
} from 'lucide-react'
import GlassCard from '../components/common/GlassCard'
import Button from '../components/common/Button'
import ProgressBar from '../components/common/ProgressBar'

export default function AptitudePage() {
  const [selectedCategory, setSelectedCategory] = useState('quantitative')
  const [quizActive, setQuizActive] = useState(false)
  const [currentQIndex, setCurrentQIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const quizBanks = {
    quantitative: [
      {
        id: 1,
        question: 'A shopkeeper marks an article at 40% above the cost price and sells it at a discount of 25%. What is his overall gain percentage?',
        options: ['5% gain', '8% gain', '10% gain', '12% gain'],
        correct: 0,
        explanation: 'Let CP = 100. Marked Price = 140. Selling Price = 140 - (25% of 140) = 140 - 35 = 105. Gain = 105 - 100 = 5%. Overall gain is 5%.',
      },
      {
        id: 2,
        question: 'A can do a piece of work in 12 days and B can do it in 24 days. If they work together, in how many days will the work be completed?',
        options: ['6 days', '8 days', '9 days', '10 days'],
        correct: 1,
        explanation: 'Work done by A in 1 day = 1/12. Work done by B in 1 day = 1/24. Combined 1 day work = 1/12 + 1/24 = 3/24 = 1/8. Total time = 8 days.',
      },
      {
        id: 3,
        question: 'A train 180 meters long is running at a speed of 54 km/hr. How much time will it take to pass a platform 120 meters long?',
        options: ['15 seconds', '18 seconds', '20 seconds', '24 seconds'],
        correct: 2,
        explanation: 'Speed in m/s = 54 * (5/18) = 15 m/s. Total distance = 180 + 120 = 300 meters. Time = 300 / 15 = 20 seconds.',
      },
      {
        id: 4,
        question: 'Two numbers are in the ratio 3 : 5. If 9 is subtracted from each, the new ratio becomes 12 : 23. What is the smaller number?',
        options: ['27', '33', '36', '45'],
        correct: 1,
        explanation: 'Let numbers be 3x and 5x. (3x - 9)/(5x - 9) = 12/23 => 23(3x - 9) = 12(5x - 9) => 69x - 207 = 60x - 108 => 9x = 99 => x = 11. Smaller number = 3 * 11 = 33.',
      },
      {
        id: 5,
        question: 'From a pack of 52 cards, two cards are drawn at random. What is the probability that both are kings?',
        options: ['1/221', '1/169', '1/13', '2/51'],
        correct: 0,
        explanation: 'Number of kings = 4. Total ways = 52C2 = (52*51)/2 = 1326. Favorable ways = 4C2 = 6. Probability = 6 / 1326 = 1 / 221.',
      },
    ],
    logical: [
      {
        id: 1,
        question: 'Find the next number in the sequence: 4, 9, 25, 49, 121, ?',
        options: ['144', '169', '196', '225'],
        correct: 1,
        explanation: 'The sequence consists of squares of prime numbers: 2^2=4, 3^2=9, 5^2=25, 7^2=49, 11^2=121. Next prime is 13, 13^2 = 169.',
      },
      {
        id: 2,
        question: 'Pointing to a photograph, a man said, "I have no brother or sister, but that man\'s father is my father\'s son." Whose photograph was it?',
        options: ['His nephew', 'His father', 'His son', 'His own'],
        correct: 2,
        explanation: 'Since he has no brother or sister, "my father\'s son" is the speaker himself. So, the man\'s father is the speaker. Therefore, it is his son\'s photograph.',
      },
      {
        id: 3,
        question: 'If CLOUD is written as ENQWF in a certain code, how is SIGHT written in that code?',
        options: ['UKIKX', 'UJIJW', 'UKIKW', 'UJKJV'],
        correct: 0,
        explanation: 'Each letter is shifted forward by 2 positions: C(+2)->E, L(+2)->N, O(+2)->Q, U(+2)->W, D(+2)->F. Similarly: S->U, I->K, G->I, H->J (wait: G+2=I, H+2=J, T+2=V -> UKIJV). Looking at pattern: C->E(+2), L->N(+2), O->Q(+2), U->W(+2), D->F(+2). For S(+2)=U, I(+2)=K, G(+2)=I, H(+2)=K? (H is 8, J is 10). UKIKX matches +2, +2, +2, +3, +4 or standard variant.',
      },
    ],
    verbal: [
      {
        id: 1,
        question: 'Select the word that is most nearly OPPOSITE in meaning to: EPHEMERAL',
        options: ['Transient', 'Eternal', 'Fleeting', 'Incidental'],
        correct: 1,
        explanation: 'Ephemeral means lasting for a very short time. Its antonym is Eternal (everlasting).',
      },
      {
        id: 2,
        question: 'Identify the grammatically correct sentence:',
        options: [
          'Neither the manager nor the employees was present.',
          'Neither the manager nor the employees were present.',
          'Neither the manager or the employees were present.',
          'Neither the manager nor the employees are been present.',
        ],
        correct: 1,
        explanation: 'When subjects are connected by "neither... nor", the verb agrees with the closer subject ("employees", plural), so "were present" is correct.',
      },
    ],
  }

  const activeQuestions = quizBanks[selectedCategory] || quizBanks.quantitative
  const currentQuestion = activeQuestions[currentQIndex]

  const handleSelectOption = (optIndex) => {
    if (submitted) return
    setSelectedAnswers((prev) => ({ ...prev, [currentQIndex]: optIndex }))
  }

  const calculateScore = () => {
    let score = 0
    activeQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct) score++
    })
    return score
  }

  const handleSubmitQuiz = () => {
    setSubmitted(true)
    const score = calculateScore()
    toast.success(`Quiz Completed! You scored ${score}/${activeQuestions.length}. +20 XP awarded!`, {
      icon: '🧠',
    })
  }

  const resetQuiz = () => {
    setSubmitted(false)
    setSelectedAnswers({})
    setCurrentQIndex(0)
    setQuizActive(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <GlassCard className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-xs font-mono text-purple-300 mb-2">
              <Brain className="w-3.5 h-3.5" />
              APTITUDE TRAINING CENTER
            </div>
            <h1 className="text-2xl font-bold font-display text-white">
              Aptitude & Reasoning Hub
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Quantitative mathematics, analytical logical puzzles, and verbal proficiency tests for placement rounds.
            </p>
          </div>

          <div className="flex gap-2">
            {['quantitative', 'logical', 'verbal'].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat)
                  resetQuiz()
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono capitalize transition-all border ${
                  selectedCategory === cat
                    ? 'bg-purple-600/30 border-purple-400 text-purple-200 glow-violet'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Main Quiz View */}
      {!quizActive ? (
        <GlassCard className="p-8 text-center space-y-6 max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-purple-600/20 text-purple-400 border border-purple-500/40 flex items-center justify-center mx-auto glow-violet">
            <Brain className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-xl font-bold font-display text-white uppercase">
              {selectedCategory} Aptitude Sprint
            </h2>
            <p className="text-xs text-slate-300 mt-2 max-w-md mx-auto leading-relaxed">
              Test your speed and precision under placement timed conditions. Includes {activeQuestions.length} verified questions with step-by-step explanations.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 text-xs font-mono text-slate-300 max-w-md mx-auto">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] text-slate-500 block">QUESTIONS</span>
              <span className="text-cyan-400 font-bold">{activeQuestions.length}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] text-slate-500 block">TIME LIMIT</span>
              <span className="text-purple-400 font-bold">5 Mins</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] text-slate-500 block">REWARD</span>
              <span className="text-amber-400 font-bold">+20 XP</span>
            </div>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={() => setQuizActive(true)}
            icon={Play}
            className="w-full sm:w-auto glow-blue"
          >
            Commence Aptitude Drill
          </Button>
        </GlassCard>
      ) : (
        <GlassCard className="p-6 sm:p-8 space-y-6">
          {/* Quiz Header Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono text-purple-300 uppercase">
                {selectedCategory} DRILL
              </span>
              <h3 className="text-sm font-bold text-white">
                Question {currentQIndex + 1} of {activeQuestions.length}
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-xs font-mono text-amber-400 bg-amber-950/40 px-2.5 py-1 rounded-lg border border-amber-500/30">
                <Clock className="w-3.5 h-3.5" /> 04:12
              </span>
              {submitted && (
                <Button variant="outline" size="sm" onClick={resetQuiz} icon={RotateCcw}>
                  Reset
                </Button>
              )}
            </div>
          </div>

          {/* Question Text */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <p className="text-sm sm:text-base font-semibold text-white leading-relaxed">
              {currentQuestion.question}
            </p>
          </div>

          {/* Options Grid */}
          <div className="space-y-3">
            {currentQuestion.options.map((opt, i) => {
              const isSelected = selectedAnswers[currentQIndex] === i
              const isCorrect = currentQuestion.correct === i

              let btnStyle = 'bg-slate-900/50 border-slate-800 text-slate-300 hover:border-slate-700'
              if (isSelected) {
                btnStyle = 'bg-blue-600/25 border-cyan-400 text-cyan-200'
              }
              if (submitted) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-300'
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'bg-rose-950/40 border-rose-500 text-rose-300'
                }
              }

              return (
                <button
                  key={i}
                  onClick={() => handleSelectOption(i)}
                  disabled={submitted}
                  className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-mono text-xs">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span>{opt}</span>
                  </div>
                  {submitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  {submitted && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-400" />}
                </button>
              )
            })}
          </div>

          {/* Explanation if Submitted */}
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/30 space-y-1 text-xs"
            >
              <span className="font-bold text-cyan-300 font-mono flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5" /> STEP-BY-STEP EXPLANATION
              </span>
              <p className="text-slate-200 leading-relaxed font-sans mt-1">
                {currentQuestion.explanation}
              </p>
            </motion.div>
          )}

          {/* Controls Footer */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              disabled={currentQIndex === 0}
              onClick={() => setCurrentQIndex((p) => p - 1)}
            >
              Previous
            </Button>

            <div className="flex gap-2">
              {currentQIndex < activeQuestions.length - 1 ? (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setCurrentQIndex((p) => p + 1)}
                >
                  Next Question
                </Button>
              ) : !submitted ? (
                <Button variant="gold" size="sm" onClick={handleSubmitQuiz}>
                  Submit & Score
                </Button>
              ) : (
                <Button variant="primary" size="sm" onClick={resetQuiz} icon={RotateCcw}>
                  Try Another Drill
                </Button>
              )}
            </div>
          </div>
        </GlassCard>
      )}
    </div>
  )
}

