# Autopilot System Setup Guide

## Overview

The Elevate for Humanity LMS includes a comprehensive autopilot system that automatically maintains deployment health, environment configuration, and code quality.

## Autopilot Components

### 1. Netlify Environment Guardian

**File**: `.github/workflows/autopilot-netlify-guardian.yml`  
**Purpose**: Ensures Netlify environment variables are correct and synced with GitHub Secrets

**What it does**:

- ✅ Validates all required GitHub Secrets exist
- ✅ Reads current Netlify environment variables
- ✅ Compares with expected values
- ✅ Fixes incorrect or missing variables
- ✅ Triggers Netlify redeploy if changes made

**When to run**:

- After adding/updating GitHub Secrets
- When site shows "Internal Server Error"
- After Supabase project changes
- Manual trigger anytime via GitHub Actions

### 2. GitHub Secrets Validator

**File**: `.github/workflows/autopilot-secrets-validator.yml`  
**Purpose**: Validates required GitHub Secrets are present

**What it does**:

- ✅ Checks all 4 required secrets exist
- ✅ Provides clear instructions for missing secrets
- ✅ Validates Supabase URL in repo config
- ✅ Runs nightly to catch configuration drift

**When to run**:

- Automatically runs nightly at 2 AM UTC
- After fresh clone/fork of repository
- When setting up new environment
- Manual trigger anytime

### 3. Deployment Target Bouncer

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
- Manual trigger anytime

### 4. Page Completeness Auditor

**File**: `.github/workflows/autopilot-fix-pages.yml`  
**Purpose**: Audits and fixes incomplete pages, routing issues, and placeholder content

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
- Manual trigger with custom options

---

## Setup Instructions

### Step 1: Add Required GitHub Secrets

Go to: **Settings → Secrets and variables → Actions → New repository secret**

Add these 4 secrets:

#### 1. NETLIFY_AUTH_TOKEN

```
Where to find:
1. Go to https://app.netlify.com
2. Click your avatar → User settings
3. Applications → Personal access tokens
4. New access token
5. Copy the token
```

#### 2. NETLIFY_SITE_ID

```
Where to find:
1. Go to https://app.netlify.com
2. Select your site (elevateconnectsdirectory)
3. Site settings → General → Site details
4. Copy "API ID"
```

#### 3. SUPABASE_ANON_KEY

```
Where to find:
1. Go to https://supabase.com/dashboard
2. Select project: cuxzzpsyufcewtmicszk
3. Settings → API
4. Copy "anon public" key
```

#### 4. SUPABASE_SERVICE_ROLE_KEY

```
Where to find:
1. Same location as above (Settings → API)
2. Click "Reveal" next to service_role
3. Copy the key
⚠️ IMPORTANT: This is a secret key - never share it
```

### Step 2: Verify Secrets

Run the **Autopilot – GitHub Secrets Validator** workflow:

1. Go to **Actions** tab
2. Select "Autopilot – GitHub Secrets Validator"
3. Click "Run workflow"
4. Check the summary for any missing secrets

### Step 3: Sync to Netlify

Run the **Autopilot – Fix Netlify Environment Variables** workflow:

1. Go to **Actions** tab
2. Select "Autopilot – Fix Netlify Environment Variables"
3. Click "Run workflow"
4. Leave `force_redeploy` as `false` (unless you want to force a build)
5. Click "Run workflow"

The autopilot will:

- Validate GitHub Secrets
- Read current Netlify environment variables
- Fix any incorrect or missing variables
- Trigger a new Netlify build if changes were made

### Step 4: Verify Deployment Target

Run the **Autopilot – Deployment Target Bouncer** workflow:

1. Go to **Actions** tab
2. Select "Autopilot – Deployment Target Bouncer"
3. Click "Run workflow"

If it finds Vercel configs:

- Delete the files it identifies
- Commit the changes
- Re-run the workflow

### Step 5: Audit Page Completeness (Optional)

Run the **Autopilot – Fix LMS Pages** workflow:

1. Go to **Actions** tab
2. Select "Autopilot – Fix LMS Pages, Routing, Assets, and Placeholder Data"
3. Configure options:
   - `auto_commit`: false (review changes first)
   - `fix_routing`: true
   - `fix_skeletons`: true
   - `fix_mock_data`: true
   - `fix_assets`: true
4. Click "Run workflow"
5. Review the audit report
6. Download the artifact for detailed findings

---

## Autopilot Workflow Triggers

### Manual Triggers

All autopilots can be triggered manually via GitHub Actions UI.

### Automatic Triggers

#### Secrets Validator

- **Nightly**: 2 AM UTC
- **On push**: When charter or workflow changes

#### Deployment Bouncer

- **On pull request**: Any PR opened/updated
- **On push**: When Vercel configs or workflows change

#### Netlify Guardian

- **On push**: When charter or workflow changes
- **Manual only**: For environment variable fixes

#### Page Auditor

- **Manual only**: Run when needed before releases

---

## Troubleshooting

### Issue: "Missing GitHub Secret"

**Solution**:

1. Check which secret is missing in workflow summary
2. Follow instructions in Step 1 to add it
3. Re-run the workflow

### Issue: "Netlify API authentication failed"

**Solution**:

1. Verify `NETLIFY_AUTH_TOKEN` is correct
2. Check token hasn't expired
3. Generate new token if needed
4. Update GitHub Secret
5. Re-run workflow

### Issue: "Environment variables not syncing"

**Solution**:

1. Run Secrets Validator first
2. Ensure all 4 secrets are present
3. Run Netlify Guardian with `force_redeploy: true`
4. Check Netlify dashboard for environment variables

### Issue: "Site still shows Internal Server Error"

**Solution**:

1. Run Netlify Guardian to fix environment variables
2. Check Netlify build logs for errors
3. Verify Supabase project is active
4. Check DNS points to Netlify
5. Review application logs in Netlify

### Issue: "Vercel still deploying"

**Solution**:

1. Run Deployment Bouncer to detect configs
2. Delete identified Vercel files
3. Go to Vercel dashboard
4. Settings → Git → Disconnect
5. Re-run Deployment Bouncer to verify

---

## Maintenance Schedule

### Daily

- Secrets Validator runs automatically at 2 AM UTC

### Weekly

- Review autopilot workflow summaries
- Check for any failed runs
- Address any flagged issues

### Before Releases

- Run Page Completeness Auditor
- Fix any routing issues
- Replace mock data with real queries
- Verify all assets present

### After Major Changes

- Run Netlify Guardian to sync environment
- Run Deployment Bouncer to verify configs
- Run Page Auditor to check for issues

---

## Advanced Configuration

### Customizing Netlify Guardian

Edit `.github/workflows/autopilot-netlify-guardian.yml`:

```yaml
# Add more environment variables to enforce
fix_var "CUSTOM_VAR_NAME" "custom_value"
```

### Customizing Page Auditor

Edit `.github/workflows/autopilot-fix-pages.yml`:

```yaml
# Add more patterns to detect
grep -R "your_pattern" --include="*.tsx" -n .
```

### Disabling Autopilots

To temporarily disable an autopilot:

```bash
# Via GitHub CLI
gh workflow disable autopilot-netlify-guardian.yml

# Re-enable
gh workflow enable autopilot-netlify-guardian.yml
```

Or in GitHub UI:

1. Go to Actions
2. Select the workflow
3. Click "..." → Disable workflow

---

## Security Best Practices

### GitHub Secrets

- ✅ Never commit secrets to repository
- ✅ Rotate tokens every 90 days
- ✅ Use service_role key only in server-side code
- ✅ Limit token permissions to minimum required

### Autopilot Permissions

- ✅ Autopilots only read/write environment variables
- ✅ No access to sensitive data
- ✅ All changes logged in workflow summaries
- ✅ Manual approval required for auto-commits

### Monitoring

- ✅ Review workflow runs weekly
- ✅ Check for failed autopilot runs
- ✅ Investigate any unexpected changes
- ✅ Monitor Netlify deployment logs

---

## Support

### Workflow Fails

1. Check workflow summary for error details
2. Review step logs for specific failures
3. Consult troubleshooting section above
4. Check related documentation

### Environment Issues

1. Run Secrets Validator
2. Run Netlify Guardian
3. Check Netlify dashboard
4. Review Supabase project status

### Code Issues

1. Run Page Auditor
2. Review audit report artifact
3. Fix flagged issues manually
4. Re-run auditor to verify

---

## Related Documentation

- **AUTOPILOT_CHARTER.md** - Detailed autopilot mission and rules
- **NETLIFY_DEPLOYMENT.md** - Manual deployment guide
- **VERCEL_CLEANUP.md** - Vercel removal instructions
- **SOCIAL_MEDIA_CONFIGURATION.md** - Analytics setup

---

## Quick Reference

### Run All Autopilots (Recommended Order)

1. **Secrets Validator** - Verify configuration
2. **Netlify Guardian** - Sync environment variables
3. **Deployment Bouncer** - Verify deployment target
4. **Page Auditor** - Check code quality (optional)

### Emergency Fix

If site is down:

```bash
# 1. Check secrets
gh workflow run autopilot-secrets-validator.yml

# 2. Fix Netlify environment
gh workflow run autopilot-netlify-guardian.yml -f force_redeploy=true

# 3. Check deployment target
gh workflow run autopilot-deployment-bouncer.yml
```

### Status Check

```bash
# View recent workflow runs
gh run list --workflow=autopilot-netlify-guardian.yml --limit 5

# View specific run details
gh run view <run-id>

# Download audit report
gh run download <run-id> --name autopilot-audit-report
```

---

**Last Updated**: 2025-01-15  
**Version**: 1.0  
**Status**: Active
