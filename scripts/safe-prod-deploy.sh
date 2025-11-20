#!/bin/bash
set -e

if [ -z "$VERCEL_TOKEN" ]; then
  echo "❌ VERCEL_TOKEN is not set."
  exit 1
fi

# 1. Make sure we are linked correctly
./scripts/hard-link-vercel.sh

# 2. Deploy to production for fix2-gpql
echo
echo "🚀 Deploying to Vercel (fix2-gpql, production)..."
npx vercel --prod --yes --token="$VERCEL_TOKEN"

echo "✅ Deployment command finished. Check Vercel dashboard for status."
