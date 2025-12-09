-- ============================================
-- STEP 3: VERIFICATION QUERIES
-- ============================================
-- Copy these queries and paste into Supabase SQL Editor
-- Click "Run" to verify your data loaded correctly
-- ============================================

-- Count all records
SELECT 
  'Programs' as table_name,
  COUNT(*) as count
FROM programs
UNION ALL
SELECT 
  'Courses' as table_name,
  COUNT(*) as count
FROM courses
UNION ALL
SELECT 
  'Profiles' as table_name,
  COUNT(*) as count
FROM profiles
UNION ALL
SELECT 
  'Enrollments' as table_name,
  COUNT(*) as count
FROM enrollments;

-- List all programs
SELECT 
  slug,
  title,
  status,
  duration_hours,
  array_length(funding, 1) as funding_options
FROM programs
ORDER BY title;

-- List all courses
SELECT 
  slug,
  title,
  status,
  duration_hours,
  category
FROM courses
ORDER BY title;

-- Check table structure
SELECT 
  table_name,
  column_name,
  data_type
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name IN ('programs', 'courses', 'profiles', 'enrollments')
ORDER BY table_name, ordinal_position;

-- Check RLS policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- Expected results:
-- Programs: 16
-- Courses: 17
-- All should have status = 'published'
