-- =====================================================
-- COPY AND PASTE THIS ENTIRE FILE INTO SUPABASE SQL EDITOR
-- =====================================================
-- This creates the certificate system for AI Instructor
-- Run this once in your Supabase project
-- =====================================================

-- Create student_certificates table
CREATE TABLE IF NOT EXISTS student_certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  certificate_type TEXT NOT NULL CHECK (certificate_type IN ('module', 'program')),
  certificate_number TEXT UNIQUE NOT NULL,
  course_name TEXT NOT NULL,
  issued_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  issuer TEXT NOT NULL,
  pdf_url TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_student_certificates_student_id ON student_certificates(student_id);
CREATE INDEX IF NOT EXISTS idx_student_certificates_number ON student_certificates(certificate_number);
CREATE INDEX IF NOT EXISTS idx_student_certificates_type ON student_certificates(certificate_type);
CREATE INDEX IF NOT EXISTS idx_student_certificates_issued_date ON student_certificates(issued_date DESC);

-- Enable Row Level Security
ALTER TABLE student_certificates ENABLE ROW LEVEL SECURITY;

-- RLS Policies
DROP POLICY IF EXISTS "Students can view their own certificates" ON student_certificates;
CREATE POLICY "Students can view their own certificates"
  ON student_certificates FOR SELECT
  USING (auth.uid() = student_id);

DROP POLICY IF EXISTS "Service role can insert certificates" ON student_certificates;
CREATE POLICY "Service role can insert certificates"
  ON student_certificates FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Service role can update certificates" ON student_certificates;
CREATE POLICY "Service role can update certificates"
  ON student_certificates FOR UPDATE
  USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public can verify certificates" ON student_certificates;
CREATE POLICY "Public can verify certificates"
  ON student_certificates FOR SELECT
  USING (true);

-- Create storage bucket for certificates
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('certificates', 'certificates', true, 5242880, ARRAY['application/pdf'])
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['application/pdf'];

-- Storage policies
DROP POLICY IF EXISTS "Anyone can view certificates" ON storage.objects;
CREATE POLICY "Anyone can view certificates"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'certificates');

DROP POLICY IF EXISTS "Service role can upload certificates" ON storage.objects;
CREATE POLICY "Service role can upload certificates"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'certificates');

DROP POLICY IF EXISTS "Service role can update certificates" ON storage.objects;
CREATE POLICY "Service role can update certificates"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'certificates') WITH CHECK (bucket_id = 'certificates');

DROP POLICY IF EXISTS "Service role can delete certificates" ON storage.objects;
CREATE POLICY "Service role can delete certificates"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'certificates');

-- Update timestamp function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for updated_at
DROP TRIGGER IF EXISTS update_student_certificates_updated_at ON student_certificates;
CREATE TRIGGER update_student_certificates_updated_at
  BEFORE UPDATE ON student_certificates
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add completed_modules to partner_course_enrollments
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'partner_course_enrollments' 
    AND column_name = 'completed_modules'
  ) THEN
    ALTER TABLE partner_course_enrollments ADD COLUMN completed_modules TEXT[] DEFAULT '{}';
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_partner_course_enrollments_completed_modules 
  ON partner_course_enrollments USING GIN(completed_modules);

-- Grant permissions
GRANT SELECT ON student_certificates TO anon, authenticated;
GRANT ALL ON student_certificates TO service_role;
GRANT SELECT ON storage.objects TO anon, authenticated;
GRANT ALL ON storage.objects TO service_role;
