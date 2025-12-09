# Program Pages Hero Banner Audit
## All Program Pages Reviewed

## ✅ Summary

**Good News:** Most program pages are already using local images from your `/public/images/` folder!

**Only 1 page needs updating:** Barber Apprenticeship (still using Unsplash stock photo)

---

## 📊 Audit Results

### ✅ Using Local Images (Good!)

These programs are using images from your `/public/images/` folder:

1. **Barber** - `/images/programs/barber-hero.jpg`
2. **Beauty Career Educator** - `/images/hero/hero-beauty-wellness.jpg`
3. **Building Maintenance** - `/images/programs/building-maintenance-hero.jpg`
4. **Building Tech** - `/images/programs/building-technician-hero.jpg`
5. **Business Apprenticeship** - `/images/gallery/image6.jpg`
6. **CDL** - `/images/programs/cdl-hero.jpg`
7. **Childcare** - `/images/gallery/image5.jpg`
8. **CNA** - `/images/programs/cna-hero.jpg`
9. **CPR Certification** - `/images/gallery/image3.jpg`
10. **Dental Assistant** - `/images/gallery/image8.jpg`
11. **EKG Technician** - `/images/medical-assistant/large/ma-large-04.jpg`
12. **Emergency Health & Safety** - `/images/gallery/image4.jpg`
13. **HVAC** - `/images/programs/hvac-hero.jpg`
14. **Medical Assistant** - `/images/gallery/image3.jpg`
15. **Patient Care Technician** - `/images/gallery/image4.jpg`
16. **Peer Recovery Coach** - `/images/general/support-services.jpg`
17. **Pharmacy Technician** - `/images/gallery/image8.jpg`
18. **Phlebotomy** - `/images/medical-assistant/large/ma-large-03.jpg`
19. **Professional Esthetician** - `/images/hero/hero-beauty-wellness.jpg`
20. **Sterile Processing** - `/images/medical-assistant/large/ma-large-05.jpg`
21. **Tax Preparation** - `/images/gallery/image6.jpg`

### ⚠️ Still Using Unsplash (Needs Update)

1. **Barber Apprenticeship** - `https://images.unsplash.com/photo-1503951914875-452162b0f3f1`
   - File: `app/programs/barber-apprenticeship/page.tsx`
   - Line: ~10
   - **Action:** Replace with local image

---

## 🎯 Recommendations

### 1. Fix Barber Apprenticeship Page

**Current:**
```typescript
src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1920&h=1080&fit=crop&q=90"
```

**Option A:** Use existing barber image
```typescript
src="/images/programs/barber-hero.jpg"
```

**Option B:** Add new custom image
```typescript
src="/images/programs/barber-apprenticeship-hero.jpg"
```

### 2. Check Image Quality

Since you're already using local images, let's verify they're:
- [ ] High resolution (1920x1080 minimum)
- [ ] Bright and clear
- [ ] Relevant to each program
- [ ] Properly optimized (< 300KB)

### 3. Replace Generic Gallery Images

Some programs are using generic gallery images:
- `image3.jpg`, `image4.jpg`, `image6.jpg`, `image8.jpg`

**Consider:** Creating program-specific hero images for:
- CPR Certification (currently using `image3.jpg`)
- Medical Assistant (currently using `image3.jpg`)
- Patient Care Technician (currently using `image4.jpg`)
- Emergency Health & Safety (currently using `image4.jpg`)
- Business Apprenticeship (currently using `image6.jpg`)
- Tax Preparation (currently using `image6.jpg`)
- Dental Assistant (currently using `image8.jpg`)
- Pharmacy Technician (currently using `image8.jpg`)

---

## 📸 Image Inventory

### Existing Images in `/public/images/`

**Programs Folder:**
- `barber-hero.jpg` ✅
- `building-maintenance-hero.jpg` ✅
- `building-technician-hero.jpg` ✅
- `cdl-hero.jpg` ✅
- `cna-hero.jpg` ✅
- `hvac-hero.jpg` ✅

**Hero Folder:**
- `hero-beauty-wellness.jpg` ✅

**Gallery Folder:**
- `image3.jpg` (used by 2 programs)
- `image4.jpg` (used by 2 programs)
- `image5.jpg` ✅
- `image6.jpg` (used by 2 programs)
- `image8.jpg` (used by 2 programs)

**Medical Assistant Folder:**
- `ma-large-03.jpg` ✅
- `ma-large-04.jpg` ✅
- `ma-large-05.jpg` ✅

**General Folder:**
- `support-services.jpg` ✅

---

## 🚀 Action Plan

### Immediate (Do Now):
1. **Fix Barber Apprenticeship page**
   - Replace Unsplash URL with local image
   - Use existing `/images/programs/barber-hero.jpg`

### Short Term (This Week):
2. **Check image quality**
   - Verify all images are bright and clear
   - Ensure proper resolution
   - Optimize file sizes if needed

### Medium Term (Next Week):
3. **Create program-specific images**
   - Replace generic gallery images
   - Add unique hero for each program
   - Show program-specific activities

---

## 🔧 Quick Fix for Barber Apprenticeship

**File:** `app/programs/barber-apprenticeship/page.tsx`

**Find (Line ~10):**
```typescript
src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1920&h=1080&fit=crop&q=90"
```

**Replace with:**
```typescript
src="/images/programs/barber-hero.jpg"
```

**Or if you want a different image:**
```typescript
src="/images/programs/barber-apprenticeship-hero.jpg"
```
(Then add the new image to `/public/images/programs/`)

---

## ✅ Conclusion

**Great news!** Your program pages are already using local images. Only one page (Barber Apprenticeship) needs updating.

**Priority:**
1. Fix Barber Apprenticeship page (5 minutes)
2. Verify image quality across all programs (30 minutes)
3. Consider creating unique images for programs sharing gallery images (optional)

**Want me to fix the Barber Apprenticeship page now?** Just say yes and I'll update it!
