-- =====================================================
-- CHECK NEW MIGRATIONS (tenant_licenses & push_tokens)
-- Copy/paste this into Supabase SQL Editor
-- =====================================================

-- 1. Check tenant_licenses table exists
SELECT 
  'tenant_licenses' as table_name,
  CASE WHEN EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'tenant_licenses'
  ) THEN '✅ EXISTS' ELSE '❌ MISSING' END as status;

-- 2. Check push_tokens table exists
SELECT 
  'push_tokens' as table_name,
  CASE WHEN EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'push_tokens'
  ) THEN '✅ EXISTS' ELSE '❌ MISSING' END as status;

-- 3. Check notification_logs table exists
SELECT 
  'notification_logs' as table_name,
  CASE WHEN EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'notification_logs'
  ) THEN '✅ EXISTS' ELSE '❌ MISSING' END as status;

-- 4. Check license_usage view exists
SELECT 
  'license_usage' as view_name,
  CASE WHEN EXISTS (
    SELECT FROM information_schema.views 
    WHERE table_schema = 'public' 
    AND table_name = 'license_usage'
  ) THEN '✅ EXISTS' ELSE '❌ MISSING' END as status;

-- 5. Check RLS is enabled on all tables
SELECT 
  tablename,
  CASE WHEN rowsecurity THEN '✅ ENABLED' ELSE '❌ DISABLED' END as rls_status
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('tenant_licenses', 'push_tokens', 'notification_logs')
ORDER BY tablename;

-- 6. Count policies for each table
SELECT 
  tablename,
  COUNT(*) as policy_count,
  CASE 
    WHEN COUNT(*) >= 2 THEN '✅ GOOD'
    ELSE '⚠️ CHECK'
  END as status
FROM pg_policies 
WHERE schemaname = 'public'
AND tablename IN ('tenant_licenses', 'push_tokens', 'notification_logs')
GROUP BY tablename
ORDER BY tablename;

-- 7. List all policies (detailed)
SELECT 
  tablename,
  policyname,
  cmd as operation,
  CASE WHEN permissive = 'PERMISSIVE' THEN '✅' ELSE '⚠️' END as type
FROM pg_policies 
WHERE schemaname = 'public'
AND tablename IN ('tenant_licenses', 'push_tokens', 'notification_logs')
ORDER BY tablename, policyname;

-- 8. Check indexes exist
SELECT 
  tablename,
  indexname,
  '✅ EXISTS' as status
FROM pg_indexes
WHERE schemaname = 'public'
AND tablename IN ('tenant_licenses', 'push_tokens', 'notification_logs')
ORDER BY tablename, indexname;

-- 9. Check triggers exist
SELECT 
  event_object_table as table_name,
  trigger_name,
  '✅ EXISTS' as status
FROM information_schema.triggers
WHERE event_object_schema = 'public'
AND event_object_table IN ('tenant_licenses', 'push_tokens')
ORDER BY event_object_table, trigger_name;

-- 10. Check table structures
SELECT 
  table_name,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
AND table_name IN ('tenant_licenses', 'push_tokens', 'notification_logs')
ORDER BY table_name, ordinal_position;

-- 11. Test data insertion (will rollback - no permanent changes)
DO $$
BEGIN
  -- Test tenant_licenses
  BEGIN
    INSERT INTO tenant_licenses (tenant_id, plan, max_employers, max_apprentices)
    VALUES ('6ba71334-58f4-4104-9b2a-5114f2a7614c', 'starter', 5, 25);
    
    RAISE NOTICE '✅ tenant_licenses: INSERT works';
    
    -- Rollback this test
    RAISE EXCEPTION 'Rollback test data';
  EXCEPTION
    WHEN OTHERS THEN
      -- Expected - we're rolling back
      NULL;
  END;
END $$;

-- 12. Final Summary
SELECT 
  '=== MIGRATION STATUS ===' as summary,
  '' as details
UNION ALL
SELECT 
  'Tables Created' as summary,
  COUNT(*)::text || ' of 3' as details
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('tenant_licenses', 'push_tokens', 'notification_logs')
UNION ALL
SELECT 
  'Views Created' as summary,
  COUNT(*)::text || ' of 1' as details
FROM information_schema.views 
WHERE table_schema = 'public' 
AND table_name = 'license_usage'
UNION ALL
SELECT 
  'RLS Enabled' as summary,
  COUNT(*)::text || ' of 3' as details
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('tenant_licenses', 'push_tokens', 'notification_logs')
AND rowsecurity = true
UNION ALL
SELECT 
  'Policies Created' as summary,
  COUNT(*)::text as details
FROM pg_policies 
WHERE schemaname = 'public'
AND tablename IN ('tenant_licenses', 'push_tokens', 'notification_logs')
UNION ALL
SELECT 
  'Indexes Created' as summary,
  COUNT(*)::text as details
FROM pg_indexes
WHERE schemaname = 'public'
AND tablename IN ('tenant_licenses', 'push_tokens', 'notification_logs')
UNION ALL
SELECT 
  'Triggers Created' as summary,
  COUNT(*)::text || ' of 2' as details
FROM information_schema.triggers
WHERE event_object_schema = 'public'
AND event_object_table IN ('tenant_licenses', 'push_tokens');

-- ✅ If you see all green checkmarks above, migrations are successful!
-- ✅ Expected: 3 tables, 1 view, RLS enabled, multiple policies, indexes, and triggers
