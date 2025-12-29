-- ============================================
-- VERIFICATION QUERIES
-- Run these AFTER running COPY-PASTE-SQL.sql
-- ============================================

-- 1. Check if migration tracking was created
SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'schema_migrations')
    THEN '✅ Migration tracking table exists'
    ELSE '❌ Migration tracking table NOT found - run COPY-PASTE-SQL.sql first'
  END as status;

-- 2. Check migration history (if table exists)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'schema_migrations') THEN
    RAISE NOTICE '--- MIGRATION HISTORY ---';
  END IF;
END $$;

SELECT * FROM migration_history ORDER BY applied_at DESC LIMIT 10;

-- 3. Count all tables created
SELECT 
  COUNT(*) as total_tables,
  '✅ Tables created successfully' as status
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_type = 'BASE TABLE';

-- 4. List all tables
SELECT 
  table_name,
  CASE 
    WHEN table_name LIKE '%migration%' THEN 'Migration System'
    WHEN table_name LIKE '%program%' THEN 'Programs'
    WHEN table_name LIKE '%course%' THEN 'LMS'
    WHEN table_name LIKE '%marketplace%' THEN 'Marketplace'
    WHEN table_name LIKE '%scorm%' THEN 'SCORM'
    ELSE 'Other'
  END as category
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_type = 'BASE TABLE'
ORDER BY category, table_name;

-- 5. Check if programs table exists (needed for seeding)
SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'programs')
    THEN '✅ Programs table exists - ready for seeding'
    ELSE '❌ Programs table NOT found - check migration errors'
  END as status;

-- 6. Check RLS policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  cmd
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname
LIMIT 20;

-- 7. Summary
SELECT 
  (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE') as total_tables,
  (SELECT COUNT(*) FROM pg_policies WHERE schemaname = 'public') as total_policies,
  (SELECT COUNT(*) FROM schema_migrations) as total_migrations,
  CASE 
    WHEN (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE') > 50
    THEN '✅ Database setup looks good!'
    ELSE '⚠️ Some tables may be missing'
  END as overall_status;
