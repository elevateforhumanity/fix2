# Homepage Asset Map - DO NOT DELETE EXISTING ASSETS

## Rule: Keep ALL current images & videos. Resize, reposition, and reassign only.

---

## Current Assets Being Used

The new homepage uses **existing assets** from your repository. No new photos or videos needed.

### Videos
- **Hero Video**: `/videos/success-stories-video-with-narration.mp4` (63KB)
- **Poster Frame**: `/images/hero-poster.jpg`

### Images - Three Lanes Section
- **Students**: `/images/heroes/student-career.jpg`
- **Partners**: `/images/heroes/training-provider-1.jpg`
- **Community**: `/images/learners/reentry-coaching.jpg`

### Images - Platform Snapshot (4 screenshots)
- `/images/gallery/image3.jpg`
- `/images/gallery/image6.jpg`
- `/images/gallery/image8.jpg`
- `/images/heroes/programs.jpg`

### Images - Program Preview Cards
- **Barber**: `/images/programs/barber-hero.jpg`
- **Tax/Finance**: `/images/tax-office-1.jpg`
- **CNA/Healthcare**: `/images/programs/efh-cna-hero.jpg`

---

## Size Rules (Already Implemented in Code)

### Hero Section
- Video max height: 480px
- Responsive: stacks on mobile (text first, video second)

### Three Lanes Section
- Each image: 320px tall
- Rounded corners with border
- Consistent spacing

### Platform Snapshot
- Each screenshot: 240px tall
- 2x2 grid layout
- Small, clean presentation

### Program Preview Cards
- Each image: 220px tall
- 3 cards on desktop, stacks on mobile
- Hover effects for interactivity

---

## What Changed

### Before (Problems)
- Full-screen background video
- Autoplay with sound (browser blocks this)
- Stacked full-width images
- Unclear hierarchy
- No clear CTAs

### After (Solutions)
- Video in contained section with "Play with Sound" button
- Clear text-first hierarchy
- Consistent image sizing
- Multiple clear CTAs
- Mobile-optimized layout

---

## Video Playback Rules

### How It Works Now
1. Video loads muted (browser requirement)
2. User sees "▶ Play with Sound" button
3. On click: `video.muted = false` then `video.play()`
4. Controls appear after user initiates playback

### Why This Works
- ✅ Browser-compliant (no autoplay-with-sound blocking)
- ✅ User-initiated sound (required by modern browsers)
- ✅ Works on mobile and desktop
- ✅ No Stripe/SEO penalties
- ✅ Professional UX pattern

---

## Mobile Layout Rules

### Automatic Responsive Behavior
- Hero: Text stacks above video
- Three lanes: Single column
- Platform snapshots: 2x2 grid maintained
- Program cards: Single column
- All buttons: Full-width on mobile

### No Media Above Headlines on Mobile
- Text always appears first
- Images load below content
- Prevents "image-heavy" mobile experience

---

## Dev Handoff Checklist

### Files Created
- [ ] `/components/home/HeroVideo.tsx` - Video player with sound button
- [ ] `/components/home/PrimaryCtas.tsx` - Reusable CTA buttons
- [ ] `/app/page.tsx` - New homepage
- [ ] `/components/site/SiteHeader.tsx` - Clean header nav
- [ ] `/components/site/SiteFooter.tsx` - Organized footer

### Assets Verified
- [ ] All image paths exist in `/public/images/`
- [ ] Video file exists at `/public/videos/success-stories-video-with-narration.mp4`
- [ ] Poster frame exists at `/public/images/hero-poster.jpg`

### Testing Required
- [ ] Video plays with sound on click
- [ ] Mobile layout stacks correctly
- [ ] All CTAs link to correct pages
- [ ] Images load without errors
- [ ] No console errors

---

## Optional: Header/Footer Integration

### To Use New Header/Footer
1. Import in `/app/layout.tsx`:
   ```tsx
   import SiteHeader from "@/components/site/SiteHeader";
   import SiteFooter from "@/components/site/SiteFooter";
   ```

2. Wrap children:
   ```tsx
   <SiteHeader />
   {children}
   <SiteFooter />
   ```

3. Remove old header/footer components

**Note**: Current layout uses `MainNav` and existing footer. New components are ready when you want to switch.

---

## What NOT to Do

❌ Do NOT delete existing images
❌ Do NOT force autoplay with sound
❌ Do NOT use full-screen background videos
❌ Do NOT stack multiple full-width images
❌ Do NOT exceed 480px for hero media
❌ Do NOT add new videos without compression

---

## Support

If video doesn't play with sound:
1. Check browser console for errors
2. Verify `playsInline` attribute is present
3. Confirm user clicked the button (not autoplay)
4. Test in different browsers (Chrome, Safari, Firefox)

If images don't load:
1. Verify file paths match exactly (case-sensitive)
2. Check `/public/` directory structure
3. Confirm Next.js Image component is used
4. Check browser network tab for 404 errors
