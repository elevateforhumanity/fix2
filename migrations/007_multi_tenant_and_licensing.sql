-- MULTI-TENANT AND LICENSING SYSTEM

-- Tenants Table
CREATE TABLE IF NOT EXISTS tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  domain TEXT UNIQUE,
  logo_url TEXT,
  primary_color TEXT DEFAULT '#f97316',
  secondary_color TEXT DEFAULT '#0ea5e9',
  contact_email TEXT,
  contact_phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  settings JSONB DEFAULT '{}',
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Licenses Table
CREATE TABLE IF NOT EXISTS licenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  state TEXT NOT NULL DEFAULT 'trial' CHECK (state IN ('trial', 'active', 'suspended', 'expired')),
  plan TEXT NOT NULL DEFAULT 'basic' CHECK (plan IN ('basic', 'professional', 'enterprise', 'custom')),
  started_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  max_students INTEGER,
  max_programs INTEGER,
  max_staff INTEGER,
  features JSONB DEFAULT '{}',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- License History Table
CREATE TABLE IF NOT EXISTS license_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  license_id UUID REFERENCES licenses(id) ON DELETE CASCADE,
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  old_state TEXT,
  new_state TEXT,
  old_plan TEXT,
  new_plan TEXT,
  changed_by UUID REFERENCES auth.users(id),
  reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add tenant_id to profiles if not exists
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'tenant_id'
  ) THEN
    ALTER TABLE profiles ADD COLUMN tenant_id UUID REFERENCES tenants(id);
  END IF;
END $$;

-- Create default tenant
INSERT INTO tenants (id, name, slug, contact_email, contact_phone)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'Elevate for Humanity',
  'elevate-for-humanity',
  'info@elevateforhumanity.org',
  '317-314-3757'
) ON CONFLICT (id) DO NOTHING;

-- Create default license
INSERT INTO licenses (tenant_id, state, plan, max_students, max_programs, max_staff)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'active',
  'enterprise',
  10000,
  1000,
  100
) ON CONFLICT DO NOTHING;

-- Indexes
CREATE INDEX IF NOT EXISTS idx_tenants_slug ON tenants(slug);
CREATE INDEX IF NOT EXISTS idx_tenants_domain ON tenants(domain);
CREATE INDEX IF NOT EXISTS idx_tenants_active ON tenants(active);
CREATE INDEX IF NOT EXISTS idx_licenses_tenant_id ON licenses(tenant_id);
CREATE INDEX IF NOT EXISTS idx_licenses_state ON licenses(state);
CREATE INDEX IF NOT EXISTS idx_license_history_tenant_id ON license_history(tenant_id);
CREATE INDEX IF NOT EXISTS idx_profiles_tenant_id ON profiles(tenant_id);

-- RLS Policies for Tenants
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Super admins can view all tenants"
  ON tenants FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'super_admin'
    )
  );

CREATE POLICY "Users can view their own tenant"
  ON tenants FOR SELECT
  USING (
    id IN (
      SELECT tenant_id FROM profiles
      WHERE profiles.id = auth.uid()
    )
  );

CREATE POLICY "Super admins can manage tenants"
  ON tenants FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'super_admin'
    )
  );

-- RLS Policies for Licenses
ALTER TABLE licenses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Super admins can view all licenses"
  ON licenses FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'super_admin'
    )
  );

CREATE POLICY "Admins can view their tenant license"
  ON licenses FOR SELECT
  USING (
    tenant_id IN (
      SELECT tenant_id FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'org_admin')
    )
  );

CREATE POLICY "Super admins can manage licenses"
  ON licenses FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'super_admin'
    )
  );

-- RLS Policies for License History
ALTER TABLE license_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Super admins can view license history"
  ON license_history FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'super_admin'
    )
  );

CREATE POLICY "Admins can view their tenant license history"
  ON license_history FOR SELECT
  USING (
    tenant_id IN (
      SELECT tenant_id FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'org_admin')
    )
  );

-- Function to check license state
CREATE OR REPLACE FUNCTION check_license_active(tenant_uuid UUID)
RETURNS BOOLEAN AS $$
DECLARE
  license_state TEXT;
  license_expires TIMESTAMPTZ;
BEGIN
  SELECT state, expires_at INTO license_state, license_expires
  FROM licenses
  WHERE tenant_id = tenant_uuid
  ORDER BY created_at DESC
  LIMIT 1;

  IF license_state IS NULL THEN
    RETURN false;
  END IF;

  IF license_state = 'suspended' OR license_state = 'expired' THEN
    RETURN false;
  END IF;

  IF license_expires IS NOT NULL AND license_expires < NOW() THEN
    RETURN false;
  END IF;

  RETURN true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to log license changes
CREATE OR REPLACE FUNCTION log_license_change()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'UPDATE' AND (OLD.state != NEW.state OR OLD.plan != NEW.plan) THEN
    INSERT INTO license_history (
      license_id,
      tenant_id,
      old_state,
      new_state,
      old_plan,
      new_plan,
      changed_by
    ) VALUES (
      NEW.id,
      NEW.tenant_id,
      OLD.state,
      NEW.state,
      OLD.plan,
      NEW.plan,
      auth.uid()
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER license_change_trigger
  AFTER UPDATE ON licenses
  FOR EACH ROW
  EXECUTE FUNCTION log_license_change();

-- Updated_at triggers
CREATE TRIGGER update_tenants_updated_at
  BEFORE UPDATE ON tenants
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_licenses_updated_at
  BEFORE UPDATE ON licenses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
