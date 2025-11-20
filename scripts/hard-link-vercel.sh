#!/bin/bash
set -e

# Run from repo root: ./scripts/hard-link-vercel.sh

if [ -z "$VERCEL_TOKEN" ]; then
  echo "❌ VERCEL_TOKEN is not set. Export it before running this script."
  echo "   Example: export VERCEL_TOKEN=your_new_token_here"
  exit 1
fi

echo "🧹 Cleaning old .vercel link..."
rm -rf .vercel

echo "📁 Recreating .vercel/project.json for fix2-gpql..."
mkdir -p .vercel

cat > .vercel/project.json << 'EOF'
{
  "projectId": "prj_WSdzX00UNP1rcWNXQ3RrpeuVOkeA",
  "orgId": "team_Ae8f33vVYR36quLOS8HCeROs",
  "projectName": "fix2-gpql"
}
EOF

echo "✅ .vercel/project.json written:"
cat .vercel/project.json

echo
echo "🔗 Forcing Vercel CLI link to project: fix2-gpql ..."
npx vercel link --project fix2-gpql --yes --token="$VERCEL_TOKEN"

echo
echo "🔍 Verifying link (project.json):"
cat .vercel/project.json

echo
echo "✅ Hard link to fix2-gpql complete."
echo "Next time you run 'npx vercel --prod', it will deploy to fix2-gpql only."
