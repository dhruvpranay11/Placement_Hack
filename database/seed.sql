-- ============================================================================
-- PlaceReady AI - Seed Data
-- ============================================================================

-- ============================================================================
-- 1. SUBSCRIPTION PLANS (3 plans)
-- ============================================================================
insert into subscription_plans (id, name, display_name, price, duration_months, features, limits, is_active) values
(
  gen_random_uuid(),
  'free',
  'Free Plan',
  0.00,
  0,
  '{"ai_mentor": true, "mock_interviews": true, "resume_review": true, "dsa_practice": true, "aptitude_quizzes": true, "roadmap": true, "skill_tree": true, "quests": true}'::jsonb,
  '{"ai_requests_per_day": 10, "mock_interviews_per_day": 2, "resume_reviews_per_day": 1, "questions_per_day": 15}'::jsonb,
  true
),
(
  gen_random_uuid(),
  'pro_3month',
  'Pro - 3 Months',
  799.00,
  3,
  '{"ai_mentor": true, "mock_interviews": true, "resume_review": true, "dsa_practice": true, "aptitude_quizzes": true, "roadmap": true, "skill_tree": true, "quests": true, "advanced_analytics": true, "priority_support": true, "custom_roadmaps": true}'::jsonb,
  '{"ai_requests_per_day": 100, "mock_interviews_per_day": 20, "resume_reviews_per_day": 10, "questions_per_day": -1}'::jsonb,
  true
),
(
  gen_random_uuid(),
  'pro_6month',
  'Pro - 6 Months',
  1499.00,
  6,
  '{"ai_mentor": true, "mock_interviews": true, "resume_review": true, "dsa_practice": true, "aptitude_quizzes": true, "roadmap": true, "skill_tree": true, "quests": true, "advanced_analytics": true, "priority_support": true, "custom_roadmaps": true, "company_specific_prep": true}'::jsonb,
  '{"ai_requests_per_day": -1, "mock_interviews_per_day": -1, "resume_reviews_per_day": -1, "questions_per_day": -1}'::jsonb,
  true
);

-- ============================================================================
-- 2. ACHIEVEMENTS (15 achievements)
-- ============================================================================
insert into achievements (id, name, title, description, icon, category, criteria_type, criteria_value, xp_reward) values
(
  gen_random_uuid(),
  'first_blood',
  'First Blood',
  'Solve your very first coding problem. Every legend starts here.',
  '⚔️',
  'coding',
  'problems_solved',
  1,
  50
),
(
  gen_random_uuid(),
  'code_initiate',
  'Code Initiate',
  'Solve 10 coding problems and prove your commitment to the craft.',
  '💻',
  'coding',
  'problems_solved',
  10,
  150
),
(
  gen_random_uuid(),
  'logic_awakening',
  'Logic Awakening',
  'Complete your first aptitude quiz. Your analytical mind is awakening.',
  '🧠',
  'aptitude',
  'quizzes_completed',
  1,
  50
),
(
  gen_random_uuid(),
  'consistency_hunter',
  'Consistency Hunter',
  'Maintain a 7-day study streak. Consistency separates hunters from prey.',
  '🔥',
  'streak',
  'streak_days',
  7,
  200
),
(
  gen_random_uuid(),
  'interview_challenger',
  'Interview Challenger',
  'Complete your first mock interview session. Face the challenge head on.',
  '🎤',
  'interview',
  'interviews_completed',
  1,
  100
),
(
  gen_random_uuid(),
  'dsa_warrior',
  'DSA Warrior',
  'Solve 50 DSA problems. You are forging your weapons for the battlefield.',
  '🗡️',
  'coding',
  'problems_solved',
  50,
  500
),
(
  gen_random_uuid(),
  'technical_specialist',
  'Technical Specialist',
  'Score above 80% in 5 different quizzes. Your technical knowledge is formidable.',
  '🛡️',
  'aptitude',
  'high_score_quizzes',
  5,
  300
),
(
  gen_random_uuid(),
  'rank_breaker',
  'Rank Breaker',
  'Reach D-Rank from E-Rank. You have broken through your first barrier.',
  '⬆️',
  'progression',
  'rank_reached',
  2,
  250
),
(
  gen_random_uuid(),
  'aptitude_ace',
  'Aptitude Ace',
  'Complete 20 aptitude quizzes. Numbers and logic bow before you.',
  '🎯',
  'aptitude',
  'quizzes_completed',
  20,
  400
),
(
  gen_random_uuid(),
  'week_warrior',
  'Week Warrior',
  'Complete all tasks in a roadmap week. Discipline is your superpower.',
  '📅',
  'roadmap',
  'weeks_completed',
  1,
  200
),
(
  gen_random_uuid(),
  'boss_slayer',
  'Boss Slayer',
  'Complete your first Boss Battle quest. You have slain a mighty foe.',
  '👹',
  'quests',
  'boss_battles_won',
  1,
  500
),
(
  gen_random_uuid(),
  'resume_ready',
  'Resume Ready',
  'Get your resume reviewed by the AI and achieve a score above 70.',
  '📄',
  'resume',
  'resume_score',
  70,
  150
),
(
  gen_random_uuid(),
  'mentors_apprentice',
  'Mentor''s Apprentice',
  'Have 10 conversations with the AI mentor. Wisdom comes through dialogue.',
  '🧙',
  'mentor',
  'mentor_conversations',
  10,
  200
),
(
  gen_random_uuid(),
  'speed_demon',
  'Speed Demon',
  'Solve a medium difficulty problem in under 10 minutes.',
  '⚡',
  'coding',
  'fast_solve_medium',
  1,
  300
),
(
  gen_random_uuid(),
  'perfect_score',
  'Perfect Score',
  'Score 100% on any quiz with at least 10 questions. Absolute perfection.',
  '💯',
  'aptitude',
  'perfect_quiz',
  1,
  400
);

-- ============================================================================
-- 3. SKILL TREE NODES (10 nodes across 7 branches)
-- ============================================================================

-- Programming branch
insert into skill_tree_nodes (id, branch, name, description, position_x, position_y, prerequisites, xp_required, icon) values
(
  'a0000001-0000-0000-0000-000000000001'::uuid,
  'Programming',
  'Python Fundamentals',
  'Master Python basics: variables, loops, conditionals, functions, and OOP.',
  0, 0,
  '{}',
  0,
  '🐍'
),
(
  'a0000001-0000-0000-0000-000000000002'::uuid,
  'Programming',
  'Advanced Python',
  'Dive into decorators, generators, context managers, and Pythonic patterns.',
  0, 1,
  '{a0000001-0000-0000-0000-000000000001}',
  500,
  '🚀'
);

-- DSA branch
insert into skill_tree_nodes (id, branch, name, description, position_x, position_y, prerequisites, xp_required, icon) values
(
  'a0000001-0000-0000-0000-000000000003'::uuid,
  'DSA',
  'Arrays & Strings',
  'Master array manipulation, two pointers, sliding window, and string algorithms.',
  1, 0,
  '{}',
  0,
  '📊'
),
(
  'a0000001-0000-0000-0000-000000000004'::uuid,
  'DSA',
  'Trees & Graphs',
  'Conquer binary trees, BSTs, BFS, DFS, and graph traversal algorithms.',
  1, 1,
  '{a0000001-0000-0000-0000-000000000003}',
  800,
  '🌳'
);

-- Aptitude branch
insert into skill_tree_nodes (id, branch, name, description, position_x, position_y, prerequisites, xp_required, icon) values
(
  'a0000001-0000-0000-0000-000000000005'::uuid,
  'Aptitude',
  'Quantitative Aptitude',
  'Number systems, percentages, profit/loss, time & work, permutations, probability.',
  2, 0,
  '{}',
  0,
  '🔢'
);

-- Core CS branch
insert into skill_tree_nodes (id, branch, name, description, position_x, position_y, prerequisites, xp_required, icon) values
(
  'a0000001-0000-0000-0000-000000000006'::uuid,
  'Core CS',
  'Operating Systems',
  'Processes, threads, scheduling, memory management, deadlocks, and file systems.',
  3, 0,
  '{}',
  0,
  '🖥️'
),
(
  'a0000001-0000-0000-0000-000000000007'::uuid,
  'Core CS',
  'Database Management',
  'SQL, normalization, transactions, indexing, ACID properties, and NoSQL basics.',
  3, 1,
  '{a0000001-0000-0000-0000-000000000006}',
  600,
  '🗄️'
);

-- Development branch
insert into skill_tree_nodes (id, branch, name, description, position_x, position_y, prerequisites, xp_required, icon) values
(
  'a0000001-0000-0000-0000-000000000008'::uuid,
  'Development',
  'Web Development Basics',
  'HTML, CSS, JavaScript, REST APIs, and modern web development fundamentals.',
  4, 0,
  '{}',
  0,
  '🌐'
);

-- Communication branch
insert into skill_tree_nodes (id, branch, name, description, position_x, position_y, prerequisites, xp_required, icon) values
(
  'a0000001-0000-0000-0000-000000000009'::uuid,
  'Communication',
  'Technical Communication',
  'Articulate technical concepts clearly, structure your thoughts, and explain solutions.',
  5, 0,
  '{}',
  0,
  '🗣️'
);

-- Interview Prep branch
insert into skill_tree_nodes (id, branch, name, description, position_x, position_y, prerequisites, xp_required, icon) values
(
  'a0000001-0000-0000-0000-000000000010'::uuid,
  'Interview Prep',
  'Behavioral Interview Mastery',
  'STAR method, common behavioral questions, and presenting your best self.',
  6, 0,
  '{a0000001-0000-0000-0000-000000000009}',
  400,
  '🎭'
);

-- ============================================================================
-- 4. QUEST TEMPLATES (5 quests: 3 daily, 2 weekly)
-- ============================================================================
insert into quests (id, title, description, quest_type, difficulty, xp_reward, requirements, is_template) values
(
  gen_random_uuid(),
  'Daily Code Challenge',
  'Solve at least 2 coding problems today. Every problem conquered makes you stronger.',
  'daily',
  'easy',
  50,
  '{"type": "problems_solved", "count": 2}'::jsonb,
  true
),
(
  gen_random_uuid(),
  'Aptitude Training',
  'Complete 1 aptitude quiz to sharpen your analytical skills.',
  'daily',
  'easy',
  40,
  '{"type": "quizzes_completed", "count": 1}'::jsonb,
  true
),
(
  gen_random_uuid(),
  'Knowledge Seeker',
  'Study 1 learning module and expand your technical knowledge base.',
  'daily',
  'medium',
  60,
  '{"type": "modules_studied", "count": 1}'::jsonb,
  true
),
(
  gen_random_uuid(),
  'Weekly Warrior Challenge',
  'Solve 10 coding problems and complete 5 aptitude quizzes this week.',
  'weekly',
  'hard',
  300,
  '{"type": "combo", "problems_solved": 10, "quizzes_completed": 5}'::jsonb,
  true
),
(
  gen_random_uuid(),
  'Interview Gauntlet',
  'Complete 3 mock interview sessions this week and score above 60% on average.',
  'weekly',
  'hard',
  400,
  '{"type": "interviews", "count": 3, "min_avg_score": 60}'::jsonb,
  true
);
