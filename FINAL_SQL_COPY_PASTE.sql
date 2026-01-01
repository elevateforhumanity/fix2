-- ============================================================================
-- ELEVATE FOR HUMANITY - FINAL DEPLOYMENT SQL
-- Copy and paste this ENTIRE file into Supabase SQL Editor
-- ============================================================================

-- Step 1: Create licenses table for white-label system
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
CREATE INDEX IF NOT EXISTS idx_licenses_status ON licenses(status);
CREATE INDEX IF NOT EXISTS idx_licenses_expires_at ON licenses(expires_at);

CREATE TABLE IF NOT EXISTS license_validations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  license_id UUID REFERENCES licenses(id) ON DELETE CASCADE,
  validated_at TIMESTAMPTZ DEFAULT NOW(),
  ip_address TEXT,
  user_agent TEXT,
  result TEXT NOT NULL CHECK (result IN ('valid', 'expired', 'invalid', 'suspended')),
  metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_license_validations_license_id ON license_validations(license_id);
CREATE INDEX IF NOT EXISTS idx_license_validations_validated_at ON license_validations(validated_at);

ALTER TABLE licenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE license_validations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role can manage licenses" ON licenses;
CREATE POLICY "Service role can manage licenses"
  ON licenses FOR ALL
  USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Service role can manage validations" ON license_validations;
CREATE POLICY "Service role can manage validations"
  ON license_validations FOR ALL
  USING (auth.role() = 'service_role');

CREATE OR REPLACE FUNCTION update_license_validation()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE licenses
  SET 
    last_validated_at = NEW.validated_at,
    validation_count = validation_count + 1,
    updated_at = NOW()
  WHERE id = NEW.license_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_license_validation ON license_validations;
CREATE TRIGGER trigger_update_license_validation
  AFTER INSERT ON license_validations
  FOR EACH ROW
  EXECUTE FUNCTION update_license_validation();

-- Step 2: Update blog_posts table
-- ============================================================================

ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS author_name TEXT DEFAULT 'Elevate for Humanity';
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS featured_image TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS tags TEXT[];
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS views INTEGER DEFAULT 0;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS reading_time INTEGER;

-- Step 3: Seed real blog posts
-- ============================================================================

INSERT INTO blog_posts (
  title, slug, excerpt, content, category, status, published_at, author_name, tags, reading_time
) VALUES
(
  'Understanding WIOA Funding: Your Path to Free Career Training',
  'understanding-wioa-funding',
  'The Workforce Innovation and Opportunity Act (WIOA) provides funding for career training at no cost to eligible individuals.',
  E'# Understanding WIOA Funding\n\nWIOA provides free career training for eligible individuals.\n\n## Who Qualifies?\n- Unemployed or underemployed adults\n- Dislocated workers\n- Youth facing barriers\n- Veterans\n\nContact your local WorkOne center or visit elevateforhumanity.org',
  'Resource', 'published', NOW(), 'Elevate for Humanity', ARRAY['WIOA', 'Funding', 'Career Training'], 3
),
(
  'HVAC Technician Careers: High Demand in Indiana',
  'hvac-technician-demand-indiana',
  'Indiana needs 1,200+ HVAC technicians annually.',
  E'# HVAC Technician Careers in Indiana\n\nHVAC technicians are in high demand. Starting salaries: $35,000-$45,000.\n\n## Why HVAC?\n- Job security\n- Good wages\n- Quick training\n\nLearn more at elevateforhumanity.org/programs/hvac-technician',
  'Career Insights', 'published', NOW() - INTERVAL '5 days', 'Elevate for Humanity', ARRAY['HVAC', 'Career', 'Indiana'], 4
),
(
  'Registered Apprenticeships: Earn While You Learn',
  'registered-apprenticeships',
  'Registered apprenticeships combine paid work with training.',
  E'# Registered Apprenticeships\n\nEarn while learning. Our DOL-registered apprenticeships:\n- Barber (2,000 hours)\n- HVAC (3-4 years)\n- Building Maintenance (2-3 years)\n\nApply at elevateforhumanity.org/apprenticeships',
  'Programs', 'published', NOW() - INTERVAL '10 days', 'Elevate for Humanity', ARRAY['Apprenticeship', 'DOL'], 5
)
ON CONFLICT (slug) DO NOTHING;

-- Step 4: Add missing apprenticeships (using actual column names)
-- ============================================================================

INSERT INTO programs (
    slug,
    name,
    title,
    description,
    category,
    duration_weeks,
    estimated_weeks,
    funding_eligibility,
    is_active,
    wioa_approved,
    dol_registered
) VALUES
(
    'esthetician-apprenticeship',
    'Esthetician Apprenticeship',
    'Esthetician Apprenticeship',
    'Become a licensed esthetician through registered apprenticeship. Learn skincare treatments, facials, waxing, and spa services while earning.',
    'Beauty & Wellness',
    26,
    26,
    'WIOA eligible',
    true,
    true,
    true
),
(
    'ems-apprenticeship',
    'Emergency Medical Services Apprenticeship',
    'EMS Apprenticeship',
    'Gain emergency medical skills through EMS apprenticeship. Work with experienced paramedics while completing certification.',
    'Healthcare',
    52,
    52,
    'WIOA eligible',
    true,
    true,
    true
),
(
    'culinary-apprenticeship',
    'Culinary Arts Apprenticeship',
    'Culinary Apprenticeship',
    'Learn culinary arts in professional kitchens. Work with chefs, master techniques, food safety, and kitchen management.',
    'Hospitality',
    104,
    104,
    'WIOA eligible',
    true,
    true,
    true
),
(
    'nail-technician-apprenticeship',
    'Nail Technician Apprenticeship',
    'Nail Tech Apprenticeship',
    'Learn manicures, pedicures, nail art through registered apprenticeship. Train in salons while earning and building clientele.',
    'Beauty & Wellness',
    26,
    26,
    'WIOA eligible',
    true,
    true,
    true
)
ON CONFLICT (slug) DO NOTHING;

-- Step 5: Fix slug mismatches
-- ============================================================================

UPDATE programs 
SET slug = 'building-maintenance-apprenticeship'
WHERE slug = 'building-technician';

-- ============================================================================
-- ✅ VERIFICATION - Check everything worked
-- ============================================================================

SELECT 
  'Licenses table' as item,
  COUNT(*)::text as count
FROM information_schema.tables 
WHERE table_name = 'licenses'

UNION ALL

SELECT 
  'Blog posts',
  COUNT(*)::text
FROM blog_posts 
WHERE status = 'published'

UNION ALL

SELECT 
  'Total programs',
  COUNT(*)::text
FROM programs

UNION ALL

SELECT 
  'New apprenticeships',
  COUNT(*)::text
FROM programs
WHERE slug IN ('esthetician-apprenticeship', 'ems-apprenticeship', 'culinary-apprenticeship', 'nail-technician-apprenticeship');

-- ============================================================================
-- ✅ DONE! Your site is ready for deployment
-- ============================================================================
