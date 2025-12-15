-- Enable Milady RISE integration for Barber program
-- Run this in Supabase SQL Editor

-- Step 1: Get or create Milady provider
INSERT INTO partner_lms_providers (
  provider_type,
  provider_name,
  contact_email,
  promo_code,
  payment_amount,
  requires_payment,
  is_active
) VALUES (
  'milady',
  'Milady RISE',
  'jessica.boyd@milady.com',
  'efhcti-rise295',
  295.00,
  true,
  true
)
ON CONFLICT (provider_type) 
DO UPDATE SET
  contact_email = EXCLUDED.contact_email,
  promo_code = EXCLUDED.promo_code,
  payment_amount = EXCLUDED.payment_amount;

-- Step 2: Insert all 16 Milady RISE courses for Barber program
WITH milady_provider AS (
  SELECT id FROM partner_lms_providers WHERE provider_type = 'milady' LIMIT 1
)
INSERT INTO partner_lms_courses (
  provider_id,
  course_id,
  course_name,
  description,
  duration_hours,
  price,
  course_url,
  format,
  is_active
)
SELECT 
  mp.id,
  course_data.code,
  course_data.name,
  course_data.description,
  course_data.hours,
  295.00,
  'https://www.miladytraining.com/courses/' || course_data.code,
  'online',
  true
FROM milady_provider mp,
(VALUES
  -- Core Barbering Courses (200 hours)
  ('RISE-BARBER-FOUNDATIONS', 'Barbering Foundations', 'Introduction to professional barbering, tools, and techniques', 40),
  ('RISE-BARBER-HAIRCUTTING', 'Advanced Haircutting Techniques', 'Master classic and modern haircutting methods', 60),
  ('RISE-BARBER-SHAVING', 'Shaving & Facial Hair Design', 'Traditional shaving techniques and beard styling', 30),
  ('RISE-BARBER-COLORING', 'Hair Coloring for Barbers', 'Color theory and application for mens hair', 40),
  ('RISE-BARBER-STYLING', 'Mens Hair Styling', 'Product knowledge and styling techniques', 30),
  
  -- Client Services & Safety (55 hours)
  ('RISE-CLIENT-WELLBEING', 'Client Well-Being & Safety', 'Health, safety, and sanitation protocols', 20),
  ('RISE-CLIENT-CONSULTATION', 'Client Consultation Skills', 'Communication and consultation techniques', 15),
  ('RISE-INFECTION-CONTROL', 'Infection Control & Sanitation', 'Proper sanitation and infection prevention', 20),
  
  -- Business & Professional Development (65 hours)
  ('RISE-BARBER-BUSINESS', 'Barbershop Business Management', 'Running a successful barbershop', 30),
  ('RISE-PROFESSIONAL-ETHICS', 'Professional Ethics & Standards', 'Industry standards and professional conduct', 15),
  ('RISE-CUSTOMER-SERVICE', 'Customer Service Excellence', 'Building client relationships and retention', 20),
  
  -- Specialized Skills (90 hours)
  ('RISE-TEXTURE-SERVICES', 'Texture Services & Chemical Treatments', 'Perms, relaxers, and chemical services', 35),
  ('RISE-SCALP-TREATMENTS', 'Scalp Care & Treatments', 'Scalp analysis and treatment services', 25),
  ('RISE-MENS-GROOMING', 'Complete Mens Grooming', 'Full-service grooming and spa treatments', 30),
  
  -- State Board Preparation (70 hours)
  ('RISE-STATE-BOARD-PREP', 'State Board Exam Preparation', 'Comprehensive exam preparation and practice', 40),
  ('RISE-PRACTICAL-EXAM', 'Practical Skills Assessment', 'Hands-on skills evaluation and practice', 30)
) AS course_data(code, name, description, hours)
ON CONFLICT (provider_id, course_id) 
DO UPDATE SET
  course_name = EXCLUDED.course_name,
  description = EXCLUDED.description,
  duration_hours = EXCLUDED.duration_hours,
  is_active = EXCLUDED.is_active;

-- Step 3: Verify the courses were inserted
SELECT 
  plc.course_id,
  plc.course_name,
  plc.duration_hours,
  plp.provider_name
FROM partner_lms_courses plc
JOIN partner_lms_providers plp ON plp.id = plc.provider_id
WHERE plp.provider_type = 'milady'
ORDER BY plc.course_name;
