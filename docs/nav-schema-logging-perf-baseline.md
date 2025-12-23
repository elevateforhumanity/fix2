# Navigation, Schema, Logging & Performance Baseline

**Date:** 2025-12-23  
**Purpose:** Baseline before implementing role-based navigation, schema fixes, logging, and performance optimization

---

## Build Status

### Build Command

```bash
npm run build
```

**Status:** ❌ FAILS (expected - missing env vars)

**Errors:**

- `supabaseUrl is required` - Missing NEXT_PUBLIC_SUPABASE_URL
- `Neither apiKey nor config.authenticator provided` - Missing API keys
- Stripe keys missing (non-blocking for dashboards)

**Impact:** Cannot run full build without environment variables, but this is expected in dev environment.

**Action:** Build will work in production with proper env vars. Not blocking for navigation work.

---

## Lint Status

### Lint Command

```bash
npm run lint
```

**Status:** ✅ PASSES (warnings only)

**Warnings:** 30+ warnings, mostly:

- Empty components not self-closing
- Unused eslint-disable directives
- Missing rel="noreferrer" on external links

**Impact:** None - these are style warnings, not errors.

---

## TypeScript Status

**Status:** ⚠️ NOT RUN (build required)

**Action:** Will verify after navigation components are created.

---

## Canonical Dashboard Routes

### Verified Routes

| Role               | Route                       | Status    | Layout                              | Navigation           |
| ------------------ | --------------------------- | --------- | ----------------------------------- | -------------------- |
| **Program Holder** | `/program-holder/dashboard` | ✅ Exists | `app/program-holder/layout.tsx`     | ❌ Missing           |
| **Employer**       | `/employer/dashboard`       | ✅ Exists | `app/employer/dashboard/layout.tsx` | ❌ Missing           |
| **Staff**          | `/staff-portal/dashboard`   | ✅ Exists | `app/staff-portal/layout.tsx`       | ❌ Missing           |
| **Instructor**     | `/instructor/dashboard`     | ✅ Exists | `app/instructor/layout.tsx`         | ❌ Missing           |
| **Student**        | `/lms/dashboard`            | ✅ Exists | `app/lms/(app)/layout.tsx`          | ✅ Has LMSNavigation |
| **Admin**          | `/admin/dashboard`          | ✅ Exists | `app/admin/layout.tsx`              | ✅ Has AdminNav      |

### Priority Order (Based on License Sales)

1. **Program Holder** - PRIORITY 1 (license sales, partnerships)
2. **Employer** - PRIORITY 2 (hiring partnerships, job postings)
3. **Staff** - PRIORITY 3 (operations, student support)
4. **Instructor** - PRIORITY 4 (course delivery)

---

## Current Navigation Components

### Existing

- ✅ `components/AdminNav.tsx` - Admin sidebar navigation
- ✅ `components/lms/LMSNavigation.tsx` - Student top navigation

### Missing (To Create)

- ❌ `ProgramHolderNav` - Program holder sidebar/navigation
- ❌ `EmployerNav` - Employer sidebar/navigation
- ❌ `StaffNav` - Staff portal sidebar/navigation
- ❌ `InstructorNav` - Instructor sidebar/navigation

---

## Database Schema Status

### Tables Verified to Exist

- ✅ `profiles`
- ✅ `enrollments`
- ✅ `programs`
- ✅ `courses`

### Tables Status Unknown (Need Verification)

- ❓ `course_progress`
- ❓ `certifications`
- ❓ `job_postings`
- ❓ `job_applications`
- ❓ `job_placements`
- ❓ `compliance_reports`
- ❓ `compliance_scores`
- ❓ `student_verifications`
- ❓ `apprenticeship_programs`

**Action:** Will verify these tables exist before creating migrations.

### Schema Changes Already Applied

- ✅ Migration `20251223_dashboard_schema_fixes.sql` applied
- ✅ Added columns to `profiles`: verified, orientation_completed, etc.
- ✅ Added columns to `enrollments`: program_holder_id, at_risk, instructor_id, progress_percentage

---

## Performance Baseline

### Not Yet Measured

- ⏳ Lighthouse scores (will run after navigation components added)
- ⏳ Bundle size
- ⏳ Image optimization status
- ⏳ Client vs Server component ratio

**Action:** Will measure after Phase 1 (navigation) is complete.

---

## Monitoring & Logging Status

### Current State

- ❌ No structured logging wrapper
- ❌ No request tracing
- ❌ No error monitoring integration
- ⚠️ Some console.log statements scattered in code

### Sentry/Error Monitoring

- ⚠️ Sentry config files exist but status unknown
- Files: `sentry.client.config.ts`, `sentry.server.config.ts`, `sentry.edge.config.ts`

**Action:** Will create `lib/logger.ts` wrapper and integrate with existing Sentry if configured.

---

## Pages Required by Navigation

### Program Holder Dashboard

**Existing:**

- ✅ `/program-holder/dashboard` - Main dashboard

**Needed for Nav:**

- ❓ `/program-holder/students` - Student list/management
- ❓ `/program-holder/compliance` - Compliance tracking
- ❓ `/program-holder/documents` - MOUs, documents
- ❓ `/program-holder/settings` - Profile/settings

**Action:** Will verify these routes exist or create minimal implementations.

### Employer Dashboard

**Existing:**

- ✅ `/employer/dashboard` - Main dashboard

**Needed for Nav:**

- ❓ `/employer/jobs` - Job postings list
- ❓ `/employer/applications` - Application management
- ❓ `/employer/apprenticeships` - Apprenticeship programs
- ❓ `/employer/company` - Company profile

**Action:** Will verify these routes exist or create minimal implementations.

### Staff Portal

**Existing:**

- ✅ `/staff-portal/dashboard` - Main dashboard (rebuilt)

**Needed for Nav:**

- ❓ `/staff-portal/students` - Student oversight
- ❓ `/staff-portal/partners` - Program holder oversight
- ❓ `/staff-portal/reports` - Reports/compliance
- ❓ `/staff-portal/tasks` - Task queue

**Action:** Will verify these routes exist or create minimal implementations.

### Instructor Dashboard

**Existing:**

- ✅ `/instructor/dashboard` - Main dashboard

**Needed for Nav:**

- ❓ `/instructor/courses` - Course list
- ❓ `/instructor/students` - Student progress
- ❓ `/instructor/grading` - Assessments/grading
- ❓ `/instructor/messages` - Communication

**Action:** Will verify these routes exist or create minimal implementations.

---

## Implementation Plan

### Phase 1: Navigation Components (This Week)

1. Create `ProgramHolderNav` component
2. Create `EmployerNav` component
3. Create `StaffNav` component
4. Create `InstructorNav` component
5. Integrate into respective layouts
6. Create minimal pages for nav links that don't exist

### Phase 2: Schema Verification (This Week)

1. Run SQL queries to verify table existence
2. Create migrations ONLY for verified missing tables
3. Add RLS policies
4. Document all changes

### Phase 3: Monitoring & Logging (Next Week)

1. Create `lib/logger.ts` wrapper
2. Add logging to critical flows
3. Integrate with Sentry if configured
4. Document logging strategy

### Phase 4: Performance Optimization (Next Week)

1. Audit image usage
2. Optimize client/server components
3. Run Lighthouse on all dashboards
4. Document improvements

---

## Success Criteria

### Navigation

- [ ] All 4 role-based nav components created
- [ ] All nav links work (no 404s)
- [ ] Active route highlighting works
- [ ] Mobile-responsive
- [ ] Role guards prevent unauthorized access

### Schema

- [ ] All required tables verified to exist
- [ ] Migrations created only for genuinely missing tables
- [ ] RLS policies in place
- [ ] No queries fail due to missing columns

### Logging

- [ ] Structured logger wrapper created
- [ ] Critical flows instrumented
- [ ] No PII/secrets in logs
- [ ] Error monitoring integrated

### Performance

- [ ] Lighthouse scores documented
- [ ] Images optimized with next/image
- [ ] Client components minimized
- [ ] Bundle size acceptable

---

## Risks & Mitigation

### Risk 1: Missing Tables

**Mitigation:** Verify before creating migrations. Use existing tables where possible.

### Risk 2: Breaking Existing Dashboards

**Mitigation:** Test each dashboard after nav integration. Keep changes isolated.

### Risk 3: Performance Regression

**Mitigation:** Measure before/after. Lazy load nav components if needed.

### Risk 4: Over-Engineering

**Mitigation:** Create only what's needed for active features. No speculative work.

---

## Next Steps

1. ✅ Baseline documented
2. ⏭️ Create ProgramHolderNav (PRIORITY 1)
3. ⏭️ Create EmployerNav (PRIORITY 2)
4. ⏭️ Create StaffNav (PRIORITY 3)
5. ⏭️ Create InstructorNav (PRIORITY 4)
6. ⏭️ Verify database schema
7. ⏭️ Add logging wrapper
8. ⏭️ Performance optimization

---

**Status:** 📋 BASELINE COMPLETE  
**Ready for:** Phase 1 - Navigation Components
