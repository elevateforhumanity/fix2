-- Fix Supabase Issues
-- Run this in your Supabase SQL Editor

-- 1. Fix programs table - add title column if missing
ALTER TABLE programs ADD COLUMN IF NOT EXISTS title TEXT;
UPDATE programs SET title = name WHERE title IS NULL OR title = '';

-- 2. Ensure applications table exists with correct schema
CREATE TABLE IF NOT EXISTS applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  program_interest TEXT,
  referral_source TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Enable RLS on applications
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- 4. Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Allow public to submit applications" ON applications;
DROP POLICY IF EXISTS "Users can read own applications" ON applications;
DROP POLICY IF EXISTS "Admins can read all applications" ON applications;

-- 5. Create RLS policies for applications
-- Allow anyone to submit applications (public form)
CREATE POLICY "Allow public to submit applications"
ON applications FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Allow users to read their own applications
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
    SELECT 1 FROM user_profiles
    WHERE user_id = auth.uid()
    AND role IN ('admin', 'super_admin')
  )
);

-- 6. Verify the fix
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
