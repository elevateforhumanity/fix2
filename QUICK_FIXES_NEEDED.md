# Quick Fixes Needed - Priority List

## 🔴 CRITICAL (Fix Before Launch)

### 1. Hardcoded Localhost URLs (8 instances)
**Time:** 30 minutes  
**Impact:** Broken production emails and redirects

**Files to fix:**
```
app/api/checkout/route.ts:70
app/api/cron/inactivity-reminders/route.ts:88
app/api/emails/certificate/route.ts:54
app/api/emails/welcome/route.ts:61
app/api/hsi/create-checkout/route.ts:59 (2 instances)
app/api/partner-courses/create-checkout/route.ts:76 (2 instances)
```

**Solution:**
```typescript
// Add to .env.local and .env.production
NEXT_PUBLIC_SITE_URL=https://elevateforhumanity.org

// Replace all instances of:
const url = 'http://localhost:3000/...'

// With:
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const url = `${baseUrl}/...`;
```

---

## 🟠 HIGH (Fix This Week)

### 2. Missing Placeholder Image
**Time:** 5 minutes  
**Impact:** Broken images on student courses page

**Files affected:**
```
app/student/courses/page.tsx (2 instances)
```

**Solution:**
```bash
# Option 1: Copy existing image
cp public/media-backup-20251128-043832/hero-slide-healthcare.jpg \
   public/images/hero-placeholder.jpg

# Option 2: Update code to use existing image
# Replace: /images/hero-placeholder.jpg
# With: /media-backup-20251128-043832/hero-slide-healthcare.jpg
```

---

## 🟡 MEDIUM (Fix This Month)

### 3. Blog "Coming Soon" Message
**Time:** 2-4 hours (or 5 minutes to hide)  
**Impact:** Incomplete user experience

**File:** `app/blog/page.tsx`

**Options:**
1. Add 3-5 initial blog posts
2. Temporarily remove blog link from navigation
3. Replace with RSS feed from external blog

---

### 4. TODO Comment in HourTracker
**Time:** 1 hour  
**Impact:** Code maintenance

**File:** `components/apprenticeship/HourTracker.tsx:100`

**Action:** Review and either implement or remove

---

## 🟢 LOW (Nice to Have)

### 5. Missing Alt Text on Some Images
**Time:** 2-3 hours  
**Impact:** Accessibility compliance

**Action:** Audit and add descriptive alt text

---

## ✅ Quick Win Script

Run this to fix the two most critical issues:

```bash
#!/bin/bash

# 1. Create missing placeholder image
echo "Creating missing placeholder image..."
cp public/media-backup-20251128-043832/hero-slide-healthcare.jpg \
   public/images/hero-placeholder.jpg

# 2. Add environment variable to .env.example
echo "Updating .env.example..."
echo "" >> .env.example
echo "# Site URL for production" >> .env.example
echo "NEXT_PUBLIC_SITE_URL=https://elevateforhumanity.org" >> .env.example

echo "✅ Quick fixes applied!"
echo ""
echo "⚠️  MANUAL STEP REQUIRED:"
echo "Update 8 API route files to use process.env.NEXT_PUBLIC_SITE_URL"
echo "See SITE_COMPLETENESS_REPORT.md for details"
```

---

## 📋 Verification Checklist

After fixes:
- [ ] All images load on student courses page
- [ ] Test email links in staging environment
- [ ] Verify checkout redirects work
- [ ] Test certificate email links
- [ ] Verify partner course enrollment flow
- [ ] Check HSI enrollment redirects

---

## 🎯 Summary

**Total Issues:** 5  
**Critical:** 1 (hardcoded URLs)  
**High:** 1 (missing image)  
**Medium:** 2 (blog, TODO)  
**Low:** 1 (alt text)

**Time to Fix Critical Issues:** ~35 minutes  
**Time to Fix All Issues:** ~4-6 hours

**Current Score:** 82/100  
**After Fixes:** 95/100
