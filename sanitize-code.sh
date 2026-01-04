#!/bin/bash
set -e

echo "🧹 Starting code sanitization..."

# Step 1: Remove @ts-ignore, @ts-nocheck, @ts-expect-error
echo "📝 Removing TypeScript suppressions..."
find app components lib -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '/\/\/ @ts-ignore/d' {} \;
find app components lib -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '/\/\/ @ts-nocheck/d' {} \;
find app components lib -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '/\/\/ @ts-expect-error/d' {} \;

echo "✅ Removed TypeScript suppressions"

# Step 2: Remove console.log statements (keep console.error for production errors)
echo "📝 Removing console.log statements..."
find app components lib -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '/console\.log(/d' {} \;

echo "✅ Removed console.log statements"

# Step 3: Count remaining issues
echo ""
echo "📊 Remaining issues:"
echo "  - @ts-ignore: $(grep -r "@ts-ignore" app/ components/ lib/ --include="*.ts" --include="*.tsx" 2>/dev/null | wc -l)"
echo "  - console.log: $(grep -r "console.log" app/ components/ lib/ --include="*.ts" --include="*.tsx" 2>/dev/null | wc -l)"
echo "  - 'any' types: $(grep -r ": any\|as any" app/ components/ lib/ --include="*.ts" --include="*.tsx" 2>/dev/null | wc -l)"

echo ""
echo "✅ Code sanitization complete!"
