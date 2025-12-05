-- ============================================
-- RUN THIS FIRST TO SEE WHAT COLUMNS EXIST
-- ============================================

SELECT 
  column_name, 
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'courses' 
ORDER BY ordinal_position;

-- ============================================
-- This will show you exactly what columns your
-- courses table has right now
-- ============================================
