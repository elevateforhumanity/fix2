# 🎥 Add Your VITA Video to the Course

## ✅ Great! You Created a Video!

Your video URL: `https://ai.invideo.io/watch/mDgPo5Ba1GH

---

## 🎯 How to Add It

### Option 1: Add to All Lessons (Recommended)

**This will use your video for all 7 lessons:**

```sql
-- Run this in Supabase SQL Editor
UPDATE lessons
SET video_url = 'https://ai.invideo.io/watch/mDgPo5Ba1GH'
WHERE course_id IN (
  SELECT id FROM courses WHERE code = 'VITA101'
);
```

**Steps:**

1. Open: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/sql/new
2. Copy the SQL above
3. Paste and click "Run"
4. Done! ✅

---

### Option 2: Add to Specific Lesson Only

**If you want the video only in Lesson 1 (Introduction):**

```sql
-- Run this in Supabase SQL Editor
UPDATE lessons
SET video_url = 'https://ai.invideo.io/watch/mDgPo5Ba1GH'
WHERE course_id IN (SELECT id FROM courses WHERE code = 'VITA101')
  AND idx = 1;
```

---

### Option 3: Different Videos for Each Lesson

**If you create 7 different videos:**

```sql
-- Lesson 1: Introduction
UPDATE lessons
SET video_url = 'https://ai.invideo.io/watch/VIDEO1'
WHERE course_id IN (SELECT id FROM courses WHERE code = 'VITA101')
  AND idx = 1;

-- Lesson 2: Volunteer Roles
UPDATE lessons
SET video_url = 'https://ai.invideo.io/watch/VIDEO2'
WHERE course_id IN (SELECT id FROM courses WHERE code = 'VITA101')
  AND idx = 2;

-- Lesson 3: Training
UPDATE lessons
SET video_url = 'https://ai.invideo.io/watch/VIDEO3'
WHERE course_id IN (SELECT id FROM courses WHERE code = 'VITA101')
  AND idx = 3;

-- And so on...
```

---

## 🎬 Video Embedding

### How It Will Display

Your video will be embedded in the lesson page like this:

```html
<div class="video-container">
  <iframe
    src="https://ai.invideo.io/watch/mDgPo5Ba1GH"
    width="100%"
    height="500px"
    frameborder="0"
    allowfullscreen
  >
  </iframe>
</div>
```

Students will see:

1. Your video at the top
2. Lesson content below
3. IRS links and resources
4. Next lesson button

---

## 📝 Video Content Suggestions

**If you're creating more videos, consider:**

### Lesson 1: Introduction (2-3 minutes)

- Welcome to VITA
- What is volunteer tax preparation
- Who can volunteer
- Benefits of volunteering
- Call to action: Sign up with IRS

### Lesson 2: Volunteer Roles (3-4 minutes)

- Tax Preparer role
- Quality Reviewer role
- Greeter/Intake role
- Site Coordinator role
- Time commitment

### Lesson 3: Training Overview (3-4 minutes)

- Link & Learn Taxes platform
- Basic vs Advanced certification
- How to register
- Study tips
- Practice lab demo

### Lesson 4: Practice Lab (4-5 minutes)

- TaxSlayer Pro walkthrough
- How to access practice lab
- Practice scenarios
- Tips for success

### Lesson 5: Ethics (3-4 minutes)

- Confidentiality importance
- Professional standards
- Taxpayer rights
- What NOT to do

### Lesson 6: Quality Review (3-4 minutes)

- Review process
- Common errors
- Checklist walkthrough
- Best practices

### Lesson 7: Getting Started (2-3 minutes)

- Step-by-step signup
- What to expect
- Finding VITA sites
- Final encouragement
- Strong call to action

---

## 🎨 Video Best Practices

### For VITA Training Videos:

1. **Keep it short:** 2-5 minutes per lesson
2. **Clear audio:** Professional voiceover
3. **Simple visuals:** Clean, easy to follow
4. **Include text:** Key points on screen
5. **Call to action:** End with next steps
6. **Branding:** Your logo + IRS logo
7. **Captions:** Add subtitles for accessibility

### Content to Include:

- ✅ Your organization branding
- ✅ IRS VITA program logo
- ✅ Clear explanations
- ✅ Visual examples
- ✅ Links to IRS resources
- ✅ Encouraging tone
- ✅ Professional appearance

---

## 🔗 Video Hosting Options

### Current: InVideo AI

- ✅ Easy to create
- ✅ AI-generated
- ✅ Quick turnaround
- ⚠️ Check if embeddable
- ⚠️ Check if publicly accessible

### Alternative Options:

**YouTube (Recommended):**

- ✅ Free hosting
- ✅ Reliable embedding
- ✅ Good analytics
- ✅ Searchable
- URL format: `https://www.youtube.com/watch?v=VIDEOID

**Vimeo:**

- ✅ Professional
- ✅ Privacy controls
- ✅ No ads
- ✅ Better quality
- URL format: `https://vimeo.com/VIDEOID

**Cloudflare Stream:**

- ✅ Fast delivery
- ✅ Global CDN
- ✅ Analytics
- ⚠️ Paid service

---

## ✅ Quick Setup

**To add your video right now:**

1. **First, add the VITA course:**

   ```bash
   # Run in Supabase SQL Editor:
   # Copy: scripts/add-vita-course.sql
   # Paste and Run
   ```

2. **Then, add your video:**

   ```bash
   # Run in Supabase SQL Editor:
   # Copy: scripts/add-vita-video.sql
   # Paste and Run
   ```

3. **Verify:**
   - Go to your site: `/programs`
   - Find "IRS VITA Tax Preparation Training"
   - Click course
   - Open Lesson 1
   - Your video should appear!

---

## 🎯 Next Steps

1. **Test the video:**
   - Make sure it embeds properly
   - Check if it plays on mobile
   - Verify audio quality

2. **Create more videos:**
   - One for each lesson (7 total)
   - Or use the same video for all

3. **Add to database:**
   - Run the SQL scripts
   - Update video URLs

4. **Launch:**
   - Test enrollment flow
   - Share with students
   - Collect feedback

---

## 📞 Need Help?

**If video doesn't embed:**

- Check if InVideo allows embedding
- Try uploading to YouTube instead
- Use direct video file URL

**If you want different videos:**

- Create 7 separate videos
- Update each lesson individually
- Use the SQL template above

---

**Ready to add your video? Run the SQL scripts!** 🎥
