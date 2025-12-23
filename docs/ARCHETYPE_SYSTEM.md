# Archetype System

## Overview

The archetype system consolidates 877 pages into 10 reusable patterns, enforcing quality standards at build time.

## Architecture

### Core Components

1. **Archetype Registry** (`lib/archetypes.ts`)
   - Defines 10 archetype patterns
   - Specifies required sections per archetype
   - Lists route matchers for automatic classification

2. **Build-Time Mapper** (`scripts/archetype-mapper.mjs`)
   - Scans all page files
   - Maps routes to archetypes
   - Validates quality contracts
   - Fails build on violations

3. **Route Configuration** (`scripts/archetypes.routes.json`)
   - JSON mirror of archetype patterns
   - Used by mapper for route matching
   - Maintains sync with TypeScript registry

## 10 Archetypes

### 1. Program / Training Detail

**Routes:** `/programs/*`, `/courses/*`, `/lms/*`, `/apprenticeships/*`
**Purpose:** Course and program detail pages
**Required:** Hero, purpose, primary CTA, core sections, metadata

### 2. Application / Enrollment Flow

**Routes:** `/apply/*`, `/enroll/*`, `/onboarding/*`, `/checkout/*`
**Purpose:** User registration and enrollment
**Required:** Hero, purpose, primary CTA, form sections, metadata

### 3. Dashboard / Portal

**Routes:** `/dashboard/*`, `/student/*`, `/instructor/*`, `/admin/*` (non-ops)
**Purpose:** Role-specific authenticated dashboards
**Required:** Server auth, role gate, hero, status sections, actions
**Auth:** Mandatory server-side authentication

### 4. Directory / Listing / Search

**Routes:** `/directory/*`, `/search/*`, `/opportunities/*`
**Purpose:** Searchable lists and catalogs
**Required:** Hero, filters, results display, metadata

### 5. Policy / Compliance / Legal

**Routes:** `/privacy`, `/terms`, `/accessibility`, `/ferpa`, `/cookies`
**Purpose:** Legal and compliance documentation
**Required:** Purpose, effective date, contact info, metadata

### 6. Partner / Employer / Agency

**Routes:** `/partners/*`, `/employers/*`, `/shop/*`, `/platform/*`
**Purpose:** B2B partnership pages
**Required:** Hero, partnership info, contact CTA, metadata

### 7. Auth / Account / Profile

**Routes:** `/login`, `/signup`, `/register`, `/account/*`, `/profile/*`
**Purpose:** Authentication and account management
**Required:** Purpose, form sections, metadata

### 8. Reporting / Admin / Ops

**Routes:** `/admin/*` (operational pages), `/reports/*`
**Purpose:** Administrative operations and reporting
**Required:** Server auth, role gate, core sections, metadata
**Auth:** Mandatory server-side authentication

### 9. Marketing / Informational

**Routes:** `/`, `/about`, `/contact`, `/blog/*`, `/faq`
**Purpose:** Public-facing marketing content
**Required:** Hero, purpose, primary CTA, core sections, metadata

### 10. System / Utility / Error

**Routes:** `/404`, `/500`, `/sitemap.xml`, `/robots.txt`
**Purpose:** System pages and error states
**Required:** Purpose, core sections, metadata

## Quality Gates

### Enforced at Build Time

1. **Route Mapping**
   - Every page must map to exactly one archetype
   - Unmapped pages fail the build

2. **Forbidden Phrases**
   - "coming soon"
   - "placeholder"
   - "tbd"
   - "lorem ipsum"
   - "sample"
   - "example"
   - "learn more" (vague CTA)
   - "under development"
   - "work in progress"

3. **Metadata Requirements**
   - Every page must export `metadata` or `generateMetadata`
   - Titles must be unique and descriptive

4. **Hero Sections**
   - Pages must contain hero implementation
   - Detected via `<Hero>`, `<h1>`, or hero class markers

5. **Server Authentication**
   - Protected archetypes must include auth guards
   - Detected via `createServerClient`, `getServerSession`, `cookies()`, `headers()`, `redirect()`

## CI Integration

### GitHub Actions Workflow

```yaml
- name: Archetype + Quality Gates
  run: npm run archetype:check
  continue-on-error: false
```

### NPM Scripts

```json
{
  "archetype:check": "node scripts/archetype-mapper.mjs",
  "ci:check": "npm run archetype:check && npm run typecheck && npm run lint"
}
```

## Usage

### Running Validation

```bash
# Run archetype check
npm run archetype:check

# Run full CI pipeline
npm run ci:check
```

### Adding New Pages

1. Create page file in appropriate route
2. Ensure route matches an archetype pattern
3. Add required metadata export
4. Include hero section (h1 or Hero component)
5. Add server auth if protected route
6. Run `npm run archetype:check` to verify

### Modifying Archetypes

1. Update `lib/archetypes.ts` with new patterns
2. Sync changes to `scripts/archetypes.routes.json`
3. Run mapper to verify coverage
4. Update documentation

## Automated Fixes

### Scripts Available

- `scripts/fix-forbidden-phrases.mjs` - Remove forbidden phrases
- `scripts/add-metadata-exports.mjs` - Add missing metadata
- `scripts/add-auth-guards.mjs` - Add server auth to protected routes
- `scripts/deduplicate-metadata.mjs` - Fix duplicate titles

### Running Fixes

```bash
# Fix forbidden phrases
node scripts/fix-forbidden-phrases.mjs

# Add metadata
node scripts/add-metadata-exports.mjs

# Add auth guards
node scripts/add-auth-guards.mjs
```

## Current Status

- **877 pages total**
- **877 pages mapped (100% coverage)**
- **0 unmapped routes**
- **0 forbidden phrases**
- **0 missing metadata exports**
- **0 missing auth guards**
- **Warnings:** 42 missing heroes, 50 duplicate titles (non-blocking)

## Next Steps

### Content Requirements

Each archetype requires production-ready content:

1. **Hero Sections**
   - Clear, specific titles (no generic "Dashboard" or "Portal")
   - Purpose statements explaining page function
   - Actionable CTAs with specific outcomes

2. **Section Content**
   - Real headings and explanatory copy
   - Honest empty-state messages
   - Compliance-appropriate language

3. **Metadata**
   - Unique, descriptive titles
   - Accurate descriptions
   - Proper SEO optimization

### Implementation Approach

1. Create archetype component per pattern
2. Define content configuration per role/context
3. Pages import archetype with configuration
4. Content lives in centralized config files
5. Quality gates enforce completeness

### Acceptance Criteria

- No blank pages
- No placeholder content
- No vague CTAs
- All content truthful and specific
- Consistent voice and tone
- Proper grammar and spelling
