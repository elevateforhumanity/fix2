-- ============================================
-- DOCUMENT CENTER COMPLETE FIX
-- Copy and paste this entire file into Supabase SQL Editor
-- ============================================

-- FIX 1: Add missing columns to program_holder_documents
ALTER TABLE program_holder_documents 
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';

ALTER TABLE program_holder_documents 
ADD COLUMN IF NOT EXISTS reviewed_by UUID REFERENCES auth.users(id);

ALTER TABLE program_holder_documents 
ADD COLUMN IF NOT EXISTS reviewed_at TIMESTAMPTZ;

ALTER TABLE program_holder_documents 
ADD COLUMN IF NOT EXISTS rejection_reason TEXT;

-- FIX 2: Create tax_documents table
CREATE TABLE IF NOT EXISTS tax_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tax_year INTEGER NOT NULL,
  document_type TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  file_url TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  uploaded_by UUID REFERENCES auth.users(id),
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tax_documents_user_id ON tax_documents(user_id);
CREATE INDEX IF NOT EXISTS idx_tax_documents_year ON tax_documents(tax_year);
CREATE INDEX IF NOT EXISTS idx_tax_documents_type ON tax_documents(document_type);

ALTER TABLE tax_documents ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own tax documents" ON tax_documents;
CREATE POLICY "Users can view own tax documents"
  ON tax_documents FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can upload own tax documents" ON tax_documents;
CREATE POLICY "Users can upload own tax documents"
  ON tax_documents FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can view all tax documents" ON tax_documents;
CREATE POLICY "Admins can view all tax documents"
  ON tax_documents FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

DROP POLICY IF EXISTS "Admins can update tax documents" ON tax_documents;
CREATE POLICY "Admins can update tax documents"
  ON tax_documents FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

GRANT SELECT, INSERT ON tax_documents TO authenticated;
GRANT UPDATE ON tax_documents TO authenticated;

-- FIX 3: Create payment_records table (from earlier migration)
CREATE TABLE IF NOT EXISTS payment_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'usd',
  status TEXT DEFAULT 'pending',
  stripe_payment_intent_id TEXT,
  description TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_payment_records_user ON payment_records(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_records_status ON payment_records(status);

ALTER TABLE payment_records ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "payment_records_select_own" ON payment_records;
CREATE POLICY "payment_records_select_own" ON payment_records
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

GRANT SELECT ON payment_records TO authenticated;

-- FIX 4: Create onboarding_steps table (from earlier migration)
CREATE TABLE IF NOT EXISTS onboarding_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  step_name TEXT NOT NULL,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, step_name)
);

CREATE INDEX IF NOT EXISTS idx_onboarding_user ON onboarding_steps(user_id);

ALTER TABLE onboarding_steps ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "onboarding_select_own" ON onboarding_steps;
CREATE POLICY "onboarding_select_own" ON onboarding_steps
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "onboarding_insert_own" ON onboarding_steps;
CREATE POLICY "onboarding_insert_own" ON onboarding_steps
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "onboarding_update_own" ON onboarding_steps;
CREATE POLICY "onboarding_update_own" ON onboarding_steps
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid());

GRANT SELECT, INSERT, UPDATE ON onboarding_steps TO authenticated;

-- FIX 5: Add more course modules to intro-hvac
INSERT INTO course_modules (course_id, title, description, order_index, duration_minutes, content)
SELECT 
  id,
  'HVAC System Components',
  'Understanding the key components of HVAC systems',
  2,
  45,
  'Learn about compressors, condensers, evaporators, and expansion valves.'
FROM courses
WHERE slug = 'intro-hvac'
ON CONFLICT DO NOTHING;

INSERT INTO course_modules (course_id, title, description, order_index, duration_minutes, content)
SELECT 
  id,
  'Installation and Maintenance',
  'Best practices for HVAC installation and maintenance',
  3,
  60,
  'Proper installation techniques and preventive maintenance schedules.'
FROM courses
WHERE slug = 'intro-hvac'
ON CONFLICT DO NOTHING;

INSERT INTO course_modules (course_id, title, description, order_index, duration_minutes, content)
SELECT 
  id,
  'Troubleshooting Common Issues',
  'Diagnosing and fixing common HVAC problems',
  4,
  50,
  'Learn systematic troubleshooting approaches for HVAC systems.'
FROM courses
WHERE slug = 'intro-hvac'
ON CONFLICT DO NOTHING;

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check all document-related tables
SELECT 
  'documents' as table_name,
  COUNT(*) as record_count,
  'Main document storage' as purpose
FROM documents
UNION ALL
SELECT 
  'document_requirements',
  COUNT(*),
  'Document requirements per role'
FROM document_requirements
UNION ALL
SELECT 
  'document_signatures',
  COUNT(*),
  'Digital signature tracking'
FROM document_signatures
UNION ALL
SELECT 
  'program_holder_documents',
  COUNT(*),
  'Program holder documents'
FROM program_holder_documents
UNION ALL
SELECT 
  'tax_documents',
  COUNT(*),
  'Tax document storage'
FROM tax_documents
UNION ALL
SELECT 
  'payment_records',
  COUNT(*),
  'Payment transaction tracking'
FROM payment_records
UNION ALL
SELECT 
  'onboarding_steps',
  COUNT(*),
  'User onboarding progress'
FROM onboarding_steps
UNION ALL
SELECT 
  'messages',
  COUNT(*),
  'User messaging system'
FROM messages
UNION ALL
SELECT 
  'partner_enrollments',
  COUNT(*),
  'Partner enrollment tracking'
FROM partner_enrollments;

-- Check course modules
SELECT 
  c.title as course_title,
  COUNT(cm.id) as module_count
FROM courses c
LEFT JOIN course_modules cm ON cm.course_id = c.id
WHERE c.slug = 'intro-hvac'
GROUP BY c.id, c.title;

-- Check document requirements
SELECT 
  role,
  document_type,
  is_required,
  description
FROM document_requirements
ORDER BY role, is_required DESC, document_type;

-- Final success message
DO $$
BEGIN
  RAISE NOTICE '';
  RAISE NOTICE '✅ ============================================';
  RAISE NOTICE '✅ DOCUMENT CENTER FIX COMPLETE!';
  RAISE NOTICE '✅ ============================================';
  RAISE NOTICE '';
  RAISE NOTICE 'Tables Fixed:';
  RAISE NOTICE '  ✅ program_holder_documents (added status columns)';
  RAISE NOTICE '  ✅ tax_documents (created)';
  RAISE NOTICE '  ✅ payment_records (created)';
  RAISE NOTICE '  ✅ onboarding_steps (created)';
  RAISE NOTICE '  ✅ course_modules (added 3 modules)';
  RAISE NOTICE '';
  RAISE NOTICE 'Next Steps:';
  RAISE NOTICE '  1. Check verification queries above';
  RAISE NOTICE '  2. Update /app/admin/document-center/page.tsx';
  RAISE NOTICE '  3. Test document upload functionality';
  RAISE NOTICE '';
END $$;
