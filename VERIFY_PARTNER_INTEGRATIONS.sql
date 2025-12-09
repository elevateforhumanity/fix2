-- ============================================
-- PARTNER INTEGRATIONS VERIFICATION
-- ============================================

-- 1. Check all partner tables exist
SELECT 'Partner Tables Check' as section;
SELECT 
  table_name,
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND information_schema.tables.table_name = t.table_name)
    THEN '✅ EXISTS'
    ELSE '❌ MISSING'
  END as status
FROM (VALUES 
  ('partner_courses'),
  ('partner_enrollments'),
  ('partner_credentials'),
  ('external_course_links')
) AS t(table_name);

-- 2. Count partner courses by partner
SELECT 'Partner Courses by Partner' as section;
SELECT 
  partner_name,
  COUNT(*) as course_count,
  COUNT(DISTINCT program_id) as programs_linked
FROM partner_courses
GROUP BY partner_name
ORDER BY course_count DESC;

-- 3. Check all expected partners
SELECT 'Expected Partners Check' as section;
SELECT 
  partner,
  CASE 
    WHEN EXISTS (SELECT 1 FROM partner_courses WHERE partner_name = partner)
    THEN '✅ HAS COURSES'
    ELSE '❌ NO COURSES'
  END as status,
  (SELECT COUNT(*) FROM partner_courses WHERE partner_name = partner) as course_count
FROM (VALUES 
  ('Milady'),
  ('NRF Rise Up'),
  ('JRI'),
  ('HSI'),
  ('Certiport'),
  ('CareerSafe'),
  ('OSHA')
) AS t(partner);

-- 4. Check partner enrollments
SELECT 'Partner Enrollments Summary' as section;
SELECT 
  pc.partner_name,
  COUNT(pe.id) as enrollment_count,
  COUNT(DISTINCT pe.user_id) as unique_users
FROM partner_enrollments pe
JOIN partner_courses pc ON pe.partner_course_id = pc.id
GROUP BY pc.partner_name
ORDER BY enrollment_count DESC;

-- 5. Check partner credentials/certificates
SELECT 'Partner Credentials Summary' as section;
SELECT 
  partner_name,
  COUNT(*) as credential_count,
  COUNT(DISTINCT user_id) as unique_users
FROM partner_credentials
GROUP BY partner_name
ORDER BY credential_count DESC;

-- 6. Check external course links
SELECT 'External Course Links' as section;
SELECT 
  partner_name,
  COUNT(*) as link_count
FROM external_course_links
GROUP BY partner_name
ORDER BY link_count DESC;

-- 7. Sample partner courses
SELECT 'Sample Partner Courses' as section;
SELECT 
  id,
  title,
  partner_name,
  external_course_id,
  price,
  duration_hours,
  program_id
FROM partner_courses
ORDER BY partner_name, title
LIMIT 20;

-- 8. Check programs with partner integrations
SELECT 'Programs with Partner Content' as section;
SELECT 
  p.id,
  p.title,
  p.slug,
  COUNT(DISTINCT pc.id) as partner_courses_count,
  STRING_AGG(DISTINCT pc.partner_name, ', ') as partners
FROM programs p
LEFT JOIN partner_courses pc ON pc.program_id = p.id
GROUP BY p.id, p.title, p.slug
HAVING COUNT(DISTINCT pc.id) > 0
ORDER BY partner_courses_count DESC;

-- 9. Check partner API credentials (without exposing secrets)
SELECT 'Partner API Setup Check' as section;
SELECT 
  partner_name,
  CASE 
    WHEN api_key IS NOT NULL AND api_key != '' THEN '✅ API Key Set'
    ELSE '❌ No API Key'
  END as api_key_status,
  CASE 
    WHEN api_endpoint IS NOT NULL AND api_endpoint != '' THEN '✅ Endpoint Set'
    ELSE '❌ No Endpoint'
  END as endpoint_status,
  is_active
FROM partner_credentials
GROUP BY partner_name, api_key, api_endpoint, is_active;

-- 10. Overall partner integration health
SELECT 'Integration Health Summary' as section;
SELECT 
  (SELECT COUNT(DISTINCT partner_name) FROM partner_courses) as active_partners,
  (SELECT COUNT(*) FROM partner_courses) as total_partner_courses,
  (SELECT COUNT(*) FROM partner_enrollments) as total_enrollments,
  (SELECT COUNT(*) FROM partner_credentials WHERE is_active = true) as active_credentials,
  (SELECT COUNT(*) FROM external_course_links) as external_links;
