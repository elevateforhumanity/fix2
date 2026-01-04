-- SAFE MIGRATION - Works with existing database
-- Only creates missing tables and columns
-- Version: 2026-01-04

-- ============================================
-- ADD MISSING COLUMNS TO EXISTING TABLES
-- ============================================

-- Add domain column to tenants if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'tenants' AND column_name = 'domain'
  ) THEN
    ALTER TABLE tenants ADD COLUMN domain TEXT UNIQUE;
    CREATE INDEX IF NOT EXISTS idx_tenants_domain ON tenants(domain);
  END IF;
END $$;

-- ============================================
-- CREATE MISSING TABLES
-- ============================================

-- Student Applications
CREATE TABLE IF NOT EXISTS student_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID,
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
  tenant_id UUID,
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
  tenant_id UUID,
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
  tenant_id UUID,
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
  tenant_id UUID,
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
-- RLS POLICIES FOR NEW TABLES
-- ============================================

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

-- Audit Logs policies (read-only for admins, insert for all)
DROP POLICY IF EXISTS "audit_logs_select_admin" ON audit_logs;
CREATE POLICY "audit_logs_select_admin" ON audit_logs FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin')));

DROP POLICY IF EXISTS "audit_logs_insert_all" ON audit_logs;
CREATE POLICY "audit_logs_insert_all" ON audit_logs FOR INSERT TO authenticated
  WITH CHECK (true);

-- ============================================
-- UPDATE TRIGGERS
-- ============================================

-- Create or replace the update trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers to new tables
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
-- VERIFICATION
-- ============================================

-- Show created tables
DO $$
BEGIN
  RAISE NOTICE '✅ Migration completed successfully!';
  RAISE NOTICE '';
  RAISE NOTICE 'Created tables:';
  RAISE NOTICE '  - student_applications';
  RAISE NOTICE '  - program_holder_applications';
  RAISE NOTICE '  - employer_applications';
  RAISE NOTICE '  - staff_applications';
  RAISE NOTICE '  - audit_logs';
  RAISE NOTICE '';
  RAISE NOTICE 'Next steps:';
  RAISE NOTICE '  1. Test enrollment API';
  RAISE NOTICE '  2. Test application forms';
  RAISE NOTICE '  3. Verify portal access';
END $$;
