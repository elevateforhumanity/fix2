# 🎬 Hero Video Integration Guide

## ✅ Your Videos Are Active!

The video hero banner is now using your actual video files from `/public/videos/`

**Current Homepage Video:** `hero-home.mp4`

---

## 🎥 Available Videos

You have **30+ hero videos** ready to use:

### Homepage Options

- `hero-home.mp4` ⭐ (Currently Active)
- `homepage-hero-new.mp4`
- `elevate-overview-web.mp4`
- `hero-video-with-audio.mp4` (with narration)
- `elevate-overview-with-narration.mp4` (with narration)

### Program-Specific Heroes

- `barber-hero-final.mp4`
- `business-hero-final.mp4`
- `cdl-hero.mp4`
- `cna-hero.mp4`
- `cpr-hero.mp4`
- `hvac-hero-final.mp4`
- `medical-assistant-hero.mp4`
- `building-technician-hero.mp4`

### Section Videos

- `about-section-video.mp4`
- `apply-section-video.mp4`
- `employer-section-video.mp4`
- And many more with narration versions!

---

## 🔄 How to Change Homepage Video

### Option 1: Quick Change (Recommended)

Edit `/config/hero-videos.ts`:

```typescript
// Change this line:
export const currentHomeHero = heroVideos.home;

// To use a different video:
export const currentHomeHero = heroVideos.homeNew;
// or
export const currentHomeHero = heroVideos.elevateOverview;
// or
export const currentHomeHero = heroVideos.heroWithAudio;
```

### Option 2: Enable Audio Narration

Edit `/config/hero-videos.ts`:

```typescript
// Change this line:
export const enableAudioNarration = false;

// To:
export const enableAudioNarration = true;
```

Then use a video with audio:

```typescript
export const currentHomeHero = heroVideos.heroWithAudio;
```

### Option 3: Direct Path

Edit `/app/page.tsx`:

```typescript
<VideoHeroBanner
  videoSrc="/videos/your-video.mp4"
  withAudio={true}
/>
```

---

## 📍 Add Videos to Other Pages

### Programs Page

Edit `/app/programs/page.tsx`:

```typescript
import VideoHeroBanner from '@/components/home/VideoHeroBanner';
import { heroVideos } from '@/config/hero-videos';

// In your component:
<VideoHeroBanner videoSrc={heroVideos.gettingStarted} />
```

### About Page

```typescript
<VideoHeroBanner videoSrc={heroVideos.about} withAudio={true} />
```

### Employer Page

```typescript
<VideoHeroBanner videoSrc={heroVideos.employerPartner} />
```

### Individual Program Pages

```typescript
// Barber program
<VideoHeroBanner videoSrc={heroVideos.barber} />

// HVAC program
<VideoHeroBanner videoSrc={heroVideos.hvac} />

// CNA program
<VideoHeroBanner videoSrc={heroVideos.cna} />
```

---

## 🎨 Customization

### Change Overlay Text

Edit `/components/home/VideoHeroBanner.tsx` (lines 71-85):

```typescript
<h1 className="...">
  Your Custom Headline
</h1>
<p className="...">
  Your custom description
</p>
```

### Adjust Overlay Darkness

Edit line 67:

```typescript
{/* Lighter */}
<div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />

{/* Current */}
<div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

{/* Darker */}
<div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
```

### Change Video Height

Edit line 51:

```typescript
{
  /* Shorter */
}
className = 'relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]';

{
  /* Current */
}
className = 'relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]';

{
  /* Taller */
}
className = 'relative w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px]';
```

---

## 🎯 Quick Recommendations

### For Homepage:

**Best Choice:** `hero-home.mp4` (current)

- Professional
- Shows multiple programs
- Good length
- High quality

**Alternative:** `elevate-overview-web.mp4`

- Comprehensive overview
- Shows facility and students
- Great for first-time visitors

**With Narration:** `hero-video-with-audio.mp4`

- Includes voice-over
- More engaging
- Better for storytelling

### For Program Pages:

Use program-specific videos:

- `/programs/barber` → `barber-hero-final.mp4`
- `/programs/hvac` → `hvac-hero-final.mp4`
- `/programs/cna` → `cna-hero.mp4`
- etc.

### For About Page:

**Best Choice:** `about-section-video-with-narration.mp4`

- Tells your story
- Shows impact
- Personal connection

### For Employer Page:

**Best Choice:** `employer-partner-hero.mp4`

- Targeted to employers
- Shows partnership benefits
- Professional tone

---

## 🔧 Video Controls

Users can:

- ✅ Play/Pause video
- ✅ Mute/Unmute audio
- ✅ View fullscreen
- ✅ Controls appear on hover (desktop)
- ✅ Controls always visible (mobile)

---

## 📱 Mobile Optimization

All videos are:

- ✅ Responsive (adjusts to screen size)
- ✅ Touch-friendly controls
- ✅ Optimized loading
- ✅ Fallback poster image
- ✅ Auto-play (muted)

---

## ✅ Current Setup

**Homepage:**

- Video: `hero-home.mp4`
- Audio: Muted by default
- Auto-play: Yes
- Loop: Yes
- Controls: Available
- Fallback: Poster image

**To Change:** Edit `/config/hero-videos.ts`

---

## 🎉 You're All Set!

Your video hero banners are **live and working** on the homepage!

**Next Steps:**

1. Visit homepage to see video in action
2. Try different videos by editing config
3. Add videos to other pages as needed
4. Customize text and styling

**Your videos are professional and ready to impress visitors!** 🚀
