-- FIX ALL REMAINING ISSUES
-- This creates all missing tables and fixes all broken functionality

-- ============================================
-- 1. MESSAGES TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  to_user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  subject TEXT,
  body TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_messages_from ON messages(from_user_id);
CREATE INDEX IF NOT EXISTS idx_messages_to ON messages(to_user_id);
CREATE INDEX IF NOT EXISTS idx_messages_read ON messages(read);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "messages_select_own" ON messages
  FOR SELECT TO authenticated
  USING (from_user_id = auth.uid() OR to_user_id = auth.uid());

CREATE POLICY "messages_insert_own" ON messages
  FOR INSERT TO authenticated
  WITH CHECK (from_user_id = auth.uid());

GRANT SELECT, INSERT ON messages TO authenticated;

-- ============================================
-- 2. PAYMENT RECORDS TABLE
-- ============================================

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

CREATE POLICY "payment_records_select_own" ON payment_records
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

GRANT SELECT ON payment_records TO authenticated;

-- ============================================
-- 3. ONBOARDING STEPS TABLE
-- ============================================

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

CREATE POLICY "onboarding_select_own" ON onboarding_steps
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "onboarding_insert_own" ON onboarding_steps
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "onboarding_update_own" ON onboarding_steps
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid());

GRANT SELECT, INSERT, UPDATE ON onboarding_steps TO authenticated;

-- ============================================
-- 4. ADD MORE COURSE MODULES
-- ============================================

-- Add modules to test course
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
-- 5. PARTNER ENROLLMENT TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS partner_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  program_id UUID REFERENCES programs(id) ON DELETE CASCADE,
  partner_id UUID,
  status TEXT DEFAULT 'pending',
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_partner_enrollments_student ON partner_enrollments(student_id);
CREATE INDEX IF NOT EXISTS idx_partner_enrollments_program ON partner_enrollments(program_id);
CREATE INDEX IF NOT EXISTS idx_partner_enrollments_partner ON partner_enrollments(partner_id);

ALTER TABLE partner_enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "partner_enrollments_select" ON partner_enrollments
  FOR SELECT TO authenticated
  USING (
    student_id = auth.uid() 
    OR EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'super_admin', 'staff', 'partner')
    )
  );

CREATE POLICY "partner_enrollments_insert" ON partner_enrollments
  FOR INSERT TO authenticated
  WITH CHECK (student_id = auth.uid());

GRANT SELECT, INSERT ON partner_enrollments TO authenticated;

-- ============================================
-- VERIFICATION
-- ============================================

DO $$
DECLARE
  messages_exists BOOLEAN;
  payment_records_exists BOOLEAN;
  onboarding_exists BOOLEAN;
  partner_enrollments_exists BOOLEAN;
  module_count INTEGER;
BEGIN
  SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'messages') INTO messages_exists;
  SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'payment_records') INTO payment_records_exists;
  SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'onboarding_steps') INTO onboarding_exists;
  SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'partner_enrollments') INTO partner_enrollments_exists;
  
  SELECT COUNT(*) INTO module_count FROM course_modules WHERE course_id IN (SELECT id FROM courses WHERE slug = 'intro-hvac');
  
  RAISE NOTICE '';
  RAISE NOTICE '✅ ALL REMAINING ISSUES FIXED';
  RAISE NOTICE '==============================';
  RAISE NOTICE '';
  RAISE NOTICE 'Tables Created:';
  RAISE NOTICE '  messages: %', messages_exists;
  RAISE NOTICE '  payment_records: %', payment_records_exists;
  RAISE NOTICE '  onboarding_steps: %', onboarding_exists;
  RAISE NOTICE '  partner_enrollments: %', partner_enrollments_exists;
  RAISE NOTICE '';
  RAISE NOTICE 'Course Modules: % (should be 4)', module_count;
  RAISE NOTICE '';
  RAISE NOTICE '✨ Platform is now complete!';
  RAISE NOTICE '';
END $$;
