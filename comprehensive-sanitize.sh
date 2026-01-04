#!/bin/bash
set -e

echo "🧹 COMPREHENSIVE CODE SANITIZATION"
echo "=================================="
echo ""

# Backup first
echo "📦 Creating backup..."
BACKUP_DIR="/tmp/code-backup-$(date +%s)"
mkdir -p "$BACKUP_DIR"
cp -r app components lib "$BACKUP_DIR/"
echo "✅ Backup created at $BACKUP_DIR"
echo ""

# Step 1: Remove TypeScript suppressions
echo "1️⃣  Removing TypeScript suppressions..."
find app components lib -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '/\/\/ @ts-ignore/d' {} \;
find app components lib -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '/\/\/ @ts-nocheck/d' {} \;
find app components lib -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '/\/\/ @ts-expect-error/d' {} \;
echo "   ✅ Removed all TypeScript suppressions"
echo ""

# Step 2: Remove debug console.log (keep console.error/warn)
echo "2️⃣  Removing debug console.log statements..."
find app components lib -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '/^\s*console\.log(/d' {} \;
echo "   ✅ Removed debug console.log statements"
echo ""

# Step 3: Remove commented-out code blocks
echo "3️⃣  Removing large commented code blocks..."
find app components lib -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '/^\/\/ TODO:/d' {} \;
find app components lib -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '/^\/\/ FIXME:/d' {} \;
find app components lib -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '/^\/\/ HACK:/d' {} \;
echo "   ✅ Removed TODO/FIXME/HACK comments"
echo ""

# Step 4: Remove empty files
echo "4️⃣  Removing empty files..."
find app components lib -type f -empty -delete
echo "   ✅ Removed empty files"
echo ""

# Step 5: Fix common 'any' patterns (safe replacements only)
echo "5️⃣  Fixing common 'any' type patterns..."

# Replace 'any[]' with 'unknown[]' (safer)
find app components lib -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i 's/: any\[\]/: unknown[]/g' {} \;

# Replace 'Record<string, any>' with 'Record<string, unknown>'
find app components lib -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i 's/Record<string, any>/Record<string, unknown>/g' {} \;

echo "   ✅ Fixed safe 'any' type patterns"
echo ""

# Step 6: Remove trailing whitespace
echo "6️⃣  Removing trailing whitespace..."
find app components lib -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i 's/[[:space:]]*$//' {} \;
echo "   ✅ Removed trailing whitespace"
echo ""

# Step 7: Statistics
echo "📊 SANITIZATION RESULTS"
echo "======================="
echo ""
echo "Remaining issues:"
echo "  - @ts-ignore:     $(grep -r "@ts-ignore" app/ components/ lib/ --include="*.ts" --include="*.tsx" 2>/dev/null | wc -l)"
echo "  - @ts-nocheck:    $(grep -r "@ts-nocheck" app/ components/ lib/ --include="*.ts" --include="*.tsx" 2>/dev/null | wc -l)"
echo "  - console.log:    $(grep -r "console.log" app/ components/ lib/ --include="*.ts" --include="*.tsx" 2>/dev/null | wc -l)"
echo "  - 'any' types:    $(grep -r ": any\|as any" app/ components/ lib/ --include="*.ts" --include="*.tsx" 2>/dev/null | wc -l)"
echo ""
echo "File counts:"
echo "  - TypeScript:     $(find app components lib -name "*.ts" -o -name "*.tsx" | wc -l)"
echo "  - Total files:    $(find app components lib -type f | wc -l)"
echo ""
echo "✅ SANITIZATION COMPLETE!"
echo ""
echo "Backup location: $BACKUP_DIR"
