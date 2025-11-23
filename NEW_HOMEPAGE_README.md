# 🎬 New Homepage Design - Elevate For Humanity

## Overview

The new homepage (`/app/page-new.tsx`) implements a **Cinematic × Bright** mixed visual strategy inspired by Full Sail University's energy while maintaining 100% original branding.

## Design Philosophy

### Mixed Layout Strategy

**Full-Width Cinematic Sections** (for impact):
- Hero banner with video background
- Earn While You Learn showcase
- Success Stories testimonials
- Final CTA section

**Boxed Professional Sections** (for clarity):
- Four-panel strip
- 12-program grid
- Funding pathways
- Employer partnerships

## Sections Breakdown

### 1. Hero Section (Full-Width Cinematic)
- Full-screen video background placeholder
- Bold headline with gradient text
- Dual CTA buttons
- Animated scroll indicator
- Dark overlay for text readability

### 2. Four-Panel Strip (Full-Width)
- Mixed cinematic/bright styling
- Hover effects with scale transform
- Responsive grid (1-2-4 columns)
- Each panel tells a key value proposition

### 3. Programs Grid (Boxed Container)
- 12 programs with mixed styling
- Cinematic cards: Barber, HVAC, Reentry, Emergency Health
- Bright cards: Medical Assistant, Esthetician, CPR, HHA, Tax Prep, Business, Beauty Educator, Workforce Readiness
- Responsive grid (1-2-3-4 columns)
- Hover effects with scale and shadow

### 4. Earn While You Learn (Full-Width Cinematic)
- Dark gradient background
- Two-column layout
- Checkmark list with benefits
- Image placeholder on right
- Strong contrast for readability

### 5. Funding Pathways (Boxed Container Bright)
- Clean white background
- Three funding options: WIOA, JRI, OJT
- Icon-based cards
- Hover effects

### 6. Success Stories (Full-Width Cinematic)
- Dark gradient background
- Three testimonial cards
- Avatar circles with initials
- Glass-morphism effect
- Hover scale animations

### 7. Employer Partnerships (Boxed Container Bright)
- White background with shadow
- Two-column layout
- Checkmark benefits list
- Image placeholder

### 8. Final CTA (Full-Width)
- Solid blue background
- Centered content
- Dual action buttons
- High contrast

### 9. Footer (Full-Width Dark)
- Four-column layout
- Program links
- Resource links
- About links
- Contact information
- Bottom bar with legal links

## Technical Features

### Animations
- Smooth scroll behavior
- Intersection Observer for fade-in effects
- Hover scale transforms
- Shadow transitions
- Color transitions

### Responsive Design
- Mobile-first approach
- Breakpoints: sm, md, lg, xl
- Flexible grid layouts
- Touch-friendly buttons

### Accessibility
- Semantic HTML
- Proper heading hierarchy
- ARIA labels (to be added)
- Keyboard navigation support
- High contrast ratios

## Color Palette

### Cinematic Sections
- Background: `from-slate-900 via-blue-900 to-slate-800`
- Overlay: `bg-black/40` to `bg-black/50`
- Text: White with blue accents
- Accent: `text-blue-400`

### Bright Sections
- Background: White or `bg-gray-50`
- Cards: White with shadows
- Text: `text-slate-900` and `text-slate-600`
- Accent: `bg-blue-600`

## Typography

- Hero: `text-5xl md:text-7xl` (48px-72px)
- Section Headers: `text-4xl md:text-5xl` (36px-48px)
- Subheaders: `text-xl md:text-2xl` (20px-24px)
- Body: `text-lg` (18px)
- Small: `text-sm` (14px)

## Next Steps

### To Go Live:
1. Review the design at `/page-new`
2. Add actual video backgrounds (InVideo/Pika/Runway)
3. Replace image placeholders with real photos
4. Test on mobile devices
5. Run accessibility audit
6. Rename `page-new.tsx` to `page.tsx`
7. Archive old homepage

### Content Needed:
- [ ] Hero video (30-60 seconds)
- [ ] Four panel images (cinematic + bright mix)
- [ ] 12 program images
- [ ] Earn While You Learn image
- [ ] Success story photos (Marcus, Sarah, James)
- [ ] Employer partnership image

### Video Prompts Ready:
All video prompts are documented in the original request. Use InVideo, Pika, or Runway to generate:
- Hero banner montage
- Four panel images
- Program-specific images
- Success story portraits

## File Structure

```
/app/page-new.tsx          # New homepage (preview)
/app/page.tsx              # Current homepage (to be replaced)
/NEW_HOMEPAGE_README.md    # This file
```

## Performance Considerations

- Lazy load images below the fold
- Optimize video file sizes
- Use WebP format for images
- Implement skeleton loaders
- Add loading states

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support

## Maintenance

- Update program cards when adding new programs
- Keep success stories current
- Update funding information annually
- Refresh images periodically

---

**Built with:** Next.js 14, React 19, Tailwind CSS, TypeScript
**Design System:** Cinematic × Bright Mixed Strategy
**Inspiration:** Full Sail University energy, 100% original execution
