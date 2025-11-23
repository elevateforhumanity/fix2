#!/bin/bash

echo "🎨 OPTIMIZING ALL MEDIA TO CRYSTAL CLEAR HD QUALITY"
echo "=================================================="
echo ""

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "Installing ImageMagick for image optimization..."
    sudo apt-get update && sudo apt-get install -y imagemagick
fi

# Image optimization settings
QUALITY=95  # High quality (1-100)
MIN_WIDTH=1920  # Full HD width
MIN_HEIGHT=1080  # Full HD height

echo "📊 Analyzing current images..."
echo ""

# Find all images
find public/images -type f \( -name "*.jpg" -o -name "*.png" -o -name "*.jpeg" \) | while read img; do
    # Get current dimensions
    dimensions=$(identify -format "%wx%h" "$img" 2>/dev/null)
    width=$(echo $dimensions | cut -d'x' -f1)
    height=$(echo $dimensions | cut -d'x' -f2)
    
    if [ ! -z "$width" ] && [ ! -z "$height" ]; then
        if [ "$width" -lt "$MIN_WIDTH" ] || [ "$height" -lt "$MIN_HEIGHT" ]; then
            echo "⚠️  LOW RES: $img ($dimensions)"
        fi
    fi
done

echo ""
echo "🎬 Analyzing videos..."
echo ""

# Check video quality
find public/videos -type f -name "*.mp4" | while read video; do
    info=$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height,bit_rate -of csv=p=0 "$video" 2>/dev/null)
    if [ ! -z "$info" ]; then
        width=$(echo $info | cut -d',' -f1)
        height=$(echo $info | cut -d',' -f2)
        bitrate=$(echo $info | cut -d',' -f3)
        
        if [ "$width" -lt "1920" ]; then
            echo "⚠️  LOW RES VIDEO: $video (${width}x${height})"
        fi
    fi
done

echo ""
echo "📋 RECOMMENDATIONS FOR CRYSTAL CLEAR HD:"
echo "========================================"
echo ""
echo "IMAGES:"
echo "  ✓ Minimum resolution: 1920x1080 (Full HD)"
echo "  ✓ Recommended: 2560x1440 (2K) or 3840x2160 (4K)"
echo "  ✓ Format: WebP for web (smaller, better quality)"
echo "  ✓ Quality: 90-95% for photos, 100% for graphics"
echo "  ✓ Compression: Use modern formats (WebP, AVIF)"
echo ""
echo "VIDEOS:"
echo "  ✓ Resolution: 1920x1080 minimum (Full HD)"
echo "  ✓ Bitrate: 5-8 Mbps for 1080p"
echo "  ✓ Codec: H.264 (MP4) for compatibility"
echo "  ✓ Audio: 192 kbps AAC"
echo "  ✓ Frame rate: 30fps or 60fps"
echo ""
echo "NEXT.JS IMAGE OPTIMIZATION:"
echo "  ✓ Use Next.js Image component (automatic optimization)"
echo "  ✓ Set quality prop to 95 for crisp images"
echo "  ✓ Use priority for above-fold images"
echo "  ✓ Specify width/height to prevent layout shift"
echo ""

# Create a sample optimization command
echo "🔧 SAMPLE OPTIMIZATION COMMANDS:"
echo "================================"
echo ""
echo "# Optimize image to HD:"
echo "convert input.jpg -resize 1920x1080^ -quality 95 output.jpg"
echo ""
echo "# Convert to WebP (better quality, smaller size):"
echo "cwebp -q 95 input.jpg -o output.webp"
echo ""
echo "# Optimize video to HD:"
echo "ffmpeg -i input.mp4 -vf scale=1920:1080 -c:v libx264 -preset slow -crf 18 -c:a aac -b:a 192k output.mp4"
echo ""

echo "✅ Analysis complete!"
