# Design Comparison: Year Up vs Per Scholas vs Elevate for Humanity

## YEAR UP - IT SUPPORT PROGRAM PAGE

### Layout Structure

1. **Header**: Clean white background, simple logo, clear navigation
2. **Hero Section**:
   - White background
   - Large heading
   - One clear CTA button (blue)
   - No gradient, no overlay
3. **Quick Stats Bar**: Simple colored boxes with icons
4. **What You'll Learn**: White background, bullet points with icons
5. **How It Works**: 3-step process with numbers
6. **Outcomes/Jobs**: White background, salary stats
7. **Alumni Stories**: Photos with quotes, white cards
8. **Final CTA**: Colored section (blue) with white text

### Color Palette

- Primary: Blue (#0066CC or similar)
- Secondary: White
- Accent: Orange for highlights
- Text: Dark gray/black on white
- **NO gradients**
- **NO dark backgrounds**
- **NO overlays on images**

### Typography

- Clean sans-serif
- Bold headings
- Regular body text
- No text shadows

---

## PER SCHOLAS - IT SUPPORT PROGRAM PAGE

### Layout Structure

1. **Header**: White background, logo, navigation
2. **Hero Section**:
   - Clean white background
   - Course title
   - Location selector
   - Key info boxes (duration, cost, certifications)
   - One primary CTA
3. **Course Overview Tabs**: Navigation for sections
4. **What You'll Learn**: White background, organized sections
5. **Career Support**: White cards with images
6. **Graduate Stories**: Photos with quotes
7. **How to Apply**: Step-by-step process
8. **FAQ Section**: Expandable questions

### Color Palette

- Primary: Blue
- Secondary: White
- Accent: Orange/yellow
- Text: Dark on white
- **NO gradients**
- **NO dark backgrounds**
- **Clean, professional**

### Key Features

- Consistent spacing
- Clear hierarchy
- Easy to scan
- Mobile-friendly
- No visual clutter

---

## ELEVATE FOR HUMANITY - CURRENT STATE

### Homepage Issues

1. ❌ Black background section with video overlay
2. ❌ Dark gradient overlays on program cards (`bg-black/70`, `bg-black/80`)
3. ❌ Inconsistent card styles
4. ❌ Video is muted (no voiceover)

### Barber Apprenticeship Page Issues

1. ❌ Line 26: `bg-blue-900` dark banner
2. ❌ Line 42: `bg-gradient-to-br from-blue-900 via-purple-900 to-black` hero
3. ❌ Line 436: `bg-gradient-to-br from-blue-900 via-purple-900 to-black` CTA
4. ❌ Dark overlays on images
5. ❌ Text shadows everywhere
6. ❌ Inconsistent layout vs other programs

### Problems Across All Program Pages

- Different layouts for each program
- Some have gradients, some don't
- Different CTA placements
- Different badge styles
- No consistent template
- Dark backgrounds make text hard to read
- Overlays hide images

---

## WHAT NEEDS TO CHANGE

### Homepage

✅ Remove black background section → Use brand orange
✅ Remove dark overlays on cards → Use clean white cards
✅ Enable video audio (if exists)
✅ Consistent card design

### All Program Pages Need:

1. **Clean white background** (no gradients)
2. **Consistent hero section**:
   - White background
   - Program title
   - Brief description
   - Quick stats (duration, cost, location, credential)
   - Two CTAs: "Apply Now" + "Talk to Advisor"
3. **What You'll Learn section**: White background, checkmarks, organized
4. **How It Works**: 3 steps with numbers
5. **Funding Options**: Clean section explaining WIOA/WRG/JRI
6. **Final CTA**: Brand orange section with white text

### Colors to Use

- ✅ White backgrounds
- ✅ Brand orange (#ea580c) for CTAs and accents
- ✅ Light gray (slate-50) for alternating sections
- ✅ Dark text (slate-900) on white
- ❌ NO gradients
- ❌ NO black/dark backgrounds
- ❌ NO blue-900 or purple-900
- ❌ NO overlays

### Typography

- ✅ Clean, readable fonts
- ✅ Bold headings
- ✅ Regular body text
- ❌ NO text shadows

---

## TEMPLATE STRUCTURE (TO APPLY TO ALL PROGRAMS)

```
1. Hero Section (white bg)
   - Badges (funding, DOL, job placement)
   - Program title
   - Description
   - Quick stats (4 items with icons)
   - 2 CTAs

2. What You'll Learn (slate-50 bg)
   - Section title
   - Grid of skills with checkmarks

3. How It Works (white bg)
   - 3 numbered steps

4. Funding Options (blue-50 bg)
   - Title
   - Description
   - 3 funding cards (WIOA, WRG, JRI)

5. Final CTA (brand-orange-600 bg)
   - Heading
   - Description
   - 2 CTAs
```

---

## PROGRAMS TO FIX (15 total)

1. barber-apprenticeship
2. hvac-technician
3. cna
4. direct-support-professional
5. building-maintenance
6. business-startup
7. cdl
8. drug-collector
9. home-health-aide
10. peer-recovery-coach
11. tax-preparation
12. workforce-readiness
13. professional-esthetician
14. beauty-career-educator
15. (check for any others)

---

## SUCCESS CRITERIA

✅ All program pages use same template
✅ No gradients anywhere
✅ No dark backgrounds
✅ No overlays on images
✅ Consistent CTAs
✅ Clean, professional look
✅ Easy to scan
✅ Mobile-friendly
✅ Matches Year Up/Per Scholas quality
