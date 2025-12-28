#!/bin/bash
# Script to fix common TypeScript errors

echo "🔧 Fixing TypeScript errors systematically..."

# Find all files with catch (err: unknown) that reference error.message
echo "1. Fixing error variable name mismatches..."
find app -type f \( -name "*.ts" -o -name "*.tsx" \) -exec grep -l "catch (err" {} \; | while read file; do
  # Check if file has both "catch (err" and "error.message"
  if grep -q "catch (err" "$file" && grep -q "error\.message\|error\.code\|error\.status" "$file"; then
    echo "  Checking: $file"
  fi
done

# Find all empty catch blocks
echo ""
echo "2. Finding empty catch blocks..."
find app -type f \( -name "*.ts" -o -name "*.tsx" \) -exec grep -l "catch.*{}" {} \; | while read file; do
  echo "  Found empty catch in: $file"
done

# Find all files with property access on unknown
echo ""
echo "3. Finding property access on unknown types..."
find app -type f \( -name "*.ts" -o -name "*.tsx" \) -exec grep -l "Record<string, unknown>" {} \; | head -10 | while read file; do
  echo "  Found in: $file"
done

echo ""
echo "✅ Analysis complete. Manual fixes required for context-specific issues."
