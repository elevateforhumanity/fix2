-- Check what tables exist in your database
SELECT 
  table_name,
  (SELECT COUNT(*) FROM information_schema.columns WHERE columns.table_name = tables.table_name) as column_count
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- Check which critical tables have data
SELECT 'courses' as table_name, COUNT(*) as row_count FROM courses
UNION ALL
SELECT 'programs', COUNT(*) FROM programs
UNION ALL
SELECT 'enrollments', COUNT(*) FROM enrollments
UNION ALL
SELECT 'users', COUNT(*) FROM auth.users
ORDER BY table_name;
