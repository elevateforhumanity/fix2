# 🔍 Duplicate Sections on Program Pages

**Issue:** Duplicate appointment/CTA sections on program pages

---

## 📊 Current Structure

### ProgramTemplate.tsx has these sections:

1. **Hero Section** (Top)
   - Program title
   - Duration, delivery, price chips
   - **Primary CTA button** (Apply Now)
   - Secondary CTA button (optional)

2. **Overview Section**
   - What you'll learn

3. **Details Section**  
   - Left: Program details
   - Right: Payment/Enrollment info

4. **How to Apply Section**
   - 5-step process including:
     - Step 1: Apply Online
     - Step 2: Advisor Outreach
     - **Step 3: WorkOne Appointment** ← Appointment mentioned here
     - Step 4: Onboarding
     - Step 5: Start Training

5. **Requirements Section** (if applicable)
   - Who this is for

6. **Career Outcomes Section** (if applicable)
   - Career paths

7. **Final CTA Section** (Bottom)
   - "Ready to Get Started?"
   - **Primary CTA button** (Apply Now) ← DUPLICATE
   - Phone button
   - Email button
   - Contact info

---

## 🎯 Identified Duplicates

### Duplicate #1: Apply Now Buttons
- **Hero section** has Apply button
- **Final CTA section** has Apply button
- **Both go to same place**

### Duplicate #2: Contact Information
- **Final CTA section** has phone/email
- **Could be redundant** if already in header/footer

---

## ✅ Recommended Fixes

### Option 1: Remove Final CTA Section (Simplest)

**Remove the entire bottom CTA section** since:
- Hero already has Apply button
- Contact info is in header/footer
- Reduces page length

```typescript
// Delete lines 248-286 in ProgramTemplate.tsx
// Remove the entire "FINAL CTA" section
```

### Option 2: Keep Final CTA, Remove Hero CTAs

**Keep bottom CTA, simplify hero** since:
- Users see full program details before CTA
- More informed decision
- Still have prominent CTA

```typescript
// In hero section, remove CTA buttons
// Keep only at bottom after they've read everything
```

### Option 3: Make Final CTA Different

**Change final CTA to be different** from hero:
- Hero: "Apply Now"
- Bottom: "Schedule a Call" or "Get More Info"
- Provides alternative action

### Option 4: Conditional Final CTA

**Only show final CTA for certain programs:**
```typescript
{program.showFinalCTA && (
  <section className="bg-zinc-900 text-white py-16">
    {/* Final CTA content */}
  </section>
)}
```

---

## 🔧 Quick Fix (Remove Duplicate)

If you want to remove the duplicate bottom CTA section:

```typescript
// components/programs/ProgramTemplate.tsx
// Delete or comment out lines 248-286

// Before:
      {/* FINAL CTA */}
      <section className="bg-zinc-900 text-white py-16">
        ...entire section...
      </section>
    </main>
  );
}

// After:
    </main>
  );
}
```

---

## 📝 Which Duplicate to Remove?

### If removing FINAL CTA (bottom):
**Pros:**
- Cleaner, shorter page
- Hero CTA is enough
- Less repetitive

**Cons:**
- No CTA after reading details
- Might reduce conversions

### If removing HERO CTA:
**Pros:**
- Users read first, then apply
- More informed decisions
- Single clear CTA

**Cons:**
- Less immediate action
- Might lose impulse applicants

---

## 🎯 My Recommendation

**Remove the Final CTA section** because:

1. ✅ Hero CTA is prominent and immediate
2. ✅ Contact info is in header/footer already
3. ✅ Reduces page length
4. ✅ Less repetitive
5. ✅ Users can scroll back up to apply

---

## 🚀 Implementation

Want me to remove the duplicate Final CTA section?

I can:
1. Remove the bottom CTA section
2. Keep only the hero CTA
3. Commit and push the change
4. Deploy immediately

**Just confirm and I'll do it!**

---

**Or tell me which specific duplicate you're seeing and I'll fix that instead.**
