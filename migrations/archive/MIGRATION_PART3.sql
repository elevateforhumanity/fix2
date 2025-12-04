-- Part 3: Insert Courses (10-17)
INSERT INTO courses (slug, title, subtitle, description, level, duration_hours, status, is_free) VALUES
('peer-support', 'Peer Support Professional', 'Support in recovery', '80-hour peer support program', 'beginner', 80, 'published', true),
('recovery-coach', 'Recovery Coach', 'Guide recovery', '80-hour recovery coach program', 'beginner', 80, 'published', true),
('cpr-certification', 'CPR Certification', 'Life-saving skills', '8-hour CPR training', 'beginner', 8, 'published', true),
('community-health-worker', 'Community Healthcare Worker', 'Bridge healthcare', '160-hour CHW program', 'beginner', 160, 'published', true),
('emergency-safety', 'Emergency Health & Safety', 'Workplace safety', '40-hour safety program', 'beginner', 40, 'published', true),
('nrf-rise-up', 'NRF Rise Up', 'Retail fundamentals', '40-hour retail program', 'beginner', 40, 'published', true),
('jri-series', 'JRI Complete Series', 'Justice reinvestment', '120-hour JRI program', 'beginner', 120, 'published', true),
('rise-up-certificate', 'Rise Up Certificate', 'Additional certification', '40-hour certificate program', 'beginner', 40, 'published', true)
ON CONFLICT (slug) DO NOTHING;

SELECT COUNT(*) as total_courses FROM courses;
