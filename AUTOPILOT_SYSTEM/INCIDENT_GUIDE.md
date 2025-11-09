# Autopilot Issue Storm - Incident Guide

## Overview

This guide documents the procedure for handling mass issue creation by automated systems (autopilot scripts). This situation occurred when infinite-loop scripts created hundreds of duplicate issues.

## Incident Background

**Problem**: Autopilot scripts with infinite loop logic created excessive GitHub issues:
- Scripts: `autopilot-infinite-fix.sh`, `autopilot-loop.sh`, `autopilot-deploy-loop.sh`
- Issue labels: `autopilot`, `auto-heal-failed`, `auto-push`, `autopilot-created`
- Impact: Repository noise, notification spam, difficult issue tracking

**Root Cause**: 
- No cooldown mechanism between runs
- No lock file to prevent concurrent execution
- Infinite loops without proper exit conditions
- Automatic issue creation on every failure

## Resolution Status

✅ **Prevention Measures Implemented**:
- Deprecated infinite-loop scripts (moved to `deprecated/`)
- Replaced with secure `ACTIVATE_ALL_AUTOPILOT.sh` with lock file mechanism
- Added `ENABLE_AUTOPILOT` feature flag (must be explicitly enabled)
- Implemented cooldown period via `AUTOPILOT_COOLDOWN_SECONDS`
- Created health monitoring that updates status files instead of creating issues

⏳ **Pending Manual Actions**:
- Bulk closure of existing autopilot-generated issues
- Token rotation for any exposed credentials

## Bulk Issue Closure Procedure

### Option 1: Using the Provided Script (Recommended)

```bash
# Step 1: Generate a dry-run report
./scripts/close-autopilot-issues.sh

# Step 2: Review the report
cat AUTOPILOT_SYSTEM/issue-closure-plan.md

# Step 3: Execute the closure (with confirmation)
./scripts/close-autopilot-issues.sh --execute
```

The script will:
- Fetch all open issues with autopilot labels
- Deduplicate by issue number
- Generate a summary report
- In execute mode: Prompt for confirmation before closing
- Close issues with a standard comment explaining the cleanup

### Option 2: Manual Closure via GitHub CLI

```bash
# Authenticate with GitHub CLI
gh auth login

# List issues with autopilot label
gh issue list --label "autopilot" --state open --limit 1000

# Close issues one by one (replace NUMBER)
gh issue close NUMBER --comment "Closing autopilot-generated issue as part of repository cleanup."

# Bulk close (use with caution - review list first)
gh issue list --label "autopilot" --state open --limit 1000 --json number --jq '.[].number' | \
  xargs -I {} gh issue close {} --comment "Closing autopilot-generated issue as part of repository cleanup."
```

### Option 3: Using GitHub Web UI

1. Navigate to Issues tab
2. Filter by label: `is:issue is:open label:autopilot`
3. Select issues manually
4. Use bulk actions to close
5. Add closure comment explaining cleanup

**Note**: Web UI has limitations for bulk operations. CLI is recommended for large numbers.

### Option 4: GitHub API Script

```bash
# Get repository info
OWNER="elevateforhumanity"
REPO="fix2"
TOKEN="your-github-token"

# Fetch and close autopilot issues
curl -H "Authorization: token $TOKEN" \
  "https://api.github.com/repos/$OWNER/$REPO/issues?labels=autopilot&state=open&per_page=100" | \
  jq -r '.[].number' | \
  while read issue_num; do
    echo "Closing issue #$issue_num"
    curl -X PATCH \
      -H "Authorization: token $TOKEN" \
      -H "Content-Type: application/json" \
      "https://api.github.com/repos/$OWNER/$REPO/issues/$issue_num" \
      -d '{"state":"closed","body":"Closing autopilot-generated issue as part of repository cleanup."}'
    sleep 1  # Rate limiting
  done
```

## Issue Identification Criteria

Close issues that match ALL of these criteria:
- Label: `autopilot`, `auto-heal-failed`, `auto-push`, or `autopilot-created`
- Created by: `github-actions[bot]` or autopilot scripts
- Title contains: "Autopilot", "Auto-heal", "Deploy failed", etc.
- Duplicates of the same issue
- No meaningful human discussion in comments

**Do NOT close issues that**:
- Have meaningful discussion or investigation in comments
- Are tracking legitimate bugs (even if created by autopilot)
- Are referenced by other issues or PRs
- Have been manually triaged and labeled differently

## Prevention Going Forward

### For Repository Maintainers

1. **Environment Setup**:
   ```bash
   # Always require explicit enablement
   export ENABLE_AUTOPILOT=false  # Default
   
   # When enabling, set reasonable cooldown
   export ENABLE_AUTOPILOT=true
   export AUTOPILOT_COOLDOWN_SECONDS=3600  # 1 hour
   ```

2. **Monitor Status File**:
   - Check `AUTOPILOT_SYSTEM/status.json` regularly
   - Health score below 50% indicates issues
   - Review `errors` array for patterns

3. **Use GitHub Actions Workflows**:
   - `.github/workflows/autopilot-health.yml` runs every 30 minutes
   - `.github/workflows/branch-protection-guard.yml` validates CI health
   - These workflows update status files, not issues

4. **Never Use Deprecated Scripts**:
   - `deprecated/autopilot-infinite-fix.sh` ❌
   - `deprecated/autopilot-loop.sh` ❌
   - `deprecated/autopilot-deploy-loop.sh` ❌

### For Contributors

1. **Before Running Autopilot**:
   - Read `.env.example` and set all required variables
   - Verify `ENABLE_AUTOPILOT=true` is intentional
   - Understand the lock file mechanism

2. **If Autopilot Fails**:
   - Check `AUTOPILOT_SYSTEM/status.json` for errors
   - Review recent commits for configuration changes
   - Run `node scripts/autopilot-health.js` for diagnostics
   - **Do NOT** run deprecated infinite-loop scripts

3. **Reporting Issues**:
   - Check if issue already exists before creating
   - Use descriptive titles (avoid generic "Build failed")
   - Include relevant logs and context
   - Tag with appropriate labels

## Communication Template

When bulk-closing issues, use this comment:

```
Closing this autopilot-generated issue as part of repository cleanup.

**Context**: The autopilot system previously had infinite-loop scripts that 
created excessive duplicate issues. These scripts have been deprecated and 
replaced with improved automation that:
- Uses lock files to prevent concurrent runs
- Updates status files instead of creating issues
- Requires explicit enablement via feature flags
- Includes proper cooldown mechanisms

**Current Status**: Autopilot monitoring now uses:
- Health check workflows (`.github/workflows/autopilot-health.yml`)
- Status tracking (`AUTOPILOT_SYSTEM/status.json`)
- See `AUTOPILOT_SYSTEM/README.md` for documentation

If this issue represents a legitimate bug that still exists, please reopen 
with updated context or create a new issue with current details.
```

## Monitoring Post-Cleanup

After bulk closure, monitor for:

1. **New Issue Creation Rate**:
   - Should be near zero from autopilot
   - Any spikes indicate script misconfiguration

2. **GitHub Actions Status**:
   - Health check workflow should pass
   - Status file should show `healthy` or `degraded`

3. **Lock File Issues**:
   - Check for stale `.autopilot-lock` files
   - Autopilot should complete within minutes, not hours

4. **Error Patterns**:
   ```bash
   # Check for repeated errors
   jq -r '.errors[]' AUTOPILOT_SYSTEM/status.json | sort | uniq -c | sort -rn
   ```

## Escalation

If issues persist after cleanup:

1. **Disable Autopilot**:
   ```bash
   export ENABLE_AUTOPILOT=false
   ```

2. **Check for Rogue Processes**:
   ```bash
   ps aux | grep -i autopilot
   killall -9 bash  # Last resort if stuck
   ```

3. **Review Recent Changes**:
   ```bash
   git log --since="1 week ago" --grep="autopilot" --oneline
   ```

4. **Contact Repository Admins**:
   - Report issue creation rate
   - Share `status.json` and recent logs
   - Provide steps to reproduce

## Lessons Learned

1. **Always use lock files** for idempotent scripts
2. **Never create issues automatically** - use status files and logs
3. **Implement cooldown periods** for any repeated automation
4. **Require explicit opt-in** for potentially disruptive features
5. **Monitor automation health** with proper observability

## Related Documentation

- `AUTOPILOT_SYSTEM/README.md` - Autopilot system overview
- `deprecated/README.md` - Why scripts were deprecated
- `SECURITY_CLEANUP_CHECKLIST.md` - Post-cleanup security steps
- `.env.example` - Environment variable configuration

---

**Last Updated**: 2024-11-09
**Status**: Resolved (prevention measures in place, cleanup pending)
**Owner**: Repository maintainers
