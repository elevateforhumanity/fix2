# Durable + Gitpod Autopilot - Quick Start Guide

**Ready-to-use integration for Elevate for Humanity**

---

## TL;DR

Your project already has a mature autopilot system. The proposed Gitpod architecture adds **Durable integration** with three options. Here's how to add it:

```bash
# 1. Add bridge infrastructure (5 minutes)
mkdir -p bridge/public bridge/api
# Copy bridge script and config (see below)

# 2. Choose your integration method (1 minute)
bash scripts/select-architecture.sh

# 3. Done! 🎉
```

---

## What You're Getting

### Option A: One-Time Snippet ⭐ **RECOMMENDED**

**Setup:** Paste one `<script>` tag in Durable  
**Maintenance:** Zero  
**Updates:** Automatic

```html
<!-- Paste this ONCE in Durable custom code -->
<script 
  src="https://elevateforhumanityfix2.netlify.app/efh-bridge.js" 
  data-efh-org="elevate-for-humanity" 
  data-env="prod" 
  defer>
</script>

<!-- Add slots where you want dynamic content -->
<div data-efh-slot="hero"></div>
<div data-efh-slot="programs"></div>
```

**That's it!** All future updates happen automatically.

---

### Option B: Netlify Shell

**Setup:** Point domain to Netlify  
**Maintenance:** Zero Durable changes  
**Updates:** Automatic

Netlify hosts a shell that embeds your Durable site. No ongoing Durable edits needed.

---

### Option C: GTM Injector

**Setup:** Add GTM container ID once  
**Maintenance:** Manage via GTM  
**Updates:** Via GTM tags

Most flexible but requires GTM account.

---

## Quick Setup (Option A)

### Step 1: Create Bridge Files (2 minutes)

```bash
# Create directories
mkdir -p bridge/public bridge/api

# Create bridge script
cat > bridge/public/efh-bridge.js << 'EOF'
(async () => {
  const s = document.currentScript;
  const ORG = s?.getAttribute('data-efh-org') || 'efh';
  const ENV = s?.getAttribute('data-env') || 'prod';
  const base = 'https://elevateforhumanityfix2.netlify.app';
  const cfgUrl = `${base}/api/efh-config.json?org=${ORG}&env=${ENV}`;

  const cfg = await fetch(cfgUrl).then(r => r.json()).catch(() => ({}));
  const slot = (sel) => document.querySelector(sel);

  if (cfg.hero && slot('[data-efh-slot="hero"]')) {
    slot('[data-efh-slot="hero"]').innerHTML = `
      <div style="padding:24px;border-radius:16px;background:#111;color:#fff;">
        <h1>${cfg.hero.title}</h1>
        <p>${cfg.hero.subtitle}</p>
        <a href="${cfg.hero.ctaUrl}" style="display:inline-block;padding:10px 16px;background:#ff7a00;color:#fff;border-radius:8px;text-decoration:none">
          ${cfg.hero.ctaLabel}
        </a>
      </div>
    `;
  }

  if (Array.isArray(cfg.programs) && slot('[data-efh-slot="programs"]')) {
    slot('[data-efh-slot="programs"]').innerHTML =
      `<div style="display:grid;gap:16px;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));">
        ${cfg.programs.map(p => `
          <div style="border:1px solid #e5e7eb;border-radius:14px;padding:16px">
            <h3>${p.name}</h3>
            <p>${p.summary || ''}</p>
            <a href="${p.url}">Learn more →</a>
          </div>`).join('')}
      </div>`;
  }
})();
EOF

# Create config
cat > bridge/api/efh-config.json << 'EOF'
{
  "hero": {
    "title": "Elevate for Humanity Empowerment Center",
    "subtitle": "Barber Apprenticeship • HVAC • Healthcare • Drug Testing Business",
    "ctaLabel": "Apply Now",
    "ctaUrl": "https://app.elevateforhumanity.org/apply"
  },
  "programs": [
    { "name": "Barber Apprenticeship", "url": "/programs/barber", "summary": "Earn while you learn." },
    { "name": "HVAC & Welding", "url": "/programs/hvac", "summary": "Hands-on skilled trades." },
    { "name": "Healthcare (CNA/QMA)", "url": "/programs/healthcare", "summary": "Get certified fast." },
    { "name": "Drug Testing Business", "url": "/programs/drug-testing", "summary": "Start your own business." }
  ]
}
EOF
```

---

### Step 2: Deploy Bridge (1 minute)

```bash
# Deploy to Netlify
netlify deploy --dir=bridge/public --prod --message "Add Durable bridge"

# Verify
curl https://elevateforhumanityfix2.netlify.app/efh-bridge.js
# Should return the bridge script
```

---

### Step 3: Add to Durable (1 minute)

1. Log into your Durable.co account
2. Go to your site settings
3. Find "Custom Code" or "Scripts" section
4. Paste this in the `<head>` section:

```html
<script 
  src="https://elevateforhumanityfix2.netlify.app/efh-bridge.js" 
  data-efh-org="elevate-for-humanity" 
  data-env="prod" 
  defer>
</script>
```

5. Add slots where you want content:

```html
<!-- In your Durable page editor -->
<div data-efh-slot="hero"></div>
<div data-efh-slot="programs"></div>
```

6. Save and publish

---

### Step 4: Test (1 minute)

Visit your Durable site. You should see:
- Hero section with title, subtitle, and CTA
- Programs grid with 4 programs

**To update content:** Edit `bridge/api/efh-config.json` and redeploy. Changes appear instantly on Durable.

---

## Updating Content

### Edit Config

```bash
# Edit the config
nano bridge/api/efh-config.json

# Deploy changes
netlify deploy --dir=bridge/public --prod

# Changes appear instantly on Durable (no Durable edits needed!)
```

---

## Advanced: Add More Slots

### In Durable

```html
<!-- Add new slots -->
<div data-efh-slot="testimonials"></div>
<div data-efh-slot="pricing"></div>
<div data-efh-slot="faq"></div>
```

### In Bridge Script

```javascript
// Add to efh-bridge.js
if (cfg.testimonials && slot('[data-efh-slot="testimonials"]')) {
  slot('[data-efh-slot="testimonials"]').innerHTML = `
    <div class="testimonials">
      ${cfg.testimonials.map(t => `
        <blockquote>
          <p>"${t.quote}"</p>
          <cite>— ${t.author}</cite>
        </blockquote>
      `).join('')}
    </div>
  `;
}
```

### In Config

```json
{
  "testimonials": [
    { "quote": "This program changed my life!", "author": "John D." },
    { "quote": "Best decision I ever made.", "author": "Sarah M." }
  ]
}
```

---

## Troubleshooting

### Bridge script not loading

**Check:**
1. Script URL is correct: `https://elevateforhumanityfix2.netlify.app/efh-bridge.js`
2. Durable allows custom scripts
3. No CORS errors in browser console

**Fix:**
```bash
# Verify deployment
netlify status
netlify open

# Check logs
netlify logs
```

---

### Content not appearing

**Check:**
1. Slots exist in Durable: `<div data-efh-slot="hero"></div>`
2. Config JSON is valid
3. Browser console for errors

**Fix:**
```bash
# Validate JSON
cat bridge/api/efh-config.json | jq .

# Test config URL
curl https://elevateforhumanityfix2.netlify.app/api/efh-config.json
```

---

### CORS errors

**Check:**
1. `ALLOWED_ORIGIN` in `.env`
2. Netlify headers configuration

**Fix:**
```toml
# In netlify.toml
[[headers]]
  for = "/efh-bridge.js"
  [headers.values]
    Access-Control-Allow-Origin = "*"

[[headers]]
  for = "/api/*"
  [headers.values]
    Access-Control-Allow-Origin = "*"
```

---

## Architecture Selector (Optional)

For a guided setup experience:

```bash
# Create selector script
cat > scripts/select-architecture.sh << 'EOF'
#!/usr/bin/env bash
set -e

cat <<'EOT'
Choose Durable integration:
  [1] Option A – One-time snippet (RECOMMENDED)
  [2] Option B – Netlify shell
  [3] Option C – GTM injector
EOT

read -p "Select [1/2/3]: " CHOICE
case "$CHOICE" in
  1) echo "Setting up Option A..."; bash scripts/bootstrap-option-a.sh ;;
  2) echo "Setting up Option B..."; bash scripts/bootstrap-option-b.sh ;;
  3) echo "Setting up Option C..."; bash scripts/bootstrap-option-c.sh ;;
  *) echo "Invalid choice"; exit 1 ;;
esac
EOF
chmod +x scripts/select-architecture.sh

# Run it
bash scripts/select-architecture.sh
```

---

## Integration with Existing Autopilot

Your existing autopilot system remains unchanged. The bridge adds:

✅ **New capability:** Durable content injection  
✅ **No conflicts:** Uses separate infrastructure  
✅ **Compatible:** Works with existing Cloudflare Worker  
✅ **Additive:** Doesn't replace anything

---

## What's Automated

After one-time setup:

- ✅ Content updates (edit config, redeploy)
- ✅ Program changes (add/remove/edit)
- ✅ Hero section updates
- ✅ CTA changes
- ✅ Styling updates (via config)

**No Durable edits needed!**

---

## Monitoring

### Check Bridge Health

```bash
# Test bridge script
curl -I https://elevateforhumanityfix2.netlify.app/efh-bridge.js
# Should return 200 OK

# Test config
curl https://elevateforhumanityfix2.netlify.app/api/efh-config.json | jq .
# Should return valid JSON
```

### Add to Existing Autopilot

```javascript
// In workers/autopilot-deploy-worker.ts
async function checkBridgeHealth() {
  const response = await fetch('https://elevateforhumanityfix2.netlify.app/efh-bridge.js');
  return response.ok;
}
```

---

## Cost

**Option A:**
- Netlify: Free tier (already using)
- Cloudflare: Free tier (already using)
- Durable: Your existing subscription
- **Total additional cost:** $0

---

## Security

### Best Practices

1. **Validate config JSON**
   ```bash
   cat bridge/api/efh-config.json | jq . || echo "Invalid JSON"
   ```

2. **Sanitize HTML**
   ```javascript
   // In bridge script
   const sanitize = (str) => str.replace(/[<>]/g, '');
   ```

3. **Use HTTPS only**
   ```javascript
   if (location.protocol !== 'https:') {
     console.warn('Bridge requires HTTPS');
   }
   ```

4. **Set CSP headers**
   ```toml
   # In netlify.toml
   [[headers]]
     for = "/*"
     [headers.values]
       Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline'"
   ```

---

## Next Steps

1. **Deploy bridge** (5 minutes)
2. **Add to Durable** (1 minute)
3. **Test** (1 minute)
4. **Update content** (as needed)

**Total setup time:** ~7 minutes

---

## Support

### Documentation

- Full plan: `GITPOD_AUTOPILOT_INTEGRATION_PLAN.md`
- Compatibility: `DURABLE_COMPATIBILITY_REPORT.md`
- Existing autopilot: `AUTOPILOT_SETUP_COMPLETE.md`

### Questions?

1. Check browser console for errors
2. Verify Netlify deployment status
3. Test config JSON validity
4. Review Durable custom code settings

---

## Summary

**What you're adding:**
- Bridge script for Durable integration
- Config-driven content management
- Zero-maintenance updates

**What stays the same:**
- Existing autopilot system
- Cloudflare Worker
- Netlify Functions
- Supabase database

**Time investment:**
- Setup: 7 minutes
- Maintenance: 0 minutes

**Result:**
- Update Durable content by editing JSON
- No Durable edits after initial setup
- Fully automated

---

**Status:** ✅ READY TO DEPLOY  
**Recommendation:** Start with Option A  
**Next:** Run the commands above

---

**Your exact script tag:**

```html
<script 
  src="https://elevateforhumanityfix2.netlify.app/efh-bridge.js" 
  data-efh-org="elevate-for-humanity" 
  data-env="prod" 
  defer>
</script>
```

**Paste this once in Durable, and you're done! 🎉**
