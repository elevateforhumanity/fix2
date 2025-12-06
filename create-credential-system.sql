-- ============================================
-- CREDENTIAL & PARTNER SYSTEM
-- ============================================
-- Creates tables for tracking credentials, certifications,
-- and credentialing partners (Milady, NRF, State Boards, etc.)

-- ============================================
-- 1. CREDENTIALING PARTNERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS credentialing_partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL CHECK (type IN ('state_board', 'industry', 'national', 'federal', 'internal')),
  description TEXT,
  website TEXT,
  logo_url TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  verification_url TEXT,
  active BOOLEAN DEFAULT true,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert major credentialing partners
INSERT INTO credentialing_partners (name, type, description, website, verification_url) VALUES
('Indiana State Board of Cosmetology', 'state_board', 'Issues barber and cosmetology licenses in Indiana', 'https://www.in.gov/pla/professions/cosmetology-and-barber-examiners/', 'https://mylicense.in.gov/'),
('Milady', 'industry', 'Leading provider of beauty and wellness education and certification', 'https://www.milady.com/', null),
('National Retail Federation (NRF)', 'industry', 'Rise Up retail certification program', 'https://nrf.com/riseup', 'https://nrf.com/riseup/verify'),
('American Red Cross', 'national', 'CPR, AED, and First Aid certifications', 'https://www.redcross.org/', 'https://www.redcross.org/take-a-class/digital-certificate'),
('OSHA', 'federal', 'Occupational Safety and Health Administration certifications', 'https://www.osha.gov/', null),
('EPA', 'federal', 'Environmental Protection Agency certifications (HVAC)', 'https://www.epa.gov/', null),
('HVAC Excellence', 'industry', 'HVAC industry certifications', 'https://www.hvacexcellence.org/', null),
('NCCER', 'industry', 'National Center for Construction Education and Research', 'https://www.nccer.org/', 'https://www.nccer.org/verification'),
('IRS VITA/TCE', 'federal', 'Volunteer Income Tax Assistance certification', 'https://www.irs.gov/individuals/irs-tax-volunteers', null),
('Indiana Department of Workforce Development', 'state_board', 'ETPL approved programs and workforce certifications', 'https://www.in.gov/dwd/', null),
('Elevate for Humanity', 'internal', 'Internal certificates of completion', 'https://www.elevateforhumanity.org', 'https://www.elevateforhumanity.org/verify'),
('EmployIndy', 'industry', 'Job Ready Indy (JRI) workforce readiness badges', 'https://employindy.org/', null)
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- 2. CREDENTIALS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS credentials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id UUID REFERENCES credentialing_partners(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  short_name TEXT,
  type TEXT NOT NULL CHECK (type IN ('license', 'certification', 'certificate', 'badge', 'credential')),
  description TEXT,
  cip_code TEXT,
  soc_codes TEXT[],
  requirements TEXT,
  validity_period_months INTEGER,
  renewal_required BOOLEAN DEFAULT false,
  stackable BOOLEAN DEFAULT false,
  industry_recognized BOOLEAN DEFAULT true,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert major credentials
INSERT INTO credentials (partner_id, name, short_name, type, description, validity_period_months, renewal_required) VALUES
((SELECT id FROM credentialing_partners WHERE name = 'Indiana State Board of Cosmetology'), 'Indiana Barber License', 'Barber License', 'license', 'State-issued barber license', 24, true),
((SELECT id FROM credentialing_partners WHERE name = 'Milady'), 'Milady Standard Barbering Certification', 'Milady Barber', 'certification', 'Industry-standard barbering certification', null, false),
((SELECT id FROM credentialing_partners WHERE name = 'National Retail Federation (NRF)'), 'Rise Up Credential', 'Rise Up', 'credential', 'Nationally recognized workforce readiness credential', null, false),
((SELECT id FROM credentialing_partners WHERE name = 'American Red Cross'), 'CPR/AED Certification', 'CPR/AED', 'certification', 'Cardiopulmonary resuscitation and automated external defibrillator', 24, true),
((SELECT id FROM credentialing_partners WHERE name = 'American Red Cross'), 'First Aid Certification', 'First Aid', 'certification', 'Basic first aid certification', 24, true),
((SELECT id FROM credentialing_partners WHERE name = 'OSHA'), 'OSHA 10-Hour Safety', 'OSHA 10', 'certification', '10-hour occupational safety training', null, false),
((SELECT id FROM credentialing_partners WHERE name = 'OSHA'), 'OSHA 30-Hour Safety', 'OSHA 30', 'certification', '30-hour occupational safety training', null, false),
((SELECT id FROM credentialing_partners WHERE name = 'EPA'), 'EPA 608 Certification', 'EPA 608', 'certification', 'Refrigerant handling certification for HVAC', null, false),
((SELECT id FROM credentialing_partners WHERE name = 'HVAC Excellence'), 'Residential HVAC Certification', 'HVAC Residential', 'certification', 'Residential HVAC systems certification', 36, true),
((SELECT id FROM credentialing_partners WHERE name = 'IRS VITA/TCE'), 'IRS VITA/TCE Certification', 'VITA/TCE', 'certification', 'Volunteer tax preparation certification', 12, true),
((SELECT id FROM credentialing_partners WHERE name = 'EmployIndy'), 'Job Ready Indy (JRI) Badge', 'JRI Badge', 'badge', 'Workforce readiness badge series', null, false),
((SELECT id FROM credentialing_partners WHERE name = 'Elevate for Humanity'), 'Certificate of Completion', 'Certificate', 'certificate', 'Program completion certificate', null, false)
ON CONFLICT DO NOTHING;

-- ============================================
-- 3. COURSE CREDENTIALS (Junction Table)
-- ============================================
CREATE TABLE IF NOT EXISTS course_credentials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  credential_id UUID REFERENCES credentials(id) ON DELETE CASCADE NOT NULL,
  is_primary BOOLEAN DEFAULT false,
  required BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(course_id, credential_id)
);

CREATE INDEX IF NOT EXISTS idx_course_credentials_course_id ON course_credentials(course_id);
CREATE INDEX IF NOT EXISTS idx_course_credentials_credential_id ON course_credentials(credential_id);

-- ============================================
-- 4. STUDENT CREDENTIALS (Earned Credentials)
-- ============================================
CREATE TABLE IF NOT EXISTS student_credentials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  credential_id UUID REFERENCES credentials(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES courses(id) ON DELETE SET NULL,
  enrollment_id UUID REFERENCES enrollments(id) ON DELETE SET NULL,
  credential_number TEXT,
  issued_date TIMESTAMPTZ DEFAULT NOW(),
  expiration_date TIMESTAMPTZ,
  verification_url TEXT,
  pdf_url TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'expired', 'revoked', 'suspended')),
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, credential_id, issued_date)
);

CREATE INDEX IF NOT EXISTS idx_student_credentials_user_id ON student_credentials(user_id);
CREATE INDEX IF NOT EXISTS idx_student_credentials_credential_id ON student_credentials(credential_id);
CREATE INDEX IF NOT EXISTS idx_student_credentials_status ON student_credentials(status);

-- Enable RLS
ALTER TABLE student_credentials ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own credentials"
  ON student_credentials FOR SELECT
  USING (auth.uid() = user_id);

-- ============================================
-- 5. ADD METADATA COLUMN TO COURSES
-- ============================================
ALTER TABLE courses ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS cip_code TEXT;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS soc_codes TEXT[];
ALTER TABLE courses ADD COLUMN IF NOT EXISTS provider TEXT;

CREATE INDEX IF NOT EXISTS idx_courses_cip_code ON courses(cip_code);
CREATE INDEX IF NOT EXISTS idx_courses_metadata ON courses USING gin(metadata);

-- ============================================
-- 6. VIEWS FOR EASY QUERYING
-- ============================================

-- View: Courses with their credentials
CREATE OR REPLACE VIEW course_credentials_view AS
SELECT 
  c.id as course_id,
  c.title as course_title,
  c.slug as course_slug,
  cr.id as credential_id,
  cr.name as credential_name,
  cr.short_name as credential_short_name,
  cr.type as credential_type,
  cp.name as partner_name,
  cp.type as partner_type,
  cc.is_primary,
  cc.required
FROM courses c
JOIN course_credentials cc ON c.id = cc.course_id
JOIN credentials cr ON cc.credential_id = cr.id
LEFT JOIN credentialing_partners cp ON cr.partner_id = cp.id
ORDER BY c.title, cc.order_index;

-- View: Student credentials with details
CREATE OR REPLACE VIEW student_credentials_view AS
SELECT 
  sc.id,
  sc.user_id,
  u.email as user_email,
  cr.name as credential_name,
  cr.short_name as credential_short_name,
  cr.type as credential_type,
  cp.name as partner_name,
  c.title as course_title,
  sc.credential_number,
  sc.issued_date,
  sc.expiration_date,
  sc.status,
  sc.verification_url
FROM student_credentials sc
JOIN credentials cr ON sc.credential_id = cr.id
LEFT JOIN credentialing_partners cp ON cr.partner_id = cp.id
LEFT JOIN courses c ON sc.course_id = c.id
LEFT JOIN auth.users u ON sc.user_id = u.id
ORDER BY sc.issued_date DESC;

-- ============================================
-- SUCCESS MESSAGE
-- ============================================
DO $$
BEGIN
  RAISE NOTICE '✅ Credential & Partner System Created!';
  RAISE NOTICE '📋 Tables: credentialing_partners, credentials, course_credentials, student_credentials';
  RAISE NOTICE '🎓 Partners: Indiana State Board, Milady, NRF, Red Cross, OSHA, EPA, HVAC Excellence, IRS, EmployIndy';
  RAISE NOTICE '🏆 Credentials: Licenses, Certifications, Certificates, Badges';
  RAISE NOTICE '🔗 Next: Link courses to credentials using course_credentials table';
END $$;
