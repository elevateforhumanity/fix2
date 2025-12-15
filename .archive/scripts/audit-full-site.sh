#!/bin/bash

echo "=== FULL SITE AUDIT ==="
echo ""

echo "1. GRADIENT COUNT (should be 0):"
grep -r "gradient" app/ --include="*.tsx" --include="*.css" | wc -l

echo ""
echo "2. PLACEHOLDER CONTENT:"
grep -l "Discover more about" app/*/page.tsx app/*/*/page.tsx 2>/dev/null | wc -l

echo ""
echo "3. PLACEHOLDER GRADIENT BOXES:"
grep -l "bg-gradient-to-br from-blue-500 to-blue-700" app/*/page.tsx app/*/*/page.tsx 2>/dev/null | wc -l

echo ""
echo "4. TOTAL PAGES:"
find app/ -name "page.tsx" -type f | wc -l

echo ""
echo "5. MARKETING PAGES WITH ISSUES:"
for page in faq features pricing what-we-do what-we-offer careers press partners contact; do
  if [ -f "app/$page/page.tsx" ]; then
    echo -n "  $page: "
    if grep -q "bg-blue-700" "app/$page/page.tsx"; then
      echo "❌ No hero image"
    elif grep -q "bg-gradient" "app/$page/page.tsx"; then
      echo "⚠️  Has gradients"
    else
      echo "✅ OK"
    fi
  fi
done

echo ""
echo "6. PROGRAM PAGES:"
ls -1 app/programs/ | grep -v "page.tsx" | wc -l

echo ""
echo "7. DASHBOARD FEATURES:"
echo "  Student portal pages: $(ls -1 app/portal/student/ | wc -l)"
echo "  Instructor portal pages: $(ls -1 app/portal/instructor/ | wc -l)"
echo "  Admin pages: $(ls -1 app/admin/ 2>/dev/null | wc -l)"

echo ""
echo "8. BROKEN LINKS CHECK (sample):"
grep -h "href=\"/" app/page.tsx app/about/page.tsx 2>/dev/null | grep -o 'href="[^"]*"' | head -10

echo ""
echo "=== END AUDIT ==="
