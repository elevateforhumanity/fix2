-- Simple Certification System:
-- 1. Elevate issues ONE Certificate of Completion per course (at end)
-- 2. Partners issue Certifications when their course/module is completed

-- Elevate certificates (one per completed course)
CREATE TABLE IF NOT EXISTS elevate_certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id),
  enrollment_id UUID REFERENCES enrollments(id),
  certificate_number TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  issued_at TIMESTAMPTZ DEFAULT NOW(),
  pdf_url TEXT,
  verification_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_elevate_certificates_user_id ON elevate_certificates(user_id);
CREATE INDEX IF NOT EXISTS idx_elevate_certificates_course_id ON elevate_certificates(course_id);

-- Partner certifications (issued when partner course completed)
ALTER TABLE student_credentials ADD COLUMN IF NOT EXISTS issued_by_partner BOOLEAN DEFAULT true;
ALTER TABLE student_credentials ADD COLUMN IF NOT EXISTS partner_course_id UUID;
ALTER TABLE student_credentials ADD COLUMN IF NOT EXISTS requires_exam BOOLEAN DEFAULT true;
ALTER TABLE student_credentials ADD COLUMN IF NOT EXISTS exam_passed BOOLEAN DEFAULT false;
ALTER TABLE student_credentials ADD COLUMN IF NOT EXISTS exam_score INTEGER;

-- Track which courses are partner courses
ALTER TABLE courses ADD COLUMN IF NOT EXISTS is_partner_course BOOLEAN DEFAULT false;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS partner_id UUID REFERENCES credentialing_partners(id);
ALTER TABLE courses ADD COLUMN IF NOT EXISTS issues_partner_certification BOOLEAN DEFAULT false;

-- Mark partner courses
UPDATE courses SET 
  is_partner_course = true,
  partner_id = (SELECT id FROM credentialing_partners WHERE name = 'Milady'),
  issues_partner_certification = true
WHERE title ILIKE '%milady%' OR slug ILIKE '%milady%';

UPDATE courses SET 
  is_partner_course = true,
  partner_id = (SELECT id FROM credentialing_partners WHERE name = 'Red Cross'),
  issues_partner_certification = true
WHERE title ILIKE '%cpr%' OR title ILIKE '%first aid%';

UPDATE courses SET 
  is_partner_course = true,
  partner_id = (SELECT id FROM credentialing_partners WHERE name = 'OSHA'),
  issues_partner_certification = true
WHERE title ILIKE '%osha%';

UPDATE courses SET 
  is_partner_course = true,
  partner_id = (SELECT id FROM credentialing_partners WHERE name = 'EPA'),
  issues_partner_certification = true
WHERE title ILIKE '%epa%' OR title ILIKE '%hvac%';

-- Function: Auto-issue Elevate certificate when course completed
CREATE OR REPLACE FUNCTION issue_elevate_certificate()
RETURNS TRIGGER AS $$
DECLARE
  cert_number TEXT;
  course_title TEXT;
BEGIN
  -- Only when enrollment is completed
  IF NEW.status = 'completed' OR NEW.progress = 100 THEN
    
    -- Generate certificate number
    cert_number := 'EFH-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 8));
    
    -- Get course title
    SELECT title INTO course_title FROM courses WHERE id = NEW.course_id;
    
    -- Insert Elevate certificate
    INSERT INTO elevate_certificates (
      user_id,
      course_id,
      enrollment_id,
      certificate_number,
      title,
      verification_url
    ) VALUES (
      NEW.user_id,
      NEW.course_id,
      NEW.id,
      cert_number,
      'Certificate of Completion - ' || course_title,
      'https://www.elevateforhumanity.org/verify/' || cert_number
    )
    ON CONFLICT (certificate_number) DO NOTHING;
    
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: Auto-issue Elevate certificate
DROP TRIGGER IF EXISTS trigger_issue_elevate_certificate ON enrollments;
CREATE TRIGGER trigger_issue_elevate_certificate
  AFTER UPDATE ON enrollments
  FOR EACH ROW
  WHEN (NEW.status = 'completed' OR NEW.progress = 100)
  EXECUTE FUNCTION issue_elevate_certificate();

-- Function: Auto-issue Partner certification when partner course completed
CREATE OR REPLACE FUNCTION issue_partner_certification()
RETURNS TRIGGER AS $$
DECLARE
  cert_number TEXT;
  partner_name TEXT;
  credential_name TEXT;
  cred_id UUID;
  partner_id_val UUID;
BEGIN
  -- Only when enrollment is completed AND it's a partner course
  IF (NEW.status = 'completed' OR NEW.progress = 100) THEN
    
    -- Check if this is a partner course
    SELECT is_partner_course, partner_id, issues_partner_certification
    INTO NEW.is_partner_course, partner_id_val, NEW.issues_partner_certification
    FROM courses 
    WHERE id = NEW.course_id;
    
    IF NEW.issues_partner_certification = true THEN
      
      -- Get partner name
      SELECT name INTO partner_name FROM credentialing_partners WHERE id = partner_id_val;
      
      -- Get credential for this partner
      SELECT id, name INTO cred_id, credential_name 
      FROM credentials 
      WHERE partner_id = partner_id_val 
      LIMIT 1;
      
      IF cred_id IS NOT NULL THEN
        -- Generate certificate number
        cert_number := UPPER(SUBSTRING(partner_name FROM 1 FOR 3)) || '-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 6));
        
        -- Insert partner certification
        INSERT INTO student_credentials (
          user_id,
          credential_id,
          course_id,
          enrollment_id,
          credential_number,
          issued_date,
          verification_url,
          status,
          issued_by_partner
        ) VALUES (
          NEW.user_id,
          cred_id,
          NEW.course_id,
          NEW.id,
          cert_number,
          NOW(),
          'https://www.elevateforhumanity.org/verify/' || cert_number,
          'active',
          true
        )
        ON CONFLICT DO NOTHING;
        
      END IF;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: Auto-issue Partner certification
DROP TRIGGER IF EXISTS trigger_issue_partner_certification ON enrollments;
CREATE TRIGGER trigger_issue_partner_certification
  AFTER UPDATE ON enrollments
  FOR EACH ROW
  WHEN (NEW.status = 'completed' OR NEW.progress = 100)
  EXECUTE FUNCTION issue_partner_certification();

-- View: All certificates for dashboard
CREATE OR REPLACE VIEW student_certificates_view AS
SELECT 
  'elevate' as issuer_type,
  ec.id,
  ec.user_id,
  ec.certificate_number,
  ec.title,
  'Elevate for Humanity' as issued_by,
  ec.issued_at,
  ec.verification_url,
  c.title as course_title
FROM elevate_certificates ec
LEFT JOIN courses c ON ec.course_id = c.id

UNION ALL

SELECT 
  'partner' as issuer_type,
  sc.id,
  sc.user_id,
  sc.credential_number as certificate_number,
  cr.name as title,
  cp.name as issued_by,
  sc.issued_date as issued_at,
  sc.verification_url,
  c.title as course_title
FROM student_credentials sc
LEFT JOIN credentials cr ON sc.credential_id = cr.id
LEFT JOIN credentialing_partners cp ON cr.partner_id = cp.id
LEFT JOIN courses c ON sc.course_id = c.id

ORDER BY issued_at DESC;
