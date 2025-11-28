-- ============================================================================
-- SIMPLE SQL PART 2 of 3: Career & Analytics Tables
-- Run this SECOND (after Part 1)
-- ============================================================================

-- ============================================================================
-- RESUME BUILDER
-- ============================================================================
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

CREATE INDEX IF NOT EXISTS idx_user_portfolios_user ON user_portfolios(user_id);
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_portfolio ON portfolio_projects(portfolio_id);

-- ============================================================================
-- LEARNING GOALS
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

CREATE INDEX IF NOT EXISTS idx_learning_goals_user ON learning_goals(user_id);
CREATE INDEX IF NOT EXISTS idx_goal_progress_goal ON goal_progress(goal_id);
CREATE INDEX IF NOT EXISTS idx_learning_reminders_user ON learning_reminders(user_id);

-- ============================================================================
-- MOBILE & OFFLINE
-- ============================================================================
CREATE TABLE IF NOT EXISTS offline_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  lesson_id UUID,
  content_type TEXT CHECK (content_type IN ('video', 'pdf', 'transcript', 'quiz')),
  file_url TEXT NOT NULL,
  file_size_kb INTEGER,
  downloaded_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  last_accessed_at TIMESTAMPTZ,
  UNIQUE(user_id, lesson_id, content_type)
);

CREATE TABLE IF NOT EXISTS mobile_sync_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  action_type TEXT NOT NULL,
  data JSONB NOT NULL,
  synced BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  synced_at TIMESTAMPTZ
);

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

CREATE INDEX IF NOT EXISTS idx_offline_content_user ON offline_content(user_id);
CREATE INDEX IF NOT EXISTS idx_mobile_sync_queue_user ON mobile_sync_queue(user_id);
CREATE INDEX IF NOT EXISTS idx_mobile_sync_queue_synced ON mobile_sync_queue(synced);
CREATE INDEX IF NOT EXISTS idx_push_notifications_user ON push_notifications(user_id);

-- ============================================================================
-- ANALYTICS
-- ============================================================================
CREATE TABLE IF NOT EXISTS engagement_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  enrollment_id UUID,
  date DATE NOT NULL,
  total_time_minutes INTEGER DEFAULT 0,
  lessons_viewed INTEGER DEFAULT 0,
  quizzes_attempted INTEGER DEFAULT 0,
  resources_downloaded INTEGER DEFAULT 0,
  forum_posts INTEGER DEFAULT 0,
  video_watch_time_minutes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, enrollment_id, date)
);

CREATE TABLE IF NOT EXISTS video_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  lesson_id UUID,
  watch_duration_seconds INTEGER NOT NULL,
  completion_percentage DECIMAL(5,2),
  playback_speed DECIMAL(3,2) DEFAULT 1.0,
  paused_at_seconds INTEGER[],
  rewatched_segments JSONB DEFAULT '[]'::jsonb,
  watched_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_engagement_metrics_user ON engagement_metrics(user_id);
CREATE INDEX IF NOT EXISTS idx_engagement_metrics_date ON engagement_metrics(date);
CREATE INDEX IF NOT EXISTS idx_video_analytics_lesson ON video_analytics(lesson_id);

-- ============================================================================
-- INSTRUCTOR TOOLS
-- ============================================================================
CREATE TABLE IF NOT EXISTS instructor_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  bio TEXT,
  profile_image_url TEXT,
  specializations TEXT[],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS instructor_announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  instructor_id UUID NOT NULL REFERENCES instructor_profiles(id) ON DELETE CASCADE,
  program_id UUID,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  is_urgent BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS bulk_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  instructor_id UUID NOT NULL REFERENCES instructor_profiles(id) ON DELETE CASCADE,
  program_id UUID,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  recipient_filter JSONB,
  total_recipients INTEGER,
  sent_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'sending', 'sent')),
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_instructor_announcements_program ON instructor_announcements(program_id);
CREATE INDEX IF NOT EXISTS idx_bulk_messages_instructor ON bulk_messages(instructor_id);

-- ============================================================================
-- ACCESSIBILITY
-- ============================================================================
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
