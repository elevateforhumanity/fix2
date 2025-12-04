-- Minimal Table Creation
-- Creates tables one at a time with no dependencies

-- Video Chapters Table
DROP TABLE IF EXISTS video_chapters CASCADE;
CREATE TABLE video_chapters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id UUID NOT NULL,
  title TEXT NOT NULL,
  start_time INTEGER NOT NULL,
  end_time INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Video Transcripts Table
DROP TABLE IF EXISTS video_transcripts CASCADE;
CREATE TABLE video_transcripts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id UUID NOT NULL UNIQUE,
  content TEXT NOT NULL,
  language VARCHAR(10) DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Funding Applications Table
DROP TABLE IF EXISTS funding_applications CASCADE;
CREATE TABLE funding_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
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
  reviewed_by UUID,
  review_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Streaks Table
DROP TABLE IF EXISTS user_streaks CASCADE;
CREATE TABLE user_streaks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_activity_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- xAPI Statements Table
DROP TABLE IF EXISTS xapi_statements CASCADE;
CREATE TABLE xapi_statements (
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

-- Certificates Table
DROP TABLE IF EXISTS certificates CASCADE;
CREATE TABLE certificates (
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

-- Program Holder Notes Table
DROP TABLE IF EXISTS program_holder_notes CASCADE;
CREATE TABLE program_holder_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  course_id UUID NOT NULL,
  program_holder_id UUID NOT NULL,
  status VARCHAR(50),
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI Generated Courses Table
DROP TABLE IF EXISTS ai_generated_courses CASCADE;
CREATE TABLE ai_generated_courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID,
  topic TEXT NOT NULL,
  level VARCHAR(50),
  output TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

SELECT 'All 8 tables created successfully!' as message;
