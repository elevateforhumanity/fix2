# 📞 Contact Information & Forms Update

**Primary Phone:** (317) 314-3757  
**Organization:** Elevate for Humanity / 2Exclusive LLC  
**Location:** Indianapolis, IN

---

## ✅ Phone Number Verified

**Current Phone Number:** (317) 314-3757

**Found in:**

- CREDENTIALING_PARTNERS_REPORT.md
- Washington Square Workforce Hub Proposal
- ETPL Multi-State Proposal
- State Contracting Documentation

**Status:** ✅ Consistent across all documentation

---

## 📝 Google Forms Configuration

### Current Setup

**Environment Variable:** `VITE_APPLICATION_FORM_URL`

**Used in:**

1. `src/components/ProgramCard.tsx` - Program application buttons
2. `src/layouts/SiteLayout.tsx` - Header "Apply Now" button
3. `src/pages/EFHLanding.tsx` - Landing page CTA
4. `src/pages/ProgramPage.tsx` - Program detail applications
5. `src/pages/ProgramDetail.tsx` - Individual program pages

**Default Fallback:** `/apply` (if environment variable not set)

---

## 🔧 Forms Implementation Status

### ✅ Non-iframe Forms (Embedded)

**Location:** `dist/pages/connect.html` and `public/pages/connect.html`

**Working Forms:**

1. **Contact Form**
   - Action: `https://docs.google.com/forms/d/e/1FAIpQLSenA9AfClTTy2X2PQNrZjZ_N9FqxFAd46V0xk_oaU_nW5g_CQ/formResponse`
   - Method: POST
   - Fields: Name, Email, Message
   - Status: ✅ Embedded (no iframe)

2. **Partnership Inquiry Form**
   - Action: `https://docs.google.com/forms/d/e/1FAIpQLSelwhp447q7cRXyn_yoqVNkbSpEk9kqldGOpSefVAN-tEnvNQ/formResponse`
   - Method: POST
   - Fields: Organization, Contact, Interest
   - Status: ✅ Embedded (no iframe)

### ⚠️ Placeholder Forms (Need Real Form IDs)

**Location:** Various pages

1. **Program Application Form**
   - Current: `1FAIpQLSd_PROGRAM_FORM_ID`
   - Status: ⚠️ Placeholder - needs real form ID
   - Files: `dist/pages/programs.html`, `public/pages/programs.html`

2. **Eligibility Verification Form**
   - Current: `1FAIpQLSd_ELIGIBILITY_FORM_ID`
   - Status: ⚠️ Placeholder - needs real form ID
   - Files: `dist/pages/eligibility-verification.html`, `public/pages/eligibility-verification.html`

3. **Support Form**
   - Current: `1FAIpQLSd_SUPPORT_FORM_ID`
   - Status: ⚠️ Placeholder - needs real form ID
   - Files: `dist/pages/account.html`, `public/pages/account.html`

### ❌ iframe Forms (Need to Remove)

**Location:** `dist/pages/elevate-store.html` and `public/pages/elevate-store.html`

**Issues:**

- 3 iframes found in store page
- iframes are not accessible
- iframes can break on mobile
- iframes don't work well with responsive design

**Recommendation:** Replace with embedded forms (POST method)

---

## 🎯 Action Items

### 1. Create Missing Google Forms

You need to create these forms in Google Forms:

#### Program Application Form

1. Go to https://forms.google.com
2. Create new form: "Program Application"
3. Add fields:
   - Full Name (required)
   - Email (required)
   - Phone (required)
   - Program of Interest (dropdown)
   - How did you hear about us?
   - Additional information (paragraph)
4. Get form ID from URL
5. Update placeholder: `1FAIpQLSd_PROGRAM_FORM_ID`

#### Eligibility Verification Form

1. Create new form: "Eligibility Check"
2. Add fields:
   - Full Name (required)
   - Email (required)
   - Phone (required)
   - Employment Status (multiple choice)
   - Income Level (multiple choice)
   - Program Interest (dropdown)
3. Get form ID
4. Update placeholder: `1FAIpQLSd_ELIGIBILITY_FORM_ID`

#### Support Form

1. Create new form: "Support Request"
2. Add fields:
   - Name (required)
   - Email (required)
   - Issue Type (dropdown)
   - Description (paragraph)
   - Priority (multiple choice)
3. Get form ID
4. Update placeholder: `1FAIpQLSd_SUPPORT_FORM_ID`

### 2. Update Environment Variables

Add to Netlify environment variables:

```bash
VITE_APPLICATION_FORM_URL=https://docs.google.com/forms/d/e/YOUR_REAL_FORM_ID/viewform
```

### 3. Replace iframe Forms

**Current (iframe - BAD):**

```html
<iframe src="https://docs.google.com/forms/..."></iframe>
```

**Replace with (embedded - GOOD):**

```html
<form
  action="https://docs.google.com/forms/d/e/FORM_ID/formResponse"
  method="POST"
  target="_blank"
>
  <input type="text" name="entry.FIELD_ID" placeholder="Name" required />
  <input type="email" name="entry.FIELD_ID" placeholder="Email" required />
  <textarea name="entry.FIELD_ID" placeholder="Message" required></textarea>
  <button type="submit">Submit</button>
</form>
```

---

## 📋 How to Get Google Form Field IDs

1. Open your Google Form
2. Click "Send" → Get link
3. Copy the form URL
4. Open form in browser
5. Right-click → "View Page Source"
6. Search for `entry.` to find field IDs
7. Example: `entry.123456789` is the field ID for that input

**Field ID Format:**

- Name field: `entry.123456789`
- Email field: `entry.987654321`
- Message field: `entry.456789123`

---

## ✅ Working Example (Connect Page)

**File:** `src/pages/Connect.tsx` or `public/pages/connect.html`

```html
<form
  action="https://docs.google.com/forms/d/e/1FAIpQLSenA9AfClTTy2X2PQNrZjZ_N9FqxFAd46V0xk_oaU_nW5g_CQ/formResponse"
  method="POST"
  target="_blank"
  class="contact-form"
>
  <input type="text" name="entry.1234567890" placeholder="Your Name" required />
  <input
    type="email"
    name="entry.0987654321"
    placeholder="Your Email"
    required
  />
  <textarea
    name="entry.1122334455"
    placeholder="Your Message"
    rows="5"
    required
  ></textarea>
  <button type="submit" class="btn">Send Message</button>
</form>
```

**Benefits:**

- ✅ No iframe
- ✅ Fully accessible
- ✅ Mobile responsive
- ✅ Can be styled with CSS
- ✅ Works with form validation
- ✅ Opens in new tab on submit

---

## 🔍 Files That Need Updates

### High Priority

1. **public/pages/elevate-store.html**
   - Remove 3 iframes
   - Replace with embedded forms
   - Add proper form styling

2. **public/pages/programs.html**
   - Update `1FAIpQLSd_PROGRAM_FORM_ID` with real form ID
   - Verify form fields match Google Form

3. **public/pages/eligibility-verification.html**
   - Update `1FAIpQLSd_ELIGIBILITY_FORM_ID` with real form ID
   - Add all required fields

4. **public/pages/account.html**
   - Update `1FAIpQLSd_SUPPORT_FORM_ID` with real form ID
   - Add support ticket fields

### Medium Priority

5. **src/pages/lms/LessonPage.tsx**
   - Has iframe for lesson content
   - Consider if this is necessary
   - May be okay for video embeds

### Low Priority

6. **dist/** files
   - These are generated from public/
   - Will update automatically on next build

---

## 📱 Contact Information Display

### Recommended Footer Addition

Add to `src/layouts/SiteLayout.tsx` footer:

```tsx
<div>
  <h4 className="font-semibold text-brand-text mb-3">Contact</h4>
  <ul className="space-y-2 text-sm text-brand-text-muted">
    <li>
      <a href="tel:+13173143757" className="hover:text-brand-600">
        📞 (317) 314-3757
      </a>
    </li>
    <li>
      <a
        href="mailto:info@elevateforhumanity.org"
        className="hover:text-brand-600"
      >
        ✉️ info@elevateforhumanity.org
      </a>
    </li>
    <li>
      <span>📍 Indianapolis, IN</span>
    </li>
  </ul>
</div>
```

---

## 🎯 Summary

### ✅ What's Working

- Phone number (317) 314-3757 is consistent
- 2 embedded forms on Connect page (no iframes)
- Environment variable setup for application form URL

### ⚠️ What Needs Fixing

- 3 placeholder form IDs need real Google Form IDs
- 3 iframes in store page need to be replaced
- Contact information not in footer

### 📝 Next Steps

1. Create 3 missing Google Forms
2. Get form IDs and field IDs
3. Update placeholder form IDs
4. Replace iframe forms with embedded forms
5. Add contact info to footer
6. Test all forms
7. Rebuild and deploy

---

**Status:** ⚠️ NEEDS UPDATES  
**Priority:** HIGH (for cloning)  
**Estimated Time:** 1-2 hours

---

_Generated by Ona - Contact Information Audit_
