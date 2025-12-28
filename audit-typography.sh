#!/bin/bash
set -e

echo "🔍 Typography & Font System Audit"
echo "=================================="
echo ""

# 1. Check font configuration files
echo "1️⃣  Checking font configuration..."
if [ -f "app/layout.tsx" ]; then
  echo "   ✅ Found app/layout.tsx"
  grep -n "font\|Font" app/layout.tsx | head -10
else
  echo "   ❌ app/layout.tsx not found"
fi
echo ""

# 2. Check for font imports
echo "2️⃣  Checking font imports..."
FONT_IMPORTS=$(grep -r "next/font\|@next/font" app/ --include="*.tsx" --include="*.ts" | wc -l)
echo "   Found: $FONT_IMPORTS font imports"
if [ $FONT_IMPORTS -gt 0 ]; then
  echo "   Sample imports:"
  grep -r "next/font\|@next/font" app/ --include="*.tsx" --include="*.ts" | head -5
fi
echo ""

# 3. Check for font files
echo "3️⃣  Checking font files..."
if [ -d "public/fonts" ]; then
  FONT_FILES=$(find public/fonts -type f 2>/dev/null | wc -l)
  echo "   ✅ Found public/fonts directory"
  echo "   Font files: $FONT_FILES"
  ls -lh public/fonts/ 2>/dev/null | head -10
else
  echo "   ⚠️  No public/fonts directory"
fi
echo ""

# 4. Check Tailwind config for fonts
echo "4️⃣  Checking Tailwind font configuration..."
if [ -f "tailwind.config.ts" ] || [ -f "tailwind.config.js" ]; then
  echo "   ✅ Found Tailwind config"
  grep -n "fontFamily\|font-" tailwind.config.* 2>/dev/null | head -10
else
  echo "   ❌ No Tailwind config found"
fi
echo ""

# 5. Check for font-related CSS
echo "5️⃣  Checking global CSS for fonts..."
if [ -f "app/globals.css" ]; then
  echo "   ✅ Found globals.css"
  grep -n "@font-face\|font-family" app/globals.css | head -10
else
  echo "   ⚠️  No globals.css found"
fi
echo ""

# 6. Check for inconsistent font usage
echo "6️⃣  Checking for font class inconsistencies..."
FONT_CLASSES=$(grep -r "font-\|text-" app/ components/ --include="*.tsx" | wc -l)
echo "   Total font/text classes: $FONT_CLASSES"

# Check for common issues
INLINE_FONTS=$(grep -r 'style.*font-family' app/ components/ --include="*.tsx" | wc -l)
echo "   Inline font-family styles: $INLINE_FONTS"
if [ $INLINE_FONTS -gt 10 ]; then
  echo "   ⚠️  High inline font usage - should use Tailwind classes"
fi
echo ""

# 7. Check for missing font fallbacks
echo "7️⃣  Checking font fallbacks..."
grep -r "font-family:" app/ components/ --include="*.css" --include="*.tsx" | grep -v "sans-serif\|serif\|monospace" | wc -l
MISSING_FALLBACKS=$(grep -r "font-family:" app/ components/ --include="*.css" --include="*.tsx" | grep -v "sans-serif\|serif\|monospace" | wc -l)
if [ $MISSING_FALLBACKS -gt 0 ]; then
  echo "   ⚠️  Found $MISSING_FALLBACKS font declarations without fallbacks"
else
  echo "   ✅ All fonts have fallbacks"
fi
echo ""

# 8. Check for font loading issues
echo "8️⃣  Checking for font loading patterns..."
FONT_DISPLAY=$(grep -r "font-display" app/ public/ --include="*.css" | wc -l)
echo "   font-display declarations: $FONT_DISPLAY"
if [ $FONT_DISPLAY -eq 0 ]; then
  echo "   ⚠️  No font-display strategy found"
else
  echo "   ✅ Font loading strategy present"
fi
echo ""

# 9. Check for web font optimization
echo "9️⃣  Checking font optimization..."
if [ -d "public/fonts" ]; then
  WOFF2=$(find public/fonts -name "*.woff2" 2>/dev/null | wc -l)
  WOFF=$(find public/fonts -name "*.woff" 2>/dev/null | wc -l)
  TTF=$(find public/fonts -name "*.ttf" 2>/dev/null | wc -l)
  OTF=$(find public/fonts -name "*.otf" 2>/dev/null | wc -l)
  
  echo "   WOFF2 (best): $WOFF2"
  echo "   WOFF: $WOFF"
  echo "   TTF: $TTF"
  echo "   OTF: $OTF"
  
  if [ $WOFF2 -gt 0 ]; then
    echo "   ✅ Using optimized WOFF2 format"
  else
    echo "   ⚠️  No WOFF2 fonts - consider converting for better performance"
  fi
fi
echo ""

# 10. Check for typography scale consistency
echo "🔟 Checking typography scale..."
TEXT_SIZES=$(grep -ro "text-\(xs\|sm\|base\|lg\|xl\|2xl\|3xl\|4xl\|5xl\|6xl\|7xl\|8xl\|9xl\)" app/ components/ --include="*.tsx" | sort | uniq -c | sort -rn)
echo "   Text size usage:"
echo "$TEXT_SIZES" | head -10
echo ""

# Summary
echo "======================================"
echo "📊 Typography Audit Summary"
echo "======================================"
echo ""

ISSUES=0

if [ $FONT_IMPORTS -eq 0 ]; then
  echo "⚠️  No Next.js font imports found"
  ISSUES=$((ISSUES + 1))
fi

if [ ! -d "public/fonts" ]; then
  echo "⚠️  No font files directory"
  ISSUES=$((ISSUES + 1))
fi

if [ $INLINE_FONTS -gt 10 ]; then
  echo "⚠️  High inline font usage"
  ISSUES=$((ISSUES + 1))
fi

if [ $MISSING_FALLBACKS -gt 0 ]; then
  echo "⚠️  Missing font fallbacks"
  ISSUES=$((ISSUES + 1))
fi

if [ $FONT_DISPLAY -eq 0 ]; then
  echo "⚠️  No font loading strategy"
  ISSUES=$((ISSUES + 1))
fi

if [ $ISSUES -eq 0 ]; then
  echo "✅ No major typography issues found"
else
  echo "⚠️  Found $ISSUES typography issue(s)"
fi

echo ""
