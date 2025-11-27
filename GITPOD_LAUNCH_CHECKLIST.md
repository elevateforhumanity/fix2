# 🚀 Elevate for Humanity - Launch Checklist

## A. TODAY - CRITICAL FOR ENROLLMENT (Must Do First)

These items block you from safely accepting applications. Fix these before promoting the site.

### 1. Database Setup ✅
- [ ] Open Supabase Dashboard → SQL Editor
- [ ] Run Migration 1 from `RUN_THESE_MIGRATIONS.sql` (applications table)
- [ ] Run Migration 2 from `RUN_THESE_MIGRATIONS.sql` (enrollments table)
- [ ] Run Migration 3 from `RUN_THESE_MIGRATIONS.sql` (student_courses table)
- [ ] Run verification query to confirm all 3 tables exist
- [ ] Test: Can you see empty tables in Supabase Table Editor?

**Why:** Without these tables, the /apply form will crash and you can't accept applications.

---

### 2. Apply Flow Works End-to-End ✅
- [ ] Visit your live site at `/apply`
- [ ] Fill out the application form with real test data
- [ ] Click "Submit Application"
- [ ] Check for success message (not error)
- [ ] Open Supabase → Table Editor → applications
- [ ] Confirm your test application appears as a new row
- [ ] Check that email, name, program_id are correct

**Why:** This is your primary conversion point. If this breaks, you lose applicants.

**If it fails:** Check browser console (F12) for errors and send me the error message.

---

### 3. Homepage Buttons Route Correctly ✅
- [ ] Visit homepage
- [ ] Click "Apply Now" button → Should go to `/apply`
- [ ] Click "For Employers" button → Should go to `/employers`
- [ ] Click "View All Programs" → Should go to `/programs`
- [ ] Click "Contact Us" in footer → Should go to `/contact`

**Why:** Broken buttons = lost leads.

**Fix:** If any button 404s, either create that page or change the button href to an existing page.

---

### 4. Critical Pages Don't 404 ✅
Test these URLs on your live site:

- [ ] `/` (homepage) - loads without errors
- [ ] `/programs` - shows program list
- [ ] `/apply` - shows application form
- [ ] `/about` - has content (or redirects)
- [ ] `/contact` - has contact info
- [ ] `/privacy` - has privacy policy
- [ ] `/terms` - has terms of service
- [ ] `/lms` - shows LMS landing page

**Why:** Google penalizes sites with broken links. Users lose trust.

**Fix:** For any 404, either:
1. Create a simple placeholder page, or
2. Remove the link from navigation

---

### 5. Mobile View Works ✅
On your phone or Chrome DevTools mobile view:

- [ ] Homepage loads and text is readable (not tiny)
- [ ] Mobile menu icon appears in header
- [ ] Mobile menu opens when clicked
- [ ] Can scroll without weird zooming
- [ ] Buttons are tappable (not too small)
- [ ] Forms are usable (inputs not cut off)

**Why:** 60%+ of traffic is mobile. Broken mobile = lost applications.

**Fix:** If text is too small, tell me which section and I'll increase font sizes.

---

### 6. Programs Page Shows Real Content ✅
- [ ] Visit `/programs`
- [ ] See list of programs (CNA, Barber, HVAC, etc.)
- [ ] Programs are separated: FREE programs first, ETPL programs second
- [ ] Each program card has:
  - [ ] Program name
  - [ ] Image (not broken)
  - [ ] Brief description
  - [ ] "Apply Now" or "Learn More" button
- [ ] Click a program → Goes to program detail page (not 404)

**Why:** This is where people decide which program to apply for.

**Fix:** If images are broken, I can add fallback images.

---

### 7. Social Media Links Work ✅
In the footer:

- [ ] Facebook link goes to your Facebook page (or remove if not ready)
- [ ] LinkedIn link goes to your LinkedIn page (or remove if not ready)
- [ ] Links open in new tab
- [ ] Links don't 404

**Why:** Builds credibility and allows people to verify you're real.

**Fix:** Update URLs in `components/layout/MainFooter.tsx` or remove links.

---

## B. POLISH - DO AFTER ENROLLMENT IS LIVE

These improve quality but don't block launch. Do these in week 2.

### 8. Funding Page Exists ✅
- [ ] Create `/funding` page or redirect to `/programs`
- [ ] Explain: WIOA, WRG, JRI, employer sponsorship, payment plans
- [ ] Include: "Step 1: Apply. Step 2: We help you find funding."
- [ ] Add CTA: "Apply Now" button

**Why:** People need to understand they can get training for free.

---

### 9. Employers Landing Page ✅
- [ ] Visit `/employers`
- [ ] Page explains what employers get:
  - [ ] Access to pre-screened talent
  - [ ] OJT/WEX/Apprenticeship support
  - [ ] Tax credits and subsidies
  - [ ] Reduced hiring risk
- [ ] Clear CTA: "Request a Call" or "Join Employer Directory"

**Why:** Employers are a key revenue and placement source.

---

### 10. Program Detail Pages Have Content ✅
For each program (CNA, Barber, HVAC, etc.):

- [ ] Has clear title and description
- [ ] Shows program length (weeks/months)
- [ ] Lists funding options
- [ ] Has "Apply Now" button
- [ ] Includes outcomes/certifications
- [ ] Has real image (not placeholder)

**Why:** People need details before applying.

**Fix:** Tell me which programs need content and I'll add it.

---

### 11. Video Player Works ✅
- [ ] Test a course with video content
- [ ] Video loads and plays
- [ ] No "browser doesn't support" errors
- [ ] Controls work (play, pause, volume)

**Why:** Videos are key to online learning experience.

---

### 12. Student Dashboard Loads ✅
- [ ] Visit `/student/dashboard` (after logging in)
- [ ] Page loads without infinite spinner
- [ ] Shows enrolled courses or "No courses yet"
- [ ] Doesn't show raw error messages

**Why:** Students need to access their courses.

---

### 13. Admin Dashboard Works ✅
- [ ] Visit `/admin/applications`
- [ ] Can see submitted applications
- [ ] Can filter/search applications
- [ ] Can update application status

**Why:** You need to manage incoming applications.

---

### 14. Remove Duplicate/Old Pages ✅
- [ ] Identify old pages you don't want public
- [ ] Remove links from navigation
- [ ] Add redirects or delete pages

**Why:** Confuses users and looks unprofessional.

---

### 15. TypeScript/ESLint Cleanup ✅
- [ ] Run `npm run build` - should succeed
- [ ] Run `npm run lint` - fix critical errors
- [ ] Run `npm run typecheck` - fix type errors

**Why:** Prevents bugs and makes code maintainable.

---

## C. SIMPLE GO/NO-GO CHECKLIST

Use this for final launch decision:

### MUST HAVE (Block Launch)
- [ ] Homepage loads on desktop
- [ ] Homepage loads on mobile
- [ ] /apply form submits successfully
- [ ] Test application appears in Supabase
- [ ] /programs shows program list
- [ ] Mobile menu works
- [ ] No critical pages 404
- [ ] Buttons route to correct pages

### SHOULD HAVE (Fix in Week 1)
- [ ] /funding page exists
- [ ] /employers page has content
- [ ] Social media links work
- [ ] Program detail pages have content
- [ ] Privacy/Terms pages exist

### NICE TO HAVE (Fix in Week 2)
- [ ] Videos play correctly
- [ ] Student dashboard loads
- [ ] Admin dashboard works
- [ ] No TypeScript errors
- [ ] All images load

---

## D. QUICK TEST SCRIPT

Run this 5-minute test before promoting the site:

```bash
# 1. Test homepage
curl -I https://www.elevateforhumanity.org/

# 2. Test apply page
curl -I https://www.elevateforhumanity.org/apply

# 3. Test programs page
curl -I https://www.elevateforhumanity.org/programs

# 4. Test API endpoint
curl -X POST https://www.elevateforhumanity.org/api/enroll \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test@example.com","programCode":"cna"}'
```

All should return 200 OK (or 201 for API).

---

## E. WHAT TO DO IF SOMETHING FAILS

### Application Form Doesn't Submit
1. Open browser console (F12)
2. Look for red error messages
3. Send me: error message + which page
4. I'll fix the API or form validation

### Page Shows 404
1. Check if page file exists in `app/` folder
2. If missing, tell me which page
3. I'll create it or redirect

### Mobile Menu Doesn't Open
1. Check browser console for JavaScript errors
2. Try different browser (Chrome, Safari)
3. Send me screenshot of what you see

### Images Don't Load
1. Check if image file exists in `public/` folder
2. Send me list of broken images
3. I'll add fallback images

---

## F. PRIORITY ORDER

Do these in this exact order:

1. **Run database migrations** (5 min)
2. **Test /apply form** (2 min)
3. **Check mobile view** (3 min)
4. **Test all nav links** (5 min)
5. **Fix any 404s** (10 min)
6. **Update social media links** (2 min)
7. **Test on real phone** (5 min)
8. **Submit test application** (2 min)
9. **Verify in Supabase** (2 min)
10. **Go live!** 🚀

Total time: ~35 minutes to launch-ready

---

## G. SUPPORT

If anything on this list fails:

1. **Don't panic** - most issues are quick fixes
2. **Note the exact error** - screenshot or copy/paste
3. **Tell me which item failed** - use the checkbox numbers
4. **I'll provide the exact fix** - usually 1-2 files to edit

---

## ✅ LAUNCH CRITERIA

You're ready to promote the site when:

- [ ] All items in Section A are checked
- [ ] At least 6/8 items in Section C "MUST HAVE" are checked
- [ ] You've submitted a test application successfully
- [ ] Mobile view looks good on your phone

**Don't wait for perfection** - launch with Section A complete, fix Section B over the next week.

---

## 📊 CURRENT STATUS

Last updated: 2024-11-27

- ✅ Database migrations created
- ✅ Enrollment API built
- ✅ Homepage converted to white backgrounds
- ✅ Programs page separated (free vs paid)
- ✅ Social media links added
- ✅ Mobile responsive design
- ⏳ Database migrations need to be run
- ⏳ Test application needs to be submitted
- ⏳ Social media URLs need to be updated

**Next step:** Run the 3 database migrations, then test the /apply form.
