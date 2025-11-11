# Fix 934 GitHub Issues Problem

**Problem:** You have **934 open GitHub Issues** created by autopilot workflows  
**Cause:** Autopilot workflows run every 30 minutes and create an issue on every failure  
**Solution:** Disable the workflows and close all issues

---

## What Happened

Your autopilot workflows have been:

1. Running every 30 minutes (cron schedule)
2. Failing repeatedly (likely due to missing secrets or permissions)
3. Creating a GitHub Issue on EVERY failure
4. Running for days/weeks = 934 issues

### The Problematic Workflows

These workflows create issues:

- `autopilot-auto-push.yml` - Runs every 30 min
- `autopilot-phase3-selfheal.yml` - Runs every 5 min
- `autopilot-workers-cron.yml` - Runs every 30 min

---

## Immediate Fix (Already Done)

✅ **Step 1: Disabled the workflows**

```bash
# Moved to archive (disabled)
mv .github/workflows/autopilot-auto-push.yml .github/workflows/archive/
mv .github/workflows/autopilot-phase3-selfheal.yml .github/workflows/archive/
mv .github/workflows/autopilot-workers-cron.yml .github/workflows/archive/
```

This stops NEW issues from being created.

---

## Close All 934 Issues

### Option 1: Using GitHub CLI (Recommended)

```bash
# Make script executable
chmod +x scripts/close-autopilot-issues.sh

# Run the script
bash scripts/close-autopilot-issues.sh
```

This will:

- Close all issues created by `github-actions`
- Add a comment explaining why
- Show remaining issues

### Option 2: Manual Bulk Close

```bash
# Login to GitHub CLI
gh auth login

# Close all autopilot issues
gh issue list \
  --author "app/github-actions" \
  --state open \
  --limit 1000 \
  --json number \
  --jq '.[].number' | \
  xargs -I {} gh issue close {} \
  --comment "Closing autopilot-generated issue. Workflows disabled."
```

### Option 3: GitHub Web Interface

1. Go to: https://github.com/elevateforhumanity/fix2/issues
2. Filter by: `is:issue is:open author:app/github-actions`
3. Select all issues (checkbox at top)
4. Click "Close issues"
5. Repeat until all are closed

---

## Why This Happened

### The Autopilot Design Flaw

The workflows were designed to:

1. ✅ Run automatically on a schedule
2. ✅ Check system health
3. ✅ Auto-fix problems
4. ❌ **Create GitHub Issue on EVERY failure** ← Problem!

### Why They Failed

The workflows failed because:

- Missing environment variables
- Missing GitHub secrets
- Missing Netlify/Vercel credentials
- Permission issues
- Build failures

### The Issue Spam

- Runs every 30 minutes = 48 times per day
- 3 workflows = 144 potential issues per day
- Running for ~7 days = 1,000+ issues

---

## Prevent This in the Future

### 1. Remove Issue Creation from Workflows

If you want to re-enable autopilot, remove the issue creation code:

```yaml
# DELETE THIS SECTION from workflows:
- name: Create issue on failure
  if: failure()
  uses: actions/github-script@v7
  with:
    script: |
      github.rest.issues.create({
        # ... issue creation code
      })
```

### 2. Use Notifications Instead

Replace with:

- Email notifications
- Slack/Discord webhooks
- GitHub Actions summary (no issue)
- Log to file

### 3. Add Rate Limiting

If you must create issues:

```yaml
# Only create issue if no recent issue exists
- name: Check for recent issues
  run: |
    RECENT=$(gh issue list --label autopilot --limit 1 --json createdAt --jq '.[0].createdAt')
    # Only create if no issue in last 24 hours
```

---

## What to Do Now

### Immediate Actions

1. ✅ **Workflows disabled** (already done)
2. ⏳ **Close all issues** (run script above)
3. ⏳ **Commit the changes** (see below)

### Run This Now

```bash
# Close all autopilot issues
bash scripts/close-autopilot-issues.sh

# Commit the workflow changes
git add .github/workflows/
git commit -m "fix: disable autopilot workflows creating issue spam

Moved problematic workflows to archive:
- autopilot-auto-push.yml
- autopilot-phase3-selfheal.yml
- autopilot-workers-cron.yml

These workflows were:
- Running every 5-30 minutes
- Creating GitHub Issue on every failure
- Generated 934+ issues

Workflows are preserved in archive/ if needed later.

Co-authored-by: Ona <no-reply@ona.com>"

git push origin main
```

---

## Understanding the Workflows

### What They Were Trying to Do

**autopilot-auto-push.yml:**

- Run health checks (TypeScript, ESLint, build)
- Auto-fix issues (format, lint)
- Commit and push changes
- **Create issue if failed** ← Problem

**autopilot-phase3-selfheal.yml:**

- Check site health
- Check database health
- Auto-heal issues
- Trigger rebuilds
- **Create issue if failed** ← Problem

**autopilot-workers-cron.yml:**

- Run scheduled tasks
- Update content
- Sync data
- **Create issue if failed** ← Problem

### Why They Failed

1. **Missing Secrets:**
   - No Netlify credentials
   - No Vercel credentials
   - No Supabase credentials

2. **Wrong Platform:**
   - Trying to deploy to Netlify
   - But you're switching to Vercel

3. **Permission Issues:**
   - Can't push to main branch
   - Branch protection rules

---

## Better Autopilot Design

If you want autopilot in the future:

### 1. Use Workflow Summaries

```yaml
- name: Report status
  if: always()
  run: |
    echo "## Autopilot Status" >> $GITHUB_STEP_SUMMARY
    echo "Health: ${{ steps.health.outputs.status }}" >> $GITHUB_STEP_SUMMARY
    # No issue created!
```

### 2. Use Notifications

```yaml
- name: Send notification
  if: failure()
  uses: actions/slack@v1
  with:
    webhook: ${{ secrets.SLACK_WEBHOOK }}
    message: 'Autopilot failed'
```

### 3. Rate Limit Issues

```yaml
- name: Create issue (rate limited)
  if: failure()
  run: |
    # Only create if no issue in last 24 hours
    RECENT=$(gh issue list --label autopilot --created ">=$(date -d '24 hours ago' -I)" --json number --jq 'length')
    if [ "$RECENT" -eq 0 ]; then
      gh issue create --title "Autopilot Failed" --body "..."
    fi
```

---

## Summary

### What Happened

- 3 autopilot workflows ran every 5-30 minutes
- Each created a GitHub Issue on failure
- They failed repeatedly for days
- Result: 934 open issues

### What We Did

- ✅ Disabled the 3 problematic workflows
- ✅ Created script to close all issues
- ✅ Documented the problem

### What You Need to Do

1. Run: `bash scripts/close-autopilot-issues.sh`
2. Commit and push the workflow changes
3. Verify issues are closed

### Time to Fix

- Close issues: 5-10 minutes
- Commit changes: 1 minute
- **Total: ~10 minutes**

---

## Commands to Run Now

```bash
# 1. Close all autopilot issues
bash scripts/close-autopilot-issues.sh

# 2. Commit the fixes
git add .github/workflows/ scripts/
git commit -m "fix: disable autopilot workflows creating issue spam"
git push origin main

# 3. Verify
gh issue list --state open --limit 5
```

---

_Problem: 934 autopilot-created issues_  
_Solution: Workflows disabled, script ready to close issues_  
_Time to fix: ~10 minutes_
