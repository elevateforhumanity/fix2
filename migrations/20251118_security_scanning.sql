-- Security Scanning Events
-- Migration: 20251118_security_scanning

CREATE TABLE IF NOT EXISTS security_scan_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('dependency_scan', 'container_scan', 'code_scan', 'infrastructure_scan')),
  tool text NOT NULL,
  status text NOT NULL CHECK (status IN ('passed', 'failed', 'warnings')),
  findings jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_security_scan_events_type ON security_scan_events(type);
CREATE INDEX IF NOT EXISTS idx_security_scan_events_created_at ON security_scan_events(created_at DESC);

-- Attendance Records for AI verification
CREATE TABLE IF NOT EXISTS attendance_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  meeting_id uuid REFERENCES meetings(id) ON DELETE CASCADE,
  verified boolean NOT NULL DEFAULT false,
  verification_method text,
  latitude decimal(10, 8),
  longitude decimal(11, 8),
  checked_in_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_attendance_records_user ON attendance_records(user_id);
CREATE INDEX IF NOT EXISTS idx_attendance_records_meeting ON attendance_records(meeting_id);

-- AI Job Matches
CREATE TABLE IF NOT EXISTS ai_job_matches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  resume_text text,
  recommendations text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_ai_job_matches_user ON ai_job_matches(user_id);
