# Durable Auto-Sync Guide

## Automatic Content Feeding to Durable Landing Pages

### Overview

Yes! There are several ways to automatically feed content into your Durable landing pages without manual updates.

---

## Method 1: Durable API Integration (Best)

### If Durable Provides an API

**Check if Durable offers:**

- Content API
- Webhook integrations
- REST API endpoints

**Implementation:**

```jsx
import { useEffect, useState } from 'react';

export default function DurableLanding() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    // Fetch latest content from Durable API
    fetch('https://api.durable.co/v1/sites/YOUR_SITE_ID/content', {
      headers: {
        Authorization: 'Bearer YOUR_API_KEY',
      },
    })
      .then((res) => res.json())
      .then((data) => setContent(data))
      .catch((err) => console.error('Failed to load Durable content:', err));
  }, []);

  if (!content) return <div>Loading...</div>;

  return <div dangerouslySetInnerHTML={{ __html: content.html }} />;
}
```

---

## Method 2: Webhook + Database Sync

### Auto-update when Durable content changes

**Architecture:**

```
Durable Site Update
    ↓
Webhook Trigger
    ↓
Your API Endpoint
    ↓
Store in Supabase
    ↓
React App Fetches Latest
```

**Setup:**

1. **Create webhook endpoint** (Netlify Function):

```javascript
// netlify/functions/durable-webhook.js
exports.handler = async (event) => {
  const { content, page } = JSON.parse(event.body);

  // Store in Supabase
  const { data, error } = await supabase.from('durable_content').upsert({
    page: page,
    html: content.html,
    css: content.css,
    updated_at: new Date(),
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true }),
  };
};
```

2. **Configure Durable webhook** (if available):

```
Webhook URL: https://yoursite.netlify.app/.netlify/functions/durable-webhook
Events: content.updated, page.published
```

3. **Fetch in React:**

```jsx
import { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';

export default function DurableLanding() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    // Fetch latest from Supabase
    const fetchContent = async () => {
      const { data } = await supabase
        .from('durable_content')
        .select('*')
        .eq('page', 'landing')
        .order('updated_at', { ascending: false })
        .limit(1)
        .single();

      setContent(data);
    };

    fetchContent();

    // Real-time updates
    const subscription = supabase
      .channel('durable_updates')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'durable_content',
        },
        fetchContent
      )
      .subscribe();

    return () => subscription.unsubscribe();
  }, []);

  if (!content) return <div>Loading...</div>;

  return (
    <div>
      <style>{content.css}</style>
      <div dangerouslySetInnerHTML={{ __html: content.html }} />
    </div>
  );
}
```

---

## Method 3: Scheduled Scraping (No API Required)

### Auto-fetch Durable content on schedule

**Using GitHub Actions:**

```yaml
# .github/workflows/sync-durable.yml
name: Sync Durable Content

on:
  schedule:
    - cron: '0 */6 * * *' # Every 6 hours
  workflow_dispatch: # Manual trigger

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Fetch Durable Content
        run: |
          curl https://elevateforhumanity.durable.co > public/durable-export/landing.html
          curl https://elevateforhumanity.durable.co/features > public/durable-export/features.html
          curl https://elevateforhumanity.durable.co/pricing > public/durable-export/pricing.html

      - name: Commit Changes
        run: |
          git config user.name "Durable Sync Bot"
          git config user.email "bot@elevateforhumanity.org"
          git add public/durable-export/
          git diff --quiet && git diff --staged --quiet || git commit -m "Auto-sync Durable content"
          git push
```

**Load in React:**

```jsx
import { useEffect, useState } from 'react';

export default function DurableLanding() {
  const [html, setHtml] = useState('');

  useEffect(() => {
    fetch('/durable-export/landing.html')
      .then((res) => res.text())
      .then(setHtml);
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
```

---

## Method 4: RSS/Feed Integration

### If Durable provides RSS/JSON feed

```jsx
import { useEffect, useState } from 'react';

export default function DurableLanding() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch RSS feed (convert to JSON via service)
    fetch(
      'https://api.rss2json.com/v1/api.json?rss_url=https://elevateforhumanity.durable.co/feed'
    )
      .then((res) => res.json())
      .then((data) => setPosts(data.items));
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <article key={post.guid}>
          <h2>{post.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: post.description }} />
        </article>
      ))}
    </div>
  );
}
```

---

## Method 5: Durable Embed Widget (If Available)

### Use Durable's official embed code

```jsx
import { useEffect } from 'react';

export default function DurableLanding() {
  useEffect(() => {
    // Load Durable's embed script
    const script = document.createElement('script');
    script.src = 'https://embed.durable.co/widget.js';
    script.async = true;
    script.setAttribute('data-site-id', 'YOUR_SITE_ID');
    document.body.appendChild(script);

    return () => document.body.removeChild(script);
  }, []);

  return <div id="durable-embed" data-durable-page="landing" />;
}
```

---

## Method 6: Proxy Through Your Backend

### Fetch Durable content server-side

**Netlify Function:**

```javascript
// netlify/functions/durable-proxy.js
const fetch = require('node-fetch');

exports.handler = async (event) => {
  const { page = 'landing' } = event.queryStringParameters;

  try {
    const response = await fetch(
      `https://elevateforhumanity.durable.co/${page}`
    );
    const html = await response.text();

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/html' },
      body: html,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch Durable content' }),
    };
  }
};
```

**React Component:**

```jsx
import { useEffect, useState } from 'react';

export default function DurableLanding() {
  const [html, setHtml] = useState('');

  useEffect(() => {
    fetch('/.netlify/functions/durable-proxy?page=landing')
      .then((res) => res.text())
      .then(setHtml);
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
```

---

## Method 7: Headless CMS Integration

### Use Durable as headless CMS

**If Durable supports headless mode:**

```jsx
import { useEffect, useState } from 'react';

export default function DurableLanding() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    fetch('https://elevateforhumanity.durable.co/api/content/landing', {
      headers: {
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then(setContent);
  }, []);

  if (!content) return <div>Loading...</div>;

  return (
    <div>
      <h1>{content.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content.body }} />
    </div>
  );
}
```

---

## Recommended Approach

### For Your Use Case: Iframe with Cache Busting

**Simplest auto-sync solution:**

```jsx
export default function DurableLanding() {
  // Add timestamp to force refresh
  const iframeSrc = `https://elevateforhumanity.durable.co?t=${Date.now()}`;

  return (
    <iframe
      src={iframeSrc}
      style={{
        width: '100%',
        height: '100vh',
        border: 'none',
      }}
      title="Elevate for Humanity"
    />
  );
}
```

**With periodic refresh:**

```jsx
import { useState, useEffect } from 'react';

export default function DurableLanding() {
  const [refreshKey, setRefreshKey] = useState(Date.now());

  useEffect(() => {
    // Refresh every 5 minutes
    const interval = setInterval(
      () => {
        setRefreshKey(Date.now());
      },
      5 * 60 * 1000
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <iframe
      key={refreshKey}
      src={`https://elevateforhumanity.durable.co?t=${refreshKey}`}
      style={{
        width: '100%',
        height: '100vh',
        border: 'none',
      }}
      title="Elevate for Humanity"
    />
  );
}
```

---

## Comparison Table

| Method           | Auto-Sync    | Complexity | SEO        | Styling    |
| ---------------- | ------------ | ---------- | ---------- | ---------- |
| Iframe           | ✅ Real-time | Easy       | ⚠️ Limited | ✅ Perfect |
| API Integration  | ✅ Real-time | Medium     | ✅ Good    | ⚠️ Manual  |
| Webhook + DB     | ✅ Real-time | Hard       | ✅ Good    | ⚠️ Manual  |
| Scheduled Scrape | ⚠️ Delayed   | Medium     | ✅ Good    | ✅ Perfect |
| RSS Feed         | ⚠️ Delayed   | Easy       | ✅ Good    | ⚠️ Manual  |
| Embed Widget     | ✅ Real-time | Easy       | ⚠️ Limited | ✅ Perfect |
| Proxy            | ✅ Real-time | Medium     | ✅ Good    | ✅ Perfect |

---

## Next Steps

1. **Check Durable Documentation:**
   - Does Durable provide an API?
   - Are webhooks available?
   - Is there an embed widget?

2. **Choose Method:**
   - **Easiest:** Iframe (Method 1 in main guide)
   - **Best SEO:** Webhook + Database (Method 2)
   - **No API:** Scheduled Scraping (Method 3)

3. **Implement:**
   - Start with iframe for immediate results
   - Upgrade to API/webhook when available

---

**Recommended:** Start with iframe (auto-syncs in real-time, zero setup)

```jsx
<iframe
  src="https://elevateforhumanity.durable.co"
  style={{ width: '100%', height: '100vh', border: 'none' }}
/>
```

**Upgrade to:** API integration when Durable provides it

---

**Status:** ✅ MULTIPLE AUTO-SYNC OPTIONS AVAILABLE  
**Easiest:** Iframe with real-time sync  
**Best:** API/Webhook integration  
**No API:** Scheduled scraping
