-- Verification Queries for RLS Policies
-- Run these to confirm policies are correct

-- ============================================================================
-- 1. Check which tables have RLS enabled
-- ============================================================================
SELECT 
  schemaname,
  tablename,
  rowsecurity AS rls_enabled,
  CASE 
    WHEN rowsecurity THEN 'RLS ON'
    ELSE 'RLS OFF'
  END AS status
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

-- ============================================================================
-- 2. List all RLS policies
-- ============================================================================
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- ============================================================================
-- 3. Check public catalog tables (should allow anon SELECT)
-- ============================================================================
SELECT 
  tablename,
  COUNT(*) FILTER (WHERE cmd = 'SELECT' AND 'public' = ANY(roles)) AS public_select_policies
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename IN ('programs', 'courses', 'modules', 'lessons', 'products')
GROUP BY tablename;

-- ============================================================================
-- 4. Test anon access to programs (should return rows)
-- ============================================================================
SET ROLE anon;
SELECT COUNT(*) AS visible_programs FROM public.programs WHERE is_active = true;
RESET ROLE;

-- ============================================================================
-- 5. Test anon access to courses (should return rows)
-- ============================================================================
SET ROLE anon;
SELECT COUNT(*) AS visible_courses FROM public.courses;
RESET ROLE;

-- ============================================================================
-- 6. Check for overly restrictive policies (deny_all)
-- ============================================================================
SELECT 
  schemaname,
  tablename,
  policyname
FROM pg_policies
WHERE policyname LIKE '%deny%'
  OR qual LIKE '%false%';

-- ============================================================================
-- 7. Verify student progress tables require auth
-- ============================================================================
SELECT 
  tablename,
  COUNT(*) FILTER (WHERE 'authenticated' = ANY(roles)) AS auth_required_policies
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename IN ('enrollments', 'lesson_progress', 'profiles')
GROUP BY tablename;

-- ============================================================================
-- 8. Check grants (anon should have SELECT on public catalog)
-- ============================================================================
SELECT 
  table_schema,
  table_name,
  privilege_type,
  grantee
FROM information_schema.table_privileges
WHERE table_schema = 'public'
  AND table_name IN ('programs', 'courses', 'modules', 'lessons')
  AND grantee IN ('anon', 'authenticated', 'service_role')
ORDER BY table_name, grantee;
