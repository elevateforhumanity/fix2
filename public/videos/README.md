# Video Assets

This directory contains all video assets for the Elevate for Humanity website.

## Current Status

✅ **66 videos uploaded and active**

All videos are stored locally. No external CDN dependencies.

## Directory Structure

```
/public/videos/
├── hero-*.mp4              # Hero section videos
├── *-section-video.mp4     # Section-specific videos
├── *-spotlight.mp4         # Spotlight/feature videos
└── courses/                # Course-specific videos
    └── *.mp4
```

## Video Inventory

### Hero Videos (Main)
- `hero-home.mp4` - Homepage hero background video

### Program Hero Videos
- `barber-hero.mp4`, `barber-hero-final.mp4`, `barber-hero-new.mp4`
- `business-hero.mp4`, `business-hero-final.mp4`
- `cna-hero.mp4`, `cdl-hero.mp4`
- `building-technician-hero.mp4`

### Section Videos
- `about-section-video.mp4`
- `apply-section-video.mp4`
- `employer-section-video.mp4`
- `programs-overview-video.mp4`
- `success-stories-video.mp4`

### Narrated Versions (Accessibility)
Many videos have `-with-narration` variants for improved accessibility.

### Course Videos
Located in `/public/videos/courses/` - program-specific training videos.

## Usage in Components

```tsx
<video
  autoPlay
  loop
  muted
  playsInline
  className="absolute inset-0 w-full h-full object-cover"
  poster="/images/heroes/hero-homepage.jpg"
>
  <source src="/videos/hero-home.mp4" type="video/mp4" />
</video>
```

## Best Practices

1. Always include `poster` attribute with fallback image
2. Use `muted` for autoplay compatibility
3. Include `playsInline` for mobile devices
4. Keep file sizes reasonable (< 5MB for hero videos)
5. Provide narrated versions for accessibility

## Git LFS

Large video files are tracked with Git LFS:

```bash
git lfs install
git lfs pull
```

See `.gitattributes` for configuration.

## Documentation

For complete media inventory, see `/MEDIA-INVENTORY.md`
