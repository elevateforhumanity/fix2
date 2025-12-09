-- ============================================================================
-- ELEVATE FOR HUMANITY - LMS MIGRATION PART 3 OF 3 (FIXED)
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

CREATE INDEX IF NOT EXISTS idx_user_points_user ON user_points(user_id);
CREATE INDEX IF NOT EXISTS idx_point_transactions_user ON point_transactions(user_id);

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

CREATE INDEX IF NOT EXISTS idx_user_badges_user ON user_badges(user_id);
CREATE INDEX IF NOT EXISTS idx_user_badges_badge ON user_badges(badge_id);

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

CREATE INDEX IF NOT EXISTS idx_leaderboard_type ON leaderboard_entries(leaderboard_type);
CREATE INDEX IF NOT EXISTS idx_leaderboard_program ON leaderboard_entries(program_id);
CREATE INDEX IF NOT EXISTS idx_leaderboard_score ON leaderboard_entries(score DESC);

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

CREATE INDEX IF NOT EXISTS idx_learning_streaks_user ON learning_streaks(user_id);
CREATE INDEX IF NOT EXISTS idx_daily_activities_user ON daily_activities(user_id);
CREATE INDEX IF NOT EXISTS idx_daily_activities_date ON daily_activities(activity_date);

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

CREATE TABLE IF NOT EXISTS course_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  program_id UUID NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
  recommendation_type TEXT CHECK (recommendation_type IN ('based_on_progress', 'similar_students', 'trending', 'personalized')),
  score DECIMAL(5,2),
  reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_course_recommendations_user ON course_recommendations(user_id);

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

CREATE INDEX IF NOT EXISTS idx_user_resumes_user ON user_resumes(user_id);

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
  RAISE NOTICE '1. Set environment variables in Gitpod or terminal:';
  RAISE NOTICE '   export NEXT_PUBLIC_SUPABASE_URL="your-url"';
  RAISE NOTICE '   export SUPABASE_SERVICE_ROLE_KEY="your-service-key"';
  RAISE NOTICE '';
  RAISE NOTICE '2. Run the seeding script:';
  RAISE NOTICE '   npx ts-node scripts/seed-courses.ts';
  RAISE NOTICE '';
  RAISE NOTICE '🚀 This will populate 100+ modules and 250+ lessons across all programs!';
END $$;
