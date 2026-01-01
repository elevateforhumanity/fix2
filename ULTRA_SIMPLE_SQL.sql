-- ============================================================================
-- ULTRA SIMPLE SQL - Only what's needed
-- ============================================================================

-- Step 1: Fix licenses table
-- ============================================================================

ALTER TABLE licenses ADD COLUMN IF NOT EXISTS domain TEXT;
ALTER TABLE licenses ADD COLUMN IF NOT EXISTS customer_email TEXT;
ALTER TABLE licenses ADD COLUMN IF NOT EXISTS tier TEXT;
ALTER TABLE licenses ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active';
ALTER TABLE licenses ADD COLUMN IF NOT EXISTS features JSONB DEFAULT '[]'::jsonb;
ALTER TABLE licenses ADD COLUMN IF NOT EXISTS max_deployments INTEGER DEFAULT 1;
ALTER TABLE licenses ADD COLUMN IF NOT EXISTS max_users INTEGER DEFAULT 50;
ALTER TABLE licenses ADD COLUMN IF NOT EXISTS expires_at TIMESTAMPTZ;
ALTER TABLE licenses ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;

CREATE TABLE IF NOT EXISTS license_validations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  license_id UUID REFERENCES licenses(id) ON DELETE CASCADE,
  validated_at TIMESTAMPTZ DEFAULT NOW(),
  result TEXT
);

ALTER TABLE licenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE license_validations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role licenses" ON licenses;
CREATE POLICY "Service role licenses" ON licenses FOR ALL USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Service role validations" ON license_validations;
CREATE POLICY "Service role validations" ON license_validations FOR ALL USING (auth.role() = 'service_role');

-- Step 2: Add blog columns
-- ============================================================================

ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS author_name TEXT DEFAULT 'Elevate for Humanity';
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS tags TEXT[];

-- Step 3: Add blog posts (minimal fields)
-- ============================================================================

INSERT INTO blog_posts (title, slug, content)
SELECT * FROM (VALUES
  ('Understanding WIOA Funding', 'wioa-funding', 'WIOA provides free career training for eligible individuals. Contact your local WorkOne center.'),
  ('HVAC Careers in Indiana', 'hvac-careers', 'HVAC technicians are in high demand. Starting salaries: $35,000-$45,000.'),
  ('Registered Apprenticeships', 'apprenticeships', 'Earn while you learn. Our DOL-registered apprenticeships include Barber, HVAC, and Building Maintenance.')
) AS v(title, slug, content)
WHERE NOT EXISTS (SELECT 1 FROM blog_posts WHERE slug = v.slug);

-- Step 4: Add apprenticeships (minimal fields)
-- ============================================================================

INSERT INTO programs (slug, name, description, is_active)
SELECT * FROM (VALUES
  ('esthetician-apprenticeship', 'Esthetician Apprenticeship', 'Skincare and spa training.', true),
  ('ems-apprenticeship', 'EMS Apprenticeship', 'Emergency medical training.', true),
  ('culinary-apprenticeship', 'Culinary Apprenticeship', 'Professional cooking.', true),
  ('nail-tech-apprenticeship', 'Nail Tech Apprenticeship', 'Nail services training.', true)
) AS v(slug, name, description, is_active)
WHERE NOT EXISTS (SELECT 1 FROM programs WHERE slug = v.slug);

-- ✅ DONE
SELECT 'Complete!' as status;
