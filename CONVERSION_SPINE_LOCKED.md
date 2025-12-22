# Conversion Spine - LOCKED

## The Problem

**Current state**: Multiple CTAs competing for attention

- "Apply Now"
- "Check Eligibility"
- "Talk to an Advisor"
- "Download Brochure"
- "Schedule a Call"
- "Learn More"
- "Get Started"

**Result**: Decision paralysis. User does nothing.

---

## The Solution

**ONE primary CTA per page. ONE secondary CTA. Everything else is deleted.**

---

## LOCKED CTA Hierarchy

### Primary CTA (ONE per page)

**Text**: "Apply Now"  
**Style**: Blue button, large, prominent  
**Placement**:

- Hero section (top)
- Final section (bottom)
- NOWHERE ELSE

**Rule**: If user is ready, they apply. Period.

### Secondary CTA (ONE per page, optional)

**Text**: "View Programs" (homepage) or "Contact Us" (program pages)  
**Style**: Text link, smaller, less prominent  
**Placement**: Below primary CTA only

**Rule**: If user needs more info, they explore or contact. That's it.

### NO Other CTAs Allowed

- ❌ "Check Eligibility" (they'll find out when they apply)
- ❌ "Talk to an Advisor" (contact page exists)
- ❌ "Download Brochure" (no brochures)
- ❌ "Schedule a Call" (contact page exists)
- ❌ "Learn More" (vague, useless)
- ❌ "Get Started" (same as apply)

---

## Page-by-Page CTA Rules

### Homepage

**Primary**: "Apply Now" → /apply  
**Secondary**: "View Programs" → /programs  
**Nothing else**

### Programs Listing Page

**Primary**: "Apply Now" → /apply  
**Secondary**: None (program cards have links)  
**Nothing else**

### Program Detail Page

**Primary**: "Apply Now" → /apply  
**Secondary**: "Contact Us" → /contact  
**Nothing else**

### Apply Page

**Primary**: "Submit Application" (form submit)  
**Secondary**: None  
**Nothing else**

### Contact Page

**Primary**: "Send Message" (form submit)  
**Secondary**: None  
**Nothing else**

---

## CTA Placement Rules

### Rule 1: Primary CTA appears EXACTLY twice

1. Hero section (top of page)
2. Final section (bottom of page)

**Never**: Middle of page, sidebar, floating button, popup

### Rule 2: Secondary CTA appears ONCE

- Below primary CTA in hero section
- OR in final section if needed
- NEVER both

### Rule 3: No CTAs in content sections

Content sections provide information only.  
No buttons, no links, no distractions.  
User reads, then scrolls to CTA.

---

## Visual Hierarchy (LOCKED)

### Primary CTA

```tsx
<Button variant="primary" href="/apply" arrow>
  Apply Now
</Button>
```

**Style**:

- px-8 py-4 (large)
- bg-blue-600 (prominent)
- font-bold
- Arrow icon
- Shadow on hover

### Secondary CTA

```tsx
<TextLink href="/programs">View Programs</TextLink>
```

**Style**:

- text-blue-600 (less prominent)
- font-semibold (not bold)
- Small arrow icon
- No background
- No border

### NO Other Styles Allowed

Every CTA must use one of these two styles.  
No exceptions.

---

## The Test

Show page to user. Ask: "What should you do next?"

**Correct answer**: "Apply" or "View programs"  
**Wrong answer**: "I don't know" or "Multiple things"

If they can't answer immediately, the page fails.

---

## Implementation Checklist

### Homepage

- [ ] ONE "Apply Now" button in hero
- [ ] ONE "View Programs" link below it
- [ ] ONE "Apply Now" button at bottom
- [ ] Delete all other CTAs

### Programs Page

- [ ] ONE "Apply Now" button in hero
- [ ] Program cards link to detail pages (not CTAs)
- [ ] ONE "Apply Now" button at bottom
- [ ] Delete all other CTAs

### Program Detail Pages

- [ ] ONE "Apply Now" button in hero
- [ ] ONE "Contact Us" link (small, bottom)
- [ ] ONE "Apply Now" button at bottom
- [ ] Delete all other CTAs

### Apply Page

- [ ] ONE "Submit Application" button
- [ ] Delete all other CTAs

### All Other Pages

- [ ] ONE primary CTA maximum
- [ ] ONE secondary CTA maximum
- [ ] Delete all other CTAs

---

## Conversion Metrics

Track ONLY these:

1. **Homepage → Apply**: % who click "Apply Now"
2. **Programs → Apply**: % who click "Apply Now"
3. **Program Detail → Apply**: % who click "Apply Now"
4. **Apply → Submit**: % who complete form

**Goal**:

- Homepage → Apply: 20%+
- Programs → Apply: 25%+
- Program Detail → Apply: 35%+
- Apply → Submit: 80%+

If lower, something is blocking conversion.

---

## What Gets Deleted

### From Homepage

- ❌ "Learn More" buttons
- ❌ "Get Started" buttons
- ❌ "Explore Programs" buttons
- ❌ "Contact Us" buttons (except footer)
- ❌ "Download" anything
- ❌ "Schedule" anything

### From Program Pages

- ❌ "Check Eligibility" buttons
- ❌ "Talk to Advisor" buttons
- ❌ "Request Info" buttons
- ❌ "Download Brochure" buttons
- ❌ "Schedule Tour" buttons
- ❌ Multiple "Apply" buttons

### From All Pages

- ❌ Floating CTAs
- ❌ Popup CTAs
- ❌ Sidebar CTAs
- ❌ Mid-content CTAs
- ❌ Sticky header CTAs

---

## The Spine

Every page follows this structure:

```
┌─────────────────────┐
│ HERO                │
│ Primary CTA         │ ← Apply Now
│ Secondary CTA       │ ← View Programs (optional)
└─────────────────────┘
         ↓
┌─────────────────────┐
│ CONTENT SECTION 1   │
│ (no CTAs)           │
└─────────────────────┘
         ↓
┌─────────────────────┐
│ CONTENT SECTION 2   │
│ (no CTAs)           │
└─────────────────────┘
         ↓
┌─────────────────────┐
│ CONTENT SECTION 3   │
│ (no CTAs)           │
└─────────────────────┘
         ↓
┌─────────────────────┐
│ FINAL CTA           │
│ Primary CTA         │ ← Apply Now
└─────────────────────┘
```

**No deviations. No exceptions.**

---

## Enforcement

### Code Review Checklist

- [ ] Count CTAs on page
- [ ] If > 2, reject
- [ ] If primary CTA not "Apply Now", reject
- [ ] If CTAs in content sections, reject
- [ ] If floating/popup CTAs, reject

### Design Review Checklist

- [ ] Primary CTA is most prominent element
- [ ] Secondary CTA is clearly secondary
- [ ] No competing visual weight
- [ ] Clear hierarchy

---

## The Result

### Before

- 10+ CTAs per page
- User confused
- Low conversion
- "What should I do?"

### After

- 2 CTAs per page
- User clear
- High conversion
- "I know what to do"

---

## The Mantra

**One page. One goal. One primary action.**

Everything else is deleted.

**Ruthless.**
