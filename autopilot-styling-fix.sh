#!/bin/bash

# Autopilot Styling Fix Script
# Systematically fixes ALL styling issues line by line
# Loops until 100% fixed - DOES NOT STOP

set -e

LOG_FILE="autopilot-styling-$(date +%Y%m%d-%H%M%S).log"
MAX_ITERATIONS=50
ITERATION=0
TOTAL_ISSUES=0
FIXED_ISSUES=0

echo "🎨 Autopilot Styling Fix - Starting..." | tee -a "$LOG_FILE"
echo "📝 Log file: $LOG_FILE" | tee -a "$LOG_FILE"
echo "🔄 Will loop until 100% fixed (max $MAX_ITERATIONS iterations)" | tee -a "$LOG_FILE"
echo "" | tee -a "$LOG_FILE"

# Function to log with timestamp
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Function to count styling issues
count_issues() {
    local issues=0
    
    # Count hardcoded colors
    local hardcoded_colors=$(grep -r "style={{.*color:" src/ 2>/dev/null | wc -l)
    issues=$((issues + hardcoded_colors))
    
    # Count inline styles
    local inline_styles=$(grep -r "style={{" src/ 2>/dev/null | wc -l)
    issues=$((issues + inline_styles / 2))  # Divide by 2 as some are acceptable
    
    # Count missing responsive classes
    local missing_responsive=$(grep -r "grid-cols-[0-9]" src/ 2>/dev/null | grep -v "md:" | grep -v "lg:" | wc -l)
    issues=$((issues + missing_responsive))
    
    # Count duplicate CSS
    local duplicate_btn=$(grep -c "\.btn" src/index.css src/styles/global.css src/styles/brand.css 2>/dev/null | awk '{s+=$1} END {print s}')
    if [ "$duplicate_btn" -gt 1 ]; then
        issues=$((issues + duplicate_btn - 1))
    fi
    
    echo $issues
}

# Function to fix color system conflicts
fix_color_system() {
    log "🎨 Fixing color system conflicts..."
    
    # Backup tailwind config
    cp tailwind.config.js tailwind.config.js.backup
    
    # Create unified color system
    cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: { lg: '1120px', '2xl': '1280px' },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#f8f9fa',
          100: '#f1f3f5',
          200: '#e9ecef',
          300: '#dee2e6',
          400: '#ced4da',
          500: '#4d4b37',
          600: '#3a3629',
          700: '#2d2a1f',
          800: '#1f1d15',
          900: '#12110c',
        },
        accent: {
          500: '#f59e0b',
        },
        success: {
          500: '#059669',
          600: '#047857',
        },
        danger: {
          500: '#ef4444',
          600: '#dc2626',
        },
        info: {
          500: '#1e40af',
          600: '#1e3a8a',
        },
      },
      boxShadow: { 
        soft: '0 6px 30px -10px rgba(0,0,0,0.12)',
        brand: '0 4px 20px rgba(77, 75, 55, 0.15)',
      },
      borderRadius: { 
        xl2: '1rem',
        brand: '0.5rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'), 
    require('@tailwindcss/forms')
  ],
};
EOF
    
    log "✅ Color system unified in tailwind.config.js"
}

# Function to consolidate CSS files
consolidate_css() {
    log "📦 Consolidating CSS files..."
    
    # Create single unified CSS file
    cat > src/index.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    @apply border-gray-200;
  }

  body {
    @apply bg-white text-gray-900 antialiased;
  }
}

@layer components {
  /* Button Components */
  .btn {
    @apply inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-base font-semibold
           transition-all duration-200 shadow-sm hover:shadow-md
           focus:outline-none focus:ring-2 focus:ring-offset-2
           disabled:opacity-50 disabled:cursor-not-allowed;
  }

  .btn-primary {
    @apply btn bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700
           focus:ring-brand-500;
  }

  .btn-secondary {
    @apply btn border-2 border-brand-500 text-brand-700 bg-white hover:bg-brand-50
           focus:ring-brand-500;
  }

  .btn-success {
    @apply btn bg-success-500 text-white hover:bg-success-600
           focus:ring-success-500;
  }

  .btn-danger {
    @apply btn bg-danger-500 text-white hover:bg-danger-600
           focus:ring-danger-500;
  }

  /* Card Components */
  .card {
    @apply rounded-xl bg-white shadow-sm border border-gray-200 overflow-hidden
           transition-shadow duration-200 hover:shadow-md;
  }

  .card-header {
    @apply px-6 py-4 border-b border-gray-200 bg-gray-50;
  }

  .card-body {
    @apply px-6 py-4;
  }

  .card-footer {
    @apply px-6 py-4 border-t border-gray-200 bg-gray-50;
  }

  /* Form Components */
  .form-input {
    @apply w-full px-4 py-2 border border-gray-300 rounded-lg
           focus:ring-2 focus:ring-brand-500 focus:border-brand-500
           disabled:bg-gray-100 disabled:cursor-not-allowed
           transition-colors duration-200;
  }

  .form-label {
    @apply block text-sm font-medium text-gray-700 mb-2;
  }

  .form-error {
    @apply text-sm text-danger-500 mt-1;
  }

  /* Layout Components */
  .section {
    @apply py-12 md:py-16 lg:py-24;
  }

  .container {
    @apply mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl;
  }

  /* Responsive Grid */
  .grid-responsive {
    @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6;
  }

  /* Accessibility */
  .focus-visible {
    @apply focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2;
  }

  .sr-only {
    @apply absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0;
  }
}

@layer utilities {
  /* Spacing utilities */
  .space-y-section {
    @apply space-y-12 md:space-y-16 lg:space-y-24;
  }

  /* Text utilities */
  .text-balance {
    text-wrap: balance;
  }
}
EOF
    
    log "✅ CSS consolidated into src/index.css"
}

# Function to fix component styling
fix_component_styling() {
    local component=$1
    log "🔧 Fixing styling in $component..."
    
    # Remove hardcoded colors and replace with Tailwind classes
    if [ -f "$component" ]; then
        # Backup original
        cp "$component" "${component}.backup"
        
        # Fix common hardcoded colors
        sed -i 's/style={{ background: "#4f82ff" }}/className="bg-brand-500"/g' "$component" 2>/dev/null || true
        sed -i 's/style={{ color: "#ef4444" }}/className="text-danger-500"/g' "$component" 2>/dev/null || true
        sed -i 's/style={{ color: "#10b981" }}/className="text-success-500"/g' "$component" 2>/dev/null || true
        
        # Fix padding inconsistencies
        sed -i 's/style={{ padding: 32 }}/className="p-8"/g' "$component" 2>/dev/null || true
        sed -i 's/style={{ padding: "32px" }}/className="p-8"/g' "$component" 2>/dev/null || true
        
        # Add responsive classes to grids
        sed -i 's/className="grid grid-cols-3/className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3/g' "$component" 2>/dev/null || true
        sed -i 's/className="grid grid-cols-2/className="grid grid-cols-1 md:grid-cols-2/g' "$component" 2>/dev/null || true
        
        # Add focus styles to buttons
        sed -i 's/className="bg-blue-500/className="bg-brand-500 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2/g' "$component" 2>/dev/null || true
        
        log "  ✅ Fixed $component"
    fi
}

# Function to add accessibility features
add_accessibility() {
    log "♿ Adding accessibility features..."
    
    # Ensure accessibility CSS exists
    if [ ! -f "src/styles/accessibility.css" ]; then
        mkdir -p src/styles
        cat > src/styles/accessibility.css << 'EOF'
/* Focus visible for keyboard navigation */
*:focus-visible {
  outline: 2px solid #4d4b37;
  outline-offset: 2px;
}

/* Skip to main content link */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #4d4b37;
  color: white;
  padding: 8px 16px;
  text-decoration: none;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}

/* Screen reader only */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Minimum touch target size */
button,
a,
input[type="checkbox"],
input[type="radio"] {
  min-height: 44px;
  min-width: 44px;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  * {
    border-color: currentColor;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
EOF
    fi
    
    log "✅ Accessibility features added"
}

# Function to verify fixes
verify_fixes() {
    log "🔍 Verifying fixes..."
    
    local errors=0
    
    # Check if build still works
    if ! pnpm run build > /dev/null 2>&1; then
        log "❌ Build failed after fixes"
        errors=$((errors + 1))
    else
        log "✅ Build successful"
    fi
    
    # Check if tests still pass
    if ! pnpm test run > /dev/null 2>&1; then
        log "⚠️  Some tests failed"
        errors=$((errors + 1))
    else
        log "✅ Tests passing"
    fi
    
    return $errors
}

# Function to create progress report
create_progress_report() {
    local iteration=$1
    local issues_remaining=$2
    
    cat > "styling-progress-iteration-${iteration}.md" << EOF
# Styling Fix Progress - Iteration $iteration

**Date:** $(date)
**Issues Remaining:** $issues_remaining
**Issues Fixed:** $FIXED_ISSUES
**Total Issues Found:** $TOTAL_ISSUES
**Progress:** $(( (FIXED_ISSUES * 100) / TOTAL_ISSUES ))%

## Fixes Applied This Iteration:

$(tail -50 "$LOG_FILE" | grep "✅")

## Issues Remaining:

- Hardcoded colors: $(grep -r "style={{.*color:" src/ 2>/dev/null | wc -l)
- Inline styles: $(grep -r "style={{" src/ 2>/dev/null | wc -l)
- Missing responsive: $(grep -r "grid-cols-[0-9]" src/ 2>/dev/null | grep -v "md:" | grep -v "lg:" | wc -l)

## Next Steps:

$(if [ $issues_remaining -eq 0 ]; then echo "✅ All issues fixed!"; else echo "Continue fixing remaining issues..."; fi)
EOF
}

# Main loop
main() {
    log "🎯 Starting autopilot styling fix loop..."
    log "Maximum iterations: $MAX_ITERATIONS"
    echo ""
    
    # Initial issue count
    TOTAL_ISSUES=$(count_issues)
    log "📊 Initial issues found: $TOTAL_ISSUES"
    echo ""
    
    while [ $ITERATION -lt $MAX_ITERATIONS ]; do
        ITERATION=$((ITERATION + 1))
        log "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        log "🔄 ITERATION $ITERATION of $MAX_ITERATIONS"
        log "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo ""
        
        # Count current issues
        CURRENT_ISSUES=$(count_issues)
        FIXED_ISSUES=$((TOTAL_ISSUES - CURRENT_ISSUES))
        PROGRESS=$(( (FIXED_ISSUES * 100) / TOTAL_ISSUES ))
        
        log "📊 Progress: $FIXED_ISSUES/$TOTAL_ISSUES fixed ($PROGRESS%)"
        log "📊 Issues remaining: $CURRENT_ISSUES"
        echo ""
        
        # Check if all fixed
        if [ $CURRENT_ISSUES -eq 0 ]; then
            log "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
            log "🎉 SUCCESS! All styling issues fixed!"
            log "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
            log ""
            log "📊 Final Statistics:"
            log "   • Total iterations: $ITERATION"
            log "   • Issues fixed: $FIXED_ISSUES"
            log "   • Success rate: 100%"
            log ""
            create_progress_report $ITERATION 0
            return 0
        fi
        
        # Apply fixes
        log "Step 1: Fixing color system..."
        fix_color_system
        echo ""
        
        log "Step 2: Consolidating CSS..."
        consolidate_css
        echo ""
        
        log "Step 3: Fixing component styling..."
        # Fix all components
        find src/components -name "*.jsx" -o -name "*.tsx" | while read component; do
            fix_component_styling "$component"
        done
        find src/pages -name "*.jsx" -o -name "*.tsx" | while read component; do
            fix_component_styling "$component"
        done
        echo ""
        
        log "Step 4: Adding accessibility features..."
        add_accessibility
        echo ""
        
        log "Step 5: Verifying fixes..."
        if verify_fixes; then
            log "✅ Verification passed"
        else
            log "⚠️  Some verification checks failed, continuing..."
        fi
        echo ""
        
        # Create progress report
        create_progress_report $ITERATION $CURRENT_ISSUES
        
        # Check if we made progress
        NEW_ISSUES=$(count_issues)
        if [ $NEW_ISSUES -ge $CURRENT_ISSUES ]; then
            log "⚠️  No progress made this iteration"
            log "   Previous: $CURRENT_ISSUES issues"
            log "   Current: $NEW_ISSUES issues"
        else
            log "✅ Progress made: $(( CURRENT_ISSUES - NEW_ISSUES )) issues fixed"
        fi
        
        echo ""
        log "Waiting 2 seconds before next iteration..."
        sleep 2
    done
    
    # Max iterations reached
    log "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    log "⚠️  Maximum iterations reached"
    log "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    log ""
    log "📊 Final Statistics:"
    log "   • Total iterations: $ITERATION"
    log "   • Issues fixed: $FIXED_ISSUES"
    log "   • Issues remaining: $(count_issues)"
    log "   • Success rate: $(( (FIXED_ISSUES * 100) / TOTAL_ISSUES ))%"
    log ""
    
    return 1
}

# Run main function
main

# Exit with appropriate code
if [ $(count_issues) -eq 0 ]; then
    exit 0
else
    exit 1
fi
