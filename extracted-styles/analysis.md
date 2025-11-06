# CSS Extraction Analysis - elevateforhumanity.org

## Extraction Date

$(date -Is)

## Source

- **Target URL**: https://www.elevateforhumanity.org
- **Main Stylesheet**: /\_next/static/chunks/da1a832dc9ce1a67.css (72.8 KB)

## Technology Stack Detected

- **Framework**: Next.js (Server-Side Rendering)
- **CSS Framework**: Tailwind CSS v4 (with @layer directives)
- **Build System**: Turbopack (Next.js bundler)
- **Hosting**: Netlify (detected from SSL certificate)

## Design System

### Color Palette

The site uses a comprehensive color system with CSS custom properties:

**Primary Colors:**

- Brown: `--color-brown` (used for headings, primary text)
- Green: `--color-green` (used for sections, accents)
- Beige: `--color-beige` (used for badges, highlights)

**Full Color Scale:**

- Red: 50-900 scale
- Orange: 50-900 scale
- Yellow: 50-800 scale
- Green: 50-900 scale
- Blue: 50-900 scale
- Purple: 50-900 scale
- Gray: 50-900 scale

### Typography

**Font Families:**

- Sans: `var(--font-geist-sans)` (default)
- Mono: `var(--font-geist-mono)`

**Font Sizes:**

- xs: 0.75rem
- sm: 0.875rem
- base: 1rem (default)
- lg: 1.125rem
- xl: 1.25rem
- 2xl: 1.5rem
- 3xl: 1.875rem
- 4xl: 2.25rem
- 5xl: 3rem
- 6xl: 3.75rem

**Font Weights:**

- normal: 400
- medium: 500
- semibold: 600
- bold: 700
- extrabold: 800

### Spacing System

Uses a base spacing unit of `0.25rem` (4px):

- Spacing scale: 0-96 (0px to 384px in 4px increments)
- Container sizes: xs, md, 2xl, 3xl, 4xl, 6xl, 7xl

### Border Radius

- md: 0.375rem
- lg: 0.5rem
- xl: 0.75rem
- 2xl: 1rem
- 3xl: 1.5rem

### Shadows

- md: `0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)`
- lg: `0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)`

## Component Classes Detected

### Layout Components

- `.container` - Responsive container with max-widths
- `.section` - Section wrapper
- `.hero` - Hero section
- `.hero-content` - Hero content wrapper
- `.hero-title` - Hero heading
- `.hero-subtitle` - Hero subheading

### Program Components

- `.program-card` - Program card container
- `.program-icon` - Program icon/emoji
- `.program-title` - Program heading
- `.program-funding` - Funding badge

### Button Components

- `.button` - Primary button
- `.button-secondary` - Secondary button
- `.button-white` - White button variant
- `.button-outline-white` - Outlined white button
- `.button-large` - Large button variant

### Utility Classes

- Extensive Tailwind utility classes for:
  - Flexbox layouts
  - Grid layouts
  - Spacing (margin, padding)
  - Typography
  - Colors
  - Borders
  - Shadows
  - Positioning

## Key Features

1. **CSS Custom Properties**: Extensive use of CSS variables for theming
2. **Color Lab Support**: Advanced color definitions using Lab color space
3. **Responsive Design**: Mobile-first approach with breakpoints
4. **Accessibility**: Proper focus states, screen reader utilities
5. **Performance**: Optimized with Tailwind's purge/tree-shaking

## Recommendations for Migration

1. **Copy CSS Variables**: Extract all `--color-*`, `--spacing`, `--text-*` variables
2. **Replicate Component Classes**: Create matching `.hero`, `.program-card`, `.button` classes
3. **Use Tailwind Config**: Generate tailwind.config.js with extracted colors and spacing
4. **Match Typography**: Use Geist Sans font or similar (Inter, SF Pro)
5. **Preserve Animations**: Copy animation definitions and transitions
6. **Maintain Responsive Breakpoints**: Use same breakpoint system

## Files Generated

- homepage.html - Full HTML source
- main-stylesheet.css - Complete CSS (72.8 KB)
- analysis.md - This analysis document

## Next Steps

1. Create tailwind.config.js with extracted design tokens
2. Build component library matching existing classes
3. Implement CSS custom properties in global styles
4. Test responsive behavior across breakpoints
5. Verify color accuracy and accessibility
