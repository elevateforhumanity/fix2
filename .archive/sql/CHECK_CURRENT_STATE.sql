-- Check how many tables you have now
SELECT COUNT(*) as total_tables
FROM pg_tables
WHERE schemaname = 'public';

-- List all tables
SELECT tablename 
FROM pg_tables 
WHERE schemaname = 'public' 
ORDER BY tablename;

-- Check if critical tables exist
SELECT 
  CASE WHEN EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'applications') 
    THEN '✅ applications' ELSE '❌ applications' END as status
UNION ALL
SELECT 
  CASE WHEN EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'courses') 
    THEN '✅ courses' ELSE '❌ courses' END
UNION ALL
SELECT 
  CASE WHEN EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'enrollments') 
    THEN '✅ enrollments' ELSE '❌ enrollments' END
UNION ALL
SELECT 
  CASE WHEN EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'profiles') 
    THEN '✅ profiles' ELSE '❌ profiles' END
UNION ALL
SELECT 
  CASE WHEN EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'programs') 
    THEN '✅ programs' ELSE '❌ programs' END;
