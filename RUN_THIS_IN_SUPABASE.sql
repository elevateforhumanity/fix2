-- ============================================
-- CRITICAL: Run this in Supabase SQL Editor
-- ============================================

-- 1. Fix programs table - add title column
ALTER TABLE programs ADD COLUMN IF NOT EXISTS title TEXT;
UPDATE programs SET title = name WHERE title IS NULL OR title = '';

-- 2. Fix applications table schema
-- Check current schema first
DO $$ 
BEGIN
  -- Add missing columns if they don't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'applications' AND column_name = 'first_name') THEN
    ALTER TABLE applications ADD COLUMN first_name TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'applications' AND column_name = 'last_name') THEN
    ALTER TABLE applications ADD COLUMN last_name TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'applications' AND column_name = 'city') THEN
    ALTER TABLE applications ADD COLUMN city TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'applications' AND column_name = 'zip_code') THEN
    ALTER TABLE applications ADD COLUMN zip_code TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'applications' AND column_name = 'notes') THEN
    ALTER TABLE applications ADD COLUMN notes TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'applications' AND column_name = 'contact_preference') THEN
    ALTER TABLE applications ADD COLUMN contact_preference TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'applications' AND column_name = 'source') THEN
    ALTER TABLE applications ADD COLUMN source TEXT DEFAULT 'website_quick_application';
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'applications' AND column_name = 'source_ip') THEN
    ALTER TABLE applications ADD COLUMN source_ip TEXT;
  END IF;
END $$;

-- 3. Enable RLS on applications
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- 4. Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Allow public to submit applications" ON applications;
DROP POLICY IF EXISTS "Users can read own applications" ON applications;
DROP POLICY IF EXISTS "Admins can read all applications" ON applications;

-- 5. Create RLS policies
-- Allow anonymous users to INSERT (submit applications)
CREATE POLICY "Allow public to submit applications"
ON applications FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Allow authenticated users to read their own applications
CREATE POLICY "Users can read own applications"
ON applications FOR SELECT
TO authenticated
USING (email = (SELECT email FROM auth.users WHERE id = auth.uid()));

-- Allow admins to read all applications
CREATE POLICY "Admins can read all applications"
ON applications FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role IN ('admin', 'super_admin')
  )
);

-- 6. Verify the changes
SELECT 
  'programs' as table_name,
  column_name,
  data_type
FROM information_schema.columns 
WHERE table_name = 'programs'
AND column_name IN ('name', 'title')
UNION ALL
SELECT 
  'applications' as table_name,
  column_name,
  data_type
FROM information_schema.columns 
WHERE table_name = 'applications'
ORDER BY table_name, column_name;

-- 7. Check RLS policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies
WHERE tablename = 'applications';
