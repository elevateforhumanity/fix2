-- ============================================
-- BARBER APPRENTICESHIP VERIFICATION
-- ============================================

-- 1. Check if barber program exists
SELECT 'Barber Program Check' as section;
SELECT 
  id,
  title,
  slug,
  status,
  duration_weeks,
  price,
  created_at
FROM programs
WHERE slug LIKE '%barber%' OR title ILIKE '%barber%'
ORDER BY created_at DESC;

-- 2. Check barber courses
SELECT 'Barber Courses' as section;
SELECT 
  c.id,
  c.title,
  c.program_id,
  c.status,
  c.order_index,
  p.title as program_title
FROM courses c
LEFT JOIN programs p ON c.program_id = p.id
WHERE p.slug LIKE '%barber%' OR c.title ILIKE '%barber%'
ORDER BY c.order_index;

-- 3. Check barber modules
SELECT 'Barber Modules' as section;
SELECT 
  m.id,
  m.title,
  m.course_id,
  m.order_index,
  c.title as course_title
FROM modules m
LEFT JOIN courses c ON m.course_id = c.id
LEFT JOIN programs p ON c.program_id = p.id
WHERE p.slug LIKE '%barber%'
ORDER BY c.order_index, m.order_index
LIMIT 20;

-- 4. Check barber lessons
SELECT 'Barber Lessons' as section;
SELECT 
  l.id,
  l.title,
  l.module_id,
  l.order_index,
  l.content_type,
  m.title as module_title
FROM lessons l
LEFT JOIN modules m ON l.module_id = m.id
LEFT JOIN courses c ON m.course_id = c.id
LEFT JOIN programs p ON c.program_id = p.id
WHERE p.slug LIKE '%barber%'
ORDER BY m.order_index, l.order_index
LIMIT 20;

-- 5. Count barber content
SELECT 'Barber Content Summary' as section;
SELECT 
  (SELECT COUNT(*) FROM programs WHERE slug LIKE '%barber%') as programs_count,
  (SELECT COUNT(*) FROM courses c JOIN programs p ON c.program_id = p.id WHERE p.slug LIKE '%barber%') as courses_count,
  (SELECT COUNT(*) FROM modules m JOIN courses c ON m.course_id = c.id JOIN programs p ON c.program_id = p.id WHERE p.slug LIKE '%barber%') as modules_count,
  (SELECT COUNT(*) FROM lessons l JOIN modules m ON l.module_id = m.id JOIN courses c ON m.course_id = c.id JOIN programs p ON c.program_id = p.id WHERE p.slug LIKE '%barber%') as lessons_count;

-- 6. Check barber enrollments
SELECT 'Barber Enrollments' as section;
SELECT 
  e.id,
  e.user_id,
  e.program_id,
  e.status,
  e.progress_percentage,
  e.enrolled_at,
  p.title as program_title
FROM enrollments e
JOIN programs p ON e.program_id = p.id
WHERE p.slug LIKE '%barber%'
ORDER BY e.enrolled_at DESC
LIMIT 10;

-- 7. Check barber applications
SELECT 'Barber Applications' as section;
SELECT 
  a.id,
  a.first_name,
  a.last_name,
  a.email,
  a.status,
  a.program_id,
  a.created_at,
  p.title as program_title
FROM applications a
LEFT JOIN programs p ON a.program_id = p.id
WHERE p.slug LIKE '%barber%' OR a.program_id IN (SELECT id FROM programs WHERE slug LIKE '%barber%')
ORDER BY a.created_at DESC
LIMIT 10;

-- 8. Check if barber has partner integrations
SELECT 'Barber Partner Integrations' as section;
SELECT 
  pc.id,
  pc.title,
  pc.partner_name,
  pc.external_course_id,
  pc.program_id,
  p.title as program_title
FROM partner_courses pc
LEFT JOIN programs p ON pc.program_id = p.id
WHERE p.slug LIKE '%barber%'
LIMIT 10;
