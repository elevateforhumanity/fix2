-- Add access links to partner courses for link-based enrollment

-- Add access_link column to partner_courses
ALTER TABLE partner_courses 
  ADD COLUMN IF NOT EXISTS access_link TEXT;

-- Add access_link to partner_lms_enrollments for per-enrollment links
ALTER TABLE partner_lms_enrollments
  ADD COLUMN IF NOT EXISTS access_link TEXT;

-- Add index for quick lookup
CREATE INDEX IF NOT EXISTS idx_partner_courses_access_link 
  ON partner_courses(access_link) WHERE access_link IS NOT NULL;

-- Update existing partner courses with placeholder links
-- These should be replaced with actual partner LMS URLs
UPDATE partner_courses 
SET access_link = 'https://partner-lms.example.com/course/' || external_course_code
WHERE access_link IS NULL 
  AND external_course_code IS NOT NULL
  AND active = true;

-- Add comment
COMMENT ON COLUMN partner_courses.access_link IS 'Direct link to partner LMS course for learner access';
COMMENT ON COLUMN partner_lms_enrollments.access_link IS 'Per-enrollment access link (may include enrollment token)';
