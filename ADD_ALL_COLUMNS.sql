-- ============================================
-- ADD ALL MISSING COLUMNS TO COURSES TABLE
-- ============================================

-- Add moderation_status
ALTER TABLE courses 
  ADD COLUMN IF NOT EXISTS moderation_status TEXT DEFAULT 'approved' 
  CHECK (moderation_status IN ('pending', 'approved', 'rejected', 'flagged', 'removed'));

-- Add duration_weeks
ALTER TABLE courses 
  ADD COLUMN IF NOT EXISTS duration_weeks INTEGER;

-- Add thumbnail_url
ALTER TABLE courses 
  ADD COLUMN IF NOT EXISTS thumbnail_url TEXT;

-- Add category
ALTER TABLE courses 
  ADD COLUMN IF NOT EXISTS category TEXT;

-- Add duration_hours
ALTER TABLE courses 
  ADD COLUMN IF NOT EXISTS duration_hours INTEGER;

-- Add level
ALTER TABLE courses 
  ADD COLUMN IF NOT EXISTS level TEXT 
  CHECK (level IN ('beginner', 'intermediate', 'advanced', 'all'));

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_courses_moderation_status ON courses (moderation_status);
CREATE INDEX IF NOT EXISTS idx_courses_category ON courses (category);
CREATE INDEX IF NOT EXISTS idx_courses_level ON courses (level);

-- ============================================
-- Verify columns were added
-- ============================================
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'courses' 
ORDER BY ordinal_position;
