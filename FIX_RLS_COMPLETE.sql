-- Complete RLS fix with table permissions
-- Run this in Supabase SQL Editor

-- First, grant permissions to anon role
GRANT USAGE ON SCHEMA public TO anon;
GRANT INSERT ON student_applications TO anon;
GRANT INSERT ON program_holder_applications TO anon;
GRANT INSERT ON employer_applications TO anon;
GRANT INSERT ON staff_applications TO anon;

-- Now create the policies
DROP POLICY IF EXISTS "student_applications_insert_anon" ON student_applications;
CREATE POLICY "student_applications_insert_anon" ON student_applications 
  FOR INSERT TO anon
  WITH CHECK (true);

DROP POLICY IF EXISTS "program_holder_applications_insert_anon" ON program_holder_applications;
CREATE POLICY "program_holder_applications_insert_anon" ON program_holder_applications 
  FOR INSERT TO anon
  WITH CHECK (true);

DROP POLICY IF EXISTS "employer_applications_insert_anon" ON employer_applications;
CREATE POLICY "employer_applications_insert_anon" ON employer_applications 
  FOR INSERT TO anon
  WITH CHECK (true);

DROP POLICY IF EXISTS "staff_applications_insert_anon" ON staff_applications;
CREATE POLICY "staff_applications_insert_anon" ON staff_applications 
  FOR INSERT TO anon
  WITH CHECK (true);

-- Also ensure authenticated users can insert
DROP POLICY IF EXISTS "student_applications_insert_auth" ON student_applications;
CREATE POLICY "student_applications_insert_auth" ON student_applications 
  FOR INSERT TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "program_holder_applications_insert_auth" ON program_holder_applications;
CREATE POLICY "program_holder_applications_insert_auth" ON program_holder_applications 
  FOR INSERT TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "employer_applications_insert_auth" ON employer_applications;
CREATE POLICY "employer_applications_insert_auth" ON employer_applications 
  FOR INSERT TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "staff_applications_insert_auth" ON staff_applications;
CREATE POLICY "staff_applications_insert_auth" ON staff_applications 
  FOR INSERT TO authenticated
  WITH CHECK (true);

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ RLS policies and permissions updated!';
  RAISE NOTICE '';
  RAISE NOTICE 'Granted INSERT permissions to:';
  RAISE NOTICE '  - anon role (public users)';
  RAISE NOTICE '  - authenticated role (logged in users)';
  RAISE NOTICE '';
  RAISE NOTICE 'Created policies for:';
  RAISE NOTICE '  - student_applications';
  RAISE NOTICE '  - program_holder_applications';
  RAISE NOTICE '  - employer_applications';
  RAISE NOTICE '  - staff_applications';
  RAISE NOTICE '';
  RAISE NOTICE '✨ Test enrollment API now!';
END $$;
