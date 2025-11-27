# Content Protection System

Multi-layer protection system to prevent unauthorized copying, scraping, and AI training on proprietary educational content.

## Protection Layers

### 1. Client-Side Protection (`ContentProtection` Component)

**Location**: `components/protection/ContentProtection.tsx`

**Features**:
- ✅ Disable right-click context menu
- ✅ Disable text selection (CSS + JavaScript)
- ✅ Block keyboard shortcuts (Ctrl+C, Ctrl+A, Ctrl+X, Ctrl+U, Ctrl+S)
- ✅ Block DevTools shortcuts (F12, Ctrl+Shift+I/J/C)
- ✅ Disable drag-and-drop
- ✅ Block PrintScreen key
- ✅ Prevent clipboard copy/cut/paste
- ✅ Disable image dragging
- ✅ Hide video download button
- ✅ Optional print blocking
- ✅ Watermark overlay (configurable)
- ✅ Bot/scraper detection (headless browsers, automation tools)
- ✅ AI scraper detection (GPT, Claude, etc.)
- ✅ Honeypot content for scrapers

**Protection Levels**:

```typescript
// Basic - Disables right-click, selection, copy
<ContentProtection level="basic">
  {content}
</ContentProtection>

// Standard - Basic + keyboard shortcuts, print blocking
<ContentProtection level="standard">
  {content}
</ContentProtection>

// Maximum - Standard + visibility tracking, paste blocking, bot detection
<ContentProtection level="maximum" showWatermark={true}>
  {content}
</ContentProtection>
```

**Usage Example**:

```tsx
import ContentProtection from "@/components/protection/ContentProtection";

export default function CoursePage() {
  return (
    <ContentProtection
      level="maximum"
      showWatermark={true}
      watermarkText="ELEVATE © LICENSED CONTENT"
      allowPrint={false}
      allowScreenshot={false}
      blockAIScrapers={true}
    >
      <div>Your protected course content here</div>
    </ContentProtection>
  );
}
```

### 2. Server-Side Protection (Middleware)

**Location**: `middleware.ts`

**Features**:
- ✅ Blocks AI scraper bots at server level
- ✅ Returns 403 for known AI scrapers on protected paths
- ✅ Logs scraping attempts with IP addresses
- ✅ Adds `X-Robots-Tag` headers to prevent indexing

**Blocked AI Scrapers**:
- GPTBot (OpenAI)
- ChatGPT-User
- CCBot (Common Crawl)
- Anthropic-AI (Claude)
- Google-Extended (Bard/Gemini)
- PerplexityBot
- ByteSpider (TikTok)
- Diffbot
- Cohere-AI
- AppleBot-Extended

**Protected Paths**:
- `/student/*`
- `/course/*`
- `/courses/*`
- `/admin/*`
- `/portal/*`
- `/delegate/*`
- `/lms/*`

### 3. Meta Tags Protection

**Location**: `components/protection/AIBlockMeta.tsx`

**Features**:
- ✅ `noai, noimageai` meta tags
- ✅ Bot-specific meta tags (GPTBot, Anthropic, Google-Extended, CCBot)
- ✅ Copyright and licensing declarations
- ✅ Cache control headers
- ✅ AI training opt-out declarations

**Usage**:

```tsx
import AIBlockMeta from "@/components/protection/AIBlockMeta";

export const metadata = {
  title: "Course Content",
  // ... other metadata
};

export default function Page() {
  return (
    <>
      <AIBlockMeta />
      <ContentProtection level="maximum">
        {/* content */}
      </ContentProtection>
    </>
  );
}
```

### 4. Robots.txt Protection

**Location**: `app/robots.txt/route.ts`

**Features**:
- ✅ Blocks all bots from protected paths
- ✅ Explicitly blocks AI scraper user agents
- ✅ Allows public pages (homepage, about, programs, apply)
- ✅ Sitemap reference for allowed pages

**Blocked User Agents**:
```
GPTBot, ChatGPT-User, CCBot, anthropic-ai, Claude-Web,
Google-Extended, PerplexityBot, Omgilibot, FacebookBot,
Applebot-Extended, Bytespider, Diffbot, ImagesiftBot,
Scrapy, python-requests, curl, wget
```

**View**: [https://www.elevateforhumanity.org/robots.txt](https://www.elevateforhumanity.org/robots.txt)

## Implementation Guide

### Step 1: Protect Student Pages

Apply `ContentProtection` to all student-facing content pages:

```tsx
// app/student/hub/page.tsx
import ContentProtection from "@/components/protection/ContentProtection";
import AIBlockMeta from "@/components/protection/AIBlockMeta";

export default function StudentHub() {
  return (
    <>
      <AIBlockMeta />
      <ContentProtection level="maximum">
        {/* Student dashboard content */}
      </ContentProtection>
    </>
  );
}
```

### Step 2: Protect Course Content

```tsx
// app/course/[courseId]/page.tsx
import ContentProtection from "@/components/protection/ContentProtection";
import AIBlockMeta from "@/components/protection/AIBlockMeta";

export default function CoursePage({ params }: { params: { courseId: string } }) {
  return (
    <>
      <AIBlockMeta />
      <ContentProtection
        level="maximum"
        showWatermark={true}
        watermarkText={`ELEVATE © ${params.courseId.toUpperCase()}`}
      >
        {/* Course lessons, videos, materials */}
      </ContentProtection>
    </>
  );
}
```

### Step 3: Protect Admin Pages

```tsx
// app/admin/*/page.tsx
import ContentProtection from "@/components/protection/ContentProtection";

export default function AdminPage() {
  return (
    <ContentProtection level="standard" showWatermark={false}>
      {/* Admin interface */}
    </ContentProtection>
  );
}
```

### Step 4: Video Protection

For embedded videos (Vimeo, YouTube, custom):

```tsx
<ContentProtection level="maximum">
  <div className="video-container">
    <iframe
      src="https://player.vimeo.com/video/..."
      allow="autoplay; fullscreen"
      // Vimeo privacy settings should also be set to:
      // - Disable download
      // - Disable sharing
      // - Domain whitelist only
    />
  </div>
</ContentProtection>
```

**Additional Vimeo Settings**:
1. Go to Video Settings → Privacy
2. Enable "Hide from Vimeo.com"
3. Add domain whitelist: `elevateforhumanity.org`
4. Disable "Allow users to download this video"
5. Disable "Allow users to add this video to collections"

### Step 5: PDF Protection

For PDF course materials:

```tsx
<ContentProtection level="maximum">
  <iframe
    src="/api/protected-pdf?file=course-material.pdf"
    className="w-full h-screen"
    sandbox="allow-same-origin"
    // Disable PDF download via iframe
  />
</ContentProtection>
```

Consider using a PDF viewer library with DRM support like:
- PSPDFKit
- PDF.js with custom controls
- Foxit WebPDF

## What This Protects Against

### ✅ Protected:
1. **Right-click copying** - Disabled
2. **Text selection** - Disabled
3. **Keyboard shortcuts** - Blocked (Ctrl+C, Ctrl+A, etc.)
4. **DevTools inspection** - Shortcuts blocked (F12, etc.)
5. **Image dragging** - Disabled
6. **Screenshot detection** - PrintScreen key blocked
7. **Print** - Optional blocking
8. **AI scraper bots** - Blocked at server + client
9. **Headless browsers** - Detected and blocked
10. **Automation tools** - Selenium, Puppeteer, Playwright detected
11. **Common scrapers** - Scrapy, BeautifulSoup, curl, wget blocked
12. **Search engine AI training** - Meta tags + robots.txt opt-out

### ⚠️ Limited Protection:
1. **Screen recording software** - Cannot be blocked (OS-level)
2. **Phone cameras** - Cannot be blocked (physical)
3. **OCR from screenshots** - Can still extract text from images
4. **Browser extensions** - Some may bypass protections
5. **Determined attackers** - Can disable JavaScript or use advanced tools

### ❌ Cannot Protect:
1. **Physical recording** - Camera pointed at screen
2. **Memory dumps** - Advanced technical attacks
3. **Browser dev tools** (if user is determined enough)
4. **Screen capture at OS level**

## Best Practices

### 1. Layer Your Protections
Use multiple layers together:
- Server-side blocking (middleware)
- Client-side protection (ContentProtection)
- Meta tags (AIBlockMeta)
- Robots.txt
- Legal terms (Terms of Service)

### 2. Watermark Everything
```tsx
<ContentProtection
  showWatermark={true}
  watermarkText="ELEVATE © LICENSED TO: user@email.com"
>
```

### 3. Monitor Access Logs
Check server logs for:
- Blocked AI scraper attempts
- Suspicious user agents
- High-frequency access patterns
- Unusual IP addresses

### 4. Legal Protection
Add to Terms of Service:
- Prohibition of content scraping
- Prohibition of AI training use
- Copyright notices
- DMCA takedown procedures
- Penalties for violations

### 5. DRM for High-Value Content
For premium courses, consider:
- Encrypted video streaming (HLS with AES-128)
- Token-based access with expiration
- Device fingerprinting
- Session limits
- Concurrent access limits

## Testing Protection

### Test Client-Side Protection:
1. Try right-clicking → Should be blocked
2. Try selecting text → Should be blocked
3. Try Ctrl+C → Should be blocked
4. Try F12 → Should be blocked
5. Try dragging images → Should be blocked
6. Check for watermark → Should be visible

### Test Server-Side Protection:
```bash
# Test with curl (should be blocked)
curl -A "GPTBot" https://www.elevateforhumanity.org/student/hub

# Test with normal browser (should work)
curl -A "Mozilla/5.0" https://www.elevateforhumanity.org/student/hub
```

### Test Bot Detection:
```javascript
// In browser console (should detect as bot)
navigator.webdriver = true;
// Reload page - should show "Access Denied"
```

## Monitoring & Alerts

### Log Scraping Attempts:
```typescript
// middleware.ts already logs:
console.warn(`[Security] Blocked AI scraper: ${userAgent} from ${path} (IP: ${ip})`);
```

### Set Up Alerts:
1. **Vercel**: Check function logs for `[Security]` warnings
2. **Sentry**: Add error tracking for blocked attempts
3. **Slack**: Webhook notifications for repeated attempts
4. **Email**: Daily digest of blocked scrapers

## Legal Considerations

### Copyright Notice:
Add to footer and protected pages:
```
© 2024 Elevate for Humanity. All rights reserved.
Unauthorized copying, distribution, or use of this content
for AI training is strictly prohibited.
```

### DMCA Agent:
Register a DMCA agent at: https://www.copyright.gov/dmca-directory/

### Terms of Service:
Include clauses about:
- Content ownership
- Prohibited uses (scraping, AI training)
- Enforcement and penalties
- Takedown procedures

## Limitations & Disclaimers

**This system provides strong deterrence but is not foolproof.**

Determined attackers with technical skills can potentially:
- Disable JavaScript
- Use advanced browser automation
- Record screens at OS level
- Use OCR on screenshots

**The goal is to**:
1. Block 99% of casual copying
2. Block all automated AI scrapers
3. Create legal evidence of protection efforts
4. Deter unauthorized use through technical barriers

**For maximum protection**, combine with:
- Legal agreements (Terms of Service)
- User authentication and tracking
- Encrypted content delivery
- Regular security audits
- DMCA takedown monitoring

## Support

For questions or issues:
- Review logs in Vercel/hosting platform
- Check browser console for protection errors
- Test with different browsers and devices
- Contact: security@elevateforhumanity.org
