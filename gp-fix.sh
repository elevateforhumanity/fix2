#!/usr/bin/env bash
# gp-fix.sh
# One-shot Gitpod helper to debug Vercel build + env issues

set -euo pipefail

echo "==============================="
echo "  Elevate Fix Helper (Gitpod)"
echo "==============================="
echo

# 1. Basic system info
echo "🔍 Checking system info..."
echo "PWD: $(pwd)"
echo "Node version: $(node -v || echo 'Node not found')"
echo "NPM version:  $(npm -v || echo 'npm not found')"
echo "PNPM version: $(pnpm -v || echo 'pnpm not found')"
echo "Yarn version: $(yarn -v || echo 'yarn not found')"
echo

# 2. Install dependencies (auto-detect lockfile)
if [ -f "pnpm-lock.yaml" ]; then
  echo "📦 Installing deps with pnpm..."
  pnpm install
elif [ -f "yarn.lock" ]; then
  echo "📦 Installing deps with yarn..."
  yarn install
else
  echo "📦 Installing deps with npm..."
  npm install
fi
echo

# 3. Check important env vars (and tell you what to add to Vercel)
echo "🧩 Checking important environment vars (masked)..."
SAFE_ENV_VARS=(
  "NODE_ENV"
  "NEXT_PUBLIC_SITE_URL"
  "NEXT_PUBLIC_APP_URL"
  "NEXT_PUBLIC_BASE_URL"
  "NEXT_PUBLIC_SUPABASE_URL"
  "NEXT_PUBLIC_SUPABASE_ANON_KEY"
  "SUPABASE_SERVICE_ROLE_KEY"
  "NEXT_PUBLIC_VAPID_PUBLIC_KEY"
  "VAPID_PRIVATE_KEY"
  "VAPID_PUBLIC_KEY"
  "VAPID_SUBJECT"
  "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
  "STRIPE_SECRET_KEY"
  "STRIPE_WEBHOOK_SECRET"
  "RESEND_API_KEY"
  "EMAIL_FROM"
  "MOU_ARCHIVE_EMAIL"
  "NEXT_PUBLIC_GA_MEASUREMENT_ID"
  "NEXT_PUBLIC_FACEBOOK_PIXEL_ID"
  "NEXT_PUBLIC_FACEBOOK_APP_ID"
  "NEXT_PUBLIC_XAPI_ENDPOINT"
  "XAPI_USERNAME"
  "XAPI_PASSWORD"
  "OPENAI_API_KEY"
  "REACT_APP_JITSI_DOMAIN"
  "CRON_SECRET"
  "VERCEL"
  "VERCEL_ENV"
  "VERCEL_URL"
)

MISSING_ENV=()

for VAR in "${SAFE_ENV_VARS[@]}"; do
  VAL="${!VAR-}"
  if [ -n "$VAL" ]; then
    # Mask most of the value
    echo "  $VAR = ${VAL:0:4}******** (${#VAL} chars)"
  else
    echo "  $VAR = (not set)"
    MISSING_ENV+=("$VAR")
  fi
done
echo

if [ ${#MISSING_ENV[@]} -gt 0 ]; then
  echo "⚠️  The following env vars are NOT set in Gitpod:"
  for VAR in "${MISSING_ENV[@]}"; do
    echo "  - $VAR"
  done
  echo
  echo "👉 Make sure these exist in your Vercel project settings as well:"
  echo "   Vercel → Project → Settings → Environment Variables"
  echo "   Add them there using the same names."
  echo
fi

# 4. Lint (optional)
if npm run | grep -q "lint"; then
  echo "✅ Running lint..."
  npm run lint || echo "⚠️ Lint failed (not fatal for this script)."
  echo
fi

# 5. Run tests if available
if npm run | grep -q "test"; then
  echo "✅ Running tests..."
  npm test || echo "⚠️ Tests failed (not fatal for this script)."
  echo
fi

# 6. Try a production build (this is what Vercel does)
echo "🏗  Running production build (this should mimic Vercel)..."
if npm run | grep -q "build"; then
  npm run build
else
  echo "❌ No 'build' script found in package.json."
  echo "   Add a build script like: \"build\": \"next build\" or \"vite build\"."
  exit 1
fi
echo

echo "🎉 Build finished in Gitpod."
echo "   If this succeeded but Vercel still fails, your problem is almost certainly:"
echo "   - Missing env var on Vercel, or"
echo "   - Different Node version / build settings on Vercel."
echo

# 7. Dev server hint
if npm run | grep -q "dev"; then
  echo "🚀 You can now run: npm run dev"
  echo "   and use the Gitpod preview to click around and verify pages."
fi

echo
echo "==============================="
echo "  Done. Scroll up for errors."
echo "=============================="
