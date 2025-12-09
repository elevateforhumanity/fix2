-- ============================================================================
-- FINAL WORKING SQL - Adapts to existing tables
-- ============================================================================

-- GAMIFICATION: POINTS SYSTEM
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

-- BADGES & ACHIEVEMENTS
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

-- LEADERBOARDS
CREATE TABLE IF NOT EXISTS leaderboard_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  leaderboard_type TEXT NOT NULL CHECK (leaderboard_type IN ('global', 'program', 'weekly', 'monthly')),
  score INTEGER NOT NULL,
  rank INTEGER,
  period_start DATE,
  period_end DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leaderboard_type ON leaderboard_entries(leaderboard_type);
CREATE INDEX IF NOT EXISTS idx_leaderboard_score ON leaderboard_entries(score DESC);

-- LEARNING STREAKS
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

-- DISCUSSION FORUMS (only if doesn't exist)
CREATE TABLE IF NOT EXISTS forum_categories_new (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  order_index INTEGER DEFAULT 1,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS forum_threads_new (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES forum_categories_new(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  is_pinned BOOLEAN DEFAULT false,
  is_locked BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,
  reply_count INTEGER DEFAULT 0,
  last_reply_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS forum_replies_new (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id UUID NOT NULL REFERENCES forum_threads_new(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  content TEXT NOT NULL,
  is_solution BOOLEAN DEFAULT false,
  upvotes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS forum_votes_new (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  reply_id UUID NOT NULL REFERENCES forum_replies_new(id) ON DELETE CASCADE,
  vote_type TEXT CHECK (vote_type IN ('up', 'down')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, reply_id)
);

CREATE INDEX IF NOT EXISTS idx_forum_threads_new_category ON forum_threads_new(category_id);
CREATE INDEX IF NOT EXISTS idx_forum_replies_new_thread ON forum_replies_new(thread_id);
CREATE INDEX IF NOT EXISTS idx_forum_votes_new_reply ON forum_votes_new(reply_id);

-- STUDY GROUPS
CREATE TABLE IF NOT EXISTS study_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
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

CREATE INDEX IF NOT EXISTS idx_study_group_members_group ON study_group_members(group_id);
CREATE INDEX IF NOT EXISTS idx_study_group_messages_group ON study_group_messages(group_id);

-- LEARNING PATHS
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

CREATE INDEX IF NOT EXISTS idx_learning_paths_type ON learning_paths(path_type);
CREATE INDEX IF NOT EXISTS idx_user_learning_paths_user ON user_learning_paths(user_id);

-- MILESTONES
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

CREATE INDEX IF NOT EXISTS idx_user_milestones_user ON user_milestones(user_id);

-- RESUME BUILDER
CREATE TABLE IF NOT EXISTS resume_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  preview_url TEXT,
  template_data JSONB NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

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

-- PORTFOLIO BUILDER
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

CREATE INDEX IF NOT EXISTS idx_user_portfolios_user ON user_portfolios(user_id);
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_portfolio ON portfolio_projects(portfolio_id);

-- LEARNING GOALS
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

CREATE INDEX IF NOT EXISTS idx_learning_goals_user ON learning_goals(user_id);
CREATE INDEX IF NOT EXISTS idx_goal_progress_goal ON goal_progress(goal_id);
CREATE INDEX IF NOT EXISTS idx_learning_reminders_user ON learning_reminders(user_id);

-- MOBILE & NOTIFICATIONS
CREATE TABLE IF NOT EXISTS push_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  notification_type TEXT CHECK (notification_type IN ('reminder', 'achievement', 'message', 'announcement')),
  data JSONB DEFAULT '{}'::jsonb,
  sent BOOLEAN DEFAULT false,
  read BOOLEAN DEFAULT false,
  sent_at TIMESTAMPTZ,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_push_notifications_user ON push_notifications(user_id);

-- ACCESSIBILITY
CREATE TABLE IF NOT EXISTS accessibility_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  high_contrast BOOLEAN DEFAULT false,
  large_text BOOLEAN DEFAULT false,
  screen_reader_enabled BOOLEAN DEFAULT false,
  keyboard_navigation BOOLEAN DEFAULT false,
  dyslexia_font BOOLEAN DEFAULT false,
  reduced_motion BOOLEAN DEFAULT false,
  caption_preferences JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_accessibility_settings_user ON accessibility_settings(user_id);

-- SEED DATA (using new forum tables)
INSERT INTO forum_categories_new (name, description, icon, order_index, is_active) VALUES
  ('General Discussion', 'General topics and community chat', '💬', 1, true),
  ('Program Questions', 'Questions about training programs', '📚', 2, true),
  ('Technical Support', 'Get help with platform issues', '🔧', 3, true),
  ('Success Stories', 'Share your achievements', '🎉', 4, true),
  ('Career Advice', 'Job search and career guidance', '💼', 5, true),
  ('Study Groups', 'Find study partners', '👥', 6, true)
ON CONFLICT DO NOTHING;

INSERT INTO badge_definitions (name, description, icon_url, badge_type, criteria, points_reward, rarity, is_active) VALUES
  ('First Steps', 'Complete your first lesson', '/badges/first-steps.svg', 'completion', '{"lessons_completed": 1}', 10, 'common', true),
  ('Quick Learner', 'Complete 10 lessons', '/badges/quick-learner.svg', 'completion', '{"lessons_completed": 10}', 50, 'common', true),
  ('Week Warrior', 'Maintain a 7-day streak', '/badges/week-warrior.svg', 'streak', '{"streak_days": 7}', 50, 'rare', true),
  ('Quiz Ace', 'Score 100% on first quiz', '/badges/quiz-ace.svg', 'mastery', '{"perfect_quizzes": 1}', 25, 'common', true),
  ('Community Helper', 'Get 10 upvotes', '/badges/helper.svg', 'social', '{"upvotes": 10}', 50, 'rare', true),
  ('Course Completer', 'Complete first program', '/badges/completer.svg', 'completion', '{"programs_completed": 1}', 500, 'epic', true)
ON CONFLICT DO NOTHING;

INSERT INTO learning_paths (name, description, path_type, programs, estimated_weeks, difficulty, is_featured) VALUES
  ('Healthcare Career Track', 'CNA to advanced healthcare roles', 'career_track', '["prog-cna"]'::jsonb, 16, 'beginner', true),
  ('Skilled Trades Mastery', 'Multiple skilled trades pathway', 'career_track', '["prog-hvac"]'::jsonb, 32, 'intermediate', true),
  ('Beauty Professional Path', 'Barber to beauty educator', 'career_track', '["prog-barber"]'::jsonb, 24, 'beginner', true)
ON CONFLICT DO NOTHING;

INSERT INTO milestones (name, description, milestone_type, criteria, celebration_message, animation_type, reward_points) VALUES
  ('Welcome Aboard', 'Complete your profile', 'first_lesson', '{"profile_completed": true}', '🎉 Welcome to Elevate!', 'confetti', 10),
  ('First Lesson Complete', 'Finish first lesson', 'first_lesson', '{"lessons_completed": 1}', '🎓 Great job!', 'celebration', 25),
  ('Week One Complete', '7 consecutive days', 'streak', '{"streak_days": 7}', '🔥 Amazing streak!', 'fire', 50)
ON CONFLICT DO NOTHING;

INSERT INTO resume_templates (name, description, preview_url, template_data, is_active) VALUES
  ('Professional', 'Clean professional template', '/templates/professional.jpg', '{"layout": "single-column"}'::jsonb, true),
  ('Modern', 'Contemporary design', '/templates/modern.jpg', '{"layout": "two-column"}'::jsonb, true)
ON CONFLICT DO NOTHING;

-- SUCCESS MESSAGE
DO $$
BEGIN
  RAISE NOTICE '✅ SUCCESS! All tables created!';
  RAISE NOTICE '📊 Created 20+ tables for gamification, forums, learning paths, career tools';
  RAISE NOTICE '🎉 Loaded seed data: 6 badges, 3 paths, 3 milestones, 2 templates';
  RAISE NOTICE '';
  RAISE NOTICE '📍 Your features are now LIVE!';
  RAISE NOTICE '   Note: Forums use new tables (forum_categories_new, forum_threads_new, etc.)';
  RAISE NOTICE '   Update your code to use these new table names';
END $$;
