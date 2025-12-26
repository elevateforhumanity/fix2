# 🎯 Program Pages - Streamline & Simplify

**Goal:** Remove excess content, let context tell the story, make pages scannable

---

## ❌ REMOVE

### 1. Personal Stories

- No "Sarah was a cashier..." narratives
- No individual testimonials on program pages
- No "Marcus wanted to work..." examples

### 2. Excessive Details

- Long paragraphs explaining obvious things
- Repetitive information
- Marketing fluff

### 3. Redundant Sections

- Multiple "Why Choose This Program" sections
- Repeated eligibility criteria
- Duplicate CTAs

---

## ✅ KEEP (Essential Only)

### Program Page Structure

**1. Hero Section (Above Fold)**

```
- Program name
- One-line description (what you become)
- Duration | Cost | Starting Pay
- Apply Now button
```

**2. Quick Facts (Scannable)**

```
Duration: 4 weeks
Cost: $3,200 (100% covered by WIOA/WRG)
Starting Pay: $16-20/hour
Job Growth: 8% (faster than average)
```

**3. What You'll Learn (Bullet Points)**

```
- Skill 1
- Skill 2
- Skill 3
- Skill 4
```

**4. Where You'll Work (Simple List)**

```
- Hospitals
- Nursing homes
- Home health agencies
```

**5. Requirements (Checklist)**

```
✓ 18+ years old
✓ High school diploma or GED
✓ Background check
✓ Drug screening
```

**6. How to Apply (3 Steps)**

```
1. Submit application
2. Schedule WorkOne appointment
3. Start training
```

**7. CTA**

```
Apply Now button
Contact info
```

---

## 📐 NEW TEMPLATE

### Concise Program Page

```tsx
export default function ProgramPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-8 md:py-12 bg-gradient-to-br from-brand-orange-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-2 mb-4">
            <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
              100% Free
            </span>
            <span className="px-3 py-1 bg-brand-orange-600 text-white text-xs font-bold rounded-full">
              WIOA Approved
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">
            Certified Nursing Assistant (CNA)
          </h1>

          <p className="text-xl text-slate-600 mb-6">
            Provide essential patient care in healthcare settings
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div>
              <div className="text-sm text-slate-600">Duration</div>
              <div className="text-lg font-bold text-slate-900">4 weeks</div>
            </div>
            <div>
              <div className="text-sm text-slate-600">Cost</div>
              <div className="text-lg font-bold text-slate-900">$3,200</div>
              <div className="text-xs text-green-600">100% covered</div>
            </div>
            <div>
              <div className="text-sm text-slate-600">Starting Pay</div>
              <div className="text-lg font-bold text-slate-900">$16-20/hr</div>
            </div>
            <div>
              <div className="text-sm text-slate-600">Job Growth</div>
              <div className="text-lg font-bold text-slate-900">8%</div>
              <div className="text-xs text-slate-600">Faster than avg</div>
            </div>
          </div>

          <Link
            href="/apply"
            className="inline-block px-8 py-3 bg-brand-orange-600 text-white font-bold rounded-lg hover:bg-brand-orange-700 transition"
          >
            Apply Now
          </Link>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            What You'll Learn
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="flex items-start gap-2">
              <CheckCircle
                className="text-green-500 flex-shrink-0 mt-1"
                size={20}
              />
              <span>Basic patient care and hygiene</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle
                className="text-green-500 flex-shrink-0 mt-1"
                size={20}
              />
              <span>Vital signs monitoring</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle
                className="text-green-500 flex-shrink-0 mt-1"
                size={20}
              />
              <span>Infection control procedures</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle
                className="text-green-500 flex-shrink-0 mt-1"
                size={20}
              />
              <span>Patient communication</span>
            </div>
          </div>
        </div>
      </section>

      {/* Where You'll Work */}
      <section className="py-8 md:py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Where You'll Work
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <div className="font-semibold text-slate-900">Hospitals</div>
              <div className="text-sm text-slate-600">Acute care settings</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <div className="font-semibold text-slate-900">Nursing Homes</div>
              <div className="text-sm text-slate-600">Long-term care</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <div className="font-semibold text-slate-900">Home Health</div>
              <div className="text-sm text-slate-600">In-home patient care</div>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Requirements
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">
                ✓
              </div>
              <span>18+ years old</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">
                ✓
              </div>
              <span>High school diploma or GED</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">
                ✓
              </div>
              <span>Background check</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">
                ✓
              </div>
              <span>Drug screening</span>
            </div>
          </div>
        </div>
      </section>

      {/* How to Apply */}
      <section className="py-8 md:py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            How to Apply
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="w-10 h-10 rounded-full bg-brand-orange-600 text-white flex items-center justify-center font-bold mb-3">
                1
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">
                Submit Application
              </h3>
              <p className="text-sm text-slate-600">Complete our online form</p>
            </div>
            <div>
              <div className="w-10 h-10 rounded-full bg-brand-orange-600 text-white flex items-center justify-center font-bold mb-3">
                2
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">
                WorkOne Appointment
              </h3>
              <p className="text-sm text-slate-600">
                Schedule on IndianaCareerConnect.com
              </p>
            </div>
            <div>
              <div className="w-10 h-10 rounded-full bg-brand-orange-600 text-white flex items-center justify-center font-bold mb-3">
                3
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">
                Start Training
              </h3>
              <p className="text-sm text-slate-600">
                Begin your 4-week program
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-8 md:py-12 bg-brand-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your CNA Career?
          </h2>
          <p className="text-xl mb-6 text-white/90">
            Apply now and start training in as little as 2 weeks
          </p>
          <Link
            href="/apply"
            className="inline-block px-8 py-3 bg-white text-brand-orange-600 font-bold rounded-lg hover:bg-gray-50 transition"
          >
            Apply Now
          </Link>
        </div>
      </section>
    </main>
  );
}
```

---

## 📏 CONTENT GUIDELINES

### Headlines

- **Good:** "Certified Nursing Assistant (CNA)"
- **Bad:** "Become a Certified Nursing Assistant and Transform Your Life"

### Descriptions

- **Good:** "Provide essential patient care in healthcare settings"
- **Bad:** "Join the rewarding field of healthcare and make a difference in people's lives every single day while earning a competitive salary"

### Bullet Points

- **Good:** "Basic patient care and hygiene"
- **Bad:** "Learn how to provide compassionate, high-quality basic patient care and maintain proper hygiene standards in accordance with state regulations"

---

## 🎯 CONTEXT TELLS THE STORY

### Let the Facts Speak

**Instead of:**
"Sarah was a cashier making $11/hour. After 4 weeks of CNA training, she's now making $18/hour..."

**Just show:**

```
Starting Pay: $16-20/hour
Duration: 4 weeks
Cost: $0 (100% covered)
```

**The context tells the story:**

- Free training → No barrier
- 4 weeks → Fast
- $16-20/hour → Good pay
- 8% growth → Stable career

---

## 📊 BEFORE vs AFTER

### Before (Too Long)

```
Total words: 2,500
Sections: 12
Personal stories: 3
Paragraphs: 45
Time to read: 10 minutes
```

### After (Streamlined)

```
Total words: 500
Sections: 6
Personal stories: 0
Bullet points: 20
Time to scan: 2 minutes
```

---

## 🚀 IMPLEMENTATION

### Priority Order

**1. Update Top 10 Programs First**

- CNA
- Medical Assistant
- CDL
- HVAC
- Barber Apprenticeship
- Building Maintenance
- Home Health Aide
- Tax Preparation
- Peer Recovery Coach
- Direct Support Professional

**2. Use Template Above**

- Copy/paste structure
- Fill in program-specific details
- Keep it concise

**3. Remove Excess**

- Delete personal stories
- Remove long paragraphs
- Cut marketing fluff
- Keep only facts

---

## ✅ CHECKLIST

For each program page:

- [ ] Hero section: Name, description, quick stats
- [ ] What You'll Learn: 4-6 bullet points
- [ ] Where You'll Work: 3-4 settings
- [ ] Requirements: 4-6 items
- [ ] How to Apply: 3 steps
- [ ] CTA: Apply button
- [ ] Total sections: 6 (no more)
- [ ] Total words: 300-600
- [ ] No personal stories
- [ ] No long paragraphs
- [ ] Scannable in 2 minutes

---

## 💡 KEY PRINCIPLE

**"Show, don't tell"**

- Don't tell me it's life-changing → Show me $16-20/hour
- Don't tell me it's fast → Show me 4 weeks
- Don't tell me it's free → Show me $0 cost
- Don't tell me it's in-demand → Show me 8% growth

**The numbers tell the story. Let them.**

---

## 🎯 RESULT

**Streamlined program pages that:**

- Load fast
- Scan quickly
- Convert better
- Maintain less
- Scale easily

**No fluff. Just facts.** 📊
