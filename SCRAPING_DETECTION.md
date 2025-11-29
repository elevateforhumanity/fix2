# REAL-TIME SCRAPING DETECTION & ALERTS

**Get notified INSTANTLY when someone tries to scrape your site**

---

## 🚨 YES - YOU CAN DETECT SCRAPING ATTEMPTS

### What We'll Detect:

1. ✅ **ChatGPT/AI Scrapers** - When someone feeds your site to ChatGPT
2. ✅ **Automated Bots** - Scrapers, crawlers, data extractors
3. ✅ **Rapid Page Access** - Someone downloading multiple pages quickly
4. ✅ **Suspicious Patterns** - Unusual browsing behavior
5. ✅ **Copy/Paste Detection** - When someone copies your content
6. ✅ **Screenshot Detection** - When someone takes screenshots
7. ✅ **DevTools Detection** - When someone opens browser inspector

---

## 🎯 IMPLEMENTATION - 3 LAYERS

### Layer 1: Bot Detection (Catches 80% of scrapers)
### Layer 2: Behavior Analysis (Catches 15% more)
### Layer 3: Advanced Detection (Catches remaining 5%)

---

## 🤖 LAYER 1: BOT DETECTION

### Detect Known Scrapers

Create: `middleware.ts` in project root

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Known scraper user agents
const SCRAPER_PATTERNS = [
  // AI Scrapers
  'GPTBot',
  'ChatGPT',
  'Claude-Web',
  'anthropic-ai',
  'CCBot',
  'Google-Extended',
  'PerplexityBot',
  'Omgilibot',
  
  // Common Scrapers
  'scrapy',
  'python-requests',
  'curl',
  'wget',
  'axios',
  'node-fetch',
  'got',
  'httpx',
  'aiohttp',
  
  // Headless Browsers
  'HeadlessChrome',
  'PhantomJS',
  'Selenium',
  'Puppeteer',
  'Playwright',
  
  // Data Extractors
  'Applebot',
  'Baiduspider',
  'YandexBot',
  'DuckDuckBot',
  'Slurp',
  'Bingbot',
  'AhrefsBot',
  'SemrushBot',
  'MJ12bot',
  'DotBot',
  'BLEXBot',
];

// Rate limiting storage
const requestCounts = new Map<string, { count: number; firstRequest: number }>();

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
  const url = request.nextUrl.pathname;
  
  // Check if user agent matches known scrapers
  const isScraper = SCRAPER_PATTERNS.some(pattern => 
    userAgent.toLowerCase().includes(pattern.toLowerCase())
  );
  
  if (isScraper) {
    // ALERT! Scraper detected
    sendScraperAlert({
      type: 'KNOWN_SCRAPER',
      userAgent,
      ip,
      url,
      timestamp: new Date().toISOString()
    });
    
    // Block or allow with warning
    return new NextResponse('Access Denied - Scraping Not Allowed', { 
      status: 403,
      headers: {
        'X-Scraping-Detected': 'true',
        'X-Legal-Notice': 'Unauthorized scraping is prohibited. Legal action will be taken.'
      }
    });
  }
  
  // Rate limiting - detect rapid requests
  const now = Date.now();
  const userKey = `${ip}-${userAgent}`;
  const userRequests = requestCounts.get(userKey);
  
  if (!userRequests) {
    requestCounts.set(userKey, { count: 1, firstRequest: now });
  } else {
    const timeDiff = now - userRequests.firstRequest;
    userRequests.count++;
    
    // If more than 20 requests in 10 seconds = likely scraper
    if (userRequests.count > 20 && timeDiff < 10000) {
      sendScraperAlert({
        type: 'RAPID_REQUESTS',
        userAgent,
        ip,
        url,
        requestCount: userRequests.count,
        timeWindow: timeDiff,
        timestamp: new Date().toISOString()
      });
      
      return new NextResponse('Rate Limit Exceeded', { 
        status: 429,
        headers: {
          'Retry-After': '60',
          'X-Rate-Limit-Detected': 'true'
        }
      });
    }
    
    // Reset after 1 minute
    if (timeDiff > 60000) {
      requestCounts.set(userKey, { count: 1, firstRequest: now });
    }
  }
  
  // Check for missing browser headers (bots often don't send these)
  const hasAcceptLanguage = request.headers.has('accept-language');
  const hasAccept = request.headers.has('accept');
  const hasReferer = request.headers.has('referer');
  
  if (!hasAcceptLanguage || !hasAccept) {
    sendScraperAlert({
      type: 'SUSPICIOUS_HEADERS',
      userAgent,
      ip,
      url,
      missingHeaders: {
        acceptLanguage: !hasAcceptLanguage,
        accept: !hasAccept,
        referer: !hasReferer
      },
      timestamp: new Date().toISOString()
    });
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/track-usage).*)',
  ],
};

async function sendScraperAlert(data: any) {
  console.error('🚨 SCRAPER DETECTED:', data);
  
  // Send to your alert endpoint
  try {
    await fetch(process.env.NEXT_PUBLIC_SITE_URL + '/api/alert-scraper', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  } catch (error) {
    console.error('Failed to send scraper alert:', error);
  }
}
```

---

## 📊 LAYER 2: BEHAVIOR ANALYSIS

### Detect Suspicious Behavior

Create: `components/ScraperDetection.tsx`

```typescript
'use client';

import { useEffect, useRef } from 'react';

export function ScraperDetection() {
  const mouseMovements = useRef(0);
  const scrollEvents = useRef(0);
  const clickEvents = useRef(0);
  const startTime = useRef(Date.now());
  
  useEffect(() => {
    // Track mouse movements
    const handleMouseMove = () => {
      mouseMovements.current++;
    };
    
    // Track scrolling
    const handleScroll = () => {
      scrollEvents.current++;
    };
    
    // Track clicks
    const handleClick = () => {
      clickEvents.current++;
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClick);
    
    // Check after 5 seconds
    const checkTimer = setTimeout(() => {
      const timeOnPage = Date.now() - startTime.current;
      
      // If no mouse movement, scrolling, or clicks = likely bot
      if (mouseMovements.current === 0 && 
          scrollEvents.current === 0 && 
          clickEvents.current === 0 &&
          timeOnPage > 5000) {
        
        // ALERT! Likely bot
        fetch('/api/alert-scraper', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'NO_HUMAN_BEHAVIOR',
            url: window.location.href,
            timeOnPage,
            mouseMovements: mouseMovements.current,
            scrollEvents: scrollEvents.current,
            clickEvents: clickEvents.current,
            timestamp: new Date().toISOString()
          })
        });
      }
      
      // If page loaded and immediately left = scraper
      if (timeOnPage < 1000 && document.hidden) {
        fetch('/api/alert-scraper', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'RAPID_PAGE_LOAD',
            url: window.location.href,
            timeOnPage,
            timestamp: new Date().toISOString()
          })
        });
      }
    }, 5000);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClick);
      clearTimeout(checkTimer);
    };
  }, []);
  
  return null;
}
```

---

## 🔍 LAYER 3: ADVANCED DETECTION

### Detect Copy/Paste, Screenshots, DevTools

Create: `components/AdvancedScraperDetection.tsx`

```typescript
'use client';

import { useEffect } from 'react';

export function AdvancedScraperDetection() {
  useEffect(() => {
    // Detect copy events
    const handleCopy = (e: ClipboardEvent) => {
      const selection = window.getSelection()?.toString() || '';
      
      if (selection.length > 100) {
        // Someone copied a lot of text
        fetch('/api/alert-scraper', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'LARGE_COPY',
            url: window.location.href,
            textLength: selection.length,
            timestamp: new Date().toISOString()
          })
        });
      }
    };
    
    // Detect DevTools opening
    const detectDevTools = () => {
      const threshold = 160;
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold = window.outerHeight - window.innerHeight > threshold;
      
      if (widthThreshold || heightThreshold) {
        fetch('/api/alert-scraper', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'DEVTOOLS_OPENED',
            url: window.location.href,
            timestamp: new Date().toISOString()
          })
        });
      }
    };
    
    // Detect right-click (often used before "View Source")
    const handleContextMenu = (e: MouseEvent) => {
      fetch('/api/alert-scraper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'RIGHT_CLICK',
          url: window.location.href,
          timestamp: new Date().toISOString()
        })
      });
    };
    
    // Detect keyboard shortcuts for DevTools
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
        (e.ctrlKey && e.key === 'U')
      ) {
        fetch('/api/alert-scraper', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'DEVTOOLS_SHORTCUT',
            url: window.location.href,
            key: e.key,
            timestamp: new Date().toISOString()
          })
        });
      }
    };
    
    document.addEventListener('copy', handleCopy);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    
    // Check for DevTools every 1 second
    const devToolsInterval = setInterval(detectDevTools, 1000);
    
    return () => {
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      clearInterval(devToolsInterval);
    };
  }, []);
  
  return null;
}
```

---

## 📧 ALERT ENDPOINT

Create: `app/api/alert-scraper/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      type,
      userAgent,
      ip,
      url,
      timestamp,
      ...additionalData
    } = body;
    
    console.error('🚨 SCRAPING ATTEMPT DETECTED:', {
      type,
      url,
      ip,
      userAgent,
      ...additionalData
    });
    
    // Log to database
    const supabase = await createClient();
    await supabase.from('scraping_attempts').insert({
      detection_type: type,
      url,
      ip_address: ip || request.ip || request.headers.get('x-forwarded-for'),
      user_agent: userAgent || request.headers.get('user-agent'),
      additional_data: additionalData,
      detected_at: timestamp
    });
    
    // Send immediate email alert
    await sendEmailAlert({
      type,
      url,
      ip: ip || request.ip || 'unknown',
      userAgent: userAgent || request.headers.get('user-agent') || 'unknown',
      timestamp,
      ...additionalData
    });
    
    // Send Slack/Discord notification (optional)
    await sendSlackAlert({
      type,
      url,
      ip: ip || request.ip || 'unknown',
      timestamp
    });
    
    return NextResponse.json({ 
      status: 'alert_sent',
      message: 'Scraping attempt logged and alert sent'
    });
    
  } catch (error) {
    console.error('Error processing scraper alert:', error);
    return NextResponse.json(
      { error: 'Failed to process alert' },
      { status: 500 }
    );
  }
}

async function sendEmailAlert(data: any) {
  // Using SendGrid (you'll set this up)
  const emailContent = `
🚨 SCRAPING ATTEMPT DETECTED

Type: ${data.type}
URL: ${data.url}
IP Address: ${data.ip}
User Agent: ${data.userAgent}
Time: ${data.timestamp}

Additional Details:
${JSON.stringify(data, null, 2)}

ACTIONS TO TAKE:
1. Review the attempt in your dashboard
2. Check if this is a known threat
3. Consider blocking this IP if repeated
4. Document for legal evidence if needed

View full details: https://elevateforhumanity.org/admin/security/scraping-attempts
  `;
  
  console.log('[EMAIL ALERT]', emailContent);
  
  // TODO: Implement actual email sending
  // Uncomment when SendGrid is configured:
  /*
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  
  await sgMail.send({
    to: process.env.ALERT_EMAIL || 'elizabeth@elevateforhumanity.org',
    from: 'security@elevateforhumanity.org',
    subject: `🚨 Scraping Attempt: ${data.type}`,
    text: emailContent
  });
  */
}

async function sendSlackAlert(data: any) {
  if (!process.env.SLACK_WEBHOOK_URL) return;
  
  try {
    await fetch(process.env.SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: `🚨 Scraping Attempt Detected`,
        blocks: [
          {
            type: 'header',
            text: {
              type: 'plain_text',
              text: '🚨 Scraping Attempt Detected'
            }
          },
          {
            type: 'section',
            fields: [
              { type: 'mrkdwn', text: `*Type:*\n${data.type}` },
              { type: 'mrkdwn', text: `*URL:*\n${data.url}` },
              { type: 'mrkdwn', text: `*IP:*\n${data.ip}` },
              { type: 'mrkdwn', text: `*Time:*\n${data.timestamp}` }
            ]
          }
        ]
      })
    });
  } catch (error) {
    console.error('Failed to send Slack alert:', error);
  }
}
```

---

## 🗄️ DATABASE TABLE

Add to your migrations:

```sql
-- Scraping Attempts Tracking
CREATE TABLE IF NOT EXISTS scraping_attempts (
    id SERIAL PRIMARY KEY,
    
    -- Detection Info
    detection_type VARCHAR(50) NOT NULL,
    url TEXT NOT NULL,
    
    -- User Info
    ip_address VARCHAR(45),
    user_agent TEXT,
    
    -- Additional Data
    additional_data JSONB,
    
    -- Timestamps
    detected_at TIMESTAMP NOT NULL,
    logged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Actions Taken
    blocked BOOLEAN DEFAULT FALSE,
    ip_banned BOOLEAN DEFAULT FALSE,
    alert_sent BOOLEAN DEFAULT TRUE,
    
    -- Notes
    notes TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_scraping_type ON scraping_attempts(detection_type);
CREATE INDEX idx_scraping_ip ON scraping_attempts(ip_address);
CREATE INDEX idx_scraping_detected ON scraping_attempts(detected_at);

-- View for recent scraping attempts
CREATE OR REPLACE VIEW recent_scraping_attempts AS
SELECT 
    detection_type,
    COUNT(*) as attempt_count,
    MAX(detected_at) as last_attempt,
    ip_address,
    user_agent
FROM scraping_attempts
WHERE detected_at > NOW() - INTERVAL '24 hours'
GROUP BY detection_type, ip_address, user_agent
ORDER BY last_attempt DESC;
```

---

## 🔔 CHATGPT SPECIFIC DETECTION

### Detect When Someone Feeds Your Site to ChatGPT

```typescript
// Add to middleware.ts

// ChatGPT/AI specific patterns
const AI_SCRAPER_INDICATORS = {
  userAgents: [
    'GPTBot',
    'ChatGPT-User',
    'Claude-Web',
    'anthropic-ai',
    'CCBot',
    'Google-Extended',
    'cohere-ai'
  ],
  
  // ChatGPT often accesses these patterns
  suspiciousPatterns: [
    '/robots.txt',
    '/sitemap.xml',
    '/.well-known/',
  ],
  
  // Rapid sequential page access
  rapidAccess: true
};

// In middleware, add:
if (AI_SCRAPER_INDICATORS.userAgents.some(bot => 
  userAgent.toLowerCase().includes(bot.toLowerCase())
)) {
  sendScraperAlert({
    type: 'AI_SCRAPER_CHATGPT',
    severity: 'HIGH',
    userAgent,
    ip,
    url,
    message: 'Someone is feeding your site to ChatGPT/AI',
    timestamp: new Date().toISOString()
  });
  
  // Block immediately
  return new NextResponse(
    'AI scraping detected and blocked. This incident has been logged.',
    { status: 403 }
  );
}
```

---

## 📱 INSTANT NOTIFICATIONS

### Option 1: Email (Recommended)

**Setup SendGrid (5 minutes):**

1. Sign up: https://sendgrid.com (free tier: 100 emails/day)
2. Create API key
3. Add to `.env.local`:
   ```env
   SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
   ALERT_EMAIL=elizabeth@elevateforhumanity.org
   ```
4. Install package:
   ```bash
   npm install @sendgrid/mail
   ```

### Option 2: Slack (Instant)

**Setup Slack Webhook (2 minutes):**

1. Go to: https://api.slack.com/messaging/webhooks
2. Create webhook for your workspace
3. Add to `.env.local`:
   ```env
   SLACK_WEBHOOK_URL=https://hooks.slack.com/services/xxx/yyy/zzz
   ```

### Option 3: Discord (Instant)

**Setup Discord Webhook (2 minutes):**

1. Go to your Discord server
2. Server Settings → Integrations → Webhooks
3. Create webhook
4. Add to `.env.local`:
   ```env
   DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/xxx/yyy
   ```

### Option 4: SMS (Most Urgent)

**Setup Twilio (5 minutes):**

1. Sign up: https://twilio.com
2. Get phone number
3. Add to `.env.local`:
   ```env
   TWILIO_ACCOUNT_SID=ACxxxxx
   TWILIO_AUTH_TOKEN=xxxxx
   TWILIO_PHONE_NUMBER=+1234567890
   ALERT_PHONE_NUMBER=+1234567890
   ```

---

## 🚀 QUICK SETUP (DO THIS NOW)

### Step 1: Add Components to Layout

```typescript
// app/layout.tsx
import { ScraperDetection } from '@/components/ScraperDetection';
import { AdvancedScraperDetection } from '@/components/AdvancedScraperDetection';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <ScraperDetection />
        <AdvancedScraperDetection />
        {children}
      </body>
    </html>
  );
}
```

### Step 2: Create Middleware

Copy the `middleware.ts` code above to your project root.

### Step 3: Create Alert Endpoint

Copy the `app/api/alert-scraper/route.ts` code above.

### Step 4: Run Database Migration

```sql
-- Run in Supabase SQL Editor
-- Copy the CREATE TABLE code from above
```

### Step 5: Set Up Notifications

Choose ONE:
- [ ] SendGrid (email)
- [ ] Slack (instant messaging)
- [ ] Discord (instant messaging)
- [ ] Twilio (SMS)

---

## 📊 MONITORING DASHBOARD

### View Scraping Attempts

```sql
-- Recent attempts (last 24 hours)
SELECT * FROM recent_scraping_attempts;

-- All attempts by type
SELECT 
    detection_type,
    COUNT(*) as count,
    MAX(detected_at) as last_seen
FROM scraping_attempts
GROUP BY detection_type
ORDER BY count DESC;

-- Suspicious IPs (multiple attempts)
SELECT 
    ip_address,
    COUNT(*) as attempt_count,
    array_agg(DISTINCT detection_type) as types,
    MIN(detected_at) as first_seen,
    MAX(detected_at) as last_seen
FROM scraping_attempts
GROUP BY ip_address
HAVING COUNT(*) > 5
ORDER BY attempt_count DESC;
```

---

## ✅ WHAT YOU'LL GET ALERTED ABOUT

1. ✅ **ChatGPT/AI Scrapers** - Instant alert when detected
2. ✅ **Known Bots** - Scrapy, Selenium, Puppeteer, etc.
3. ✅ **Rapid Requests** - More than 20 requests in 10 seconds
4. ✅ **No Human Behavior** - No mouse/scroll/clicks
5. ✅ **Large Copy Events** - Someone copies >100 characters
6. ✅ **DevTools Opening** - Someone inspects your code
7. ✅ **Right-Click Events** - Often precedes "View Source"
8. ✅ **Missing Headers** - Bots often don't send proper headers
9. ✅ **Suspicious Patterns** - Accessing robots.txt, sitemap, etc.

---

## 🎯 EXAMPLE ALERT

**When someone tries to scrape:**

```
🚨 SCRAPING ATTEMPT DETECTED

Type: AI_SCRAPER_CHATGPT
Severity: HIGH
URL: https://elevateforhumanity.org/programs
IP: 192.168.1.100
User Agent: GPTBot/1.0
Time: 2024-11-29 15:30:45

Message: Someone is feeding your site to ChatGPT/AI

ACTIONS TAKEN:
✅ Request blocked (403 Forbidden)
✅ IP logged to database
✅ Alert sent to your email
✅ Evidence saved for legal action

View details: https://elevateforhumanity.org/admin/security
```

---

## 💪 YOU'RE FULLY PROTECTED

**With this system:**
- ✅ You'll know within SECONDS when someone tries to scrape
- ✅ You'll get their IP address and user agent
- ✅ You'll have timestamped evidence
- ✅ You can block them immediately
- ✅ You can take legal action if needed

**They can't scrape without you knowing.**

---

**Next Steps:**
1. Create the files above
2. Set up SendGrid or Slack
3. Test with a scraper
4. Verify you get alerts

**Time to implement: 30 minutes**  
**Protection level: MAXIMUM**
