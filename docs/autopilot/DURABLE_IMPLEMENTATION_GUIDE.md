# Durable Pages Implementation Guide

## Quick Start: Match Your Durable Website Styling

### Step 1: Get Your Durable Site URL

Your Durable-built website URL (example):

```
https://elevateforhumanity.durable.co
```

### Step 2: Choose Implementation Method

#### Method A: Full Iframe (Easiest - Recommended)

**File:** `src/pages/DurableLanding.jsx`

```jsx
export default function DurableLanding() {
  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      <iframe
        src="https://elevateforhumanity.durable.co"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          display: 'block',
        }}
        title="Elevate for Humanity - Durable Site"
      />
    </div>
  );
}
```

**Result:** Exact Durable styling, zero CSS conflicts

---

#### Method B: Responsive Iframe with Auto-Height

```jsx
import { useEffect, useRef } from 'react';

export default function DurableLanding() {
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;

    // Auto-resize iframe to content height
    const resizeIframe = () => {
      if (iframe && iframe.contentWindow) {
        try {
          const height = iframe.contentWindow.document.body.scrollHeight;
          iframe.style.height = height + 'px';
        } catch (e) {
          // Cross-origin restriction - use fixed height
          iframe.style.height = '100vh';
        }
      }
    };

    iframe?.addEventListener('load', resizeIframe);
    window.addEventListener('resize', resizeIframe);

    return () => {
      iframe?.removeEventListener('load', resizeIframe);
      window.removeEventListener('resize', resizeIframe);
    };
  }, []);

  return (
    <iframe
      ref={iframeRef}
      src="https://elevateforhumanity.durable.co"
      style={{
        width: '100%',
        minHeight: '100vh',
        border: 'none',
        display: 'block',
      }}
      title="Elevate for Humanity"
    />
  );
}
```

---

#### Method C: Export HTML from Durable

**Steps:**

1. Export your Durable site as HTML
2. Place files in `public/durable-export/`
3. Load in React:

```jsx
import { useEffect, useState } from 'react';

export default function DurableLanding() {
  const [html, setHtml] = useState('');

  useEffect(() => {
    fetch('/durable-export/index.html')
      .then((res) => res.text())
      .then(setHtml);
  }, []);

  return (
    <div
      className="durable-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
```

**Add CSS isolation:**

```css
/* src/styles/durable.css */
.durable-content {
  all: initial;
  display: block;
  width: 100%;
}

.durable-content * {
  all: revert;
}
```

---

### Step 3: Apply to All Durable Pages

Update each Durable page file:

**Files to update:**

- `src/pages/DurableAI.jsx`
- `src/pages/DurableFeatures.jsx`
- `src/pages/DurablePricing.jsx`
- `src/pages/DurableTemplates.jsx`
- `src/pages/DurableLanding.jsx`
- `src/pages/ProgramsDurable.jsx`

**Example for DurableFeatures.jsx:**

```jsx
export default function DurableFeatures() {
  return (
    <iframe
      src="https://elevateforhumanity.durable.co/features"
      style={{
        width: '100%',
        height: '100vh',
        border: 'none',
      }}
      title="Features"
    />
  );
}
```

---

### Step 4: Optional - Add EFH Header/Footer

If you want EFH branding around Durable content:

```jsx
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function DurableLanding() {
  return (
    <div>
      <Header />

      <iframe
        src="https://elevateforhumanity.durable.co"
        style={{
          width: '100%',
          height: '80vh',
          border: 'none',
        }}
        title="Elevate for Humanity"
      />

      <Footer />
    </div>
  );
}
```

---

## Testing

### Test Checklist

- [ ] Page loads without errors
- [ ] Styling matches Durable site exactly
- [ ] Responsive on mobile/tablet/desktop
- [ ] No CSS conflicts with EFH styles
- [ ] Links within iframe work correctly
- [ ] Forms submit properly (if any)
- [ ] Analytics tracking works

### Test URLs

After implementation, test these routes:

- `/durable-landing`
- `/durable-ai`
- `/durable-features`
- `/durable-pricing`
- `/durable-templates`
- `/programs-durable`

---

## Troubleshooting

### Issue: Iframe shows "X-Frame-Options" error

**Solution:** Durable must allow embedding. Contact Durable support or:

- Use Method C (HTML export)
- Host Durable content on subdomain

### Issue: Iframe height not correct

**Solution:** Use Method B (auto-height) or set fixed height:

```jsx
style={{ height: '2000px' }}
```

### Issue: CSS conflicts with EFH styles

**Solution:** Use iframe (Method A/B) or add CSS isolation:

```css
.durable-content {
  all: initial;
}
```

### Issue: Links don't work in iframe

**Solution:** Ensure iframe src allows navigation or use:

```jsx
sandbox = 'allow-same-origin allow-scripts allow-forms allow-popups';
```

---

## Production Checklist

Before deploying:

- [ ] Replace example URLs with actual Durable site
- [ ] Test all Durable pages load correctly
- [ ] Verify mobile responsiveness
- [ ] Check page load performance
- [ ] Ensure analytics tracking works
- [ ] Test all forms and CTAs
- [ ] Verify SEO meta tags
- [ ] Check cross-browser compatibility

---

## Quick Reference

**Your Durable Site URL:**

```
https://elevateforhumanity.durable.co
```

**Pages to Update:**

```
src/pages/DurableAI.jsx
src/pages/DurableFeatures.jsx
src/pages/DurablePricing.jsx
src/pages/DurableTemplates.jsx
src/pages/DurableLanding.jsx
src/pages/ProgramsDurable.jsx
```

**Recommended Code:**

```jsx
<iframe
  src="https://elevateforhumanity.durable.co"
  style={{ width: '100%', height: '100vh', border: 'none' }}
  title="Elevate for Humanity"
/>
```

---

**Status:** ✅ READY TO IMPLEMENT  
**Estimated Time:** 15-30 minutes  
**Difficulty:** Easy  
**Recommended Method:** Full Iframe (Method A)
