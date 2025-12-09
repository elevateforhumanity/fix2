-- Dual Certification System:
-- 1. Elevate issues Certificates of Completion (per module)
-- 2. Credentialing Partners issue Certifications (when student passes exams)

-- Add module completion certificates (issued by Elevate)
CREATE TABLE IF NOT EXISTS module_certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id),
  module_id UUID,
  module_title TEXT NOT NULL,
  certificate_number TEXT UNIQUE NOT NULL,
  issued_by TEXT DEFAULT 'Elevate for Humanity',
  issued_at TIMESTAMPTZ DEFAULT NOW(),
  pdf_url TEXT,
  verification_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_module_certificates_user_id ON module_certificates(user_id);
CREATE INDEX IF NOT EXISTS idx_module_certificates_course_id ON module_certificates(course_id);

-- Update student_credentials to track issuer
ALTER TABLE student_credentials ADD COLUMN IF NOT EXISTS issued_by TEXT DEFAULT 'partner';
ALTER TABLE student_credentials ADD COLUMN IF NOT EXISTS issuer_type TEXT CHECK (issuer_type IN ('elevate', 'partner'));
ALTER TABLE student_credentials ADD COLUMN IF NOT EXISTS requires_exam BOOLEAN DEFAULT false;
ALTER TABLE student_credentials ADD COLUMN IF NOT EXISTS exam_passed BOOLEAN DEFAULT false;
ALTER TABLE student_credentials ADD COLUMN IF NOT EXISTS exam_score INTEGER;
ALTER TABLE student_credentials ADD COLUMN IF NOT EXISTS exam_date TIMESTAMPTZ;

-- Program completion certificates (issued by Elevate)
CREATE TABLE IF NOT EXISTS program_certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id),
  enrollment_id UUID REFERENCES enrollments(id),
  certificate_number TEXT UNIQUE NOT NULL,
  certificate_type TEXT DEFAULT 'program_completion',
  title TEXT NOT NULL,
  description TEXT,
  issued_by TEXT DEFAULT 'Elevate for Humanity',
  issued_at TIMESTAMPTZ DEFAULT NOW(),
  pdf_url TEXT,
  verification_url TEXT,
  modules_completed INTEGER DEFAULT 0,
  total_modules INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_program_certificates_user_id ON program_certificates(user_id);
CREATE INDEX IF NOT EXISTS idx_program_certificates_course_id ON program_certificates(course_id);

-- Partner certifications (issued by credentialing partners after exam)
ALTER TABLE credentials ADD COLUMN IF NOT EXISTS requires_exam BOOLEAN DEFAULT true;
ALTER TABLE credentials ADD COLUMN IF NOT EXISTS exam_provider TEXT;
ALTER TABLE credentials ADD COLUMN IF NOT EXISTS passing_score INTEGER DEFAULT 70;

-- Update existing credentials
UPDATE credentials SET 
  requires_exam = true,
  exam_provider = 'Indiana State Board',
  passing_score = 75,
  issuer_type = 'partner'
WHERE name = 'Barber License';

UPDATE credentials SET 
  requires_exam = true,
  exam_provider = 'Milady',
  passing_score = 70,
  issuer_type = 'partner'
WHERE name = 'Milady Barber Certification';

UPDATE credentials SET 
  requires_exam = true,
  exam_provider = 'EPA',
  passing_score = 70,
  issuer_type = 'partner'
WHERE name = 'EPA 608';

UPDATE credentials SET 
  requires_exam = true,
  exam_provider = 'OSHA',
  passing_score = 70,
  issuer_type = 'partner'
WHERE name = 'OSHA 10';

UPDATE credentials SET 
  requires_exam = true,
  exam_provider = 'Red Cross',
  passing_score = 80,
  issuer_type = 'partner'
WHERE name = 'CPR/AED Certification';

-- Elevate certificates don't require external exam
UPDATE credentials SET 
  requires_exam = false,
  exam_provider = NULL,
  issuer_type = 'elevate'
WHERE name IN ('Certificate of Completion', 'Rise Up Credential');

-- Function to auto-issue Elevate certificate when module completed
CREATE OR REPLACE FUNCTION issue_module_certificate()
RETURNS TRIGGER AS $$
DECLARE
  cert_number TEXT;
  module_name TEXT;
BEGIN
  -- Only issue if module is completed
  IF NEW.status = 'completed' OR NEW.completed = true THEN
    
    -- Generate certificate number
    cert_number := 'EFH-MOD-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 8);
    
    -- Get module title
    SELECT title INTO module_name FROM modules WHERE id = NEW.module_id;
    
    -- Insert certificate
    INSERT INTO module_certificates (
      user_id,
      course_id,
      module_id,
      module_title,
      certificate_number,
      issued_by,
      verification_url
    ) VALUES (
      NEW.user_id,
      (SELECT course_id FROM modules WHERE id = NEW.module_id),
      NEW.module_id,
      COALESCE(module_name, 'Module Completion'),
      cert_number,
      'Elevate for Humanity',
      'https://www.elevateforhumanity.org/verify/' || cert_number
    )
    ON CONFLICT DO NOTHING;
    
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-issue module certificates
DROP TRIGGER IF EXISTS trigger_issue_module_certificate ON lesson_progress;
CREATE TRIGGER trigger_issue_module_certificate
  AFTER UPDATE ON lesson_progress
  FOR EACH ROW
  WHEN (NEW.status = 'completed' OR NEW.completed = true)
  EXECUTE FUNCTION issue_module_certificate();

-- Function to auto-issue program certificate when all modules done
CREATE OR REPLACE FUNCTION issue_program_certificate()
RETURNS TRIGGER AS $$
DECLARE
  cert_number TEXT;
  course_title TEXT;
  total_mods INTEGER;
  completed_mods INTEGER;
BEGIN
  -- Only issue if enrollment is completed
  IF NEW.status = 'completed' OR NEW.progress = 100 THEN
    
    -- Generate certificate number
    cert_number := 'EFH-PROG-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 8);
    
    -- Get course info
    SELECT title INTO course_title FROM courses WHERE id = NEW.course_id;
    
    -- Count modules
    SELECT COUNT(*) INTO total_mods FROM modules WHERE course_id = NEW.course_id;
    SELECT COUNT(*) INTO completed_mods 
    FROM lesson_progress 
    WHERE user_id = NEW.user_id 
    AND lesson_id IN (SELECT id FROM lessons WHERE module_id IN (SELECT id FROM modules WHERE course_id = NEW.course_id))
    AND (status = 'completed' OR completed = true);
    
    -- Insert program certificate
    INSERT INTO program_certificates (
      user_id,
      course_id,
      enrollment_id,
      certificate_number,
      title,
      description,
      issued_by,
      verification_url,
      modules_completed,
      total_modules
    ) VALUES (
      NEW.user_id,
      NEW.course_id,
      NEW.id,
      cert_number,
      'Certificate of Completion - ' || course_title,
      'Successfully completed all program requirements',
      'Elevate for Humanity',
      'https://www.elevateforhumanity.org/verify/' || cert_number,
      completed_mods,
      total_mods
    )
    ON CONFLICT DO NOTHING;
    
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-issue program certificates
DROP TRIGGER IF EXISTS trigger_issue_program_certificate ON enrollments;
CREATE TRIGGER trigger_issue_program_certificate
  AFTER UPDATE ON enrollments
  FOR EACH ROW
  WHEN (NEW.status = 'completed' OR NEW.progress = 100)
  EXECUTE FUNCTION issue_program_certificate();

-- View: All certificates for a student
CREATE OR REPLACE VIEW student_all_certificates AS
SELECT 
  'module' as cert_type,
  mc.id,
  mc.user_id,
  mc.certificate_number,
  mc.module_title as title,
  mc.issued_by,
  mc.issued_at,
  mc.verification_url,
  c.title as course_title
FROM module_certificates mc
LEFT JOIN courses c ON mc.course_id = c.id

UNION ALL

SELECT 
  'program' as cert_type,
  pc.id,
  pc.user_id,
  pc.certificate_number,
  pc.title,
  pc.issued_by,
  pc.issued_at,
  pc.verification_url,
  c.title as course_title
FROM program_certificates pc
LEFT JOIN courses c ON pc.course_id = c.id

UNION ALL

SELECT 
  'credential' as cert_type,
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
