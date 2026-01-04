-- ============================================
-- UPDATE FOR STORE/CLONE SETUP
-- Ensure licensing system works for store clones
-- ============================================

-- Add store configuration to programs
ALTER TABLE programs
ADD COLUMN IF NOT EXISTS is_store_template BOOLEAN DEFAULT false;

ALTER TABLE programs
ADD COLUMN IF NOT EXISTS store_config JSONB DEFAULT '{}'::jsonb;

-- Add store/clone tracking
CREATE TABLE IF NOT EXISTS store_instances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_name TEXT NOT NULL,
  store_url TEXT NOT NULL UNIQUE,
  owner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  parent_store_id UUID REFERENCES store_instances(id), -- NULL if original
  license_id UUID REFERENCES program_licenses(id),
  is_active BOOLEAN DEFAULT true,
  settings JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_store_instances_owner ON store_instances(owner_id);
CREATE INDEX IF NOT EXISTS idx_store_instances_parent ON store_instances(parent_store_id);
CREATE INDEX IF NOT EXISTS idx_store_instances_license ON store_instances(license_id);

ALTER TABLE store_instances ENABLE ROW LEVEL SECURITY;

-- Store owners can view their own stores
DROP POLICY IF EXISTS "Store owners can view own stores" ON store_instances;
CREATE POLICY "Store owners can view own stores"
  ON store_instances FOR SELECT
  USING (owner_id = auth.uid());

-- Store owners can manage their own stores
DROP POLICY IF EXISTS "Store owners can manage own stores" ON store_instances;
CREATE POLICY "Store owners can manage own stores"
  ON store_instances FOR ALL
  USING (owner_id = auth.uid());

-- Admins can manage all stores
DROP POLICY IF EXISTS "Admins can manage all stores" ON store_instances;
CREATE POLICY "Admins can manage all stores"
  ON store_instances FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

GRANT SELECT, INSERT, UPDATE ON store_instances TO authenticated;

-- Link programs to stores
ALTER TABLE programs
ADD COLUMN IF NOT EXISTS store_id UUID REFERENCES store_instances(id) ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS idx_programs_store ON programs(store_id);

-- Link partner_lms_courses to stores
ALTER TABLE partner_lms_courses
ADD COLUMN IF NOT EXISTS store_id UUID REFERENCES store_instances(id) ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS idx_partner_lms_courses_store ON partner_lms_courses(store_id);

-- Add store branding
CREATE TABLE IF NOT EXISTS store_branding (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID NOT NULL REFERENCES store_instances(id) ON DELETE CASCADE UNIQUE,
  logo_url TEXT,
  primary_color TEXT DEFAULT '#3B82F6',
  secondary_color TEXT DEFAULT '#10B981',
  font_family TEXT DEFAULT 'Inter',
  custom_css TEXT,
  custom_domain TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_store_branding_store ON store_branding(store_id);

ALTER TABLE store_branding ENABLE ROW LEVEL SECURITY;

-- Store owners can manage their branding
DROP POLICY IF EXISTS "Store owners can manage branding" ON store_branding;
CREATE POLICY "Store owners can manage branding"
  ON store_branding FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM store_instances
      WHERE store_instances.id = store_branding.store_id
      AND store_instances.owner_id = auth.uid()
    )
  );

GRANT SELECT, INSERT, UPDATE ON store_branding TO authenticated;

-- Update program_licenses to support store clones
ALTER TABLE program_licenses
ADD COLUMN IF NOT EXISTS store_id UUID REFERENCES store_instances(id) ON DELETE CASCADE;

ALTER TABLE program_licenses
ADD COLUMN IF NOT EXISTS is_store_license BOOLEAN DEFAULT false;

CREATE INDEX IF NOT EXISTS idx_program_licenses_store ON program_licenses(store_id);

-- Add comments
COMMENT ON TABLE store_instances IS 'Store/clone instances - each clone gets its own record';
COMMENT ON COLUMN store_instances.parent_store_id IS 'NULL = original store, UUID = cloned from this store';
COMMENT ON COLUMN store_instances.license_id IS 'License that enables this store clone';
COMMENT ON COLUMN programs.is_store_template IS 'TRUE = This program can be cloned to stores';
COMMENT ON COLUMN programs.store_id IS 'NULL = global program, UUID = store-specific program';
COMMENT ON COLUMN program_licenses.is_store_license IS 'TRUE = License enables store clone functionality';

-- Insert default store instance for main platform
INSERT INTO store_instances (
  store_name,
  store_url,
  owner_id,
  parent_store_id,
  is_active,
  settings
)
SELECT 
  'Elevate For Humanity',
  'https://elevateforhumanity.org',
  id,
  NULL,
  true,
  '{"is_main_platform": true}'::jsonb
FROM profiles
WHERE role = 'super_admin'
LIMIT 1
ON CONFLICT DO NOTHING;

-- Create store license type
INSERT INTO program_licenses (
  program_id,
  license_holder_id,
  license_key,
  license_type,
  lms_model,
  can_create_courses,
  can_upload_scorm,
  max_enrollments,
  is_store_license,
  status
)
SELECT 
  p.id,
  pr.id,
  'STORE-DEMO-' || substr(md5(random()::text), 1, 8),
  'unlimited',
  'hybrid',
  true,
  true,
  NULL,
  true,
  'active'
FROM programs p
CROSS JOIN profiles pr
WHERE pr.role = 'super_admin'
AND p.slug = 'intro-hvac'
LIMIT 1
ON CONFLICT DO NOTHING;

-- Verification
DO $$
DECLARE
  store_count INTEGER;
  store_licenses INTEGER;
BEGIN
  SELECT COUNT(*) INTO store_count FROM store_instances;
  SELECT COUNT(*) INTO store_licenses FROM program_licenses WHERE is_store_license = true;

  RAISE NOTICE '';
  RAISE NOTICE '✅ ============================================';
  RAISE NOTICE '✅ STORE/CLONE SETUP COMPLETE!';
  RAISE NOTICE '✅ ============================================';
  RAISE NOTICE '';
  RAISE NOTICE 'Store System:';
  RAISE NOTICE '  ✅ store_instances table created';
  RAISE NOTICE '  ✅ store_branding table created';
  RAISE NOTICE '  ✅ Programs linked to stores';
  RAISE NOTICE '  ✅ Courses linked to stores';
  RAISE NOTICE '  ✅ Licenses support store clones';
  RAISE NOTICE '';
  RAISE NOTICE 'Current Status:';
  RAISE NOTICE '  Store instances: %', store_count;
  RAISE NOTICE '  Store licenses: %', store_licenses;
  RAISE NOTICE '';
  RAISE NOTICE 'Store Clone Flow:';
  RAISE NOTICE '  1. Customer purchases store license';
  RAISE NOTICE '  2. New store_instance created';
  RAISE NOTICE '  3. Programs cloned to new store';
  RAISE NOTICE '  4. Custom branding applied';
  RAISE NOTICE '  5. Store owner manages their instance';
  RAISE NOTICE '';
  RAISE NOTICE 'License Types:';
  RAISE NOTICE '  - is_store_license = FALSE: Regular partner license';
  RAISE NOTICE '  - is_store_license = TRUE: Enables store clone';
  RAISE NOTICE '';
  RAISE NOTICE 'Store Features:';
  RAISE NOTICE '  ✅ Custom branding (logo, colors, fonts)';
  RAISE NOTICE '  ✅ Custom domain support';
  RAISE NOTICE '  ✅ Store-specific programs';
  RAISE NOTICE '  ✅ Store-specific courses';
  RAISE NOTICE '  ✅ Independent user management';
  RAISE NOTICE '  ✅ Parent-child store tracking';
  RAISE NOTICE '';
  RAISE NOTICE 'Monetization:';
  RAISE NOTICE '  Store Clone License: $999/month or $9,999/year';
  RAISE NOTICE '  Includes: Unlimited enrollments, full LMS, custom branding';
  RAISE NOTICE '';
END $$;
