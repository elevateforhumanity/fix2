-- Audit Logs and Portal Support
-- Migration: 20251118_audit_logs_portals

-- Audit logs for compliance and security tracking
CREATE TABLE IF NOT EXISTS audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  actor_email text,
  action text NOT NULL,
  resource_type text,
  resource_id uuid,
  metadata jsonb,
  ip_address text,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_actor ON audit_logs(actor_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_resource ON audit_logs(resource_type, resource_id);

-- Add board and partner roles if not exists
DO $$
BEGIN
  -- This is a safe way to add values to an enum if it exists
  -- If your role column is text, this won't be needed
  IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'board';
    ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'partner';
  END IF;
END $$;

-- Add organization field to profiles for board/partner tracking
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS organization text,
ADD COLUMN IF NOT EXISTS referred_by text;

-- Add referral tracking to enrollments
ALTER TABLE enrollments
ADD COLUMN IF NOT EXISTS referred_by text,
ADD COLUMN IF NOT EXISTS hours_trained numeric(8,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS sector text,
ADD COLUMN IF NOT EXISTS zip_code text;

-- Compliance checklist items
CREATE TABLE IF NOT EXISTS compliance_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  title text NOT NULL,
  description text,
  status text NOT NULL DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'complete')),
  evidence_url text,
  last_reviewed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_compliance_items_status ON compliance_items(status);
CREATE INDEX IF NOT EXISTS idx_compliance_items_category ON compliance_items(category);

-- Insert default compliance items
INSERT INTO compliance_items (category, title, description, status) VALUES
('Security', 'SOC 2 Type II Audit', 'Independent verification of data security controls.', 'in_progress'),
('Compliance', 'WIOA Quarterly Reporting', 'ETPL / DOL compliance reports automated.', 'complete'),
('Accessibility', 'WCAG 2.1 AA Compliance', 'Accessibility testing across all learner interfaces.', 'todo'),
('Security', 'Penetration Testing', 'Annual third-party security assessment.', 'todo'),
('Compliance', 'FERPA Compliance', 'Student data protection and privacy controls.', 'complete'),
('Security', 'Encryption at Rest', 'All sensitive data encrypted in database.', 'complete'),
('Security', 'Encryption in Transit', 'TLS 1.3 for all connections.', 'complete'),
('Compliance', 'GDPR Compliance', 'EU data protection requirements.', 'in_progress'),
('Accessibility', 'Screen Reader Testing', 'NVDA and JAWS compatibility testing.', 'todo'),
('Security', 'Multi-Factor Authentication', 'MFA enabled for admin and instructor accounts.', 'complete')
ON CONFLICT DO NOTHING;

-- Referrals table for workforce board tracking
CREATE TABLE IF NOT EXISTS referrals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  board_org text NOT NULL,
  board_user_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  participant_name text NOT NULL,
  participant_email text,
  participant_phone text,
  program_name text,
  course_id uuid REFERENCES courses(id) ON DELETE SET NULL,
  notes text,
  status text NOT NULL DEFAULT 'referred' CHECK (status IN ('referred', 'enrolled', 'completed', 'not_eligible')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_referrals_board_org ON referrals(board_org);
CREATE INDEX IF NOT EXISTS idx_referrals_board_user ON referrals(board_user_id);
CREATE INDEX IF NOT EXISTS idx_referrals_status ON referrals(status);
CREATE INDEX IF NOT EXISTS idx_referrals_created_at ON referrals(created_at DESC);

-- Attendance records for partner tracking
CREATE TABLE IF NOT EXISTS attendance_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id uuid REFERENCES enrollments(id) ON DELETE CASCADE,
  date date NOT NULL,
  hours numeric(5,2) NOT NULL CHECK (hours > 0 AND hours <= 24),
  source text NOT NULL DEFAULT 'partner' CHECK (source IN ('partner', 'system', 'import')),
  recorded_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_attendance_enrollment ON attendance_records(enrollment_id);
CREATE INDEX IF NOT EXISTS idx_attendance_date ON attendance_records(date DESC);
CREATE INDEX IF NOT EXISTS idx_attendance_recorded_by ON attendance_records(recorded_by);

-- Update function for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_referrals_updated_at BEFORE UPDATE ON referrals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_compliance_items_updated_at BEFORE UPDATE ON compliance_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to increment hours_trained on enrollment
CREATE OR REPLACE FUNCTION increment_hours_trained(enrollment_id uuid, hours_to_add numeric)
RETURNS void AS $$
BEGIN
  UPDATE enrollments
  SET hours_trained = COALESCE(hours_trained, 0) + hours_to_add
  WHERE id = enrollment_id;
END;
$$ LANGUAGE plpgsql;

-- Digital signature documents for MOUs and letters of support
CREATE TABLE IF NOT EXISTS signature_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('mou', 'letter_of_support', 'other')),
  title text NOT NULL,
  body text NOT NULL,
  created_for_org text,
  created_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_signature_documents_type ON signature_documents(type);
CREATE INDEX IF NOT EXISTS idx_signature_documents_created_by ON signature_documents(created_by);

-- Signatures on documents
CREATE TABLE IF NOT EXISTS signatures (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid REFERENCES signature_documents(id) ON DELETE CASCADE,
  signer_name text NOT NULL,
  signer_email text NOT NULL,
  role text,
  ip_address text,
  signed_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_signatures_document ON signatures(document_id);
CREATE INDEX IF NOT EXISTS idx_signatures_email ON signatures(signer_email);

-- Compliance evidence uploads
CREATE TABLE IF NOT EXISTS compliance_evidence (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id uuid REFERENCES compliance_items(id) ON DELETE CASCADE,
  file_url text NOT NULL,
  file_name text NOT NULL,
  uploaded_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  uploaded_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_compliance_evidence_item ON compliance_evidence(item_id);
CREATE INDEX IF NOT EXISTS idx_compliance_evidence_uploaded_by ON compliance_evidence(uploaded_by);
