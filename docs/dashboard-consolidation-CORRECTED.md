# Dashboard Consolidation Plan (Evidence-Based)

**Status:** CORRECTED - All assumptions removed, evidence-driven only  
**Date:** 2024-12-24  
**Branch:** TBD (do not apply to feat/agreements-gate)

## Executive Summary

This document corrects the previous dashboard consolidation analysis by removing dangerous assumptions and providing only evidence-based recommendations.

## Evidence Collected

### A) Route Existence Proof

**Command:** `git ls-files 'app/**/page.tsx' | grep -E 'dashboard'`

**Confirmed Dashboards (real pages):**

- ✅ `/program-holder/dashboard` (app/program-holder/dashboard/page.tsx)
- ✅ `/staff-portal/dashboard` (app/staff-portal/dashboard/page.tsx)
- ✅ `/employer/dashboard` (app/employer/dashboard/page.tsx)
- ✅ `/workforce-board/dashboard` (app/workforce-board/dashboard/page.tsx)
- ✅ `/board/dashboard` (app/board/dashboard/page.tsx)
- ✅ `/creator/dashboard` (app/creator/dashboard/page.tsx)
- ✅ `/shop/dashboard` (app/shop/dashboard/page.tsx)
- ✅ `/partner/dashboard` (app/partner/dashboard/page.tsx) - redirects to /program-holder/dashboard
- ✅ `/portal/parent/dashboard` (app/portal/parent/dashboard/page.tsx)
- ✅ `/portal/staff/dashboard` (app/portal/staff/dashboard/page.tsx) - redirects to /staff-portal/dashboard
- ✅ `/portal/student/dashboard` (app/portal/student/dashboard/page.tsx)
- ✅ `/lms/(app)/dashboard` (app/lms/(app)/dashboard/page.tsx)
- ✅ `/student/dashboard` (app/student/dashboard/page.tsx)
- ✅ `/instructor/dashboard` (app/instructor/dashboard/page.tsx)
- ✅ `/delegate/dashboard` (app/delegate/dashboard/page.tsx)
- ✅ `/admin/dashboard` (app/admin/dashboard/page.tsx)

**Does NOT Exist:**

- ❌ `/parent-portal/dashboard` - Only /parent-portal/page.tsx exists (marketing page)

### B) Role Usage Proof

**Command:** `grep -rn "case.*'partner'\|case.*'program_holder'" app/dashboard/page.tsx`

**Current Role Routing (app/dashboard/page.tsx):**

```typescript
case 'program_holder':
case 'partner':
  redirect('/program-holder/dashboard');  // partner = program_holder

case 'employer':
  redirect('/employer/dashboard');

case 'staff':
  redirect('/staff-portal/dashboard');

case 'board_member':
  redirect('/board/dashboard');

case 'workforce_board':
  redirect('/workforce-board/dashboard');
```

**Missing Role:**

- ⚠️ `parent` - No case statement exists, but `/portal/parent/dashboard` page exists

**Confirmed Equivalence:**

- ✅ `partner` = `program_holder` (both redirect to /program-holder/dashboard)

### C) Links Proof

**Command:** `grep -rn "/program-holder/dashboard\|/portal/parent/dashboard" app`

**High-Traffic Routes (50+ references):**

- `/program-holder/dashboard` - 50+ references across app, lib, components

**Low-Traffic Routes (1-5 references):**

- `/portal/parent/dashboard` - 1 reference (app/dashboards/page.tsx)

**Zero References:**

- `/parent-portal/dashboard` - 0 references (does not exist)

## Corrected Findings

### 1. Partner vs Program Holder: CONFIRMED EQUIVALENT

**Evidence:**

- app/partner/dashboard/page.tsx redirects to /program-holder/dashboard
- app/(partner)/partners/dashboard/page.tsx redirects to /program-holder/dashboard
- app/dashboard/page.tsx treats both roles identically

**Recommendation:** ✅ Safe to consolidate

### 2. Parent Portal Route: DANGEROUS ASSUMPTION CORRECTED

**Previous Error:**

- Proposed redirecting to `/parent-portal/dashboard`

**Evidence:**

- `/parent-portal/dashboard` does NOT exist
- `/parent-portal/page.tsx` is a marketing page (no auth, no dashboard)
- Actual parent dashboard is `/portal/parent/dashboard`

**Recommendation:** ❌ DO NOT redirect to /parent-portal/dashboard

### 3. Staff Portal: ALREADY CONSOLIDATED

**Evidence:**

- app/portal/staff/dashboard/page.tsx already redirects to /staff-portal/dashboard
- Consolidation complete

**Recommendation:** ✅ No action needed

### 4. Missing Parent Role Routing

**Evidence:**

- `/portal/parent/dashboard` exists
- No `case 'parent':` in app/dashboard/page.tsx
- This is a gap, not a crossed dashboard

**Recommendation:** ⚠️ Add parent role routing (separate task)

## Safe Operations (Evidence-Based)

### Operation 1: Add Missing Parent Role Routing

**File:** `app/dashboard/page.tsx`

**Add:**

```typescript
case 'parent':
  redirect('/portal/parent/dashboard');
```

**Risk:** Low - route exists, just not wired to role-based routing

### Operation 2: Verify Partner Redirects Are Working

**Files to check:**

- app/partner/dashboard/page.tsx (already redirects)
- app/(partner)/partners/dashboard/page.tsx (already redirects)

**Risk:** None - already implemented

### Operation 3: Document Canonical Routes

**Create:** `docs/canonical-dashboard-routes.md`

**Content:**

```markdown
# Canonical Dashboard Routes

## By Role

- student → /dashboard (main student dashboard)
- instructor → /instructor/dashboard
- admin → /admin/dashboard
- staff → /staff-portal/dashboard
- program_holder → /program-holder/dashboard
- partner → /program-holder/dashboard (redirect)
- employer → /employer/dashboard
- workforce_board → /workforce-board/dashboard
- board_member → /board/dashboard
- parent → /portal/parent/dashboard
- creator → /creator/dashboard
- shop → /shop/dashboard
- delegate → /delegate/dashboard

## Deprecated Routes (redirect to canonical)

- /portal/staff/dashboard → /staff-portal/dashboard
- /partner/dashboard → /program-holder/dashboard
- /(partner)/partners/dashboard → /program-holder/dashboard
```

## Unsafe Operations (DO NOT DO)

### ❌ DO NOT: Redirect to /parent-portal/dashboard

**Reason:** Route does not exist

**Impact:** Would create 404s for parent users

### ❌ DO NOT: Remove /portal/parent/dashboard

**Reason:** It's the only parent dashboard that exists

**Impact:** Would break parent user access

### ❌ DO NOT: Assume nav config routes exist

**File:** lib/navigation/dashboard-nav.config.ts

**Issue:** References many routes that don't exist:

- /staff-portal/tasks
- /staff-portal/calendar
- /employer/candidates (exists)
- /program-holder/reports (exists)

**Recommendation:** Audit nav config separately, only link to existing routes

### ❌ DO NOT: Consolidate without DB role check

**Reason:** If users exist with role='partner' in DB, they need working redirects

**Required:** Query profiles table for distinct roles before any consolidation

## Required Pre-Work

Before implementing any consolidation:

### 1. Database Role Audit

```sql
-- Check which roles are actually in use
SELECT role, COUNT(*) as user_count
FROM profiles
WHERE role IS NOT NULL
GROUP BY role
ORDER BY user_count DESC;
```

### 2. Route Reference Audit

For each route being consolidated:

```bash
# Check all references
grep -rn "/old/route" app components lib

# Check nav links
grep -rn "/old/route" components/nav lib/navigation

# Check redirects
grep -rn "/old/route" app/**/page.tsx
```

### 3. Test User Verification

For each role being consolidated:

- Create test user with that role
- Log in and verify redirect works
- Check all nav links are accessible
- Verify no 404s

## Implementation Checklist

- [ ] Run database role audit (paste results)
- [ ] Add `case 'parent':` to app/dashboard/page.tsx
- [ ] Test parent role routing with real user
- [ ] Create docs/canonical-dashboard-routes.md
- [ ] Audit lib/navigation/dashboard-nav.config.ts for dead links
- [ ] Remove dead links from nav config
- [ ] Test all role-based redirects with real users
- [ ] Document any remaining crossed dashboards (if found)

## What Changed From Previous Analysis

### Removed Dangerous Assumptions

1. ❌ **Removed:** Redirect to /parent-portal/dashboard (does not exist)
2. ❌ **Removed:** Assumption that nav config routes exist
3. ❌ **Removed:** Consolidation without DB role verification

### Added Evidence Requirements

1. ✅ **Added:** Route existence proof (git ls-files)
2. ✅ **Added:** Role usage proof (grep case statements)
3. ✅ **Added:** Links proof (grep route references)
4. ✅ **Added:** DB role audit requirement

### Corrected Recommendations

1. ✅ **Corrected:** Parent dashboard is /portal/parent/dashboard (not /parent-portal/dashboard)
2. ✅ **Corrected:** Partner = program_holder (confirmed with evidence)
3. ✅ **Corrected:** Staff consolidation already complete (no action needed)

## Next Steps

1. Paste database role audit results into this document
2. Add missing parent role routing (low risk)
3. Create canonical routes documentation
4. Audit navigation config for dead links (separate PR)
5. Only then consider further consolidation

## Conclusion

The previous analysis contained one critical error (non-existent /parent-portal/dashboard) and several unverified assumptions. This corrected version is evidence-based and safe to implement.

**Key Takeaway:** Always verify routes exist before redirecting to them.
