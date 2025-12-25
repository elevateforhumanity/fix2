# Test Approval with SQL - Correct Table Name

## STEP 1: Find Which Table Exists

**Copy-paste into Supabase SQL Editor:**

```sql
-- Check which enrollments table actually exists in the database

-- Check for program_enrollments
SELECT 
  'program_enrollments' as table_name,
  EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'program_enrollments'
  ) as exists;

-- Check for enrollments
SELECT 
  'enrollments' as table_name,
  EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'enrollments'
  ) as exists;
```

**Look at the results:**
- If `program_enrollments` = `true`, use **Option A** below
- If `enrollments` = `true`, use **Option B** below

---

## OPTION A: If program_enrollments exists

```sql
-- ============================================
-- MANUAL APPROVAL TEST (program_enrollments)
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

-- Step 2: APPROVE THE ENROLLMENT
UPDATE public.program_enrollments
SET 
  status = 'READY_TO_START',
  updated_at = NOW()
WHERE id = '92e500a4-cc06-4d75-809e-42b6be663b01';

UPDATE public.profiles
SET 
  enrollment_status = 'active',
  updated_at = NOW()
WHERE id = (
  SELECT student_id 
  FROM program_enrollments 
  WHERE id = '92e500a4-cc06-4d75-809e-42b6be663b01'
);

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

SELECT 
  id,
  email,
  enrollment_status,
  updated_at
FROM public.profiles
WHERE id = (SELECT student_id FROM program_enrollments WHERE id = '92e500a4-cc06-4d75-809e-42b6be663b01');

SELECT 
  COUNT(*) as steps_count
FROM public.enrollment_steps
WHERE enrollment_id = '92e500a4-cc06-4d75-809e-42b6be663b01';
```

---

## OPTION B: If enrollments exists

```sql
-- ============================================
-- MANUAL APPROVAL TEST (enrollments)
-- ============================================

-- Step 1: Show current state BEFORE approval
SELECT 'BEFORE APPROVAL' as stage;

SELECT 
  id, 
  status, 
  user_id,
  program_id,
  created_at
FROM public.enrollments
WHERE id = '92e500a4-cc06-4d75-809e-42b6be663b01';

SELECT 
  id,
  email,
  enrollment_status
FROM public.profiles
WHERE id = (SELECT user_id FROM enrollments WHERE id = '92e500a4-cc06-4d75-809e-42b6be663b01');

-- Step 2: APPROVE THE ENROLLMENT
UPDATE public.enrollments
SET 
  status = 'active',
  updated_at = NOW()
WHERE id = '92e500a4-cc06-4d75-809e-42b6be663b01';

UPDATE public.profiles
SET 
  enrollment_status = 'active',
  updated_at = NOW()
WHERE id = (
  SELECT user_id 
  FROM enrollments 
  WHERE id = '92e500a4-cc06-4d75-809e-42b6be663b01'
);

SELECT generate_enrollment_steps('92e500a4-cc06-4d75-809e-42b6be663b01'::uuid) as steps_generated;

-- Step 3: Show state AFTER approval
SELECT 'AFTER APPROVAL' as stage;

SELECT 
  id, 
  status, 
  user_id,
  program_id,
  updated_at
FROM public.enrollments
WHERE id = '92e500a4-cc06-4d75-809e-42b6be663b01';

SELECT 
  id,
  email,
  enrollment_status,
  updated_at
FROM public.profiles
WHERE id = (SELECT user_id FROM enrollments WHERE id = '92e500a4-cc06-4d75-809e-42b6be663b01');

SELECT 
  COUNT(*) as steps_count
FROM public.enrollment_steps
WHERE enrollment_id = '92e500a4-cc06-4d75-809e-42b6be663b01';
```

---

## What to Paste Back

After running, paste:
1. Which table exists (program_enrollments or enrollments)
2. The enrollment status BEFORE and AFTER
3. The profile enrollment_status BEFORE and AFTER
4. The steps_generated count

This will tell us:
- Which table is actually in your database
- Whether the approval flow works
- Whether steps are generated
