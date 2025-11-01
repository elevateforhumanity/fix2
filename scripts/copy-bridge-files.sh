#!/bin/bash
# Copy bridge files to dist after build

echo "📦 Copying bridge files to dist..."

# Ensure dist exists
mkdir -p dist

# Copy bridge files
cp public/inject-bridge.js dist/ 2>/dev/null || echo "⚠️  inject-bridge.js not found"
cp public/auto-inject-bridge.html dist/ 2>/dev/null || echo "⚠️  auto-inject-bridge.html not found"

# Copy efh-bridge.js if it exists
cp public/efh-bridge.js dist/ 2>/dev/null || echo "ℹ️  efh-bridge.js not in public (may be in bridge/)"

echo "✅ Bridge files copied to dist"
ls -la dist/ | grep -E "(inject|efh-bridge)" || echo "No bridge files found in dist"
