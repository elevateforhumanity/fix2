#!/bin/bash
# Batch 6: Fix any type usage
# Replace any with unknown for better type safety

set -e

echo "🔧 Batch 6: Fixing any Type Usage"
echo "=================================="
echo ""

# Create backup
BACKUP_DIR=".typescript-batch6-fixes-$(date +%s)"
mkdir -p "$BACKUP_DIR"
echo "✅ Backup directory: $BACKUP_DIR"
echo ""

# Find files with : any (but not any[])
FILES=$(grep -r ": any[^[]" app/ components/ lib/ --include="*.ts" --include="*.tsx" -l | head -60)

COUNT=0
for file in $FILES; do
  if [ -f "$file" ]; then
    echo "📝 Fixing: $file"
    cp "$file" "$BACKUP_DIR/$(basename $file).bak"
    
    # Replace : any with : unknown (safer than any)
    # But preserve some legitimate uses
    sed -i 's/: any,/: unknown,/g' "$file"
    sed -i 's/: any)/: unknown)/g' "$file"
    sed -i 's/: any =/: unknown =/g' "$file"
    sed -i 's/: any;/: unknown;/g' "$file"
    sed -i 's/: any {/: unknown {/g' "$file"
    
    # Fix Record<string, any> -> Record<string, unknown>
    sed -i 's/Record<string, any>/Record<string, unknown>/g' "$file"
    
    COUNT=$((COUNT + 1))
  fi
done

echo ""
echo "✅ Fixed $COUNT files"
echo "📁 Backup: $BACKUP_DIR"
echo ""
echo "⚠️  Note: Changed any to unknown"
echo "   unknown is safer - requires type checking before use"
echo ""
