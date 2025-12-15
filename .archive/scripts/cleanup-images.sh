#!/bin/bash
# Image cleanup script - removes generic/unused images

echo "🧹 Starting image cleanup..."
echo ""

# Remove generic stock photos from media directory
echo "Removing generic media images..."
rm -f public/media/hero-slide-*.jpg
rm -f public/media/additional-image-*.jpg
rm -f public/media/*-hero.jpg

# Remove unused program images
echo "Removing old program images..."
rm -rf public/images/programs-new/
rm -rf public/images/programs-old/

# Remove generic testimonial/people photos
echo "Removing generic people photos..."
find public -name "*testimonial*" -type f -delete
find public -name "*avatar*" -type f ! -name "*.svg" -delete

# Remove stock/placeholder images
echo "Removing stock images..."
find public -name "*stock*" -type f -delete
find public -name "*placeholder*" -type f ! -name "*.svg" -delete
find public -name "*generic*" -type f -delete

# Remove duplicate/backup images
echo "Removing backup images..."
find public -name "*-old.*" -type f -delete
find public -name "*-backup.*" -type f -delete
find public -name "*-copy.*" -type f -delete

echo ""
echo "✅ Cleanup complete!"
echo ""
echo "Remaining images:"
find public -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.webp" \) | wc -l
