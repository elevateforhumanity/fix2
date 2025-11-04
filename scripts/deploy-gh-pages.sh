#!/bin/bash
# Deploy to GitHub Pages without API keys
set -e

echo "📦 Building for GitHub Pages..."
npm run build

echo "🌿 Creating gh-pages branch..."
git checkout -b gh-pages 2>/dev/null || git checkout gh-pages

echo "📋 Copying dist contents..."
cp -r dist/* .
git add .
git commit -m "Deploy to GitHub Pages" || true

echo "🚀 Pushing to GitHub..."
git push origin gh-pages --force

echo "✅ Deployed! Enable GitHub Pages in repo settings."
echo "   Settings → Pages → Source: gh-pages branch"
git checkout main
