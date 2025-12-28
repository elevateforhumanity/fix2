#!/bin/bash
# Console Error Audit
# Checks for potential runtime console errors

set -e

echo "🔍 Console Error Audit"
echo "======================"
echo ""

# Pattern 1: console.error usage
echo "1️⃣  Checking console.error usage..."
CONSOLE_ERRORS=$(grep -r "console\.error" app/ lib/ components/ --include="*.ts" --include="*.tsx" 2>/dev/null | wc -l)
echo "   Found: $CONSOLE_ERRORS instances"
if [ $CONSOLE_ERRORS -gt 50 ]; then
  echo "   ⚠️  High usage - review for production"
  echo "   Sample locations:"
  grep -r "console\.error" app/ lib/ components/ --include="*.ts" --include="*.tsx" 2>/dev/null | head -5
else
  echo "   ✅ Acceptable level"
fi
echo ""

# Pattern 2: console.log in production code
echo "2️⃣  Checking console.log in production..."
CONSOLE_LOGS=$(grep -r "console\.log" app/ lib/ components/ --include="*.ts" --include="*.tsx" 2>/dev/null | grep -v "// console.log\|/\* console.log" | wc -l)
echo "   Found: $CONSOLE_LOGS instances"
if [ $CONSOLE_LOGS -gt 100 ]; then
  echo "   ⚠️  High usage - should remove for production"
  echo "   Sample locations:"
  grep -r "console\.log" app/ lib/ components/ --include="*.ts" --include="*.tsx" 2>/dev/null | grep -v "// console.log\|/\* console.log" | head -5
else
  echo "   ✅ Acceptable level"
fi
echo ""

# Pattern 3: Unhandled promise rejections
echo "3️⃣  Checking for unhandled promises..."
UNHANDLED_PROMISES=$(grep -r "async.*=>" app/ components/ --include="*.tsx" 2>/dev/null | grep -v "catch\|try" | wc -l)
echo "   Found: $UNHANDLED_PROMISES potential unhandled async functions"
if [ $UNHANDLED_PROMISES -gt 20 ]; then
  echo "   ⚠️  Review async error handling"
else
  echo "   ✅ Acceptable level"
fi
echo ""

# Pattern 4: Missing error boundaries
echo "4️⃣  Checking for Error Boundaries..."
ERROR_BOUNDARIES=$(grep -r "ErrorBoundary\|componentDidCatch" app/ components/ --include="*.tsx" 2>/dev/null | wc -l)
echo "   Found: $ERROR_BOUNDARIES error boundary implementations"
if [ $ERROR_BOUNDARIES -eq 0 ]; then
  echo "   ⚠️  No error boundaries found - add for production"
else
  echo "   ✅ Error boundaries present"
fi
echo ""

# Pattern 5: Direct property access without optional chaining
echo "5️⃣  Checking for unsafe property access..."
UNSAFE_ACCESS=$(grep -r "\.map(\|\.filter(\|\.find(" app/api --include="*.ts" 2>/dev/null | grep -v "?\.map\|?\.filter\|?\.find\||| \[\]" | wc -l)
echo "   Found: $UNSAFE_ACCESS potential unsafe array operations"
if [ $UNSAFE_ACCESS -gt 50 ]; then
  echo "   ⚠️  Review for null safety"
else
  echo "   ✅ Acceptable level"
fi
echo ""

# Pattern 6: window/document access without checks
echo "6️⃣  Checking for unsafe window/document access..."
UNSAFE_WINDOW=$(grep -r "window\.\|document\." app/ components/ --include="*.tsx" 2>/dev/null | grep -v "typeof window\|typeof document\|useEffect\|'use client'" | wc -l)
echo "   Found: $UNSAFE_WINDOW potential unsafe browser API access"
if [ $UNSAFE_WINDOW -gt 20 ]; then
  echo "   ⚠️  Review for SSR safety"
  echo "   Sample locations:"
  grep -r "window\.\|document\." app/ components/ --include="*.tsx" 2>/dev/null | grep -v "typeof window\|typeof document\|useEffect\|'use client'" | head -3
else
  echo "   ✅ Acceptable level"
fi
echo ""

# Pattern 7: localStorage without checks
echo "7️⃣  Checking for unsafe localStorage access..."
UNSAFE_STORAGE=$(grep -r "localStorage\." app/ components/ --include="*.tsx" 2>/dev/null | grep -v "typeof window\|useEffect\|'use client'" | wc -l)
echo "   Found: $UNSAFE_STORAGE potential unsafe localStorage access"
if [ $UNSAFE_STORAGE -gt 10 ]; then
  echo "   ⚠️  Review for SSR safety"
else
  echo "   ✅ Acceptable level"
fi
echo ""

# Pattern 8: Fetch without error handling
echo "8️⃣  Checking fetch error handling..."
FETCH_CALLS=$(grep -r "fetch(" app/ components/ --include="*.ts" --include="*.tsx" 2>/dev/null | wc -l)
FETCH_WITH_CATCH=$(grep -r "fetch(" app/ components/ --include="*.ts" --include="*.tsx" -A 5 2>/dev/null | grep -c "catch" || true)
echo "   Total fetch calls: $FETCH_CALLS"
echo "   With error handling: $FETCH_WITH_CATCH"
if [ $FETCH_CALLS -gt $FETCH_WITH_CATCH ]; then
  MISSING=$((FETCH_CALLS - FETCH_WITH_CATCH))
  echo "   ⚠️  $MISSING fetch calls may lack error handling"
else
  echo "   ✅ All fetch calls have error handling"
fi
echo ""

# Pattern 9: JSON.parse without try-catch
echo "9️⃣  Checking JSON.parse safety..."
JSON_PARSE=$(grep -r "JSON\.parse" app/ lib/ components/ --include="*.ts" --include="*.tsx" 2>/dev/null | wc -l)
JSON_SAFE=$(grep -r "JSON\.parse" app/ lib/ components/ --include="*.ts" --include="*.tsx" -B 3 2>/dev/null | grep -c "try" || true)
echo "   Total JSON.parse calls: $JSON_PARSE"
echo "   In try-catch blocks: $JSON_SAFE"
if [ $JSON_PARSE -gt $((JSON_SAFE + 10)) ]; then
  echo "   ⚠️  Some JSON.parse calls may lack error handling"
else
  echo "   ✅ Most JSON.parse calls are safe"
fi
echo ""

# Pattern 10: Null/undefined checks
echo "🔟 Checking for null safety patterns..."
NULL_CHECKS=$(grep -r "if (.*!== null\|if (.*!== undefined\|?\.)" app/ components/ --include="*.tsx" 2>/dev/null | wc -l)
echo "   Found: $NULL_CHECKS null safety checks"
if [ $NULL_CHECKS -lt 100 ]; then
  echo "   ⚠️  Consider adding more null checks"
else
  echo "   ✅ Good null safety coverage"
fi
echo ""

# Summary
echo "======================================"
echo "📊 Console Error Audit Summary"
echo "======================================"
echo ""

WARNINGS=0

if [ $CONSOLE_LOGS -gt 100 ]; then WARNINGS=$((WARNINGS + 1)); fi
if [ $UNHANDLED_PROMISES -gt 20 ]; then WARNINGS=$((WARNINGS + 1)); fi
if [ $ERROR_BOUNDARIES -eq 0 ]; then WARNINGS=$((WARNINGS + 1)); fi
if [ $UNSAFE_WINDOW -gt 20 ]; then WARNINGS=$((WARNINGS + 1)); fi
if [ $FETCH_CALLS -gt $FETCH_WITH_CATCH ]; then WARNINGS=$((WARNINGS + 1)); fi

if [ $WARNINGS -eq 0 ]; then
  echo "✅ EXCELLENT! No major console error risks found."
  echo ""
  echo "Your code has good error handling practices."
else
  echo "⚠️  Found $WARNINGS area(s) that need attention."
  echo ""
  echo "Review the warnings above to improve error handling."
fi
echo ""

echo "Recommendations:"
echo "1. Remove console.log statements for production"
echo "2. Add Error Boundaries to catch React errors"
echo "3. Use optional chaining (?.) for null safety"
echo "4. Wrap browser APIs in typeof checks"
echo "5. Always handle fetch/JSON.parse errors"
echo ""
