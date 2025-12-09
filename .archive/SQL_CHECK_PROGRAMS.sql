-- ============================================
-- CHECK IF YOU HAVE PROGRAMS
-- ============================================
-- Copy this entire file and paste into Supabase SQL Editor
-- Click RUN to see if you have any programs

SELECT 
  id,
  title,
  category,
  created_at
FROM programs
ORDER BY category, title;

-- If this returns NO ROWS, you need to create programs first!
-- If this returns rows, you already have programs and can use their IDs
