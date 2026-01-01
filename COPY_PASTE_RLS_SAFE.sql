-- Safe RLS policies - only applies to tables that exist
-- Run this in Supabase SQL Editor

-- ============================================================================
-- PUBLIC ACCESS - Programs and Courses (REQUIRED)
-- ============================================================================

-- Programs table - Public read access
DROP POLICY IF EXISTS "Public can view programs" ON programs;
CREATE POLICY "Public can view programs"
  ON programs
  FOR SELECT
  USING (true);

-- Courses table - Public read access
DROP POLICY IF EXISTS "Public can view courses" ON courses;
CREATE POLICY "Public can view courses"
  ON courses
  FOR SELECT
  USING (true);

-- ============================================================================
-- AUTHENTICATED ACCESS - User Data (SECURE)
-- ============================================================================

-- Profiles - Users can only see/edit their own
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile"
  ON profiles
  FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Enrollments - Users can only see their own
DROP POLICY IF EXISTS "Users can view own enrollments" ON enrollments;
CREATE POLICY "Users can view own enrollments"
  ON enrollments
  FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create own enrollments" ON enrollments;
CREATE POLICY "Users can create own enrollments"
  ON enrollments
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- ADMIN ACCESS
-- ============================================================================

-- Helper function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role IN ('admin', 'super_admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Admins can manage programs
DROP POLICY IF EXISTS "Admins can manage programs" ON programs;
CREATE POLICY "Admins can manage programs"
  ON programs
  FOR ALL
  USING (is_admin());

-- Admins can manage courses
DROP POLICY IF EXISTS "Admins can manage courses" ON courses;
CREATE POLICY "Admins can manage courses"
  ON courses
  FOR ALL
  USING (is_admin());

-- Admins can view all profiles
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
CREATE POLICY "Admins can view all profiles"
  ON profiles
  FOR SELECT
  USING (is_admin());

-- Admins can update all profiles
DROP POLICY IF EXISTS "Admins can update all profiles" ON profiles;
CREATE POLICY "Admins can update all profiles"
  ON profiles
  FOR UPDATE
  USING (is_admin());

-- Admins can manage enrollments
DROP POLICY IF EXISTS "Admins can manage enrollments" ON enrollments;
CREATE POLICY "Admins can manage enrollments"
  ON enrollments
  FOR ALL
  USING (is_admin());

-- ============================================================================
-- GRANT PERMISSIONS
-- ============================================================================

-- Grant usage on schema
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- Grant select on public tables to anonymous users
GRANT SELECT ON programs TO anon;
GRANT SELECT ON courses TO anon;

-- Grant permissions to authenticated users
GRANT SELECT, INSERT, UPDATE ON profiles TO authenticated;
GRANT SELECT, INSERT ON enrollments TO authenticated;
