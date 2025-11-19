# Image Audit Report - Elevate for Humanity

## Homepage Images (app/page.tsx)

### Hero Section
- ✅ Background: `https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80`
  - Students learning together
  - Used as background with opacity overlay

### Program Cards (5 cards)
- ✅ Medical Assistant: `https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80`
- ✅ Barber: `https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&q=80`
- ✅ HVAC: `https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&q=80`
- ✅ Building Maintenance: `https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80`
- ✅ Workforce Readiness: `https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80`

### Video Placeholder
- ✅ Video thumbnail: `https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80`
  - Used in "How it works" section

### Success Stories (3 cards)
- ✅ Marcus J.: `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80`
- ✅ Sarah M.: `https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80`
- ✅ James T.: `https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80`

## Footer Images

### Mobile App Badges
- ⚠️ App Store: `https://www.coursera.org/images/app-store-badge.svg`
  - External Coursera asset (may break)
- ⚠️ Google Play: `https://www.coursera.org/images/google-play-badge.svg`
  - External Coursera asset (may break)

## Program Pages

### Barber Apprenticeship
- Need to check images

### Medical Assistant
- Need to check images

### HVAC Technician
- Need to check images

### Building Maintenance
- Need to check images

## Issues Found

### Critical
1. None - all Unsplash images should load correctly

### Warnings
1. App Store and Google Play badges use external Coursera URLs
   - These could break if Coursera changes their asset URLs
   - Recommendation: Download and host locally or use official badges

### Recommendations
1. Download app store badges and host locally in `/public/assets/`
2. Consider creating a local image library for frequently used images
3. Add proper alt text to all images for accessibility
4. Optimize images for web (already using Unsplash's query params)
5. Consider using Next.js Image component for all images (already done)
