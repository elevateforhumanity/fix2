# 🤖 Auto-Commit & Auto-Deploy Guide

**Elevate for Humanity - Automated Branch Management**

---

## 📋 OVERVIEW

Your repository now has **fully automated** commit and deployment workflows for all branches. Every push triggers automatic fixes, commits, and deployments.

---

## 🚀 WORKFLOWS ACTIVATED

### 1. **Branch Auto-Deploy** (Primary)

**File:** `.github/workflows/branch-auto-deploy.yml`

**Triggers on push to:**

- `dev/**` - Development branches
- `feature/**` / `feat/**` - Feature branches
- `fix/**` / `bugfix/**` / `hotfix/**` - Fix branches
- `autopilot/**` / `auto/**` - Autopilot branches
- `staging` - Staging branch

**What it does automatically:**

1. ✅ Runs autopilot auto-fixes (formatting, brand colors, etc.)
2. ✅ Commits fixes if any changes detected
3. ✅ Pushes commits back to the branch
4. ✅ Runs autopilot validation checks
5. ✅ Builds the application
6. ✅ Deploys preview to Netlify
7. ✅ Comments deployment URL on commit

**No manual action required!**

---

### 2. **Continuous Deploy** (Main Branch)

**File:** `.github/workflows/continuous-deploy.yml`

**Triggers on:**

- Push to `main` branch
- Daily at 2 AM EST (scheduled)
- Manual workflow dispatch

**What it does automatically:**

1. ✅ Runs autopilot checks
2. ✅ Runs tests
3. ✅ Builds application
4. ✅ Verifies build output
5. ✅ Deploys to production (Netlify)
6. ✅ Runs post-deployment health checks
7. ✅ Smoke tests critical pages

**Production deployment is fully automated!**

---

### 3. **Auto Commit & Deploy** (Legacy)

**File:** `.github/workflows/auto-commit-deploy.yml`

**Triggers on push to:**

- `dev/**`, `feature/**`, `fix/**`, `autopilot/**`

**What it does:**

- Similar to Branch Auto-Deploy
- Includes Netlify preview deployment
- Creates detailed summary

---

## 📊 BRANCH WORKFLOW

### Development Workflow

```
1. Create branch:
   git checkout -b feature/my-feature

2. Make changes:
   # Edit files...

3. Push to remote:
   git push origin feature/my-feature

4. AUTOPILOT TAKES OVER:
   ✅ Auto-fixes applied
   ✅ Fixes committed
   ✅ Fixes pushed
   ✅ Build created
   ✅ Preview deployed
   ✅ URL commented on commit

5. Review preview:
   # Check the Netlify URL in commit comment

6. Merge to main:
   # Create PR or merge directly

7. PRODUCTION DEPLOY:
   ✅ Automatically deployed to production
   ✅ Health checks run
   ✅ Site is live
```

---

## 🎯 BRANCH NAMING CONVENTIONS

### Recommended Branch Names

**Development:**

- `dev/feature-name`
- `dev/experiment`
- `develop`

**Features:**

- `feature/add-new-page`
- `feat/stripe-integration`

**Fixes:**

- `fix/broken-link`
- `bugfix/payment-error`
- `hotfix/critical-bug`

**Autopilot:**

- `autopilot/auto-fixes`
- `auto/deploy-test`

**Staging:**

- `staging`

---

## 🔧 CONFIGURATION

### Required Secrets

Add these to **GitHub Repository Settings → Secrets and variables → Actions:**

```bash
GITHUB_TOKEN          # Automatically provided by GitHub
NETLIFY_AUTH_TOKEN    # Get from Netlify dashboard
NETLIFY_SITE_ID       # Get from Netlify site settings
```

### Optional Secrets

```bash
REPO_ADMIN_TOKEN      # For branch protection (PAT with admin access)
```

---

## 📝 WHAT GETS AUTO-COMMITTED

### Autopilot Auto-Fixes Include:

1. **Code Formatting**
   - Prettier formatting
   - ESLint auto-fixes
   - CSS/SCSS formatting

2. **Brand Compliance**
   - Brand color corrections
   - Token consistency

3. **SEO & Metadata**
   - Sitemap generation
   - Robots.txt generation
   - Meta tag updates

4. **Build Artifacts**
   - Route generation
   - Type definitions

### Commit Message Format

```
chore: autopilot auto-fixes

Applied automatic fixes:
- Code formatting
- Brand color corrections
- Sitemap generation
- Robots.txt generation

Branch: feature/my-feature
Workflow: Branch Auto-Deploy

Co-authored-by: Ona <no-reply@ona.com>
```

---

## 🚦 DEPLOYMENT FLOW

### Branch Deployments (Preview)

```
Push to branch
    ↓
Auto-fixes applied
    ↓
Changes committed & pushed
    ↓
Build created
    ↓
Deployed to Netlify Preview
    ↓
URL: https://[branch-name]--elevateforhumanity.netlify.app
```

### Main Branch Deployment (Production)

```
Merge to main
    ↓
Autopilot checks
    ↓
Tests run
    ↓
Build created
    ↓
Build verified
    ↓
Deployed to Production
    ↓
Health checks
    ↓
Live at: https://elevateforhumanity.org
```

---

## 🎛️ MANUAL CONTROLS

### Trigger Manual Deployment

```bash
# Via GitHub UI:
Actions → Continuous Deploy → Run workflow

# Or via GitHub CLI:
gh workflow run continuous-deploy.yml
```

### Trigger Branch Deploy

```bash
# Via GitHub UI:
Actions → Auto Commit & Deploy → Run workflow
# Select branch and commit message

# Or via GitHub CLI:
gh workflow run auto-commit-deploy.yml \
  -f branch=feature/my-feature \
  -f commit_message="chore: manual autopilot run"
```

### Disable Auto-Deploy for a Branch

Add `[skip ci]` or `[ci skip]` to commit message:

```bash
git commit -m "docs: update README [skip ci]"
```

---

## 📊 MONITORING

### View Workflow Status

```bash
# List recent workflow runs
gh run list --workflow=branch-auto-deploy.yml

# View specific run
gh run view [run-id]

# Watch live
gh run watch
```

### Check Deployment Status

1. **GitHub Actions Tab**
   - View all workflow runs
   - See detailed logs
   - Check deployment summaries

2. **Netlify Dashboard**
   - View all deployments
   - See preview URLs
   - Monitor build logs

3. **Commit Comments**
   - Deployment URLs commented automatically
   - Status updates on each commit

---

## 🔍 TROUBLESHOOTING

### Auto-Commit Not Working

**Check:**

1. Branch name matches patterns in workflow
2. `GITHUB_TOKEN` has write permissions
3. No conflicts in git history

**Fix:**

```bash
# Pull latest changes
git pull origin [branch-name]

# Push again
git push origin [branch-name]
```

### Deployment Failed

**Check:**

1. Build succeeded locally: `pnpm build`
2. Netlify secrets are set
3. No syntax errors in code

**Fix:**

```bash
# Run autopilot checks locally
node tools/autopilot.mjs

# Run build locally
pnpm run build

# Fix any errors, then push
git push origin [branch-name]
```

### Preview URL Not Generated

**Check:**

1. `NETLIFY_AUTH_TOKEN` is set
2. `NETLIFY_SITE_ID` is correct
3. Workflow completed successfully

**Fix:**

- Check GitHub Actions logs
- Verify Netlify dashboard
- Re-run workflow manually

---

## 🎯 BEST PRACTICES

### 1. Branch Naming

✅ Use descriptive names: `feature/add-payment-page`  
❌ Avoid generic names: `test`, `temp`, `asdf`

### 2. Commit Messages

✅ Clear and descriptive  
❌ Don't rely only on auto-commits

### 3. Review Previews

✅ Always check preview URL before merging  
❌ Don't merge without testing

### 4. Keep Branches Updated

✅ Regularly merge main into feature branches  
❌ Don't let branches get too far behind

### 5. Clean Up

✅ Delete branches after merging  
❌ Don't accumulate stale branches

---

## 📈 WORKFLOW STATISTICS

### Current Configuration

| Workflow             | Triggers                         | Auto-Commit | Auto-Deploy   | Status    |
| -------------------- | -------------------------------- | ----------- | ------------- | --------- |
| Branch Auto-Deploy   | Push to dev/feature/fix branches | ✅ Yes      | ✅ Preview    | 🟢 Active |
| Continuous Deploy    | Push to main, Daily schedule     | ❌ No       | ✅ Production | 🟢 Active |
| Auto Commit & Deploy | Push to dev/feature/fix branches | ✅ Yes      | ✅ Preview    | 🟢 Active |

### Automation Coverage

- **Branches with auto-deploy:** 15+ patterns
- **Auto-fixes applied:** 5 types
- **Deployment targets:** Netlify (preview + production)
- **Health checks:** Post-deployment validation
- **Notifications:** Commit comments, summaries

---

## 🚀 QUICK START

### For New Feature

```bash
# 1. Create branch
git checkout -b feature/my-awesome-feature

# 2. Make changes
# ... edit files ...

# 3. Commit and push
git add .
git commit -m "feat: add awesome feature"
git push origin feature/my-awesome-feature

# 4. AUTOPILOT HANDLES THE REST!
# - Auto-fixes applied
# - Changes committed
# - Preview deployed
# - URL commented on commit

# 5. Check preview URL in commit comment
# 6. Create PR when ready
# 7. Merge to main
# 8. Production auto-deploys!
```

---

## 📞 SUPPORT

### Issues?

1. Check GitHub Actions logs
2. Review Netlify deployment logs
3. Run autopilot checks locally: `node scripts/check-autopilots.mjs`
4. Check this guide for troubleshooting

### Need Help?

- GitHub Issues: Report problems
- Workflow logs: Detailed error messages
- Netlify dashboard: Deployment status

---

## ✅ VERIFICATION

### Verify Auto-Deploy is Working

```bash
# 1. Create test branch
git checkout -b test/auto-deploy-verification

# 2. Make a small change
echo "# Test" >> TEST.md

# 3. Commit and push
git add TEST.md
git commit -m "test: verify auto-deploy"
git push origin test/auto-deploy-verification

# 4. Check GitHub Actions
# - Workflow should start automatically
# - Auto-fixes should be applied
# - Preview should be deployed
# - URL should be commented

# 5. Clean up
git checkout main
git branch -D test/auto-deploy-verification
git push origin --delete test/auto-deploy-verification
```

---

## 🎉 SUCCESS!

Your repository now has **fully automated** commit and deployment workflows!

**Every push automatically:**

- ✅ Applies fixes
- ✅ Commits changes
- ✅ Deploys previews
- ✅ Comments URLs
- ✅ Validates builds
- ✅ Deploys production (main branch)

**No manual intervention required!**

---

**Last Updated:** 2025-10-27  
**Status:** 🟢 ALL WORKFLOWS ACTIVE

For questions or issues, check GitHub Actions logs or Netlify dashboard.
