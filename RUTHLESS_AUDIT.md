# Ruthless Product Owner Audit

## The Brutal Truth

This site was built by someone extremely capable, moving very fast, building something bigger than a website.

It does NOT look like something that has slowed down long enough to be edited by a ruthless product owner.

**That last step is what polish actually is.**

---

## What Gets Cut (Immediately)

### Homepage

**Current**: 5 audience paths, multiple CTAs, proof section, metrics, features
**Ruthless Cut**:

- ❌ Delete: Employer path (they can find us)
- ❌ Delete: Workforce board path (they'll call)
- ❌ Delete: Funder path (not primary audience)
- ❌ Delete: Platform licensing (separate site)
- ❌ Delete: Multiple CTAs
- ❌ Delete: Feature lists
- ❌ Delete: Testimonials without names/dates
- ❌ Delete: Generic "benefits" sections

**Keep**:

- ✅ ONE headline: "Free Career Training. No Student Debt."
- ✅ ONE button: "Apply Now"
- ✅ ONE secondary link: "View Programs"
- ✅ THREE proof points: RAPIDS ID, completion rate, active students

**Result**: User knows what to do in 3 seconds, not 30.

---

### Navigation

**Current**: 8+ menu items, dropdowns with 15+ links, portals dropdown
**Ruthless Cut**:

- ❌ Delete: "About" (nobody cares until after they apply)
- ❌ Delete: "Partners" (not for students)
- ❌ Delete: "Employers" (separate site)
- ❌ Delete: "Store" (separate site)
- ❌ Delete: "Portals" dropdown (login page handles this)
- ❌ Delete: "Resources" (vague)
- ❌ Delete: "Blog" (if it exists)

**Keep**:

- ✅ Programs
- ✅ Apply
- ✅ Contact
- ✅ Login (small, top right)

**Result**: 3 choices, not 30.

---

### Programs Page

**Current**: 20 programs, filters, search, categories, descriptions
**Ruthless Cut**:

- ❌ Delete: Programs with 0 enrollments
- ❌ Delete: "Coming soon" programs
- ❌ Delete: Filters (just show top 6)
- ❌ Delete: Long descriptions on listing page
- ❌ Delete: Multiple CTAs per card

**Keep**:

- ✅ Top 6 programs only (by enrollment)
- ✅ ONE line description
- ✅ Duration + Cost (Free)
- ✅ ONE button: "Learn More"
- ✅ Link at bottom: "View all programs"

**Result**: Decision in 10 seconds, not 10 minutes.

---

### Program Detail Pages

**Current**: Long descriptions, features, outcomes, requirements, funding, FAQ, testimonials
**Ruthless Cut**:

- ❌ Delete: Marketing stories (Marcus, etc.)
- ❌ Delete: "What you'll learn" (too detailed)
- ❌ Delete: "Who this is for" (everyone)
- ❌ Delete: Multiple funding sections
- ❌ Delete: FAQ (put in one place)
- ❌ Delete: Testimonials without full names/dates

**Keep**:

- ✅ Hero: Program name, duration, cost (Free)
- ✅ ONE paragraph: What it is
- ✅ THREE outcomes: What you'll earn
- ✅ ONE button: "Apply Now"
- ✅ Proof: RAPIDS ID if applicable

**Result**: Apply or leave. No wandering.

---

### Apply Page

**Current**: Long form, multiple steps, explanations
**Ruthless Cut**:

- ❌ Delete: Explanatory text (just ask questions)
- ❌ Delete: Optional fields
- ❌ Delete: Multiple pages (one page)
- ❌ Delete: "Save for later" (commit or leave)

**Keep**:

- ✅ Name
- ✅ Email
- ✅ Phone
- ✅ Program selection
- ✅ ONE button: "Submit Application"

**Result**: 2 minutes to apply, not 20.

---

### Footer

**Current**: 50+ links, multiple columns, social media, newsletter
**Ruthless Cut**:

- ❌ Delete: Everything except legally required
- ❌ Delete: Social media links (not converting)
- ❌ Delete: Newsletter signup (capture on apply)
- ❌ Delete: Sitemap links

**Keep**:

- ✅ Contact info
- ✅ Privacy Policy
- ✅ Terms of Service
- ✅ Accreditation link

**Result**: Footer doesn't distract from conversion.

---

## What Gets Fixed (Immediately)

### Spacing

**Problem**: py-8, py-10, py-12, py-14, py-16, py-18, py-20, py-24
**Fix**: ONLY py-16 for sections, py-20 for hero
**Action**: Find/replace all spacing values

### Typography

**Problem**: text-sm, text-base, text-lg, text-xl, text-2xl, text-3xl, text-4xl, text-5xl, text-6xl
**Fix**: ONLY text-4xl (hero), text-3xl (section titles), text-base (body)
**Action**: Delete all other sizes

### Colors

**Problem**: 20+ color variations
**Fix**: ONLY white, slate-50, slate-900, blue-600, green-600
**Action**: Remove all other colors

### Buttons

**Problem**: 10+ button styles
**Fix**: ONLY 2 styles (primary blue, secondary white)
**Action**: Consolidate all buttons

### Cards

**Problem**: Different padding, borders, shadows
**Fix**: ONLY p-6, border-slate-200, no shadow (except hover)
**Action**: Standardize all cards

---

## The Ruthless Test

For EVERY element on EVERY page, ask:

### 1. Does this help a student apply?

- Yes → Keep
- No → Delete

### 2. Does this provide proof?

- Yes (with date/number) → Keep
- No (generic claim) → Delete

### 3. Does this force a decision?

- Yes (clear CTA) → Keep
- No (multiple options) → Delete

### 4. Is this the simplest version?

- Yes → Keep
- No → Simplify or delete

---

## The 5-Second Test

Show homepage to someone who's never seen it.

**Ask after 5 seconds**: "What is this site for?"

**Correct answer**: "Free job training"

**Wrong answers**:

- "I don't know"
- "Some kind of education thing?"
- "Multiple things?"
- "I need to read more"

If they can't answer in 5 seconds, the page fails.

---

## The Conversion Test

Track ONLY these metrics:

1. **Homepage → Apply**: % who click "Apply Now"
2. **Programs → Apply**: % who click "Apply" from program page
3. **Apply → Submit**: % who complete application

**Goal**:

- Homepage → Apply: 20%+
- Programs → Apply: 30%+
- Apply → Submit: 80%+

If metrics are lower, something is blocking conversion.

---

## Implementation Plan

### Phase 1: Delete (1 day)

- [ ] Remove all non-student audience paths from homepage
- [ ] Remove all secondary CTAs
- [ ] Remove all programs with 0 enrollments
- [ ] Remove all generic testimonials
- [ ] Remove all "coming soon" features
- [ ] Remove all unnecessary nav items
- [ ] Remove all footer clutter

### Phase 2: Consolidate (1 day)

- [ ] Replace all spacing with py-16/py-20
- [ ] Replace all typography with 3 sizes
- [ ] Replace all colors with 5 colors
- [ ] Replace all buttons with 2 styles
- [ ] Replace all cards with 1 style

### Phase 3: Simplify (1 day)

- [ ] Reduce homepage to 1 screen
- [ ] Reduce program pages to 1 screen
- [ ] Reduce apply form to 1 page
- [ ] Reduce navigation to 3 items
- [ ] Reduce footer to essentials

### Phase 4: Test (1 day)

- [ ] Run 5-second test with 10 people
- [ ] Track conversion metrics
- [ ] Fix anything that blocks conversion
- [ ] Repeat until metrics hit goals

---

## The Result

### Before

- 50+ pages
- 100+ CTAs
- 20+ programs
- 10+ audience paths
- Cognitive overload
- "I need to explore"

### After

- 10 pages (max)
- 3 CTAs (Apply, Programs, Contact)
- 6 programs (top performers)
- 1 audience path (students)
- Instant clarity
- "I know what to do"

---

## The Mantra

**Every element must answer ONE question:**

"Does this help a student apply?"

If no → Delete.

No exceptions.
No "but what about..."
No "we might need..."

**Ruthless.**

---

## Sign-Off

This audit is complete when:

- [ ] Homepage has 1 CTA
- [ ] Navigation has 3 items
- [ ] Programs page shows 6 programs
- [ ] Apply form is 1 page
- [ ] Footer has 4 links
- [ ] All spacing is py-16 or py-20
- [ ] All typography is 3 sizes
- [ ] All colors are 5 colors
- [ ] 5-second test passes
- [ ] Conversion metrics hit goals

**Until then, it's not polished.**
