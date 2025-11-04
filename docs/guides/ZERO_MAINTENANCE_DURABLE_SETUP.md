# Zero-Maintenance Durable Setup

## Goal: Fully Automatic, No Manual Updates

### The Perfect Solution: Full Iframe Embed

**Why this is zero-maintenance:**

- ✅ Durable manages ALL content
- ✅ Updates appear instantly (no deploy needed)
- ✅ Styling automatically matches Durable
- ✅ No code changes ever needed
- ✅ No database to maintain
- ✅ No API keys to manage
- ✅ No sync scripts to run

---

## Implementation (One-Time Setup)

### Step 1: Update All Durable Pages

Replace content in these 6 files with iframe code:

**Files to update:**

1. `src/pages/DurableAI.jsx`
2. `src/pages/DurableFeatures.jsx`
3. `src/pages/DurablePricing.jsx`
4. `src/pages/DurableTemplates.jsx`
5. `src/pages/DurableLanding.jsx`
6. `src/pages/ProgramsDurable.jsx`

### Step 2: Copy This Exact Code

**For DurableLanding.jsx:**

```jsx
export default function DurableLanding() {
  return (
    <iframe
      src="https://YOUR-SITE.durable.co"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        border: 'none',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
      }}
      title="Elevate for Humanity"
    />
  );
}
```

**For DurableFeatures.jsx:**

```jsx
export default function DurableFeatures() {
  return (
    <iframe
      src="https://YOUR-SITE.durable.co/features"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        border: 'none',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
      }}
      title="Features"
    />
  );
}
```

**For DurablePricing.jsx:**

```jsx
export default function DurablePricing() {
  return (
    <iframe
      src="https://YOUR-SITE.durable.co/pricing"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        border: 'none',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
      }}
      title="Pricing"
    />
  );
}
```

**For DurableTemplates.jsx:**

```jsx
export default function DurableTemplates() {
  return (
    <iframe
      src="https://YOUR-SITE.durable.co/templates"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        border: 'none',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
      }}
      title="Templates"
    />
  );
}
```

**For DurableAI.jsx:**

```jsx
export default function DurableAI() {
  return (
    <iframe
      src="https://YOUR-SITE.durable.co/ai"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        border: 'none',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
      }}
      title="AI Features"
    />
  );
}
```

**For ProgramsDurable.jsx:**

```jsx
export default function ProgramsDurable() {
  return (
    <iframe
      src="https://YOUR-SITE.durable.co/programs"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        border: 'none',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
      }}
      title="Programs"
    />
  );
}
```

### Step 3: Replace YOUR-SITE with Your Actual Durable URL

Find and replace in all 6 files:

```
YOUR-SITE.durable.co
```

With your actual Durable site URL, for example:

```
elevateforhumanity.durable.co
```

---

## That's It!

### What Happens Now:

1. **You update content in Durable** → Changes appear instantly on your site
2. **You change styling in Durable** → Styling updates instantly on your site
3. **You add new pages in Durable** → Just add new iframe (one-time)
4. **You edit text in Durable** → Updates instantly, no deploy needed

### What You NEVER Have To Do:

- ❌ Update code
- ❌ Run sync scripts
- ❌ Deploy changes
- ❌ Manage databases
- ❌ Handle API keys
- ❌ Fix CSS conflicts
- ❌ Maintain styling
- ❌ Update content manually

---

## Quick Setup Script

Want to do this automatically? Run this:

```bash
# Create the setup script
cat > scripts/setup-durable-iframes.sh << 'EOF'
#!/bin/bash

# Your Durable site URL
DURABLE_URL="YOUR-SITE.durable.co"

echo "Setting up zero-maintenance Durable iframes..."

# DurableLanding.jsx
cat > src/pages/DurableLanding.jsx << EOL
export default function DurableLanding() {
  return (
    <iframe
      src="https://${DURABLE_URL}"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        border: 'none',
        margin: 0,
        padding: 0,
        overflow: 'hidden'
      }}
      title="Elevate for Humanity"
    />
  );
}
EOL

# DurableFeatures.jsx
cat > src/pages/DurableFeatures.jsx << EOL
export default function DurableFeatures() {
  return (
    <iframe
      src="https://${DURABLE_URL}/features"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        border: 'none',
        margin: 0,
        padding: 0,
        overflow: 'hidden'
      }}
      title="Features"
    />
  );
}
EOL

# DurablePricing.jsx
cat > src/pages/DurablePricing.jsx << EOL
export default function DurablePricing() {
  return (
    <iframe
      src="https://${DURABLE_URL}/pricing"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        border: 'none',
        margin: 0,
        padding: 0,
        overflow: 'hidden'
      }}
      title="Pricing"
    />
  );
}
EOL

# DurableTemplates.jsx
cat > src/pages/DurableTemplates.jsx << EOL
export default function DurableTemplates() {
  return (
    <iframe
      src="https://${DURABLE_URL}/templates"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        border: 'none',
        margin: 0,
        padding: 0,
        overflow: 'hidden'
      }}
      title="Templates"
    />
  );
}
EOL

# DurableAI.jsx
cat > src/pages/DurableAI.jsx << EOL
export default function DurableAI() {
  return (
    <iframe
      src="https://${DURABLE_URL}/ai"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        border: 'none',
        margin: 0,
        padding: 0,
        overflow: 'hidden'
      }}
      title="AI Features"
    />
  );
}
EOL

# ProgramsDurable.jsx
cat > src/pages/ProgramsDurable.jsx << EOL
export default function ProgramsDurable() {
  return (
    <iframe
      src="https://${DURABLE_URL}/programs"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        border: 'none',
        margin: 0,
        padding: 0,
        overflow: 'hidden'
      }}
      title="Programs"
    />
  );
}
EOL

echo "✅ All Durable pages configured with iframes"
echo "✅ Zero maintenance setup complete"
echo ""
echo "Your Durable URL: https://${DURABLE_URL}"
echo ""
echo "Next steps:"
echo "1. Update DURABLE_URL in this script if needed"
echo "2. Run: npm run build"
echo "3. Deploy"
echo "4. Done! All future updates happen in Durable automatically"
EOF

chmod +x scripts/setup-durable-iframes.sh

echo "✅ Script created: scripts/setup-durable-iframes.sh"
echo ""
echo "To use:"
echo "1. Edit the script and set your DURABLE_URL"
echo "2. Run: ./scripts/setup-durable-iframes.sh"
```

---

## Usage

### One-Time Setup:

```bash
# 1. Edit the script
nano scripts/setup-durable-iframes.sh
# Change: DURABLE_URL="YOUR-SITE.durable.co"
# To: DURABLE_URL="elevateforhumanity.durable.co"

# 2. Run the script
./scripts/setup-durable-iframes.sh

# 3. Build and deploy
npm run build
git add .
git commit -m "Setup zero-maintenance Durable iframes"
git push
```

### Forever After:

**Just edit in Durable. That's it.**

---

## Benefits

### Zero Maintenance Means:

✅ **No Code Updates** - Edit in Durable, changes appear instantly  
✅ **No Deployments** - Content updates without deploying  
✅ **No Styling Work** - Durable handles all CSS  
✅ **No Database** - No sync, no storage, no complexity  
✅ **No Scripts** - No cron jobs, no webhooks, no automation  
✅ **No API Keys** - No credentials to manage  
✅ **No Monitoring** - Nothing to break, nothing to watch

### Perfect For:

- ✅ Non-technical content editors
- ✅ Frequent content updates
- ✅ Marketing campaigns
- ✅ A/B testing
- ✅ Rapid iteration
- ✅ Zero DevOps overhead

---

## Troubleshooting

### If iframe doesn't load:

**Check Durable allows embedding:**

1. Log into Durable
2. Check site settings
3. Enable "Allow embedding" or "iframe embedding"

**If Durable blocks iframes:**

- Contact Durable support
- Ask them to allow your domain: `elevateforhumanity.org`

### If you see "X-Frame-Options" error:

This means Durable blocks iframes. Solutions:

1. Contact Durable support to whitelist your domain
2. Use Durable's custom domain feature (point subdomain to Durable)
3. Use export method (loses auto-sync)

---

## Alternative: Custom Domain (Even Better)

### If Durable supports custom domains:

**Setup:**

1. Point `durable.elevateforhumanity.org` to Durable
2. Update iframe src to use your subdomain
3. No iframe restrictions!

**Benefits:**

- ✅ Same domain (no iframe issues)
- ✅ Better SEO
- ✅ Seamless user experience
- ✅ Still zero maintenance

---

## Summary

**Setup Time:** 5 minutes  
**Maintenance Time:** 0 minutes forever  
**Complexity:** Minimal  
**Recommended:** ✅ YES - This is the way

**Your workflow:**

1. Edit content in Durable
2. Save
3. Done (changes live instantly)

**No more:**

- Code updates
- Deployments
- Sync scripts
- Database management
- API integration
- CSS maintenance

---

**Status:** ✅ ZERO-MAINTENANCE SOLUTION  
**Setup:** One-time, 5 minutes  
**Ongoing Work:** None  
**Recommended:** Strongly recommended for minimal maintenance
