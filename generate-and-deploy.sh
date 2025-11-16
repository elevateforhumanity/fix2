#!/usr/bin/env bash
set -euo pipefail

echo "=== Generate Images and Deploy to Vercel ==="
echo ""

# Check if logged into Vercel
if ! vercel whoami &>/dev/null; then
  echo "❌ Not logged into Vercel. Run: vercel login"
  exit 1
fi

# Pull environment variables from Vercel
echo "📥 Pulling environment variables from Vercel..."
vercel env pull .env.local

# Load the API key
if [ -f .env.local ]; then
  export $(cat .env.local | grep OPENAI_API_KEY | xargs)
  echo "✅ Loaded OPENAI_API_KEY from Vercel"
else
  echo "❌ Failed to pull .env.local from Vercel"
  exit 1
fi

# Generate images
echo ""
echo "🎨 Generating course cover images..."
node scripts/generate-images.mjs

# Check if images were generated
if [ -f public/generated-images/manifest.json ]; then
  echo "✅ Images generated successfully"
else
  echo "❌ Image generation failed"
  exit 1
fi

# Commit and push
echo ""
echo "📦 Committing generated images..."
git add public/generated-images/
git commit -m "Generate AI course cover images" || echo "No changes to commit"

echo ""
echo "🚀 Pushing to repository..."
git push

echo ""
echo "✅ Done! Vercel will automatically deploy the new images."
echo ""
echo "Check your deployment at:"
echo "https://vercel.com/elevate-48e460c9/fix2-gpql"
