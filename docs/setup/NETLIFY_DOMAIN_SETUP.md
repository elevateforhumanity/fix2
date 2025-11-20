# Netlify Domain and SSL Configuration

## Current Status

- **Default URL**: https://elevateforhumanityfix2.netlify.app
- **Custom Domain**: Not configured
- **SSL**: Automatic (Netlify provides free SSL for all sites)

## Setting Up Custom Domain (elevateforhumanity.org)

### Option 1: Via Netlify Dashboard (Recommended)

1. Go to: https://app.netlify.com/sites/elevateforhumanityfix2/settings/domain
2. Click "Add custom domain"
3. Enter: `elevateforhumanity.org`
4. Click "Verify"
5. Follow DNS configuration instructions

### Option 2: Via Netlify CLI

```bash
export NETLIFY_AUTH_TOKEN="nfp_ZQh1EUwZgJt939dcD3kb9sEYGk7DDgwPbaae"

# Add primary domain
netlify domains:add elevateforhumanity.org

# Add www subdomain
netlify domains:add www.elevateforhumanity.org
```

## DNS Configuration

### If Using Netlify DNS (Recommended)

1. Update nameservers at your domain registrar to:
   - `dns1.p01.nsone.net`
   - `dns2.p01.nsone.net`
   - `dns3.p01.nsone.net`
   - `dns4.p01.nsone.net`

2. Netlify will automatically configure:
   - A records for apex domain
   - CNAME for www subdomain
   - SSL certificates

### If Using External DNS

Add these records at your DNS provider:

#### For apex domain (elevateforhumanity.org):

```
Type: A
Name: @
Value: 75.2.60.5
```

Or use ALIAS/ANAME record:

```
Type: ALIAS/ANAME
Name: @
Value: elevateforhumanityfix2.netlify.app
```

#### For www subdomain:

```
Type: CNAME
Name: www
Value: elevateforhumanity.org
```

## SSL Configuration

### Automatic SSL (Default)

- Netlify provides free SSL certificates via Let's Encrypt
- Automatically renews every 90 days
- Enabled by default for all domains

### Force HTTPS

After domain is configured, enable HTTPS redirect:

**Via Dashboard:**

1. Go to: https://app.netlify.com/sites/elevateforhumanityfix2/settings/domain
2. Scroll to "HTTPS"
3. Enable "Force HTTPS"

**Via CLI:**

```bash
netlify api updateSite --data '{
  "site_id": "12f120ab-3f63-419b-bc49-430f043415c1",
  "body": {
    "force_ssl": true
  }
}'
```

## Domain Aliases

The netlify.toml already includes redirects from .com to .org:

- `elevateforhumanity.com` → `elevateforhumanity.org`
- `www.elevateforhumanity.com` → `elevateforhumanity.org`

To activate these, you'll need to:

1. Add both .com and .org as custom domains
2. Configure DNS for both domains
3. The redirects in netlify.toml will handle the forwarding

## Verification

After DNS propagation (can take up to 48 hours):

1. Visit: https://www.elevateforhumanity.org
2. Check SSL certificate (should show valid Let's Encrypt cert)
3. Test www redirect: https://www.elevateforhumanity.org
4. Test .com redirect: https://elevateforhumanity.com

## Troubleshooting

### DNS Not Propagating

- Check DNS with: `dig elevateforhumanity.org`
- Use: https://dnschecker.org to check global propagation

### SSL Certificate Issues

- Wait 24 hours after DNS configuration
- Netlify automatically provisions certificates
- Check status in: Domain settings > HTTPS section

### Domain Not Showing

- Verify DNS records are correct
- Check domain ownership verification
- Ensure nameservers are updated (if using Netlify DNS)
