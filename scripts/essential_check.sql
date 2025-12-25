-- ============================================================================
-- ESSENTIAL APPRENTICESHIP CHECK
-- ============================================================================
-- Run this to get the minimum info needed to proceed
-- Copy ALL results and paste to GitHub Issue #1383
-- ============================================================================

-- 1. Which tables exist?
SELECT 
  'shops' as table_name,
  CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'shops') 
    THEN 'EXISTS' ELSE 'MISSING' END as status,
  COALESCE((SELECT COUNT(*)::text FROM shops), '0') as row_count
UNION ALL
SELECT 'shop_staff', 
  CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'shop_staff') 
    THEN 'EXISTS' ELSE 'MISSING' END,
  COALESCE((SELECT COUNT(*)::text FROM shop_staff), '0')
UNION ALL
SELECT 'apprentice_placements',
  CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'apprentice_placements') 
    THEN 'EXISTS' ELSE 'MISSING' END,
  COALESCE((SELECT COUNT(*)::text FROM apprentice_placements), '0')
UNION ALL
SELECT 'apprentice_weekly_reports',
  CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'apprentice_weekly_reports') 
    THEN 'EXISTS' ELSE 'MISSING' END,
  COALESCE((SELECT COUNT(*)::text FROM apprentice_weekly_reports), '0')
UNION ALL
SELECT 'apprenticeship_enrollments',
  CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'apprenticeship_enrollments') 
    THEN 'EXISTS' ELSE 'MISSING' END,
  COALESCE((SELECT COUNT(*)::text FROM apprenticeship_enrollments), '0')
UNION ALL
SELECT 'apprentices',
  CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'apprentices') 
    THEN 'EXISTS' ELSE 'MISSING' END,
  COALESCE((SELECT COUNT(*)::text FROM apprentices), '0')
UNION ALL
SELECT 'employers',
  CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'employers') 
    THEN 'EXISTS' ELSE 'MISSING' END,
  COALESCE((SELECT COUNT(*)::text FROM employers), '0');

-- 2. RLS Status
SELECT 
  tablename as table_name,
  rowsecurity as rls_enabled,
  CASE 
    WHEN rowsecurity THEN '✅ ENABLED'
    ELSE '❌ DISABLED - SECURITY RISK'
  END as status
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
ORDER BY tablename;

-- 3. Key columns for apprenticeship_enrollments
SELECT 
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'apprenticeship_enrollments'
  AND column_name IN ('id', 'employer_id', 'student_id', 'program_id', 'status', 'total_hours_required', 'total_hours_completed')
ORDER BY ordinal_position;

-- 4. Key columns for apprentice_placements
SELECT 
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'apprentice_placements'
  AND column_name IN ('id', 'shop_id', 'student_id', 'program_slug', 'status', 'start_date')
ORDER BY ordinal_position;

-- 5. Foreign keys for apprenticeship_enrollments
SELECT
  kcu.column_name,
  ccu.table_name AS references_table,
  ccu.column_name AS references_column
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY'
  AND tc.table_schema = 'public'
  AND tc.table_name = 'apprenticeship_enrollments'
ORDER BY kcu.column_name;

-- 6. Foreign keys for apprentice_placements
SELECT
  kcu.column_name,
  ccu.table_name AS references_table,
  ccu.column_name AS references_column
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY'
  AND tc.table_schema = 'public'
  AND tc.table_name = 'apprentice_placements'
ORDER BY kcu.column_name;
