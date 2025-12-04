-- Simple Table Creation (No RLS Policies)
-- Creates the 8 enterprise tables without complex policies

-- Video Chapters Table
CREATE TABLE IF NOT EXISTS video_chapters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id UUID NOT NULL,
  title TEXT NOT NULL,
  start_time INTEGER NOT NULL,
  end_time INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_video_chapters_video_id ON video_chapters(video_id);
CREATE INDEX IF NOT EXISTS idx_video_chapters_start_time ON video_chapters(start_time);

-- Video Transcripts Table
CREATE TABLE IF NOT EXISTS video_transcripts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id UUID NOT NULL UNIQUE,
  content TEXT NOT NULL,
  language VARCHAR(10) DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_video_transcripts_video_id ON video_transcripts(video_id);

-- Funding Applications Table
CREATE TABLE IF NOT EXISTS funding_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL,
  program_type VARCHAR(50) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  personal_info JSONB,
  employment_info JSONB,
  education_info JSONB,
  funding_info JSONB,
  documents JSONB,
  signature JSONB,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES auth.users(id),
  review_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_funding_applications_user_id ON funding_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_funding_applications_course_id ON funding_applications(course_id);
CREATE INDEX IF NOT EXISTS idx_funding_applications_status ON funding_applications(status);
CREATE INDEX IF NOT EXISTS idx_funding_applications_program_type ON funding_applications(program_type);

-- User Streaks Table
CREATE TABLE IF NOT EXISTS user_streaks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_activity_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_streaks_user_id ON user_streaks(user_id);

-- xAPI Statements Table
CREATE TABLE IF NOT EXISTS xapi_statements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor JSONB NOT NULL,
  verb JSONB NOT NULL,
  object JSONB NOT NULL,
  result JSONB,
  context JSONB,
  timestamp TIMESTAMPTZ NOT NULL,
  stored_at TIMESTAMPTZ DEFAULT NOW(),
  authority JSONB,
  version VARCHAR(10) DEFAULT '1.0.3'
);

CREATE INDEX IF NOT EXISTS idx_xapi_statements_timestamp ON xapi_statements(timestamp);
CREATE INDEX IF NOT EXISTS idx_xapi_statements_stored_at ON xapi_statements(stored_at);
CREATE INDEX IF NOT EXISTS idx_xapi_statements_actor ON xapi_statements USING GIN(actor);
CREATE INDEX IF NOT EXISTS idx_xapi_statements_verb ON xapi_statements USING GIN(verb);

-- Certificates Table
CREATE TABLE IF NOT EXISTS certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL,
  certificate_number VARCHAR(100) UNIQUE NOT NULL,
  verification_code VARCHAR(100) UNIQUE NOT NULL,
  issued_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  is_revoked BOOLEAN DEFAULT FALSE,
  revoked_at TIMESTAMPTZ,
  revoked_by UUID REFERENCES auth.users(id),
  revocation_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_certificates_user_id ON certificates(user_id);
CREATE INDEX IF NOT EXISTS idx_certificates_course_id ON certificates(course_id);
CREATE INDEX IF NOT EXISTS idx_certificates_verification_code ON certificates(verification_code);
CREATE INDEX IF NOT EXISTS idx_certificates_is_revoked ON certificates(is_revoked);

-- Program Holder Notes Table
CREATE TABLE IF NOT EXISTS program_holder_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL,
  program_holder_id UUID NOT NULL,
  status VARCHAR(50),
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_program_holder_notes_user_id ON program_holder_notes(user_id);
CREATE INDEX IF NOT EXISTS idx_program_holder_notes_course_id ON program_holder_notes(course_id);
CREATE INDEX IF NOT EXISTS idx_program_holder_notes_program_holder_id ON program_holder_notes(program_holder_id);

-- AI Generated Courses Table
CREATE TABLE IF NOT EXISTS ai_generated_courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID,
  topic TEXT NOT NULL,
  level VARCHAR(50),
  output TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ai_generated_courses_tenant_id ON ai_generated_courses(tenant_id);
CREATE INDEX IF NOT EXISTS idx_ai_generated_courses_created_at ON ai_generated_courses(created_at);

-- Update triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_video_chapters_updated_at') THEN
    CREATE TRIGGER update_video_chapters_updated_at BEFORE UPDATE ON video_chapters FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_video_transcripts_updated_at') THEN
    CREATE TRIGGER update_video_transcripts_updated_at BEFORE UPDATE ON video_transcripts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_funding_applications_updated_at') THEN
    CREATE TRIGGER update_funding_applications_updated_at BEFORE UPDATE ON funding_applications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_user_streaks_updated_at') THEN
    CREATE TRIGGER update_user_streaks_updated_at BEFORE UPDATE ON user_streaks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_certificates_updated_at') THEN
    CREATE TRIGGER update_certificates_updated_at BEFORE UPDATE ON certificates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_program_holder_notes_updated_at') THEN
    CREATE TRIGGER update_program_holder_notes_updated_at BEFORE UPDATE ON program_holder_notes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

-- Grant basic permissions
GRANT ALL ON video_chapters TO authenticated;
GRANT ALL ON video_transcripts TO authenticated;
GRANT ALL ON funding_applications TO authenticated;
GRANT ALL ON user_streaks TO authenticated;
GRANT ALL ON xapi_statements TO authenticated;
GRANT ALL ON certificates TO authenticated;
GRANT ALL ON program_holder_notes TO authenticated;
GRANT ALL ON ai_generated_courses TO authenticated;

-- Success message
SELECT 'Tables created successfully!' as message;
