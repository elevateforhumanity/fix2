# API Quick Reference Guide

**Quick access to all API endpoints and credentials**

---

## 🔑 API Keys & Credentials

### Supabase

```bash
URL: https://cuxzzpsyufcewtmicszk.supabase.co
Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Dashboard: https://app.supabase.com
```

### Cloudflare

```bash
Account ID: [Set in environment]
API Token: [Set in environment]
Dashboard: https://dash.cloudflare.com
```

### Sentry

```bash
DSN: [Set in environment]
Dashboard: https://sentry.io
```

### Zapier

```bash
Facebook Webhook: [Set in environment]
LinkedIn Webhook: [Set in environment]
YouTube Webhook: [Set in environment]
Dashboard: https://zapier.com
```

---

## 🌐 API Endpoints

### Supabase

```
Base: https://cuxzzpsyufcewtmicszk.supabase.co
Auth: /auth/v1
REST: /rest/v1
Storage: /storage/v1
```

### Cloudflare

```
API: https://api.cloudflare.com/client/v4
Images: /accounts/{id}/images/v1
Stream: /accounts/{id}/stream
Workers: https://{name}.workers.dev
```

### OpenAI

```
Base: https://api.openai.com/v1
Chat: /chat/completions
Images: /images/generations
```

### Stripe

```
Base: https://api.stripe.com/v1
Checkout: /checkout/sessions
Webhooks: [Your webhook endpoint]
```

### Social Media

```
LinkedIn: https://api.linkedin.com/v2
Facebook: https://graph.facebook.com/v18.0
YouTube: https://www.googleapis.com/youtube/v3
```

### Government

```
DOL: https://api.dol.gov/V1
SAM.gov: https://api.sam.gov
Indiana DWD: https://www.in.gov/dwd/api
```

### Internal

```
Netlify Functions: /.netlify/functions
API: /api
```

---

## 📊 Rate Limits

| Service    | Limit                       |
| ---------- | --------------------------- |
| Supabase   | 1 GB bandwidth/month (free) |
| Cloudflare | 100k requests/day (free)    |
| OpenAI     | 90k tokens/min (GPT-3.5)    |
| Stripe     | Unlimited                   |
| LinkedIn   | 500 requests/day (free)     |
| Facebook   | 200 calls/hour              |
| YouTube    | 10k units/day               |
| Zapier     | 100 tasks/month (free)      |
| Sentry     | 5k events/month (free)      |

---

## 🔐 Authentication Headers

### Supabase

```bash
apikey: YOUR_ANON_KEY
Authorization: Bearer YOUR_ACCESS_TOKEN
```

### Cloudflare

```bash
Authorization: Bearer YOUR_API_TOKEN
```

### OpenAI

```bash
Authorization: Bearer YOUR_API_KEY
```

### Stripe

```bash
Authorization: Bearer YOUR_SECRET_KEY
```

### LinkedIn

```bash
Authorization: Bearer YOUR_ACCESS_TOKEN
X-Restli-Protocol-Version: 2.0.0
```

### Facebook

```bash
access_token=YOUR_PAGE_ACCESS_TOKEN
```

### YouTube

```bash
Authorization: Bearer YOUR_ACCESS_TOKEN
```

### SAM.gov

```bash
X-Api-Key: YOUR_API_KEY
```

---

## 🚀 Quick Start Examples

### Post to Social Media (Zapier)

```typescript
await fetch(ZAPIER_WEBHOOK_URL, {
  method: 'POST',
  body: JSON.stringify({
    platform: 'facebook',
    content: 'Your post here',
  }),
});
```

### Query Database (Supabase)

```typescript
const { data } = await supabase.from('programs').select('*');
```

### Track Error (Sentry)

```typescript
Sentry.captureException(error);
```

### Create Checkout (Stripe)

```typescript
const session = await stripe.checkout.sessions.create({
  line_items: [{ price: 'price_123', quantity: 1 }],
  mode: 'payment',
});
```

---

## 📱 Social Media Links

### Company Pages

```
Facebook: https://www.facebook.com/elevateforhumanity
LinkedIn: https://www.linkedin.com/company/elevateforhumanity
YouTube: https://www.youtube.com/@elevateforhumanity
```

### Personal Pages

```
Facebook: https://www.facebook.com/elevate.founder
LinkedIn: https://www.linkedin.com/in/elevate-founder
```

---

## 🛠️ Useful Commands

### Test Supabase

```bash
curl https://cuxzzpsyufcewtmicszk.supabase.co/rest/v1/programs \
  -H "apikey: YOUR_KEY"
```

### Test Cloudflare

```bash
curl https://api.cloudflare.com/client/v4/user/tokens/verify \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Test Zapier

```bash
curl -X POST YOUR_WEBHOOK_URL \
  -H "Content-Type: application/json" \
  -d '{"test": true}'
```

### Purge Cloudflare Cache

```bash
curl -X POST "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/purge_cache" \
  -H "Authorization: Bearer ${TOKEN}" \
  -d '{"purge_everything":true}'
```

---

## 📚 Documentation Links

- **Supabase:** https://supabase.com/docs
- **Cloudflare:** https://developers.cloudflare.com
- **OpenAI:** https://platform.openai.com/docs
- **Stripe:** https://stripe.com/docs
- **LinkedIn:** https://docs.microsoft.com/en-us/linkedin
- **Facebook:** https://developers.facebook.com/docs
- **YouTube:** https://developers.google.com/youtube
- **Zapier:** https://zapier.com/help
- **Sentry:** https://docs.sentry.io

---

## 🆘 Support

### Get Help

- Supabase: https://supabase.com/support
- Cloudflare: https://support.cloudflare.com
- Stripe: https://support.stripe.com
- Sentry: https://sentry.io/support

### Status Pages

- Supabase: https://status.supabase.com
- Cloudflare: https://www.cloudflarestatus.com
- Stripe: https://status.stripe.com

---

**Last Updated:** 2025-10-26  
**Version:** 1.0
