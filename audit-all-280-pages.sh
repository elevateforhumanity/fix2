#!/bin/bash

echo "🔍 SYSTEMATIC LINE-BY-LINE AUDIT OF ALL 280 PAGES"
echo "=================================================="
echo ""

total_pages=$(find app -name "page.tsx" -type f | wc -l)
echo "📊 Total pages found: $total_pages"
echo ""

# 1. Check each page for issues
echo "1️⃣ CHECKING EACH PAGE FOR ISSUES..."
echo "-----------------------------------"

issues_found=0

find app -name "page.tsx" -type f | sort | while read page; do
    page_name=$(echo "$page" | sed 's|app/||' | sed 's|/page.tsx||')
    
    # Check for placeholder.co
    if grep -q "placehold\.co" "$page"; then
        echo "❌ $page_name - Has placeholder.co URL"
        ((issues_found++))
    fi
    
    # Check for TODO/FIXME
    if grep -q "TODO\|FIXME\|XXX" "$page"; then
        echo "⚠️  $page_name - Has TODO/FIXME"
    fi
    
    # Check for broken image paths
    if grep -q 'src="/images/' "$page"; then
        grep -o 'src="/images/[^"]*"' "$page" | while read img_line; do
            img_path=$(echo "$img_line" | cut -d'"' -f2)
            if [ ! -f "public$img_path" ]; then
                echo "❌ $page_name - Missing image: $img_path"
                ((issues_found++))
            fi
        done
    fi
    
    # Check for broken video paths
    if grep -q 'src="/videos/' "$page"; then
        grep -o 'src="/videos/[^"]*"' "$page" | while read vid_line; do
            vid_path=$(echo "$vid_line" | cut -d'"' -f2)
            if [ ! -f "public$vid_path" ]; then
                echo "❌ $page_name - Missing video: $vid_path"
                ((issues_found++))
            fi
        done
    fi
done

echo ""
echo "2️⃣ CHECKING VIDEO PAGES SPECIFICALLY..."
echo "----------------------------------------"

for video_page in app/videos/*/page.tsx; do
    page_name=$(basename $(dirname $video_page))
    echo "Checking: $page_name"
    
    # Check if it has a video tag
    if grep -q "<video" "$video_page"; then
        echo "  ✅ Has <video> tag"
    else
        echo "  ❌ NO <video> tag"
    fi
    
    # Check if video file exists
    if grep -q 'src="/videos/' "$video_page"; then
        video_src=$(grep -o 'src="/videos/[^"]*"' "$video_page" | head -1 | cut -d'"' -f2)
        if [ -f "public$video_src" ]; then
            size=$(ls -lh "public$video_src" | awk '{print $5}')
            echo "  ✅ Video file exists: $video_src ($size)"
        else
            echo "  ❌ Video file MISSING: $video_src"
        fi
    fi
    echo ""
done

echo "3️⃣ CHECKING HOMEPAGE SPECIFICALLY..."
echo "-------------------------------------"
echo "Hero banner width:"
grep "max-w" app/page.tsx | head -3
echo ""
echo "Hero image size:"
grep "h-\[" app/page.tsx | grep "relative" | head -1
echo ""

echo "4️⃣ SUMMARY"
echo "----------"
echo "Total pages: $total_pages"
echo "Issues found: Check output above"
echo ""
echo "✅ Audit complete!"
