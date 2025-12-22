# Template Enforcement - LOCKED

## The Problem

**Current state**: Each program page built independently

- Different heading sizes
- Different section orders
- Different CTA placements
- Different lengths
- Different spacing

**Result**: "This feels inconsistent and unfinished"

---

## The Solution

**ONE template. ZERO deviations. Every program page identical in structure.**

---

## LOCKED Program Page Template

### Structure (NEVER CHANGE)

```
1. Hero (400px height)
   - Program name only
   - Background image
   - NO CTAs here

2. Who This Is For (py-16, bg-white)
   - H2: "Is This For You?"
   - 3 bullets max
   - Icon: Users
   - NO CTAs

3. What You Get (py-16, bg-slate-50)
   - H2: "What You Get"
   - 3 outcomes max
   - Icon: CheckCircle
   - NO CTAs

4. Time Commitment (py-16, bg-white)
   - H2: "Time Commitment"
   - 2 boxes: Duration + Schedule
   - Icon: Clock
   - NO CTAs

5. What It Costs (py-16, bg-green-50)
   - H2: "What It Costs"
   - Large cost display
   - Funded by statement
   - NO CTAs

6. Proof (py-16, bg-white) [OPTIONAL]
   - NO heading
   - 2 boxes: RAPIDS ID + Salary
   - Icons: Shield + DollarSign
   - NO CTAs

7. What Happens Next (py-16, bg-blue-600)
   - H2: "What Happens Next"
   - 3 steps: Apply → Approved → Start
   - ONE CTA: "Apply Now"
```

**Total sections**: 6-7  
**Total CTAs**: 1  
**Total length**: ~3 screens

---

## Locked Measurements

### Hero

- Height: 400px (EXACTLY)
- Text: text-4xl md:text-5xl font-bold
- Background: Black overlay at 60% opacity
- NO CTAs

### Section Spacing

- All sections: py-16 (EXACTLY)
- NO py-12, py-20, py-24
- Container: max-w-3xl mx-auto px-4 (EXACTLY)

### Headings

- H1 (hero): text-4xl md:text-5xl font-bold
- H2 (sections): text-3xl font-bold text-slate-900 mb-8 text-center
- NO H3, H4, H5

### Content Blocks

- "Who" bullets: 3 max, bg-slate-50 p-6 rounded-lg
- "What" bullets: 3 max, bg-white p-6 rounded-lg border
- "Time" boxes: 2 exactly, grid md:grid-cols-2 gap-6
- "Cost" box: 1 exactly, centered
- "Proof" boxes: 2 max, grid md:grid-cols-2 gap-6
- "Next" steps: 3 exactly, grid md:grid-cols-3 gap-6

### Icons

- Size: h-6 w-6 (content), h-12 w-12 (large displays)
- Colors: blue-600, green-600, slate-600 only
- Placement: Left of text or centered above

### CTA

- Placement: Final section only
- Style: Button variant="secondary"
- Text: "Apply Now"
- NO other CTAs anywhere

---

## Code Template (LOCKED)

```tsx
export default function ProgramPage() {
  return (
    <ProgramPageLocked
      // Required (EXACT format)
      name="[Program Name]"
      forWho={['[Specific person type]', '[Specific need]', '[Specific goal]']}
      outcomes={[
        '[Exact credential name]',
        '[Exact salary range]',
        '[Exact career outcome]',
      ]}
      duration="[X months]"
      schedule="[Full-time/Part-time/Evenings]"
      cost="$0"
      fundedBy="[Exact funding source]"
      // Optional
      rapidsId="[RAPIDS ID if DOL registered]"
      avgSalary="$[XX,000]"
      heroImage="/images/programs/[slug]-hero.jpg"
    />
  );
}
```

**NO custom sections. NO additional props. NO deviations.**

---

## Enforcement Rules

### Rule 1: Section Order Never Changes

Every program page has sections in this exact order:

1. Hero
2. Who
3. What
4. Time
5. Cost
6. Proof (optional)
7. Next

**NO reordering. NO skipping. NO adding.**

### Rule 2: Section Spacing Never Changes

Every section uses py-16.  
Every container uses max-w-3xl mx-auto px-4.  
**NO exceptions.**

### Rule 3: Heading Hierarchy Never Changes

- H1 in hero only
- H2 for section titles only
- NO other heading levels

### Rule 4: Content Limits Never Change

- Who: 3 bullets max
- What: 3 outcomes max
- Time: 2 boxes exactly
- Cost: 1 box exactly
- Proof: 2 boxes max
- Next: 3 steps exactly

**NO more. NO less.**

### Rule 5: CTA Placement Never Changes

ONE CTA in final section.  
**NO CTAs anywhere else.**

---

## Visual Consistency Checklist

For EVERY program page, verify:

### Structure

- [ ] Sections in correct order
- [ ] No missing sections (except Proof)
- [ ] No extra sections
- [ ] Hero is 400px height
- [ ] Final section has CTA

### Spacing

- [ ] All sections use py-16
- [ ] All containers use max-w-3xl
- [ ] All headings use mb-8
- [ ] All content uses gap-6

### Typography

- [ ] H1 is text-4xl md:text-5xl
- [ ] H2 is text-3xl
- [ ] Body is text-base or text-lg
- [ ] NO other sizes

### Colors

- [ ] Backgrounds alternate: white, slate-50, white, green-50, white, blue-600
- [ ] Icons use blue-600, green-600, or slate-600
- [ ] Text uses slate-900, slate-700, slate-600
- [ ] NO other colors

### Content

- [ ] Who: 3 bullets
- [ ] What: 3 outcomes
- [ ] Time: 2 boxes
- [ ] Cost: 1 box
- [ ] Proof: 0-2 boxes
- [ ] Next: 3 steps
- [ ] CTA: 1 button

---

## The Test

Open 3 random program pages side by side.

**Pass**: They look identical in structure, only content differs  
**Fail**: They look different in layout, spacing, or hierarchy

If they fail, fix them.

---

## Implementation

### Step 1: Create Template Component

✅ Done: `components/programs/ProgramPageLocked.tsx`

### Step 2: Convert All Program Pages

For each program:

1. Delete existing page.tsx
2. Create new page using ProgramPageLocked
3. Fill in ONLY the required props
4. NO custom code
5. NO deviations

### Step 3: Verify Consistency

1. Open all program pages
2. Check structure matches template
3. Check spacing is identical
4. Check headings are consistent
5. Check CTAs are in correct place

### Step 4: Lock It Down

1. Add ESLint rule: No custom program pages
2. Add PR check: Verify template usage
3. Add visual regression tests
4. Reject any PRs that deviate

---

## What Gets Deleted

### From All Program Pages

- ❌ Custom layouts
- ❌ Extra sections
- ❌ Different section orders
- ❌ Multiple CTAs
- ❌ Custom spacing
- ❌ Custom typography
- ❌ Custom colors
- ❌ Long descriptions
- ❌ Testimonials
- ❌ FAQs
- ❌ Image galleries
- ❌ Video embeds

### Replaced With

- ✅ ProgramPageLocked component
- ✅ Standardized structure
- ✅ Consistent spacing
- ✅ Locked hierarchy
- ✅ ONE CTA

---

## The Result

### Before

- 20 programs, 20 different layouts
- Inconsistent spacing
- Different heading sizes
- CTAs everywhere
- Feels "built independently"

### After

- 20 programs, 1 identical layout
- Consistent spacing
- Same heading sizes
- CTA in one place
- Feels "professionally templated"

---

## The Mantra

**One template. Zero deviations. Perfect consistency.**

If it's not in the template, it doesn't exist.

**Ruthless.**
