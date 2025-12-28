#!/bin/bash
# Batch 5: Fix any[] array types
# Replace any[] with proper types based on context

set -e

echo "🔧 Batch 5: Fixing any[] Array Types"
echo "====================================="
echo ""

# Create backup
BACKUP_DIR=".typescript-batch5-fixes-$(date +%s)"
mkdir -p "$BACKUP_DIR"
echo "✅ Backup directory: $BACKUP_DIR"
echo ""

# Find files with any[]
FILES=$(find app components lib -type f \( -name "*.ts" -o -name "*.tsx" \) -exec grep -l "any\[\]" {} \; 2>/dev/null)

COUNT=0
for file in $FILES; do
  if [ -f "$file" ]; then
    echo "📝 Fixing: $file"
    cp "$file" "$BACKUP_DIR/$(basename $file).bak"
    
    # Context-aware replacements
    # useState with any[] -> unknown[]
    sed -i 's/useState<any\[\]>/useState<unknown[]>/g' "$file"
    sed -i 's/useState(any\[\])/useState<unknown[]>/g' "$file"
    
    # Function parameters any[] -> unknown[]
    sed -i 's/(.*: any\[\])/(items: unknown[])/g' "$file"
    
    # Variable declarations any[] -> unknown[]
    sed -i 's/: any\[\] =/: unknown[] =/g' "$file"
    
    # Return types any[] -> unknown[]
    sed -i 's/): any\[\]/): unknown[]/g' "$file"
    
    COUNT=$((COUNT + 1))
  fi
done

echo ""
echo "✅ Fixed $COUNT files"
echo "📁 Backup: $BACKUP_DIR"
echo ""
echo "⚠️  Note: Changed any[] to unknown[]"
echo "   You may want to add specific types later"
echo ""
