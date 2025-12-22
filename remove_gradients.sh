#!/bin/bash

# Phase 3: Sitewide Gradient Removal Script
# Removes all bg-gradient-* utilities and replaces with solid backgrounds

echo "Starting gradient removal..."

# Find all active TSX files (exclude backups/old files)
FILES=$(find app -name "*.tsx" -type f | grep -v -E "(backup|old|new|redesign|disabled)")

TOTAL_REMOVED=0

for file in $FILES; do
  if grep -q "bg-gradient" "$file"; then
    echo "Processing: $file"
    
    # Count gradients before
    BEFORE=$(grep -o "bg-gradient-[a-z-]*" "$file" | wc -l)
    
    # Common gradient patterns and their replacements
    
    # Hero backgrounds: gradient to solid
    sed -i 's/bg-gradient-to-br from-blue-600 to-blue-800/bg-blue-700/g' "$file"
    sed -i 's/bg-gradient-to-br from-blue-900 via-purple-900 to-black/bg-slate-900/g' "$file"
    sed -i 's/bg-gradient-to-br from-brand-orange-50 to-brand-blue-50/bg-orange-50/g' "$file"
    sed -i 's/bg-gradient-to-b from-slate-50 to-white/bg-slate-50/g' "$file"
    sed -i 's/bg-gradient-to-b from-white to-slate-50/bg-white/g' "$file"
    sed -i 's/bg-gradient-to-b from-white to-gray-50/bg-white/g' "$file"
    
    # Overlay gradients: gradient to solid semi-transparent
    sed -i 's/bg-gradient-to-t from-black\/20 to-transparent/bg-black\/10/g' "$file"
    sed -i 's/bg-gradient-to-t from-black\/30 to-transparent/bg-black\/15/g' "$file"
    sed -i 's/bg-gradient-to-t from-black\/40 to-transparent/bg-black\/20/g' "$file"
    sed -i 's/bg-gradient-to-t from-black\/50 to-transparent/bg-black\/25/g' "$file"
    sed -i 's/bg-gradient-to-t from-black\/60 to-transparent/bg-black\/30/g' "$file"
    sed -i 's/bg-gradient-to-t from-black\/70 to-transparent/bg-black\/35/g' "$file"
    sed -i 's/bg-gradient-to-t from-black\/80 to-transparent/bg-black\/40/g' "$file"
    sed -i 's/bg-gradient-to-t from-black\/90 to-transparent/bg-black\/45/g' "$file"
    
    # Directional gradients: gradient to solid
    sed -i 's/bg-gradient-to-r from-[a-z0-9-\/]* to-[a-z0-9-\/]*/bg-slate-900/g' "$file"
    sed -i 's/bg-gradient-to-l from-[a-z0-9-\/]* to-[a-z0-9-\/]*/bg-slate-900/g' "$file"
    
    # Text gradients: remove (these are decorative)
    sed -i 's/text-transparent bg-clip-text bg-gradient-to-r from-[a-z0-9-]* to-[a-z0-9-]*/text-orange-500/g' "$file"
    
    # Count gradients after
    AFTER=$(grep -o "bg-gradient-[a-z-]*" "$file" 2>/dev/null | wc -l)
    
    REMOVED=$((BEFORE - AFTER))
    TOTAL_REMOVED=$((TOTAL_REMOVED + REMOVED))
    
    if [ $REMOVED -gt 0 ]; then
      echo "  ✅ Removed $REMOVED gradients from $file"
    fi
  fi
done

echo ""
echo "========================================="
echo "Gradient Removal Complete"
echo "Total gradients removed: $TOTAL_REMOVED"
echo "========================================="

# Final check
REMAINING=$(find app -name "*.tsx" -type f | grep -v -E "(backup|old|new|redesign|disabled)" | xargs grep -o "bg-gradient-[a-z-]*" 2>/dev/null | wc -l)
echo "Remaining gradients: $REMAINING"

if [ $REMAINING -eq 0 ]; then
  echo "✅ SUCCESS: All gradients removed!"
else
  echo "⚠️  WARNING: $REMAINING gradients still remain (may require manual review)"
fi
