# GITPOD ONE-SHOT PROMPT (FINAL - DO NOT MODIFY)

**Use this exact prompt. Do not negotiate. Do not skip phases.**

---

You are a senior Next.js App Router + Supabase engineer working inside THIS repository.

Your task is to consolidate all dashboards into ONE canonical dashboard per role, eliminate duplicates, preserve backward compatibility with redirects, and ensure every canonical dashboard is fully wired to the real database with no crossed dashboards, no mock data, and no placeholders.

You MUST follow the phases in order. Skipping phases or coding ahead is considered a failure.

---

## NON-NEGOTIABLE RULES

• No "coming soon", placeholders, mock data, or fake integrations
• Do NOT delete routes silently — legacy routes must redirect
• No crossed dashboards: no role may see another role's data, UI, or state
• All DB queries must use real Supabase tables and real filters
• If schema is missing, add migrations or refactor queries — never guess
• Deliver work in small commits, one phase at a time
• Inventory and verification docs are REQUIRED deliverables

---

## PHASE 0 — BASELINE LOCK (REQUIRED)

1. Create branch:
   ```
   chore/dashboard-consolidation
   ```

2. Run and record baseline:
   - install dependencies
   - build
   - lint
   - typecheck (if present)

3. Save failures (if any) to:
   ```
   docs/dashboard-consolidation-baseline.md
   ```

No feature work until this exists.

---

## PHASE 1 — CONFIRM DASHBOARD INVENTORY (NO ASSUMPTIONS)

Scan the entire repo for:
- `app/**/dashboard/page.tsx`
- dashboard layouts
- dashboard-like portals not under `/dashboard`
- navigation links pointing to dashboards

Generate or update:
```
docs/dashboard-inventory-confirmed.md
```

For EACH dashboard include:
- route
- file path
- intended role
- status (working / partial / broken / duplicate / orphan)
- DB tables queried
- auth guard present (yes/no)
- canonical or legacy

Commit this doc alone.

---

## PHASE 2 — DEFINE CANONICAL DASHBOARDS (ONE PER ROLE)

Unless Phase 1 proves otherwise, these are canonical:

• Student → `/lms/dashboard`
• Admin → `/admin/dashboard`
• Program Holder → `/program-holder/dashboard`
• Employer → `/employer/dashboard`
• Staff → `/staff-portal/dashboard`
• Instructor → `/instructor/dashboard`

Everything else must either:
A) Redirect to one of the above
B) Become a nested subpage under its canonical role
C) Be deprecated with documentation

Implement redirects for all legacy routes.

Update ALL nav components to point only to canonical routes.

---

## PHASE 3 — ROLE TAXONOMY + ROUTER FIX

1. Update `/app/dashboard/page.tsx` to route correctly for:
   - admin / super_admin / org_admin
   - staff
   - instructor
   - student
   - program_holder
   - employer
   - partner (explicit decision required)

2. Create: `docs/roles-and-dashboards.md`
   Mapping each role → canonical dashboard → auth guard

---

## PHASE 4 — DATABASE SCHEMA VERIFICATION (NO GUESSING)

Verify existence of all fields used by dashboards, including but not limited to:
- `profiles.role`
- `profiles.verified`
- `profiles.orientation_completed`
- `profiles.eligibility_verified`
- `enrollments.program_holder_id`
- `enrollments.at_risk`

If missing:
• Add migrations OR refactor queries
• Document results in:
  ```
  docs/dashboard-schema-verification.md
  ```

Include exact SQL used and outcomes.

---

## PHASE 5 — ELIMINATE DUPLICATES (ONE IMPLEMENTATION EACH)

A) **Partner vs Program Holder**

Decide explicitly:
- Same role → redirect partner → program-holder
- Different roles → implement separate dashboards with separate queries

Document decision.

B) **Admin duplicates**
- Keep `/admin/dashboard`
- Convert program-level admin dashboards into nested `/admin/programs/*`
- Remove stray admin dashboards after redirecting

C) **Staff Dashboard**
- Replace placeholders with real metrics and actions using existing tables.

D) **Instructor Dashboard**
- Implement only what schema supports (courses, students, progress).
- No fake grading systems.

E) **Orphan Dashboards**

For each (shop, creator, delegate, board, workforce-board, parent):
- Implement fully OR
- Redirect + document deprecation in:
  ```
  docs/dashboard-orphans-disposition.md
  ```

---

## PHASE 6 — PREVENT CROSSED DASHBOARDS (MANDATORY)

Refactor each dashboard into isolated modules:
```
app/<role>/dashboard/_components
app/<role>/dashboard/_queries
app/<role>/dashboard/_actions
```

Shared UI is allowed.
Shared data queries are NOT.

---

## PHASE 7 — NAV CONFIG CONSOLIDATION (RECOMMENDED)

Create per-role nav configs:
- no dead links
- role-filtered
- canonical routes only

---

## PHASE 8 — FINAL VERIFICATION (REQUIRED)

Create:
```
docs/dashboard-consolidation-verification.md
```

Must include:
- Every canonical dashboard route → renders (yes)
- Auth guard verified
- DB queries verified
- Full redirect table (legacy → canonical)
- Explicit statement of "no crossed dashboards"
- Remaining blockers with exact next actions

---

## FINAL ACCEPTANCE CRITERIA

✔ One canonical dashboard per role
✔ All duplicates redirected
✔ No broken nav links
✔ No mock data
✔ No crossed dashboards
✔ Docs complete and accurate
✔ Build + lint + typecheck pass

---

## FIRST PR MUST CONTAIN ONLY

- [ ] `docs/dashboard-consolidation-baseline.md`
- [ ] `docs/dashboard-inventory-confirmed.md`
- [ ] `docs/dashboard-schema-verification.md`

**NO CODE CHANGES. NO UI WORK. JUST PROOF.**

---

**This is the execution lock. Follow phases in order or fail.**
