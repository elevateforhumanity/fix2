-- ============================================
-- STEP 2: PROGRAMS & COURSES DATA
-- ============================================
-- Copy this ENTIRE file and paste into Supabase SQL Editor
-- Click "Run" to insert 16 programs + 17 courses
-- Time: ~10 seconds
-- ============================================

-- Insert 16 Programs
INSERT INTO programs (slug, title, tagline, summary, description, bullets, funding, duration_hours, status)
VALUES
('business-startup', 'Business Start-Up Program', 'Launch your business', 'Learn entrepreneurship and business planning', 'Complete business startup program covering entrepreneurship fundamentals, digital marketing, LLC formation, and business planning with mentorship support.', ARRAY['5-week program', 'LLC formation', 'Digital marketing', 'Business planning', 'Mentorship support'], ARRAY['WIOA', 'WRG'], 32, 'published'),

('hvac-tech', 'HVAC Technician', 'Master HVAC systems', '600-hour HVAC training program', 'Comprehensive HVAC training program preparing students for careers in heating, ventilation, and air conditioning. Learn installation, maintenance, troubleshooting, and repair.', ARRAY['EPA 608 Certification', 'OSHA 10-Hour Safety', 'Hands-on equipment training', 'Electrical systems', 'Refrigeration principles', 'Job placement assistance'], ARRAY['WIOA', 'WRG', 'Youth', 'Reentry'], 600, 'published'),

('medical-assistant', 'Medical Assistant', 'Healthcare career training', '720-hour medical assistant program', 'Clinical and administrative medical assistant training preparing students for immediate employment in healthcare facilities.', ARRAY['Clinical skills', 'Medical terminology', 'Administrative procedures', 'Externship included', 'Certification prep', 'Job placement'], ARRAY['WIOA', 'WRG'], 720, 'published'),

('barber-apprentice', 'Barber Apprenticeship', 'Earn while you learn', '1500-hour DOL apprenticeship', 'DOL Federally Registered Apprenticeship combining classroom instruction with paid on-the-job training in a real barbershop environment.', ARRAY['DOL registered', 'Paid training', 'State license prep', 'Master cuts and fades', 'Business skills', 'Employer partnerships'], ARRAY['WIOA', 'Apprenticeship', 'SEAL', 'WRG'], 1500, 'published'),

('dsp-training', 'Direct Support Professional', 'Support individuals with disabilities', '120-hour DSP certification', 'Direct Support Professional training program preparing students to support individuals with disabilities in residential and community settings.', ARRAY['DSP certification', 'CPR/First Aid', 'Person-centered care', 'Crisis intervention', 'Documentation', 'Field placement'], ARRAY['WIOA', 'WRG'], 120, 'published'),

('esthetician', 'Professional Esthetician', 'Skincare specialist', '700-hour esthetician program', 'Complete esthetician training program covering skincare, facials, waxing, and makeup application leading to state licensure.', ARRAY['State license prep', 'Skincare techniques', 'Facial treatments', 'Waxing and makeup', 'Product knowledge', 'Salon management'], ARRAY['WIOA', 'WRG'], 700, 'published'),

('tax-prep', 'Tax Preparation', 'Become a tax preparer', '80-hour tax prep program', 'Tax preparation training program covering federal and state tax law, tax software, and client service skills.', ARRAY['IRS PTIN eligible', 'Tax software training', 'Federal and state tax', 'Client service', 'Ethics and compliance', 'Seasonal employment'], ARRAY['WIOA', 'WRG'], 80, 'published'),

('reentry-specialist', 'Reentry Specialist', 'Support justice-involved individuals', '160-hour reentry program', 'Reentry specialist training preparing students to support justice-involved individuals transitioning back to the community.', ARRAY['Case management', 'Resource navigation', 'Trauma-informed care', 'Employment support', 'Housing assistance', 'Peer support'], ARRAY['WIOA', 'JRI'], 160, 'published'),

('beauty-educator', 'Beauty Educator', 'Train beauty professionals', '240-hour educator program', 'Beauty educator training program preparing licensed professionals to teach and train future beauty industry workers.', ARRAY['Instructional design', 'Curriculum development', 'Student assessment', 'Classroom management', 'State requirements', 'Career advancement'], ARRAY['WIOA', 'WRG'], 240, 'published'),

('peer-support', 'Peer Support Professional', 'Support individuals in recovery', '80-hour peer support program', 'Peer support professional training preparing individuals with lived experience to support others in recovery.', ARRAY['Recovery principles', 'Active listening', 'Resource connection', 'Ethical boundaries', 'Self-care', 'Certification prep'], ARRAY['WIOA', 'WRG'], 80, 'published'),

('recovery-coach', 'Recovery Coach', 'Guide recovery journey', '80-hour recovery coach program', 'Recovery coach training preparing students to guide and support individuals through their recovery journey.', ARRAY['Motivational interviewing', 'Recovery planning', 'Relapse prevention', 'Family support', 'Community resources', 'Certification prep'], ARRAY['WIOA', 'WRG'], 80, 'published'),

('cpr-cert', 'CPR Certification', 'Life-saving skills', '8-hour CPR training', 'American Heart Association CPR and First Aid certification training for healthcare and community workers.', ARRAY['AHA certified', 'CPR/AED training', 'First Aid', 'Choking response', 'Emergency response', '2-year certification'], ARRAY['WIOA', 'WRG'], 8, 'published'),

('chw-cert', 'Community Healthcare Worker', 'Bridge healthcare gaps', '160-hour CHW program', 'Community healthcare worker training preparing students to bridge gaps between healthcare systems and underserved communities.', ARRAY['Health education', 'Care navigation', 'Community outreach', 'Cultural competency', 'Chronic disease', 'Certification prep'], ARRAY['WIOA', 'WRG'], 160, 'published'),

('health-safety', 'Emergency Health & Safety', 'Workplace safety', '40-hour safety program', 'Emergency health and safety training covering CPR, First Aid, OSHA 10, and workplace safety fundamentals.', ARRAY['CPR/AED', 'First Aid', 'OSHA 10', 'Workplace safety', 'Emergency response', 'Multiple certifications'], ARRAY['WIOA', 'WRG'], 40, 'published'),

('nrf-riseup', 'NRF Rise Up', 'Retail fundamentals', '40-hour retail program', 'National Retail Federation Rise Up training covering retail fundamentals, customer service, and industry best practices.', ARRAY['Customer service', 'Retail operations', 'Sales techniques', 'Inventory management', 'NRF certification', 'Job placement'], ARRAY['WIOA', 'WRG'], 40, 'published'),

('jri-series', 'JRI Complete Series', 'Justice reinvestment training', '120-hour JRI program', 'Justice Reinvestment Initiative complete training series covering life skills, employment readiness, and successful reentry.', ARRAY['Life skills', 'Employment readiness', 'Financial literacy', 'Conflict resolution', 'Goal setting', 'Reentry support'], ARRAY['WIOA', 'JRI'], 120, 'published')

ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  bullets = EXCLUDED.bullets,
  funding = EXCLUDED.funding,
  duration_hours = EXCLUDED.duration_hours,
  status = EXCLUDED.status,
  updated_at = NOW();

-- Insert 17 Courses
INSERT INTO courses (slug, title, subtitle, description, level, duration_hours, status, is_free, category)
VALUES
('business-startup', 'Business Start-Up Program', 'Launch your business', 'Learn entrepreneurship and business planning', 'beginner', 32, 'published', true, 'Business'),

('hvac-tech', 'HVAC Technician', 'Master HVAC systems', '600-hour HVAC training program', 'beginner', 600, 'published', true, 'Skilled Trades'),

('medical-assistant', 'Medical Assistant', 'Healthcare career training', '720-hour medical assistant program', 'beginner', 720, 'published', true, 'Healthcare'),

('barber-apprentice', 'Barber Apprenticeship', 'Earn while you learn', '1500-hour DOL apprenticeship', 'beginner', 1500, 'published', true, 'Skilled Trades'),

('dsp-training', 'Direct Support Professional', 'Support individuals', '120-hour DSP certification', 'beginner', 120, 'published', true, 'Healthcare'),

('esthetician', 'Professional Esthetician', 'Skincare specialist', '700-hour esthetician program', 'beginner', 700, 'published', true, 'Beauty'),

('tax-prep', 'Tax Preparation', 'Become a tax preparer', '80-hour tax prep program', 'beginner', 80, 'published', true, 'Business'),

('reentry-specialist', 'Reentry Specialist', 'Support justice-involved', '160-hour reentry program', 'beginner', 160, 'published', true, 'Social Services'),

('beauty-educator', 'Beauty Educator', 'Train professionals', '240-hour educator program', 'intermediate', 240, 'published', true, 'Beauty'),

('peer-support', 'Peer Support Professional', 'Support in recovery', '80-hour peer support program', 'beginner', 80, 'published', true, 'Social Services'),

('recovery-coach', 'Recovery Coach', 'Guide recovery', '80-hour recovery coach program', 'beginner', 80, 'published', true, 'Social Services'),

('cpr-cert', 'CPR Certification', 'Life-saving skills', '8-hour CPR training', 'beginner', 8, 'published', true, 'Healthcare'),

('chw-cert', 'Community Healthcare Worker', 'Bridge healthcare', '160-hour CHW program', 'beginner', 160, 'published', true, 'Healthcare'),

('health-safety', 'Emergency Health & Safety', 'Workplace safety', '40-hour safety program', 'beginner', 40, 'published', true, 'Healthcare'),

('nrf-riseup', 'NRF Rise Up', 'Retail fundamentals', '40-hour retail program', 'beginner', 40, 'published', true, 'Retail'),

('jri-series', 'JRI Complete Series', 'Justice reinvestment', '120-hour JRI program', 'beginner', 120, 'published', true, 'Social Services'),

('rise-up-extra', 'Rise Up Certificate', 'Additional certification', '40-hour certificate program', 'beginner', 40, 'published', true, 'Retail')

ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  level = EXCLUDED.level,
  duration_hours = EXCLUDED.duration_hours,
  status = EXCLUDED.status,
  category = EXCLUDED.category,
  updated_at = NOW();

-- Success messages
SELECT '✅ Programs inserted/updated: ' || COUNT(*)::text as result FROM programs;
SELECT '✅ Courses inserted/updated: ' || COUNT(*)::text as result FROM courses;
SELECT '🎉 Migration complete! Visit /programs and /courses to see your data.' as message;
