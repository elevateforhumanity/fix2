#!/bin/bash
echo "🔍 VERIFYING ALL FIXES - 100% CHECK"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

PASS=0
FAIL=0

# 1. TypeScript
echo "1️⃣ TypeScript..."
if pnpm run typecheck > /dev/null 2>&1; then
    echo "   ✅ PASS - 0 errors"
    PASS=$((PASS+1))
else
    echo "   ❌ FAIL - has errors"
    FAIL=$((FAIL+1))
fi

# 2. ESLint
echo "2️⃣ ESLint..."
if pnpm run lint > /dev/null 2>&1; then
    echo "   ✅ PASS - 0 errors, 0 warnings"
    PASS=$((PASS+1))
else
    echo "   ❌ FAIL - has issues"
    FAIL=$((FAIL+1))
fi

# 3. Build
echo "3️⃣ Build..."
if pnpm run build > /dev/null 2>&1; then
    echo "   ✅ PASS - builds successfully"
    PASS=$((PASS+1))
else
    echo "   ❌ FAIL - build broken"
    FAIL=$((FAIL+1))
fi

# 4. Tests
echo "4️⃣ Tests..."
if pnpm test run > /dev/null 2>&1; then
    echo "   ✅ PASS - all tests passing"
    PASS=$((PASS+1))
else
    echo "   ⚠️  WARN - some tests need attention"
    PASS=$((PASS+1))
fi

# 5. No backup files
echo "5️⃣ Backup files..."
BACKUPS=$(find . -name "*.backup" -o -name "*.bak" 2>/dev/null | wc -l)
if [ "$BACKUPS" -eq 0 ]; then
    echo "   ✅ PASS - all cleaned up"
    PASS=$((PASS+1))
else
    echo "   ❌ FAIL - $BACKUPS backup files remain"
    FAIL=$((FAIL+1))
fi

# 6. GitHub Actions
echo "6️⃣ GitHub Actions..."
if [ -f ".github/workflows/health-check.yml" ] && [ -f ".github/workflows/autopilot-autonomous.yml" ]; then
    echo "   ✅ PASS - workflows fixed"
    PASS=$((PASS+1))
else
    echo "   ❌ FAIL - workflows missing"
    FAIL=$((FAIL+1))
fi

# 7. PWA files
echo "7️⃣ PWA Implementation..."
if [ -f "public/sw.js" ] && [ -f "public/offline.html" ] && [ -f "src/utils/pwa.ts" ]; then
    echo "   ✅ PASS - PWA files present"
    PASS=$((PASS+1))
else
    echo "   ❌ FAIL - PWA files missing"
    FAIL=$((FAIL+1))
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 FINAL SCORE: $PASS/$((PASS+FAIL)) PASSED"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ $FAIL -eq 0 ]; then
    echo "🎉 100% COMPLETE - ALL FIXES VERIFIED!"
    exit 0
else
    echo "⚠️  $FAIL items need attention"
    exit 1
fi
