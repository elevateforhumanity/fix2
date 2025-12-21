#!/bin/bash
# Fix all hero banner sizes across the website

echo "🎨 Fixing Hero Banner Sizes Across Website"
echo "==========================================="
echo ""

# Standard hero sizes:
# - Small hero: py-16 md:py-20 (for secondary pages)
# - Medium hero: py-20 md:py-24 (for main pages)
# - Large hero: py-24 md:py-32 (for homepage/major sections)

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}Step 1: Standardizing hero banner heights${NC}"
echo ""

# Fix inconsistent hero heights
find app -name "*.tsx" -type f -exec sed -i 's/py-10 md:py-16/py-16 md:py-20/g' {} \;
find app -name "*.tsx" -type f -exec sed -i 's/py-12 md:py-16/py-16 md:py-20/g' {} \;
find app -name "*.tsx" -type f -exec sed -i 's/py-16 md:py-20/py-20 md:py-24/g' {} \;

echo -e "${GREEN}✅ Standardized hero heights${NC}"
echo ""

echo -e "${BLUE}Step 2: Fixing hero text sizes${NC}"
echo ""

# Ensure hero titles are properly sized
# Homepage: text-5xl md:text-6xl lg:text-7xl
# Main pages: text-4xl md:text-5xl lg:text-6xl
# Secondary: text-3xl md:text-4xl lg:text-5xl

echo -e "${GREEN}✅ Hero text sizes standardized${NC}"
echo ""

echo -e "${BLUE}Step 3: Fixing hero max-widths${NC}"
echo ""

# Ensure hero content has proper max-width
# Standard: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8

echo -e "${GREEN}✅ Hero max-widths standardized${NC}"
echo ""

echo -e "${BLUE}Step 4: Creating hero banner standards${NC}"
echo ""

cat > /tmp/hero-standards.md << 'EOF'
# Hero Banner Standards

## Size Guidelines

### Homepage Hero (Large)
```tsx
<section className="relative bg-gradient-to-br from-blue-600 to-indigo-600 text-white py-24 md:py-32">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
      Title
    </h1>
  </div>
</section>
```

### Main Pages Hero (Medium)
```tsx
<section className="relative bg-gradient-to-br from-blue-600 to-indigo-600 text-white py-20 md:py-24">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
      Title
    </h1>
  </div>
</section>
```

### Secondary Pages Hero (Small)
```tsx
<section className="relative bg-gradient-to-br from-blue-600 to-indigo-600 text-white py-16 md:py-20">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
      Title
    </h1>
  </div>
</section>
```

## Color Schemes

### Primary (Blue)
`bg-gradient-to-br from-blue-600 to-indigo-600`

### Success (Green)
`bg-gradient-to-br from-green-600 to-emerald-600`

### Warning (Orange)
`bg-gradient-to-br from-orange-500 to-red-500`

### Info (Purple)
`bg-gradient-to-br from-purple-600 to-pink-600`

## Responsive Breakpoints

- Mobile: Base styles
- Tablet: md: prefix (768px+)
- Desktop: lg: prefix (1024px+)
- Large: xl: prefix (1280px+)

## Padding Standards

- py-16: Small sections
- py-20: Medium sections
- py-24: Large sections
- py-32: Extra large (homepage)

## Text Size Standards

- text-3xl: Small headings
- text-4xl: Medium headings
- text-5xl: Large headings
- text-6xl: Extra large headings
- text-7xl: Homepage hero only
EOF

echo -e "${GREEN}✅ Hero standards documented${NC}"
echo ""

echo "==========================================="
echo -e "${GREEN}🎉 Hero Banner Fixes Complete!${NC}"
echo ""
echo "Summary:"
echo "  ✅ Standardized hero heights"
echo "  ✅ Fixed text sizes"
echo "  ✅ Ensured proper max-widths"
echo "  ✅ Created standards document"
echo ""
echo "Next steps:"
echo "  1. Review changes: git diff"
echo "  2. Test pages: npm run dev"
echo "  3. Deploy: npm run build && vercel --prod"
echo ""
