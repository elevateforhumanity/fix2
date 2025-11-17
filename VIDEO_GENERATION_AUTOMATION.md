# 🎬 Automated Video Generation Guide

## ⚠️ Important Note

InVideo AI does **not** have a public API for automated video generation. Videos must be created manually through their web interface.

However, I can help you **streamline the process** to make it as fast as possible.

---

## 🚀 Fast Video Creation Workflow (30 minutes for all videos)

### Step 1: Prepare All Scripts (Already Done!)

All your scripts are ready in:
- `content/video-scripts/ecd-courses/`
- `INVIDEO_REEL_SCRIPTS.md`

### Step 2: Batch Create in InVideo

**Open InVideo AI:** https://ai.invideo.io

**Create videos in this order:**

#### 1. Hero Video (5 min)
- Search: "business promo cinematic website hero"
- Paste script from `INVIDEO_COMPLETE_SETUP.md`
- Customize: Elevate For Humanity branding
- Export: `hero-elevate-home.mp4`

#### 2. Medical Assistant (5 min)
- Search: "nursing promo video"
- Paste script from `content/video-scripts/ecd-courses/medical-assistant-video.md`
- Export: `program-medical-assistant.mp4`

#### 3. Barber Apprenticeship (5 min)
- Search: "barber shop promo"
- Paste script from `content/video-scripts/ecd-courses/barber-apprenticeship-video.md`
- Export: `program-barber-apprenticeship.mp4`

#### 4. HVAC Technician (5 min)
- Search: "trade school promo"
- Paste script from `content/video-scripts/ecd-courses/hvac-technician-video.md`
- Export: `program-hvac.mp4`

#### 5. Workforce Readiness (5 min)
- Search: "job training program promo"
- Paste script (create from program page content)
- Export: `program-workforce-readiness.mp4`

#### 6. Building Tech (5 min)
- Search: "facility management promo"
- Paste script (create from program page content)
- Export: `program-building-tech.mp4`

---

## 📥 Step 3: Download & Organize

After each video is generated:

1. Click "Export" in InVideo
2. Download as MP4 (1080p)
3. Rename to exact filename above
4. Save to your computer

---

## 📤 Step 4: Upload to Your Site

### Option A: Direct Upload to Gitpod

```bash
# In Gitpod terminal
mkdir -p public/videos

# Then drag and drop your MP4 files into public/videos/
# Or use the file upload feature in VS Code
```

### Option B: Use Git LFS (for large files)

```bash
# Install Git LFS
git lfs install

# Track video files
git lfs track "*.mp4"

# Add videos
git add public/videos/*.mp4
git commit -m "Add program videos"
git push
```

### Option C: Use Cloud Storage (Recommended for production)

**Cloudflare Stream** (Best for video):
- Upload videos to Cloudflare Stream
- Get embed URLs
- Update video src in code

**YouTube (Free alternative):**
- Upload as "Unlisted"
- Get embed URLs
- Update video src to YouTube embed format

---

## 🔧 Alternative: Use Stock Video Temporarily

While you create InVideo videos, use placeholder videos:

```bash
# Download free stock videos from:
# - Pexels.com
# - Pixabay.com
# - Coverr.co

# Search for:
# - "medical training"
# - "barber shop"
# - "hvac technician"
# - "construction worker"
# - "office training"
```

---

## 🤖 Semi-Automated Workflow

Since InVideo doesn't have an API, here's the fastest manual workflow:

### 1. Open Multiple Tabs
- Open 5 tabs in InVideo AI
- Start all 5 videos at once
- While one generates, work on the next

### 2. Use Templates
- Save your first video as a template
- Reuse the same style/voice for consistency
- Only change the script and visuals

### 3. Batch Export
- Queue all videos for export
- Download all at once
- Organize in one batch

---

## 📋 Video Checklist

- [ ] hero-elevate-home.mp4 (Homepage)
- [ ] program-medical-assistant.mp4
- [ ] program-barber-apprenticeship.mp4
- [ ] program-hvac.mp4
- [ ] program-workforce-readiness.mp4
- [ ] program-building-tech.mp4
- [ ] reel-elevate-enroll-today.mp4 (Social)
- [ ] reel-barber-apprenticeship.mp4 (Social)

---

## 🎯 Quick Scripts for New Programs

### Workforce Readiness Script (30 sec):

```
Need a fresh start? The Workforce Readiness program at Elevate For Humanity helps you rebuild, reset, and re-enter the workforce with confidence.

We provide coaching, skills training, and real employment connections for adults, youth, and re-entry citizens.

Whether you're starting over, changing careers, or just need support, we'll help you navigate barriers and find your path forward.

Visit ElevateConnectsDirectory.org to start your journey.
```

### Building Tech Script (30 sec):

```
Want a stable career in the skilled trades? Building Maintenance Technician training at Elevate For Humanity prepares you for in-demand facility maintenance roles.

Learn electrical, plumbing, HVAC basics, carpentry, and general repairs through hands-on training.

Work in property management, commercial buildings, schools, hospitals, or industrial facilities.

Visit ElevateConnectsDirectory.org to explore this pathway.
```

---

## 💡 Pro Tips

1. **Consistency is key** - Use the same voice and style for all videos
2. **Keep it short** - 30-45 seconds is perfect for attention spans
3. **Add captions** - Enable auto-captions for accessibility
4. **Test on mobile** - Most viewers will watch on phones
5. **Compress if needed** - Keep files under 30MB for fast loading

---

## 🚀 After Videos Are Ready

```bash
# Upload to public/videos/
# Test locally
npm run dev

# Commit and deploy
git add public/videos/*.mp4
git commit -m "Add all program videos"
git push origin main
```

---

## ❓ Need Help?

**Videos not showing?**
- Check file names match exactly
- Check files are in `public/videos/` folder
- Clear browser cache
- Check browser console for errors

**Videos too large?**
- Use HandBrake to compress
- Target: 10-20MB per video
- Or use video hosting (YouTube, Cloudflare Stream)

**Can't access InVideo?**
- Free tier: 4 videos/month
- Paid: $20/month unlimited
- Alternative: Use Canva Video (also has AI features)

---

**Ready to create your videos? Go to https://ai.invideo.io and start!** 🎬
