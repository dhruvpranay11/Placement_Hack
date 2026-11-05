-- ============================================================================
-- PlaceReady AI - Complete PostgreSQL Schema
-- A Gamified Placement Preparation Platform
-- Compatible with Supabase (PostgreSQL 15+)
-- ============================================================================

-- Enable required extensions
create extension if not exists "pgcrypto";

-- ============================================================================
-- TRIGGER FUNCTION: auto-update updated_at
-- ============================================================================
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql security definer;

-- ============================================================================
-- 1. PROFILES
-- ============================================================================
create table profiles (
  user_id            uuid primary key references auth.users(id) on delete cascade,
  full_name          text,
  email              text,
  avatar_url         text,
  college            text,
  degree             text,
  branch             text,
  academic_year      int,
  graduation_year    int,
  target_role        text,
  preferred_language text,
  coding_proficiency text check (coding_proficiency in ('beginner', 'intermediate', 'advanced')),
  dsa_experience     text check (dsa_experience in ('beginner', 'intermediate', 'advanced')),
  aptitude_proficiency text check (aptitude_proficiency in ('beginner', 'intermediate', 'advanced')),
  core_cs_proficiency  text check (core_cs_proficiency in ('beginner', 'intermediate', 'advanced')),
  development_experience text check (development_experience in ('beginner', 'intermediate', 'advanced')),
  daily_prep_time    int,  -- minutes
  placement_timeline date,
  learning_goals     text[],
  onboarding_completed boolean default false,
  created_at         timestamptz default now(),
  updated_at         timestamptz default now()
);

create index idx_profiles_email on profiles(email);
create index idx_profiles_college on profiles(college);
create index idx_profiles_created_at on profiles(created_at);

create trigger trg_profiles_updated_at
  before update on profiles
  for each row execute function update_updated_at();

-- ============================================================================
-- 2. HUNTER STATS (Gamification)
-- ============================================================================
create table hunter_stats (
  user_id                  uuid primary key references profiles(user_id) on delete cascade,
  hunter_rank              text default 'E-Rank' check (hunter_rank in (
                             'E-Rank', 'D-Rank', 'C-Rank', 'B-Rank', 'A-Rank', 'S-Rank', 'National Elite'
                           )),
  level                    int default 1,
  total_xp                 int default 0,
  current_streak           int default 0,
  longest_streak           int default 0,
  last_activity_date       date,
  intelligence             int default 10,
  problem_solving          int default 10,
  technical_knowledge      int default 10,
  communication            int default 10,
  development_skills       int default 10,
  interview_readiness      int default 10,
  placement_readiness_score numeric(5,2) default 0,
  created_at               timestamptz default now(),
  updated_at               timestamptz default now()
);

create trigger trg_hunter_stats_updated_at
  before update on hunter_stats
  for each row execute function update_updated_at();

-- ============================================================================
-- 3. XP TRANSACTIONS
-- ============================================================================
create table xp_transactions (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references profiles(user_id) on delete cascade,
  amount        int not null,
  activity_type text not null,
  activity_id   text,
  description   text,
  created_at    timestamptz default now(),
  constraint uq_xp_no_duplicate unique (user_id, activity_type, activity_id)
);

create index idx_xp_transactions_user_id on xp_transactions(user_id);
create index idx_xp_transactions_activity_type on xp_transactions(activity_type);
create index idx_xp_transactions_created_at on xp_transactions(created_at);

-- ============================================================================
-- 4. ACHIEVEMENTS
-- ============================================================================
create table achievements (
  id             uuid primary key default gen_random_uuid(),
  name           text unique not null,
  title          text,
  description    text,
  icon           text,
  category       text,
  criteria_type  text,
  criteria_value int,
  xp_reward      int default 0,
  created_at     timestamptz default now()
);

create index idx_achievements_category on achievements(category);

-- ============================================================================
-- 5. USER ACHIEVEMENTS
-- ============================================================================
create table user_achievements (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references profiles(user_id) on delete cascade,
  achievement_id uuid not null references achievements(id) on delete cascade,
  unlocked_at    timestamptz default now(),
  notified       boolean default false,
  constraint uq_user_achievement unique (user_id, achievement_id)
);

create index idx_user_achievements_user_id on user_achievements(user_id);
create index idx_user_achievements_achievement_id on user_achievements(achievement_id);

-- ============================================================================
-- 6. QUESTS
-- ============================================================================
create table quests (
  id           uuid primary key default gen_random_uuid(),
  title        text,
  description  text,
  quest_type   text check (quest_type in ('daily', 'weekly', 'boss_battle')),
  difficulty   text check (difficulty in ('easy', 'medium', 'hard', 'boss')),
  xp_reward    int,
  requirements jsonb,
  is_template  boolean default true,
  created_at   timestamptz default now()
);

create index idx_quests_quest_type on quests(quest_type);
create index idx_quests_difficulty on quests(difficulty);

-- ============================================================================
-- 7. USER QUESTS
-- ============================================================================
create table user_quests (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references profiles(user_id) on delete cascade,
  quest_id      uuid references quests(id) on delete set null,  -- nullable for AI-generated
  title         text,
  description   text,
  quest_type    text,
  difficulty    text,
  xp_reward     int,
  requirements  jsonb,
  tasks         jsonb,
  progress      jsonb,
  status        text default 'active' check (status in ('active', 'completed', 'expired', 'failed')),
  assigned_date date,
  due_date      date,
  completed_at  timestamptz,
  created_at    timestamptz default now()
);

create index idx_user_quests_user_id on user_quests(user_id);
create index idx_user_quests_status on user_quests(status);
create index idx_user_quests_quest_type on user_quests(quest_type);
create index idx_user_quests_assigned_date on user_quests(assigned_date);

-- ============================================================================
-- 8. SKILL TREE NODES
-- ============================================================================
create table skill_tree_nodes (
  id            uuid primary key default gen_random_uuid(),
  branch        text not null,
  name          text,
  description   text,
  position_x    int,
  position_y    int,
  prerequisites uuid[],
  xp_required   int default 0,
  icon          text,
  created_at    timestamptz default now()
);

create index idx_skill_tree_nodes_branch on skill_tree_nodes(branch);

-- ============================================================================
-- 9. USER SKILL TREE PROGRESS
-- ============================================================================
create table user_skill_tree_progress (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references profiles(user_id) on delete cascade,
  node_id      uuid not null references skill_tree_nodes(id) on delete cascade,
  status       text default 'locked' check (status in ('locked', 'available', 'in_progress', 'completed', 'mastered')),
  progress_pct int default 0,
  unlocked_at  timestamptz,
  completed_at timestamptz,
  created_at   timestamptz default now(),
  constraint uq_user_skill_node unique (user_id, node_id)
);

create index idx_user_skill_tree_user_id on user_skill_tree_progress(user_id);
create index idx_user_skill_tree_node_id on user_skill_tree_progress(node_id);
create index idx_user_skill_tree_status on user_skill_tree_progress(status);

-- ============================================================================
-- 10. QUESTIONS (DSA / Coding)
-- ============================================================================
create table questions (
  id                 uuid primary key default gen_random_uuid(),
  title              text,
  problem_statement  text,
  input_format       text,
  output_format      text,
  constraints        text,
  example_input      text,
  example_output     text,
  difficulty         text check (difficulty in ('easy', 'medium', 'hard')),
  category           text,
  topic              text,
  hints              text[],
  expected_approach  text,
  time_complexity    text,
  space_complexity   text,
  explanation        text,
  reference_solution text,
  language           text default 'python',
  created_at         timestamptz default now()
);

create index idx_questions_difficulty on questions(difficulty);
create index idx_questions_category on questions(category);
create index idx_questions_topic on questions(topic);

-- ============================================================================
-- 11. USER QUESTION ATTEMPTS
-- ============================================================================
create table user_question_attempts (
  id                  uuid primary key default gen_random_uuid(),
  user_id             uuid not null references profiles(user_id) on delete cascade,
  question_id         uuid not null references questions(id) on delete cascade,
  code                text,
  language            text,
  status              text check (status in ('attempted', 'solved', 'skipped')),
  time_spent          int,  -- seconds
  notes               text,
  marked_for_revision boolean default false,
  created_at          timestamptz default now()
);

create index idx_user_question_attempts_user_id on user_question_attempts(user_id);
create index idx_user_question_attempts_question_id on user_question_attempts(question_id);
create index idx_user_question_attempts_status on user_question_attempts(status);
create index idx_user_question_attempts_created_at on user_question_attempts(created_at);

-- ============================================================================
-- 12. APTITUDE QUESTIONS
-- ============================================================================
create table aptitude_questions (
  id             uuid primary key default gen_random_uuid(),
  category       text check (category in ('quantitative', 'logical', 'verbal')),
  topic          text,
  question_text  text,
  options        jsonb,
  correct_option int,
  explanation    text,
  difficulty     text check (difficulty in ('easy', 'medium', 'hard')),
  created_at     timestamptz default now()
);

create index idx_aptitude_questions_category on aptitude_questions(category);
create index idx_aptitude_questions_difficulty on aptitude_questions(difficulty);
create index idx_aptitude_questions_topic on aptitude_questions(topic);

-- ============================================================================
-- 13. QUIZ ATTEMPTS
-- ============================================================================
create table quiz_attempts (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references profiles(user_id) on delete cascade,
  quiz_type       text,
  category        text,
  topic           text,
  questions       jsonb,
  answers         jsonb,
  score           numeric(5,2),
  total_questions int,
  correct_answers int,
  time_spent      int,  -- seconds
  completed_at    timestamptz,
  created_at      timestamptz default now()
);

create index idx_quiz_attempts_user_id on quiz_attempts(user_id);
create index idx_quiz_attempts_quiz_type on quiz_attempts(quiz_type);
create index idx_quiz_attempts_category on quiz_attempts(category);
create index idx_quiz_attempts_created_at on quiz_attempts(created_at);

-- ============================================================================
-- 14. LEARNING MODULES
-- ============================================================================
create table learning_modules (
  id                  uuid primary key default gen_random_uuid(),
  subject             text,
  topic               text,
  title               text,
  content             text,
  key_definitions     jsonb,
  real_world_examples text[],
  interview_questions jsonb,
  common_mistakes     text[],
  related_topics      text[],
  difficulty          text,
  order_index         int,
  created_at          timestamptz default now()
);

create index idx_learning_modules_subject on learning_modules(subject);
create index idx_learning_modules_topic on learning_modules(topic);
create index idx_learning_modules_difficulty on learning_modules(difficulty);

-- ============================================================================
-- 15. ROADMAPS
-- ============================================================================
create table roadmaps (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references profiles(user_id) on delete cascade,
  title         text,
  description   text,
  total_weeks   int,
  current_week  int default 1,
  status        text default 'active',
  generated_by  text default 'ai',
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

create index idx_roadmaps_user_id on roadmaps(user_id);
create index idx_roadmaps_status on roadmaps(status);

create trigger trg_roadmaps_updated_at
  before update on roadmaps
  for each row execute function update_updated_at();

-- ============================================================================
-- 16. ROADMAP TASKS
-- ============================================================================
create table roadmap_tasks (
  id                 uuid primary key default gen_random_uuid(),
  roadmap_id         uuid not null references roadmaps(id) on delete cascade,
  week_number        int,
  day_number         int,
  title              text,
  description        text,
  topic              text,
  learning_objective text,
  estimated_time     int,  -- minutes
  difficulty         text,
  resource_type      text,
  practice_activity  text,
  revision_activity  text,
  status             text default 'pending' check (status in ('pending', 'in_progress', 'completed', 'skipped')),
  completed_at       timestamptz,
  created_at         timestamptz default now()
);

create index idx_roadmap_tasks_roadmap_id on roadmap_tasks(roadmap_id);
create index idx_roadmap_tasks_status on roadmap_tasks(status);
create index idx_roadmap_tasks_week_day on roadmap_tasks(week_number, day_number);

-- ============================================================================
-- 17. RESUMES
-- ============================================================================
create table resumes (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references profiles(user_id) on delete cascade,
  file_url       text,
  file_name      text,
  extracted_text text,
  created_at     timestamptz default now(),
  updated_at     timestamptz default now()
);

create index idx_resumes_user_id on resumes(user_id);

create trigger trg_resumes_updated_at
  before update on resumes
  for each row execute function update_updated_at();

-- ============================================================================
-- 18. RESUME REVIEWS
-- ============================================================================
create table resume_reviews (
  id                   uuid primary key default gen_random_uuid(),
  resume_id            uuid not null references resumes(id) on delete cascade,
  user_id              uuid not null references profiles(user_id) on delete cascade,
  review_data          jsonb,
  grammar_suggestions  jsonb,
  clarity_improvements jsonb,
  missing_sections     text[],
  overall_score        numeric(5,2),
  created_at           timestamptz default now()
);

create index idx_resume_reviews_resume_id on resume_reviews(resume_id);
create index idx_resume_reviews_user_id on resume_reviews(user_id);

-- ============================================================================
-- 19. INTERVIEW SESSIONS
-- ============================================================================
create table interview_sessions (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references profiles(user_id) on delete cascade,
  interview_type  text,
  difficulty      text,
  status          text default 'in_progress' check (status in ('in_progress', 'completed', 'abandoned')),
  total_questions int default 0,
  score           numeric(5,2),
  feedback        jsonb,
  started_at      timestamptz default now(),
  completed_at    timestamptz,
  created_at      timestamptz default now()
);

create index idx_interview_sessions_user_id on interview_sessions(user_id);
create index idx_interview_sessions_status on interview_sessions(status);
create index idx_interview_sessions_created_at on interview_sessions(created_at);

-- ============================================================================
-- 20. INTERVIEW MESSAGES
-- ============================================================================
create table interview_messages (
  id          uuid primary key default gen_random_uuid(),
  session_id  uuid not null references interview_sessions(id) on delete cascade,
  role        text check (role in ('system', 'interviewer', 'candidate')),
  content     text,
  evaluation  jsonb,
  created_at  timestamptz default now()
);

create index idx_interview_messages_session_id on interview_messages(session_id);

-- ============================================================================
-- 21. MENTOR CONVERSATIONS
-- ============================================================================
create table mentor_conversations (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references profiles(user_id) on delete cascade,
  title      text,
  context    text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_mentor_conversations_user_id on mentor_conversations(user_id);

-- ============================================================================
-- 22. MENTOR MESSAGES
-- ============================================================================
create table mentor_messages (
  id              uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references mentor_conversations(id) on delete cascade,
  role            text check (role in ('user', 'assistant')),
  content         text,
  created_at      timestamptz default now()
);

create index idx_mentor_messages_conversation_id on mentor_messages(conversation_id);

-- ============================================================================
-- 23. APPLICATIONS
-- ============================================================================
create table applications (
  id                   uuid primary key default gen_random_uuid(),
  user_id              uuid not null references profiles(user_id) on delete cascade,
  company              text,
  job_role             text,
  job_description      text,
  application_date     date,
  application_deadline date,
  stage                text default 'interested' check (stage in (
                         'interested', 'applied', 'online_assessment',
                         'technical_interview', 'hr_interview',
                         'selected', 'rejected', 'withdrawn'
                       )),
  interview_date       date,
  notes                text,
  result               text,
  created_at           timestamptz default now(),
  updated_at           timestamptz default now()
);

create index idx_applications_user_id on applications(user_id);
create index idx_applications_stage on applications(stage);
create index idx_applications_created_at on applications(created_at);

create trigger trg_applications_updated_at
  before update on applications
  for each row execute function update_updated_at();

-- ============================================================================
-- 24. SUBSCRIPTION PLANS
-- ============================================================================
create table subscription_plans (
  id              uuid primary key default gen_random_uuid(),
  name            text,
  display_name    text,
  price           numeric(10,2),
  duration_months int,
  features        jsonb,
  limits          jsonb,
  is_active       boolean default true,
  created_at      timestamptz default now()
);

-- ============================================================================
-- 25. SUBSCRIPTIONS
-- ============================================================================
create table subscriptions (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references profiles(user_id) on delete cascade,
  plan_id    uuid not null references subscription_plans(id) on delete restrict,
  status     text default 'active' check (status in ('active', 'cancelled', 'expired', 'pending')),
  starts_at  timestamptz,
  expires_at timestamptz,
  payment_id text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_subscriptions_user_id on subscriptions(user_id);
create index idx_subscriptions_plan_id on subscriptions(plan_id);
create index idx_subscriptions_status on subscriptions(status);

create trigger trg_subscriptions_updated_at
  before update on subscriptions
  for each row execute function update_updated_at();

-- ============================================================================
-- 26. AI USAGE
-- ============================================================================
create table ai_usage (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references profiles(user_id) on delete cascade,
  feature       text,
  tokens_used   int default 0,
  request_count int default 1,
  date          date default current_date,
  created_at    timestamptz default now(),
  constraint uq_ai_usage_per_day unique (user_id, feature, date)
);

create index idx_ai_usage_user_id on ai_usage(user_id);
create index idx_ai_usage_date on ai_usage(date);
create index idx_ai_usage_feature on ai_usage(feature);

-- ============================================================================
-- 27. USER ACTIVITY
-- ============================================================================
create table user_activity (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references profiles(user_id) on delete cascade,
  activity_type text,
  activity_data jsonb,
  xp_earned     int default 0,
  created_at    timestamptz default now()
);

create index idx_user_activity_user_id on user_activity(user_id);
create index idx_user_activity_type on user_activity(activity_type);
create index idx_user_activity_created_at on user_activity(created_at);
