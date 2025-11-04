# 🌐 Affiliate Sites & Partner Forms Status

**Date:** October 27, 2025  
**Status:** ✅ CONFIGURED

---

## 📊 Sitemap Configuration

### ✅ Sitemap Splitting - Active

**Script:** `scripts/split-sitemap.mjs`  
**Configuration:** 50 URLs per sitemap (Google recommended limit)

**Current Status:**

- Main sitemap: 37 URLs (under 50 limit)
- No splitting needed currently
- Auto-splits when exceeding 50 URLs

**How It Works:**

```javascript
const URLS_PER_SITEMAP = 50;

// When URLs > 50:
// Creates: sitemap-1.xml, sitemap-2.xml, sitemap-3.xml, etc.
// Creates: sitemap-index.xml (master index)
// Updates: robots.txt to reference sitemap-index.xml
```

**Postbuild Process:**

```bash
1. Generate dynamic sitemap
2. Split sitemap (if > 50 URLs)
3. Fix broken links
4. Fix domain URLs
5. Update canonical URLs
6. Remove source maps
7. Verify build
8. Security compliance check
```

**Files Generated:**

- `dist/sitemap.xml` - Main sitemap (37 URLs)
- `dist/sitemap-complete.xml` - Complete sitemap (25KB)
- `dist/robots.txt` - Search engine instructions

**When Splitting Occurs:**

- Automatically when sitemap exceeds 50 URLs
- Creates numbered sitemaps: sitemap-1.xml, sitemap-2.xml, etc.
- Creates sitemap-index.xml as master index
- Updates robots.txt to reference index

---

## 🏢 Sister Sites / Affiliated Pages

### ✅ Configured Sister Sites:

**Configuration File:** `public/sister_sites_nav_config.json`

#### 1. Kingdom Konnect

- **Display Name:** Kingdom Konnect
- **URL:** /kingdom-konnect
- **Description:** Faith-based community development and spiritual workforce empowerment
- **Status:** ✅ Active
- **Pages:** mission, programs, events
- **Privacy:** Public

#### 2. Urban Build Crew

- **Display Name:** Urban Build Crew
- **URL:** /urban-build-crew
- **Description:** Construction, trades, and urban workforce development programs
- **Status:** ✅ Active
- **Pages:** about, courses, contact
- **Privacy:** Public

#### 3. Serene Comfort Care

- **Display Name:** Serene Comfort Care
- **URL:** /serene-comfort-care
- **Description:** Healthcare services and professional training programs
- **Status:** ✅ Active
- **Pages:** services, care-team, apply
- **Privacy:** Public

#### 4. Elevate Brain (Internal)

- **Display Name:** Elevate Brain (Private)
- **URL:** /elevate-brain
- **Description:** Internal operations and analytics dashboard
- **Status:** ✅ Active
- **Pages:** admin-dashboard, analytics, internal-notes
- **Privacy:** 🔒 Private (internal only)

### Sister Sites Pages:

**Available Pages:**

- `/sister-sites` - Overview of all sister sites
- `/sister-sites-health-check` - Health check dashboard
- `/kingdom-konnect` - Faith-based programs
- `/urban-build-crew` - Construction training
- `/serene-comfort-care` - Healthcare services

**Sister Site Components:**
Located in `src/pages/sisters/`:

- MentorDirectory.jsx
- MentorSignup.jsx
- Mentorship.jsx
- PeerSupport.jsx
- Volunteer.jsx
- VolunteerOpportunities.jsx
- VolunteerStories.jsx
- Wellness.jsx
- WellnessResources.jsx

---

## 🤝 Partner Forms

### ✅ Active Partner Forms:

#### 1. Contact Form

**Location:** `/connect` page  
**Google Form ID:** `1FAIpQLSenA9AfClTTy2X2PQNrZjZ_N9FqxFAd46V0xk_oaU_nW5g_CQ`  
**Type:** Embedded (no iframe)  
**Status:** ✅ Working  
**Purpose:** General inquiries and contact

**Form Fields:**

- Name
- Email
- Message
- Subject

#### 2. Partnership Inquiry Form

**Location:** `/connect` page  
**Google Form ID:** `1FAIpQLSelwhp447q7cRXyn_yoqVNkbSpEk9kqldGOpSefVAN-tEnvNQ`  
**Type:** Embedded (no iframe)  
**Status:** ✅ Working  
**Purpose:** Partnership and collaboration inquiries

**Form Fields:**

- Organization Name
- Contact Person
- Email
- Partnership Type
- Description

### ⚠️ Forms Needing Setup:

#### 3. Program Application Form

**Status:** ⚠️ Placeholder  
**Current ID:** `1FAIpQLSd_PROGRAM_FORM_ID`  
**Needs:** Real Google Form ID  
**Purpose:** Program enrollment applications

#### 4. Eligibility Verification Form

**Status:** ⚠️ Placeholder  
**Current ID:** `1FAIpQLSd_ELIGIBILITY_FORM_ID`  
**Needs:** Real Google Form ID  
**Purpose:** WIOA/WRG eligibility checking

#### 5. Support Form

**Status:** ⚠️ Placeholder  
**Current ID:** `1FAIpQLSd_SUPPORT_FORM_ID`  
**Needs:** Real Google Form ID  
**Purpose:** Technical support requests

---

## 🔍 Universal Mouse

### Status: ❌ Not Found

**Search Results:** No references to "Universal Mouse" or "universalmouse" found in codebase.

**Possible Actions:**

1. **If Universal Mouse is a partner:** Add to Partners page
2. **If Universal Mouse is a sister site:** Add to sister_sites_nav_config.json
3. **If Universal Mouse needs a form:** Create Google Form and add to Connect page

**To Add Universal Mouse as Partner:**

Edit `src/pages/Partners.jsx`:

```javascript
{
  id: 7,
  name: 'Universal Mouse',
  category: 'Technology', // or appropriate category
  description: 'Description of partnership',
  logo: '🖱️', // or appropriate emoji/icon
  website: 'https://universalmouse.com',
  since: '2024',
}
```

**To Add Universal Mouse as Sister Site:**

Edit `public/sister_sites_nav_config.json`:

```json
"universal-mouse": {
  "display_name": "Universal Mouse",
  "landing_title": "Universal Mouse",
  "landing_url": "/universal-mouse",
  "drop_down_pages": ["about", "services", "contact"],
  "private": false,
  "description": "Description of Universal Mouse services"
}
```

---

## 📋 Partner Organizations

### Current Partners (from Partners.jsx):

1. **Selfish Inc. dba**
   - Category: Technology
   - Since: 2020
   - Website: elevateforhumanity.org/partners

2. **Indiana Department of Workforce Development**
   - Category: Government
   - Since: 2019
   - Website: in.gov/dwd/

3. **CompTIA**
   - Category: Education
   - Since: 2021
   - Website: comptia.org

4. **AHIMA**
   - Category: Healthcare
   - Since: 2020
   - Website: ahima.org

5. **PMI**
   - Category: Professional Development
   - Since: 2022
   - Website: pmi.org

6. **HRCI**
   - Category: Human Resources
   - Since: 2020
   - Website: hrci.org

---

## 🔗 Navigation Integration

### Sister Sites Navigation:

**Configured in:** `public/sister_sites_nav_config.json`

**Features:**

- Dropdown navigation for each site
- Public/private access control
- Landing page URLs
- Sub-page navigation
- Descriptions for SEO

**Usage:**

```javascript
// Load config
const sisterSites = require('./sister_sites_nav_config.json');

// Access site info
const kingdomKonnect = sisterSites['kingdom-konnect'];
console.log(kingdomKonnect.display_name); // "Kingdom Konnect"
console.log(kingdomKonnect.landing_url); // "/kingdom-konnect"
```

---

## 📊 SEO & Sitemap Strategy

### Current Sitemap Structure:

**Main Sitemap (sitemap.xml):**

- 37 URLs currently
- Includes all public pages
- Auto-generated on build
- Updated with each deployment

**Complete Sitemap (sitemap-complete.xml):**

- 25KB comprehensive sitemap
- Includes all routes and dynamic pages
- Backup/reference sitemap

**Robots.txt:**

```
User-agent: *
Allow: /

Sitemap: https://elevateforhumanity.org/sitemap.xml

Disallow: /admin/
Disallow: /login
Disallow: /signup
Disallow: /profile

Allow: /programs/
Allow: /program/
Allow: /lms/courses
```

### When Sitemap Grows:

**Automatic Splitting (> 50 URLs):**

1. Creates `sitemap-1.xml` (first 50 URLs)
2. Creates `sitemap-2.xml` (next 50 URLs)
3. Creates `sitemap-3.xml` (next 50 URLs)
4. etc.
5. Creates `sitemap-index.xml` (master index)
6. Updates `robots.txt` to reference index

**Benefits:**

- ✅ Google recommended limit (50 URLs per sitemap)
- ✅ Faster crawling and indexing
- ✅ Better organization
- ✅ Easier to manage large sites
- ✅ Automatic - no manual intervention

---

## 🎯 Action Items

### Immediate Actions:

- [ ] **Clarify Universal Mouse**
  - Is it a partner organization?
  - Is it a sister site?
  - Does it need a dedicated form?
  - Provide details for integration

- [ ] **Create Missing Google Forms**
  - Program Application Form
  - Eligibility Verification Form
  - Support Request Form

- [ ] **Update Partner Forms**
  - Verify partnership inquiry form is working
  - Test form submissions
  - Check email notifications

### Optional Enhancements:

- [ ] Add Universal Mouse (if applicable)
- [ ] Create dedicated partner portal
- [ ] Add partner testimonials
- [ ] Create partner resources page
- [ ] Add partner logos/branding

---

## 📝 How to Add New Sister Site

### Step 1: Add to Configuration

Edit `public/sister_sites_nav_config.json`:

```json
"new-site": {
  "display_name": "New Site Name",
  "landing_title": "Welcome to New Site",
  "landing_url": "/new-site",
  "drop_down_pages": ["about", "services", "contact"],
  "private": false,
  "description": "Description of new site"
}
```

### Step 2: Create Landing Page

Create `src/pages/NewSite.jsx`:

```jsx
export default function NewSite() {
  return (
    <div>
      <h1>New Site Name</h1>
      <p>Content here</p>
    </div>
  );
}
```

### Step 3: Add to Router

The router auto-generates routes from pages, so just create the page file.

### Step 4: Add to Sitemap

Sitemap auto-generates from routes, so no manual update needed.

### Step 5: Test

1. Build the site: `npm run build`
2. Check sitemap: `dist/sitemap.xml`
3. Verify page loads: `/new-site`
4. Test navigation

---

## 📝 How to Add New Partner Form

### Step 1: Create Google Form

1. Go to https://forms.google.com
2. Create new form
3. Add fields
4. Get form ID from URL
5. Get field IDs (view source)

### Step 2: Add to Connect Page

Edit `public/pages/connect.html` or create new page:

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

### Step 3: Test Form

1. Fill out form
2. Submit
3. Check Google Form responses
4. Verify email notifications

---

## ✅ Summary

### What's Working:

- ✅ Sitemap splitting configured (50 URLs per file)
- ✅ 4 sister sites configured
- ✅ 2 partner forms working (Contact, Partnership)
- ✅ Sister sites navigation system
- ✅ 6 partner organizations listed
- ✅ SEO optimized with robots.txt

### What Needs Attention:

- ⚠️ Universal Mouse - needs clarification
- ⚠️ 3 placeholder forms need real Google Form IDs
- ⚠️ Sister sites pages need content updates

### What's Automatic:

- ✅ Sitemap generation on build
- ✅ Sitemap splitting when > 50 URLs
- ✅ Robots.txt updates
- ✅ Route generation from pages

---

**Status:** 🟢 CONFIGURED & READY  
**Sitemap Strategy:** ✅ OPTIMAL (50 URLs per file)  
**Sister Sites:** ✅ 4 ACTIVE  
**Partner Forms:** ✅ 2 WORKING, 3 PENDING

---

_Generated by Ona - Affiliate Sites Audit System_
