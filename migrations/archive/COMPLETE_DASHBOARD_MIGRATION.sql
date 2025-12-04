-- ============================================
-- COMPLETE DASHBOARD MIGRATION
-- Run this in Supabase SQL Editor to create all missing tables
-- for the 6 enterprise dashboards
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- CORE LMS TABLES (if missing)
-- ============================================

-- Lesson Progress (for Student Dashboard)
CREATE TABLE IF NOT EXISTS lesson_progress (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  enrollment_id UUID REFERENCES enrollments(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT false,
  progress_percentage INTEGER DEFAULT 0,
  time_spent_minutes INTEGER DEFAULT 0,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

CREATE INDEX IF NOT EXISTS idx_lesson_progress_user_id ON lesson_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_lesson_id ON lesson_progress(lesson_id);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_enrollment_id ON lesson_progress(enrollment_id);

-- ============================================
-- WORKFORCE TABLES (for Delegate Dashboard)
-- ============================================

-- Delegates / Case Managers
CREATE TABLE IF NOT EXISTS delegates (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  organization TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

CREATE INDEX IF NOT EXISTS idx_delegates_user_id ON delegates(user_id);
CREATE INDEX IF NOT EXISTS idx_delegates_is_active ON delegates(is_active);

-- Delegate Assignments (Caseload)
CREATE TABLE IF NOT EXISTS delegate_assignments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  delegate_id UUID NOT NULL REFERENCES delegates(id) ON DELETE CASCADE,
  learner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  assigned_at TIMESTAMPTZ DEFAULT NOW(),
  assigned_by UUID REFERENCES profiles(id),
  notes TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(delegate_id, learner_id)
);

CREATE INDEX IF NOT EXISTS idx_delegate_assignments_delegate_id ON delegate_assignments(delegate_id);
CREATE INDEX IF NOT EXISTS idx_delegate_assignments_learner_id ON delegate_assignments(learner_id);
CREATE INDEX IF NOT EXISTS idx_delegate_assignments_is_active ON delegate_assignments(is_active);

-- ============================================
-- WIOA COMPLIANCE TABLES (for Compliance Dashboard)
-- ============================================

-- Participant Eligibility
CREATE TABLE IF NOT EXISTS participant_eligibility (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  date_of_birth DATE,
  gender TEXT,
  ethnicity TEXT,
  race JSONB DEFAULT '[]',
  is_veteran BOOLEAN DEFAULT false,
  veteran_verified_at TIMESTAMPTZ,
  is_dislocated_worker BOOLEAN DEFAULT false,
  dislocated_worker_verified_at TIMESTAMPTZ,
  is_low_income BOOLEAN DEFAULT false,
  low_income_verified_at TIMESTAMPTZ,
  is_youth BOOLEAN DEFAULT false,
  youth_verified_at TIMESTAMPTZ,
  has_disability BOOLEAN DEFAULT false,
  disability_verified_at TIMESTAMPTZ,
  eligibility_status TEXT DEFAULT 'pending',
  approved_by UUID REFERENCES profiles(id),
  approved_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

CREATE INDEX IF NOT EXISTS idx_participant_eligibility_user_id ON participant_eligibility(user_id);
CREATE INDEX IF NOT EXISTS idx_participant_eligibility_status ON participant_eligibility(eligibility_status);

-- Attendance Records
CREATE TABLE IF NOT EXISTS attendance_records (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  program_id UUID REFERENCES programs(id) ON DELETE CASCADE,
  attendance_date DATE NOT NULL,
  clock_in TIMESTAMPTZ NOT NULL,
  clock_out TIMESTAMPTZ,
  total_minutes INTEGER DEFAULT 0,
  status TEXT DEFAULT 'present',
  excuse_reason TEXT,
  verified_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_attendance_user_id ON attendance_records(user_id);
CREATE INDEX IF NOT EXISTS idx_attendance_course_id ON attendance_records(course_id);
CREATE INDEX IF NOT EXISTS idx_attendance_date ON attendance_records(attendance_date);
CREATE INDEX IF NOT EXISTS idx_attendance_status ON attendance_records(status);

-- Employment Outcomes
CREATE TABLE IF NOT EXISTS employment_outcomes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  program_id UUID REFERENCES programs(id) ON DELETE CASCADE,
  employment_status TEXT,
  employer_name TEXT,
  job_title TEXT,
  start_date DATE,
  hourly_wage DECIMAL(10,2),
  hours_per_week INTEGER,
  is_full_time BOOLEAN DEFAULT false,
  industry TEXT,
  retention_30_days BOOLEAN,
  retention_90_days BOOLEAN,
  retention_180_days BOOLEAN,
  verified_at TIMESTAMPTZ,
  verified_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_employment_outcomes_user_id ON employment_outcomes(user_id);
CREATE INDEX IF NOT EXISTS idx_employment_outcomes_program_id ON employment_outcomes(program_id);
CREATE INDEX IF NOT EXISTS idx_employment_outcomes_status ON employment_outcomes(employment_status);

-- Learner Compliance (for Compliance Dashboard)
CREATE TABLE IF NOT EXISTS learner_compliance (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  program_id UUID NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'compliant' CHECK (status IN ('compliant', 'at_risk', 'non_compliant')),
  hours_completed INTEGER DEFAULT 0,
  hours_required INTEGER DEFAULT 0,
  certifications_completed INTEGER DEFAULT 0,
  certifications_required INTEGER DEFAULT 0,
  expiry_date DATE,
  last_checked_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, program_id)
);

CREATE INDEX IF NOT EXISTS idx_learner_compliance_user_id ON learner_compliance(user_id);
CREATE INDEX IF NOT EXISTS idx_learner_compliance_program_id ON learner_compliance(program_id);
CREATE INDEX IF NOT EXISTS idx_learner_compliance_status ON learner_compliance(status);

-- ============================================
-- GAMIFICATION TABLES (for Student Dashboard)
-- ============================================

-- Achievements
CREATE TABLE IF NOT EXISTS achievements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  category TEXT,
  points INTEGER DEFAULT 0,
  criteria JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_achievements_category ON achievements(category);
CREATE INDEX IF NOT EXISTS idx_achievements_is_active ON achievements(is_active);

-- User Achievements
CREATE TABLE IF NOT EXISTS user_achievements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  achievement_id UUID NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_achievement_id ON user_achievements(achievement_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_earned_at ON user_achievements(earned_at);

-- Learning Activity Streaks
CREATE TABLE IF NOT EXISTS learning_activity_streaks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  current_streak_days INTEGER DEFAULT 0,
  longest_streak_days INTEGER DEFAULT 0,
  last_activity_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

CREATE INDEX IF NOT EXISTS idx_learning_activity_streaks_user_id ON learning_activity_streaks(user_id);

-- ============================================
-- OPTIONAL TABLES (for Admin Dashboards)
-- ============================================

-- Program Revenue (for Program Holder Dashboard)
CREATE TABLE IF NOT EXISTS program_revenue (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  program_id UUID NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
  program_holder_id UUID REFERENCES program_holders(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  funding_source TEXT,
  payment_date DATE,
  paid_at TIMESTAMPTZ,
  fiscal_year INTEGER,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_program_revenue_program_id ON program_revenue(program_id);
CREATE INDEX IF NOT EXISTS idx_program_revenue_program_holder_id ON program_revenue(program_holder_id);
CREATE INDEX IF NOT EXISTS idx_program_revenue_paid_at ON program_revenue(paid_at);

-- Course Tasks (for Due Soon widget)
CREATE TABLE IF NOT EXISTS course_tasks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT DEFAULT 'assignment' CHECK (type IN ('assignment', 'quiz', 'lesson', 'project')),
  due_date TIMESTAMPTZ,
  points INTEGER DEFAULT 0,
  required BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_course_tasks_course_id ON course_tasks(course_id);
CREATE INDEX IF NOT EXISTS idx_course_tasks_due_date ON course_tasks(due_date);
CREATE INDEX IF NOT EXISTS idx_course_tasks_type ON course_tasks(type);

-- Announcements (for Admin Operations Dashboard)
CREATE TABLE IF NOT EXISTS announcements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  program_id UUID REFERENCES programs(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  posted_by UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  is_pinned BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_announcements_course_id ON announcements(course_id);
CREATE INDEX IF NOT EXISTS idx_announcements_program_id ON announcements(program_id);
CREATE INDEX IF NOT EXISTS idx_announcements_posted_by ON announcements(posted_by);
CREATE INDEX IF NOT EXISTS idx_announcements_published_at ON announcements(published_at);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE delegates ENABLE ROW LEVEL SECURITY;
ALTER TABLE delegate_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE participant_eligibility ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE employment_outcomes ENABLE ROW LEVEL SECURITY;
ALTER TABLE learner_compliance ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_activity_streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE program_revenue ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

-- Basic RLS Policies (users can view their own data)
CREATE POLICY "Users can view own lesson progress" ON lesson_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own achievements" ON user_achievements
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own streaks" ON learning_activity_streaks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view achievements" ON achievements
  FOR SELECT USING (is_active = true);

CREATE POLICY "Anyone can view published announcements" ON announcements
  FOR SELECT USING (is_published = true);

CREATE POLICY "Users can view course tasks" ON course_tasks
  FOR SELECT USING (true);

-- Delegate policies
CREATE POLICY "Delegates can view own profile" ON delegates
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Delegates can view their assignments" ON delegate_assignments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM delegates
      WHERE delegates.id = delegate_assignments.delegate_id
      AND delegates.user_id = auth.uid()
    )
  );

-- Admin policies (you'll need to adjust based on your role system)
-- These are placeholder policies - adjust based on your actual role column
CREATE POLICY "Admins can view all compliance" ON learner_compliance
  FOR SELECT USING (true); -- Adjust with proper role check

CREATE POLICY "Admins can view all attendance" ON attendance_records
  FOR SELECT USING (true); -- Adjust with proper role check

CREATE POLICY "Admins can view all outcomes" ON employment_outcomes
  FOR SELECT USING (true); -- Adjust with proper role check

-- ============================================
-- SEED DATA (Optional - Basic Achievements)
-- ============================================

INSERT INTO achievements (name, description, icon, category, points) VALUES
  ('First Login', 'Logged in for the first time', '🎉', 'onboarding', 10),
  ('Course Started', 'Started your first course', '📚', 'learning', 25),
  ('First Lesson Complete', 'Completed your first lesson', '✅', 'learning', 50),
  ('Week Warrior', '7-day learning streak', '🔥', 'streak', 100),
  ('Month Master', '30-day learning streak', '⭐', 'streak', 500),
  ('Course Complete', 'Completed your first course', '🎓', 'completion', 200),
  ('Certificate Earned', 'Earned your first certificate', '🏆', 'certification', 300)
ON CONFLICT DO NOTHING;

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Run these after migration to verify
-- SELECT COUNT(*) FROM lesson_progress;
-- SELECT COUNT(*) FROM delegates;
-- SELECT COUNT(*) FROM achievements;
-- SELECT COUNT(*) FROM learner_compliance;

-- ============================================
-- MIGRATION COMPLETE
-- ============================================

-- Now run: node check-database.mjs
-- All tables should show as EXISTS
