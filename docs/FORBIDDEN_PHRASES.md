# Forbidden-Phrase Deny List

## Purpose

Automatically fail builds if low-quality, vague, or future-promise language appears anywhere in the app (UI copy, metadata, empty states, dashboards).

This list is intentionally strict. It enforces operational, audit-safe language for a workforce/government-adjacent platform, not marketing fluff.

## Enforcement

This list is enforced by CI at build time via `scripts/archetype-mapper.mjs`.

**Checked against:**

- Page content
- Component text
- Metadata (title + description)
- Empty-state copy
- Dashboard labels

**If detected:** Build fails immediately.

## A. Absolute Bans (Hard Fail)

These phrases should never appear in a production system.

```
coming soon
under development
work in progress
tbd
to be determined
placeholder
lorem ipsum
sample content
example content
beta feature
future release
planned feature
not yet available
stay tuned
```

**If any of these appear → fail the build immediately.**

## B. Vague Marketing Language (Fail Unless Contextualized)

These phrases are banned unless paired with specific, operational detail. In practice, it's safer to block them entirely.

```
learn more
get started
empowering communities
supporting your journey
making an impact
transforming lives
holistic approach
innovative solutions
cutting-edge
best-in-class
world-class
seamless experience
next-generation
```

**Why this matters:**
These phrases mean nothing to auditors, partners, or funders unless followed by exact actions, rules, or outcomes. They are the #1 sign of rushed filler.

## C. Dishonest Future-Tense Language (Hard Fail)

Your directive explicitly disallows promises about later work.

```
will be added
will allow users to
will enable
will support
will include
is planned to
is expected to
```

**Replace with:**

- What exists now
- What unlocks access now
- Why something is gated now

## D. Fake Completeness Signals (Context Required)

These make pages look done while saying nothing.

```
overview
details
information
resources
features
benefits
solutions
tools
```

**These are allowed only if followed by concrete explanation.**
Otherwise, they are a red flag for rushed structure.

## E. Dashboard-Specific Red Flags (Immediate Reject)

Any dashboard containing these should be rejected outright.

```
no data yet
nothing to see here
check back later
data coming soon
dashboard preview
demo data
example stats
```

**Dashboards must explain:**

- Why data is empty
- What action creates data
- Who is responsible

## Enforcement Rule

**One sentence:**

> "Any phrase that could appear on a generic nonprofit website is forbidden here unless it explains a real action, rule, or outcome."

This aligns perfectly with government, workforce, and compliance expectations.

## What This Gives You

- ✅ Stops rushing by force
- ✅ Removes subjectivity from content review
- ✅ Protects from "looks done but isn't" delivery
- ✅ Makes future scaling safer, not harder

## Usage

### Running Check

```bash
npm run archetype:check
```

### Adding New Forbidden Phrases

1. Update `lib/archetypes.ts` → `FORBIDDEN_PHRASES` array
2. Update this documentation
3. Run check to verify enforcement
4. Commit changes

### Fixing Violations

When forbidden phrases are detected:

1. Identify the specific phrase and location
2. Replace with operational language:
   - State what exists now
   - Explain what action is required
   - Describe the outcome
3. Re-run check to verify fix

### Examples

❌ **WRONG:**

```
"Coming soon: Advanced reporting features"
"Learn more about our programs"
"We're empowering communities through education"
```

✅ **RIGHT:**

```
"Generate compliance reports by selecting date range and clicking Export"
"View program eligibility requirements, curriculum, and enrollment steps"
"Students complete 120 hours of training and receive state certification"
```

## Integration

This deny list is integrated into:

- **Build-time validation** (`scripts/archetype-mapper.mjs`)
- **CI/CD pipeline** (`.github/workflows/ci-cd.yml`)
- **Spot-check script** (`scripts/spot-check.mjs`)
- **Archetype system** (`lib/archetypes.ts`)

No deployment is possible with forbidden phrases present.
