-- =====================================================
-- COMPLETE LMS SYSTEM MIGRATION
-- Copy and paste this entire file into Supabase SQL Editor
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- PROGRAMS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS programs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  category TEXT DEFAULT 'workforce',
  duration_hours INTEGER,
  price DECIMAL(10, 2),
  requirements TEXT,
  outcomes TEXT,
  is_active BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_programs_slug ON programs(slug);
CREATE INDEX IF NOT EXISTS idx_programs_active ON programs(is_active);
CREATE INDEX IF NOT EXISTS idx_programs_featured ON programs(featured);

-- =====================================================
-- MODULES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS modules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  program_id UUID REFERENCES programs(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  order_index INTEGER DEFAULT 0,
  duration_hours DECIMAL(5, 2),
  module_type TEXT DEFAULT 'lesson', -- lesson, scorm, external, assessment
  content JSONB, -- Flexible content storage
  is_required BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_modules_program ON modules(program_id);
CREATE INDEX IF NOT EXISTS idx_modules_order ON modules(program_id, order_index);

-- =====================================================
-- SCORM PACKAGES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS scorm_packages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  module_id UUID REFERENCES modules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  version TEXT DEFAULT '1.2', -- SCORM version
  storage_path TEXT, -- Path in Supabase storage
  manifest_data JSONB, -- imsmanifest.xml parsed data
  launch_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_scorm_module ON scorm_packages(module_id);

-- =====================================================
-- STUDENT ENROLLMENTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS student_enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  program_id UUID REFERENCES programs(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending', -- pending, active, completed, withdrawn, suspended
  progress_percentage INTEGER DEFAULT 0,
  start_date DATE NOT NULL,
  expected_completion_date DATE,
  actual_completion_date DATE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, program_id)
);

CREATE INDEX IF NOT EXISTS idx_enrollments_student ON student_enrollments(student_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_program ON student_enrollments(program_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_status ON student_enrollments(status);

-- =====================================================
-- MODULE PROGRESS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS module_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  enrollment_id UUID REFERENCES student_enrollments(id) ON DELETE CASCADE,
  module_id UUID REFERENCES modules(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'not_started', -- not_started, in_progress, completed
  progress_percentage INTEGER DEFAULT 0,
  time_spent_minutes INTEGER DEFAULT 0,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  last_accessed_at TIMESTAMPTZ,
  scorm_data JSONB, -- SCORM tracking data
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(enrollment_id, module_id)
);

CREATE INDEX IF NOT EXISTS idx_module_progress_enrollment ON module_progress(enrollment_id);
CREATE INDEX IF NOT EXISTS idx_module_progress_module ON module_progress(module_id);
CREATE INDEX IF NOT EXISTS idx_module_progress_status ON module_progress(status);

-- =====================================================
-- FUNDING RECORDS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS funding_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  enrollment_id UUID REFERENCES student_enrollments(id) ON DELETE CASCADE,
  source TEXT NOT NULL, -- WIOA, Pell Grant, Scholarship, etc.
  amount DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, approved, disbursed, denied
  approved_by UUID REFERENCES auth.users(id),
  approved_at TIMESTAMPTZ,
  disbursed_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_funding_enrollment ON funding_records(enrollment_id);
CREATE INDEX IF NOT EXISTS idx_funding_status ON funding_records(status);

-- =====================================================
-- TRANSFER HOURS TABLE (for Apprenticeships)
-- =====================================================
CREATE TABLE IF NOT EXISTS transfer_hours (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  enrollment_id UUID REFERENCES student_enrollments(id) ON DELETE CASCADE,
  hours_requested DECIMAL(6, 2) NOT NULL,
  hours_approved DECIMAL(6, 2),
  category TEXT, -- theory, practical, etc.
  evidence_description TEXT,
  evidence_file_url TEXT,
  status TEXT DEFAULT 'pending', -- pending, approved, denied
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_transfer_hours_enrollment ON transfer_hours(enrollment_id);
CREATE INDEX IF NOT EXISTS idx_transfer_hours_status ON transfer_hours(status);

-- =====================================================
-- CERTIFICATES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  enrollment_id UUID REFERENCES student_enrollments(id) ON DELETE CASCADE,
  certificate_number TEXT UNIQUE NOT NULL,
  certificate_type TEXT DEFAULT 'completion', -- completion, achievement, etc.
  issued_date DATE NOT NULL,
  expiry_date DATE,
  file_url TEXT,
  metadata JSONB, -- Additional certificate data
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_certificates_enrollment ON certificates(enrollment_id);
CREATE INDEX IF NOT EXISTS idx_certificates_number ON certificates(certificate_number);

-- =====================================================
-- PROFILES TABLE (extend auth.users)
-- =====================================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  role TEXT DEFAULT 'student', -- student, admin, super_admin, instructor
  phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  date_of_birth DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE scorm_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE module_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE funding_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE transfer_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Programs: Public read, admin write
CREATE POLICY "Programs are viewable by everyone" ON programs
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage programs" ON programs
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

-- Modules: Public read, admin write
CREATE POLICY "Modules are viewable by everyone" ON modules
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage modules" ON modules
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

-- Student Enrollments: Students see their own, admins see all
CREATE POLICY "Students can view their own enrollments" ON student_enrollments
  FOR SELECT USING (
    student_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

CREATE POLICY "Admins can manage enrollments" ON student_enrollments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

-- Module Progress: Students see their own, admins see all
CREATE POLICY "Students can view their own progress" ON module_progress
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM student_enrollments
      WHERE student_enrollments.id = module_progress.enrollment_id
      AND student_enrollments.student_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

CREATE POLICY "Students can update their own progress" ON module_progress
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM student_enrollments
      WHERE student_enrollments.id = module_progress.enrollment_id
      AND student_enrollments.student_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all progress" ON module_progress
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

-- Funding Records: Admin only
CREATE POLICY "Admins can manage funding" ON funding_records
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

-- Transfer Hours: Students can view/create their own, admins manage all
CREATE POLICY "Students can view their transfer hours" ON transfer_hours
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM student_enrollments
      WHERE student_enrollments.id = transfer_hours.enrollment_id
      AND student_enrollments.student_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

CREATE POLICY "Students can request transfer hours" ON transfer_hours
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM student_enrollments
      WHERE student_enrollments.id = transfer_hours.enrollment_id
      AND student_enrollments.student_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage transfer hours" ON transfer_hours
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

-- Certificates: Students see their own, admins see all
CREATE POLICY "Students can view their certificates" ON certificates
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM student_enrollments
      WHERE student_enrollments.id = certificates.enrollment_id
      AND student_enrollments.student_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

CREATE POLICY "Admins can manage certificates" ON certificates
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

-- Profiles: Users see their own, admins see all
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (
    id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid()
      AND p.role IN ('admin', 'super_admin')
    )
  );

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (id = auth.uid());

CREATE POLICY "Admins can manage all profiles" ON profiles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

-- =====================================================
-- FUNCTIONS AND TRIGGERS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to all tables
CREATE TRIGGER update_programs_updated_at BEFORE UPDATE ON programs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_modules_updated_at BEFORE UPDATE ON modules
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_enrollments_updated_at BEFORE UPDATE ON student_enrollments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_module_progress_updated_at BEFORE UPDATE ON module_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_funding_updated_at BEFORE UPDATE ON funding_records
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_transfer_hours_updated_at BEFORE UPDATE ON transfer_hours
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to calculate enrollment progress
CREATE OR REPLACE FUNCTION calculate_enrollment_progress(enrollment_uuid UUID)
RETURNS INTEGER AS $$
DECLARE
  total_modules INTEGER;
  completed_modules INTEGER;
  progress INTEGER;
BEGIN
  -- Count total required modules for the program
  SELECT COUNT(*)
  INTO total_modules
  FROM modules m
  JOIN student_enrollments e ON e.program_id = m.program_id
  WHERE e.id = enrollment_uuid AND m.is_required = true;

  -- Count completed modules
  SELECT COUNT(*)
  INTO completed_modules
  FROM module_progress mp
  WHERE mp.enrollment_id = enrollment_uuid AND mp.status = 'completed';

  -- Calculate percentage
  IF total_modules > 0 THEN
    progress := ROUND((completed_modules::DECIMAL / total_modules) * 100);
  ELSE
    progress := 0;
  END IF;

  -- Update enrollment progress
  UPDATE student_enrollments
  SET progress_percentage = progress
  WHERE id = enrollment_uuid;

  RETURN progress;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- SAMPLE DATA (Optional - for testing)
-- =====================================================

-- Insert sample program
INSERT INTO programs (name, slug, description, category, duration_hours, price, is_active, featured)
VALUES (
  'Barber Apprenticeship Program',
  'barber-apprenticeship',
  'Complete barber training program with theory and practical hours',
  'apprenticeship',
  1500,
  2500.00,
  true,
  true
) ON CONFLICT (slug) DO NOTHING;

-- =====================================================
-- COMPLETION MESSAGE
-- =====================================================
DO $$
BEGIN
  RAISE NOTICE '✅ LMS System Migration Complete!';
  RAISE NOTICE '📊 Tables created: programs, modules, scorm_packages, student_enrollments, module_progress, funding_records, transfer_hours, certificates, profiles';
  RAISE NOTICE '🔒 Row Level Security policies applied';
  RAISE NOTICE '⚡ Triggers and functions created';
  RAISE NOTICE '';
  RAISE NOTICE '🚀 Next steps:';
  RAISE NOTICE '1. Create admin user in Supabase Auth';
  RAISE NOTICE '2. Add admin role to profiles table';
  RAISE NOTICE '3. Start creating programs and modules';
END $$;
