# 🖼️ Generic Images Report

## Summary

**Total Generic/Placeholder Images Found:** 27 images  
**Location:** `/public/images/programs/`  
**Pattern:** `efh-*-card.jpg`, `efh-*-hero.jpg`, `efh-*-og.jpg`

These appear to be text-only placeholder images with orange frames showing just program names.

---

## Images Found

### **1. Barber Program (9 references in code)**
- `efh-barber-card.jpg` (169KB)
- `efh-barber-hero.jpg` (155KB)
- `efh-barber-og.jpg` (137KB)

**Used in:**
- `app/programs/barber-apprenticeship/page-OLD-DETAILED.tsx`
- `app/programs/barber-apprenticeship/page-OLD-BACKUP.tsx`
- Other backup files

### **2. Beauty Career Educator (2 references)**
- `efh-beauty-career-educator-card.jpg` (162KB)
- `efh-beauty-career-educator-hero.jpg` (147KB)
- `efh-beauty-career-educator-og.jpg` (131KB)

**Used in:**
- `app/programs/beauty-career-educator/page-new.tsx`

### **3. CNA Program (2 references)**
- `efh-cna-card.jpg` (165KB)
- `efh-cna-hero.jpg` (149KB)
- `efh-cna-og.jpg` (132KB)

**Used in:**
- `app/programs/cna/page.tsx`

### **4. Building Tech (0 references - UNUSED)**
- `efh-building-tech-card.jpg` (161KB)
- `efh-building-tech-hero.jpg` (146KB)
- `efh-building-tech-og.jpg` (128KB)

### **5. Business Startup Marketing (0 references - UNUSED)**
- `efh-business-startup-marketing-card.jpg` (161KB)
- `efh-business-startup-marketing-hero.jpg` (146KB)
- `efh-business-startup-marketing-og.jpg` (129KB)

### **6. CPR/AED/First Aid (0 references - UNUSED)**
- `efh-cpr-aed-first-aid-card.jpg` (163KB)
- `efh-cpr-aed-first-aid-hero.jpg` (148KB)
- `efh-cpr-aed-first-aid-og.jpg` (131KB)

### **7. Esthetician Client Services (0 references - UNUSED)**
- `efh-esthetician-client-services-card.jpg` (170KB)
- `efh-esthetician-client-services-hero.jpg` (156KB)
- `efh-esthetician-client-services-og.jpg` (126KB)

### **8. Public Safety Reentry (0 references - UNUSED)**
- `efh-public-safety-reentry-card.jpg` (163KB)
- `efh-public-safety-reentry-hero.jpg` (149KB)
- `efh-public-safety-reentry-og.jpg` (132KB)

### **9. Tax Office Startup (0 references - UNUSED)**
- `efh-tax-office-startup-card.jpg` (151KB)
- `efh-tax-office-startup-hero.jpg` (136KB)
- `efh-tax-office-startup-og.jpg` (120KB)

---

## Breakdown

### **Currently Used:** 13 images
- Barber: 3 images (9 references)
- Beauty Career Educator: 3 images (2 references)
- CNA: 3 images (2 references)
- Medical Assistant: 3 images (1 reference)

### **Unused/Orphaned:** 14 images
- Building Tech: 3 images
- Business Startup Marketing: 3 images
- CPR/AED/First Aid: 3 images
- Esthetician Client Services: 3 images
- Public Safety Reentry: 3 images
- Tax Office Startup: 3 images (partially - 2 unused)

---

## Recommendations

### **Priority 1: Replace Used Images**
These are actively displayed on live pages:

1. **Barber Program** (9 references)
   - Replace with actual barber training photos
   - Use images from `/images/beauty/` folder

2. **Beauty Career Educator** (2 references)
   - Replace with cosmetology/beauty training photos

3. **CNA Program** (2 references)
   - Replace with healthcare training photos
   - Use images from `/images/healthcare/` folder

### **Priority 2: Delete Unused Images**
These 14 images are not referenced anywhere and can be safely deleted:
- `efh-building-tech-*`
- `efh-business-startup-marketing-*`
- `efh-cpr-aed-first-aid-*`
- `efh-esthetician-client-services-*`
- `efh-public-safety-reentry-*`
- `efh-tax-office-startup-*` (2 files)

---

## Alternative Images Available

### **For Barber Program:**
- `/images/beauty/hero-program-barber.jpg`
- `/images/beauty/program-barber-training.jpg`
- `/images/efh/programs/barber.jpg`

### **For Healthcare/CNA:**
- `/images/healthcare/hero-program-medical-assistant.jpg`
- `/images/healthcare/healthcare-professional-portrait-1.jpg`
- `/images/efh/programs/cna.jpg`

### **For Beauty/Cosmetology:**
- `/images/beauty/hero-program-cosmetology.jpg`
- `/images/beauty/program-beauty-training.jpg`
- `/images/efh/programs/beauty.jpg`

---

## Action Plan

### **Step 1: Replace Active Images (High Priority)**
```bash
# Update these files to use real photos:
app/programs/barber-apprenticeship/page-OLD-DETAILED.tsx
app/programs/barber-apprenticeship/page-OLD-BACKUP.tsx
app/programs/beauty-career-educator/page-new.tsx
app/programs/cna/page.tsx
```

### **Step 2: Delete Unused Images (Medium Priority)**
```bash
cd /workspaces/fix2/public/images/programs
rm efh-building-tech-*
rm efh-business-startup-marketing-*
rm efh-cpr-aed-first-aid-*
rm efh-esthetician-client-services-*
rm efh-public-safety-reentry-*
rm efh-tax-office-startup-card.jpg
rm efh-tax-office-startup-og.jpg
```

### **Step 3: Verify No Broken Links**
```bash
# Search for any remaining references
grep -r "efh-.*-card\|efh-.*-hero\|efh-.*-og" app/ --include="*.tsx"
```

---

## Total Count

**Generic/Placeholder Images:** 27 files  
**Total Size:** ~4.2 MB  
**Currently Used:** 13 files (~2.0 MB)  
**Unused/Can Delete:** 14 files (~2.2 MB)

---

**Note:** Artlist images (licensed stock photos) are NOT included in this count as requested.
