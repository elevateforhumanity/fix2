# 🏥 HEALTH CHECK GUIDE

## Quick Start

```bash
# Basic health check (lint, type-check, tests, build)
./scripts/run-full-healthcheck.sh

# With Lighthouse performance testing
# (requires dev server running on localhost:3000)
./scripts/run-full-healthcheck.sh . http://localhost:3000
```

---

## What Gets Checked

### 1️⃣ ESLint (Code Quality)
**What it does:** Catches bad imports, unused variables, React hook misuse, etc.
**Script:** `npm run lint`
**Status:** ✅ Configured

### 2️⃣ TypeScript Type-Check
**What it does:** Ensures no type errors across .ts/.tsx files
**Script:** `npm run typecheck`
**Status:** ✅ Configured

### 3️⃣ Unit Tests
**What it does:** Jest/Vitest component & logic tests
**Script:** `npm run test`
**Status:** ✅ Configured (Vitest)

### 4️⃣ E2E Tests
**What it does:** Playwright/Cypress full user flows
**Script:** `npm run test:e2e`
**Status:** ⏭️ Skipped (not configured yet)

### 5️⃣ Next.js Build
**What it does:** Compiles app, checks for broken imports, invalid server components, route issues
**Script:** `npm run build`
**Status:** ✅ Configured

### 6️⃣ Lighthouse (Optional)
**What it does:** Performance, accessibility, SEO scoring
**Requires:** Dev server running
**Status:** ✅ Available

---

## Running Individual Checks

```bash
# Just lint
npm run lint

# Just type-check
npm run typecheck

# Just tests
npm run test

# Just build
npm run build
```

---

## Lighthouse Performance Testing

### Step 1: Start dev server
```bash
npm run dev
```

### Step 2: Run health check with Lighthouse
```bash
# In another terminal
./scripts/run-full-healthcheck.sh . http://localhost:3000
```

### What Lighthouse Checks
- ⚡ Performance score
- ♿ Accessibility score
- 🔍 SEO score
- 📱 Mobile-friendliness
- 🎨 Best practices

---

## CI/CD Integration

### GitHub Actions
Add to `.github/workflows/health-check.yml`:

```yaml
name: Health Check
on: [push, pull_request]
jobs:
  health-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: ./scripts/run-full-healthcheck.sh
```

### Gitpod
Already works! Just run:
```bash
./scripts/run-full-healthcheck.sh
```

---

## Interpreting Results

### ✅ All Checks Pass
Your site is production-ready!

### ⚠️ Warnings
Non-critical issues. Review and fix when possible.

### ❌ Errors
Critical issues that need fixing before deployment.

---

## Common Issues & Fixes

### ESLint Errors
**Issue:** `Unexpected lexical declaration in case block`
**Fix:** Wrap case blocks in curly braces:
```typescript
case 'example': {
  const variable = 'value';
  break;
}
```

### TypeScript Errors
**Issue:** Type mismatches
**Fix:** Check types in the reported files

### Build Errors
**Issue:** Import errors, missing dependencies
**Fix:** Check the error message and fix imports

---

## Current Status

### Configured Scripts
- ✅ `npm run lint` - ESLint
- ✅ `npm run typecheck` - TypeScript
- ✅ `npm run test` - Vitest
- ✅ `npm run build` - Next.js build
- ⏭️ `npm run test:e2e` - Not configured

### Known Issues
- Some ESLint warnings in case blocks (non-critical)
- No E2E tests configured yet

---

## Next Steps

### Immediate
1. Run health check before each deployment
2. Fix ESLint warnings in API routes
3. Monitor build times

### Short-term
1. Add E2E tests with Playwright
2. Set up GitHub Actions
3. Add pre-commit hooks

### Long-term
1. Automated performance monitoring
2. Visual regression testing
3. Load testing

---

## Support

**Documentation:** This file
**Health Report:** `SITE_HEALTH_REPORT.md`
**Deployment Status:** `DEPLOYMENT_STATUS.md`

**Questions?** Check the health report or run:
```bash
./scripts/run-full-healthcheck.sh --help
```

---

**Last Updated:** November 26, 2024
