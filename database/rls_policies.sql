-- ============================================================================
-- PlaceReady AI - Row Level Security Policies
-- Supabase RLS for all tables
-- ============================================================================

-- ============================================================================
-- ENABLE RLS ON ALL TABLES
-- ============================================================================
alter table profiles                enable row level security;
alter table hunter_stats            enable row level security;
alter table xp_transactions         enable row level security;
alter table achievements            enable row level security;
alter table user_achievements       enable row level security;
alter table quests                  enable row level security;
alter table user_quests             enable row level security;
alter table skill_tree_nodes        enable row level security;
alter table user_skill_tree_progress enable row level security;
alter table questions               enable row level security;
alter table user_question_attempts  enable row level security;
alter table aptitude_questions      enable row level security;
alter table quiz_attempts           enable row level security;
alter table learning_modules        enable row level security;
alter table roadmaps                enable row level security;
alter table roadmap_tasks           enable row level security;
alter table resumes                 enable row level security;
alter table resume_reviews          enable row level security;
alter table interview_sessions      enable row level security;
alter table interview_messages      enable row level security;
alter table mentor_conversations    enable row level security;
alter table mentor_messages         enable row level security;
alter table applications            enable row level security;
alter table subscription_plans      enable row level security;
alter table subscriptions           enable row level security;
alter table ai_usage                enable row level security;
alter table user_activity           enable row level security;

-- ============================================================================
-- 1. PROFILES - user owns their own row
-- ============================================================================
create policy "profiles_select_own"
  on profiles for select
  using (auth.uid() = user_id);

create policy "profiles_insert_own"
  on profiles for insert
  with check (auth.uid() = user_id);

create policy "profiles_update_own"
  on profiles for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ============================================================================
-- 2. HUNTER STATS
-- ============================================================================
create policy "hunter_stats_select_own"
  on hunter_stats for select
  using (auth.uid() = user_id);

create policy "hunter_stats_insert_own"
  on hunter_stats for insert
  with check (auth.uid() = user_id);

create policy "hunter_stats_update_own"
  on hunter_stats for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ============================================================================
-- 3. XP TRANSACTIONS
-- ============================================================================
create policy "xp_transactions_select_own"
  on xp_transactions for select
  using (auth.uid() = user_id);

create policy "xp_transactions_insert_own"
  on xp_transactions for insert
  with check (auth.uid() = user_id);

create policy "xp_transactions_update_own"
  on xp_transactions for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ============================================================================
-- 4. ACHIEVEMENTS - public read for authenticated users
-- ============================================================================
create policy "achievements_select_authenticated"
  on achievements for select
  using (auth.role() = 'authenticated');

-- INSERT/UPDATE/DELETE denied (service role only)

-- ============================================================================
-- 5. USER ACHIEVEMENTS
-- ============================================================================
create policy "user_achievements_select_own"
  on user_achievements for select
  using (auth.uid() = user_id);

create policy "user_achievements_insert_own"
  on user_achievements for insert
  with check (auth.uid() = user_id);

create policy "user_achievements_update_own"
  on user_achievements for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ============================================================================
-- 6. QUESTS - public read for authenticated users
-- ============================================================================
create policy "quests_select_authenticated"
  on quests for select
  using (auth.role() = 'authenticated');

-- INSERT/UPDATE/DELETE denied (service role only)

-- ============================================================================
-- 7. USER QUESTS
-- ============================================================================
create policy "user_quests_select_own"
  on user_quests for select
  using (auth.uid() = user_id);

create policy "user_quests_insert_own"
  on user_quests for insert
  with check (auth.uid() = user_id);

create policy "user_quests_update_own"
  on user_quests for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ============================================================================
-- 8. SKILL TREE NODES - public read for authenticated users
-- ============================================================================
create policy "skill_tree_nodes_select_authenticated"
  on skill_tree_nodes for select
  using (auth.role() = 'authenticated');

-- INSERT/UPDATE/DELETE denied (service role only)

-- ============================================================================
-- 9. USER SKILL TREE PROGRESS
-- ============================================================================
create policy "user_skill_tree_progress_select_own"
  on user_skill_tree_progress for select
  using (auth.uid() = user_id);

create policy "user_skill_tree_progress_insert_own"
  on user_skill_tree_progress for insert
  with check (auth.uid() = user_id);

create policy "user_skill_tree_progress_update_own"
  on user_skill_tree_progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ============================================================================
-- 10. QUESTIONS - public read for authenticated users
-- ============================================================================
create policy "questions_select_authenticated"
  on questions for select
  using (auth.role() = 'authenticated');

-- INSERT/UPDATE/DELETE denied (service role only)

-- ============================================================================
-- 11. USER QUESTION ATTEMPTS
-- ============================================================================
create policy "user_question_attempts_select_own"
  on user_question_attempts for select
  using (auth.uid() = user_id);

create policy "user_question_attempts_insert_own"
  on user_question_attempts for insert
  with check (auth.uid() = user_id);

create policy "user_question_attempts_update_own"
  on user_question_attempts for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ============================================================================
-- 12. APTITUDE QUESTIONS - public read for authenticated users
-- ============================================================================
create policy "aptitude_questions_select_authenticated"
  on aptitude_questions for select
  using (auth.role() = 'authenticated');

-- INSERT/UPDATE/DELETE denied (service role only)

-- ============================================================================
-- 13. QUIZ ATTEMPTS
-- ============================================================================
create policy "quiz_attempts_select_own"
  on quiz_attempts for select
  using (auth.uid() = user_id);

create policy "quiz_attempts_insert_own"
  on quiz_attempts for insert
  with check (auth.uid() = user_id);

create policy "quiz_attempts_update_own"
  on quiz_attempts for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ============================================================================
-- 14. LEARNING MODULES - public read for authenticated users
-- ============================================================================
create policy "learning_modules_select_authenticated"
  on learning_modules for select
  using (auth.role() = 'authenticated');

-- INSERT/UPDATE/DELETE denied (service role only)

-- ============================================================================
-- 15. ROADMAPS
-- ============================================================================
create policy "roadmaps_select_own"
  on roadmaps for select
  using (auth.uid() = user_id);

create policy "roadmaps_insert_own"
  on roadmaps for insert
  with check (auth.uid() = user_id);

create policy "roadmaps_update_own"
  on roadmaps for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ============================================================================
-- 16. ROADMAP TASKS - user can select/update through their roadmap
-- ============================================================================
create policy "roadmap_tasks_select_own"
  on roadmap_tasks for select
  using (
    exists (
      select 1 from roadmaps
      where roadmaps.id = roadmap_tasks.roadmap_id
        and roadmaps.user_id = auth.uid()
    )
  );

create policy "roadmap_tasks_update_own"
  on roadmap_tasks for update
  using (
    exists (
      select 1 from roadmaps
      where roadmaps.id = roadmap_tasks.roadmap_id
        and roadmaps.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from roadmaps
      where roadmaps.id = roadmap_tasks.roadmap_id
        and roadmaps.user_id = auth.uid()
    )
  );

-- INSERT/DELETE via service role only

-- ============================================================================
-- 17. RESUMES
-- ============================================================================
create policy "resumes_select_own"
  on resumes for select
  using (auth.uid() = user_id);

create policy "resumes_insert_own"
  on resumes for insert
  with check (auth.uid() = user_id);

create policy "resumes_update_own"
  on resumes for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "resumes_delete_own"
  on resumes for delete
  using (auth.uid() = user_id);

-- ============================================================================
-- 18. RESUME REVIEWS
-- ============================================================================
create policy "resume_reviews_select_own"
  on resume_reviews for select
  using (auth.uid() = user_id);

create policy "resume_reviews_insert_own"
  on resume_reviews for insert
  with check (auth.uid() = user_id);

create policy "resume_reviews_update_own"
  on resume_reviews for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ============================================================================
-- 19. INTERVIEW SESSIONS
-- ============================================================================
create policy "interview_sessions_select_own"
  on interview_sessions for select
  using (auth.uid() = user_id);

create policy "interview_sessions_insert_own"
  on interview_sessions for insert
  with check (auth.uid() = user_id);

create policy "interview_sessions_update_own"
  on interview_sessions for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ============================================================================
-- 20. INTERVIEW MESSAGES - user can select/insert through their session
-- ============================================================================
create policy "interview_messages_select_own"
  on interview_messages for select
  using (
    exists (
      select 1 from interview_sessions
      where interview_sessions.id = interview_messages.session_id
        and interview_sessions.user_id = auth.uid()
    )
  );

create policy "interview_messages_insert_own"
  on interview_messages for insert
  with check (
    exists (
      select 1 from interview_sessions
      where interview_sessions.id = interview_messages.session_id
        and interview_sessions.user_id = auth.uid()
    )
  );

-- ============================================================================
-- 21. MENTOR CONVERSATIONS
-- ============================================================================
create policy "mentor_conversations_select_own"
  on mentor_conversations for select
  using (auth.uid() = user_id);

create policy "mentor_conversations_insert_own"
  on mentor_conversations for insert
  with check (auth.uid() = user_id);

create policy "mentor_conversations_update_own"
  on mentor_conversations for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "mentor_conversations_delete_own"
  on mentor_conversations for delete
  using (auth.uid() = user_id);

-- ============================================================================
-- 22. MENTOR MESSAGES - user can select/insert through their conversation
-- ============================================================================
create policy "mentor_messages_select_own"
  on mentor_messages for select
  using (
    exists (
      select 1 from mentor_conversations
      where mentor_conversations.id = mentor_messages.conversation_id
        and mentor_conversations.user_id = auth.uid()
    )
  );

create policy "mentor_messages_insert_own"
  on mentor_messages for insert
  with check (
    exists (
      select 1 from mentor_conversations
      where mentor_conversations.id = mentor_messages.conversation_id
        and mentor_conversations.user_id = auth.uid()
    )
  );

-- ============================================================================
-- 23. APPLICATIONS
-- ============================================================================
create policy "applications_select_own"
  on applications for select
  using (auth.uid() = user_id);

create policy "applications_insert_own"
  on applications for insert
  with check (auth.uid() = user_id);

create policy "applications_update_own"
  on applications for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "applications_delete_own"
  on applications for delete
  using (auth.uid() = user_id);

-- ============================================================================
-- 24. SUBSCRIPTION PLANS - public read for authenticated users
-- ============================================================================
create policy "subscription_plans_select_authenticated"
  on subscription_plans for select
  using (auth.role() = 'authenticated');

-- INSERT/UPDATE/DELETE denied (service role only)

-- ============================================================================
-- 25. SUBSCRIPTIONS
-- ============================================================================
create policy "subscriptions_select_own"
  on subscriptions for select
  using (auth.uid() = user_id);

create policy "subscriptions_insert_own"
  on subscriptions for insert
  with check (auth.uid() = user_id);

create policy "subscriptions_update_own"
  on subscriptions for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ============================================================================
-- 26. AI USAGE
-- ============================================================================
create policy "ai_usage_select_own"
  on ai_usage for select
  using (auth.uid() = user_id);

create policy "ai_usage_insert_own"
  on ai_usage for insert
  with check (auth.uid() = user_id);

create policy "ai_usage_update_own"
  on ai_usage for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ============================================================================
-- 27. USER ACTIVITY
-- ============================================================================
create policy "user_activity_select_own"
  on user_activity for select
  using (auth.uid() = user_id);

create policy "user_activity_insert_own"
  on user_activity for insert
  with check (auth.uid() = user_id);

create policy "user_activity_update_own"
  on user_activity for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
