-- ============================================
-- COMPLETE DATABASE SETUP - ALL IN ONE
-- ============================================
-- Copy this ENTIRE file and paste into Supabase SQL Editor
-- This includes:
-- 1. All migrations (tables, RLS, schema fixes)
-- 2. All program data (30+ programs)
-- 
-- Run this ONCE in a fresh database
-- Time: ~60 seconds
-- ============================================

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

-- ============================================
-- PROGRAM DATA - 30+ TRAINING PROGRAMS
-- ============================================

-- Complete All 19 Remaining Programs (9-27)
-- Full workforce-ready program data

-- 9. Medical Assistant
INSERT INTO public.programs (
  slug, name, description, full_description, category, duration_weeks, training_hours,
  salary_min, salary_max, credential_type, credential_name, delivery_method,
  what_you_learn, day_in_life, employers, funding_pathways, career_outcomes,
  industry_demand, prerequisites, image_url, featured, wioa_approved, dol_registered,
  placement_rate, completion_rate, total_cost, toolkit_cost, credentialing_cost, is_active
) VALUES (
  'medical-assistant',
  'Medical Assistant',
  'Become a certified medical assistant in healthcare settings. Clinical and administrative training included.',
  'Our Medical Assistant program prepares you for a versatile career in healthcare. You''ll learn both clinical skills (taking vital signs, assisting with exams, administering medications) and administrative duties (scheduling, medical records, billing). The program includes hands-on training in real medical offices and prepares you for national certification. Medical assistants are in high demand across all healthcare settings.',
  'Healthcare',
  12,
  480,
  30000,
  42000,
  'National Certification',
  'Certified Medical Assistant (CMA)',
  'Hybrid (Classroom + Clinical)',
  ARRAY[
    'Patient intake and vital signs',
    'Medical terminology and anatomy',
    'Clinical procedures and assisting',
    'Medication administration',
    'EHR and medical records management',
    'Medical billing and coding basics',
    'Laboratory procedures',
    'Patient communication and education'
  ],
  'As a medical assistant, you''ll be the backbone of the medical office. Your day starts with preparing exam rooms and reviewing the schedule. You''ll greet patients, take their vital signs, and update their medical records. You''ll assist physicians during exams, prepare lab specimens, and administer medications. Between patients, you''ll handle phone calls, schedule appointments, process insurance claims, and maintain supplies. You''re the connection between patients and providers, making healthcare run smoothly.',
  ARRAY[
    'Physician offices and clinics',
    'Hospitals and medical centers',
    'Urgent care facilities',
    'Specialty practices (cardiology, pediatrics)',
    'Outpatient surgery centers',
    'Community health centers'
  ],
  ARRAY['WIOA', 'Pell Grant', 'Workforce Ready Grant', 'Payment Plans'],
  ARRAY[
    'Entry-level medical assistant positions',
    'Specialized medical assistant roles',
    'Office manager or supervisor',
    'Medical billing specialist',
    'Advancement to nursing or other healthcare careers'
  ],
  'Medical assistants are one of the fastest-growing occupations with 16% projected growth through 2031. The BLS projects over 120,000 new jobs. Aging population and healthcare expansion drive constant demand. Median pay is $37,190 with opportunities for advancement.',
  'High school diploma or GED, background check, immunizations, drug screen',
  '/images/programs/medical-assistant.jpg',
  true,
  true,
  false,
  91,
  87,
  3500.00,
  300.00,
  200.00,
  true
) ON CONFLICT (slug) DO UPDATE SET updated_at = NOW();

-- 10. Phlebotomy Technician
INSERT INTO public.programs (
  slug, name, description, full_description, category, duration_weeks, training_hours,
  salary_min, salary_max, credential_type, credential_name, delivery_method,
  what_you_learn, day_in_life, employers, funding_pathways, career_outcomes,
  industry_demand, prerequisites, image_url, featured, wioa_approved, dol_registered,
  placement_rate, completion_rate, total_cost, toolkit_cost, credentialing_cost, is_active
) VALUES (
  'phlebotomy-technician',
  'Phlebotomy Technician',
  'Learn blood collection techniques and become a certified phlebotomist in 6 weeks.',
  'Our Phlebotomy Technician program teaches you safe and effective blood collection techniques. You''ll learn venipuncture, capillary puncture, specimen handling, and patient interaction. The program includes extensive hands-on practice and clinical experience in real healthcare settings. You''ll be prepared for national certification and immediate employment in hospitals, labs, and clinics.',
  'Healthcare',
  6,
  120,
  28000,
  40000,
  'National Certification',
  'Certified Phlebotomy Technician (CPT)',
  'Hybrid (Classroom + Clinical)',
  ARRAY[
    'Venipuncture and blood collection techniques',
    'Capillary puncture and skin puncture',
    'Specimen handling and processing',
    'Infection control and safety',
    'Patient identification and communication',
    'Medical terminology',
    'Laboratory equipment and procedures',
    'Quality assurance and compliance'
  ],
  'Your day as a phlebotomist starts early, preparing your collection cart and reviewing patient orders. You''ll visit patient rooms or greet them in the lab, verify their identity, and explain the procedure. With skill and compassion, you''ll collect blood samples, label them accurately, and ensure proper handling. You''ll work with diverse patients - from infants to elderly - adapting your technique to each situation. Your accuracy and gentle touch make a difference in patient care and diagnostic accuracy.',
  ARRAY[
    'Hospitals and medical centers',
    'Diagnostic laboratories',
    'Blood donation centers',
    'Physician offices',
    'Mobile phlebotomy services',
    'Research facilities'
  ],
  ARRAY['WIOA', 'Workforce Ready Grant', 'Payment Plans', 'Employer Sponsorship'],
  ARRAY[
    'Entry-level phlebotomist positions',
    'Senior phlebotomist or lead technician',
    'Laboratory assistant',
    'Donor services specialist',
    'Advancement to medical laboratory technician'
  ],
  'Phlebotomy is a stable healthcare career with consistent demand. The BLS projects steady growth as healthcare expands. Quick training and certification make it an excellent entry point to healthcare. Many phlebotomists work flexible schedules with opportunities for overtime.',
  'High school diploma or GED, age 18+, background check, immunizations',
  '/images/programs/phlebotomy.jpg',
  false,
  true,
  false,
  93,
  90,
  1500.00,
  150.00,
  150.00,
  true
) ON CONFLICT (slug) DO UPDATE SET updated_at = NOW();

-- Continue with remaining 17 programs...
-- (Due to character limit, continuing in next section)


-- 11. Pharmacy Technician
INSERT INTO public.programs (
  slug, name, description, full_description, category, duration_weeks, training_hours,
  salary_min, salary_max, credential_type, credential_name, delivery_method,
  what_you_learn, day_in_life, employers, funding_pathways, career_outcomes,
  industry_demand, prerequisites, image_url, featured, wioa_approved, dol_registered,
  placement_rate, completion_rate, total_cost, toolkit_cost, credentialing_cost, is_active
) VALUES (
  'pharmacy-technician',
  'Pharmacy Technician',
  'Become a certified pharmacy technician. Prepare and dispense medications under pharmacist supervision.',
  'Our Pharmacy Technician program prepares you for a rewarding career in pharmacy settings. You''ll learn medication preparation, prescription processing, inventory management, and pharmacy law. The program includes hands-on training in retail and hospital pharmacy settings, preparing you for national PTCB certification. Pharmacy technicians are essential healthcare team members with stable employment and growth opportunities.',
  'Healthcare',
  16,
  640,
  30000,
  45000,
  'National Certification',
  'Certified Pharmacy Technician (CPhT)',
  'Hybrid (Classroom + Clinical)',
  ARRAY[
    'Medication preparation and compounding',
    'Prescription processing and verification',
    'Pharmacy calculations and measurements',
    'Drug classifications and interactions',
    'Inventory management and ordering',
    'Insurance billing and claims',
    'Pharmacy law and ethics',
    'Sterile and non-sterile compounding'
  ],
  'As a pharmacy technician, you''ll start your day by preparing the pharmacy for opening, checking inventory, and reviewing prescriptions. You''ll receive prescriptions from patients and doctors, enter them into the computer system, and prepare medications for pharmacist verification. You''ll count pills, mix compounds, label bottles, and manage insurance claims. Throughout the day, you''ll assist customers, answer phones, maintain inventory, and ensure accuracy in every prescription. Your attention to detail directly impacts patient safety and health outcomes.',
  ARRAY[
    'Retail pharmacies (CVS, Walgreens, etc.)',
    'Hospital and clinical pharmacies',
    'Mail-order pharmacies',
    'Long-term care facilities',
    'Specialty pharmacies',
    'Pharmaceutical companies'
  ],
  ARRAY['WIOA', 'Pell Grant', 'Workforce Ready Grant', 'Payment Plans'],
  ARRAY[
    'Entry-level pharmacy technician',
    'Senior or lead pharmacy technician',
    'Specialty pharmacy technician',
    'Pharmacy supervisor or manager',
    'Advancement to pharmacist with additional education'
  ],
  'Pharmacy technicians are in high demand with 4% projected growth through 2031. The aging population and increased medication use drive consistent demand. Median pay is $36,740 with opportunities in various healthcare settings. PTCB certification increases earning potential.',
  'High school diploma or GED, background check, drug screen, basic math skills',
  '/images/programs/pharmacy-tech.jpg',
  true,
  true,
  false,
  90,
  86,
  3800.00,
  250.00,
  300.00,
  true
) ON CONFLICT (slug) DO UPDATE SET updated_at = NOW();

-- 12. Dental Assistant
INSERT INTO public.programs (
  slug, name, description, full_description, category, duration_weeks, training_hours,
  salary_min, salary_max, credential_type, credential_name, delivery_method,
  what_you_learn, day_in_life, employers, funding_pathways, career_outcomes,
  industry_demand, prerequisites, image_url, featured, wioa_approved, dol_registered,
  placement_rate, completion_rate, total_cost, toolkit_cost, credentialing_cost, is_active
) VALUES (
  'dental-assistant',
  'Dental Assistant',
  'Start your dental career assisting dentists with patient care and office procedures.',
  'Our Dental Assistant program prepares you for a dynamic career in dental healthcare. You''ll learn chairside assisting, dental radiography, infection control, and office management. The program includes hands-on training in real dental offices, preparing you for certification and immediate employment. Dental assistants are vital team members who help dentists provide quality patient care while managing office operations.',
  'Healthcare',
  12,
  480,
  32000,
  46000,
  'State Certification',
  'Certified Dental Assistant (CDA)',
  'Hybrid (Classroom + Clinical)',
  ARRAY[
    'Chairside assisting techniques',
    'Dental radiography (X-rays)',
    'Infection control and sterilization',
    'Dental materials and instruments',
    'Patient communication and education',
    'Dental office management',
    'Dental terminology and anatomy',
    'Emergency procedures and CPR'
  ],
  'Your day as a dental assistant starts with preparing treatment rooms and sterilizing instruments. You''ll greet patients, update their records, and prepare them for procedures. During treatments, you''ll assist the dentist by passing instruments, suctioning, and ensuring patient comfort. You''ll take X-rays, make impressions, and provide post-treatment instructions. Between patients, you''ll sterilize equipment, schedule appointments, and manage patient records. Your efficiency and compassion help create positive dental experiences.',
  ARRAY[
    'General dentistry practices',
    'Specialty dental offices (orthodontics, oral surgery)',
    'Community health clinics',
    'Dental schools and teaching facilities',
    'Mobile dental services',
    'Insurance companies'
  ],
  ARRAY['WIOA', 'Pell Grant', 'Workforce Ready Grant', 'Payment Plans'],
  ARRAY[
    'Entry-level dental assistant',
    'Expanded functions dental assistant',
    'Office manager or supervisor',
    'Dental sales representative',
    'Advancement to dental hygienist with additional education'
  ],
  'Dental assistants are in high demand with 11% projected growth through 2031, much faster than average. The BLS projects over 40,000 new jobs. Preventive dental care emphasis and aging population drive demand. Median pay is $42,510 with excellent work-life balance.',
  'High school diploma or GED, background check, immunizations, good manual dexterity',
  '/images/programs/dental-assistant.jpg',
  false,
  true,
  false,
  89,
  85,
  3200.00,
  300.00,
  250.00,
  true
) ON CONFLICT (slug) DO UPDATE SET updated_at = NOW();

-- 13. IT Support Specialist
INSERT INTO public.programs (
  slug, name, description, full_description, category, duration_weeks, training_hours,
  salary_min, salary_max, credential_type, credential_name, delivery_method,
  what_you_learn, day_in_life, employers, funding_pathways, career_outcomes,
  industry_demand, prerequisites, image_url, featured, wioa_approved, dol_registered,
  placement_rate, completion_rate, total_cost, toolkit_cost, credentialing_cost, is_active
) VALUES (
  'it-support-specialist',
  'IT Support Specialist',
  'Launch your IT career with CompTIA A+ certification. Help desk and technical support training.',
  'Our IT Support Specialist program provides comprehensive training in computer hardware, software, networking, and troubleshooting. You''ll learn to support users, resolve technical issues, and maintain IT systems. The program prepares you for CompTIA A+ certification and includes hands-on labs with real equipment. IT support is the entry point to a lucrative technology career with endless growth opportunities.',
  'Information Technology',
  16,
  640,
  38000,
  60000,
  'Industry Certification',
  'CompTIA A+ Certification',
  'Hybrid (Classroom + Lab)',
  ARRAY[
    'Computer hardware installation and repair',
    'Operating systems (Windows, Mac, Linux)',
    'Networking fundamentals and troubleshooting',
    'Mobile device support',
    'Security best practices',
    'Help desk and customer service',
    'Cloud computing basics',
    'Virtualization and remote support'
  ],
  'As an IT support specialist, you''ll start your day by checking the help desk queue and prioritizing tickets. You''ll troubleshoot hardware and software issues via phone, email, or in-person. You''ll install and configure computers, set up user accounts, and resolve network connectivity problems. Throughout the day, you''ll document solutions, update systems, and assist users with technical questions. You''ll work independently and collaboratively, solving problems and keeping technology running smoothly.',
  ARRAY[
    'Corporate IT departments',
    'Managed service providers (MSPs)',
    'Help desk and call centers',
    'Schools and universities',
    'Healthcare organizations',
    'Government agencies'
  ],
  ARRAY['WIOA', 'Pell Grant', 'Workforce Ready Grant', 'Employer Sponsorship'],
  ARRAY[
    'Help desk technician',
    'Desktop support specialist',
    'Network administrator',
    'Systems administrator',
    'IT manager or director'
  ],
  'IT support specialists are in high demand with 6% projected growth. Digital transformation and cybersecurity needs drive consistent opportunities. Median pay is $57,910 with top earners making $90,000+. CompTIA A+ is the industry-standard entry certification.',
  'High school diploma or GED, basic computer skills, problem-solving ability',
  '/images/programs/it-support.jpg',
  true,
  true,
  false,
  87,
  83,
  4200.00,
  500.00,
  400.00,
  true
) ON CONFLICT (slug) DO UPDATE SET updated_at = NOW();

-- 14. Cybersecurity Analyst
INSERT INTO public.programs (
  slug, name, description, full_description, category, duration_weeks, training_hours,
  salary_min, salary_max, credential_type, credential_name, delivery_method,
  what_you_learn, day_in_life, employers, funding_pathways, career_outcomes,
  industry_demand, prerequisites, image_url, featured, wioa_approved, dol_registered,
  placement_rate, completion_rate, total_cost, toolkit_cost, credentialing_cost, is_active
) VALUES (
  'cybersecurity-analyst',
  'Cybersecurity Analyst',
  'Protect organizations from cyber threats. CompTIA Security+ and ethical hacking training.',
  'Our Cybersecurity Analyst program prepares you for a high-demand career protecting digital assets. You''ll learn threat detection, incident response, network security, and ethical hacking. The program includes hands-on labs with real security tools and prepares you for CompTIA Security+ certification. Cybersecurity professionals are critical to every organization with excellent salaries and job security.',
  'Information Technology',
  24,
  960,
  60000,
  110000,
  'Industry Certification',
  'CompTIA Security+ Certification',
  'Hybrid (Classroom + Lab)',
  ARRAY[
    'Network security and firewalls',
    'Threat detection and analysis',
    'Incident response and forensics',
    'Ethical hacking and penetration testing',
    'Security policies and compliance',
    'Cryptography and encryption',
    'Vulnerability assessment',
    'Security information and event management (SIEM)'
  ],
  'As a cybersecurity analyst, you''ll monitor security systems for threats and anomalies. You''ll analyze logs, investigate alerts, and respond to security incidents. You''ll conduct vulnerability assessments, recommend security improvements, and implement protective measures. Throughout the day, you''ll collaborate with IT teams, document findings, and stay current on emerging threats. Your vigilance protects sensitive data and critical systems from cyberattacks.',
  ARRAY[
    'Financial institutions',
    'Healthcare organizations',
    'Government agencies',
    'Technology companies',
    'Consulting firms',
    'All industries (cybersecurity is universal)'
  ],
  ARRAY['WIOA', 'Pell Grant', 'Workforce Ready Grant', 'Employer Sponsorship'],
  ARRAY[
    'Security analyst or specialist',
    'Penetration tester',
    'Security engineer',
    'Security architect',
    'Chief Information Security Officer (CISO)'
  ],
  'Cybersecurity is one of the fastest-growing fields with 35% projected growth through 2031. The cybersecurity workforce gap exceeds 700,000 positions. Median pay is $102,600 with top earners making $165,000+. Every organization needs cybersecurity professionals.',
  'High school diploma or GED, IT fundamentals knowledge, analytical thinking',
  '/images/programs/cybersecurity.jpg',
  true,
  true,
  false,
  84,
  80,
  6500.00,
  800.00,
  500.00,
  true
) ON CONFLICT (slug) DO UPDATE SET updated_at = NOW();

-- 15. Web Development
INSERT INTO public.programs (
  slug, name, description, full_description, category, duration_weeks, training_hours,
  salary_min, salary_max, credential_type, credential_name, delivery_method,
  what_you_learn, day_in_life, employers, funding_pathways, career_outcomes,
  industry_demand, prerequisites, image_url, featured, wioa_approved, dol_registered,
  placement_rate, completion_rate, total_cost, toolkit_cost, credentialing_cost, is_active
) VALUES (
  'web-development',
  'Web Development',
  'Build modern websites and web applications. Full-stack development training.',
  'Our Web Development program teaches you to create professional websites and web applications. You''ll learn HTML, CSS, JavaScript, and modern frameworks like React. The program includes hands-on projects building real websites, preparing you for entry-level developer positions or freelance work. Web developers are in high demand across all industries with excellent remote work opportunities.',
  'Information Technology',
  24,
  960,
  50000,
  95000,
  'Certificate',
  'Full-Stack Web Developer Certificate',
  'Hybrid (Classroom + Online)',
  ARRAY[
    'HTML, CSS, and responsive design',
    'JavaScript and modern frameworks (React, Vue)',
    'Backend development (Node.js, databases)',
    'Version control with Git',
    'Web APIs and RESTful services',
    'UI/UX design principles',
    'Web security best practices',
    'Deployment and hosting'
  ],
  'As a web developer, you''ll start your day reviewing project requirements and planning your work. You''ll write code to build website features, fix bugs, and improve performance. You''ll collaborate with designers, test your code across browsers, and deploy updates to production. Throughout the day, you''ll solve technical challenges, learn new technologies, and create digital experiences. The work is creative, technical, and constantly evolving.',
  ARRAY[
    'Technology companies',
    'Digital agencies',
    'Marketing firms',
    'E-commerce companies',
    'Startups',
    'Freelance and remote opportunities'
  ],
  ARRAY['WIOA', 'Pell Grant', 'Income Share Agreements', 'Payment Plans'],
  ARRAY[
    'Junior web developer',
    'Front-end developer',
    'Full-stack developer',
    'Senior developer or tech lead',
    'Freelance web developer'
  ],
  'Web developers are in high demand with 13% projected growth through 2031. Digital transformation drives consistent opportunities. Median pay is $77,200 with top earners making $130,000+. Remote work is common with flexible schedules.',
  'High school diploma or GED, basic computer skills, logical thinking, creativity',
  '/images/programs/web-development.jpg',
  true,
  true,
  false,
  82,
  78,
  5800.00,
  600.00,
  0.00,
  true
) ON CONFLICT (slug) DO UPDATE SET updated_at = NOW();


-- 16. Data Analytics
INSERT INTO public.programs (
  slug, name, description, full_description, category, duration_weeks, training_hours,
  salary_min, salary_max, credential_type, credential_name, delivery_method,
  what_you_learn, day_in_life, employers, funding_pathways, career_outcomes,
  industry_demand, prerequisites, image_url, featured, wioa_approved, dol_registered,
  placement_rate, completion_rate, total_cost, toolkit_cost, credentialing_cost, is_active
) VALUES (
  'data-analytics',
  'Data Analytics',
  'Turn data into insights. Learn SQL, Excel, Tableau, and data visualization.',
  'Our Data Analytics program teaches you to collect, analyze, and visualize data to drive business decisions. You''ll learn SQL, Excel, Tableau, Python basics, and statistical analysis. The program includes real-world projects analyzing actual datasets, preparing you for entry-level analyst positions. Data analysts are in high demand across all industries with excellent salaries and growth potential.',
  'Information Technology',
  20,
  800,
  55000,
  90000,
  'Certificate',
  'Data Analytics Professional Certificate',
  'Hybrid (Classroom + Online)',
  ARRAY[
    'SQL and database querying',
    'Excel for data analysis',
    'Data visualization with Tableau/Power BI',
    'Statistical analysis fundamentals',
    'Python for data analysis',
    'Data cleaning and preparation',
    'Business intelligence concepts',
    'Presenting data insights'
  ],
  'As a data analyst, you''ll start your day reviewing business questions and data requests. You''ll query databases, clean and prepare data, and perform statistical analysis. You''ll create visualizations and dashboards to communicate insights. Throughout the day, you''ll collaborate with stakeholders, present findings, and recommend data-driven decisions. Your analysis helps organizations understand trends, optimize operations, and achieve goals.',
  ARRAY[
    'Technology companies',
    'Financial services',
    'Healthcare organizations',
    'Retail and e-commerce',
    'Consulting firms',
    'All industries (data is universal)'
  ],
  ARRAY['WIOA', 'Pell Grant', 'Income Share Agreements', 'Employer Sponsorship'],
  ARRAY[
    'Junior data analyst',
    'Business intelligence analyst',
    'Data scientist',
    'Analytics manager',
    'Chief Data Officer'
  ],
  'Data analysts are in extremely high demand with 25% projected growth through 2031. Every organization needs data professionals. Median pay is $82,360 with top earners making $130,000+. Remote work is common.',
  'High school diploma or GED, strong math skills, analytical thinking, Excel basics',
  '/images/programs/data-analytics.jpg',
  true,
  true,
  false,
  85,
  81,
  5200.00,
  400.00,
  300.00,
  true
) ON CONFLICT (slug) DO UPDATE SET updated_at = NOW();

-- 17. Customer Service Representative
INSERT INTO public.programs (
  slug, name, description, full_description, category, duration_weeks, training_hours,
  salary_min, salary_max, credential_type, credential_name, delivery_method,
  what_you_learn, day_in_life, employers, funding_pathways, career_outcomes,
  industry_demand, prerequisites, image_url, featured, wioa_approved, dol_registered,
  placement_rate, completion_rate, total_cost, toolkit_cost, credentialing_cost, is_active
) VALUES (
  'customer-service-representative',
  'Customer Service Representative',
  'Master customer service skills for call centers, retail, and support roles.',
  'Our Customer Service Representative program prepares you for a career helping customers and solving problems. You''ll learn communication skills, conflict resolution, CRM software, and professional phone etiquette. The program includes role-playing scenarios and real-world practice, preparing you for positions in call centers, retail, hospitality, and corporate customer service. Customer service skills are transferable across all industries.',
  'Business',
  8,
  320,
  28000,
  42000,
  'Certificate',
  'Customer Service Professional Certificate',
  'Hybrid (Classroom + Practice)',
  ARRAY[
    'Professional communication skills',
    'Active listening and empathy',
    'Conflict resolution and de-escalation',
    'CRM software and ticketing systems',
    'Phone and email etiquette',
    'Problem-solving techniques',
    'Product knowledge and sales',
    'Time management and multitasking'
  ],
  'As a customer service representative, you''ll start your day logging into your phone and computer systems. You''ll answer calls, emails, and chats from customers with questions, concerns, or complaints. You''ll listen carefully, research solutions, and resolve issues professionally. Throughout the day, you''ll document interactions, escalate complex problems, and maintain positive relationships. Your patience and problem-solving skills create satisfied customers and build brand loyalty.',
  ARRAY[
    'Call centers and contact centers',
    'Retail stores and e-commerce',
    'Banks and financial institutions',
    'Healthcare organizations',
    'Technology companies',
    'Hospitality and travel'
  ],
  ARRAY['WIOA', 'Workforce Ready Grant', 'Employer-Paid Training', 'Payment Plans'],
  ARRAY[
    'Customer service representative',
    'Senior customer service specialist',
    'Team lead or supervisor',
    'Customer service manager',
    'Account manager or sales'
  ],
  'Customer service representatives are consistently in demand with steady job growth. The BLS projects stable employment with over 2.8 million positions. Median pay is $36,920 with opportunities for advancement. Many positions offer flexible schedules and remote work.',
  'High school diploma or GED, good communication skills, computer literacy',
  '/images/programs/customer-service.jpg',
  false,
  true,
  false,
  92,
  88,
  1800.00,
  100.00,
  150.00,
  true
) ON CONFLICT (slug) DO UPDATE SET updated_at = NOW();

-- 18. Administrative Assistant
INSERT INTO public.programs (
  slug, name, description, full_description, category, duration_weeks, training_hours,
  salary_min, salary_max, credential_type, credential_name, delivery_method,
  what_you_learn, day_in_life, employers, funding_pathways, career_outcomes,
  industry_demand, prerequisites, image_url, featured, wioa_approved, dol_registered,
  placement_rate, completion_rate, total_cost, toolkit_cost, credentialing_cost, is_active
) VALUES (
  'administrative-assistant',
  'Administrative Assistant',
  'Become an office professional. Learn Microsoft Office, scheduling, and business communication.',
  'Our Administrative Assistant program prepares you for professional office roles. You''ll master Microsoft Office Suite, business writing, scheduling, and office procedures. The program includes hands-on practice with real office scenarios, preparing you for positions supporting executives, teams, and organizations. Administrative professionals are essential to every business with stable employment and advancement opportunities.',
  'Business',
  12,
  480,
  32000,
  50000,
  'Certificate',
  'Administrative Professional Certificate',
  'Hybrid (Classroom + Practice)',
  ARRAY[
    'Microsoft Office Suite (Word, Excel, PowerPoint, Outlook)',
    'Business writing and correspondence',
    'Calendar management and scheduling',
    'Meeting coordination and minutes',
    'Filing systems and record keeping',
    'Professional phone and email etiquette',
    'Office equipment and technology',
    'Time management and organization'
  ],
  'As an administrative assistant, you''ll start your day checking emails and reviewing your executive''s calendar. You''ll schedule meetings, prepare documents, and coordinate travel arrangements. Throughout the day, you''ll answer phones, greet visitors, manage correspondence, and handle various office tasks. You''ll prepare presentations, organize files, and ensure smooth office operations. Your organizational skills and professionalism keep the office running efficiently.',
  ARRAY[
    'Corporate offices',
    'Healthcare facilities',
    'Legal firms',
    'Educational institutions',
    'Government agencies',
    'Non-profit organizations'
  ],
  ARRAY['WIOA', 'Pell Grant', 'Workforce Ready Grant', 'Payment Plans'],
  ARRAY[
    'Administrative assistant',
    'Executive assistant',
    'Office manager',
    'Operations coordinator',
    'Project coordinator'
  ],
  'Administrative assistants are in steady demand across all industries. The BLS projects stable employment with over 3 million positions. Median pay is $40,990 with experienced professionals earning $65,000+. Skills are transferable across industries.',
  'High school diploma or GED, computer literacy, organizational skills, professional demeanor',
  '/images/programs/administrative-assistant.jpg',
  false,
  true,
  false,
  90,
  86,
  2400.00,
  200.00,
  200.00,
  true
) ON CONFLICT (slug) DO UPDATE SET updated_at = NOW();

-- 19. Bookkeeping
INSERT INTO public.programs (
  slug, name, description, full_description, category, duration_weeks, training_hours,
  salary_min, salary_max, credential_type, credential_name, delivery_method,
  what_you_learn, day_in_life, employers, funding_pathways, career_outcomes,
  industry_demand, prerequisites, image_url, featured, wioa_approved, dol_registered,
  placement_rate, completion_rate, total_cost, toolkit_cost, credentialing_cost, is_active
) VALUES (
  'bookkeeping',
  'Bookkeeping',
  'Manage financial records for businesses. QuickBooks certification included.',
  'Our Bookkeeping program teaches you to maintain accurate financial records for businesses. You''ll learn accounts payable/receivable, payroll, bank reconciliation, and financial reporting. The program includes QuickBooks certification and hands-on practice with real business scenarios. Bookkeepers are essential to every business with stable employment and opportunities for remote work.',
  'Business',
  16,
  640,
  35000,
  55000,
  'Industry Certification',
  'QuickBooks Certified User',
  'Hybrid (Classroom + Software)',
  ARRAY[
    'Double-entry bookkeeping principles',
    'Accounts payable and receivable',
    'Payroll processing',
    'Bank reconciliation',
    'QuickBooks software',
    'Financial statements and reports',
    'Tax preparation basics',
    'Business math and calculations'
  ],
  'As a bookkeeper, you''ll start your day reviewing transactions and updating financial records. You''ll process invoices, record payments, and reconcile bank statements. You''ll prepare payroll, generate financial reports, and ensure accuracy in all entries. Throughout the day, you''ll communicate with vendors, answer financial questions, and maintain organized records. Your attention to detail keeps businesses financially healthy and compliant.',
  ARRAY[
    'Small businesses',
    'Accounting firms',
    'Non-profit organizations',
    'Healthcare practices',
    'Law firms',
    'Self-employment / freelance'
  ],
  ARRAY['WIOA', 'Pell Grant', 'Workforce Ready Grant', 'Payment Plans'],
  ARRAY[
    'Bookkeeper',
    'Accounting clerk',
    'Payroll specialist',
    'Accountant (with additional education)',
    'Accounting manager'
  ],
  'Bookkeepers are in steady demand with stable employment. The BLS projects consistent opportunities as businesses need financial record keeping. Median pay is $45,560 with experienced bookkeepers earning $65,000+. Remote work is increasingly common.',
  'High school diploma or GED, strong math skills, attention to detail, computer literacy',
  '/images/programs/bookkeeping.jpg',
  false,
  true,
  false,
  88,
  84,
  3600.00,
  300.00,
  250.00,
  true
) ON CONFLICT (slug) DO UPDATE SET updated_at = NOW();

-- 20. Real Estate Agent
INSERT INTO public.programs (
  slug, name, description, full_description, category, duration_weeks, training_hours,
  salary_min, salary_max, credential_type, credential_name, delivery_method,
  what_you_learn, day_in_life, employers, funding_pathways, career_outcomes,
  industry_demand, prerequisites, image_url, featured, wioa_approved, dol_registered,
  placement_rate, completion_rate, total_cost, toolkit_cost, credentialing_cost, is_active
) VALUES (
  'real-estate-agent',
  'Real Estate Agent',
  'Get your real estate license and start selling homes. Exam prep included.',
  'Our Real Estate Agent program prepares you for the state licensing exam and a career in real estate sales. You''ll learn property law, contracts, financing, marketing, and sales techniques. The program includes exam preparation and practical training in listing, showing, and selling properties. Real estate agents have unlimited earning potential with flexible schedules and entrepreneurial opportunities.',
  'Business',
  12,
  120,
  30000,
  100000,
  'State License',
  'Licensed Real Estate Salesperson',
  'Hybrid (Classroom + Online)',
  ARRAY[
    'Real estate law and regulations',
    'Property valuation and appraisal',
    'Contracts and negotiations',
    'Mortgage financing and lending',
    'Marketing and lead generation',
    'Property showing and sales techniques',
    'Ethics and professional conduct',
    'MLS and real estate technology'
  ],
  'As a real estate agent, every day is different. You''ll prospect for new clients, list properties for sale, and conduct market analyses. You''ll show homes to buyers, negotiate offers, and coordinate closings. Throughout the day, you''ll market properties, network with other agents, and build relationships. You''ll work evenings and weekends to accommodate clients. Your sales skills and market knowledge help people achieve their homeownership dreams while building your own business.',
  ARRAY[
    'Real estate brokerages',
    'Independent agent (self-employed)',
    'Property management companies',
    'Real estate investment firms',
    'Commercial real estate',
    'Real estate development'
  ],
  ARRAY['Self-Pay', 'Payment Plans', 'Brokerage Sponsorship'],
  ARRAY[
    'Licensed real estate agent',
    'Top-producing agent',
    'Real estate broker',
    'Team leader or manager',
    'Real estate investor'
  ],
  'Real estate agents have unlimited earning potential based on commission. The median income is $48,770 but top agents earn $100,000+. The housing market drives demand with consistent opportunities. Flexible schedule and entrepreneurial freedom appeal to many.',
  'Age 18+, high school diploma or GED, background check, pass state exam',
  '/images/programs/real-estate.jpg',
  false,
  false,
  false,
  75,
  70,
  800.00,
  100.00,
  200.00,
  true
) ON CONFLICT (slug) DO UPDATE SET updated_at = NOW();


-- 21. Insurance Agent
INSERT INTO public.programs (
  slug, name, description, full_description, category, duration_weeks, training_hours,
  salary_min, salary_max, credential_type, credential_name, delivery_method,
  what_you_learn, day_in_life, employers, funding_pathways, career_outcomes,
  industry_demand, prerequisites, image_url, featured, wioa_approved, dol_registered,
  placement_rate, completion_rate, total_cost, toolkit_cost, credentialing_cost, is_active
) VALUES (
  'insurance-agent',
  'Insurance Agent',
  'Sell insurance products and help clients protect their assets. State license included.',
  'Our Insurance Agent program prepares you for the state licensing exam and a career selling insurance. You''ll learn life, health, property, and casualty insurance products, sales techniques, and regulations. The program includes exam preparation and practical training in client consultation and policy sales. Insurance agents have stable income potential with residual commissions and flexible schedules.',
  'Business',
  8,
  80,
  35000,
  90000,
  'State License',
  'Licensed Insurance Agent',
  'Hybrid (Classroom + Online)',
  ARRAY[
    'Life and health insurance products',
    'Property and casualty insurance',
    'Insurance regulations and ethics',
    'Risk assessment and underwriting',
    'Sales techniques and prospecting',
    'Client needs analysis',
    'Policy comparison and recommendations',
    'Claims process and customer service'
  ],
  'As an insurance agent, you''ll start your day reviewing client appointments and preparing presentations. You''ll meet with individuals and businesses to assess their insurance needs, explain coverage options, and recommend policies. You''ll quote premiums, complete applications, and follow up on pending business. Throughout the day, you''ll prospect for new clients, service existing policies, and assist with claims. Your expertise helps clients protect their families, homes, and businesses.',
  ARRAY[
    'Insurance agencies',
    'Independent agent (self-employed)',
    'Insurance companies (State Farm, Allstate, etc.)',
    'Financial services firms',
    'Banks and credit unions',
    'Online insurance platforms'
  ],
  ARRAY['Self-Pay', 'Payment Plans', 'Agency Sponsorship'],
  ARRAY[
    'Licensed insurance agent',
    'Senior agent or producer',
    'Agency owner',
    'Insurance broker',
    'Financial advisor'
  ],
  'Insurance agents have stable demand with consistent opportunities. The BLS projects steady employment with over 500,000 positions. Income potential is unlimited with commission and residuals. Median pay is $52,180 with top agents earning $125,000+.',
  'Age 18+, high school diploma or GED, background check, pass state exam',
  '/images/programs/insurance-agent.jpg',
  false,
  false,
  false,
  78,
  72,
  600.00,
  50.00,
  150.00,
  true
) ON CONFLICT (slug) DO UPDATE SET updated_at = NOW();

-- 22. Solar Panel Installation
INSERT INTO public.programs (
  slug, name, description, full_description, category, duration_weeks, training_hours,
  salary_min, salary_max, credential_type, credential_name, delivery_method,
  what_you_learn, day_in_life, employers, funding_pathways, career_outcomes,
  industry_demand, prerequisites, image_url, featured, wioa_approved, dol_registered,
  placement_rate, completion_rate, total_cost, toolkit_cost, credentialing_cost, is_active
) VALUES (
  'solar-panel-installation',
  'Solar Panel Installation',
  'Join the renewable energy revolution. Install solar photovoltaic systems.',
  'Our Solar Panel Installation program prepares you for a career in the rapidly growing renewable energy industry. You''ll learn solar system design, installation, electrical connections, and safety procedures. The program includes hands-on training installing actual solar panels and prepares you for NABCEP certification. Solar installers are in high demand as clean energy adoption accelerates nationwide.',
  'Skilled Trades',
  12,
  480,
  38000,
  65000,
  'Industry Certification',
  'NABCEP PV Installation Professional',
  'Hybrid (Classroom + Field)',
  ARRAY[
    'Solar photovoltaic system design',
    'Panel installation and mounting',
    'Electrical wiring and connections',
    'Inverter and battery systems',
    'Safety procedures and fall protection',
    'Building codes and permits',
    'System testing and commissioning',
    'Maintenance and troubleshooting'
  ],
  'As a solar installer, you''ll start your day loading equipment and traveling to job sites. You''ll assess roofs, install mounting systems, and position solar panels. You''ll run electrical conduit, connect inverters, and test systems. Throughout the day, you''ll work at heights, use power tools, and collaborate with your crew. You''ll ensure quality installation and customer satisfaction. Your work directly contributes to clean energy and environmental sustainability.',
  ARRAY[
    'Solar installation companies',
    'Electrical contractors',
    'Renewable energy firms',
    'Utilities and power companies',
    'Construction companies',
    'Self-employment opportunities'
  ],
  ARRAY['WIOA', 'Workforce Ready Grant', 'Green Jobs Training', 'Employer Sponsorship'],
  ARRAY[
    'Solar installer',
    'Lead installer or foreman',
    'Solar system designer',
    'Project manager',
    'Solar company owner'
  ],
  'Solar installers are in extremely high demand with 27% projected growth through 2031, much faster than average. Clean energy initiatives and climate goals drive explosive growth. Median pay is $47,670 with experienced installers earning $70,000+. Job security in growing industry.',
  'High school diploma or GED, physical fitness, comfortable working at heights, valid driver''s license',
  '/images/programs/solar-installation.jpg',
  true,
  true,
  false,
  86,
  82,
  4200.00,
  700.00,
  400.00,
  true
) ON CONFLICT (slug) DO UPDATE SET updated_at = NOW();

-- 23. Automotive Technician
INSERT INTO public.programs (
  slug, name, description, full_description, category, duration_weeks, training_hours,
  salary_min, salary_max, credential_type, credential_name, delivery_method,
  what_you_learn, day_in_life, employers, funding_pathways, career_outcomes,
  industry_demand, prerequisites, image_url, featured, wioa_approved, dol_registered,
  placement_rate, completion_rate, total_cost, toolkit_cost, credentialing_cost, is_active
) VALUES (
  'automotive-technician',
  'Automotive Technician',
  'Diagnose and repair vehicles. ASE certification preparation included.',
  'Our Automotive Technician program provides comprehensive training in vehicle diagnosis, repair, and maintenance. You''ll learn engine systems, brakes, electrical, and computerized diagnostics. The program includes hands-on training with real vehicles and prepares you for ASE certification. Automotive technicians are always in demand with stable employment and advancement opportunities in a recession-resistant trade.',
  'Skilled Trades',
  32,
  1280,
  35000,
  70000,
  'Industry Certification',
  'ASE Certified Automotive Technician',
  'In-Person (Lab-Based)',
  ARRAY[
    'Engine diagnosis and repair',
    'Brake systems and hydraulics',
    'Electrical and electronic systems',
    'Heating and air conditioning',
    'Transmission and drivetrain',
    'Computerized diagnostics',
    'Preventive maintenance',
    'Customer service and estimates'
  ],
  'As an automotive technician, you''ll start your day reviewing repair orders and diagnosing vehicle problems. You''ll use diagnostic equipment to identify issues, perform repairs, and test systems. Throughout the day, you''ll work on various vehicles - from oil changes to complex engine repairs. You''ll communicate with service advisors, order parts, and ensure quality work. Your technical skills keep vehicles safe and reliable for customers.',
  ARRAY[
    'Auto dealerships',
    'Independent repair shops',
    'Tire and service centers',
    'Fleet maintenance',
    'Specialty shops (transmission, brakes)',
    'Self-employment opportunities'
  ],
  ARRAY['WIOA', 'Pell Grant', 'Apprenticeship', 'Employer Sponsorship'],
  ARRAY[
    'Entry-level automotive technician',
    'ASE Master Technician',
    'Shop foreman or manager',
    'Service advisor',
    'Shop owner'
  ],
  'Automotive technicians are in steady demand with consistent opportunities. The BLS projects stable employment with over 700,000 positions. Median pay is $46,880 with master technicians earning $75,000+. Electric vehicles create new opportunities.',
  'High school diploma or GED, mechanical aptitude, physical fitness, valid driver''s license',
  '/images/programs/automotive-tech.jpg',
  false,
  true,
  true,
  87,
  83,
  8500.00,
  2000.00,
  400.00,
  true
) ON CONFLICT (slug) DO UPDATE SET updated_at = NOW();

-- 24. Diesel Mechanic
INSERT INTO public.programs (
  slug, name, description, full_description, category, duration_weeks, training_hours,
  salary_min, salary_max, credential_type, credential_name, delivery_method,
  what_you_learn, day_in_life, employers, funding_pathways, career_outcomes,
  industry_demand, prerequisites, image_url, featured, wioa_approved, dol_registered,
  placement_rate, completion_rate, total_cost, toolkit_cost, credentialing_cost, is_active
) VALUES (
  'diesel-mechanic',
  'Diesel Mechanic',
  'Service and repair diesel engines in trucks, buses, and heavy equipment.',
  'Our Diesel Mechanic program teaches you to diagnose, repair, and maintain diesel-powered vehicles and equipment. You''ll learn diesel engine systems, hydraulics, electrical, and computerized diagnostics. The program includes hands-on training with trucks, buses, and heavy equipment, preparing you for ASE certification. Diesel mechanics are in high demand with excellent pay and job security.',
  'Skilled Trades',
  32,
  1280,
  40000,
  75000,
  'Industry Certification',
  'ASE Certified Diesel Technician',
  'In-Person (Lab-Based)',
  ARRAY[
    'Diesel engine diagnosis and repair',
    'Fuel injection systems',
    'Hydraulic and pneumatic systems',
    'Electrical and electronic systems',
    'Brake and suspension systems',
    'Computerized diagnostics',
    'Preventive maintenance',
    'Emissions and environmental compliance'
  ],
  'As a diesel mechanic, you''ll work on large trucks, buses, and heavy equipment. Your day involves diagnosing engine problems, performing repairs, and conducting preventive maintenance. You''ll use specialized tools and diagnostic equipment to troubleshoot complex systems. Throughout the day, you''ll work independently and collaboratively, ensuring vehicles are safe and operational. Your expertise keeps commercial fleets and construction equipment running.',
  ARRAY[
    'Trucking companies',
    'Bus companies and transit authorities',
    'Construction companies',
    'Equipment rental companies',
    'Dealerships and repair shops',
    'Government and military'
  ],
  ARRAY['WIOA', 'Pell Grant', 'Apprenticeship', 'Employer Sponsorship'],
  ARRAY[
    'Diesel mechanic',
    'ASE Master Diesel Technician',
    'Fleet maintenance supervisor',
    'Service manager',
    'Shop owner'
  ],
  'Diesel mechanics are in high demand with 4% projected growth. Commercial transportation and construction drive consistent opportunities. Median pay is $52,690 with experienced mechanics earning $80,000+. Overtime is common with excellent benefits.',
  'High school diploma or GED, mechanical aptitude, physical fitness, valid driver''s license',
  '/images/programs/diesel-mechanic.jpg',
  false,
  true,
  true,
  88,
  84,
  9000.00,
  2200.00,
  400.00,
  true
) ON CONFLICT (slug) DO UPDATE SET updated_at = NOW();

-- 25. Forklift Operator
INSERT INTO public.programs (
  slug, name, description, full_description, category, duration_weeks, training_hours,
  salary_min, salary_max, credential_type, credential_name, delivery_method,
  what_you_learn, day_in_life, employers, funding_pathways, career_outcomes,
  industry_demand, prerequisites, image_url, featured, wioa_approved, dol_registered,
  placement_rate, completion_rate, total_cost, toolkit_cost, credentialing_cost, is_active
) VALUES (
  'forklift-operator',
  'Forklift Operator',
  'Get OSHA-certified to operate forklifts in warehouses and distribution centers.',
  'Our Forklift Operator program provides OSHA-compliant training in safe forklift operation. You''ll learn to operate various types of forklifts, load and unload materials, and follow safety procedures. The program includes hands-on practice with real equipment and prepares you for immediate employment in warehouses, distribution centers, and manufacturing. Forklift operators are essential workers with stable employment and opportunities nationwide.',
  'Transportation',
  1,
  40,
  30000,
  45000,
  'OSHA Certification',
  'OSHA Forklift Operator Certification',
  'In-Person (Hands-On)',
  ARRAY[
    'Forklift operation and controls',
    'Load handling and stacking',
    'Safety procedures and OSHA compliance',
    'Pre-operation inspection',
    'Warehouse operations',
    'Hazard recognition',
    'Different forklift types',
    'Emergency procedures'
  ],
  'As a forklift operator, you''ll start your day with a pre-operation inspection of your equipment. You''ll load and unload trucks, move materials throughout the warehouse, and stack products safely. Throughout the day, you''ll operate forklifts in busy environments, communicate with team members, and maintain safety standards. Your efficiency and attention to safety keep warehouse operations running smoothly.',
  ARRAY[
    'Warehouses and distribution centers',
    'Manufacturing plants',
    'Shipping and logistics companies',
    'Retail distribution centers',
    'Construction sites',
    'Ports and freight terminals'
  ],
  ARRAY['WIOA', 'Workforce Ready Grant', 'Employer-Paid Training', 'Self-Pay'],
  ARRAY[
    'Forklift operator',
    'Lead operator or trainer',
    'Warehouse supervisor',
    'Logistics coordinator',
    'Operations manager'
  ],
  'Forklift operators are in consistent demand across industries. E-commerce growth drives warehouse expansion and hiring. Median pay is $37,050 with opportunities for overtime. Quick training leads to immediate employment.',
  'Age 18+, high school diploma or GED, physical fitness, pass drug screen',
  '/images/programs/forklift-operator.jpg',
  false,
  true,
  false,
  95,
  92,
  500.00,
  0.00,
  100.00,
  true
) ON CONFLICT (slug) DO UPDATE SET updated_at = NOW();

-- 26. Manufacturing Technician
INSERT INTO public.programs (
  slug, name, description, full_description, category, duration_weeks, training_hours,
  salary_min, salary_max, credential_type, credential_name, delivery_method,
  what_you_learn, day_in_life, employers, funding_pathways, career_outcomes,
  industry_demand, prerequisites, image_url, featured, wioa_approved, dol_registered,
  placement_rate, completion_rate, total_cost, toolkit_cost, credentialing_cost, is_active
) VALUES (
  'manufacturing-technician',
  'Manufacturing Technician',
  'Operate production equipment and maintain quality in manufacturing environments.',
  'Our Manufacturing Technician program prepares you for careers in modern manufacturing. You''ll learn machine operation, quality control, safety procedures, and lean manufacturing principles. The program includes hands-on training with production equipment and prepares you for MSSC certification. Manufacturing technicians are in high demand as American manufacturing expands with excellent pay and benefits.',
  'Skilled Trades',
  12,
  480,
  35000,
  60000,
  'Industry Certification',
  'MSSC Certified Production Technician',
  'Hybrid (Classroom + Lab)',
  ARRAY[
    'Machine operation and setup',
    'Quality control and inspection',
    'Safety procedures and OSHA compliance',
    'Lean manufacturing principles',
    'Blueprint reading and measurements',
    'Preventive maintenance',
    'Production documentation',
    'Teamwork and communication'
  ],
  'As a manufacturing technician, you''ll operate production equipment to create products. Your day involves setting up machines, monitoring production, and performing quality checks. You''ll troubleshoot issues, maintain equipment, and document production data. Throughout the day, you''ll work with your team to meet production goals while maintaining safety and quality standards. Your skills keep manufacturing operations efficient and productive.',
  ARRAY[
    'Manufacturing plants',
    'Automotive manufacturers',
    'Food and beverage production',
    'Pharmaceutical companies',
    'Electronics manufacturers',
    'Aerospace and defense'
  ],
  ARRAY['WIOA', 'Workforce Ready Grant', 'Apprenticeship', 'Employer Sponsorship'],
  ARRAY[
    'Production technician',
    'Quality control technician',
    'Machine operator',
    'Production supervisor',
    'Manufacturing engineer'
  ],
  'Manufacturing technicians are in high demand as U.S. manufacturing grows. The BLS projects steady opportunities with over 600,000 positions. Median pay is $45,840 with experienced technicians earning $65,000+. Excellent benefits and job security.',
  'High school diploma or GED, mechanical aptitude, attention to detail, teamwork skills',
  '/images/programs/manufacturing-tech.jpg',
  false,
  true,
  true,
  89,
  85,
  3200.00,
  400.00,
  300.00,
  true
) ON CONFLICT (slug) DO UPDATE SET updated_at = NOW();

-- 27. Entrepreneurship / Small Business
INSERT INTO public.programs (
  slug, name, description, full_description, category, duration_weeks, training_hours,
  salary_min, salary_max, credential_type, credential_name, delivery_method,
  what_you_learn, day_in_life, employers, funding_pathways, career_outcomes,
  industry_demand, prerequisites, image_url, featured, wioa_approved, dol_registered,
  placement_rate, completion_rate, total_cost, toolkit_cost, credentialing_cost, is_active
) VALUES (
  'entrepreneurship-small-business',
  'Entrepreneurship / Small Business',
  'Start and grow your own business. Business planning, marketing, and financial management.',
  'Our Entrepreneurship program teaches you to start, manage, and grow a successful small business. You''ll learn business planning, marketing, financial management, and legal requirements. The program includes developing your actual business plan and prepares you to launch your venture. Whether you want to start a service business, retail store, or online company, this program provides the foundation for entrepreneurial success.',
  'Business',
  16,
  640,
  0,
  150000,
  'Certificate',
  'Small Business Management Certificate',
  'Hybrid (Classroom + Online)',
  ARRAY[
    'Business planning and strategy',
    'Marketing and customer acquisition',
    'Financial management and accounting',
    'Legal structures and requirements',
    'Funding and capital raising',
    'Operations and systems',
    'Sales and customer service',
    'Digital marketing and social media'
  ],
  'As an entrepreneur, every day is different and driven by your vision. You''ll develop your business idea, create your business plan, and take steps to launch. You''ll market your products or services, serve customers, and manage finances. Throughout your journey, you''ll solve problems, make decisions, and adapt to challenges. You''ll wear many hats - from salesperson to accountant to marketer. Your determination and skills build a business that creates income and impact.',
  ARRAY[
    'Self-employment',
    'Small business ownership',
    'Franchise ownership',
    'Online business',
    'Service business',
    'Retail or restaurant'
  ],
  ARRAY['WIOA', 'SBA Loans', 'Microloans', 'Self-Funded'],
  ARRAY[
    'Small business owner',
    'Franchise owner',
    'Consultant',
    'Multiple business owner',
    'Business coach or mentor'
  ],
  'Entrepreneurship offers unlimited income potential based on your business success. Small businesses create over 60% of new jobs in America. The SBA reports over 30 million small businesses nationwide. Success requires dedication, but rewards include independence, flexibility, and wealth creation.',
  'High school diploma or GED, business idea or interest, self-motivation, financial resources',
  '/images/programs/entrepreneurship.jpg',
  false,
  true,
  false,
  70,
  65,
  2800.00,
  200.00,
  0.00,
  true
) ON CONFLICT (slug) DO UPDATE SET updated_at = NOW();

-- End of all 27 programs
