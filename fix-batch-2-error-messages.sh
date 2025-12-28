#!/bin/bash
# Batch 2: Fix unsafe error.message access
# Replaces error.message with proper type checking

set -e

echo "🔧 Batch 2: Fixing Unsafe error.message Access"
echo "=============================================="
echo ""

# Create backup
BACKUP_DIR=".typescript-batch2-fixes-$(date +%s)"
mkdir -p "$BACKUP_DIR"
echo "✅ Backup directory: $BACKUP_DIR"
echo ""

# Find files with unsafe error.message
FILES=$(find app lib components -type f \( -name "*.ts" -o -name "*.tsx" \) 2>/dev/null | \
  xargs grep -l "catch (error: unknown)" 2>/dev/null | \
  xargs grep -l "error\.message" 2>/dev/null | \
  xargs grep -L "error instanceof Error\|getErrorMessage" 2>/dev/null || true)

COUNT=0
for file in $FILES; do
  if [ -f "$file" ]; then
    echo "📝 Fixing: $file"
    cp "$file" "$BACKUP_DIR/$(basename $file).bak"
    
    # Replace error.message with type-safe version
    # This handles common patterns
    sed -i 's/error\.message/error instanceof Error ? error.message : String(error)/g' "$file"
    sed -i 's/error\.code/error instanceof Error \&\& "code" in error ? (error as any).code : "UNKNOWN"/g' "$file"
    sed -i 's/error\.status/error instanceof Error \&\& "status" in error ? (error as any).status : 500/g' "$file"
    
    COUNT=$((COUNT + 1))
  fi
done

echo ""
echo "✅ Fixed $COUNT files"
echo "📁 Backup: $BACKUP_DIR"
echo ""
