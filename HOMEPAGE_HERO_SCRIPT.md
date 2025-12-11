# Homepage Hero Script - Complete Workforce Pathways

## Overview
Comprehensive homepage script covering all workforce pathways, funding options, and program features for Elevate for Humanity.

## Script File
**Location**: `/public/videos/homepage-hero-script-full.txt`

## Full Script (9 Scenes)

### Scene 1 – Introduction & Funding Overview
**Visual**: Diverse learners, clean modern campus visuals

```
At Elevate for Humanity, we believe education should change your life—without putting you in debt.
That's why our programs are connected to JRI, WRG, WIOA, and federally registered apprenticeships, 
giving you real access to free training, paid opportunities, and true workforce advancement.
```

**Key Messages**:
- Education without debt
- Multiple funding pathways (JRI, WRG, WIOA, Apprenticeships)
- Free training + paid opportunities

---

### Scene 2 – Hybrid Learning Model
**Visual**: Hybrid learning + hands-on visuals

```
Every program is designed with hybrid learning in mind.
You can train online, practice hands-on, complete modules at your own pace, and still have full instructor support.
Whether you're a parent, working, or starting over—our system is built to fit your life.
```

**Key Messages**:
- Flexible hybrid learning
- Online + hands-on training
- Self-paced with support
- Fits any lifestyle

---

### Scene 3 – Registered Apprenticeships
**Visual**: Earn while you learn / apprenticeship scenes

```
Through our Registered Apprenticeship Programs you can earn while you learn.
Gain real work experience, build your hours, and step into a career path with confidence.
You're not just studying—you're working, growing, and getting paid to build your future.
```

**Key Messages**:
- Earn while learning
- Real work experience
- Build required hours
- Get paid to train

---

### Scene 4 – JRI Funding Pathway
**Visual**: Justice-involved individuals, second chances

```
Our partnership with JRI opens doors for justice-involved individuals to receive
training, certifications, and wrap-around support at no cost.
We believe everyone deserves a second chance and a clear path to employment.
```

**Key Messages**:
- JRI partnership
- Justice-involved support
- No-cost training
- Second chances
- Clear employment path

---

### Scene 5 – WRG Pathway
**Visual**: High-demand certifications, fast training

```
With the Workforce Ready Grant (WRG), eligible students can complete high-demand certifications
—completely tuition-free.
WRG was designed to help you reskill fast and step into high-wage, high-opportunity careers.
```

**Key Messages**:
- Workforce Ready Grant
- Tuition-free certifications
- High-demand skills
- Fast reskilling
- High-wage careers

---

### Scene 6 – WIOA Pathway
**Visual**: Career coaching, supportive services

```
Through WIOA, students receive funding for training, case management, career coaching,
supportive services, and job placement assistance.
This makes your education more than a class—it becomes a career plan.
```

**Key Messages**:
- WIOA funding
- Case management
- Career coaching
- Supportive services
- Job placement
- Complete career plan

---

### Scene 7 – Internships & Job Placement
**Visual**: Students working, real employers

```
Many of our programs include internships, externships, or on-the-job learning.
You will build your résumé, work with real employers, and prepare for a role that's ready the day you graduate.
```

**Key Messages**:
- Internships included
- Externships available
- On-the-job learning
- Build résumé
- Work with real employers
- Job-ready at graduation

---

### Scene 8 – Stacked Credentials
**Visual**: Multiple career paths, progression

```
Elevate for Humanity offers stacked credentials across healthcare, trades, beauty, business, technology, and more.
You can start with one certification and continue to build your skills—creating a pathway to long-term earnings, 
promotions, and entrepreneurship.
```

**Key Messages**:
- Stacked credentials
- Multiple industries (healthcare, trades, beauty, business, tech)
- Progressive skill building
- Long-term earnings
- Promotion pathways
- Entrepreneurship opportunities

---

### Scene 9 – Final Call to Action
**Visual**: Diverse students succeeding, campus shots

```
If you're ready for a brand-new future,
start your journey with Elevate for Humanity.
Free training. Real certifications. True career pathways.
You don't need perfect circumstances—just the courage to begin.

Apply today at ElevateForHumanity.org
```

**Key Messages**:
- Brand-new future
- Free training
- Real certifications
- True career pathways
- Courage to begin
- Clear CTA

---

## Script Versions

### Full Version (90-120 seconds)
Complete 9-scene script covering all pathways
- **Use for**: Main homepage video, about page, presentations
- **Duration**: 90-120 seconds
- **Tone**: Comprehensive, empowering, inclusive

### 30-Second Version (Hero Banner)
```
At Elevate for Humanity, education changes your life—without debt. 
Our programs connect you to JRI, WRG, WIOA, and registered apprenticeships 
for free training and paid opportunities. Train online, practice hands-on, 
earn while you learn. From healthcare to trades to technology—we offer 
stacked credentials and real career pathways. You don't need perfect 
circumstances—just the courage to begin. Apply today at ElevateForHumanity.org
```

- **Use for**: Quick hero banner, social media, ads
- **Duration**: 30 seconds
- **Tone**: Fast-paced, energetic, direct

### Voiceover Only Version
Full script without scene directions (saved in file)
- **Use for**: Audio generation, TTS, professional recording
- **Duration**: 90-120 seconds
- **Format**: Plain text, no brackets

## Key Themes

### 1. Accessibility
- Education without debt
- Multiple funding pathways
- Fits any lifestyle
- Second chances

### 2. Flexibility
- Hybrid learning
- Online + hands-on
- Self-paced
- Full support

### 3. Earn While Learning
- Registered Apprenticeships
- Real work experience
- Get paid to train
- Build hours

### 4. Funding Pathways
- **JRI**: Justice-involved individuals
- **WRG**: Workforce Ready Grant
- **WIOA**: Workforce Innovation
- **Apprenticeships**: DOL RAPIDS

### 5. Career Outcomes
- Internships/externships
- Job placement
- Stacked credentials
- Long-term earnings
- Entrepreneurship

## Target Audiences

### Primary
1. **Career Changers** - Looking for new opportunities
2. **Justice-Involved** - Need second chances
3. **Working Parents** - Need flexible training
4. **Unemployed/Underemployed** - Need skills fast
5. **Young Adults** - Starting careers

### Secondary
1. **Employers** - Looking for trained workers
2. **Workforce Boards** - Funding partners
3. **Community Organizations** - Referral partners

## Implementation

### Current Status
- ✅ Script created and saved
- ✅ Voiceover text updated in homepage
- ✅ VoiceoverPlayer component configured
- ⏳ Professional voiceover audio (pending)
- ⏳ Video production (pending)

### Homepage Integration
**File**: `/app/page.tsx`

```tsx
const HOMEPAGE_VOICEOVER = "At Elevate for Humanity, we believe education should change your life...";

<VoiceoverPlayer text={HOMEPAGE_VOICEOVER} autoPlay={true} />
```

Currently uses browser speech synthesis. Will use professional audio when available.

## Creating the Video

### Option 1: Professional Video Production
1. **Hire videographer**
2. **Film on location** (campus, classrooms, students)
3. **Record professional voiceover**
4. **Edit with transitions**
5. **Add background music**

**Cost**: $2,000-$5,000
**Timeline**: 2-4 weeks
**Quality**: Highest

### Option 2: AI Video Generation (InVideo, Pictory)
1. **Upload script** to InVideo or Pictory
2. **Select template** (professional, educational)
3. **Choose stock footage** or upload custom
4. **Generate voiceover** (AI or upload)
5. **Add music** and transitions
6. **Export video**

**Cost**: $20-$100/month
**Timeline**: 1-2 days
**Quality**: Good

### Option 3: Canva Video
1. **Use Canva Video** templates
2. **Add text overlays** for each scene
3. **Use stock footage** from Canva library
4. **Add voiceover** (record or upload)
5. **Export as MP4**

**Cost**: Free-$13/month
**Timeline**: 1 day
**Quality**: Good for social media

### Option 4: Artlist.io AI Video
1. **Use Artlist AI** video generator
2. **Input script** by scene
3. **Select style** (professional, modern)
4. **Generate video**
5. **Download and use**

**Cost**: Artlist subscription
**Timeline**: Hours
**Quality**: Very good

## Voiceover Production

### Option 1: Professional Voice Actor
**Platforms**: Fiverr, Upwork, Voices.com
**Cost**: $100-$300 for 90-120 seconds
**Quality**: Highest
**Timeline**: 3-7 days

**Recommended Voices**:
- Warm, professional female voice
- Clear, confident male voice
- Diverse, inclusive tone

### Option 2: ElevenLabs AI (Premium)
**Cost**: $5-$30/month
**Quality**: Very high
**Timeline**: Minutes

**Recommended Voices**:
- Bella - Warm, friendly
- Rachel - Professional, clear
- Antoni - Confident, clear

### Option 3: Google Cloud TTS
**Cost**: ~$4 per 1M characters
**Quality**: Good
**Timeline**: Instant

**Recommended Voices**:
- en-US-Neural2-F (Female)
- en-US-Neural2-J (Male)

### Option 4: Edge TTS (Free)
**Cost**: Free
**Quality**: Good
**Timeline**: Instant

**Recommended Voices**:
- en-US-JennyNeural (Female)
- en-US-GuyNeural (Male)

## Background Music

### Recommended Tracks
1. **Uplifting Corporate** - Positive, professional
2. **Inspiring Piano** - Emotional, hopeful
3. **Modern Tech** - Clean, forward-thinking
4. **Acoustic Motivation** - Warm, encouraging

### Sources
- **Artlist.io** - Unlimited downloads
- **Epidemic Sound** - High quality
- **AudioJungle** - One-time purchase
- **YouTube Audio Library** - Free

### Mixing
- Keep music at 20-30% volume
- Fade in/out smoothly
- Don't overpower voiceover
- Match tone to message

## Next Steps

### Immediate (This Week)
1. ✅ Script finalized
2. ⏳ Generate professional voiceover
3. ⏳ Create video (AI or professional)
4. ⏳ Add background music
5. ⏳ Upload to website

### Short-term (This Month)
1. Create 30-second version
2. Create social media cuts
3. Add captions/subtitles
4. A/B test different versions
5. Gather feedback

### Long-term (This Quarter)
1. Create program-specific videos
2. Add student testimonials
3. Create multi-language versions
4. Develop video series
5. Build video library

## File Organization

```
public/videos/
├── homepage-hero-script-full.txt          # Full script (this file)
├── homepage-voiceover-script.txt          # Original script
├── homepage-voiceover-natural.txt         # Elizabeth's script
├── voiceover.mp3                          # Current audio
└── [future files]
    ├── homepage-hero-full.mp4             # Full 90-120s video
    ├── homepage-hero-30s.mp4              # 30-second version
    ├── homepage-hero-voiceover.mp3        # Professional voiceover
    └── homepage-hero-music.mp3            # Background music
```

## Testing Checklist

### Before Launch
- [ ] Script reviewed and approved
- [ ] Voiceover recorded and approved
- [ ] Video produced and reviewed
- [ ] Music added and balanced
- [ ] Captions/subtitles added
- [ ] Tested on desktop browsers
- [ ] Tested on mobile devices
- [ ] Tested loading speed
- [ ] Tested accessibility
- [ ] Gathered team feedback

### After Launch
- [ ] Monitor engagement metrics
- [ ] Track video completion rate
- [ ] Measure CTA click-through
- [ ] Gather user feedback
- [ ] A/B test variations

## Success Metrics

### Engagement
- Video play rate: >60%
- Completion rate: >40%
- Replay rate: >10%

### Conversion
- CTA click rate: >5%
- Application starts: +20%
- Contact form submissions: +15%

### Awareness
- Time on page: +30%
- Bounce rate: -20%
- Social shares: +50%

## Summary

✅ **Script Status**: Complete and ready for production

**Key Features**:
- 9 comprehensive scenes
- All funding pathways covered
- Multiple versions available
- Clear call to action

**Next Action**: Generate professional voiceover and create video

**Timeline**: 1-2 weeks for professional production

**Budget**: $100-$300 for voiceover, $0-$5,000 for video (depending on method)

---

**Created**: December 11, 2024
**Script**: homepage-hero-script-full.txt
**Duration**: 90-120 seconds (full), 30 seconds (short)
**Status**: Ready for production
