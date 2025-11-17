# 🎬 InVideo Complete Setup - One Shot Implementation

## 🎯 Goal
Get professional videos for your entire site in 30 minutes using InVideo AI.

---

## 📋 Step 1: Create InVideo Account

1. Go to: **https://ai.invideo.io**
2. Sign up (free tier: 4 videos/month)
3. Or upgrade: $20/month unlimited

---

## 🎥 Step 2: Create Videos (Use These EXACT Search Terms)

### A. Homepage Hero Video (16:9 Horizontal)

**Search in InVideo:**
```
business promo cinematic website hero
```

**Customize with:**
- Headline: "Elevate For Humanity™"
- Subheadline: "Free & Funded Workforce Training • Apprenticeships • Career Pathways"
- Bullets:
  - "Approved Workforce Training Provider"
  - "Barber Apprenticeship – 1 of 3 in Indiana"
  - "Medical Assistant • HVAC • Building Tech • CDL"
- CTA: "Apply Today at ElevateConnectsDirectory.org"

**Export as:** `hero-elevate-home.mp4`

---

### B. Program Videos (16:9 Horizontal - 30-45 seconds each)

#### Medical Assistant
**Search:** `nursing promo video` OR `healthcare training promo`

**Script to paste:**
```
If you're ready to care for others and start a healthcare career, the Medical Assistant pathway in the Elevate Connects Directory is designed for you.

Support physicians and nurses in clinical settings, performing both administrative and basic clinical tasks.

You'll learn through a mix of instructor-led sessions, hands-on practice, and real-world scenarios so you graduate with both knowledge and confidence.

Thanks to our partnerships with federal and state workforce programs like WIOA, Workforce Ready Grants, and Job Ready Indy, eligible learners may qualify for reduced or no-cost tuition, plus case management and job placement support.

Visit ElevateConnectsDirectory.org to learn more.
```

**Export as:** `program-medical-assistant.mp4`

---

#### Barber Apprenticeship
**Search:** `barber shop promo` OR `grooming studio promo`

**Script to paste:**
```
Do you see yourself behind the chair as a professional barber? The Barber Apprenticeship program in the Elevate Connects Directory helps you get there.

Earn-while-you-learn apprenticeship in a real barbershop, building hours toward state barber licensure.

You'll learn through a mix of classroom instruction, hands-on labs, and on-the-job apprenticeship hours so you graduate with both knowledge and real experience.

Thanks to our partnerships with federal and state workforce programs like WIOA, Workforce Ready Grants, and Job Ready Indy, eligible learners may qualify for reduced or no-cost tuition, plus case management and job placement support.

Visit ElevateConnectsDirectory.org to start your journey.
```

**Export as:** `program-barber-apprenticeship.mp4`

---

#### HVAC Technician
**Search:** `trade school promo` OR `technical training promo`

**Script to paste:**
```
If you like solving problems with your hands and tools, the HVAC Technician Training pathway in the Elevate Connects Directory is a strong entry into HVAC careers.

Hands-on training to install, maintain, and repair heating and cooling systems for residential and commercial buildings.

You'll learn through a mix of classroom instruction, hands-on labs, and on-the-job apprenticeship hours so you graduate with both knowledge and real experience.

Thanks to our partnerships with federal and state workforce programs like WIOA, Workforce Ready Grants, and Job Ready Indy, eligible learners may qualify for reduced or no-cost tuition, plus case management and job placement support.

Visit ElevateConnectsDirectory.org to explore this pathway.
```

**Export as:** `program-hvac.mp4`

---

### C. Social Media Reels (9:16 Vertical)

**Search:** `education instagram reel` OR `course launch reel`

Create 3-4 short reels (15-30 seconds):
- `reel-elevate-enroll-today.mp4`
- `reel-barber-apprenticeship.mp4`
- `reel-workforce-funding.mp4`

---

## 📁 Step 3: Download & Organize Videos

After exporting from InVideo, you'll have:

```
hero-elevate-home.mp4
program-medical-assistant.mp4
program-barber-apprenticeship.mp4
program-hvac.mp4
reel-elevate-enroll-today.mp4
reel-barber-apprenticeship.mp4
reel-workforce-funding.mp4
```

---

## 🚀 Step 4: Upload to Your Site

### Option A: Direct Upload (Recommended)

```bash
# In your Gitpod workspace
mkdir -p public/videos

# Upload your videos to public/videos/
# You can drag and drop in VS Code or use:
# - Gitpod file upload
# - Git LFS for large files
# - Or host on Cloudflare Stream / Vimeo
```

### Option B: Use Video Hosting (Better for Performance)

**Upload to YouTube (Unlisted):**
1. Upload each video to YouTube
2. Set as "Unlisted"
3. Get embed URLs
4. Use in code like: `https://www.youtube.com/embed/VIDEO_ID`

**Or use Cloudflare Stream:**
- Better performance
- No YouTube branding
- $1/1000 minutes viewed

---

## 🔧 Step 5: Update Your Code

The homepage is already set up to use these videos!

Just make sure your videos are in:
```
public/videos/hero-elevate-home.mp4
public/videos/program-medical-assistant.mp4
public/videos/program-barber-apprenticeship.mp4
public/videos/program-hvac.mp4
```

---

## ✅ Verification Checklist

- [ ] Created InVideo account
- [ ] Generated hero video (hero-elevate-home.mp4)
- [ ] Generated 3 program videos
- [ ] Downloaded all videos
- [ ] Uploaded to public/videos/ folder
- [ ] Tested homepage loads video
- [ ] Tested program pages load videos
- [ ] Videos autoplay and loop correctly
- [ ] Mobile responsive (videos work on phone)

---

## 💡 Pro Tips

1. **Keep videos under 30MB** for fast loading
2. **Use 1080p quality** for professional look
3. **Enable captions** in InVideo for accessibility
4. **Test on mobile** - videos should autoplay muted
5. **Add poster images** as fallback (optional)

---

## 🎨 InVideo Settings to Use

- **Aspect Ratio:** 16:9 (horizontal) for website
- **Duration:** 30-60 seconds for programs, 15-30 for hero
- **Voice:** Professional male or female
- **Music:** Upbeat but not distracting
- **Captions:** Enable for accessibility
- **Export Quality:** 1080p

---

## 📞 Need Help?

If videos aren't showing:
1. Check file names match exactly
2. Check files are in `public/videos/` folder
3. Check browser console for errors
4. Try clearing cache and hard refresh

---

**Ready to create your videos? Go to https://ai.invideo.io and start!** 🎬
