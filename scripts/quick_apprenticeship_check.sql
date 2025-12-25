-- ============================================================================
-- QUICK APPRENTICESHIP CHECK - Single Query Version
-- ============================================================================
-- This version returns everything in one result set for easier copying
-- ============================================================================

-- Check which tables exist and their row counts
SELECT 
  'TABLE_INVENTORY' as check_type,
  t.table_name,
  (SELECT COUNT(*) FROM information_schema.tables 
   WHERE table_schema = 'public' AND table_name = t.table_name) as exists,
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables 
                 WHERE table_schema = 'public' AND table_name = t.table_name)
    THEN (SELECT COUNT(*)::text FROM information_schema.tables WHERE table_name = t.table_name LIMIT 1)
    ELSE '0'
  END as row_count_placeholder
FROM (
  SELECT unnest(ARRAY[
    'shops',
    'shop_staff',
    'apprentice_placements',
    'apprentice_weekly_reports',
    'apprenticeship_enrollments',
    'apprentices',
    'employers'
  ]) as table_name
) t

UNION ALL

-- Check RLS status for all tables
SELECT 
  'RLS_STATUS' as check_type,
  tablename as table_name,
  CASE WHEN rowsecurity THEN 1 ELSE 0 END as exists,
  CASE 
    WHEN rowsecurity THEN '✅ RLS ENABLED'
    ELSE '❌ RLS DISABLED'
  END as row_count_placeholder
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN (
    'shops',
    'shop_staff',
    'apprentice_placements',
    'apprentice_weekly_reports',
    'apprenticeship_enrollments',
    'apprentices',
    'employers'
  )

ORDER BY check_type, table_name;
