# Hero Configuration Schema

## Purpose

Config-driven hero allows organizations to customize hero content without code changes.

## Schema

Add to `organization_settings.config.branding`:

```json
{
  "branding": {
    "hero": {
      "type": "video",
      "video_src": "/video/hero-home-dec12.mp4",
      "poster": "/images/hero/hero-dec12-poster.jpg",
      "fallback_images": [
        "/images/hero/hero-dec12-1.jpg",
        "/images/hero/hero-dec12-2.jpg",
        "/images/hero/hero-dec12-3.jpg"
      ],
      "title": "Training, Funding, and Workforce Reporting — All In One Platform",
      "subtitle": "Built for students, employers, and workforce agencies to train, fund, track, and scale real outcomes with compliance-ready reporting.",
      "primary_cta": {
        "label": "Apply for Training",
        "href": "/apply"
      },
      "secondary_cta": {
        "label": "License the Platform",
        "href": "/platform"
      }
    }
  }
}
```

## Usage

```typescript
// In homepage or hero component
const orgSettings = await getOrgSettings(orgId);
const heroConfig = orgSettings?.config?.branding?.hero;

<HeroBanner
  type={heroConfig?.type || 'video'}
  videoSrc={heroConfig?.video_src}
  posterSrc={heroConfig?.poster}
  title={heroConfig?.title || defaultTitle}
  subtitle={heroConfig?.subtitle || defaultSubtitle}
  primaryCta={heroConfig?.primary_cta}
  secondaryCta={heroConfig?.secondary_cta}
/>
```

## Benefits

- No code changes for hero updates
- Per-organization customization
- A/B testing hero variants
- White-label ready

## Asset Requirements

### Video

- **Format**: MP4, H.264
- **Duration**: 8-10 seconds
- **Aspect Ratio**: 16:9 (1920x1080 or 1920x600)
- **Size**: Under 8MB recommended
- **Audio**: Embedded (muted by default, user can unmute)

### Poster Image

- **Format**: JPG or PNG
- **Dimensions**: 1920x600px
- **Purpose**: Fallback while video loads

### Fallback Images

- **Format**: JPG or PNG
- **Dimensions**: 1920x600px
- **Purpose**: Static hero if video fails to load

## Video Editing Instructions

For video editors creating hero videos:

1. Use December 12 Hero Banner #1 as opening frame
2. Use December 12 Hero Banner #2 as mid-sequence
3. Use Artlist still(s) already licensed (no new assets)
4. Length: 8–10 seconds
5. Aspect ratio: 16:9 (desktop safe), center-crop friendly
6. Burn in existing voiceover audio
7. Do NOT add music
8. Do NOT add captions (text is overlaid in UI)
9. Export MP4, H.264, under 8MB if possible

## Autoplay Requirements

For video to autoplay correctly:

- Must be muted
- Must have `playsInline` attribute
- Must have `loop` attribute
- Must have poster fallback
- Audio can be unmuted by user via sound button
