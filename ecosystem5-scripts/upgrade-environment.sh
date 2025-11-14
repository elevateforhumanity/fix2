#!/usr/bin/env bash
# Comprehensive environment upgrade script for Gitpod
set -e

echo "🔧 EFH Environment Upgrade Script"
echo "=================================="

# 1. Upgrade pnpm
echo ""
echo "📦 Upgrading pnpm to latest version..."
corepack install -g pnpm@10.18.0
corepack enable
pnpm --version

# 2. Clean old dependencies
echo ""
echo "🧹 Cleaning old dependencies..."
rm -rf node_modules .pnpm-store backend/node_modules frontend/node_modules || true
rm -rf backend/package-lock.json frontend/package-lock.json || true

# 3. Configure pnpm cache
echo ""
echo "⚙️  Configuring pnpm cache..."
mkdir -p /workspace/.cache/pnpm
pnpm config set store-dir /workspace/.cache/pnpm

# 4. Install dependencies with latest pnpm
echo ""
echo "📥 Installing dependencies..."
pnpm install --no-frozen-lockfile

# 5. Upgrade all dependencies
echo ""
echo "⬆️  Upgrading all packages to latest compatible versions..."
pnpm up -r --latest

# 6. Audit and fix vulnerabilities
echo ""
echo "🔒 Auditing security..."
pnpm audit --fix || echo "⚠️  Some vulnerabilities may require manual review"

# 7. Verify installations
echo ""
echo "✅ Verifying installations..."
echo "Node version: $(node --version)"
echo "pnpm version: $(pnpm --version)"
echo "npm version: $(npm --version)"

echo ""
echo "✅ Environment upgrade complete!"
echo ""
echo "Next steps:"
echo "  1. Test backend: pnpm --filter backend dev"
echo "  2. Test frontend: pnpm --filter frontend dev"
echo "  3. Commit changes: git add -A && git commit -m 'chore: upgrade environment'"
