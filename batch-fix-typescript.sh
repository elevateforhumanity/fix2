#!/bin/bash
# Batch fix common TypeScript error patterns
# Run this to fix ~200-300 errors automatically

set -e

echo "🔧 TypeScript Batch Fix Tool"
echo "============================"
echo ""

# Create backup
BACKUP_DIR=".typescript-batch-fixes-$(date +%s)"
mkdir -p "$BACKUP_DIR"
echo "✅ Backup directory: $BACKUP_DIR"
echo ""

# Counter
TOTAL_FIXED=0

# ============================================================================
# PATTERN 1: Error variable name mismatch
# ============================================================================
echo "1️⃣  Fixing error variable name mismatches..."
echo "   Pattern: catch (err) but uses error.message"
echo ""

FILES=$(find app lib components -type f \( -name "*.ts" -o -name "*.tsx" \) 2>/dev/null | \
  xargs grep -l "catch (err" 2>/dev/null | \
  xargs grep -l "error\.message\|error\.code\|error\.status" 2>/dev/null || true)

COUNT=0
for file in $FILES; do
  if [ -f "$file" ]; then
    cp "$file" "$BACKUP_DIR/$(basename $file).pattern1.bak"
    
    # Replace catch (err) with catch (error) when error.message is used
    sed -i 's/catch (err: unknown)/catch (error: unknown)/g' "$file"
    sed -i 's/catch (err)/catch (error)/g' "$file"
    
    COUNT=$((COUNT + 1))
    echo "   ✓ $file"
  fi
done

echo "   Fixed: $COUNT files"
TOTAL_FIXED=$((TOTAL_FIXED + COUNT))
echo ""

# ============================================================================
# PATTERN 2: Empty catch blocks
# ============================================================================
echo "2️⃣  Fixing empty catch blocks..."
echo "   Pattern: catch (error) {}"
echo ""

FILES=$(find app lib components -type f \( -name "*.ts" -o -name "*.tsx" \) 2>/dev/null | \
  xargs grep -l "catch.*{}" 2>/dev/null || true)

COUNT=0
for file in $FILES; do
  if [ -f "$file" ]; then
    cp "$file" "$BACKUP_DIR/$(basename $file).pattern2.bak"
    
    # Add console.error to empty catch blocks
    # This is a simple fix - may need manual review for context
    sed -i 's/} catch (error) {}/} catch (error) {\n    console.error("Error:", error);\n  }/g' "$file"
    sed -i 's/} catch (err) {}/} catch (error) {\n    console.error("Error:", error);\n  }/g' "$file"
    
    COUNT=$((COUNT + 1))
    echo "   ✓ $file"
  fi
done

echo "   Fixed: $COUNT files"
TOTAL_FIXED=$((TOTAL_FIXED + COUNT))
echo ""

# ============================================================================
# PATTERN 3: Missing error type annotation
# ============================================================================
echo "3️⃣  Adding error type annotations..."
echo "   Pattern: catch (error) without type"
echo ""

FILES=$(find app lib components -type f \( -name "*.ts" -o -name "*.tsx" \) 2>/dev/null | \
  xargs grep -l "catch (error)" 2>/dev/null | \
  xargs grep -L "catch (error: unknown)" 2>/dev/null || true)

COUNT=0
for file in $FILES; do
  if [ -f "$file" ]; then
    cp "$file" "$BACKUP_DIR/$(basename $file).pattern3.bak"
    
    # Add type annotation to catch blocks
    sed -i 's/catch (error)/catch (error: unknown)/g' "$file"
    
    COUNT=$((COUNT + 1))
    echo "   ✓ $file"
  fi
done

echo "   Fixed: $COUNT files"
TOTAL_FIXED=$((TOTAL_FIXED + COUNT))
echo ""

# ============================================================================
# PATTERN 4: Direct error.message access
# ============================================================================
echo "4️⃣  Fixing unsafe error.message access..."
echo "   Pattern: error.message without type check"
echo ""

# This one is more complex - just report files that need manual fixing
FILES=$(find app lib components -type f \( -name "*.ts" -o -name "*.tsx" \) 2>/dev/null | \
  xargs grep -l "catch (error: unknown)" 2>/dev/null | \
  xargs grep -l "error\.message" 2>/dev/null | \
  xargs grep -L "error instanceof Error\|getErrorMessage" 2>/dev/null || true)

COUNT=0
for file in $FILES; do
  if [ -f "$file" ]; then
    echo "   ⚠️  Needs manual fix: $file"
    echo "      Replace: error.message"
    echo "      With: error instanceof Error ? error.message : 'Unknown error'"
    COUNT=$((COUNT + 1))
  fi
done

echo "   Found: $COUNT files needing manual review"
echo ""

# ============================================================================
# PATTERN 5: Promise without catch
# ============================================================================
echo "5️⃣  Finding Promises without error handling..."
echo "   Pattern: .play() without .catch()"
echo ""

FILES=$(find app lib components -type f \( -name "*.ts" -o -name "*.tsx" \) 2>/dev/null | \
  xargs grep -l "\.play()" 2>/dev/null | \
  xargs grep -L "\.play()\.catch" 2>/dev/null || true)

COUNT=0
for file in $FILES; do
  if [ -f "$file" ]; then
    echo "   ⚠️  Check: $file"
    COUNT=$((COUNT + 1))
  fi
done

echo "   Found: $COUNT files to review"
echo ""

# ============================================================================
# Summary
# ============================================================================
echo "================================"
echo "✅ Batch Fix Complete"
echo "================================"
echo ""
echo "Automatically fixed: $TOTAL_FIXED files"
echo "Backup location: $BACKUP_DIR"
echo ""
echo "📋 Next Steps:"
echo "   1. Review changes: git diff"
echo "   2. Run type check: npm run typecheck"
echo "   3. Test the application"
echo "   4. Commit if everything works"
echo ""
echo "⚠️  Some patterns require manual review (see above)"
echo ""
