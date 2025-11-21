# Guide: Disable Autopilot Workflows in Sister Repositories

## 🎯 Goal

Disable scheduled autopilot workflows in all sister repositories to prevent automated runs that could interfere with manual deployment work on the main `fix2` repository.

## 📋 Repositories to Process

1. **ecosystem2** - https://github.com/elevateforhumanity/ecosystem2
2. **ecosystem3** - https://github.com/elevateforhumanity/ecosystem3
3. **ecosystem-5** - https://github.com/elevateforhumanity/ecosystem-5
4. **new-ecosysstem** - https://github.com/elevateforhumanity/new-ecosysstem
5. **new2** - https://github.com/elevateforhumanity/new2
6. **tiny-new** - https://github.com/elevateforhumanity/tiny-new

## ✅ Status: fix2 Repository

**Already Complete!** All scheduled workflows in the `fix2` repository have been disabled:

- Workflows moved to `.github/workflows/disabled/` folder
- No active cron jobs running
- Manual workflows still available if needed

## 🚀 Three Options to Disable Workflows in Sister Repos

### Option 1: Use GitHub Actions Workflow (Recommended)

**Easiest method - runs automatically via GitHub Actions**

#### Prerequisites:

**GitHub Personal Access Token (PAT) Required:**

The default `GITHUB_TOKEN` only has access to the current repository. To access sister repositories, you need to add a Personal Access Token:

1. **Create a PAT:**
   - Go to: https://github.com/settings/tokens/new
   - Name: "Elevate Autopilot - Sister Repos"
   - Expiration: 90 days (or as needed)
   - Scopes needed:
     - ✅ `repo` (Full control of private repositories)
     - ✅ `workflow` (Update GitHub Action workflows)
   - Click "Generate token"
   - **Copy the token immediately** (you won't see it again)

2. **Add PAT to GitHub Secrets:**
   - Go to: https://github.com/elevateforhumanity/fix2/settings/secrets/actions
   - Click "New repository secret"
   - Name: `GH_PAT`
   - Value: Paste your PAT token
   - Click "Add secret"

#### Execution Steps:

1. Go to the Actions tab in the fix2 repository:
   https://github.com/elevateforhumanity/fix2/actions

2. Find the workflow: "Disable Workflows in Sister Repositories"

3. Click "Run workflow"

4. Configure options:
   - **Repositories**: Leave default or specify specific repos
   - **Dry run**: Set to `false` to actually push changes

5. Click "Run workflow" button

6. Monitor the workflow execution in the Actions tab

**Pros:**

- ✅ Automated - no manual work needed
- ✅ Runs in GitHub's infrastructure
- ✅ Creates proper commits with co-author attribution
- ✅ Can be run multiple times safely
- ✅ Works across all organization repositories

**Cons:**

- ⚠️ Requires creating and storing a PAT
- ⚠️ PAT needs to be refreshed when it expires
- ⚠️ Requires GitHub Actions to be enabled

---

### Option 2: Use Bash Script (Manual)

**For users with local access to all repositories**

1. Ensure you have GitHub CLI installed and authenticated:

   ```bash
   gh auth login
   ```

2. Run the provided script:

   ```bash
   cd /workspaces/fix2
   ./disable-autopilot-all-repos.sh
   ```

3. The script will:
   - Clone each repository
   - Find scheduled workflows
   - Move them to `disabled/` folder
   - Commit changes
   - Ask if you want to push

4. Review and push changes when prompted

**Pros:**

- ✅ Full control over each step
- ✅ Can review changes before pushing
- ✅ Works offline (except for clone/push)

**Cons:**

- ⚠️ Requires local setup and authentication
- ⚠️ More manual work
- ⚠️ Need to handle each repo individually

---

### Option 3: Manual Process (Most Control)

**For maximum control and verification**

For each repository:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/elevateforhumanity/REPONAME.git
   cd REPO_NAME
   ```

2. **Check for scheduled workflows:**

   ```bash
   grep -r "schedule:" .github/workflows/*.yml
   ```

3. **Create disabled directory:**

   ```bash
   mkdir -p .github/workflows/disabled
   ```

4. **Move scheduled workflows:**

   ```bash
   # For each workflow with a schedule trigger:
   git mv .github/workflows/WORKFLOW_NAME.yml .github/workflows/disabled/
   ```

5. **Commit changes:**

   ```bash
   git add .github/workflows/
   git commit -m "DISABLE scheduled workflows: Stop autopilot cron jobs

   - Moved scheduled workflows to disabled/ folder
   - Prevents automated runs during manual deployment work
   - Focus on fix2 repository deployment

   Co-authored-by: Ona <no-reply@ona.com>"
   ```

6. **Push changes:**

   ```bash
   git push origin main
   ```

7. **Repeat for each repository**

**Pros:**

- ✅ Maximum control
- ✅ Can verify each change
- ✅ No automation dependencies

**Cons:**

- ⚠️ Most time-consuming
- ⚠️ Easy to miss a repository
- ⚠️ Repetitive work

---

## 🔍 What Gets Disabled

### Workflows with `schedule:` triggers

Example:

```yaml
on:
  schedule:
    - cron: '0 */6 * * *' # Every 6 hours
```

These workflows run automatically on a schedule and should be disabled.

### Workflows that remain active

- Manual workflows (`workflow_dispatch`)
- Push-triggered workflows
- Pull request workflows
- Other event-based workflows

Only scheduled (cron) workflows are disabled to prevent automated interference.

---

## ✅ Verification

After disabling workflows in a repository:

1. **Check GitHub Actions tab:**
   - Go to: `https://github.com/elevateforhumanity/REPONAME/actions
   - Verify no scheduled workflows are listed
   - Check that disabled workflows are in the disabled folder

2. **Verify file structure:**

   ```bash
   ls -la .github/workflows/
   ls -la .github/workflows/disabled/
   ```

3. **Check for remaining scheduled workflows:**
   ```bash
   grep -r "schedule:" .github/workflows/*.yml
   # Should return no results (or only from disabled/ folder)
   ```

---

## 🎯 Why This Matters

### Problems with Active Autopilot Workflows:

1. **Conflicting Changes**
   - Automated workflows might modify files you're working on
   - Creates merge conflicts
   - Wastes time resolving conflicts

2. **Resource Consumption**
   - Scheduled workflows use GitHub Actions minutes
   - May trigger unnecessary builds
   - Consumes API rate limits

3. **Confusion**
   - Hard to track which changes are manual vs automated
   - Makes debugging more difficult
   - Complicates git history

4. **Deployment Interference**
   - Automated deployments might conflict with manual deployments
   - Could deploy incomplete or broken code
   - Makes rollbacks more complex

### Benefits of Disabling:

- ✅ Full control over deployments
- ✅ Cleaner git history
- ✅ No unexpected changes
- ✅ Easier debugging
- ✅ Focus on fix2 repository
- ✅ Can re-enable later if needed

---

## 🔄 Re-enabling Workflows Later

If you need to re-enable workflows in the future:

1. **Move workflows back:**

   ```bash
   git mv .github/workflows/disabled/WORKFLOW_NAME.yml .github/workflows/
   ```

2. **Commit and push:**

   ```bash
   git add .github/workflows/
   git commit -m "Re-enable WORKFLOW_NAME"
   git push origin main
   ```

3. **Verify in GitHub Actions tab**

---

## 📊 Current Status Summary

| Repository     | Status      | Action Needed                |
| -------------- | ----------- | ---------------------------- |
| fix2           | ✅ Complete | None - already disabled      |
| ecosystem2     | ⏳ Pending  | Run one of the three options |
| ecosystem3     | ⏳ Pending  | Run one of the three options |
| ecosystem-5    | ⏳ Pending  | Run one of the three options |
| new-ecosysstem | ⏳ Pending  | Run one of the three options |
| new2           | ⏳ Pending  | Run one of the three options |
| tiny-new       | ⏳ Pending  | Run one of the three options |

---

## 🆘 Troubleshooting

### "Permission denied" errors

**Problem:** Can't push to repository

**Solution:**

- Verify you have write access to the repository
- Check GitHub authentication: `gh auth status`
- Try re-authenticating: `gh auth login`

### "Repository not found" errors

**Problem:** Can't clone repository

**Solution:**

- Verify repository exists: `gh repo view elevateforhumanity/REPO_NAME`
- Check repository name spelling
- Verify you have access to the organization

### "No workflows found" message

**Problem:** Repository has no workflows

**Solution:**

- This is fine! Not all repositories have workflows
- Skip to the next repository
- Mark as complete in the status table

### Workflow still running after disabling

**Problem:** Scheduled workflow triggered before disabling

**Solution:**

- Wait for the current run to complete
- Cancel the run manually in GitHub Actions tab
- Verify the workflow file is in the disabled/ folder

---

## 📝 Notes

- **Backup:** All workflows are moved, not deleted. They can be restored anytime.
- **Safety:** Only scheduled workflows are affected. Manual workflows remain active.
- **Reversible:** Changes can be undone by moving files back.
- **Documentation:** This guide is version-controlled in the fix2 repository.

---

## ✅ Completion Checklist

- [ ] Choose which option to use (GitHub Actions, Bash Script, or Manual)
- [ ] Process ecosystem2 repository
- [ ] Process ecosystem3 repository
- [ ] Process ecosystem-5 repository
- [ ] Process new-ecosysstem repository
- [ ] Process new2 repository
- [ ] Process tiny-new repository
- [ ] Verify all repositories have no active scheduled workflows
- [ ] Update status table in this document
- [ ] Focus on deploying fix2 repository

---

**Last Updated:** 2025-11-15
**Status:** Ready to execute
**Priority:** High - Do this before continuing deployment work
