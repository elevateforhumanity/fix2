#!/bin/bash
# Find Actual Syntax Errors
# Checks for real syntax issues that will break the build

set -e

echo "🔍 Searching for Actual Syntax Errors"
echo "======================================"
echo ""

ERRORS_FOUND=0

# Pattern 1: Arrow functions missing opening parenthesis
echo "1️⃣  Arrow functions with missing parentheses..."
PATTERN1=$(grep -rn "\.map([a-z]*: " app/ lib/ components/ --include="*.ts" --include="*.tsx" 2>/dev/null | grep -v "\.map((" || true)
if [ -n "$PATTERN1" ]; then
  echo "   ❌ CRITICAL - Missing parentheses in arrow functions:"
  echo "$PATTERN1"
  ERRORS_FOUND=$((ERRORS_FOUND + 1))
else
  echo "   ✅ No issues"
fi
echo ""

# Pattern 2: Filter with missing parentheses
echo "2️⃣  Filter functions with missing parentheses..."
PATTERN2=$(grep -rn "\.filter([a-z]*: " app/ lib/ components/ --include="*.ts" --include="*.tsx" 2>/dev/null | grep -v "\.filter((" || true)
if [ -n "$PATTERN2" ]; then
  echo "   ❌ CRITICAL - Missing parentheses in filter:"
  echo "$PATTERN2"
  ERRORS_FOUND=$((ERRORS_FOUND + 1))
else
  echo "   ✅ No issues"
fi
echo ""

# Pattern 3: forEach with missing parentheses
echo "3️⃣  forEach with missing parentheses..."
PATTERN3=$(grep -rn "\.forEach([a-z]*: " app/ lib/ components/ --include="*.ts" --include="*.tsx" 2>/dev/null | grep -v "\.forEach((" || true)
if [ -n "$PATTERN3" ]; then
  echo "   ❌ CRITICAL - Missing parentheses in forEach:"
  echo "$PATTERN3"
  ERRORS_FOUND=$((ERRORS_FOUND + 1))
else
  echo "   ✅ No issues"
fi
echo ""

# Pattern 4: find with missing parentheses
echo "4️⃣  find with missing parentheses..."
PATTERN4=$(grep -rn "\.find([a-z]*: " app/ lib/ components/ --include="*.ts" --include="*.tsx" 2>/dev/null | grep -v "\.find((" || true)
if [ -n "$PATTERN4" ]; then
  echo "   ❌ CRITICAL - Missing parentheses in find:"
  echo "$PATTERN4"
  ERRORS_FOUND=$((ERRORS_FOUND + 1))
else
  echo "   ✅ No issues"
fi
echo ""

# Pattern 5: reduce with missing parentheses
echo "5️⃣  reduce with missing parentheses..."
PATTERN5=$(grep -rn "\.reduce([a-z]*: " app/ lib/ components/ --include="*.ts" --include="*.tsx" 2>/dev/null | grep -v "\.reduce((" || true)
if [ -n "$PATTERN5" ]; then
  echo "   ❌ CRITICAL - Missing parentheses in reduce:"
  echo "$PATTERN5"
  ERRORS_FOUND=$((ERRORS_FOUND + 1))
else
  echo "   ✅ No issues"
fi
echo ""

# Pattern 6: Double type annotations
echo "6️⃣  Double type annotations..."
PATTERN6=$(grep -rn ": unknown: unknown" app/ lib/ components/ --include="*.ts" --include="*.tsx" 2>/dev/null || true)
if [ -n "$PATTERN6" ]; then
  echo "   ❌ CRITICAL - Duplicate type annotations:"
  echo "$PATTERN6"
  ERRORS_FOUND=$((ERRORS_FOUND + 1))
else
  echo "   ✅ No issues"
fi
echo ""

# Pattern 7: Broken object literals
echo "7️⃣  Broken object literals..."
PATTERN7=$(grep -rn "{ [a-z]*: unknown\[\] }" app/ lib/ components/ --include="*.ts" --include="*.tsx" 2>/dev/null | grep -v "Record<\|interface\|type " || true)
if [ -n "$PATTERN7" ]; then
  echo "   ⚠️  Potential object literal issues:"
  echo "$PATTERN7" | head -5
else
  echo "   ✅ No issues"
fi
echo ""

# Summary
echo "======================================"
echo "📊 Results"
echo "======================================"
echo ""

if [ $ERRORS_FOUND -eq 0 ]; then
  echo "✅ SUCCESS! No critical syntax errors found."
  echo ""
  echo "Your code should build successfully!"
  echo ""
  exit 0
else
  echo "❌ Found $ERRORS_FOUND critical syntax error(s)."
  echo ""
  echo "These MUST be fixed before the build will succeed."
  echo ""
  exit 1
fi
