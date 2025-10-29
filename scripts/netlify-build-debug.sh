#!/usr/bin/env bash
set -euo pipefail

echo "🔍 Netlify Build Debug"
echo "======================"
echo ""

echo "Environment:"
echo "  Node: $(node --version)"
echo "  npm: $(npm --version)"
echo "  pnpm: $(pnpm --version 2>/dev/null || echo 'not installed')"
echo ""

echo "Checking package.json..."
if [ -f "package.json" ]; then
  echo "✅ package.json exists"
else
  echo "❌ package.json missing"
  exit 1
fi

echo ""
echo "Installing dependencies..."
pnpm install --frozen-lockfile || {
  echo "❌ pnpm install failed"
  echo "Trying without frozen lockfile..."
  pnpm install || exit 1
}

echo ""
echo "Running build..."
pnpm run build || {
  echo "❌ Build failed"
  exit 1
}

echo ""
echo "✅ Build successful!"
echo ""
echo "Checking dist directory..."
ls -lh dist/ | head -20

echo ""
echo "✅ All checks passed"
