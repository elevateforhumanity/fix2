-- ============================================
-- START HERE: Get Your Program IDs
-- ============================================
-- Copy this and paste into Supabase SQL Editor
-- Click RUN to see your program IDs

-- Option 1: Get ALL programs
SELECT 
  id,
  title,
  slug,
  category,
  wioa_approved,
  dol_registered,
  created_at
FROM programs
ORDER BY category, title;

-- Option 2: Get only WIOA-approved programs
SELECT 
  id,
  title,
  slug,
  category,
  funding_tags
FROM programs
WHERE 
  wioa_approved = true
  OR dol_registered = true
  OR funding_tags @> ARRAY['WIOA']::text[]
  OR funding_tags @> ARRAY['WRG']::text[]
ORDER BY title;

-- Option 3: Get programs by category
SELECT 
  category,
  COUNT(*) as program_count,
  STRING_AGG(title, ', ') as programs
FROM programs
GROUP BY category
ORDER BY category;

-- ============================================
-- WHAT TO DO NEXT:
-- ============================================
-- 1. If you see programs above, COPY THE IDs
-- 2. Go to SQL_COPY_PASTE.html and use those IDs
-- 3. If you see NO ROWS, you need to create programs first
--    Use SQL_COMPLETE_SETUP_WITH_PROGRAMS.sql to create sample programs
