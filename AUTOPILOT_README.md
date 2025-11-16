# 🤖 AUTOPILOT VIDEO SYSTEM

**Automated video setup, generation, and deployment for Elevate Connects Directory**

---

## 🎯 WHAT THIS DOES

The autopilot system automatically:

1. ✅ Creates 12 professional video scripts
2. ✅ Generates VideoPlaceholder component
3. ✅ Injects placeholders into all pages
4. ✅ Generates AI thumbnails (optional)
5. ✅ Creates deployment-ready code

---

## 🚀 QUICK START

### Step 1: Run Setup (Already Done!)

```bash
./setup-video-placeholders.sh
```

**Creates:**

- `content/video-scripts/` - 12 video scripts
- `components/VideoPlaceholder.tsx` - Placeholder component

### Step 2: Inject Components

```bash
chmod +x autopilot-video-setup.sh
./autopilot-video-setup.sh
```

**Does:**

- Automatically adds VideoPlaceholder to all pages
- Injects import statements
- Configures titles and descriptions
- Ready to commit!

### Step 3: Generate Thumbnails (Optional)

```bash
# Set OpenAI API key
export OPENAI_API_KEY=sk-your-key-here

# Start dev server (in another terminal)
npm run dev

# Generate thumbnails
npx tsx autopilot-generate-videos.ts
```

**Generates:**

- 12 professional AI thumbnails
- Cost: ~$0.50 total
- Time: ~5 minutes

### Step 4: Deploy

```bash
git add -A
git commit -m "🤖 Autopilot: Add video system"
git push origin main
```

---

## 📁 FILES CREATED

```
content/
  video-scripts/
    ├── homepage-hero.md
    ├── how-it-works-student-portal.md
    ├── employers-partners.md
    ├── program-holder-admin-portal.md
    ├── delegate-instructor-portal.md
    ├── program-hvac.md
    ├── program-barber-apprenticeship.md
    ├── program-healthcare-cna.md
    ├── program-building-tech-trades.md
    ├── program-cdl-logistics.md
    ├── apply-now.md
    ├── contact-support.md
    └── README.md

components/
  └── VideoPlaceholder.tsx

Scripts:
  ├── setup-video-placeholders.sh
  ├── autopilot-video-setup.sh
  └── autopilot-generate-videos.ts
```

---

## 🎬 WHERE VIDEOS ARE INJECTED

| Page              | Component Location                    | Script File                        |
| ----------------- | ------------------------------------- | ---------------------------------- |
| Homepage          | `app/page.tsx`                        | `homepage-hero.md`                 |
| LMS Landing       | `app/lms/page.tsx`                    | `how-it-works-student-portal.md`   |
| Student Dashboard | `app/lms/dashboard/page.tsx`          | `how-it-works-student-portal.md`   |
| Partners          | `app/partners/page.tsx`               | `employers-partners.md`            |
| Admin Portal      | `app/admin/page.tsx`                  | `program-holder-admin-portal.md`   |
| Delegate Portal   | `app/delegate/page.tsx`               | `delegate-instructor-portal.md`    |
| Programs Overview | `app/programs/page.tsx`               | (general overview)                 |
| HVAC Program      | `app/programs/hvac/page.tsx`          | `program-hvac.md`                  |
| Barber Program    | `app/programs/barber/page.tsx`        | `program-barber-apprenticeship.md` |
| CNA Program       | `app/programs/cna/page.tsx`           | `program-healthcare-cna.md`        |
| Building Tech     | `app/programs/building-tech/page.tsx` | `program-building-tech-trades.md`  |
| CDL Program       | `app/programs/truck-driving/page.tsx` | `program-cdl-logistics.md`         |
| Apply Page        | `app/apply/page.tsx`                  | `apply-now.md`                     |
| Contact Page      | `app/contact/page.tsx`                | `contact-support.md`               |

---

## 💡 USAGE EXAMPLES

### View Generated Placeholders

```bash
# Check what was injected
git diff app/
```

### Test Locally

```bash
npm run dev
# Visit http://localhost:3000
# See placeholders on all pages
```

### Generate Real Videos

```bash
# Option 1: Use AI video tools (recommended)
# See: AI_VIDEO_GENERATION_GUIDE.md

# Option 2: Generate thumbnails only
npx tsx autopilot-generate-videos.ts
```

---

## 🎨 CUSTOMIZING

### Change Placeholder Text

Edit `autopilot-video-setup.sh` and modify the `inject_video_placeholder` calls:

```bash
inject_video_placeholder \
  "app/page.tsx" \
  "Your Custom Title" \
  "Your custom description" \
  "Duration label"
```

### Add More Pages

Add new injection calls to `autopilot-video-setup.sh`:

```bash
inject_video_placeholder \
  "app/your-page/page.tsx" \
  "Video Title" \
  "Description" \
  "30 sec · Coming soon"
```

---

## 🔧 TROUBLESHOOTING

### "VideoPlaceholder not found"

```bash
# Run setup first
./setup-video-placeholders.sh
```

### "File not found" errors

```bash
# Check if page exists
ls -la app/page.tsx

# Script will skip missing files automatically
```

### "Dev server not running"

```bash
# Start dev server
npm run dev

# Wait for "Ready" message
# Then run generation script
```

### "OpenAI API error"

```bash
# Check API key
echo $OPENAI_API_KEY

# Set if missing
export OPENAI_API_KEY=sk-your-key-here

# Or add to .env.local
echo "OPENAI_API_KEY=sk-your-key" >> .env.local
source .env.local
```

---

## 📊 COST & TIME

### Autopilot Setup (Free)

- Time: 2 minutes
- Cost: $0
- Result: All scripts and components ready

### AI Thumbnail Generation (Optional)

- Time: 5 minutes
- Cost: ~$0.50 (12 images)
- Result: Professional thumbnails

### AI Video Generation (External)

- Time: 3-4 hours
- Cost: $19-29/month (tool subscription)
- Result: 12 professional videos

**Total to complete:** 4 hours, ~$25

---

## ✅ WHAT YOU GET

After running autopilot:

1. **12 Professional Scripts**
   - Ready for AI video tools
   - Optimized for 30-60 seconds
   - Covers all key pages

2. **VideoPlaceholder Component**
   - Beautiful, responsive design
   - Consistent branding
   - Easy to customize

3. **Auto-Injected Components**
   - All pages have placeholders
   - Proper imports added
   - Ready to deploy

4. **AI Thumbnails** (if generated)
   - Professional quality
   - Consistent style
   - DALL-E 3 generated

5. **Deployment Ready**
   - Commit and push
   - Vercel auto-deploys
   - Live in 2 minutes

---

## 🎯 NEXT STEPS

### Immediate (Deploy with Placeholders)

```bash
git add -A
git commit -m "🤖 Add video system"
git push origin main
```

### When Ready (Generate Real Videos)

1. Choose AI video tool (HeyGen recommended)
2. Use scripts from `content/video-scripts/`
3. Generate 12 videos
4. Upload to YouTube
5. Update database with URLs
6. Replace placeholders with real videos

---

## 📚 DOCUMENTATION

- `AI_VIDEO_GENERATION_GUIDE.md` - How to generate videos
- `VIDEO_SETUP_COMPLETE.md` - Setup overview
- `content/video-scripts/README.md` - Script usage

---

## 🤖 AUTOPILOT COMMANDS

```bash
# Full setup (run once)
./setup-video-placeholders.sh

# Inject components (run once)
./autopilot-video-setup.sh

# Generate thumbnails (optional)
npx tsx autopilot-generate-videos.ts

# Deploy
git add -A && git commit -m "🤖 Autopilot" && git push
```

---

## ✨ RESULT

**You now have:**

- ✅ Professional video infrastructure
- ✅ Placeholders on all pages
- ✅ Scripts ready for generation
- ✅ Deployment-ready code
- ✅ Consistent branding
- ✅ Professional appearance

**Deploy now, generate videos later!**

---

**Created:** November 16, 2025  
**Status:** Autopilot Ready ✅  
**Mode:** Fully Automated 🤖
