-- CUSTOM MIGRATION FOR YOUR DATABASE
-- Based on actual schema analysis
-- Version: 2026-01-04

-- ============================================
-- WHAT YOU HAVE:
-- ✅ tenants (1 row)
-- ✅ profiles (13 rows) - MISSING tenant_id
-- ✅ programs (53 rows) - MISSING tenant_id  
-- ✅ courses (66 rows) - MISSING tenant_id
-- ✅ enrollments (15 rows) - MISSING tenant_id, course_id
-- ✅ audit_logs (0 rows)
-- ✅ notifications (0 rows)
-- ✅ messages (0 rows)
--
-- WHAT YOU NEED:
-- ❌ student_applications
-- ❌ program_holder_applications
-- ❌ employer_applications
-- ❌ staff_applications
-- ============================================

-- ============================================
-- STEP 1: ADD MISSING COLUMNS
-- ============================================

-- Add tenant_id to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS tenant_id UUID;
CREATE INDEX IF NOT EXISTS idx_profiles_tenant_id ON profiles(tenant_id);

-- Add tenant_id to programs
ALTER TABLE programs ADD COLUMN IF NOT EXISTS tenant_id UUID;
CREATE INDEX IF NOT EXISTS idx_programs_tenant_id ON programs(tenant_id);

-- Add tenant_id to courses
ALTER TABLE courses ADD COLUMN IF NOT EXISTS tenant_id UUID;
CREATE INDEX IF NOT EXISTS idx_courses_tenant_id ON courses(tenant_id);

-- Add tenant_id to enrollments
ALTER TABLE enrollments ADD COLUMN IF NOT EXISTS tenant_id UUID;
CREATE INDEX IF NOT EXISTS idx_enrollments_tenant_id ON enrollments(tenant_id);

-- Add course_id to enrollments (might be named differently)
ALTER TABLE enrollments ADD COLUMN IF NOT EXISTS course_id UUID;
CREATE INDEX IF NOT EXISTS idx_enrollments_course_id ON enrollments(course_id);

-- ============================================
-- STEP 2: SET DEFAULT TENANT FOR EXISTING DATA
-- ============================================

-- Get the first tenant ID
DO $$
DECLARE
  default_tenant_id UUID;
BEGIN
  SELECT id INTO default_tenant_id FROM tenants LIMIT 1;
  
  IF default_tenant_id IS NOT NULL THEN
    -- Update all existing records to use this tenant
    UPDATE profiles SET tenant_id = default_tenant_id WHERE tenant_id IS NULL;
    UPDATE programs SET tenant_id = default_tenant_id WHERE tenant_id IS NULL;
    UPDATE courses SET tenant_id = default_tenant_id WHERE tenant_id IS NULL;
    UPDATE enrollments SET tenant_id = default_tenant_id WHERE tenant_id IS NULL;
    
    RAISE NOTICE 'Set default tenant % for existing records', default_tenant_id;
  END IF;
END $$;

-- ============================================
-- STEP 3: CREATE MISSING TABLES
-- ============================================

-- Student Applications
CREATE TABLE IF NOT EXISTS student_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'in_review')),
  data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_student_applications_tenant_id ON student_applications(tenant_id);
CREATE INDEX IF NOT EXISTS idx_student_applications_user_id ON student_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_student_applications_status ON student_applications(status);
CREATE INDEX IF NOT EXISTS idx_student_applications_email ON student_applications(email);
CREATE INDEX IF NOT EXISTS idx_student_applications_created_at ON student_applications(created_at);

-- Program Holder Applications
CREATE TABLE IF NOT EXISTS program_holder_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  organization_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'in_review')),
  data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_program_holder_applications_tenant_id ON program_holder_applications(tenant_id);
CREATE INDEX IF NOT EXISTS idx_program_holder_applications_user_id ON program_holder_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_program_holder_applications_status ON program_holder_applications(status);
CREATE INDEX IF NOT EXISTS idx_program_holder_applications_email ON program_holder_applications(email);

-- Employer Applications
CREATE TABLE IF NOT EXISTS employer_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'in_review')),
  data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_employer_applications_tenant_id ON employer_applications(tenant_id);
CREATE INDEX IF NOT EXISTS idx_employer_applications_user_id ON employer_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_employer_applications_status ON employer_applications(status);
CREATE INDEX IF NOT EXISTS idx_employer_applications_email ON employer_applications(email);

-- Staff Applications
CREATE TABLE IF NOT EXISTS staff_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  position TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'in_review')),
  data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_staff_applications_tenant_id ON staff_applications(tenant_id);
CREATE INDEX IF NOT EXISTS idx_staff_applications_user_id ON staff_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_staff_applications_status ON staff_applications(status);
CREATE INDEX IF NOT EXISTS idx_staff_applications_email ON staff_applications(email);

-- ============================================
-- STEP 4: RLS POLICIES
-- ============================================

ALTER TABLE student_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE program_holder_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE employer_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_applications ENABLE ROW LEVEL SECURITY;

-- Student Applications: Users can see their own, admins/staff can see all
DROP POLICY IF EXISTS "student_applications_select" ON student_applications;
CREATE POLICY "student_applications_select" ON student_applications 
  FOR SELECT TO authenticated
  USING (
    user_id = auth.uid() 
    OR EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'super_admin', 'staff')
    )
  );

DROP POLICY IF EXISTS "student_applications_insert" ON student_applications;
CREATE POLICY "student_applications_insert" ON student_applications 
  FOR INSERT TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "student_applications_update" ON student_applications;
CREATE POLICY "student_applications_update" ON student_applications 
  FOR UPDATE TO authenticated
  USING (
    user_id = auth.uid() 
    OR EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'super_admin', 'staff')
    )
  );

-- Program Holder Applications
DROP POLICY IF EXISTS "program_holder_applications_select" ON program_holder_applications;
CREATE POLICY "program_holder_applications_select" ON program_holder_applications 
  FOR SELECT TO authenticated
  USING (
    user_id = auth.uid() 
    OR EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'super_admin')
    )
  );

DROP POLICY IF EXISTS "program_holder_applications_insert" ON program_holder_applications;
CREATE POLICY "program_holder_applications_insert" ON program_holder_applications 
  FOR INSERT TO authenticated
  WITH CHECK (true);

-- Employer Applications
DROP POLICY IF EXISTS "employer_applications_select" ON employer_applications;
CREATE POLICY "employer_applications_select" ON employer_applications 
  FOR SELECT TO authenticated
  USING (
    user_id = auth.uid() 
    OR EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'super_admin')
    )
  );

DROP POLICY IF EXISTS "employer_applications_insert" ON employer_applications;
CREATE POLICY "employer_applications_insert" ON employer_applications 
  FOR INSERT TO authenticated
  WITH CHECK (true);

-- Staff Applications
DROP POLICY IF EXISTS "staff_applications_select" ON staff_applications;
CREATE POLICY "staff_applications_select" ON staff_applications 
  FOR SELECT TO authenticated
  USING (
    user_id = auth.uid() 
    OR EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'super_admin')
    )
  );

DROP POLICY IF EXISTS "staff_applications_insert" ON staff_applications;
CREATE POLICY "staff_applications_insert" ON staff_applications 
  FOR INSERT TO authenticated
  WITH CHECK (true);

-- ============================================
-- STEP 5: TRIGGERS
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_student_applications_updated_at ON student_applications;
CREATE TRIGGER update_student_applications_updated_at
  BEFORE UPDATE ON student_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_program_holder_applications_updated_at ON program_holder_applications;
CREATE TRIGGER update_program_holder_applications_updated_at
  BEFORE UPDATE ON program_holder_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_employer_applications_updated_at ON employer_applications;
CREATE TRIGGER update_employer_applications_updated_at
  BEFORE UPDATE ON employer_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_staff_applications_updated_at ON staff_applications;
CREATE TRIGGER update_staff_applications_updated_at
  BEFORE UPDATE ON staff_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SUCCESS!
-- ============================================

DO $$
BEGIN
  RAISE NOTICE '';
  RAISE NOTICE '✅ MIGRATION COMPLETED SUCCESSFULLY!';
  RAISE NOTICE '====================================';
  RAISE NOTICE '';
  RAISE NOTICE '📦 Added Columns:';
  RAISE NOTICE '  - profiles.tenant_id';
  RAISE NOTICE '  - programs.tenant_id';
  RAISE NOTICE '  - courses.tenant_id';
  RAISE NOTICE '  - enrollments.tenant_id';
  RAISE NOTICE '  - enrollments.course_id';
  RAISE NOTICE '';
  RAISE NOTICE '📋 Created Tables:';
  RAISE NOTICE '  - student_applications';
  RAISE NOTICE '  - program_holder_applications';
  RAISE NOTICE '  - employer_applications';
  RAISE NOTICE '  - staff_applications';
  RAISE NOTICE '';
  RAISE NOTICE '🔒 Enabled RLS policies';
  RAISE NOTICE '⚡ Created update triggers';
  RAISE NOTICE '';
  RAISE NOTICE '✨ Your database is ready!';
  RAISE NOTICE '';
  RAISE NOTICE 'Next steps:';
  RAISE NOTICE '  1. Test enrollment API';
  RAISE NOTICE '  2. Test application forms';
  RAISE NOTICE '  3. Verify all portals work';
  RAISE NOTICE '';
END $$;
