#!/bin/bash
# Puppet Autopilot - Deploy to Netlify NOW with Bridge
# This script will deploy your built React app + Bridge to Netlify

set -e

echo "🤖 PUPPET AUTOPILOT DEPLOYMENT"
echo "=============================="
echo ""

# Check if dist exists
if [ ! -d "dist" ]; then
    echo "❌ dist/ folder not found. Building now..."
    pnpm run build
fi

echo "✅ dist/ folder ready with your React app"
echo ""

# Verify bridge files
echo "🔍 Verifying bridge files..."
if [ -f "dist/efh-bridge.js" ]; then
    echo "✅ Bridge script found in dist/"
else
    echo "❌ Bridge script missing! Building again..."
    pnpm run build
fi

if [ -f "dist/api/efh-config.json" ]; then
    echo "✅ Bridge config found in dist/"
else
    echo "❌ Bridge config missing! Building again..."
    pnpm run build
fi

echo ""

# Check for Netlify CLI
if ! command -v netlify &> /dev/null; then
    echo "📦 Installing Netlify CLI..."
    npm install -g netlify-cli
fi

echo "🔐 Netlify CLI Authentication Required"
echo ""
echo "The puppet autopilot needs you to authenticate once."
echo "After this, all future deployments will be automatic."
echo ""
echo "Press ENTER to open browser for authentication..."
read

# Login to Netlify
netlify login

echo ""
echo "✅ Authentication complete!"
echo ""

# Link to site or deploy
echo "🔗 Linking to your Netlify site..."
echo ""

# Try to link to existing site
if netlify link --name elevateforhumanity 2>/dev/null || netlify link 2>/dev/null; then
    echo "✅ Linked to Netlify site"
else
    echo "⚠️  Could not auto-link. Please select your site manually."
fi

echo ""
echo "🚀 Deploying to production..."
echo ""

# Deploy to production
netlify deploy --prod --dir=dist

echo ""
echo "✅ DEPLOYMENT COMPLETE!"
echo ""
echo "Your React app + Bridge is now live at:"
echo "  https://elevateforhumanityfix2.netlify.app"
echo ""
echo "Bridge endpoints:"
echo "  https://elevateforhumanityfix2.netlify.app/efh-bridge.js"
echo "  https://elevateforhumanityfix2.netlify.app/api/efh-config.json"
echo ""
echo "🎯 Next: Add bridge to www.elevateforhumanity.org (Durable)"
echo ""
echo "Copy this to Durable Custom Code:"
echo '<script src="https://elevateforhumanityfix2.netlify.app/efh-bridge.js" data-efh-org="elevate-for-humanity" data-env="prod" defer></script>'
echo ""
echo "🤖 Puppet Autopilot: Mission Complete!"
