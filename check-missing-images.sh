#!/bin/bash

echo "🔍 Checking for missing images across all pages..."
echo ""

# Function to check if image exists
check_image() {
    local img_path="$1"
    local page="$2"
    
    # Remove leading slash and check in public directory
    local file_path="public${img_path}"
    
    if [ ! -f "$file_path" ]; then
        echo "❌ Missing: $img_path (used in $page)"
        return 1
    fi
    return 0
}

# Find all TSX files and extract image paths
missing_count=0

for file in $(find app -name "*.tsx" -type f); do
    # Extract image src paths
    grep -oP 'src=["\047]/[^"'\'']+\.(jpg|png|webp|jpeg)["\047]' "$file" 2>/dev/null | while read -r line; do
        img_path=$(echo "$line" | sed -E 's/src=["'\''](.*?)["'\'']/\1/')
        if ! check_image "$img_path" "$file"; then
            ((missing_count++))
        fi
    done
done

echo ""
echo "✅ Scan complete!"
