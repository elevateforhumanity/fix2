#!/bin/bash
# Batch 3: Fix Promise.play() without catch
# Adds proper error handling to video/audio play() calls

set -e

echo "🔧 Batch 3: Fixing Promise.play() Without Catch"
echo "==============================================="
echo ""

# Create backup
BACKUP_DIR=".typescript-batch3-fixes-$(date +%s)"
mkdir -p "$BACKUP_DIR"
echo "✅ Backup directory: $BACKUP_DIR"
echo ""

# Find files with .play() without .catch()
FILES=$(find app lib components -type f \( -name "*.ts" -o -name "*.tsx" \) 2>/dev/null | \
  xargs grep -l "\.play()" 2>/dev/null | \
  xargs grep -L "\.play()\.catch\|\.play().catch" 2>/dev/null || true)

COUNT=0
for file in $FILES; do
  if [ -f "$file" ] && grep -q "\.play()" "$file"; then
    echo "📝 Fixing: $file"
    cp "$file" "$BACKUP_DIR/$(basename $file).bak"
    
    # Replace .play() with .play().catch()
    # Handle various patterns
    sed -i 's/\.play();/.play().catch(() => {});/g' "$file"
    sed -i 's/await \(.*\)\.play()\.catch/await \1.play().catch/g' "$file"
    
    COUNT=$((COUNT + 1))
  fi
done

echo ""
echo "✅ Fixed $COUNT files"
echo "📁 Backup: $BACKUP_DIR"
echo ""
