# EFH Durable Bridge - Option A

**Status:** ✅ Ready to Deploy

## Files Created

```
bridge/
├── public/
│   └── efh-bridge.js       # Bridge script (inject into Durable)
└── api/
    └── efh-config.json     # Content configuration
```

## Deployment Instructions

### Option 1: Deploy via Netlify CLI (Recommended)

```bash
# Login to Netlify (one-time)
netlify login

# Link to your site (one-time)
netlify link

# Deploy bridge files
cd bridge
netlify deploy --dir=public --prod --message "Add EFH Durable bridge"

# Verify deployment
curl https://elevateforhumanityfix2.netlify.app/efh-bridge.js
curl https://elevateforhumanityfix2.netlify.app/api/efh-config.json
```

### Option 2: Deploy via Netlify Dashboard

1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Select your site: `elevateforhumanityfix2`
3. Go to **Deploys** → **Drag and drop**
4. Drag the `bridge/public` folder
5. Wait for deployment to complete

### Option 3: Copy to Existing Build

```bash
# Copy bridge files to public directory
cp -r bridge/public/* public/
cp -r bridge/api public/

# Build and deploy normally
pnpm build
netlify deploy --prod
```

## Durable Integration

### Step 1: Add Script to Durable

In your Durable.co site settings, add this to the **Custom Code** section (in `<head>`):

```html
<script 
  src="https://elevateforhumanityfix2.netlify.app/efh-bridge.js" 
  data-efh-org="elevate-for-humanity" 
  data-env="prod" 
  defer>
</script>
```

### Step 2: Add Content Slots

In your Durable page editor, add these slots where you want content:

```html
<!-- Hero Section -->
<div data-efh-slot="hero"></div>

<!-- Programs Grid -->
<div data-efh-slot="programs"></div>

<!-- Features Section -->
<div data-efh-slot="features"></div>

<!-- Testimonials -->
<div data-efh-slot="testimonials"></div>

<!-- Call to Action -->
<div data-efh-slot="cta"></div>
```

### Step 3: Save and Publish

Save your Durable page and publish. Content will appear automatically!

## Updating Content

To update content on your Durable site:

1. Edit `bridge/api/efh-config.json`
2. Redeploy to Netlify
3. Changes appear instantly on Durable (no Durable edits needed!)

### Example: Add a New Program

```json
{
  "programs": [
    {
      "name": "New Program Name",
      "url": "/programs/new-program",
      "summary": "Description of the new program"
    }
  ]
}
```

## Available Slots

### Hero Section
- **Slot:** `data-efh-slot="hero"`
- **Config:** `hero.title`, `hero.subtitle`, `hero.ctaLabel`, `hero.ctaUrl`

### Programs Grid
- **Slot:** `data-efh-slot="programs"`
- **Config:** `programs[]` array with `name`, `url`, `summary`

### Features Section
- **Slot:** `data-efh-slot="features"`
- **Config:** `features[]` array with `icon`, `title`, `description`

### Testimonials
- **Slot:** `data-efh-slot="testimonials"`
- **Config:** `testimonials[]` array with `quote`, `author`

### Call to Action
- **Slot:** `data-efh-slot="cta"`
- **Config:** `cta.title`, `cta.subtitle`, `cta.label`, `cta.url`

## Testing

### Test Bridge Script

```bash
# Check if bridge script is accessible
curl -I https://elevateforhumanityfix2.netlify.app/efh-bridge.js
# Should return: 200 OK

# Check config
curl https://elevateforhumanityfix2.netlify.app/api/efh-config.json | jq .
# Should return valid JSON
```

### Test in Browser

1. Open browser console (F12)
2. Visit your Durable page
3. Look for: `[EFH Bridge] Initialization complete ✅`
4. Verify content appears in slots

## Troubleshooting

### Bridge script not loading

**Check:**
- Script URL is correct
- Durable allows custom scripts
- No CORS errors in console

**Fix:**
```bash
# Verify deployment
netlify status
curl -I https://elevateforhumanityfix2.netlify.app/efh-bridge.js
```

### Content not appearing

**Check:**
- Slots exist: `<div data-efh-slot="hero"></div>`
- Config JSON is valid
- Browser console for errors

**Fix:**
```bash
# Validate JSON
cat bridge/api/efh-config.json | jq .

# Check for errors
# Open browser console and look for [EFH Bridge] messages
```

### CORS errors

**Fix:** Add CORS headers in `netlify.toml`:

```toml
[[headers]]
  for = "/efh-bridge.js"
  [headers.values]
    Access-Control-Allow-Origin = "*"
    Cache-Control = "public, max-age=3600"

[[headers]]
  for = "/api/*"
  [headers.values]
    Access-Control-Allow-Origin = "*"
    Cache-Control = "public, max-age=300"
```

## Security

- ✅ All content is sanitized before injection
- ✅ XSS protection via `textContent` sanitization
- ✅ HTTPS only
- ✅ No eval() or dangerous functions

## Performance

- ✅ Async loading (defer attribute)
- ✅ Single HTTP request for config
- ✅ Minimal JavaScript footprint (~3KB)
- ✅ No external dependencies

## Maintenance

**Zero maintenance required!**

To update content:
1. Edit `bridge/api/efh-config.json`
2. Redeploy
3. Done!

No Durable edits needed after initial setup.

## Support

- Full documentation: `DURABLE_GITPOD_QUICKSTART.md`
- Integration plan: `GITPOD_AUTOPILOT_INTEGRATION_PLAN.md`
- Compatibility report: `DURABLE_COMPATIBILITY_REPORT.md`

## Next Steps

1. **Deploy bridge files** (choose option above)
2. **Add script to Durable** (copy snippet above)
3. **Add slots to Durable** (copy HTML above)
4. **Test and verify** (check browser console)
5. **Update content** (edit config, redeploy)

---

**Status:** ✅ READY TO DEPLOY  
**Setup Time:** ~5 minutes  
**Maintenance:** 0 minutes forever
