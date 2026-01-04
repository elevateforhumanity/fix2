-- Fix RLS policies to allow unauthenticated enrollment applications
-- This allows public users to submit applications

-- Allow anonymous users to insert student applications
DROP POLICY IF EXISTS "student_applications_insert_anon" ON student_applications;
CREATE POLICY "student_applications_insert_anon" ON student_applications 
  FOR INSERT TO anon
  WITH CHECK (true);

-- Allow anonymous users to insert program holder applications
DROP POLICY IF EXISTS "program_holder_applications_insert_anon" ON program_holder_applications;
CREATE POLICY "program_holder_applications_insert_anon" ON program_holder_applications 
  FOR INSERT TO anon
  WITH CHECK (true);

-- Allow anonymous users to insert employer applications
DROP POLICY IF EXISTS "employer_applications_insert_anon" ON employer_applications;
CREATE POLICY "employer_applications_insert_anon" ON employer_applications 
  FOR INSERT TO anon
  WITH CHECK (true);

-- Allow anonymous users to insert staff applications
DROP POLICY IF EXISTS "staff_applications_insert_anon" ON staff_applications;
CREATE POLICY "staff_applications_insert_anon" ON staff_applications 
  FOR INSERT TO anon
  WITH CHECK (true);

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ RLS policies updated!';
  RAISE NOTICE '';
  RAISE NOTICE 'Anonymous users can now:';
  RAISE NOTICE '  - Submit student applications';
  RAISE NOTICE '  - Submit program holder applications';
  RAISE NOTICE '  - Submit employer applications';
  RAISE NOTICE '  - Submit staff applications';
  RAISE NOTICE '';
  RAISE NOTICE 'Test enrollment API now!';
END $$;
