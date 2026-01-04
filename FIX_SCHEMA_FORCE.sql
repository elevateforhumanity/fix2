-- FORCE FIX ALL SCHEMA ISSUES
-- Drops everything first, then recreates

-- ============================================
-- FIX 1: Profiles RLS - Force Drop and Recreate
-- ============================================

-- Drop ALL existing policies on profiles
DROP POLICY IF EXISTS "profiles_select_own" ON profiles;
DROP POLICY IF EXISTS "profiles_select_all_admin" ON profiles;
DROP POLICY IF EXISTS "profiles_select_admin" ON profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON profiles;
DROP POLICY IF EXISTS "profiles_insert_own" ON profiles;

-- Create simple non-recursive policies
CREATE POLICY "profiles_select_self" ON profiles 
  FOR SELECT TO authenticated
  USING (id = auth.uid());

CREATE POLICY "profiles_update_self" ON profiles 
  FOR UPDATE TO authenticated
  USING (id = auth.uid());

-- ============================================
-- FIX 2: Add Missing Columns to Courses
-- ============================================

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'courses' AND column_name = 'published'
  ) THEN
    ALTER TABLE courses ADD COLUMN published BOOLEAN DEFAULT false;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'courses' AND column_name = 'category'
  ) THEN
    ALTER TABLE courses ADD COLUMN category TEXT;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'courses' AND column_name = 'duration_hours'
  ) THEN
    ALTER TABLE courses ADD COLUMN duration_hours INTEGER;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'courses' AND column_name = 'price'
  ) THEN
    ALTER TABLE courses ADD COLUMN price DECIMAL(10,2);
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_courses_published ON courses(published);

-- ============================================
-- FIX 3: Add Missing Columns to Enrollments
-- ============================================

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'enrollments' AND column_name = 'progress'
  ) THEN
    ALTER TABLE enrollments ADD COLUMN progress INTEGER DEFAULT 0;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'enrollments' AND column_name = 'started_at'
  ) THEN
    ALTER TABLE enrollments ADD COLUMN started_at TIMESTAMPTZ DEFAULT NOW();
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'enrollments' AND column_name = 'completed_at'
  ) THEN
    ALTER TABLE enrollments ADD COLUMN completed_at TIMESTAMPTZ;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_enrollments_progress ON enrollments(progress);

-- ============================================
-- FIX 4: Add Missing Columns to Programs
-- ============================================

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'programs' AND column_name = 'partner_name'
  ) THEN
    ALTER TABLE programs ADD COLUMN partner_name TEXT;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'programs' AND column_name = 'partner_id'
  ) THEN
    ALTER TABLE programs ADD COLUMN partner_id UUID;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'programs' AND column_name = 'description'
  ) THEN
    ALTER TABLE programs ADD COLUMN description TEXT;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'programs' AND column_name = 'duration_weeks'
  ) THEN
    ALTER TABLE programs ADD COLUMN duration_weeks INTEGER;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'programs' AND column_name = 'published'
  ) THEN
    ALTER TABLE programs ADD COLUMN published BOOLEAN DEFAULT true;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_programs_partner_id ON programs(partner_id);
CREATE INDEX IF NOT EXISTS idx_programs_published ON programs(published);

-- ============================================
-- FIX 5: Update Existing Data
-- ============================================

-- Set all existing courses to published
UPDATE courses SET published = true WHERE published IS NULL;

-- Set all existing programs to published
UPDATE programs SET published = true WHERE published IS NULL;

-- Set progress to 0 for existing enrollments
UPDATE enrollments SET progress = 0 WHERE progress IS NULL;

-- ============================================
-- VERIFICATION
-- ============================================

DO $$
DECLARE
  courses_published_exists BOOLEAN;
  enrollments_progress_exists BOOLEAN;
  programs_partner_exists BOOLEAN;
  profiles_policies_count INTEGER;
BEGIN
  -- Check columns exist
  SELECT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'courses' AND column_name = 'published'
  ) INTO courses_published_exists;
  
  SELECT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'enrollments' AND column_name = 'progress'
  ) INTO enrollments_progress_exists;
  
  SELECT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'programs' AND column_name = 'partner_name'
  ) INTO programs_partner_exists;
  
  -- Count profiles policies
  SELECT COUNT(*) INTO profiles_policies_count
  FROM pg_policies 
  WHERE tablename = 'profiles';
  
  RAISE NOTICE '';
  RAISE NOTICE '✅ SCHEMA FIXES APPLIED';
  RAISE NOTICE '======================';
  RAISE NOTICE '';
  RAISE NOTICE 'Columns Added:';
  RAISE NOTICE '  courses.published: %', courses_published_exists;
  RAISE NOTICE '  enrollments.progress: %', enrollments_progress_exists;
  RAISE NOTICE '  programs.partner_name: %', programs_partner_exists;
  RAISE NOTICE '';
  RAISE NOTICE 'Profiles Policies: % (should be 2)', profiles_policies_count;
  RAISE NOTICE '';
  
  IF courses_published_exists AND enrollments_progress_exists AND programs_partner_exists THEN
    RAISE NOTICE '✅ ALL COLUMNS EXIST - Ready to test!';
  ELSE
    RAISE NOTICE '⚠️  Some columns missing - check errors above';
  END IF;
  RAISE NOTICE '';
END $$;
