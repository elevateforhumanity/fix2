INSERT INTO courses (title, slug, description, duration, duration_weeks, duration_hours, moderation_status, category, level, thumbnail_url)
VALUES
  ('Certified Nursing Assistant (CNA) Training', 'cna-training', 'Fast-track CNA training that prepares you for entry-level roles in long-term care, hospitals, and home health. 100% free through WIOA funding.', '6 weeks', 6, 120, 'approved', 'Healthcare', 'beginner', '/images/programs/efh-cna-hero.jpg'),
  ('HVAC Technician Training', 'hvac-technician', 'Learn to keep homes, schools, and businesses comfortable year-round. Hands-on training in heating, ventilation, and air conditioning systems.', '12 weeks', 12, 480, 'approved', 'Skilled Trades', 'intermediate', '/images/programs/hvac-hero.jpg'),
  ('Barber Apprenticeship', 'barber-apprenticeship', 'Earn while you learn through a licensed barber apprenticeship. Real shop experience and preparation for state licensure.', '52 weeks', 52, 1500, 'approved', 'Beauty & Wellness', 'beginner', '/images/programs/barber-hero.jpg'),
  ('Commercial Driver''s License (CDL) Training', 'cdl-training', 'Professional CDL training that prepares you for Class A or Class B licensing and entry-level commercial driving careers.', '8 weeks', 8, 160, 'approved', 'Transportation', 'beginner', '/images/programs/cdl-hero.jpg'),
  ('Building Maintenance Technician', 'building-maintenance', 'Hands-on training for individuals seeking roles in building repair, maintenance, and facility operations.', '10 weeks', 10, 200, 'approved', 'Skilled Trades', 'beginner', '/images/programs/building-maintenance-hero.jpg'),
  ('Workforce Readiness Training', 'workforce-readiness', 'A job-readiness program that builds the essential skills needed to succeed in employment, training, and career advancement.', '4 weeks', 4, 40, 'approved', 'Career Development', 'all', '/images/programs/efh-building-tech-hero.jpg')
ON CONFLICT (slug) DO UPDATE SET description = EXCLUDED.description, duration = EXCLUDED.duration, moderation_status = EXCLUDED.moderation_status, updated_at = NOW();

SELECT id, title, duration, moderation_status, category FROM courses WHERE moderation_status = 'approved' ORDER BY title;
