# 📝 Content Replacement Guide

Step-by-step guide to replace all placeholders with your real content.

---

## 🎬 Step 1: Hero Video Background

### Current State
```tsx
<div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
  <div className="absolute inset-0 bg-black/40"></div>
</div>
```

### Replace With
```tsx
<video
  autoPlay
  loop
  muted
  playsInline
  className="absolute inset-0 w-full h-full object-cover"
>
  <source src="/videos/hero-banner.mp4" type="video/mp4" />
</video>
<div className="absolute inset-0 bg-black/40"></div>
```

### File Location
- Upload video to: `/public/videos/hero-banner.mp4`
- Max size: 5MB
- Format: MP4 (H.264)
- Resolution: 1920x1080

---

## 📸 Step 2: Four-Panel Images

### Current State
```tsx
<PanelCard
  title="Earn While You Learn"
  description="Get paid during your training through apprenticeships"
  image="/images/earn-learn.jpg"
  cinematic
/>
```

### Replace With
Add actual images to `/public/images/`:
- `panel-earn-learn.jpg` (cinematic)
- `panel-funding.jpg` (bright)
- `panel-support.jpg` (cinematic)
- `panel-careers.jpg` (bright)

### Update Component
```tsx
function PanelCard({ title, description, image, cinematic, bright }: any) {
  return (
    <div className="...">
      <img 
        src={image} 
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Rest of component */}
    </div>
  );
}
```

---

## 🎓 Step 3: Program Images

### Current State
```tsx
<div className="h-48 bg-blue-50 flex items-center justify-center">
  <GraduationCap className="h-16 w-16 text-blue-600" />
</div>
```

### Replace With
```tsx
<div className="h-48 relative overflow-hidden">
  <img 
    src="/images/programs/medical-assistant.jpg"
    alt="Medical Assistant Program"
    className="w-full h-full object-cover"
  />
</div>
```

### Files Needed
Upload to `/public/images/programs/`:
1. `medical-assistant.jpg`
2. `barber.jpg`
3. `esthetician.jpg`
4. `hvac.jpg`
5. `reentry.jpg`
6. `cpr.jpg`
7. `hha.jpg`
8. `tax-prep.jpg`
9. `business.jpg`
10. `emergency-health.jpg`
11. `beauty-educator.jpg`
12. `workforce-readiness.jpg`

---

## 💼 Step 4: Earn While You Learn Image

### Current State
```tsx
<div className="relative h-96 bg-slate-800 rounded-2xl overflow-hidden">
  <div className="absolute inset-0 flex items-center justify-center text-slate-600">
    <Users className="h-24 w-24" />
  </div>
</div>
```

### Replace With
```tsx
<div className="relative h-96 rounded-2xl overflow-hidden">
  <img 
    src="/images/earn-while-learn-section.jpg"
    alt="Apprentice learning on the job"
    className="w-full h-full object-cover"
  />
</div>
```

### File Location
- Upload to: `/public/images/earn-while-learn-section.jpg`
- Style: Cinematic
- Resolution: 1920x1080

---

## 🌟 Step 5: Success Story Photos

### Current State
```tsx
<div className="w-20 h-20 bg-blue-600 rounded-full mb-6 flex items-center justify-center text-white text-2xl font-bold">
  {name.charAt(0)}
</div>
```

### Replace With
```tsx
<div className="w-20 h-20 rounded-full mb-6 overflow-hidden">
  <img 
    src={image}
    alt={name}
    className="w-full h-full object-cover"
  />
</div>
```

### Update Component Calls
```tsx
<SuccessStoryCard
  name="Marcus Johnson"
  program="Barber Apprenticeship"
  quote="I went from unemployed to owning my own chair in 12 months."
  image="/images/success/marcus.jpg"
/>
```

### Files Needed
Upload to `/public/images/success/`:
- `marcus.jpg` (cinematic portrait)
- `sarah.jpg` (bright portrait)
- `james.jpg` (cinematic portrait)

---

## 🤝 Step 6: Employer Partnership Image

### Current State
```tsx
<div className="relative h-96 bg-gray-100 rounded-xl overflow-hidden">
  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
    <Briefcase className="h-24 w-24" />
  </div>
</div>
```

### Replace With
```tsx
<div className="relative h-96 rounded-xl overflow-hidden">
  <img 
    src="/images/employer-partnership.jpg"
    alt="Employer meeting with trainee"
    className="w-full h-full object-cover"
  />
</div>
```

### File Location
- Upload to: `/public/images/employer-partnership.jpg`
- Style: Bright, professional
- Resolution: 1920x1080

---

## 📋 Complete File Checklist

### Videos (1 total)
- [ ] `/public/videos/hero-banner.mp4`

### Panel Images (4 total)
- [ ] `/public/images/panel-earn-learn.jpg`
- [ ] `/public/images/panel-funding.jpg`
- [ ] `/public/images/panel-support.jpg`
- [ ] `/public/images/panel-careers.jpg`

### Program Images (12 total)
- [ ] `/public/images/programs/medical-assistant.jpg`
- [ ] `/public/images/programs/barber.jpg`
- [ ] `/public/images/programs/esthetician.jpg`
- [ ] `/public/images/programs/hvac.jpg`
- [ ] `/public/images/programs/reentry.jpg`
- [ ] `/public/images/programs/cpr.jpg`
- [ ] `/public/images/programs/hha.jpg`
- [ ] `/public/images/programs/tax-prep.jpg`
- [ ] `/public/images/programs/business.jpg`
- [ ] `/public/images/programs/emergency-health.jpg`
- [ ] `/public/images/programs/beauty-educator.jpg`
- [ ] `/public/images/programs/workforce-readiness.jpg`

### Section Images (2 total)
- [ ] `/public/images/earn-while-learn-section.jpg`
- [ ] `/public/images/employer-partnership.jpg`

### Success Stories (3 total)
- [ ] `/public/images/success/marcus.jpg`
- [ ] `/public/images/success/sarah.jpg`
- [ ] `/public/images/success/james.jpg`

**Total: 1 video + 21 images**

---

## 🎨 Image Optimization

### Before Upload
1. **Resize** to correct dimensions
2. **Compress** to reduce file size
3. **Convert** to WebP format (primary)
4. **Keep** JPG as fallback

### Recommended Tools
- **TinyPNG** - Online compression
- **Squoosh** - Google's image optimizer
- **ImageOptim** - Mac app
- **GIMP** - Free editor

### Target Sizes
- Hero video: < 5MB
- Panel images: < 200KB each
- Program images: < 150KB each
- Section images: < 300KB each
- Success photos: < 100KB each

---

## 🔄 Step-by-Step Replacement Process

### 1. Generate Content
Use prompts from `/VIDEO_PROMPTS_READY.md`

### 2. Download & Organize
```
downloads/
  ├── hero-banner.mp4
  ├── panels/
  │   ├── earn-learn.jpg
  │   ├── funding.jpg
  │   ├── support.jpg
  │   └── careers.jpg
  ├── programs/
  │   ├── medical-assistant.jpg
  │   └── ... (12 total)
  ├── sections/
  │   ├── earn-while-learn.jpg
  │   └── employer-partnership.jpg
  └── success/
      ├── marcus.jpg
      ├── sarah.jpg
      └── james.jpg
```

### 3. Optimize All Files
Run through compression tools

### 4. Upload to Public Folder
```bash
# Create directories
mkdir -p public/videos
mkdir -p public/images/panels
mkdir -p public/images/programs
mkdir -p public/images/success

# Copy files
cp downloads/hero-banner.mp4 public/videos/
cp downloads/panels/* public/images/panels/
cp downloads/programs/* public/images/programs/
cp downloads/sections/* public/images/
cp downloads/success/* public/images/success/
```

### 5. Update Component Code
Edit `/app/page-new.tsx` with new image paths

### 6. Test Locally
```bash
npm run dev
# Visit http://localhost:3000/page-new
```

### 7. Verify All Images Load
Check browser console for errors

### 8. Test Responsive
Use DevTools to test mobile/tablet views

### 9. Deploy
```bash
git add public/
git add app/page-new.tsx
git commit -m "Add real content to new homepage"
git push
```

---

## 🐛 Troubleshooting

### Images Not Loading
- Check file paths are correct
- Verify files are in `/public/` folder
- Check file extensions match code
- Clear browser cache

### Video Not Playing
- Verify MP4 format (H.264 codec)
- Check file size < 5MB
- Test in different browsers
- Add fallback image

### Slow Loading
- Compress images more
- Use WebP format
- Implement lazy loading
- Add loading states

---

## ✅ Final Checklist

Before going live:
- [ ] All images uploaded
- [ ] All images optimized
- [ ] Video uploaded and compressed
- [ ] Code updated with paths
- [ ] Tested on desktop
- [ ] Tested on mobile
- [ ] Tested on tablet
- [ ] All images have alt text
- [ ] No console errors
- [ ] Page loads fast
- [ ] Animations work
- [ ] Links all work

---

## 📞 Need Help?

### Common Issues
1. **Path errors** - Check `/public/` folder structure
2. **Format errors** - Verify file formats (JPG, WebP, MP4)
3. **Size errors** - Compress files more
4. **Loading errors** - Check browser console

### Resources
- Next.js Image docs: https://nextjs.org/docs/api-reference/next/image
- WebP converter: https://squoosh.app
- Video compression: https://handbrake.fr

---

**Ready to replace content?** Follow this guide step-by-step for best results!
