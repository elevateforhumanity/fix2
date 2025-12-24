# Dashboard Routing & Documentation - Reviewer Checklist

**Purpose:** Acceptance criteria for dashboard routing and documentation PRs  
**Date:** 2024-12-24  
**Applies to:** PRs modifying dashboard routing, navigation, or architecture

---

## A) Routing Correctness

### Role-Based Redirects
- [ ] `/dashboard` redirects `admin` → `/admin/dashboard`
- [ ] `/dashboard` redirects `super_admin` → `/admin/dashboard`
- [ ] `/dashboard` redirects `org_admin` → `/admin/dashboard`
- [ ] `/dashboard` redirects `staff` → `/staff-portal/dashboard`
- [ ] `/dashboard` redirects `instructor` → `/instructor/dashboard`
- [ ] `/dashboard` redirects `student` → `/lms/dashboard`
- [ ] `/dashboard` redirects unknown roles → `/lms/dashboard` (default)

### Route Existence
- [ ] Every redirect destination exists as a real page in `app/`
- [ ] No redirect points to a non-existent route
- [ ] No redirect points to a placeholder/coming-soon page

### Role Taxonomy
- [ ] No role is routed to another role's dashboard
- [ ] "Partner" handling is explicit and documented (not silently mapped)
- [ ] Roles with 0 users are not routed (or explicitly documented why)

---

## B) Auth Safety

### Server-Side Enforcement
- [ ] Unauthenticated users cannot reach `/dashboard` content
- [ ] Unauthenticated users redirect to `/login?next=/dashboard`
- [ ] All role checks happen server-side (no client-side role gating)

### Profile Handling
- [ ] Missing profile behavior is explicit (redirect to `/onboarding` or error page)
- [ ] Profile fetch errors are handled gracefully
- [ ] No role leakage (student cannot access admin dashboard, etc.)

### Session Management
- [ ] Auth checks use `createClient()` from server utils
- [ ] No auth tokens exposed to client
- [ ] Session expiry handled correctly

---

## C) Regression Safety

### Build & Lint
- [ ] `npm run build` passes (or failures are pre-existing and documented)
- [ ] `npm run lint` passes (or failures are pre-existing and documented)
- [ ] `npm run typecheck` passes (if applicable)
- [ ] No new TypeScript errors introduced

### Existing Functionality
- [ ] No changes to routes outside of `/dashboard`
- [ ] No changes to navigation components (unless explicitly scoped)
- [ ] No changes to auth logic (unless explicitly scoped)
- [ ] No drive-by refactors or unrelated fixes

### Data Safety
- [ ] No schema changes (unless explicitly scoped and migrated)
- [ ] No data migrations (unless explicitly scoped and tested)
- [ ] No changes to RLS policies (unless explicitly scoped)

---

## D) Documentation Integrity

### Docs-Only PRs
- [ ] Docs PR contains NO runtime code changes
- [ ] Docs do not claim routes exist unless proven
- [ ] SQL verification scripts are marked diagnostic-only
- [ ] No placeholder content ("coming soon", "TBD", etc.)

### Evidence-Based Claims
- [ ] Route inventory matches actual files in `app/`
- [ ] Role counts match database reality (if claimed)
- [ ] Schema assumptions are verified (not assumed)
- [ ] Enum checks are optional (TEXT columns may not have enums)

### Architecture Analysis
- [ ] Recommendations are clearly marked as analysis (not implementation)
- [ ] Consolidation proposals are not implemented without approval
- [ ] Risk assessments are specific and actionable

---

## E) Commit Discipline

### Branch Scope
- [ ] Router fix branch contains ONLY router changes
- [ ] Docs branch contains ONLY documentation
- [ ] No mixed concerns in a single branch

### Commit Messages
- [ ] Commits follow conventional format: `type(scope): description`
- [ ] Each commit is atomic and reversible
- [ ] Commit messages explain "why" not just "what"

### PR Size
- [ ] Router fix PR is small (1-2 files changed)
- [ ] Docs PR is separate from code changes
- [ ] No "mega PRs" combining multiple concerns

---

## F) Merge Blockers (DO NOT MERGE IF)

### Critical Issues
- [ ] ❌ Any redirect destination does not exist
- [ ] ❌ Partner role is silently mapped without documentation
- [ ] ❌ Navigation links to non-existent routes
- [ ] ❌ Schema assumptions are unverified
- [ ] ❌ Build/lint failures are introduced (not pre-existing)

### Scope Violations
- [ ] ❌ Router fix PR includes navigation refactors
- [ ] ❌ Docs PR includes code changes
- [ ] ❌ New dashboards are created without approval
- [ ] ❌ Consolidation is implemented without scoped approval

### Evidence Gaps
- [ ] ❌ Route inventory does not match actual files
- [ ] ❌ Role counts are claimed without database proof
- [ ] ❌ Enum checks assume enums exist (may be TEXT)

---

## G) Manual Testing Checklist

### Role-Based Access
Test each role by logging in as that user:

- [ ] Admin user → lands on `/admin/dashboard`
- [ ] Staff user → lands on `/staff-portal/dashboard`
- [ ] Instructor user → lands on `/instructor/dashboard`
- [ ] Student user → lands on `/lms/dashboard`

### Edge Cases
- [ ] Unauthenticated user → redirects to `/login`
- [ ] User with no profile → redirects to `/onboarding`
- [ ] User with unknown role → defaults to `/lms/dashboard`
- [ ] User with null role → handled gracefully

### Navigation
- [ ] All nav links work (no 404s)
- [ ] Breadcrumbs are correct
- [ ] Back button works as expected

---

## H) Approval Criteria

### Required Approvals
- [ ] Code owner approval (if applicable)
- [ ] Security review (if auth changes)
- [ ] Database review (if schema changes)

### Documentation
- [ ] README updated (if user-facing changes)
- [ ] Migration guide provided (if breaking changes)
- [ ] Rollback plan documented (if high-risk)

---

## I) Post-Merge Verification

### Deployment
- [ ] Changes deployed to staging first
- [ ] Smoke tests pass in staging
- [ ] No errors in application logs
- [ ] No increase in error rates

### Monitoring
- [ ] Dashboard access metrics reviewed
- [ ] Auth failure rates reviewed
- [ ] 404 rates reviewed (no increase)

---

## Sign-Off

**Reviewer:** _____________  
**Date:** _____________  
**PR Number:** _____________  

**Checklist Complete:** [ ] Yes [ ] No  
**Approved for Merge:** [ ] Yes [ ] No  

**Notes:**
