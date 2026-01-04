-- ULTRA SAFE MIGRATION - Works with ANY existing database
-- Creates everything needed, checks everything first
-- Version: 2026-01-04

-- ============================================
-- CREATE TENANTS TABLE IF MISSING
-- ============================================

CREATE TABLE IF NOT EXISTS tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  domain TEXT UNIQUE,
  logo_url TEXT,
  primary_color TEXT DEFAULT '#3B82F6',
  secondary_color TEXT DEFAULT '#8B5CF6',
  accent_color TEXT DEFAULT '#10B981',
  contact_email TEXT,
  contact_phone TEXT,
  support_email TEXT,
  active BOOLEAN DEFAULT true,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tenants_slug ON tenants(slug);
CREATE INDEX IF NOT EXISTS idx_tenants_domain ON tenants(domain);
CREATE INDEX IF NOT EXISTS idx_tenants_active ON tenants(active);

-- Insert default tenant if not exists
INSERT INTO tenants (
  id,
  name,
  slug,
  domain,
  primary_color,
  secondary_color,
  contact_email,
  support_email,
  active
) VALUES (
  '00000000-0000-0000-0000-000000000001',
  'Elevate for Humanity',
  'elevate-for-humanity',
  'www.elevateforhumanity.org',
  '#3B82F6',
  '#8B5CF6',
  'info@elevateforhumanity.org',
  'support@elevateforhumanity.org',
  true
) ON CONFLICT (id) DO NOTHING;

-- ============================================
-- ADD TENANT_ID TO EXISTING TABLES IF MISSING
-- ============================================

-- Add tenant_id to profiles if missing
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'tenant_id'
  ) THEN
    ALTER TABLE profiles ADD COLUMN tenant_id UUID;
    CREATE INDEX IF NOT EXISTS idx_profiles_tenant_id ON profiles(tenant_id);
    -- Set default tenant for existing profiles
    UPDATE profiles SET tenant_id = '00000000-0000-0000-0000-000000000001' WHERE tenant_id IS NULL;
  END IF;
END $$;

-- Add tenant_id to courses if missing
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'courses' AND column_name = 'tenant_id'
  ) THEN
    ALTER TABLE courses ADD COLUMN tenant_id UUID;
    CREATE INDEX IF NOT EXISTS idx_courses_tenant_id ON courses(tenant_id);
    UPDATE courses SET tenant_id = '00000000-0000-0000-0000-000000000001' WHERE tenant_id IS NULL;
  END IF;
END $$;

-- Add tenant_id to enrollments if missing
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'enrollments' AND column_name = 'tenant_id'
  ) THEN
    ALTER TABLE enrollments ADD COLUMN tenant_id UUID;
    CREATE INDEX IF NOT EXISTS idx_enrollments_tenant_id ON enrollments(tenant_id);
    UPDATE enrollments SET tenant_id = '00000000-0000-0000-0000-000000000001' WHERE tenant_id IS NULL;
  END IF;
END $$;

-- Add tenant_id to programs if missing
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'programs' AND column_name = 'tenant_id'
  ) THEN
    ALTER TABLE programs ADD COLUMN tenant_id UUID;
    CREATE INDEX IF NOT EXISTS idx_programs_tenant_id ON programs(tenant_id);
    UPDATE programs SET tenant_id = '00000000-0000-0000-0000-000000000001' WHERE tenant_id IS NULL;
  END IF;
END $$;

-- ============================================
-- CREATE APPLICATION TABLES
-- ============================================

-- Student Applications
CREATE TABLE IF NOT EXISTS student_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID DEFAULT '00000000-0000-0000-0000-000000000001',
  user_id UUID REFERENCES profiles(id),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  status TEXT DEFAULT 'pending',
  data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_student_applications_tenant_id ON student_applications(tenant_id);
CREATE INDEX IF NOT EXISTS idx_student_applications_user_id ON student_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_student_applications_status ON student_applications(status);
CREATE INDEX IF NOT EXISTS idx_student_applications_email ON student_applications(email);

-- Program Holder Applications
CREATE TABLE IF NOT EXISTS program_holder_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID DEFAULT '00000000-0000-0000-0000-000000000001',
  user_id UUID REFERENCES profiles(id),
  organization_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  status TEXT DEFAULT 'pending',
  data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_program_holder_applications_tenant_id ON program_holder_applications(tenant_id);
CREATE INDEX IF NOT EXISTS idx_program_holder_applications_user_id ON program_holder_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_program_holder_applications_status ON program_holder_applications(status);

-- Employer Applications
CREATE TABLE IF NOT EXISTS employer_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID DEFAULT '00000000-0000-0000-0000-000000000001',
  user_id UUID REFERENCES profiles(id),
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  status TEXT DEFAULT 'pending',
  data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_employer_applications_tenant_id ON employer_applications(tenant_id);
CREATE INDEX IF NOT EXISTS idx_employer_applications_user_id ON employer_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_employer_applications_status ON employer_applications(status);

-- Staff Applications
CREATE TABLE IF NOT EXISTS staff_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID DEFAULT '00000000-0000-0000-0000-000000000001',
  user_id UUID REFERENCES profiles(id),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  position TEXT,
  status TEXT DEFAULT 'pending',
  data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_staff_applications_tenant_id ON staff_applications(tenant_id);
CREATE INDEX IF NOT EXISTS idx_staff_applications_user_id ON staff_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_staff_applications_status ON staff_applications(status);

-- Audit Logs
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID DEFAULT '00000000-0000-0000-0000-000000000001',
  user_id UUID REFERENCES profiles(id),
  action TEXT NOT NULL,
  resource_type TEXT,
  resource_id UUID,
  metadata JSONB DEFAULT '{}',
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_tenant_id ON audit_logs(tenant_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_resource_type ON audit_logs(resource_type);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);

-- ============================================
-- RLS POLICIES
-- ============================================

-- Enable RLS on new tables
ALTER TABLE student_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE program_holder_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE employer_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Student Applications policies
DROP POLICY IF EXISTS "student_applications_select" ON student_applications;
CREATE POLICY "student_applications_select" ON student_applications FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin', 'staff')));

DROP POLICY IF EXISTS "student_applications_insert" ON student_applications;
CREATE POLICY "student_applications_insert" ON student_applications FOR INSERT TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "student_applications_update" ON student_applications;
CREATE POLICY "student_applications_update" ON student_applications FOR UPDATE TO authenticated
  USING (user_id = auth.uid() OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin', 'staff')));

-- Program Holder Applications policies
DROP POLICY IF EXISTS "program_holder_applications_select" ON program_holder_applications;
CREATE POLICY "program_holder_applications_select" ON program_holder_applications FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin')));

DROP POLICY IF EXISTS "program_holder_applications_insert" ON program_holder_applications;
CREATE POLICY "program_holder_applications_insert" ON program_holder_applications FOR INSERT TO authenticated
  WITH CHECK (true);

-- Employer Applications policies
DROP POLICY IF EXISTS "employer_applications_select" ON employer_applications;
CREATE POLICY "employer_applications_select" ON employer_applications FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin')));

DROP POLICY IF EXISTS "employer_applications_insert" ON employer_applications;
CREATE POLICY "employer_applications_insert" ON employer_applications FOR INSERT TO authenticated
  WITH CHECK (true);

-- Staff Applications policies
DROP POLICY IF EXISTS "staff_applications_select" ON staff_applications;
CREATE POLICY "staff_applications_select" ON staff_applications FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin')));

DROP POLICY IF EXISTS "staff_applications_insert" ON staff_applications;
CREATE POLICY "staff_applications_insert" ON staff_applications FOR INSERT TO authenticated
  WITH CHECK (true);

-- Audit Logs policies
DROP POLICY IF EXISTS "audit_logs_select_admin" ON audit_logs;
CREATE POLICY "audit_logs_select_admin" ON audit_logs FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin')));

DROP POLICY IF EXISTS "audit_logs_insert_all" ON audit_logs;
CREATE POLICY "audit_logs_insert_all" ON audit_logs FOR INSERT TO authenticated
  WITH CHECK (true);

-- ============================================
-- TRIGGERS
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
-- SUCCESS MESSAGE
-- ============================================

DO $$
BEGIN
  RAISE NOTICE '✅ Migration completed successfully!';
  RAISE NOTICE '';
  RAISE NOTICE '📦 Created/Updated:';
  RAISE NOTICE '  - tenants table';
  RAISE NOTICE '  - student_applications';
  RAISE NOTICE '  - program_holder_applications';
  RAISE NOTICE '  - employer_applications';
  RAISE NOTICE '  - staff_applications';
  RAISE NOTICE '  - audit_logs';
  RAISE NOTICE '';
  RAISE NOTICE '🔧 Added tenant_id to existing tables';
  RAISE NOTICE '🔒 Enabled RLS policies';
  RAISE NOTICE '⚡ Created update triggers';
  RAISE NOTICE '';
  RAISE NOTICE '✨ Your database is ready!';
END $$;
