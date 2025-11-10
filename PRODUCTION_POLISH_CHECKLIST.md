# Production Polish Checklist

## Visual Assets Needed

### High Priority (Do First)
- [ ] **Hero Image**: Add `public/images/hero-training.jpg` (1200x900px)
  - Show students in training, professional setting
  - High quality, well-lit, diverse representation
  
- [ ] **OG Image**: Add `public/images/og-cover.jpg` (1200x630px)
  - For social media sharing (Facebook, LinkedIn, Twitter)
  - Include logo, tagline, and key benefit
  
- [ ] **Favicon**: Add `public/images/favicon.png` (64x64px)
  - Simple logo or "E" icon
  - Shows in browser tabs

### Partner Logos (Medium Priority)
- [ ] `public/images/partners/workone.webp` (200x80px)
- [ ] `public/images/partners/dwd.webp` (200x80px)
- [ ] `public/images/partners/nextleveljobs.webp` (200x80px)
- [ ] `public/images/partners/usdol.webp` (200x80px)
- [ ] `public/images/partners/osha.webp` (200x80px)

### Program Images (Nice to Have)
- [ ] `public/images/programs/barber.jpg`
- [ ] `public/images/programs/hvac.jpg`
- [ ] `public/images/programs/cna.jpg`
- [ ] `public/images/programs/cdl.jpg`

## Content Updates

### Homepage
- [ ] Replace HomeProduction.tsx as default homepage
- [ ] Add real testimonials with names (no photos needed initially)
- [ ] Update statistics (500+ students, 92% placement, etc.)
- [ ] Add real phone number and email

### Navigation
- [ ] Wire up all header links
- [ ] Add login/portal link
- [ ] Test mobile menu

### Footer
- [ ] Link to Privacy and Terms pages
- [ ] Add social media links (if applicable)
- [ ] Verify contact information

## Technical Polish

### Performance
- [ ] Run `npm run build` and check bundle size
- [ ] Optimize images to WebP format
- [ ] Test page load speed

### SEO
- [ ] Submit sitemap to Google Search Console
- [ ] Verify robots.txt is accessible
- [ ] Test Open Graph tags with Facebook Debugger

### Forms
- [ ] Enable Netlify Forms email notifications
- [ ] Test application form submission
- [ ] Add reCAPTCHA (optional)

### Testing
- [ ] Test on mobile devices
- [ ] Test all links work
- [ ] Check console for errors
- [ ] Verify no broken images

## Quick Wins (Do These Now)

1. **Add Hero Image**: Even a stock photo of students/training makes huge difference
2. **Update Homepage**: Use HomeProduction.tsx instead of current homepage
3. **Add Partner Logos**: Even simple text logos work initially
4. **Enable Forms**: Turn on Netlify Forms notifications

## Resources

### Stock Photos (Free)
- Unsplash.com - Search "training", "students", "workshop"
- Pexels.com - Search "education", "learning", "career"

### Image Optimization
- TinyPNG.com - Compress images
- Squoosh.app - Convert to WebP

### Testing Tools
- PageSpeed Insights - Performance testing
- Facebook Debugger - OG tag testing
- Mobile-Friendly Test - Mobile responsiveness
