-- ============================================
-- MISSING TABLES - ADD THESE TO COMPLETE SYSTEM
-- ============================================

-- Create document_audit_log table
CREATE TABLE IF NOT EXISTS document_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  performed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_document_audit_log_document ON document_audit_log(document_id);
CREATE INDEX IF NOT EXISTS idx_document_audit_log_performed_by ON document_audit_log(performed_by);

ALTER TABLE document_audit_log ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can view all audit logs" ON document_audit_log;
CREATE POLICY "Admins can view all audit logs"
  ON document_audit_log FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

DROP POLICY IF EXISTS "Users can view own document audit logs" ON document_audit_log;
CREATE POLICY "Users can view own document audit logs"
  ON document_audit_log FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM documents
      WHERE documents.id = document_audit_log.document_id
      AND documents.user_id = auth.uid()
    )
  );

GRANT SELECT ON document_audit_log TO authenticated;

-- Create document_requirements table
CREATE TABLE IF NOT EXISTS document_requirements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role TEXT NOT NULL,
  document_type TEXT NOT NULL,
  is_required BOOLEAN DEFAULT true,
  description TEXT,
  instructions TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(role, document_type)
);

CREATE INDEX IF NOT EXISTS idx_document_requirements_role ON document_requirements(role);

ALTER TABLE document_requirements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view document requirements" ON document_requirements;
CREATE POLICY "Anyone can view document requirements"
  ON document_requirements FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Admins can manage document requirements" ON document_requirements;
CREATE POLICY "Admins can manage document requirements"
  ON document_requirements FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

GRANT SELECT ON document_requirements TO authenticated;
GRANT INSERT, UPDATE, DELETE ON document_requirements TO authenticated;

-- Seed document requirements
INSERT INTO document_requirements (role, document_type, is_required, description, instructions)
VALUES
  ('student', 'id_verification', true, 'Government-issued ID', 'Upload a clear photo of your driver license or passport'),
  ('student', 'proof_of_address', true, 'Proof of residence', 'Upload a utility bill or bank statement from the last 3 months'),
  ('instructor', 'teaching_certificate', true, 'Teaching credentials', 'Upload your teaching certificate or license'),
  ('instructor', 'background_check', true, 'Background check results', 'Upload a recent background check (within 6 months)'),
  ('partner', 'business_license', true, 'Business license', 'Upload your current business license'),
  ('partner', 'insurance_certificate', true, 'Insurance certificate', 'Upload proof of liability insurance')
ON CONFLICT (role, document_type) DO NOTHING;

-- Create notifications table if not exists
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  link TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);
CREATE INDEX IF NOT EXISTS idx_notifications_created ON notifications(created_at);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own notifications" ON notifications;
CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can update own notifications" ON notifications;
CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "System can create notifications" ON notifications;
CREATE POLICY "System can create notifications"
  ON notifications FOR INSERT
  WITH CHECK (true);

GRANT SELECT, UPDATE ON notifications TO authenticated;
GRANT INSERT ON notifications TO authenticated;

-- Verification
DO $$
BEGIN
  RAISE NOTICE '';
  RAISE NOTICE '✅ ============================================';
  RAISE NOTICE '✅ MISSING TABLES CREATED!';
  RAISE NOTICE '✅ ============================================';
  RAISE NOTICE '';
  RAISE NOTICE 'Tables Created:';
  RAISE NOTICE '  ✅ document_audit_log';
  RAISE NOTICE '  ✅ document_requirements';
  RAISE NOTICE '  ✅ notifications';
  RAISE NOTICE '';
  RAISE NOTICE 'System is now COMPLETE!';
  RAISE NOTICE '';
END $$;
