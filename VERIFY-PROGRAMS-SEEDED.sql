-- ============================================
-- VERIFY PROGRAMS SEEDED
-- Run this AFTER running COPY-PASTE-PROGRAMS.sql
-- ============================================

-- 1. Count total programs
SELECT 
  COUNT(*) as total_programs,
  CASE 
    WHEN COUNT(*) >= 30 THEN '✅ Programs seeded successfully!'
    WHEN COUNT(*) > 0 THEN '⚠️ Some programs seeded, but expected 30+'
    ELSE '❌ No programs found - run COPY-PASTE-PROGRAMS.sql'
  END as status
FROM programs;

-- 2. List first 10 programs
SELECT 
  id,
  name as title,
  slug,
  category,
  duration_weeks,
  CASE 
    WHEN wioa_approved THEN '✅ WIOA'
    ELSE '❌ Not WIOA'
  END as wioa_status
FROM programs 
ORDER BY category, name
LIMIT 10;

-- 3. Count by category
SELECT 
  category,
  COUNT(*) as program_count,
  STRING_AGG(name, ', ' ORDER BY name) as programs
FROM programs
GROUP BY category
ORDER BY program_count DESC;

-- 4. Check for required fields
SELECT 
  COUNT(*) as programs_with_complete_data,
  CASE 
    WHEN COUNT(*) = (SELECT COUNT(*) FROM programs)
    THEN '✅ All programs have complete data'
    ELSE '⚠️ Some programs missing data'
  END as data_quality
FROM programs
WHERE 
  name IS NOT NULL 
  AND slug IS NOT NULL 
  AND description IS NOT NULL
  AND category IS NOT NULL;

-- 5. List all program slugs (for URL testing)
SELECT 
  slug,
  name,
  '/programs/' || slug as url_path
FROM programs
ORDER BY category, name;

-- 6. Check WIOA-approved programs
SELECT 
  COUNT(*) as wioa_programs,
  ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM programs), 1) as wioa_percentage
FROM programs
WHERE wioa_approved = true;

-- 7. Summary
SELECT 
  (SELECT COUNT(*) FROM programs) as total_programs,
  (SELECT COUNT(DISTINCT category) FROM programs) as total_categories,
  (SELECT COUNT(*) FROM programs WHERE wioa_approved = true) as wioa_approved,
  (SELECT COUNT(*) FROM programs WHERE featured = true) as featured_programs,
  CASE 
    WHEN (SELECT COUNT(*) FROM programs) >= 30
    THEN '✅ Database ready for production!'
    ELSE '⚠️ Need to seed more programs'
  END as overall_status;
