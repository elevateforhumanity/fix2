# Autopilot DNS Setup

## Yes! Your autopilot CAN add DNS automatically! 🚀

### Prerequisites

You need a Cloudflare API token with DNS edit permissions.

**Get your token:**
1. Go to https://dash.cloudflare.com/profile/api-tokens
2. Click "Create Token"
3. Use template: "Edit zone DNS"
4. Select zone: elevateforhumanity.org
5. Copy the token

### Quick Setup (One Command)

```bash
# Set your Cloudflare API token
export CLOUDFLARE_API_TOKEN="your-token-here"

# Run autopilot DNS setup
./scripts/autopilot-add-dns.sh
```

That's it! The script will:
- ✅ Find your Cloudflare zone
- ✅ Check for existing DNS records
- ✅ Create CNAME: portal → elevateforhumanityfix2.netlify.app
- ✅ Configure TTL and settings
- ✅ Verify the record was created

### What the Autopilot Does

```
🚀 Autopilot DNS Setup
======================

🔍 Step 1: Getting Cloudflare Zone ID...
✅ Zone ID: abc123...

🔍 Step 2: Checking for existing DNS record...
📝 No existing record found. Creating new record...
✅ DNS record created successfully!

🎉 DNS Setup Complete!

📊 DNS Record Details:
   Type: CNAME
   Name: portal
   Points to: elevateforhumanityfix2.netlify.app
   TTL: 3600 seconds (1 hour)

⏱️  DNS Propagation:
   - Usually takes 5-30 minutes
   - Check status: https://dnschecker.org/#CNAME/portal.elevateforhumanity.org

✅ Your portal will be live at: https://portal.elevateforhumanity.org
```

### Alternative: Manual DNS Setup

If you prefer to add DNS manually, see `DNS_SETUP_INSTRUCTIONS.md`

### After DNS is Added

1. **Add custom domain in Netlify:**
   - Go to Netlify dashboard
   - Add domain: portal.elevateforhumanity.org
   - Netlify will verify DNS and provision SSL

2. **Add environment variables:**
   - See `NETLIFY_ENV_SETUP.md`

3. **Update Durable landing page:**
   - See `DURABLE_LANDING_PAGE.html`

### Troubleshooting

**Error: CLOUDFLARE_API_TOKEN not set**
```bash
export CLOUDFLARE_API_TOKEN="your-token-here"
```

**Error: Could not find zone**
- Verify domain is in your Cloudflare account
- Check API token has correct permissions

**DNS not propagating**
- Wait 5-30 minutes
- Check: https://dnschecker.org
- Clear your DNS cache: `sudo systemd-resolve --flush-caches`

### Full Automation Script

Want to automate everything? Run:

```bash
# Complete autopilot setup
export CLOUDFLARE_API_TOKEN="your-token"
export NETLIFY_AUTH_TOKEN="your-netlify-token"

./scripts/autopilot-add-dns.sh
# Then manually add domain in Netlify dashboard
```

### Security Note

Never commit API tokens to git! Always use environment variables:

```bash
# Add to your ~/.bashrc or ~/.zshrc
export CLOUDFLARE_API_TOKEN="your-token"
export NETLIFY_AUTH_TOKEN="your-token"
```

Or use a `.env` file (already in .gitignore):

```bash
echo "CLOUDFLARE_API_TOKEN=your-token" >> .env
source .env
```

## Summary

**Yes, your autopilot can add DNS!** Just run:

```bash
export CLOUDFLARE_API_TOKEN="your-token"
./scripts/autopilot-add-dns.sh
```

Then wait 5-30 minutes for DNS to propagate, and you're live! 🎉
