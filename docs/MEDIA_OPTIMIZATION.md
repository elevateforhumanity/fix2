# Media Optimization Guide

## Overview

This document describes the media optimization strategies implemented across the platform to ensure fast loading times and optimal user experience.

## Image Optimization

### Automatic Optimization

All images are automatically optimized using Next.js Image component:

```tsx
import Image from 'next/image';

<Image
  src="/images/hero.jpg"
  alt="Hero image"
  width={1920}
  height={1080}
  priority // For above-the-fold images
  placeholder="blur" // Show blur while loading
/>
```

### Supported Formats

1. **WebP** - Primary format (80% smaller than JPEG)
2. **AVIF** - Next-gen format (50% smaller than WebP)
3. **JPEG** - Fallback for older browsers
4. **PNG** - For images requiring transparency

### Responsive Images

Images are automatically served in multiple sizes:

**Device Sizes**: 640, 750, 828, 1080, 1200, 1920, 2048, 3840px
**Image Sizes**: 16, 32, 48, 64, 96, 128, 256, 384px

### Image Guidelines

#### Hero Images
- **Dimensions**: 1920x1080px
- **Format**: WebP
- **Quality**: 80%
- **Max File Size**: 200KB

#### Course Thumbnails
- **Dimensions**: 800x600px
- **Format**: WebP
- **Quality**: 85%
- **Max File Size**: 100KB

#### Profile Pictures
- **Dimensions**: 400x400px
- **Format**: WebP
- **Quality**: 90%
- **Max File Size**: 50KB

#### Icons and Logos
- **Dimensions**: 200x200px
- **Format**: SVG (preferred) or PNG
- **Max File Size**: 20KB

### Lazy Loading

All images below the fold are lazy-loaded automatically:

```tsx
<Image
  src="/images/content.jpg"
  alt="Content"
  width={800}
  height={600}
  loading="lazy" // Default behavior
/>
```

### Blur Placeholders

Generate blur placeholders for better UX:

```typescript
import { generateBlurPlaceholder } from '@/lib/mediaOptimization';

const blurDataURL = await generateBlurPlaceholder(imageBuffer);

<Image
  src="/images/photo.jpg"
  alt="Photo"
  width={800}
  height={600}
  placeholder="blur"
  blurDataURL={blurDataURL}
/>
```

## Video Optimization

### Video Formats

1. **MP4 (H.264)** - Primary format (best compatibility)
2. **WebM (VP9)** - Alternative format (better compression)
3. **HLS** - For adaptive streaming

### Video Resolutions

#### Standard Resolutions
- **360p**: 640x360, 800kbps - Mobile/Low bandwidth
- **480p**: 854x480, 1200kbps - Mobile/Standard
- **720p**: 1280x720, 2500kbps - Desktop/HD
- **1080p**: 1920x1080, 5000kbps - Desktop/Full HD

### Adaptive Streaming

Use HLS for videos longer than 5 minutes:

```tsx
import { getAdaptiveStreamingUrl } from '@/lib/mediaOptimization';

const { hls, dash } = getAdaptiveStreamingUrl(videoId);

<video controls>
  <source src={hls} type="application/x-mpegURL" />
  <source src={dash} type="application/dash+xml" />
</video>
```

### Video Thumbnails

Generate thumbnails for video previews:

```typescript
import { generateVideoThumbnail } from '@/lib/mediaOptimization';

const thumbnail = await generateVideoThumbnail(videoPath, 5); // 5 seconds
```

### Video Guidelines

#### Course Videos
- **Resolution**: 720p minimum, 1080p preferred
- **Bitrate**: 2500kbps (720p), 5000kbps (1080p)
- **Format**: MP4 (H.264)
- **Max Duration**: 30 minutes per video
- **Recommended Duration**: 5-15 minutes

#### Promotional Videos
- **Resolution**: 1080p
- **Bitrate**: 5000kbps
- **Format**: MP4 (H.264)
- **Max Duration**: 2 minutes

## CDN Configuration

### Caching Strategy

```javascript
// Static assets - Cache for 1 year
Cache-Control: public, max-age=31536000, immutable

// Images - Cache for 1 year
Cache-Control: public, max-age=31536000, immutable

// Videos - Cache for 1 year
Cache-Control: public, max-age=31536000, immutable

// HTML pages - Cache for 1 hour, revalidate
Cache-Control: public, max-age=3600, must-revalidate
```

### CDN Domains

Configure CDN domains in environment variables:

```env
NEXT_PUBLIC_CDN_DOMAIN=https://cdn.elevateforhumanity.org
NEXT_PUBLIC_IMAGE_CDN=https://images.elevateforhumanity.org
NEXT_PUBLIC_VIDEO_CDN=https://videos.elevateforhumanity.org
```

## Performance Optimization

### Critical Images

Preload critical above-the-fold images:

```tsx
<link
  rel="preload"
  as="image"
  href="/images/hero.webp"
  type="image/webp"
/>
```

### Prefetch Images

Prefetch images for next page:

```tsx
<link
  rel="prefetch"
  as="image"
  href="/images/next-page.webp"
/>
```

### Image Sprites

Use CSS sprites for small icons:

```css
.icon {
  background-image: url('/images/sprite.png');
  background-position: -10px -20px;
  width: 24px;
  height: 24px;
}
```

## Batch Optimization

### Optimize Existing Images

```typescript
import { batchOptimizeImages } from '@/lib/mediaOptimization';

const paths = [
  'hero-1.jpg',
  'hero-2.jpg',
  'course-1.jpg',
];

const results = await batchOptimizeImages(paths, {
  quality: 80,
  format: 'webp',
});

console.log(results);
```

### Optimization Script

Run optimization script for all images:

```bash
npm run optimize:images
```

## Monitoring

### Image Metrics

Track image performance:

```typescript
import { getImageMetrics } from '@/lib/mediaOptimization';

const metrics = await getImageMetrics(imageBuffer);

console.log({
  originalSize: metrics.originalSize,
  optimizedSize: metrics.optimizedSize,
  compressionRatio: metrics.compressionRatio,
  format: metrics.format,
  dimensions: metrics.dimensions,
});
```

### Performance Metrics

Monitor Core Web Vitals:

- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

## Best Practices

### DO ✅

1. **Use Next.js Image component** for all images
2. **Specify width and height** to prevent layout shift
3. **Use WebP format** for all new images
4. **Lazy load** images below the fold
5. **Compress videos** before uploading
6. **Use adaptive streaming** for long videos
7. **Generate thumbnails** for all videos
8. **Set proper alt text** for accessibility
9. **Use blur placeholders** for better UX
10. **Monitor performance** regularly

### DON'T ❌

1. **Don't use unoptimized images** from external sources
2. **Don't upload raw camera photos** (too large)
3. **Don't use GIFs** for animations (use video instead)
4. **Don't forget alt text** (accessibility issue)
5. **Don't use inline base64** for large images
6. **Don't skip image dimensions** (causes layout shift)
7. **Don't use PNG** for photos (use WebP/JPEG)
8. **Don't upload 4K videos** (too large for web)
9. **Don't autoplay videos** with sound
10. **Don't ignore mobile optimization**

## Tools

### Image Optimization Tools

- **Sharp** - Node.js image processing
- **ImageOptim** - Mac app for image compression
- **Squoosh** - Web-based image optimizer
- **TinyPNG** - PNG/JPEG compression

### Video Optimization Tools

- **FFmpeg** - Video encoding and processing
- **HandBrake** - Video transcoding
- **Adobe Media Encoder** - Professional encoding
- **CloudConvert** - Online video converter

## Troubleshooting

### Images Not Loading

1. Check image path is correct
2. Verify image exists in storage
3. Check remote patterns in next.config.mjs
4. Verify CDN configuration

### Slow Image Loading

1. Check image file size (should be < 200KB)
2. Verify CDN is working
3. Check network throttling
4. Verify caching headers

### Video Buffering

1. Check video bitrate (should match resolution)
2. Verify adaptive streaming is enabled
3. Check CDN configuration
4. Test on different networks

## Migration Guide

### Migrating Existing Images

1. **Audit current images**
   ```bash
   find ./public/images -type f -exec ls -lh {} \;
   ```

2. **Identify large images** (> 200KB)
   ```bash
   find ./public/images -type f -size +200k
   ```

3. **Batch optimize**
   ```bash
   npm run optimize:images
   ```

4. **Update image references**
   - Replace `<img>` with `<Image>`
   - Add width and height props
   - Add alt text

5. **Test performance**
   - Run Lighthouse audit
   - Check Core Web Vitals
   - Test on mobile devices

## Resources

- [Next.js Image Optimization](https://nextjs.org/docs/basic-features/image-optimization)
- [Web.dev Image Optimization](https://web.dev/fast/#optimize-your-images)
- [MDN Responsive Images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
- [FFmpeg Documentation](https://ffmpeg.org/documentation.html)
- [WebP Format](https://developers.google.com/speed/webp)
- [AVIF Format](https://jakearchibald.com/2020/avif-has-landed/)
