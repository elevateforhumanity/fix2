#!/bin/bash
set -e

echo "🚀 Force Netlify Deployment"
echo "============================"
echo ""

# Check if netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "Installing Netlify CLI..."
    npm install -g netlify-cli
fi

# Check authentication
if ! netlify status &> /dev/null; then
    echo "❌ Not authenticated with Netlify"
    echo ""
    echo "Please run:"
    echo "  netlify login"
    echo ""
    echo "Or set NETLIFY_AUTH_TOKEN environment variable"
    exit 1
fi

echo "✅ Authenticated with Netlify"
echo ""

# Build fresh
echo "📦 Building fresh..."
pnpm install
pnpm build

if [ ! -d "dist" ]; then
    echo "❌ Build failed - no dist directory"
    exit 1
fi

echo "✅ Build complete"
echo ""

# Deploy to production
echo "🚀 Deploying to Netlify production..."
netlify deploy --prod --dir=dist

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🌐 Your site should be live at:"
echo "   https://elevateforhumanityfix.netlify.app"
echo ""
echo "⏰ Wait 30-60 seconds for CDN cache to clear"
echo ""
