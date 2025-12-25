# Dashboard Schema Verification

**Date:** 2024-12-24  
**Status:** ⏳ AWAITING SQL RESULTS  
**SQL Script:** `scripts/verify-critical-columns.sql`

---

## Purpose

Verify that columns referenced by dashboards actually exist in the database schema.

---

## Critical Columns to Verify

### profiles table

- `role` - Used by router to determine dashboard
- `verified` - Used by admin dashboard
- `orientation_completed` - Referenced in docs
- `eligibility_verified` - Referenced in docs

### enrollments table

- `program_holder_id` - Used by program holder dashboard
- `instructor_id` - Used by instructor dashboard
- `at_risk` - Used by admin dashboard for alerts

### apprenticeship_enrollments table

- Table existence - Used by employer dashboard
- `employer_id` - Filter for employer dashboard
- `student_id` - Join to profiles
- `program_id` - Join to programs
- `status` - Display status
- `total_hours_required` - Display progress
- `total_hours_completed` - Display progress

---

## How to Run Verification

1. Open Supabase SQL Editor
2. Copy contents of `scripts/verify-critical-columns.sql`
3. Paste and run
4. Copy ALL results
5. Paste below in "Results" section

---

## Results

**⏳ PENDING - Run SQL script and paste results here**

---

## Next Steps After Results

1. For each MISSING column: decide migrate or refactor
2. Create migrations if needed
3. Update code if refactoring
4. Document decisions

---

**DO NOT proceed with dashboard implementation until this verification is complete.**
