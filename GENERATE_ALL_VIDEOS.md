# Complete Video Generation Plan

## 🎬 Using Your Existing Video Generator

You have `generate-all-video-content.ts` in your repository!

### Step 1: Set Up Environment Variables

```bash
# Add to .env.local
OPENAI_API_KEY=sk-your-key-here
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Step 2: Run Video Generator

```bash
npx tsx generate-all-video-content.ts
```

---

## 📹 27 Program Overview Videos (30-60 seconds each)

### Healthcare Programs (14):
1. **Medical Assistant** - `/content/video-scripts/ecd-courses/medical-assistant-video.md`
2. **CNA Training** - `/content/video-scripts/ecd-courses/cna-healthcare-video.md`
3. **Phlebotomy Technician** - CREATE NEW
4. **Dental Assistant** - CREATE NEW
5. **EKG Technician** - CREATE NEW
6. **Pharmacy Technician** - CREATE NEW
7. **Patient Care Technician** - CREATE NEW
8. **Professional Esthetician** - CREATE NEW
9. **Sterile Processing** - CREATE NEW
10. **Healthcare Administration** - CREATE NEW
11. **CPR Certification** - CREATE NEW
12. **Emergency Health Safety Tech** - CREATE NEW
13. **Peer Recovery Coach** - CREATE NEW
14. **Peer Support Professional** - CREATE NEW

### Skilled Trades (7):
15. **Barber Apprenticeship** - `/content/video-scripts/ecd-courses/barber-apprenticeship-video.md` ✅
16. **HVAC Technician** - `/content/video-scripts/ecd-courses/hvac-technician-video.md` ✅
17. **Building Maintenance** - `/content/video-scripts/ecd-courses/building-technician-video.md` ✅
18. **CDL Training** - `/content/video-scripts/ecd-courses/cdl-transportation-video.md` ✅
19. **Electrical** - `/content/video-scripts/ecd-courses/electrical-apprenticeship-video.md` ✅
20. **Plumbing** - `/content/video-scripts/ecd-courses/plumbing-apprenticeship-video.md` ✅
21. **Welding** - `/content/video-scripts/ecd-courses/welding-fabrication-video.md` ✅

### Other Programs (6):
22. **Workforce Readiness** - CREATE NEW
23. **Business Startup Marketing** - CREATE NEW
24. **Tax Prep Financial Services** - CREATE NEW
25. **Beauty Career Educator** - `/content/video-scripts/ecd-courses/beauty-career-educator-video.md` ✅
26. **Culinary** - `/content/video-scripts/ecd-courses/culinary-arts-video.md` ✅
27. **IT** - `/content/video-scripts/ecd-courses/it-support-apprenticeship-video.md` ✅

**Status**: 13 scripts exist ✅ | 14 scripts needed ❌

---

## 📝 Video Script Template

Create new scripts in `/content/video-scripts/ecd-courses/` using this format:

```markdown
# [Program Name] - Program Overview

## Duration: 45 seconds

## Script:

[Opening - 5 seconds]
"Looking for a career in [field]? Elevate For Humanity has you covered."

[Program Details - 20 seconds]
"Our [Program Name] program is [duration] of hands-on training. You'll learn [key skills]. Training is 100% funded through WIOA, WRG, or JRI - no cost to you."

[Outcomes - 15 seconds]
"Graduates work as [job titles], earning [salary range]. We connect you directly with employers who are hiring."

[Call to Action - 5 seconds]
"Ready to start? Visit elevateforhumanity.org or call your local WorkOne office today."

## Visual Prompts:
- Opening: [Program-specific training scene]
- Middle: [Hands-on learning, instructor helping student]
- Closing: [Graduate at work, professional setting]

## Voiceover Notes:
- Tone: Professional, encouraging, direct
- Pace: Moderate, clear enunciation
- Music: Upbeat, motivational background track
```

---

## 🎥 Video Generation Commands

### Generate Individual Program Video:
```bash
# Example for Medical Assistant
npx tsx generate-videos-fast.mjs --program="medical-assistant" --script="content/video-scripts/ecd-courses/medical-assistant-video.md"
```

### Generate All Program Videos:
```bash
npx tsx generate-all-video-content.ts
```

### Generate with Custom Prompts:
```bash
node generate-videos-fast.mjs
```

---

## 📊 Video Specifications

All videos will be generated with:
- **Format**: MP4 (H.264)
- **Resolution**: 1920x1080 (Full HD)
- **Aspect Ratio**: 16:9
- **Frame Rate**: 30fps
- **Duration**: 30-90 seconds
- **Audio**: AI voiceover + background music
- **Captions**: Auto-generated

---

## 🚀 Quick Start

1. **Check existing scripts**:
```bash
ls content/video-scripts/ecd-courses/
```

2. **Create missing scripts** (14 needed):
   - Copy template above
   - Fill in program-specific details
   - Save to `/content/video-scripts/ecd-courses/[program-name]-video.md`

3. **Set environment variables**:
```bash
export OPENAI_API_KEY=sk-your-key
export NEXT_PUBLIC_SUPABASE_URL=your-url
export SUPABASE_SERVICE_ROLE_KEY=your-key
```

4. **Generate all videos**:
```bash
npx tsx generate-all-video-content.ts
```

5. **Videos will be saved to**:
   - `/public/media/videos/[program-name].mp4`
   - Thumbnails: `/public/media/videos/thumbnails/[program-name].jpg`

---

## 📋 Missing Scripts to Create (Priority Order)

### High Priority (Healthcare):
1. `phlebotomy-technician-video.md`
2. `dental-assistant-video.md`
3. `pharmacy-technician-video.md`
4. `patient-care-technician-video.md`
5. `ekg-technician-video.md`

### Medium Priority (Support Services):
6. `healthcare-administration-video.md`
7. `peer-recovery-coach-video.md`
8. `peer-support-professional-video.md`
9. `cpr-certification-video.md`
10. `emergency-health-safety-video.md`

### Lower Priority (Other):
11. `workforce-readiness-video.md`
12. `business-startup-marketing-video.md`
13. `tax-prep-financial-services-video.md`
14. `professional-esthetician-video.md`

---

## ✅ Next Steps

1. Create the 14 missing video scripts
2. Run `npx tsx generate-all-video-content.ts`
3. Review generated videos
4. Upload to your video hosting (YouTube/Vimeo)
5. Update video URLs in database

**Estimated Time**: 2-3 hours to create scripts, 1-2 hours for generation
