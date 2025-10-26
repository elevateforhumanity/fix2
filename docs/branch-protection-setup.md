# Branch Protection Setup

## Overview

Automated branch protection system that applies and monitors protection rules for the `main` branch.

## Autopilot Setup

### Quick Start

1. **One-time setup:** Add `REPO_ADMIN_TOKEN` secret
   - Go to Settings → Secrets and variables → Actions → New repository secret
   - Name: `REPO_ADMIN_TOKEN`
   - Value: Personal Access Token (classic) with `repo` + `admin:repo_hook` scope
   - Or: Fine-grained token with "Repository administration: Read and write"

2. **Apply protection:** Run the workflow
   - Go to Actions → "Apply Branch Protection" → Run workflow
   - Uses defaults: `main` branch, `elevateforhumanity/fix2` repo
   - Or run locally: `bash autopilot/branch-protection/setup-branch-protection.sh`

3. **Continuous monitoring:** Automatic
   - "Branch Protection Guard" runs on every push to `main` + nightly at 3:19 AM UTC
   - Auto-detects drift (missing checks, disabled settings)
   - Opens/updates GitHub issue if protection is weakened

### Files

- `autopilot/branch-protection/setup-branch-protection.sh` - Apply protection via gh CLI
- `autopilot/branch-protection/audit-branch-protection.mjs` - Verify protection settings
- `.github/workflows/branch-protection-apply.yml` - Manual workflow to apply protection
- `.github/workflows/branch-protection-guard.yml` - Continuous monitoring + auto-issue

## Branch Protection Rules

The following rules are enforced on the `main` branch:

- ✅ Require pull request before merging
  - Require approvals: 1 reviewer
  - Dismiss stale pull request approvals when new commits are pushed
- ✅ Require conversation resolution before merging
- ✅ Enforce admins (no bypassing the above settings)
- ✅ Require branches to be up to date before merging

## Manual Setup

### Option 1: GitHub Web UI

1. Go to [Settings → Branches](https://github.com/elevateforhumanity/fix2/settings/branches)
2. Click "Add rule" (or edit existing `main` rule)
3. Branch name pattern: `main`
4. Enable the rules listed above
5. Click "Create" or "Save changes"

### Option 2: GitHub CLI (Autopilot Script)

Use the included setup script:

```bash
# With defaults (elevateforhumanity/fix2, main branch)
bash autopilot/branch-protection/setup-branch-protection.sh

# Or customize
REPO_SLUG=owner/repo BRANCH=main \
bash autopilot/branch-protection/setup-branch-protection.sh
```

Requires: `gh` CLI authenticated with repo admin permissions

## Monitoring

### Autopilot Guard

The "Branch Protection Guard" workflow continuously monitors protection settings:

- **Triggers:** Every push to `main`, nightly at 3:19 AM UTC, manual dispatch
- **Checks:** Required settings are enabled
- **On drift:** Opens GitHub issue
- **Auto-updates:** Adds comment to existing issue if already open

**Manual audit:**
```bash
REPO_SLUG=elevateforhumanity/fix2 BRANCH=main GITHUB_TOKEN=$GH_TOKEN \
node autopilot/branch-protection/audit-branch-protection.mjs
```

## Troubleshooting

### Bypassing checks (emergency only)

If you need to bypass checks temporarily:
1. Go to Settings → Branches → Edit rule
2. Uncheck "Do not allow bypassing the above settings"
3. Admins can then force-merge
4. **Re-enable immediately after emergency**

## Best Practices

1. **Never force-push to main** - Use PRs for all changes
2. **Review before merging** - At least one approval required
3. **Resolve conversations** - All PR discussions must be resolved
4. **Keep protection enabled** - Don't disable rules unless absolutely necessary

## Related Files

- `autopilot/branch-protection/setup-branch-protection.sh` - Apply protection
- `autopilot/branch-protection/audit-branch-protection.mjs` - Verify settings
- `.github/workflows/branch-protection-apply.yml` - Manual protection setup
- `.github/workflows/branch-protection-guard.yml` - Continuous monitoring
