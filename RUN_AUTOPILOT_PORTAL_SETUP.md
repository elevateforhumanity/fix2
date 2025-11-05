# Run Autopilot: Portal Domain Setup

## Quick Start

Run the autopilot script to automatically configure portal.elevateforhumanity.org:

```bash
# Set required tokens
export NETLIFY_AUTH_TOKEN="your-netlify-token"
export CLOUDFLARE_API_TOKEN="your-cloudflare-token"  # Optional

# Run autopilot
bash scripts/autopilot-setup-portal-domain.sh
```

## Get Required Tokens

### 1. Netlify Auth Token (Required)

1. Go to: https://app.netlify.com/user/applications#personal-access-tokens
2. Click "New access token"
3. Name it: "Portal Domain Setup"
4. Copy the token
5. Export it:
   ```bash
   export NETLIFY_AUTH_TOKEN="nfp_your_token_here"
   ```

### 2. Cloudflare API Token (Optional but Recommended)

1. Go to: https://dash.cloudflare.com/profile/api-tokens
2. Click "Create Token"
3. Use template: "Edit zone DNS"
4. Select zone: elevateforhumanity.org
5. Copy the token
6. Export it:
   ```bash
   export CLOUDFLARE_API_TOKEN="your_cloudflare_token_here"
   ```

**Note:** If you skip Cloudflare token, you'll need to manually add the DNS record.

## What the Autopilot Does

The script automatically:

1. ✅ **Adds custom domain** to Netlify
   - Configures portal.elevateforhumanity.org on the site

2. ✅ **Configures DNS** (if Cloudflare token provided)
   - Creates CNAME record: portal → main--elevateforhumanityfix.netlify.app
   - Sets TTL to 3600 seconds

3. ✅ **Provisions SSL certificate**
   - Requests Let's Encrypt certificate
   - Enables HTTPS

4. ✅ **Triggers deployment**
   - Deploys latest code to new domain

## Timeline

- **Script execution:** 30 seconds
- **DNS propagation:** 5-30 minutes
- **SSL provisioning:** 5-10 minutes after DNS
- **Total:** ~15-40 minutes until live

## Verification

After running the script:

1. **Check DNS propagation:**
   ```bash
   # Wait 5-10 minutes, then check:
   nslookup portal.elevateforhumanity.org
   
   # Or use online tool:
   # https://dnschecker.org/#CNAME/portal.elevateforhumanity.org
   ```

2. **Check SSL status:**
   - Go to: https://app.netlify.com/sites/elevateforhumanityfix/settings/domain
   - Look for green "HTTPS" badge next to portal.elevateforhumanity.org

3. **Test the site:**
   ```bash
   curl -I https://portal.elevateforhumanity.org/
   # Should return HTTP 200 once DNS propagates
   ```

## Manual DNS Setup (If No Cloudflare Token)

If you didn't provide CLOUDFLARE_API_TOKEN, add this DNS record manually:

**In your DNS provider (Cloudflare, GoDaddy, etc.):**

```
Type: CNAME
Name: portal
Target: main--elevateforhumanityfix.netlify.app
TTL: 3600 (or Auto)
```

## Troubleshooting

### "NETLIFY_AUTH_TOKEN not set"
- Get token from: https://app.netlify.com/user/applications#personal-access-tokens
- Export it: `export NETLIFY_AUTH_TOKEN="your_token"`

### "Domain already exists"
- This is OK! The script will continue
- Domain is already configured on Netlify

### "DNS not resolving"
- Wait 15-30 minutes for propagation
- Check with: `nslookup portal.elevateforhumanity.org`
- Verify DNS record in Cloudflare dashboard

### "SSL certificate pending"
- Wait 5-10 minutes after DNS resolves
- Netlify auto-provisions Let's Encrypt certificate
- Check status in Netlify dashboard

## Alternative: Manual Setup

If you prefer manual setup, follow: `FIX_PORTAL_DOMAIN.md`

## Support

- **Netlify Dashboard:** https://app.netlify.com/sites/elevateforhumanityfix
- **Cloudflare Dashboard:** https://dash.cloudflare.com
- **DNS Checker:** https://dnschecker.org
- **Script Location:** `scripts/autopilot-setup-portal-domain.sh`
