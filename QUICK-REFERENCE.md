# Quick Reference - Course Content System

## 🚀 Quick Commands

```bash
# Generate course cover images
export OPENAI_API_KEY="your-key"
node scripts/generate-images.mjs

# Prepare video job queue
node scripts/prepare-video-jobs.mjs

# Build and test
npm run build
npm run dev

# View generated content
cat public/generated-images/manifest.json
ls -la public/generated-images/courses/
```

## 📁 Key Files to Edit

### Add/Edit Courses
```typescript
// content/courses/catalog.ts
export const courses: Course[] = [
  {
    slug: "hvac",
    title: "HVAC Technician Training",
    shortDescription: "...",
    path: "/programs/hvac",
    coverImageKey: "hvac-course-cover",
    videoScriptFile: "content/video-scripts/courses/hvac-program-video.md",
    aiVideoUrl: "", // Add video URL here
  },
  // ... more courses
];
```

### Update AI Instructor Video
```typescript
// content/homepage/aiInstructor.ts
export const aiInstructorVideo = {
  title: "Meet Elevate for Humanity",
  scriptFile: "content/video-scripts/courses/about-elevate-for-humanity.md",
  videoUrl: "", // Add video URL here
};
```

## 🎨 Course Cover Images

**Location:** `public/generated-images/courses/`

**Manifest:** `public/generated-images/manifest.json`

**Keys:**
- `hvac-course-cover`
- `barber-course-cover`
- `cna-course-cover`
- `cdl-course-cover`
- `building-tech-course-cover`

## 🎬 Video Scripts

**Location:** `content/video-scripts/courses/`

**Files:**
- `about-elevate-for-humanity.md` (90s) - Homepage
- `hvac-program-video.md` (45s)
- `barber-program-video.md` (45s)
- `healthcare-cna-program-video.md` (45s)
- `cdl-program-video.md` (45s)
- `building-tech-program-video.md` (45s)

## 🔗 Live URLs

**Homepage:** `/`
- AI Instructor section

**Programs:** `/programs`
- Featured courses section
- Database programs section

**Course Pages:**
- `/programs/hvac`
- `/programs/barber`
- `/programs/healthcare`
- `/programs/cdl`
- `/programs/building-tech`

## 🛠️ Common Tasks

### Add a New Course

1. Create image prompt:
   ```bash
   touch content/image-prompts/courses/new-course-cover.md
   ```

2. Create video script:
   ```bash
   touch content/video-scripts/courses/new-course-program-video.md
   ```

3. Add to catalog:
   ```typescript
   // content/courses/catalog.ts
   {
     slug: "new-course",
     title: "New Course Title",
     shortDescription: "Description here",
     path: "/programs/new-course",
     coverImageKey: "new-course-cover",
     videoScriptFile: "content/video-scripts/courses/new-course-program-video.md",
     aiVideoUrl: "",
   }
   ```

4. Generate image:
   ```bash
   node scripts/generate-images.mjs
   ```

### Update Video URL

```typescript
// content/courses/catalog.ts
{
  slug: "hvac",
  // ... other fields
  aiVideoUrl: "https://your-cdn.com/hvac-video.mp4", // or /videos/courses/hvac.mp4
}
```

### Customize Course Card

```tsx
// components/courses/CourseCard.tsx
export function CourseCard({ course }: Props) {
  // Modify layout, styling, hover effects here
}
```

## 💡 Tips

**Images:**
- Placeholders work fine for launch
- Generate real images when budget allows
- Use 1:1 aspect ratio (square)
- Optimize for web (compress)

**Videos:**
- Start with homepage master video
- Add course videos gradually
- Use captions for accessibility
- Host on CDN for performance

**Performance:**
- Images are lazy-loaded
- Videos load on demand
- Manifest cached by browser
- Build time optimized

## 🐛 Troubleshooting

**Build fails:**
```bash
# Check for syntax errors
npm run build

# Verify manifest exists
cat public/generated-images/manifest.json
```

**Images not loading:**
```bash
# Regenerate manifest
node scripts/generate-images.mjs

# Check file paths
ls -la public/generated-images/courses/
```

**Videos not playing:**
- Check `aiVideoUrl` is set
- Verify video file exists
- Test video URL in browser
- Check video format (MP4 recommended)

## 📊 Status Check

```bash
# Check what's generated
echo "Images:"
ls -1 public/generated-images/courses/ | wc -l

echo "Video scripts:"
ls -1 content/video-scripts/courses/ | wc -l

echo "Courses in catalog:"
grep -c "slug:" content/courses/catalog.ts
```

## 🎯 Next Actions

**Immediate (Free):**
- [x] Site is live with placeholders
- [x] All pages working
- [x] Build passing

**Short-term ($0.40):**
- [ ] Generate real course covers
- [ ] Update manifest

**Medium-term ($30):**
- [ ] Generate master AI video
- [ ] Generate top 3 course videos
- [ ] Update video URLs

**Long-term:**
- [ ] Generate all 6 videos
- [ ] Add video captions
- [ ] A/B test different covers
- [ ] Track engagement metrics

---

**Need help?** Check:
- `INTEGRATION-COMPLETE.md` - Full guide
- `HOW-TO-USE-AI-TOOLS.md` - Tool tutorials
- `CONTENT-GENERATION-COMPLETE.md` - Content details
