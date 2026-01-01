-- ============================================================================
-- SIMPLE SQL THAT ACTUALLY WORKS
-- Copy and paste this into Supabase SQL Editor
-- ============================================================================

-- Step 1: Create licenses table (NEW TABLE - no conflicts)
-- ============================================================================

CREATE TABLE IF NOT EXISTS licenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  license_key TEXT NOT NULL UNIQUE,
  domain TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  tier TEXT NOT NULL CHECK (tier IN ('starter', 'business', 'enterprise')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'expired', 'suspended', 'cancelled')),
  features JSONB DEFAULT '[]'::jsonb,
  max_deployments INTEGER DEFAULT 1,
  max_users INTEGER DEFAULT 50,
  issued_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL,
  last_validated_at TIMESTAMPTZ,
  validation_count INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_licenses_domain ON licenses(domain);
CREATE INDEX IF NOT EXISTS idx_licenses_license_key ON licenses(license_key);

CREATE TABLE IF NOT EXISTS license_validations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  license_id UUID REFERENCES licenses(id) ON DELETE CASCADE,
  validated_at TIMESTAMPTZ DEFAULT NOW(),
  ip_address TEXT,
  user_agent TEXT,
  result TEXT NOT NULL CHECK (result IN ('valid', 'expired', 'invalid', 'suspended')),
  metadata JSONB DEFAULT '{}'::jsonb
);

ALTER TABLE licenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE license_validations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role can manage licenses" ON licenses;
CREATE POLICY "Service role can manage licenses" ON licenses FOR ALL USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Service role can manage validations" ON license_validations;
CREATE POLICY "Service role can manage validations" ON license_validations FOR ALL USING (auth.role() = 'service_role');

-- Step 2: Add blog post columns (safe - only adds if missing)
-- ============================================================================

ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS author_name TEXT DEFAULT 'Elevate for Humanity';
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS tags TEXT[];
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS reading_time INTEGER;

-- Step 3: Add 3 real blog posts
-- ============================================================================

INSERT INTO blog_posts (title, slug, excerpt, content, category, status, published_at, author_name, tags, reading_time)
SELECT * FROM (VALUES
  ('Understanding WIOA Funding', 'understanding-wioa-funding', 'WIOA provides free career training.', 'WIOA provides free career training for eligible individuals. Contact your local WorkOne center.', 'Resource', 'published', NOW(), 'Elevate for Humanity', ARRAY['WIOA', 'Funding'], 3),
  ('HVAC Careers in Indiana', 'hvac-careers-indiana', 'High demand for HVAC technicians.', 'HVAC technicians earn $35,000-$70,000+ in Indiana. Quick training, job security.', 'Career', 'published', NOW(), 'Elevate for Humanity', ARRAY['HVAC', 'Career'], 4),
  ('Registered Apprenticeships', 'registered-apprenticeships', 'Earn while you learn.', 'Our DOL-registered apprenticeships: Barber, HVAC, Building Maintenance. Get paid from day one.', 'Programs', 'published', NOW(), 'Elevate for Humanity', ARRAY['Apprenticeship'], 5)
) AS v(title, slug, excerpt, content, category, status, published_at, author_name, tags, reading_time)
WHERE NOT EXISTS (SELECT 1 FROM blog_posts WHERE slug = v.slug);

-- Step 4: Add 4 new apprenticeships (using ONLY columns that exist)
-- ============================================================================

INSERT INTO programs (slug, name, title, description, category, is_active)
SELECT * FROM (VALUES
  ('esthetician-apprenticeship', 'Esthetician Apprenticeship', 'Esthetician Apprenticeship', 'Licensed esthetician training through apprenticeship.', 'Beauty & Wellness', true),
  ('ems-apprenticeship', 'EMS Apprenticeship', 'EMS Apprenticeship', 'Emergency medical services training.', 'Healthcare', true),
  ('culinary-apprenticeship', 'Culinary Apprenticeship', 'Culinary Apprenticeship', 'Professional cooking training.', 'Hospitality', true),
  ('nail-tech-apprenticeship', 'Nail Tech Apprenticeship', 'Nail Tech Apprenticeship', 'Nail technician training.', 'Beauty & Wellness', true)
) AS v(slug, name, title, description, category, is_active)
WHERE NOT EXISTS (SELECT 1 FROM programs WHERE slug = v.slug);

-- ============================================================================
-- ✅ DONE! Check results:
-- ============================================================================

SELECT 'Licenses table created' as status
WHERE EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'licenses')
UNION ALL
SELECT 'Blog posts: ' || COUNT(*)::text FROM blog_posts WHERE status = 'published'
UNION ALL
SELECT 'Programs: ' || COUNT(*)::text FROM programs;
