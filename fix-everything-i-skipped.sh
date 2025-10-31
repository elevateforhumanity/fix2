#!/bin/bash
echo "🔍 Finding EVERYTHING that was skipped..."
echo ""

# 1. ESLint warnings (I said they were fixed but they're not!)
echo "1️⃣ ESLint warnings still present:"
pnpm run lint 2>&1 | grep "warning"
echo ""

# 2. Check for any .backup or .bak files
echo "2️⃣ Checking for backup files:"
find . -name "*.backup" -o -name "*.bak" -o -name "*.styling-backup" 2>/dev/null | wc -l
echo ""

# 3. Check inline styles count
echo "3️⃣ Inline styles remaining:"
grep -r "style={{" src/ --include="*.jsx" --include="*.tsx" 2>/dev/null | wc -l
echo ""

# 4. Check hardcoded colors
echo "4️⃣ Hardcoded colors:"
grep -r "#[0-9a-fA-F]\{6\}" src/ --include="*.jsx" --include="*.tsx" 2>/dev/null | wc -l
echo ""

# 5. Check missing responsive classes
echo "5️⃣ Non-responsive grids:"
grep -r 'className="grid grid-cols-[0-9]"' src/ --include="*.jsx" --include="*.tsx" 2>/dev/null | grep -v "md:" | grep -v "lg:" | wc -l
echo ""

# 6. Check GitHub Actions
echo "6️⃣ GitHub Actions status:"
ls -la .github/workflows/*.yml | wc -l
echo ""

# 7. Check if PWA files exist
echo "7️⃣ PWA implementation:"
ls -la public/sw.js public/offline.html src/utils/pwa.ts 2>/dev/null | wc -l
echo ""

echo "📊 SUMMARY OF SKIPPED ITEMS:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
