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

# 2. Install dependencies (pick the one you use)
# Comment/uncomment as needed

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

# 3. Show key env vars (without leaking secrets)
echo "🧩 Checking important environment vars (masked)..."
SAFE_ENV_VARS=(
  "NODE_ENV"
  "NEXT_PUBLIC_SITE_URL"
  "NEXT_PUBLIC_API_URL"
  "NEXT_PUBLIC_SUPABASE_URL"
  "NEXT_PUBLIC_SUPABASE_ANON_KEY"
  "SUPABASE_SERVICE_ROLE_KEY"
  "VERCEL"
  "VERCEL_ENV"
  "VERCEL_URL"
  "NEXT_PUBLIC_VAPID_PUBLIC_KEY"
  "VAPID_PRIVATE_KEY"
  "VAPID_SUBJECT"
)

for VAR in "${SAFE_ENV_VARS[@]}"; do
  VAL="${!VAR-}"
  if [ -n "$VAL" ]; then
    # Mask most of the value
    echo "  $VAR = ${VAL:0:4}******** (${#VAL} chars)"
  else
    echo "  $VAR = (not set)"
  fi
done
echo

# 4. Check PWA files
echo "🎨 Checking PWA files..."
PWA_FILES=(
  "public/manifest.json"
  "public/sw.js"
  "public/icon-192.png"
  "public/icon-512.png"
  "app/offline/page.tsx"
)

for FILE in "${PWA_FILES[@]}"; do
  if [ -f "$FILE" ]; then
    echo "  ✅ $FILE"
  else
    echo "  ❌ $FILE (missing)"
  fi
done
echo

# 5. Verify PWA configuration
echo "🔍 Running PWA verification..."
if [ -f "scripts/verify-pwa.cjs" ]; then
  node scripts/verify-pwa.cjs || echo "⚠️ PWA verification had warnings"
else
  echo "⚠️ PWA verification script not found"
fi
echo

# 6. Lint (optional but helpful)
if npm run | grep -q "lint"; then
  echo "✅ Running lint..."
  npm run lint || echo "⚠️ Lint failed (not fatal for this script)."
  echo
fi

# 7. TypeScript check
echo "🔍 Running TypeScript check..."
if npm run | grep -q "typecheck"; then
  npm run typecheck || echo "⚠️ TypeScript check failed"
else
  echo "⚠️ No typecheck script found"
fi
echo

# 8. Try a production build (this is what Vercel does)
echo "🏗  Running production build (this should mimic Vercel)..."
if npm run | grep -q "build"; then
  npm run build
else
  echo "❌ No 'build' script found in package.json."
  echo "   Add a build script like: \"build\": \"next build\" or \"vite build\"."
  exit 1
fi
echo

echo "🎉 Build finished successfully!"
echo

# 9. Show what needs to be added to Vercel
echo "📋 Environment Variables needed on Vercel:"
echo "   (Copy these to Vercel Dashboard → Settings → Environment Variables)"
echo
echo "   Required for Supabase:"
echo "   - NEXT_PUBLIC_SUPABASE_URL"
echo "   - NEXT_PUBLIC_SUPABASE_ANON_KEY"
echo "   - SUPABASE_SERVICE_ROLE_KEY"
echo
echo "   Required for PWA Push Notifications:"
echo "   - NEXT_PUBLIC_VAPID_PUBLIC_KEY"
echo "   - VAPID_PRIVATE_KEY"
echo "   - VAPID_SUBJECT"
echo
echo "   Generate VAPID keys with: npm run generate:vapid"
echo

# 10. Check git status
echo "📊 Git status:"
git status --short || echo "Not a git repository"
echo

# 11. Show recent commits
echo "📝 Recent commits:"
git log --oneline -5 || echo "No git history"
echo

echo "🎉 All checks complete!"
echo
echo "If this succeeded, your Vercel issue is likely:"
echo "  - Missing env var on Vercel (see list above)"
echo "  - Different Node version on Vercel (check package.json engines)"
echo "  - Vercel project settings (build command/output dir)"
echo

# 12. Optional: start dev server so you can visually check
if npm run | grep -q "dev"; then
  echo "🚀 Next steps:"
  echo "   1. Run: npm run dev"
  echo "   2. Open the Gitpod preview to confirm everything works"
  echo "   3. Add missing env vars to Vercel"
  echo "   4. Push to GitHub to trigger Vercel rebuild"
fi

echo
echo "==============================="
echo "  Done. Check the logs above."
echo "==============================="
