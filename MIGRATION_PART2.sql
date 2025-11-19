-- Part 2: Insert Courses (1-9)
INSERT INTO courses (slug, title, subtitle, description, level, duration_hours, status, is_free) VALUES
('hvac-technician', 'HVAC Technician', 'Master HVAC systems', '600-hour HVAC training program', 'beginner', 600, 'published', true),
('barber-apprenticeship', 'Barber Apprenticeship', 'Earn while you learn', '1500-hour DOL apprenticeship', 'beginner', 1500, 'published', true),
('medical-assistant', 'Medical Assistant', 'Healthcare career', '720-hour medical assistant program', 'beginner', 720, 'published', true),
('business-startup', 'Business Start-Up', 'Launch your business', 'Business entrepreneurship program', 'beginner', 32, 'published', true),
('dsp-training', 'Direct Support Professional', 'Support individuals', '120-hour DSP certification', 'beginner', 120, 'published', true),
('esthetician', 'Professional Esthetician', 'Skincare specialist', '700-hour esthetician program', 'beginner', 700, 'published', true),
('tax-preparation', 'Tax Preparation', 'Become a tax preparer', '80-hour tax prep program', 'beginner', 80, 'published', true),
('reentry-specialist', 'Reentry Specialist', 'Support justice-involved', '160-hour reentry program', 'beginner', 160, 'published', true),
('beauty-educator', 'Beauty Educator', 'Train professionals', '240-hour educator program', 'intermediate', 240, 'published', true)
ON CONFLICT (slug) DO NOTHING;
