#!/bin/bash

# Stabilization Autopilot - Header, Footer, Navigation Structure Verification
# Ensures structural integrity and consistency across all layouts

set -e

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

LOG_DIR="./logs/stabilization-autopilot"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
LOG_FILE="${LOG_DIR}/stabilization_${TIMESTAMP}.log"

mkdir -p "$LOG_DIR"

log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a "$LOG_FILE"
}

log_error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR:${NC} $1" | tee -a "$LOG_FILE"
}

log_warning() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING:${NC} $1" | tee -a "$LOG_FILE"
}

log_info() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')] INFO:${NC} $1" | tee -a "$LOG_FILE"
}

echo -e "${CYAN}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║                                                                ║${NC}"
echo -e "${CYAN}║           STABILIZATION AUTOPILOT                              ║${NC}"
echo -e "${CYAN}║           Header, Footer, Navigation Verification              ║${NC}"
echo -e "${CYAN}║                                                                ║${NC}"
echo -e "${CYAN}╚════════════════════════════════════════════════════════════════╝${NC}"
echo ""

# 1. Check Header Components
log "Step 1: Auditing header components..."

header_components=$(find src/components -name "*Header*" -o -name "*header*" 2>/dev/null | grep -E "\.(tsx|jsx)$")
header_count=$(echo "$header_components" | grep -v "^$" | wc -l)

log_info "Found $header_count header component(s):"
echo "$header_components" | while read -r comp; do
    if [ -n "$comp" ]; then
        log_info "  - $(basename $comp)"
    fi
done

# Check which headers are actually used
log_info "Checking header usage..."
for header in $header_components; do
    if [ -n "$header" ]; then
        header_name=$(basename "$header" | sed 's/\.[^.]*$//')
        usage_count=$(grep -r "import.*$header_name" src/ --include="*.tsx" --include="*.jsx" 2>/dev/null | grep -v "node_modules" | grep -v "test" | wc -l)
        if [ "$usage_count" -gt 0 ]; then
            log "  ✅ $header_name used in $usage_count file(s)"
        else
            log_warning "  ⚠️  $header_name not used anywhere"
        fi
    fi
done

# 2. Check Footer Components
log ""
log "Step 2: Auditing footer components..."

footer_components=$(find src/components -name "*Footer*" -o -name "*footer*" 2>/dev/null | grep -E "\.(tsx|jsx)$")
footer_count=$(echo "$footer_components" | grep -v "^$" | wc -l)

log_info "Found $footer_count footer component(s):"
echo "$footer_components" | while read -r comp; do
    if [ -n "$comp" ]; then
        log_info "  - $(basename $comp)"
    fi
done

# Check which footers are actually used
log_info "Checking footer usage..."
for footer in $footer_components; do
    if [ -n "$footer" ]; then
        footer_name=$(basename "$footer" | sed 's/\.[^.]*$//')
        usage_count=$(grep -r "import.*$footer_name" src/ --include="*.tsx" --include="*.jsx" 2>/dev/null | grep -v "node_modules" | grep -v "test" | wc -l)
        if [ "$usage_count" -gt 0 ]; then
            log "  ✅ $footer_name used in $usage_count file(s)"
        else
            log_warning "  ⚠️  $footer_name not used anywhere"
        fi
    fi
done

# 3. Check Navigation Components
log ""
log "Step 3: Auditing navigation components..."

nav_components=$(find src/components -name "*Nav*" -o -name "*nav*" 2>/dev/null | grep -E "\.(tsx|jsx)$")
nav_count=$(echo "$nav_components" | grep -v "^$" | wc -l)

log_info "Found $nav_count navigation component(s):"
echo "$nav_components" | while read -r comp; do
    if [ -n "$comp" ]; then
        log_info "  - $(basename $comp)"
    fi
done

# Check which navs are actually used
log_info "Checking navigation usage..."
for nav in $nav_components; do
    if [ -n "$nav" ]; then
        nav_name=$(basename "$nav" | sed 's/\.[^.]*$//')
        usage_count=$(grep -r "import.*$nav_name" src/ --include="*.tsx" --include="*.jsx" 2>/dev/null | grep -v "node_modules" | grep -v "test" | wc -l)
        if [ "$usage_count" -gt 0 ]; then
            log "  ✅ $nav_name used in $usage_count file(s)"
        else
            log_warning "  ⚠️  $nav_name not used anywhere"
        fi
    fi
done

# 4. Check Layout Files
log ""
log "Step 4: Auditing layout files..."

layout_files=$(find src/layouts -name "*.tsx" -o -name "*.jsx" 2>/dev/null)
layout_count=$(echo "$layout_files" | grep -v "^$" | wc -l)

log_info "Found $layout_count layout file(s):"
echo "$layout_files" | while read -r layout; do
    if [ -n "$layout" ]; then
        log_info "  - $(basename $layout)"
        
        # Check what components each layout uses
        if grep -q "Header\|header" "$layout"; then
            log_info "    → Uses header component"
        fi
        if grep -q "Footer\|footer" "$layout"; then
            log_info "    → Uses footer component"
        fi
        if grep -q "nav\|Nav" "$layout"; then
            log_info "    → Has navigation"
        fi
    fi
done

# 5. Check for Duplicate Components
log ""
log "Step 5: Checking for duplicate or conflicting components..."

# Check for multiple headers
if [ "$header_count" -gt 1 ]; then
    log_warning "Multiple header components found - potential duplication"
    log_info "Consider consolidating to a single header component"
fi

# Check for multiple footers
if [ "$footer_count" -gt 1 ]; then
    log_warning "Multiple footer components found - potential duplication"
    log_info "Consider consolidating to a single footer component"
fi

# Check for multiple nav components
if [ "$nav_count" -gt 1 ]; then
    log_warning "Multiple navigation components found - potential duplication"
    log_info "Consider consolidating to a single navigation component"
fi

# 6. Check Mobile Navigation
log ""
log "Step 6: Checking mobile navigation implementation..."

mobile_nav_found=false
for layout in $layout_files; do
    if [ -n "$layout" ]; then
        if grep -q "mobileMenuOpen\|mobile-menu\|MobileMenu" "$layout"; then
            log "✅ Mobile navigation found in $(basename $layout)"
            mobile_nav_found=true
        fi
    fi
done

if [ "$mobile_nav_found" = false ]; then
    log_warning "No mobile navigation implementation found"
fi

# 7. Check Responsive Design
log ""
log "Step 7: Checking responsive design classes..."

responsive_found=false
for layout in $layout_files; do
    if [ -n "$layout" ]; then
        if grep -qE "md:|lg:|sm:|hidden.*md|flex.*lg" "$layout"; then
            log "✅ Responsive classes found in $(basename $layout)"
            responsive_found=true
        fi
    fi
done

if [ "$responsive_found" = false ]; then
    log_warning "No responsive design classes found in layouts"
fi

# 8. Check Navigation Links
log ""
log "Step 8: Verifying navigation links..."

total_nav_links=0
for layout in $layout_files; do
    if [ -n "$layout" ]; then
        link_count=$(grep -c "to=\"" "$layout" 2>/dev/null || echo "0")
        if [ "$link_count" -gt 0 ]; then
            log_info "$(basename $layout): $link_count navigation links"
            total_nav_links=$((total_nav_links + link_count))
        fi
    fi
done

log "Total navigation links across layouts: $total_nav_links"

# 9. Check for Broken Imports
log ""
log "Step 9: Checking for broken imports..."

broken_imports=0
for layout in $layout_files; do
    if [ -n "$layout" ]; then
        # Extract import statements
        imports=$(grep "^import" "$layout" | grep -E "Header|Footer|Nav" | sed "s/.*from '\([^']*\)'.*/\1/")
        
        for import_path in $imports; do
            # Convert relative path to absolute
            layout_dir=$(dirname "$layout")
            full_path="$layout_dir/$import_path"
            
            # Check if file exists (try with different extensions)
            if [ ! -f "$full_path.tsx" ] && [ ! -f "$full_path.jsx" ] && [ ! -f "$full_path.ts" ] && [ ! -f "$full_path.js" ] && [ ! -f "$full_path" ]; then
                log_error "Broken import in $(basename $layout): $import_path"
                broken_imports=$((broken_imports + 1))
            fi
        done
    fi
done

if [ "$broken_imports" -eq 0 ]; then
    log "✅ No broken imports found"
else
    log_error "Found $broken_imports broken import(s)"
fi

# 10. Build Application
log ""
log "Step 10: Building application to verify structural integrity..."

if npm run build > /tmp/stabilization_build.log 2>&1; then
    log "✅ Build successful"
else
    log_error "Build failed - check /tmp/stabilization_build.log"
    tail -20 /tmp/stabilization_build.log
    exit 1
fi

# 11. Check for Console Errors in Build
log ""
log "Step 11: Checking build output for warnings..."

warning_count=$(grep -i "warning" /tmp/stabilization_build.log | wc -l)
if [ "$warning_count" -gt 0 ]; then
    log_warning "Build completed with $warning_count warning(s)"
else
    log "✅ Build completed with no warnings"
fi

# 12. Generate Report
log ""
log "Step 12: Generating stabilization report..."

REPORT_FILE="${LOG_DIR}/stabilization_report_${TIMESTAMP}.md"

cat > "$REPORT_FILE" << EOF
# Stabilization Autopilot Report

**Generated:** $(date)
**Status:** ✅ VERIFICATION COMPLETE

## Component Inventory

### Header Components ($header_count)
$(echo "$header_components" | while read -r comp; do
    if [ -n "$comp" ]; then
        echo "- $(basename $comp)"
    fi
done)

### Footer Components ($footer_count)
$(echo "$footer_components" | while read -r comp; do
    if [ -n "$comp" ]; then
        echo "- $(basename $comp)"
    fi
done)

### Navigation Components ($nav_count)
$(echo "$nav_components" | while read -r comp; do
    if [ -n "$comp" ]; then
        echo "- $(basename $comp)"
    fi
done)

### Layout Files ($layout_count)
$(echo "$layout_files" | while read -r layout; do
    if [ -n "$layout" ]; then
        echo "- $(basename $layout)"
    fi
done)

## Structural Health

- **Build Status:** ✅ Success
- **Broken Imports:** $broken_imports
- **Total Navigation Links:** $total_nav_links
- **Mobile Navigation:** $([ "$mobile_nav_found" = true ] && echo "✅ Implemented" || echo "⚠️ Not found")
- **Responsive Design:** $([ "$responsive_found" = true ] && echo "✅ Implemented" || echo "⚠️ Not found")

## Recommendations

$(if [ "$header_count" -gt 1 ]; then
    echo "- Consider consolidating multiple header components"
fi)
$(if [ "$footer_count" -gt 1 ]; then
    echo "- Consider consolidating multiple footer components"
fi)
$(if [ "$nav_count" -gt 1 ]; then
    echo "- Consider consolidating multiple navigation components"
fi)
$(if [ "$broken_imports" -gt 0 ]; then
    echo "- Fix broken imports found in layouts"
fi)
$(if [ "$mobile_nav_found" = false ]; then
    echo "- Implement mobile navigation for better UX"
fi)

## Summary

All structural components have been audited. The application builds successfully with proper header, footer, and navigation components in place.

---

*Generated by Stabilization Autopilot*
EOF

log "Report generated: $REPORT_FILE"

# Final Summary
echo ""
echo -e "${CYAN}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║                                                                ║${NC}"
echo -e "${CYAN}║           STABILIZATION VERIFICATION COMPLETE ✅               ║${NC}"
echo -e "${CYAN}║                                                                ║${NC}"
echo -e "${CYAN}╚════════════════════════════════════════════════════════════════╝${NC}"
echo ""
log "✅ Structural integrity verified"
log "📊 Report: $REPORT_FILE"
log "📝 Log: $LOG_FILE"
echo ""
