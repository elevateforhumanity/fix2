-- ============================================
-- EMERGENCY: Check if tables are in different schema
-- ============================================

-- Check ALL schemas for tables
SELECT 
  schemaname,
  COUNT(*) as table_count
FROM pg_tables
GROUP BY schemaname
ORDER BY table_count DESC;

-- List ALL tables in ALL schemas
SELECT 
  schemaname,
  tablename
FROM pg_tables
ORDER BY schemaname, tablename;

-- Check if tables are in auth schema
SELECT tablename 
FROM pg_tables 
WHERE schemaname = 'auth'
ORDER BY tablename;

-- Check if there's a backup schema
SELECT tablename 
FROM pg_tables 
WHERE schemaname LIKE '%backup%' OR schemaname LIKE '%old%'
ORDER BY tablename;
