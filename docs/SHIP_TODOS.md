# Ship TODOs - Execution Spine

**Branch:** `release/white-label-ship`  
**Goal:** Ship a clean, white-label, licensable platform correctly  
**Mandate:** Correctness over speed. Isolation over convenience. Completeness over "mostly done."

---

## Operating Rules

1. ✅ **Non-stop execution** - Continue phase-by-phase until completion
2. ✅ **No advancement without checklist completion** - Every item verified before moving forward
3. ✅ **White-label first** - No hardcoded branding, tenants, IDs, domains, roles
4. ✅ **No mock data, no placeholders, no "coming soon"**
5. ✅ **Server-side enforcement always** - UI checks are insufficient
6. ✅ **Backward compatibility** - Use redirects, don't break existing routes
7. ✅ **Docs are deliverables** - Not optional
8. ✅ **Document blockers** - If something cannot be completed, document clearly and proceed

---

## PHASE 0: Master TODOs

- [x] Create docs/SHIP_TODOS.md with all phases
- [ ] Commit SHIP_TODOS.md (execution spine)

**Status:** ✅ IN PROGRESS

---

## PHASE 1: Apply/Enrollment Flow Consolidation (REVENUE BLOCKER)

**Goal:** ONE Apply entry point, one decision tree, one submission per role, one correct dashboard outcome

### Requirements
- Single Apply landing page at `/apply` (white-label neutral, no role assumptions)
- Decision tree: Student | Program Holder | Employer | Staff/Instructor
- Each path: ONE form → ONE table → deterministic role + onboarding flags → correct dashboard
- No duplicate application tables
- No shared submissions across roles
- No client-side role assignment

### Checklist
- [ ] `/apply` exists and is the only public entry
- [ ] Student application → student dashboard
- [ ] Program holder application → onboarding gate → dashboard
- [ ] Employer application → verification gate → dashboard
- [ ] Staff/instructor application → admin approval gate
- [ ] Database rows show correct role + tenant
- [ ] No duplicate or legacy apply routes remain unhandled
- [ ] Create `docs/apply-flow-verification.md`
- [ ] Commit apply/enrollment flow consolidation

**Status:** ⏳ NOT STARTED

---

## PHASE 2: Dashboard Isolation & Routing Lockdown

**Goal:** Exactly one canonical dashboard per role, no crossed data, no crossed UI

### Canonical Dashboards
- Student → `/lms/dashboard`
- Admin → `/admin/dashboard`
- Program Holder → `/program-holder/dashboard`
- Employer → `/employer/dashboard`
- Staff → `/staff-portal/dashboard`
- Instructor → `/instructor/dashboard`

### Requirements
- `/dashboard` routes only by role
- All legacy dashboards redirect
- Each dashboard: own layout, own queries, own auth guard
- Shared components may NOT contain queries

### Checklist
- [ ] `/dashboard` router handles all roles
- [ ] All legacy routes redirect
- [ ] No dashboard imports another dashboard's queries
- [ ] RLS enforced on all dashboard tables
- [ ] Role access tested manually
- [ ] Create `docs/dashboard-isolation-verification.md`
- [ ] Commit dashboard isolation & routing lockdown

**Status:** ⏳ NOT STARTED

---

## PHASE 3: Multi-Tenant + White-Label Readiness

**Goal:** The system can be licensed without code changes

### Requirements
- Tenant isolation enforced in: Queries, RLS, Admin views
- Branding: Logo, Name, Primary color, Domain support
- No references to internal brand names in code

### Checklist
- [ ] Tenant ID required in all relevant tables
- [ ] No cross-tenant visibility possible
- [ ] Branding loaded dynamically
- [ ] Demo tenant exists with sanitized data
- [ ] Create `docs/white-label-readiness.md`
- [ ] Commit multi-tenant + white-label readiness

**Status:** ⏳ NOT STARTED

---

## PHASE 4: Licensing / Feature Gating (MINIMUM VIABLE)

**Goal:** You can sell licenses before fancy billing UI

### Requirements
- License states: trial, active, suspended
- Server-side enforcement
- Admin override available

### Checklist
- [ ] License state exists in DB
- [ ] Premium features gated server-side
- [ ] Suspended tenants cannot operate
- [ ] Admin can change license state
- [ ] Create `docs/licensing-verification.md`
- [ ] Commit licensing/feature gating

**Status:** ⏳ NOT STARTED

---

## PHASE 5: Compliance & Trust Basics

**Goal:** Government-safe baseline

### Requirements
- Privacy Policy
- Terms of Service
- Data retention note
- Accessibility pass on critical pages
- Audit log for admin actions

### Checklist
- [ ] Privacy Policy live and linked
- [ ] Terms of Service live and linked
- [ ] Data retention documented
- [ ] Accessibility issues addressed
- [ ] Audit logs written for sensitive actions
- [ ] RLS verified on sensitive tables
- [ ] Create `docs/compliance-readiness.md`
- [ ] Commit compliance & trust basics

**Status:** ⏳ NOT STARTED

---

## PHASE 6: Production Verification (NO SKIPPING)

**Goal:** This thing actually works in prod

### Requirements
- Smoke test on production domain
- Error logging active
- No hard 404s
- No console errors on core flows

### Checklist
- [ ] Apply → dashboard tested for all roles
- [ ] Admin core metrics load
- [ ] Logs capture failures
- [ ] No hard 404s on core flows
- [ ] No console errors on core flows
- [ ] Mobile usability acceptable
- [ ] Create `docs/production-verification.md`
- [ ] Commit production verification

**Status:** ⏳ NOT STARTED

---

## PHASE 7: Ship Package (LICENSABLE PRODUCT)

**Goal:** You can sell this

### Requirements
- White-label setup guide
- Demo script
- Deployment notes
- Final verification checklist

### Checklist
- [ ] White-label setup guide written
- [ ] Demo script created
- [ ] Deployment notes written
- [ ] Final verification checklist created
- [ ] Demo tenant works
- [ ] No internal secrets exposed
- [ ] Create `docs/SHIP_READY.md`
- [ ] Final commit - product is licensable

**Status:** ⏳ NOT STARTED

---

## Progress Tracking

| Phase | Status | Completion |
|-------|--------|------------|
| PHASE 0 | ✅ IN PROGRESS | 50% |
| PHASE 1 | ⏳ NOT STARTED | 0% |
| PHASE 2 | ⏳ NOT STARTED | 0% |
| PHASE 3 | ⏳ NOT STARTED | 0% |
| PHASE 4 | ⏳ NOT STARTED | 0% |
| PHASE 5 | ⏳ NOT STARTED | 0% |
| PHASE 6 | ⏳ NOT STARTED | 0% |
| PHASE 7 | ⏳ NOT STARTED | 0% |

**Overall:** 6% complete (1/16 phases)

---

## Blockers

None yet.

---

## Final Instruction

Work continuously through all phases.  
Do not stop at "mostly done."  
Do not skip documentation.  
Do not optimize prematurely.

If a phase reveals missing schema or logic, fix it immediately or document the blocker and proceed.

---

**Last Updated:** 2025-12-23 (PHASE 0 in progress)
