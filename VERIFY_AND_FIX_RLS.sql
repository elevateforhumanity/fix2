-- VERIFY AND FIX RLS PERMISSIONS
-- Run this to check and fix the enrollment issue

-- ============================================
-- STEP 1: CHECK CURRENT PERMISSIONS
-- ============================================

-- Check what permissions anon role has
SELECT 
  grantee, 
  privilege_type,
  table_name
FROM information_schema.role_table_grants 
WHERE table_name IN ('student_applications', 'program_holder_applications', 'employer_applications', 'staff_applications')
  AND grantee IN ('anon', 'authenticated', 'public');

-- Check existing policies
SELECT 
  schemaname,
  tablename,
  policyname,
  roles,
  cmd
FROM pg_policies 
WHERE tablename IN ('student_applications', 'program_holder_applications', 'employer_applications', 'staff_applications');

-- ============================================
-- STEP 2: GRANT PERMISSIONS (IF MISSING)
-- ============================================

-- Grant schema usage
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;

-- Grant INSERT on all application tables
GRANT INSERT ON student_applications TO anon, authenticated;
GRANT INSERT ON program_holder_applications TO anon, authenticated;
GRANT INSERT ON employer_applications TO anon, authenticated;
GRANT INSERT ON staff_applications TO anon, authenticated;

-- Grant SELECT for authenticated users to see their own applications
GRANT SELECT ON student_applications TO authenticated;
GRANT SELECT ON program_holder_applications TO authenticated;
GRANT SELECT ON employer_applications TO authenticated;
GRANT SELECT ON staff_applications TO authenticated;

-- ============================================
-- STEP 3: CREATE/UPDATE POLICIES
-- ============================================

-- Student Applications
DROP POLICY IF EXISTS "student_applications_insert_anon" ON student_applications;
CREATE POLICY "student_applications_insert_anon" ON student_applications 
  FOR INSERT TO anon
  WITH CHECK (true);

DROP POLICY IF EXISTS "student_applications_insert_auth" ON student_applications;
CREATE POLICY "student_applications_insert_auth" ON student_applications 
  FOR INSERT TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "student_applications_select_own" ON student_applications;
CREATE POLICY "student_applications_select_own" ON student_applications 
  FOR SELECT TO authenticated
  USING (
    user_id = auth.uid() 
    OR EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'super_admin', 'staff')
    )
  );

-- Program Holder Applications
DROP POLICY IF EXISTS "program_holder_applications_insert_anon" ON program_holder_applications;
CREATE POLICY "program_holder_applications_insert_anon" ON program_holder_applications 
  FOR INSERT TO anon
  WITH CHECK (true);

DROP POLICY IF EXISTS "program_holder_applications_insert_auth" ON program_holder_applications;
CREATE POLICY "program_holder_applications_insert_auth" ON program_holder_applications 
  FOR INSERT TO authenticated
  WITH CHECK (true);

-- Employer Applications
DROP POLICY IF EXISTS "employer_applications_insert_anon" ON employer_applications;
CREATE POLICY "employer_applications_insert_anon" ON employer_applications 
  FOR INSERT TO anon
  WITH CHECK (true);

DROP POLICY IF EXISTS "employer_applications_insert_auth" ON employer_applications;
CREATE POLICY "employer_applications_insert_auth" ON employer_applications 
  FOR INSERT TO authenticated
  WITH CHECK (true);

-- Staff Applications
DROP POLICY IF EXISTS "staff_applications_insert_anon" ON staff_applications;
CREATE POLICY "staff_applications_insert_anon" ON staff_applications 
  FOR INSERT TO anon
  WITH CHECK (true);

DROP POLICY IF EXISTS "staff_applications_insert_auth" ON staff_applications;
CREATE POLICY "staff_applications_insert_auth" ON staff_applications 
  FOR INSERT TO authenticated
  WITH CHECK (true);

-- ============================================
-- STEP 4: VERIFY SETUP
-- ============================================

DO $$
DECLARE
  anon_grants INTEGER;
  anon_policies INTEGER;
BEGIN
  -- Count grants
  SELECT COUNT(*) INTO anon_grants
  FROM information_schema.role_table_grants 
  WHERE table_name = 'student_applications'
    AND grantee = 'anon'
    AND privilege_type = 'INSERT';
  
  -- Count policies
  SELECT COUNT(*) INTO anon_policies
  FROM pg_policies 
  WHERE tablename = 'student_applications'
    AND 'anon' = ANY(roles);
  
  RAISE NOTICE '';
  RAISE NOTICE '✅ VERIFICATION COMPLETE';
  RAISE NOTICE '=====================';
  RAISE NOTICE '';
  RAISE NOTICE 'Grants for anon role: %', anon_grants;
  RAISE NOTICE 'Policies for anon role: %', anon_policies;
  RAISE NOTICE '';
  
  IF anon_grants > 0 AND anon_policies > 0 THEN
    RAISE NOTICE '✅ RLS is properly configured!';
    RAISE NOTICE '';
    RAISE NOTICE 'Test enrollment API now:';
    RAISE NOTICE 'curl -X POST http://localhost:3001/api/enroll/apply \';
    RAISE NOTICE '  -H "Content-Type: application/json" \';
    RAISE NOTICE '  -d ''{"firstName":"Test","lastName":"User","email":"test@example.com","phone":"555-0000","preferredProgramId":"hvac","fundingSource":"WIOA"}''';
  ELSE
    RAISE NOTICE '⚠️  Configuration incomplete';
    RAISE NOTICE 'Grants: % (should be > 0)', anon_grants;
    RAISE NOTICE 'Policies: % (should be > 0)', anon_policies;
  END IF;
  
  RAISE NOTICE '';
END $$;
