-- ============================================================================
-- ELEVATE FOR HUMANITY - LMS MIGRATION PART 1 OF 3
-- CORE SCHEMA + RLS POLICIES
-- Copy and paste this into Supabase SQL Editor, then run
-- ============================================================================

-- ============================================================================
-- CORE TABLES
-- ============================================================================

-- PROGRAMS
CREATE TABLE IF NOT EXISTS programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  outcomes TEXT,
  level TEXT,
  mode TEXT NOT NULL DEFAULT 'in-person',
  estimated_weeks INT,
  estimated_hours INT,
  funding_tags TEXT[] DEFAULT '{}',
  approvals JSONB DEFAULT '{}'::jsonb,
  show_on_marketing BOOLEAN DEFAULT true,
  show_in_catalog BOOLEAN DEFAULT true,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT timezone('utc', now()),
  updated_at TIMESTAMPTZ DEFAULT timezone('utc', now())
);

CREATE INDEX IF NOT EXISTS idx_programs_slug ON programs(slug);
CREATE INDEX IF NOT EXISTS idx_programs_category ON programs(category);
CREATE INDEX IF NOT EXISTS idx_programs_active ON programs(is_active);

-- MODULES
CREATE TABLE IF NOT EXISTS modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id UUID NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  summary TEXT,
  order_index INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT timezone('utc', now()),
  updated_at TIMESTAMPTZ DEFAULT timezone('utc', now())
);

CREATE INDEX IF NOT EXISTS idx_modules_program_id ON modules(program_id);
CREATE INDEX IF NOT EXISTS idx_modules_program_order ON modules(program_id, order_index);

-- LESSONS
CREATE TABLE IF NOT EXISTS lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id UUID NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
  module_id UUID NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  lesson_type TEXT NOT NULL DEFAULT 'video',
  video_url TEXT,
  content_url TEXT,
  quiz_id UUID,
  order_index INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT timezone('utc', now()),
  updated_at TIMESTAMPTZ DEFAULT timezone('utc', now())
);

CREATE INDEX IF NOT EXISTS idx_lessons_program_id ON lessons(program_id);
CREATE INDEX IF NOT EXISTS idx_lessons_module_id ON lessons(module_id);
CREATE INDEX IF NOT EXISTS idx_lessons_module_order ON lessons(module_id, order_index);

-- ENROLLMENTS
CREATE TABLE IF NOT EXISTS enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  program_id UUID NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'active',
  started_at TIMESTAMPTZ DEFAULT timezone('utc', now()),
  completed_at TIMESTAMPTZ,
  source TEXT,
  funding_type TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc', now())
);

CREATE INDEX IF NOT EXISTS idx_enrollments_user ON enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_program ON enrollments(program_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_status ON enrollments(status);

-- LESSON PROGRESS
CREATE TABLE IF NOT EXISTS lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id UUID NOT NULL REFERENCES enrollments(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'not_started',
  last_viewed_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT timezone('utc', now()),
  updated_at TIMESTAMPTZ DEFAULT timezone('utc', now())
);

-- Add status column if it doesn't exist (for existing tables)
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='lesson_progress' AND column_name='status') THEN
    ALTER TABLE lesson_progress ADD COLUMN status TEXT NOT NULL DEFAULT 'not_started';
  END IF;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS idx_progress_enrollment_lesson
  ON lesson_progress(enrollment_id, lesson_id);

CREATE INDEX IF NOT EXISTS idx_progress_status
  ON lesson_progress(status);

-- CERTIFICATES
CREATE TABLE IF NOT EXISTS certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id UUID NOT NULL REFERENCES enrollments(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  program_id UUID NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
  certificate_number TEXT UNIQUE,
  issued_at TIMESTAMPTZ DEFAULT timezone('utc', now()),
  pdf_url TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc', now())
);

CREATE INDEX IF NOT EXISTS idx_certificates_user ON certificates(user_id);
CREATE INDEX IF NOT EXISTS idx_certificates_program ON certificates(program_id);

-- ============================================================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================================================

ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read active programs" ON programs;
CREATE POLICY "Public read active programs" ON programs FOR SELECT USING (is_active = true);

ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read modules" ON modules;
CREATE POLICY "Public read modules" ON modules FOR SELECT USING (true);

ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Learners read lessons" ON lessons;
CREATE POLICY "Learners read lessons" ON lessons FOR SELECT USING (true);

ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Learners select own enrollments" ON enrollments;
CREATE POLICY "Learners select own enrollments" ON enrollments FOR SELECT USING (auth.uid() = user_id);

ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Learners select own progress" ON lesson_progress;
CREATE POLICY "Learners select own progress" ON lesson_progress FOR SELECT
  USING (EXISTS (SELECT 1 FROM enrollments e WHERE e.id = lesson_progress.enrollment_id AND e.user_id = auth.uid()));

DROP POLICY IF EXISTS "Learners update own progress" ON lesson_progress;
CREATE POLICY "Learners update own progress" ON lesson_progress FOR UPDATE
  USING (EXISTS (SELECT 1 FROM enrollments e WHERE e.id = lesson_progress.enrollment_id AND e.user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM enrollments e WHERE e.id = lesson_progress.enrollment_id AND e.user_id = auth.uid()));

ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Learners select own certificates" ON certificates;
CREATE POLICY "Learners select own certificates" ON certificates FOR SELECT USING (auth.uid() = user_id);

-- ============================================================================
-- SUCCESS MESSAGE
-- ============================================================================

DO $$
BEGIN
  RAISE NOTICE '✅ PART 1 OF 3 COMPLETE - Core tables and RLS policies created';
  RAISE NOTICE '📋 Next: Run MIGRATION_PART_2.sql';
END $$;
