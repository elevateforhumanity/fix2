#!/usr/bin/env bash
set -euo pipefail

echo "🧹 Vercel Project Cleanup Script"
echo "=================================="
echo ""
echo "⚠️  WARNING: This will help identify projects to delete"
echo "⚠️  KEEP: fix2-gpql (has your domain)"
echo "⚠️  DELETE: fix2, fix2cloud, and any others"
echo ""

if [ -z "${VERCEL_TOKEN:-}" ]; then
  echo "❌ VERCEL_TOKEN not set"
  echo "Set it with: export VERCEL_TOKEN='your-token'"
  exit 1
fi

echo "📋 Listing all projects..."
echo ""

# List all projects
npx vercel ls --token=$VERCEL_TOKEN 2>&1 || true

echo ""
echo "=================================="
echo ""
echo "🎯 Projects to KEEP:"
echo "  ✅ fix2-gpql (has www.elevateforhumanity.org)"
echo ""
echo "🗑️  Projects to DELETE:"
echo "  ❌ fix2"
echo "  ❌ fix2cloud"
echo "  ❌ Any other fix2-* variants"
echo ""
echo "=================================="
echo ""
echo "To delete a project manually:"
echo "1. Go to: https://vercel.com/elevate-48e460c9"
echo "2. Click on the project (e.g., 'fix2')"
echo "3. Go to Settings → General"
echo "4. Scroll to bottom → Delete Project"
echo ""
echo "Or use Vercel CLI:"
echo "  npx vercel remove <project-name> --yes --token=\$VERCEL_TOKEN"
echo ""
echo "Example:"
echo "  npx vercel remove fix2 --yes --token=\$VERCEL_TOKEN"
echo "  npx vercel remove fix2cloud --yes --yes --token=\$VERCEL_TOKEN"
echo ""
