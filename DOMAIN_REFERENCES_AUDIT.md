# DOMAIN REFERENCES AUDIT
**Generated:** $(date)
**Status:** 🔍 COMPLETE SCAN

---

## 🎯 DOMAINS FOUND

### 1. Durable.co References ❌ REMOVE

#### Documentation Files (20+ references):
```
./docs/reports/DEPLOYMENT_SUMMARY.md
./docs/reports/FINAL_DEPLOYMENT_CHECKLIST.md
./docs/reports/ENVIRONMENT_VERIFICATION_COMPLETE.md
./docs/reports/USE_DURABLE_AI_ASSISTANT.md
./docs/reports/INTELLIGENT_ALTERNATIVES_SUMMARY.md
./docs/reports/START_HERE_AUTOPILOT.md
./docs/reports/INJECT_ENROLLMENT_NOW.md
./docs/reports/DEPLOY_NOW_MANUAL.md
./docs/reports/ALTERNATIVE_APPROACHES.md
./docs/reports/GITPOD_AUTOPILOT_INTEGRATION_PLAN.md
./docs/reports/INFRASTRUCTURE_AUDIT_COMPLETE.md
./docs/reports/BROKEN_LINKS_FIXED_REPORT.md
./docs/reports/START_HERE.md
./docs/reports/QUICK_DEPLOY.md
./docs/setup/SOCIAL_MEDIA_MONETIZATION_SETUP.md
./docs/setup/ZERO_MAINTENANCE_DURABLE_SETUP.md
./docs/guides/SOCIAL_MEDIA_MONETIZATION_SETUP.md
./docs/guides/ZERO_MAINTENANCE_DURABLE_SETUP.md
```

**References:**
- `https://durable.co/login`
- `https://durable.co/dashboard`
- `https://api.durable.co/v1/blogs/elevateforhumanity/posts`
- `https://elevateforhumanity.durable.co`
- `https://elevateforhumanity.durable.co/blog`
- `support@durable.co`

**Action:** ❌ DELETE all Durable.co documentation files

#### Script Files:
```
./scripts/social-media-automation.js
```

**References:**
- `blogUrl: 'https://elevateforhumanity.durable.co/blog'`

**Action:** ❌ REMOVE or UPDATE to new blog URL

---

### 2. Localhost References ✅ KEEP (Development)

#### Test Configuration:
```
./playwright.config.ts
  - baseURL: 'http://localhost:5173'  ✅ KEEP (testing)
  - url: 'http://localhost:5173'      ✅ KEEP (testing)
```

#### Development Scripts:
```
./scripts/setup-social-oauth.js
  - http://localhost:${PORT}/oauth/*  ✅ KEEP (OAuth dev)
  
./scripts/utilities/backend-api.js
  - http://localhost:3000             ✅ KEEP (backend dev)
  - 0.0.0.0                           ✅ KEEP (server binding)
```

**Status:** ✅ These are development URLs - KEEP

---

### 3. elevateforhumanity.org References ✅ KEEP (Production)

#### Configuration Files:
```
./.integration-config.json
  - "zone": "elevateforhumanity.org"  ✅ KEEP (Cloudflare zone)
```

#### Scripts:
```
./ssg.config.js
  - EMAIL: 'info@elevateforhumanity.org'  ✅ KEEP (contact email)

./scripts/auto-generate-all-pages.js
  - www.elevateforhumanity.org            ✅ KEEP (production domain)

./scripts/social-media-automation.js
  - https://elevateforhumanity.org        ✅ KEEP (CTA link)

./scripts/puppeteer-extract-css.js
  - https://www.elevateforhumanity.org    ✅ KEEP (scraping target)

./scripts/performance-optimizer.js
  - https://elevateforhumanity.org        ✅ KEEP (production URLs)
```

**Status:** ✅ These are production URLs - KEEP

---

### 4. Netlify References ⚠️ REVIEW

#### Configuration:
```
./.integration-config.json
  - "url": "https://elevateproduction.netlify.app"
  - "site": "https://elevateproduction.netlify.app"
  - "api": "https://elevateproduction.netlify.app/api"
  - "functions": "https://elevateproduction.netlify.app/.netlify/functions"
```

**Status:** ⚠️ REVIEW - Is this the correct Netlify site?

#### Documentation:
```
./ANALYTICS_SETUP.md
  - https://elevateforhumanityfix.netlify.app

./docs/reports/BRIDGE_FEED_ACTIVATION.md
  - https://elevateforhumanityfix2.netlify.app
```

**Status:** ⚠️ REVIEW - Multiple Netlify sites referenced

**Questions:**
1. Which is the primary Netlify site?
2. Are old sites still active?
3. Should we consolidate to one site?

---

## 📊 SUMMARY

### Domains by Category:

#### ❌ REMOVE (Durable.co):
- **Count:** 20+ references
- **Files:** Documentation, scripts
- **Action:** Delete files or update references

#### ✅ KEEP (Development):
- **Count:** 10+ references
- **Files:** Test configs, dev scripts
- **Action:** No changes needed

#### ✅ KEEP (Production):
- **Count:** 10+ references
- **Files:** Scripts, configs
- **Action:** No changes needed

#### ⚠️ REVIEW (Netlify):
- **Count:** 5+ references
- **Files:** Configs, docs
- **Action:** Verify correct site, consolidate

---

## 🚀 CLEANUP ACTIONS

### Phase 1: Remove Durable.co Documentation ❌
```bash
# Delete all Durable.co related docs
rm -f docs/reports/USE_DURABLE_AI_ASSISTANT.md
rm -f docs/reports/DEPLOY_NOW_MANUAL.md
rm -f docs/setup/ZERO_MAINTENANCE_DURABLE_SETUP.md
rm -f docs/guides/ZERO_MAINTENANCE_DURABLE_SETUP.md
# ... (all Durable.co docs)
```

### Phase 2: Update Scripts ⚠️
```bash
# Update social-media-automation.js
# Change: blogUrl: 'https://elevateforhumanity.durable.co/blog'
# To:     blogUrl: 'https://elevateforhumanity.org/blog'
```

### Phase 3: Verify Netlify Configuration ⚠️
```bash
# Check which Netlify site is active
# Update .integration-config.json if needed
# Consolidate to single Netlify site
```

### Phase 4: Search for Remaining References
```bash
# Final check for any Durable.co references
grep -r "durable\.co" . --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" --include="*.json" --include="*.toml" --include="*.md" | grep -v node_modules | grep -v dist
```

---

## 🎯 NETLIFY SITE CLARIFICATION NEEDED

### Sites Found:
1. `elevateproduction.netlify.app` (in .integration-config.json)
2. `elevateforhumanityfix.netlify.app` (in ANALYTICS_SETUP.md)
3. `elevateforhumanityfix2.netlify.app` (in docs/reports/)

### Questions:
1. **Which is the primary production site?**
2. **Are the other sites still active?**
3. **Should we consolidate to one site?**
4. **Is the custom domain (elevateforhumanity.org) configured?**

### Recommended Action:
1. Verify which Netlify site is currently deployed
2. Update all references to use the primary site
3. Delete or archive old Netlify sites
4. Ensure custom domain is properly configured

---

## 📋 VERIFICATION CHECKLIST

After cleanup:

### ✅ No Durable.co References:
```bash
grep -r "durable\.co" . --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" | grep -v node_modules | grep -v dist
# Should return nothing
```

### ✅ Localhost Only in Dev Files:
```bash
grep -r "localhost" . --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" | grep -v node_modules | grep -v dist | grep -v "test" | grep -v "playwright"
# Should only show dev/test files
```

### ✅ Production Domain Correct:
```bash
grep -r "elevateforhumanity\.org" . --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" | grep -v node_modules | grep -v dist
# Should show production references only
```

### ✅ Single Netlify Site:
```bash
grep -r "netlify\.app" . --include="*.json" --include="*.toml" | grep -v node_modules
# Should show only one Netlify site
```

---

## 🔧 ENVIRONMENT VARIABLES

### Current (from .env.example):
```bash
# Check what domains are in environment variables
cat .env.example | grep -E "URL|DOMAIN|HOST"
```

### Verify:
1. No Durable.co URLs in environment variables
2. Correct Netlify site URL
3. Correct production domain
4. Correct API endpoints

---

## 📈 IMPACT ASSESSMENT

### Low Risk:
- ✅ Removing Durable.co documentation
- ✅ Keeping localhost references
- ✅ Keeping production domain references

### Medium Risk:
- ⚠️ Updating script URLs
- ⚠️ Consolidating Netlify sites

### High Risk:
- ❌ Changing production domain
- ❌ Modifying API endpoints

---

## 🎯 RECOMMENDED PRIORITY

### Priority 1 (Do Now):
1. Remove all Durable.co documentation files
2. Update social-media-automation.js blog URL
3. Verify no Durable.co references in source code

### Priority 2 (Review):
1. Clarify which Netlify site is primary
2. Update .integration-config.json if needed
3. Consolidate Netlify site references

### Priority 3 (Later):
1. Audit environment variables
2. Update any remaining old URLs
3. Document correct domain structure

---

**AUTOPILOT STATUS:** READY TO EXECUTE (Priority 1)
**MANUAL REVIEW NEEDED:** Netlify site clarification
**ESTIMATED TIME:** 15 minutes (Priority 1 only)
**RISK LEVEL:** LOW (documentation cleanup)
