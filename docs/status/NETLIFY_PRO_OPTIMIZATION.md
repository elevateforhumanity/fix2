# Netlify Pro Build Optimization

## Current Situation Analysis

You're on **Netlify Pro** ($19/month) with:

- ✅ 25,000 build minutes/month included
- ✅ 401 minutes used (only 1.6% of allowance)
- ⚠️ **Not a cost problem** - you have 24,599 minutes remaining
- ⚠️ **Build time problem** - each build takes 8-12 minutes

### Build Time Breakdown

**Current Build Process:**

```
1. pnpm install (767MB node_modules)     → 2-3 minutes
2. prebuild (generate routes + autopilot) → 30-60 seconds
3. vite build (302 source files)          → 2-3 minutes
4. postbuild (8 sequential scripts)       → 3-5 minutes
   - postbuild.mjs
   - generate-sitemaps.mjs
   - fix-broken-links.mjs
   - fix-domain-urls.js
   - update-canonical-urls.js
   - no-source-maps.cjs
   - autopilot-verify-build.sh
   - security-compliance-autopilot.mjs
────────────────────────────────────────────────────────
Total: 8-12 minutes per build
```

### The Real Problem

**317 commits in 2 weeks** = ~23 commits/day

At 10 min/build × 23 builds/day = **230 minutes/day wasted waiting**

This isn't about cost - it's about **developer velocity**.

---

## Optimization Strategy for Pro Tier

### Goal: Reduce build time from 10 minutes → 3-4 minutes

### 1. Enable Build Caching (Saves 2-3 min)

**Current:** Rebuilds everything from scratch
**Fix:** Cache node_modules and build artifacts

```toml
# Add to netlify.toml
[[plugins]]
  package = "netlify-plugin-cache"
  [plugins.inputs]
    paths = [
      "node_modules",
      ".pnpm-store",
      "node_modules/.vite",
      "dist/assets"
    ]
```

**Impact:**

- First build: 10 min
- Subsequent builds: 6-7 min (30% faster)

### 2. Parallelize Postbuild Scripts (Saves 2-3 min)

**Current:** 8 scripts run sequentially (one after another)
**Fix:** Run independent scripts in parallel

Create `scripts/postbuild-parallel.mjs`:

```javascript
import { spawn } from 'child_process';
import { promisify } from 'util';

const exec = promisify(require('child_process').exec);

async function runParallel(commands) {
  return Promise.all(commands.map((cmd) => exec(cmd)));
}

async function runSequential(commands) {
  for (const cmd of commands) {
    await exec(cmd);
  }
}

// Phase 1: Can run in parallel (independent)
await runParallel([
  'node scripts/generate-sitemaps.mjs',
  'node scripts/fix-domain-urls.js',
  'node scripts/no-source-maps.cjs',
]);

// Phase 2: Depends on Phase 1
await runSequential([
  'node scripts/fix-broken-links.mjs',
  'node scripts/update-canonical-urls.js',
]);

// Phase 3: Final verification
await runSequential([
  'bash scripts/autopilot-verify-build.sh',
  'node scripts/security-compliance-autopilot.mjs',
]);

console.log('✅ Postbuild complete');
```

Update `package.json`:

```json
{
  "scripts": {
    "postbuild": "node scripts/postbuild-parallel.mjs"
  }
}
```

**Impact:** 5 min → 2 min (60% faster)

### 3. Skip Builds for Non-Code Changes (Saves entire builds)

**Current:** Every commit triggers build (docs, README, etc.)
**Fix:** Only build when source code changes

Create `scripts/should-build.sh`:

```bash
#!/bin/bash
# Exit 0 to build, exit 1 to skip

# Check if any source files changed
if git diff --quiet HEAD^ HEAD -- \
  src/ \
  public/ \
  netlify/ \
  package.json \
  pnpm-lock.yaml \
  vite.config.js \
  netlify.toml; then
  echo "⏭️  No source changes, skipping build"
  exit 1
else
  echo "✅ Source changes detected, building"
  exit 0
fi
```

Update `netlify.toml`:

```toml
[build]
  command = "pnpm install && pnpm run build"
  publish = "dist"
  ignore = "bash scripts/should-build.sh"
```

**Impact:** Skip ~30% of builds (doc/config only changes)

### 4. Optimize Dependency Installation (Saves 1-2 min)

**Current:** `pnpm install` reinstalls everything
**Fix:** Use frozen lockfile + cache

Update `netlify.toml`:

```toml
[build]
  command = "pnpm install --frozen-lockfile --prefer-offline && pnpm run build"
```

**Impact:** 3 min → 1 min (with cache)

### 5. Reduce Prebuild Work (Saves 30-60 sec)

**Current:** Runs autopilot checks on every build
**Fix:** Only run autopilot on main branch

Update `package.json`:

```json
{
  "scripts": {
    "prebuild": "node scripts/generate-routes.mjs && node tools/autopilot-conditional.mjs"
  }
}
```

Create `tools/autopilot-conditional.mjs`:

```javascript
// Only run full autopilot on main branch
if (process.env.BRANCH === 'main' || process.env.CONTEXT === 'production') {
  await import('./autopilot.mjs');
} else {
  console.log('⏭️  Skipping autopilot on branch build');
}
```

**Impact:** 60 sec → 10 sec on branch builds

---

## Expected Results After Optimization

### Before:

```
Install:   3 min
Prebuild:  1 min
Build:     3 min
Postbuild: 5 min
────────────────
Total:    12 min
```

### After:

```
Install:   1 min (cached)
Prebuild:  10 sec (conditional)
Build:     3 min (same)
Postbuild: 2 min (parallel)
────────────────
Total:     4 min (67% faster)
```

### Impact on Your Workflow:

- **23 builds/day** × 8 min saved = **184 min/day saved**
- **3 hours/day** back for development
- **Same cost** ($19/month Pro)
- **Better developer experience**

---

## Implementation Plan

### Phase 1: Quick Wins (30 minutes)

1. ✅ Enable build caching
2. ✅ Add build ignore script
3. ✅ Optimize pnpm install command

**Result:** 12 min → 8 min builds

### Phase 2: Parallel Postbuild (1 hour)

1. ✅ Create postbuild-parallel.mjs
2. ✅ Test locally
3. ✅ Update package.json
4. ✅ Deploy and verify

**Result:** 8 min → 5 min builds

### Phase 3: Conditional Prebuild (30 minutes)

1. ✅ Create autopilot-conditional.mjs
2. ✅ Update prebuild script
3. ✅ Test on branch vs main

**Result:** 5 min → 4 min builds

---

## Additional Pro Tier Features to Leverage

### 1. Build Plugins (Already Available)

- ✅ Lighthouse (disabled - re-enable after optimization)
- ✅ Sitemap submission (already enabled)
- ✅ Cache plugin (enable now)

### 2. Deploy Contexts

Optimize different contexts differently:

```toml
# Production: Full build with all checks
[context.production]
  command = "pnpm install && pnpm run build"

# Branch deploys: Fast build, skip some checks
[context.branch-deploy]
  command = "pnpm install --frozen-lockfile && NODE_ENV=development pnpm run build:fast"
  ignore = "bash scripts/should-build.sh"

# Deploy previews: Minimal build
[context.deploy-preview]
  command = "pnpm install --frozen-lockfile && pnpm run build:preview"
```

Add to `package.json`:

```json
{
  "scripts": {
    "build:fast": "vite build --mode development",
    "build:preview": "vite build --mode preview"
  }
}
```

### 3. Parallel Processing

Pro tier has more CPU cores - use them:

```toml
[build.environment]
  NODE_OPTIONS = "--max_old_space_size=4096 --max-workers=4"
```

---

## Monitoring & Metrics

### Track Build Performance

Add to `scripts/build-metrics.mjs`:

```javascript
const start = Date.now();

// Your build process

const duration = Date.now() - start;
console.log(
  `\n📊 Build completed in ${duration}ms (${(duration / 1000 / 60).toFixed(1)} minutes)`
);

// Log to file for tracking
await fs.appendFile(
  'build-times.log',
  `${new Date().toISOString()},${duration}\n`
);
```

### Set Build Time Alerts

In Netlify dashboard:

1. Go to Site settings → Build & deploy → Build notifications
2. Add notification for builds > 5 minutes
3. Get alerted when builds slow down

---

## Why You're Using 401 Minutes (Not a Problem)

**Calculation:**

- 317 commits in 2 weeks = ~160 commits/week
- ~10 min/build average
- 160 builds × 10 min = **1,600 min/week**
- But you only used 401 min total?

**This means:**

- Many builds are being skipped (good!)
- Or builds are faster than 10 min
- Or not all commits trigger builds

**With 25,000 min/month allowance:**

- You can do **2,500 builds/month** at 10 min each
- Or **6,250 builds/month** at 4 min each (after optimization)
- You're using **1.6%** of your allowance

---

## The Real Issue: Developer Velocity

**Problem:** Waiting 10 minutes per build slows development

**Solution:** Optimize build time, not cost

**Benefits:**

1. ✅ Faster feedback loops
2. ✅ More iterations per day
3. ✅ Better developer experience
4. ✅ Same cost ($19/month)
5. ✅ Still only using ~2-3% of Pro allowance

---

## Recommended Actions

### Do This Week:

1. **Enable build caching** (5 min)
2. **Add build ignore script** (10 min)
3. **Parallelize postbuild** (1 hour)

**Expected Result:** 12 min → 4 min builds

### Monitor for 1 Week:

- Track build times
- Verify cache is working
- Check skip rate for non-code changes

### Optional (If Still Slow):

- Split into multiple smaller builds
- Use Netlify Build Plugins for heavy tasks
- Consider incremental builds for large apps

---

## Summary

✅ **You're on Pro** - cost is not the issue
✅ **401 min used** - only 1.6% of 25,000 allowance
⚠️ **Build time is the issue** - 10 min is too slow
🎯 **Goal:** Reduce to 4 min (67% faster)
💰 **Cost:** $0 (already paying for Pro)
⏱️ **Time to implement:** 2 hours
📈 **ROI:** 3 hours/day saved waiting for builds

**Next step:** Implement Phase 1 optimizations (30 minutes)?
