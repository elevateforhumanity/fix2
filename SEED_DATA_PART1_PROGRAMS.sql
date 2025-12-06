-- ============================================
-- SEED DATA PART 1: PROGRAMS
-- Run this FIRST in Supabase SQL Editor
-- ============================================

-- Clear existing test data (optional - comment out if you want to keep existing data)
-- DELETE FROM programs WHERE slug LIKE '%-apprenticeship' OR slug LIKE '%-training' OR slug LIKE '%-certification';

INSERT INTO programs (id, slug, title, category, description, estimated_weeks, estimated_hours, funding_tags, is_active, created_at) VALUES
  (
    'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d',
    'barber-apprenticeship-wrg',
    'Barber Apprenticeship Program',
    'trades',
    'Complete barber training program with hands-on experience. Learn cutting, styling, shaving, and business management skills. Includes 1500 hours of training leading to state licensure.',
    52,
    1500,
    ARRAY['WRG', 'WIOA', 'Self-Pay'],
    true,
    NOW()
  ),
  (
    'b2c3d4e5-f6a7-4b5c-9d0e-1f2a3b4c5d6e',
    'cna-training-wrg',
    'Certified Nursing Assistant (CNA)',
    'healthcare',
    'Healthcare career foundation with clinical skills training and state certification preparation. Fast-track program gets you working in healthcare in just 8 weeks.',
    8,
    120,
    ARRAY['WRG', 'WIOA', 'Self-Pay'],
    true,
    NOW()
  ),
  (
    'c3d4e5f6-a7b8-4c5d-0e1f-2a3b4c5d6e7f',
    'hvac-technician-wrg',
    'HVAC Technician Training',
    'trades',
    'Heating, ventilation, and air conditioning technician training with EPA certification. High-demand career with excellent earning potential.',
    20,
    800,
    ARRAY['WRG', 'WIOA', 'Self-Pay'],
    true,
    NOW()
  ),
  (
    'd4e5f6a7-b8c9-4d5e-1f2a-3b4c5d6e7f8a',
    'building-maintenance-wrg',
    'Building Maintenance Technician',
    'trades',
    'Commercial building maintenance and repair training for facilities management careers. Learn electrical, plumbing, and HVAC basics.',
    15,
    600,
    ARRAY['WRG', 'WIOA', 'EmployIndy', 'Self-Pay'],
    true,
    NOW()
  ),
  (
    'e5f6a7b8-c9d0-4e5f-2a3b-4c5d6e7f8a9b',
    'cdl-training-wrg',
    'Commercial Truck Driving (CDL)',
    'transportation',
    'Class A CDL training and certification for professional truck driving careers. Get on the road to a high-paying career in just 4 weeks.',
    4,
    160,
    ARRAY['WRG', 'WIOA', 'Self-Pay'],
    true,
    NOW()
  ),
  (
    'f6a7b8c9-d0e1-4f5a-3b4c-5d6e7f8a9b0c',
    'life-coach-certification-wioa',
    'Life Coach Certification',
    'professional',
    'Professional life coaching certification program. Help others achieve their goals while building a rewarding career.',
    10,
    200,
    ARRAY['WIOA', 'Self-Pay'],
    true,
    NOW()
  ),
  (
    'a7b8c9d0-e1f2-4a5b-4c5d-6e7f8a9b0c1d',
    'peer-recovery-specialist-jri',
    'Peer Recovery Specialist',
    'healthcare',
    'Certified peer recovery specialist training for those in recovery who want to help others. Make a difference in your community.',
    8,
    160,
    ARRAY['JRI', 'WIOA', 'Self-Pay'],
    true,
    NOW()
  );

-- ============================================
-- VERIFICATION
-- ============================================

SELECT COUNT(*) as program_count FROM programs;
SELECT slug, title, category, estimated_hours, funding_tags FROM programs ORDER BY title;
