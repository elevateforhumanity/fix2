# Image & Video Placeholders Guide

## Overview
This document lists all image and video placeholders needed for the Elevate For Humanity website. All placeholders use https://placehold.co for temporary images until real content is uploaded.

---

## HOMEPAGE (app/page.tsx)

### Hero Section
- **hero-banner.jpg** (1920x800px)
  - Description: Students in training environment, diverse group learning
  - Location: Hero background
  - Suggested: Classroom with students at computers or hands-on training

- **hero-video.mp4** (Optional)
  - Description: 30-second overview of programs
  - Location: Hero section (autoplay, muted)
  - Suggested: Montage of training programs, student success

### Partner Logos Section
- **partner-logo-1.png** through **partner-logo-12.png** (200x100px each)
  - Workforce boards
  - Training partners
  - Employer partners
  - Funding organizations
  - Location: "Our Partners" section

### Training Programs Section
- **program-cna.jpg** (400x300px)
  - CNA students in clinical setting
  
- **program-cdl.jpg** (400x300px)
  - CDL student with truck/instructor
  
- **program-hvac.jpg** (400x300px)
  - HVAC technician working on equipment
  
- **program-trades.jpg** (400x300px)
  - Skilled trades training (welding, electrical, plumbing)
  
- **program-it.jpg** (400x300px)
  - IT students at computers
  
- **program-business.jpg** (400x300px)
  - Business/customer service training

### Success Stories Section
- **student-marcus.jpg** (150x150px - headshot)
  - Barber graduate Marcus J.
  
- **student-sarah.jpg** (150x150px - headshot)
  - Medical Assistant graduate Sarah M.
  
- **student-james.jpg** (150x150px - headshot)
  - HVAC Technician graduate James T.

- **success-video-1.mp4** (Optional)
  - Video testimonial from graduate
  - 1-2 minutes

### Stats/Impact Section
- **impact-infographic.jpg** (800x600px)
  - Visual representation of outcomes
  - Job placement rates, completion rates

### Call-to-Action Section
- **cta-background.jpg** (1920x600px)
  - Inspiring image of students/graduates
  - Used as background for final CTA

---

## EMPLOYERS PAGE (app/employers/page.tsx)

### Hero Section
- **employers-hero.jpg** (1920x800px)
  - Business professionals meeting with training staff
  - Handshake, partnership imagery

### How It Works Section
- **step-1-connect.jpg** (300x300px)
  - Meeting/consultation imagery
  
- **step-2-train.jpg** (300x300px)
  - Students in training
  
- **step-3-hire.jpg** (300x300px)
  - Job interview or first day at work
  
- **step-4-support.jpg** (300x300px)
  - Ongoing support/mentorship

### Employer Logos
- **employer-logo-1.png** through **employer-logo-20.png** (200x100px each)
  - Healthcare systems
  - Transportation companies
  - Construction companies
  - Manufacturing facilities
  - Hospitality businesses

### Testimonial Section
- **employer-sarah-johnson.jpg** (150x150px)
  - HR Director headshot
  
- **employer-testimonial-video.mp4** (Optional)
  - Video testimonial from employer
  - 1-2 minutes

---

## ABOUT PAGE (app/about/page.tsx)

### Team Section
- **team-director.jpg** (300x300px)
  - Executive Director headshot
  
- **team-staff-1.jpg** through **team-staff-6.jpg** (300x300px each)
  - Program coordinators
  - Career counselors
  - Support staff

### Facility Photos
- **facility-classroom-1.jpg** (600x400px)
  - Modern classroom with computers
  
- **facility-lab.jpg** (600x400px)
  - Hands-on training lab
  
- **facility-common-area.jpg** (600x400px)
  - Student common area/lounge

### Mission/Vision Section
- **mission-background.jpg** (1920x600px)
  - Inspiring community/training imagery

---

## PROGRAMS DIRECTORY (app/directory/page.tsx)

### Program Cards (Each program needs)
- **[program-name]-card.jpg** (400x300px)
  - Specific to each program
  - Shows actual training activity

### Program Detail Pages
- **[program-name]-hero.jpg** (1920x600px)
  - Large hero image for each program page
  
- **[program-name]-gallery-1.jpg** through **-gallery-4.jpg** (800x600px each)
  - Multiple photos showing different aspects of training
  
- **[program-name]-instructor.jpg** (300x300px)
  - Lead instructor for that program
  
- **[program-name]-video.mp4**
  - Program overview video
  - 2-3 minutes
  - Shows curriculum, facilities, outcomes

---

## GENERAL SITE ELEMENTS

### Navigation/Header
- **logo-full.png** (300x80px)
  - Full Elevate For Humanity logo with text
  
- **logo-icon.png** (80x80px)
  - Icon-only version for mobile

### Footer
- **footer-background.jpg** (1920x400px - optional)
  - Subtle background pattern or image

### Icons (SVG preferred, 64x64px)
- **icon-training.svg** - Training/education icon
- **icon-funding.svg** - Money/funding icon
- **icon-support.svg** - Support/helping hand icon
- **icon-technology.svg** - Computer/tech icon
- **icon-placement.svg** - Job/career icon
- **icon-certificate.svg** - Certificate/credential icon
- **icon-calendar.svg** - Schedule/time icon
- **icon-location.svg** - Location/map icon

---

## VIDEO CONTENT NEEDED

### Priority Videos
1. **homepage-hero-video.mp4** (30-60 seconds)
   - Overview of Elevate For Humanity
   - Quick cuts of different programs
   - Student testimonials
   - Autoplay on homepage

2. **about-us-video.mp4** (2-3 minutes)
   - Mission and vision
   - Tour of facilities
   - Meet the team
   - Impact stories

3. **program-overview-videos** (2-3 minutes each)
   - One for each major program
   - Curriculum overview
   - Instructor introduction
   - Student experiences
   - Career outcomes

4. **success-story-videos** (1-2 minutes each)
   - 5-10 graduate testimonials
   - Before/after stories
   - Current job/career
   - Advice for future students

5. **employer-testimonial-videos** (1-2 minutes each)
   - 3-5 employer partners
   - Why they partner with Elevate
   - Quality of candidates
   - Success stories

---

## IMAGE SPECIFICATIONS

### Recommended Sizes
- **Hero Banners:** 1920x800px (16:10 ratio)
- **Program Cards:** 400x300px (4:3 ratio)
- **Headshots:** 300x300px (1:1 ratio, square)
- **Thumbnails:** 150x150px (1:1 ratio, square)
- **Logos:** 200x100px (2:1 ratio) or SVG
- **Gallery Images:** 800x600px (4:3 ratio)
- **Full-width Backgrounds:** 1920x600px (16:5 ratio)

### File Formats
- **Photos:** JPG (optimized, 80-90% quality)
- **Logos/Icons:** PNG with transparency or SVG
- **Videos:** MP4 (H.264 codec, 1080p max)

### Optimization
- All images should be optimized for web
- Use Next.js Image component for automatic optimization
- Provide 2x versions for retina displays
- Use WebP format when possible

---

## PLACEHOLDER IMPLEMENTATION

All placeholders will use:
```
https://placehold.co/[WIDTH]x[HEIGHT]/1e293b/f97316?text=[DESCRIPTION]
```

Example:
```
https://placehold.co/1920x800/1e293b/f97316?text=Hero+Banner
```

Colors:
- Background: #1e293b (slate-800)
- Text: #f97316 (orange-500)

---

## CONTENT GUIDELINES

### Photography Style
- **Authentic:** Real students, real training, real environments
- **Diverse:** Show diversity in age, race, gender, background
- **Professional:** Well-lit, high-quality, properly framed
- **Action-oriented:** Show people doing things, not just posing
- **Positive:** Smiling faces, engaged learners, success moments

### Video Style
- **Natural lighting** when possible
- **Clear audio** - use external mic
- **Steady shots** - use tripod or stabilizer
- **Short clips** - keep attention, avoid long takes
- **Captions** - add subtitles for accessibility
- **Branding** - include logo/branding elements

### Testimonial Guidelines
- **Real people** - actual students/graduates/employers
- **Specific stories** - concrete details, not generic praise
- **Before/after** - show transformation
- **Current status** - where they are now
- **Permission** - signed release forms for all photos/videos

---

## PRIORITY ORDER

### Phase 1 (Immediate)
1. Homepage hero banner
2. Program card images (6 main programs)
3. Success story headshots (3)
4. Partner logos (top 10)

### Phase 2 (Next)
5. Employer page images
6. About page team photos
7. Facility photos
8. Additional program images

### Phase 3 (Future)
9. Video testimonials
10. Program overview videos
11. Homepage hero video
12. Employer testimonial videos

---

## FILE NAMING CONVENTION

Use consistent naming:
- **Lowercase** with hyphens
- **Descriptive** names
- **Include dimensions** in filename if multiple sizes

Examples:
- `hero-banner-1920x800.jpg`
- `program-cna-card-400x300.jpg`
- `student-marcus-headshot-300x300.jpg`
- `partner-logo-workforce-board-200x100.png`
- `success-story-video-marcus-barber.mp4`

---

## UPLOAD LOCATIONS

Once you have real images/videos:

1. **Images:** Place in `/public/images/`
   - `/public/images/hero/`
   - `/public/images/programs/`
   - `/public/images/students/`
   - `/public/images/partners/`
   - `/public/images/team/`
   - `/public/images/facilities/`

2. **Videos:** Place in `/public/videos/`
   - `/public/videos/testimonials/`
   - `/public/videos/programs/`
   - `/public/videos/hero/`

3. **Update imports** in component files to point to real images

---

## NOTES

- All placeholder images will be clearly marked with orange text
- Placeholders are temporary and should be replaced ASAP
- Keep original high-res versions of all images
- Maintain a backup of all media files
- Get signed release forms for all people in photos/videos
- Ensure you have rights to use all images/videos
