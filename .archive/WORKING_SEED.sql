ALTER TABLE courses DROP CONSTRAINT IF EXISTS courses_category_check;
ALTER TABLE courses DROP CONSTRAINT IF EXISTS courses_level_check;
ALTER TABLE courses ALTER COLUMN category DROP NOT NULL;
ALTER TABLE courses ALTER COLUMN level DROP NOT NULL;

INSERT INTO courses (title, slug, description, duration, moderation_status, thumbnail_url, category, level)
VALUES
  ('CNA Training', 'cna-training', 'Certified Nursing Assistant training program', '6 weeks', 'approved', '/images/programs/efh-cna-hero.jpg', 'Healthcare', 'Beginner'),
  ('HVAC Training', 'hvac-training', 'HVAC Technician training program', '12 weeks', 'approved', '/images/programs/hvac-hero.jpg', 'Trades', 'Intermediate'),
  ('Barber Program', 'barber-program', 'Barber apprenticeship program', '52 weeks', 'approved', '/images/programs/barber-hero.jpg', 'Beauty', 'Beginner')
ON CONFLICT (slug) DO NOTHING;

SELECT id, title, slug, moderation_status, category FROM courses WHERE moderation_status = 'approved';
