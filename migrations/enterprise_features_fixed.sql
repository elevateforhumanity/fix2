-- Enterprise Features Migration (Fixed for Supabase)
-- Creates tables for: video chapters, video transcripts, funding applications
-- Run this migration to enable all enterprise features

-- Video Chapters Table
CREATE TABLE IF NOT EXISTS video_chapters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id UUID NOT NULL,
  title TEXT NOT NULL,
  start_time INTEGER NOT NULL, -- seconds
  end_time INTEGER, -- seconds
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

-- Funding Applications Table (without foreign key constraints)
CREATE TABLE IF NOT EXISTS funding_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  course_id UUID NOT NULL,
  program_type VARCHAR(50) NOT NULL, -- WIOA, WRG, JRI, OJT, WEX, APPRENTICESHIP
  status VARCHAR(50) DEFAULT 'pending', -- pending, approved, rejected, under_review
  personal_info JSONB,
  employment_info JSONB,
  education_info JSONB,
  funding_info JSONB,
  documents JSONB, -- array of document URLs
  signature JSONB, -- signature data
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID,
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
  user_id UUID NOT NULL UNIQUE,
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
  user_id UUID NOT NULL,
  course_id UUID NOT NULL,
  certificate_number VARCHAR(100) UNIQUE NOT NULL,
  verification_code VARCHAR(100) UNIQUE NOT NULL,
  issued_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  is_revoked BOOLEAN DEFAULT FALSE,
  revoked_at TIMESTAMPTZ,
  revoked_by UUID,
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
  user_id UUID NOT NULL,
  course_id UUID NOT NULL,
  program_holder_id UUID NOT NULL,
  status VARCHAR(50), -- On Track, Behind, Dropped
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

-- Update triggers for updated_at columns
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS update_video_chapters_updated_at ON video_chapters;
DROP TRIGGER IF EXISTS update_video_transcripts_updated_at ON video_transcripts;
DROP TRIGGER IF EXISTS update_funding_applications_updated_at ON funding_applications;
DROP TRIGGER IF EXISTS update_user_streaks_updated_at ON user_streaks;
DROP TRIGGER IF EXISTS update_certificates_updated_at ON certificates;
DROP TRIGGER IF EXISTS update_program_holder_notes_updated_at ON program_holder_notes;

-- Create triggers
CREATE TRIGGER update_video_chapters_updated_at
  BEFORE UPDATE ON video_chapters
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_video_transcripts_updated_at
  BEFORE UPDATE ON video_transcripts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_funding_applications_updated_at
  BEFORE UPDATE ON funding_applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_streaks_updated_at
  BEFORE UPDATE ON user_streaks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_certificates_updated_at
  BEFORE UPDATE ON certificates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_program_holder_notes_updated_at
  BEFORE UPDATE ON program_holder_notes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE video_chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_transcripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE funding_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE xapi_statements ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE program_holder_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_generated_courses ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can view video chapters" ON video_chapters;
DROP POLICY IF EXISTS "Admins can manage video chapters" ON video_chapters;
DROP POLICY IF EXISTS "Anyone can view video transcripts" ON video_transcripts;
DROP POLICY IF EXISTS "Admins can manage video transcripts" ON video_transcripts;
DROP POLICY IF EXISTS "Users can view their own applications" ON funding_applications;
DROP POLICY IF EXISTS "Users can create their own applications" ON funding_applications;
DROP POLICY IF EXISTS "Admins can view all applications" ON funding_applications;
DROP POLICY IF EXISTS "Admins can update applications" ON funding_applications;
DROP POLICY IF EXISTS "Users can view their own streaks" ON user_streaks;
DROP POLICY IF EXISTS "Users can update their own streaks" ON user_streaks;
DROP POLICY IF EXISTS "Admins can view xAPI statements" ON xapi_statements;
DROP POLICY IF EXISTS "System can insert xAPI statements" ON xapi_statements;
DROP POLICY IF EXISTS "Anyone can view non-revoked certificates" ON certificates;
DROP POLICY IF EXISTS "Admins can manage certificates" ON certificates;
DROP POLICY IF EXISTS "Program holders can view their notes" ON program_holder_notes;
DROP POLICY IF EXISTS "Program holders can create notes" ON program_holder_notes;
DROP POLICY IF EXISTS "Admins can view all notes" ON program_holder_notes;
DROP POLICY IF EXISTS "Admins can manage AI courses" ON ai_generated_courses;

-- RLS Policies for video_chapters (public read, admin write)
CREATE POLICY "Anyone can view video chapters"
  ON video_chapters FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage video chapters"
  ON video_chapters FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.user_id = auth.uid() AND user_profiles.role = 'admin'
    )
  );

-- RLS Policies for video_transcripts (public read, admin write)
CREATE POLICY "Anyone can view video transcripts"
  ON video_transcripts FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage video transcripts"
  ON video_transcripts FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.user_id = auth.uid() AND user_profiles.role = 'admin'
    )
  );

-- RLS Policies for funding_applications
CREATE POLICY "Users can view their own applications"
  ON funding_applications FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can create their own applications"
  ON funding_applications FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can view all applications"
  ON funding_applications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.user_id = auth.uid() AND user_profiles.role IN ('admin', 'delegate')
    )
  );

CREATE POLICY "Admins can update applications"
  ON funding_applications FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.user_id = auth.uid() AND user_profiles.role IN ('admin', 'delegate')
    )
  );

-- RLS Policies for user_streaks
CREATE POLICY "Users can view their own streaks"
  ON user_streaks FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can update their own streaks"
  ON user_streaks FOR ALL
  USING (user_id = auth.uid());

-- RLS Policies for xapi_statements (admin only)
CREATE POLICY "Admins can view xAPI statements"
  ON xapi_statements FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.user_id = auth.uid() AND user_profiles.role = 'admin'
    )
  );

CREATE POLICY "System can insert xAPI statements"
  ON xapi_statements FOR INSERT
  WITH CHECK (true);

-- RLS Policies for certificates
CREATE POLICY "Anyone can view non-revoked certificates"
  ON certificates FOR SELECT
  USING (is_revoked = false);

CREATE POLICY "Admins can manage certificates"
  ON certificates FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.user_id = auth.uid() AND user_profiles.role = 'admin'
    )
  );

-- RLS Policies for program_holder_notes
CREATE POLICY "Program holders can view their notes"
  ON program_holder_notes FOR SELECT
  USING (
    program_holder_id IN (
      SELECT id FROM program_holders WHERE program_holders.user_id = auth.uid()
    )
  );

CREATE POLICY "Program holders can create notes"
  ON program_holder_notes FOR INSERT
  WITH CHECK (
    program_holder_id IN (
      SELECT id FROM program_holders WHERE program_holders.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all notes"
  ON program_holder_notes FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.user_id = auth.uid() AND user_profiles.role = 'admin'
    )
  );

-- RLS Policies for ai_generated_courses
CREATE POLICY "Admins can manage AI courses"
  ON ai_generated_courses FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.user_id = auth.uid() AND user_profiles.role = 'admin'
    )
  );

-- Grant permissions
GRANT ALL ON video_chapters TO authenticated;
GRANT ALL ON video_transcripts TO authenticated;
GRANT ALL ON funding_applications TO authenticated;
GRANT ALL ON user_streaks TO authenticated;
GRANT ALL ON xapi_statements TO authenticated;
GRANT ALL ON certificates TO authenticated;
GRANT ALL ON program_holder_notes TO authenticated;
GRANT ALL ON ai_generated_courses TO authenticated;

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'Enterprise features migration completed successfully!';
  RAISE NOTICE 'Created tables: video_chapters, video_transcripts, funding_applications, user_streaks, xapi_statements, certificates, program_holder_notes, ai_generated_courses';
END $$;
