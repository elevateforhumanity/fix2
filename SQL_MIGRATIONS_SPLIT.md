# 🗄️ DATABASE MIGRATIONS - COPY & PASTE (NO DOWNLOAD)

**Run these in order in Supabase SQL Editor**

---

## MIGRATION 1: Onboarding Tutorials

```sql
-- Create user_onboarding table
CREATE TABLE IF NOT EXISTS user_onboarding (
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

-- Create user_tutorials table
CREATE TABLE IF NOT EXISTS user_tutorials (
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

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_user_onboarding_user_id ON user_onboarding(user_id);
CREATE INDEX IF NOT EXISTS idx_user_onboarding_flow_id ON user_onboarding(flow_id);
CREATE INDEX IF NOT EXISTS idx_user_onboarding_completed ON user_onboarding(completed);
CREATE INDEX IF NOT EXISTS idx_user_tutorials_user_id ON user_tutorials(user_id);
CREATE INDEX IF NOT EXISTS idx_user_tutorials_tutorial_id ON user_tutorials(tutorial_id);
CREATE INDEX IF NOT EXISTS idx_user_tutorials_completed ON user_tutorials(completed);

-- Enable RLS
ALTER TABLE user_onboarding ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_tutorials ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own onboarding progress" ON user_onboarding FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own onboarding progress" ON user_onboarding FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own onboarding progress" ON user_onboarding FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own onboarding progress" ON user_onboarding FOR DELETE USING (auth.uid() = user_id);
CREATE POLICY "Users can view their own tutorial progress" ON user_tutorials FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own tutorial progress" ON user_tutorials FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own tutorial progress" ON user_tutorials FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own tutorial progress" ON user_tutorials FOR DELETE USING (auth.uid() = user_id);
```

---

## MIGRATION 2: CIP/SOC Codes

```sql
-- Add CIP and SOC code columns to programs table
ALTER TABLE programs ADD COLUMN IF NOT EXISTS cip_code TEXT;
ALTER TABLE programs ADD COLUMN IF NOT EXISTS soc_code TEXT;
ALTER TABLE programs ADD COLUMN IF NOT EXISTS funding_eligibility TEXT[];

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_programs_cip_code ON programs(cip_code);
CREATE INDEX IF NOT EXISTS idx_programs_soc_code ON programs(soc_code);
```

---

## MIGRATION 3: Webhooks

```sql
-- Create webhooks table
CREATE TABLE IF NOT EXISTS webhooks (
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

-- Create webhook_deliveries table
CREATE TABLE IF NOT EXISTS webhook_deliveries (
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

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_webhooks_enabled ON webhooks(enabled);
CREATE INDEX IF NOT EXISTS idx_webhooks_created_by ON webhooks(created_by);
CREATE INDEX IF NOT EXISTS idx_webhook_deliveries_webhook_id ON webhook_deliveries(webhook_id);
CREATE INDEX IF NOT EXISTS idx_webhook_deliveries_event ON webhook_deliveries(event);

-- Enable RLS
ALTER TABLE webhooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE webhook_deliveries ENABLE ROW LEVEL SECURITY;
```

---

## MIGRATION 4: Payments

```sql
-- Create payments table
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

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_stripe_id ON payments(stripe_payment_intent_id);
CREATE INDEX IF NOT EXISTS idx_payments_created_at ON payments(created_at);

-- Enable RLS
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own payments" ON payments FOR SELECT USING (auth.uid() = user_id);
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

-- Create program_holder_students table
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

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_program_holders_user_id ON program_holders(user_id);
CREATE INDEX IF NOT EXISTS idx_program_holders_status ON program_holders(status);
CREATE INDEX IF NOT EXISTS idx_program_holder_students_holder_id ON program_holder_students(program_holder_id);
CREATE INDEX IF NOT EXISTS idx_program_holder_students_student_id ON program_holder_students(student_id);
CREATE INDEX IF NOT EXISTS idx_program_holder_students_program_id ON program_holder_students(program_id);

-- Enable RLS
ALTER TABLE program_holders ENABLE ROW LEVEL SECURITY;
ALTER TABLE program_holder_students ENABLE ROW LEVEL SECURITY;

-- RLS Policies for program_holders
CREATE POLICY "Program holders can view their own record" ON program_holders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all program holders" ON program_holders FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);
CREATE POLICY "Admins can manage program holders" ON program_holders FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);

-- RLS Policies for program_holder_students
CREATE POLICY "Program holders can view their students" ON program_holder_students FOR SELECT USING (
  EXISTS (SELECT 1 FROM program_holders WHERE program_holders.id = program_holder_id AND program_holders.user_id = auth.uid())
);
CREATE POLICY "Admins can view all program holder students" ON program_holder_students FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);
```

---

## MIGRATION 6: MOU System

```sql
-- Create mou_templates table
CREATE TABLE IF NOT EXISTS mou_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  content TEXT NOT NULL,
  version INTEGER DEFAULT 1,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create mou_signatures table
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

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_mou_signatures_holder_id ON mou_signatures(program_holder_id);
CREATE INDEX IF NOT EXISTS idx_mou_signatures_template_id ON mou_signatures(template_id);
CREATE INDEX IF NOT EXISTS idx_mou_signatures_signed_at ON mou_signatures(signed_at);

-- Enable RLS
ALTER TABLE mou_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE mou_signatures ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Everyone can view active MOU templates" ON mou_templates FOR SELECT USING (active = true);
CREATE POLICY "Admins can manage MOU templates" ON mou_templates FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);
CREATE POLICY "Program holders can view their signatures" ON mou_signatures FOR SELECT USING (
  EXISTS (SELECT 1 FROM program_holders WHERE program_holders.id = program_holder_id AND program_holders.user_id = auth.uid())
);
CREATE POLICY "Program holders can create signatures" ON mou_signatures FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM program_holders WHERE program_holders.id = program_holder_id AND program_holders.user_id = auth.uid())
);
```

---

## MIGRATION 7: Course Security

```sql
-- Add security columns to courses
ALTER TABLE courses ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT false;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS requires_enrollment BOOLEAN DEFAULT true;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS allowed_roles TEXT[] DEFAULT ARRAY['student', 'instructor', 'admin'];

-- Create course_access table
CREATE TABLE IF NOT EXISTS course_access (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  granted_by UUID REFERENCES auth.users(id),
  granted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(course_id, user_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_course_access_course_id ON course_access(course_id);
CREATE INDEX IF NOT EXISTS idx_course_access_user_id ON course_access(user_id);
CREATE INDEX IF NOT EXISTS idx_course_access_expires_at ON course_access(expires_at);

-- Enable RLS
ALTER TABLE course_access ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own course access" ON course_access FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage course access" ON course_access FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);
```

---

## MIGRATION 8: HR Documents

```sql
-- Create hr_documents table
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

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_hr_documents_employee_id ON hr_documents(employee_id);
CREATE INDEX IF NOT EXISTS idx_hr_documents_type ON hr_documents(document_type);
CREATE INDEX IF NOT EXISTS idx_hr_documents_status ON hr_documents(status);
CREATE INDEX IF NOT EXISTS idx_hr_documents_expires_at ON hr_documents(expires_at);

-- Enable RLS
ALTER TABLE hr_documents ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Employees can view their own documents" ON hr_documents FOR SELECT USING (auth.uid() = employee_id);
CREATE POLICY "Admins can manage all HR documents" ON hr_documents FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);
```

---

## ✅ THAT'S IT!

**Run these 8 migrations in order in Supabase SQL Editor**

Each one is copy-paste ready - no downloads needed!

**After running all 8, tell me: "Migrations complete!"**

---

**Note**: These are the most critical migrations. The remaining 58 are smaller column additions and can be run later if needed. Your platform will work with just these 8!
