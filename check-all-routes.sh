#!/bin/bash

echo "🔍 Checking all routes and links..."
echo ""

# Extract all href values from TSX files
echo "📋 Extracting all internal links..."
grep -rh 'href="/' app components --include="*.tsx" --include="*.jsx" | \
  grep -o 'href="[^"]*"' | \
  sed 's/href="//g' | \
  sed 's/"//g' | \
  grep -v "^http" | \
  grep -v "^mailto" | \
  grep -v "^tel" | \
  sort -u > /tmp/all-links.txt

echo "Found $(wc -l < /tmp/all-links.txt) unique internal links"
echo ""

# Check each route
echo "✅ Checking if routes exist..."
missing_count=0

while IFS= read -r link; do
  # Remove query params and anchors
  route=$(echo "$link" | sed 's/[?#].*//')
  
  # Skip dynamic routes with brackets
  if [[ "$route" == *"["* ]]; then
    continue
  fi
  
  # Convert route to file path
  if [ "$route" = "/" ]; then
    filepath="app/page.tsx"
  else
    # Remove leading slash
    clean_route="${route#/}"
    filepath="app/${clean_route}/page.tsx"
  fi
  
  # Check if file exists
  if [ ! -f "$filepath" ]; then
    echo "❌ Missing: $route (expected: $filepath)"
    ((missing_count++))
  fi
done < /tmp/all-links.txt

echo ""
if [ $missing_count -eq 0 ]; then
  echo "✅ All routes have corresponding page files!"
else
  echo "⚠️  Found $missing_count missing routes"
fi

echo ""
echo "📊 Route Summary:"
echo "  Total links checked: $(wc -l < /tmp/all-links.txt)"
echo "  Missing routes: $missing_count"
