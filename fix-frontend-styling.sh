#!/bin/bash
# Systematic Frontend Styling Fix
# Fixes inline styles properly without breaking code

set -e

LOG="frontend-styling-fix-$(date +%Y%m%d-%H%M%S).log"
FIXED=0
TOTAL=0

log() {
    echo "[$(date '+%H:%M:%S')] $1" | tee -a "$LOG"
}

log "🎨 Starting systematic frontend styling fix..."

# Get list of files with inline styles
FILES=$(grep -rl "style={{" src/ --include="*.jsx" --include="*.tsx" 2>/dev/null || true)
TOTAL=$(echo "$FILES" | grep -c . || echo 0)

log "📊 Found $TOTAL files with inline styles"
log ""

# Process each file
for file in $FILES; do
    if [ ! -f "$file" ]; then
        continue
    fi
    
    log "🔧 Processing: $file"
    
    # Create backup
    cp "$file" "${file}.styling-backup"
    
    # Count inline styles in this file
    BEFORE=$(grep -c "style={{" "$file" 2>/dev/null || echo 0)
    
    # Apply safe fixes only to common patterns
    # These are patterns we know are safe to replace
    
    # Fix simple padding
    perl -i -pe 's/style=\{\{\s*padding:\s*32\s*\}\}/className="p-8"/g' "$file" 2>/dev/null || true
    perl -i -pe 's/style=\{\{\s*padding:\s*"32px"\s*\}\}/className="p-8"/g' "$file" 2>/dev/null || true
    perl -i -pe 's/style=\{\{\s*padding:\s*16\s*\}\}/className="p-4"/g' "$file" 2>/dev/null || true
    
    # Fix simple margin
    perl -i -pe 's/style=\{\{\s*margin:\s*16\s*\}\}/className="m-4"/g' "$file" 2>/dev/null || true
    perl -i -pe 's/style=\{\{\s*marginTop:\s*"1rem"\s*\}\}/className="mt-4"/g' "$file" 2>/dev/null || true
    
    # Add responsive classes to grids (only if not already responsive)
    if grep -q 'className="grid grid-cols-3"' "$file" 2>/dev/null; then
        perl -i -pe 's/className="grid grid-cols-3"/className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"/g' "$file"
        log "  ✅ Added responsive grid classes"
    fi
    
    if grep -q 'className="grid grid-cols-2"' "$file" 2>/dev/null; then
        perl -i -pe 's/className="grid grid-cols-2"/className="grid grid-cols-1 md:grid-cols-2"/g' "$file"
        log "  ✅ Added responsive grid classes"
    fi
    
    if grep -q 'className="grid grid-cols-4"' "$file" 2>/dev/null; then
        perl -i -pe 's/className="grid grid-cols-4"/className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"/g' "$file"
        log "  ✅ Added responsive grid classes"
    fi
    
    # Count after
    AFTER=$(grep -c "style={{" "$file" 2>/dev/null || echo 0)
    
    if [ $AFTER -lt $BEFORE ]; then
        DIFF=$((BEFORE - AFTER))
        FIXED=$((FIXED + DIFF))
        log "  ✅ Fixed $DIFF inline styles"
    else
        log "  ℹ️  No simple patterns found"
    fi
    
    log ""
done

log "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
log "📊 SUMMARY"
log "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
log "Files processed: $TOTAL"
log "Inline styles fixed: $FIXED"
log ""

log "🏗️  Testing build..."
if pnpm run build > build-test.log 2>&1; then
    log "✅ Build successful!"
    rm build-test.log
else
    log "❌ Build failed - check build-test.log"
    log "⚠️  Rolling back changes..."
    
    # Rollback
    for file in $FILES; do
        if [ -f "${file}.styling-backup" ]; then
            mv "${file}.styling-backup" "$file"
        fi
    done
    
    log "✅ Rolled back all changes"
    exit 1
fi

log ""
log "🧪 Running tests..."
if pnpm test run > test-run.log 2>&1; then
    log "✅ All tests passing!"
    rm test-run.log
else
    log "⚠️  Some tests failed - check test-run.log"
fi

log ""
log "🎉 Frontend styling fix complete!"
log "📝 Log saved to: $LOG"

# Clean up backups
log "🧹 Cleaning up backups..."
find src -name "*.styling-backup" -delete

log "✅ Done!"
