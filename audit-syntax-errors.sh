#!/bin/bash
# Comprehensive Syntax Error Audit
# Checks for common syntax errors caused by sed replacements

set -e

echo "🔍 TypeScript/JavaScript Syntax Audit"
echo "======================================"
echo ""

ERRORS_FOUND=0

# Pattern 1: Arrow functions with missing parentheses
echo "1️⃣  Checking arrow function syntax..."
PATTERN1=$(grep -r "\.map(.*: unknown\[\])" app/ lib/ components/ --include="*.ts" --include="*.tsx" 2>/dev/null | grep -v "\.map((" || true)
if [ -n "$PATTERN1" ]; then
  echo "   ❌ Found arrow functions with missing parentheses:"
  echo "$PATTERN1" | head -5
  ERRORS_FOUND=$((ERRORS_FOUND + 1))
else
  echo "   ✅ No issues found"
fi
echo ""

# Pattern 2: Filter functions with syntax errors
echo "2️⃣  Checking filter function syntax..."
PATTERN2=$(grep -r "\.filter(.*: unknown" app/ lib/ components/ --include="*.ts" --include="*.tsx" 2>/dev/null | grep -v "\.filter((" || true)
if [ -n "$PATTERN2" ]; then
  echo "   ❌ Found filter functions with missing parentheses:"
  echo "$PATTERN2" | head -5
  ERRORS_FOUND=$((ERRORS_FOUND + 1))
else
  echo "   ✅ No issues found"
fi
echo ""

# Pattern 3: forEach with syntax errors
echo "3️⃣  Checking forEach syntax..."
PATTERN3=$(grep -r "\.forEach(.*: unknown" app/ lib/ components/ --include="*.ts" --include="*.tsx" 2>/dev/null | grep -v "\.forEach((" || true)
if [ -n "$PATTERN3" ]; then
  echo "   ❌ Found forEach with missing parentheses:"
  echo "$PATTERN3" | head -5
  ERRORS_FOUND=$((ERRORS_FOUND + 1))
else
  echo "   ✅ No issues found"
fi
echo ""

# Pattern 4: Malformed type annotations
echo "4️⃣  Checking for malformed type annotations..."
PATTERN4=$(grep -r ": unknown\[\] )" app/ lib/ components/ --include="*.ts" --include="*.tsx" 2>/dev/null || true)
if [ -n "$PATTERN4" ]; then
  echo "   ❌ Found malformed type annotations:"
  echo "$PATTERN4" | head -5
  ERRORS_FOUND=$((ERRORS_FOUND + 1))
else
  echo "   ✅ No issues found"
fi
echo ""

# Pattern 5: Double colons (sed error)
echo "5️⃣  Checking for double colons..."
PATTERN5=$(grep -r ":: unknown" app/ lib/ components/ --include="*.ts" --include="*.tsx" 2>/dev/null || true)
if [ -n "$PATTERN5" ]; then
  echo "   ❌ Found double colons:"
  echo "$PATTERN5" | head -5
  ERRORS_FOUND=$((ERRORS_FOUND + 1))
else
  echo "   ✅ No issues found"
fi
echo ""

# Pattern 6: Broken catch blocks
echo "6️⃣  Checking catch block syntax..."
PATTERN6=$(grep -r "catch (error: unknown: unknown)" app/ lib/ components/ --include="*.ts" --include="*.tsx" 2>/dev/null || true)
if [ -n "$PATTERN6" ]; then
  echo "   ❌ Found duplicate type annotations in catch:"
  echo "$PATTERN6" | head -5
  ERRORS_FOUND=$((ERRORS_FOUND + 1))
else
  echo "   ✅ No issues found"
fi
echo ""

# Pattern 7: Broken function parameters
echo "7️⃣  Checking function parameter syntax..."
PATTERN7=$(grep -r "function.*([^(]*: unknown[^)]*: unknown" app/ lib/ components/ --include="*.ts" --include="*.tsx" 2>/dev/null || true)
if [ -n "$PATTERN7" ]; then
  echo "   ❌ Found duplicate type annotations in parameters:"
  echo "$PATTERN7" | head -5
  ERRORS_FOUND=$((ERRORS_FOUND + 1))
else
  echo "   ✅ No issues found"
fi
echo ""

# Pattern 8: Broken object destructuring
echo "8️⃣  Checking object destructuring..."
PATTERN8=$(grep -r "{ .*: unknown.*: unknown }" app/ lib/ components/ --include="*.ts" --include="*.tsx" 2>/dev/null | grep -v "Record<" || true)
if [ -n "$PATTERN8" ]; then
  echo "   ⚠️  Found potential destructuring issues:"
  echo "$PATTERN8" | head -5
  ERRORS_FOUND=$((ERRORS_FOUND + 1))
else
  echo "   ✅ No issues found"
fi
echo ""

# Pattern 9: Missing commas in arrays/objects
echo "9️⃣  Checking for missing commas..."
PATTERN9=$(grep -r "unknown\[\]$" app/ lib/ components/ --include="*.ts" --include="*.tsx" 2>/dev/null | grep -v "//" || true)
if [ -n "$PATTERN9" ]; then
  echo "   ⚠️  Found lines ending with unknown[] (might need commas):"
  echo "$PATTERN9" | head -5
else
  echo "   ✅ No issues found"
fi
echo ""

# Pattern 10: Broken ternary operators
echo "🔟 Checking ternary operators..."
PATTERN10=$(grep -r "? unknown :" app/ lib/ components/ --include="*.ts" --include="*.tsx" 2>/dev/null || true)
if [ -n "$PATTERN10" ]; then
  echo "   ⚠️  Found potential ternary issues:"
  echo "$PATTERN10" | head -5
else
  echo "   ✅ No issues found"
fi
echo ""

# Summary
echo "======================================"
echo "📊 Audit Summary"
echo "======================================"
echo ""

if [ $ERRORS_FOUND -eq 0 ]; then
  echo "✅ SUCCESS! No syntax errors found."
  echo ""
  echo "Your codebase passed all syntax checks!"
  echo ""
else
  echo "⚠️  Found $ERRORS_FOUND potential issue(s)."
  echo ""
  echo "Review the errors above and fix manually."
  echo ""
fi

# Additional checks
echo "Additional Recommendations:"
echo ""
echo "1. Run TypeScript compiler:"
echo "   pnpm tsc --noEmit"
echo ""
echo "2. Run ESLint:"
echo "   pnpm lint"
echo ""
echo "3. Try building:"
echo "   pnpm build"
echo ""

exit $ERRORS_FOUND
