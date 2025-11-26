# 🗂️ MASTER IMAGE FOLDER STRUCTURE

**One organized system for ALL images across marketing site + LMS**

---

## 📁 FOLDER STRUCTURE

```
/public/images/
├── home/           (13 images - Homepage)
├── programs/       (20 images - Programs pages)
├── funding/        (6 images - Funding page)
├── portals/        (5 images - Portal pages)
├── about/          (4 images - About page)
├── contact/        (2 images - Contact page)
├── success/        (5 images - Success stories)
└── lms/            (11 images - LMS pages)
```

**Total: 66 images organized in 8 folders**

---

## 🏠 HOME FOLDER (`/public/images/home/`)

### Hero Section (1 image)
```
home-hero.jpg
```

### Who We Serve (3 images)
```
who-adults.jpg
who-families.jpg
who-reentry.jpg
```

### Program Pathway Cards (6 images)
```
pathway-healthcare.jpg
pathway-trades.jpg
pathway-beauty.jpg
pathway-cdl.jpg
pathway-business.jpg
pathway-reentry.jpg
```

### Success Stories (3 images)
```
success-1.jpg
success-2.jpg
success-3.jpg
```

**Subtotal: 13 images**

---

## 📚 PROGRAMS FOLDER (`/public/images/programs/`)

### Program List Thumbnails (6 images)
```
program-healthcare.jpg
program-trades.jpg
program-beauty.jpg
program-cdl.jpg
program-business.jpg
program-reentry.jpg
```

### Individual Program Heroes (7 images)
```
ma101-hero.jpg
cna-hero.jpg
hvac-hero.jpg
cdl-hero.jpg
barber-hero.jpg
reentry-hero.jpg
business-admin-hero.jpg
```

### Program Detail Images (7 images)
```
program-ma101.jpg
program-cna.jpg
program-hvac.jpg
program-cdl-detail.jpg
program-barber-detail.jpg
program-reentry-detail.jpg
program-business-detail.jpg
```

**Subtotal: 20 images**

---

## 💰 FUNDING FOLDER (`/public/images/funding/`)

```
funding-wioa.jpg
funding-wrg.jpg
funding-jri.jpg
funding-apprenticeship.jpg
funding-ojt.jpg
funding-steps.jpg
```

**Subtotal: 6 images**

---

## 🚪 PORTALS FOLDER (`/public/images/portals/`)

### Student Portal (2 images)
```
student-portal-hero.jpg
student-dashboard-preview.jpg
```

### Staff Portal (3 images)
```
staff-portal-hero.jpg
staff-duties.jpg
staff-support.jpg
```

**Subtotal: 5 images**

---

## ℹ️ ABOUT FOLDER (`/public/images/about/`)

```
about-hero.jpg
about-team.jpg
about-credentials.jpg
about-community.jpg
```

**Subtotal: 4 images**

---

## 📞 CONTACT FOLDER (`/public/images/contact/`)

```
contact-hero.jpg
contact-office.jpg
```

**Subtotal: 2 images**

---

## 🏆 SUCCESS FOLDER (`/public/images/success/`)

```
success-james.jpg
success-ashley.jpg
success-marcus.jpg
success-entrepreneur.jpg
success-cdl.jpg
```

**Subtotal: 5 images**

---

## 🎓 LMS FOLDER (`/public/images/lms/`)

### LMS Entry & Dashboard (2 images)
```
lms-hero.jpg
lms-dashboard.jpg
```

### Course Thumbnails (6 images)
```
lms-course-healthcare.jpg
lms-course-cna.jpg
lms-course-hvac.jpg
lms-course-cdl.jpg
lms-course-business.jpg
lms-course-reentry.jpg
```

### LMS Features (3 images)
```
lms-course-player.jpg
lms-support.jpg
lms-certificates.jpg
```

**Subtotal: 11 images**

---

## 🔧 AUTO-WIRE SCRIPT MAPPINGS

Add this to `scripts/auto-wire-images.sh`:

```bash
# ====== HOMEPAGE ======
IMAGE_MAP["/images/PLACEHOLDER_HOME_HERO.jpg"]="/images/home/home-hero.jpg"
IMAGE_MAP["/images/PLACEHOLDER_WHO_ADULTS.jpg"]="/images/home/who-adults.jpg"
IMAGE_MAP["/images/PLACEHOLDER_WHO_FAMILIES.jpg"]="/images/home/who-families.jpg"
IMAGE_MAP["/images/PLACEHOLDER_WHO_REENTRY.jpg"]="/images/home/who-reentry.jpg"
IMAGE_MAP["/images/PLACEHOLDER_PATHWAY_HEALTHCARE.jpg"]="/images/home/pathway-healthcare.jpg"
IMAGE_MAP["/images/PLACEHOLDER_PATHWAY_TRADES.jpg"]="/images/home/pathway-trades.jpg"
IMAGE_MAP["/images/PLACEHOLDER_PATHWAY_BEAUTY.jpg"]="/images/home/pathway-beauty.jpg"
IMAGE_MAP["/images/PLACEHOLDER_PATHWAY_CDL.jpg"]="/images/home/pathway-cdl.jpg"
IMAGE_MAP["/images/PLACEHOLDER_PATHWAY_BUSINESS.jpg"]="/images/home/pathway-business.jpg"
IMAGE_MAP["/images/PLACEHOLDER_PATHWAY_REENTRY.jpg"]="/images/home/pathway-reentry.jpg"
IMAGE_MAP["/images/PLACEHOLDER_SUCCESS_1.jpg"]="/images/home/success-1.jpg"
IMAGE_MAP["/images/PLACEHOLDER_SUCCESS_2.jpg"]="/images/home/success-2.jpg"
IMAGE_MAP["/images/PLACEHOLDER_SUCCESS_3.jpg"]="/images/home/success-3.jpg"

# ====== PROGRAMS ======
IMAGE_MAP["/images/PLACEHOLDER_PROGRAM_HEALTHCARE.jpg"]="/images/programs/program-healthcare.jpg"
IMAGE_MAP["/images/PLACEHOLDER_PROGRAM_TRADES.jpg"]="/images/programs/program-trades.jpg"
IMAGE_MAP["/images/PLACEHOLDER_PROGRAM_BEAUTY.jpg"]="/images/programs/program-beauty.jpg"
IMAGE_MAP["/images/PLACEHOLDER_PROGRAM_CDL.jpg"]="/images/programs/program-cdl.jpg"
IMAGE_MAP["/images/PLACEHOLDER_PROGRAM_BUSINESS.jpg"]="/images/programs/program-business.jpg"
IMAGE_MAP["/images/PLACEHOLDER_PROGRAM_REENTRY.jpg"]="/images/programs/program-reentry.jpg"

# ====== INDIVIDUAL PROGRAM HEROES ======
IMAGE_MAP["/images/PLACEHOLDER_MA101_HERO.jpg"]="/images/programs/ma101-hero.jpg"
IMAGE_MAP["/images/PLACEHOLDER_CNA_HERO.jpg"]="/images/programs/cna-hero.jpg"
IMAGE_MAP["/images/PLACEHOLDER_HVAC_HERO.jpg"]="/images/programs/hvac-hero.jpg"
IMAGE_MAP["/images/PLACEHOLDER_CDL_HERO.jpg"]="/images/programs/cdl-hero.jpg"
IMAGE_MAP["/images/PLACEHOLDER_BARBER_HERO.jpg"]="/images/programs/barber-hero.jpg"
IMAGE_MAP["/images/PLACEHOLDER_REENTRY_HERO.jpg"]="/images/programs/reentry-hero.jpg"
IMAGE_MAP["/images/PLACEHOLDER_BUSINESS_HERO.jpg"]="/images/programs/business-admin-hero.jpg"

# ====== FUNDING ======
IMAGE_MAP["/images/PLACEHOLDER_FUNDING_WIOA.jpg"]="/images/funding/funding-wioa.jpg"
IMAGE_MAP["/images/PLACEHOLDER_FUNDING_WRG.jpg"]="/images/funding/funding-wrg.jpg"
IMAGE_MAP["/images/PLACEHOLDER_FUNDING_JRI.jpg"]="/images/funding/funding-jri.jpg"
IMAGE_MAP["/images/PLACEHOLDER_FUNDING_APPRENTICE.jpg"]="/images/funding/funding-apprenticeship.jpg"
IMAGE_MAP["/images/PLACEHOLDER_FUNDING_OJT.jpg"]="/images/funding/funding-ojt.jpg"

# ====== PORTALS ======
IMAGE_MAP["/images/PLACEHOLDER_STUDENT_PORTAL_HERO.jpg"]="/images/portals/student-portal-hero.jpg"
IMAGE_MAP["/images/PLACEHOLDER_STAFF_PORTAL_HERO.jpg"]="/images/portals/staff-portal-hero.jpg"

# ====== ABOUT & CONTACT ======
IMAGE_MAP["/images/PLACEHOLDER_ABOUT_HERO.jpg"]="/images/about/about-hero.jpg"
IMAGE_MAP["/images/PLACEHOLDER_CONTACT_HERO.jpg"]="/images/contact/contact-hero.jpg"

# ====== LMS ======
IMAGE_MAP["/images/PLACEHOLDER_LMS_HERO.jpg"]="/images/lms/lms-hero.jpg"
IMAGE_MAP["/images/PLACEHOLDER_LMS_DASHBOARD.jpg"]="/images/lms/lms-dashboard.jpg"
IMAGE_MAP["/images/PLACEHOLDER_LMS_COURSE_HEALTHCARE.jpg"]="/images/lms/lms-course-healthcare.jpg"
IMAGE_MAP["/images/PLACEHOLDER_LMS_COURSE_CNA.jpg"]="/images/lms/lms-course-cna.jpg"
IMAGE_MAP["/images/PLACEHOLDER_LMS_COURSE_HVAC.jpg"]="/images/lms/lms-course-hvac.jpg"
IMAGE_MAP["/images/PLACEHOLDER_LMS_COURSE_CDL.jpg"]="/images/lms/lms-course-cdl.jpg"
IMAGE_MAP["/images/PLACEHOLDER_LMS_COURSE_BUSINESS.jpg"]="/images/lms/lms-course-business.jpg"
IMAGE_MAP["/images/PLACEHOLDER_LMS_COURSE_REENTRY.jpg"]="/images/lms/lms-course-reentry.jpg"
IMAGE_MAP["/images/PLACEHOLDER_LMS_PLAYER.jpg"]="/images/lms/lms-course-player.jpg"
IMAGE_MAP["/images/PLACEHOLDER_LMS_SUPPORT.jpg"]="/images/lms/lms-support.jpg"
IMAGE_MAP["/images/PLACEHOLDER_LMS_CERTIFICATES.jpg"]="/images/lms/lms-certificates.jpg"
```

---

## ✅ BENEFITS OF THIS STRUCTURE

### Organization
- ✅ Clean folder structure
- ✅ Easy to find images
- ✅ Logical grouping
- ✅ Scalable system

### Maintenance
- ✅ Easy to update images
- ✅ Clear naming convention
- ✅ No confusion about where files go
- ✅ Easy for designers to understand

### Performance
- ✅ Organized assets
- ✅ Easy to optimize by folder
- ✅ Clear image purposes
- ✅ Easy to audit

---

## 📋 IMPLEMENTATION CHECKLIST

### Step 1: Create Folder Structure
```bash
cd /workspaces/fix2/public
mkdir -p images/{home,programs,funding,portals,about,contact,success,lms}
```

### Step 2: Add Images to Folders
- [ ] Add 13 images to `images/home/`
- [ ] Add 20 images to `images/programs/`
- [ ] Add 6 images to `images/funding/`
- [ ] Add 5 images to `images/portals/`
- [ ] Add 4 images to `images/about/`
- [ ] Add 2 images to `images/contact/`
- [ ] Add 5 images to `images/success/`
- [ ] Add 11 images to `images/lms/`

### Step 3: Update Auto-Wire Script
- [ ] Add all mappings to `scripts/auto-wire-images.sh`
- [ ] Test script runs without errors

### Step 4: Test Everything
- [ ] Run auto-wire script
- [ ] Check all pages load images
- [ ] Verify no broken images
- [ ] Test on mobile

---

## 🎯 QUICK REFERENCE

### Total Images by Category
- Homepage: 13
- Programs: 20
- Funding: 6
- Portals: 5
- About: 4
- Contact: 2
- Success: 5
- LMS: 11

**Grand Total: 66 images**

### Folder Sizes (Estimated)
- home/: ~7MB
- programs/: ~10MB
- funding/: ~3MB
- portals/: ~2.5MB
- about/: ~2MB
- contact/: ~1MB
- success/: ~2.5MB
- lms/: ~5.5MB

**Total: ~33.5MB (optimized)**

---

## 💡 TIPS FOR DESIGNERS

### When Adding New Images
1. Determine which category it belongs to
2. Place in appropriate folder
3. Follow naming convention (lowercase-with-hyphens.jpg)
4. Optimize before adding (< 500KB per image)
5. Update auto-wire script if using placeholders

### Naming Convention
- Use lowercase
- Use hyphens (not underscores or spaces)
- Be descriptive but concise
- Include category prefix when helpful
- Example: `program-healthcare.jpg`, `lms-dashboard.jpg`

### Image Optimization
- Format: JPG for photos, PNG for graphics
- Quality: 80-90%
- Max size: 500KB per image
- Dimensions: See specifications in IMAGE_NAMING_MAP.md

---

**Status:** Ready to implement
**Time to Setup:** 30 minutes
**Result:** Organized, professional image system

---

**END OF MASTER IMAGE FOLDER STRUCTURE**

This organized system makes it easy for anyone (developers, designers, content managers) to find and manage images across the entire Elevate For Humanity platform.
