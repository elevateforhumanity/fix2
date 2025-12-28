#!/bin/bash
# Batch 8: Fix remaining : any patterns
# More aggressive replacement

set -e

echo "🔧 Batch 8: Fixing Remaining : any Patterns"
echo "==========================================="
echo ""

# Create backup
BACKUP_DIR=".typescript-batch8-fixes-$(date +%s)"
mkdir -p "$BACKUP_DIR"
echo "✅ Backup directory: $BACKUP_DIR"
echo ""

# Find files with remaining : any
FILES=$(grep -r ": any" app/ lib/ components/ --include="*.ts" --include="*.tsx" -l | grep -v "any\[\]" 2>/dev/null | head -50)

COUNT=0
for file in $FILES; do
  if [ -f "$file" ]; then
    # Check if file still has : any (not any[])
    if grep -q ": any[^[]" "$file"; then
      echo "📝 Fixing: $file"
      cp "$file" "$BACKUP_DIR/$(basename $file).bak"
      
      # More patterns
      sed -i 's/\(: any\)>/\1>/g' "$file"
      sed -i 's/: any>/: unknown>/g' "$file"
      sed -i 's/<any,/<unknown,/g' "$file"
      sed -i 's/<any>/<unknown>/g' "$file"
      
      COUNT=$((COUNT + 1))
    fi
  fi
done

echo ""
echo "✅ Fixed $COUNT files"
echo "📁 Backup: $BACKUP_DIR"
echo ""
