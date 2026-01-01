-- UNIFIED APPLICATION SYSTEM
-- Creates separate tables for each role type with proper RLS

-- Student Applications Table
CREATE TABLE IF NOT EXISTS student_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  date_of_birth DATE,
  address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  program_interest TEXT,
  employment_status TEXT,
  education_level TEXT,
  goals TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'in_progress')),
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES auth.users(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Program Holder Applications Table
CREATE TABLE IF NOT EXISTS program_holder_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  organization_name TEXT NOT NULL,
  organization_type TEXT,
  website TEXT,
  number_of_students TEXT,
  programs_offered TEXT,
  partnership_goals TEXT,
  status TEXT DEFAULT 'pending_verification' CHECK (status IN ('pending_verification', 'verified', 'rejected', 'active')),
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES auth.users(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Employer Applications Table
CREATE TABLE IF NOT EXISTS employer_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  company_name TEXT NOT NULL,
  industry TEXT,
  company_size TEXT,
  website TEXT,
  hiring_needs TEXT,
  positions_available TEXT,
  status TEXT DEFAULT 'pending_verification' CHECK (status IN ('pending_verification', 'verified', 'rejected', 'active')),
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES auth.users(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Staff Applications Table
CREATE TABLE IF NOT EXISTS staff_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  role TEXT NOT NULL CHECK (role IN ('staff', 'instructor')),
  position TEXT NOT NULL,
  experience TEXT,
  education TEXT,
  certifications TEXT,
  availability TEXT,
  cover_letter TEXT,
  status TEXT DEFAULT 'pending_approval' CHECK (status IN ('pending_approval', 'approved', 'rejected', 'interview_scheduled')),
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES auth.users(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_student_applications_user_id ON student_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_student_applications_status ON student_applications(status);
CREATE INDEX IF NOT EXISTS idx_student_applications_submitted_at ON student_applications(submitted_at DESC);

CREATE INDEX IF NOT EXISTS idx_program_holder_applications_user_id ON program_holder_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_program_holder_applications_status ON program_holder_applications(status);
CREATE INDEX IF NOT EXISTS idx_program_holder_applications_submitted_at ON program_holder_applications(submitted_at DESC);

CREATE INDEX IF NOT EXISTS idx_employer_applications_user_id ON employer_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_employer_applications_status ON employer_applications(status);
CREATE INDEX IF NOT EXISTS idx_employer_applications_submitted_at ON employer_applications(submitted_at DESC);

CREATE INDEX IF NOT EXISTS idx_staff_applications_user_id ON staff_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_staff_applications_status ON staff_applications(status);
CREATE INDEX IF NOT EXISTS idx_staff_applications_submitted_at ON staff_applications(submitted_at DESC);

-- Row Level Security Policies

-- Student Applications RLS
ALTER TABLE student_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own student applications"
  ON student_applications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own student applications"
  ON student_applications FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all student applications"
  ON student_applications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin', 'org_admin')
    )
  );

CREATE POLICY "Admins can update student applications"
  ON student_applications FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin', 'org_admin')
    )
  );

-- Program Holder Applications RLS
ALTER TABLE program_holder_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own program holder applications"
  ON program_holder_applications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own program holder applications"
  ON program_holder_applications FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all program holder applications"
  ON program_holder_applications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin', 'org_admin')
    )
  );

CREATE POLICY "Admins can update program holder applications"
  ON program_holder_applications FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin', 'org_admin')
    )
  );

-- Employer Applications RLS
ALTER TABLE employer_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own employer applications"
  ON employer_applications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own employer applications"
  ON employer_applications FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all employer applications"
  ON employer_applications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin', 'org_admin')
    )
  );

CREATE POLICY "Admins can update employer applications"
  ON employer_applications FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin', 'org_admin')
    )
  );

-- Staff Applications RLS
ALTER TABLE staff_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own staff applications"
  ON staff_applications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own staff applications"
  ON staff_applications FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all staff applications"
  ON staff_applications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin', 'org_admin')
    )
  );

CREATE POLICY "Admins can update staff applications"
  ON staff_applications FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin', 'org_admin')
    )
  );

-- Updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_student_applications_updated_at
  BEFORE UPDATE ON student_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_program_holder_applications_updated_at
  BEFORE UPDATE ON program_holder_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_employer_applications_updated_at
  BEFORE UPDATE ON employer_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_staff_applications_updated_at
  BEFORE UPDATE ON staff_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
