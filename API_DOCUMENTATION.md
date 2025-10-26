# Complete API Documentation - Elevate for Humanity

**Date:** 2025-10-26  
**Status:** ✅ Complete  
**Purpose:** Comprehensive documentation of all external APIs and integrations

---

## Table of Contents

1. [Supabase API](#supabase-api)
2. [Cloudflare APIs](#cloudflare-apis)
3. [OpenAI API](#openai-api)
4. [Stripe API](#stripe-api)
5. [LinkedIn API](#linkedin-api)
6. [Facebook Graph API](#facebook-graph-api)
7. [YouTube Data API](#youtube-data-api)
8. [Government APIs](#government-apis)
9. [Zapier Webhooks](#zapier-webhooks)
10. [Sentry API](#sentry-api)
11. [Google APIs](#google-apis)
12. [Internal APIs](#internal-apis)

---

## 1. Supabase API

### Overview

PostgreSQL database with real-time subscriptions and authentication.

### Configuration

```bash
VITE_SUPABASE_URL=https://cuxzzpsyufcewtmicszk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_KEY=your-service-role-key
```

### Base URL

```
https://cuxzzpsyufcewtmicszk.supabase.co
```

### Authentication

```typescript
import { supabase } from './supabaseClient';

// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123',
});

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123',
});

// Sign out
await supabase.auth.signOut();
```

### Database Operations

```typescript
// Select
const { data, error } = await supabase
  .from('programs')
  .select('*')
  .eq('status', 'active');

// Insert
const { data, error } = await supabase
  .from('programs')
  .insert([{ name: 'New Program', description: 'Description' }]);

// Update
const { data, error } = await supabase
  .from('programs')
  .update({ status: 'inactive' })
  .eq('id', programId);

// Delete
const { data, error } = await supabase
  .from('programs')
  .delete()
  .eq('id', programId);
```

### Real-time Subscriptions

```typescript
const subscription = supabase
  .channel('programs')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'programs' },
    (payload) => {
      console.log('Change received!', payload);
    }
  )
  .subscribe();
```

### Storage

```typescript
// Upload file
const { data, error } = await supabase.storage
  .from('avatars')
  .upload('public/avatar1.png', file);

// Get public URL
const { data } = supabase.storage
  .from('avatars')
  .getPublicUrl('public/avatar1.png');
```

### Rate Limits

- Free tier: 500 MB database, 1 GB bandwidth
- Pro tier: 8 GB database, 50 GB bandwidth

### Documentation

https://supabase.com/docs

---

## 2. Cloudflare APIs

### 2.1 Cloudflare API (General)

#### Configuration

```bash
CLOUDFLARE_API_TOKEN=your-api-token
CLOUDFLARE_ACCOUNT_ID=your-account-id
CLOUDFLARE_ZONE_ID=your-zone-id
```

#### Base URL

```
https://api.cloudflare.com/client/v4
```

#### Authentication

```bash
Authorization: Bearer YOUR_API_TOKEN
```

#### DNS Management

```bash
# List DNS records
curl -X GET "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records" \
  -H "Authorization: Bearer ${API_TOKEN}"

# Create DNS record
curl -X POST "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records" \
  -H "Authorization: Bearer ${API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data '{
    "type": "A",
    "name": "@",
    "content": "75.2.60.5",
    "proxied": true
  }'
```

#### Cache Purge

```bash
curl -X POST "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/purge_cache" \
  -H "Authorization: Bearer ${API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data '{"purge_everything":true}'
```

### 2.2 Cloudflare Images API

#### Configuration

```typescript
const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
const apiToken = process.env.CLOUDFLARE_API_TOKEN;
```

#### Upload Image

```typescript
const formData = new FormData();
formData.append('file', imageFile);

const response = await fetch(
  `https://api.cloudflare.com/client/v4/accounts/${accountId}/images/v1`,
  {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
    body: formData,
  }
);
```

#### Get Image URL

```
https://imagedelivery.net/${accountId}/${imageId}/public
```

### 2.3 Cloudflare Stream API

#### Upload Video

```typescript
const response = await fetch(
  `https://api.cloudflare.com/client/v4/accounts/${accountId}/stream`,
  {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
    body: videoFile,
  }
);
```

#### Get Video URL

```
https://videodelivery.net/${videoId}/manifest/video.m3u8
```

### 2.4 Cloudflare Workers

#### Worker URLs

```bash
VITE_ORCHESTRATOR_URL=https://efh-autopilot-orchestrator.workers.dev
VITE_ANALYZER_URL=https://efh-autopilot-analyzer.workers.dev
VITE_AI_STYLIST_URL=https://efh-ai-stylist.workers.dev
VITE_AGENT_WORKER_URL=https://efh-agent.workers.dev
```

#### Deploy Worker

```bash
wrangler deploy
```

#### Call Worker

```typescript
const response = await fetch(
  'https://efh-autopilot-orchestrator.workers.dev/autopilot/plan',
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ task: 'generate_page' }),
  }
);
```

### Rate Limits

- Free tier: 100,000 requests/day
- Paid tier: 10 million requests/month

### Documentation

https://developers.cloudflare.com/api/

---

## 3. OpenAI API

### Configuration

```bash
OPENAI_API_KEY=sk-...your-api-key
```

### Base URL

```
https://api.openai.com/v1
```

### Authentication

```bash
Authorization: Bearer YOUR_API_KEY
```

### Chat Completions

```typescript
const response = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: 'Hello!' },
    ],
    temperature: 0.7,
    max_tokens: 1000,
  }),
});

const data = await response.json();
const message = data.choices[0].message.content;
```

### Image Generation

```typescript
const response = await fetch('https://api.openai.com/v1/images/generations', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    prompt: 'A professional training program banner',
    n: 1,
    size: '1024x1024',
  }),
});

const data = await response.json();
const imageUrl = data.data[0].url;
```

### Rate Limits

- GPT-4: 10,000 tokens/minute
- GPT-3.5: 90,000 tokens/minute
- DALL-E: 50 images/minute

### Documentation

https://platform.openai.com/docs/api-reference

---

## 4. Stripe API

### Configuration

```bash
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Base URL

```
https://api.stripe.com/v1
```

### Authentication

```bash
Authorization: Bearer YOUR_SECRET_KEY
```

### Create Checkout Session

```typescript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  line_items: [
    {
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'Program Enrollment',
        },
        unit_amount: 50000, // $500.00
      },
      quantity: 1,
    },
  ],
  mode: 'payment',
  success_url: 'https://elevateforhumanity.org/success',
  cancel_url: 'https://elevateforhumanity.org/cancel',
});
```

### Handle Webhook

```typescript
const sig = request.headers['stripe-signature'];

const event = stripe.webhooks.constructEvent(
  request.body,
  sig,
  process.env.STRIPE_WEBHOOK_SECRET
);

switch (event.type) {
  case 'checkout.session.completed':
    const session = event.data.object;
    // Handle successful payment
    break;
  case 'payment_intent.payment_failed':
    // Handle failed payment
    break;
}
```

### Rate Limits

- 100 requests/second per API key

### Documentation

https://stripe.com/docs/api

---

## 5. LinkedIn API

### Configuration

```bash
LINKEDIN_CLIENT_ID=your-client-id
LINKEDIN_CLIENT_SECRET=your-client-secret
LINKEDIN_ACCESS_TOKEN=your-access-token
```

### Base URL

```
https://api.linkedin.com/v2
```

### Authentication

```bash
Authorization: Bearer YOUR_ACCESS_TOKEN
```

### Create Post

```typescript
const response = await fetch('https://api.linkedin.com/v2/ugcPosts', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
    'X-Restli-Protocol-Version': '2.0.0',
  },
  body: JSON.stringify({
    author: `urn:li:organization:${organizationId}`,
    lifecycleState: 'PUBLISHED',
    specificContent: {
      'com.linkedin.ugc.ShareContent': {
        shareCommentary: {
          text: 'Your post content here',
        },
        shareMediaCategory: 'NONE',
      },
    },
    visibility: {
      'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
    },
  }),
});
```

### Rate Limits

- 500 requests/day (free tier)
- 100,000 requests/day (paid tier)

### Documentation

https://docs.microsoft.com/en-us/linkedin/

---

## 6. Facebook Graph API

### Configuration

```bash
FACEBOOK_APP_ID=your-app-id
FACEBOOK_APP_SECRET=your-app-secret
FACEBOOK_PAGE_ACCESS_TOKEN=your-page-token
```

### Base URL

```
https://graph.facebook.com/v18.0
```

### Authentication

```bash
access_token=YOUR_PAGE_ACCESS_TOKEN
```

### Create Post

```typescript
const response = await fetch(
  `https://graph.facebook.com/v18.0/${pageId}/feed`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: 'Your post content here',
      access_token: pageAccessToken,
    }),
  }
);
```

### Upload Photo

```typescript
const formData = new FormData();
formData.append('source', photoFile);
formData.append('message', 'Photo caption');
formData.append('access_token', pageAccessToken);

const response = await fetch(
  `https://graph.facebook.com/v18.0/${pageId}/photos`,
  {
    method: 'POST',
    body: formData,
  }
);
```

### Rate Limits

- 200 calls/hour per user
- 4800 calls/hour per app

### Documentation

https://developers.facebook.com/docs/graph-api/

---

## 7. YouTube Data API

### Configuration

```bash
YOUTUBE_API_KEY=your-api-key
YOUTUBE_CLIENT_ID=your-client-id
YOUTUBE_CLIENT_SECRET=your-client-secret
```

### Base URL

```
https://www.googleapis.com/youtube/v3
```

### Authentication

```bash
Authorization: Bearer YOUR_ACCESS_TOKEN
```

### Create Community Post

```typescript
const response = await fetch(
  'https://www.googleapis.com/youtube/v3/communityPosts',
  {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      snippet: {
        text: 'Your post content here',
      },
    }),
  }
);
```

### Upload Video

```typescript
const metadata = {
  snippet: {
    title: 'Video Title',
    description: 'Video Description',
    categoryId: '22', // People & Blogs
  },
  status: {
    privacyStatus: 'public',
  },
};

// Use resumable upload for large files
```

### Rate Limits

- 10,000 units/day (free tier)
- Each operation costs different units

### Documentation

https://developers.google.com/youtube/v3

---

## 8. Government APIs

### 8.1 Department of Labor (DOL) API

#### Configuration

```bash
DOL_API_KEY=your-api-key
```

#### Base URL

```
https://api.dol.gov/V1
```

#### Get Occupational Statistics

```typescript
const response = await fetch('https://api.dol.gov/V1/Statistics/OES', {
  headers: {
    Authorization: `Bearer ${process.env.DOL_API_KEY}`,
  },
});
```

#### Rate Limits

- 1,000 requests/day

#### Documentation

https://developer.dol.gov/

### 8.2 SAM.gov API

#### Configuration

```bash
SAM_API_KEY=your-api-key
```

#### Base URL

```
https://api.sam.gov
```

#### Search Opportunities

```typescript
const response = await fetch('https://api.sam.gov/opportunities/v2/search', {
  headers: {
    'X-Api-Key': process.env.SAM_API_KEY,
  },
});
```

#### Get Entity Information

```typescript
const response = await fetch(
  `https://api.sam.gov/entity-information/v3/entities?ueiSAM=${uei}`,
  {
    headers: {
      'X-Api-Key': process.env.SAM_API_KEY,
    },
  }
);
```

#### Rate Limits

- 1,000 requests/day (free tier)

#### Documentation

https://open.gsa.gov/api/sam-api/

### 8.3 Indiana DWD API

#### Base URL

```
https://www.in.gov/dwd/api
```

#### Get Job Listings

```typescript
const response = await fetch('https://www.in.gov/dwd/api/jobs', {
  headers: {
    'Content-Type': 'application/json',
  },
});
```

#### Update Program Status

```typescript
const response = await fetch('https://www.in.gov/dwd/api/update', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    programId: 'program-123',
    status: 'active',
  }),
});
```

#### Get ETPL Programs

```typescript
const response = await fetch('https://www.in.gov/dwd/etpl/api/programs', {
  headers: {
    'Content-Type': 'application/json',
  },
});
```

---

## 9. Zapier Webhooks

### Configuration

```bash
VITE_ZAPIER_FACEBOOK_WEBHOOK=https://hooks.zapier.com/hooks/catch/...
VITE_ZAPIER_LINKEDIN_WEBHOOK=https://hooks.zapier.com/hooks/catch/...
VITE_ZAPIER_YOUTUBE_WEBHOOK=https://hooks.zapier.com/hooks/catch/...
VITE_ZAPIER_ALL_PLATFORMS_WEBHOOK=https://hooks.zapier.com/hooks/catch/...
VITE_ZAPIER_API_KEY=your-api-key (optional)
```

### Post to Platform

```typescript
const response = await fetch(webhookUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Zapier-API-Key': apiKey, // optional
  },
  body: JSON.stringify({
    platform: 'facebook',
    content: 'Your post content',
    mediaUrl: 'https://example.com/image.jpg',
    scheduledTime: '2025-11-01T10:00:00',
    metadata: {
      eventType: 'program_announcement',
      tags: ['program', 'announcement'],
    },
  }),
});
```

### Rate Limits

- Depends on Zapier plan
- Free: 100 tasks/month
- Starter: 750 tasks/month
- Professional: 2,000 tasks/month

### Documentation

https://zapier.com/help/create/code-webhooks/

---

## 10. Sentry API

### Configuration

```bash
VITE_SENTRY_DSN=https://...@sentry.io/...
VITE_SENTRY_ENABLED=true
VITE_ENVIRONMENT=production
VITE_APP_VERSION=2.0.0
```

### Initialization

```typescript
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: process.env.VITE_SENTRY_DSN,
  environment: process.env.VITE_ENVIRONMENT,
  release: process.env.VITE_APP_VERSION,
  tracesSampleRate: 0.2,
});
```

### Capture Error

```typescript
Sentry.captureException(error);
```

### Capture Message

```typescript
Sentry.captureMessage('Something went wrong', 'error');
```

### Set User Context

```typescript
Sentry.setUser({
  id: user.id,
  email: user.email,
  username: user.username,
});
```

### Rate Limits

- Depends on plan
- Free: 5,000 events/month
- Team: 50,000 events/month

### Documentation

https://docs.sentry.io/

---

## 11. Google APIs

### 11.1 Google OAuth

#### Configuration

```bash
GOOGLE_OAUTH_CLIENT_ID=your-client-id
GOOGLE_OAUTH_CLIENT_SECRET=your-client-secret
```

#### Authorization URL

```
https://accounts.google.com/o/oauth2/v2/auth
```

### 11.2 Google Classroom API

#### Configuration

```bash
GOOGLE_SA_JSON_B64=base64-encoded-service-account-json
GOOGLE_IMPERSONATE_EMAIL=admin@yourdomain.com
```

#### Base URL

```
https://classroom.googleapis.com/v1
```

### 11.3 Google Analytics

#### Configuration

```bash
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_GTM_ID=GTM-XXXXXXX
```

#### Track Page View

```typescript
gtag('config', measurementId, {
  page_path: window.location.pathname,
});
```

#### Track Event

```typescript
gtag('event', 'button_click', {
  event_category: 'engagement',
  event_label: 'enrollment_button',
});
```

### Documentation

https://developers.google.com/

---

## 12. Internal APIs

### 12.1 Netlify Functions

#### Base URL

```
https://elevateforhumanity.org/.netlify/functions
```

#### Create Checkout Session

```typescript
const response = await fetch('/.netlify/functions/create-checkout-session', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    priceId: 'price_123',
    quantity: 1,
  }),
});
```

#### Create Enrollment Session

```typescript
const response = await fetch('/.netlify/functions/create-enrollment-session', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    programId: 'program-123',
    userId: 'user-456',
  }),
});
```

#### Stripe Webhook Handler

```
POST /.netlify/functions/stripe-webhook
```

### 12.2 Custom API Endpoints

#### Base URL

```
https://elevateforhumanity.org/api
```

#### Get Programs

```typescript
const response = await fetch('/api/programs');
const programs = await response.json();
```

#### Get Courses

```typescript
const response = await fetch('/api/courses');
const courses = await response.json();
```

---

## API Rate Limits Summary

| Service    | Free Tier                 | Paid Tier                |
| ---------- | ------------------------- | ------------------------ |
| Supabase   | 500 MB DB, 1 GB bandwidth | 8 GB DB, 50 GB bandwidth |
| Cloudflare | 100k requests/day         | 10M requests/month       |
| OpenAI     | 90k tokens/min (GPT-3.5)  | Custom                   |
| Stripe     | Unlimited                 | Unlimited                |
| LinkedIn   | 500 requests/day          | 100k requests/day        |
| Facebook   | 200 calls/hour            | 4800 calls/hour          |
| YouTube    | 10k units/day             | Custom                   |
| DOL        | 1k requests/day           | N/A                      |
| SAM.gov    | 1k requests/day           | N/A                      |
| Zapier     | 100 tasks/month           | 2k tasks/month           |
| Sentry     | 5k events/month           | 50k events/month         |

---

## Environment Variables Checklist

### Required

- [x] VITE_SUPABASE_URL
- [x] VITE_SUPABASE_ANON_KEY
- [x] SUPABASE_SERVICE_KEY
- [x] JWT_SECRET
- [x] CLOUDFLARE_API_TOKEN
- [x] CLOUDFLARE_ACCOUNT_ID

### Optional (Recommended)

- [ ] VITE_SENTRY_DSN
- [ ] OPENAI_API_KEY
- [ ] STRIPE_SECRET_KEY
- [ ] VITE_ZAPIER_FACEBOOK_WEBHOOK
- [ ] VITE_ZAPIER_LINKEDIN_WEBHOOK
- [ ] VITE_ZAPIER_YOUTUBE_WEBHOOK

### Optional (Advanced)

- [ ] LINKEDIN_ACCESS_TOKEN
- [ ] FACEBOOK_PAGE_ACCESS_TOKEN
- [ ] YOUTUBE_API_KEY
- [ ] DOL_API_KEY
- [ ] SAM_API_KEY
- [ ] GOOGLE_OAUTH_CLIENT_ID

---

## Security Best Practices

### 1. API Keys

- ✅ Never commit API keys to Git
- ✅ Use environment variables
- ✅ Rotate keys regularly
- ✅ Use different keys for dev/prod

### 2. Authentication

- ✅ Use OAuth 2.0 when possible
- ✅ Implement token refresh
- ✅ Store tokens securely
- ✅ Use HTTPS only

### 3. Rate Limiting

- ✅ Implement exponential backoff
- ✅ Cache responses when possible
- ✅ Monitor usage
- ✅ Set up alerts

### 4. Error Handling

- ✅ Don't expose API keys in errors
- ✅ Log errors to Sentry
- ✅ Provide user-friendly messages
- ✅ Implement retry logic

---

## Testing APIs

### Test Supabase

```bash
curl https://cuxzzpsyufcewtmicszk.supabase.co/rest/v1/programs \
  -H "apikey: YOUR_ANON_KEY"
```

### Test Cloudflare

```bash
curl -X GET "https://api.cloudflare.com/client/v4/user/tokens/verify" \
  -H "Authorization: Bearer YOUR_API_TOKEN"
```

### Test Stripe

```bash
curl https://api.stripe.com/v1/customers \
  -u YOUR_SECRET_KEY:
```

### Test Zapier Webhook

```bash
curl -X POST "YOUR_WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d '{"test": true}'
```

---

## Conclusion

This document provides comprehensive documentation for all external APIs and integrations used in the Elevate for Humanity platform. All APIs are properly configured with environment variables and follow security best practices.

**Status:** ✅ Complete and Ready for Use

---

**Generated By:** Ona  
**Date:** 2025-10-26  
**Version:** 1.0
