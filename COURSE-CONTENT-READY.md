# Course Content Generation - Ready to Use

## ✅ What's Been Created

### 📁 Image Prompts (5 Course Covers)

Location: `content/image-prompts/`

1. **course-hvac-cover.md** - HVAC Technician Training
2. **course-barber-cover.md** - Barber Apprenticeship
3. **course-healthcare-cover.md** - CNA & Healthcare Careers
4. **course-cdl-cover.md** - CDL & Transportation Training
5. **course-building-cover.md** - Building Technician & Skilled Trades

Each prompt is optimized for:

- Square (1:1) aspect ratio for course covers
- Professional, realistic photo style
- Diverse representation
- Career-focused mood and composition
- No logos or text (clean design)

### 🎬 Video Scripts (6 Total)

Location: `content/video-scripts/`

**Master Video:**

- **about-elevate-master.md** - Main "About Elevate for Humanity" video (~90 seconds)
  - Explains the platform, funding partnerships (WIOA), and all programs
  - Perfect for homepage hero or about page

**Course-Specific Videos:**

1. **course-hvac-program.md** - HVAC Technician Career Pathway (~45 sec)
2. **course-barber-program.md** - Barber Apprenticeship (~45 sec)
3. **course-healthcare-program.md** - Healthcare & CNA Careers (~45 sec)
4. **course-cdl-program.md** - CDL Truck Driving Career (~45 sec)
5. **course-building-program.md** - Building Tech & Skilled Trades (~45 sec)

Each script includes:

- Clear value proposition
- Funding/tuition support messaging (WIOA)
- Skills and outcomes
- Call-to-action to apply

---

## 🚀 How to Generate Images

### Option 1: Using OpenAI DALL-E (Automated)

1. **Set your OpenAI API key:**

   ```bash
   export OPENAI_API_KEY="your-key-here"
   ```

2. **Run the image generation script:**

   ```bash
   node scripts/generate-images.mjs
   ```

3. **Check generated images:**
   ```bash
   ls -la public/generated-images/
   ```

### Option 2: Manual Generation (Any AI Tool)

You can copy the prompts from `content/image-prompts/*.md` and paste them into:

- **DALL-E 3** (via ChatGPT Plus or API)
- **Midjourney** (Discord bot)
- **Stable Diffusion** (local or online)
- **Leonardo.ai** (free tier available)
- **Adobe Firefly**

Just copy the entire prompt text and generate!

---

## 🎥 How to Generate Videos

### Option 1: Using AI Video Tools (Recommended)

Copy the scripts from `content/video-scripts/*.md` into:

**HeyGen** (https://heygen.com)

- Best for realistic AI avatars
- Upload script, choose avatar, generate
- ~$30/month for basic plan

**Synthesia** (https://synthesia.io)

- Professional AI presenters
- Multi-language support
- ~$30/month for personal plan

**D-ID** (https://d-id.com)

- Quick talking head videos
- Free tier available
- Good for testing

**Elai.io** (https://elai.io)

- Course-focused platform
- Template library
- ~$29/month

### Option 2: Prepare Video Jobs (Automated Queue)

1. **Run the video job preparation script:**

   ```bash
   node scripts/prepare-video-jobs.mjs
   ```

2. **Check the generated job queue:**
   ```bash
   cat content/video-jobs.json
   ```

This creates a JSON file with all video scripts ready to batch-process through your chosen video API.

---

## 📋 Quick Start Script

Run everything at once:

```bash
# Generate all course content files
./generate-course-content.sh

# Set your API key
export OPENAI_API_KEY="your-key-here"

# Generate images
node scripts/generate-images.mjs

# Prepare video jobs
node scripts/prepare-video-jobs.mjs

# Check results
ls -la public/generated-images/
cat content/video-jobs.json
```

---

## 🎨 Customization

### Modify Image Prompts

Edit files in `content/image-prompts/` to adjust:

- Color palettes
- Scene composition
- Mood and style
- Aspect ratios

### Modify Video Scripts

Edit files in `content/video-scripts/` to adjust:

- Tone and voice
- Length and pacing
- Messaging and CTAs
- Instructor personality

After editing, re-run the generation scripts.

---

## 📦 Integration with Your Site

### Using Generated Images

```jsx
// In your course card component
<img
  src="/generated-images/course-hvac-cover.png"
  alt="HVAC Technician Training"
  className="course-cover"
/>
```

### Using Video Scripts

```jsx
// In your video player component
import videoScript from '@/content/video-scripts/about-elevate-master.md';

<VideoPlayer script={videoScript} videoUrl="/videos/about-elevate.mp4" />;
```

### Using Video Jobs JSON

```javascript
// Batch process videos
import videoJobs from '@/content/video-jobs.json';

videoJobs.forEach((job) => {
  // Send to HeyGen, Synthesia, etc.
  generateVideo(job.script, job.outputPath);
});
```

---

## 💡 Tips

1. **Image Generation:**
   - Generate multiple variations and pick the best
   - Use consistent style across all course covers
   - Consider generating both light and dark versions

2. **Video Generation:**
   - Choose one AI avatar/voice and use consistently
   - Add background music (royalty-free)
   - Include captions for accessibility
   - Keep videos under 60 seconds for engagement

3. **Cost Optimization:**
   - Start with free tiers (D-ID, Leonardo.ai)
   - Generate images in batches to save API calls
   - Use video templates to speed up production

---

## 📞 Need Help?

- Check `scripts/generate-images.mjs` for image generation logic
- Check `scripts/prepare-video-jobs.mjs` for video job preparation
- Review `.env.example` for required environment variables
- All prompts are in plain text - easy to modify!

---

**Status:** ✅ All content files generated and ready to use!

**Next Step:** Set your `OPENAI_API_KEY` and run `node scripts/generate-images.mjs`
