#!/usr/bin/env bash
set -euo pipefail

echo "🗑️  Delete Duplicate Vercel Projects"
echo "====================================="
echo ""
echo "⚠️  This will DELETE the following projects:"
echo "  ❌ fix2"
echo "  ❌ fix2cloud"
echo ""
echo "✅ This will KEEP:"
echo "  ✅ fix2-gpql (has your domain)"
echo ""
read -p "Are you sure? Type 'DELETE' to confirm: " confirm

if [ "$confirm" != "DELETE" ]; then
  echo "❌ Cancelled"
  exit 1
fi

if [ -z "${VERCEL_TOKEN:-}" ]; then
  echo "❌ VERCEL_TOKEN not set"
  echo "Set it with: export VERCEL_TOKEN='your-token'"
  exit 1
fi

echo ""
echo "🗑️  Deleting fix2..."
npx vercel remove fix2 --yes --token=$VERCEL_TOKEN 2>&1 || echo "⚠️  Could not delete fix2 (may not exist or no permission)"

echo ""
echo "🗑️  Deleting fix2cloud..."
npx vercel remove fix2cloud --yes --token=$VERCEL_TOKEN 2>&1 || echo "⚠️  Could not delete fix2cloud (may not exist or no permission)"

echo ""
echo "✅ Cleanup complete!"
echo ""
echo "Remaining project:"
echo "  ✅ fix2-gpql"
echo ""
echo "Verify at: https://vercel.com/elevate-48e460c9"
