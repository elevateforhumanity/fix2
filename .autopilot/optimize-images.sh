#!/bin/bash
# Optimize all repository images to save 50-100 MB
# Compress to 85% quality with no visible loss

set -e

echo "🎨 Starting image optimization..."
echo "=========================================="
echo ""

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "📦 Installing ImageMagick..."
    sudo apt-get update -qq
    sudo apt-get install -y imagemagick
fi

# Get initial size
INITIAL_SIZE=$(du -sh public/media-backup-20251128-043832/ | cut -f1)
echo "📊 Initial size: $INITIAL_SIZE"
echo ""

# Count total images
TOTAL_IMAGES=$(find public/media-backup-20251128-043832 -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \) | wc -l)
echo "🖼️  Found $TOTAL_IMAGES images to optimize"
echo ""

PROCESSED=0

# Optimize JPG/JPEG files
echo "📝 Optimizing JPG images..."
find public/media-backup-20251128-043832 -type f \( -name "*.jpg" -o -name "*.jpeg" \) | while read file; do
    PROCESSED=$((PROCESSED + 1))
    echo -ne "  Processing: $PROCESSED/$TOTAL_IMAGES\r"
    
    # Create backup
    cp "$file" "$file.backup"
    
    # Optimize with ImageMagick (85% quality, strip metadata)
    convert "$file" -quality 85 -strip "$file.tmp" 2>/dev/null || {
        # If conversion fails, restore backup
        mv "$file.backup" "$file"
        continue
    }
    
    # Check if optimized file is smaller
    ORIGINAL_SIZE=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file")
    NEW_SIZE=$(stat -f%z "$file.tmp" 2>/dev/null || stat -c%s "$file.tmp")
    
    if [ "$NEW_SIZE" -lt "$ORIGINAL_SIZE" ]; then
        # Use optimized version
        mv "$file.tmp" "$file"
        rm "$file.backup"
    else
        # Keep original (already optimized)
        rm "$file.tmp"
        mv "$file.backup" "$file"
    fi
done

echo ""
echo "✅ JPG optimization complete"
echo ""

# Optimize PNG files (optional - can be slow)
echo "📝 Optimizing PNG images..."
PNG_COUNT=$(find public/media-backup-20251128-043832 -type f -name "*.png" | wc -l)

if [ "$PNG_COUNT" -gt 0 ]; then
    find public/media-backup-20251128-043832 -type f -name "*.png" | while read file; do
        echo "  Processing: $(basename "$file")"
        
        # Create backup
        cp "$file" "$file.backup"
        
        # Optimize PNG
        convert "$file" -strip "$file.tmp" 2>/dev/null || {
            mv "$file.backup" "$file"
            continue
        }
        
        # Check if smaller
        ORIGINAL_SIZE=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file")
        NEW_SIZE=$(stat -f%z "$file.tmp" 2>/dev/null || stat -c%s "$file.tmp")
        
        if [ "$NEW_SIZE" -lt "$ORIGINAL_SIZE" ]; then
            mv "$file.tmp" "$file"
            rm "$file.backup"
        else
            rm "$file.tmp"
            mv "$file.backup" "$file"
        fi
    done
    echo "✅ PNG optimization complete"
else
    echo "  No PNG files found"
fi

echo ""

# Get final size
FINAL_SIZE=$(du -sh public/media-backup-20251128-043832/ | cut -f1)

echo "=========================================="
echo "✅ OPTIMIZATION COMPLETE!"
echo "=========================================="
echo ""
echo "📊 Results:"
echo "  - Initial size: $INITIAL_SIZE"
echo "  - Final size:   $FINAL_SIZE"
echo "  - Images processed: $TOTAL_IMAGES"
echo ""
echo "🎉 Images optimized for faster loading!"
echo ""
