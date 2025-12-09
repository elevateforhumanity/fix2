# SQL TO RUN IN SUPABASE - COPY AND PASTE

## Instructions:
1. Go to your Supabase project
2. Click "SQL Editor" in the left sidebar
3. Click "New Query"
4. Copy each SQL block below (one at a time)
5. Paste into the SQL editor
6. Click "Run" or press Ctrl+Enter
7. Wait for "Success" message before running the next one

---

## SQL 1 OF 3: PROGRAM HOLDERS SYSTEM

**Copy this entire block:**

```sql
-- ============================================================================
-- PROGRAM HOLDERS SYSTEM
-- Tables for managing program holder organizations and their students
-- ============================================================================

-- Program holder organizations
CREATE TABLE IF NOT EXISTS program_holders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  organization_name TEXT NOT NULL,
  organization_type TEXT,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT DEFAULT 'IN',
  zip TEXT,
  status TEXT DEFAULT 'pending',
  approved_at TIMESTAMPTZ,
  approved_by UUID REFERENCES auth.users(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_program_holders_user ON program_holders(user_id);
CREATE INDEX IF NOT EXISTS idx_program_holders_status ON program_holders(status);

-- Link program holders to their students
CREATE TABLE IF NOT EXISTS program_holder_students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_holder_id UUID REFERENCES program_holders(id) ON DELETE CASCADE,
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  program_id UUID REFERENCES programs(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'active',
  completion_date TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(program_holder_id, student_id, program_id)
);

CREATE INDEX IF NOT EXISTS idx_ph_students_holder ON program_holder_students(program_holder_id);
CREATE INDEX IF NOT EXISTS idx_ph_students_student ON program_holder_students(student_id);
CREATE INDEX IF NOT EXISTS idx_ph_students_program ON program_holder_students(program_id);
CREATE INDEX IF NOT EXISTS idx_ph_students_status ON program_holder_students(status);

-- Program holder applications
CREATE TABLE IF NOT EXISTS program_holder_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  organization_name TEXT NOT NULL,
  organization_type TEXT,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT DEFAULT 'IN',
  zip TEXT,
  programs_interested TEXT[],
  estimated_students INTEGER,
  how_heard_about_us TEXT,
  additional_info TEXT,
  status TEXT DEFAULT 'pending',
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMPTZ,
  review_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ph_applications_user ON program_holder_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_ph_applications_status ON program_holder_applications(status);

-- Row Level Security Policies
ALTER TABLE program_holders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Program holders can view own record"
  ON program_holders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all program holders"
  ON program_holders FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

CREATE POLICY "Admins can insert program holders"
  ON program_holders FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

CREATE POLICY "Admins can update program holders"
  ON program_holders FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

ALTER TABLE program_holder_students ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Program holders can view their students"
  ON program_holder_students FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM program_holders
      WHERE program_holders.id = program_holder_students.program_holder_id
      AND program_holders.user_id = auth.uid()
    )
  );

CREATE POLICY "Students can view their own records"
  ON program_holder_students FOR SELECT
  USING (auth.uid() = student_id);

CREATE POLICY "Admins can view all program holder students"
  ON program_holder_students FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

CREATE POLICY "Program holders can insert their students"
  ON program_holder_students FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM program_holders
      WHERE program_holders.id = program_holder_students.program_holder_id
      AND program_holders.user_id = auth.uid()
      AND program_holders.status = 'approved'
    )
  );

CREATE POLICY "Program holders can update their students"
  ON program_holder_students FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM program_holders
      WHERE program_holders.id = program_holder_students.program_holder_id
      AND program_holders.user_id = auth.uid()
    )
  );

ALTER TABLE program_holder_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own applications"
  ON program_holder_applications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own applications"
  ON program_holder_applications FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all applications"
  ON program_holder_applications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

CREATE POLICY "Admins can update applications"
  ON program_holder_applications FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

-- Function to automatically create program holder record when application is approved
CREATE OR REPLACE FUNCTION create_program_holder_from_application()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'approved' AND OLD.status != 'approved' THEN
    INSERT INTO program_holders (
      user_id,
      organization_name,
      organization_type,
      contact_name,
      contact_email,
      contact_phone,
      address,
      city,
      state,
      zip,
      status,
      approved_at,
      approved_by
    ) VALUES (
      NEW.user_id,
      NEW.organization_name,
      NEW.organization_type,
      NEW.contact_name,
      NEW.contact_email,
      NEW.contact_phone,
      NEW.address,
      NEW.city,
      NEW.state,
      NEW.zip,
      'approved',
      NOW(),
      auth.uid()
    )
    ON CONFLICT (user_id) DO NOTHING;

    UPDATE profiles
    SET role = 'program_holder'
    WHERE id = NEW.user_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_application_approved
  AFTER UPDATE ON program_holder_applications
  FOR EACH ROW
  EXECUTE FUNCTION create_program_holder_from_application();

COMMENT ON TABLE program_holders IS 'Organizations that manage students in training programs';
COMMENT ON TABLE program_holder_students IS 'Links program holders to their enrolled students';
COMMENT ON TABLE program_holder_applications IS 'Applications from organizations to become program holders';
```

**✅ After running SQL 1, you should see "Success. No rows returned"**

---

## SQL 2 OF 3: COMPLETE HR DOCUMENTS SYSTEM

**Copy this entire block:**

```sql
-- ============================================================================
-- COMPLETE HR DOCUMENT SYSTEM
-- Student Handbooks, NDAs, Non-Competes, MOUs, Onboarding Packages
-- ============================================================================

-- Document Types Table
CREATE TABLE IF NOT EXISTS document_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  description TEXT,
  requires_signature BOOLEAN DEFAULT true,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- HR Documents
CREATE TABLE IF NOT EXISTS hr_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_type_id UUID REFERENCES document_types(id),
  title TEXT NOT NULL,
  user_type TEXT NOT NULL,
  version TEXT NOT NULL DEFAULT '1.0',
  content TEXT NOT NULL,
  pdf_url TEXT,
  is_active BOOLEAN DEFAULT true,
  requires_signature BOOLEAN DEFAULT true,
  requires_witness BOOLEAN DEFAULT false,
  expiration_days INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  approved_by UUID REFERENCES auth.users(id),
  approved_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_hr_docs_type ON hr_documents(document_type_id);
CREATE INDEX IF NOT EXISTS idx_hr_docs_user_type ON hr_documents(user_type);
CREATE INDEX IF NOT EXISTS idx_hr_docs_active ON hr_documents(is_active);

-- Document Signatures
CREATE TABLE IF NOT EXISTS document_signatures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  document_id UUID REFERENCES hr_documents(id) ON DELETE CASCADE,
  user_type TEXT NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  organization_name TEXT,
  signature_data TEXT,
  witness_name TEXT,
  witness_signature TEXT,
  ip_address TEXT,
  user_agent TEXT,
  signed_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  is_valid BOOLEAN DEFAULT true,
  revoked_at TIMESTAMPTZ,
  revoked_by UUID REFERENCES auth.users(id),
  revoke_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, document_id)
);

CREATE INDEX IF NOT EXISTS idx_doc_signatures_user ON document_signatures(user_id);
CREATE INDEX IF NOT EXISTS idx_doc_signatures_doc ON document_signatures(document_id);
CREATE INDEX IF NOT EXISTS idx_doc_signatures_valid ON document_signatures(is_valid);
CREATE INDEX IF NOT EXISTS idx_doc_signatures_expires ON document_signatures(expires_at);

-- Onboarding Packages
CREATE TABLE IF NOT EXISTS onboarding_packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  user_type TEXT NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Package Documents
CREATE TABLE IF NOT EXISTS package_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id UUID REFERENCES onboarding_packages(id) ON DELETE CASCADE,
  document_id UUID REFERENCES hr_documents(id) ON DELETE CASCADE,
  order_number INTEGER DEFAULT 0,
  is_required BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(package_id, document_id)
);

-- User Onboarding Progress
CREATE TABLE IF NOT EXISTS user_onboarding_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  package_id UUID REFERENCES onboarding_packages(id) ON DELETE CASCADE,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  is_complete BOOLEAN DEFAULT false,
  current_step INTEGER DEFAULT 0,
  total_steps INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, package_id)
);

-- Row Level Security
ALTER TABLE document_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE hr_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_signatures ENABLE ROW LEVEL SECURITY;
ALTER TABLE onboarding_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE package_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_onboarding_progress ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can view active document types"
  ON document_types FOR SELECT
  USING (is_active = true);

CREATE POLICY "Anyone can view active HR documents"
  ON hr_documents FOR SELECT
  USING (is_active = true);

CREATE POLICY "Users can view own signatures"
  ON document_signatures FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own signatures"
  ON document_signatures FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anyone can view active packages"
  ON onboarding_packages FOR SELECT
  USING (is_active = true);

CREATE POLICY "Anyone can view package documents"
  ON package_documents FOR SELECT
  USING (true);

CREATE POLICY "Users can view own progress"
  ON user_onboarding_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON user_onboarding_progress FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON user_onboarding_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Admin policies
CREATE POLICY "Admins can manage document types"
  ON document_types FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

CREATE POLICY "Admins can manage documents"
  ON hr_documents FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

CREATE POLICY "Admins can view all signatures"
  ON document_signatures FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

CREATE POLICY "Admins can manage packages"
  ON onboarding_packages FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

CREATE POLICY "Admins can manage package documents"
  ON package_documents FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

CREATE POLICY "Admins can view all progress"
  ON user_onboarding_progress FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

COMMENT ON TABLE hr_documents IS 'All HR documents including handbooks, NDAs, non-competes, MOUs, and policies';
COMMENT ON TABLE document_signatures IS 'Digital signatures for all HR documents';
COMMENT ON TABLE onboarding_packages IS 'Grouped sets of documents for complete onboarding';
COMMENT ON TABLE user_onboarding_progress IS 'Track user progress through onboarding packages';
```

**✅ After running SQL 2, you should see "Success. No rows returned"**

---

## SQL 3 OF 3: INSERT DOCUMENTS AND PACKAGES

**Copy this entire block:**

```sql
-- Insert Document Types
INSERT INTO document_types (name, category, description, requires_signature) VALUES
('Student Handbook', 'handbook', 'Complete guide for students including policies, procedures, and expectations', true),
('Staff Handbook', 'handbook', 'Employee handbook with policies, benefits, and procedures', true),
('Non-Disclosure Agreement', 'nda', 'Confidentiality agreement protecting proprietary information', true),
('Non-Compete Agreement', 'non_compete', 'Agreement restricting competitive activities', true),
('Student MOU', 'mou', 'Memorandum of Understanding for student enrollment', true),
('Program Holder MOU', 'mou', 'Partnership agreement for program holders', true),
('Staff MOU', 'mou', 'Employment agreement for staff members', true),
('Employer Partnership MOU', 'mou', 'Partnership agreement with employers', true),
('Partner Organization MOU', 'mou', 'Collaboration agreement with partner organizations', true),
('Code of Conduct', 'policy', 'Behavioral expectations and standards', true),
('Data Privacy Policy', 'policy', 'Information on data collection and usage', false),
('Equal Opportunity Policy', 'policy', 'Non-discrimination and equal opportunity statement', false),
('Safety Policy', 'policy', 'Workplace and training safety guidelines', true),
('Onboarding Checklist', 'onboarding', 'Step-by-step onboarding tasks', false)
ON CONFLICT (name) DO NOTHING;

-- Create Onboarding Packages
INSERT INTO onboarding_packages (name, user_type, description, is_active) VALUES
('Student Complete Onboarding', 'student', 'Complete onboarding package for new students including handbook, MOU, and policies', true),
('Staff Complete Onboarding', 'staff', 'Complete HR onboarding for new employees including handbook, NDA, non-compete, and policies', true),
('Program Holder Onboarding', 'program_holder', 'Partnership onboarding for program holders including MOU and policies', true),
('Employer Partnership Package', 'employer', 'Onboarding documents for employer partners', true),
('Partner Organization Package', 'partner', 'Onboarding documents for partner organizations', true)
ON CONFLICT DO NOTHING;
```

**✅ After running SQL 3, you should see "Success. 14 rows affected" (or similar)**

---

## VERIFICATION

After running all 3 SQL blocks, verify the tables were created:

**Run this query to check:**

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN (
  'program_holders',
  'program_holder_students',
  'program_holder_applications',
  'document_types',
  'hr_documents',
  'document_signatures',
  'onboarding_packages',
  'package_documents',
  'user_onboarding_progress'
)
ORDER BY table_name;
```

**You should see 9 tables listed.**

---

## TROUBLESHOOTING

### If you get "relation already exists" errors:
This means the tables are already created. You can skip that SQL block.

### If you get "permission denied" errors:
Make sure you're running the SQL as the database owner or have admin privileges.

### If you get "foreign key constraint" errors:
Make sure you run the SQL blocks in order (1, 2, 3).

---

## NEXT STEPS

After running all SQL:
1. Go to your Supabase dashboard
2. Click "Table Editor"
3. You should see all 9 new tables
4. Check `document_types` table - should have 14 rows
5. Check `onboarding_packages` table - should have 5 rows

**Your database is now ready for the complete HR and onboarding system!**
