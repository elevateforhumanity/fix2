-- ============================================
-- CREATE ANY MISSING TABLES
-- ============================================
-- This will create tables that might be missing after restore

-- Applications table (critical for form)
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

-- Courses table
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  slug TEXT UNIQUE,
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enrollments table  
CREATE TABLE IF NOT EXISTS enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  course_id UUID REFERENCES courses(id),
  status TEXT DEFAULT 'active',
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add title column to programs
ALTER TABLE programs ADD COLUMN IF NOT EXISTS title TEXT;
UPDATE programs SET title = name WHERE title IS NULL;

-- Enable RLS
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "Allow public to submit applications" ON applications;
CREATE POLICY "Allow public to submit applications"
ON applications FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Users can read own applications" ON applications;
CREATE POLICY "Users can read own applications"
ON applications FOR SELECT TO authenticated
USING (email = (SELECT email FROM auth.users WHERE id = auth.uid()));

DROP POLICY IF EXISTS "Admins can read all applications" ON applications;
CREATE POLICY "Admins can read all applications"
ON applications FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin')));

DROP POLICY IF EXISTS "Public can view published courses" ON courses;
CREATE POLICY "Public can view published courses"
ON courses FOR SELECT TO anon, authenticated
USING (status = 'published');

DROP POLICY IF EXISTS "Users can view own enrollments" ON enrollments;
CREATE POLICY "Users can view own enrollments"
ON enrollments FOR SELECT TO authenticated
USING (user_id = auth.uid());
