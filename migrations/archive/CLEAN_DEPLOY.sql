-- ============================================================================
-- ELEVATE FOR HUMANITY - CLEAN DATABASE DEPLOYMENT
-- ============================================================================
-- This will DROP existing tables and recreate them fresh
-- WARNING: This will delete all existing data!
-- ============================================================================

-- Drop existing tables in reverse order (to handle foreign keys)
DROP TABLE IF EXISTS public.messages CASCADE;
DROP TABLE IF EXISTS public.assignment_submissions CASCADE;
DROP TABLE IF EXISTS public.assignments CASCADE;
DROP TABLE IF EXISTS public.applications CASCADE;
DROP TABLE IF EXISTS public.learning_activity CASCADE;
DROP TABLE IF EXISTS public.student_points CASCADE;
DROP TABLE IF EXISTS public.student_badges CASCADE;
DROP TABLE IF EXISTS public.badges CASCADE;
DROP TABLE IF EXISTS public.certificates CASCADE;
DROP TABLE IF EXISTS public.quiz_attempts CASCADE;
DROP TABLE IF EXISTS public.lesson_progress CASCADE;
DROP TABLE IF EXISTS public.enrollments CASCADE;
DROP TABLE IF EXISTS public.quizzes CASCADE;
DROP TABLE IF EXISTS public.lessons CASCADE;
DROP TABLE IF EXISTS public.courses CASCADE;
DROP TABLE IF EXISTS public.programs CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- USER PROFILES
-- ============================================================================

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  role TEXT DEFAULT 'student' CHECK (role IN ('student', 'instructor', 'admin', 'staff', 'case_manager', 'employer')),
  enrollment_status TEXT DEFAULT 'pending' CHECK (enrollment_status IN ('pending', 'active', 'enrolled', 'completed', 'withdrawn')),
  phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_profiles_role ON public.profiles(role);
CREATE INDEX idx_profiles_enrollment_status ON public.profiles(enrollment_status);

-- ============================================================================
-- PROGRAMS
-- ============================================================================

CREATE TABLE public.programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  outcomes TEXT,
  level TEXT,
  mode TEXT DEFAULT 'in-person',
  estimated_weeks INTEGER,
  estimated_hours INTEGER,
  funding_tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  show_on_marketing BOOLEAN DEFAULT true,
  show_in_catalog BOOLEAN DEFAULT true,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_programs_slug ON public.programs(slug);
CREATE INDEX idx_programs_category ON public.programs(category);

-- ============================================================================
-- COURSES
-- ============================================================================

CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id UUID REFERENCES public.programs(id) ON DELETE SET NULL,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('healthcare', 'trades', 'business', 'technology')),
  level TEXT NOT NULL CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  duration TEXT NOT NULL,
  thumbnail_url TEXT,
  video_intro_url TEXT,
  price DECIMAL(10,2) DEFAULT 0,
  funding_programs TEXT[] DEFAULT ARRAY['WIOA'],
  certified BOOLEAN DEFAULT false,
  trending BOOLEAN DEFAULT false,
  rating DECIMAL(3,2) DEFAULT 0,
  total_students INTEGER DEFAULT 0,
  total_lessons INTEGER DEFAULT 0,
  estimated_hours DECIMAL(5,2),
  prerequisites TEXT[],
  learning_objectives TEXT[],
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_courses_slug ON public.courses(slug);
CREATE INDEX idx_courses_program_id ON public.courses(program_id);
CREATE INDEX idx_courses_status ON public.courses(status);

-- ============================================================================
-- LESSONS
-- ============================================================================

CREATE TABLE public.lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  video_url TEXT,
  duration_minutes INTEGER,
  order_index INTEGER NOT NULL,
  is_preview BOOLEAN DEFAULT false,
  requires_previous BOOLEAN DEFAULT true,
  quiz_id UUID,
  resources JSONB DEFAULT '[]'::jsonb,
  learning_objectives TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_lessons_course_id ON public.lessons(course_id);
CREATE INDEX idx_lessons_order ON public.lessons(course_id, order_index);

-- ============================================================================
-- QUIZZES
-- ============================================================================

CREATE TABLE public.quizzes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  passing_score INTEGER DEFAULT 70,
  time_limit_minutes INTEGER,
  max_attempts INTEGER,
  questions JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_quizzes_lesson_id ON public.quizzes(lesson_id);
CREATE INDEX idx_quizzes_course_id ON public.quizzes(course_id);

-- ============================================================================
-- ENROLLMENTS
-- ============================================================================

CREATE TABLE public.enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'dropped', 'suspended')),
  progress_percentage INTEGER DEFAULT 0,
  funding_program TEXT,
  enrollment_date TIMESTAMPTZ DEFAULT NOW(),
  completion_date TIMESTAMPTZ,
  last_accessed_at TIMESTAMPTZ DEFAULT NOW(),
  started_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, course_id)
);

CREATE INDEX idx_enrollments_student ON public.enrollments(student_id);
CREATE INDEX idx_enrollments_course ON public.enrollments(course_id);
CREATE INDEX idx_enrollments_status ON public.enrollments(status);

-- ============================================================================
-- LESSON PROGRESS
-- ============================================================================

CREATE TABLE public.lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  enrollment_id UUID NOT NULL REFERENCES public.enrollments(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
  progress_percentage INTEGER DEFAULT 0,
  time_spent_minutes INTEGER DEFAULT 0,
  last_position_seconds INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, lesson_id)
);

CREATE INDEX idx_lesson_progress_student ON public.lesson_progress(student_id);
CREATE INDEX idx_lesson_progress_lesson ON public.lesson_progress(lesson_id);
CREATE INDEX idx_lesson_progress_enrollment ON public.lesson_progress(enrollment_id);

-- ============================================================================
-- QUIZ ATTEMPTS
-- ============================================================================

CREATE TABLE public.quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  quiz_id UUID NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
  enrollment_id UUID NOT NULL REFERENCES public.enrollments(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  passed BOOLEAN NOT NULL,
  answers JSONB NOT NULL,
  time_taken_minutes INTEGER,
  attempt_number INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_quiz_attempts_student ON public.quiz_attempts(student_id);
CREATE INDEX idx_quiz_attempts_quiz ON public.quiz_attempts(quiz_id);

-- ============================================================================
-- CERTIFICATES
-- ============================================================================

CREATE TABLE public.certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  enrollment_id UUID NOT NULL REFERENCES public.enrollments(id) ON DELETE CASCADE,
  certificate_number TEXT UNIQUE NOT NULL,
  credential_id TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  issuer TEXT DEFAULT 'Elevate For Humanity',
  issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
  expiry_date DATE,
  final_score INTEGER,
  certificate_url TEXT,
  verification_url TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_certificates_student ON public.certificates(student_id);
CREATE INDEX idx_certificates_course ON public.certificates(course_id);
CREATE INDEX idx_certificates_number ON public.certificates(certificate_number);

-- ============================================================================
-- BADGES
-- ============================================================================

CREATE TABLE public.badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  category TEXT NOT NULL,
  criteria JSONB NOT NULL,
  points INTEGER DEFAULT 0,
  rarity TEXT DEFAULT 'common' CHECK (rarity IN ('common', 'uncommon', 'rare', 'epic', 'legendary')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.student_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_id UUID NOT NULL REFERENCES public.badges(id) ON DELETE CASCADE,
  earned_date TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb,
  UNIQUE(student_id, badge_id)
);

CREATE INDEX idx_student_badges_student ON public.student_badges(student_id);

-- ============================================================================
-- STUDENT POINTS
-- ============================================================================

CREATE TABLE public.student_points (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  points INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  streak_days INTEGER DEFAULT 0,
  last_activity_date DATE DEFAULT CURRENT_DATE,
  total_study_minutes INTEGER DEFAULT 0,
  total_lessons_completed INTEGER DEFAULT 0,
  total_quizzes_passed INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id)
);

CREATE INDEX idx_student_points_student ON public.student_points(student_id);

-- ============================================================================
-- LEARNING ACTIVITY
-- ============================================================================

CREATE TABLE public.learning_activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL CHECK (activity_type IN ('lesson_started', 'lesson_completed', 'quiz_taken', 'badge_earned', 'certificate_earned', 'discussion_post', 'resource_downloaded')),
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
  points_earned INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_learning_activity_student ON public.learning_activity(student_id);
CREATE INDEX idx_learning_activity_type ON public.learning_activity(activity_type);
CREATE INDEX idx_learning_activity_date ON public.learning_activity(created_at);

-- ============================================================================
-- APPLICATIONS
-- ============================================================================

CREATE TABLE public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  phone TEXT,
  program TEXT,
  notes TEXT,
  source TEXT DEFAULT 'marketing_site',
  status TEXT DEFAULT 'submitted' CHECK (status IN ('submitted', 'in_review', 'approved', 'declined', 'converted')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_applications_status ON public.applications(status);
CREATE INDEX idx_applications_email ON public.applications(email);

-- ============================================================================
-- ASSIGNMENTS
-- ============================================================================

CREATE TABLE public.assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  instructions TEXT,
  max_points DECIMAL(10,2) DEFAULT 100,
  due_date TIMESTAMPTZ,
  allow_late_submission BOOLEAN DEFAULT true,
  late_penalty_percent DECIMAL(5,2) DEFAULT 0,
  submission_type TEXT CHECK (submission_type IN ('file', 'text', 'url', 'multiple')),
  max_file_size_mb INTEGER DEFAULT 10,
  allowed_file_types TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_assignments_course ON public.assignments(course_id);
CREATE INDEX idx_assignments_lesson ON public.assignments(lesson_id);

-- ============================================================================
-- ASSIGNMENT SUBMISSIONS
-- ============================================================================

CREATE TABLE public.assignment_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id UUID REFERENCES public.assignments(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  submission_text TEXT,
  submission_url TEXT,
  file_paths TEXT[],
  status TEXT CHECK (status IN ('draft', 'submitted', 'graded', 'returned')) DEFAULT 'draft',
  submitted_at TIMESTAMPTZ,
  graded_at TIMESTAMPTZ,
  grade DECIMAL(10,2),
  feedback TEXT,
  graded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(assignment_id, user_id)
);

CREATE INDEX idx_submissions_assignment ON public.assignment_submissions(assignment_id);
CREATE INDEX idx_submissions_user ON public.assignment_submissions(user_id);

-- ============================================================================
-- MESSAGES
-- ============================================================================

CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  recipient_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  subject TEXT,
  body TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_messages_sender ON public.messages(sender_id);
CREATE INDEX idx_messages_recipient ON public.messages(recipient_id);
CREATE INDEX idx_messages_read ON public.messages(read);

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignment_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "programs_public_read" ON public.programs FOR SELECT USING (true);
CREATE POLICY "courses_public_read" ON public.courses FOR SELECT USING (status = 'published');
CREATE POLICY "lessons_public_read" ON public.lessons FOR SELECT USING (true);
CREATE POLICY "badges_public_read" ON public.badges FOR SELECT USING (true);

-- User policies
CREATE POLICY "profiles_own_read" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_own_update" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Student policies
CREATE POLICY "enrollments_own_read" ON public.enrollments FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "lesson_progress_own_read" ON public.lesson_progress FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "lesson_progress_own_write" ON public.lesson_progress FOR INSERT WITH CHECK (auth.uid() = student_id);
CREATE POLICY "lesson_progress_own_update" ON public.lesson_progress FOR UPDATE USING (auth.uid() = student_id);
CREATE POLICY "certificates_own_read" ON public.certificates FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "student_badges_own_read" ON public.student_badges FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "student_points_own_read" ON public.student_points FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "submissions_own_read" ON public.assignment_submissions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "submissions_own_write" ON public.assignment_submissions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "submissions_own_update" ON public.assignment_submissions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "messages_own_read" ON public.messages FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = recipient_id);
CREATE POLICY "messages_own_write" ON public.messages FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- ============================================================================
-- TRIGGERS
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_programs_updated_at BEFORE UPDATE ON public.programs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON public.courses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_enrollments_updated_at BEFORE UPDATE ON public.enrollments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lesson_progress_updated_at BEFORE UPDATE ON public.lesson_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- SAMPLE DATA
-- ============================================================================

INSERT INTO public.programs (slug, title, category, description, estimated_weeks, estimated_hours, funding_tags)
VALUES (
  'medical-assistant',
  'Medical Assistant Training',
  'healthcare',
  'Comprehensive medical assistant training program',
  12,
  480,
  ARRAY['WIOA', 'WRG']
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.courses (slug, title, description, category, level, duration, status, funding_programs)
VALUES (
  'intro-to-medical-assisting',
  'Introduction to Medical Assisting',
  'Learn the fundamentals of medical assisting including clinical and administrative duties',
  'healthcare',
  'beginner',
  '12 weeks',
  'published',
  ARRAY['WIOA', 'WRG']
) ON CONFLICT (slug) DO NOTHING;

-- ============================================================================
-- SUCCESS MESSAGE
-- ============================================================================

DO $$
BEGIN
  RAISE NOTICE '✅ Database migration completed successfully!';
  RAISE NOTICE '📊 All tables created fresh';
  RAISE NOTICE '🔒 Row Level Security enabled';
  RAISE NOTICE '🎓 Sample data inserted';
  RAISE NOTICE '🚀 LMS is ready!';
END $$;
