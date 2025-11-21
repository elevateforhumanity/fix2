# Setup Branch Protection - Manual Guide

**Status**: ⚠️ Branch protection needs to be configured  
**Priority**: HIGH - Protects main branch from accidental direct pushes  
**Time Required**: 5 minutes

---

## Why Branch Protection?

Branch protection prevents:

- ❌ Accidental direct pushes to main
- ❌ Force pushes that rewrite history
- ❌ Merging without code review
- ❌ Deploying untested code

---

## Option 1: Manual Setup (Recommended - 5 minutes)

### Step 1: Go to Repository Settings

1. Navigate to: https://github.com/elevateforhumanity/fix2/settings/branches
2. Click **"Add branch protection rule"** or edit existing rule for `main`

### Step 2: Configure Protection Rules

**Branch name pattern**: `main`

**Enable these settings**:

#### Protect matching branches

- ✅ **Require a pull request before merging**
  - Required approvals: `1`
  - ✅ Dismiss stale pull request approvals when new commits are pushed
  - ✅ Require review from Code Owners (optional)

- ✅ **Require status checks to pass before merging**
  - ✅ Require branches to be up to date before merging
  - Status checks to require (if available):
    - `build-test`
    - `check`
    - `typecheck`

- ✅ **Require conversation resolution before merging**

- ✅ **Require signed commits** (optional but recommended)

- ✅ **Require linear history** (optional - prevents merge commits)

- ✅ **Do not allow bypassing the above settings**
  - This enforces rules even for admins

#### Rules applied to everyone including administrators

- ✅ **Include administrators**

### Step 3: Save Changes

Click **"Create"** or **"Save changes"**

---

## Option 2: Automated Setup via GitHub CLI

If you have GitHub CLI (`gh`) installed and authenticated:

```bash
# Navigate to repository
cd /workspaces/fix2

# Run the setup script
bash autopilot/branch-protection/setup-branch-protection.sh
```

**Requirements**:

- GitHub CLI installed: `gh --version`
- Authenticated: `gh auth login`
- Admin access to repository

---

## Option 3: Automated Setup via GitHub Actions

### Step 1: Create GitHub Token

1. Go to: https://github.com/settings/tokens/new
2. Token name: `Branch Protection Admin`
3. Expiration: `90 days` (or longer)
4. Scopes:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `admin:repo_hook` (Full control of repository hooks)
5. Click **"Generate token"**
6. **Copy the token** (you won't see it again!)

### Step 2: Add Token to Repository Secrets

1. Go to: https://github.com/elevateforhumanity/fix2/settings/secrets/actions
2. Click **"New repository secret"**
3. Name: `REPO_ADMIN_TOKEN`
4. Value: Paste the token from Step 1
5. Click **"Add secret"**

### Step 3: Run the Workflow

1. Go to: https://github.com/elevateforhumanity/fix2/actions/workflows/branch-protection-apply.yml
2. Click **"Run workflow"**
3. Select branch: `main`
4. Click **"Run workflow"**
5. Wait for completion (should take ~30 seconds)

---

## Verification

### Test 1: Check Protection is Active

Visit: https://github.com/elevateforhumanity/fix2/settings/branchprotectionrules

You should see a rule for `main` branch with:

- ✅ Require pull request reviews
- ✅ Require status checks
- ✅ Require conversation resolution
- ✅ Include administrators

### Test 2: Try Direct Push (Should Fail)

```bash
cd /workspaces/fix2

# Make a small change
echo "# Test" >> README.md

# Try to push directly to main
git add README.md
git commit -m "test: verify branch protection"
git push origin main
```

**Expected Result**: Push should be **REJECTED** with message:

```
remote: error: GH013: Repository rule violations found for refs/heads/main.
remote: - Changes must be made through a pull request.
```

If push succeeds, branch protection is NOT active.

### Test 3: Proper Workflow (Should Succeed)

```bash
# Create feature branch
git checkout -b test/branch-protection

# Make changes
echo "# Test" >> README.md
git add README.md
git commit -m "test: verify branch protection"

# Push to feature branch
git push origin test/branch-protection

# Create PR via GitHub UI or CLI
gh pr create --title "Test branch protection" --body "Verifying protection rules"

# Merge via PR (requires approval if configured)
```

---

## Current Status Check

Run this command to check if protection is active:

```bash
cd /workspaces/fix2
node autopilot/branch-protection/audit-branch-protection.mjs
```

**If you see errors**: Branch protection is NOT active - follow Option 1 above.

**If you see success**: Branch protection IS active - no action needed.

---

## Recommended Settings Summary

| Setting                         | Value       | Why                     |
| ------------------------------- | ----------- | ----------------------- |
| Require PR                      | ✅ Yes      | Forces code review      |
| Required approvals              | 1           | At least one reviewer   |
| Dismiss stale reviews           | ✅ Yes      | Re-review after changes |
| Require status checks           | ✅ Yes      | Ensure tests pass       |
| Require up-to-date              | ✅ Yes      | Prevent merge conflicts |
| Require conversation resolution | ✅ Yes      | All comments addressed  |
| Include administrators          | ✅ Yes      | No one bypasses rules   |
| Require signed commits          | ⚪ Optional | Extra security          |
| Require linear history          | ⚪ Optional | Cleaner git history     |

---

## Troubleshooting

### "I don't have admin access"

Contact the repository owner to:

1. Grant you admin access, OR
2. Apply branch protection themselves using this guide

### "The workflow failed"

Check:

1. `REPO_ADMIN_TOKEN` secret exists and is valid
2. Token has `repo` and `admin:repo_hook` scopes
3. Token hasn't expired

### "I want to make an emergency change"

If you need to bypass protection temporarily:

1. Go to branch protection settings
2. Temporarily uncheck "Include administrators"
3. Make your change
4. **Immediately re-enable** "Include administrators"

⚠️ **Warning**: Only do this in true emergencies!

---

## Monitoring

Once set up, the **Branch Protection Guard** workflow will:

- ✅ Run on every push to main
- ✅ Run nightly at 3:19 AM UTC
- ✅ Verify all protection rules are intact
- ✅ Open GitHub issue if rules are weakened

Workflow: `.github/workflows/branch-protection-guard.yml`

---

## Next Steps After Setup

1. ✅ Verify protection is active (Test 1 above)
2. ✅ Test with a dummy PR (Test 3 above)
3. ✅ Document any custom rules in this file
4. ✅ Train team on PR workflow

---

## Questions?

- **Documentation**: `docs/branch-protection-setup.md`
- **Scripts**: `autopilot/branch-protection/`
- **Workflows**: `.github/workflows/branch-protection-*.yml`

---

**Created**: 2025-10-29 00:17 UTC  
**Status**: Awaiting manual configuration  
**Priority**: HIGH
