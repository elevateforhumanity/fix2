# Content Upload Guide - Elevate for Humanity

## Missing Content Overview

Your site is **fully functional** but needs real content to replace placeholders:

### 1. Videos (High Priority)

### 2. Course Cover Images (High Priority)

### 3. Program Photos (Medium Priority)

---

## 1. VIDEO CONTENT NEEDED

### A. Homepage Hero Video (25 seconds)

**Location:** `/app/page.tsx` line 105
**Purpose:** Main hero section video
**Specs:**

- Duration: 25 seconds
- Format: MP4 (H.264)
- Resolution: 1920x1080 (1080p)
- Aspect Ratio: 16:9

**Script:**

```
Scene 1 (0-6s): Close-ups of diverse people (barber, HVAC tech, CNA, CDL student)
getting ready for work. Overlay: "Innovate."

Scene 2 (6-12s): Students using laptops/phones, dashboard with progress bars,
enroll buttons, certificates. Overlay: "Elevate."

Scene 3 (12-18s): Wellness montage - journaling, tea/coffee, stretching, breathing.
Overlay: "Reset."

Scene 4 (18-25s): Wide shot of city/neighborhood, lights connecting like network map.
Final text: "Elevate for Humanity - Innovate. Elevate. Reset."
"A workforce & wellness ecosystem for real people."
```

**How to add:**

1. Upload video to `/public/videos/hero-innovate-elevate-reset.mp4`
2. Or use YouTube/Vimeo and update the component

---

### B. Student Portal Video (18 seconds)

**Location:** `/app/page.tsx` (Student Journey section)
**Purpose:** Show LMS dashboard and student experience
**Specs:**

- Duration: 18 seconds
- Format: MP4 or YouTube/Vimeo embed
- Resolution: 1920x1080

**Script:**

```
Quick screen recording showing:
- Login to LMS
- Dashboard with enrolled courses
- Click into a course
- Watch a lesson
- Complete a quiz
- View certificate

Overlay text: "Enroll. Learn. Elevate."
```

---

### C. Partner Video (15 seconds)

**Location:** `/app/page.tsx` (Training Partners section)
**Purpose:** Show program holder/employer benefits
**Specs:**

- Duration: 15 seconds
- Format: MP4 or YouTube/Vimeo embed

**Script:**

```
Show:
- Employer listing their program
- Case manager dashboard
- Enrollment tracking
- Reporting features

Overlay text: "Build Boss-Energy Programs"
```

---

### D. Course Lesson Videos

**Location:** Stored in database, played in `/app/lms/courses/[id]/lessons/[lessonId]/page.tsx`
**Purpose:** Actual lesson content

**Supported formats:**

- YouTube URLs (e.g., `https://www.youtube.com/watch?v=VIDEO_ID`)
- Vimeo URLs (e.g., `https://vimeo.com/VIDEO_ID`)
- Direct MP4 files (e.g., `/videos/lessons/barber-101.mp4`)

**How to add:**

1. Upload videos to YouTube/Vimeo (recommended)
2. Or upload MP4 files to `/public/videos/lessons/`
3. Update lesson `content` field in database with URL

**Example SQL:**

```sql
UPDATE lessons
SET content = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    content_type = 'video'
WHERE id = 1;
```

---

## 2. COURSE COVER IMAGES

### Current Issue

Course covers show placeholder SVGs:

- `/course-covers/barber-apprenticeship/cover.svg`
- `/course-covers/truck-driving/cover.svg`
- `/course-covers/hvac-tech/cover.svg`

### What You Need

High-quality images for each program (16 total):

1. **Barber Apprenticeship** - Barber cutting hair
2. **HVAC Technician** - HVAC tech working on unit
3. **CNA / Direct Support** - CNA helping patient
4. **Emergency Health & Safety** - EMT/first responder
5. **Tax Preparation** - Person at desk with tax forms
6. **Business Start-Up** - Entrepreneur/small business owner
7. **Beauty & Career Educator** - Esthetician/instructor
8. **Professional Esthetician** - Skincare treatment
9. **Public Safety Reentry** - Community service worker
10. **Medical Assistant** - MA in clinic
11. **Phlebotomy Technician** - Drawing blood
12. **EKG Technician** - Operating EKG machine
13. **Patient Care Technician** - Hospital care
14. **Pharmacy Technician** - Pharmacy setting
15. **Clinical Medical Assistant** - Clinical setting
16. **Administrative Medical Assistant** - Office setting

### Image Specs

- **Format:** JPG or PNG
- **Resolution:** 1200x800 pixels (3:2 aspect ratio)
- **File size:** Under 500KB each
- **Quality:** High resolution, professional photos

### Where to Get Images

**Option 1: Stock Photos (Free)**

- [Unsplash](https://unsplash.com) - Free high-quality images
- [Pexels](https://pexels.com) - Free stock photos
- [Pixabay](https://pixabay.com) - Free images

**Option 2: Custom Photography**

- Hire photographer to shoot at training locations
- Use real students/instructors (with permission)
- More authentic and engaging

**Option 3: AI-Generated**

- Use Midjourney, DALL-E, or Stable Diffusion
- Prompt: "Professional [job title] at work, realistic, high quality, diverse person"

### How to Add Images

**Method 1: Direct file upload**

```bash
# Create directories
mkdir -p public/course-covers

# Add images with descriptive names
public/course-covers/
  barber-apprenticeship.jpg
  hvac-technician.jpg
  cna-certification.jpg
  ...
```

**Method 2: Update database**

```sql
UPDATE programs
SET hero_image = '/course-covers/barber-apprenticeship.jpg'
WHERE slug = 'barber';
```

**Method 3: Use Cloudflare R2 or S3**

- Upload to cloud storage
- Update `hero_image` field with full URL

---

## 3. PROGRAM PHOTOS

### Homepage Featured Programs

Currently shows placeholder images. Need 3 hero images for:

- Barber Apprenticeship
- CDL Truck Driving
- HVAC Technician

### Program Detail Pages

Each program page (`/programs/[slug]`) can have:

- Hero image (1920x1080)
- Gallery images (multiple)
- Instructor photos
- Facility photos

---

## 4. QUICK START: Add Your First Video

### Option A: Use YouTube (Easiest)

1. **Upload your video to YouTube**
2. **Get the video ID** from URL:
   - URL: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
   - ID: `dQw4w9WgXcQ`

3. **Update lesson in database:**

```sql
UPDATE lessons
SET content = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    content_type = 'video'
WHERE title = 'Introduction to Barbering';
```

4. **Test it:** Go to the lesson page and the video will play automatically!

### Option B: Use Direct MP4 File

1. **Upload video to `/public/videos/lessons/`**

```bash
# Example
public/videos/lessons/barber-intro.mp4
```

2. **Update lesson in database:**

```sql
UPDATE lessons
SET content = '/videos/lessons/barber-intro.mp4',
    content_type = 'video'
WHERE title = 'Introduction to Barbering';
```

---

## 5. HOMEPAGE VIDEO INTEGRATION

### Replace Hero Video Placeholder

**Current code** (line 105 in `/app/page.tsx`):

```tsx
<div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200">
  <div className="text-center p-8">
    <p>25 sec hero video</p>
    <p>Video placeholder</p>
  </div>
</div>
```

**Replace with** (after uploading video):

```tsx
<video
  className="w-full h-full object-cover rounded-lg"
  poster="/videos/hero-poster.jpg"
  autoPlay
  muted
  loop
  playsInline
>
  <source src="/videos/hero-innovate-elevate-reset.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>
```

**Or use YouTube embed:**

```tsx
<iframe
  className="w-full h-full rounded-lg"
  src="https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1&mute=1&loop=1&playlist=YOUR_VIDEO_ID"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
/>
```

---

## 6. CONTENT CHECKLIST

### Immediate Priority (Do First)

- [ ] Homepage hero video (25 sec)
- [ ] 3 featured program cover images (Barber, CDL, HVAC)
- [ ] At least 1 lesson video for testing

### High Priority (Do This Week)

- [ ] All 16 program cover images
- [ ] Student portal video (18 sec)
- [ ] Partner video (15 sec)
- [ ] 5-10 lesson videos for top programs

### Medium Priority (Do This Month)

- [ ] All lesson videos for Barber program
- [ ] All lesson videos for HVAC program
- [ ] All lesson videos for CNA program
- [ ] Testimonial videos (3-5)
- [ ] Instructor introduction videos

---

## 7. VIDEO PRODUCTION TIPS

### DIY Video Creation

**Tools:**

- **Screen recording:** OBS Studio (free), Loom, ScreenFlow
- **Video editing:** DaVinci Resolve (free), iMovie, Camtasia
- **Stock footage:** Pexels Videos, Pixabay Videos
- **Music:** YouTube Audio Library, Epidemic Sound

### Hiring Help

**Freelance platforms:**

- Fiverr ($50-200 per video)
- Upwork ($500-2000 for professional)
- Local videographers

**What to provide:**

- Script (see above)
- Brand colors (#ef7c2a, #004B8D, #0f0f14)
- Logo files
- Any existing footage

---

## 8. NEED HELP?

### I can help you:

1. Write video scripts
2. Find stock images
3. Update code to use your videos
4. Optimize video files
5. Set up cloud storage for media

### Just tell me:

- "I have a YouTube video, help me add it"
- "I need help finding stock images"
- "I uploaded videos, how do I add them?"
- "Generate video scripts for [program name]"

---

## Summary

Your LMS is **100% functional** - it just needs real content instead of placeholders.

**Priority order:**

1. Add 1 lesson video (test the video player works)
2. Add 3 program cover images (homepage looks professional)
3. Add homepage hero video (site feels complete)
4. Add remaining content over time

The video player component I just created supports:
✅ YouTube
✅ Vimeo
✅ Direct MP4 files
✅ Auto-completion tracking
✅ Progress tracking

**You're ready to go!**
