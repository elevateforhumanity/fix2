#!/usr/bin/env bash
set -euo pipefail

# Close Autopilot Issues Utility
# This script safely closes autopilot-related issues and consolidates them into a summary issue
# Run this manually when you want to clean up the issue storm

echo "🧹 Autopilot Issue Cleanup Utility"
echo "==================================="
echo ""
echo "This script will:"
echo "  1. Create or update a summary issue for the autopilot incident"
echo "  2. Find all open issues with autopilot-related labels"
echo "  3. Close them with a comment referencing the summary issue"
echo ""
read -p "Do you want to proceed? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Cancelled by user"
    exit 0
fi

# Check for GitHub CLI
if ! command -v gh &> /dev/null; then
    echo "❌ ERROR: GitHub CLI (gh) is not installed"
    echo ""
    echo "Install it from: https://cli.github.com/"
    echo ""
    echo "Or use one of these methods:"
    echo "  macOS:   brew install gh"
    echo "  Linux:   curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg"
    echo "  Windows: winget install --id GitHub.cli"
    exit 1
fi

# Check authentication
if ! gh auth status &> /dev/null; then
    echo "❌ ERROR: Not authenticated with GitHub CLI"
    echo ""
    echo "Please run: gh auth login"
    exit 1
fi

echo "✅ GitHub CLI authenticated"
echo ""

# Get repository information
REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)
echo "📦 Repository: $REPO"
echo ""

# Summary issue title and body
SUMMARY_TITLE="Autopilot Incident Consolidation - Issue Storm Resolution"
SUMMARY_BODY="# Autopilot Incident Summary

This issue consolidates all autopilot-related issues that were part of the issue storm incident.

## Background

Between October and November 2025, the autopilot system created hundreds of automated issues due to:
- No issue deduplication
- No cooldown/rate limiting
- Failure notification strategy that created issues on every error

## Resolution

The following comprehensive fixes have been implemented:

### ✅ Security
- Removed all hard-coded secrets from repository
- All secrets now use environment variables
- Added ESLint rule to detect secret patterns

### ✅ Idempotency & Concurrency
- Added lock file mechanism (\`.autopilot-lock\`)
- Implemented idempotent operations
- Graceful degradation for optional operations

### ✅ Health Reporting
- New \`autopilot-health.yml\` workflow (runs every 30 min)
- Centralized status in \`AUTOPILOT_SYSTEM/status.json\`
- Workflow failures instead of issue creation

### ✅ Branch Protection
- New \`branch-protection-check.yml\` workflow
- Daily verification of protection settings
- Fails workflow on drift (no issues)

### ✅ Repository Cleanup
- Removed large binary files (archives, bundles)
- Updated \`.gitignore\` to prevent future commits
- Documentation on generating artifacts locally

### ✅ Documentation
- Updated deployment guides
- Created incident report: \`docs/INCIDENT_AUTOPILOT_CLEANUP.md\`
- Added CODEOWNERS file

## Related Issues

All autopilot-related issues have been closed and consolidated here. The new system:
- Uses centralized health monitoring
- Reports status via workflow checks (not issues)
- Implements deduplication and cooldown for any future issue creation

## Monitoring

Going forward:
- Health checks run every 30 minutes automatically
- Status available in \`AUTOPILOT_SYSTEM/status.json\`
- Branch protection verified daily
- No more issue spam

## Documentation

See these files for more information:
- [Incident Report](./docs/INCIDENT_AUTOPILOT_CLEANUP.md)
- [Deployment Guide](./README_DEPLOYMENT.md)
- [Getting Started](./README_START_HERE.md)

---

**Status:** ✅ Resolved  
**Date:** $(date -I)  
**Related PRs:** Check recent pull requests for implementation details
"

echo "🔍 Searching for existing summary issue..."

# Search for existing summary issue
EXISTING_ISSUE=$(gh issue list --repo "$REPO" --search "$SUMMARY_TITLE" --state open --json number --jq '.[0].number' || echo "")

if [ -n "$EXISTING_ISSUE" ]; then
    echo "✅ Found existing summary issue #$EXISTING_ISSUE"
    SUMMARY_ISSUE=$EXISTING_ISSUE
    
    # Update the issue
    echo "$SUMMARY_BODY" | gh issue edit "$SUMMARY_ISSUE" --repo "$REPO" --body-file - || echo "⚠️  Could not update issue body"
else
    echo "📝 Creating new summary issue..."
    SUMMARY_ISSUE=$(gh issue create --repo "$REPO" \
        --title "$SUMMARY_TITLE" \
        --body "$SUMMARY_BODY" \
        --label "documentation,incident-report" | grep -o '#[0-9]*' | tr -d '#')
    
    echo "✅ Created summary issue #$SUMMARY_ISSUE"
fi

echo ""
echo "🔍 Finding autopilot-related issues..."

# Labels to search for (autopilot-related)
LABELS=(
    "autopilot"
    "auto-heal-failed"
    "auto-push"
    "auto-push-failed"
    "deployment-failed"
    "branch-protection"
    "autopilot-failure"
)

# Collect issue numbers
ISSUE_NUMBERS=()

for label in "${LABELS[@]}"; do
    echo "  Searching for label: $label"
    
    # Get issues with this label (open only)
    ISSUES=$(gh issue list --repo "$REPO" \
        --label "$label" \
        --state open \
        --json number \
        --jq '.[].number' || echo "")
    
    if [ -n "$ISSUES" ]; then
        while IFS= read -r issue; do
            if [ -n "$issue" ]; then
                ISSUE_NUMBERS+=("$issue")
            fi
        done <<< "$ISSUES"
    fi
done

# Remove duplicates
UNIQUE_ISSUES=($(printf '%s\n' "${ISSUE_NUMBERS[@]}" | sort -u))

echo ""
echo "📊 Found ${#UNIQUE_ISSUES[@]} open autopilot-related issues"
echo ""

if [ ${#UNIQUE_ISSUES[@]} -eq 0 ]; then
    echo "✅ No open autopilot issues to close"
    echo ""
    echo "Summary issue: https://github.com/$REPO/issues/$SUMMARY_ISSUE"
    exit 0
fi

# Close issues with a comment
CLOSE_COMMENT="This issue has been consolidated into #$SUMMARY_ISSUE as part of the autopilot incident cleanup.

The autopilot system has been completely redesigned to prevent this type of issue storm:
- ✅ Centralized health monitoring
- ✅ No more duplicate issue creation
- ✅ Workflow-based status reporting
- ✅ Proper rate limiting and deduplication

Please refer to #$SUMMARY_ISSUE for details on the resolution and new architecture.

For ongoing status, check:
- Health workflow: https://github.com/$REPO/actions/workflows/autopilot-health.yml
- Status file: \`AUTOPILOT_SYSTEM/status.json\`

Closing this issue as part of the cleanup."

echo "🔄 Closing issues..."
echo ""

CLOSED_COUNT=0
for issue in "${UNIQUE_ISSUES[@]}"; do
    # Skip the summary issue itself
    if [ "$issue" = "$SUMMARY_ISSUE" ]; then
        continue
    fi
    
    echo "  Closing issue #$issue..."
    
    # Add comment and close
    gh issue comment "$issue" --repo "$REPO" --body "$CLOSE_COMMENT" || echo "    ⚠️  Could not comment"
    gh issue close "$issue" --repo "$REPO" --reason "not planned" || echo "    ⚠️  Could not close"
    
    CLOSED_COUNT=$((CLOSED_COUNT + 1))
    
    # Rate limit: sleep briefly between closures
    sleep 0.5
done

echo ""
echo "✅ Cleanup complete!"
echo ""
echo "📊 Statistics:"
echo "  - Issues closed: $CLOSED_COUNT"
echo "  - Summary issue: #$SUMMARY_ISSUE"
echo ""
echo "🔗 View summary: https://github.com/$REPO/issues/$SUMMARY_ISSUE"
echo ""
echo "💡 Next steps:"
echo "  - Review the summary issue for full incident details"
echo "  - Monitor the health workflow for ongoing status"
echo "  - Check AUTOPILOT_SYSTEM/status.json for current state"
echo ""
