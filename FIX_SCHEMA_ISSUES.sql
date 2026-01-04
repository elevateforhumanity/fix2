-- FIX ALL SCHEMA ISSUES FOUND IN TESTING
-- Run this to fix missing columns and RLS issues

-- ============================================
-- FIX 1: Profiles RLS Infinite Recursion
-- ============================================

-- Drop problematic policies
DROP POLICY IF EXISTS "profiles_select_own" ON profiles;

-- Create simple policy without recursion
CREATE POLICY "profiles_select_own" ON profiles 
  FOR SELECT TO authenticated
  USING (id = auth.uid());

CREATE POLICY "profiles_select_all_admin" ON profiles 
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() 
      AND p.role IN ('admin', 'super_admin')
    )
  );

-- ============================================
-- FIX 2: Add Missing Columns to Courses
-- ============================================

ALTER TABLE courses ADD COLUMN IF NOT EXISTS published BOOLEAN DEFAULT false;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS duration_hours INTEGER;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS price DECIMAL(10,2);

CREATE INDEX IF NOT EXISTS idx_courses_published ON courses(published);

-- ============================================
-- FIX 3: Add Missing Columns to Enrollments
-- ============================================

ALTER TABLE enrollments ADD COLUMN IF NOT EXISTS progress INTEGER DEFAULT 0;
ALTER TABLE enrollments ADD COLUMN IF NOT EXISTS started_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE enrollments ADD COLUMN IF NOT EXISTS completed_at TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS idx_enrollments_progress ON enrollments(progress);

-- ============================================
-- FIX 4: Add Missing Columns to Programs
-- ============================================

ALTER TABLE programs ADD COLUMN IF NOT EXISTS partner_name TEXT;
ALTER TABLE programs ADD COLUMN IF NOT EXISTS partner_id UUID;
ALTER TABLE programs ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE programs ADD COLUMN IF NOT EXISTS duration_weeks INTEGER;
ALTER TABLE programs ADD COLUMN IF NOT EXISTS published BOOLEAN DEFAULT true;

CREATE INDEX IF NOT EXISTS idx_programs_partner_id ON programs(partner_id);
CREATE INDEX IF NOT EXISTS idx_programs_published ON programs(published);

-- ============================================
-- FIX 5: Update Existing Data
-- ============================================

-- Set all existing courses to published
UPDATE courses SET published = true WHERE published IS NULL;

-- Set all existing programs to published
UPDATE programs SET published = true WHERE published IS NULL;

-- ============================================
-- VERIFICATION
-- ============================================

DO $$
BEGIN
  RAISE NOTICE '';
  RAISE NOTICE '✅ SCHEMA FIXES APPLIED';
  RAISE NOTICE '======================';
  RAISE NOTICE '';
  RAISE NOTICE 'Fixed:';
  RAISE NOTICE '  - Profiles RLS infinite recursion';
  RAISE NOTICE '  - Added courses.published column';
  RAISE NOTICE '  - Added enrollments.progress column';
  RAISE NOTICE '  - Added programs.partner_name column';
  RAISE NOTICE '';
  RAISE NOTICE '✨ Re-run test now!';
  RAISE NOTICE '';
END $$;
