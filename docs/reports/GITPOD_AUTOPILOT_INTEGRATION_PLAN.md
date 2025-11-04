# Gitpod Autopilot Integration Plan

**Date:** October 31, 2025  
**Project:** Elevate for Humanity  
**Analysis:** Integrating Proposed Gitpod Autopilot Architecture

---

## Executive Summary

The proposed Gitpod autopilot architecture provides a **clean, modular approach** for Durable + Netlify + Cloudflare + Supabase integration. However, your project **already has a mature autopilot system** in place. This plan analyzes compatibility and recommends the best integration path.

---

## Current State Analysis

### Existing Autopilot Infrastructure

Your project already has:

✅ **Autopilot System v7.0** (Autonomous mode)

- Database schema: `automation.tasks`, `automation.task_edges`, `automation.health_log`
- Supabase Edge Functions: `autopilot-worker`, `autopilot-bridge`
- GitHub Actions: `autopilot-comment-bridge.yml`, `autopilot-master.yml`
- Admin UI: `src/pages/admin/AutopilotTasks.tsx`
- Configuration: `.autopilot-config.json`

✅ **Cloudflare Worker**

- `workers/autopilot-deploy-worker.ts`
- Handles: deploy triggers, status checks, rollbacks, cache purging
- Cron: Every 10 minutes for health checks
- Configuration: `wrangler.toml`

✅ **Netlify Functions** (18 functions)

- Health checks, deployments, Stripe, social media, reporting
- Configuration: `netlify.toml` with full routing

✅ **Gitpod Configuration**

- `.gitpod.yml` with dev server setup
- `.gitpod.Dockerfile` (uses workspace-full)
- Ports: 5173 (Vite), 3000, 8080, 54321 (Supabase)

✅ **Bootstrap Scripts**

- `autopilot-autonomous-setup.sh`
- `autopilot-full-setup.sh`
- `bootstrap-agents.sh`
- `efh-autopilot-bootstrap.sh`

### What's Missing

❌ **Durable Integration**

- No Durable URL configured
- No Durable API keys
- No bridge script for Durable embedding
- No architecture selector (Options A/B/C)

❌ **Unified Selector Interface**

- No interactive menu for choosing integration method
- No prerequisite checker
- No environment validation

---

## Proposed Architecture Analysis

### Option A: One-Time Snippet (Fully Automated)

**Concept:** Paste `<script>` once in Durable → Everything automated thereafter

**Pros:**

- ✅ Minimal Durable changes (one-time)
- ✅ Full automation after setup
- ✅ Bridge script manages all updates
- ✅ Works with existing Cloudflare Worker

**Cons:**

- ⚠️ Requires Durable to allow custom scripts
- ⚠️ Need to verify Durable's script injection capabilities
- ⚠️ Bridge script must be hosted and maintained

**Compatibility:** ✅ **HIGH** - Fits well with existing infrastructure

---

### Option B: Netlify as Shell (Zero Durable Changes)

**Concept:** Netlify hosts shell, embeds Durable via iframe

**Pros:**

- ✅ No Durable changes after domain setup
- ✅ Full control over shell/wrapper
- ✅ Already have Netlify infrastructure
- ✅ Can add custom header/footer

**Cons:**

- ⚠️ SEO limitations (iframe content)
- ⚠️ Potential X-Frame-Options blocking
- ⚠️ Need to manage two sites (Netlify + Durable)

**Compatibility:** ✅ **HIGH** - Leverages existing Netlify setup

---

### Option C: GTM Injector (One-Time GTM ID)

**Concept:** Add GTM container once → Autopilot manages via GTM

**Pros:**

- ✅ One-time GTM setup in Durable
- ✅ Full control via GTM tags
- ✅ Can inject any scripts/content
- ✅ No ongoing Durable changes

**Cons:**

- ⚠️ Requires GTM account and setup
- ⚠️ Additional complexity (GTM API)
- ⚠️ Need to manage GTM container
- ⚠️ GTM API integration not included in proposal

**Compatibility:** ⚠️ **MEDIUM** - Requires additional GTM infrastructure

---

## Integration Points

### 1. Gitpod Configuration

**Current:**

```yaml
# .gitpod.yml
tasks:
  - name: Install Dependencies
    init: pnpm install
  - name: Dev Server
    command: pnpm dev

ports:
  - port: 5173 # Vite
  - port: 3000
  - port: 8080
  - port: 54321 # Supabase
```

**Proposed Addition:**

```yaml
tasks:
  - name: Setup
    init: |
      cp -n .env.example .env || true
      npm i -g pnpm@9 netlify wrangler supabase
      pnpm i
      bash scripts/check-prereqs.sh
    command: |
      bash scripts/select-architecture.sh

ports:
  - port: 5173 # Vite (keep existing)
  - port: 8888 # Netlify dev (add)
  - port: 8787 # Cloudflare worker dev (add)
```

**Recommendation:** ✅ **Merge** - Add new ports and selector script

---

### 2. Environment Variables

**Current:** `.env` has:

- ✅ Supabase credentials
- ✅ Cloudflare tokens
- ✅ Netlify tokens (in netlify.toml)
- ❌ No Durable configuration

**Proposed Addition:**

```bash
# Durable (informational, no public API)
DURABLE_PUBLIC_URL=https://<your-durable-subdomain>.durable.co
ALLOWED_ORIGIN=https://<your-durable-subdomain>.durable.co

# Option C (GTM)
GTM_CONTAINER_ID=GTM-XXXXXXX
```

**Recommendation:** ✅ **Add** - Extend `.env.example` with Durable config

---

### 3. Netlify Functions

**Current:** 18 functions in `netlify/functions/`

**Proposed Addition:**

- `deploys.ts` - List recent deploys
- `trigger.ts` - Trigger deploy
- `env-set.ts` - Manage env vars
- `lead-intake.ts` - Forms backend

**Conflict Analysis:**

- ❌ `deploys.ts` - **CONFLICT** - Similar to existing health-check.js
- ❌ `trigger.ts` - **CONFLICT** - Overlaps with autopilot-deploy-worker.ts
- ✅ `env-set.ts` - **NEW** - Useful addition
- ✅ `lead-intake.ts` - **NEW** - Useful addition

**Recommendation:** ⚠️ **Selective Integration**

- Skip `deploys.ts` and `trigger.ts` (use existing Cloudflare Worker)
- Add `env-set.ts` and `lead-intake.ts` as new functions

---

### 4. Cloudflare Worker

**Current:** `workers/autopilot-deploy-worker.ts`

- Handles: deploy triggers, status checks, rollbacks, cache purging
- Cron: Every 10 minutes

**Proposed:** `worker/src/index.ts`

- Similar functionality
- Scheduled checks
- Supabase integration

**Conflict Analysis:**

- ❌ **DUPLICATE** - Both workers do the same thing

**Recommendation:** ❌ **Skip** - Keep existing worker, enhance if needed

---

### 5. Bridge Script

**Current:** ❌ None

**Proposed:** `bridge/public/efh-bridge.js`

- Injects content into Durable slots
- Fetches config from API
- Manages hero, programs, etc.

**Recommendation:** ✅ **ADD** - This is the key missing piece

---

### 6. Scripts

**Current:** Multiple bootstrap scripts exist

**Proposed:**

- `select-architecture.sh` - Interactive selector
- `check-prereqs.sh` - Prerequisite checker
- `bootstrap-option-a.sh` - Option A setup
- `bootstrap-option-b.sh` - Option B setup
- `bootstrap-option-c.sh` - Option C setup

**Recommendation:** ✅ **ADD** - Provides user-friendly setup flow

---

## Conflicts and Resolutions

### Conflict 1: Duplicate Cloudflare Worker

**Issue:** Both architectures have a Cloudflare Worker for autopilot

**Resolution:**

- ✅ Keep existing `workers/autopilot-deploy-worker.ts`
- ❌ Skip proposed `worker/src/index.ts`
- ✅ Enhance existing worker with any missing features

---

### Conflict 2: Duplicate Netlify Functions

**Issue:** Proposed `deploys.ts` and `trigger.ts` overlap with existing functionality

**Resolution:**

- ❌ Skip `deploys.ts` (use existing health-check.js)
- ❌ Skip `trigger.ts` (use existing Cloudflare Worker)
- ✅ Add `env-set.ts` (new functionality)
- ✅ Add `lead-intake.ts` (new functionality)

---

### Conflict 3: Gitpod Configuration

**Issue:** Existing `.gitpod.yml` is simpler than proposed

**Resolution:**

- ✅ Merge configurations
- ✅ Add new ports (8888, 8787)
- ✅ Add selector script task
- ✅ Keep existing dev server task

---

### Conflict 4: Directory Structure

**Issue:** Proposed structure uses `worker/` but existing uses `workers/`

**Resolution:**

- ✅ Keep existing `workers/` directory
- ❌ Don't create new `worker/` directory
- ✅ Add `bridge/` directory (new)
- ✅ Add `scripts/` for new setup scripts

---

## Recommended Implementation Plan

### Phase 1: Foundation (30 minutes)

**Goal:** Add missing Durable integration pieces

1. **Create Bridge Directory**

   ```bash
   mkdir -p bridge/public bridge/api
   ```

2. **Add Bridge Script**
   - Create `bridge/public/efh-bridge.js`
   - Create `bridge/api/efh-config.sample.json`

3. **Update Environment**
   - Add Durable config to `.env.example`
   - Document Durable URL requirements

4. **Add Prerequisite Checker**
   - Create `scripts/check-prereqs.sh`
   - Verify: pnpm, netlify, wrangler, jq, curl

---

### Phase 2: Architecture Selector (1 hour)

**Goal:** Interactive setup flow

1. **Create Selector Script**
   - `scripts/select-architecture.sh`
   - Menu: Option A / B / C

2. **Create Bootstrap Scripts**
   - `scripts/bootstrap-option-a.sh` - Snippet method
   - `scripts/bootstrap-option-b.sh` - Netlify shell
   - `scripts/bootstrap-option-c.sh` - GTM injector

3. **Update Gitpod Config**
   - Add selector task to `.gitpod.yml`
   - Add new ports (8888, 8787)

---

### Phase 3: Netlify Functions (30 minutes)

**Goal:** Add new utility functions

1. **Add New Functions**
   - `netlify/functions/env-set.ts` - Manage env vars
   - `netlify/functions/lead-intake.ts` - Forms backend

2. **Update netlify.toml**
   - Add redirects for new functions
   - Configure CORS headers

---

### Phase 4: Testing & Documentation (1 hour)

**Goal:** Verify integration and document

1. **Test Each Option**
   - Test Option A: Bridge script injection
   - Test Option B: Netlify shell with iframe
   - Test Option C: GTM integration (if applicable)

2. **Create Documentation**
   - Update README with new setup flow
   - Document each option's pros/cons
   - Add troubleshooting guide

3. **Verify Compatibility**
   - Test with existing autopilot system
   - Verify no conflicts with current workers
   - Check Netlify function routing

---

## File Structure After Integration

```
fix2/
├─ .gitpod.yml                    # UPDATED: Add selector + ports
├─ .gitpod.Dockerfile             # KEEP: Already has necessary tools
├─ .env.example                   # UPDATED: Add Durable config
├─ netlify.toml                   # UPDATED: Add new function routes
├─ wrangler.toml                  # KEEP: Existing worker config
├─ scripts/
│  ├─ select-architecture.sh      # NEW: Interactive selector
│  ├─ check-prereqs.sh            # NEW: Prerequisite checker
│  ├─ bootstrap-option-a.sh       # NEW: Snippet setup
│  ├─ bootstrap-option-b.sh       # NEW: Shell setup
│  ├─ bootstrap-option-c.sh       # NEW: GTM setup
│  ├─ [existing scripts...]       # KEEP: All existing scripts
├─ bridge/                        # NEW: Durable integration
│  ├─ public/
│  │  └─ efh-bridge.js            # NEW: Bridge script
│  └─ api/
│     └─ efh-config.sample.json   # NEW: Config template
├─ netlify/functions/
│  ├─ env-set.ts                  # NEW: Env var management
│  ├─ lead-intake.ts              # NEW: Forms backend
│  ├─ [existing functions...]     # KEEP: All 18 existing
├─ workers/
│  └─ autopilot-deploy-worker.ts  # KEEP: Existing worker
├─ supabase/
│  └─ [existing schema...]        # KEEP: Existing autopilot DB
└─ [all other existing files...]  # KEEP: Everything else
```

---

## Implementation Steps

### Step 1: Add Bridge Infrastructure

```bash
# Create directories
mkdir -p bridge/public bridge/api

# Create bridge script
cat > bridge/public/efh-bridge.js << 'EOF'
(async () => {
  const s = document.currentScript;
  const ORG = s?.getAttribute('data-efh-org') || 'efh';
  const ENV = s?.getAttribute('data-env') || 'prod';
  const base = location.origin;
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

# Create config template
cat > bridge/api/efh-config.sample.json << 'EOF'
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
    { "name": "Healthcare (CNA/QMA)", "url": "/programs/healthcare", "summary": "Get certified fast." }
  ]
}
EOF
```

---

### Step 2: Create Setup Scripts

```bash
# Prerequisite checker
cat > scripts/check-prereqs.sh << 'EOF'
#!/usr/bin/env bash
set -e
echo "Checking prerequisites…"
need() { command -v "$1" >/dev/null 2>&1 || { echo "Missing $1"; exit 1; }; }
need pnpm; need netlify; need wrangler; need jq; need curl
echo "All good ✅"
EOF
chmod +x scripts/check-prereqs.sh

# Architecture selector
cat > scripts/select-architecture.sh << 'EOF'
#!/usr/bin/env bash
set -e

cat <<'EOT'
Choose Autopilot architecture:
  [1] Option A – One-time snippet in Durable → Fully automated thereafter
  [2] Option B – Netlify as shell, embed Durable (zero Durable changes after domain)
  [3] Option C – GTM injector (one-time GTM ID), then fully automated
EOT

read -p "Select [1/2/3]: " CHOICE
case "$CHOICE" in
  1) bash scripts/bootstrap-option-a.sh ;;
  2) bash scripts/bootstrap-option-b.sh ;;
  3) bash scripts/bootstrap-option-c.sh ;;
  *) echo "Invalid choice"; exit 1 ;;
esac
EOF
chmod +x scripts/select-architecture.sh
```

---

### Step 3: Update Environment

```bash
# Add to .env.example
cat >> .env.example << 'EOF'

# ============================================
# DURABLE INTEGRATION
# ============================================
DURABLE_PUBLIC_URL=https://your-site.durable.co
ALLOWED_ORIGIN=https://your-site.durable.co

# Option C (GTM)
GTM_CONTAINER_ID=GTM-XXXXXXX
EOF
```

---

### Step 4: Update Gitpod Config

```yaml
# Update .gitpod.yml
tasks:
  - name: Setup
    init: |
      cp -n .env.example .env || true
      npm i -g pnpm@9 netlify wrangler supabase || true
      pnpm install
      bash scripts/check-prereqs.sh
    command: |
      echo "Run: bash scripts/select-architecture.sh to choose Durable integration"
      pnpm dev

ports:
  - port: 5173
    onOpen: open-preview
    visibility: public
  - port: 8888 # Netlify dev
    onOpen: ignore
    visibility: public
  - port: 8787 # Cloudflare worker dev
    onOpen: ignore
    visibility: public
  - port: 3000
    visibility: public
  - port: 8080
    visibility: public
  - port: 54321
    onOpen: ignore
    visibility: public
```

---

## Testing Plan

### Test 1: Prerequisite Checker

```bash
bash scripts/check-prereqs.sh
# Expected: All tools verified ✅
```

---

### Test 2: Architecture Selector

```bash
bash scripts/select-architecture.sh
# Expected: Interactive menu appears
# Test each option (1, 2, 3)
```

---

### Test 3: Bridge Script

```bash
# Deploy bridge to Netlify
netlify deploy --dir=bridge/public --prod

# Test in browser
# Add to Durable custom code:
# <script src="https://YOUR-DOMAIN/efh-bridge.js" data-efh-org="elevate-for-humanity" data-env="prod" defer></script>
```

---

### Test 4: Netlify Functions

```bash
# Test env-set function
curl -X POST https://YOUR-SITE.netlify.app/.netlify/functions/env-set \
  -H "Content-Type: application/json" \
  -d '{"key":"TEST_VAR","value":"test123"}'

# Test lead-intake function
curl -X POST https://YOUR-SITE.netlify.app/.netlify/functions/lead-intake \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com"}'
```

---

## Security Considerations

### 1. Bridge Script Security

- ✅ Serve over HTTPS only
- ✅ Validate config JSON schema
- ✅ Sanitize HTML before injection
- ✅ Set appropriate CORS headers

### 2. Netlify Functions Security

- ✅ Validate `ALLOWED_ORIGIN` for CORS
- ✅ Require authentication for sensitive operations
- ✅ Rate limit API endpoints
- ✅ Validate all input data

### 3. Environment Variables

- ✅ Never commit `.env` to git
- ✅ Use Gitpod secrets for sensitive values
- ✅ Rotate tokens regularly
- ✅ Use least-privilege access

---

## Rollout Strategy

### Phase 1: Development (Week 1)

- [ ] Add bridge infrastructure
- [ ] Create setup scripts
- [ ] Update Gitpod config
- [ ] Test locally

### Phase 2: Staging (Week 2)

- [ ] Deploy to staging environment
- [ ] Test all three options
- [ ] Verify no conflicts with existing autopilot
- [ ] Document any issues

### Phase 3: Production (Week 3)

- [ ] Choose best option for production
- [ ] Deploy bridge script
- [ ] Configure Durable integration
- [ ] Monitor for issues

### Phase 4: Optimization (Week 4)

- [ ] Gather feedback
- [ ] Optimize performance
- [ ] Add monitoring/alerts
- [ ] Update documentation

---

## Success Criteria

### Must Have

- ✅ Bridge script successfully injects content into Durable
- ✅ No conflicts with existing autopilot system
- ✅ All three options work as expected
- ✅ Documentation is complete and clear
- ✅ Security best practices followed

### Nice to Have

- ✅ Automated testing for bridge script
- ✅ Monitoring dashboard for Durable integration
- ✅ A/B testing capability
- ✅ Analytics integration

---

## Recommendations

### Immediate Actions

1. **Start with Option A** (Snippet method)
   - Simplest to implement
   - Minimal Durable changes
   - Leverages existing infrastructure

2. **Add Bridge Infrastructure**
   - Create `bridge/` directory
   - Deploy bridge script to Netlify
   - Test with sample config

3. **Update Gitpod Config**
   - Add selector script
   - Add new ports
   - Test in Gitpod workspace

### Future Enhancements

1. **Option B** (Netlify Shell)
   - If Option A has iframe restrictions
   - Better SEO control
   - More flexibility

2. **Option C** (GTM)
   - If you need advanced tracking
   - Multiple script injection
   - A/B testing capability

3. **Monitoring & Analytics**
   - Track bridge script performance
   - Monitor Durable integration health
   - Alert on failures

---

## Questions to Answer

Before proceeding, clarify:

1. **Do you have a Durable.co website?**
   - Yes → What's the URL?
   - No → Need to create one first

2. **Which option do you prefer?**
   - Option A: Snippet (simplest)
   - Option B: Shell (most control)
   - Option C: GTM (most flexible)

3. **What content needs to be dynamic?**
   - Hero section?
   - Programs list?
   - Pricing?
   - All of the above?

4. **Who will manage Durable content?**
   - Technical team → Any option works
   - Non-technical team → Option A or B recommended

---

## Conclusion

The proposed Gitpod autopilot architecture is **well-designed and compatible** with your existing infrastructure. The key additions are:

1. **Bridge Script** - Missing piece for Durable integration
2. **Architecture Selector** - User-friendly setup flow
3. **New Netlify Functions** - Utility functions for env management and forms

**Recommended Path:**

1. Add bridge infrastructure (30 min)
2. Create setup scripts (1 hour)
3. Test Option A (snippet method) (30 min)
4. Deploy to production (30 min)

**Total Time:** ~2.5 hours for full integration

**Risk Level:** ✅ **LOW** - No conflicts with existing systems

**Benefit:** ✅ **HIGH** - Enables zero-maintenance Durable integration

---

**Status:** ✅ READY TO IMPLEMENT  
**Recommendation:** Start with Option A (snippet method)  
**Next Step:** Create bridge infrastructure and test

---

**Need Help?** Provide your Durable URL and preferred option for specific implementation guidance.
