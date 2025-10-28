# GitHub Repository Setup Guide

## Current Status

### Repository Information
- **Name**: fix2
- **Owner**: elevateforhumanity
- **URL**: https://github.com/elevateforhumanity/fix2
- **Default Branch**: main
- **Visibility**: Public

### Branch Protection Status
⚠️ **ALL BRANCHES ARE PROTECTED** - This is preventing direct pushes

**Active Ruleset**: "Gitpod" (ID: 9199163)
- **Enforcement**: Active
- **Target**: All branches (~ALL)
- **Rules**:
  - Deletion protection
  - Non-fast-forward protection
  - Pull request required for all changes

## Required Actions

### 1. Disable Branch Protection (CRITICAL)

You need to manually disable the branch protection to allow deployments:

**Option A: Disable Ruleset (Recommended)**
1. Go to: https://github.com/elevateforhumanity/fix2/settings/rules
2. Find the "Gitpod" ruleset
3. Click "Edit"
4. Change "Enforcement status" to "Disabled"
5. Click "Save changes"

**Option B: Modify Ruleset to Exclude Main**
1. Go to: https://github.com/elevateforhumanity/fix2/settings/rules
2. Edit the "Gitpod" ruleset
3. Under "Target branches", change from "All branches" to specific branches
4. Exclude "main" branch
5. Save changes

**Option C: Remove Branch Protection Entirely**
1. Go to: https://github.com/elevateforhumanity/fix2/settings/branches
2. Find "main" branch protection
3. Click "Delete" or "Edit"
4. Remove protection rules

### 2. Configure Netlify Integration

**Check Current Integration**:
1. Go to: https://github.com/elevateforhumanity/fix2/settings/installations
2. Look for "Netlify" app
3. Verify it has access to the repository

**If Not Installed**:
1. Go to: https://app.netlify.com/sites/elevateforhumanityfix2/settings/deploys
2. Click "Link to GitHub"
3. Authorize Netlify app
4. Select the fix2 repository

**Configure Deploy Settings**:
1. Go to: https://app.netlify.com/sites/elevateforhumanityfix2/settings/deploys
2. Under "Build settings":
   - Build command: `pnpm install --frozen-lockfile && pnpm run build`
   - Publish directory: `dist`
   - Functions directory: `netlify/functions`
3. Under "Deploy contexts":
   - Production branch: `main`
   - Deploy previews: Enabled for pull requests
   - Branch deploys: All branches

### 3. Configure Supabase Integration

**Enable Supabase Integration**:
1. Go to: https://app.netlify.com/sites/elevateforhumanityfix2/integrations
2. Search for "Supabase"
3. Click "Enable"
4. Authorize with your Supabase account
5. Select project: `cuxzzpsyufcewtmicszk`

**Verify Environment Variables**:
1. Go to: https://app.netlify.com/sites/elevateforhumanityfix2/settings/env
2. Verify these are set:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

### 4. Set Up GitHub Actions (Optional)

Create `.github/workflows/deploy.yml` for automated deployments:

```yaml
name: Deploy to Netlify

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: pnpm/action-setup@v2
        with:
          version: 9.7.0
      
      - uses: actions/setup-node@v4
        with:
          node-version: '20.11.1'
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Build
        run: pnpm run build
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
      
      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v2
        with:
          publish-dir: './dist'
          production-branch: main
          github-token: ${{ secrets.GITHUB_TOKEN }}
          deploy-message: "Deploy from GitHub Actions"
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

**Required Secrets**:
1. Go to: https://github.com/elevateforhumanity/fix2/settings/secrets/actions
2. Add these secrets:
   - `NETLIFY_AUTH_TOKEN`: Your Netlify token
   - `NETLIFY_SITE_ID`: `12f120ab-3f63-419b-bc49-430f043415c1`
   - `VITE_SUPABASE_URL`: Your Supabase URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key

### 5. Configure Branch Settings

**Recommended Branch Structure**:
- `main` - Production branch (auto-deploys to Netlify)
- `develop` - Development branch (deploy previews)
- `feature/*` - Feature branches (deploy previews)
- `fix/*` - Bug fix branches (deploy previews)

**Branch Protection Rules** (After removing current protection):
1. Go to: https://github.com/elevateforhumanity/fix2/settings/branches
2. Add rule for `main`:
   - Require pull request reviews: Optional (1 approval)
   - Require status checks: Enable
   - Require branches to be up to date: Enable
   - Do not require deployments to succeed: Disable (allow direct pushes for now)

### 6. Clean Up Old Branches

**Delete Unused Branches**:
```bash
# List all branches
gh api repos/elevateforhumanity/fix2/branches --jq '.[].name'

# Delete specific branch
gh api -X DELETE repos/elevateforhumanity/fix2/git/refs/heads/BRANCH_NAME
```

**Branches to Consider Deleting**:
- Old feature branches that are merged
- Dependabot branches
- Experimental branches

## Deployment Workflow

### Current Workflow (With Protection)
1. Create feature branch
2. Make changes
3. Push to branch
4. Create pull request
5. Merge to main
6. Netlify auto-deploys

### Recommended Workflow (After Removing Protection)
1. Make changes on main or feature branch
2. Push directly to main (or create PR)
3. Netlify auto-deploys on push to main
4. Monitor deployment in Netlify dashboard

## Verification Steps

After making changes:

1. **Test Direct Push**:
   ```bash
   git checkout main
   git pull origin main
   echo "test" >> README.md
   git add README.md
   git commit -m "test: verify direct push works"
   git push origin main
   ```

2. **Verify Netlify Deployment**:
   - Go to: https://app.netlify.com/sites/elevateforhumanityfix2/deploys
   - Check that build triggered automatically
   - Monitor build logs

3. **Verify Supabase Connection**:
   - Visit deployed site
   - Test authentication features
   - Check database connectivity

## Troubleshooting

### "Push Declined Due to Repository Rule Violations"
- Branch protection is still active
- Follow steps in section 1 to disable

### "Build Failed" in Netlify
- Check build logs in Netlify dashboard
- Verify environment variables are set
- Test build locally: `pnpm install && pnpm run build`

### "Cannot Find Package" Errors
- Ensure all dependencies are in package.json
- Check that production dependencies aren't in devDependencies
- Verify pnpm-lock.yaml is committed

### Supabase Connection Issues
- Verify environment variables in Netlify
- Check Supabase project is active
- Test connection with health check endpoint

## Current Pending Changes

The following commits are ready to push once branch protection is removed:

1. **Netlify Configuration** - Complete configuration with plugins
2. **Build Fixes** - Fixed dependencies and build scripts
3. **Documentation** - Comprehensive setup guides

**Branches with Changes**:
- `netlify/plugins-and-redeploy` - Latest fixes (4 commits ahead)
- `main` - Base branch (needs updates)

## Next Steps

1. ✅ Disable branch protection (manual step required)
2. ✅ Push pending changes to main
3. ✅ Verify Netlify auto-deployment works
4. ✅ Enable Supabase integration in Netlify
5. ✅ Test full deployment pipeline
6. ✅ Clean up old failed deployments (partially done)
7. ✅ Set up monitoring and alerts

## Support Links

- **GitHub Repository**: https://github.com/elevateforhumanity/fix2
- **GitHub Settings**: https://github.com/elevateforhumanity/fix2/settings
- **Branch Rules**: https://github.com/elevateforhumanity/fix2/settings/rules
- **Netlify Dashboard**: https://app.netlify.com/sites/elevateforhumanityfix2
- **Netlify Deploys**: https://app.netlify.com/sites/elevateforhumanityfix2/deploys
- **Netlify Integrations**: https://app.netlify.com/sites/elevateforhumanityfix2/integrations
- **Supabase Dashboard**: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk
