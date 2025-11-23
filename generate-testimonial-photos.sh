#!/bin/bash
# Generate professional-looking testimonial photos with gradients

set -e

echo "📸 Generating professional testimonial photos..."

# Create backup
mkdir -p public/people/originals
cp public/people/*.jpg public/people/originals/ 2>/dev/null || true

# Marcus - Barber (Dark professional gradient)
convert -size 800x800 \
    gradient:'#1e293b-#334155' \
    -swirl 60 \
    \( +clone -blur 0x20 \) \
    -compose overlay -composite \
    -fill white -pointsize 200 -gravity center \
    -annotate +0-50 'M' \
    -blur 0x2 \
    -quality 95 \
    public/people/marcus.jpg

# Sharon - Medical Assistant (Warm professional gradient)
convert -size 800x800 \
    gradient:'#f59e0b-#fbbf24' \
    -swirl -60 \
    \( +clone -blur 0x20 \) \
    -compose overlay -composite \
    -fill white -pointsize 200 -gravity center \
    -annotate +0-50 'S' \
    -blur 0x2 \
    -quality 95 \
    public/people/sharon.jpg

# Alicia - Healthcare (Cool professional gradient)
convert -size 800x800 \
    gradient:'#3b82f6-#60a5fa' \
    -swirl 45 \
    \( +clone -blur 0x20 \) \
    -compose overlay -composite \
    -fill white -pointsize 200 -gravity center \
    -annotate +0-50 'A' \
    -blur 0x2 \
    -quality 95 \
    public/people/alicia.jpg

# Create high-quality versions
for person in marcus sharon alicia; do
    # HD version (800x800 @ 300 DPI)
    convert public/people/${person}.jpg \
        -resize 800x800 \
        -density 300 \
        -quality 95 \
        -strip \
        public/people/${person}-hd.jpg
    
    # WebP version
    cwebp -q 90 -m 6 \
        public/people/${person}-hd.jpg \
        -o public/people/${person}.webp 2>/dev/null || true
done

echo "✅ Generated professional testimonial photos"
echo ""
ls -lh public/people/*.jpg public/people/*.webp 2>/dev/null | grep -v originals
