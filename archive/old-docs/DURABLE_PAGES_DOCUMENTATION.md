# Durable Pages Documentation

## Overview

The Durable pages are a set of landing pages showcasing Durable AI website builder integration and features. These pages are part of a partnership/affiliate demonstration.

## Purpose

**Intended Use:**

- Demonstrate Durable AI website builder capabilities
- Showcase AI-powered website creation features
- Provide templates and pricing information for Durable AI
- Serve as affiliate/partner landing pages

**NOT for:**

- Core Elevate for Humanity functionality
- Student-facing features
- LMS or training content

## Pages Included

### 1. DurableAI.jsx

**Route:** `/durable-ai`

**Purpose:** Main landing page for Durable AI integration

**Features:**

- Overview of Durable AI website builder
- Key features and benefits
- Call-to-action for website creation

### 2. DurableFeatures.jsx

**Route:** `/durable-features`

**Purpose:** Detailed features page

**Features:**

- Comprehensive feature list
- AI capabilities showcase
- Use cases and examples

### 3. DurablePricing.jsx

**Route:** `/durable-pricing`

**Purpose:** Pricing information for Durable AI

**Features:**

- Pricing tiers
- Plan comparisons
- Subscription options

### 4. DurableTemplates.jsx

**Route:** `/durable-templates`

**Purpose:** Template showcase

**Features:**

- Available website templates
- Industry-specific designs
- Preview functionality

### 5. DurableLanding.jsx

**Route:** `/durable-landing`

**Purpose:** Alternative landing page variant

**Features:**

- Simplified landing experience
- Quick start options
- Conversion-optimized layout

### 6. ProgramsDurable.jsx

**Route:** `/programs-durable`

**Purpose:** Programs page with Durable AI integration

**Features:**

- Program listings with Durable AI styling
- Alternative program presentation

## Static HTML

### durable-landing.html

**Location:** `public/durable-landing.html`

**Purpose:** Static HTML version of Durable landing page

**Use Case:**

- Direct access without React router
- SEO-optimized static page
- Faster initial load

## Usage Status

**Current Status:** ✅ ACTIVE - FAKE LANDING PAGE STRATEGY

**Implementation Strategy:**

- Durable pages serve as **fake landing pages**
- Actual content will be implemented via:
  - External scripts
  - Embedded code/iframes
  - Dynamic content injection
- Pages act as containers/wrappers for Durable-hosted content

**Purpose:**

- Provide branded landing page URLs on EFH domain
- Maintain SEO and branding control
- Allow Durable to manage actual content
- Flexible content updates without code changes

**Link Found:**

- `MainLanding.jsx` has one link to `/durable-features`
- `MainLanding.jsx` itself is at `/main-landing` (not in main nav)

## Implementation Approach

**These pages will:**

1. Load Durable content via script injection
2. Embed Durable-hosted pages via iframe
3. Provide branded wrapper around external content
4. Maintain EFH navigation and branding

**Example Implementation:**

```jsx
// DurableLanding.jsx
export default function DurableLanding() {
  return (
    <div>
      <Header />
      {/* Durable content injected here */}
      <div id="durable-content">
        <script src="https://durable.co/embed.js"></script>
      </div>
      <Footer />
    </div>
  );
}
```

## Maintenance

**If keeping:**

- Update Durable AI branding as needed
- Keep pricing information current
- Test all links and CTAs
- Monitor for broken integrations

**If removing:**

- Remove from router: `src/router/AppRoutes.tsx`
- Delete page files from `src/pages/`
- Remove static HTML from `public/`
- Update any linking pages

## Integration Points

**External Links:**

- Durable AI website
- Affiliate tracking (if applicable)
- Sign-up forms
- Pricing pages

**Internal Links:**

- MainLanding.jsx → DurableFeatures.jsx
- Cross-links between Durable pages

## Recommendation

**Current Recommendation:** ✅ KEEP AS FAKE LANDING PAGES

**Rationale:**

- Serve as branded containers for Durable content
- Maintain EFH domain and SEO benefits
- Allow external content management
- Flexible implementation via scripts/embeds

**Action Items:**

- ✅ Document purpose and usage
- ✅ Keep in codebase as landing page containers
- ✅ Implement script/embed injection as needed
- ✅ Maintain EFH branding wrapper
- 🔄 Add Durable content via external scripts when ready

## Implementation Steps

**Goal:** Match styling from Durable-built website while hosting on EFH domain

### Option 1: Full Iframe Embed (Recommended)

**Preserves exact Durable styling:**

```jsx
export default function DurableLanding() {
  return (
    <div className="min-h-screen">
      {/* Optional: EFH Header if needed */}
      {/* <Header /> */}

      {/* Full Durable page embed */}
      <iframe
        src="https://your-site.durable.co"
        width="100%"
        style={{
          height: '100vh',
          border: 'none',
          display: 'block',
        }}
        title="Durable Landing Page"
      />

      {/* Optional: EFH Footer if needed */}
      {/* <Footer /> */}
    </div>
  );
}
```

### Option 2: Import Durable CSS + HTML

**Copy Durable's exact styling:**

```jsx
import { useEffect } from 'react';

export default function DurableLanding() {
  useEffect(() => {
    // Load Durable's CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://your-site.durable.co/styles.css';
    document.head.appendChild(link);

    return () => document.head.removeChild(link);
  }, []);

  return (
    <div className="durable-page">
      {/* Paste HTML from Durable site here */}
      {/* Maintains exact styling and layout */}
    </div>
  );
}
```

### Option 3: Script Injection

**Let Durable render content:**

```jsx
import { useEffect, useRef } from 'react';

export default function DurableLanding() {
  const containerRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://durable.co/embed.js';
    script.async = true;
    script.setAttribute('data-container', 'durable-content');
    document.body.appendChild(script);

    return () => document.body.removeChild(script);
  }, []);

  return <div id="durable-content" ref={containerRef} className="w-full" />;
}
```

### Option 4: Copy Durable Export

**Export from Durable and import:**

1. Export HTML/CSS from Durable
2. Place in `public/durable-pages/`
3. Load as static content:

```jsx
export default function DurableLanding() {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: durableHTML,
      }}
    />
  );
}
```

## Styling Strategy

**Requirement:** Match Durable website styling exactly

### Recommended Approach: Full Iframe

**Pros:**

- ✅ Exact Durable styling preserved
- ✅ No CSS conflicts with EFH styles
- ✅ Easy updates (change iframe src)
- ✅ Durable manages all styling

**Cons:**

- ⚠️ Separate scroll context
- ⚠️ SEO slightly reduced (content in iframe)
- ⚠️ Requires responsive iframe height

### Alternative: CSS Import + HTML Copy

**Pros:**

- ✅ Better SEO (content on page)
- ✅ Single scroll context
- ✅ Can mix EFH and Durable elements

**Cons:**

- ⚠️ Potential CSS conflicts
- ⚠️ Manual updates needed
- ⚠️ More maintenance

### CSS Isolation Techniques

**If importing Durable CSS:**

```css
/* Scope Durable styles */
.durable-page {
  all: initial; /* Reset EFH styles */
}

.durable-page * {
  all: revert; /* Use Durable styles */
}
```

**Or use Shadow DOM:**

```jsx
useEffect(() => {
  const shadow = containerRef.current.attachShadow({ mode: 'open' });
  shadow.innerHTML = durableHTML;

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://your-site.durable.co/styles.css';
  shadow.appendChild(link);
}, []);
```

## Benefits of This Approach

✅ **SEO Control** - Pages indexed under elevateforhumanity.org  
✅ **Exact Styling** - Match Durable website perfectly  
✅ **Flexibility** - Update Durable content without code deploys  
✅ **No Conflicts** - Isolated from EFH styles  
✅ **Analytics** - Track on EFH domain

---

**Status:** ✅ DOCUMENTED AS FAKE LANDING PAGES  
**Last Updated:** 2025-10-31  
**Maintained By:** Development Team  
**Decision:** Keep as branded containers for Durable-hosted content  
**Implementation:** Via script injection or iframe embedding
