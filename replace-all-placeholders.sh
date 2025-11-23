#!/bin/bash

echo "🎨 REPLACING ALL PLACEHOLDERS WITH REAL IMAGES"
echo "=============================================="
echo ""

# Map of placeholder URLs to real images
declare -A IMAGE_MAP=(
    # Video page placeholders
    ["https://placehold.co/1280x720/0f172a/f97316?text=Barber+Apprenticeship+Spotlight"]="/images/homepage/barber-apprenticeship-training.png"
    ["https://placehold.co/1280x720/020617/f97316?text=Elevate+Overview+Video"]="/images/homepage/pathways-to-employment-banner.png"
    ["https://placehold.co/1280x720/022c22/a7f3d0?text=Employer+%2F+Workforce+Pipeline"]="/images/homepage/employer-partnership.png"
    
    # Training provider placeholders
    ["https://placehold.co/800x450/020617/f97316?text=Training+Provider+Overview+Video"]="/images/homepage/training-program-collage.png"
    ["https://placehold.co/800x450/020617/f97316?text=Provider+Success+Story+Video"]="/images/homepage/workforce-pathway-ecosystem.png"
    
    # Partner logos
    ["https://placehold.co/200x100/334155/94a3b8?text=Partner+"]="/images/split/piece-"
    ["https://placehold.co/200x80/020617/94a3b8?text=Partner+"]="/images/split/piece-"
    
    # Coursera style placeholders
    ["https://placehold.co/1200x675/020617/f97316?text=Elevate+Overview+Video"]="/images/homepage/pathways-to-employment-banner.png"
    ["https://placehold.co/600x340/0f172a/e5e7eb?text=Barber+Spotlight"]="/images/homepage/barber-apprenticeship-training.png"
)

echo "📝 Replacing placeholders in files..."
echo ""

# Replace in video pages
for file in app/videos/*/page.tsx; do
    if [ -f "$file" ]; then
        echo "Processing: $file"
        sed -i 's|https://placehold\.co/1280x720/0f172a/f97316?text=Barber+Apprenticeship+Spotlight|/images/homepage/barber-apprenticeship-training.png|g' "$file"
        sed -i 's|https://placehold\.co/1280x720/020617/f97316?text=Elevate+Overview+Video|/images/homepage/pathways-to-employment-banner.png|g' "$file"
        sed -i 's|https://placehold\.co/1280x720/022c22/a7f3d0?text=Employer+%2F+Workforce+Pipeline|/images/homepage/employer-partnership.png|g' "$file"
    fi
done

# Replace in training providers
if [ -f "app/training-providers/page.tsx" ]; then
    echo "Processing: app/training-providers/page.tsx"
    sed -i 's|https://placehold\.co/800x450/020617/f97316?text=Training+Provider+Overview+Video|/images/homepage/training-program-collage.png|g' app/training-providers/page.tsx
    sed -i 's|https://placehold\.co/800x450/020617/f97316?text=Provider+Success+Story+Video|/images/homepage/workforce-pathway-ecosystem.png|g' app/training-providers/page.tsx
fi

# Replace in old page backups
for file in app/page-old-backup.tsx app/page-previous.tsx app/page-coursera-style.tsx; do
    if [ -f "$file" ]; then
        echo "Processing: $file"
        # Replace partner logos with split images
        sed -i 's|https://placehold\.co/200x100/334155/94a3b8?text=Partner+\${i}|/images/split/piece-\${i}.png|g' "$file"
        sed -i 's|https://placehold\.co/200x80/020617/94a3b8?text=Partner+\${i}|/images/split/piece-\${i}.png|g' "$file"
        # Replace video thumbnails
        sed -i 's|https://placehold\.co/1200x675/020617/f97316?text=Elevate+Overview+Video|/images/homepage/pathways-to-employment-banner.png|g' "$file"
        sed -i 's|https://placehold\.co/600x340/0f172a/e5e7eb?text=Barber+Spotlight|/images/homepage/barber-apprenticeship-training.png|g' "$file"
    fi
done

echo ""
echo "✅ Placeholder replacement complete!"
echo ""
echo "📊 Summary:"
echo "  - Replaced video page placeholders"
echo "  - Replaced training provider placeholders"
echo "  - Replaced partner logo placeholders"
echo "  - Replaced thumbnail placeholders"
