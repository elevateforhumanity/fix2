INSERT INTO courses (title, slug, description, duration, moderation_status, thumbnail_url, category, level)
VALUES
  ('Commercial Driver License (CDL)', 'cdl-training', 'Professional CDL training for Class A and Class B licensing', '8 weeks', 'approved', '/images/programs/cdl-hero.jpg', 'Transportation', 'Beginner'),
  ('Building Maintenance', 'building-maintenance', 'Training for building repair and facility operations', '10 weeks', 'approved', '/images/programs/building-maintenance-hero.jpg', 'Trades', 'Beginner'),
  ('Workforce Readiness', 'workforce-readiness', 'Job readiness and career advancement skills', '4 weeks', 'approved', '/images/programs/efh-building-tech-hero.jpg', 'Career Development', 'Beginner')
ON CONFLICT (slug) DO NOTHING;

SELECT id, title, slug, moderation_status, category FROM courses WHERE moderation_status = 'approved' ORDER BY title;
