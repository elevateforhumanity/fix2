# Final Polish Checklist - 10/10

## Current Status: 6.5/10

| Area                | Status          | Target   |
| ------------------- | --------------- | -------- |
| Program credibility | ✅ Strong       | Maintain |
| Content knowledge   | ✅ Excellent    | Maintain |
| User clarity        | ❌ Weak         | Fix      |
| Conversion flow     | ❌ Weak         | Fix      |
| Visual consistency  | ❌ Inconsistent | Fix      |
| Outcome specificity | ❌ Lacking      | Fix      |
| Audience separation | ❌ Missing      | Fix      |
| Compliance timing   | ❌ Too early    | Fix      |
| Post-click clarity  | ❌ Missing      | Fix      |

---

## Critical Fixes Required for 10/10

### 1. Move Compliance Language (CRITICAL)

**Problem**: WIOA, ETPL, DOL jargon appears before user commits interest

**Fix**:

```
BEFORE user applies:
- NO mention of WIOA
- NO mention of ETPL
- NO mention of DOL regulations
- NO workforce jargon

AFTER user applies:
- Confirmation email mentions funding
- Advisor call explains WIOA
- Application process handles compliance
```

**Implementation**:

- Delete all WIOA mentions from program pages
- Delete all ETPL mentions from program pages
- Delete all DOL jargon from program pages
- Move to: /accreditation page (for those who care)
- Move to: Post-application emails
- Move to: Advisor conversations

**Result**: Student sees "Free training", not "WIOA-funded ETPL-listed training"

---

### 2. Add "What Happens After I Click" (CRITICAL)

**Problem**: User clicks "Apply Now" and doesn't know what happens next

**Fix**: Add clear post-click section to EVERY page with CTA

```tsx
<section className="py-16 bg-blue-600 text-white">
  <div className="max-w-3xl mx-auto px-4 text-center">
    <h2 className="text-3xl font-bold mb-6">What Happens Next</h2>

    <div className="grid md:grid-cols-3 gap-6 mb-12 text-left">
      <div>
        <div className="text-4xl font-bold mb-2">1</div>
        <div className="text-lg font-semibold mb-2">Apply (2 minutes)</div>
        <div className="text-blue-100">Fill out simple form with your info</div>
      </div>
      <div>
        <div className="text-4xl font-bold mb-2">2</div>
        <div className="text-lg font-semibold mb-2">We Call You (24 hours)</div>
        <div className="text-blue-100">
          Advisor reviews your application and calls
        </div>
      </div>
      <div>
        <div className="text-4xl font-bold mb-2">3</div>
        <div className="text-lg font-semibold mb-2">
          Start Training (1-2 weeks)
        </div>
        <div className="text-blue-100">
          We handle funding, you start learning
        </div>
      </div>
    </div>

    <Button variant="secondary" href="/apply" arrow>
      Apply Now
    </Button>
  </div>
</section>
```

**Must include**:

- Timeline (24 hours, 1-2 weeks, etc.)
- Who contacts them (advisor, coordinator, etc.)
- What they need (nothing, just apply)
- What we handle (funding, paperwork, etc.)

---

### 3. Separate Audiences Completely (CRITICAL)

**Problem**: Students see workforce board language, agencies see student language

**Fix**: Create separate paths

```
Homepage:
├─ "I Want Training" → /for/students
├─ "I Need Workers" → /for/employers
├─ "I Fund Training" → /for/workforce-boards
└─ (hidden) "Other" → dropdown

/for/students:
- Student language only
- No WIOA jargon
- No compliance talk
- Focus: Free training, get job

/for/workforce-boards:
- Agency language
- WIOA compliance
- ETPL listings
- Performance metrics
- Focus: Compliance, outcomes

/for/employers:
- Employer language
- Hiring pipeline
- Candidate quality
- Focus: Fill positions
```

**Implementation**:

1. Create /for/students/page.tsx (student homepage)
2. Create /for/workforce-boards/page.tsx (agency homepage)
3. Create /for/employers/page.tsx (employer homepage)
4. Update main homepage to route immediately
5. NO mixing audiences on same page

---

### 4. Lock Visual Consistency (CRITICAL)

**Problem**: Every page looks different

**Fix**: Apply locked design system to ALL pages

**Checklist**:

- [ ] All sections use py-16 or py-20 only
- [ ] All headings use text-4xl, text-3xl, or text-base only
- [ ] All colors use white, slate-50, slate-900, blue-600, green-600 only
- [ ] All buttons use 2 styles only (primary, secondary)
- [ ] All cards use p-6, border-slate-200 only
- [ ] All grids use gap-6 only
- [ ] All containers use max-w-7xl or max-w-3xl only

**Implementation**:

1. Find/replace all py-\* values → py-16 or py-20
2. Find/replace all text-\* values → text-4xl, text-3xl, or text-base
3. Find/replace all button styles → Button component
4. Find/replace all card styles → Card component
5. Delete all custom spacing, colors, typography

---

### 5. Make Outcomes Brutally Specific (CRITICAL)

**Problem**: Vague outcomes like "career opportunities"

**Fix**: Replace with specific job titles, salaries, credentials

**Template**:

```
What You Get:
1. [Exact credential name from state board]
2. [Exact salary range from Indeed/BLS]
3. [Exact job title from real job postings]
```

**Examples**:

- ✅ "Indiana Licensed Barber earning $45,000-$65,000/year"
- ✅ "EPA-certified HVAC Technician earning $25-$35/hour"
- ✅ "State-certified CNA working at hospitals earning $14-$21/hour"

**NOT**:

- ❌ "Career opportunities in barbering"
- ❌ "HVAC industry positions"
- ❌ "Healthcare career pathways"

**Implementation**:

1. Research real salaries on Indeed (Indiana only)
2. Get exact credential names from state websites
3. Find real job titles from job postings
4. Replace all vague language with specific data
5. Source every claim

---

### 6. Enforce Conversion Spine (CRITICAL)

**Problem**: Multiple CTAs competing for attention

**Fix**: ONE primary CTA per page, ONE secondary CTA max

**Rules**:

- Primary CTA: "Apply Now" (appears twice: hero + bottom)
- Secondary CTA: "View Programs" or "Contact Us" (appears once)
- NO other CTAs allowed

**Delete**:

- ❌ "Check Eligibility"
- ❌ "Talk to Advisor"
- ❌ "Download Brochure"
- ❌ "Schedule Call"
- ❌ "Learn More"
- ❌ "Get Started"

**Implementation**:

1. Count CTAs on every page
2. If > 2, delete extras
3. Ensure primary is "Apply Now"
4. Ensure secondary is "View Programs" or "Contact Us"
5. Delete all others

---

### 7. Enforce Template Consistency (CRITICAL)

**Problem**: Every program page has different structure

**Fix**: Use ProgramPageLocked component for ALL programs

**Structure** (NEVER DEVIATE):

1. Hero (400px, name only)
2. Who This Is For (3 bullets)
3. What You Get (3 outcomes)
4. Time Commitment (2 boxes)
5. What It Costs (1 box)
6. Proof (2 boxes, optional)
7. What Happens Next (3 steps + CTA)

**Implementation**:

1. Convert all 20 program pages to use ProgramPageLocked
2. Delete all custom layouts
3. Delete all extra sections
4. Verify all pages look identical in structure
5. Only content differs, never layout

---

## Implementation Order (Do in This Sequence)

### Phase 1: Critical Fixes (Week 1)

1. ✅ Create locked design system
2. ✅ Create ProgramPageLocked template
3. ✅ Create conversion spine rules
4. ✅ Create outcomes specificity guide
5. ⏳ Move compliance language to post-application
6. ⏳ Add "What Happens Next" to all CTAs
7. ⏳ Create audience-specific homepages

### Phase 2: Apply to All Pages (Week 2)

1. ⏳ Convert all 20 program pages to template
2. ⏳ Apply locked spacing to all pages
3. ⏳ Apply locked typography to all pages
4. ⏳ Apply locked colors to all pages
5. ⏳ Enforce CTA hierarchy on all pages
6. ⏳ Make all outcomes specific with data

### Phase 3: Verify & Test (Week 3)

1. ⏳ Visual regression test all pages
2. ⏳ 5-second test with real users
3. ⏳ Track conversion metrics
4. ⏳ Fix any inconsistencies
5. ⏳ Final polish pass

---

## Success Metrics (10/10 Criteria)

### User Clarity: 10/10

- [ ] User knows what to do in 5 seconds
- [ ] User can skim page in 30 seconds
- [ ] User knows what happens after clicking
- [ ] NO confusion, NO questions

### Conversion Flow: 10/10

- [ ] ONE primary CTA per page
- [ ] Clear path from homepage → apply
- [ ] NO decision paralysis
- [ ] 20%+ click "Apply Now"

### Visual Consistency: 10/10

- [ ] All pages use same spacing
- [ ] All pages use same typography
- [ ] All pages use same colors
- [ ] All pages use same structure
- [ ] Feels professionally templated

### Outcome Specificity: 10/10

- [ ] Every outcome has a number
- [ ] Every job title is specific
- [ ] Every salary is a range
- [ ] Every credential is named
- [ ] NO vague language

### Audience Separation: 10/10

- [ ] Students see student language only
- [ ] Agencies see agency language only
- [ ] Employers see employer language only
- [ ] NO mixing on same page

### Compliance Timing: 10/10

- [ ] NO WIOA jargon before application
- [ ] NO ETPL mentions before application
- [ ] NO DOL regulations before application
- [ ] Compliance appears AFTER interest

### Post-Click Clarity: 10/10

- [ ] User knows timeline (24 hours)
- [ ] User knows who calls (advisor)
- [ ] User knows what's needed (nothing)
- [ ] User knows what we handle (funding)

---

## The Final Test

### 5-Second Test

Show homepage to 10 people for 5 seconds.  
Ask: "What is this site for?"  
**Pass**: 9/10 say "Free job training"

### 30-Second Test

Show program page to 10 people for 30 seconds.  
Ask: "What would you do next?"  
**Pass**: 9/10 say "Apply"

### Conversion Test

Track for 1 week:  
**Pass**: 20%+ click "Apply Now" from homepage

### Consistency Test

Open 5 random program pages side by side.  
**Pass**: They look identical in structure

---

## Current Status → Target Status

| Metric              | Current | Target | Gap               |
| ------------------- | ------- | ------ | ----------------- |
| User clarity        | 5/10    | 10/10  | Fix messaging     |
| Conversion flow     | 4/10    | 10/10  | Fix CTAs          |
| Visual consistency  | 5/10    | 10/10  | Apply template    |
| Outcome specificity | 4/10    | 10/10  | Add numbers       |
| Audience separation | 3/10    | 10/10  | Create paths      |
| Compliance timing   | 4/10    | 10/10  | Move post-apply   |
| Post-click clarity  | 3/10    | 10/10  | Add "what's next" |

**Overall**: 6.5/10 → 10/10

---

## The Mantra

**Polish is not adding features. Polish is ruthless editing.**

- Delete vague language
- Delete extra CTAs
- Delete compliance jargon
- Delete custom layouts
- Delete audience mixing

**Add**:

- Specific outcomes
- Clear next steps
- Consistent structure
- Audience separation
- Post-click clarity

**Result**: 10/10 polish.
