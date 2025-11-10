#!/bin/bash
# Copy bridge files to dist after build

echo "📦 Copying bridge files to dist..."

# Ensure dist exists
mkdir -p dist

# Copy bridge files from public/
cp public/inject-bridge.js dist/ 2>/dev/null || echo "⚠️  inject-bridge.js not found"
cp public/auto-inject-bridge.html dist/ 2>/dev/null || echo "⚠️  auto-inject-bridge.html not found"
cp public/efh-bridge.js dist/ 2>/dev/null || echo "ℹ️  efh-bridge.js not in public"

# Copy ALL files from bridge/public/ to dist/
if [ -d "bridge/public" ]; then
  echo "📦 Copying files from bridge/public/ to dist/..."
  cp bridge/public/* dist/ 2>/dev/null || echo "⚠️  No files in bridge/public/"
  echo "✅ Bridge files copied from bridge/public/"
fi

echo "✅ Bridge files copied to dist"
ls -la dist/ | grep -E "(inject|efh-bridge|enrollment)" || true
