-- ============================================================================
-- ELEVATE FOR HUMANITY - LMS MIGRATION PART 3 OF 3
-- GAMIFICATION + CAREER SERVICES + PERSONALIZATION
-- Copy and paste this into Supabase SQL Editor, then run
-- ============================================================================

-- ============================================================================
-- GAMIFICATION: POINTS SYSTEM
-- ============================================================================

CREATE TABLE IF NOT EXISTS user_points (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  total_points INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  level_name TEXT DEFAULT 'Beginner',
  points_to_next_level INTEGER DEFAULT 100,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

CREATE TABLE IF NOT EXISTS point_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  points INTEGER NOT NULL,
  action_type TEXT NOT NULL,
  description TEXT,
  reference_id UUID,
  reference_type TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_user_points_user ON user_points(user_id);
CREATE INDEX idx_point_transactions_user ON point_transactions(user_id);

-- ============================================================================
-- GAMIFICATION: BADGES & ACHIEVEMENTS
-- ============================================================================

CREATE TABLE IF NOT EXISTS badge_definitions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_url TEXT,
  badge_type TEXT CHECK (badge_type IN ('completion', 'streak', 'mastery', 'social', 'special')),
  criteria JSONB NOT NULL,
  points_reward INTEGER DEFAULT 0,
  rarity TEXT CHECK (rarity IN ('common', 'rare', 'epic', 'legendary')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  badge_id UUID NOT NULL REFERENCES badge_definitions(id) ON DELETE CASCADE,
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  progress_data JSONB DEFAULT '{}'::jsonb,
  UNIQUE(user_id, badge_id)
);

CREATE INDEX idx_user_badges_user ON user_badges(user_id);
CREATE INDEX idx_user_badges_badge ON user_badges(badge_id);

-- ============================================================================
-- GAMIFICATION: LEADERBOARDS
-- ============================================================================

CREATE TABLE IF NOT EXISTS leaderboard_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  leaderboard_type TEXT NOT NULL CHECK (leaderboard_type IN ('global', 'program', 'weekly', 'monthly')),
  program_id UUID REFERENCES programs(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  rank INTEGER,
  period_start DATE,
  period_end DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_leaderboard_type ON leaderboard_entries(leaderboard_type);
CREATE INDEX idx_leaderboard_program ON leaderboard_entries(program_id);
CREATE INDEX idx_leaderboard_score ON leaderboard_entries(score DESC);

-- ============================================================================
-- GAMIFICATION: LEARNING STREAKS
-- ============================================================================

CREATE TABLE IF NOT EXISTS learning_streaks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_activity_date DATE,
  streak_start_date DATE,
  total_active_days INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

CREATE TABLE IF NOT EXISTS daily_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  activity_date DATE NOT NULL,
  lessons_completed INTEGER DEFAULT 0,
  quizzes_completed INTEGER DEFAULT 0,
  time_spent_minutes INTEGER DEFAULT 0,
  points_earned INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, activity_date)
);

CREATE INDEX idx_learning_streaks_user ON learning_streaks(user_id);
CREATE INDEX idx_daily_activities_user ON daily_activities(user_id);
CREATE INDEX idx_daily_activities_date ON daily_activities(activity_date);

-- ============================================================================
-- PEER REVIEWS
-- ============================================================================

CREATE TABLE IF NOT EXISTS peer_review_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id UUID NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  instructions TEXT NOT NULL,
  rubric JSONB NOT NULL,
  min_reviews_required INTEGER DEFAULT 2,
  due_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS peer_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id UUID NOT NULL REFERENCES peer_review_assignments(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  enrollment_id UUID NOT NULL REFERENCES enrollments(id) ON DELETE CASCADE,
  submission_text TEXT,
  files JSONB DEFAULT '[]'::jsonb,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  reviews_received INTEGER DEFAULT 0,
  average_score DECIMAL(5,2)
);

CREATE TABLE IF NOT EXISTS peer_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id UUID NOT NULL REFERENCES peer_submissions(id) ON DELETE CASCADE,
  reviewer_id UUID NOT NULL,
  scores JSONB NOT NULL,
  total_score DECIMAL(5,2) NOT NULL,
  feedback TEXT,
  is_helpful BOOLEAN,
  reviewed_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_peer_submissions_assignment ON peer_submissions(assignment_id);
CREATE INDEX idx_peer_reviews_submission ON peer_reviews(submission_id);

-- ============================================================================
-- STUDY GROUPS
-- ============================================================================

CREATE TABLE IF NOT EXISTS study_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  program_id UUID REFERENCES programs(id) ON DELETE SET NULL,
  created_by UUID NOT NULL,
  max_members INTEGER DEFAULT 10,
  is_public BOOLEAN DEFAULT true,
  meeting_schedule TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS study_group_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID NOT NULL REFERENCES study_groups(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  role TEXT DEFAULT 'member' CHECK (role IN ('admin', 'moderator', 'member')),
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(group_id, user_id)
);

CREATE TABLE IF NOT EXISTS study_group_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID NOT NULL REFERENCES study_groups(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_study_groups_program ON study_groups(program_id);
CREATE INDEX idx_study_group_members_group ON study_group_members(group_id);
CREATE INDEX idx_study_group_messages_group ON study_group_messages(group_id);

-- ============================================================================
-- INSTRUCTOR Q&A
-- ============================================================================

CREATE TABLE IF NOT EXISTS instructor_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  program_id UUID NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES lessons(id) ON DELETE SET NULL,
  question TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'answered', 'closed')),
  is_public BOOLEAN DEFAULT true,
  upvotes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS instructor_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID NOT NULL REFERENCES instructor_questions(id) ON DELETE CASCADE,
  instructor_id UUID NOT NULL,
  answer TEXT NOT NULL,
  is_official BOOLEAN DEFAULT true,
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_instructor_questions_program ON instructor_questions(program_id);
CREATE INDEX idx_instructor_questions_status ON instructor_questions(status);
CREATE INDEX idx_instructor_answers_question ON instructor_answers(question_id);

-- ============================================================================
-- LEARNING PATHS & RECOMMENDATIONS
-- ============================================================================

CREATE TABLE IF NOT EXISTS learning_paths (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  path_type TEXT CHECK (path_type IN ('beginner', 'career_track', 'skill_based', 'custom')),
  programs JSONB NOT NULL,
  estimated_weeks INTEGER,
  difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_learning_paths (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  path_id UUID NOT NULL REFERENCES learning_paths(id) ON DELETE CASCADE,
  current_step INTEGER DEFAULT 1,
  progress_percentage DECIMAL(5,2) DEFAULT 0,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  UNIQUE(user_id, path_id)
);

CREATE TABLE IF NOT EXISTS course_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  program_id UUID NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
  recommendation_type TEXT CHECK (recommendation_type IN ('based_on_progress', 'similar_students', 'trending', 'personalized')),
  score DECIMAL(5,2),
  reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_learning_paths_type ON learning_paths(path_type);
CREATE INDEX idx_user_learning_paths_user ON user_learning_paths(user_id);
CREATE INDEX idx_course_recommendations_user ON course_recommendations(user_id);

-- ============================================================================
-- SKILL ASSESSMENTS
-- ============================================================================

CREATE TABLE IF NOT EXISTS skill_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id UUID NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  assessment_type TEXT CHECK (assessment_type IN ('pre_test', 'placement', 'skill_check', 'final')),
  questions JSONB NOT NULL,
  passing_score INTEGER DEFAULT 70,
  time_limit_minutes INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS skill_assessment_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  assessment_id UUID NOT NULL REFERENCES skill_assessments(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  percentage DECIMAL(5,2) NOT NULL,
  skill_levels JSONB,
  recommendations JSONB,
  completed_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_skill_assessments_program ON skill_assessments(program_id);
CREATE INDEX idx_skill_assessment_results_user ON skill_assessment_results(user_id);

-- ============================================================================
-- RESUME BUILDER
-- ============================================================================

CREATE TABLE IF NOT EXISTS user_resumes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  title TEXT DEFAULT 'My Resume',
  personal_info JSONB NOT NULL,
  summary TEXT,
  work_experience JSONB DEFAULT '[]'::jsonb,
  education JSONB DEFAULT '[]'::jsonb,
  skills JSONB DEFAULT '[]'::jsonb,
  certifications JSONB DEFAULT '[]'::jsonb,
  template_name TEXT DEFAULT 'professional',
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS resume_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  preview_url TEXT,
  template_data JSONB NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_user_resumes_user ON user_resumes(user_id);

-- ============================================================================
-- PORTFOLIO BUILDER
-- ============================================================================

CREATE TABLE IF NOT EXISTS user_portfolios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  bio TEXT,
  profile_image_url TEXT,
  theme TEXT DEFAULT 'modern',
  is_public BOOLEAN DEFAULT true,
  custom_domain TEXT,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

CREATE TABLE IF NOT EXISTS portfolio_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id UUID NOT NULL REFERENCES user_portfolios(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  project_type TEXT,
  images JSONB DEFAULT '[]'::jsonb,
  links JSONB DEFAULT '[]'::jsonb,
  skills_used JSONB DEFAULT '[]'::jsonb,
  completion_date DATE,
  order_index INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_user_portfolios_user ON user_portfolios(user_id);
CREATE INDEX idx_portfolio_projects_portfolio ON portfolio_projects(portfolio_id);

-- ============================================================================
-- LEARNING GOALS & REMINDERS
-- ============================================================================

CREATE TABLE IF NOT EXISTS learning_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  goal_type TEXT CHECK (goal_type IN ('daily', 'weekly', 'monthly', 'custom')),
  target_minutes INTEGER,
  target_lessons INTEGER,
  target_quizzes INTEGER,
  start_date DATE NOT NULL,
  end_date DATE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS goal_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  goal_id UUID NOT NULL REFERENCES learning_goals(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  minutes_completed INTEGER DEFAULT 0,
  lessons_completed INTEGER DEFAULT 0,
  quizzes_completed INTEGER DEFAULT 0,
  goal_met BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(goal_id, date)
);

CREATE TABLE IF NOT EXISTS learning_reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  reminder_type TEXT CHECK (reminder_type IN ('email', 'sms', 'push')),
  frequency TEXT CHECK (frequency IN ('daily', 'weekly', 'custom')),
  time_of_day TIME,
  days_of_week INTEGER[],
  message_template TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_learning_goals_user ON learning_goals(user_id);
CREATE INDEX idx_goal_progress_goal ON goal_progress(goal_id);
CREATE INDEX idx_learning_reminders_user ON learning_reminders(user_id);

-- ============================================================================
-- MILESTONE CELEBRATIONS
-- ============================================================================

CREATE TABLE IF NOT EXISTS milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  milestone_type TEXT CHECK (milestone_type IN ('first_lesson', 'first_quiz', 'streak', 'completion', 'mastery')),
  criteria JSONB NOT NULL,
  celebration_message TEXT,
  animation_type TEXT,
  reward_points INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  milestone_id UUID NOT NULL REFERENCES milestones(id) ON DELETE CASCADE,
  achieved_at TIMESTAMPTZ DEFAULT NOW(),
  was_celebrated BOOLEAN DEFAULT false,
  UNIQUE(user_id, milestone_id)
);

CREATE INDEX idx_user_milestones_user ON user_milestones(user_id);

-- ============================================================================
-- COMPLETION ESTIMATES
-- ============================================================================

CREATE TABLE IF NOT EXISTS completion_estimates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  enrollment_id UUID NOT NULL REFERENCES enrollments(id) ON DELETE CASCADE,
  estimated_completion_date DATE,
  estimated_hours_remaining DECIMAL(5,2),
  average_weekly_hours DECIMAL(5,2),
  confidence_score DECIMAL(3,2),
  last_calculated_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(enrollment_id)
);

CREATE INDEX idx_completion_estimates_user ON completion_estimates(user_id);
CREATE INDEX idx_completion_estimates_enrollment ON completion_estimates(enrollment_id);

-- ============================================================================
-- SUCCESS MESSAGE
-- ============================================================================

DO $$
BEGIN
  RAISE NOTICE '✅ PART 3 OF 3 COMPLETE - All LMS tables created successfully!';
  RAISE NOTICE '';
  RAISE NOTICE '🎉 DATABASE SETUP COMPLETE!';
  RAISE NOTICE '';
  RAISE NOTICE '📊 Next Steps:';
  RAISE NOTICE '1. Set environment variables:';
  RAISE NOTICE '   export NEXT_PUBLIC_SUPABASE_URL="your-url"';
  RAISE NOTICE '   export SUPABASE_SERVICE_ROLE_KEY="your-service-key"';
  RAISE NOTICE '';
  RAISE NOTICE '2. Run the seeding script:';
  RAISE NOTICE '   npx ts-node scripts/seed-courses.ts';
  RAISE NOTICE '';
  RAISE NOTICE '🚀 This will populate 100+ modules and 250+ lessons across all programs!';
END $$;
