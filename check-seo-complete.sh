#!/bin/bash
echo "🔍 COMPLETE SEO/ROUTING CHECK - Line by Line"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# 1. Count all routes
echo "1️⃣ ROUTES:"
ROUTES=$(grep -c "path:" src/router/AppRoutes.tsx 2>/dev/null || echo 0)
echo "   Total routes in AppRoutes.tsx: $ROUTES"
PAGES=$(find src/pages -name "*.jsx" -o -name "*.tsx" 2>/dev/null | wc -l)
echo "   Total page files: $PAGES"
echo ""

# 2. Check sitemaps
echo "2️⃣ SITEMAPS:"
ls -lh dist/sitemap*.xml 2>/dev/null | awk '{print "   " $9 " - " $5}' || echo "   ⚠️  No sitemaps in dist/"
ls -lh public/sitemap*.xml 2>/dev/null | awk '{print "   " $9 " - " $5}' || echo "   ⚠️  No sitemaps in public/"
echo ""

# 3. Check robots.txt
echo "3️⃣ ROBOTS.TXT:"
if [ -f "public/robots.txt" ]; then
    echo "   ✅ public/robots.txt exists"
    grep -c "Sitemap:" public/robots.txt && echo "   ✅ Has sitemap references"
else
    echo "   ❌ public/robots.txt missing"
fi
echo ""

# 4. Check meta tags
echo "4️⃣ META TAGS:"
SEO_COMPONENTS=$(grep -r "SEO\|Helmet\|DynamicSEO" src/pages --include="*.jsx" --include="*.tsx" 2>/dev/null | wc -l)
echo "   Pages with SEO components: $SEO_COMPONENTS"
echo ""

# 5. Check canonical URLs in dist
echo "5️⃣ CANONICAL URLs:"
if [ -d "dist" ]; then
    TOTAL_HTML=$(find dist -name "*.html" | wc -l)
    WITH_CANONICAL=$(grep -l "rel=\"canonical\"" dist/*.html 2>/dev/null | wc -l)
    echo "   HTML files: $TOTAL_HTML"
    echo "   With canonical: $WITH_CANONICAL"
else
    echo "   ⚠️  dist/ not found - run build first"
fi
echo ""

# 6. Check Open Graph
echo "6️⃣ OPEN GRAPH:"
OG_COUNT=$(grep -r "og:title\|og:description\|og:image" src/ --include="*.jsx" --include="*.tsx" 2>/dev/null | wc -l)
echo "   OG tag implementations: $OG_COUNT"
echo ""

# 7. Build and check
echo "7️⃣ BUILD CHECK:"
if pnpm run build > /dev/null 2>&1; then
    echo "   ✅ Build successful"
    
    # Recount after build
    if [ -d "dist" ]; then
        SITEMAP_URLS=$(grep -c "<loc>" dist/sitemap*.xml 2>/dev/null || echo 0)
        echo "   ✅ Sitemap URLs: $SITEMAP_URLS"
    fi
else
    echo "   ❌ Build failed"
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 SUMMARY:"
echo "   Routes: $ROUTES"
echo "   Pages: $PAGES"
echo "   SEO Components: $SEO_COMPONENTS"
echo "   OG Tags: $OG_COUNT"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
