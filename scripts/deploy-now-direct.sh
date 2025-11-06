#!/usr/bin/env bash
set -euo pipefail

echo "🚀 DIRECT DEPLOYMENT TO NETLIFY"
echo "Building and deploying the Vite/React app directly..."
echo ""

# Check if we have the site ID
SITE_ID="12f120ab-3f63-419b-bc49-430f043415c1"

# Install netlify-cli if not present
if ! command -v netlify &> /dev/null; then
    echo "→ Installing Netlify CLI..."
    npm install -g netlify-cli
fi

# Build the app
echo "→ Building Vite/React app..."
npm install
npm run build

# Verify build output
if [ ! -f "dist/index.html" ]; then
    echo "❌ Build failed - dist/index.html not found"
    exit 1
fi

echo "✅ Build complete: dist/index.html exists"
echo ""

# Deploy to Netlify
if [ -n "${NETLIFY_AUTH_TOKEN:-}" ]; then
    echo "→ Deploying to Netlify (production)..."
    netlify deploy \
        --prod \
        --dir=dist \
        --site=$SITE_ID \
        --auth=$NETLIFY_AUTH_TOKEN \
        --message="Direct deploy - Vite/React app (overwrite Next.js)"
    
    echo ""
    echo "✅ DEPLOYMENT COMPLETE!"
    echo ""
    echo "→ Waiting 10 seconds for CDN propagation..."
    sleep 10
    
    echo "→ Verifying deployment..."
    bash scripts/verify-deployment.sh https://elevateforhumanityfix.netlify.app
else
    echo "⚠ NETLIFY_AUTH_TOKEN not set"
    echo ""
    echo "To deploy, run:"
    echo "  export NETLIFY_AUTH_TOKEN=<your-token>"
    echo "  bash scripts/deploy-now-direct.sh"
    echo ""
    echo "Or deploy manually:"
    echo "  netlify deploy --prod --dir=dist --site=$SITE_ID"
fi
