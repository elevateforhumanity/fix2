# DNS Setup for portal.elevateforhumanity.org

## Architecture Overview

```
elevateforhumanity.org (Durable.co)
└── Simple landing page with "Get Started" button
    └── Links to → portal.elevateforhumanity.org (Netlify)

portal.elevateforhumanity.org (Netlify)
└── Full React application with all features
```

## Step 1: Add Custom Domain in Netlify

1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Select your site: `elevateforhumanityfix2`
3. Go to **Domain settings**
4. Click **Add custom domain**
5. Enter: `portal.elevateforhumanity.org`
6. Click **Verify**
7. Netlify will show you the DNS records needed

## Step 2: Add DNS Record

In your domain registrar (where you manage elevateforhumanity.org DNS):

### Option A: CNAME Record (Recommended)

```
Type: CNAME
Name: portal
Value: elevateforhumanityfix2.netlify.app
TTL: 3600 (or Auto)
```

### Option B: A Record (Alternative)

If CNAME doesn't work, Netlify will provide an IP address:

```
Type: A
Name: portal
Value: [IP from Netlify]
TTL: 3600 (or Auto)
```

## Step 3: Wait for DNS Propagation

- DNS changes can take 5 minutes to 48 hours
- Usually propagates within 15-30 minutes
- Check status: https://dnschecker.org/#CNAME/portal.elevateforhumanity.org

## Step 4: Verify SSL Certificate

1. Netlify will automatically provision SSL certificate
2. Wait for "HTTPS" badge to show green in Netlify
3. Test: https://portal.elevateforhumanity.org

## Step 5: Add Environment Variables in Netlify

Go to: **Site settings > Environment variables**

Add these variables:

```
VITE_SUPABASE_URL=https://cuxzzpsyufcewtmicszk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxNjEwNDcsImV4cCI6MjA3MzczNzA0N30.DyFtzoKha_tuhKiSIPoQlKonIpaoSYrlhzntCUvLUnA
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_51RvqjzIRNf5vPH3ABuHQofarfuWw0PW5ww9eTwkj21A6VLJaLopuYbPdpAFCTU10O5uLgGHeCTBEcu9xeM8ErbFy004j2KPoSx
```

## Step 6: Trigger New Deployment

1. Go to **Deploys** tab in Netlify
2. Click **Trigger deploy** > **Clear cache and deploy site**
3. Wait for deployment to complete

## Step 7: Update Durable Landing Page

See `DURABLE_LANDING_PAGE.html` for the HTML code to add to Durable.co

## Verification Checklist

- [ ] DNS record added
- [ ] portal.elevateforhumanity.org resolves
- [ ] SSL certificate active (green padlock)
- [ ] Environment variables added
- [ ] New deployment triggered
- [ ] Site loads at https://portal.elevateforhumanity.org
- [ ] Durable landing page updated with link

## Troubleshooting

### DNS not resolving

- Wait longer (up to 48 hours)
- Check DNS with: `nslookup portal.elevateforhumanity.org`
- Verify CNAME record is correct

### SSL certificate pending

- Wait 5-10 minutes after DNS resolves
- Netlify auto-provisions Let's Encrypt certificate
- Check Netlify dashboard for status

### Site shows 404

- Verify deployment completed successfully
- Check Netlify logs for errors
- Ensure environment variables are set

## Support

- Netlify Docs: https://docs.netlify.com/domains-https/custom-domains/
- DNS Checker: https://dnschecker.org
- SSL Checker: https://www.sslshopper.com/ssl-checker.html
