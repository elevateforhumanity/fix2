-- Schema Verification Queries
-- Run these in Supabase SQL Editor to verify core tables exist

-- 1. Core organization tables
SELECT 'organizations' as table_name, COUNT(*) as row_count FROM organizations
UNION ALL
SELECT 'organization_users', COUNT(*) FROM organization_users
UNION ALL
SELECT 'organization_settings', COUNT(*) FROM organization_settings
UNION ALL
SELECT 'org_invites', COUNT(*) FROM org_invites
UNION ALL
SELECT 'organization_subscriptions', COUNT(*) FROM organization_subscriptions;

-- 2. Verify RLS enabled on critical tables
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN (
    'organizations',
    'organization_users', 
    'organization_settings',
    'org_invites',
    'audit_logs',
    'system_errors'
  )
ORDER BY tablename;

-- 3. Verify helper functions exist
SELECT routine_name 
FROM information_schema.routines 
WHERE routine_schema = 'public' 
  AND routine_name IN (
    '_is_org_member',
    '_is_org_admin',
    '_is_super_admin',
    'get_org_invite_by_token'
  )
ORDER BY routine_name;

-- 4. Verify policies on org_invites (should NOT have USING(true))
SELECT policyname, cmd, qual 
FROM pg_policies 
WHERE schemaname = 'public' 
  AND tablename = 'org_invites'
ORDER BY policyname;

-- Expected results:
-- - All tables exist with RLS enabled
-- - 4 helper functions present
-- - org_invites has admin-only policies (no USING(true))
