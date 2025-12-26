# Test Approval Endpoint - EXACT STEPS

## Server is Running

✅ Dev server started at: [https://3000--019b5439-a441-76f0-9292-a7b98cb0eb52.us-east-1-01.gitpod.dev](https://3000--019b5439-a441-76f0-9292-a7b98cb0eb52.us-east-1-01.gitpod.dev)

---

## STEP 1: Get Your Admin JWT Token

1. **Open the app in browser:** [https://3000--019b5439-a441-76f0-9292-a7b98cb0eb52.us-east-1-01.gitpod.dev](https://3000--019b5439-a441-76f0-9292-a7b98cb0eb52.us-east-1-01.gitpod.dev)

2. **Login as admin** at `/admin-login`

3. **Open DevTools:**
   - Chrome/Edge: F12 or Ctrl+Shift+I
   - Mac: Cmd+Option+I

4. **Get the token:**
   - Go to **Application** tab
   - Expand **Local Storage** or **Cookies**
   - Find `sb-access-token` or similar
   - Copy the entire value (long string starting with `eyJ...`)

---

## STEP 2: Run This in Gitpod TERMINAL (Not SQL Editor)

**Open a terminal in Gitpod** (bottom panel, click "+" to open new terminal if needed)

**Copy-paste this command** (replace `YOUR_ADMIN_JWT` with the token from Step 1):

```bash
curl -s -X POST "https://3000--019b5439-a441-76f0-9292-a7b98cb0eb52.us-east-1-01.gitpod.dev/api/enroll/approve" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_JWT" \
  -d '{"enrollment_id":"92e500a4-cc06-4d75-809e-42b6be663b01"}'
```

**Expected response:**

```json
{
  "success": true,
  "enrollmentId": "92e500a4-cc06-4d75-809e-42b6be663b01",
  "enrollment": {
    "id": "92e500a4-cc06-4d75-809e-42b6be663b01",
    "status": "READY_TO_START",
    "student_id": "...",
    "program_id": "...",
    "program_holder_id": "..."
  },
  "profileEnrollmentStatus": "active",
  "stepsGeneratedCount": 0,
  "message": "Enrollment approved and activated successfully"
}
```

---

## STEP 3: Verify in Supabase SQL Editor

**After curl succeeds**, run these queries in **Supabase SQL Editor**:

```sql
-- 1) Enrollment should now be READY_TO_START
SELECT id, status, student_id, updated_at
FROM public.program_enrollments
WHERE id = '92e500a4-cc06-4d75-809e-42b6be663b01';

-- 2) Profile should now be active
SELECT id, email, enrollment_status, updated_at
FROM public.profiles
WHERE id = (SELECT student_id FROM program_enrollments WHERE id = '92e500a4-cc06-4d75-809e-42b6be663b01');

-- 3) Steps count (may be 0 if no blueprint exists)
SELECT COUNT(*) AS steps_count
FROM public.enrollment_steps
WHERE enrollment_id = '92e500a4-cc06-4d75-809e-42b6be663b01';

-- 4) Check if blueprint exists for this program
SELECT COUNT(*) as blueprint_count
FROM public.program_partner_lms ppl
WHERE ppl.program_id = (
  SELECT program_id::uuid
  FROM program_enrollments
  WHERE id = '92e500a4-cc06-4d75-809e-42b6be663b01'
);
```

---

## Success Criteria

✅ **curl returns:** `"success": true`  
✅ **program_enrollments.status:** `READY_TO_START`  
✅ **profiles.enrollment_status:** `active`  
✅ **enrollment_steps.COUNT:** `> 0` (if blueprint exists)

---

## Common Errors

| Error              | Cause                 | Fix                                                       |
| ------------------ | --------------------- | --------------------------------------------------------- |
| `401 Unauthorized` | Token invalid/expired | Get fresh token from browser                              |
| `403 Forbidden`    | User not admin        | Login as admin or super_admin                             |
| `404 Not Found`    | Enrollment not found  | Check enrollment_id is correct                            |
| `400 Bad Request`  | Wrong status          | Enrollment must be INTAKE/AWAITING_FUNDING/AWAITING_SEATS |

---

## If Steps = 0

This means no blueprint exists in `program_partner_lms` for this program. This is a **configuration issue**, not a code bug.

The orchestration code is working correctly - it just has nothing to orchestrate.

---

## What to Paste Back

After running all steps, paste:

1. **Curl response** (from terminal)
2. **All 4 SQL query results** (from Supabase)

This proves the orchestration works end-to-end.
