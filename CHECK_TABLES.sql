-- ============================================================================
-- CHECK EXISTING TABLE STRUCTURE
-- Run this to see what columns exist in your tables
-- ============================================================================

-- Check lessons table structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'lessons'
ORDER BY ordinal_position;

-- Check if lessons table exists
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_name = 'lessons'
) as lessons_table_exists;

-- Check modules table structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'modules'
ORDER BY ordinal_position;

-- Check programs table structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'programs'
ORDER BY ordinal_position;
