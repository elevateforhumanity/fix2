# IMAGE REPLACEMENT PLAN
## Replace All Unsplash & Generic Images

---

## 📊 AUDIT RESULTS

### Unsplash Images Found:
- **17 files** contain Unsplash URLs
- **30+ unique** Unsplash images
- **116 total instances** across site

### Repository Images Available:
- **249 HD images** in `/public/media-backup-20251128-043832/`
- **Organized by category:**
  - Hero banners (4)
  - Programs (50+)
  - Healthcare (15+)
  - Skilled trades (20+)
  - Beauty/barber (10+)
  - Additional (150+)

---

## 🎯 REPLACEMENT STRATEGY

### Priority 1: Homepage (CRITICAL)
**File:** `app/page.tsx`
**Current:** 6 Unsplash images
**Replace with:**
- Hero: `/media-backup-20251128-043832/homepage-hero.jpg` ✅ DONE
- Barber: `/media-backup-20251128-043832/programs/barber.jpg`
- Healthcare: `/media-backup-20251128-043832/programs/healthcare-hd.jpg`
- HVAC: `/media-backup-20251128-043832/programs/hvac-hd.jpg`

### Priority 2: Program Pages (HIGH)
**Files:** `app/programs/*.tsx`
**Current:** 20+ Unsplash images
**Replace with:** Specific program images from repository

### Priority 3: Marketing Pages (MEDIUM)
**Files:** Various marketing pages
**Current:** 30+ Unsplash images
**Replace with:** Generic professional images

### Priority 4: LMS Pages (LOW)
**Files:** Student/instructor portals
**Current:** 20+ Unsplash images
**Replace with:** Educational/training images

---

## 📝 DETAILED REPLACEMENT MAP

### Homepage Images:

| Current (Unsplash) | Replace With (Repository) | Status |
|--------------------|---------------------------|--------|
| photo-1524178232363 (classroom) | `/media-backup-20251128-043832/homepage-hero.jpg` | ✅ DONE |
| photo-1622287162716 (barber) | `/media-backup-20251128-043832/programs/barber.jpg` | ⏳ TODO |
| photo-1584820927498 (healthcare) | `/media-backup-20251128-043832/programs/healthcare-hd.jpg` | ⏳ TODO |
| photo-1581092160562 (HVAC) | `/media-backup-20251128-043832/programs/hvac-hd.jpg` | ⏳ TODO |

### Program Pages:

| Program | Current | Replace With | Status |
|---------|---------|--------------|--------|
| Barber | Unsplash | `/programs/barber.jpg` | ⏳ TODO |
| CNA | Unsplash | `/programs/cna-hd.jpg` | ⏳ TODO |
| Medical Assistant | Unsplash | `/programs/medical-hd.jpg` | ⏳ TODO |
| Welding | Unsplash | `/programs/welding-hd.jpg` | ⏳ TODO |
| CDL | Unsplash | `/programs/cdl-hd.jpg` | ⏳ TODO |
| HVAC | Unsplash | `/programs/hvac-hd.jpg` | ⏳ TODO |
| Culinary | Unsplash | `/programs/culinary-hd.jpg` | ⏳ TODO |
| Beauty | Unsplash | `/programs/beauty-hd.jpg` | ⏳ TODO |
| Tax Prep | Unsplash | `/programs/tax-prep-hd.jpg` | ⏳ TODO |
| Building Trades | Unsplash | `/programs/building-hd.jpg` | ⏳ TODO |

### Marketing Pages:

| Page | Current | Replace With | Status |
|------|---------|--------------|--------|
| About | Unsplash | `/hero/hero-student-community.jpg` | ⏳ TODO |
| Employers | Unsplash | `/hero-slide-employers.jpg` | ⏳ TODO |
| Students | Unsplash | `/students-hero.jpg` | ⏳ TODO |
| Success Stories | Unsplash | `/hero/hero-testimonial-2.jpg` | ⏳ TODO |

---

## 🔧 IMPLEMENTATION STEPS

### Step 1: Homepage (5 minutes)
```bash
# Already done hero image
# Update remaining 3 images in app/page.tsx
```

### Step 2: Program Pages (15 minutes)
```bash
# Update all program pages with HD images
# Files: app/programs/*/page.tsx
```

### Step 3: Marketing Pages (10 minutes)
```bash
# Update about, employers, students pages
# Files: app/about/page.tsx, app/employers/page.tsx, etc.
```

### Step 4: LMS Pages (10 minutes)
```bash
# Update student/instructor portal images
# Files: app/portal/*/page.tsx
```

### Step 5: Verify (5 minutes)
```bash
# Check all pages load correctly
# Verify no broken images
# Test mobile responsiveness
```

**Total Time:** 45 minutes

---

## 🚀 AUTOMATED REPLACEMENT SCRIPT

```bash
#!/bin/bash
# Replace Unsplash images with repository images

# Homepage
sed -i 's|https://images.unsplash.com/photo-1622287162716.*|/media-backup-20251128-043832/programs/barber.jpg|g' app/page.tsx
sed -i 's|https://images.unsplash.com/photo-1584820927498.*|/media-backup-20251128-043832/programs/healthcare-hd.jpg|g' app/page.tsx
sed -i 's|https://images.unsplash.com/photo-1581092160562.*|/media-backup-20251128-043832/programs/hvac-hd.jpg|g' app/page.tsx

# Program pages
find app/programs -name "*.tsx" -exec sed -i 's|https://images.unsplash.com/photo-.*barber.*|/media-backup-20251128-043832/programs/barber.jpg|g' {} \;
find app/programs -name "*.tsx" -exec sed -i 's|https://images.unsplash.com/photo-.*healthcare.*|/media-backup-20251128-043832/programs/healthcare-hd.jpg|g' {} \;
find app/programs -name "*.tsx" -exec sed -i 's|https://images.unsplash.com/photo-.*welding.*|/media-backup-20251128-043832/programs/welding-hd.jpg|g' {} \;

echo "✅ Image replacement complete!"
```

---

## 📊 EXPECTED RESULTS

### Before:
- 116 Unsplash images
- External dependencies
- Slow loading
- Generic stock photos
- Inconsistent quality

### After:
- 0 Unsplash images
- All local images
- Fast loading
- Real program photos
- Consistent HD quality

---

## ✅ VERIFICATION CHECKLIST

- [ ] Homepage images replaced
- [ ] Program pages images replaced
- [ ] Marketing pages images replaced
- [ ] LMS pages images replaced
- [ ] No broken images
- [ ] All images load fast
- [ ] Mobile responsive
- [ ] HD quality maintained
- [ ] No Unsplash URLs remaining
- [ ] Repository images optimized

---

## 🎯 NEXT STEPS

1. **Run automated replacement script** (5 min)
2. **Manual verification** (10 min)
3. **Test on dev server** (5 min)
4. **Fix any issues** (10 min)
5. **Commit changes** (5 min)

**Total:** 35 minutes

---

**Last Updated:** December 7, 2024, 11:40 PM UTC
**Status:** READY TO EXECUTE
