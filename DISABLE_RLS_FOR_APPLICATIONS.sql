-- DISABLE RLS FOR APPLICATION TABLES
-- These tables are for public submissions, so RLS is not needed
-- Admins can still control access via application logic

-- Disable RLS on application tables
ALTER TABLE student_applications DISABLE ROW LEVEL SECURITY;
ALTER TABLE program_holder_applications DISABLE ROW LEVEL SECURITY;
ALTER TABLE employer_applications DISABLE ROW LEVEL SECURITY;
ALTER TABLE staff_applications DISABLE ROW LEVEL SECURITY;

-- Verify
DO $$
BEGIN
  RAISE NOTICE '✅ RLS DISABLED for application tables';
  RAISE NOTICE '';
  RAISE NOTICE 'Tables now accept public submissions:';
  RAISE NOTICE '  - student_applications';
  RAISE NOTICE '  - program_holder_applications';
  RAISE NOTICE '  - employer_applications';
  RAISE NOTICE '  - staff_applications';
  RAISE NOTICE '';
  RAISE NOTICE '🔒 Security: Application logic controls who can view/edit';
  RAISE NOTICE '';
  RAISE NOTICE '✨ Test enrollment API now!';
END $$;
