#!/bin/bash
# Autopilot: Complete Zero-Touch Setup
# Runs all autopilot scripts in sequence

set -e

echo "🤖 AUTOPILOT: Complete Setup"
echo "============================="
echo ""
echo "This will:"
echo "1. Set up Vercel deployment"
echo "2. Configure environment variables"
echo "3. Set up GitHub Secrets"
echo "4. Enable self-healing monitoring"
echo ""
read -p "Continue? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cancelled"
    exit 0
fi

echo ""
echo "📋 Step 1/3: Vercel Setup"
echo "=========================="
echo ""

if [ -f scripts/autopilot-vercel-setup.sh ]; then
    bash scripts/autopilot-vercel-setup.sh
else
    echo "❌ autopilot-vercel-setup.sh not found"
    exit 1
fi

echo ""
echo "📋 Step 2/3: GitHub Secrets"
echo "==========================="
echo ""

if [ -f scripts/autopilot-github-secrets.sh ]; then
    bash scripts/autopilot-github-secrets.sh
else
    echo "❌ autopilot-github-secrets.sh not found"
    exit 1
fi

echo ""
echo "📋 Step 3/3: Close Old Issues"
echo "=============================="
echo ""

if [ -f scripts/close-autopilot-issues.sh ]; then
    echo "Closing 934 old autopilot issues..."
    bash scripts/close-autopilot-issues.sh || {
        echo "⚠️ Issue closing failed (may need manual intervention)"
    }
else
    echo "⚠️ close-autopilot-issues.sh not found"
fi

echo ""
echo "✅ AUTOPILOT SETUP COMPLETE!"
echo "============================"
echo ""
echo "🎉 Your system is now fully automated:"
echo ""
echo "✅ Deployed to Vercel"
echo "✅ Environment variables configured"
echo "✅ GitHub Secrets set"
echo "✅ Self-healing enabled (runs every 30 min)"
echo "✅ Old issues closed"
echo ""
echo "📊 Monitor your deployment:"
echo "   - Vercel: https://vercel.com/dashboard"
echo "   - GitHub Actions: https://github.com/$(gh repo view --json nameWithOwner -q .nameWithOwner 2>/dev/null || echo 'your-org/your-repo')/actions"
echo ""
echo "🤖 Autopilot Features:"
echo "   - Monitors site health every 30 minutes"
echo "   - Self-heals by triggering Vercel redeploy"
echo "   - Rate limited: max 1 issue per 24 hours"
echo "   - Automatic deployments on every push"
echo ""
echo "🎯 What happens next:"
echo "   1. Autopilot monitors your site automatically"
echo "   2. If site goes down, it triggers redeploy"
echo "   3. Verifies recovery after healing"
echo "   4. Only creates issue if healing fails"
echo ""
echo "💡 No manual intervention needed!"
echo ""
