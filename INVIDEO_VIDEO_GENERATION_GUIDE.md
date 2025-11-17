# 🎬 InVideo AI Video Generation Guide

## ✅ What's Ready

Your video scripts are ready and prompts are generated!

**Run this to see all prompts:**
```bash
node generate-invideo-prompts.mjs
```

---

## 🚀 Quick Start (15 minutes total)

### Step 1: Go to InVideo AI
1. Visit: **https://ai.invideo.io**
2. Sign up or log in
3. Free tier: 4 videos/month
4. Paid: $20/month unlimited

### Step 2: Create Video 1 - Barber Apprenticeship

**Copy this entire prompt into InVideo AI:**

```
Create a 45-60 seconds professional video about Barber Apprenticeship for workforce training.

Style: professional, modern barbershop, diverse professionals, modern, educational, high-quality

Script:
Do you see yourself behind the chair as a professional barber? The Barber Apprenticeship program in the Elevate Connects Directory helps you get there.

Earn-while-you-learn apprenticeship in a real barbershop, building hours toward state barber licensure.

You'll learn through a mix of classroom instruction, hands-on labs, and on-the-job apprenticeship hours so you graduate with both knowledge and real experience.

Thanks to our partnerships with federal and state workforce programs like WIOA, Workforce Ready Grants, and Job Ready Indy, eligible learners may qualify for reduced or no-cost tuition, plus case management and job placement support.

If you're ready to take the next step, visit this program inside ElevateConnectsDirectory.org, review the eligibility details, and complete your application or referral. Our team and partners will follow up to help you with funding and enrollment so you can start moving toward your new career.

Include:
- Professional voiceover (clear, encouraging tone)
- Relevant B-roll footage (professional, modern barbershop, diverse professionals)
- Text overlays for key points
- Upbeat background music
- Call-to-action at end
- Elevate for Humanity branding
```

**In InVideo AI:**
1. Click "Create AI Video"
2. Paste the prompt above
3. Select workflow: "YouTube Explainer" or "Professional"
4. Choose voice: Professional Male or Female
5. Click "Generate Video"
6. Wait 3-5 minutes
7. Review video
8. Click "Export" → "Share" → Copy URL

**Save the URL** - you'll need it!

### Step 3: Create Video 2 - Medical Assistant

**Copy this prompt:**

```
Create a 45-60 seconds professional video about Medical Assistant for workforce training.

Style: healthcare, medical setting, professional, caring, modern, educational, high-quality

Script:
If you're ready to care for others and start a healthcare career, the Medical Assistant pathway in the Elevate Connects Directory is designed for you.

Support physicians and nurses in clinical settings, performing both administrative and basic clinical tasks.

You'll learn through a mix of instructor-led sessions, hands-on practice, and real-world scenarios so you graduate with both knowledge and confidence.

Thanks to our partnerships with federal and state workforce programs like WIOA, Workforce Ready Grants, and Job Ready Indy, eligible learners may qualify for reduced or no-cost tuition, plus case management and job placement support.

If you're ready to take the next step, visit this program inside ElevateConnectsDirectory.org, review the eligibility details, and complete your application or referral. Our team and partners will follow up to help you with funding and enrollment so you can start moving toward your new career.

Include:
- Professional voiceover (clear, encouraging tone)
- Relevant B-roll footage (healthcare, medical setting, professional, caring)
- Text overlays for key points
- Upbeat background music
- Call-to-action at end
- Elevate for Humanity branding
```

Repeat the same steps as Video 1.

### Step 4: Create Video 3 - HVAC Technician

**Copy this prompt:**

```
Create a 45-60 seconds professional video about HVAC Technician for workforce training.

Style: skilled trades, HVAC equipment, professional training, modern, educational, high-quality

Script:
If you like solving problems with your hands and tools, the HVAC Technician Training pathway in the Elevate Connects Directory is a strong entry into HVAC careers.

Hands-on training to install, maintain, and repair heating and cooling systems for residential and commercial buildings.

You'll learn through a mix of classroom instruction, hands-on labs, and on-the-job apprenticeship hours so you graduate with both knowledge and real experience.

Thanks to our partnerships with federal and state workforce programs like WIOA, Workforce Ready Grants, and Job Ready Indy, eligible learners may qualify for reduced or no-cost tuition, plus case management and job placement support.

If you're ready to take the next step, visit this program inside ElevateConnectsDirectory.org, review the eligibility details, and complete your application or referral. Our team and partners will follow up to help you with funding and enrollment so you can start moving toward your new career.

Include:
- Professional voiceover (clear, encouraging tone)
- Relevant B-roll footage (skilled trades, HVAC equipment, professional training)
- Text overlays for key points
- Upbeat background music
- Call-to-action at end
- Elevate for Humanity branding
```

Repeat the same steps as Video 1.

---

## 📝 After Creating All 3 Videos

You should now have 3 URLs like:
- `https://ai.invideo.io/watch/ABC123` (Barber)
- `https://ai.invideo.io/watch/DEF456` (Medical)
- `https://ai.invideo.io/watch/GHI789` (HVAC)

### Update Your Homepage

Run this command with your 3 URLs:

```bash
node update-homepage-videos.mjs \
  https://ai.invideo.io/watch/ABC123 \
  https://ai.invideo.io/watch/DEF456 \
  https://ai.invideo.io/watch/GHI789
```

Replace `ABC123`, `DEF456`, `GHI789` with your actual video IDs.

### Commit and Deploy

```bash
git add app/page.tsx
git commit -m "Add InVideo AI videos for Barber, Medical Assistant, and HVAC programs

- Embedded InVideo AI generated videos
- Professional voiceovers with B-roll footage
- Responsive video layout for mobile/tablet/desktop

Co-authored-by: Ona <no-reply@ona.com>"
git push origin main
```

---

## 🎨 InVideo AI Tips

### Best Practices:
1. **Voice Selection**: Choose a professional, clear voice
2. **Template**: Use "YouTube Explainer" or "Professional" workflow
3. **Music**: Select upbeat but not distracting background music
4. **Branding**: Add your logo in the editor after generation
5. **Captions**: Enable auto-captions for accessibility

### Editing After Generation:
- Click "Edit" to modify scenes
- Adjust timing if needed
- Change music or voiceover
- Add text overlays
- Customize colors to match your brand

### Export Settings:
- Quality: 1080p (Full HD)
- Format: MP4
- Aspect Ratio: 16:9 (landscape)
- Share: Get embeddable link

---

## 💰 Pricing

### Free Tier:
- 4 videos per month
- 1080p quality
- InVideo watermark
- All features

### Paid Plan ($20/month):
- Unlimited videos
- No watermark
- Priority generation
- Premium stock footage
- Commercial license

**Recommendation**: Start with free tier for these 3 videos!

---

## 🔗 Useful Links

- **InVideo AI**: https://ai.invideo.io
- **Pricing**: https://invideo.io/pricing
- **Help Center**: https://invideo.io/help
- **Templates**: https://invideo.io/templates
- **Community**: https://community.invideo.io

---

## ❓ Troubleshooting

### Video won't embed?
- Make sure you're using the share URL, not the editor URL
- Check if video is set to "Public" in InVideo settings
- Try the embed URL format: `https://ai.invideo.io/embed/VIDEO_ID`

### Video quality is low?
- Export in 1080p (Full HD)
- Check your InVideo plan (free tier has limits)
- Re-generate with "high quality" option

### Wrong footage or voice?
- Click "Edit" in InVideo
- Regenerate specific scenes
- Change voice in settings
- Adjust script if needed

### Need different videos?
- Edit the scripts in `content/video-scripts/ecd-courses/`
- Run `node generate-invideo-prompts.mjs` again
- Create new videos with updated prompts

---

## ✅ Checklist

- [ ] Sign up for InVideo AI
- [ ] Create Barber video (save URL)
- [ ] Create Medical Assistant video (save URL)
- [ ] Create HVAC video (save URL)
- [ ] Run `update-homepage-videos.mjs` with URLs
- [ ] Test videos locally (`npm run dev`)
- [ ] Commit changes
- [ ] Push to deploy
- [ ] Verify videos on live site

---

## 🎯 Next Steps

After adding these 3 videos, you can:

1. **Create more program videos** for other courses
2. **Add videos to individual program pages**
3. **Create homepage hero video**
4. **Generate social media clips** from the videos
5. **Add video testimonials** from students

All scripts are ready in `content/video-scripts/` - just follow the same process!

---

**Ready to create your videos? Go to https://ai.invideo.io and start!** 🎬
