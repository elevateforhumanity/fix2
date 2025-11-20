#!/usr/bin/env bash
set -euo pipefail

echo "🚀 Elevate Autopilot – Production Deploy"
echo "----------------------------------------"

# 1) Show current branch and last commit
echo ""
echo "📌 Git status:"
git status -sb || true
echo ""

echo "🔎 Last commit:"
git log -1 --oneline || true
echo ""

# 2) Add a gentle reminder to bump your BUILD MARKER
echo "⚠️ Reminder:"
echo "  • Update your BUILD MARKER text in a visible component (e.g. app/page.tsx)"
echo "  • Example: BUILD MARKER: v$(date +%Y-%m-%d-%H%M)"
echo ""

# 3) Clean build (uses the scripts we already defined in package.json)
echo "🧹 Running clean build (this may take a bit)..."
pnpm clean-build

# 4) Deploy to Vercel production
echo ""
echo "🌐 Deploying to Vercel (production)..."
npx vercel --prod --confirm

echo ""
echo "✅ Deploy complete."
echo ""
echo "💡 Now open:"
echo "   • https://fix2-gpql.vercel.app"
echo "   • https://www.elevateforhumanity.org  (when fully wired)"
echo ""
echo "❌ Do NOT trust old hashed URLs like:"
echo "   • https://fix2-gpql-qfpvev81v-elevate-48e460c9.vercel.app"
echo ""
echo "🔁 If you don't see your new BUILD MARKER, hard-refresh the browser (Ctrl+Shift+R / Cmd+Shift+R)."
