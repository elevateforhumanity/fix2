-- ============================================================================
-- DASHBOARD CONSOLIDATION MIGRATION
-- ============================================================================
-- Purpose: Fix schema drift and prepare database for dashboard consolidation
-- Date: 2024-12-24
-- Context: Database proof showed profiles.role is TEXT (not enum), migrations
--          not applied, and only 4 roles have actual users
-- ============================================================================

-- ============================================================================
-- PART 1: FIX SCHEMA DRIFT - Convert role from TEXT to ENUM
-- ============================================================================

-- Step 1: Verify current state
DO $$ 
BEGIN
  RAISE NOTICE 'Current profiles.role data type: %', 
    (SELECT data_type FROM information_schema.columns 
     WHERE table_name='profiles' AND column_name='role');
END $$;

-- Step 2: Add missing enum values to user_role
-- (These may already exist from previous migrations, so we check first)
DO $$ 
BEGIN
  -- Add 'staff' if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'staff' AND enumtypid = 'user_role'::regtype) THEN
    ALTER TYPE user_role ADD VALUE 'staff';
    RAISE NOTICE 'Added staff to user_role enum';
  END IF;

  -- Add 'employer' if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'employer' AND enumtypid = 'user_role'::regtype) THEN
    ALTER TYPE user_role ADD VALUE 'employer';
    RAISE NOTICE 'Added employer to user_role enum';
  END IF;

  -- Add 'super_admin' if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'super_admin' AND enumtypid = 'user_role'::regtype) THEN
    ALTER TYPE user_role ADD VALUE 'super_admin';
    RAISE NOTICE 'Added super_admin to user_role enum';
  END IF;

  -- Add 'org_admin' if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'org_admin' AND enumtypid = 'user_role'::regtype) THEN
    ALTER TYPE user_role ADD VALUE 'org_admin';
    RAISE NOTICE 'Added org_admin to user_role enum';
  END IF;

  -- Add 'board_member' if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'board_member' AND enumtypid = 'user_role'::regtype) THEN
    ALTER TYPE user_role ADD VALUE 'board_member';
    RAISE NOTICE 'Added board_member to user_role enum';
  END IF;

  -- Add 'workforce_board' if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'workforce_board' AND enumtypid = 'user_role'::regtype) THEN
    ALTER TYPE user_role ADD VALUE 'workforce_board';
    RAISE NOTICE 'Added workforce_board to user_role enum';
  END IF;

  -- Add 'parent' if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'parent' AND enumtypid = 'user_role'::regtype) THEN
    ALTER TYPE user_role ADD VALUE 'parent';
    RAISE NOTICE 'Added parent to user_role enum';
  END IF;
END $$;

-- Step 3: Convert profiles.role from TEXT to user_role enum
-- IMPORTANT: This will fail if any role values exist that aren't in the enum
-- Check first what values exist:
DO $$
DECLARE
  invalid_roles TEXT;
BEGIN
  SELECT string_agg(DISTINCT role, ', ')
  INTO invalid_roles
  FROM profiles
  WHERE role IS NOT NULL
    AND role NOT IN (
      SELECT enumlabel::text FROM pg_enum WHERE enumtypid = 'user_role'::regtype
    );
  
  IF invalid_roles IS NOT NULL THEN
    RAISE EXCEPTION 'Cannot convert profiles.role to enum. Invalid role values found: %', invalid_roles;
  END IF;
  
  RAISE NOTICE 'All role values are valid enum values. Safe to convert.';
END $$;

-- Now perform the conversion
ALTER TABLE profiles 
ALTER COLUMN role TYPE user_role USING role::user_role;

COMMENT ON COLUMN profiles.role IS 'User role (enum type). Converted from TEXT to user_role enum on 2024-12-24.';

-- ============================================================================
-- PART 2: ADD MISSING COLUMNS FOR DASHBOARD FEATURES
-- ============================================================================

-- Add course_id to enrollments (for LMS course flow)
ALTER TABLE enrollments 
ADD COLUMN IF NOT EXISTS course_id UUID REFERENCES courses(id);

CREATE INDEX IF NOT EXISTS idx_enrollments_course_id 
ON enrollments(course_id);

CREATE INDEX IF NOT EXISTS idx_enrollments_user_course 
ON enrollments(user_id, course_id);

COMMENT ON COLUMN enrollments.course_id IS 'Course ID for LMS course enrollments. Added 2024-12-24 for dashboard consolidation.';

-- Add dashboard-related tracking columns to profiles
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS last_dashboard_visit TIMESTAMPTZ;

ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS preferred_dashboard TEXT;

COMMENT ON COLUMN profiles.last_dashboard_visit IS 'Last time user visited their dashboard. Used for analytics.';
COMMENT ON COLUMN profiles.preferred_dashboard IS 'User preferred dashboard route (if they have multiple roles).';

-- ============================================================================
-- PART 3: CREATE DASHBOARD ANALYTICS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS dashboard_visits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  dashboard_route TEXT NOT NULL,
  visited_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  session_duration_seconds INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_dashboard_visits_user 
ON dashboard_visits(user_id, visited_at DESC);

CREATE INDEX IF NOT EXISTS idx_dashboard_visits_route 
ON dashboard_visits(dashboard_route, visited_at DESC);

COMMENT ON TABLE dashboard_visits IS 'Tracks dashboard visits for analytics and usage patterns.';

-- ============================================================================
-- PART 4: CREATE LEGACY ROUTE REDIRECTS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS dashboard_redirects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  legacy_route TEXT NOT NULL UNIQUE,
  canonical_route TEXT NOT NULL,
  redirect_type TEXT NOT NULL CHECK (redirect_type IN ('permanent', 'temporary')),
  reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deprecated_at TIMESTAMPTZ
);

-- Insert known legacy redirects
INSERT INTO dashboard_redirects (legacy_route, canonical_route, redirect_type, reason) VALUES
  ('/portal/staff/dashboard', '/staff-portal/dashboard', 'permanent', 'Staff portal consolidation'),
  ('/portal/student/dashboard', '/lms/dashboard', 'permanent', 'Student dashboard is now LMS dashboard'),
  ('/student/dashboard', '/lms/dashboard', 'permanent', 'Student dashboard is now LMS dashboard'),
  ('/partner/dashboard', '/program-holder/dashboard', 'permanent', 'Partner routes to program holder'),
  ('/(partner)/partners/dashboard', '/program-holder/dashboard', 'permanent', 'Partner routes to program holder')
ON CONFLICT (legacy_route) DO NOTHING;

COMMENT ON TABLE dashboard_redirects IS 'Maps legacy dashboard routes to canonical routes for redirect implementation.';

-- ============================================================================
-- PART 5: ADD ROLE-BASED ACCESS CONTROL HELPERS
-- ============================================================================

-- Function to check if user has access to a dashboard
CREATE OR REPLACE FUNCTION user_can_access_dashboard(
  p_user_id UUID,
  p_dashboard_route TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_role user_role;
BEGIN
  -- Get user role
  SELECT role INTO v_user_role
  FROM profiles
  WHERE id = p_user_id;
  
  -- Check access based on role and route
  RETURN CASE
    WHEN p_dashboard_route = '/admin/dashboard' THEN 
      v_user_role IN ('admin', 'super_admin', 'org_admin')
    WHEN p_dashboard_route = '/staff-portal/dashboard' THEN 
      v_user_role = 'staff'
    WHEN p_dashboard_route = '/instructor/dashboard' THEN 
      v_user_role = 'instructor'
    WHEN p_dashboard_route = '/program-holder/dashboard' THEN 
      v_user_role = 'program_holder'
    WHEN p_dashboard_route = '/employer/dashboard' THEN 
      v_user_role = 'employer'
    WHEN p_dashboard_route = '/lms/dashboard' THEN 
      v_user_role = 'student' OR v_user_role IS NULL
    ELSE FALSE
  END;
END;
$$;

COMMENT ON FUNCTION user_can_access_dashboard IS 'Checks if user has permission to access a specific dashboard route.';

-- ============================================================================
-- PART 6: DATA CLEANUP AND VALIDATION
-- ============================================================================

-- Report on current role distribution
DO $$
DECLARE
  role_stats RECORD;
BEGIN
  RAISE NOTICE '=== ROLE DISTRIBUTION AFTER MIGRATION ===';
  FOR role_stats IN 
    SELECT role, COUNT(*) as count
    FROM profiles
    WHERE role IS NOT NULL
    GROUP BY role
    ORDER BY count DESC
  LOOP
    RAISE NOTICE 'Role: %, Count: %', role_stats.role, role_stats.count;
  END LOOP;
END $$;

-- Validate no orphaned dashboard data
DO $$
DECLARE
  orphan_count INTEGER;
BEGIN
  -- Check for enrollments without valid users
  SELECT COUNT(*) INTO orphan_count
  FROM enrollments e
  LEFT JOIN profiles p ON e.user_id = p.id
  WHERE p.id IS NULL;
  
  IF orphan_count > 0 THEN
    RAISE WARNING 'Found % enrollments with invalid user_id', orphan_count;
  END IF;
END $$;

-- ============================================================================
-- PART 7: UPDATE RLS POLICIES FOR DASHBOARD ACCESS
-- ============================================================================

-- Enable RLS on dashboard_visits
ALTER TABLE dashboard_visits ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own dashboard visits
CREATE POLICY dashboard_visits_select_own
ON dashboard_visits
FOR SELECT
USING (auth.uid() = user_id);

-- Policy: Users can insert their own dashboard visits
CREATE POLICY dashboard_visits_insert_own
ON dashboard_visits
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Policy: Admins can see all dashboard visits
CREATE POLICY dashboard_visits_admin_all
ON dashboard_visits
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role IN ('admin', 'super_admin')
  )
);

-- ============================================================================
-- VERIFICATION QUERIES (Run these manually to verify migration)
-- ============================================================================

-- Query 1: Verify role is now enum type
-- SELECT column_name, data_type, udt_name
-- FROM information_schema.columns
-- WHERE table_name = 'profiles' AND column_name = 'role';

-- Query 2: Verify all enum values exist
-- SELECT enumlabel FROM pg_enum WHERE enumtypid = 'user_role'::regtype ORDER BY enumsortorder;

-- Query 3: Verify role distribution
-- SELECT role, COUNT(*) FROM profiles WHERE role IS NOT NULL GROUP BY role ORDER BY COUNT(*) DESC;

-- Query 4: Verify course_id column exists
-- SELECT column_name FROM information_schema.columns WHERE table_name = 'enrollments' AND column_name = 'course_id';

-- Query 5: Verify dashboard redirects
-- SELECT * FROM dashboard_redirects ORDER BY legacy_route;

-- ============================================================================
-- ROLLBACK INSTRUCTIONS (if needed)
-- ============================================================================

-- To rollback this migration:
-- 1. Convert role back to TEXT:
--    ALTER TABLE profiles ALTER COLUMN role TYPE TEXT;
-- 
-- 2. Drop new columns:
--    ALTER TABLE profiles DROP COLUMN last_dashboard_visit;
--    ALTER TABLE profiles DROP COLUMN preferred_dashboard;
--    ALTER TABLE enrollments DROP COLUMN course_id;
-- 
-- 3. Drop new tables:
--    DROP TABLE dashboard_visits;
--    DROP TABLE dashboard_redirects;
-- 
-- 4. Drop function:
--    DROP FUNCTION user_can_access_dashboard;

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================

DO $$
BEGIN
  RAISE NOTICE '=== DASHBOARD CONSOLIDATION MIGRATION COMPLETE ===';
  RAISE NOTICE 'Next steps:';
  RAISE NOTICE '1. Run verification queries above';
  RAISE NOTICE '2. Test dashboard routing with each role';
  RAISE NOTICE '3. Verify RLS policies are working';
  RAISE NOTICE '4. Monitor dashboard_visits table for analytics';
END $$;
