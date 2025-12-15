-- ============================================
-- COMPREHENSIVE HEALTH CHECK
-- ============================================

-- 1. Count total tables
SELECT 'Total Tables' as check_name, COUNT(*)::TEXT as result
FROM pg_tables WHERE schemaname = 'public';

-- 2. Check all critical tables exist
SELECT 'Critical Tables Check' as section;
SELECT 
  tablename,
  CASE WHEN EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND pg_tables.tablename = t.tablename) 
    THEN '✅' ELSE '❌' END as status
FROM (VALUES 
  ('applications'),
  ('profiles'),
  ('programs'),
  ('courses'),
  ('enrollments'),
  ('certificates'),
  ('modules'),
  ('module_progress'),
  ('student_enrollments'),
  ('funding_records'),
  ('lessons'),
  ('quizzes'),
  ('assignments'),
  ('discussions'),
  ('notifications'),
  ('payments'),
  ('subscriptions'),
  ('user_settings'),
  ('audit_logs'),
  ('api_keys')
) AS t(tablename);

-- 3. Check applications table columns
SELECT 'Applications Table Columns' as section;
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'applications'
ORDER BY ordinal_position;

-- 4. Check programs table columns
SELECT 'Programs Table Columns' as section;
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'programs'
ORDER BY ordinal_position;

-- 5. Check RLS is enabled
SELECT 'RLS Status' as section;
SELECT 
  tablename,
  CASE WHEN rowsecurity THEN '✅ Enabled' ELSE '❌ Disabled' END as rls_status
FROM pg_tables t
JOIN pg_class c ON c.relname = t.tablename
WHERE schemaname = 'public'
AND tablename IN ('applications', 'courses', 'enrollments', 'profiles', 'programs')
ORDER BY tablename;

-- 6. Count RLS policies
SELECT 'RLS Policies' as section;
SELECT tablename, COUNT(*) as policy_count
FROM pg_policies
WHERE schemaname = 'public'
GROUP BY tablename
ORDER BY tablename;

-- 7. Check for data in critical tables
SELECT 'Data Check' as section;
SELECT 'profiles' as table_name, COUNT(*)::TEXT as row_count FROM profiles
UNION ALL
SELECT 'programs', COUNT(*)::TEXT FROM programs
UNION ALL
SELECT 'courses', COUNT(*)::TEXT FROM courses
UNION ALL
SELECT 'modules', COUNT(*)::TEXT FROM modules
UNION ALL
SELECT 'applications', COUNT(*)::TEXT FROM applications
UNION ALL
SELECT 'certificates', COUNT(*)::TEXT FROM certificates;

-- 8. List all tables (for comparison with migrations)
SELECT 'All Tables List' as section;
SELECT tablename 
FROM pg_tables 
WHERE schemaname = 'public' 
ORDER BY tablename;
