-- AI-Powered Features Tables
-- Migration: 20251118_ai_features

-- AI Generated Courses
CREATE TABLE IF NOT EXISTS ai_generated_courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid REFERENCES tenants(id) ON DELETE CASCADE,
  topic text NOT NULL,
  level text,
  output text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_ai_generated_courses_tenant ON ai_generated_courses(tenant_id);

-- Question Banks for Advanced Assessments
CREATE TABLE IF NOT EXISTS question_banks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_question_banks_course ON question_banks(course_id);

-- Questions
CREATE TABLE IF NOT EXISTS questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bank_id uuid REFERENCES question_banks(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('mcq', 'text', 'scenario', 'hotspot', 'adaptive')),
  difficulty text CHECK (difficulty IN ('easy', 'medium', 'hard')),
  body text NOT NULL,
  options jsonb,
  answer jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_questions_bank ON questions(bank_id);
CREATE INDEX IF NOT EXISTS idx_questions_difficulty ON questions(difficulty);

-- Marketplace Courses
CREATE TABLE IF NOT EXISTS marketplace_courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title text NOT NULL,
  summary text,
  price_cents integer NOT NULL DEFAULT 0,
  currency text NOT NULL DEFAULT 'usd',
  is_published boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_marketplace_courses_published ON marketplace_courses(is_published);
CREATE INDEX IF NOT EXISTS idx_marketplace_courses_tenant ON marketplace_courses(source_tenant_id);

-- Meetings (Zoom/Teams)
CREATE TABLE IF NOT EXISTS meetings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  provider text NOT NULL CHECK (provider IN ('zoom', 'teams')),
  topic text NOT NULL,
  join_url text NOT NULL,
  start_time timestamptz NOT NULL,
  duration_minutes integer DEFAULT 60,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_meetings_course ON meetings(course_id);
CREATE INDEX IF NOT EXISTS idx_meetings_start_time ON meetings(start_time);

-- Time Entries for Payroll
CREATE TABLE IF NOT EXISTS time_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  worked_at date NOT NULL,
  hours decimal(5,2) NOT NULL,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_time_entries_user ON time_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_time_entries_worked_at ON time_entries(worked_at);
