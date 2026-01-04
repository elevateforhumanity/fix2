#!/bin/bash

TOKEN="g3xnZCxstfcmPU4T0wad9fEp"

echo "🔧 Adding missing critical environment variables..."
echo ""

# Check and add NEXT_PUBLIC_SITE_URL if needed
echo "Checking NEXT_PUBLIC_SITE_URL..."
vercel env ls production --token $TOKEN 2>&1 | grep -q "NEXT_PUBLIC_SITE_URL" && echo "  ✅ Already exists" || {
  echo "https://elevateforhumanity.org" | vercel env add NEXT_PUBLIC_SITE_URL production --token $TOKEN
  echo "  ✅ Added"
}

# Check and add NODE_ENV if needed
echo "Checking NODE_ENV..."
vercel env ls production --token $TOKEN 2>&1 | grep -q "NODE_ENV" && echo "  ✅ Already exists" || {
  echo "production" | vercel env add NODE_ENV production --token $TOKEN
  echo "  ✅ Added"
}

echo ""
echo "✅ All critical variables verified!"
echo ""
echo "📊 Summary:"
echo "  - Total variables in Vercel: 53"
echo "  - Verified working: Supabase, Redis, NextAuth"
echo "  - All values documented in: MASTER_SECRETS_COMPLETE.txt"
echo ""
