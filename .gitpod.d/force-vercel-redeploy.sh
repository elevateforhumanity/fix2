#!/bin/bash
set -e

if [ -z "$VERCEL_DEPLOY_HOOK_URL" ]; then
  echo "❌ Missing VERCEL_DEPLOY_HOOK_URL"
  exit 1
fi

echo "🚀 Triggering Vercel fresh deployment..."
curl -X POST "$VERCEL_DEPLOY_HOOK_URL"
echo "🔥 Fresh deployment started!"
