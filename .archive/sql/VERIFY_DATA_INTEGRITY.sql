-- ============================================
-- VERIFY YOUR DATA IS INTACT
-- ============================================

-- 1. Check if you have actual data (not just empty tables)
SELECT 'profiles' as table_name, COUNT(*) as row_count FROM profiles
UNION ALL
SELECT 'programs', COUNT(*) FROM programs
UNION ALL
SELECT 'courses', COUNT(*) FROM courses
UNION ALL
SELECT 'enrollments', COUNT(*) FROM enrollments
UNION ALL
SELECT 'applications', COUNT(*) FROM applications
UNION ALL
SELECT 'certificates', COUNT(*) FROM certificates
UNION ALL
SELECT 'modules', COUNT(*) FROM modules;

-- 2. Check when tables were created (to see if they're new or restored)
SELECT 
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC
LIMIT 20;

-- 3. Check if applications table has the columns we need
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'applications'
ORDER BY ordinal_position;
