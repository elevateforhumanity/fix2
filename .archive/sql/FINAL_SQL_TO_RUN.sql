-- ============================================
-- FINAL SQL - Run this in Supabase SQL Editor
-- ============================================
-- This is the ONLY manual step left to complete everything

-- 1. Fix programs table - add title column
ALTER TABLE programs ADD COLUMN IF NOT EXISTS title TEXT;
UPDATE programs SET title = name WHERE title IS NULL OR title = '';

-- 2. Ensure applications table has all required columns
DO $$ 
BEGIN
  -- Add columns if they don't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'applications' AND column_name = 'first_name') THEN
    ALTER TABLE applications ADD COLUMN first_name TEXT NOT NULL DEFAULT '';
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'applications' AND column_name = 'last_name') THEN
    ALTER TABLE applications ADD COLUMN last_name TEXT NOT NULL DEFAULT '';
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

-- 3. Enable RLS
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- 4. Drop old policies
DROP POLICY IF EXISTS "Allow public to submit applications" ON applications;
DROP POLICY IF EXISTS "Users can read own applications" ON applications;
DROP POLICY IF EXISTS "Admins can read all applications" ON applications;

-- 5. Create new policies
CREATE POLICY "Allow public to submit applications"
ON applications FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Users can read own applications"
ON applications FOR SELECT
TO authenticated
USING (email = (SELECT email FROM auth.users WHERE id = auth.uid()));

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

-- 6. Verify everything worked
SELECT 'SUCCESS: All migrations complete!' as status;

-- Check programs table
SELECT 'programs.title column' as check_name, 
       CASE WHEN EXISTS (
         SELECT 1 FROM information_schema.columns 
         WHERE table_name = 'programs' AND column_name = 'title'
       ) THEN '✅ EXISTS' ELSE '❌ MISSING' END as result;

-- Check applications columns
SELECT 'applications columns' as check_name,
       COUNT(*) || ' columns' as result
FROM information_schema.columns 
WHERE table_name = 'applications'
AND column_name IN ('first_name', 'last_name', 'city', 'zip_code', 'notes', 'contact_preference', 'source', 'source_ip');

-- Check RLS policies
SELECT 'RLS policies' as check_name,
       COUNT(*) || ' policies' as result
FROM pg_policies
WHERE tablename = 'applications';
