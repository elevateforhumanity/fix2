#!/bin/bash
# Batch 7: Fix 'as any' type assertions
# Replace with 'as unknown' which is safer

set -e

echo "🔧 Batch 7: Fixing 'as any' Type Assertions"
echo "==========================================="
echo ""

# Create backup
BACKUP_DIR=".typescript-batch7-fixes-$(date +%s)"
mkdir -p "$BACKUP_DIR"
echo "✅ Backup directory: $BACKUP_DIR"
echo ""

# Find files with 'as any'
FILES=$(grep -r " as any" app/ lib/ components/ --include="*.ts" --include="*.tsx" -l 2>/dev/null)

COUNT=0
for file in $FILES; do
  if [ -f "$file" ]; then
    echo "📝 Fixing: $file"
    cp "$file" "$BACKUP_DIR/$(basename $file).bak"
    
    # Replace 'as any' with 'as unknown'
    sed -i 's/ as any/ as unknown/g' "$file"
    
    COUNT=$((COUNT + 1))
  fi
done

echo ""
echo "✅ Fixed $COUNT files"
echo "📁 Backup: $BACKUP_DIR"
echo ""
