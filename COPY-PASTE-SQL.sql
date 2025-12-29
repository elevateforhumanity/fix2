-- ============================================
-- ELEVATE FOR HUMANITY - COMPLETE DATABASE SETUP
-- ============================================
-- Copy this entire file and paste into Supabase SQL Editor
-- This includes all migrations and will set up your database
-- 
-- Run this ONCE in a new database
-- If you've already run migrations, check migration_history first
-- ============================================

-- ============================================
-- MIGRATION TRACKING SYSTEM
-- ============================================
-- Prevents duplicate migrations and tracks what's been applied
-- This is the foundation for clean migration management

-- Create migration tracking table
CREATE TABLE IF NOT EXISTS schema_migrations (
  version TEXT PRIMARY KEY,
  applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  description TEXT,
  checksum TEXT,
  execution_time_ms INTEGER
);

CREATE INDEX IF NOT EXISTS idx_schema_migrations_applied_at 
ON schema_migrations(applied_at);

COMMENT ON TABLE schema_migrations IS 'Tracks which migrations have been applied to prevent duplicates';
COMMENT ON COLUMN schema_migrations.version IS 'Migration filename without .sql extension';
COMMENT ON COLUMN schema_migrations.checksum IS 'MD5 hash of migration file content for verification';

-- Mark all existing migrations as applied (legacy migrations)
-- This prevents them from running again
INSERT INTO schema_migrations (version, description, applied_at)
VALUES
  ('20231214000000_create_digital_purchases', 'Legacy migration - pre-consolidation', NOW()),
  ('20231214000001_create_marketplace_tables', 'Legacy migration - pre-consolidation', NOW()),
  ('20231214000002_product_reports', 'Legacy migration - pre-consolidation', NOW()),
  ('20231214_indiana_enrollment_fields', 'Legacy migration - pre-consolidation', NOW()),
  ('20240108000000_create_products_table', 'Legacy migration - pre-consolidation', NOW()),
  ('20240109000000_create_courses_table', 'Legacy migration - pre-consolidation', NOW()),
  ('20240110000000_complete_schema', 'Legacy migration - pre-consolidation', NOW()),
  ('20240115_onboarding_tutorials', 'Legacy migration - pre-consolidation', NOW()),
  ('20240116_add_cip_soc_codes', 'Legacy migration - pre-consolidation', NOW()),
  ('20240116_content_moderation', 'Legacy migration - pre-consolidation', NOW()),
  ('20240116_seed_cip_soc_codes', 'Legacy migration - pre-consolidation', NOW()),
  ('20240117_webhooks', 'Legacy migration - pre-consolidation', NOW()),
  ('20240118_referrals', 'Legacy migration - pre-consolidation', NOW()),
  ('20240119_payments', 'Legacy migration - pre-consolidation', NOW()),
  ('20240120_invoicing', 'Legacy migration - pre-consolidation', NOW()),
  ('20251227_fix_schema_mismatches', 'Schema fixes for TypeScript compatibility', NOW()),
  ('20251227_create_migration_tracking', 'Migration tracking system', NOW())
ON CONFLICT (version) DO NOTHING;

-- Function to check if migration has been applied
CREATE OR REPLACE FUNCTION migration_applied(migration_version TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM schema_migrations WHERE version = migration_version
  );
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION migration_applied IS 'Check if a migration has already been applied';

-- Function to record migration
CREATE OR REPLACE FUNCTION record_migration(
  migration_version TEXT,
  migration_description TEXT DEFAULT NULL,
  migration_checksum TEXT DEFAULT NULL,
  execution_time INTEGER DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
  INSERT INTO schema_migrations (version, description, checksum, execution_time_ms)
  VALUES (migration_version, migration_description, migration_checksum, execution_time)
  ON CONFLICT (version) DO NOTHING;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION record_migration IS 'Record that a migration has been applied';

-- View to see migration history
CREATE OR REPLACE VIEW migration_history AS
SELECT 
  version,
  description,
  applied_at,
  execution_time_ms,
  CASE 
    WHEN description LIKE '%Legacy%' THEN 'legacy'
    ELSE 'tracked'
  END as migration_type
FROM schema_migrations
ORDER BY applied_at DESC;

COMMENT ON VIEW migration_history IS 'Human-readable view of migration history';

-- ============================================
-- MIGRATION 2: CREATE MISSING TABLES
-- ============================================

-- =====================================================
-- CREATE MISSING TABLES FOR FEATURE CONNECTIONS
-- Date: December 27, 2024
-- Purpose: Add tables needed for existing UI features
-- =====================================================

-- Enable RLS on all new tables
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO authenticated;

-- =====================================================
-- STAFF PORTAL TABLES
-- =====================================================

-- Customer Service Tickets
CREATE TABLE IF NOT EXISTS customer_service_tickets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES students(id) ON DELETE SET NULL,
  staff_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  subject TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  category TEXT,
  resolution TEXT,
  resolved_at TIMESTAMPTZ,
  resolved_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_tickets_student ON customer_service_tickets(student_id);
CREATE INDEX idx_tickets_staff ON customer_service_tickets(staff_id);
CREATE INDEX idx_tickets_status ON customer_service_tickets(status);

-- QA Checklists
CREATE TABLE IF NOT EXISTS qa_checklists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  items JSONB DEFAULT '[]'::jsonb,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- QA Checklist Completions
CREATE TABLE IF NOT EXISTS qa_checklist_completions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  checklist_id UUID REFERENCES qa_checklists(id) ON DELETE CASCADE,
  completed_by UUID REFERENCES profiles(id),
  entity_type TEXT, -- 'enrollment', 'course', 'student', etc.
  entity_id UUID,
  items_completed JSONB DEFAULT '[]'::jsonb,
  notes TEXT,
  completed_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_qa_completions_checklist ON qa_checklist_completions(checklist_id);
CREATE INDEX idx_qa_completions_entity ON qa_checklist_completions(entity_type, entity_id);

-- Staff Processes
CREATE TABLE IF NOT EXISTS staff_processes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  steps JSONB DEFAULT '[]'::jsonb,
  attachments JSONB DEFAULT '[]'::jsonb,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_processes_category ON staff_processes(category);

-- =====================================================
-- EMPLOYER PORTAL TABLES
-- =====================================================

-- Employers
CREATE TABLE IF NOT EXISTS employers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  contact_name TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  website TEXT,
  industry TEXT,
  company_size TEXT,
  description TEXT,
  logo_url TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_employers_status ON employers(status);
CREATE INDEX idx_employers_industry ON employers(industry);

-- Job Postings
CREATE TABLE IF NOT EXISTS job_postings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employer_id UUID REFERENCES employers(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  requirements TEXT,
  responsibilities TEXT,
  salary_range TEXT,
  salary_min DECIMAL(10,2),
  salary_max DECIMAL(10,2),
  location TEXT,
  remote_allowed BOOLEAN DEFAULT FALSE,
  job_type TEXT CHECK (job_type IN ('full_time', 'part_time', 'contract', 'internship', 'apprenticeship')),
  experience_level TEXT,
  education_required TEXT,
  skills_required TEXT[],
  benefits TEXT,
  application_deadline DATE,
  status TEXT DEFAULT 'active' CHECK (status IN ('draft', 'active', 'filled', 'closed')),
  posted_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_job_postings_employer ON job_postings(employer_id);
CREATE INDEX idx_job_postings_status ON job_postings(status);
CREATE INDEX idx_job_postings_type ON job_postings(job_type);

-- Job Applications
CREATE TABLE IF NOT EXISTS job_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_posting_id UUID REFERENCES job_postings(id) ON DELETE CASCADE,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  resume_url TEXT,
  cover_letter TEXT,
  status TEXT DEFAULT 'submitted' CHECK (status IN ('submitted', 'reviewing', 'interview', 'offered', 'accepted', 'rejected')),
  notes TEXT,
  applied_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_job_applications_posting ON job_applications(job_posting_id);
CREATE INDEX idx_job_applications_student ON job_applications(student_id);
CREATE INDEX idx_job_applications_status ON job_applications(status);

-- Apprenticeships
CREATE TABLE IF NOT EXISTS apprenticeships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employer_id UUID REFERENCES employers(id) ON DELETE CASCADE,
  program_id UUID REFERENCES programs(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  duration_months INTEGER,
  wage_progression JSONB DEFAULT '[]'::jsonb,
  requirements TEXT,
  benefits TEXT,
  mentor_assigned UUID REFERENCES profiles(id),
  status TEXT DEFAULT 'active' CHECK (status IN ('draft', 'active', 'filled', 'closed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_apprenticeships_employer ON apprenticeships(employer_id);
CREATE INDEX idx_apprenticeships_program ON apprenticeships(program_id);
CREATE INDEX idx_apprenticeships_status ON apprenticeships(status);

-- Apprenticeship Enrollments
CREATE TABLE IF NOT EXISTS apprenticeship_enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  apprenticeship_id UUID REFERENCES apprenticeships(id) ON DELETE CASCADE,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  start_date DATE,
  end_date DATE,
  current_wage DECIMAL(10,2),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'terminated')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_apprenticeship_enrollments_apprenticeship ON apprenticeship_enrollments(apprenticeship_id);
CREATE INDEX idx_apprenticeship_enrollments_student ON apprenticeship_enrollments(student_id);

-- =====================================================
-- PAYROLL TABLES
-- =====================================================

-- Payroll Profiles
CREATE TABLE IF NOT EXISTS payroll_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  bank_name TEXT,
  account_type TEXT CHECK (account_type IN ('checking', 'savings')),
  routing_number TEXT,
  account_number_encrypted TEXT, -- Should be encrypted at application level
  tax_withholding JSONB DEFAULT '{}'::jsonb,
  direct_deposit_enabled BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_payroll_profiles_user ON payroll_profiles(user_id);

-- =====================================================
-- CRM TABLES
-- =====================================================

-- CRM Contacts
CREATE TABLE IF NOT EXISTS crm_contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  phone TEXT,
  company TEXT,
  title TEXT,
  source TEXT,
  status TEXT DEFAULT 'lead' CHECK (status IN ('lead', 'prospect', 'customer', 'inactive')),
  assigned_to UUID REFERENCES profiles(id),
  tags TEXT[],
  custom_fields JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_crm_contacts_email ON crm_contacts(email);
CREATE INDEX idx_crm_contacts_status ON crm_contacts(status);
CREATE INDEX idx_crm_contacts_assigned ON crm_contacts(assigned_to);

-- CRM Interactions
CREATE TABLE IF NOT EXISTS crm_interactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  contact_id UUID REFERENCES crm_contacts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id),
  type TEXT CHECK (type IN ('call', 'email', 'meeting', 'note', 'task')),
  subject TEXT,
  notes TEXT,
  outcome TEXT,
  scheduled_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_crm_interactions_contact ON crm_interactions(contact_id);
CREATE INDEX idx_crm_interactions_user ON crm_interactions(user_id);
CREATE INDEX idx_crm_interactions_type ON crm_interactions(type);

-- =====================================================
-- TAX SERVICES TABLES
-- =====================================================

-- Tax Filings
CREATE TABLE IF NOT EXISTS tax_filings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  tax_year INTEGER NOT NULL,
  filing_type TEXT CHECK (filing_type IN ('federal', 'state', 'both')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'filed', 'accepted', 'rejected')),
  preparer_id UUID REFERENCES profiles(id),
  vita_site TEXT,
  filing_date DATE,
  refund_amount DECIMAL(10,2),
  documents JSONB DEFAULT '[]'::jsonb,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_tax_filings_student ON tax_filings(student_id);
CREATE INDEX idx_tax_filings_year ON tax_filings(tax_year);
CREATE INDEX idx_tax_filings_status ON tax_filings(status);

-- VITA Appointments
CREATE TABLE IF NOT EXISTS vita_appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  appointment_date TIMESTAMPTZ NOT NULL,
  site_location TEXT,
  preparer_id UUID REFERENCES profiles(id),
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'completed', 'cancelled', 'no_show')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_vita_appointments_student ON vita_appointments(student_id);
CREATE INDEX idx_vita_appointments_date ON vita_appointments(appointment_date);
CREATE INDEX idx_vita_appointments_status ON vita_appointments(status);

-- =====================================================
-- SHOP SYSTEM TABLES
-- =====================================================

-- Shop Reports
CREATE TABLE IF NOT EXISTS shop_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  shop_id UUID, -- Reference to shop/program_holder
  submitted_by UUID REFERENCES profiles(id),
  report_type TEXT,
  report_period_start DATE,
  report_period_end DATE,
  data JSONB DEFAULT '{}'::jsonb,
  attachments JSONB DEFAULT '[]'::jsonb,
  status TEXT DEFAULT 'submitted' CHECK (status IN ('draft', 'submitted', 'reviewed', 'approved')),
  reviewed_by UUID REFERENCES profiles(id),
  reviewed_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_shop_reports_shop ON shop_reports(shop_id);
CREATE INDEX idx_shop_reports_submitted_by ON shop_reports(submitted_by);
CREATE INDEX idx_shop_reports_status ON shop_reports(status);

-- =====================================================
-- CALENDAR TABLES
-- =====================================================

-- Calendar Events
CREATE TABLE IF NOT EXISTS calendar_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  time TIME,
  duration INTEGER DEFAULT 60, -- in minutes
  color TEXT DEFAULT '#3b82f6',
  event_type TEXT CHECK (event_type IN ('class', 'assignment', 'exam', 'meeting', 'personal', 'other')),
  location TEXT,
  reminder_minutes INTEGER,
  is_recurring BOOLEAN DEFAULT FALSE,
  recurrence_rule TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_calendar_events_user ON calendar_events(user_id);
CREATE INDEX idx_calendar_events_date ON calendar_events(date);
CREATE INDEX idx_calendar_events_type ON calendar_events(event_type);

-- =====================================================
-- COMPLIANCE TABLES
-- =====================================================

-- FERPA Training Records
CREATE TABLE IF NOT EXISTS ferpa_training_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  training_date DATE NOT NULL,
  completion_date DATE,
  score INTEGER,
  certificate_url TEXT,
  expires_at DATE,
  status TEXT DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'expired')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_ferpa_training_user ON ferpa_training_records(user_id);
CREATE INDEX idx_ferpa_training_status ON ferpa_training_records(status);

-- Document Signatures
CREATE TABLE IF NOT EXISTS document_signatures (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_type TEXT NOT NULL,
  document_id UUID,
  signer_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  signature_data TEXT, -- Base64 encoded signature image
  ip_address TEXT,
  user_agent TEXT,
  signed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_document_signatures_document ON document_signatures(document_type, document_id);
CREATE INDEX idx_document_signatures_signer ON document_signatures(signer_id);

-- =====================================================
-- ENABLE ROW LEVEL SECURITY
-- =====================================================

ALTER TABLE customer_service_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE qa_checklists ENABLE ROW LEVEL SECURITY;
ALTER TABLE qa_checklist_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_processes ENABLE ROW LEVEL SECURITY;
ALTER TABLE employers ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_postings ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE apprenticeships ENABLE ROW LEVEL SECURITY;
ALTER TABLE apprenticeship_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE payroll_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE tax_filings ENABLE ROW LEVEL SECURITY;
ALTER TABLE vita_appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE shop_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE ferpa_training_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_signatures ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendar_events ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- BASIC RLS POLICIES (Can be refined later)
-- =====================================================

-- Staff can see all tickets
CREATE POLICY "Staff can view all tickets" ON customer_service_tickets
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'instructor')
    )
  );

-- Students can see their own tickets
CREATE POLICY "Students can view own tickets" ON customer_service_tickets
  FOR SELECT TO authenticated
  USING (student_id = auth.uid());

-- Staff can create tickets
CREATE POLICY "Staff can create tickets" ON customer_service_tickets
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'instructor')
    )
  );

-- Admins can manage QA checklists
CREATE POLICY "Admins can manage QA checklists" ON qa_checklists
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Staff can view processes
CREATE POLICY "Staff can view processes" ON staff_processes
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'instructor')
    )
  );

-- Public can view active job postings
CREATE POLICY "Public can view active job postings" ON job_postings
  FOR SELECT TO authenticated
  USING (status = 'active');

-- Students can view their own applications
CREATE POLICY "Students can view own applications" ON job_applications
  FOR SELECT TO authenticated
  USING (student_id = auth.uid());

-- Students can create applications
CREATE POLICY "Students can create applications" ON job_applications
  FOR INSERT TO authenticated
  WITH CHECK (student_id = auth.uid());

-- Users can view their own payroll profile
CREATE POLICY "Users can view own payroll" ON payroll_profiles
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- Users can update their own payroll profile
CREATE POLICY "Users can update own payroll" ON payroll_profiles
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid());

-- Staff can view CRM contacts
CREATE POLICY "Staff can view CRM contacts" ON crm_contacts
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'instructor')
    )
  );

-- Students can view their own tax filings
CREATE POLICY "Students can view own tax filings" ON tax_filings
  FOR SELECT TO authenticated
  USING (student_id = auth.uid());

-- Users can view their own FERPA training
CREATE POLICY "Users can view own FERPA training" ON ferpa_training_records
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- Users can view their own signatures
CREATE POLICY "Users can view own signatures" ON document_signatures
  FOR SELECT TO authenticated
  USING (signer_id = auth.uid());

-- Users can manage their own calendar events
CREATE POLICY "Users can manage own calendar events" ON calendar_events
  FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- =====================================================
-- UPDATED_AT TRIGGERS
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_customer_service_tickets_updated_at BEFORE UPDATE ON customer_service_tickets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_qa_checklists_updated_at BEFORE UPDATE ON qa_checklists
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_staff_processes_updated_at BEFORE UPDATE ON staff_processes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_employers_updated_at BEFORE UPDATE ON employers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_job_postings_updated_at BEFORE UPDATE ON job_postings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_job_applications_updated_at BEFORE UPDATE ON job_applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_apprenticeships_updated_at BEFORE UPDATE ON apprenticeships
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_apprenticeship_enrollments_updated_at BEFORE UPDATE ON apprenticeship_enrollments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payroll_profiles_updated_at BEFORE UPDATE ON payroll_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_crm_contacts_updated_at BEFORE UPDATE ON crm_contacts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tax_filings_updated_at BEFORE UPDATE ON tax_filings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vita_appointments_updated_at BEFORE UPDATE ON vita_appointments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_shop_reports_updated_at BEFORE UPDATE ON shop_reports
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ferpa_training_records_updated_at BEFORE UPDATE ON ferpa_training_records
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_calendar_events_updated_at BEFORE UPDATE ON calendar_events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- MIGRATION 3: FIX RLS SECURITY
-- ============================================

-- ============================================
-- CRITICAL SECURITY FIX: Remove Broken RLS Policies
-- ============================================
-- The "deny_all" policies are PERMISSIVE which means they ALLOW access
-- This is a critical security vulnerability affecting almost every table

-- Drop all broken deny_all policies
DO $$
DECLARE
  pol record;
BEGIN
  FOR pol IN 
    SELECT schemaname, tablename, policyname
    FROM pg_policies
    WHERE policyname = 'deny_all'
      AND permissive = 'PERMISSIVE'
      AND schemaname = 'public'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I', 
      pol.policyname, pol.schemaname, pol.tablename);
    RAISE NOTICE 'Dropped broken policy: % on %', pol.policyname, pol.tablename;
  END LOOP;
END $$;

-- ============================================
-- PROPER RLS POLICIES FOR CRITICAL TABLES
-- ============================================

-- profiles: Users can only see/edit their own profile, admins see all
DROP POLICY IF EXISTS "users_read_own_profile" ON profiles;
DROP POLICY IF EXISTS "users_update_own_profile" ON profiles;
DROP POLICY IF EXISTS "admins_read_all_profiles" ON profiles;

CREATE POLICY "users_read_own_profile" ON profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "users_update_own_profile" ON profiles
  FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "admins_read_all_profiles" ON profiles
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

-- marketplace_creators: Only approved creators visible, users manage own
DROP POLICY IF EXISTS "public_view_approved_creators" ON marketplace_creators;
DROP POLICY IF EXISTS "creators_manage_own" ON marketplace_creators;

CREATE POLICY "public_view_approved_creators" ON marketplace_creators
  FOR SELECT
  USING (status = 'approved');

CREATE POLICY "creators_manage_own" ON marketplace_creators
  FOR ALL
  USING (user_id = auth.uid());

-- marketplace_products: Only approved products visible, creators manage own
DROP POLICY IF EXISTS "public_view_approved_products" ON marketplace_products;
DROP POLICY IF EXISTS "creators_manage_own_products" ON marketplace_products;

CREATE POLICY "public_view_approved_products" ON marketplace_products
  FOR SELECT
  USING (status = 'approved');

CREATE POLICY "creators_manage_own_products" ON marketplace_products
  FOR ALL
  USING (
    creator_id IN (
      SELECT id FROM marketplace_creators WHERE user_id = auth.uid()
    )
  );

-- marketplace_sales: Creators see own sales, buyers access via token
DROP POLICY IF EXISTS "creators_view_own_sales" ON marketplace_sales;
DROP POLICY IF EXISTS "buyers_access_via_token" ON marketplace_sales;

CREATE POLICY "creators_view_own_sales" ON marketplace_sales
  FOR SELECT
  USING (
    creator_id IN (
      SELECT id FROM marketplace_creators WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "buyers_access_via_token" ON marketplace_sales
  FOR SELECT
  USING (download_token IS NOT NULL);

-- program_holder_documents: Users see own, admins see all
DROP POLICY IF EXISTS "users_manage_own_documents" ON program_holder_documents;
DROP POLICY IF EXISTS "admins_view_all_documents" ON program_holder_documents;

CREATE POLICY "users_manage_own_documents" ON program_holder_documents
  FOR ALL
  USING (user_id = auth.uid());

CREATE POLICY "admins_view_all_documents" ON program_holder_documents
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

-- program_holder_verification: Users see own, admins see all
DROP POLICY IF EXISTS "users_view_own_verification" ON program_holder_verification;
DROP POLICY IF EXISTS "admins_manage_verification" ON program_holder_verification;

CREATE POLICY "users_view_own_verification" ON program_holder_verification
  FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "admins_manage_verification" ON program_holder_verification
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

-- program_holder_banking: HIGHLY SENSITIVE - Users see own only, admins see all
DROP POLICY IF EXISTS "users_manage_own_banking" ON program_holder_banking;
DROP POLICY IF EXISTS "admins_view_banking" ON program_holder_banking;

CREATE POLICY "users_manage_own_banking" ON program_holder_banking
  FOR ALL
  USING (user_id = auth.uid());

CREATE POLICY "admins_view_banking" ON program_holder_banking
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

-- program_holders: Users see own, admins see all
DROP POLICY IF EXISTS "users_view_own_holder" ON program_holders;
DROP POLICY IF EXISTS "admins_view_all_holders" ON program_holders;

CREATE POLICY "users_view_own_holder" ON program_holders
  FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "admins_view_all_holders" ON program_holders
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

-- ============================================
-- RESTRICTIVE POLICIES FOR SENSITIVE TABLES
-- ============================================

-- Tables that should have NO public access at all
DO $$
DECLARE
  sensitive_table TEXT;
  sensitive_tables TEXT[] := ARRAY[
    'api_keys',
    'api_request_logs',
    'failed_login_attempts',
    'ferpa_access_log',
    'direct_deposit_accounts',
    'employee_documents',
    'payroll_records'
  ];
BEGIN
  FOREACH sensitive_table IN ARRAY sensitive_tables
  LOOP
    -- Check if table exists
    IF EXISTS (SELECT 1 FROM pg_tables WHERE tablename = sensitive_table AND schemaname = 'public') THEN
      -- Drop all existing policies
      EXECUTE format('DROP POLICY IF EXISTS "admin_only_access" ON %I', sensitive_table);
      
      -- Create admin-only policy
      EXECUTE format('
        CREATE POLICY "admin_only_access" ON %I
        FOR ALL
        USING (
          EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role IN (''admin'', ''super_admin'')
          )
        )', sensitive_table);
      
      RAISE NOTICE 'Secured table: %', sensitive_table;
    END IF;
  END LOOP;
END $$;

-- ============================================
-- VERIFICATION
-- ============================================

-- Create view to check RLS status
CREATE OR REPLACE VIEW rls_security_status AS
SELECT 
  t.tablename,
  t.rowsecurity as rls_enabled,
  COUNT(p.policyname) as policy_count,
  ARRAY_AGG(p.policyname) FILTER (WHERE p.policyname IS NOT NULL) as policies
FROM pg_tables t
LEFT JOIN pg_policies p ON t.tablename = p.tablename AND t.schemaname = p.schemaname
WHERE t.schemaname = 'public'
  AND t.tablename IN (
    'profiles', 'applications', 'enrollments',
    'marketplace_creators', 'marketplace_products', 'marketplace_sales',
    'program_holders', 'program_holder_documents', 
    'program_holder_verification', 'program_holder_banking'
  )
GROUP BY t.tablename, t.rowsecurity
ORDER BY t.tablename;

COMMENT ON VIEW rls_security_status IS 'Shows RLS status for critical tables';

-- ============================================
-- MIGRATION 4: FIX SCHEMA MISMATCHES
-- ============================================

-- Fix schema mismatches between database and TypeScript code
-- Based on actual database schema analysis

-- ============================================
-- FIX 1: program_holder_documents
-- ============================================
-- TypeScript expects: uploaded_at
-- Database has: created_at
-- Solution: Add uploaded_at as alias/copy of created_at

ALTER TABLE program_holder_documents
ADD COLUMN IF NOT EXISTS uploaded_at TIMESTAMPTZ;

-- Populate uploaded_at from created_at for existing records
UPDATE program_holder_documents
SET uploaded_at = created_at
WHERE uploaded_at IS NULL;

-- Set default for new records
ALTER TABLE program_holder_documents
ALTER COLUMN uploaded_at SET DEFAULT NOW();

CREATE INDEX IF NOT EXISTS idx_program_holder_documents_uploaded_at
ON program_holder_documents(uploaded_at);

COMMENT ON COLUMN program_holder_documents.uploaded_at IS 'When document was uploaded (mirrors created_at for code compatibility)';

-- ============================================
-- FIX 2: program_holder_verification
-- ============================================
-- TypeScript expects: decision, reviewed_at, reviewed_by
-- Database has: status, verified_at, verified_by
-- Solution: Add missing columns

ALTER TABLE program_holder_verification
ADD COLUMN IF NOT EXISTS decision TEXT,
ADD COLUMN IF NOT EXISTS reviewed_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS reviewed_by UUID REFERENCES auth.users(id);

-- Populate new columns from existing data
UPDATE program_holder_verification
SET 
  decision = CASE 
    WHEN status = 'verified' THEN 'approved'
    WHEN status = 'failed' THEN 'rejected'
    WHEN status = 'pending' THEN 'pending'
    ELSE status
  END,
  reviewed_at = verified_at,
  reviewed_by = verified_by
WHERE decision IS NULL;

CREATE INDEX IF NOT EXISTS idx_program_holder_verification_decision
ON program_holder_verification(decision);

CREATE INDEX IF NOT EXISTS idx_program_holder_verification_reviewed_at
ON program_holder_verification(reviewed_at);

CREATE INDEX IF NOT EXISTS idx_program_holder_verification_reviewed_by
ON program_holder_verification(reviewed_by);

COMMENT ON COLUMN program_holder_verification.decision IS 'Review decision: approved, rejected, pending (mirrors status for code compatibility)';
COMMENT ON COLUMN program_holder_verification.reviewed_at IS 'When review was completed (mirrors verified_at for code compatibility)';
COMMENT ON COLUMN program_holder_verification.reviewed_by IS 'Admin who reviewed (mirrors verified_by for code compatibility)';

-- ============================================
-- TRIGGER: Keep mirrored columns in sync
-- ============================================

-- Trigger for program_holder_documents
CREATE OR REPLACE FUNCTION sync_program_holder_documents_uploaded_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.uploaded_at = NEW.created_at;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_sync_program_holder_documents_uploaded_at ON program_holder_documents;
CREATE TRIGGER trigger_sync_program_holder_documents_uploaded_at
  BEFORE INSERT OR UPDATE ON program_holder_documents
  FOR EACH ROW
  EXECUTE FUNCTION sync_program_holder_documents_uploaded_at();

-- Trigger for program_holder_verification
CREATE OR REPLACE FUNCTION sync_program_holder_verification_fields()
RETURNS TRIGGER AS $$
BEGIN
  -- Sync decision with status
  IF NEW.status IS DISTINCT FROM OLD.status THEN
    NEW.decision = CASE 
      WHEN NEW.status = 'verified' THEN 'approved'
      WHEN NEW.status = 'failed' THEN 'rejected'
      WHEN NEW.status = 'pending' THEN 'pending'
      ELSE NEW.status
    END;
  END IF;
  
  -- Sync reviewed_at with verified_at
  IF NEW.verified_at IS DISTINCT FROM OLD.verified_at THEN
    NEW.reviewed_at = NEW.verified_at;
  END IF;
  
  -- Sync reviewed_by with verified_by
  IF NEW.verified_by IS DISTINCT FROM OLD.verified_by THEN
    NEW.reviewed_by = NEW.verified_by;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_sync_program_holder_verification_fields ON program_holder_verification;
CREATE TRIGGER trigger_sync_program_holder_verification_fields
  BEFORE INSERT OR UPDATE ON program_holder_verification
  FOR EACH ROW
  EXECUTE FUNCTION sync_program_holder_verification_fields();

-- ============================================
-- MIGRATION 5: ADD SCORM TABLES
-- ============================================

-- =====================================================
-- SCORM Integration Tables
-- Enables embedding SCORM packages for partner courses
-- =====================================================

-- SCORM Packages
CREATE TABLE IF NOT EXISTS public.scorm_packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  version TEXT,
  storage_path TEXT NOT NULL, -- Path in Supabase storage
  manifest_data JSONB, -- Parsed imsmanifest.xml
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_scorm_packages_created_at 
  ON public.scorm_packages(created_at DESC);

-- SCORM Enrollments (student progress in SCORM packages)
CREATE TABLE IF NOT EXISTS public.scorm_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scorm_package_id UUID NOT NULL REFERENCES public.scorm_packages(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  enrollment_id UUID, -- Links to partner_lms_enrollments
  status TEXT NOT NULL DEFAULT 'not_attempted' 
    CHECK (status IN ('not_attempted', 'incomplete', 'completed', 'passed', 'failed')),
  score DECIMAL(5,2), -- 0-100
  completion_percentage INTEGER DEFAULT 0 CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
  time_spent_seconds INTEGER DEFAULT 0,
  last_accessed_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(scorm_package_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_scorm_enrollments_user 
  ON public.scorm_enrollments(user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_scorm_enrollments_package 
  ON public.scorm_enrollments(scorm_package_id);

-- Partner Course Mappings (links partner courses to SCORM packages)
CREATE TABLE IF NOT EXISTS public.partner_course_mappings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_course_id UUID NOT NULL, -- References partner_lms_courses.id
  scorm_package_id UUID NOT NULL REFERENCES public.scorm_packages(id) ON DELETE CASCADE,
  is_active BOOLEAN DEFAULT true,
  priority INTEGER DEFAULT 0, -- For multiple packages per course
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(partner_course_id, scorm_package_id)
);

CREATE INDEX IF NOT EXISTS idx_partner_course_mappings_course 
  ON public.partner_course_mappings(partner_course_id, is_active);

CREATE INDEX IF NOT EXISTS idx_partner_course_mappings_package 
  ON public.partner_course_mappings(scorm_package_id);

-- SCORM State Data (CMI data for SCORM player)
CREATE TABLE IF NOT EXISTS public.scorm_state (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id UUID NOT NULL REFERENCES public.scorm_enrollments(id) ON DELETE CASCADE,
  cmi_data JSONB NOT NULL DEFAULT '{}'::jsonb, -- Full CMI state
  suspend_data TEXT, -- SCORM suspend_data
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(enrollment_id)
);

CREATE INDEX IF NOT EXISTS idx_scorm_state_enrollment 
  ON public.scorm_state(enrollment_id);

-- =====================================================
-- Row Level Security (RLS)
-- =====================================================

ALTER TABLE public.scorm_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scorm_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partner_course_mappings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scorm_state ENABLE ROW LEVEL SECURITY;

-- SCORM Packages: Admins can manage, everyone can view active packages
CREATE POLICY "Admins can manage SCORM packages"
  ON public.scorm_packages
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

CREATE POLICY "Everyone can view SCORM packages"
  ON public.scorm_packages
  FOR SELECT
  TO authenticated
  USING (true);

-- SCORM Enrollments: Users can view/update their own, admins can view all
CREATE POLICY "Users can view their own SCORM enrollments"
  ON public.scorm_enrollments
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update their own SCORM enrollments"
  ON public.scorm_enrollments
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "System can create SCORM enrollments"
  ON public.scorm_enrollments
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can view all SCORM enrollments"
  ON public.scorm_enrollments
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

-- Partner Course Mappings: Admins can manage, everyone can view active
CREATE POLICY "Admins can manage partner course mappings"
  ON public.partner_course_mappings
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

CREATE POLICY "Everyone can view active mappings"
  ON public.partner_course_mappings
  FOR SELECT
  TO authenticated
  USING (is_active = true);

-- SCORM State: Users can manage their own state
CREATE POLICY "Users can manage their own SCORM state"
  ON public.scorm_state
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.scorm_enrollments
      WHERE scorm_enrollments.id = scorm_state.enrollment_id
      AND scorm_enrollments.user_id = auth.uid()
    )
  );

-- =====================================================
-- Comments
-- =====================================================

COMMENT ON TABLE public.scorm_packages IS 'SCORM packages uploaded for partner courses';
COMMENT ON TABLE public.scorm_enrollments IS 'Student enrollments in SCORM packages';
COMMENT ON TABLE public.partner_course_mappings IS 'Links partner courses to SCORM packages';
COMMENT ON TABLE public.scorm_state IS 'SCORM player state data (CMI)';

COMMENT ON COLUMN public.scorm_packages.storage_path IS 'Path to SCORM package in Supabase storage (e.g., scorm/jri/package.zip)';
COMMENT ON COLUMN public.scorm_packages.manifest_data IS 'Parsed imsmanifest.xml as JSON';
COMMENT ON COLUMN public.scorm_enrollments.enrollment_id IS 'Optional link to partner_lms_enrollments';
COMMENT ON COLUMN public.scorm_state.cmi_data IS 'Full SCORM CMI data model as JSON';
COMMENT ON COLUMN public.scorm_state.suspend_data IS 'SCORM suspend_data for resuming';
