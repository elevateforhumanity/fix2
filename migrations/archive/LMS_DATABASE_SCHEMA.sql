-- ============================================================================
-- ELEVATE FOR HUMANITY - COMPLETE LMS DATABASE SCHEMA
-- ============================================================================
-- Run this in Supabase SQL Editor to set up all LMS tables
-- This schema supports all features from the new LMS pages

-- ============================================================================
-- COURSES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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

-- ============================================================================
-- LESSONS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.lessons (
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

-- ============================================================================
-- QUIZZES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.quizzes (
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

-- ============================================================================
-- ENROLLMENTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'dropped', 'suspended')),
  progress_percentage INTEGER DEFAULT 0,
  funding_program TEXT,
  enrollment_date TIMESTAMPTZ DEFAULT NOW(),
  completion_date TIMESTAMPTZ,
  last_accessed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, course_id)
);

-- ============================================================================
-- LESSON PROGRESS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  enrollment_id UUID NOT NULL REFERENCES public.enrollments(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
  progress_percentage INTEGER DEFAULT 0,
  time_spent_minutes INTEGER DEFAULT 0,
  last_position_seconds INTEGER DEFAULT 0,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, lesson_id)
);

-- ============================================================================
-- QUIZ ATTEMPTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.quiz_attempts (
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

-- ============================================================================
-- CERTIFICATES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.certificates (
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

-- ============================================================================
-- BADGES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.badges (
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

-- ============================================================================
-- STUDENT BADGES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.student_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_id UUID NOT NULL REFERENCES public.badges(id) ON DELETE CASCADE,
  earned_date TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb,
  UNIQUE(student_id, badge_id)
);

-- ============================================================================
-- STUDENT POINTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.student_points (
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

-- ============================================================================
-- LEARNING ACTIVITY TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.learning_activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL CHECK (activity_type IN ('lesson_started', 'lesson_completed', 'quiz_taken', 'badge_earned', 'certificate_earned', 'discussion_post', 'resource_downloaded')),
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
  points_earned INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- STUDENT PROFILES TABLE (Extended user info)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.student_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT DEFAULT 'IN',
  zip_code TEXT,
  employment_status TEXT,
  income_range TEXT,
  preferred_funding TEXT,
  avatar_url TEXT,
  bio TEXT,
  timezone TEXT DEFAULT 'America/Indiana/Indianapolis',
  notification_preferences JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_courses_category ON public.courses(category);
CREATE INDEX IF NOT EXISTS idx_courses_level ON public.courses(level);
CREATE INDEX IF NOT EXISTS idx_courses_status ON public.courses(status);
CREATE INDEX IF NOT EXISTS idx_courses_trending ON public.courses(trending) WHERE trending = true;

CREATE INDEX IF NOT EXISTS idx_lessons_course_id ON public.lessons(course_id);
CREATE INDEX IF NOT EXISTS idx_lessons_order ON public.lessons(course_id, order_index);

CREATE INDEX IF NOT EXISTS idx_enrollments_student ON public.enrollments(student_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course ON public.enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_status ON public.enrollments(status);

CREATE INDEX IF NOT EXISTS idx_lesson_progress_student ON public.lesson_progress(student_id);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_lesson ON public.lesson_progress(lesson_id);

CREATE INDEX IF NOT EXISTS idx_quiz_attempts_student ON public.quiz_attempts(student_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_quiz ON public.quiz_attempts(quiz_id);

CREATE INDEX IF NOT EXISTS idx_certificates_student ON public.certificates(student_id);
CREATE INDEX IF NOT EXISTS idx_certificates_course ON public.certificates(course_id);

CREATE INDEX IF NOT EXISTS idx_student_badges_student ON public.student_badges(student_id);
CREATE INDEX IF NOT EXISTS idx_student_badges_badge ON public.student_badges(badge_id);

CREATE INDEX IF NOT EXISTS idx_learning_activity_student ON public.learning_activity(student_id);
CREATE INDEX IF NOT EXISTS idx_learning_activity_date ON public.learning_activity(created_at);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
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
ALTER TABLE public.student_profiles ENABLE ROW LEVEL SECURITY;

-- Courses: Public read, admin write
CREATE POLICY "Anyone can view published courses" ON public.courses
  FOR SELECT USING (status = 'published');

-- Lessons: Public can view lessons of published courses
CREATE POLICY "Anyone can view lessons of published courses" ON public.lessons
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.courses 
      WHERE courses.id = lessons.course_id 
      AND courses.status = 'published'
    )
  );

-- Enrollments: Students can view their own enrollments
CREATE POLICY "Students can view own enrollments" ON public.enrollments
  FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Students can insert own enrollments" ON public.enrollments
  FOR INSERT WITH CHECK (auth.uid() = student_id);

-- Lesson Progress: Students can manage their own progress
CREATE POLICY "Students can view own progress" ON public.lesson_progress
  FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Students can update own progress" ON public.lesson_progress
  FOR ALL USING (auth.uid() = student_id);

-- Quiz Attempts: Students can view their own attempts
CREATE POLICY "Students can view own quiz attempts" ON public.quiz_attempts
  FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Students can insert own quiz attempts" ON public.quiz_attempts
  FOR INSERT WITH CHECK (auth.uid() = student_id);

-- Certificates: Students can view their own certificates
CREATE POLICY "Students can view own certificates" ON public.certificates
  FOR SELECT USING (auth.uid() = student_id);

-- Badges: Anyone can view badges
CREATE POLICY "Anyone can view badges" ON public.badges
  FOR SELECT USING (true);

-- Student Badges: Students can view their own badges
CREATE POLICY "Students can view own badges" ON public.student_badges
  FOR SELECT USING (auth.uid() = student_id);

-- Student Points: Students can view their own points
CREATE POLICY "Students can view own points" ON public.student_points
  FOR SELECT USING (auth.uid() = student_id);

-- Learning Activity: Students can view their own activity
CREATE POLICY "Students can view own activity" ON public.learning_activity
  FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Students can insert own activity" ON public.learning_activity
  FOR INSERT WITH CHECK (auth.uid() = student_id);

-- Student Profiles: Students can manage their own profile
CREATE POLICY "Students can view own profile" ON public.student_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Students can update own profile" ON public.student_profiles
  FOR ALL USING (auth.uid() = id);

-- ============================================================================
-- FUNCTIONS FOR AUTOMATION
-- ============================================================================

-- Function to update course progress when lesson is completed
CREATE OR REPLACE FUNCTION update_course_progress()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'completed' AND (OLD.status IS NULL OR OLD.status != 'completed') THEN
    UPDATE public.enrollments
    SET 
      progress_percentage = (
        SELECT ROUND((COUNT(*) FILTER (WHERE lp.status = 'completed')::DECIMAL / COUNT(*)::DECIMAL) * 100)
        FROM public.lesson_progress lp
        JOIN public.lessons l ON l.id = lp.lesson_id
        WHERE lp.enrollment_id = NEW.enrollment_id
      ),
      last_accessed_at = NOW(),
      updated_at = NOW()
    WHERE id = NEW.enrollment_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_course_progress
AFTER INSERT OR UPDATE ON public.lesson_progress
FOR EACH ROW
EXECUTE FUNCTION update_course_progress();

-- Function to update student streak
CREATE OR REPLACE FUNCTION update_student_streak()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.student_points (student_id, last_activity_date, streak_days)
  VALUES (NEW.student_id, CURRENT_DATE, 1)
  ON CONFLICT (student_id) DO UPDATE
  SET 
    last_activity_date = CURRENT_DATE,
    streak_days = CASE
      WHEN student_points.last_activity_date = CURRENT_DATE - INTERVAL '1 day' 
      THEN student_points.streak_days + 1
      WHEN student_points.last_activity_date = CURRENT_DATE 
      THEN student_points.streak_days
      ELSE 1
    END,
    updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_streak
AFTER INSERT ON public.learning_activity
FOR EACH ROW
EXECUTE FUNCTION update_student_streak();

-- ============================================================================
-- SEED DATA FOR TESTING
-- ============================================================================

-- Insert sample badges
INSERT INTO public.badges (name, description, icon, category, criteria, points, rarity) VALUES
('Quick Learner', 'Completed 5 lessons in one day', 'zap', 'learning', '{"lessons_per_day": 5}'::jsonb, 50, 'uncommon'),
('Week Warrior', 'Maintained a 7-day learning streak', 'flame', 'streak', '{"streak_days": 7}'::jsonb, 100, 'rare'),
('Quiz Master', 'Scored 100% on 5 quizzes', 'star', 'assessment', '{"perfect_quizzes": 5}'::jsonb, 150, 'rare'),
('Helpful Peer', 'Answered 10 discussion questions', 'shield', 'community', '{"discussion_answers": 10}'::jsonb, 75, 'uncommon'),
('Early Bird', 'Completed lessons before 8 AM', 'crown', 'habit', '{"early_completions": 5}'::jsonb, 50, 'uncommon'),
('Perfect Score', 'Achieved 100% on final exam', 'medal', 'achievement', '{"final_exam_score": 100}'::jsonb, 200, 'epic')
ON CONFLICT (name) DO NOTHING;

-- Insert sample courses
INSERT INTO public.courses (slug, title, description, category, level, duration, funding_programs, certified, trending, rating, total_students) VALUES
('vita-tax-prep', 'VITA Tax Preparation Certification', 'Become an IRS-certified tax preparer. Learn tax law, filing procedures, and client service.', 'business', 'beginner', '8 weeks', ARRAY['WIOA', 'WRG'], true, true, 4.8, 342),
('barber-fundamentals', 'Barber Fundamentals', 'Master cutting techniques, styling, and customer service. Prepare for state licensing.', 'trades', 'beginner', '12 weeks', ARRAY['WIOA', 'Apprenticeship'], true, false, 4.9, 289),
('medical-assistant', 'Certified Medical Assistant', 'Learn clinical procedures, patient care, and medical office administration.', 'healthcare', 'beginner', '10 weeks', ARRAY['WIOA', 'WRG'], true, true, 4.7, 456),
('hvac-basics', 'HVAC Technician Training', 'Install, maintain, and repair heating and cooling systems. EPA certification prep included.', 'trades', 'beginner', '12 weeks', ARRAY['WIOA', 'WRG'], true, false, 4.8, 378),
('cdl-training', 'Commercial Driver License (CDL)', 'Get your CDL Class A license. Learn safe driving, regulations, and vehicle inspection.', 'trades', 'beginner', '4 weeks', ARRAY['WIOA'], true, true, 4.9, 523),
('cna-training', 'Certified Nursing Assistant (CNA)', 'Provide basic patient care in hospitals and nursing homes. State certification included.', 'healthcare', 'beginner', '6 weeks', ARRAY['WIOA', 'WRG'], true, false, 4.8, 612),
('phlebotomy', 'Phlebotomy Technician', 'Learn blood collection techniques, lab procedures, and patient interaction.', 'healthcare', 'beginner', '8 weeks', ARRAY['WIOA', 'WRG'], true, false, 4.7, 234),
('digital-literacy', 'Digital Literacy Essentials', 'Master Microsoft Office, Google Workspace, email, and professional communication.', 'technology', 'beginner', '6 weeks', ARRAY['WIOA', 'WRG'], false, false, 4.6, 789),
('building-maintenance', 'Building Maintenance Technician', 'Learn electrical, plumbing, and HVAC basics for facility maintenance.', 'trades', 'intermediate', '10 weeks', ARRAY['WIOA', 'WRG'], true, false, 4.7, 198)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  level = EXCLUDED.level,
  duration = EXCLUDED.duration,
  funding_programs = EXCLUDED.funding_programs,
  certified = EXCLUDED.certified,
  trending = EXCLUDED.trending,
  rating = EXCLUDED.rating,
  total_students = EXCLUDED.total_students,
  updated_at = NOW();

-- ============================================================================
-- COMPLETION MESSAGE
-- ============================================================================
DO $$
BEGIN
  RAISE NOTICE '✅ LMS Database Schema Created Successfully!';
  RAISE NOTICE '📊 Tables: courses, lessons, quizzes, enrollments, lesson_progress, quiz_attempts, certificates, badges, student_badges, student_points, learning_activity, student_profiles';
  RAISE NOTICE '🔒 Row Level Security enabled on all tables';
  RAISE NOTICE '⚡ Triggers created for automatic progress tracking';
  RAISE NOTICE '🎯 Sample data inserted for testing';
  RAISE NOTICE '';
  RAISE NOTICE '🚀 Next Steps:';
  RAISE NOTICE '1. Verify tables in Supabase Table Editor';
  RAISE NOTICE '2. Add lessons for each course';
  RAISE NOTICE '3. Test enrollment flow';
  RAISE NOTICE '4. Configure authentication';
END $$;
