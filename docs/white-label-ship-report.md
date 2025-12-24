# White-Label Shipping Report

**Branch:** `release/white-label-ship`  
**Date Started:** 2025-12-23  
**Goal:** Ship a clean, white-label, licensable platform with tenant isolation

---

## PHASE 0: Baseline

### Environment
- **Node:** v20.19.6
- **NPM:** 10.8.2

### Build Status
✅ **PASSED** - 882 routes compiled successfully

```
○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses generateStaticParams)
ƒ  (Dynamic)  server-rendered on demand

Next.js build complete
```

### Lint Status
✅ **PASSED** - 0 errors, 158 warnings (approved technical debt)

```
✖ 158 problems (0 errors, 158 warnings)
  0 errors and 141 warnings potentially fixable with the `--fix` option.
```

**Note:** Warnings are `no-useless-catch` in mock/legacy code - approved as technical debt

### TypeCheck Status
⚠️ **208 errors** (baseline - documented in `docs/typecheck-status.md`)

```
lib/payments.ts(449,7): error TS2578: Unused '@ts-expect-error' directive.
lib/payments.ts(548,13): error TS2578: Unused '@ts-expect-error' directive.
lib/payments.ts(553,13): error TS2578: Unused '@ts-expect-error' directive.
```

**Baseline established:** Build passes, lint passes, typecheck has known errors

---

## PHASE 1: Tenant Model (Database First)

**Status:** ⏳ IN PROGRESS

### Goals
1. Create `tenants` table
2. Create `tenant_domains` table
3. Add `tenant_id` to all business tables
4. Backfill existing rows to default tenant
5. Enable RLS with tenant isolation policies
6. Add NOT NULL constraints

### Tables Requiring tenant_id
- [ ] `profiles`
- [ ] `enrollments`
- [ ] `programs`
- [ ] `courses` (if exists)
- [ ] `course_progress`
- [ ] `certifications`
- [ ] `job_postings`
- [ ] `job_applications`
- [ ] `job_placements`
- [ ] `compliance_reports`
- [ ] `compliance_scores`
- [ ] `student_verifications`

### Migrations Created
- [ ] `supabase/migrations/YYYYMMDD_tenants_table.sql`
- [ ] `supabase/migrations/YYYYMMDD_tenant_domains.sql`
- [ ] `supabase/migrations/YYYYMMDD_add_tenant_id_columns.sql`
- [ ] `supabase/migrations/YYYYMMDD_backfill_default_tenant.sql`
- [ ] `supabase/migrations/YYYYMMDD_tenant_rls_policies.sql`

### SQL Proofs
- [ ] `scripts/verify-tenant-schema.sql` created
- [ ] All tables have `tenant_id` column
- [ ] All tables have RLS enabled
- [ ] Sample queries demonstrate isolation

---

## PHASE 2: Tenant Resolution

**Status:** ⏳ NOT STARTED

### Goals
1. Implement `lib/tenant/resolveTenant.ts`
2. Create `getTenantOrThrow()` helper
3. Create tenant-not-found page
4. Document domain patterns

### Resolution Order
1. Custom domain match (`tenant_domains.domain`)
2. Subdomain match (`{tenant}.maindomain.com`)
3. Query param fallback (dev only)
4. Hard fail if not resolvable

---

## PHASE 3: White-Label Branding

**Status:** ⏳ NOT STARTED

### Goals
1. Add `tenant_branding` table
2. Implement `BrandProvider`
3. Replace hardcoded branding
4. Audit for brand leaks

### Files to Update
- [ ] Header/footer components
- [ ] Metadata (title, description)
- [ ] Login/signup pages
- [ ] Email templates
- [ ] PDF templates

---

## PHASE 4: License + Feature Gating

**Status:** ⏳ NOT STARTED

### Goals
1. Add `licenses` table
2. Implement `requireActiveLicense()` guard
3. Document gated features

### License States
- `trialing` - Time-limited access
- `active` - Full access
- `suspended` - Read-only or blocked

---

## PHASE 5: Dashboard Consolidation

**Status:** ⏳ NOT STARTED

### Canonical Dashboards
- `/lms/dashboard` (student)
- `/admin/dashboard` (admin)
- `/program-holder/dashboard` (program holder)
- `/employer/dashboard` (employer)
- `/staff-portal/dashboard` (staff)
- `/instructor/dashboard` (instructor)

### Legacy Redirects
- `/student/dashboard` → `/lms/dashboard`
- `/portal/student/dashboard` → `/lms/dashboard`
- `/portal/staff/dashboard` → `/staff-portal/dashboard`
- `/programs/admin/dashboard` → `/admin/dashboard`

### Tenant Isolation Verification
- [ ] All dashboard queries include `tenant_id` filter
- [ ] No crossed dashboards
- [ ] Role guards enforce tenant scope

---

## PHASE 6: Navigation Cleanup

**Status:** ⏳ NOT STARTED

### Goals
- Verify `lib/navigation/dashboard-nav.config.ts` has no dead links
- Remove deprecated path references

---

## PHASE 7: Verification Proof

**Status:** ⏳ NOT STARTED

### Deliverables
- [ ] `scripts/verify-no-tenant-leaks.sql`
- [ ] All verification scripts pass
- [ ] No crossed dashboards
- [ ] No brand leaks

---

## Final Acceptance Criteria

- [ ] `npm run build` passes
- [ ] `npm run lint` passes (0 errors)
- [ ] `npm run typecheck` passes (or baseline maintained)
- [ ] Tenant resolution works
- [ ] Tenant branding works
- [ ] License gating enforced server-side
- [ ] Dashboards are canonical with redirects
- [ ] Tenant isolation proven by RLS
- [ ] This report is complete and accurate

---

## Remaining Blockers

None yet - PHASE 0 complete

---

## Commit History

1. ✅ `chore: baseline + report scaffold` (PHASE 0)
2. ⏳ `feat: multi-tenant schema + RLS isolation` (PHASE 1)
3. ⏳ `feat: tenant resolution + hard fail safety` (PHASE 2)
4. ⏳ `feat: tenant-driven branding system` (PHASE 3)
5. ⏳ `feat: license enforcement (server-side)` (PHASE 4)
6. ⏳ `feat: canonical dashboards + redirects + tenant/role isolation` (PHASE 5)
7. ⏳ `chore: role nav config + dead-link removal` (PHASE 6)
8. ⏳ `docs: verification proof + final report` (PHASE 7)

---

**Last Updated:** 2025-12-23 (PHASE 0 complete)
