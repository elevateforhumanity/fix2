-- Grant Autopilot System - Complete Database Schema
-- Run this in Supabase SQL Editor

-- =====================================================
-- GRANT SOURCES
-- =====================================================
CREATE TABLE IF NOT EXISTS grant_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL,
  base_url TEXT,
  api_key TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- GRANT OPPORTUNITIES
-- =====================================================
CREATE TABLE IF NOT EXISTS grant_opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id UUID REFERENCES grant_sources(id),
  external_id TEXT NOT NULL,
  title TEXT NOT NULL,
  agency TEXT,
  summary TEXT,
  eligibility TEXT,
  naics_tags TEXT[] DEFAULT '{}',
  categories TEXT[] DEFAULT '{}',
  location_limit TEXT,
  due_date DATE,
  url TEXT,
  cfda_number TEXT,
  raw_json JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(source_id, external_id)
);

CREATE INDEX IF NOT EXISTS idx_grant_opportunities_due_date ON grant_opportunities(due_date);
CREATE INDEX IF NOT EXISTS idx_grant_opportunities_naics ON grant_opportunities USING GIN(naics_tags);
CREATE INDEX IF NOT EXISTS idx_grant_opportunities_categories ON grant_opportunities USING GIN(categories);

-- =====================================================
-- ENTITIES (Organizations)
-- =====================================================
CREATE TABLE IF NOT EXISTS entities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  entity_type TEXT CHECK (entity_type IN ('nonprofit', 'for_profit', 'government', 'educational')),
  uei TEXT,
  cage_code TEXT,
  ein TEXT,
  naics_list TEXT[] DEFAULT '{}',
  address TEXT,
  city TEXT,
  state TEXT,
  zip TEXT,
  phone TEXT,
  email TEXT,
  congressional_district TEXT,
  capability_narrative TEXT,
  org_history TEXT,
  key_personnel TEXT,
  contact_first_name TEXT,
  contact_last_name TEXT,
  contact_title TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_entities_uei ON entities(uei);
CREATE INDEX IF NOT EXISTS idx_entities_naics ON entities USING GIN(naics_list);

-- =====================================================
-- ENTITY ELIGIBILITY CHECKS
-- =====================================================
CREATE TABLE IF NOT EXISTS entity_eligibility_checks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_id UUID REFERENCES entities(id) ON DELETE CASCADE,
  uei TEXT,
  sam_registered BOOLEAN DEFAULT false,
  sam_active BOOLEAN DEFAULT false,
  uei_valid BOOLEAN DEFAULT false,
  cage_valid BOOLEAN DEFAULT false,
  not_excluded BOOLEAN DEFAULT false,
  reps_certs_current BOOLEAN DEFAULT false,
  registration_not_expired BOOLEAN DEFAULT false,
  issues TEXT[] DEFAULT '{}',
  warnings TEXT[] DEFAULT '{}',
  eligible BOOLEAN DEFAULT false,
  score INTEGER DEFAULT 0,
  checked_at TIMESTAMPTZ DEFAULT NOW(),
  sam_data JSONB,
  UNIQUE(entity_id)
);

CREATE INDEX IF NOT EXISTS idx_entity_eligibility_entity ON entity_eligibility_checks(entity_id);

-- =====================================================
-- GRANT MATCHES
-- =====================================================
CREATE TABLE IF NOT EXISTS grant_matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  grant_id UUID REFERENCES grant_opportunities(id) ON DELETE CASCADE,
  entity_id UUID REFERENCES entities(id) ON DELETE CASCADE,
  match_score INTEGER DEFAULT 0,
  reasons TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(grant_id, entity_id)
);

CREATE INDEX IF NOT EXISTS idx_grant_matches_grant ON grant_matches(grant_id);
CREATE INDEX IF NOT EXISTS idx_grant_matches_entity ON grant_matches(entity_id);
CREATE INDEX IF NOT EXISTS idx_grant_matches_score ON grant_matches(match_score DESC);

-- =====================================================
-- GRANT APPLICATIONS
-- =====================================================
CREATE TABLE IF NOT EXISTS grant_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  grant_id UUID REFERENCES grant_opportunities(id) ON DELETE CASCADE,
  entity_id UUID REFERENCES entities(id) ON DELETE CASCADE,
  draft_title TEXT,
  draft_narrative TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'ready', 'submitted', 'awarded', 'rejected')),
  submitted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(grant_id, entity_id)
);

CREATE INDEX IF NOT EXISTS idx_grant_applications_grant ON grant_applications(grant_id);
CREATE INDEX IF NOT EXISTS idx_grant_applications_entity ON grant_applications(entity_id);
CREATE INDEX IF NOT EXISTS idx_grant_applications_status ON grant_applications(status);

-- =====================================================
-- GRANT ELIGIBILITY RESULTS
-- =====================================================
CREATE TABLE IF NOT EXISTS grant_eligibility_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  grant_id UUID REFERENCES grant_opportunities(id) ON DELETE CASCADE,
  entity_id UUID REFERENCES entities(id) ON DELETE CASCADE,
  eligible BOOLEAN DEFAULT false,
  match_score INTEGER DEFAULT 0,
  naics_match BOOLEAN DEFAULT false,
  location_match BOOLEAN DEFAULT false,
  entity_type_match BOOLEAN DEFAULT false,
  eligibility_check_id UUID,
  reasons TEXT[] DEFAULT '{}',
  checked_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(grant_id, entity_id)
);

CREATE INDEX IF NOT EXISTS idx_grant_eligibility_grant ON grant_eligibility_results(grant_id);
CREATE INDEX IF NOT EXISTS idx_grant_eligibility_entity ON grant_eligibility_results(entity_id);

-- =====================================================
-- GRANT PACKAGES
-- =====================================================
CREATE TABLE IF NOT EXISTS grant_packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID REFERENCES grant_applications(id) ON DELETE CASCADE,
  grant_id UUID REFERENCES grant_opportunities(id) ON DELETE CASCADE,
  entity_id UUID REFERENCES entities(id) ON DELETE CASCADE,
  package_version TEXT DEFAULT '1.0',
  files_included TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(application_id)
);

CREATE INDEX IF NOT EXISTS idx_grant_packages_application ON grant_packages(application_id);

-- =====================================================
-- GRANT FEDERAL FORMS
-- =====================================================
CREATE TABLE IF NOT EXISTS grant_federal_forms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID REFERENCES grant_applications(id) ON DELETE CASCADE,
  sf424_data JSONB,
  sf424a_data JSONB,
  sflll_data JSONB,
  generated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(application_id)
);

CREATE INDEX IF NOT EXISTS idx_grant_federal_forms_application ON grant_federal_forms(application_id);

-- =====================================================
-- GRANT SUBMISSIONS
-- =====================================================
CREATE TABLE IF NOT EXISTS grant_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID REFERENCES grant_applications(id) ON DELETE CASCADE,
  grant_id UUID REFERENCES grant_opportunities(id) ON DELETE CASCADE,
  entity_id UUID REFERENCES entities(id) ON DELETE CASCADE,
  method TEXT CHECK (method IN ('email', 'portal', 'mail', 'other')),
  status TEXT DEFAULT 'submitted' CHECK (status IN ('pending', 'submitted', 'confirmed', 'under_review', 'awarded', 'rejected', 'withdrawn')),
  submitted_by TEXT NOT NULL,
  submitted_at TIMESTAMPTZ NOT NULL,
  confirmation_number TEXT,
  confirmation_receipt TEXT,
  portal_url TEXT,
  tracking_number TEXT,
  notes TEXT,
  timeline JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(application_id)
);

CREATE INDEX IF NOT EXISTS idx_grant_submissions_application ON grant_submissions(application_id);
CREATE INDEX IF NOT EXISTS idx_grant_submissions_grant ON grant_submissions(grant_id);
CREATE INDEX IF NOT EXISTS idx_grant_submissions_entity ON grant_submissions(entity_id);
CREATE INDEX IF NOT EXISTS idx_grant_submissions_status ON grant_submissions(status);
CREATE INDEX IF NOT EXISTS idx_grant_submissions_submitted_at ON grant_submissions(submitted_at DESC);

-- =====================================================
-- GRANT NOTIFICATIONS
-- =====================================================
CREATE TABLE IF NOT EXISTS grant_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN (
    'draft_generated',
    'ready_for_review',
    'package_ready',
    'submitted',
    'deadline_7_days',
    'deadline_72_hours',
    'deadline_24_hours',
    'deadline_3_hours',
    'award_decision',
    'eligibility_issue'
  )),
  grant_id UUID REFERENCES grant_opportunities(id) ON DELETE CASCADE,
  application_id UUID REFERENCES grant_applications(id) ON DELETE CASCADE,
  entity_id UUID REFERENCES entities(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  read BOOLEAN DEFAULT false,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_grant_notifications_grant ON grant_notifications(grant_id);
CREATE INDEX IF NOT EXISTS idx_grant_notifications_application ON grant_notifications(application_id);
CREATE INDEX IF NOT EXISTS idx_grant_notifications_entity ON grant_notifications(entity_id);
CREATE INDEX IF NOT EXISTS idx_grant_notifications_read ON grant_notifications(read);
CREATE INDEX IF NOT EXISTS idx_grant_notifications_created ON grant_notifications(created_at DESC);

-- =====================================================
-- GRANT NOTIFICATION LOG
-- =====================================================
CREATE TABLE IF NOT EXISTS grant_notification_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  notification_id UUID REFERENCES grant_notifications(id) ON DELETE CASCADE,
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  recipients_count INTEGER DEFAULT 0,
  email_sent BOOLEAN DEFAULT false,
  sms_sent BOOLEAN DEFAULT false
);

CREATE INDEX IF NOT EXISTS idx_grant_notification_log_notification ON grant_notification_log(notification_id);

-- =====================================================
-- INSERT SAMPLE DATA (Optional - for testing)
-- =====================================================

-- Sample Grant Source
INSERT INTO grant_sources (name, code, base_url, active)
VALUES ('SAM.gov', 'sam_gov', 'https://api.sam.gov', true)
ON CONFLICT (code) DO NOTHING;

-- Sample Entity (Elevate for Humanity)
INSERT INTO entities (
  name,
  entity_type,
  uei,
  ein,
  naics_list,
  address,
  city,
  state,
  zip,
  phone,
  email,
  congressional_district,
  capability_narrative,
  contact_first_name,
  contact_last_name,
  contact_title
) VALUES (
  'Elevate for Humanity',
  'nonprofit',
  'ABC123DEF456',
  '12-3456789',
  ARRAY['611519', '624190', '611430'],
  '123 Main Street',
  'Indianapolis',
  'IN',
  '46204',
  '(317) 555-0100',
  'Elevate4humanityedu@gmail.com',
  '07',
  'Elevate for Humanity provides workforce development training in high-demand fields including HVAC, CNA, Barbering, and Building Technology.',
  'Elizabeth',
  'Greene',
  'Executive Director'
) ON CONFLICT DO NOTHING;

-- =====================================================
-- ENABLE ROW LEVEL SECURITY (Optional)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE grant_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE grant_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE entities ENABLE ROW LEVEL SECURITY;
ALTER TABLE entity_eligibility_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE grant_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE grant_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE grant_eligibility_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE grant_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE grant_federal_forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE grant_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE grant_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE grant_notification_log ENABLE ROW LEVEL SECURITY;

-- Create policies (allow authenticated users full access for now)
-- You can customize these based on your security requirements

CREATE POLICY "Allow authenticated users full access to grant_sources"
  ON grant_sources FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users full access to grant_opportunities"
  ON grant_opportunities FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users full access to entities"
  ON entities FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users full access to entity_eligibility_checks"
  ON entity_eligibility_checks FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users full access to grant_matches"
  ON grant_matches FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users full access to grant_applications"
  ON grant_applications FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users full access to grant_eligibility_results"
  ON grant_eligibility_results FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users full access to grant_packages"
  ON grant_packages FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users full access to grant_federal_forms"
  ON grant_federal_forms FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users full access to grant_submissions"
  ON grant_submissions FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users full access to grant_notifications"
  ON grant_notifications FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users full access to grant_notification_log"
  ON grant_notification_log FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- =====================================================
-- GRANT COMPLETE!
-- =====================================================

-- Verify tables were created
SELECT 
  table_name,
  (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name) as column_count
FROM information_schema.tables t
WHERE table_schema = 'public' 
  AND table_name LIKE 'grant_%' OR table_name IN ('entities', 'entity_eligibility_checks')
ORDER BY table_name;
