#!/bin/bash
# Fix all program page images

# Healthcare programs
find app/programs -name "page.tsx" -path "*/cna/*" -o -path "*/medical-assistant/*" -o -path "*/phlebotomy/*" -o -path "*/dental-assistant/*" -o -path "*/pharmacy-technician/*" | while read file; do
  sed -i 's|/images/gallery/image[0-9]*.jpg|/media/hero-slide-healthcare.jpg|g' "$file"
  sed -i 's|/images/programs/[^"]*|/media/hero-slide-healthcare.jpg|g' "$file"
done

# Skilled trades
find app/programs -name "page.tsx" -path "*/welding/*" -o -path "*/hvac/*" -o -path "*/electrical/*" -o -path "*/plumbing/*" | while read file; do
  sed -i 's|/images/gallery/image[0-9]*.jpg|/media/construction-training.png|g' "$file"
  sed -i 's|/images/programs/[^"]*|/media/construction-training.png|g' "$file"
done

# Beauty & Barber
find app/programs -name "page.tsx" -path "*/barber/*" -o -path "*/cosmetology/*" -o -path "*/esthetics/*" | while read file; do
  sed -i 's|/images/gallery/image[0-9]*.jpg|/media/hero-slide-barber.jpg|g' "$file"
  sed -i 's|/images/programs/[^"]*|/media/hero-slide-barber.jpg|g' "$file"
done

echo "✅ Program images fixed"
