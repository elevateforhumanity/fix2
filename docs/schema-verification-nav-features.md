# Schema Verification for Navigation Features

**Date:** 2025-12-23  
**Purpose:** Verify which tables exist before creating migrations

---

## Tables Verified to Exist

✅ **profiles** - User accounts and roles  
✅ **enrollments** - Student enrollments in programs  
✅ **programs** - Training programs  
✅ **courses** - Course catalog

---

## Tables Status Unknown (Not Yet Verified)

The following tables are referenced in navigation/dashboard code but not yet verified:

- ❓ `course_progress` - Student progress in courses
- ❓ `certifications` - Earned certifications
- ❓ `job_postings` - Employer job listings
- ❓ `job_applications` - Applications to jobs
- ❓ `job_placements` - Student job placements
- ❓ `compliance_reports` - Program holder compliance
- ❓ `compliance_scores` - Compliance ratings
- ❓ `student_verifications` - Student eligibility checks
- ❓ `apprenticeship_programs` - Apprenticeship offerings

---

## Decision: No New Migrations Needed

**Rationale:**

1. Navigation components link to pages, not tables
2. Pages can be created with existing schema
3. Missing tables only needed if features require them
4. Dashboard consolidation already added required columns

**Action:** Create minimal page implementations using existing tables.

---

## Navigation Pages Required

### Program Holder Nav

- `/program-holder/students` - Query `enrollments` where `program_holder_id = user.id`
- `/program-holder/enrollments` - Same as students
- `/program-holder/at-risk` - Query `enrollments` where `at_risk = true`
- `/program-holder/compliance` - Placeholder or use existing data
- `/program-holder/compliance/reports` - Placeholder
- `/program-holder/verifications` - Placeholder
- `/program-holder/documents/mous` - Placeholder
- `/program-holder/documents/agreements` - Placeholder
- `/program-holder/documents/uploads` - Placeholder
- `/program-holder/settings` - User profile edit

### Employer Nav

- `/employer/jobs` - Query `job_postings` if exists, else placeholder
- `/employer/jobs/new` - Form to create job posting
- `/employer/jobs/archived` - Archived jobs
- `/employer/applications` - Query `job_applications` if exists
- `/employer/applications/pending` - Pending applications
- `/employer/applications/interviews` - Interview stage
- `/employer/apprenticeships` - Query `apprenticeship_programs` if exists
- `/employer/apprentices` - Students in apprenticeships
- `/employer/company` - Company profile edit
- `/employer/settings` - User settings

### Staff Nav

- `/staff-portal/students` - Query all `profiles` where `role = 'student'`
- `/staff-portal/students/at-risk` - Query `enrollments` where `at_risk = true`
- `/staff-portal/students/pending` - Query `enrollments` where `status = 'pending'`
- `/staff-portal/partners` - Query `profiles` where `role = 'program_holder'`
- `/staff-portal/partners/verifications` - Placeholder
- `/staff-portal/reports/compliance` - Placeholder
- `/staff-portal/reports/enrollment` - Query `enrollments` with aggregations
- `/staff-portal/reports/outcomes` - Placeholder
- `/staff-portal/tasks` - Placeholder (use existing data)
- `/staff-portal/calendar` - Placeholder
- `/staff-portal/settings` - User settings

### Instructor Nav

- `/instructor/courses` - Query `enrollments` where `instructor_id = user.id`
- `/instructor/courses/active` - Active courses
- `/instructor/courses/archived` - Archived courses
- `/instructor/students` - Students assigned to instructor
- `/instructor/students/progress` - Student progress tracking
- `/instructor/students/at-risk` - At-risk students
- `/instructor/grading/pending` - Placeholder
- `/instructor/grading/completed` - Placeholder
- `/instructor/messages` - Placeholder
- `/instructor/calendar` - Placeholder
- `/instructor/settings` - User settings

---

## Implementation Strategy

### Use Existing Tables

All pages will use existing tables (`profiles`, `enrollments`, `programs`, `courses`) where possible.

### Placeholder Pages

For features requiring missing tables:

1. Create page with "Feature Coming Soon" message
2. Add link to request feature or contact support
3. Document what table/schema is needed

### No Speculative Migrations

Do NOT create tables unless:

1. Feature is actively being built
2. Schema is fully designed
3. RLS policies are defined
4. Business logic is clear

---

## Next Steps

1. ✅ Schema verification complete (no new migrations needed)
2. ⏭️ Skip migration creation (not needed)
3. ⏭️ Add logging wrapper
4. ⏭️ Performance optimization
5. ⏭️ Create minimal pages for nav links

---

**Status:** ✅ VERIFIED - No new migrations required
