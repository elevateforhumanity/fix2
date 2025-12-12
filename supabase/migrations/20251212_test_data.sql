-- Test Data for Development and Testing
-- Run this AFTER the main migrations
-- DO NOT run in production with real student data

-- ============================================
-- TEST PROGRAMS
-- ============================================

INSERT INTO programs (
  id,
  name,
  slug,
  description,
  duration,
  total_hours,
  tuition,
  credential,
  status,
  created_at
) VALUES
  (
    '00000000-0000-0000-0000-000000000001'::UUID,
    'Test Barbering Program',
    'test-barbering',
    'Test program for barbering',
    '12 months',
    1500,
    5000,
    'Barber License',
    'active',
    NOW()
  ),
  (
    '00000000-0000-0000-0000-000000000002'::UUID,
    'Test CNA Program',
    'test-cna',
    'Test program for CNA',
    '4 weeks',
    120,
    1200,
    'CNA Certification',
    'active',
    NOW()
  )
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- TEST STUDENT
-- ============================================

-- Note: This creates a test student profile
-- In production, profiles are created via Supabase Auth
INSERT INTO profiles (
  id,
  email,
  full_name,
  role,
  created_at
) VALUES
  (
    '00000000-0000-0000-0000-000000000099'::UUID,
    'test.student@example.com',
    'Test Student',
    'student',
    NOW()
  )
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- TEST ENROLLMENT
-- ============================================

INSERT INTO enrollments (
  id,
  student_id,
  program_id,
  status,
  start_date,
  payment_status,
  tuition_paid,
  progress_percentage,
  theory_hours_completed,
  practical_hours_completed,
  total_hours_completed,
  gpa,
  attendance_percentage,
  sap_status,
  created_at
) VALUES
  (
    '00000000-0000-0000-0000-000000000101'::UUID,
    '00000000-0000-0000-0000-000000000099'::UUID,
    '00000000-0000-0000-0000-000000000001'::UUID,
    'active',
    CURRENT_DATE,
    'paid',
    5000,
    25,
    200,
    175,
    375,
    3.5,
    95,
    'good_standing',
    NOW()
  )
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- TEST PAYMENT LOG
-- ============================================

INSERT INTO payment_logs (
  id,
  user_id,
  program_id,
  session_id,
  amount,
  payment_type,
  status,
  metadata,
  created_at
) VALUES
  (
    '00000000-0000-0000-0000-000000000201'::UUID,
    '00000000-0000-0000-0000-000000000099'::UUID,
    '00000000-0000-0000-0000-000000000001'::UUID,
    'test_session_123',
    5000,
    'full',
    'completed',
    '{"program_name": "Test Barbering Program", "program_id": "00000000-0000-0000-0000-000000000001"}'::JSONB,
    NOW()
  )
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- TEST ATTENDANCE RECORDS
-- ============================================

INSERT INTO attendance_records (
  student_id,
  enrollment_id,
  date,
  status,
  check_in_time,
  check_out_time,
  created_at
)
SELECT
  '00000000-0000-0000-0000-000000000099'::UUID,
  '00000000-0000-0000-0000-000000000101'::UUID,
  CURRENT_DATE - (n || ' days')::INTERVAL,
  CASE 
    WHEN n % 10 = 0 THEN 'absent'
    WHEN n % 15 = 0 THEN 'tardy'
    ELSE 'present'
  END,
  '09:00:00'::TIME,
  '17:00:00'::TIME,
  NOW()
FROM generate_series(1, 30) AS n
ON CONFLICT (student_id, enrollment_id, date) DO NOTHING;

-- ============================================
-- TEST GRADES
-- ============================================

INSERT INTO grades (
  student_id,
  enrollment_id,
  assignment_name,
  assignment_type,
  points_earned,
  points_possible,
  letter_grade,
  graded_at,
  created_at
) VALUES
  (
    '00000000-0000-0000-0000-000000000099'::UUID,
    '00000000-0000-0000-0000-000000000101'::UUID,
    'Sanitation Quiz',
    'quiz',
    45,
    50,
    'A',
    NOW() - INTERVAL '5 days',
    NOW() - INTERVAL '5 days'
  ),
  (
    '00000000-0000-0000-0000-000000000099'::UUID,
    '00000000-0000-0000-0000-000000000101'::UUID,
    'Haircut Practical',
    'practical',
    85,
    100,
    'B',
    NOW() - INTERVAL '3 days',
    NOW() - INTERVAL '3 days'
  ),
  (
    '00000000-0000-0000-0000-000000000099'::UUID,
    '00000000-0000-0000-0000-000000000101'::UUID,
    'Theory Exam 1',
    'exam',
    92,
    100,
    'A',
    NOW() - INTERVAL '1 day',
    NOW() - INTERVAL '1 day'
  )
ON CONFLICT DO NOTHING;

-- ============================================
-- TEST STUDENT HOURS
-- ============================================

INSERT INTO student_hours (
  student_id,
  enrollment_id,
  date,
  activity_type,
  hours,
  notes,
  approved,
  approved_at,
  created_at
) VALUES
  (
    '00000000-0000-0000-0000-000000000099'::UUID,
    '00000000-0000-0000-0000-000000000101'::UUID,
    CURRENT_DATE - INTERVAL '7 days',
    'Haircuts',
    8,
    'Completed 12 haircuts',
    true,
    NOW() - INTERVAL '6 days',
    NOW() - INTERVAL '7 days'
  ),
  (
    '00000000-0000-0000-0000-0000-000000099'::UUID,
    '00000000-0000-0000-0000-000000000101'::UUID,
    CURRENT_DATE - INTERVAL '6 days',
    'Fades',
    6,
    'Practiced fade techniques',
    true,
    NOW() - INTERVAL '5 days',
    NOW() - INTERVAL '6 days'
  ),
  (
    '00000000-0000-0000-0000-000000000099'::UUID,
    '00000000-0000-0000-0000-000000000101'::UUID,
    CURRENT_DATE - INTERVAL '5 days',
    'Shaves',
    4,
    'Straight razor practice',
    true,
    NOW() - INTERVAL '4 days',
    NOW() - INTERVAL '5 days'
  )
ON CONFLICT DO NOTHING;

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check test data was created
DO $$
DECLARE
  v_programs INTEGER;
  v_students INTEGER;
  v_enrollments INTEGER;
  v_payments INTEGER;
  v_attendance INTEGER;
  v_grades INTEGER;
  v_hours INTEGER;
BEGIN
  SELECT COUNT(*) INTO v_programs FROM programs WHERE id::TEXT LIKE '00000000-0000-0000-0000-00000000000%';
  SELECT COUNT(*) INTO v_students FROM profiles WHERE id::TEXT LIKE '00000000-0000-0000-0000-00000000009%';
  SELECT COUNT(*) INTO v_enrollments FROM enrollments WHERE id::TEXT LIKE '00000000-0000-0000-0000-00000000010%';
  SELECT COUNT(*) INTO v_payments FROM payment_logs WHERE id::TEXT LIKE '00000000-0000-0000-0000-00000000020%';
  SELECT COUNT(*) INTO v_attendance FROM attendance_records WHERE student_id::TEXT LIKE '00000000-0000-0000-0000-00000000009%';
  SELECT COUNT(*) INTO v_grades FROM grades WHERE student_id::TEXT LIKE '00000000-0000-0000-0000-00000000009%';
  SELECT COUNT(*) INTO v_hours FROM student_hours WHERE student_id::TEXT LIKE '00000000-0000-0000-0000-00000000009%';

  RAISE NOTICE '✅ Test Data Created:';
  RAISE NOTICE '  Programs: %', v_programs;
  RAISE NOTICE '  Students: %', v_students;
  RAISE NOTICE '  Enrollments: %', v_enrollments;
  RAISE NOTICE '  Payments: %', v_payments;
  RAISE NOTICE '  Attendance Records: %', v_attendance;
  RAISE NOTICE '  Grades: %', v_grades;
  RAISE NOTICE '  Student Hours: %', v_hours;
  
  IF v_programs > 0 AND v_students > 0 AND v_enrollments > 0 THEN
    RAISE NOTICE '✅ Test data ready for testing!';
    RAISE NOTICE 'Test Student Email: test.student@example.com';
    RAISE NOTICE 'Test Student ID: 00000000-0000-0000-0000-000000000099';
  ELSE
    RAISE WARNING '⚠️  Some test data may not have been created';
  END IF;
END $$;

-- ============================================
-- CLEANUP SCRIPT (Run to remove test data)
-- ============================================

-- Uncomment to remove all test data:
/*
DELETE FROM student_hours WHERE student_id::TEXT LIKE '00000000-0000-0000-0000-00000000009%';
DELETE FROM grades WHERE student_id::TEXT LIKE '00000000-0000-0000-0000-00000000009%';
DELETE FROM attendance_records WHERE student_id::TEXT LIKE '00000000-0000-0000-0000-00000000009%';
DELETE FROM payment_logs WHERE id::TEXT LIKE '00000000-0000-0000-0000-00000000020%';
DELETE FROM enrollments WHERE id::TEXT LIKE '00000000-0000-0000-0000-00000000010%';
DELETE FROM profiles WHERE id::TEXT LIKE '00000000-0000-0000-0000-00000000009%';
DELETE FROM programs WHERE id::TEXT LIKE '00000000-0000-0000-0000-00000000000%';
*/
