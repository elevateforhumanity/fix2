-- ============================================================================
-- CURRENT STATE: Apprenticeship/Shop/Employer Database Truth
-- ============================================================================
-- Purpose: Document what exists NOW in the database for apprenticeship flows
-- Run this in Supabase SQL Editor and paste results into GitHub Issue #1383
-- ============================================================================

-- ============================================================================
-- SECTION A: TABLE INVENTORY + ROW COUNTS
-- ============================================================================

DO $$
DECLARE
  table_name TEXT;
  row_count BIGINT;
  tables TEXT[] := ARRAY[
    'shops',
    'shop_staff', 
    'apprentice_placements',
    'apprentice_weekly_reports',
    'apprenticeship_enrollments',
    'apprentices',
    'employers'
  ];
BEGIN
  RAISE NOTICE '============================================================================';
  RAISE NOTICE 'SECTION A: TABLE INVENTORY + ROW COUNTS';
  RAISE NOTICE '============================================================================';
  RAISE NOTICE '';
  
  FOREACH table_name IN ARRAY tables
  LOOP
    BEGIN
      EXECUTE format('SELECT COUNT(*) FROM %I', table_name) INTO row_count;
      RAISE NOTICE 'Table: % | Exists: YES | Row Count: %', table_name, row_count;
    EXCEPTION WHEN undefined_table THEN
      RAISE NOTICE 'Table: % | Exists: NO', table_name;
    END;
  END LOOP;
  
  RAISE NOTICE '';
END $$;

-- ============================================================================
-- SECTION B: COLUMN LISTS FOR EACH TABLE
-- ============================================================================

DO $$
DECLARE
  table_rec RECORD;
  col_rec RECORD;
  tables TEXT[] := ARRAY[
    'shops',
    'shop_staff',
    'apprentice_placements',
    'apprentice_weekly_reports',
    'apprenticeship_enrollments',
    'apprentices',
    'employers'
  ];
  table_name TEXT;
BEGIN
  RAISE NOTICE '============================================================================';
  RAISE NOTICE 'SECTION B: COLUMN LISTS';
  RAISE NOTICE '============================================================================';
  RAISE NOTICE '';
  
  FOREACH table_name IN ARRAY tables
  LOOP
    IF EXISTS (
      SELECT 1 FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name = table_rec.table_name
    ) THEN
      RAISE NOTICE 'Table: %', table_name;
      RAISE NOTICE '----------------------------------------';
      
      FOR col_rec IN 
        SELECT 
          column_name,
          data_type,
          is_nullable,
          column_default
        FROM information_schema.columns
        WHERE table_schema = 'public' 
        AND table_name = table_rec.table_name
        ORDER BY ordinal_position
      LOOP
        RAISE NOTICE '  - % | Type: % | Nullable: % | Default: %',
          col_rec.column_name,
          col_rec.data_type,
          col_rec.is_nullable,
          COALESCE(col_rec.column_default, 'NULL');
      END LOOP;
      
      RAISE NOTICE '';
    END IF;
  END LOOP;
END $$;

-- Alternative: Direct SELECT for easier reading
SELECT 
  'shops' as table_name,
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'shops'
ORDER BY ordinal_position;

SELECT 
  'shop_staff' as table_name,
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'shop_staff'
ORDER BY ordinal_position;

SELECT 
  'apprentice_placements' as table_name,
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'apprentice_placements'
ORDER BY ordinal_position;

SELECT 
  'apprentice_weekly_reports' as table_name,
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'apprentice_weekly_reports'
ORDER BY ordinal_position;

SELECT 
  'apprenticeship_enrollments' as table_name,
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'apprenticeship_enrollments'
ORDER BY ordinal_position;

SELECT 
  'apprentices' as table_name,
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'apprentices'
ORDER BY ordinal_position;

SELECT 
  'employers' as table_name,
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'employers'
ORDER BY ordinal_position;

-- ============================================================================
-- SECTION C: FOREIGN KEY RELATIONSHIPS
-- ============================================================================

SELECT
  'FOREIGN KEYS' as section,
  tc.table_name,
  kcu.column_name,
  ccu.table_name AS foreign_table_name,
  ccu.column_name AS foreign_column_name,
  tc.constraint_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
  AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
  AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY'
  AND tc.table_schema = 'public'
  AND tc.table_name IN (
    'shops',
    'shop_staff',
    'apprentice_placements',
    'apprentice_weekly_reports',
    'apprenticeship_enrollments',
    'apprentices',
    'employers'
  )
ORDER BY tc.table_name, kcu.column_name;

-- ============================================================================
-- SECTION D: RLS STATUS (ENABLED/DISABLED)
-- ============================================================================

SELECT
  'RLS STATUS' as section,
  schemaname,
  tablename,
  rowsecurity as rls_enabled
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

-- ============================================================================
-- SECTION E: RLS POLICIES (ALL DETAILS)
-- ============================================================================

SELECT
  'RLS POLICIES' as section,
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual as using_expression,
  with_check as with_check_expression
FROM pg_policies
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
ORDER BY tablename, policyname;

-- ============================================================================
-- SECTION F: KNOWN GOTCHAS VERIFICATION
-- ============================================================================

-- Verify shop_staff.user_id references auth.users (not profiles)
SELECT
  'GOTCHA CHECK: shop_staff.user_id' as check_name,
  ccu.table_name AS references_table,
  ccu.column_name AS references_column,
  CASE 
    WHEN ccu.table_name = 'users' THEN '✅ CORRECT (auth.users)'
    WHEN ccu.table_name = 'profiles' THEN '❌ WRONG (should be auth.users)'
    ELSE '⚠️ UNEXPECTED'
  END as status
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY'
  AND tc.table_name = 'shop_staff'
  AND kcu.column_name = 'user_id';

-- Verify apprentice_weekly_reports.submitted_by_user_id references auth.users
SELECT
  'GOTCHA CHECK: apprentice_weekly_reports.submitted_by_user_id' as check_name,
  ccu.table_name AS references_table,
  ccu.column_name AS references_column,
  CASE 
    WHEN ccu.table_name = 'users' THEN '✅ CORRECT (auth.users)'
    WHEN ccu.table_name = 'profiles' THEN '❌ WRONG (should be auth.users)'
    ELSE '⚠️ UNEXPECTED'
  END as status
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY'
  AND tc.table_name = 'apprentice_weekly_reports'
  AND kcu.column_name = 'submitted_by_user_id';

-- Verify apprentice_placements.student_id references profiles
SELECT
  'GOTCHA CHECK: apprentice_placements.student_id' as check_name,
  ccu.table_name AS references_table,
  ccu.column_name AS references_column,
  CASE 
    WHEN ccu.table_name = 'profiles' THEN '✅ CORRECT (profiles)'
    WHEN ccu.table_name = 'users' THEN '❌ WRONG (should be profiles)'
    ELSE '⚠️ UNEXPECTED'
  END as status
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY'
  AND tc.table_name = 'apprentice_placements'
  AND kcu.column_name = 'student_id';

-- Verify apprentices.employer_id references employers (if tables exist)
SELECT
  'GOTCHA CHECK: apprentices.employer_id' as check_name,
  ccu.table_name AS references_table,
  ccu.column_name AS references_column,
  CASE 
    WHEN ccu.table_name = 'employers' THEN '✅ CORRECT (employers)'
    ELSE '⚠️ UNEXPECTED'
  END as status
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY'
  AND tc.table_name = 'apprentices'
  AND kcu.column_name = 'employer_id';

-- Check if employers table has RLS disabled (security risk)
SELECT
  'SECURITY CHECK: employers RLS' as check_name,
  tablename,
  rowsecurity as rls_enabled,
  CASE 
    WHEN rowsecurity = false THEN '❌ SECURITY RISK: RLS DISABLED'
    WHEN rowsecurity = true THEN '✅ RLS ENABLED'
  END as status
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename = 'employers';

-- ============================================================================
-- SECTION G: SAMPLE DATA (FIRST 3 ROWS OF EACH TABLE)
-- ============================================================================

-- Only run if you want to see actual data (comment out if sensitive)
-- SELECT 'shops SAMPLE' as section, * FROM shops LIMIT 3;
-- SELECT 'shop_staff SAMPLE' as section, * FROM shop_staff LIMIT 3;
-- SELECT 'apprentice_placements SAMPLE' as section, * FROM apprentice_placements LIMIT 3;
-- SELECT 'apprentice_weekly_reports SAMPLE' as section, * FROM apprentice_weekly_reports LIMIT 3;
-- SELECT 'apprenticeship_enrollments SAMPLE' as section, * FROM apprenticeship_enrollments LIMIT 3;
-- SELECT 'apprentices SAMPLE' as section, * FROM apprentices LIMIT 3;
-- SELECT 'employers SAMPLE' as section, * FROM employers LIMIT 3;

-- ============================================================================
-- SECTION H: RELATIONSHIP SUMMARY
-- ============================================================================

DO $$
BEGIN
  RAISE NOTICE '============================================================================';
  RAISE NOTICE 'SECTION H: RELATIONSHIP SUMMARY';
  RAISE NOTICE '============================================================================';
  RAISE NOTICE '';
  RAISE NOTICE 'Expected Relationships:';
  RAISE NOTICE '  shop_staff.user_id → auth.users(id)';
  RAISE NOTICE '  shop_staff.shop_id → shops(id)';
  RAISE NOTICE '  apprentice_placements.shop_id → shops(id)';
  RAISE NOTICE '  apprentice_placements.student_id → profiles(id)';
  RAISE NOTICE '  apprentice_placements.supervisor_user_id → auth.users(id)';
  RAISE NOTICE '  apprentice_weekly_reports.placement_id → apprentice_placements(id)';
  RAISE NOTICE '  apprentice_weekly_reports.submitted_by_user_id → auth.users(id)';
  RAISE NOTICE '  apprenticeship_enrollments.student_id → profiles(id)';
  RAISE NOTICE '  apprenticeship_enrollments.employer_id → profiles(id) [ASSUMED]';
  RAISE NOTICE '  apprentices.employer_id → employers(id)';
  RAISE NOTICE '';
  RAISE NOTICE 'Run the FK query above to verify actual relationships.';
  RAISE NOTICE '';
END $$;

-- ============================================================================
-- INSTRUCTIONS FOR USE
-- ============================================================================

DO $$
BEGIN
  RAISE NOTICE '============================================================================';
  RAISE NOTICE 'INSTRUCTIONS';
  RAISE NOTICE '============================================================================';
  RAISE NOTICE '';
  RAISE NOTICE '1. Copy ALL output from this script';
  RAISE NOTICE '2. Paste into GitHub Issue #1383 as a comment';
  RAISE NOTICE '3. Use this data to complete docs/current-state-apprenticeship.md';
  RAISE NOTICE '4. Do NOT proceed with implementation until truth packet is complete';
  RAISE NOTICE '';
  RAISE NOTICE 'If you see errors like "relation does not exist", that table is missing.';
  RAISE NOTICE 'Document which tables exist and which are missing.';
  RAISE NOTICE '';
END $$;
