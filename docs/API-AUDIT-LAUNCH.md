# /api/audit/launch - Launch Readiness Audit

## Overview

Comprehensive pre-launch readiness check that gates deployment and provides actionable feedback.

**Mode 3 Puppeteer Endpoint** - Internal agent that audits from inside the running application.

---

## Authentication

**Required Header:**
```
x-audit-secret: <AUDIT_SECRET>
```

Set `AUDIT_SECRET` environment variable in Vercel.

**Responses:**
- `401` - Missing or invalid secret
- `200` - Audit completed
- `500` - Audit crashed (this itself is a blocker)

---

## Request

### GET (Quick Mode)
```bash
curl -H "x-audit-secret: your-secret" \
  https://yourdomain.com/api/audit/launch
```

### POST (Full Mode with Options)
```bash
curl -X POST \
  -H "x-audit-secret: your-secret" \
  -H "Content-Type: application/json" \
  -d '{"mode":"full","maxRoutes":500,"sample":"all"}' \
  https://yourdomain.com/api/audit/launch
```

**Options:**
- `mode`: `"quick"` | `"full"` (default: `"quick"`)
- `maxRoutes`: number (default: `200`)
- `sample`: `"top"` | `"all"` (default: `"top"`)

---

## Response Schema

See `schemas/audit-launch.schema.json` for complete JSON Schema.

### Top-Level Structure

```typescript
{
  meta: {
    timestamp: string;           // ISO 8601
    environment: string;          // "development" | "preview" | "production"
    appVersion: string;
    executionTimeMs: number;
    build: {
      commitSha: string;
      buildId: string;
      nodeVersion: string;
      nextVersion: string;
    };
    request: {
      mode: "quick" | "full";
      maxRoutes: number;
      sample: "top" | "all";
    };
  };
  
  launchGate: {
    ready: boolean;              // TRUE = safe to launch
    score: number;               // 0-100
    grade: "A" | "B" | "C" | "D" | "F";
    blockerCount: number;
    warningCount: number;
  };
  
  summary: {
    highlights: string[];        // What's working well
    topRisks: string[];          // Top issues to address
  };
  
  blockers: Finding[];           // MUST fix before launch
  warnings: Finding[];           // Should fix post-launch
  
  checks: {
    env: CheckEnv;
    routing: CheckRouting;
    navigation: CheckNavigation;
    brokenLinks: CheckBrokenLinks;
    clientStability: CheckClientStability;
    performance: CheckPerformance;
    security: CheckSecurity;
    features: CheckFeatures;
  };
}
```

---

## LaunchGate Scoring

### Calculation
```
Start: 100 points
Each blocker: -15 points
Each warning: -5 points
Minimum: 0 points
```

### Grades
- **A** (90-100): Excellent, ready to launch
- **B** (80-89): Good, minor improvements needed
- **C** (70-79): Acceptable, some issues to address
- **D** (60-69): Needs work before launch
- **F** (<60): Not ready, significant issues

### Ready Status
`ready = true` ONLY if:
- ✅ `blockerCount === 0`
- ✅ `checks.clientStability.status !== "fail"`
- ✅ `checks.navigation.status !== "fail"`
- ✅ `checks.env.missing.length === 0`

---

## Checks Explained

### 1. Environment (`checks.env`)
Verifies required environment variables are set.

**Required:**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**Optional (noted if present):**
- `STRIPE_SECRET_KEY`
- `RESEND_API_KEY`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- `NEXT_PUBLIC_FACEBOOK_PIXEL_ID`

### 2. Routing (`checks.routing`)
Counts public/protected routes, detects 404s and redirect loops.

### 3. Navigation (`checks.navigation`)
- Header link count
- Footer link count
- Missing critical pages
- Contrast/accessibility
- Dropdown functionality (desktop hover, mobile menu, scroll lock)

### 4. Broken Links (`checks.brokenLinks`)
Scans internal links for 404s (only your domain, no external crawling).

### 5. Client Stability (`checks.clientStability`)
Detects hydration risks:
- `new Date()` / `Date.now()` / `Math.random()` in render
- `window`/`document`/`localStorage` outside `useEffect`
- Missing mounted patterns

### 6. Performance (`checks.performance`)
- Route count
- Build time estimates
- Payload size hints

### 7. Security (`checks.security`)
- Rate limiting (memory vs Redis)
- Security headers (HSTS, CSP, X-Frame-Options)
- Robots.txt / sitemap accessibility

### 8. Features (`checks.features`)
**Activation Status:**
- Payments (Stripe)
- Email (Resend)
- Calendar booking
- Analytics
- Auth

**Missing vs Best-in-Class:**
Compares to VA-grade workforce platforms:
- High priority: Intake flow, status tracking, guided flows
- Medium priority: Testimonials, live chat, accessibility
- Low priority: Multilingual, blog pipeline

---

## Finding Object

```typescript
interface Finding {
  id: string;                    // Unique identifier
  severity: "blocker" | "warning" | "info";
  title: string;                 // Short description
  detail: string;                // Full explanation
  evidence: {
    route?: string;
    component?: string;
    file?: string;
    error?: string;
    httpStatus?: number;
    notes?: string[];
  };
  fix: {
    action: string;              // What to do
    steps: string[];             // How to do it
    owner: "autopilot" | "dev" | "ops" | "content";
  };
}
```

---

## Example Response

```json
{
  "meta": {
    "timestamp": "2024-12-19T22:30:00.000Z",
    "environment": "production",
    "appVersion": "2.0.0",
    "executionTimeMs": 1234,
    "build": {
      "commitSha": "e5dc98b90",
      "buildId": "dpl_abc123",
      "nodeVersion": "v20.11.1",
      "nextVersion": "14.0.4"
    }
  },
  "launchGate": {
    "ready": true,
    "score": 85,
    "grade": "B",
    "blockerCount": 0,
    "warningCount": 3
  },
  "summary": {
    "highlights": [
      "57 pages accessible from navigation",
      "All hydration issues resolved",
      "Security headers configured"
    ],
    "topRisks": [
      "Rate limiting using in-memory store",
      "Missing high-priority features"
    ]
  },
  "blockers": [],
  "warnings": [
    {
      "id": "rate-limit-memory",
      "severity": "warning",
      "title": "Rate Limiting Using In-Memory Store",
      "detail": "Rate limits will reset on server restart",
      "evidence": {
        "notes": ["Upgrade to Redis for production"]
      },
      "fix": {
        "action": "Add Redis for rate limiting",
        "steps": [
          "Set REDIS_URL environment variable",
          "Set REDIS_TOKEN environment variable"
        ],
        "owner": "ops"
      }
    }
  ],
  "checks": {
    "env": {
      "status": "pass",
      "required": ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"],
      "missing": [],
      "notes": ["Stripe configured", "Google Analytics configured"]
    },
    "navigation": {
      "status": "pass",
      "headerLinks": 57,
      "footerLinks": 25,
      "missingCritical": [],
      "contrast": {
        "status": "pass",
        "notes": ["Footer updated to white background"]
      },
      "dropdowns": {
        "desktopHoverEnabled": true,
        "mobileMenuEnabled": true,
        "scrollLockFixed": true
      }
    }
  }
}
```

---

## Usage in Autopilot

### Decision Logic
```typescript
const audit = await fetch('/api/audit/launch', {
  headers: { 'x-audit-secret': process.env.AUDIT_SECRET }
}).then(r => r.json());

if (audit.launchGate.ready) {
  console.log('✅ READY TO LAUNCH');
  console.log(`Score: ${audit.launchGate.score}/100 (${audit.launchGate.grade})`);
} else {
  console.log('❌ NOT READY');
  console.log(`Blockers: ${audit.launchGate.blockerCount}`);
  audit.blockers.forEach(b => {
    console.log(`  - ${b.title}`);
    console.log(`    Fix: ${b.fix.action}`);
  });
}
```

### CI/CD Integration
```yaml
# .github/workflows/deploy.yml
- name: Run Launch Audit
  run: |
    RESPONSE=$(curl -s -H "x-audit-secret: ${{ secrets.AUDIT_SECRET }}" \
      https://yourdomain.com/api/audit/launch)
    
    READY=$(echo $RESPONSE | jq -r '.launchGate.ready')
    
    if [ "$READY" != "true" ]; then
      echo "❌ Launch audit failed"
      echo $RESPONSE | jq '.blockers'
      exit 1
    fi
    
    echo "✅ Launch audit passed"
```

---

## Security Notes

1. **Never expose AUDIT_SECRET** - keep it in environment variables only
2. **Rotate secret regularly** - especially after team changes
3. **Monitor audit endpoint** - log all access attempts
4. **Rate limit the endpoint** - prevent abuse even with valid secret

---

## Future Enhancements

- [ ] Add actual route crawling (currently estimated)
- [ ] Add real broken link checking
- [ ] Add static code analysis for hydration patterns
- [ ] Add performance timing measurements
- [ ] Add screenshot capture for visual regression
- [ ] Add database schema validation
- [ ] Add API endpoint health checks

---

## Related Endpoints

- `/api/health` - Quick health check (no auth required)
- `/api/status` - System status overview (no auth required)
- `/api/audit/launch` - Comprehensive launch audit (auth required)

---

**Last Updated:** 2024-12-19  
**Schema Version:** 1.0.0  
**Endpoint:** `/api/audit/launch`
