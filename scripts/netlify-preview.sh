#!/usr/bin/env bash
set -euo pipefail

echo "🚀 Deploying EFH LMS preview to Netlify..."
echo ""

# Check if netlify CLI is installed
if ! command -v netlify &> /dev/null; then
  echo "📦 Installing Netlify CLI..."
  npm install -g netlify-cli
fi

# Check if logged in
if ! netlify status &> /dev/null; then
  echo "🔐 Please log in to Netlify..."
  netlify login
fi

# Check if site is linked
if [ ! -f .netlify/state.json ]; then
  echo "🔗 Linking to Netlify site..."
  netlify link
fi

# Deploy preview
echo ""
echo "📤 Deploying preview build..."
netlify deploy --build

echo ""
echo "✅ Preview deployed!"
echo ""
echo "💡 To deploy to production, run:"
echo "   netlify deploy --build --prod"
