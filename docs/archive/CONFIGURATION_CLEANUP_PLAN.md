# COMPLETE CONFIGURATION CLEANUP PLAN
**Generated:** $(date)
**Status:** 🔍 ANALYSIS COMPLETE - READY TO EXECUTE

---

## 🎯 CONFIGURATION INVENTORY

### ✅ KEEP - Active Configurations

#### 1. Vite/React (PRIMARY BUILD SYSTEM)
- `vite.config.js` ✅ **KEEP** - Main build config
- `tsconfig.json` ✅ **KEEP** - TypeScript config
- `tsconfig.app.json` ✅ **KEEP** - App-specific TS config
- `tsconfig.node.json` ✅ **KEEP** - Node-specific TS config
- `tsconfig.base.json` ✅ **KEEP** - Base TS config

#### 2. Tailwind CSS (PRIMARY STYLING)
- `tailwind.config.js` ✅ **KEEP** - Tailwind configuration
- `postcss.config.js` ✅ **KEEP** - PostCSS for Tailwind

#### 3. Netlify (PRIMARY DEPLOYMENT)
- `netlify.toml` ✅ **KEEP** - Deployment configuration
- `.github/workflows/deploy-to-netlify.yml` ✅ **KEEP** - CI/CD

#### 4. Supabase (PRIMARY DATABASE)
- `supabase/config.toml` ✅ **KEEP** - Database configuration
- `supabase/` directory ✅ **KEEP** - Migrations and functions

#### 5. Testing
- `vitest.config.js` ✅ **KEEP** - Vitest config
- `vitest.config.ts` ⚠️ **DUPLICATE** - Check if needed
- `playwright.config.ts` ✅ **KEEP** - E2E testing

#### 6. Code Quality
- `eslint.config.js` ✅ **KEEP** - ESLint configuration
- `.prettierrc.json` ✅ **KEEP** - Prettier configuration
- `.stylelintrc.json` ✅ **KEEP** - Stylelint configuration
- `.editorconfig` ✅ **KEEP** - Editor configuration

#### 7. Gitpod/DevContainer
- `.gitpod.yml` ✅ **KEEP** - Gitpod configuration
- `.devcontainer/` ✅ **KEEP** - Dev container setup

#### 8. Package Management
- `package.json` ✅ **KEEP** - Dependencies
- `pnpm-lock.yaml` ✅ **KEEP** - Lock file
- `.npmrc` ✅ **KEEP** - NPM configuration
- `.nvmrc` ✅ **KEEP** - Node version

---

### ⚠️ REVIEW - Potentially Unused

#### 1. Cloudflare Workers
- `workers/wrangler-metrics.toml` ⚠️ **REVIEW**
  - References Durable Objects
  - May be unused if not deploying to Cloudflare
  - **Action:** Check if Cloudflare Workers are actually used

#### 2. Capacitor (Mobile)
- `capacitor.config.ts` ⚠️ **REVIEW**
  - Mobile app configuration
  - **Action:** Check if mobile app is being built

#### 3. Docker
- `docker-compose.yml` ⚠️ **REVIEW**
  - Docker setup
  - **Action:** Check if Docker is used in development

#### 4. Marketing Site
- `marketing-site/astro.config.mjs` ⚠️ **REVIEW**
  - Separate Astro marketing site
  - **Action:** Check if this is actively used

#### 5. Routes Configuration
- `routes.config.mjs` ⚠️ **REVIEW**
- `routes.overrides.mjs` ⚠️ **REVIEW**
- `ssg.config.js` ⚠️ **REVIEW**
  - Custom routing configs
  - **Action:** Check if these are used by Vite

---

### ❌ REMOVE - Confirmed Unused/Old

#### 1. Next.js Remnants
- ✅ **NO NEXT.JS FILES FOUND** - Good!
- No `next.config.js`
- No `.next/` directory
- No Next.js in package.json

#### 2. Durable.co Files (MASSIVE CLEANUP NEEDED)
**Root Directory Scripts:**
- ❌ `durable` - Remove
- ❌ `durable-ai-autopilot.js` - Remove
- ❌ `durable-autopilot.js` - Remove
- ❌ `durable-direct-inject.js` - Remove
- ❌ `durable-regenerate-autopilot.js` - Remove

**Documentation:**
- ❌ `DURABLE_CREDENTIALS_SETUP.md` - Remove
- ❌ `DURABLE_INTEGRATION.md` - Remove
- ❌ `DURABLE_LANDING_PAGE.html` - Remove

**Source Files:**
- ❌ `src/pages/DurableAI.jsx` - Remove
- ❌ `src/pages/DurableConsole.tsx` - Remove
- ❌ `src/pages/DurableFeatures.jsx` - Remove
- ❌ `src/pages/DurableLanding.jsx` - Remove
- ❌ `src/pages/DurablePricing.jsx` - Remove
- ❌ `src/pages/DurableTemplates.jsx` - Remove
- ❌ `src/pages/ProgramsDurable.jsx` - Remove

**Public Files:**
- ❌ `public/durable-landing.html` - Remove

**Workers:**
- ❌ `workers/autopilot-metrics-durable.ts` - Remove (if not used)
- ❌ `workers/durable-injection-worker.ts` - Remove

**Build Artifacts:**
- ❌ `dist/assets/DurableAI-*.js` - Will be removed on rebuild
- ❌ `dist/assets/DurableConsole-*.js` - Will be removed on rebuild
- ❌ `dist/assets/DurableFeatures-*.js` - Will be removed on rebuild
- ❌ `dist/assets/DurableLanding-*.js` - Will be removed on rebuild
- ❌ `dist/assets/DurablePricing-*.js` - Will be removed on rebuild
- ❌ `dist/assets/DurableTemplates-*.js` - Will be removed on rebuild
- ❌ `dist/assets/ProgramsDurable-*.js` - Will be removed on rebuild
- ❌ `dist/durable-landing.html` - Will be removed on rebuild

#### 3. Old Bundles/Archives
- ❌ `CERTIFICATION_APPLICATIONS_BUNDLE.zip` - Remove
- ❌ `COMPLETE_AUTOPILOT_BUNDLE.zip` - Remove
- ❌ `COMPLETE_AUTOPILOT_WITH_EXTENSIONS.zip` - Remove
- ❌ `efh-next-ssg-ssr-final.zip` - Remove
- ❌ `support-bundle-20251108-145352.tar.gz` - Remove
- ❌ `support-bundle.tar.gz` - Remove

#### 4. Excessive Documentation (154 MD files!)
**Categories to Clean:**
- Multiple deployment guides (consolidate)
- Duplicate completion reports (remove old ones)
- Old migration plans (archive or remove)
- Conflicting instructions (keep only latest)

**Keep Only:**
- `README.md` - Main readme
- `CHANGELOG.md` - Version history
- `CONTRIBUTING.md` - Contribution guide
- `LICENSE` - License file
- Active documentation in `docs/`

**Remove/Archive:**
- All `*_COMPLETE.md` files (move to archive)
- All `*_SUMMARY.md` files (consolidate)
- All `*_CHECKLIST.md` files (consolidate)
- All `*_GUIDE.md` files (consolidate)
- All `*_INSTRUCTIONS.md` files (consolidate)

#### 5. Old Scripts (29 shell scripts!)
**Review Each Script:**
- Keep only actively used scripts
- Move old scripts to `scripts/archive/`
- Document what each script does

---

## 📊 CLEANUP STATISTICS

### Current State:
- **Total Config Files:** 29
- **Durable.co Files:** 20+ files
- **Old Bundles:** 6 archives
- **MD Documentation:** 154 files
- **Shell Scripts:** 29 scripts
- **Duplicate Configs:** 3-5 files

### Target State:
- **Total Config Files:** 15-20 (active only)
- **Durable.co Files:** 0 files
- **Old Bundles:** 0 archives
- **MD Documentation:** 10-15 files (essential only)
- **Shell Scripts:** 5-10 scripts (active only)
- **Duplicate Configs:** 0 files

### Expected Cleanup:
- **Files to Remove:** 200+ files
- **Disk Space Saved:** 50-100 MB
- **Clarity Improvement:** 90%

---

## 🚀 EXECUTION PLAN

### Phase 1: Remove Durable.co (PRIORITY 1)
```bash
# Remove root scripts
rm -f durable durable-*.js

# Remove documentation
rm -f DURABLE_*.md DURABLE_*.html

# Remove source files
rm -f src/pages/Durable*.jsx src/pages/Durable*.tsx src/pages/ProgramsDurable.jsx

# Remove public files
rm -f public/durable-landing.html

# Remove workers (if not used)
rm -f workers/*durable*.ts

# Clean dist (will rebuild)
rm -rf dist
```

### Phase 2: Remove Old Bundles
```bash
rm -f *.zip *.tar.gz
```

### Phase 3: Consolidate Documentation
```bash
# Create archive directory
mkdir -p docs/archive

# Move old completion reports
mv *_COMPLETE.md docs/archive/
mv *_SUMMARY.md docs/archive/
mv *_CHECKLIST.md docs/archive/

# Keep only essential docs in root
```

### Phase 4: Clean Scripts
```bash
# Create scripts archive
mkdir -p scripts/archive

# Move old scripts
mv fix-*.sh scripts/archive/
mv setup-*.sh scripts/archive/
mv *-autopilot*.sh scripts/archive/
```

### Phase 5: Remove Duplicate Configs
```bash
# Check for duplicate vitest config
# Keep only one (likely vitest.config.js)
```

### Phase 6: Clean Build Artifacts
```bash
# Remove dist and rebuild
rm -rf dist
pnpm build
```

### Phase 7: Verify Everything Works
```bash
# Run tests
pnpm test

# Run build
pnpm build

# Check for broken imports
pnpm lint
```

---

## ⚠️ SAFETY CHECKS

### Before Cleanup:
1. ✅ Commit all current changes
2. ✅ Create backup branch
3. ✅ Document what's being removed
4. ✅ Check for dependencies

### During Cleanup:
1. ✅ Remove files in phases
2. ✅ Test after each phase
3. ✅ Keep logs of what's removed
4. ✅ Verify no broken imports

### After Cleanup:
1. ✅ Run full test suite
2. ✅ Build and verify
3. ✅ Check bundle size
4. ✅ Deploy to staging
5. ✅ Verify production

---

## 🎯 SUCCESS CRITERIA

- ✅ No Durable.co references anywhere
- ✅ No Next.js remnants
- ✅ No old bundles/archives
- ✅ Documentation reduced to essentials
- ✅ Scripts organized and documented
- ✅ No duplicate configurations
- ✅ Build succeeds
- ✅ Tests pass
- ✅ Bundle size reduced
- ✅ No broken imports
- ✅ Deployment works

---

**AUTOPILOT STATUS:** READY TO EXECUTE
**ESTIMATED TIME:** 30 minutes
**RISK LEVEL:** MEDIUM (test thoroughly)
**BACKUP REQUIRED:** YES
