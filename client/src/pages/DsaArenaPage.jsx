import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-hot-toast'
import {
  Code2,
  Search,
  Filter,
  CheckCircle2,
  Bookmark,
  ChevronRight,
  ExternalLink,
  Clock,
  Sparkles,
  X,
  Play,
  FileCode,
  Lightbulb,
} from 'lucide-react'
import GlassCard from '../components/common/GlassCard'
import Button from '../components/common/Button'

export default function DsaArenaPage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState('All')
  const [selectedTopic, setSelectedTopic] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeModalQuestion, setActiveModalQuestion] = useState(null)
  const [activeTab, setActiveTab] = useState('problem') // 'problem', 'solution', 'hints'

  const questions = [
    {
      id: 'dsa-1',
      title: 'Two Sum',
      topic: 'Arrays & Hashing',
      difficulty: 'Easy',
      acceptance: '52%',
      solved: true,
      marked: false,
      statement: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
      input: 'nums = [2,7,11,15], target = 9',
      output: '[0,1]',
      explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      hints: [
        'A really brute force way would be to search for all possible pairs, but that takes O(N^2) time.',
        'Can we use extra space like a Hash Map to check complements in O(1) time?',
      ],
      solution: `def twoSum(nums: list[int], target: int) -> list[int]:
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
    },
    {
      id: 'dsa-2',
      title: 'Longest Substring Without Repeating Characters',
      topic: 'Strings & Sliding Window',
      difficulty: 'Medium',
      acceptance: '34%',
      solved: true,
      marked: true,
      statement: 'Given a string s, find the length of the longest substring without duplicate characters.',
      input: 's = "abcabcbb"',
      output: '3',
      explanation: 'The answer is "abc", with the length of 3.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(min(N, M)) where M is the charset size',
      hints: [
        'Use the sliding window technique with left and right pointers.',
        'Maintain a set or map of character indices to jump the left pointer immediately.',
      ],
      solution: `def lengthOfLongestSubstring(s: str) -> int:
    char_map = {}
    left = 0
    max_len = 0
    for right, ch in enumerate(s):
        if ch in char_map and char_map[ch] >= left:
            left = char_map[ch] + 1
        char_map[ch] = right
        max_len = max(max_len, right - left + 1)
    return max_len`,
    },
    {
      id: 'dsa-3',
      title: 'Trapping Rain Water',
      topic: 'Two Pointers & Arrays',
      difficulty: 'Hard',
      acceptance: '61%',
      solved: false,
      marked: true,
      statement: 'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
      input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]',
      output: '6',
      explanation: 'The above elevation map is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water are being trapped.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1) with two-pointer approach',
      hints: [
        'For any index i, the water trapped depends on min(maxLeft, maxRight) - height[i].',
        'Can you optimize prefix max arrays into two pointers moving inward?',
      ],
      solution: `def trap(height: list[int]) -> int:
    if not height:
        return 0
    left, right = 0, len(height) - 1
    left_max, right_max = height[left], height[right]
    water = 0
    while left < right:
        if left_max < right_max:
            left += 1
            left_max = max(left_max, height[left])
            water += left_max - height[left]
        else:
            right -= 1
            right_max = max(right_max, height[right])
            water += right_max - height[right]
    return water`,
    },
    {
      id: 'dsa-4',
      title: 'Reverse Linked List',
      topic: 'Linked Lists',
      difficulty: 'Easy',
      acceptance: '75%',
      solved: true,
      marked: false,
      statement: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
      input: 'head = [1,2,3,4,5]',
      output: '[5,4,3,4,1]',
      explanation: 'Pointers are reversed in place.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      hints: [
        'Maintain three pointers: prev (None), curr (head), and next_node.',
      ],
      solution: `def reverseList(head):
    prev = None
    curr = head
    while curr:
        next_temp = curr.next
        curr.next = prev
        prev = curr
        curr = next_temp
    return prev`,
    },
    {
      id: 'dsa-5',
      title: 'Coin Change (Min Coins)',
      topic: 'Dynamic Programming',
      difficulty: 'Medium',
      acceptance: '43%',
      solved: false,
      marked: false,
      statement: 'You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount.',
      input: 'coins = [1,2,5], amount = 11',
      output: '3',
      explanation: '11 = 5 + 5 + 1',
      timeComplexity: 'O(amount * len(coins))',
      spaceComplexity: 'O(amount)',
      hints: [
        'Define dp[i] as the minimum coins needed for amount i.',
        'dp[i] = min(dp[i - coin] + 1) for coin in coins.',
      ],
      solution: `def coinChange(coins: list[int], amount: int) -> int:
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for coin in coins:
        for x in range(coin, amount + 1):
            dp[x] = min(dp[x], dp[x - coin] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1`,
    },
    {
      id: 'dsa-6',
      title: 'Number of Islands',
      topic: 'Graphs & BFS/DFS',
      difficulty: 'Medium',
      acceptance: '58%',
      solved: false,
      marked: true,
      statement: 'Given an m x n 2D binary grid grid which represents a map of 1s (land) and 0s (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.',
      input: 'grid = [["1","1","0"],["1","1","0"],["0","0","1"]]',
      output: '2',
      explanation: 'Two distinct connected island components exist.',
      timeComplexity: 'O(M * N)',
      spaceComplexity: 'O(M * N)',
      hints: [
        'Whenever you hit an unvisited 1, trigger a DFS or BFS to sink all connected land to 0.',
      ],
      solution: `def numIslands(grid: list[list[str]]) -> int:
    if not grid:
        return 0
    rows, cols = len(grid), len(grid[0])
    islands = 0

    def dfs(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] != '1':
            return
        grid[r][c] = '0'  # Mark visited
        dfs(r+1, c)
        dfs(r-1, c)
        dfs(r, c+1)
        dfs(r, c-1)

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                islands += 1
                dfs(r, c)
    return islands`,
    },
  ]

  const topics = ['All', 'Arrays & Hashing', 'Strings & Sliding Window', 'Two Pointers & Arrays', 'Linked Lists', 'Dynamic Programming', 'Graphs & BFS/DFS']

  const filteredQuestions = questions.filter((q) => {
    const matchesDiff = selectedDifficulty === 'All' || q.difficulty === selectedDifficulty
    const matchesTopic = selectedTopic === 'All' || q.topic === selectedTopic
    const matchesSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase()) || q.topic.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesDiff && matchesTopic && matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <GlassCard className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-xs font-mono text-cyan-300 mb-2">
              <Code2 className="w-3.5 h-3.5" />
              DSA ARENA: 100+ CURATED CHALLENGES
            </div>
            <h1 className="text-2xl font-bold font-display text-white">
              Data Structures & Algorithms Arena
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Placement-oriented problem bank with optimal Python reference code, complexity breakdowns, and hints.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-cyan-400 bg-blue-950/60 px-3 py-1.5 rounded-xl border border-blue-500/30">
              SOLVED: 3 / 6 (50%)
            </span>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="mt-6 pt-5 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Search problem title or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0a0f30] border border-blue-500/25 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="sm:col-span-3">
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full bg-[#0a0f30] border border-blue-500/25 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
            >
              <option value="All">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div className="sm:col-span-3">
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full bg-[#0a0f30] border border-blue-500/25 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
            >
              {topics.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>
      </GlassCard>

      {/* Problem Bank Table */}
      <GlassCard className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0b1033] border-b border-blue-500/20 text-slate-400 uppercase font-mono tracking-wider">
              <tr>
                <th className="py-3.5 px-4 w-12 text-center">Status</th>
                <th className="py-3.5 px-4">Title</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Difficulty</th>
                <th className="py-3.5 px-4">Acceptance</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredQuestions.map((q) => (
                <tr
                  key={q.id}
                  onClick={() => {
                    setActiveModalQuestion(q)
                    setActiveTab('problem')
                  }}
                  className="hover:bg-blue-950/30 transition-colors cursor-pointer group"
                >
                  <td className="py-3.5 px-4 text-center">
                    {q.solved ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" />
                    ) : (
                      <span className="w-3 h-3 rounded-full border border-slate-600 inline-block" />
                    )}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-white group-hover:text-cyan-300 transition-colors">
                    <div className="flex items-center gap-2">
                      <span>{q.title}</span>
                      {q.marked && <Bookmark className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 font-mono">{q.topic}</td>
                  <td className="py-3.5 px-4 font-semibold">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-mono ${
                        q.difficulty === 'Easy'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : q.difficulty === 'Medium'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}
                    >
                      {q.difficulty}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 font-mono">{q.acceptance}</td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="text-cyan-400 inline-flex items-center gap-1 group-hover:underline">
                      Solve <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Question Detail Modal */}
      <AnimatePresence>
        {activeModalQuestion && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-3xl max-h-[90vh] bg-[#0a0f30] border border-blue-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-5 border-b border-blue-500/20 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-500/15 text-cyan-300 border border-blue-500/30">
                      {activeModalQuestion.topic}
                    </span>
                    <span
                      className={`text-xs font-mono font-bold ${
                        activeModalQuestion.difficulty === 'Easy'
                          ? 'text-emerald-400'
                          : activeModalQuestion.difficulty === 'Medium'
                          ? 'text-amber-400'
                          : 'text-red-400'
                      }`}
                    >
                      {activeModalQuestion.difficulty}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white font-display mt-1">
                    {activeModalQuestion.title}
                  </h3>
                </div>

                <button
                  onClick={() => setActiveModalQuestion(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-slate-800 bg-[#080b1e]/60 px-5 text-xs font-medium">
                <button
                  onClick={() => setActiveTab('problem')}
                  className={`py-3 px-4 border-b-2 font-mono flex items-center gap-1.5 transition-colors ${
                    activeTab === 'problem'
                      ? 'border-cyan-400 text-cyan-300'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5" /> Problem Statement
                </button>
                <button
                  onClick={() => setActiveTab('solution')}
                  className={`py-3 px-4 border-b-2 font-mono flex items-center gap-1.5 transition-colors ${
                    activeTab === 'solution'
                      ? 'border-cyan-400 text-cyan-300'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" /> Python Solution
                </button>
                <button
                  onClick={() => setActiveTab('hints')}
                  className={`py-3 px-4 border-b-2 font-mono flex items-center gap-1.5 transition-colors ${
                    activeTab === 'hints'
                      ? 'border-cyan-400 text-cyan-300'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  <Lightbulb className="w-3.5 h-3.5" /> Hints & Complexity
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-6 overflow-y-auto flex-1 space-y-4 text-xs">
                {activeTab === 'problem' && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-white uppercase tracking-wider text-[11px] text-slate-400 mb-1">
                        Description
                      </h4>
                      <p className="text-slate-200 leading-relaxed font-sans text-sm">
                        {activeModalQuestion.statement}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 font-mono">
                      <div>
                        <span className="text-slate-400 text-[11px]">Example Input:</span>
                        <p className="text-cyan-300 mt-0.5">{activeModalQuestion.input}</p>
                      </div>
                      <div className="pt-2 border-t border-slate-800/80">
                        <span className="text-slate-400 text-[11px]">Example Output:</span>
                        <p className="text-emerald-400 mt-0.5">{activeModalQuestion.output}</p>
                      </div>
                      <div className="pt-2 border-t border-slate-800/80">
                        <span className="text-slate-400 text-[11px]">Explanation:</span>
                        <p className="text-slate-300 mt-0.5">{activeModalQuestion.explanation}</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'solution' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-slate-400 font-mono text-[11px]">
                      <span>Language: Python 3</span>
                      <span>Verified Optimal Approach</span>
                    </div>
                    <pre className="p-4 rounded-xl bg-[#060818] border border-blue-500/20 text-cyan-200 font-mono text-xs overflow-x-auto leading-relaxed">
                      {activeModalQuestion.solution}
                    </pre>
                  </div>
                )}

                {activeTab === 'hints' && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-white uppercase tracking-wider text-[11px] text-slate-400 mb-2">
                        Approach Hints
                      </h4>
                      <ul className="space-y-2">
                        {activeModalQuestion.hints.map((h, i) => (
                          <li key={i} className="p-3 rounded-lg bg-blue-950/30 border border-blue-500/20 text-slate-200 leading-relaxed">
                            💡 {h}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 font-mono">
                        <span className="text-slate-400 block text-[10px]">TIME COMPLEXITY</span>
                        <span className="text-cyan-300 font-bold">{activeModalQuestion.timeComplexity}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 font-mono">
                        <span className="text-slate-400 block text-[10px]">SPACE COMPLEXITY</span>
                        <span className="text-purple-300 font-bold">{activeModalQuestion.spaceComplexity}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-slate-800 bg-[#080b1e]/80 flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    toast.success('Marked for revision!')
                  }}
                  icon={Bookmark}
                >
                  Bookmark for Revision
                </Button>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    toast.success('Problem Marked Solved! +25 XP awarded!')
                    setActiveModalQuestion(null)
                  }}
                  icon={CheckCircle2}
                >
                  Mark as Solved (+25 XP)
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

