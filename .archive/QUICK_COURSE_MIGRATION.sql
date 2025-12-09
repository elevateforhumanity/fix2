-- =============================================
-- QUICK COURSE MIGRATION
-- Run this in Supabase SQL Editor after running 001_initial_schema.sql
-- =============================================

-- Step 1: Create all 12 programs
INSERT INTO public.programs (slug, name, description, category, duration_weeks, is_active)
VALUES 
  ('medical-assistant', 'Medical Assistant', 'Clinical and administrative training for healthcare careers. Prepare for entry-level MA roles in clinics, hospitals, and specialty practices.', 'Healthcare', 20, true),
  ('cna', 'Certified Nursing Assistant', 'Patient care fundamentals and state certification prep. Work in long-term care, rehab, and hospital settings.', 'Healthcare', 6, true),
  ('home-health-aide', 'Home Health Aide', 'In-home patient care training. Learn to support patients in their homes with daily living activities.', 'Healthcare', 8, true),
  ('cpr-first-aid', 'CPR/AED/First Aid', 'Emergency response certification. Essential skills for healthcare and public safety roles.', 'Healthcare', 1, true),
  ('emergency-health', 'Emergency Health Safety Technician', 'Emergency medical response training. Prepare for first responder and safety roles.', 'Healthcare', 12, true),
  ('barber-apprenticeship', 'Barber Apprenticeship', 'State-approved barber training program. Earn hours in real shops while building your career.', 'Skilled Trades', 52, true),
  ('beauty-educator', 'Beauty Career Educator', 'Cosmetology instruction certification. Train to become a beauty school instructor.', 'Skilled Trades', 24, true),
  ('esthetician', 'Esthetician Client Services', 'Skincare and beauty services training. Learn facial treatments, waxing, and client care.', 'Skilled Trades', 16, true),
  ('hvac-tech', 'HVAC Technician', 'Heating, cooling, and refrigeration systems training. High-demand skilled trade career.', 'Skilled Trades', 16, true),
  ('business-startup', 'Business Startup & Marketing', 'Entrepreneurship and marketing fundamentals. Start and grow your own business.', 'Business', 12, true),
  ('tax-prep', 'Tax Preparation & Financial Services', 'Tax preparation and financial services training. Become a certified tax preparer.', 'Business', 10, true),
  ('public-safety', 'Public Safety Reentry Specialist', 'Reentry support and case management. Help justice-impacted individuals succeed.', 'Workforce Readiness', 16, true)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  duration_weeks = EXCLUDED.duration_weeks,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- Step 2: Create one course per program
INSERT INTO public.courses (program_id, title, description, duration_hours, is_published)
SELECT 
  id,
  name || ' - Complete Training Program',
  'Full training program for ' || name || '. ' || description,
  duration_weeks * 20,
  true
FROM public.programs
ON CONFLICT DO NOTHING;

-- Step 3: Create Module 1 for each course
INSERT INTO public.lessons (course_id, title, content, video_url, order_index, duration_minutes, is_published)
SELECT 
  c.id,
  'Module 1: Introduction & Program Overview',
  'Welcome to the ' || p.name || ' program. In this introductory module, you will learn about the course structure, expectations, career opportunities, and what to expect throughout your training journey.',
  CASE 
    WHEN p.slug = 'medical-assistant' THEN '/videos/courses/medical-assistant-10002419.mp4'
    WHEN p.slug = 'cna' THEN '/videos/courses/home-health-aide-10002413.mp4'
    WHEN p.slug = 'home-health-aide' THEN '/videos/courses/home-health-aide-10002413.mp4'
    WHEN p.slug = 'cpr-first-aid' THEN '/videos/courses/cpr-aed-first-aid-10002448.mp4'
    WHEN p.slug = 'emergency-health' THEN '/videos/courses/emergency-health-safety-technician-10002408.mp4'
    WHEN p.slug = 'barber-apprenticeship' THEN '/videos/courses/barber-apprenticeship-10002417.mp4'
    WHEN p.slug = 'beauty-educator' THEN '/videos/courses/beauty-career-educator-10002424.mp4'
    WHEN p.slug = 'esthetician' THEN '/videos/courses/esthetician-client-services-10002415.mp4'
    WHEN p.slug = 'hvac-tech' THEN '/videos/courses/hvac-technician-10002289.mp4'
    WHEN p.slug = 'business-startup' THEN '/videos/courses/business-startup-marketing-10002422.mp4'
    WHEN p.slug = 'tax-prep' THEN '/videos/courses/tax-preparation-financial-service-10002414.mp4'
    WHEN p.slug = 'public-safety' THEN '/videos/courses/public-safety-reentry-specialist-10002439.mp4'
  END,
  1,
  15,
  true
FROM public.courses c
JOIN public.programs p ON p.id = c.program_id
ON CONFLICT DO NOTHING;

-- Step 4: Create Module 2 for each course
INSERT INTO public.lessons (course_id, title, content, order_index, duration_minutes, is_published)
SELECT 
  c.id,
  'Module 2: Core Concepts & Fundamentals',
  'Deep dive into the fundamental concepts and core skills you need to succeed in this field. Build your foundation with essential knowledge and practical understanding.',
  2,
  30,
  true
FROM public.courses c
ON CONFLICT DO NOTHING;

-- Step 5: Create Module 3 for each course
INSERT INTO public.lessons (course_id, title, content, order_index, duration_minutes, is_published)
SELECT 
  c.id,
  'Module 3: Hands-On Skills & Practice',
  'Apply what you have learned through hands-on practice and skill development. Work through real-world scenarios and build confidence in your abilities.',
  3,
  45,
  true
FROM public.courses c
ON CONFLICT DO NOTHING;

-- Step 6: Create Module 4 for each course
INSERT INTO public.lessons (course_id, title, content, order_index, duration_minutes, is_published)
SELECT 
  c.id,
  'Module 4: Advanced Techniques & Best Practices',
  'Master advanced techniques and industry best practices. Learn from experienced professionals and prepare for real-world challenges.',
  4,
  40,
  true
FROM public.courses c
ON CONFLICT DO NOTHING;

-- Step 7: Create Module 5 (Final Assessment) for each course
INSERT INTO public.lessons (course_id, title, content, order_index, duration_minutes, is_published)
SELECT 
  c.id,
  'Module 5: Final Assessment & Certification Prep',
  'Comprehensive review of all course material. Complete your final assessment and prepare for certification or job placement.',
  5,
  20,
  true
FROM public.courses c
ON CONFLICT DO NOTHING;

-- =============================================
-- VERIFICATION QUERIES
-- =============================================

-- Check programs created
SELECT COUNT(*) as program_count FROM public.programs;

-- Check courses created
SELECT COUNT(*) as course_count FROM public.courses;

-- Check lessons created
SELECT COUNT(*) as lesson_count FROM public.lessons;

-- View all programs with course and lesson counts
SELECT 
  p.name,
  p.slug,
  p.category,
  COUNT(DISTINCT c.id) as courses,
  COUNT(l.id) as lessons
FROM public.programs p
LEFT JOIN public.courses c ON c.program_id = p.id
LEFT JOIN public.lessons l ON l.course_id = c.id
GROUP BY p.id, p.name, p.slug, p.category
ORDER BY p.name;

-- =============================================
-- SUCCESS MESSAGE
-- =============================================

DO $$
BEGIN
  RAISE NOTICE '✅ Course migration complete!';
  RAISE NOTICE '📚 12 programs created';
  RAISE NOTICE '📖 12 courses created (1 per program)';
  RAISE NOTICE '📝 60 lessons created (5 per course)';
  RAISE NOTICE '🎥 11 video lessons linked';
  RAISE NOTICE '';
  RAISE NOTICE 'Next steps:';
  RAISE NOTICE '1. Create test student account on site';
  RAISE NOTICE '2. Enroll student in a program';
  RAISE NOTICE '3. Test LMS access at /lms/dashboard';
END $$;
