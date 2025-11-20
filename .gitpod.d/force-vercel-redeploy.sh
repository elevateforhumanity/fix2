#!/bin/bash

echo "🚨 Forcing Vercel to deploy with ZERO cache..."

# 1. Delete Vercel build cache
rm -rf .next
rm -rf node_modules/.cache
rm -rf .vercel

# 2. Force new build hash
echo "CACHEBUSTER=$(date +%s)" >> .env.local

# 3. Trigger a new Vercel build
vercel --prod --force

echo "🔥 Deployment forced. No cache will be used."
