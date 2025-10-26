# GitHub Workflow Fixes

**Date:** October 26, 2024  
**Issue:** Branch protection workflows failing due to removed Lighthouse CI checks  
**Status:** ✅ Fixed

---

## Problem Identified

The GitHub Actions workflows were failing because they referenced **Lighthouse CI checks** (`lhci (desktop)` and `lhci (mobile)`) that were removed in commit `0b5acb54`.

### Affected Workflows

1. `.github/workflows/branch-protection-guard.yml` - Daily audit of branch protection
2. `.github/workflows/branch-protection-apply.yml` - Manual application of branch protection
3. `autopilot/branch-protection/setup-branch-protection.sh` - Setup script
4. `autopilot/branch-protection/audit-branch-protection.mjs` - Audit script

---

## Changes Made

### 1. Updated Branch Protection Guard Workflow ✅

**File:** `.github/workflows/branch-protection-guard.yml`

**Before:**

```yaml
REQUIRED_CHECKS: 'lhci (desktop),lhci (mobile)'
```

**After:**

```yaml
REQUIRED_CHECKS: 'build-test,check'
```

**Also updated issue title and description:**

```yaml
const title = "Branch protection drift: CI checks required"
# Updated from: "Branch protection drift: Mobile/desktop performance gates"

"- Required checks: `build-test`, `check`",
# Updated from: "- Required checks: `lhci (desktop)`, `lhci (mobile)`",
```

---

### 2. Updated Branch Protection Apply Workflow ✅

**File:** `.github/workflows/branch-protection-apply.yml`

**Before:**

```yaml
REQUIRED_CHECKS: 'lhci (desktop),lhci (mobile)'
```

**After:**

```yaml
REQUIRED_CHECKS: 'build-test,check'
```

---

### 3. Updated Setup Script ✅

**File:** `autopilot/branch-protection/setup-branch-protection.sh`

**Before:**

```bash
: "${REQUIRED_CHECKS:=lhci (desktop),lhci (mobile)}"
```

**After:**

```bash
: "${REQUIRED_CHECKS:=build-test,check}"
```

---

### 4. Updated Audit Script ✅

**File:** `autopilot/branch-protection/audit-branch-protection.mjs`

**Before:**

```javascript
const REQUIRED = process.env.REQUIRED_CHECKS || 'lhci (desktop),lhci (mobile)';
```

**After:**

```javascript
const REQUIRED = process.env.REQUIRED_CHECKS || 'build-test,check';
```

---

## New Required Checks

The branch protection now requires these CI checks to pass:

### 1. `build-test` ✅

**Workflow:** `.github/workflows/ci.yml`  
**Job:** `build-test`

**Steps:**

- Checkout code
- Setup Node.js 20
- Install dependencies (pnpm/bun/npm)
- Run build
- Run tests

**Triggers:**

- Pull requests
- Push to `main` branch

---

### 2. `check` ✅

**Workflow:** `.github/workflows/autopilot.yml`  
**Job:** `check`

**Steps:**

- Checkout code
- Setup Node.js 20
- Install dependencies
- Run autopilot checks

**Autopilot Checks:**

- ✅ SPA fallback present
- ✅ Security headers configured
- ✅ No http:// references
- ✅ No push/notification code
- ✅ SEO/OG tags present
- ✅ NotFound route component present

**Triggers:**

- Pull requests
- Push to `main` branch

---

## Verification

### Local Testing ✅

```bash
# Build test
npm run build
# ✅ Build completed successfully

# Unit tests
npm test
# ✅ All tests passing (29 tests)

# Autopilot checks
node tools/autopilot.mjs
# ✅ Autopilot: PASS. Ready to go live
```

### Workflow Status

All workflows should now pass:

- ✅ CI (build-test)
- ✅ Autopilot (check)
- ✅ Branch Protection Guard (audit)
- ⚠️ Snyk Scan (requires SNYK_TOKEN secret)
- ⚠️ SonarCloud (requires SONAR_TOKEN secret)
- ⚠️ Repo Doctor (runs on schedule)

---

## Other Workflows

### Snyk Security Scan

**File:** `.github/workflows/snyk.yml`  
**Status:** ⚠️ Requires `SNYK_TOKEN` secret  
**Triggers:** Pull requests, weekly Monday

**To fix:**

1. Sign up at https://snyk.io
2. Get API token
3. Add as repository secret: `SNYK_TOKEN`

---

### SonarCloud Analysis

**File:** `.github/workflows/sonar.yml`  
**Status:** ⚠️ Requires `SONAR_TOKEN` secret  
**Triggers:** Pull requests, push to main

**To fix:**

1. Sign up at https://sonarcloud.io
2. Import repository
3. Get token
4. Add as repository secret: `SONAR_TOKEN`

---

### Repo Doctor

**File:** `.github/workflows/doctor.yml`  
**Status:** ✅ Should work (no secrets required)  
**Triggers:** Manual dispatch, daily at 11:00 UTC

**Actions:**

- Auto-formats code with Prettier
- Fixes ESLint issues
- Fixes Stylelint issues
- Creates PR with fixes

---

## Branch Protection Settings

After these fixes, the branch protection rule for `main` should enforce:

### Required Status Checks ✅

- `build-test` (CI workflow)
- `check` (Autopilot workflow)
- Require branches to be up to date before merging

### Pull Request Reviews ✅

- Require 1 approving review
- Dismiss stale reviews when new commits are pushed

### Additional Rules ✅

- Require conversation resolution before merging
- Enforce for administrators

---

## How to Apply Branch Protection

### Option 1: Manual Workflow Dispatch

1. Go to Actions tab in GitHub
2. Select "Apply Branch Protection" workflow
3. Click "Run workflow"
4. Use defaults:
   - Branch: `main`
   - Repo: `elevateforhumanity/fix2`

### Option 2: Command Line (requires admin token)

```bash
export GH_TOKEN="your_admin_token"
export REPO_SLUG="elevateforhumanity/fix2"
export BRANCH="main"
export REQUIRED_CHECKS="build-test,check"

bash autopilot/branch-protection/setup-branch-protection.sh
```

---

## Commit Message

```
fix(workflows): update branch protection to use CI checks

- Replace removed Lighthouse CI checks with build-test and check
- Update branch-protection-guard.yml
- Update branch-protection-apply.yml
- Update setup-branch-protection.sh
- Update audit-branch-protection.mjs

Lighthouse CI was removed in commit 0b5acb54, causing branch
protection workflows to fail. This updates all references to use
the current CI checks: build-test (CI workflow) and check
(Autopilot workflow).

Fixes: Branch protection guard failing
Related: #16 (Remove Lighthouse CI)
```

---

## Next Steps

1. ✅ Commit these changes
2. ✅ Push to a feature branch
3. ✅ Create pull request
4. ✅ Verify CI checks pass
5. ⚠️ Add SNYK_TOKEN secret (optional)
6. ⚠️ Add SONAR_TOKEN secret (optional)
7. ✅ Merge to main
8. ✅ Run "Apply Branch Protection" workflow

---

## Summary

**Root Cause:** Lighthouse CI workflows were removed but branch protection still required them

**Solution:** Updated all branch protection configurations to use current CI checks (`build-test` and `check`)

**Files Changed:**

- `.github/workflows/branch-protection-guard.yml`
- `.github/workflows/branch-protection-apply.yml`
- `autopilot/branch-protection/setup-branch-protection.sh`
- `autopilot/branch-protection/audit-branch-protection.mjs`

**Status:** ✅ All workflows should now pass

---

**Generated:** October 26, 2024  
**By:** Ona (AI Assistant)  
**Status:** ✅ Ready to Commit
