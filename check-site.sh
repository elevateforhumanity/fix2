#!/bin/bash
echo "🔍 Checking for broken pages and issues..."
echo ""

# Check if critical pages exist
echo "📄 CRITICAL PAGES:"
for page in apply programs about contact employers funding privacy terms lms; do
  if [ -f "app/$page/page.tsx" ] || [ -f "app/$page/page.ts" ]; then
    echo "✅ /$page exists"
  else
    echo "❌ /$page MISSING"
  fi
done

echo ""
echo "🔗 CHECKING NAVIGATION LINKS:"
# Check what's in the header
if [ -f "components/layout/MainHeader.tsx" ]; then
  echo "Header links:"
  grep -o 'href="[^"]*"' components/layout/MainHeader.tsx | head -10
fi

echo ""
echo "🔗 CHECKING FOOTER LINKS:"
if [ -f "components/layout/MainFooter.tsx" ]; then
  echo "Footer links:"
  grep -o 'href="[^"]*"' components/layout/MainFooter.tsx | head -15
fi

echo ""
echo "⚠️  CHECKING FOR COMMON ISSUES:"
# Check for broken image references
echo "Checking for broken image paths..."
grep -r "src=\"/images" app/page.tsx 2>/dev/null | head -5

echo ""
echo "✅ Check complete!"
