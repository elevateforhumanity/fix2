# LMS Portal Structure Plan

**Site:** https://elevateconnects1.netlify.app/  
**Purpose:** LMS Portal ONLY (not marketing home page)  
**Marketing Home:** www.elevateforhumanity.org

---

## UNDERSTANDING

This site should be:

- ✅ **LMS Portal** - Student login, courses, programs, learning
- ❌ **NOT Marketing** - No home page hero, no contact forms, no email collection

The marketing/home page lives at www.elevateforhumanity.org

---

## REQUIRED CHANGES

### 1. Remove Email/Contact Completely

- ❌ Remove email from footer
- ❌ Remove contact forms
- ❌ Remove Contact page (or redirect to main site)
- ❌ Remove email collection forms

### 2. Remove Marketing Home Page

- ❌ Remove Home.jsx marketing content
- ✅ Replace with LMS portal dashboard/login
- ✅ Redirect root `/` to student portal or login

### 3. Keep LMS Pages Only

- ✅ Student Portal
- ✅ Course Catalog
- ✅ Programs (Apprenticeships, State Programs)
- ✅ Course Player
- ✅ Assignments
- ✅ Certificates
- ✅ Progress Tracking
- ✅ Login/Auth pages

---

## PAGES TO KEEP (LMS Functionality)

### Authentication

- `/login` - Student login
- `/register` - Student registration
- `/forgot-password` - Password reset
- `/verify-email` - Email verification
- `/auth/callback` - OAuth callback

### Student Portal

- `/student-portal` - Main student dashboard
- `/my-courses` - Student's enrolled courses
- `/my-progress` - Progress tracking
- `/my-certificates` - Earned certificates
- `/my-assignments` - Assignment list

### Learning

- `/courses` - Course catalog
- `/course/:id` - Course player
- `/programs` - Program list
- `/apprenticeship-programs` - Apprenticeship details
- `/state-programs` - State programs (WIOA/WRG/JRI)
- `/assignments/:id` - Assignment view
- `/quiz/:id` - Quiz/assessment

### Applications

- `/apply` - Program application
- `/apply-scholarship` - Scholarship application
- `/enrollment-success` - Success page

### Resources

- `/certificates` - Certificate verification
- `/faq` - Frequently asked questions
- `/support` - Help/support (no email, just docs)

### Legal (Required)

- `/privacy` - Privacy policy
- `/terms` - Terms of use
- `/accessibility` - Accessibility statement

---

## PAGES TO REMOVE/REDIRECT

### Marketing Pages (Redirect to www.elevateforhumanity.org)

- `/` - Home page → Redirect to student portal or main site
- `/about` - About us → Redirect to main site
- `/contact` - Contact → Redirect to main site
- `/donate` - Donations → Redirect to main site
- `/blog` - Blog → Redirect to main site

### Duplicate/Unused Pages

- `/home` - Duplicate
- `/home-professional` - Duplicate
- `/home-production` - Duplicate
- `/main-landing` - Duplicate
- `/lms-landing` - Duplicate
- `/clone-landing` - Duplicate

---

## FOOTER CHANGES

### Remove

- ❌ Email address
- ❌ "Contact Us" link
- ❌ Newsletter signup
- ❌ Social media (unless needed for LMS)

### Keep

- ✅ Phone number (for support)
- ✅ Location (Marion County, IN)
- ✅ Legal links (Privacy, Terms, Accessibility)
- ✅ Copyright notice
- ✅ Link to main site: "Visit www.elevateforhumanity.org"

---

## NAVIGATION CHANGES

### Remove from Nav

- ❌ "Home" (or make it go to student portal)
- ❌ "About"
- ❌ "Contact"
- ❌ "Blog"
- ❌ "Donate"

### Keep in Nav

- ✅ "Student Portal" (or "Dashboard")
- ✅ "Courses"
- ✅ "Programs"
- ✅ "My Progress"
- ✅ "Apply"
- ✅ "Login" (if not logged in)
- ✅ User menu (if logged in)

---

## ROOT PATH BEHAVIOR

### Option A: Redirect to Main Site

```
/ → https://www.elevateforhumanity.org
```

### Option B: Show Student Portal

```
/ → /student-portal (if logged in)
/ → /login (if not logged in)
```

### Option C: Show Course Catalog

```
/ → /courses
```

**Recommendation:** Option B - Show student portal or login

---

## IMPLEMENTATION STEPS

1. **Update Footer Component**
   - Remove email display
   - Remove email link
   - Add "Visit our main site" link

2. **Update Navigation Component**
   - Remove marketing links
   - Keep LMS links only
   - Update logo link behavior

3. **Update Root Route**
   - Change `/` from Home.jsx to StudentPortal or Login
   - Or add redirect to main site

4. **Remove Contact Page**
   - Delete or redirect to main site

5. **Update All CTAs**
   - Remove "Contact Us" buttons
   - Remove email collection forms
   - Update to "Visit Main Site" or "Get Support"

6. **Clean Up Routes**
   - Remove duplicate home pages
   - Remove marketing pages
   - Keep LMS pages only

---

## QUESTIONS TO CONFIRM

1. **Root Path:** What should `/` show?
   - Student portal/login?
   - Redirect to www.elevateforhumanity.org?
   - Course catalog?

2. **Support:** How should students get help?
   - Phone only?
   - Support ticket system?
   - Link to main site contact?

3. **Branding:** Should footer still show "Elevate for Humanity"?
   - Yes, with link to main site?
   - Different branding for LMS?

4. **Social Media:** Keep or remove?
   - Remove from LMS?
   - Keep for brand awareness?

---

**AWAITING CONFIRMATION TO PROCEED**
