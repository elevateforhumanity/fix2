#!/bin/bash
# Remove ALL gradient overlays from entire site

echo "🔧 Removing ALL gradient overlays from site..."
echo ""

# Find all files with gradients
FILES=$(grep -rl "bg-gradient\|gradient-to" app --include="*.tsx" --include="*.ts")

COUNT=0

for file in $FILES; do
  # Remove gradient overlay divs
  sed -i '/<div className="absolute inset-0 bg-gradient/d' "$file"
  sed -i '/<div className="absolute inset-0 bg-black\/[0-9]*" \/>/d' "$file"
  
  # Remove gradient classes from divs
  sed -i 's/className="[^"]*bg-gradient-to-[a-z]*[^"]*from-black\/[0-9]*[^"]*via-black\/[0-9]*[^"]*to-black\/[0-9]*[^"]*"/className=""/g' "$file"
  
  # Remove standalone gradient divs
  sed -i '/bg-gradient-to-b from-black\/40 via-black\/30 to-black\/50/d' "$file"
  sed -i '/bg-gradient-to-r from-black\/50 to-transparent/d' "$file"
  
  ((COUNT++))
  echo "  ✅ Cleaned: $file"
done

echo ""
echo "✅ Removed gradients from $COUNT files!"
echo ""
echo "Verifying..."
REMAINING=$(grep -r "bg-gradient\|gradient-to" app --include="*.tsx" --include="*.ts" | wc -l)
echo "Remaining gradients: $REMAINING"
