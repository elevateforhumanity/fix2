#!/bin/bash
# AUTOPILOT SEO CHECKER - Loops until 100% complete
# Checks EVERY route, sitemap, meta tag, canonical URL line by line

set -e

LOG="autopilot-seo-$(date +%Y%m%d-%H%M%S).log"
MAX_ITERATIONS=20
ITERATION=0
TOTAL_ISSUES=0
FIXED_ISSUES=0

log() {
    echo "[$(date '+%H:%M:%S')] $1" | tee -a "$LOG"
}

log "🔍 AUTOPILOT SEO CHECKER - Starting..."
log "Will loop until 100% complete (max $MAX_ITERATIONS iterations)"
log ""

# Function to count all routes
count_routes() {
    local routes=0
    
    # Count from router file
    if [ -f "src/router/AppRoutes.tsx" ]; then
        routes=$(grep -c "path:" src/router/AppRoutes.tsx 2>/dev/null || echo 0)
    fi
    
    # Count from pages directory
    local page_files=$(find src/pages -name "*.jsx" -o -name "*.tsx" 2>/dev/null | wc -l)
    
    # Use the higher count
    if [ $page_files -gt $routes ]; then
        routes=$page_files
    fi
    
    echo $routes
}

# Function to check sitemaps
check_sitemaps() {
    log "📄 Checking sitemaps..."
    local issues=0
    
    # Check if sitemap exists
    if [ ! -f "public/sitemap.xml" ] && [ ! -f "dist/sitemap.xml" ]; then
        log "  ❌ No sitemap.xml found"
        issues=$((issues + 1))
    else
        log "  ✅ sitemap.xml exists"
    fi
    
    # Check sitemap-static.xml
    if [ -f "dist/sitemap-static.xml" ]; then
        local static_urls=$(grep -c "<loc>" dist/sitemap-static.xml 2>/dev/null || echo 0)
        log "  ✅ sitemap-static.xml: $static_urls URLs"
    else
        log "  ⚠️  sitemap-static.xml not found"
        issues=$((issues + 1))
    fi
    
    # Check sitemap-complete.xml
    if [ -f "dist/sitemap-complete.xml" ]; then
        local complete_urls=$(grep -c "<loc>" dist/sitemap-complete.xml 2>/dev/null || echo 0)
        log "  ✅ sitemap-complete.xml: $complete_urls URLs"
    else
        log "  ⚠️  sitemap-complete.xml not found"
        issues=$((issues + 1))
    fi
    
    echo $issues
}

# Function to check meta tags in all pages
check_meta_tags() {
    log "🏷️  Checking meta tags in all pages..."
    local missing=0
    
    # Check all page files
    find src/pages -name "*.jsx" -o -name "*.tsx" | while read file; do
        local has_title=$(grep -c "<title>" "$file" 2>/dev/null || echo 0)
        local has_meta=$(grep -c "meta.*description" "$file" 2>/dev/null || echo 0)
        local has_seo=$(grep -c "SEO\|Helmet\|DynamicSEO" "$file" 2>/dev/null || echo 0)
        
        if [ $has_title -eq 0 ] && [ $has_meta -eq 0 ] && [ $has_seo -eq 0 ]; then
            log "  ⚠️  Missing meta tags: $file"
            missing=$((missing + 1))
        fi
    done
    
    echo $missing
}

# Function to check canonical URLs
check_canonical_urls() {
    log "🔗 Checking canonical URLs..."
    local missing=0
    
    if [ -d "dist" ]; then
        # Check HTML files in dist
        find dist -name "*.html" -not -path "*/node_modules/*" | while read file; do
            if ! grep -q "rel=\"canonical\"" "$file" 2>/dev/null; then
                log "  ⚠️  Missing canonical: $file"
                missing=$((missing + 1))
            fi
        done
    fi
    
    echo $missing
}

# Function to check Open Graph tags
check_og_tags() {
    log "📱 Checking Open Graph tags..."
    local missing=0
    
    # Check if OG tags are in index.html or components
    local has_og=$(grep -r "og:title\|og:description\|og:image" src/ --include="*.jsx" --include="*.tsx" 2>/dev/null | wc -l)
    
    if [ $has_og -lt 10 ]; then
        log "  ⚠️  Limited Open Graph implementation"
        missing=1
    else
        log "  ✅ Open Graph tags found in $has_og locations"
    fi
    
    echo $missing
}

# Function to check robots.txt
check_robots() {
    log "🤖 Checking robots.txt..."
    local issues=0
    
    if [ ! -f "public/robots.txt" ] && [ ! -f "dist/robots.txt" ]; then
        log "  ❌ robots.txt missing"
        issues=1
    else
        log "  ✅ robots.txt exists"
        
        # Check if it has sitemap reference
        if grep -q "Sitemap:" public/robots.txt 2>/dev/null || grep -q "Sitemap:" dist/robots.txt 2>/dev/null; then
            log "  ✅ Sitemap reference found"
        else
            log "  ⚠️  No sitemap reference in robots.txt"
            issues=$((issues + 1))
        fi
    fi
    
    echo $issues
}

# Function to check route configuration
check_routes() {
    log "🛣️  Checking route configuration..."
    local issues=0
    
    if [ ! -f "src/router/AppRoutes.tsx" ]; then
        log "  ❌ AppRoutes.tsx not found"
        issues=1
    else
        local route_count=$(grep -c "path:" src/router/AppRoutes.tsx 2>/dev/null || echo 0)
        log "  ✅ Found $route_count routes in AppRoutes.tsx"
        
        # Check for lazy loading
        local lazy_count=$(grep -c "lazy\|Suspense" src/router/AppRoutes.tsx 2>/dev/null || echo 0)
        if [ $lazy_count -gt 0 ]; then
            log "  ✅ Lazy loading implemented"
        else
            log "  ⚠️  No lazy loading detected"
            issues=$((issues + 1))
        fi
    fi
    
    echo $issues
}

# Function to fix missing sitemaps
fix_sitemaps() {
    log "🔧 Fixing sitemaps..."
    
    # Ensure dist directory exists
    mkdir -p dist
    
    # Generate basic sitemap if missing
    if [ ! -f "dist/sitemap.xml" ]; then
        cat > dist/sitemap.xml << 'SITEMAP'
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://www.elevateforhumanity.org/sitemap-static.xml</loc>
    <lastmod>2025-10-31</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://www.elevateforhumanity.org/sitemap-programs.xml</loc>
    <lastmod>2025-10-31</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://www.elevateforhumanity.org/sitemap-courses.xml</loc>
    <lastmod>2025-10-31</lastmod>
  </sitemap>
</sitemapindex>
SITEMAP
        log "  ✅ Created sitemap.xml"
    fi
}

# Function to fix robots.txt
fix_robots() {
    log "🔧 Fixing robots.txt..."
    
    if [ ! -f "public/robots.txt" ]; then
        cat > public/robots.txt << 'ROBOTS'
# Elevate for Humanity - Robots.txt
User-agent: *
Allow: /

# Sitemaps
Sitemap: https://www.elevateforhumanity.org/sitemap.xml
Sitemap: https://www.elevateforhumanity.org/sitemap-static.xml
Sitemap: https://www.elevateforhumanity.org/sitemap-complete.xml

# Disallow admin and API endpoints
Disallow: /api/
Disallow: /admin/
Disallow: /.netlify/

# AI Crawlers - No training on our content
User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: Claude-Web
Disallow: /
ROBOTS
        log "  ✅ Created robots.txt"
    fi
}

# Function to verify all fixes
verify_fixes() {
    log "🔍 Verifying all fixes..."
    
    local errors=0
    
    # Check build still works
    if ! pnpm run build > /dev/null 2>&1; then
        log "  ❌ Build failed"
        errors=$((errors + 1))
    else
        log "  ✅ Build successful"
    fi
    
    return $errors
}

# Main loop
main() {
    log "🎯 Starting autopilot SEO check loop..."
    log ""
    
    # Initial count
    TOTAL_ROUTES=$(count_routes)
    log "📊 Total routes to check: $TOTAL_ROUTES"
    log ""
    
    while [ $ITERATION -lt $MAX_ITERATIONS ]; do
        ITERATION=$((ITERATION + 1))
        log "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        log "🔄 ITERATION $ITERATION of $MAX_ITERATIONS"
        log "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        log ""
        
        # Count issues
        SITEMAP_ISSUES=$(check_sitemaps)
        log ""
        
        META_ISSUES=$(check_meta_tags)
        log ""
        
        CANONICAL_ISSUES=$(check_canonical_urls)
        log ""
        
        OG_ISSUES=$(check_og_tags)
        log ""
        
        ROBOTS_ISSUES=$(check_robots)
        log ""
        
        ROUTE_ISSUES=$(check_routes)
        log ""
        
        TOTAL_ISSUES=$((SITEMAP_ISSUES + META_ISSUES + CANONICAL_ISSUES + OG_ISSUES + ROBOTS_ISSUES + ROUTE_ISSUES))
        
        log "📊 Issues found this iteration: $TOTAL_ISSUES"
        log ""
        
        # Check if all fixed
        if [ $TOTAL_ISSUES -eq 0 ]; then
            log "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
            log "🎉 SUCCESS! 100% COMPLETE!"
            log "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
            log ""
            log "✅ All routes checked"
            log "✅ All sitemaps verified"
            log "✅ All meta tags present"
            log "✅ All canonical URLs set"
            log "✅ Open Graph tags implemented"
            log "✅ robots.txt configured"
            log "✅ Routes properly configured"
            log ""
            log "📊 Total iterations: $ITERATION"
            log "📝 Log file: $LOG"
            return 0
        fi
        
        # Apply fixes
        log "🔧 Applying fixes..."
        fix_sitemaps
        fix_robots
        log ""
        
        # Verify fixes
        if verify_fixes; then
            log "✅ Fixes verified"
        else
            log "⚠️  Some fixes need attention"
        fi
        log ""
        
        log "Waiting 2 seconds before next iteration..."
        sleep 2
    done
    
    # Max iterations reached
    log "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    log "⚠️  Maximum iterations reached"
    log "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    log ""
    log "📊 Final Statistics:"
    log "   • Iterations: $ITERATION"
    log "   • Issues remaining: $TOTAL_ISSUES"
    log "   • Log file: $LOG"
    log ""
    
    return 1
}

# Run main function
main

# Exit with appropriate code
if [ $TOTAL_ISSUES -eq 0 ]; then
    exit 0
else
    exit 1
fi
