# End-to-End Enrollment Flow Test Plan

## Prerequisites

1. Database migration `20241221_enrollment_steps.sql` must be applied
2. At least one program with multiple `program_partner_lms` entries configured
3. Test student account available

## Test Steps

### 1. Database Migration

```bash
# Verify migration file exists
ls -la supabase/migrations/20241221_enrollment_steps.sql

# Apply migration via Supabase dashboard or CLI
# supabase db push
```

### 2. Verify Database Functions

```sql
-- Check if functions exist
SELECT routine_name
FROM information_schema.routines
WHERE routine_schema = 'public'
AND routine_name LIKE '%enrollment_step%';

-- Expected functions:
-- - generate_enrollment_steps
-- - get_current_step
-- - advance_to_next_step
-- - mark_step_complete
-- - is_enrollment_complete
```

### 3. Test Step Generation

```sql
-- Find a test enrollment
SELECT id, user_id, program_id, status
FROM enrollments
LIMIT 1;

-- Generate steps for enrollment
SELECT generate_enrollment_steps('<enrollment_id>');

-- Verify steps created
SELECT * FROM enrollment_steps
WHERE enrollment_id = '<enrollment_id>'
ORDER BY sequence_order;

-- Expected: Multiple steps with first one in 'in_progress' status
```

### 4. Test Current Step Retrieval

```sql
-- Get current step
SELECT * FROM get_current_step('<enrollment_id>');

-- Expected: Returns the first step with status 'in_progress'
```

### 5. Test Step Completion

```sql
-- Get current step ID
SELECT id FROM enrollment_steps
WHERE enrollment_id = '<enrollment_id>'
AND status = 'in_progress';

-- Mark step complete
SELECT mark_step_complete('<step_id>');

-- Verify:
-- 1. Previous step marked 'completed' with completed_at timestamp
-- 2. Next step marked 'in_progress' with started_at timestamp
SELECT * FROM enrollment_steps
WHERE enrollment_id = '<enrollment_id>'
ORDER BY sequence_order;
```

### 6. Test Enrollment Completion Check

```sql
-- Check if enrollment complete
SELECT is_enrollment_complete('<enrollment_id>');

-- Expected: false (still has pending/in_progress steps)

-- Complete all remaining steps
-- Then check again
-- Expected: true (all steps completed)
```

### 7. Test Webhook Integration

```bash
# Simulate partner course completion webhook
curl -X POST http://localhost:3000/api/webhooks/partners/hsi \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Secret: <webhook_secret>" \
  -d '{
    "event": "course.completed",
    "student_id": "<external_student_id>",
    "course_id": "<external_course_id>",
    "completed_at": "2024-12-22T00:00:00Z"
  }'

# Verify:
# 1. Current step marked complete
# 2. Next step started
# 3. If all steps complete, certificate generated
```

### 8. Test Student Progress UI

1. Navigate to `/student/progress`
2. Verify:
   - All enrollments displayed
   - Progress bars show correct completion percentage
   - Current step highlighted in blue
   - Completed steps show green checkmarks
   - Pending steps show gray circles
   - "Launch Training" button visible for active step
   - Certificate download available when complete

### 9. Test Admin Pipeline View

1. Navigate to `/admin/dashboard`
2. Verify:
   - "Training Pipeline" section visible
   - Each provider shows student counts (pending, in_progress, completed)
   - Completion rates calculated correctly
   - "Stuck Students Alert" shows students in_progress > 7 days
   - Contact links work for stuck students

## Success Criteria

✅ Migration applies without errors
✅ All 5 database functions created
✅ Steps auto-generate on enrollment creation
✅ First step auto-starts (in_progress)
✅ mark_step_complete advances to next step
✅ is_enrollment_complete returns correct boolean
✅ Webhook handler calls mark_step_complete
✅ Student UI shows accurate progress
✅ Admin UI shows pipeline metrics
✅ Stuck students identified correctly

## Rollback Plan

If issues occur:

```sql
-- Drop functions
DROP FUNCTION IF EXISTS generate_enrollment_steps CASCADE;
DROP FUNCTION IF EXISTS get_current_step CASCADE;
DROP FUNCTION IF EXISTS advance_to_next_step CASCADE;
DROP FUNCTION IF EXISTS mark_step_complete CASCADE;
DROP FUNCTION IF EXISTS is_enrollment_complete CASCADE;

-- Drop table
DROP TABLE IF EXISTS enrollment_steps CASCADE;
```

## Notes

- The migration uses `provider_id` (references `partner_lms_providers`)
- UI queries updated to match schema
- Webhook handler must use service role client for privileged operations
- RLS policies allow students to view own steps, admins to view all
- Service role can modify steps (required for webhook automation)
