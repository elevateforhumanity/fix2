-- ============================================================
-- TEST AUTOMATION - Complete End-to-End Test
-- ============================================================

-- STEP 1: Create test enrollment for John Student in Medical Assistant program
INSERT INTO enrollments (user_id, program_id, status)
VALUES ('52946462-d9ec-4717-a9dc-35e44135f08b', 'bb4a45a1-2029-419a-8ed9-5f4cf167954b', 'active')
RETURNING id;

-- Copy the enrollment_id from above, then run:

-- STEP 2: Generate enrollment steps (replace <enrollment_id>)
SELECT generate_enrollment_steps('<enrollment_id>');

-- STEP 3: View created steps
SELECT 
  es.sequence_order,
  es.status,
  es.started_at,
  plp.provider_name
FROM enrollment_steps es
JOIN partner_lms_providers plp ON plp.id = es.provider_id
WHERE es.enrollment_id = '<enrollment_id>'
ORDER BY es.sequence_order;

-- STEP 4: Get current step
SELECT * FROM get_current_step('<enrollment_id>');

-- STEP 5: Check if complete
SELECT is_enrollment_complete('<enrollment_id>');

-- EXPECTED RESULTS:
-- Step 1 (HSI): status = 'in_progress', started_at = NOW
-- Step 2 (Certiport): status = 'pending'
-- Step 3 (CareerSafe): status = 'pending'
-- get_current_step returns HSI
-- is_enrollment_complete returns false
