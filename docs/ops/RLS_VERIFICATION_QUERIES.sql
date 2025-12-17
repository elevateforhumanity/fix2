-- ============================================
-- RLS VERIFICATION QUERIES
-- Run these in Supabase SQL Editor after applying 009_rls_hardening_pack.sql
-- ============================================

-- ============================================
-- 1) TABLES WITHOUT RLS (Should be 0 or only public tables)
-- ============================================
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
  AND rowsecurity = false
  AND tablename NOT IN ('cip_codes', 'soc_codes', 'states', 'countries', 'timezones')
ORDER BY tablename;

-- Expected: 0 rows (or only intentionally public tables)
-- If any sensitive tables appear, they need RLS enabled


-- ============================================
-- 2) PERMISSIVE POLICIES (Should be 0 on sensitive tables)
-- ============================================
SELECT tablename, policyname, qual, with_check
FROM pg_policies
WHERE schemaname = 'public'
  AND qual = 'true'
  AND tablename NOT IN ('cip_codes', 'soc_codes', 'states', 'countries', 'timezones')
ORDER BY tablename, policyname;

-- Expected: 0 rows
-- USING(true) policies allow unrestricted access - security risk


-- ============================================
-- 3) TABLES WITH RLS BUT NO POLICIES (Lockout risk)
-- ============================================
SELECT t.tablename
FROM pg_tables t
WHERE t.schemaname = 'public'
  AND t.rowsecurity = true
  AND NOT EXISTS (
    SELECT 1 FROM pg_policies p
    WHERE p.schemaname = t.schemaname
      AND p.tablename = t.tablename
  )
ORDER BY t.tablename;

-- Expected: 0 rows
-- RLS enabled without policies = nobody can access (even admins)


-- ============================================
-- 4) VERIFY HELPER FUNCTIONS EXIST
-- ============================================
SELECT routine_name, routine_type
FROM information_schema.routines
WHERE routine_schema = 'public'
  AND routine_name IN (
    '_is_org_member',
    '_is_org_admin',
    '_is_super_admin',
    'get_org_invite_by_token'
  )
ORDER BY routine_name;

-- Expected: 4 functions
-- These are used by RLS policies for org isolation


-- ============================================
-- 5) VERIFY ORG_INVITES POLICIES
-- ============================================
SELECT policyname, cmd, qual, with_check
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename = 'org_invites'
ORDER BY policyname;

-- Expected policies:
-- - org_admins_manage_invites (ALL)
-- - org_admins_view_invites (SELECT)
-- Should NOT have any USING(true) policies


-- ============================================
-- 6) VERIFY AUDIT_LOGS POLICIES
-- ============================================
SELECT policyname, cmd, roles, qual, with_check
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename = 'audit_logs'
ORDER BY policyname;

-- Expected policies:
-- - service_role_insert_audit_logs (INSERT, service_role)
-- - super_admin_view_audit_logs (SELECT, authenticated)


-- ============================================
-- 7) VERIFY SYSTEM_ERRORS POLICIES
-- ============================================
SELECT policyname, cmd, roles, qual, with_check
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename = 'system_errors'
ORDER BY policyname;

-- Expected policies:
-- - service_role_insert_system_errors (INSERT, service_role)
-- - super_admin_view_system_errors (SELECT, authenticated)


-- ============================================
-- 8) LIST ALL POLICIES BY TABLE (Overview)
-- ============================================
SELECT 
  tablename,
  COUNT(*) as policy_count,
  array_agg(policyname ORDER BY policyname) as policies
FROM pg_policies
WHERE schemaname = 'public'
GROUP BY tablename
ORDER BY tablename;

-- Review: Each sensitive table should have appropriate policies


-- ============================================
-- 9) VERIFY ORGANIZATION_USERS TABLE EXISTS
-- ============================================
SELECT EXISTS (
  SELECT 1 FROM information_schema.tables
  WHERE table_schema = 'public'
    AND table_name = 'organization_users'
) as organization_users_exists;

-- Expected: true
-- This is the RBAC table used by helper functions


-- ============================================
-- 10) CHECK FOR OLD organization_members REFERENCES
-- ============================================
SELECT 
  tablename,
  policyname,
  qual
FROM pg_policies
WHERE schemaname = 'public'
  AND (
    qual LIKE '%organization_members%'
    OR with_check LIKE '%organization_members%'
  )
ORDER BY tablename, policyname;

-- Expected: 0 rows
-- All policies should use organization_users, not organization_members


-- ============================================
-- 11) VERIFY ORG-SCOPED POLICIES PATTERN
-- ============================================
SELECT 
  tablename,
  policyname,
  cmd,
  CASE 
    WHEN qual LIKE '%_is_org_member%' THEN 'org_member'
    WHEN qual LIKE '%_is_org_admin%' THEN 'org_admin'
    WHEN qual LIKE '%_is_super_admin%' THEN 'super_admin'
    WHEN qual LIKE '%auth.uid()%' THEN 'user_owned'
    ELSE 'other'
  END as policy_type
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename IN (
    'organizations',
    'organization_users',
    'organization_settings',
    'students',
    'enrollments',
    'certificates'
  )
ORDER BY tablename, policyname;

-- Review: Verify policies use correct helper functions


-- ============================================
-- 12) TEST ORG ISOLATION (Requires test data)
-- ============================================
-- This query should be run as different users to verify isolation
-- Replace USER_ID_1 and USER_ID_2 with actual test user IDs

-- As User 1 (should only see their org's data)
-- SET request.jwt.claims TO '{"sub": "USER_ID_1"}';
-- SELECT COUNT(*) FROM students;

-- As User 2 (should only see their org's data, different from User 1)
-- SET request.jwt.claims TO '{"sub": "USER_ID_2"}';
-- SELECT COUNT(*) FROM students;

-- Expected: Different counts, no overlap


-- ============================================
-- 13) VERIFY NO SENSITIVE DATA IN PUBLIC POLICIES
-- ============================================
SELECT 
  tablename,
  policyname,
  qual,
  with_check
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename IN (
    'students',
    'student_documents',
    'student_grades',
    'hr_documents',
    'payroll_cards'
  )
ORDER BY tablename, policyname;

-- Review: FERPA and sensitive data should have strict policies


-- ============================================
-- SUMMARY CHECKLIST
-- ============================================
-- [ ] All sensitive tables have RLS enabled
-- [ ] No USING(true) policies on sensitive tables
-- [ ] No tables with RLS but missing policies
-- [ ] Helper functions exist and are correct
-- [ ] org_invites uses RPC for token access
-- [ ] audit_logs and system_errors have service role insert
-- [ ] All policies use organization_users (not organization_members)
-- [ ] Org isolation verified with test users
-- [ ] FERPA tables have appropriate restrictions
