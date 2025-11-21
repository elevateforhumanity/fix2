# Corrected Website Audit Report
**Date:** 2025-11-19  
**Repository:** elevateforhumanity/fix2

---

## ✅ ACTUAL PROGRAMS OFFERED

Based on existing program pages, you offer:

1. **Barber / Barber Apprenticeship** (`/programs/barber`, `/programs/barber-apprenticeship`)
2. **Building Maintenance / Building Tech** (`/programs/building-maintenance`, `/programs/building-tech`)
3. **CDL / Truck Driving** (`/programs/cdl`, `/programs/truck-driving`)
4. **HVAC Technician** (`/programs/hvac`, `/programs/hvac-tech`, `/programs/hvac-technician`)
5. **Medical Assistant** (`/programs/medical-assistant`)
6. **Workforce Readiness** (`/programs/workforce-readiness`)

---

## ❌ PROGRAMS TO REMOVE (Not Offered)

### Images to Delete:
```bash
# Remove welding references
rm public/media/programs/welding.jpg
rm public/programs/welding.jpg
rm public/generated-images/ecd-courses/welding-fabrication-cover.png
rm public/images/efh-welding-card.jpg.txt
rm public/images/efh-welding-hero.jpg.txt
rm public/images/DOWNLOAD_welding.txt

# Remove plumbing references
rm public/media/programs/plumbing.jpg
rm public/generated-images/ecd-courses/plumbing-apprenticeship-cover.png

# Remove electrical references
rm public/media/programs/electrical.jpg
rm public/generated-images/ecd-courses/electrical-apprenticeship-cover.png

# Remove culinary references
rm public/media/programs/culinary.jpg
rm public/generated-images/ecd-courses/culinary-arts-cover.png

# Remove IT references
rm public/media/programs/it.jpg
rm public/generated-images/ecd-courses/it-support-apprenticeship-cover.png

# Remove beauty references (unless this is barber)
rm public/media/programs/beauty.jpg
rm public/generated-images/ecd-courses/beauty-career-educator-cover.png
```

---

## 🖼️ GENERIC IMAGES TO REPLACE

### Placeholder Program Images (451 bytes - FAKE SVG)
```
❌ public/programs/cdl.jpg - Replace with real CDL training photo
❌ public/programs/cna.jpg - Delete (CNA not offered)
❌ public/programs/nails.jpg - Delete (Nails not offered)
❌ public/programs/office.jpg - Delete or use for workforce readiness
❌ public/programs/osha.jpg - Delete or use for workforce readiness
❌ public/programs/placeholder.svg - Keep as fallback
```

### Placeholder People Photos (368 bytes - FAKE SVG)
```
❌ public/people/alicia.jpg - Replace with real team photo
❌ public/people/marcus.jpg - Replace with real team photo
❌ public/people/sharon.jpg - Replace with real team photo
❌ public/people/avatar-template.svg - Keep as fallback
```

---

## 🚫 UNAUTHORIZED PARTNER REFERENCES REMOVED

### ✅ Already Removed:
- TrustStrip.tsx - Removed DOL, WorkOne, EmployIndy logos
- ContentAutomation.ts - Removed CompTIA, Microsoft, AWS, AHIMA, HIMSS, Epic, Cerner, PMI, HRCI references

### ⚠️ Still Need to Update:

#### References to DOL/WorkOne/EmployIndy in Content:
```
app/faq/page.tsx:54 - "DOL-approved program"
app/program-holder/mou/page.tsx:123 - "EmployIndy, DOL"
app/program-holder/apply/page.tsx:17 - "EmployIndy"
app/program-holder/apply/page.tsx:188 - "EmployIndy"
app/programs/barber/page.tsx:38-39 - "DOL-approved", "Indiana Department of Labor"
app/programs/barber/page.tsx:83 - "DOL Apprenticeship"
app/programs/barber/page.tsx:162 - "Indiana Department of Labor"
app/programs/barber/page.tsx:177 - "DOL registered apprenticeship"
app/page.tsx:19 - "DOL Apprenticeship"
app/(legal)/privacy/page.tsx:44 - "DOL, DWD"
app/(legal)/privacy/page.tsx:68 - "Department of Labor (DOL)"
app/partners/workforce/page.tsx:27 - "Registered Apprenticeship (DOL)"
app/enroll/page.tsx:38 - "WorkOne / WIOA"
app/enroll/page.tsx:74 - "EmployIndy"
app/enroll/page.tsx:87-88 - "DOL Apprenticeship"
app/enroll/[program]/page.tsx:28-31 - "WorkOne", "EmployIndy", "DOL"
app/enroll/[program]/page.tsx:47 - "EmployIndy"
app/enroll/[program]/page.tsx:307 - "WorkOne Office"
app/enroll/[program]/page.tsx:329 - "WorkOne Region"
app/programs-full/page.tsx:16 - "DOL Registered Apprenticeships"
app/programs-full/page.tsx:195-204 - "DOL & Apprenticeship Indiana"
app/programs-full/page.tsx:375 - "DOL Apprenticeships"
```

**REPLACE WITH:** "Registered Apprenticeship Program" or "State-Approved Apprenticeship" (no specific agency names)

---

## 🔑 REQUIRED API KEYS & ENVIRONMENT VARIABLES

### Priority 1: CRITICAL (Site won't work)

#### Supabase (Database & Auth)
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```
**Get it:** [https://supabase.com/dashboard](https://supabase.com/dashboard)
1. Create account
2. Create new project
3. Settings > API > Copy keys

#### NextAuth (Authentication)
```bash
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=https://elevateforhumanity.org
```
**Generate:**
```bash
openssl rand -base64 32
```

#### Stripe (Payments)
```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```
**Get it:** [https://dashboard.stripe.com/apikeys](https://dashboard.stripe.com/apikeys)

---

### Priority 2: IMPORTANT (Features won't work)

#### OpenAI (AI Features)
```bash
OPENAI_API_KEY=sk-...
```
**Get it:** [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)

#### SendGrid (Email)
```bash
SENDGRID_API_KEY=SG....
SENDGRID_FROM=noreply@elevateforhumanity.org
```
**Get it:** [https://app.sendgrid.com/settings/apikeys](https://app.sendgrid.com/settings/apikeys)

#### Google OAuth (Social Login)
```bash
GOOGLE_CLIENT_ID=...apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-...
```
**Get it:** [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)
1. Create OAuth 2.0 Client ID
2. Add redirect: `https://your-domain.com/api/auth/callback/google

---

### Priority 3: OPTIONAL (Enhanced features)

#### Analytics
```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-...
NEXT_PUBLIC_MIXPANEL_TOKEN=...
NEXT_PUBLIC_FACEBOOK_APP_ID=...
```

#### Video Hosting
```bash
VIMEO_ACCESS_TOKEN=...
WISTIA_API_TOKEN=...
```

#### SMS Notifications
```bash
TWILIO_SID=AC...
TWILIO_TOKEN=...
TWILIO_FROM=+1...
```

---

## 🔗 MISSING ROUTES TO CREATE OR FIX

### Routes Referenced But Don't Exist:
```
/accessibility - Create accessibility statement page
/admin/certificates/bulk - Create bulk certificate issuance page
/cookies - Redirect to /(legal)/cookies
/courses/electrical - Delete references (not offered)
/courses/hvac-systems - Redirect to /programs/hvac
/courses/safety - Delete or create safety training page
/delegate/messages - Create delegate messaging page
/delegate/students - Create delegate student list page
/docs/admins - Create admin documentation
/docs/case-management - Create case management docs
/docs/lms - Create LMS documentation
/docs/program-holders - Create program holder docs
/docs/reporting - Create reporting documentation
/docs/students - Create student documentation
/employee/documents - Create employee documents page
/employee/payroll - Create employee payroll page
/employee/time-off - Create time-off request page
/employer/candidates - Create candidate management page
/employer/jobs - Create job listings page
/employer/mou - Create employer MOU page
/lms - Redirect to /lms/dashboard
/lms/help - Create LMS help page
/lms/support - Create LMS support page
/privacy - Redirect to /(legal)/privacy
/program-holder/cases - Create case management page
/program-holder/reports - Create reports page
/student-portal - Redirect to /student/dashboard
/student/calendar - Create student calendar page
/student/certificates - Create student certificates page
/student/resources - Create student resources page
/support/case-manager - Create case manager support page
/terms - Redirect to /(legal)/terms
/webinars - Create webinars page or delete references
/wioa/case - Create WIOA case management page
```

---

## 📱 PWA MANIFEST FIXES

Update `/public/manifest.json`:

```json
{
  "name": "Elevate for Humanity",
  "short_name": "Elevate",
  "description": "Workforce development and training platform",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#dc2626",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ],
  "categories": ["education", "productivity"]
}
```

**Remove screenshot reference** (file doesn't exist)

---

## 🎯 ACTION PLAN

### STEP 1: Remove Unauthorized Content (1-2 hours)
```bash
# Remove partner references from text
# Update all files listed above to remove DOL, WorkOne, EmployIndy names
# Replace with generic "Registered Apprenticeship" or "State-Approved"

# Delete non-offered program images
rm public/media/programs/welding.jpg
rm public/media/programs/plumbing.jpg
rm public/media/programs/electrical.jpg
rm public/media/programs/culinary.jpg
rm public/media/programs/it.jpg
```

### STEP 2: Replace Generic Images (1-2 days)
- Get real photos for actual programs (CDL, HVAC, Barber, Medical Assistant, Building Maintenance)
- Get real team photos
- Replace 451-byte placeholder files

### STEP 3: Fix Routes (2-4 hours)
- Create missing pages or add redirects
- Update links to correct routes

### STEP 4: Set Up Environment Variables (1 hour)
- Supabase
- Stripe
- NextAuth
- OpenAI
- SendGrid

### STEP 5: Fix PWA Manifest (15 minutes)
- Update icon references
- Remove screenshot reference

---

## 📊 SUMMARY

| Category | Count | Status |
|----------|-------|--------|
| Actual Programs | 6 | ✅ Correct |
| Programs to Remove | 5+ | ❌ Delete images |
| Fake Program Images | 6 | ❌ Replace |
| Fake People Photos | 3 | ❌ Replace |
| Partner References | 25+ | ❌ Remove names |
| Missing Routes | 35+ | ⚠️ Create or redirect |
| Missing API Keys | 10+ | 🔴 Critical |

---

## 🚀 IMMEDIATE ACTIONS

1. **Remove partner names** from all content (replace with generic terms)
2. **Delete images** for programs not offered (welding, plumbing, electrical, culinary, IT)
3. **Replace placeholder images** with real photos
4. **Set up Supabase** and other critical API keys
5. **Create or redirect** missing routes

---

**Estimated Time:** 1 week (3-4 days active work)

**Report by:** Ona AI Assistant
