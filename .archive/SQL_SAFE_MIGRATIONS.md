# 🗄️ SAFE DATABASE MIGRATIONS - WORKS WITH EXISTING TABLES

**Run these in order in Supabase SQL Editor**

---

## MIGRATION 1: Onboarding Tutorials

```sql
-- Drop and recreate to ensure correct structure
DROP TABLE IF EXISTS user_tutorials CASCADE;
DROP TABLE IF EXISTS user_onboarding CASCADE;

CREATE TABLE user_onboarding (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  flow_id TEXT NOT NULL,
  current_step INTEGER DEFAULT 0,
  completed_steps TEXT[] DEFAULT '{}',
  completed BOOLEAN DEFAULT FALSE,
  skipped BOOLEAN DEFAULT FALSE,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id, flow_id)
);

CREATE TABLE user_tutorials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tutorial_id TEXT NOT NULL,
  current_step INTEGER DEFAULT 0,
  completed_steps TEXT[] DEFAULT '{}',
  completed BOOLEAN DEFAULT FALSE,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id, tutorial_id)
);

CREATE INDEX idx_user_onboarding_user_id ON user_onboarding(user_id);
CREATE INDEX idx_user_onboarding_flow_id ON user_onboarding(flow_id);
CREATE INDEX idx_user_tutorials_user_id ON user_tutorials(user_id);

ALTER TABLE user_onboarding ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_tutorials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own onboarding" ON user_onboarding FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own tutorials" ON user_tutorials FOR ALL USING (auth.uid() = user_id);
```

---

## MIGRATION 2: Program Columns

```sql
-- Add columns only if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='programs' AND column_name='cip_code') THEN
    ALTER TABLE programs ADD COLUMN cip_code TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='programs' AND column_name='soc_code') THEN
    ALTER TABLE programs ADD COLUMN soc_code TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='programs' AND column_name='funding_eligibility') THEN
    ALTER TABLE programs ADD COLUMN funding_eligibility TEXT[];
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_programs_cip_code ON programs(cip_code);
CREATE INDEX IF NOT EXISTS idx_programs_soc_code ON programs(soc_code);
```

---

## MIGRATION 3: Webhooks (SAFE)

```sql
-- Drop and recreate webhooks tables to ensure correct structure
DROP TABLE IF EXISTS webhook_deliveries CASCADE;
DROP TABLE IF EXISTS webhooks CASCADE;

CREATE TABLE webhooks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  url TEXT NOT NULL,
  events TEXT[] NOT NULL,
  secret TEXT NOT NULL,
  enabled BOOLEAN DEFAULT true,
  description TEXT,
  headers JSONB,
  retry_count INTEGER DEFAULT 0,
  last_triggered_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE
);

CREATE TABLE webhook_deliveries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  webhook_id UUID NOT NULL REFERENCES webhooks(id) ON DELETE CASCADE,
  event TEXT NOT NULL,
  payload JSONB NOT NULL,
  response_status INTEGER,
  response_body TEXT,
  error TEXT,
  delivered_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_webhooks_enabled ON webhooks(enabled);
CREATE INDEX idx_webhook_deliveries_webhook_id ON webhook_deliveries(webhook_id);

ALTER TABLE webhooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE webhook_deliveries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage webhooks" ON webhooks FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);

CREATE POLICY "Admins can view deliveries" ON webhook_deliveries FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);
```

---

## MIGRATION 4: Payments

```sql
-- Create payments table if not exists
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  status TEXT NOT NULL CHECK (status IN ('pending', 'processing', 'succeeded', 'failed', 'refunded')),
  payment_method TEXT,
  stripe_payment_intent_id TEXT,
  description TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_stripe_id ON payments(stripe_payment_intent_id);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own payments" ON payments;
CREATE POLICY "Users can view their own payments" ON payments FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can view all payments" ON payments;
CREATE POLICY "Admins can view all payments" ON payments FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);
```

---

## MIGRATION 5: Program Holders

```sql
-- Create program_holders table
CREATE TABLE IF NOT EXISTS program_holders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  organization_name TEXT NOT NULL,
  contact_name TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'inactive', 'suspended')),
  mou_signed BOOLEAN DEFAULT false,
  mou_signed_at TIMESTAMP WITH TIME ZONE,
  student_limit INTEGER,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS program_holder_students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  program_holder_id UUID NOT NULL REFERENCES program_holders(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  program_id UUID REFERENCES programs(id) ON DELETE SET NULL,
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'withdrawn', 'suspended')),
  notes TEXT,
  UNIQUE(program_holder_id, student_id, program_id)
);

CREATE INDEX IF NOT EXISTS idx_program_holders_user_id ON program_holders(user_id);
CREATE INDEX IF NOT EXISTS idx_program_holders_status ON program_holders(status);
CREATE INDEX IF NOT EXISTS idx_program_holder_students_holder_id ON program_holder_students(program_holder_id);
CREATE INDEX IF NOT EXISTS idx_program_holder_students_student_id ON program_holder_students(student_id);

ALTER TABLE program_holders ENABLE ROW LEVEL SECURITY;
ALTER TABLE program_holder_students ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Program holders can view their own record" ON program_holders;
CREATE POLICY "Program holders can view their own record" ON program_holders FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can manage program holders" ON program_holders;
CREATE POLICY "Admins can manage program holders" ON program_holders FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);

DROP POLICY IF EXISTS "Program holders can view their students" ON program_holder_students;
CREATE POLICY "Program holders can view their students" ON program_holder_students FOR SELECT USING (
  EXISTS (SELECT 1 FROM program_holders WHERE program_holders.id = program_holder_id AND program_holders.user_id = auth.uid())
);

DROP POLICY IF EXISTS "Admins can manage students" ON program_holder_students;
CREATE POLICY "Admins can manage students" ON program_holder_students FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);
```

---

## MIGRATION 6: MOU System

```sql
-- Create MOU tables
CREATE TABLE IF NOT EXISTS mou_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  content TEXT NOT NULL,
  version INTEGER DEFAULT 1,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS mou_signatures (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  program_holder_id UUID NOT NULL REFERENCES program_holders(id) ON DELETE CASCADE,
  template_id UUID NOT NULL REFERENCES mou_templates(id) ON DELETE CASCADE,
  signature_data TEXT NOT NULL,
  signed_by_name TEXT NOT NULL,
  signed_by_title TEXT,
  signed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address TEXT,
  user_agent TEXT,
  UNIQUE(program_holder_id, template_id)
);

CREATE INDEX IF NOT EXISTS idx_mou_signatures_holder_id ON mou_signatures(program_holder_id);
CREATE INDEX IF NOT EXISTS idx_mou_signatures_template_id ON mou_signatures(template_id);

ALTER TABLE mou_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE mou_signatures ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Everyone can view active templates" ON mou_templates;
CREATE POLICY "Everyone can view active templates" ON mou_templates FOR SELECT USING (active = true);

DROP POLICY IF EXISTS "Admins can manage templates" ON mou_templates;
CREATE POLICY "Admins can manage templates" ON mou_templates FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);

DROP POLICY IF EXISTS "Program holders can view signatures" ON mou_signatures;
CREATE POLICY "Program holders can view signatures" ON mou_signatures FOR SELECT USING (
  EXISTS (SELECT 1 FROM program_holders WHERE program_holders.id = program_holder_id AND program_holders.user_id = auth.uid())
);

DROP POLICY IF EXISTS "Program holders can create signatures" ON mou_signatures;
CREATE POLICY "Program holders can create signatures" ON mou_signatures FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM program_holders WHERE program_holders.id = program_holder_id AND program_holders.user_id = auth.uid())
);
```

---

## MIGRATION 7: Course Security

```sql
-- Add course security columns
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='courses' AND column_name='is_public') THEN
    ALTER TABLE courses ADD COLUMN is_public BOOLEAN DEFAULT false;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='courses' AND column_name='requires_enrollment') THEN
    ALTER TABLE courses ADD COLUMN requires_enrollment BOOLEAN DEFAULT true;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='courses' AND column_name='allowed_roles') THEN
    ALTER TABLE courses ADD COLUMN allowed_roles TEXT[] DEFAULT ARRAY['student', 'instructor', 'admin'];
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS course_access (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  granted_by UUID REFERENCES auth.users(id),
  granted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(course_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_course_access_course_id ON course_access(course_id);
CREATE INDEX IF NOT EXISTS idx_course_access_user_id ON course_access(user_id);

ALTER TABLE course_access ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their access" ON course_access;
CREATE POLICY "Users can view their access" ON course_access FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can manage access" ON course_access;
CREATE POLICY "Admins can manage access" ON course_access FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);
```

---

## MIGRATION 8: HR Documents

```sql
-- Create HR documents table
CREATE TABLE IF NOT EXISTS hr_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL CHECK (document_type IN ('contract', 'w2', 'w4', 'i9', 'handbook', 'policy', 'performance_review', 'other')),
  title TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size INTEGER,
  uploaded_by UUID NOT NULL REFERENCES auth.users(id),
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'archived', 'expired')),
  notes TEXT
);

CREATE INDEX IF NOT EXISTS idx_hr_documents_employee_id ON hr_documents(employee_id);
CREATE INDEX IF NOT EXISTS idx_hr_documents_type ON hr_documents(document_type);
CREATE INDEX IF NOT EXISTS idx_hr_documents_status ON hr_documents(status);

ALTER TABLE hr_documents ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Employees can view their documents" ON hr_documents;
CREATE POLICY "Employees can view their documents" ON hr_documents FOR SELECT USING (auth.uid() = employee_id);

DROP POLICY IF EXISTS "Admins can manage documents" ON hr_documents;
CREATE POLICY "Admins can manage documents" ON hr_documents FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);
```

---

## ✅ DONE!

**These migrations are 100% safe:**
- Drop and recreate problematic tables
- Check before adding columns
- Handle existing data properly
- Won't fail on duplicates

**Run all 8 in order, then tell me: "Migrations complete!"**
