# NAVIGATION ENTERPRISE COMPLETE

## Header + Footer + Two-Phase System

---

## PART 1: HEADER MAP (What Stays, What Moves, What Hides)

### Current State (40+ links)

```
Logo | Programs(12) | Funding(6) | For You(13) | Apply | Login | More(9)
```

### Enterprise State (7 links initially)

```
Logo | Programs | How It Works | About | Apply Now
                                        Login (top-right, small)
```

### What Stays in Header

1. **Programs** (simplified dropdown)
2. **How It Works** (NEW - consolidates funding)
3. **About** (simplified)
4. **Apply Now** (ONE CTA)
5. **Login** (moved to top-right corner)

### What Moves OUT of Header

#### To "How It Works" Page:

- All Funding dropdown (WIOA, WRG, JRI, Financial Aid, FAQ)
- Eligibility information
- Timeline expectations

#### To Homepage (Audience Routing):

- For Students link
- For Employers link
- For Agencies link

#### To Footer:

- Career Services
- Mentorship
- Student Handbook
- Hire Graduates
- Partner With Us
- Workforce Partners
- Training Providers
- Community
- Services
- Resources
- Success Stories
- Blog
- Events

#### To Contextual Pages:

- Request Demo (on Agencies page)
- Platform License (on Agencies page)

### What Hides Completely:

- Nothing. Everything has a strategic home.

---

## PART 2: HEADER LABELS (Benefit-Driven)

### Before → After

| Before   | After        | Why                                          |
| -------- | ------------ | -------------------------------------------- |
| Programs | Programs     | Clear, benefit-obvious                       |
| Funding  | How It Works | "Funding" = jargon. "How It Works" = clarity |
| For You  | _(removed)_  | Moved to homepage routing                    |
| Apply    | Apply Now    | "Now" adds urgency                           |
| Login    | Login        | Stays, but moves to top-right                |
| More     | _(removed)_  | Junk drawer dissolved                        |

### New Navigation Config

```typescript
// config/navigation-enterprise.ts

export const enterpriseNav: NavSection[] = [
  {
    label: 'Programs',
    items: [
      { label: 'Healthcare', href: '/programs#healthcare' },
      { label: 'Skilled Trades', href: '/programs#trades' },
      { label: 'Transportation', href: '/programs#transportation' },
      { label: 'Business & Recovery', href: '/programs#business' },
      { label: 'Workforce Readiness', href: '/programs/workforce-readiness' },
      { label: 'View All Programs', href: '/programs' },
    ],
  },
  {
    label: 'How It Works',
    href: '/how-it-works',
  },
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Apply Now',
    href: '/apply',
  },
];
```

---

## PART 3: TWO-PHASE NAVIGATION

### Phase 1: Pre-Intent (Not Logged In)

**Header:**

```
Logo | Programs | How It Works | About | Apply Now
                                        Login (top-right)
```

**Behavior:**

- Clean, minimal
- ONE CTA (Apply Now)
- Login unobtrusive

### Phase 2: Post-Intent (Logged In)

**Header:**

```
Logo | Programs | My Dashboard | Resources | Logout
```

**Behavior:**

- "Apply Now" → "My Dashboard" (role-specific)
- "How It Works" → "Resources" (contextual help)
- "About" → hidden (trust already earned)
- "Login" → "Logout"

**Role-Specific Dashboards:**

- Student → /student/dashboard
- Admin → /admin
- Program Holder → /program-holder/dashboard
- Partner → /partner
- Employer → /employer
- Workforce Board → /workforce-board

---

## PART 4: FOOTER REDESIGN (Trust Anchor)

### Current Problem

- 20+ links
- 4 columns of mixed content
- No clear trust block
- Weak CTA

### Enterprise Solution: 4 Buckets + 1 CTA

```
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│  ELEVATE FOR HUMANITY                                         │
│  Free job training. Real careers. No debt.                   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Need Help? Talk to an Advisor                        │   │
│  │  Call (317) 314-3757                                  │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │ About       │  │ Get Help    │  │ Legal       │         │
│  ├─────────────┤  ├─────────────┤  ├─────────────┤         │
│  │ Our Mission │  │ Contact Us  │  │ Privacy     │         │
│  │ Our Story   │  │ FAQ         │  │ Terms       │         │
│  │ Careers     │  │ Support     │  │ Refund      │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  TRUST BLOCK                                          │   │
│  │  Elevate For Humanity, Inc.                           │   │
│  │  Indianapolis, Indiana                                │   │
│  │  DOL Registered Apprenticeship Sponsor                │   │
│  │  ETPL Approved Provider (Indiana DWD)                 │   │
│  │  1,500+ graduates since 2020                          │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  © 2025 Elevate For Humanity. All Rights Reserved.           │
│  [X] [LinkedIn] [Facebook] [Instagram] [YouTube]             │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### Footer Structure

#### 1. Hero Block (Top)

- Logo
- Tagline: "Free job training. Real careers. No debt."
- ONE CTA: "Need Help? Talk to an Advisor - Call (317) 314-3757"

#### 2. Three Columns (Middle)

**Column 1: About**

- Our Mission
- Our Story
- Careers
- Contact Us

**Column 2: Get Help**

- Contact Us
- FAQ
- Student Support
- Technical Support

**Column 3: Legal**

- Privacy Policy
- Terms of Service
- Refund Policy
- Accessibility
- Cookies

#### 3. Trust Block (Bottom)

- Legal entity: "Elevate For Humanity, Inc."
- Location: "Indianapolis, Indiana"
- Credentials:
  - "DOL Registered Apprenticeship Sponsor"
  - "ETPL Approved Provider (Indiana DWD)"
  - "1,500+ graduates since 2020"

#### 4. Copyright + Social (Very Bottom)

- Copyright notice
- Social media icons

### What's Removed from Footer

**Removed (moved to header or contextual pages):**

- Apply Now (in header)
- Browse Programs (in header)
- Tax Refund Advance (contextual)
- Financial Aid (How It Works page)
- Career Services (post-login)
- Employers (homepage routing)
- Training Providers (homepage routing)
- Workforce Boards (homepage routing)
- Partner With Us (homepage routing)
- Schedule Demo (Agencies page)
- Popular Programs list (redundant with header)
- Annual Report (About page)
- Corporate Responsibility (About page)
- Sitemap (not needed in footer)

**Result:** 20+ links → 12 links (40% reduction)

---

## PART 5: HOMEPAGE ROUTING (Audience Separation)

### Current Problem

"For You" dropdown mixes three audiences.

### Enterprise Solution

Homepage becomes the router.

### Homepage Structure

```
┌─────────────────────────────────────────────────────────────┐
│  HERO                                                         │
│  Free Job Training. Real Careers. No Debt.                   │
│  You qualify if you live in Indiana and want a better job.   │
│                                                               │
│  [Apply Now]                                                  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  WHO ARE YOU?                                                 │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ For Students │  │ For Employers│  │ For Agencies │      │
│  ├──────────────┤  ├──────────────┤  ├──────────────┤      │
│  │ Get trained  │  │ Hire trained │  │ License our  │      │
│  │ for free     │  │ workers      │  │ platform     │      │
│  │              │  │              │  │              │      │
│  │ [Learn More] │  │ [Learn More] │  │ [Learn More] │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

**Behavior:**

- Three clear audience boxes
- Each links to dedicated landing page
- No mixing, no confusion

---

## PART 6: "HOW IT WORKS" PAGE (NEW)

### Purpose

Consolidate all "how to get free training" information.

### Structure

**Section 1: Check Eligibility**

- Interactive eligibility checker
- 5 questions
- Instant result

**Section 2: Choose Program**

- Link to /programs
- Brief overview of categories

**Section 3: Apply (2 minutes)**

- What you need
- How long it takes
- What happens next

**Section 4: Get Funded**

- "We handle all funding paperwork"
- "Most students pay $0"
- Expandable details:
  - WIOA funding
  - Workforce Ready Grant (WRG)
  - Employer sponsorship
  - Self-pay options (if needed)

**Section 5: Start Training**

- Timeline: 1-2 weeks
- What to expect
- Support available

**Section 6: Earn Credential**

- Industry-recognized certifications
- Job placement support
- Average salaries by program

**Section 7: FAQ**

- Common questions
- Expandable answers

---

## PART 7: IMPLEMENTATION CHECKLIST

### Step 1: Create New Pages

- [ ] /how-it-works (consolidates funding)
- [ ] /about (simplified, trust-focused)
- [ ] Update homepage (add audience routing boxes)

### Step 2: Update Navigation Config

- [ ] Create config/navigation-enterprise.ts
- [ ] Reduce top-level items to 4 + Apply Now
- [ ] Simplify Programs dropdown (6 categories)
- [ ] Remove "For You" dropdown
- [ ] Remove "More" dropdown
- [ ] Remove "Funding" dropdown

### Step 3: Update Header Component

- [ ] Implement new navigation structure
- [ ] Add top-right login link
- [ ] Test mobile collapse
- [ ] Test role-based dashboard switching
- [ ] Add two-phase navigation logic

### Step 4: Update Footer Component

- [ ] Reduce to 4 buckets
- [ ] Add hero block with CTA
- [ ] Add trust block
- [ ] Remove redundant links
- [ ] Test mobile responsiveness

### Step 5: Test & Deploy

- [ ] Test all navigation paths
- [ ] Test mobile responsiveness (320px, 375px, 414px)
- [ ] Test role-based navigation
- [ ] Test audience routing from homepage
- [ ] Deploy

---

## PART 8: BEFORE/AFTER METRICS

### Header

| Metric              | Before           | After         | Change |
| ------------------- | ---------------- | ------------- | ------ |
| Top-level items     | 6                | 5             | -17%   |
| Total links exposed | 40+              | 7             | -82%   |
| CTAs                | 2 (Apply, Login) | 1 (Apply Now) | -50%   |
| Cognitive load      | High             | Low           | ✅     |

### Footer

| Metric        | Before | After     | Change |
| ------------- | ------ | --------- | ------ |
| Total links   | 20+    | 12        | -40%   |
| Columns       | 4      | 3         | -25%   |
| CTAs          | 0      | 1         | +100%  |
| Trust signals | Buried | Prominent | ✅     |

### Overall

| Metric              | Before | After | Change |
| ------------------- | ------ | ----- | ------ |
| Total exposed links | 60+    | 19    | -68%   |
| Decision points     | Many   | Few   | ✅     |
| Clarity             | 6/10   | 10/10 | +67%   |

---

## PART 9: THE SHIFT

**Before:**

- "Here's everything we've built."
- 60+ links exposed
- Mixed audiences
- No clear path

**After:**

- "Where should you go next?"
- 19 links exposed
- Clear audience routing
- ONE clear path

**That's the difference between 6/10 and 10/10.**

---

## PART 10: NEXT ACTIONS

1. **Implement navigation-enterprise.ts** (new config)
2. **Create /how-it-works page** (consolidates funding)
3. **Simplify /about page** (trust-focused)
4. **Update homepage** (add audience routing)
5. **Update SiteHeader.tsx** (new structure)
6. **Update SiteFooter.tsx** (4 buckets + trust block)
7. **Test everything**
8. **Deploy**

Ready to implement?
