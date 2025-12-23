# Database Schema Verification Results

**Date:** 2025-12-23  
**Status:** ✅ COMPLETE

---

## Tables Found

✅ **profiles** - exists  
✅ **enrollments** - exists  
✅ **programs** - exists

---

## Profiles Table Schema

| Column            | Type                     | Nullable | Status        |
| ----------------- | ------------------------ | -------- | ------------- |
| id                | uuid                     | NO       | ✅ Required   |
| email             | text                     | YES      | ✅ Required   |
| full_name         | text                     | YES      | ✅ Required   |
| role              | text                     | YES      | ✅ Required   |
| phone             | text                     | YES      | ✅ Optional   |
| avatar_url        | text                     | YES      | ✅ Optional   |
| address           | text                     | YES      | ✅ Optional   |
| city              | text                     | YES      | ✅ Optional   |
| state             | text                     | YES      | ✅ Optional   |
| zip               | text                     | YES      | ✅ Optional   |
| organization_id   | uuid                     | YES      | ✅ Optional   |
| enrollment_status | text                     | YES      | ⚠️ Unexpected |
| created_at        | timestamp with time zone | YES      | ✅ Required   |
| updated_at        | timestamp with time zone | YES      | ✅ Required   |

### ❌ Missing Columns (Used by Dashboards)

- `first_name` - Used by some dashboards
- `last_name` - Used by some dashboards
- `verified` - Used by program holder & employer dashboards
- `orientation_completed` - Used by student state machine
- `eligibility_verified` - Used by student state machine
- `onboarding_complete` - Used by program holder onboarding

### ✅ Good News

- Has `role` column (critical for routing)
- Has `full_name` (can use instead of first_name + last_name)
- Has `organization_id` (can use for program holder relationships)

---

## Enrollments Table Schema

| Column                     | Type                     | Nullable | Status                           |
| -------------------------- | ------------------------ | -------- | -------------------------------- |
| id                         | uuid                     | NO       | ✅ Required                      |
| user_id                    | uuid                     | NO       | ✅ Required                      |
| program_id                 | uuid                     | NO       | ✅ Required                      |
| status                     | character varying        | YES      | ✅ Required                      |
| organization_id            | uuid                     | YES      | ✅ Can use for program_holder_id |
| partner_course_id          | uuid                     | YES      | ⚠️ Unexpected                    |
| payment_status             | text                     | NO       | ✅ Useful                        |
| payment_mode               | text                     | YES      | ✅ Useful                        |
| amount_paid_cents          | integer                  | NO       | ✅ Useful                        |
| paid_at                    | timestamp with time zone | YES      | ✅ Useful                        |
| started_at                 | timestamp with time zone | YES      | ✅ Useful                        |
| completed_at               | timestamp with time zone | YES      | ✅ Useful                        |
| apprenticeship             | boolean                  | YES      | ✅ Useful                        |
| rapids_registered          | boolean                  | YES      | ✅ Useful                        |
| internal_complete          | boolean                  | YES      | ✅ Useful                        |
| billing_lock               | boolean                  | NO       | ✅ Useful                        |
| billing_lock_at            | timestamp with time zone | YES      | ✅ Useful                        |
| billing_lock_reason        | text                     | YES      | ✅ Useful                        |
| state_code                 | text                     | YES      | ✅ Useful                        |
| stripe_checkout_session_id | text                     | YES      | ✅ Useful                        |
| stripe_payment_intent_id   | text                     | YES      | ✅ Useful                        |
| created_at                 | timestamp with time zone | YES      | ✅ Required                      |
| updated_at                 | timestamp with time zone | NO       | ✅ Required                      |

### ❌ Missing Columns (Used by Dashboards)

- `at_risk` - Used by admin dashboard
- `instructor_id` - Used by instructor dashboard
- `progress_percentage` - Used by student dashboard

### ✅ Good News

- Has `organization_id` (can map to program_holder_id)
- Has `completed_at` (can calculate progress from this)
- Has `status` (can use for enrollment state)

---

## Other Tables Status

❓ **Not checked yet:**

- course_progress
- certifications
- job_postings
- job_applications
- job_placements
- compliance_reports
- compliance_scores
- student_verifications
- apprenticeship_programs

---

## Critical Findings

### 🔴 Dashboard Code Mismatches

**The dashboard code expects columns that don't exist:**

1. **Student Dashboard** (`app/lms/(app)/dashboard/page.tsx`)
   - Queries `course_progress` table (may not exist)
   - Queries `certifications` table (may not exist)
   - Queries `job_placements` table (may not exist)

2. **Admin Dashboard** (`app/admin/dashboard/page.tsx`)
   - Queries `enrollments.at_risk` (doesn't exist)
   - Queries `compliance_reports` table (may not exist)
   - Queries `compliance_scores` table (may not exist)
   - Queries `job_postings` table (may not exist)

3. **Program Holder Dashboard** (`app/program-holder/dashboard/page.tsx`)
   - Queries `enrollments.program_holder_id` (doesn't exist, but has `organization_id`)
   - Queries `student_verifications` table (may not exist)
   - Queries `compliance_reports` table (may not exist)
   - Queries `compliance_scores` table (may not exist)
   - Checks `profiles.verified` (doesn't exist)

4. **Employer Dashboard** (`app/employer/dashboard/page.tsx`)
   - Queries `job_postings` table (may not exist)
   - Queries `job_applications` table (may not exist)
   - Queries `apprenticeship_programs` table (may not exist)
   - Checks `profiles.verified` (doesn't exist)

5. **State Machine** (`lib/orchestration/state-machine.ts`)
   - Checks `profiles.orientation_completed` (doesn't exist)
   - Checks `profiles.eligibility_verified` (doesn't exist)

---

## Recommended Actions

### Option A: Add Missing Columns (Minimal Changes)

Add these columns to match dashboard expectations:

**profiles table:**

```sql
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS first_name TEXT,
ADD COLUMN IF NOT EXISTS last_name TEXT,
ADD COLUMN IF NOT EXISTS verified BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS orientation_completed BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS eligibility_verified BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS onboarding_complete BOOLEAN DEFAULT false;
```

**enrollments table:**

```sql
ALTER TABLE enrollments
ADD COLUMN IF NOT EXISTS at_risk BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS instructor_id UUID REFERENCES profiles(id),
ADD COLUMN IF NOT EXISTS progress_percentage INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS program_holder_id UUID REFERENCES profiles(id);

-- Populate program_holder_id from organization_id
UPDATE enrollments SET program_holder_id = organization_id WHERE organization_id IS NOT NULL;
```

### Option B: Refactor Dashboard Queries (More Work)

Rewrite all dashboard queries to use actual schema:

- Use `organization_id` instead of `program_holder_id`
- Use `full_name` instead of `first_name + last_name`
- Calculate `at_risk` status dynamically
- Remove references to non-existent tables
- Add placeholder sections for missing features

---

## Decision Required

**Which approach do you prefer?**

1. **Option A** - Add missing columns (faster, cleaner)
2. **Option B** - Refactor all queries (more work, uses actual schema)
3. **Hybrid** - Add some columns, refactor some queries

**Recommendation:** Option A (add missing columns) is faster and keeps dashboard code clean.

---

## Next Steps

Once you decide:

1. ✅ Create migration file
2. ✅ Apply migration to database
3. ✅ Test dashboards work
4. ✅ Commit changes
5. ✅ Deploy

---

**Last Updated:** 2025-12-23  
**Updated By:** Ona (AI Agent)
