-- FIX COURSE COMPLETION SYSTEM
-- Allow students to track progress and complete courses

-- ============================================
-- FIX 1: Enrollments RLS - Allow Updates
-- ============================================

-- Drop restrictive update policy
DROP POLICY IF EXISTS "enrollments_update_own" ON enrollments;

-- Allow students to update their own enrollments
CREATE POLICY "enrollments_update_own" ON enrollments
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- ============================================
-- FIX 2: Create Course Modules Table
-- ============================================

CREATE TABLE IF NOT EXISTS course_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  order_index INTEGER NOT NULL,
  duration_minutes INTEGER,
  content TEXT,
  video_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_course_modules_course_id ON course_modules(course_id);
CREATE INDEX IF NOT EXISTS idx_course_modules_order ON course_modules(course_id, order_index);

-- Enable RLS
ALTER TABLE course_modules ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to view modules
CREATE POLICY "course_modules_select" ON course_modules
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM courses
      WHERE courses.id = course_modules.course_id
      AND courses.published = true
    )
  );

-- ============================================
-- FIX 3: Create Lesson Completions Table
-- ============================================

CREATE TABLE IF NOT EXISTS lesson_completions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  module_id UUID REFERENCES course_modules(id) ON DELETE CASCADE,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  time_spent_minutes INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, module_id)
);

CREATE INDEX IF NOT EXISTS idx_lesson_completions_user ON lesson_completions(user_id);
CREATE INDEX IF NOT EXISTS idx_lesson_completions_course ON lesson_completions(course_id);
CREATE INDEX IF NOT EXISTS idx_lesson_completions_module ON lesson_completions(module_id);

-- Enable RLS
ALTER TABLE lesson_completions ENABLE ROW LEVEL SECURITY;

-- Students can view their own completions
CREATE POLICY "lesson_completions_select_own" ON lesson_completions
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- Students can insert their own completions
CREATE POLICY "lesson_completions_insert_own" ON lesson_completions
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

-- ============================================
-- FIX 4: Grant Permissions
-- ============================================

GRANT SELECT ON course_modules TO authenticated;
GRANT SELECT, INSERT ON lesson_completions TO authenticated;
GRANT UPDATE ON enrollments TO authenticated;

-- ============================================
-- FIX 5: Create Sample Module
-- ============================================

-- Add a module to the test course
INSERT INTO course_modules (course_id, title, description, order_index, duration_minutes, content)
SELECT 
  id,
  'Introduction to HVAC Systems',
  'Learn the basics of heating, ventilation, and air conditioning',
  1,
  30,
  'This module covers the fundamentals of HVAC systems including components, operation, and maintenance.'
FROM courses
WHERE slug = 'intro-hvac'
ON CONFLICT DO NOTHING;

-- ============================================
-- VERIFICATION
-- ============================================

DO $$
DECLARE
  enrollments_update_policy INTEGER;
  course_modules_exists BOOLEAN;
  lesson_completions_exists BOOLEAN;
BEGIN
  -- Check update policy
  SELECT COUNT(*) INTO enrollments_update_policy
  FROM pg_policies 
  WHERE tablename = 'enrollments' 
  AND policyname = 'enrollments_update_own'
  AND cmd = 'UPDATE';
  
  -- Check tables exist
  SELECT EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_name = 'course_modules'
  ) INTO course_modules_exists;
  
  SELECT EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_name = 'lesson_completions'
  ) INTO lesson_completions_exists;
  
  RAISE NOTICE '';
  RAISE NOTICE '✅ COURSE COMPLETION SYSTEM FIXED';
  RAISE NOTICE '==================================';
  RAISE NOTICE '';
  RAISE NOTICE 'Enrollments UPDATE policy: % (should be 1)', enrollments_update_policy;
  RAISE NOTICE 'course_modules table: %', course_modules_exists;
  RAISE NOTICE 'lesson_completions table: %', lesson_completions_exists;
  RAISE NOTICE '';
  
  IF enrollments_update_policy > 0 AND course_modules_exists AND lesson_completions_exists THEN
    RAISE NOTICE '✅ Students can now track progress and complete courses!';
  ELSE
    RAISE NOTICE '⚠️  Some components missing';
  END IF;
  RAISE NOTICE '';
END $$;
