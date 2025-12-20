# MONDAY LAUNCH - CRITICAL CHECKLIST

## 🚨 MUST BE DONE BY MONDAY

### ✅ COMPLETED

1. Brand color system established
2. Navigation updated with all pages
3. PWA manifest fixed
4. Application tracking system
5. Homepage polished
6. Community pages accessible
7. Forums and study groups live

### 🔴 CRITICAL - DO NOW

#### 1. Partner Courses Setup

**Status:** Database has courses, need pages + Stripe

**Partner Courses in Database:**

- Milady: 5 courses (Cosmetology, Barbering, Esthetics, Nail, Massage)
- Certiport: 5 courses (MOS Word, Excel, PowerPoint, Outlook, Access)
- HSI: 5 courses (CPR Adult, CPR All, First Aid, Combined, BBP)
- JRI: 5 courses (CCT1, CCT2, CCS, Green, Floor)
- NRF Rise: 5 courses (Customer Service, Sales, Visual, Inventory)
- CareerSafe: 5 courses (OSHA 10 Gen, OSHA 10 Con, OSHA 30 Gen, OSHA 30 Con, Forklift)

**Actions Needed:**

- [ ] Create Stripe products for each course
- [ ] Create `/courses/partner/[courseId]` page template
- [ ] Add partner courses to `/courses` listing
- [ ] Test checkout flow for partner courses

#### 2. Store Functionality

**Status:** Store page exists, needs testing

**Actions Needed:**

- [ ] Test `/store` page loads
- [ ] Verify Stripe checkout works
- [ ] Test digital product delivery
- [ ] Verify webhook handles purchases

#### 3. Critical Page Polish

**Status:** 808 issues found, prioritize top 20

**Top 20 Pages to Polish:**

1. `/` - Homepage ✅ DONE
2. `/programs` - Programs overview
3. `/apply` - Application ✅ DONE
4. `/funding` - Funding overview
5. `/lms` - LMS landing
6. `/about` - About page
7. `/contact` - Contact page
8. `/courses` - Course catalog
9. `/forums` - Forums ✅ DONE
10. `/community` - Community ✅ DONE
11. `/study-groups` - Study groups ✅ DONE
12. `/store` - Store
13. `/marketplace` - Marketplace
14. `/booking` - Booking
15. `/login` - Login
16. `/signup` - Signup
17. `/dashboard` - Dashboard router
18. `/student/dashboard` - Student dashboard
19. `/admin/dashboard` - Admin dashboard
20. `/staff-portal` - Staff portal

**Actions Needed:**

- [ ] Add metadata to all 20
- [ ] Add hero sections
- [ ] Add CTAs
- [ ] Ensure responsive

---

## 📋 DETAILED ACTION PLAN

### PHASE 1: Partner Courses (4 hours)

**Step 1: Create Stripe Products (1 hour)**

```bash
# Use Stripe CLI or Dashboard to create products
# Match course_code to Stripe product ID
```

**Step 2: Create Partner Course Page Template (1 hour)**

```tsx
// app/courses/partner/[courseId]/page.tsx
- Hero with course name
- Price and duration
- Features/benefits
- Stripe checkout button
- Provider logo
```

**Step 3: Add to Course Listing (1 hour)**

```tsx
// app/courses/page.tsx
- Fetch partner_courses from database
- Display in grid
- Filter by category
- Link to individual pages
```

**Step 4: Test Checkout (1 hour)**

- Test purchase flow
- Verify webhook
- Check enrollment creation

---

### PHASE 2: Store Testing (2 hours)

**Step 1: Test Store Page (30 min)**

- Load `/store`
- Check all products display
- Verify prices

**Step 2: Test Checkout (1 hour)**

- Click "Buy Now"
- Complete Stripe checkout
- Verify redirect
- Check email delivery

**Step 3: Test Digital Delivery (30 min)**

- Verify download links work
- Check access after purchase

---

### PHASE 3: Critical Page Polish (4 hours)

**Batch 1: Information Pages (1 hour)**

- `/programs` - Add hero, metadata
- `/funding` - Add hero, metadata
- `/about` - Add hero, metadata
- `/contact` - Add hero, metadata

**Batch 2: Learning Pages (1 hour)**

- `/lms` - Add hero, metadata
- `/courses` - Add hero, metadata
- `/marketplace` - Add hero, metadata
- `/booking` - Add hero, metadata

**Batch 3: Auth Pages (1 hour)**

- `/login` - Polish form
- `/signup` - Polish form
- `/dashboard` - Test routing

**Batch 4: Portal Pages (1 hour)**

- `/student/dashboard` - Test access
- `/admin/dashboard` - Test access
- `/staff-portal` - Test access

---

### PHASE 4: Final QA (2 hours)

**Critical Paths:**

1. Homepage → Apply → Success → Track
2. Homepage → Programs → Program Page → Apply
3. Homepage → Courses → Partner Course → Checkout
4. Homepage → Store → Product → Checkout
5. Login → Dashboard (role-based routing)

**Test Each:**

- [ ] Loads without errors
- [ ] Mobile responsive
- [ ] CTAs work
- [ ] Forms submit
- [ ] Payments process

---

### PHASE 5: Deploy (1 hour)

**Pre-Deploy:**

- [ ] Run `npm run build` locally
- [ ] Fix any build errors
- [ ] Test production build

**Deploy:**

- [ ] Commit all changes
- [ ] Push to GitHub
- [ ] Verify Vercel auto-deploy
- [ ] Check live site

**Post-Deploy:**

- [ ] Test critical paths on live site
- [ ] Check console for errors
- [ ] Verify Stripe webhooks
- [ ] Test PWA installation

---

## 🎯 PRIORITY ORDER

### MUST HAVE (Launch Blockers)

1. ✅ Homepage working
2. ✅ Application flow working
3. ⏳ Partner courses listed
4. ⏳ Store checkout working
5. ⏳ Top 20 pages polished

### SHOULD HAVE (Launch Day)

6. All pages have metadata
7. All pages have CTAs
8. Mobile responsive everywhere
9. No console errors
10. Fast page loads

### NICE TO HAVE (Post-Launch)

11. All 784 pages polished
12. Perfect accessibility
13. Advanced animations
14. A/B testing setup

---

## 📊 CURRENT STATUS

**Completed:** 40%

- ✅ Brand system
- ✅ Navigation
- ✅ Application flow
- ✅ Community pages
- ✅ PWA manifest

**In Progress:** 30%

- ⏳ Partner courses
- ⏳ Store testing
- ⏳ Page polish

**Not Started:** 30%

- ❌ Stripe product creation
- ❌ Partner course pages
- ❌ Batch page polish

---

## ⏰ TIME ESTIMATE

**Total Time Needed:** 13 hours

- Partner Courses: 4 hours
- Store Testing: 2 hours
- Page Polish: 4 hours
- QA: 2 hours
- Deploy: 1 hour

**If Working:**

- 8 hours/day = 1.6 days
- Can launch by Sunday evening

---

## 🚀 LAUNCH READINESS SCORE

**Current:** 65/100

**To Reach 90/100 (Launch Ready):**

- Add 15 points: Partner courses live
- Add 10 points: Store fully tested
- Add 10 points: Top 20 pages polished

**Target:** 90/100 by Sunday 11:59 PM

---

## 📞 SUPPORT NEEDED

**If Stuck:**

1. Stripe API keys - check `.env`
2. Database access - check Supabase
3. Build errors - check logs
4. Deployment issues - check Vercel

**Resources:**

- Stripe Dashboard: https://dashboard.stripe.com
- Supabase Dashboard: https://supabase.com/dashboard
- Vercel Dashboard: https://vercel.com/dashboard
- GitHub Repo: https://github.com/elevateforhumanity/fix2

---

## ✅ FINAL CHECKLIST

Before going live Monday:

- [ ] All partner courses have pages
- [ ] Store checkout works end-to-end
- [ ] Top 20 pages polished
- [ ] No critical console errors
- [ ] Mobile works on real device
- [ ] Stripe webhooks configured
- [ ] PWA installs correctly
- [ ] All navigation links work
- [ ] Forms submit successfully
- [ ] Emails send correctly

---

## 🎉 LAUNCH DAY PLAN

**Monday Morning:**

1. Final smoke test (30 min)
2. Check all critical paths
3. Verify no errors
4. Test on mobile
5. Go live announcement

**Monitoring:**

- Watch Vercel logs
- Monitor Stripe dashboard
- Check error tracking
- Review user feedback

**Ready to Launch!** 🚀
