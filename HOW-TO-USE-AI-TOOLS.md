# How to Use Course Content with AI Tools

## 🎨 Image Generation Options

### Option 1: OpenAI DALL-E 3 (Automated via API)

**Cost:** $0.04 per image (1024x1024)

```bash
# Set your API key
export OPENAI_API_KEY="sk-proj-..."

# Generate all 5 course covers
node scripts/generate-images.mjs

# Images will be saved to: public/generated-images/
```

**Total cost for 5 images:** ~$0.20

---

### Option 2: ChatGPT Plus (Manual, Best Quality)

**Cost:** $20/month subscription (includes DALL-E 3)

**Steps:**
1. Go to https://chat.openai.com
2. Copy a prompt from `content/image-prompts/course-hvac-cover.md`
3. Paste into ChatGPT and send
4. Download the generated image
5. Repeat for each course

**Pros:**
- Highest quality DALL-E 3 images
- Can iterate and refine easily
- No API setup needed

**Cons:**
- Manual process (5-10 minutes total)
- Need ChatGPT Plus subscription

---

### Option 3: Leonardo.ai (Free Tier Available)

**Cost:** Free tier: 150 tokens/day (≈30 images)

**Steps:**
1. Sign up at https://leonardo.ai
2. Click "Image Generation"
3. Copy prompt from `content/image-prompts/*.md`
4. Select model: "Leonardo Diffusion XL" or "PhotoReal"
5. Set dimensions: 1024x1024 (square)
6. Generate and download

**Pros:**
- Free tier available
- Fast generation
- Good quality

**Cons:**
- May need to refine prompts for best results
- Free tier has daily limits

---

### Option 4: Midjourney (High Quality, Discord-based)

**Cost:** $10/month basic plan

**Steps:**
1. Join Midjourney Discord: https://discord.gg/midjourney
2. Go to any #general channel
3. Type `/imagine` command
4. Paste prompt from `content/image-prompts/*.md`
5. Add `--ar 1:1` for square format
6. Wait for generation and upscale

**Example command:**
```
/imagine Create a square course cover image for "HVAC Technician Training". Scene: young adult wearing a technician uniform, kneeling next to a rooftop HVAC unit with tools and gauges visible... --ar 1:1 --v 6
```

**Pros:**
- Excellent quality
- Active community
- Fast generation

**Cons:**
- Requires Discord
- Learning curve for commands
- Public generations (unless Pro plan)

---

### Option 5: Stable Diffusion (Free, Local)

**Cost:** Free (requires GPU or use free online services)

**Online Services:**
- https://stablediffusionweb.com (free)
- https://huggingface.co/spaces/stabilityai/stable-diffusion (free)

**Steps:**
1. Visit one of the free SD websites
2. Copy prompt from `content/image-prompts/*.md`
3. Select model: SDXL or SD 1.5
4. Set size: 1024x1024
5. Generate and download

**Pros:**
- Completely free
- No account needed (some sites)
- Fast

**Cons:**
- Quality varies
- May need multiple attempts
- Limited customization on free sites

---

## 🎥 Video Generation Options

### Option 1: HeyGen (Recommended for Quality)

**Cost:** $30/month (20 video credits)

**Steps:**
1. Sign up at https://heygen.com
2. Click "Create Video" → "Script to Video"
3. Copy script from `content/video-scripts/about-elevate-master.md`
4. Choose an AI avatar (professional, diverse options)
5. Select voice (natural, clear)
6. Generate video
7. Download MP4

**Pros:**
- Most realistic AI avatars
- Natural voice synthesis
- Professional quality
- Easy to use

**Cons:**
- Paid only (no free tier)
- $30/month minimum

**Recommended for:**
- Master "About Elevate" video
- All 5 course videos

---

### Option 2: D-ID (Free Tier Available)

**Cost:** Free tier: 5 minutes/month, then $5.90/month

**Steps:**
1. Sign up at https://d-id.com
2. Click "Create Video"
3. Upload a stock photo or choose AI presenter
4. Copy script from `content/video-scripts/*.md`
5. Select voice
6. Generate and download

**Pros:**
- Free tier available
- Quick generation
- Good for testing

**Cons:**
- Free tier limited to 5 minutes/month
- Quality lower than HeyGen
- Watermark on free tier

**Recommended for:**
- Testing scripts before paying
- Short course videos (45 sec each)

---

### Option 3: Synthesia (Enterprise Quality)

**Cost:** $30/month personal plan

**Steps:**
1. Sign up at https://synthesia.io
2. Click "Create Video"
3. Choose template or start blank
4. Copy script from `content/video-scripts/*.md`
5. Select AI avatar
6. Choose voice and language
7. Generate and download

**Pros:**
- Professional quality
- Multi-language support
- Template library
- No watermark

**Cons:**
- Paid only
- Slightly slower generation than HeyGen

**Recommended for:**
- Professional presentations
- Multi-language versions

---

### Option 4: Elai.io (Course-Focused)

**Cost:** $29/month basic plan

**Steps:**
1. Sign up at https://elai.io
2. Click "Create Video"
3. Choose "Script to Video"
4. Copy script from `content/video-scripts/*.md`
5. Select avatar and voice
6. Add course branding
7. Generate and download

**Pros:**
- Designed for educational content
- Course templates
- Good value

**Cons:**
- Smaller avatar selection
- Less realistic than HeyGen

**Recommended for:**
- Educational/training videos
- Budget-conscious projects

---

### Option 5: Manual Video (Real Person)

**Cost:** Free (DIY) or $50-200 (freelancer)

**DIY Steps:**
1. Set up phone/camera with good lighting
2. Read script from `content/video-scripts/*.md`
3. Record in 1-2 takes
4. Edit in CapCut (free) or iMovie
5. Add captions with Rev.com ($1.50/min)

**Freelancer:**
- Fiverr: $50-100 per video
- Upwork: $100-200 per video

**Pros:**
- Most authentic
- No AI limitations
- One-time cost

**Cons:**
- Time-consuming (DIY)
- Requires editing skills
- Higher upfront cost (freelancer)

---

## 💰 Cost Comparison Summary

### Images (5 course covers)

| Tool | Cost | Quality | Time |
|------|------|---------|------|
| OpenAI API | $0.20 | ⭐⭐⭐⭐⭐ | 2 min |
| ChatGPT Plus | $20/mo | ⭐⭐⭐⭐⭐ | 10 min |
| Leonardo.ai | Free | ⭐⭐⭐⭐ | 15 min |
| Midjourney | $10/mo | ⭐⭐⭐⭐⭐ | 10 min |
| Stable Diffusion | Free | ⭐⭐⭐ | 20 min |

### Videos (6 total: 1 master + 5 courses)

| Tool | Cost | Quality | Time |
|------|------|---------|------|
| HeyGen | $30/mo | ⭐⭐⭐⭐⭐ | 30 min |
| D-ID | Free-$6/mo | ⭐⭐⭐ | 30 min |
| Synthesia | $30/mo | ⭐⭐⭐⭐⭐ | 45 min |
| Elai.io | $29/mo | ⭐⭐⭐⭐ | 30 min |
| DIY Real Person | Free | ⭐⭐⭐⭐⭐ | 4-6 hours |

---

## 🎯 Recommended Workflow

### Budget: $0 (Free Tier)

**Images:**
- Use Leonardo.ai free tier (150 tokens/day)
- Generate 5 course covers over 2 days

**Videos:**
- Use D-ID free tier (5 minutes/month)
- Generate 1 master video (90 sec) + 1 course video (45 sec)
- Next month: generate remaining 4 course videos

**Total Cost:** $0
**Total Time:** 2-3 hours spread over 2 months

---

### Budget: $30/month (Best Value)

**Images:**
- Use OpenAI API: $0.20 for all 5 covers
- OR use ChatGPT Plus: $20/mo (if you already have it)

**Videos:**
- Use HeyGen: $30/mo for all 6 videos

**Total Cost:** $30.20 (one-time) or $50/mo (if using ChatGPT Plus)
**Total Time:** 1-2 hours

---

### Budget: $60/month (Premium Quality)

**Images:**
- Use Midjourney: $10/mo for all 5 covers
- Generate multiple variations, pick best

**Videos:**
- Use HeyGen: $30/mo for all 6 videos
- OR Synthesia: $30/mo for all 6 videos

**Total Cost:** $40/mo
**Total Time:** 2-3 hours
**Quality:** Professional-grade

---

## 📝 Quick Reference Commands

### Generate Images (OpenAI API)
```bash
export OPENAI_API_KEY="your-key"
node scripts/generate-images.mjs
ls -la public/generated-images/
```

### Prepare Video Jobs
```bash
node scripts/prepare-video-jobs.mjs
cat content/video-jobs.json
```

### Regenerate All Content
```bash
./generate-course-content.sh
```

### View a Prompt
```bash
cat content/image-prompts/course-hvac-cover.md
```

### View a Script
```bash
cat content/video-scripts/about-elevate-master.md
```

---

## 🎬 Video Script Customization Tips

### Adjust Length
- **Shorter (30 sec):** Remove middle paragraph
- **Longer (60 sec):** Add specific program details

### Change Tone
- **More Formal:** Replace "you'll" with "you will"
- **More Casual:** Add "Hey there!" at start
- **More Urgent:** Add "Limited spots available"

### Add Branding
- Replace "AI instructor" with your brand name
- Add specific location/city names
- Include partner organization names

### Localize
- Add state-specific funding programs
- Mention local employers
- Include regional job market data

---

## 🎨 Image Prompt Customization Tips

### Adjust Style
- **More Realistic:** Add "photorealistic, 8K, professional photography"
- **More Artistic:** Add "digital art, illustrated style"
- **More Modern:** Add "contemporary, minimalist, clean design"

### Change Demographics
- Specify age ranges: "person in their 20s"
- Specify diversity: "diverse group of people"
- Specify gender: "woman" or "man" or "non-binary person"

### Adjust Mood
- **More Inspiring:** Add "hopeful, bright, uplifting"
- **More Professional:** Add "corporate, business-like, formal"
- **More Friendly:** Add "warm, welcoming, approachable"

### Change Aspect Ratio
- **Square (1:1):** Current default for course covers
- **Landscape (16:9):** Add "16:9 aspect ratio" for hero images
- **Portrait (9:16):** Add "9:16 aspect ratio" for mobile/stories

---

## ✅ Quality Checklist

### Before Generating Images
- [ ] Prompts are clear and specific
- [ ] Aspect ratio matches your design needs
- [ ] Color palette aligns with brand
- [ ] No copyrighted elements mentioned
- [ ] Diversity and inclusion considered

### Before Generating Videos
- [ ] Scripts are under 90 seconds
- [ ] Clear call-to-action included
- [ ] Funding/WIOA messaging present
- [ ] Tone matches brand voice
- [ ] No jargon or complex terms

### After Generation
- [ ] Images are high resolution (1024x1024+)
- [ ] Videos have clear audio
- [ ] Captions/subtitles added
- [ ] Files properly named
- [ ] Backup copies saved

---

## 🆘 Troubleshooting

### Images Look Wrong
- Try generating 3-4 variations
- Adjust prompt wording
- Change AI model/tool
- Add more specific details

### Videos Sound Robotic
- Try different voice options
- Add punctuation for natural pauses
- Break long sentences into shorter ones
- Use contractions ("you'll" vs "you will")

### API Errors
- Check API key is set correctly
- Verify account has credits
- Check rate limits
- Review error messages in console

### File Not Found Errors
- Run `./generate-course-content.sh` first
- Check file paths are correct
- Ensure directories exist
- Verify file permissions

---

**Need more help?** Check `COURSE-CONTENT-READY.md` for additional documentation.
