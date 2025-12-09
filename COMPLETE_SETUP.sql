-- ============================================
-- COMPLETE DATABASE SETUP
-- Everything you need to run after restore
-- ============================================

-- 1. Add title column to programs table
ALTER TABLE programs ADD COLUMN IF NOT EXISTS title TEXT;
UPDATE programs SET title = name WHERE title IS NULL OR title = '';

-- 2. Ensure applications table exists with all columns
CREATE TABLE IF NOT EXISTS applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT,
  last_name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  city TEXT,
  zip_code TEXT,
  program_interest TEXT,
  notes TEXT,
  contact_preference TEXT,
  source TEXT DEFAULT 'website_quick_application',
  source_ip TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add columns if table already existed but missing columns
ALTER TABLE applications ADD COLUMN IF NOT EXISTS first_name TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS last_name TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS city TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS zip_code TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS notes TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS contact_preference TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'website_quick_application';
ALTER TABLE applications ADD COLUMN IF NOT EXISTS source_ip TEXT;

-- 3. Ensure courses table exists
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  slug TEXT UNIQUE,
  status TEXT DEFAULT 'draft',
  thumbnail_url TEXT,
  duration_hours INTEGER,
  level TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Ensure enrollments table exists
CREATE TABLE IF NOT EXISTS enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'active',
  progress INTEGER DEFAULT 0,
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Enable RLS on all tables
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

-- 6. Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Allow public to submit applications" ON applications;
DROP POLICY IF EXISTS "Users can read own applications" ON applications;
DROP POLICY IF EXISTS "Admins can read all applications" ON applications;
DROP POLICY IF EXISTS "Public can view published courses" ON courses;
DROP POLICY IF EXISTS "Admins can manage courses" ON courses;
DROP POLICY IF EXISTS "Users can view own enrollments" ON enrollments;
DROP POLICY IF EXISTS "Users can create own enrollments" ON enrollments;

-- 7. Create RLS policies for applications
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

-- 8. Create RLS policies for courses
CREATE POLICY "Public can view published courses"
ON courses FOR SELECT
TO anon, authenticated
USING (status = 'published');

CREATE POLICY "Admins can manage courses"
ON courses FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role IN ('admin', 'super_admin')
  )
);

-- 9. Create RLS policies for enrollments
CREATE POLICY "Users can view own enrollments"
ON enrollments FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Users can create own enrollments"
ON enrollments FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

-- 10. Verify everything worked
SELECT 'Setup Complete!' as status;

-- Check critical tables exist
SELECT 
  CASE WHEN EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'applications') 
    THEN '✅ applications' ELSE '❌ applications' END as table_check
UNION ALL
SELECT 
  CASE WHEN EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'courses') 
    THEN '✅ courses' ELSE '❌ courses' END
UNION ALL
SELECT 
  CASE WHEN EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'enrollments') 
    THEN '✅ enrollments' ELSE '❌ enrollments' END
UNION ALL
SELECT 
  CASE WHEN EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'programs') 
    THEN '✅ programs' ELSE '❌ programs' END
UNION ALL
SELECT 
  CASE WHEN EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'profiles') 
    THEN '✅ profiles' ELSE '❌ profiles' END;

-- Check applications columns
SELECT 'applications columns: ' || COUNT(*)::TEXT as column_check
FROM information_schema.columns
WHERE table_name = 'applications'
AND column_name IN ('first_name', 'last_name', 'city', 'zip_code', 'notes', 'contact_preference', 'source', 'source_ip');

-- Check programs has title
SELECT 'programs.title: ' || 
  CASE WHEN EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'programs' AND column_name = 'title'
  ) THEN '✅ EXISTS' ELSE '❌ MISSING' END as title_check;

-- Check RLS policies
SELECT 'RLS policies: ' || COUNT(*)::TEXT as policy_check
FROM pg_policies
WHERE tablename IN ('applications', 'courses', 'enrollments');
