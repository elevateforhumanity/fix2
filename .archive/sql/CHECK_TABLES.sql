-- ============================================
-- CHECK WHAT TABLES EXIST IN YOUR DATABASE
-- ============================================
-- Run this first to see what you have

-- List all tables in public schema
SELECT 
  schemaname,
  tablename,
  tableowner
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

-- Count total tables
SELECT COUNT(*) as total_tables
FROM pg_tables
WHERE schemaname = 'public';

-- Check if critical tables exist
SELECT 
  'applications' as table_name,
  CASE WHEN EXISTS (
    SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'applications'
  ) THEN '✅ EXISTS' ELSE '❌ MISSING' END as status
UNION ALL
SELECT 
  'programs' as table_name,
  CASE WHEN EXISTS (
    SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'programs'
  ) THEN '✅ EXISTS' ELSE '❌ MISSING' END as status
UNION ALL
SELECT 
  'profiles' as table_name,
  CASE WHEN EXISTS (
    SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'profiles'
  ) THEN '✅ EXISTS' ELSE '❌ MISSING' END as status
UNION ALL
SELECT 
  'courses' as table_name,
  CASE WHEN EXISTS (
    SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'courses'
  ) THEN '✅ EXISTS' ELSE '❌ MISSING' END as status
UNION ALL
SELECT 
  'enrollments' as table_name,
  CASE WHEN EXISTS (
    SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'enrollments'
  ) THEN '✅ EXISTS' ELSE '❌ MISSING' END as status;

-- Check applications table columns if it exists
SELECT 
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'applications'
ORDER BY ordinal_position;

-- Check programs table columns if it exists
SELECT 
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'programs'
ORDER BY ordinal_position;
