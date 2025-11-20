#!/usr/bin/env bash
set -e

echo "🔑 Getting Token from GitHub and Running Fix"
echo "============================================="
echo ""

# Check if we're in GitHub Actions
if [ -n "$GITHUB_ACTIONS" ]; then
  echo "✅ Running in GitHub Actions"
  echo "   Token available as environment variable"
  
  if [ -n "$VERCELACESSTOKEN" ]; then
    echo "   ✅ VERCELACESSTOKEN found"
    export VERCELACESSTOKEN="$VERCELACESSTOKEN"
  else
    echo "   ❌ VERCELACESSTOKEN not found in environment"
    exit 1
  fi
else
  echo "⚠️  Not running in GitHub Actions"
  echo ""
  
  # Try to authenticate with GitHub CLI
  echo "🔐 Authenticating with GitHub CLI..."
  
  if ! command -v gh &> /dev/null; then
    echo "   ❌ GitHub CLI not installed"
    echo ""
    echo "   Install: https://cli.github.com/"
    exit 1
  fi
  
  # Check if authenticated
  if ! gh auth status &> /dev/null; then
    echo "   ⚠️  Not authenticated with GitHub CLI"
    echo "   Running: gh auth login"
    echo ""
    gh auth login
  fi
  
  echo "   ✅ GitHub CLI authenticated"
  echo ""
  
  # Get the secret value using GitHub API
  echo "🔍 Fetching VERCELACESSTOKEN from GitHub..."
  
  # Note: GitHub API doesn't allow reading secret values directly
  # We need to use a GitHub Action or have the user provide it
  
  echo "   ⚠️  GitHub API doesn't allow reading secret values directly"
  echo ""
  echo "   📋 Options:"
  echo ""
  echo "   Option 1: Run via GitHub Actions (Recommended)"
  echo "   - Create .github/workflows/fix-vercel.yml"
  echo "   - Trigger workflow manually"
  echo "   - Secret will be available automatically"
  echo ""
  echo "   Option 2: Export manually"
  echo "   - Go to: https://github.com/elevateforhumanity/fix2/settings/secrets/actions"
  echo "   - Find VERCELACESSTOKEN"
  echo "   - Copy value (may need to recreate to see it)"
  echo "   - Run: export VERCELACESSTOKEN=\"your-token\""
  echo "   - Run: pnpm ultimate-fix"
  echo ""
  exit 1
fi

# Run the ultimate fix
echo "🚀 Running ultimate fix..."
echo ""

node scripts/ultimate-fix.mjs
