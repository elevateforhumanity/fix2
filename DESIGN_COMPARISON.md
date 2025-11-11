# Design Comparison: Durable vs Current LMS Site

## Overview
Comparing elevateforhumanity.org (Durable marketing site) with elevateconnectsdirectory.org (current LMS site) to identify design elements to match.

---

## DURABLE SITE (elevateforhumanity.org)
**Purpose:** Marketing website for funding programs
**Platform:** Durable.co
**Style:** Clean, professional, marketing-focused

### Design Elements:

#### 1. Hero Section
```
- Title: "Ignite Your Future: Fund Training Today"
- Subtitle: "Empower Dreams: Support Skills Development and Transform Lives at Elevate for Humanity. Invest in Growth, Today! Marion County."
- CTA Button: "Sign up now"
- Image Carousel: 3 rotating images
  * Black businessman talking to entrepreneurs
  * Webinar E-learning Skills
  * Corporate Training Presentation
```

#### 2. Navigation
```
- Blog
- About
- Contact
- Services
- FAQ
```

#### 3. Mission Section
```
Title: "Empowering Futures Through Skill Development"
Content: "At Elevate for Humanity Career and Technical Institute, we are dedicated to bridging the gap between education and employment by funding innovative apprenticeship and training programs. Located in Marion County, IN, our mission is to empower individuals with the skills they need to excel in today's dynamic workforce. By investing in human potential, we aim to transform lives and build a more skilled, sustainable community. Join us as we pave the way for brighter futures through quality education and hands-on experience."
Image: Training and skill development concept
```

#### 4. Apprenticeships Section
```
Title: "Empower Growth Through Apprenticeships"
Content: "Unlock your potential with transformative apprenticeship and training programs at Elevate for Humanity Career and Technical Institute. Located in Marion County, we empower individuals with the skills needed for a thriving future. Join us in advancing careers and communities through education and opportunity. Together, let's build a brighter tomorrow."
Badge: "Future Secured"
```

#### 5. Testimonials Section
```
Title: "Partnering For Futures: Testimonials That Inspire"
Subtitle: "Transforming futures through hands-on learning and career pathways, Elevate for Humanity empowers every individual to thrive professionally."

Testimonial 1 - Jordan Lee:
"The support from Elevate for Humanity has been transformative. Their funding allowed me to enroll in a high-quality apprenticeship program, setting me on a path to a fulfilling career. Their dedication to student success is unmatched."

Testimonial 2 - Alex Morgan:
"Elevate for Humanity provided essential funding that opened doors to my dream apprenticeship. Their commitment to empowering individuals with career opportunities is truly inspiring, and their support has been pivotal in advancing my professional journey."

Testimonial 3 - Taylor Rivers:
"Elevate for Humanity's funding was a game-changer for me. It enabled my participation in an incredible training program that propelled my career forward. Their unwavering support and commitment to individual growth are exceptional. I am deeply grateful for their contribution to my success."
```

#### 6. CTA Section
```
Title: "Empower Your Future Today"
Content: "Join our transformative programs and unlock career opportunities that align with industry demands. Flexible, grant-funded options mean more possibilities for growth. Elevate your skills with us!"
Button: "Explore Programs" (links to Google Form)
```

#### 7. Contact Form
```
Title: "Connect With Us Today"
Subtitle: "Reach out to Elevate for Humanity for program funding assistance in Marion County, IN."
Fields:
- Name
- Email
- Message
Button: "Submit Inquiry"
reCAPTCHA protected
```

#### Color Scheme:
```
- Primary: Professional blues/teals
- Backgrounds: White, light grays
- Text: Dark gray/black
- Accents: Bright colors for CTAs
```

---

## CURRENT LMS SITE (elevateconnectsdirectory.org)
**Purpose:** Student portal / LMS application
**Platform:** Netlify (React app)
**Style:** Docebo-inspired, gradient-heavy, modern

### Design Elements:

#### 1. Hero Section (Home.jsx)
```
- Title: "Workforce Training That Leads to Real Jobs"
- Subtitle: "Learn with state-aligned programs, access WIOA/WRG/JRI funding, and step into paid apprenticeships and employment."
- CTA Buttons: "Explore Programs" + "Start Application"
- Background: Gradient (brand colors)
- No image carousel
```

#### 2. Navigation
```
- Standard LMS navigation
- Different from Durable site
```

#### 3. Trust Metrics Section
```
- WIOA / WRG Eligible
- Earn While You Learn
- Employer Placement
```

#### 4. Featured Programs
```
- Barber Apprenticeship
- Building Maintenance Technician
- Healthcare CNA/QMA
(Program cards with details)
```

#### 5. Outcomes Section
```
- 92% Job Placement Rate
- Average Time to Employment: 45 days
- Students Served Annually: 500+
- Employer Partners: 75+
```

#### 6. NO Testimonials Section
❌ Missing from current site

#### 7. NO Image Carousel
❌ Missing from current site

#### 8. NO Contact Form
❌ Missing from current site

#### Color Scheme:
```
- Primary: Docebo blue gradients
- Backgrounds: White, light surface colors
- Text: Dark
- Accents: Gradient overlays
```

---

## KEY DIFFERENCES TO ADDRESS

### Missing Elements on LMS Site:

1. ❌ **Image Carousel/Slider**
   - Durable has 3 rotating hero images
   - LMS has static gradient background

2. ❌ **Testimonials Section**
   - Durable has 3 testimonials with photos
   - LMS has none

3. ❌ **Contact Form**
   - Durable has full contact form at bottom
   - LMS has none

4. ❌ **Different Hero Copy**
   - Durable: "Ignite Your Future: Fund Training Today"
   - LMS: "Workforce Training That Leads to Real Jobs"

5. ❌ **Different Mission Copy**
   - Durable focuses on "funding programs"
   - LMS focuses on "workforce training"

6. ❌ **Navigation Differences**
   - Durable: Blog, About, Contact, Services, FAQ
   - LMS: Different navigation structure

### Style Differences:

1. **Background Approach**
   - Durable: Clean white backgrounds with images
   - LMS: Gradient backgrounds, more modern

2. **Typography**
   - Durable: More traditional, marketing-focused
   - LMS: More modern, tech-focused

3. **Layout**
   - Durable: Simpler, more spacious
   - LMS: Denser, more information-rich

---

## RECOMMENDATION

The user wants the LMS site to "match" the Durable site. However, these are TWO DIFFERENT SITES with DIFFERENT PURPOSES:

- **Durable Site:** Marketing site for funding programs (external audience)
- **LMS Site:** Student portal for enrolled students (internal audience)

### Options:

**Option A: Make LMS Home Page Match Durable Marketing Style**
- Add image carousel to hero
- Add testimonials section
- Add contact form
- Change copy to match Durable
- Result: LMS home page becomes marketing-focused

**Option B: Create Separate Marketing Landing Page**
- Keep current LMS home for students
- Create new `/landing` or `/marketing` page that matches Durable
- Result: Both purposes served

**Option C: Hybrid Approach**
- Update LMS home to be more marketing-friendly
- Add testimonials and contact form
- Keep program cards and LMS features
- Result: Serves both audiences

---

## NEXT STEPS

Need clarification from user:
1. Should the LMS home page become a marketing page (like Durable)?
2. Or should we add Durable-style elements to the existing LMS design?
3. What is the primary audience for elevateconnectsdirectory.org?
   - Prospective students (marketing)?
   - Current students (portal)?
   - Both?

---

## TECHNICAL IMPLEMENTATION

If proceeding with matching Durable design:

### Required Changes:

1. **Add Image Carousel Component**
   ```
   - Install carousel library (react-slick or swiper)
   - Create hero image carousel
   - Add 3 hero images to public/images/
   ```

2. **Add Testimonials Section**
   ```
   - Create Testimonials component
   - Add testimonial data (3 testimonials)
   - Add testimonial images
   - Style to match Durable
   ```

3. **Add Contact Form**
   ```
   - Create ContactForm component
   - Add form fields (name, email, message)
   - Add reCAPTCHA
   - Connect to backend/email service
   ```

4. **Update Hero Copy**
   ```
   - Change title to "Ignite Your Future: Fund Training Today"
   - Update subtitle
   - Update CTA button text
   ```

5. **Update Navigation**
   ```
   - Add Blog, About, Contact, Services, FAQ links
   - Match Durable navigation structure
   ```

6. **Style Updates**
   ```
   - Move from gradient backgrounds to white/light gray
   - Add more spacing
   - Simplify layout
   - Match Durable color scheme
   ```

---

## ESTIMATED EFFORT

- Image Carousel: 1-2 hours
- Testimonials Section: 1 hour
- Contact Form: 2-3 hours (with backend)
- Copy Updates: 30 minutes
- Navigation Updates: 1 hour
- Style Updates: 2-3 hours
- Testing: 1 hour

**Total: 8-12 hours**

---

## FILES TO MODIFY

1. `src/pages/Home.jsx` - Main home page
2. `src/components/Navigation.tsx` - Navigation component
3. `src/components/Footer.tsx` - Footer (if needed)
4. `src/index.css` - Global styles
5. `package.json` - Add carousel library
6. `public/images/` - Add hero and testimonial images

---

## QUESTIONS FOR USER

Before proceeding, need to confirm:

1. **Purpose:** What should elevateconnectsdirectory.org be?
   - Marketing site (like Durable)?
   - Student portal (current)?
   - Both?

2. **Content:** Should we use exact copy from Durable site?
   - Hero text?
   - Mission statement?
   - Testimonials?

3. **Images:** Do you have the hero images and testimonial photos?
   - Or should we use placeholders?

4. **Contact Form:** Where should form submissions go?
   - Email address?
   - CRM integration?

5. **Navigation:** Should we match Durable navigation exactly?
   - Blog, About, Contact, Services, FAQ?
   - Or keep current LMS navigation?

---

**AWAITING USER CLARIFICATION BEFORE PROCEEDING**
