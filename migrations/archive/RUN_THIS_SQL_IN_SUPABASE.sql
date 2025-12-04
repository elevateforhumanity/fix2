-- ============================================================================
-- COPY AND PASTE THIS INTO SUPABASE SQL EDITOR
-- Go to: https://supabase.com/dashboard → Your Project → SQL Editor → New Query
-- ============================================================================

-- Drop existing applications table if it exists (to start fresh)
DROP TABLE IF EXISTS applications CASCADE;

-- Create simple applications table for website form submissions
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  program_interest TEXT,
  referral_source TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX idx_applications_email ON applications(email);
CREATE INDEX idx_applications_created_at ON applications(created_at DESC);
CREATE INDEX idx_applications_status ON applications(status);

-- Enable RLS
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public (anon) to insert applications
CREATE POLICY "Allow public to submit applications"
  ON applications
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Allow authenticated users to view their own applications
CREATE POLICY "Users can view their own applications"
  ON applications
  FOR SELECT
  TO authenticated
  USING (email = auth.jwt()->>'email');

-- Policy: Allow service role full access
CREATE POLICY "Service role has full access"
  ON applications
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Add comment
COMMENT ON TABLE applications IS 'Simple application form submissions from website';

-- Test insert to verify it works
INSERT INTO applications (full_name, email, phone, program_interest, referral_source)
VALUES ('Test User', 'test@example.com', '555-1234', 'CNA Training', 'Website');

-- Verify the insert worked
SELECT * FROM applications;
