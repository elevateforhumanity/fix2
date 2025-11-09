#!/bin/bash

echo "🔍 Checking GitHub Actions Status"
echo "=================================="
echo ""

# Check if gh CLI is available
if ! command -v gh &> /dev/null; then
    echo "Installing GitHub CLI..."
    type -p curl >/dev/null || (sudo apt update && sudo apt install curl -y)
    curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
    sudo chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
    sudo apt update
    sudo apt install gh -y
fi

# Check authentication
if ! gh auth status &> /dev/null; then
    echo "❌ Not authenticated with GitHub CLI"
    echo ""
    echo "Run: gh auth login"
    exit 1
fi

echo "✓ GitHub CLI authenticated"
echo ""

# Get latest workflow runs
echo "📊 Latest Workflow Runs:"
echo ""
gh run list --limit 5

echo ""
echo "🔍 Checking latest failed run..."
echo ""

# Get the latest failed run
FAILED_RUN=$(gh run list --status failure --limit 1 --json databaseId --jq '.[0].databaseId')

if [ ! -z "$FAILED_RUN" ]; then
    echo "Latest failed run: $FAILED_RUN"
    echo ""
    echo "Viewing logs..."
    gh run view $FAILED_RUN --log-failed
else
    echo "✓ No recent failed runs"
fi

echo ""
echo "🔍 Checking runs requiring action..."
echo ""

# Check for action_required runs
gh run list --status action_required --limit 5

echo ""
echo "📝 To view a specific run:"
echo "  gh run view <run-id>"
echo ""
echo "📝 To view logs:"
echo "  gh run view <run-id> --log"
echo ""
