-- ============================================================================
-- FIX AI INSTRUCTORS WITH PROPER AVATARS
-- ============================================================================

-- Add AI instructor avatars for all programs
-- Using professional instructor photos

UPDATE ai_instructors 
SET instructor_avatar_url = '/images/team/instructor-barber.jpg'
WHERE instructor_name LIKE '%Barber%' OR instructor_name LIKE '%Marcus%';

UPDATE ai_instructors 
SET instructor_avatar_url = '/images/team/instructor-beauty.jpg'
WHERE instructor_name LIKE '%Beauty%' OR instructor_name LIKE '%Sophia%' OR instructor_name LIKE '%Esthetician%';

UPDATE ai_instructors 
SET instructor_avatar_url = '/images/team/instructor-health.jpg'
WHERE instructor_name LIKE '%Medical%' OR instructor_name LIKE '%CNA%' OR instructor_name LIKE '%Health%' OR instructor_name LIKE '%Dr.%';

UPDATE ai_instructors 
SET instructor_avatar_url = '/images/team/instructor-tech.jpg'
WHERE instructor_name LIKE '%Tech%' OR instructor_name LIKE '%IT%' OR instructor_name LIKE '%Cyber%' OR instructor_name LIKE '%Data%';

UPDATE ai_instructors 
SET instructor_avatar_url = '/images/team/instructor-business.jpg'
WHERE instructor_name LIKE '%Business%' OR instructor_name LIKE '%Entrepreneur%' OR instructor_name LIKE '%Admin%';

UPDATE ai_instructors 
SET instructor_avatar_url = '/images/team/instructor-trades.jpg'
WHERE instructor_name LIKE '%HVAC%' OR instructor_name LIKE '%CDL%' OR instructor_name LIKE '%Mechanic%' OR instructor_name LIKE '%Forklift%';

-- If no avatar set, use default
UPDATE ai_instructors 
SET instructor_avatar_url = '/images/team/instructor-default.jpg'
WHERE instructor_avatar_url IS NULL OR instructor_avatar_url = '';

-- Verify all instructors have avatars
SELECT 
  instructor_name,
  instructor_avatar_url,
  is_active
FROM ai_instructors
ORDER BY instructor_name;
