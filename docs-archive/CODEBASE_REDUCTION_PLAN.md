# Codebase Reduction Plan

**Current:** 1,745 TypeScript files, 972 pages  
**Target:** ~500 files, ~300 pages  
**Reduction:** 70% fewer files

---

## ANALYSIS

### File Distribution
- **app/api/**: 6.2MB (largest)
- **app/admin/**: 3.0MB
- **app/portal/**: 884KB
- **app/student/**: 828KB
- **app/lms/**: 764KB
- **Total pages:** 972

### Problem
Too many duplicate/similar routes creating massive build times.

---

## ELIMINATION STRATEGY

### 1. REMOVE DUPLICATE DASHBOARDS (Save ~200 files)

**Current duplicates:**
- `/portal/` + `/student/` + `/lms/` (all student dashboards)
- `/program-holder/` + `/program-holder-portal/` (duplicate)
- `/admin/` + `/admin-portal/` (duplicate)
- `/staff-portal/` + `/staff/` (duplicate)

**Action:**
```bash
# Keep only one of each
rm -rf app/portal/
rm -rf app/program-holder-portal/
rm -rf app/admin-portal/
rm -rf app/staff/
```

**Result:** Keep `/lms/`, `/program-holder/`, `/admin/`, `/staff-portal/`

---

### 2. REMOVE TEST/DEMO ROUTES (Save ~50 files)

**Remove:**
- `app/demo/`
- `app/demos/`
- `app/pwa-test/`
- `app/test-dashboard/`
- `app/diagnostic/`

**Action:**
```bash
rm -rf app/demo/ app/demos/ app/pwa-test/ app/test-dashboard/ app/diagnostic/
```

---

### 3. CONSOLIDATE SIMILAR ROUTES (Save ~150 files)

**Tax routes (4 separate routes → 1):**
- `/tax/` + `/tax-filing/` + `/tax-services/` + `/vita/` → Keep `/tax/` only

**Program routes (3 routes → 1):**
- `/programs/` + `/programs-catalog/` + `/program-finder/` → Keep `/programs/` only

**Career routes (3 routes → 1):**
- `/career-center/` + `/career-services/` + `/career-fair/` → Keep `/career-services/` only

**Action:**
```bash
rm -rf app/tax-filing/ app/tax-services/ app/vita/
rm -rf app/programs-catalog/ app/program-finder/
rm -rf app/career-center/ app/career-fair/
```

---

### 4. REMOVE NICHE BUSINESS ROUTES (Save ~100 files)

**These are specific businesses, not core platform:**
- `/supersonic-fast-cash/` (592KB)
- `/kingdom-konnect/`
- `/serene-comfort-care/`
- `/urban-build-crew/`
- `/selfish-inc/`
- `/rise-foundation/` (112KB)

**Action:**
```bash
rm -rf app/supersonic-fast-cash/
rm -rf app/kingdom-konnect/
rm -rf app/serene-comfort-care/
rm -rf app/urban-build-crew/
rm -rf app/selfish-inc/
rm -rf app/rise-foundation/
```

**Alternative:** Move to database-driven content instead of routes

---

### 5. CONSOLIDATE API ROUTES (Save ~200 files)

**Current:** 6.2MB of API routes  
**Problem:** Too many similar endpoints

**Consolidate:**
- Merge similar CRUD operations
- Use dynamic routes: `/api/[resource]/[id]` instead of separate files
- Remove duplicate webhook handlers

**Action:**
```bash
# Analyze API routes
find app/api -name "route.ts" | wc -l
# Consolidate similar patterns
```

---

### 6. REMOVE UNUSED MARKETING PAGES (Save ~100 files)

**Low-value pages:**
- `/slides/`
- `/reels/`
- `/pitch-deck/`
- `/media-showcase/`
- `/all-pages/`
- `/sites/`

**Action:**
```bash
rm -rf app/slides/ app/reels/ app/pitch-deck/ app/media-showcase/ app/all-pages/ app/sites/
```

---

### 7. CONSOLIDATE PARTNER ROUTES (Save ~50 files)

**Current:**
- `/partners/`
- `/partner/`
- `/(partner)/`
- `/partner-with-us/`
- `/partner-application/`
- `/partner-courses/`
- `/partner-playbook/`

**Action:** Keep `/partners/` only, make subpages dynamic

```bash
rm -rf app/partner-with-us/ app/partner-application/ app/partner-courses/ app/partner-playbook/
```

---

## EXECUTION SCRIPT

```bash
#!/bin/bash
set -e

echo "🗑️  Reducing codebase from 1,745 to ~500 files..."

# 1. Remove duplicate dashboards
echo "1. Removing duplicate dashboards..."
rm -rf app/portal/
rm -rf app/program-holder-portal/
rm -rf app/admin-portal/
rm -rf app/staff/

# 2. Remove test/demo routes
echo "2. Removing test/demo routes..."
rm -rf app/demo/
rm -rf app/demos/
rm -rf app/pwa-test/
rm -rf app/test-dashboard/
rm -rf app/diagnostic/

# 3. Consolidate similar routes
echo "3. Consolidating similar routes..."
rm -rf app/tax-filing/
rm -rf app/tax-services/
rm -rf app/vita/
rm -rf app/programs-catalog/
rm -rf app/program-finder/
rm -rf app/career-center/
rm -rf app/career-fair/

# 4. Remove niche business routes
echo "4. Removing niche business routes..."
rm -rf app/supersonic-fast-cash/
rm -rf app/kingdom-konnect/
rm -rf app/serene-comfort-care/
rm -rf app/urban-build-crew/
rm -rf app/selfish-inc/
rm -rf app/rise-foundation/

# 5. Remove unused marketing pages
echo "5. Removing unused marketing pages..."
rm -rf app/slides/
rm -rf app/reels/
rm -rf app/pitch-deck/
rm -rf app/media-showcase/
rm -rf app/all-pages/
rm -rf app/sites/

# 6. Consolidate partner routes
echo "6. Consolidating partner routes..."
rm -rf app/partner-with-us/
rm -rf app/partner-application/
rm -rf app/partner-courses/
rm -rf app/partner-playbook/

# Count remaining files
REMAINING=$(find app -name "*.tsx" -o -name "*.ts" | wc -l)
echo ""
echo "✅ Reduction complete!"
echo "Remaining TypeScript files: $REMAINING"
echo "Expected build time: <60 seconds"
```

---

## EXPECTED RESULTS

### Before
- **Files:** 1,745
- **Pages:** 972
- **Build time:** 3+ minutes (timeout)
- **Size:** 15MB+ in app/

### After
- **Files:** ~500 (71% reduction)
- **Pages:** ~300 (69% reduction)
- **Build time:** <60 seconds
- **Size:** ~5MB in app/

---

## WHAT TO KEEP

### Core Platform (Essential)
- `/` (homepage)
- `/about/`
- `/programs/` (consolidated)
- `/apply/`
- `/login/`, `/signup/`
- `/lms/` (student dashboard)
- `/admin/` (admin dashboard)
- `/program-holder/` (program holder dashboard)
- `/employer/` (employer dashboard)
- `/staff-portal/` (staff dashboard)
- `/api/` (consolidated)

### Legal/Compliance (Required)
- `/privacy-policy/`
- `/terms-of-service/`
- `/accessibility/`
- `/refund-policy/`

### Marketing (High-value)
- `/contact/`
- `/pricing/`
- `/blog/`

---

## MIGRATION STRATEGY

### For Removed Routes
1. **Add redirects** in `next.config.mjs`
2. **Update sitemap** to remove old URLs
3. **Update internal links**
4. **Add 301 redirects** for SEO

### Example Redirects
```javascript
async redirects() {
  return [
    { source: '/portal/:path*', destination: '/lms/:path*', permanent: true },
    { source: '/supersonic-fast-cash/:path*', destination: '/programs', permanent: true },
    { source: '/demo/:path*', destination: '/', permanent: true },
  ];
}
```

---

## RISK ASSESSMENT

### Low Risk (Safe to Remove)
- Test/demo routes
- Duplicate dashboards
- Niche business routes

### Medium Risk (Need redirects)
- Consolidated routes
- Marketing pages

### High Risk (Don't remove)
- Core dashboards
- API routes (need careful consolidation)
- Legal pages

---

## EXECUTION PLAN

1. **Backup first:** `git commit -am "Pre-reduction backup"`
2. **Run reduction script**
3. **Add redirects** to next.config.mjs
4. **Test build:** `npm run build:fast`
5. **Verify critical routes** still work
6. **Deploy**

---

## ESTIMATED TIME

- **Script execution:** 2 minutes
- **Add redirects:** 30 minutes
- **Test build:** 5 minutes
- **Verify routes:** 30 minutes
- **Total:** ~1 hour

---

**RECOMMENDATION:** Execute this reduction to get build time under 60 seconds and reach true 10/10 production readiness.
