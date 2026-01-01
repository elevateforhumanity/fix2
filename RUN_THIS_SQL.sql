-- ============================================================================
-- COPY AND PASTE THIS ENTIRE FILE INTO SUPABASE SQL EDITOR
-- Go to: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/sql/new
-- ============================================================================

-- Step 1: Drop existing policies
DROP POLICY IF EXISTS "Anyone can view active programs" ON programs;
DROP POLICY IF EXISTS "Public programs are viewable by everyone" ON programs;
DROP POLICY IF EXISTS "Anyone can view active courses" ON courses;
DROP POLICY IF EXISTS "Public courses are viewable by everyone" ON courses;

-- Step 2: Create policies for public read access
CREATE POLICY "Anyone can view active programs" 
ON programs 
FOR SELECT 
USING (active = true);

CREATE POLICY "Anyone can view active courses" 
ON courses 
FOR SELECT 
USING (active = true);

-- Step 3: Verify policies were created
SELECT 
  schemaname, 
  tablename, 
  policyname, 
  cmd 
FROM pg_policies 
WHERE tablename IN ('programs', 'courses')
ORDER BY tablename, policyname;

-- ============================================================================
-- DONE! You should see 2 policies listed above.
-- ============================================================================
