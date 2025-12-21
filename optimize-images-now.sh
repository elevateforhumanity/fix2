#!/bin/bash
# Complete Image Optimization Script
# Optimizes all large images to WebP format

set -e

echo "🖼️  Image Optimization Script"
echo "=============================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if sharp-cli is installed
if ! command -v sharp &> /dev/null; then
    echo -e "${YELLOW}⚠️  sharp-cli not found. Installing...${NC}"
    npm install -g sharp-cli
    echo -e "${GREEN}✅ sharp-cli installed${NC}"
fi

# Create backup directory
BACKUP_DIR="public/images-backup-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"
echo -e "${BLUE}📁 Backup directory: $BACKUP_DIR${NC}"
echo ""

# Find all large images (>500KB)
echo "🔍 Finding large images (>500KB)..."
LARGE_IMAGES=$(find public/images -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \) -size +500k 2>/dev/null)

if [ -z "$LARGE_IMAGES" ]; then
    echo -e "${GREEN}✅ No large images found! All images are already optimized.${NC}"
    exit 0
fi

# Count images
IMAGE_COUNT=$(echo "$LARGE_IMAGES" | wc -l)
echo -e "${YELLOW}Found $IMAGE_COUNT large images${NC}"
echo ""

# Process each image
COUNTER=0
TOTAL_SAVED=0

while IFS= read -r IMAGE_PATH; do
    COUNTER=$((COUNTER + 1))
    
    # Get file info
    FILENAME=$(basename "$IMAGE_PATH")
    DIRNAME=$(dirname "$IMAGE_PATH")
    BASENAME="${FILENAME%.*}"
    EXTENSION="${FILENAME##*.}"
    
    # Get original size
    ORIGINAL_SIZE=$(stat -f%z "$IMAGE_PATH" 2>/dev/null || stat -c%s "$IMAGE_PATH" 2>/dev/null)
    ORIGINAL_SIZE_KB=$((ORIGINAL_SIZE / 1024))
    
    echo -e "${BLUE}[$COUNTER/$IMAGE_COUNT]${NC} Processing: $FILENAME (${ORIGINAL_SIZE_KB}KB)"
    
    # Backup original
    cp "$IMAGE_PATH" "$BACKUP_DIR/"
    
    # Output path for WebP
    WEBP_PATH="${DIRNAME}/${BASENAME}.webp"
    
    # Convert to WebP
    if sharp -i "$IMAGE_PATH" -o "$WEBP_PATH" --webp -q 85 2>/dev/null; then
        WEBP_SIZE=$(stat -f%z "$WEBP_PATH" 2>/dev/null || stat -c%s "$WEBP_PATH" 2>/dev/null)
        WEBP_SIZE_KB=$((WEBP_SIZE / 1024))
        SAVED_KB=$((ORIGINAL_SIZE_KB - WEBP_SIZE_KB))
        SAVED_PERCENT=$(( (SAVED_KB * 100) / ORIGINAL_SIZE_KB ))
        
        TOTAL_SAVED=$((TOTAL_SAVED + SAVED_KB))
        
        echo -e "  ${GREEN}✅ Created WebP: ${WEBP_SIZE_KB}KB (saved ${SAVED_KB}KB / ${SAVED_PERCENT}%)${NC}"
        
        # Also optimize the original if it's JPG/PNG
        if [[ "$EXTENSION" == "jpg" || "$EXTENSION" == "jpeg" ]]; then
            OPTIMIZED_PATH="${DIRNAME}/${BASENAME}-optimized.jpg"
            if sharp -i "$IMAGE_PATH" -o "$OPTIMIZED_PATH" --jpeg -q 80 2>/dev/null; then
                OPTIMIZED_SIZE=$(stat -f%z "$OPTIMIZED_PATH" 2>/dev/null || stat -c%s "$OPTIMIZED_PATH" 2>/dev/null)
                OPTIMIZED_SIZE_KB=$((OPTIMIZED_SIZE / 1024))
                
                # Replace original with optimized if smaller
                if [ $OPTIMIZED_SIZE -lt $ORIGINAL_SIZE ]; then
                    mv "$OPTIMIZED_PATH" "$IMAGE_PATH"
                    echo -e "  ${GREEN}✅ Optimized JPG: ${OPTIMIZED_SIZE_KB}KB${NC}"
                else
                    rm "$OPTIMIZED_PATH"
                fi
            fi
        elif [[ "$EXTENSION" == "png" ]]; then
            OPTIMIZED_PATH="${DIRNAME}/${BASENAME}-optimized.png"
            if sharp -i "$IMAGE_PATH" -o "$OPTIMIZED_PATH" --png -q 90 2>/dev/null; then
                OPTIMIZED_SIZE=$(stat -f%z "$OPTIMIZED_PATH" 2>/dev/null || stat -c%s "$OPTIMIZED_PATH" 2>/dev/null)
                OPTIMIZED_SIZE_KB=$((OPTIMIZED_SIZE / 1024))
                
                # Replace original with optimized if smaller
                if [ $OPTIMIZED_SIZE -lt $ORIGINAL_SIZE ]; then
                    mv "$OPTIMIZED_PATH" "$IMAGE_PATH"
                    echo -e "  ${GREEN}✅ Optimized PNG: ${OPTIMIZED_SIZE_KB}KB${NC}"
                else
                    rm "$OPTIMIZED_PATH"
                fi
            fi
        fi
    else
        echo -e "  ${RED}❌ Failed to convert${NC}"
    fi
    
    echo ""
done <<< "$LARGE_IMAGES"

# Summary
echo "=============================="
echo -e "${GREEN}🎉 Optimization Complete!${NC}"
echo ""
echo "Statistics:"
echo "  Images processed: $IMAGE_COUNT"
echo "  Total space saved: ${TOTAL_SAVED}KB (~$((TOTAL_SAVED / 1024))MB)"
echo "  Backup location: $BACKUP_DIR"
echo ""
echo "Next steps:"
echo "  1. Update Image components to use WebP:"
echo "     <Image src=\"/images/hero.webp\" ... />"
echo ""
echo "  2. Or use picture element for fallback:"
echo "     <picture>"
echo "       <source srcset=\"/images/hero.webp\" type=\"image/webp\" />"
echo "       <img src=\"/images/hero.jpg\" alt=\"...\" />"
echo "     </picture>"
echo ""
echo "  3. Test the site to ensure images load correctly"
echo ""
echo "  4. If everything works, you can delete the backup:"
echo "     rm -rf $BACKUP_DIR"
echo ""
