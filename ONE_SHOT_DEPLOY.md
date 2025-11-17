# 🚀 ONE-SHOT DEPLOYMENT - Complete Setup

## ✅ What's Ready

Your site is now fully configured with:

- ✅ Professional homepage with video hero
- ✅ All 3 program pages with video integration
- ✅ Canva-style backgrounds and gradients
- ✅ Mobile responsive design
- ✅ Clean, professional copy (no placeholders)

---

## 📋 Quick Deployment Checklist

### Step 1: Create Videos in InVideo (30 minutes)

Follow: `INVIDEO_COMPLETE_SETUP.md`

You need 4 videos:

1. `hero-elevate-home.mp4` - Homepage hero
2. `program-medical-assistant.mp4` - Medical Assistant page
3. `program-barber-apprenticeship.mp4` - Barber page
4. `program-hvac.mp4` - HVAC page

### Step 2: Upload Videos

```bash
# Create videos folder
mkdir -p public/videos

# Upload your 4 videos to public/videos/
# Use Gitpod file upload or drag-and-drop in VS Code
```

### Step 3: Test Locally

```bash
# Start dev server
npm run dev

# Open preview URL and test:
# - Homepage video plays
# - All 3 program pages load
# - Videos autoplay and loop
# - Mobile responsive
```

### Step 4: Commit and Deploy

```bash
# Add all changes
git add .

# Commit
git commit -m "Complete video integration - homepage and all program pages

- Add professional homepage with video hero
- Add Medical Assistant program page with video
- Add Barber Apprenticeship program page with video
- Add HVAC Technician program page with video
- Update all copy to production-ready content
- Remove all placeholder text
- Add Canva-style backgrounds
- Mobile responsive throughout

Co-authored-by: Ona <no-reply@ona.com>"

# Push to deploy
git push origin main
```

---

## 🎯 What Happens Next

1. **Vercel/Netlify Auto-Deploy** - Your changes deploy automatically
2. **Videos Load** - All 4 videos will be served from your site
3. **Professional Look** - No more placeholders or generic content
4. **Ready for Traffic** - Site is production-ready

---

## 📁 File Structure

```
fix2/
├── app/
│   ├── page.tsx                          ← NEW: Professional homepage
│   ├── programs/
│   │   ├── page.tsx                      ← Updated: Icon-based cards
│   │   ├── medical-assistant/
│   │   │   └── page.tsx                  ← NEW: With video
│   │   ├── barber/
│   │   │   └── page.tsx                  ← NEW: With video
│   │   └── hvac/
│   │       └── page.tsx                  ← NEW: With video
├── public/
│   └── videos/
│       ├── hero-elevate-home.mp4         ← YOU ADD THIS
│       ├── program-medical-assistant.mp4 ← YOU ADD THIS
│       ├── program-barber-apprenticeship.mp4 ← YOU ADD THIS
│       └── program-hvac.mp4              ← YOU ADD THIS
├── INVIDEO_COMPLETE_SETUP.md             ← Video creation guide
└── ONE_SHOT_DEPLOY.md                    ← This file
```

---

## 🔧 Troubleshooting

### Videos Not Showing?

**Check 1: File names match exactly**

```bash
ls -la public/videos/
# Should show:
# hero-elevate-home.mp4
# program-medical-assistant.mp4
# program-barber-apprenticeship.mp4
# program-hvac.mp4
```

**Check 2: Videos are in correct format**

- Format: MP4
- Codec: H.264
- Size: Under 30MB each for fast loading

**Check 3: Clear cache**

```bash
# Hard refresh in browser
# Chrome/Edge: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
# Firefox: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
```

### Videos Too Large?

If videos are over 30MB each, consider:

**Option A: Compress videos**

```bash
# Use HandBrake or online compressor
# Target: 1080p, H.264, ~10-20MB per video
```

**Option B: Use video hosting**

- Upload to YouTube (unlisted)
- Or use Cloudflare Stream
- Update video src to hosted URL

---

## 🎨 Customization

### Change Colors

Edit `app/page.tsx` and search for:

- `orange-` → Your brand color
- `slate-` → Your background color

### Add More Programs

1. Copy any program page folder
2. Update video src
3. Update copy
4. Add to programs array in `app/page.tsx`

### Update Copy

All copy is in the page files - no database needed!

- Homepage: `app/page.tsx`
- Programs: `app/programs/[slug]/page.tsx`

---

## ✅ Final Checklist

Before going live:

- [ ] All 4 videos created in InVideo
- [ ] Videos uploaded to `public/videos/`
- [ ] Tested homepage loads video
- [ ] Tested all 3 program pages
- [ ] Mobile responsive verified
- [ ] All links work correctly
- [ ] No placeholder text remaining
- [ ] Committed and pushed to Git
- [ ] Deployment successful
- [ ] Live site tested

---

## 🎉 You're Done!

Your site is now:

- ✅ Professional and polished
- ✅ Video-integrated
- ✅ Mobile responsive
- ✅ Production-ready
- ✅ No placeholders

**Next steps:**

1. Create videos in InVideo (30 min)
2. Upload to public/videos/
3. Test and deploy
4. Share your site!

---

**Need help? Check:**

- `INVIDEO_COMPLETE_SETUP.md` - Video creation guide
- `README.md` - General project info
- Or ask in your team chat!
