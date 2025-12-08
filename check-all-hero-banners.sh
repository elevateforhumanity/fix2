#!/bin/bash
# Comprehensive hero banner audit

echo "🔍 COMPREHENSIVE HERO BANNER AUDIT"
echo "===================================="
echo ""

# Find all pages with hero sections
echo "📊 Scanning all pages for hero banners..."
echo ""

# Check homepage
echo "1. HOMEPAGE (app/page.tsx)"
grep -A 3 "section.*relative.*h-\[" app/page.tsx | head -5
echo ""

# Check all program pages
echo "2. PROGRAM PAGES"
for file in app/programs/*/page.tsx; do
    if [ -f "$file" ]; then
        filename=$(basename $(dirname "$file"))
        hero_height=$(grep -o "h-\[[0-9]*px\]" "$file" | head -1)
        quality=$(grep -o "quality={[0-9]*}" "$file" | head -1)
        brightness=$(grep -o "brightness-[0-9]*" "$file" | head -1)
        
        if [ -n "$hero_height" ]; then
            echo "  ✅ $filename: $hero_height, $quality, $brightness"
        else
            echo "  ❌ $filename: NO HERO FOUND"
        fi
    fi
done | head -40

echo ""
echo "3. CHECKING FOR ISSUES"
echo "----------------------"

# Check for small heights
small_heroes=$(grep -r "h-\[250px\]" app/programs --include="*.tsx" | wc -l)
echo "  Small heroes (250px): $small_heroes"

# Check for missing quality
missing_quality=$(grep -r "section.*relative.*h-\[" app/programs --include="*.tsx" -A 10 | grep -v "quality={100}" | wc -l)
echo "  Missing quality={100}: Check needed"

# Check for bad brightness
bad_brightness=$(grep -r "brightness-110\|brightness-75" app --include="*.tsx" | wc -l)
echo "  Bad brightness filters: $bad_brightness"

echo ""
echo "✅ Audit complete"
