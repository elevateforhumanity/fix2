# Netlify Build Optimization Plan

## Current Problem

- **401 minutes used** in current billing period
- **317 commits in 2 weeks** = ~23/day
- **Each build:** 8-12 minutes
- **Root cause:** Every push triggers full rebuild with heavy postbuild scripts

---

## Immediate Actions (Stay on Netlify)

### 1. Skip Unnecessary Builds (5 minutes)

Add build ignore command to skip builds when only docs change:

```toml
# Add to netlify.toml [build] section
[build]
  ignore = "bash scripts/should-build.sh"
```

Create `scripts/should-build.sh`:

```bash
#!/bin/bash
# Only build if source code changed
git diff --quiet HEAD^ HEAD -- src/ public/ netlify/ package.json vite.config.js
exit $?
```

**Savings:** ~30% fewer builds (skip doc-only changes)

### 2. Optimize Postbuild Scripts (30 minutes)

Combine sequential scripts into one parallel execution:

```json
// package.json
"postbuild": "node scripts/postbuild-optimized.mjs"
```

Create `scripts/postbuild-optimized.mjs`:

```javascript
import { spawn } from 'child_process';

// Run scripts in parallel instead of sequential
const scripts = [
  'node scripts/generate-sitemaps.mjs',
  'node scripts/fix-broken-links.mjs',
  'node scripts/fix-domain-urls.js',
  'node scripts/update-canonical-urls.js',
  'node scripts/no-source-maps.cjs',
];

await Promise.all(
  scripts.map(
    (cmd) =>
      new Promise((resolve, reject) => {
        const proc = spawn('sh', ['-c', cmd]);
        proc.on('close', (code) => (code === 0 ? resolve() : reject()));
      })
  )
);
```

**Savings:** 3-5 minutes per build

### 3. Disable Branch Previews for Docs (10 minutes)

Only build previews for actual code changes:

```toml
# netlify.toml
[context.branch-deploy]
  ignore = "bash scripts/should-build.sh"
```

**Savings:** ~40% fewer preview builds

### 4. Enable Dependency Caching (2 minutes)

Re-enable cache plugin with fix:

```toml
[[plugins]]
  package = "netlify-plugin-cache"
  [plugins.inputs]
    paths = ["node_modules/.vite", "dist/assets"]
```

**Savings:** 1-2 minutes per build

---

## Migration Options (Better Long-term)

### Option 1: Cloudflare Pages (RECOMMENDED)

**Why:** Unlimited builds, already using Cloudflare Workers

**Migration Steps:**

1. Connect GitHub repo to Cloudflare Pages (5 min)
2. Configure build settings:
   ```
   Build command: pnpm install && pnpm build
   Output directory: dist
   ```
3. Add environment variables (10 min)
4. Migrate Netlify Functions to Cloudflare Workers (1-2 hours)
5. Update DNS (5 min)

**Total Time:** 2-3 hours
**Cost:** $0/month (unlimited builds)
**Savings:** $19/month + unlimited scaling

### Option 2: Vercel

**Why:** Better React/Vite optimization, 6000 free minutes

**Migration Steps:**

1. Import from GitHub (2 min)
2. Auto-detects Vite config (0 min)
3. Add environment variables (10 min)
4. Migrate functions to Vercel Functions (2-3 hours)
5. Update DNS (5 min)

**Total Time:** 3-4 hours
**Cost:** $0/month (6000 minutes)
**Savings:** $19/month until you hit 6000 min

### Option 3: GitHub Pages + Cloudflare Workers

**Why:** Completely free, separate static hosting from functions

**Migration Steps:**

1. Enable GitHub Pages (2 min)
2. Add GitHub Actions workflow for build (10 min)
3. Move all functions to Cloudflare Workers (3-4 hours)
4. Configure Cloudflare DNS (10 min)

**Total Time:** 4-5 hours
**Cost:** $0/month forever
**Savings:** $19/month + unlimited builds

---

## Recommended Path

### Immediate (Today - 1 hour):

1. ✅ Add build ignore script
2. ✅ Optimize postbuild to parallel
3. ✅ Disable branch preview for docs
4. ✅ Re-enable caching

**Expected Result:** 400 min → 150-200 min/month

### Short-term (This Week - 3 hours):

**Migrate to Cloudflare Pages**

- Unlimited builds
- Already using Cloudflare ecosystem
- Better performance
- Zero ongoing cost

### Why Cloudflare Pages?

1. ✅ **Unlimited builds** - never worry about minutes again
2. ✅ **Already using Workers** - easier function migration
3. ✅ **Better performance** - faster edge network
4. ✅ **Free forever** - no usage limits on free tier
5. ✅ **Better DDoS protection** - included
6. ✅ **Simpler architecture** - Pages + Workers unified

---

## Cost Analysis

### Current Netlify Path:

- **Now:** 401 min/month → over free tier
- **Optimized:** ~200 min/month → still over free tier
- **Need Pro:** $19/month

### Cloudflare Pages Path:

- **Now:** Unlimited builds
- **Future:** Unlimited builds
- **Cost:** $0/month forever

### ROI:

- **Migration time:** 3 hours
- **Monthly savings:** $19
- **Break-even:** Immediate
- **Annual savings:** $228

---

## Implementation Priority

### Priority 1: Quick Wins (Do Now)

```bash
# 1. Add build ignore
echo '#!/bin/bash
git diff --quiet HEAD^ HEAD -- src/ public/ netlify/ package.json vite.config.js
exit $?' > scripts/should-build.sh
chmod +x scripts/should-build.sh

# 2. Update netlify.toml
# Add: ignore = "bash scripts/should-build.sh"
```

### Priority 2: Optimize Scripts (This Week)

- Parallelize postbuild scripts
- Remove redundant checks
- Cache build artifacts

### Priority 3: Migrate Platform (Next Week)

- Move to Cloudflare Pages
- Migrate functions to Workers
- Update DNS

---

## Decision Matrix

| Factor             | Stay Netlify | Cloudflare Pages | Vercel               |
| ------------------ | ------------ | ---------------- | -------------------- |
| **Cost**           | $19/mo       | $0/mo            | $0/mo (until 6k min) |
| **Build Minutes**  | 300 free     | Unlimited        | 6000 free            |
| **Migration Time** | 0 hours      | 3 hours          | 4 hours              |
| **Performance**    | Good         | Excellent        | Excellent            |
| **Ecosystem Fit**  | Okay         | Great (Workers)  | Good                 |
| **Risk**           | Low          | Low              | Low                  |
| **Recommendation** | ❌           | ✅ **BEST**      | ⚠️ Good backup       |

---

## Next Steps

**Choose Your Path:**

### Path A: Optimize & Stay (Conservative)

1. Implement quick wins (1 hour)
2. Monitor for 1 week
3. Upgrade to Netlify Pro if still over limit ($19/mo)

### Path B: Migrate to Cloudflare (Recommended)

1. Implement quick wins today (1 hour)
2. Plan migration this week (3 hours)
3. Save $228/year + unlimited scaling

### Path C: Hybrid Approach

1. Optimize Netlify now (1 hour)
2. Migrate to Cloudflare next month (3 hours)
3. Best of both worlds

---

## Questions to Consider

1. **How critical is staying on Netlify?**
   - If not critical → Migrate to Cloudflare
   - If critical → Optimize and upgrade to Pro

2. **How much development velocity matters?**
   - High velocity (many commits) → Need unlimited builds
   - Low velocity → Optimized Netlify might work

3. **What's your budget?**
   - $0/month → Cloudflare Pages or GitHub Pages
   - $19/month → Netlify Pro or Vercel Pro
   - Unlimited → AWS/GCP enterprise

---

## My Recommendation

**Migrate to Cloudflare Pages** because:

1. You're already using Cloudflare Workers
2. Unlimited builds = no future surprises
3. Better performance globally
4. $0 cost forever
5. 3-hour migration is worth $228/year savings
6. Simpler architecture (Pages + Workers vs Netlify + Workers)

**Timeline:**

- **Today:** Implement quick optimizations (1 hour)
- **This week:** Migrate to Cloudflare Pages (3 hours)
- **Result:** Unlimited builds, $0/month, better performance

Would you like me to start the migration to Cloudflare Pages?
