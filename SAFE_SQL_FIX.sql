-- ============================================
-- SAFE SQL FIX - No syntax errors
-- ============================================

-- 1. Fix programs table - add title column
ALTER TABLE programs ADD COLUMN IF NOT EXISTS title TEXT;
UPDATE programs SET title = name WHERE title IS NULL OR title = '';

-- 2. Add missing columns to applications table
ALTER TABLE applications ADD COLUMN IF NOT EXISTS first_name TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS last_name TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS city TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS zip_code TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS notes TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS contact_preference TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'website_quick_application';
ALTER TABLE applications ADD COLUMN IF NOT EXISTS source_ip TEXT;

-- 3. Enable RLS
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- 4. Drop old policies if they exist
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
