#!/bin/bash
# Apply Elevate for Humanity Branding System
# Run this script to apply consistent EFH branding across the platform

set -e

echo "🎨 Applying Elevate for Humanity Branding..."

# Create branding directory if it doesn't exist
mkdir -p branding

# Create brand.css with EFH design system
cat > branding/brand.css << 'EOF'
/* Elevate for Humanity Brand System */
/* Innovate. Elevate. Reset. */

:root {
  /* Primary Brand Colors */
  --efh-red: #E63946;
  --efh-orange: #F77F00;
  --efh-teal: #06A77D;
  --efh-purple: #7209B7;
  --efh-blue: #3A86FF;
  
  /* Neutral Palette */
  --efh-gray-50: #F8F9FA;
  --efh-gray-100: #E9ECEF;
  --efh-gray-200: #DEE2E6;
  --efh-gray-300: #CED4DA;
  --efh-gray-600: #6C757D;
  --efh-gray-700: #495057;
  --efh-gray-900: #212529;
  
  /* Semantic Colors */
  --efh-success: #06A77D;
  --efh-warning: #F77F00;
  --efh-error: #E63946;
  --efh-info: #3A86FF;
  
  /* Typography */
  --efh-font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --efh-font-display: 'Inter', sans-serif;
  
  /* Spacing Scale */
  --efh-space-xs: 0.25rem;
  --efh-space-sm: 0.5rem;
  --efh-space-md: 1rem;
  --efh-space-lg: 1.5rem;
  --efh-space-xl: 2rem;
  --efh-space-2xl: 3rem;
  --efh-space-3xl: 4rem;
  
  /* Border Radius */
  --efh-radius-sm: 0.375rem;
  --efh-radius-md: 0.5rem;
  --efh-radius-lg: 0.75rem;
  --efh-radius-xl: 1rem;
  --efh-radius-full: 9999px;
  
  /* Shadows */
  --efh-shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --efh-shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --efh-shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  --efh-shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
}

/* Container */
.elevate-container {
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--efh-space-lg);
  padding-right: var(--efh-space-lg);
}

/* Navigation */
.elevate-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--efh-space-lg) var(--efh-space-xl);
  background: white;
  border-bottom: 1px solid var(--efh-gray-200);
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(8px);
  background-color: rgba(255, 255, 255, 0.95);
}

.elevate-logo {
  display: flex;
  align-items: center;
  gap: var(--efh-space-md);
  font-weight: 700;
  color: var(--efh-gray-900);
}

.elevate-logo-mark {
  width: 2.5rem;
  height: 2.5rem;
  background: linear-gradient(135deg, var(--efh-red), var(--efh-orange));
  color: white;
  border-radius: var(--efh-radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: 800;
}

/* Buttons */
.elevate-btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, var(--efh-red), var(--efh-orange));
  color: white;
  font-weight: 600;
  border-radius: var(--efh-radius-md);
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: var(--efh-shadow-md);
}

.elevate-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--efh-shadow-lg);
}

.elevate-btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background: white;
  color: var(--efh-gray-700);
  font-weight: 600;
  border-radius: var(--efh-radius-md);
  border: 2px solid var(--efh-gray-300);
  cursor: pointer;
  transition: all 0.2s ease;
}

.elevate-btn-secondary:hover {
  border-color: var(--efh-red);
  color: var(--efh-red);
}

/* Cards */
.elevate-card {
  background: white;
  border-radius: var(--efh-radius-xl);
  padding: var(--efh-space-xl);
  box-shadow: var(--efh-shadow-md);
  transition: all 0.3s ease;
}

.elevate-card:hover {
  box-shadow: var(--efh-shadow-xl);
  transform: translateY(-4px);
}

.elevate-card-red {
  border-left: 4px solid var(--efh-red);
}

.elevate-card-orange {
  border-left: 4px solid var(--efh-orange);
}

.elevate-card-teal {
  border-left: 4px solid var(--efh-teal);
}

.elevate-card-purple {
  border-left: 4px solid var(--efh-purple);
}

.elevate-card-blue {
  border-left: 4px solid var(--efh-blue);
}

/* Badges */
.elevate-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: var(--efh-radius-full);
  font-size: 0.875rem;
  font-weight: 600;
}

.elevate-badge-red {
  background: rgba(230, 57, 70, 0.1);
  color: var(--efh-red);
}

.elevate-badge-orange {
  background: rgba(247, 127, 0, 0.1);
  color: var(--efh-orange);
}

.elevate-badge-teal {
  background: rgba(6, 167, 125, 0.1);
  color: var(--efh-teal);
}

.elevate-badge-purple {
  background: rgba(114, 9, 183, 0.1);
  color: var(--efh-purple);
}

.elevate-badge-blue {
  background: rgba(58, 134, 255, 0.1);
  color: var(--efh-blue);
}

/* Gradients */
.elevate-gradient-red-orange {
  background: linear-gradient(135deg, var(--efh-red), var(--efh-orange));
}

.elevate-gradient-blue-purple {
  background: linear-gradient(135deg, var(--efh-blue), var(--efh-purple));
}

.elevate-gradient-teal-blue {
  background: linear-gradient(135deg, var(--efh-teal), var(--efh-blue));
}

/* Typography */
.elevate-heading-1 {
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.2;
  color: var(--efh-gray-900);
  font-family: var(--efh-font-display);
}

.elevate-heading-2 {
  font-size: 2.25rem;
  font-weight: 700;
  line-height: 1.3;
  color: var(--efh-gray-900);
  font-family: var(--efh-font-display);
}

.elevate-heading-3 {
  font-size: 1.875rem;
  font-weight: 700;
  line-height: 1.4;
  color: var(--efh-gray-900);
  font-family: var(--efh-font-display);
}

.elevate-tagline {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--efh-orange);
  font-style: italic;
}

/* Utility Classes */
.elevate-text-red { color: var(--efh-red); }
.elevate-text-orange { color: var(--efh-orange); }
.elevate-text-teal { color: var(--efh-teal); }
.elevate-text-purple { color: var(--efh-purple); }
.elevate-text-blue { color: var(--efh-blue); }

.elevate-bg-red { background-color: var(--efh-red); }
.elevate-bg-orange { background-color: var(--efh-orange); }
.elevate-bg-teal { background-color: var(--efh-teal); }
.elevate-bg-purple { background-color: var(--efh-purple); }
.elevate-bg-blue { background-color: var(--efh-blue); }
EOF

echo "✅ Created branding/brand.css"

# Update tailwind.config.js to include EFH colors
echo "📝 Updating Tailwind config with EFH brand colors..."

# Backup existing tailwind config
cp tailwind.config.js tailwind.config.js.backup

# Update tailwind config (this is a simplified version - adjust as needed)
cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        // Elevate for Humanity Brand Colors
        'efh-red': '#E63946',
        'efh-orange': '#F77F00',
        'efh-teal': '#06A77D',
        'efh-purple': '#7209B7',
        'efh-blue': '#3A86FF',
        
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
EOF

echo "✅ Updated tailwind.config.js with EFH colors"

# Import brand.css in the main layout
echo "📝 Adding brand.css import to app/layout.tsx..."

# Check if brand.css is already imported
if ! grep -q "branding/brand.css" app/layout.tsx; then
  # Find the line with globals.css and add brand.css after it
  sed -i "/import.*globals.css/a import '@/branding/brand.css';" app/layout.tsx
  echo "✅ Added brand.css import to layout"
else
  echo "ℹ️  brand.css already imported in layout"
fi

echo ""
echo "🎉 Elevate for Humanity branding applied successfully!"
echo ""
echo "Brand colors available:"
echo "  • Red: #E63946 (efh-red)"
echo "  • Orange: #F77F00 (efh-orange)"
echo "  • Teal: #06A77D (efh-teal)"
echo "  • Purple: #7209B7 (efh-purple)"
echo "  • Blue: #3A86FF (efh-blue)"
echo ""
echo "CSS classes available:"
echo "  • .elevate-container"
echo "  • .elevate-nav"
echo "  • .elevate-btn-primary"
echo "  • .elevate-btn-secondary"
echo "  • .elevate-card"
echo "  • .elevate-badge"
echo "  • And more..."
echo ""
echo "Tagline: Innovate. Elevate. Reset."
echo ""
EOF

chmod +x apply-efh-brand.sh

echo "✅ Created apply-efh-brand.sh script"
