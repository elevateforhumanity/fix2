ALTER TABLE courses DROP CONSTRAINT IF EXISTS courses_category_check;
ALTER TABLE courses DROP CONSTRAINT IF EXISTS courses_level_check;

INSERT INTO courses (title, slug, description, duration, moderation_status, thumbnail_url)
VALUES
  ('CNA Training', 'cna-training', 'Certified Nursing Assistant training program', '6 weeks', 'approved', '/images/programs/efh-cna-hero.jpg'),
  ('HVAC Training', 'hvac-training', 'HVAC Technician training program', '12 weeks', 'approved', '/images/programs/hvac-hero.jpg'),
  ('Barber Program', 'barber-program', 'Barber apprenticeship program', '52 weeks', 'approved', '/images/programs/barber-hero.jpg')
ON CONFLICT (slug) DO NOTHING;

SELECT * FROM courses WHERE moderation_status = 'approved';
