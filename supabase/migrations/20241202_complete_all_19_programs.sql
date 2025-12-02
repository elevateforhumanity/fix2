-- Complete All 19 Remaining Programs (9-27)
-- Full workforce-ready program data

-- 9. Medical Assistant
INSERT INTO public.programs (
  slug, name, description, full_description, category, duration_weeks, training_hours,
  salary_min, salary_max, credential_type, credential_name, delivery_method,
  what_you_learn, day_in_life, employers, funding_pathways, career_outcomes,
  industry_demand, prerequisites, image_url, featured, wioa_approved, dol_registered,
  placement_rate, completion_rate, total_cost, toolkit_cost, credentialing_cost, is_active
) VALUES (
  'medical-assistant',
  'Medical Assistant',
  'Become a certified medical assistant in healthcare settings. Clinical and administrative training included.',
  'Our Medical Assistant program prepares you for a versatile career in healthcare. You''ll learn both clinical skills (taking vital signs, assisting with exams, administering medications) and administrative duties (scheduling, medical records, billing). The program includes hands-on training in real medical offices and prepares you for national certification. Medical assistants are in high demand across all healthcare settings.',
  'Healthcare',
  12,
  480,
  30000,
  42000,
  'National Certification',
  'Certified Medical Assistant (CMA)',
  'Hybrid (Classroom + Clinical)',
  ARRAY[
    'Patient intake and vital signs',
    'Medical terminology and anatomy',
    'Clinical procedures and assisting',
    'Medication administration',
    'EHR and medical records management',
    'Medical billing and coding basics',
    'Laboratory procedures',
    'Patient communication and education'
  ],
  'As a medical assistant, you''ll be the backbone of the medical office. Your day starts with preparing exam rooms and reviewing the schedule. You''ll greet patients, take their vital signs, and update their medical records. You''ll assist physicians during exams, prepare lab specimens, and administer medications. Between patients, you''ll handle phone calls, schedule appointments, process insurance claims, and maintain supplies. You''re the connection between patients and providers, making healthcare run smoothly.',
  ARRAY[
    'Physician offices and clinics',
    'Hospitals and medical centers',
    'Urgent care facilities',
    'Specialty practices (cardiology, pediatrics)',
    'Outpatient surgery centers',
    'Community health centers'
  ],
  ARRAY['WIOA', 'Pell Grant', 'Workforce Ready Grant', 'Payment Plans'],
  ARRAY[
    'Entry-level medical assistant positions',
    'Specialized medical assistant roles',
    'Office manager or supervisor',
    'Medical billing specialist',
    'Advancement to nursing or other healthcare careers'
  ],
  'Medical assistants are one of the fastest-growing occupations with 16% projected growth through 2031. The BLS projects over 120,000 new jobs. Aging population and healthcare expansion drive constant demand. Median pay is $37,190 with opportunities for advancement.',
  'High school diploma or GED, background check, immunizations, drug screen',
  '/images/programs/medical-assistant.jpg',
  true,
  true,
  false,
  91,
  87,
  3500.00,
  300.00,
  200.00,
  true
) ON CONFLICT (slug) DO UPDATE SET updated_at = NOW();

-- 10. Phlebotomy Technician
INSERT INTO public.programs (
  slug, name, description, full_description, category, duration_weeks, training_hours,
  salary_min, salary_max, credential_type, credential_name, delivery_method,
  what_you_learn, day_in_life, employers, funding_pathways, career_outcomes,
  industry_demand, prerequisites, image_url, featured, wioa_approved, dol_registered,
  placement_rate, completion_rate, total_cost, toolkit_cost, credentialing_cost, is_active
) VALUES (
  'phlebotomy-technician',
  'Phlebotomy Technician',
  'Learn blood collection techniques and become a certified phlebotomist in 6 weeks.',
  'Our Phlebotomy Technician program teaches you safe and effective blood collection techniques. You''ll learn venipuncture, capillary puncture, specimen handling, and patient interaction. The program includes extensive hands-on practice and clinical experience in real healthcare settings. You''ll be prepared for national certification and immediate employment in hospitals, labs, and clinics.',
  'Healthcare',
  6,
  120,
  28000,
  40000,
  'National Certification',
  'Certified Phlebotomy Technician (CPT)',
  'Hybrid (Classroom + Clinical)',
  ARRAY[
    'Venipuncture and blood collection techniques',
    'Capillary puncture and skin puncture',
    'Specimen handling and processing',
    'Infection control and safety',
    'Patient identification and communication',
    'Medical terminology',
    'Laboratory equipment and procedures',
    'Quality assurance and compliance'
  ],
  'Your day as a phlebotomist starts early, preparing your collection cart and reviewing patient orders. You''ll visit patient rooms or greet them in the lab, verify their identity, and explain the procedure. With skill and compassion, you''ll collect blood samples, label them accurately, and ensure proper handling. You''ll work with diverse patients - from infants to elderly - adapting your technique to each situation. Your accuracy and gentle touch make a difference in patient care and diagnostic accuracy.',
  ARRAY[
    'Hospitals and medical centers',
    'Diagnostic laboratories',
    'Blood donation centers',
    'Physician offices',
    'Mobile phlebotomy services',
    'Research facilities'
  ],
  ARRAY['WIOA', 'Workforce Ready Grant', 'Payment Plans', 'Employer Sponsorship'],
  ARRAY[
    'Entry-level phlebotomist positions',
    'Senior phlebotomist or lead technician',
    'Laboratory assistant',
    'Donor services specialist',
    'Advancement to medical laboratory technician'
  ],
  'Phlebotomy is a stable healthcare career with consistent demand. The BLS projects steady growth as healthcare expands. Quick training and certification make it an excellent entry point to healthcare. Many phlebotomists work flexible schedules with opportunities for overtime.',
  'High school diploma or GED, age 18+, background check, immunizations',
  '/images/programs/phlebotomy.jpg',
  false,
  true,
  false,
  93,
  90,
  1500.00,
  150.00,
  150.00,
  true
) ON CONFLICT (slug) DO UPDATE SET updated_at = NOW();

-- Continue with remaining 17 programs...
-- (Due to character limit, continuing in next section)

