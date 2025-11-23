#!/bin/bash

echo "🔍 COMPREHENSIVE SITE AUDIT - FINDING ALL ISSUES"
echo "================================================"
echo ""

# 1. Find all placeholder text
echo "1️⃣ CHECKING FOR PLACEHOLDER TEXT..."
echo "-----------------------------------"
grep -r "placeholder\|TODO\|FIXME\|XXX\|Coming Soon\|Lorem ipsum" app --include="*.tsx" --include="*.jsx" | grep -v node_modules | grep -v "placeholder=" | head -20
echo ""

# 2. Find broken image links
echo "2️⃣ CHECKING FOR BROKEN IMAGE LINKS..."
echo "--------------------------------------"
grep -r "src=\"/images\|src=\"/media" app --include="*.tsx" --include="*.jsx" | grep -v node_modules | while read line; do
    file=$(echo "$line" | cut -d: -f1)
    img=$(echo "$line" | grep -o 'src="[^"]*"' | cut -d'"' -f2)
    if [ ! -z "$img" ] && [ ! -f "public$img" ]; then
        echo "❌ MISSING: $img (in $file)"
    fi
done | head -20
echo ""

# 3. Find placeholder.co URLs
echo "3️⃣ CHECKING FOR PLACEHOLDER.CO URLS..."
echo "---------------------------------------"
grep -r "placehold\.co\|placeholder\.com\|via\.placeholder" app --include="*.tsx" --include="*.jsx" | grep -v node_modules | head -10
echo ""

# 4. Find broken internal links
echo "4️⃣ CHECKING FOR BROKEN INTERNAL LINKS..."
echo "-----------------------------------------"
grep -r "href=\"/" app --include="*.tsx" --include="*.jsx" | grep -v node_modules | grep -o 'href="[^"]*"' | cut -d'"' -f2 | sort -u | while read link; do
    # Remove query params and anchors
    clean_link=$(echo "$link" | cut -d'?' -f1 | cut -d'#' -f1)
    # Check if page exists
    if [ ! -z "$clean_link" ] && [ "$clean_link" != "/" ]; then
        page_path="app${clean_link}/page.tsx"
        if [ ! -f "$page_path" ]; then
            echo "❌ BROKEN LINK: $link (no page at $page_path)"
        fi
    fi
done | head -20
echo ""

# 5. Find empty or stub pages
echo "5️⃣ CHECKING FOR EMPTY/STUB PAGES..."
echo "------------------------------------"
find app -name "page.tsx" -type f | while read page; do
    lines=$(wc -l < "$page")
    if [ $lines -lt 20 ]; then
        echo "⚠️  STUB PAGE: $page ($lines lines)"
    fi
done | head -10
echo ""

# 6. Find missing videos
echo "6️⃣ CHECKING FOR MISSING VIDEOS..."
echo "----------------------------------"
grep -r "src=\"/videos" app --include="*.tsx" --include="*.jsx" | grep -v node_modules | grep -o 'src="[^"]*"' | cut -d'"' -f2 | sort -u | while read video; do
    if [ ! -f "public$video" ]; then
        echo "❌ MISSING VIDEO: $video"
    fi
done | head -10
echo ""

# 7. Check for low-res images
echo "7️⃣ CHECKING FOR LOW RESOLUTION IMAGES..."
echo "-----------------------------------------"
find public/images -type f \( -name "*.jpg" -o -name "*.png" \) | while read img; do
    if command -v identify &> /dev/null; then
        dimensions=$(identify -format "%wx%h" "$img" 2>/dev/null)
        width=$(echo $dimensions | cut -d'x' -f1)
        if [ ! -z "$width" ] && [ "$width" -lt "1920" ]; then
            echo "⚠️  LOW RES: $img ($dimensions)"
        fi
    fi
done | head -10
echo ""

# 8. Check for incomplete forms
echo "8️⃣ CHECKING FOR INCOMPLETE FORMS..."
echo "------------------------------------"
grep -r "<form\|<Form" app --include="*.tsx" --include="*.jsx" | grep -v node_modules | wc -l
echo "Total forms found: $(grep -r '<form\|<Form' app --include='*.tsx' --include='*.jsx' | grep -v node_modules | wc -l)"
echo ""

# 9. Check for missing metadata
echo "9️⃣ CHECKING FOR MISSING METADATA..."
echo "------------------------------------"
find app -name "page.tsx" -type f | while read page; do
    if ! grep -q "metadata\|Metadata" "$page"; then
        echo "⚠️  NO METADATA: $page"
    fi
done | head -10
echo ""

# 10. Summary
echo "📊 AUDIT SUMMARY"
echo "================"
echo "Total pages: $(find app -name 'page.tsx' -type f | wc -l)"
echo "Total images: $(find public/images -type f \( -name '*.jpg' -o -name '*.png' -o -name '*.webp' \) | wc -l)"
echo "Total videos: $(find public/videos -type f -name '*.mp4' | wc -l)"
echo ""
echo "✅ Audit complete! Review issues above."
