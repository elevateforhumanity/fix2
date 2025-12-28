#!/bin/bash
# Fix: Replace err with error in catch blocks that use error: unknown

set -e

echo "🔧 Fixing err → error variable mismatch in catch blocks"
echo "========================================================"
echo ""

# Create backup
BACKUP_DIR=".typescript-err-fix-$(date +%s)"
mkdir -p "$BACKUP_DIR"
echo "✅ Backup directory: $BACKUP_DIR"
echo ""

# Find files with catch (error: unknown) that still use err
FILES=$(grep -r "catch (error: unknown)" app/ lib/ --include="*.ts" --include="*.tsx" -l | \
  xargs grep -l "err instanceof Error\|err\.message\|err\.code" 2>/dev/null || true)

COUNT=0
for file in $FILES; do
  if [ -f "$file" ]; then
    echo "📝 Fixing: $file"
    cp "$file" "$BACKUP_DIR/$(basename $file).bak"
    
    # Replace err with error in catch blocks
    # Only replace standalone err, not error
    sed -i 's/\berr instanceof Error\b/error instanceof Error/g' "$file"
    sed -i 's/\berr\.message\b/error.message/g' "$file"
    sed -i 's/\berr\.code\b/error.code/g' "$file"
    sed -i 's/\berr\.stack\b/error.stack/g' "$file"
    sed -i 's/\berr\.status\b/error.status/g' "$file"
    sed -i 's/String(err)/String(error)/g' "$file"
    sed -i 's/{ err:/{ error:/g' "$file"
    sed -i 's/\berr:/error:/g' "$file"
    
    COUNT=$((COUNT + 1))
  fi
done

echo ""
echo "✅ Fixed $COUNT files"
echo "📁 Backup: $BACKUP_DIR"
echo ""
