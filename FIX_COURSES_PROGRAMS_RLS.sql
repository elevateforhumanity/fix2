-- FIX RLS FOR COURSES AND PROGRAMS
-- Students need to read these tables

-- ============================================
-- FIX COURSES RLS
-- ============================================

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "courses_select_all" ON courses;
DROP POLICY IF EXISTS "courses_select_published" ON courses;
DROP POLICY IF EXISTS "courses_insert_admin" ON courses;
DROP POLICY IF EXISTS "courses_update_admin" ON courses;

-- Allow authenticated users to view published courses
CREATE POLICY "courses_select_published" ON courses
  FOR SELECT TO authenticated
  USING (published = true);

-- Allow admins to see all courses
CREATE POLICY "courses_select_admin" ON courses
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin', 'staff')
    )
  );

-- ============================================
-- FIX PROGRAMS RLS
-- ============================================

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "programs_select_all" ON programs;
DROP POLICY IF EXISTS "programs_select_published" ON programs;

-- Allow authenticated users to view published programs
CREATE POLICY "programs_select_published" ON programs
  FOR SELECT TO authenticated
  USING (published = true);

-- Allow admins to see all programs
CREATE POLICY "programs_select_admin" ON programs
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin', 'staff')
    )
  );

-- ============================================
-- VERIFICATION
-- ============================================

DO $$
DECLARE
  courses_policies INTEGER;
  programs_policies INTEGER;
BEGIN
  SELECT COUNT(*) INTO courses_policies
  FROM pg_policies WHERE tablename = 'courses';
  
  SELECT COUNT(*) INTO programs_policies
  FROM pg_policies WHERE tablename = 'programs';
  
  RAISE NOTICE '';
  RAISE NOTICE '✅ RLS POLICIES UPDATED';
  RAISE NOTICE '======================';
  RAISE NOTICE '';
  RAISE NOTICE 'Courses policies: % (should be 2)', courses_policies;
  RAISE NOTICE 'Programs policies: % (should be 2)', programs_policies;
  RAISE NOTICE '';
  RAISE NOTICE '✨ Students can now view courses and programs!';
  RAISE NOTICE '';
END $$;
