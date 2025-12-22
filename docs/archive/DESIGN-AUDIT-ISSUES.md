# Design Audit - Issues Found

## HOMEPAGE ISSUES

### ✅ FIXED

1. Video voiceover - removed `muted` attribute, added `controls`
2. Black background section - changed to `bg-brand-orange-600`
3. Dark overlays on program cards - removed, changed to clean white cards

### ❌ STILL ON PRODUCTION (not deployed yet)

- Changes are local only, need to commit and deploy

## PROGRAM PAGES ISSUES

### Barber Apprenticeship Page

**File:** `app/programs/barber-apprenticeship/page.tsx`

**Problems Found:**

1. Line 26: `bg-blue-900` - dark blue banner at top
2. Line 42: `bg-gradient-to-br from-blue-900 via-purple-900 to-black` - dark gradient hero
3. Line 436: `bg-gradient-to-br from-blue-900 via-purple-900 to-black` - dark gradient CTA section

**What it should be:**

- Clean white background
- Simple colored accent sections (like orange)
- No gradients
- No dark overlays

### Other Program Pages to Check

Need to audit ALL program pages for:

- `bg-gradient`
- `bg-black`
- `bg-gray-900`
- `bg-blue-900`
- `bg-purple-900`
- Dark overlays (`bg-black/70`, `bg-black/80`)

## COMPARISON TO SUCCESSFUL SITES

### Year Up (yearup.org)

- ✅ Clean white backgrounds
- ✅ Simple colored sections (blue, orange accents)
- ✅ No gradients
- ✅ Clear 3-step process
- ✅ Stats prominently displayed
- ✅ Alumni stories with photos
- ✅ Partner logos

### Per Scholas (perscholas.org)

- ✅ Clean white backgrounds
- ✅ Consistent layout across all pages
- ✅ Simple hero with one CTA
- ✅ No dark overlays on images
- ✅ Clear program information
- ✅ Funding options clearly stated

## WHAT NEEDS TO HAPPEN

### 1. Create Standard Template

- White background
- Clean hero section
- Quick stats (duration, cost, location, credential)
- What You'll Learn section
- How It Works (3 steps)
- Funding Options
- Final CTA

### 2. Apply to ALL Program Pages

- barber-apprenticeship
- hvac-technician
- cna
- direct-support-professional
- building-maintenance
- business-startup
- cdl
- drug-collector
- home-health-aide
- peer-recovery-coach
- tax-preparation
- workforce-readiness
- (and any others)

### 3. Remove ALL:

- Gradient backgrounds
- Black/dark backgrounds
- Dark overlays on images
- Purple/blue-900 colors
- Text shadows

### 4. Keep Consistent:

- Brand orange (#ea580c or similar)
- White backgrounds
- Clean typography
- Simple CTAs
- Same layout structure

## NEXT STEPS

1. Fix barber-apprenticeship page first (test case)
2. Verify it looks good
3. Apply same template to all other program pages
4. Test all pages
5. Commit and deploy
