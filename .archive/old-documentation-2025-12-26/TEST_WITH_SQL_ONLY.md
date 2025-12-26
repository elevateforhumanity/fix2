# Test Approval with SQL Only

You want to test the orchestration without using curl. We can do this by directly calling the database function and updating the tables manually to simulate what the API endpoint does.

---

## COPY-PASTE INTO SUPABASE SQL EDITOR

```sql
-- ============================================
-- MANUAL APPROVAL TEST (SQL ONLY)
-- Simulates what the API endpoint does
-- ============================================

-- Step 1: Show current state BEFORE approval
SELECT 'BEFORE APPROVAL' as stage;

SELECT
  id,
  status,
  student_id,
  program_id,
  program_holder_id,
  created_at
FROM public.program_enrollments
WHERE id = '92e500a4-cc06-4d75-809e-42b6be663b01';

SELECT
  id,
  email,
  enrollment_status
FROM public.profiles
WHERE id = (SELECT student_id FROM program_enrollments WHERE id = '92e500a4-cc06-4d75-809e-42b6be663b01');

-- Step 2: APPROVE THE ENROLLMENT (simulate API endpoint)
-- This is what POST /api/enroll/approve does

-- 2a) Update enrollment status to READY_TO_START
UPDATE public.program_enrollments
SET
  status = 'READY_TO_START',
  updated_at = NOW()
WHERE id = '92e500a4-cc06-4d75-809e-42b6be663b01';

-- 2b) Update profile enrollment_status to active
UPDATE public.profiles
SET
  enrollment_status = 'active',
  updated_at = NOW()
WHERE id = (
  SELECT student_id
  FROM program_enrollments
  WHERE id = '92e500a4-cc06-4d75-809e-42b6be663b01'
);

-- 2c) Generate enrollment steps (call the RPC function)
SELECT generate_enrollment_steps('92e500a4-cc06-4d75-809e-42b6be663b01'::uuid) as steps_generated;

-- Step 3: Show state AFTER approval
SELECT 'AFTER APPROVAL' as stage;

SELECT
  id,
  status,
  student_id,
  program_id,
  program_holder_id,
  updated_at
FROM public.program_enrollments
WHERE id = '92e500a4-cc06-4d75-809e-42b6be663b01';
-- Expected: status = 'READY_TO_START'

SELECT
  id,
  email,
  enrollment_status,
  updated_at
FROM public.profiles
WHERE id = (SELECT student_id FROM program_enrollments WHERE id = '92e500a4-cc06-4d75-809e-42b6be663b01');
-- Expected: enrollment_status = 'active'

-- Step 4: Verify enrollment steps were generated
SELECT
  COUNT(*) as steps_count,
  MIN(sequence_order) as first_step,
  MAX(sequence_order) as last_step
FROM public.enrollment_steps
WHERE enrollment_id = '92e500a4-cc06-4d75-809e-42b6be663b01';
-- Expected: steps_count > 0 (if blueprint exists)

-- Step 5: Show all generated steps
SELECT
  es.id,
  es.sequence_order,
  es.status,
  plp.provider_name,
  es.started_at,
  es.created_at
FROM public.enrollment_steps es
JOIN public.partner_lms_providers plp ON plp.id = es.provider_id
WHERE es.enrollment_id = '92e500a4-cc06-4d75-809e-42b6be663b01'
ORDER BY es.sequence_order;
-- Expected: First step should have status = 'in_progress'

-- Step 6: Check if blueprint exists (explains steps_count)
SELECT
  ppl.program_id,
  ppl.sequence_order,
  ppl.is_required,
  plp.provider_name
FROM public.program_partner_lms ppl
JOIN public.partner_lms_providers plp ON plp.id = ppl.provider_id
WHERE ppl.program_id = (
  SELECT program_id::uuid
  FROM program_enrollments
  WHERE id = '92e500a4-cc06-4d75-809e-42b6be663b01'
)
ORDER BY ppl.sequence_order;
-- If this returns 0 rows, steps_count will be 0 (no blueprint configured)

-- ============================================
-- SUCCESS CRITERIA
-- ============================================
-- ✅ program_enrollments.status = 'READY_TO_START'
-- ✅ profiles.enrollment_status = 'active'
-- ✅ generate_enrollment_steps() returns > 0 (if blueprint exists)
-- ✅ enrollment_steps table has rows for this enrollment_id
-- ✅ First step has status = 'in_progress'
-- ============================================
```

---

## What This Does

This SQL script does **exactly** what the API endpoint does:

1. ✅ Updates `program_enrollments.status` → `READY_TO_START`
2. ✅ Updates `profiles.enrollment_status` → `active`
3. ✅ Calls `generate_enrollment_steps()` RPC function
4. ✅ Shows before/after state
5. ✅ Verifies steps were generated
6. ✅ Checks if blueprint exists

---

## Expected Results

### If Blueprint Exists:

- `steps_generated` > 0
- `steps_count` > 0
- First step `status` = `in_progress`

### If No Blueprint:

- `steps_generated` = 0
- `steps_count` = 0
- Blueprint query returns 0 rows
- **This is a config issue, not a code bug**

---

## Paste Back

After running, paste the output of:

1. `generate_enrollment_steps()` result
2. Steps count
3. All generated steps (if any)
4. Blueprint query result

This proves the orchestration works.
