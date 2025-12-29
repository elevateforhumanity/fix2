-- ============================================
-- PREFLIGHT CHECK
-- Run this FIRST to check if database is ready
-- ============================================

-- Check if this is a fresh database or already set up
DO $$
DECLARE
  table_count INTEGER;
  migration_exists BOOLEAN;
BEGIN
  -- Count existing tables
  SELECT COUNT(*) INTO table_count
  FROM information_schema.tables 
  WHERE table_schema = 'public' 
  AND table_type = 'BASE TABLE';

  -- Check if migration tracking exists
  SELECT EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_name = 'schema_migrations'
  ) INTO migration_exists;

  -- Report status
  RAISE NOTICE '========================================';
  RAISE NOTICE 'DATABASE PREFLIGHT CHECK';
  RAISE NOTICE '========================================';
  RAISE NOTICE 'Total tables in database: %', table_count;
  RAISE NOTICE 'Migration tracking exists: %', migration_exists;
  RAISE NOTICE '';

  IF table_count = 0 THEN
    RAISE NOTICE '✅ FRESH DATABASE - Ready for setup';
    RAISE NOTICE 'Next step: Run COPY-PASTE-SQL.sql';
  ELSIF NOT migration_exists THEN
    RAISE NOTICE '⚠️  TABLES EXIST BUT NO MIGRATION TRACKING';
    RAISE NOTICE 'This database may have been set up manually.';
    RAISE NOTICE 'Options:';
    RAISE NOTICE '1. Drop all tables and start fresh (DANGER!)';
    RAISE NOTICE '2. Run COPY-PASTE-SQL.sql (may cause conflicts)';
  ELSIF table_count < 50 THEN
    RAISE NOTICE '⚠️  PARTIAL SETUP DETECTED';
    RAISE NOTICE 'Migration tracking exists but tables are missing.';
    RAISE NOTICE 'Next step: Run COPY-PASTE-SQL.sql to complete setup';
  ELSE
    RAISE NOTICE '✅ DATABASE ALREADY SET UP';
    RAISE NOTICE 'Migration tracking exists with % tables', table_count;
    RAISE NOTICE 'Next step: Run VERIFY-AFTER-MIGRATION.sql to check status';
  END IF;

  RAISE NOTICE '========================================';
END $$;

-- Show what tables exist (if any)
SELECT 
  COUNT(*) as total_tables,
  STRING_AGG(table_name, ', ' ORDER BY table_name) as sample_tables
FROM (
  SELECT table_name 
  FROM information_schema.tables 
  WHERE table_schema = 'public' 
  AND table_type = 'BASE TABLE'
  LIMIT 10
) t;

-- Check if Supabase auth is set up
SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.schemata WHERE schema_name = 'auth')
    THEN '✅ Supabase Auth schema exists'
    ELSE '⚠️  Supabase Auth schema not found'
  END as auth_status;

-- Check if storage is set up
SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.schemata WHERE schema_name = 'storage')
    THEN '✅ Supabase Storage schema exists'
    ELSE '⚠️  Supabase Storage schema not found'
  END as storage_status;
