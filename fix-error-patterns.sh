#!/bin/bash
# Fix common TypeScript error patterns across the codebase

set -e

echo "🔧 Fixing TypeScript error patterns in batch..."
echo ""

# Count files to fix
TOTAL=$(grep -l "catch (err" app/ components/ lib/ -r --include="*.tsx" --include="*.ts" 2>/dev/null | xargs -I {} sh -c 'grep -q "error\.message\|error\.code" {} && echo {}' | wc -l)
echo "Found $TOTAL files with error variable mismatch"
echo ""

# Create backup
BACKUP_DIR=".typescript-fixes-backup-$(date +%s)"
mkdir -p "$BACKUP_DIR"
echo "✅ Created backup directory: $BACKUP_DIR"
echo ""

# Fix each file
FIXED=0
grep -l "catch (err" app/ components/ lib/ -r --include="*.tsx" --include="*.ts" 2>/dev/null | xargs -I {} sh -c 'grep -q "error\.message\|error\.code" {} && echo {}' | while read file; do
  echo "📝 Fixing: $file"
  
  # Backup original
  cp "$file" "$BACKUP_DIR/$(basename $file).bak"
  
  # Fix pattern: catch (err: unknown) but uses error.message
  # This is a simple sed replacement - may need manual review
  sed -i 's/catch (err: unknown)/catch (error: unknown)/g' "$file"
  sed -i 's/catch (err)/catch (error)/g' "$file"
  
  FIXED=$((FIXED + 1))
done

echo ""
echo "✅ Fixed $FIXED files"
echo "📁 Backups saved in: $BACKUP_DIR"
echo ""
echo "⚠️  IMPORTANT: Review changes before committing!"
echo "   Run: git diff"
echo ""
