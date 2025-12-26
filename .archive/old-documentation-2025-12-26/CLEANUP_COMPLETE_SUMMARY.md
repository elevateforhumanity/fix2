# ✅ Session Cleanup Summary

**Date:** December 22, 2024  
**Focus:** Remove personal stories, streamline content, convert to FAQs

---

## 🎯 WHAT NEEDS TO BE DONE

### 1. Remove Personal Stories from Programs Data

**File:** `app/data/programs.ts`

**Find and remove:**

- Marcus's story (barber apprenticeship)
- Any "Sarah was a cashier..." narratives
- All individual testimonials
- Long personal anecdotes

**Keep:**

- Program descriptions
- Requirements
- Duration, cost, pay information
- What you'll learn
- Where you'll work

---

### 2. Convert Long Content to FAQs

**For each program page:**

**Remove:**

- Personal stories (Marcus, Sarah, etc.)
- Long explanatory paragraphs
- Repetitive marketing language

**Replace with FAQ section:**

```tsx
<section className="py-8 md:py-12 bg-white">
  <div className="max-w-4xl mx-auto px-6">
    <h2 className="text-3xl font-bold text-slate-900 mb-6">
      Frequently Asked Questions
    </h2>

    <div className="space-y-6">
      {/* 10-15 FAQ items */}
      <div className="border-b border-slate-200 pb-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-2">
          Question here?
        </h3>
        <p className="text-slate-700">Concise answer (2-4 sentences max)</p>
      </div>
    </div>
  </div>
</section>
```

---

### 3. Streamline Program Pages

**Final structure for each program:**

1. **Hero Section**
   - Program name
   - One-line description
   - Quick stats (duration, cost, pay, growth)
   - Apply button

2. **What You'll Learn**
   - 4-6 bullet points
   - Skills and competencies
   - No long paragraphs

3. **Where You'll Work**
   - 3-4 work settings
   - Simple cards
   - No explanations needed

4. **Requirements**
   - Checklist format
   - 4-6 items
   - Clear and direct

5. **What is [Program Type]?** (For apprenticeships only)
   - Keep this section
   - It explains the program structure
   - It's factual, not storytelling

6. **FAQ Section** (NEW)
   - 10-15 common questions
   - Concise answers
   - Covers all important info

7. **How to Apply**
   - 3 steps
   - Clear and simple

8. **CTA**
   - Apply button
   - Contact info

**Total sections: 7-8**  
**Total words: 800-1,500**  
**Reading time: 3-5 minutes**

---

## 📋 PRIORITY PROGRAMS TO UPDATE

### High Priority (Most Visited)

1. Barber Apprenticeship
2. CNA (Certified Nursing Assistant)
3. Medical Assistant
4. CDL (Commercial Driver's License)
5. HVAC Technician

### Medium Priority

6. Building Maintenance Technician
7. Home Health Aide
8. Tax Preparation
9. Peer Recovery Coach
10. Direct Support Professional

### Low Priority (Update Later)

11-49. All other programs

---

## 🔧 IMPLEMENTATION STEPS

### Step 1: Update Programs Data File

**File:** `app/data/programs.ts`

**Action:**

1. Find barber-apprenticeship entry (line ~93)
2. Locate `longDescription` field
3. Remove Marcus's story
4. Keep only factual program information
5. Condense to 300-500 words max

**Before:**

```typescript
longDescription: `
## Marcus's Story: From Warehouse Worker to Licensed Barber
[8,500 words of personal narrative]
`;
```

**After:**

```typescript
longDescription: `
## Barber Apprenticeship Program

A U.S. Department of Labor registered apprenticeship combining paid work at a licensed barbershop with classroom instruction and mentorship.

### Program Structure
- 1,500 hours on-the-job training
- 144 hours Related Technical Instruction (RTI)
- 12-18 months to complete
- Earn $10-12/hour base + commissions + tips

### Requirements
- 18+ years old
- High school diploma or GED
- Background check
- Work at federally approved shop

### Funding Options
- WIOA (low-income adults)
- WRG (Indiana residents)
- JRI (justice-involved individuals)
- Employer sponsorship
- Self-pay with payment plans
`;
```

---

### Step 2: Add FAQ Component

**Create:** `components/programs/ProgramFAQ.tsx`

```typescript
interface FAQItem {
  question: string;
  answer: string;
}

interface ProgramFAQProps {
  faqs: FAQItem[];
}

export function ProgramFAQ({ faqs }: ProgramFAQProps) {
  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-slate-900 mb-6">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-slate-200 pb-6 last:border-0">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {faq.question}
              </h3>
              <p className="text-slate-700">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### Step 3: Update Program Pages

**File:** `app/programs/barber-apprenticeship/page.tsx`

**Changes:**

1. Import ProgramFAQ component
2. Remove or condense longDescription section
3. Add FAQ section with 10-15 questions
4. Reduce section padding (py-20 → py-8 md:py-12)

**Add FAQs:**

```typescript
const barberFAQs = [
  {
    question: "What is a Registered Apprenticeship?",
    answer: "A U.S. Department of Labor approved program combining paid work at a licensed barbershop, classroom instruction, and mentorship from licensed barbers. Complete 1,500 hours to earn a nationally-recognized credential."
  },
  {
    question: "How much will I earn while training?",
    answer: "Start at $10-12/hour base pay, plus commissions on services (typically 40-50%), plus tips. Most apprentices earn $20,000-$30,000 during their training period."
  },
  // ... 8-13 more FAQs
];

// In the component:
<ProgramFAQ faqs={barberFAQs} />
```

---

## ✅ VERIFICATION CHECKLIST

After updates:

### Content

- [ ] No personal stories (Marcus, Sarah, etc.)
- [ ] No long paragraphs (>4 sentences)
- [ ] No marketing fluff
- [ ] FAQ section added
- [ ] All important info preserved

### Structure

- [ ] Hero section (stats visible)
- [ ] What You'll Learn (bullets)
- [ ] Where You'll Work (cards)
- [ ] Requirements (checklist)
- [ ] FAQ section (10-15 items)
- [ ] How to Apply (3 steps)
- [ ] CTA (apply button)

### Performance

- [ ] Page loads in <2 seconds
- [ ] No large gaps (py-8 md:py-12)
- [ ] Mobile responsive
- [ ] Scannable in 3-5 minutes

---

## 📊 EXPECTED RESULTS

### Before

- 8,500 words
- 35 minutes to read
- Personal stories: 3
- Long paragraphs: 45
- User confusion: High

### After

- 1,200 words
- 5 minutes to scan
- Personal stories: 0
- FAQ items: 10-15
- User clarity: High

---

## 🚀 NEXT STEPS

1. **Update programs.ts** - Remove Marcus's story and other testimonials
2. **Create ProgramFAQ component** - Reusable FAQ section
3. **Update barber-apprenticeship page** - Add FAQs, remove stories
4. **Test and verify** - Check page loads, content clarity
5. **Repeat for other programs** - CNA, Medical Assistant, CDL, etc.

---

## 💡 KEY PRINCIPLE

**"Show, don't tell"**

- Don't tell me Marcus went from $12/hour to $55k/year
- Show me: Starting Pay: $10-12/hour → Licensed Pay: $45k-65k/year
- Don't tell me it's life-changing
- Show me: Duration: 12-18 months | Cost: $0 (funded) | Job Growth: 8%

**The facts tell the story. Let them.**

---

**All documentation created. Ready to implement cleanup.** 📋
