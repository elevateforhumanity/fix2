# 🎯 COMPREHENSIVE CONTENT UPDATE PLAN

## Requirements Summary

### 1. **NO Gradient Overlays or Text on Hero Banners**
- Remove all `bg-gradient` overlays from hero sections
- Remove all text overlays on hero images/videos
- Clean, professional hero presentation

### 2. **Homepage Updates**
- ✅ Hero video (no overlay, no text) - DONE
- Add 3 program highlights with pictures
- Full storytelling content
- Inspirational tone
- Depth and detail

### 3. **Program Pages Requirements**
Each program page must include:
- **Duration**: How long the program takes
- **Jobs**: What jobs graduates can get
- **Description**: Full detailed program description
- **Highlights**: Key program features with images
- **Funding**: How it's funded (WIOA, grants, etc.)
- **Hybrid Learning**: Online + in-person details
- **Inspirational tone**: Success stories, transformation
- **NO gradient overlays on heroes**
- **NO text on hero banners**

### 4. **Marketing Pages**
Every marketing page must:
- Tell a complete story
- Full depth and detail
- Inspirational tone
- Contact information prominent
- No generic content

---

## 📋 PAGES TO UPDATE

### **Homepage** (`/app/page.tsx`)
**Current Issues:**
- References deleted gallery images (image1.jpg, image2.jpg, etc.)
- Needs 3 program highlights with pictures
- Needs more depth

**Required Changes:**
1. Replace gallery images with actual available images:
   - Use `/images/facilities-new/facility-*.jpg`
   - Use `/images/artlist/hero-training-*.jpg`
   - Use `/images/heroes/*.jpg`

2. Add 3 Program Highlights Section:
   ```
   - CNA Program (with image)
   - HVAC Program (with image)  
   - Barber Program (with image)
   ```

3. Expand storytelling:
   - Mission and vision
   - Who we serve
   - Success stories
   - Community impact

---

### **Program Pages** (30+ pages)

#### **CNA Program** (`/app/programs/cna/page.tsx`)
**Current Status:** Has hero image, needs content expansion

**Add:**
- **Duration**: 4-6 weeks, 75 hours clinical + classroom
- **Jobs**: CNA in hospitals, nursing homes, home health ($28K-35K/year)
- **Description**: Full program details, what students learn
- **Highlights**: 3-4 key features with images
- **Funding**: 100% WIOA funded, no cost to students
- **Hybrid**: Online theory + in-person clinical training
- **Remove**: Gradient overlay from hero

#### **HVAC Program** (`/app/programs/hvac/page.tsx`)
**Current Status:** Has video hero, needs content expansion

**Add:**
- **Duration**: 8-12 weeks, EPA certification included
- **Jobs**: HVAC Technician ($40K-60K/year), high demand
- **Description**: Heating, cooling, refrigeration systems
- **Highlights**: EPA 608 certification, hands-on training, job placement
- **Funding**: WIOA, Workforce Ready Grants
- **Hybrid**: Online coursework + hands-on lab training
- **Remove**: Gradient overlay from hero

#### **Barber Program** (`/app/programs/barber/page.tsx`)
**Current Status:** Has video hero, needs content expansion

**Add:**
- **Duration**: 1500 hours apprenticeship (9-12 months)
- **Jobs**: Licensed Barber ($30K-50K+/year), own shop potential
- **Description**: Hair cutting, styling, sanitation, business skills
- **Highlights**: Earn while you learn, state licensure, mentorship
- **Funding**: DOL apprenticeship funding
- **Hybrid**: Apprenticeship model - work in real barbershop
- **Remove**: Gradient overlay from hero

#### **Medical Assistant** (`/app/programs/medical-assistant/page.tsx`)
**Add:**
- **Duration**: 8-10 weeks
- **Jobs**: Medical Assistant in clinics, hospitals ($32K-40K/year)
- **Description**: Clinical and administrative medical office skills
- **Highlights**: Certification prep, externship, job placement
- **Funding**: WIOA, healthcare workforce grants
- **Hybrid**: Online + clinical externship

#### **CDL/Truck Driving** (`/app/programs/cdl/page.tsx`)
**Add:**
- **Duration**: 4-6 weeks
- **Jobs**: Commercial Truck Driver ($45K-70K/year)
- **Description**: Class A CDL training, safety, regulations
- **Highlights**: CDL license, job placement, high demand
- **Funding**: WIOA, transportation grants
- **Hybrid**: Classroom + behind-the-wheel training

#### **Business Startup** (`/app/programs/business-startup-marketing/page.tsx`)
**Add:**
- **Duration**: 6-8 weeks
- **Jobs**: Entrepreneur, small business owner, marketing specialist
- **Description**: Business planning, marketing, financial management
- **Highlights**: Business plan development, mentorship, funding resources
- **Funding**: WIOA, entrepreneurship grants
- **Hybrid**: Online modules + in-person workshops

#### **Tax Preparation** (`/app/programs/tax-prep/page.tsx`)
**Add:**
- **Duration**: 8-10 weeks
- **Jobs**: Tax Preparer, VITA volunteer ($30K-50K/year)
- **Description**: Tax law, IRS regulations, software training
- **Highlights**: IRS certification, VITA site placement, seasonal income
- **Funding**: WIOA, financial services grants
- **Hybrid**: Online coursework + practical tax preparation

---

### **Marketing Pages**

#### **About Page** (`/app/about/page.tsx`)
**Add:**
- Founder story (Elizabeth Greene)
- Mission and vision
- Team photos and bios
- Community impact statistics
- Success stories
- Contact information

#### **Apply Page** (`/app/apply/page.tsx`)
**Add:**
- Step-by-step application process
- Eligibility requirements
- Funding information
- What to expect
- Success stories
- Contact for help

#### **Contact Page** (`/app/contact/page.tsx`)
**Add:**
- Multiple contact methods
- Office locations
- Hours of operation
- Staff directory
- FAQ section
- Map/directions

#### **Success Stories** (if exists)
**Add:**
- Real graduate stories
- Before/after transformations
- Current jobs and salaries
- Photos of graduates
- Video testimonials

---

## 🎨 DESIGN REQUIREMENTS

### Hero Banners
```tsx
// ❌ OLD (with gradient and text)
<section className="relative h-[600px]">
  <Image src="..." />
  <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80" />
  <div className="absolute inset-0 flex items-center">
    <h1>Program Title</h1>
  </div>
</section>

// ✅ NEW (clean, no overlay, no text)
<section className="relative h-[600px]">
  <Image src="..." />
</section>
```

### Program Highlights
```tsx
<section className="py-16">
  <h2>Program Highlights</h2>
  <div className="grid md:grid-cols-3 gap-8">
    {/* Highlight 1 */}
    <div>
      <Image src="/images/..." />
      <h3>Highlight Title</h3>
      <p>Detailed description...</p>
    </div>
    {/* Repeat for 3-4 highlights */}
  </div>
</section>
```

### Program Details Section
```tsx
<section className="py-16">
  <div className="grid md:grid-cols-2 gap-12">
    <div>
      <h3>Program Duration</h3>
      <p>4-6 weeks, 75 hours total...</p>
      
      <h3>Career Opportunities</h3>
      <ul>
        <li>CNA in hospitals ($28K-35K/year)</li>
        <li>Nursing home care</li>
        <li>Home health aide</li>
      </ul>
      
      <h3>What You'll Learn</h3>
      <p>Detailed curriculum...</p>
    </div>
    
    <div>
      <h3>Funding</h3>
      <p>100% funded through WIOA...</p>
      
      <h3>Hybrid Learning</h3>
      <p>Online theory + in-person clinical...</p>
      
      <h3>Job Placement</h3>
      <p>We don't stop until you're hired...</p>
    </div>
  </div>
</section>
```

---

## 📝 CONTENT TONE GUIDELINES

### Inspirational Language
- "Transform your life"
- "Break the cycle"
- "Build a better future"
- "We believe in you"
- "Your past doesn't define you"
- "Real jobs, real credentials, real hope"

### Depth and Detail
- Specific numbers (hours, weeks, salary ranges)
- Real job titles and employers
- Actual certification names
- Step-by-step processes
- Success metrics

### Storytelling Elements
- Who we serve (justice-involved, low-income, career changers)
- Why we exist (breaking barriers, second chances)
- How we're different (100% free, job placement, wraparound support)
- What success looks like (real graduate stories)

---

## 🚀 IMPLEMENTATION PRIORITY

### Phase 1: Critical Pages (Do First)
1. Homepage - 3 program highlights
2. CNA program page
3. HVAC program page
4. Barber program page

### Phase 2: High Priority
5. Medical Assistant program
6. CDL program
7. About page
8. Apply page

### Phase 3: Remaining Programs
9-30. All other program pages

### Phase 4: Marketing Pages
31. Contact page
32. Success stories
33. Funding pages
34. Partner pages

---

## 📊 AVAILABLE IMAGES TO USE

### Facilities
- `/images/facilities-new/facility-1.jpg` through `facility-20.jpg`

### Team
- `/images/team/founder/elizabeth-greene-founder-hero-01.jpg`
- `/images/team/instructors/instructor-*.jpg` (13 images)

### Heroes
- `/images/heroes/hero-homepage.jpg`
- `/images/heroes/hero-employers.jpg`
- `/images/heroes/hero-federal-funding.jpg`
- Plus 40+ more hero images

### Artlist Professional
- `/images/artlist/hero-training-1.jpg` through `hero-training-8.jpg`
- Plus cropped variations

### Program-Specific
- `/images/beauty/hero-program-barber.jpg`
- `/images/healthcare/` (various)
- `/images/business/` (various)

---

## ✅ CHECKLIST FOR EACH PAGE

- [ ] Remove gradient overlay from hero
- [ ] Remove text overlay from hero
- [ ] Add program duration
- [ ] Add job opportunities with salaries
- [ ] Add detailed description
- [ ] Add 3-4 highlights with images
- [ ] Add funding information
- [ ] Add hybrid learning details
- [ ] Use inspirational tone
- [ ] Add contact information
- [ ] Tell complete story
- [ ] Use real available images (no gallery references)

---

## 🎯 NEXT STEPS

1. Start with homepage - add 3 program highlights
2. Update CNA, HVAC, Barber pages (top 3 programs)
3. Remove all gradient overlays
4. Expand all content with depth and detail
5. Ensure inspirational tone throughout
6. Test all image references
7. Verify no broken links

This is a comprehensive content rewrite affecting 30+ pages. Estimated time: 4-6 hours for complete implementation.
