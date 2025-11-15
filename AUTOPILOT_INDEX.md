# Elevate Autopilot System - Complete Index

## 🤖 Overview

The Elevate for Humanity LMS includes a comprehensive 4-autopilot system that automatically maintains deployment health, environment configuration, code quality, and production readiness.

**Status**: ✅ Active  
**Version**: 1.0  
**Last Updated**: 2025-01-15

---

## 📋 Quick Start

### First Time Setup (5 minutes)

1. **Add GitHub Secrets** (Settings → Secrets and variables → Actions):
   - `NETLIFY_AUTH_TOKEN` - From Netlify dashboard
   - `NETLIFY_SITE_ID` - From Netlify site settings
   - `SUPABASE_ANON_KEY` - From Supabase dashboard
   - `SUPABASE_SERVICE_ROLE_KEY` - From Supabase dashboard

2. **Run Initial Validation**:
   ```bash
   # Via GitHub CLI
   gh workflow run autopilot-secrets-validator.yml
   ```

3. **Sync Environment to Netlify**:
   ```bash
   gh workflow run autopilot-netlify-guardian.yml
   ```

4. **Verify Deployment Target**:
   ```bash
   gh workflow run autopilot-deployment-bouncer.yml
   ```

---

## 🎯 The Four Autopilots

### 1. Netlify Environment Guardian 🛡️

**File**: `.github/workflows/autopilot-netlify-guardian.yml`  
**Purpose**: Keeps Netlify environment variables correct and synced

**What it does**:
- ✅ Validates GitHub Secrets exist
- ✅ Reads current Netlify environment variables
- ✅ Fixes incorrect or missing variables
- ✅ Triggers Netlify redeploy when needed
- ✅ Never invents secret values

**When to run**:
- After adding/updating GitHub Secrets
- When site shows "Internal Server Error"
- After Supabase project changes
- Anytime environment seems misconfigured

**Trigger**:
```bash
gh workflow run autopilot-netlify-guardian.yml
# Or with force redeploy:
gh workflow run autopilot-netlify-guardian.yml -f force_redeploy=true
```

**Expected outcome**: All 7 environment variables correct in Netlify

---

### 2. GitHub Secrets Validator 🔐

**File**: `.github/workflows/autopilot-secrets-validator.yml`  
**Purpose**: Validates required GitHub Secrets are present

**What it does**:
- ✅ Checks all 4 required secrets exist
- ✅ Provides clear instructions for missing secrets
- ✅ Validates Supabase URL in repo config
- ✅ Runs automatically nightly

**When to run**:
- Automatically runs nightly at 2 AM UTC
- After fresh clone/fork
- When setting up new environment
- Before running other autopilots

**Trigger**:
```bash
gh workflow run autopilot-secrets-validator.yml
```

**Expected outcome**: All 4 secrets validated or clear instructions provided

---

### 3. Deployment Target Bouncer 🚫

**File**: `.github/workflows/autopilot-deployment-bouncer.yml`  
**Purpose**: Ensures only Netlify is configured as deployment target

**What it does**:
- ✅ Detects Vercel configuration files
- ✅ Checks for unauthorized deployment configs
- ✅ Validates .gitignore includes deployment artifacts
- ✅ Confirms Netlify is primary deployment

**When to run**:
- Automatically on pull requests
- After removing Vercel integration
- When cleaning up deployment configs
- Before major releases

**Trigger**:
```bash
gh workflow run autopilot-deployment-bouncer.yml
```

**Expected outcome**: No Vercel configs detected, Netlify confirmed as primary

---

### 4. Page Completeness Auditor 📄

**File**: `.github/workflows/autopilot-fix-pages.yml`  
**Purpose**: Audits and fixes incomplete pages, routing issues, placeholder content

**What it does**:
- ✅ Scans for skeleton loaders
- ✅ Detects mock/placeholder data
- ✅ Finds TODO/FIXME markers
- ✅ Identifies localhost/Vercel URLs
- ✅ Checks for missing images
- ✅ Optionally auto-commits fixes

**When to run**:
- Before major releases
- After adding new pages
- When preparing for student onboarding
- When cleaning up codebase

**Trigger**:
```bash
# Audit only (no commits):
gh workflow run autopilot-fix-pages.yml

# With auto-commit:
gh workflow run autopilot-fix-pages.yml -f auto_commit=true
```

**Expected outcome**: Audit report with actionable findings

---

### 5. Supabase Schema Guardian 🗄️

**File**: `.github/workflows/autopilot-supabase-schema.yml`  
**Script**: `scripts/autopilot-supabase-schema.mjs`  
**Purpose**: Generates SQL stubs for tables/functions used in code

**What it does**:
- ✅ Scans codebase for `.from('table')` usage
- ✅ Detects `.rpc('function')` calls
- ✅ Generates SQL CREATE TABLE stubs
- ✅ Generates RPC function stubs
- ✅ Includes RLS policy templates
- ✅ Tracks which files use which tables

**When to run**:
- After adding new Supabase queries
- Before database migrations
- When documenting schema
- When onboarding new developers

**Trigger**:
```bash
# Generate stubs (download as artifact):
gh workflow run autopilot-supabase-schema.yml

# Generate and commit:
gh workflow run autopilot-supabase-schema.yml -f auto_commit=true
```

**Expected outcome**: SQL files in `supabase/autopilot-migrations/`

---

### 6. Student & Partner Readiness Tester 🎓

**File**: `.github/workflows/autopilot-readiness.yml`  
**Script**: `scripts/readiness-check.mjs`  
**Purpose**: Tests production site as if a student/partner is using it

**What it does**:
- ✅ Tests all critical pages load
- ✅ Checks for server errors (500)
- ✅ Detects "Internal Server Error" messages
- ✅ Finds skeleton loaders still visible
- ✅ Identifies placeholder content
- ✅ Validates API health endpoint
- ✅ Creates GitHub issue on failure (scheduled runs)

**When to run**:
- Automatically runs daily at 10 AM UTC
- After deployments
- Before announcing to students/partners
- When troubleshooting production issues

**Trigger**:
```bash
# Test production:
gh workflow run autopilot-readiness.yml

# Test custom URL:
gh workflow run autopilot-readiness.yml -f base_url=https://staging.example.com
```

**Expected outcome**: All critical routes pass, site ready for users

---

## 🔄 Recommended Workflow

### Daily Operations
1. **Secrets Validator** runs automatically at 2 AM UTC
2. **Readiness Tester** runs automatically at 10 AM UTC
3. Review any failed runs in GitHub Actions

### After Code Changes
1. Push to main branch
2. **Readiness Tester** runs automatically
3. If fails, check logs and run **Netlify Guardian**

### Before Releases
1. Run **Page Auditor** to check for issues
2. Run **Schema Guardian** to document database usage
3. Run **Readiness Tester** to verify all flows work
4. Run **Deployment Bouncer** to verify configs

### When Site is Down
1. Run **Secrets Validator** to check configuration
2. Run **Netlify Guardian** with `force_redeploy=true`
3. Check Netlify build logs
4. Run **Readiness Tester** to verify fix

---

## 📊 Monitoring Dashboard

### View Recent Runs
```bash
# All autopilot workflows
gh run list --workflow=autopilot-netlify-guardian.yml --limit 5
gh run list --workflow=autopilot-secrets-validator.yml --limit 5
gh run list --workflow=autopilot-deployment-bouncer.yml --limit 5
gh run list --workflow=autopilot-fix-pages.yml --limit 5
gh run list --workflow=autopilot-supabase-schema.yml --limit 5
gh run list --workflow=autopilot-readiness.yml --limit 5
```

### Check Specific Run
```bash
gh run view <run-id>
```

### Download Artifacts
```bash
# Page audit report
gh run download <run-id> --name autopilot-audit-report

# Schema stubs
gh run download <run-id> --name supabase-schema-stubs
```

---

## 🚨 Troubleshooting

### Issue: "Missing GitHub Secret"
**Solution**: Add the secret in Settings → Secrets and variables → Actions

### Issue: "Netlify API authentication failed"
**Solution**: Regenerate `NETLIFY_AUTH_TOKEN` and update GitHub Secret

### Issue: "Environment variables not syncing"
**Solution**: Run Netlify Guardian with `force_redeploy=true`

### Issue: "Site shows Internal Server Error"
**Solution**: 
1. Run Secrets Validator
2. Run Netlify Guardian
3. Check Netlify build logs
4. Verify Supabase project is active

### Issue: "Readiness check failing"
**Solution**:
1. Check which specific routes are failing
2. Run Netlify Guardian to fix environment
3. Review Netlify deployment logs
4. Test failing routes manually

### Issue: "Vercel still deploying"
**Solution**:
1. Run Deployment Bouncer
2. Delete identified Vercel files
3. Disconnect in Vercel dashboard
4. Re-run Deployment Bouncer

---

## 📚 Documentation

### Core Documents
- **AUTOPILOT_CHARTER.md** - Mission, rules, and responsibilities
- **AUTOPILOT_SETUP_GUIDE.md** - Detailed setup instructions
- **AUTOPILOT_INDEX.md** - This file (quick reference)

### Related Documents
- **NETLIFY_DEPLOYMENT.md** - Manual deployment guide
- **VERCEL_CLEANUP.md** - Vercel removal instructions
- **SOCIAL_MEDIA_CONFIGURATION.md** - Analytics setup
- **ASSET_INVENTORY.md** - Asset tracking

---

## 🔧 Advanced Configuration

### Disable Autopilot
```bash
gh workflow disable autopilot-netlify-guardian.yml
```

### Enable Autopilot
```bash
gh workflow enable autopilot-netlify-guardian.yml
```

### Customize Environment Variables
Edit `.github/workflows/autopilot-netlify-guardian.yml`:
```yaml
# Add more variables to enforce
fix_var "CUSTOM_VAR_NAME" "custom_value"
```

### Customize Readiness Routes
Edit `scripts/readiness-check.mjs`:
```javascript
const routes = [
  { path: "/your-route", label: "Your Route", critical: true },
  // ... more routes
];
```

### Customize Schema Detection
Edit `scripts/autopilot-supabase-schema.mjs`:
```javascript
const TABLE_REGEXES = [
  /\.from\(['"`]([a-zA-Z0-9_]+)['"`]\)/g,
  // ... more patterns
];
```

---

## 🎯 Success Metrics

### Healthy Autopilot System
- ✅ All 4 required GitHub Secrets present
- ✅ All 7 Netlify environment variables correct
- ✅ No Vercel configuration detected
- ✅ All critical routes passing readiness check
- ✅ No skeleton loaders in production
- ✅ No mock data in production
- ✅ Schema stubs match code usage

### Warning Signs
- ⚠️ Secrets Validator failing
- ⚠️ Netlify Guardian making frequent changes
- ⚠️ Readiness check failing intermittently
- ⚠️ Page Auditor finding many issues
- ⚠️ Deployment Bouncer detecting Vercel configs

---

## 🚀 Quick Commands

### Run All Autopilots (Recommended Order)
```bash
# 1. Validate secrets
gh workflow run autopilot-secrets-validator.yml

# 2. Sync environment
gh workflow run autopilot-netlify-guardian.yml

# 3. Check deployment target
gh workflow run autopilot-deployment-bouncer.yml

# 4. Audit pages (optional)
gh workflow run autopilot-fix-pages.yml

# 5. Generate schema (optional)
gh workflow run autopilot-supabase-schema.yml

# 6. Test readiness
gh workflow run autopilot-readiness.yml
```

### Emergency Fix
```bash
# Site is down - run these in order:
gh workflow run autopilot-secrets-validator.yml
gh workflow run autopilot-netlify-guardian.yml -f force_redeploy=true
gh workflow run autopilot-readiness.yml
```

### Pre-Release Checklist
```bash
# Before announcing to students/partners:
gh workflow run autopilot-fix-pages.yml
gh workflow run autopilot-supabase-schema.yml
gh workflow run autopilot-readiness.yml
```

---

## 📞 Support

### Workflow Issues
1. Check workflow summary in GitHub Actions
2. Review step logs for errors
3. Consult troubleshooting section
4. Check related documentation

### Environment Issues
1. Run Secrets Validator
2. Run Netlify Guardian
3. Check Netlify dashboard
4. Review Supabase project status

### Code Issues
1. Run Page Auditor
2. Download audit report artifact
3. Fix flagged issues
4. Re-run auditor to verify

---

## 🔒 Security

### Best Practices
- ✅ Never commit secrets to repository
- ✅ Rotate tokens every 90 days
- ✅ Use service_role key only server-side
- ✅ Limit token permissions to minimum required
- ✅ Review autopilot changes before merging
- ✅ Monitor workflow runs weekly

### Autopilot Permissions
- ✅ Read/write environment variables only
- ✅ No access to sensitive data
- ✅ All changes logged in summaries
- ✅ Manual approval for auto-commits

---

## 📈 Roadmap

### Planned Enhancements
- [ ] Auto-create GitHub issues for failed checks
- [ ] Slack/Discord notifications
- [ ] Performance monitoring
- [ ] Database migration automation
- [ ] Asset optimization
- [ ] SEO auditing

### Future Autopilots
- [ ] Performance Guardian (Lighthouse scores)
- [ ] Security Scanner (dependency vulnerabilities)
- [ ] SEO Optimizer (meta tags, sitemaps)
- [ ] Accessibility Checker (WCAG compliance)

---

## 📝 Changelog

### v1.0 (2025-01-15)
- ✅ Initial release
- ✅ 6 autopilots implemented
- ✅ Complete documentation
- ✅ GitHub Actions workflows
- ✅ Helper scripts
- ✅ Automated testing

---

**Last Updated**: 2025-01-15  
**Maintained By**: Elevate for Humanity DevOps Team  
**Status**: ✅ Production Ready

🤖 *Autopilot System - Keeping Elevate for Humanity running smoothly, automatically.*
