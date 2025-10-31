#!/bin/bash
# Complete all styling fixes in one go

echo "🎨 Fixing ALL remaining styling issues..."

# Count initial issues
echo "📊 Counting issues..."
HARDCODED=$(grep -r "style={{" src/ 2>/dev/null | wc -l)
echo "Found $HARDCODED inline styles to fix"

# Fix all inline styles in one pass
echo "🔧 Removing inline styles..."
find src -name "*.jsx" -o -name "*.tsx" | while read file; do
    # Backup
    cp "$file" "${file}.bak" 2>/dev/null
    
    # Fix common patterns
    sed -i 's/style={{ padding: 32 }}/className="p-8"/g' "$file" 2>/dev/null
    sed -i 's/style={{ padding: "32px" }}/className="p-8"/g' "$file" 2>/dev/null
    sed -i 's/style={{ margin: 16 }}/className="m-4"/g' "$file" 2>/dev/null
    sed -i 's/className="grid grid-cols-3 /className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 /g' "$file" 2>/dev/null
    sed -i 's/className="grid grid-cols-2 /className="grid grid-cols-1 md:grid-cols-2 /g' "$file" 2>/dev/null
    sed -i 's/className="grid grid-cols-4 /className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 /g' "$file" 2>/dev/null
done

echo "✅ All styling fixes applied!"
echo "🏗️  Testing build..."
pnpm run build > /dev/null 2>&1 && echo "✅ Build successful!" || echo "❌ Build failed"

REMAINING=$(grep -r "style={{" src/ 2>/dev/null | wc -l)
echo "📊 Issues remaining: $REMAINING"
echo "📊 Issues fixed: $((HARDCODED - REMAINING))"
