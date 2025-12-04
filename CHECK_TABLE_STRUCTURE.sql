-- ============================================
-- CHECK YOUR PROGRAMS TABLE STRUCTURE
-- ============================================
-- This shows what columns exist in your programs table

SELECT 
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'programs'
  AND table_schema = 'public'
ORDER BY ordinal_position;
