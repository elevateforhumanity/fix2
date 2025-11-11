# COMPLETE REPOSITORY INVENTORY
**Generated:** $(date)
**Purpose:** Line-by-line cleanup of ALL old builds, caches, styling, configs

---

## 🎯 CLEANUP TARGETS

### 1. STYLING FILES (7 files found)
```
./docs/jsdoc/styles/jsdoc-default.css          [DOCS - KEEP]
./docs/jsdoc/styles/prettify-jsdoc.css         [DOCS - KEEP]
./docs/jsdoc/styles/prettify-tomorrow.css      [DOCS - KEEP]
./extracted-styles/main-stylesheet.css         [⚠️ EXTRACTED - CHECK IF USED]
./public/styles.css                            [⚠️ CHECK IF USED]
./src/styles/docebo.css                        [⚠️ OLD LMS - LIKELY REMOVE]
./src/styles/hero-banner.css                   [⚠️ CHECK IF USED]
```

### 2. CONFIGURATION FILES (29 files found)
```
./.github/ISSUE_TEMPLATE/bug_report.yml        [KEEP]
./.github/dependabot.yml                       [KEEP]
./.github/workflows/archive/autopilot-auto-push.yml     [ARCHIVE - REVIEW]
./.github/workflows/archive/autopilot-phase3-selfheal.yml [ARCHIVE - REVIEW]
./.github/workflows/archive/autopilot-workers-cron.yml  [ARCHIVE - REVIEW]
./.github/workflows/ci.yml                     [KEEP]
./.github/workflows/deploy-production.yml      [KEEP]
./.github/workflows/deploy-to-netlify.yml      [KEEP]
./.gitpod.yml                                  [KEEP]
./capacitor.config.ts                          [⚠️ MOBILE - CHECK IF USED]
./docker-compose.yml                           [⚠️ CHECK IF USED]
./docs/components/component-postcss.config.js  [DOCS - KEEP]
./docs/components/component-tailwind.config.js [DOCS - KEEP]
./docs/components/component-vite.config.js     [DOCS - KEEP]
./docs/components/component-vitest.config.js   [DOCS - KEEP]
./eslint.config.js                             [KEEP]
./marketing-site/astro.config.mjs              [⚠️ MARKETING - CHECK IF USED]
./netlify.toml                                 [KEEP - PRIMARY DEPLOY]
./playwright.config.ts                         [KEEP - TESTING]
./postcss.config.js                            [KEEP - TAILWIND]
./routes.config.mjs                            [⚠️ CHECK IF USED]
./ssg.config.js                                [⚠️ CHECK IF USED]
./supabase/config.toml                         [KEEP - DATABASE]
./tailwind.config.js                           [KEEP - PRIMARY STYLING]
./vite.config.js                               [KEEP - PRIMARY BUILD]
./vitest.config.js                             [KEEP - TESTING]
./vitest.config.ts                             [⚠️ DUPLICATE - CHECK]
./workers/wrangler-metrics.toml                [⚠️ CLOUDFLARE - CHECK IF USED]
```

### 3. BUILD ARTIFACTS & CACHES
```
./dist/                                        [BUILD OUTPUT - REGENERATE]
./node_modules/                                [DEPENDENCIES - KEEP]
./.pnpm-store/                                 [PNPM CACHE - KEEP]
./support-bundle-20251108-145352.tar.gz        [⚠️ OLD BUNDLE - REMOVE]
./support-bundle.tar.gz                        [⚠️ OLD BUNDLE - REMOVE]
./CERTIFICATION_APPLICATIONS_BUNDLE.zip        [⚠️ OLD BUNDLE - REMOVE]
./COMPLETE_AUTOPILOT_BUNDLE.zip                [⚠️ OLD BUNDLE - REMOVE]
./COMPLETE_AUTOPILOT_WITH_EXTENSIONS.zip       [⚠️ OLD BUNDLE - REMOVE]
./efh-next-ssg-ssr-final.zip                   [⚠️ OLD BUNDLE - REMOVE]
```

### 4. OLD DOCUMENTATION FILES (100+ MD files)
**Status:** MASSIVE CLEANUP NEEDED
- Multiple deployment guides
- Duplicate completion reports
- Old migration plans
- Conflicting instructions

### 5. OLD SCRIPTS (50+ shell scripts)
**Status:** NEEDS AUDIT
- Autopilot scripts
- Fix scripts
- Deployment scripts
- Setup scripts

### 6. DURABLE.CO REMNANTS
```
./durable                                      [⚠️ REMOVE]
./durable-ai-autopilot.js                      [⚠️ REMOVE]
./durable-autopilot.js                         [⚠️ REMOVE]
./durable-direct-inject.js                     [⚠️ REMOVE]
./durable-regenerate-autopilot.js              [⚠️ REMOVE]
./DURABLE_CREDENTIALS_SETUP.md                 [⚠️ REMOVE]
./DURABLE_INTEGRATION.md                       [⚠️ REMOVE]
./DURABLE_LANDING_PAGE.html                    [⚠️ REMOVE]
```

### 7. NEXT.JS REMNANTS
**Status:** CHECKING...

---

## 📋 NEXT STEPS
1. Check each CSS file for actual usage
2. Identify duplicate configurations
3. Remove ALL Durable.co files
4. Remove old bundles and archives
5. Consolidate documentation
6. Audit and remove unused scripts
7. Clean build caches
8. Verify no Next.js remnants
9. Test build after cleanup
10. Document what was removed

---

**AUTOPILOT MODE:** ACTIVE
**MANUAL INTERVENTION:** NONE - Full automation
