-- ============================================================================
-- REQUIRED DATABASE PROOF QUERIES
-- ============================================================================
-- Purpose: Verify actual database state before implementing dashboard routing
-- Instructions: Run these queries in Supabase SQL Editor and paste results
-- ============================================================================

-- QUERY 1: What roles actually exist in the database?
-- This tells us which role values are in use and how many users have each role
SELECT 
  role, 
  COUNT(*) as user_count 
FROM profiles 
WHERE role IS NOT NULL 
GROUP BY role 
ORDER BY role;

-- QUERY 2: What columns exist in profiles table?
-- This confirms the actual schema structure
SELECT 
  column_name, 
  data_type,
  is_nullable
FROM information_schema.columns 
WHERE table_schema='public' 
  AND table_name='profiles' 
ORDER BY ordinal_position;

-- QUERY 3: What columns exist in enrollments table?
-- This confirms enrollment tracking structure
SELECT 
  column_name, 
  data_type,
  is_nullable
FROM information_schema.columns 
WHERE table_schema='public' 
  AND table_name='enrollments' 
ORDER BY ordinal_position;

-- QUERY 4: What is the actual user_role enum definition?
-- This shows the allowed role values at the database level
SELECT 
  enumlabel as role_value,
  enumsortorder as sort_order
FROM pg_enum
WHERE enumtypid = 'user_role'::regtype
ORDER BY enumsortorder;

-- QUERY 5: Check for partner-related data
-- This tells us if "partner" exists in any form
SELECT 
  'profiles.role' as source,
  COUNT(*) as count
FROM profiles 
WHERE role::text = 'partner'
UNION ALL
SELECT 
  'program_holders table exists' as source,
  COUNT(*) as count
FROM information_schema.tables
WHERE table_schema='public' 
  AND table_name='program_holders'
UNION ALL
SELECT 
  'employers table exists' as source,
  COUNT(*) as count
FROM information_schema.tables
WHERE table_schema='public' 
  AND table_name='employers';

-- ============================================================================
-- INSTRUCTIONS FOR RUNNING
-- ============================================================================
-- 1. Open Supabase Dashboard → SQL Editor
-- 2. Copy/paste each query above (one at a time or all together)
-- 3. Run and copy the results
-- 4. Paste results into: docs/database-proof-results.md
-- 
-- DO NOT proceed with dashboard routing changes until these results are verified.
-- ============================================================================
