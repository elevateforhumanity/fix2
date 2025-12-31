#!/bin/bash
# Detailed page analysis

echo "📊 Detailed Page Analysis" > page-analysis.txt
echo "=========================" >> page-analysis.txt
echo "" >> page-analysis.txt

# Find pages NOT using database
echo "Pages NOT using Supabase (517 pages):" >> page-analysis.txt
echo "--------------------------------------" >> page-analysis.txt
find app -name "page.tsx" -o -name "page.ts" | xargs grep -L "supabase\|createClient" | head -50 >> page-analysis.txt
echo "" >> page-analysis.txt
echo "... (showing first 50 of 517)" >> page-analysis.txt
echo "" >> page-analysis.txt

# Find pages with hardcoded arrays
echo "Pages with hardcoded arrays (153 pages):" >> page-analysis.txt
echo "----------------------------------------" >> page-analysis.txt
find app -name "page.tsx" -o -name "page.ts" | xargs grep -l "const.*=.*\[" | head -30 >> page-analysis.txt
echo "" >> page-analysis.txt
echo "... (showing first 30 of 153)" >> page-analysis.txt
echo "" >> page-analysis.txt

# Find pages with mock imports
echo "Pages importing mock data (4 pages):" >> page-analysis.txt
echo "------------------------------------" >> page-analysis.txt
find app -name "page.tsx" -o -name "page.ts" | xargs grep -l "mock" >> page-analysis.txt
echo "" >> page-analysis.txt

# Categorize by directory
echo "Pages by category:" >> page-analysis.txt
echo "------------------" >> page-analysis.txt
for dir in app/*/; do
  count=$(find "$dir" -maxdepth 1 -name "page.tsx" -o -name "page.ts" 2>/dev/null | wc -l)
  if [ $count -gt 0 ]; then
    echo "$(basename $dir): $count pages" >> page-analysis.txt
  fi
done

echo "" >> page-analysis.txt
echo "Analysis complete!" >> page-analysis.txt

cat page-analysis.txt
