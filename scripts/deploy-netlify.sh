#!/usr/bin/env bash
set -euo pipefail

echo "🚀 Deploying EFH LMS to Netlify..."
echo ""

# Check if netlify CLI is installed
if ! command -v netlify &> /dev/null; then
  echo "📦 Installing Netlify CLI..."
  npm install -g netlify-cli
fi

# Check if logged in
echo "🔐 Checking Netlify authentication..."
if ! netlify status &> /dev/null; then
  echo "Please log in to Netlify..."
  netlify login
fi

# Check if site is linked
if [ ! -f .netlify/state.json ]; then
  echo ""
  echo "🔗 Site not linked. Linking to Netlify..."
  echo ""
  echo "💡 Choose option 2: 'Link this directory to an existing site'"
  echo "   Then search for: elevateforhumanityfix"
  echo ""
  netlify link
fi

# Build and deploy to production
echo ""
echo "🏗️  Building production bundle..."
pnpm run build

echo ""
echo "📤 Deploying to production..."
netlify deploy --prod --dir=dist

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🔗 Your site: https://elevateforhumanityfix.netlify.app"
echo ""
echo "💡 Changes should be live in 1-2 minutes"
