-- ============================================================================
-- RUN THIS NOW IN SUPABASE SQL EDITOR
-- ============================================================================
-- This fixes your applications table RLS policies
-- Copy this entire file and paste into Supabase SQL Editor, then click "Run"
-- ============================================================================

-- STEP 1: Drop ALL existing policies (including the blocking deny_all ones)
DROP POLICY IF EXISTS "deny_all" ON public.applications;
DROP POLICY IF EXISTS "deny_all_applications" ON public.applications;
DROP POLICY IF EXISTS "anyone_insert_applications" ON public.applications;
DROP POLICY IF EXISTS "admins_read_applications" ON public.applications;
DROP POLICY IF EXISTS "admins_update_applications" ON public.applications;
DROP POLICY IF EXISTS "admins can view applications" ON public.applications;
DROP POLICY IF EXISTS "admins can update applications" ON public.applications;
DROP POLICY IF EXISTS "admins can delete applications" ON public.applications;
DROP POLICY IF EXISTS "anon_insert_applications" ON public.applications;
DROP POLICY IF EXISTS "anon_can_insert_applications" ON public.applications;
DROP POLICY IF EXISTS "authenticated_admins_can_select_applications" ON public.applications;
DROP POLICY IF EXISTS "authenticated_admins_can_update_applications" ON public.applications;
DROP POLICY IF EXISTS "authenticated_admins_can_delete_applications" ON public.applications;

-- STEP 2: Create clean, secure policies

-- Policy 1: Anonymous users can INSERT applications (public form submission)
CREATE POLICY "anon_can_insert_applications"
  ON public.applications
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy 2: Authenticated admins can SELECT applications
CREATE POLICY "authenticated_admins_can_select_applications"
  ON public.applications
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin', 'staff')
    )
  );

-- Policy 3: Authenticated admins can UPDATE applications
CREATE POLICY "authenticated_admins_can_update_applications"
  ON public.applications
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin', 'staff')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin', 'staff')
    )
  );

-- Policy 4: Authenticated admins can DELETE applications
CREATE POLICY "authenticated_admins_can_delete_applications"
  ON public.applications
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin', 'staff')
    )
  );

-- STEP 3: Verify RLS is enabled
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- STEP 4: Verify policies were created
SELECT 
  policyname,
  cmd as command,
  roles
FROM pg_policies
WHERE schemaname = 'public'
AND tablename = 'applications'
ORDER BY policyname;

-- Expected output: 4 policies
-- 1. anon_can_insert_applications - INSERT - {anon}
-- 2. authenticated_admins_can_select_applications - SELECT - {authenticated}
-- 3. authenticated_admins_can_update_applications - UPDATE - {authenticated}
-- 4. authenticated_admins_can_delete_applications - DELETE - {authenticated}
