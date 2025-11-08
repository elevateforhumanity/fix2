#!/bin/bash
# Close all autopilot-created GitHub Issues

set -e

echo "🧹 Closing Autopilot-Created Issues"
echo "===================================="
echo ""

# Check if gh CLI is available
if ! command -v gh &> /dev/null; then
    echo "❌ Error: GitHub CLI (gh) is not installed"
    echo "Install it: https://cli.github.com/"
    exit 1
fi

# Check if authenticated
if ! gh auth status &> /dev/null; then
    echo "🔐 Please login to GitHub CLI..."
    gh auth login
fi

echo "📋 Fetching autopilot issues..."
echo ""

# Close all issues created by github-actions with autopilot labels
gh issue list \
  --author "app/github-actions" \
  --label "autopilot" \
  --state open \
  --limit 1000 \
  --json number \
  --jq '.[].number' | while read -r issue_number; do
    echo "Closing issue #$issue_number..."
    gh issue close "$issue_number" --comment "Closing autopilot-generated issue. Autopilot workflows have been disabled to prevent issue spam."
done

echo ""
echo "✅ All autopilot issues closed!"
echo ""
echo "📊 Remaining open issues:"
gh issue list --state open --limit 5

echo ""
echo "💡 To close ALL remaining autopilot issues (if any):"
echo "   gh issue list --author 'app/github-actions' --state open --json number --jq '.[].number' | xargs -I {} gh issue close {}"
