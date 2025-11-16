# Quick Start Guide - Course Content Generation

## 🎯 What You Have

**11 Ready-to-Use Files:**

- 5 image prompts (course covers)
- 6 video scripts (1 master + 5 courses)

**All courses covered:**
HVAC • Barber • Healthcare/CNA • CDL • Building Tech

---

## ⚡ Fastest Path to Results

### 1. Generate Images (2 minutes)

**Free Option - Leonardo.ai:**

```
1. Go to https://leonardo.ai
2. Sign up (free)
3. Copy prompt from: content/image-prompts/course-hvac-cover.md
4. Paste into Leonardo
5. Click Generate
6. Download image
7. Repeat for other 4 courses
```

**Paid Option - OpenAI API ($0.20 total):**

```bash
export OPENAI_API_KEY="your-key"
node scripts/generate-images.mjs
# Done! Check public/generated-images/
```

---

### 2. Generate Videos (30 minutes)

**Free Option - D-ID (5 min free/month):**

```
1. Go to https://d-id.com
2. Sign up (free tier)
3. Copy script from: content/video-scripts/about-elevate-master.md
4. Paste into D-ID
5. Choose avatar and voice
6. Generate and download
7. Repeat for course videos (next month for remaining)
```

**Paid Option - HeyGen ($30/month):**

```
1. Go to https://heygen.com
2. Sign up ($30/mo)
3. Create new video
4. Copy script from: content/video-scripts/about-elevate-master.md
5. Choose professional avatar
6. Generate all 6 videos
7. Download MP4s
```

---

## 📁 File Locations

```
content/
├── image-prompts/
│   ├── course-hvac-cover.md
│   ├── course-barber-cover.md
│   ├── course-healthcare-cover.md
│   ├── course-cdl-cover.md
│   └── course-building-cover.md
│
└── video-scripts/
    ├── about-elevate-master.md (90 sec)
    ├── course-hvac-program.md (45 sec)
    ├── course-barber-program.md (45 sec)
    ├── course-healthcare-program.md (45 sec)
    ├── course-cdl-program.md (45 sec)
    └── course-building-program.md (45 sec)
```

---

## 🔧 Useful Commands

```bash
# View an image prompt
cat content/image-prompts/course-hvac-cover.md

# View a video script
cat content/video-scripts/about-elevate-master.md

# List all image prompts
ls content/image-prompts/

# List all video scripts
ls content/video-scripts/

# Regenerate all content files
./generate-course-content.sh

# Generate images via OpenAI API
export OPENAI_API_KEY="your-key"
node scripts/generate-images.mjs

# Prepare video batch jobs
node scripts/prepare-video-jobs.mjs
```

---

## 💰 Cost Summary

| Option      | Images      | Videos    | Total  | Time    |
| ----------- | ----------- | --------- | ------ | ------- |
| **Free**    | Leonardo.ai | D-ID      | $0     | 2-3 hrs |
| **Budget**  | OpenAI API  | HeyGen    | $30    | 1 hr    |
| **Premium** | Midjourney  | Synthesia | $40/mo | 2 hrs   |

---

## 📖 Full Documentation

- **COURSE-CONTENT-READY.md** - Complete usage guide
- **HOW-TO-USE-AI-TOOLS.md** - Tool tutorials & comparisons

---

## ✅ Checklist

- [ ] Choose image generation tool
- [ ] Generate 5 course cover images
- [ ] Choose video generation tool
- [ ] Generate master "About Elevate" video (90 sec)
- [ ] Generate 5 course videos (45 sec each)
- [ ] Save all files to appropriate directories
- [ ] Test images on website
- [ ] Test videos on website
- [ ] Add captions to videos (accessibility)

---

## 🎯 Priority Order

**If you only have 30 minutes:**

1. Generate master "About Elevate" video (most important)
2. Generate HVAC course cover image (most popular program)

**If you have 1 hour:**

1. Generate all 5 course cover images
2. Generate master "About Elevate" video
3. Generate 1-2 course videos

**If you have 2 hours:**

1. Generate all 5 course cover images
2. Generate all 6 videos
3. Add captions to videos
4. Test on website

---

## 🆘 Quick Troubleshooting

**"File not found"**
→ Run: `./generate-course-content.sh`

**"API key not set"**
→ Run: `export OPENAI_API_KEY="your-key"`

**"Images look wrong"**
→ Generate 3-4 variations, pick best

**"Videos sound robotic"**
→ Try different voice/avatar in tool

---

**Ready to start?** Pick your tools and go! 🚀
