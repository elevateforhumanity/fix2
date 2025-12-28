#!/bin/bash
# Batch 4: Add type-safe body parsing to API routes
# Adds parseBody import and usage

set -e

echo "🔧 Batch 4: Type-Safe API Body Parsing"
echo "======================================"
echo ""

# Create backup
BACKUP_DIR=".typescript-batch4-fixes-$(date +%s)"
mkdir -p "$BACKUP_DIR"
echo "✅ Backup directory: $BACKUP_DIR"
echo ""

# Find API routes with await request.json() but no parseBody
FILES=$(grep -r "await request.json()" app/api --include="*.ts" -l 2>/dev/null | \
  xargs grep -L "parseBody\|as {" 2>/dev/null || true)

COUNT=0
for file in $FILES; do
  if [ -f "$file" ]; then
    echo "📝 Fixing: $file"
    cp "$file" "$BACKUP_DIR/$(basename $file).bak"
    
    # Add import if not present
    if ! grep -q "from '@/lib/api-helpers'" "$file"; then
      # Add import after other imports
      sed -i "/^import.*from 'next\/server';/a import { parseBody, getErrorMessage } from '@/lib/api-helpers';" "$file"
    fi
    
    # Replace await request.json() with parseBody
    sed -i 's/const body = await request\.json();/const body = await parseBody<Record<string, unknown>>(request);/g' "$file"
    sed -i 's/const data = await request\.json();/const data = await parseBody<Record<string, unknown>>(request);/g' "$file"
    sed -i 's/const payload = await request\.json();/const payload = await parseBody<Record<string, unknown>>(request);/g' "$file"
    
    COUNT=$((COUNT + 1))
  fi
done

echo ""
echo "✅ Fixed $COUNT files"
echo "📁 Backup: $BACKUP_DIR"
echo ""
echo "⚠️  Note: Files now use Record<string, unknown>"
echo "   You may want to add specific types later"
echo ""
