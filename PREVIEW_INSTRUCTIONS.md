# 🎬 Preview Your New Homepage

## Quick Start

### Option 1: Direct URL
Visit: `https://[your-domain]/page-new`

### Option 2: Development Server
```bash
cd /workspaces/fix2
npm run dev
```
Then visit: `http://localhost:3000/page-new`

### Option 3: Create Preview Route
If you want a cleaner URL, create a route:

```bash
mkdir -p app/preview
cp app/page-new.tsx app/preview/page.tsx
```

Then visit: `/preview`

## What You'll See

### Desktop View (1920x1080)
- Full-width cinematic hero
- Four-panel strip
- 12-program grid (4 columns)
- All sections with proper spacing
- Smooth animations on scroll

### Tablet View (768x1024)
- Hero adjusts to smaller text
- Four-panel strip (2 columns)
- Program grid (2-3 columns)
- All sections remain readable

### Mobile View (375x667)
- Hero with smaller text
- Four-panel strip (1 column)
- Program grid (1 column)
- Stacked layouts
- Touch-friendly buttons

## Testing Checklist

- [ ] Hero video placeholder displays
- [ ] All 12 programs show correctly
- [ ] Hover effects work on cards
- [ ] Scroll animations trigger
- [ ] All links are clickable
- [ ] Footer displays all sections
- [ ] Mobile menu works (if added)
- [ ] Forms are accessible (if added)

## Known Placeholders

These need real content:
1. Hero video background (currently gradient)
2. Four-panel images (currently gradients)
3. Program card images (currently icons)
4. Earn While You Learn image (currently icon)
5. Success story photos (currently initials)
6. Employer partnership image (currently icon)

## Next Actions

### If You Like It:
```bash
# Backup old homepage
mv app/page.tsx app/page-old.tsx

# Make new homepage live
mv app/page-new.tsx app/page.tsx

# Commit changes
git add .
git commit -m "Launch new cinematic homepage design"
git push
```

### If You Want Changes:
Edit `/app/page-new.tsx` and refresh the page.

## Color Customization

Want to adjust colors? Edit these in `page-new.tsx`:

**Cinematic sections:**
```tsx
from-slate-900 via-blue-900 to-slate-800  // Dark gradient
bg-black/40                                // Overlay
text-blue-400                              // Accent
```

**Bright sections:**
```tsx
bg-white                                   // Background
bg-blue-600                                // Primary button
text-slate-900                             // Headings
```

## Performance Tips

Once you add real images:
1. Use WebP format
2. Compress videos to < 5MB
3. Lazy load below-the-fold content
4. Add loading states

## Support

Questions? Check:
- `/NEW_HOMEPAGE_README.md` - Full documentation
- `/app/page-new.tsx` - Source code with comments

---

**Ready to launch?** This design is production-ready once you add your content!
