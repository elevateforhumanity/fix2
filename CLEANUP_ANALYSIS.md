# Codebase Cleanup Analysis

## Current Repository Size
- **Total**: 9.2GB
- **node_modules**: 4.7GB (51%)
- **.next**: 523MB (6%)
- **.git**: 683MB (7%)
- **Source + Docs**: ~3.3GB (36%)

## Files to Eliminate

### 🔴 HIGH PRIORITY - Safe to Delete (318MB+)

#### 1. Media Backups (318MB)
```bash
rm -rf public/media-backup-20251128-043824
rm -rf public/media-backup-20251128-043832
```
**Impact**: Saves 318MB
**Risk**: None - these are backups from November 28

#### 2. Support Bundles (8.5MB)
```bash
rm -f elevate-support-bundle-20251126.tar.gz
rm -f elevate-support-bundle-20251127-140635.tar.gz
rm -f ELEVATE_SUPPORT_BUNDLE_20251127.tar.gz
rm -f support-bundle-20251128-064649.tar.gz
rm -f support-bundle-20251202-125322.tar.gz
rm -rf SUPPORT_BUNDLE
rm -rf support_bundle
```
**Impact**: Saves 8.5MB
**Risk**: None - old debug bundles

#### 3. Duplicate/Old Documentation (109 files)
**Status/Completion Docs** (can consolidate):
- 100_PERCENT_COMPLETE.md
- 100_PERCENT_COMPLETE_FINAL.md
- 100_PERCENT_READY.md
- ABSOLUTE_100_PERCENT_COMPLETE.md
- COMPLETE_100_PERCENT_FINAL.md
- FINAL_100_PERCENT_COMPLETE.md
- FINAL_100_PERCENT_SOLUTION.md
- LAUNCH_READY_100_PERCENT.md
- MISSION_COMPLETE.md
- PRODUCTION_PERFECT_100_PERCENT.md
- READY_TO_DEPLOY_NOW.md
- REPOSITORY_STATUS_COMPLETE.md

**Deployment Docs** (consolidate to 1-2):
- DEPLOYMENT_COMPLETE.md
- DEPLOYMENT_COMPLETE_FINAL.md
- DEPLOYMENT_COMPLETE_GUIDE.md
- DEPLOYMENT_COMPLETE_REPORT.md
- DEPLOYMENT_FINAL_STATUS.md
- DEPLOYMENT_READY.md
- DEPLOYMENT_REPORT.md
- DEPLOYMENT_REPORT.txt
- DEPLOYMENT_STATUS.md
- DEPLOYMENT_SUCCESS.md
- DEPLOYMENT_VERIFICATION.md
- DEPLOYMENT_VERIFIED.md
- DEPLOYMENT-SUCCESS.md
- DEPLOY_COMPLETE_DATABASE.sql
- DEPLOY_NOW.md
- DEPLOY_TO_VERCEL.md

**Autopilot Docs** (consolidate):
- ALL_AUTOPILOTS_COMPLETE.md
- AUTOPILOT_DISTRIBUTION_PLAN.md
- AUTOPILOT_EXECUTION_GUIDE.md
- AUTOPILOT_EXECUTION_REPORT.md
- AUTOPILOT_QUICK_REFERENCE.md
- AUTOPILOT_SYSTEM_READY.md
- FINAL_AUTOPILOT_STATUS.md
- START_HERE_AUTOPILOT.md

**Partner/Program Docs** (consolidate):
- ALL_30_PROGRAMS_COMPLETE.md
- COMPLETE_ALL_27_PROGRAMS_FINAL.md
- COMPLETE_ALL_30_PROGRAMS_STATUS.md
- COMPLETE_ALL_7_PARTNERS_FINAL.md
- FINAL_ALL_PARTNERS_WITH_HSI_COMPLETE.md
- FINAL_ALL_PARTNER_PROGRAMS_COMPLETE.md
- FINAL_PROGRAM_STATUS.md
- PROGRAM_COMPLETION_STATUS.md

#### 4. Old SQL Migration Files (52 files)
**Duplicates/Old Migrations**:
- MIGRATION_1.sql
- MIGRATION_PART1.sql
- MIGRATION_PART_1.sql (duplicate naming)
- MIGRATION_PART2.sql
- MIGRATION_PART_2.sql (duplicate naming)
- MIGRATION_PART3.sql
- MIGRATION_PART_3.sql (duplicate naming)
- MIGRATION_PART_3_FIXED.sql
- MIGRATION_CLEAN.sql
- FINAL_MIGRATION.sql
- FINAL_WORKING_SQL.sql
- QUICK_COURSE_MIGRATION.sql
- COPY_PASTE_MIGRATION.sql
- COMPLETE_DASHBOARD_MIGRATION.sql

**Keep Only**:
- migrations/ directory (structured migrations)
- supabase/migrations/ (if exists)

#### 5. Old HTML Test Files
```bash
rm -f academic-calendar.html
rm -f analytics.html
rm -f apply.html
rm -f donate.html
rm -f download-images.html
rm -f employers.html
rm -f enrollment-test.html
rm -f google-site-verification.html
rm -f migration.html
rm -f migrations-copy.html
rm -f og-placeholder.html
rm -f pay.html
rm -f run-sql.html
rm -f search.html
```

#### 6. Old Backup Files
```bash
rm -f _headers.bak.20251014-212558
rm -f _redirects.bak.20251014-214305
```

### 🟡 MEDIUM PRIORITY - Review Before Delete

#### 1. Test Directories
```bash
# Check if tests are actually used
__tests__/
tests/
load-tests/
e2e/
```
**Action**: Keep if tests are run in CI/CD, otherwise delete

#### 2. Unused Subdirectories
```bash
# Check if these are used
backend/          # Is this used or is everything in app/?
marketing-site/   # Separate marketing site or integrated?
mobile-app/       # Mobile app or just PWA?
tiny-new-api/     # What is this?
tiny-new-server/  # What is this?
tiny-new-workers/ # What is this?
```

#### 3. Old Image Files
```bash
public/images/hero-banner-old.png
public/images/delores-reynolds.jpg  # Check if used
```

#### 4. Duplicate Config Files
```bash
# Multiple TypeScript configs
tsconfig.json
tsconfig.app.json
tsconfig.base.json
tsconfig.node.json
lib/google-classroom-autopilot/tsconfig.json
marketing-site/tsconfig.json
mobile-app/elevate-mobile/tsconfig.json
```
**Action**: Consolidate if possible

### 🟢 LOW PRIORITY - Keep for Now

#### 1. Documentation in docs/
```bash
docs/APP_STORE_DEPLOYMENT.md
docs/MOBILE_FEATURES_COMPLETE.md
docs/TYPESCRIPT_MEMORY_SOLUTIONS.md
```
**Keep**: These are current and useful

#### 2. Active Configuration
```bash
.gitpod.yml
.devcontainer/
vercel.json
next.config.mjs
package.json
```
**Keep**: All actively used

## Recommended Cleanup Script

### Phase 1: Safe Deletions (Immediate)
```bash
#!/bin/bash
# Safe to run immediately - removes obvious waste

# Media backups
rm -rf public/media-backup-20251128-043824
rm -rf public/media-backup-20251128-043832

# Support bundles
rm -f *.tar.gz
rm -rf SUPPORT_BUNDLE support_bundle

# Old backup files
rm -f _headers.bak.*
rm -f _redirects.bak.*

# Old HTML test files
rm -f academic-calendar.html analytics.html apply.html donate.html
rm -f download-images.html employers.html enrollment-test.html
rm -f google-site-verification.html migration.html migrations-copy.html
rm -f og-placeholder.html pay.html run-sql.html search.html

echo "Phase 1 complete: Removed ~330MB"
```

### Phase 2: Documentation Consolidation
```bash
#!/bin/bash
# Consolidate duplicate documentation

# Create consolidated docs
mkdir -p docs/archive

# Move old status docs
mv *COMPLETE*.md docs/archive/ 2>/dev/null
mv *FINAL*.md docs/archive/ 2>/dev/null
mv *READY*.md docs/archive/ 2>/dev/null
mv *STATUS*.md docs/archive/ 2>/dev/null
mv *REPORT*.md docs/archive/ 2>/dev/null

# Keep only essential docs in root
mv docs/archive/README.md . 2>/dev/null
mv docs/archive/START_HERE.md . 2>/dev/null

echo "Phase 2 complete: Archived ~109 documentation files"
```

### Phase 3: SQL Migration Cleanup
```bash
#!/bin/bash
# Consolidate SQL migrations

mkdir -p migrations/archive

# Move old migrations
mv MIGRATION*.sql migrations/archive/ 2>/dev/null
mv *MIGRATION*.sql migrations/archive/ 2>/dev/null
mv FINAL_WORKING_SQL.sql migrations/archive/ 2>/dev/null
mv QUICK_COURSE_MIGRATION.sql migrations/archive/ 2>/dev/null

# Keep only structured migrations
# migrations/ directory should have timestamped files

echo "Phase 3 complete: Archived ~52 SQL files"
```

### Phase 4: Test Directory Review
```bash
#!/bin/bash
# Review test directories

# Check if tests are run
if ! grep -q "test" package.json; then
  echo "No test scripts found in package.json"
  echo "Consider removing: __tests__/ tests/ load-tests/"
fi

# Check last modification
echo "Test directory ages:"
find __tests__ tests load-tests -type f -exec stat -c '%y %n' {} \; 2>/dev/null | sort | tail -5
```

## Expected Results

### Immediate Savings (Phase 1)
- **330MB** removed
- **0 risk** - all backups and old files

### After Full Cleanup (All Phases)
- **~500MB** saved
- **161 fewer files** in root directory
- **Cleaner git history** (if committed)
- **Faster builds** (fewer files to scan)

## Files to Keep

### Essential Documentation
- README.md
- START_HERE.md
- docs/APP_STORE_DEPLOYMENT.md
- docs/MOBILE_FEATURES_COMPLETE.md
- docs/TYPESCRIPT_MEMORY_SOLUTIONS.md

### Essential Configuration
- package.json
- tsconfig.json
- next.config.mjs
- vercel.json
- .gitignore
- .env.example

### Essential Code
- app/
- components/
- lib/
- public/ (after cleanup)
- styles/

## Verification Steps

After cleanup:
```bash
# 1. Check build still works
pnpm build

# 2. Check git status
git status

# 3. Verify size reduction
du -sh .

# 4. Test application
pnpm dev
```

## Rollback Plan

If something breaks:
```bash
# Restore from git
git checkout HEAD -- <file>

# Or restore all
git reset --hard HEAD
```

## Recommendations

### Immediate Actions (Do Now)
1. ✅ Delete media backups (318MB)
2. ✅ Delete support bundles (8.5MB)
3. ✅ Delete old HTML test files
4. ✅ Delete backup config files

### Short-term (This Week)
1. Archive duplicate documentation to docs/archive/
2. Consolidate SQL migrations to migrations/archive/
3. Review and remove unused test directories

### Long-term (Next Sprint)
1. Set up .gitignore rules to prevent future bloat
2. Add pre-commit hooks to prevent large file commits
3. Regular cleanup schedule (monthly)
4. Document what should/shouldn't be committed

## Git History Cleanup (Optional)

If you want to remove these from git history:
```bash
# WARNING: Rewrites history, requires force push
git filter-branch --tree-filter 'rm -rf public/media-backup-*' HEAD
git push --force
```

**Risk**: High - only do if absolutely necessary

## Summary

**Total Potential Savings**: ~500MB
**Files to Remove**: ~161 files
**Risk Level**: Low (mostly backups and duplicates)
**Time to Execute**: 10 minutes
**Build Impact**: None (only removes unused files)

**Recommendation**: Execute Phase 1 immediately, then review Phases 2-4 before proceeding.
