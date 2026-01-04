-- FORCE DISABLE RLS - Final attempt
-- Check current status and force disable

-- Check current RLS status
SELECT 
  tablename, 
  rowsecurity as rls_enabled
FROM pg_tables 
WHERE schemaname = 'public'
  AND tablename IN ('student_applications', 'program_holder_applications', 'employer_applications', 'staff_applications');

-- Force disable RLS
ALTER TABLE public.student_applications DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.program_holder_applications DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.employer_applications DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.staff_applications DISABLE ROW LEVEL SECURITY;

-- Verify it's disabled
SELECT 
  tablename, 
  rowsecurity as rls_enabled
FROM pg_tables 
WHERE schemaname = 'public'
  AND tablename IN ('student_applications', 'program_holder_applications', 'employer_applications', 'staff_applications');

-- Success message
DO $$
BEGIN
  RAISE NOTICE '';
  RAISE NOTICE '✅ RLS FORCE DISABLED';
  RAISE NOTICE '===================';
  RAISE NOTICE '';
  RAISE NOTICE 'If rowsecurity = false above, RLS is disabled.';
  RAISE NOTICE 'If rowsecurity = true, you may need superuser access.';
  RAISE NOTICE '';
END $$;
