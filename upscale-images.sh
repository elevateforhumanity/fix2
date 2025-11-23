#!/bin/bash
# Upscale and optimize images for crystal clear quality

set -e

echo "🎨 Upscaling images to high DPI for crystal clear quality..."

# Create backup directory
mkdir -p public/media/programs/originals
mkdir -p public/media/programs/webp

# Process each image
for img in public/media/programs/*.jpg; do
    filename=$(basename "$img")
    name="${filename%.*}"
    
    echo "Processing: $filename"
    
    # Backup original
    if [ ! -f "public/media/programs/originals/$filename" ]; then
        cp "$img" "public/media/programs/originals/$filename"
    fi
    
    # Upscale to 2400x1600 (2x retina) with 300 DPI
    # Using Lanczos filter for best quality upscaling
    convert "$img" \
        -filter Lanczos \
        -resize 2400x1600^ \
        -gravity center \
        -extent 2400x1600 \
        -density 300 \
        -quality 95 \
        -strip \
        -interlace Plane \
        "public/media/programs/${name}-hd.jpg"
    
    # Create WebP version (better compression, same quality)
    cwebp -q 90 -m 6 -af \
        "public/media/programs/${name}-hd.jpg" \
        -o "public/media/programs/webp/${name}.webp" 2>/dev/null || true
    
    # Create standard web version (1920x1280 for regular displays)
    convert "public/media/programs/${name}-hd.jpg" \
        -filter Lanczos \
        -resize 1920x1280 \
        -density 150 \
        -quality 90 \
        -strip \
        -interlace Plane \
        "public/media/programs/${name}.jpg"
    
    echo "  ✅ Created: ${name}-hd.jpg (2400x1600 @ 300 DPI)"
    echo "  ✅ Created: ${name}.jpg (1920x1280 @ 150 DPI)"
    echo "  ✅ Created: ${name}.webp (WebP format)"
done

echo ""
echo "📊 Image sizes:"
du -sh public/media/programs/*.jpg | grep -v originals | sort -h

echo ""
echo "✨ All images upscaled successfully!"
echo ""
echo "Usage in Next.js:"
echo "  - Use ${name}-hd.jpg for retina displays"
echo "  - Use ${name}.jpg for standard displays"
echo "  - Use ${name}.webp for modern browsers (best compression)"
