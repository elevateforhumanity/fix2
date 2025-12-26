# HEADER AUDIT - ENTERPRISE GRADE

## Current State Analysis

### What's in the Header Now

**Top Level (6 items):**

1. Programs (dropdown with 12 programs)
2. Funding (dropdown with 6 items)
3. For You (dropdown with 13 items - mixed audiences)
4. Apply (direct link)
5. Login (direct link)
6. More (dropdown with 9 items)

**Total exposed links:** 40+ links in header

### The Core Problem

**You built the site like an open-source platform:**

- Transparent
- Thorough
- Everything visible

**But polished public-facing platforms are curated products:**

- Guided
- Restrictive early
- Expansive later

### Specific Issues

#### 1. "For You" Dropdown (13 items, 3 audiences mixed)

**Current structure:**

- For Students (header)
- Apply Now
- Career Services
- Mentorship
- Student Handbook
- For Employers (header)
- Hire Graduates
- Partner With Us
- Workforce Partners
- For Agencies & Schools (header)
- Request Demo
- Platform License
- Training Providers

**Problem:** Three audiences in one dropdown. Cognitive overload.

#### 2. "More" Dropdown (9 items)

**Current structure:**

- About Us
- How It Works
- Community
- Services
- Resources
- Success Stories
- Blog
- Events
- Contact Us

**Problem:** "More" is a junk drawer. No clear purpose.

#### 3. "Funding" Dropdown (6 items)

**Current structure:**

- All Funding Options
- WIOA Funding
- Workforce Ready Grant (WRG)
- JRI Funding
- Financial Aid
- FAQ

**Problem:** Exposes complexity before trust is earned. WIOA/WRG/JRI are acronyms that intimidate.

#### 4. "Programs" Dropdown (12 items)

**Current structure:**

- All Programs
- 11 specific programs

**Problem:** Too many choices. Paradox of choice kills conversions.

---

## Enterprise-Grade Header Blueprint

### Phase 1: Pre-Intent Navigation (Not Logged In)

**Rule:** Maximum 5 top-level items. ONE CTA.

**Structure:**

```
Logo | Programs | How It Works | About | Apply Now
```

**Rationale:**

- Programs = What you offer
- How It Works = How to get it
- About = Who you are
- Apply Now = ONE clear action

**What Moves:**

- Funding → Moves to "How It Works" page
- For You → Becomes three separate landing pages (linked from homepage)
- More → Dissolves (items move to footer or contextual pages)
- Login → Moves to top-right corner (small, unobtrusive)

### Phase 2: Post-Intent Navigation (Logged In)

**Rule:** Role-specific dashboard replaces "Apply Now"

**Structure:**

```
Logo | Programs | My Dashboard | Resources | Logout
```

**Rationale:**

- Programs = Still accessible
- My Dashboard = Role-specific (student/employer/admin)
- Resources = Contextual help
- Logout = Clear exit

---

## Detailed Breakdown

### 1. Programs Dropdown (SIMPLIFIED)

**Before:** 12 items
**After:** 6 categories + "View All"

```
Programs ▼
├─ Healthcare (CNA, Medical Assistant, Home Health)
├─ Skilled Trades (HVAC, Barber, Building Maintenance)
├─ Transportation (CDL)
├─ Business & Recovery (Peer Recovery, Business Startup)
├─ Workforce Readiness
└─ View All Programs →
```

**Rationale:** Group by industry. Reduce cognitive load. "View All" for explorers.

### 2. How It Works (NEW PAGE)

**Purpose:** Answer "How do I get free training?"

**Structure:**

1. Check Eligibility (interactive checker)
2. Choose Program (link to programs)
3. Apply (2 minutes)
4. Get Funded (we handle paperwork)
5. Start Training (1-2 weeks)

**What Moves Here:**

- All funding information (WIOA, WRG, JRI)
- Eligibility criteria
- Timeline expectations
- FAQ

**Rationale:** One page answers all "how" questions. Reduces header clutter.

### 3. About (SIMPLIFIED)

**Purpose:** Build trust quickly

**Structure:**

- Mission (one sentence)
- Proof (DOL registered, ETPL approved, 1,500+ graduates)
- Team (optional, brief)
- Contact

**What Moves Here:**

- Accreditation details
- Compliance information
- Success stories

**Rationale:** Trust-building, not explaining. Short and scannable.

### 4. Apply Now (ONE CTA)

**Purpose:** Force decision

**Behavior:**

- Not logged in → /apply
- Logged in → Role-specific dashboard

**Rationale:** ONE clear action. No "or". No options.

### 5. Login (MOVED TO TOP-RIGHT)

**Purpose:** Unobtrusive access for existing users

**Behavior:**

- Small link in top-right corner
- Not a primary navigation item
- Doesn't compete with "Apply Now"

**Rationale:** Existing users know where to look. New users focus on "Apply Now".

---

## What Happens to "For You" Pages?

### Current Problem

Three audiences (Students, Employers, Agencies) mixed in one dropdown.

### Enterprise Solution

**Homepage becomes the router.**

**Homepage Structure:**

```
Hero: "Free Job Training. Real Careers. No Debt."

Three Audience Boxes:
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│  For Students   │  │  For Employers  │  │  For Agencies   │
│  Get trained    │  │  Hire workers   │  │  License our    │
│  for free       │  │  for free       │  │  platform       │
│  → Learn More   │  │  → Learn More   │  │  → Learn More   │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

**Rationale:**

- Homepage routes by audience
- Header stays clean
- Each audience gets dedicated landing page
- No mixing, no confusion

---

## What Happens to "More" Dropdown?

### Current Problem

9 items with no clear theme. Junk drawer.

### Enterprise Solution

**Dissolve it. Move items strategically.**

**Where Items Go:**

- About Us → Top-level "About"
- How It Works → Top-level "How It Works"
- Community → Footer
- Services → Contextual (linked from relevant pages)
- Resources → Post-login only
- Success Stories → About page
- Blog → Footer
- Events → Footer
- Contact Us → Footer + About page

**Rationale:**

- No junk drawers in enterprise headers
- Every item has a strategic home
- Footer handles secondary navigation

---

## What Happens to "Funding" Dropdown?

### Current Problem

Exposes complexity (WIOA, WRG, JRI) before trust is earned.

### Enterprise Solution

**Move to "How It Works" page.**

**How It Works Page Structure:**

```
Section 1: Check Eligibility (interactive)
Section 2: Choose Program
Section 3: Apply (2 minutes)
Section 4: Get Funded ← ALL FUNDING INFO HERE
Section 5: Start Training
```

**Funding Section Content:**

- "We handle all funding paperwork"
- "Most students pay $0"
- "Funded through WIOA, WRG, or employer sponsorship"
- Expandable details for those who want them

**Rationale:**

- Funding is part of "how it works"
- Not a primary decision point
- Details available but not forced

---

## Mobile Considerations

### Current Problem

40+ links in mobile menu. Overwhelming.

### Enterprise Solution

**5 top-level items collapse cleanly.**

**Mobile Menu:**

```
☰ Menu
├─ Programs ▼
│  ├─ Healthcare
│  ├─ Skilled Trades
│  ├─ Transportation
│  ├─ Business & Recovery
│  ├─ Workforce Readiness
│  └─ View All →
├─ How It Works
├─ About
├─ Apply Now (button)
└─ Login (small link)
```

**Rationale:**

- Fits on one screen
- No scrolling required
- Clear hierarchy

---

## Implementation Plan

### Step 1: Create New Pages

1. /how-it-works (consolidates funding, eligibility, timeline)
2. /about (simplified, trust-focused)
3. Update homepage (add audience routing boxes)

### Step 2: Update Navigation Config

1. Reduce top-level items to 5
2. Simplify Programs dropdown (6 categories)
3. Remove "For You" dropdown
4. Remove "More" dropdown
5. Remove "Funding" dropdown
6. Move Login to top-right

### Step 3: Update Header Component

1. Implement new navigation structure
2. Add top-right login link
3. Test mobile collapse
4. Test role-based dashboard switching

### Step 4: Update Footer

1. Add secondary navigation (Blog, Events, Community)
2. Add contact information
3. Add social links

### Step 5: Test & Deploy

1. Test all navigation paths
2. Test mobile responsiveness
3. Test role-based navigation
4. Deploy

---

## Before/After Comparison

### Before (Current)

```
Logo | Programs(12) | Funding(6) | For You(13) | Apply | Login | More(9)
Total: 40+ links exposed
```

### After (Enterprise)

```
Logo | Programs(6+1) | How It Works | About | Apply Now
Login (top-right, small)
Total: 7 links exposed initially
```

**Reduction:** 40+ links → 7 links (82% reduction)

---

## Success Metrics

### Conversion Metrics

- Time to "Apply Now" click: <30 seconds (target)
- Apply button click rate: >15% (target)
- Mobile menu engagement: >60% (target)

### User Experience Metrics

- Navigation clarity score: 9/10 (target)
- Mobile usability score: 9/10 (target)
- Bounce rate: <40% (target)

### Technical Metrics

- Header load time: <100ms (target)
- Mobile menu animation: <200ms (target)
- No layout shift (CLS = 0)

---

## The Shift

**Before:** "Here's everything we've built."
**After:** "Where should you go next?"

That's the difference between 6/10 and 10/10.

---

## Next Actions

**Option 1:** Create clean header map (what stays, what moves, what hides)
**Option 2:** Rewrite header labels to be benefit-driven
**Option 3:** Design two-phase navigation (pre-intent vs post-intent)

**Recommendation:** Do all three in sequence.

1. Map first (strategic)
2. Labels second (tactical)
3. Two-phase third (implementation)
