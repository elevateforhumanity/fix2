# ✅ ECD Course Content System Ready!

## What You Have Now

### 📋 Course Catalog
**File:** `content/courses/ecd-courses.json`

**7 Courses Configured:**
1. HVAC Technician Training
2. Barber Apprenticeship
3. CNA & Healthcare Careers
4. CDL & Transportation Training
5. Building Technician & Skilled Trades
6. IT Support & Help Desk Apprenticeship
7. Beauty & Career Educator Training

### 📸 Image Prompts (7 files)
**Location:** `content/image-prompts/ecd-courses/`

Ready for AI image generation:
- `hvac-technician-cover.md`
- `barber-apprenticeship-cover.md`
- `cna-healthcare-cover.md`
- `cdl-transportation-cover.md`
- `building-technician-cover.md`
- `it-support-apprenticeship-cover.md`
- `beauty-career-educator-cover.md`

### 🎬 Video Scripts (8 files)
**Location:** `content/video-scripts/ecd-courses/`

**Homepage Master Video:**
- `about-elevate-for-humanity-main.md` (90 seconds)
  - Explains ECD platform
  - Covers WIOA, Workforce Ready Grants, Job Ready Indy
  - Perfect for homepage hero section

**Course Videos (45-60 seconds each):**
- `hvac-technician-video.md`
- `barber-apprenticeship-video.md`
- `cna-healthcare-video.md`
- `cdl-transportation-video.md`
- `building-technician-video.md`
- `it-support-apprenticeship-video.md`
- `beauty-career-educator-video.md`

---

## 🚀 Next Steps

### Step 1: Generate Course Cover Images

**Option A: Automated (OpenAI DALL-E 3)**
```bash
export OPENAI_API_KEY="your-key"
node scripts/generate-images.mjs
```
Cost: ~$0.28 for 7 images

**Option B: Manual (Any AI Tool)**
1. Copy prompts from `content/image-prompts/ecd-courses/*.md`
2. Use ChatGPT Plus, Leonardo.ai, or Midjourney
3. Save images to `public/generated-images/ecd-courses/`

### Step 2: Generate AI Instructor Videos

**Recommended: HeyGen ($30/mo)**
1. Sign up at https://heygen.com
2. Copy scripts from `content/video-scripts/ecd-courses/*.md`
3. Choose professional avatar and voice
4. Generate and download MP4s
5. Save to `public/videos/ecd-courses/`

**Budget: D-ID (Free tier)**
- 5 minutes free per month
- Good for testing

### Step 3: Wire Into UI

Update the course catalog to use ECD courses:

```typescript
// content/courses/catalog.ts
import ecdCourses from './ecd-courses.json';

export const courses: Course[] = ecdCourses.map(course => ({
  slug: course.slug,
  title: course.title,
  shortDescription: course.shortDescription,
  path: `/programs/${course.slug}`,
  coverImageKey: `${course.slug}-cover`,
  videoScriptFile: `content/video-scripts/ecd-courses/${course.slug}-video.md`,
  aiVideoUrl: "", // Add after generating videos
}));
```

---

## 📁 File Structure

```
fix2/
├── content/
│   ├── courses/
│   │   └── ecd-courses.json (7 courses)
│   │
│   ├── image-prompts/
│   │   └── ecd-courses/ (7 image prompts)
│   │
│   └── video-scripts/
│       └── ecd-courses/ (8 video scripts)
│
├── scripts/
│   ├── build-ecd-course-assets.mjs (builder)
│   └── generate-images.mjs (image generator)
│
└── setup-ecd-course-builder.sh (setup script)
```

---

## 🔧 How to Add More Courses

1. **Edit the JSON:**
   ```bash
   nano content/courses/ecd-courses.json
   ```

2. **Add a new course:**
   ```json
   {
     "slug": "welding-fabrication",
     "title": "Welding & Metal Fabrication",
     "category": "Skilled Trades",
     "shortDescription": "Learn welding techniques for manufacturing and construction careers."
   }
   ```

3. **Regenerate assets:**
   ```bash
   node scripts/build-ecd-course-assets.mjs
   ```

4. **Generate images:**
   ```bash
   node scripts/generate-images.mjs
   ```

---

## 💡 Key Features

### Smart Category-Based Prompts
The builder automatically generates appropriate prompts based on category:
- **Healthcare** → Clinical lab setting, scrubs, medical equipment
- **Skilled Trades** → Workshop, tools, safety gear
- **Beauty** → Salon setting, styling tools, mirrors
- **Technology** → Computer lab, dual monitors, tech equipment
- **Transportation** → Training yard, commercial vehicles

### Funding Messaging Built-In
Every video script includes:
- WIOA (Workforce Innovation & Opportunity Act)
- Workforce Ready Grants
- Job Ready Indy
- Case management support
- Job placement assistance

### Consistent Branding
All content references:
- Elevate Connects Directory
- Elevate for Humanity
- ElevateConnectsDirectory.org

---

## 📊 Content Summary

| Item | Count | Status |
|------|-------|--------|
| Courses | 7 | ✅ Configured |
| Image Prompts | 7 | ✅ Generated |
| Video Scripts | 8 | ✅ Generated |
| Homepage Script | 1 | ✅ Generated |
| Total Assets | 15 | ✅ Ready |

---

## 🎯 What This Replaces

**Before:**
- 5 hardcoded courses in TypeScript
- Manual prompt creation
- Placeholder SVG images
- Generic video scripts

**After:**
- 7 JSON-driven courses (easily expandable)
- Automated prompt generation
- Category-specific image prompts
- ECD-branded video scripts with funding messaging
- Homepage master video script

---

## 💰 Cost Estimates

### Images (7 covers)
- OpenAI API: $0.28
- ChatGPT Plus: $20/mo (includes DALL-E 3)
- Leonardo.ai: Free tier
- Midjourney: $10/mo

### Videos (8 total)
- HeyGen: $30/mo (20 credits)
- Synthesia: $30/mo
- D-ID: Free tier (5 min/mo) or $5.90/mo

**Recommended Budget:** $30.28 one-time
- Images: $0.28 (OpenAI API)
- Videos: $30/mo (HeyGen for 8 videos)

---

## ✅ Quick Commands

```bash
# View course list
cat content/courses/ecd-courses.json | jq '.[] | .title'

# View an image prompt
cat content/image-prompts/ecd-courses/hvac-technician-cover.md

# View a video script
cat content/video-scripts/ecd-courses/hvac-technician-video.md

# View homepage script
cat content/video-scripts/ecd-courses/about-elevate-for-humanity-main.md

# Regenerate all assets
node scripts/build-ecd-course-assets.mjs

# Generate images (requires API key)
export OPENAI_API_KEY="your-key"
node scripts/generate-images.mjs

# List generated content
ls -la content/image-prompts/ecd-courses/
ls -la content/video-scripts/ecd-courses/
```

---

## 🎉 Success!

You now have a complete, automated course content system for Elevate Connects Directory:

✅ 7 courses configured and ready
✅ 7 AI-ready image prompts
✅ 8 AI-ready video scripts (7 courses + 1 homepage)
✅ Automated builder for easy expansion
✅ Category-specific content generation
✅ ECD branding and funding messaging built-in

**Next:** Generate the actual images and videos, then wire them into your UI!

---

## 📞 Need Help?

**To add courses:** Edit `content/courses/ecd-courses.json`

**To regenerate:** Run `node scripts/build-ecd-course-assets.mjs`

**To generate images:** Run `node scripts/generate-images.mjs`

**To customize prompts:** Edit the builder in `scripts/build-ecd-course-assets.mjs`

---

**Ready to generate real content?** Set your `OPENAI_API_KEY` and run the image generator!
