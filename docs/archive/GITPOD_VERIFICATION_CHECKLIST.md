# Gitpod Full-Implementation Checklist

**Goal:** No skips, no placeholders, no TS syntax errors, no broken flows

## Quick Verification

Run the automated verification script:

```bash
bash scripts/gitpod-full-verify.sh
```

This script checks everything below automatically. Manual checklist follows for reference.

---

## A) One-time Gitpod Setup Checks

- [ ] Repo is on the correct branch (main or shipping branch)
- [ ] pnpm is the package manager used (not npm/yarn)
- [ ] Node version matches project expectation: `node -v`
- [ ] `.env.local` exists locally in Gitpod workspace
- [ ] `.env.local` is NOT committed (verify `.gitignore` includes it)

---

## B) "No Placeholder Data" Hard-Fail Checks

### 1) Block common placeholders

```bash
grep -RIn --exclude-dir=node_modules --exclude-dir=.next \
  -e "G-XXXXXXXXXX" -e "TODO:" -e "PLACEHOLDER" -e "mock" -e "sample" \
  -e "lorem" -e "example.com" -e "changeme" -e "YOUR_" \
  app/ components/ lib/
```

**Pass rule:** Must return 0 matches in production paths.

### 2) Block unused/temporary routes

```bash
find app -type f | grep -E "(test|dev|sandbox|tmp|debug)"
```

**Pass rule:** No test/debug routes in production.

---

## C) TypeScript + Syntax: Zero Errors Allowed

### 1) Type check

```bash
pnpm typecheck
```

**Pass rule:** Must be 0 errors. No `ignoreBuildErrors`, no `any` spam, no skipping.

### 2) Lint

```bash
pnpm lint
```

**Pass rule:** Must be 0 errors.

### 3) Format validation (optional)

```bash
pnpm format:check || true
```

---

## D) Build Must Succeed (Production Build)

```bash
pnpm build
```

**Pass rule:** Build completes successfully, no runtime import crashes.

**If build fails:**

- [ ] Copy the last 100 lines of the build log
- [ ] Fix root cause
- [ ] Re-run `pnpm build` until it passes

---

## E) Runtime Smoke Test (Local Production Run)

```bash
pnpm start
```

**Then in preview:**

- [ ] Homepage loads
- [ ] Header links work
- [ ] Programs pages load
- [ ] LMS loads course list
- [ ] Enrollment flow loads
- [ ] Micro Courses page exists and is linked in header
- [ ] No console errors in browser devtools

---

## F) Required Feature Verification (Must Click-Test)

### 1) LMS Course Coverage

- [ ] Confirm all course slugs resolve
- [ ] `getCourseBySlug` returns published courses
- [ ] Every `lms-data/courses/program-*.ts` is imported into index

```bash
node -e "const fs=require('fs');const p='lms-data/courses';const files=fs.readdirSync(p).filter(f=>f.startsWith('program-')&&f.endsWith('.ts'));console.log('Course files:',files.length);"
```

**Pass rule:** File count equals imported course count.

### 2) Payments

- [ ] Stripe checkout opens from "Enroll/Pay" (no dead buttons)
- [ ] Webhook route exists and does not crash build
- [ ] Price IDs present (no "TODO replace with real price")
- [ ] Test mode keys used in staging; live keys used in production

### 3) Email Notifications (Resend)

- [ ] `RESEND_API_KEY` present in `.env.local`
- [ ] Welcome email fires on enrollment completion (non-blocking)
- [ ] Creator approve/reject triggers email
- [ ] Payout confirmation triggers email
- [ ] Sale notification triggers email
- [ ] Admin notification triggers email

### 4) Admin Security (RBAC)

- [ ] All `/api/admin/*` endpoints enforce role checks from DB
- [ ] Non-admin user receives 403
- [ ] No "email contains admin" hacks anywhere

### 5) Search

- [ ] `/api/search` returns results (not mock results)
- [ ] Programs are returned from real data source
- [ ] Key pages list is real and matches routes

### 6) PWA: Real Implementation

- [ ] `public/manifest.json` exists
- [ ] Icons exist for all referenced sizes
- [ ] `next-pwa` or service worker is installed (not just icons)
- [ ] App is installable in browser (Chrome: Install app)

### 7) SEO

- [ ] `robots.txt` exists
- [ ] `sitemap.xml` exists and is valid
- [ ] OpenGraph tags exist on main pages
- [ ] No broken sitemap references in `robots.txt`

---

## G) "No Skipping / No Rewriting" Gitpod Rules

**Gitpod must follow these rules:**

- [ ] Do not rewrite features that already exist
- [ ] Only patch and upgrade within existing structure
- [ ] If a file already implements something, improve it instead of replacing
- [ ] All changes must be validated by rerunning:
  - `pnpm typecheck`
  - `pnpm lint`
  - `pnpm build`

---

## Gitpod Instruction Prompt

Copy/paste this as your Gitpod "autopilot" instruction:

```
Scan the repository and verify production readiness with zero skipping.

Enforce: pnpm typecheck, pnpm lint, pnpm build must pass with 0 errors.

Search and remove placeholders (G-XXXXXXXXXX, mock, sample, TODO in production files).

Verify all LMS courses program-* are imported and routable.

Verify Stripe buttons work and price IDs exist.

Verify Resend emails fire in the listed routes.

Verify RBAC on all /api/admin endpoints based on DB role.

Verify PWA is installable (service worker present), not just icons.

Verify robots/sitemap validity.

For any failure, patch within existing code structure (no rewrites), rerun checks, loop until all pass.

Output a final report listing: checks run, failures found, files changed, and proof of passing builds.
```

---

## If Anything Cannot Be Completed

Gitpod must produce a blocking list formatted like this:

```
Blocker: __________
File(s): __________
Cause: __________
Fix required: __________
Proof needed: __________
```

**No vague "needs work." Only concrete blockers.**

---

## Automated Verification

The automated script `scripts/gitpod-full-verify.sh` runs all checks above and:

- ✅ Passes with exit code 0 if all checks pass
- ⚠️ Passes with warnings if non-critical issues found
- ❌ Fails with exit code 1 if critical issues found

**Run before any deployment:**

```bash
bash scripts/gitpod-full-verify.sh
```

---

## Manual Verification Checklist

If automated script is not available, use this manual checklist:

### Environment

- [ ] Node version correct
- [ ] pnpm installed
- [ ] .env.local exists
- [ ] .env.local not in git

### Code Quality

- [ ] No placeholders in production code
- [ ] No test/debug routes
- [ ] TypeScript passes
- [ ] Lint passes
- [ ] Build succeeds

### Features

- [ ] All courses routable
- [ ] Payments functional
- [ ] Emails configured
- [ ] RBAC enforced
- [ ] Search works
- [ ] PWA installable
- [ ] SEO complete

### Security

- [ ] No exposed secrets
- [ ] Admin routes protected
- [ ] RLS policies active
- [ ] Environment validated

### Database

- [ ] Migrations present
- [ ] Schema documented
- [ ] Seed data available

---

## Success Criteria

**System is ready for deployment when:**

1. ✅ Automated verification script passes
2. ✅ Manual smoke tests pass
3. ✅ All features click-tested
4. ✅ No placeholders remain
5. ✅ Build succeeds
6. ✅ TypeScript clean
7. ✅ Lint clean
8. ✅ Security verified

**No exceptions. No "we'll fix it later."**
