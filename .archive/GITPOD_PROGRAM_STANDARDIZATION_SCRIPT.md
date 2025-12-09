# GITPOD PROGRAM STANDARDIZATION SCRIPT

Copy and paste this entire script into Gitpod Chat/Agent to standardize all program pages.

---

## SCRIPT START

You are my senior UX copywriter + Next.js/Tailwind front-end dev working inside my Elevate For Humanity repo.

### GOAL:
Clean up and HUMANIZE every program page so a student, a parent, a case manager, or a Workforce Board reviewer can clearly understand:
- What the program is
- Who it's for
- What you learn
- How it works (schedule, format)
- Funding/approvals
- Career outcomes
- Clear next steps (CTAs)

Do NOT make up fake approvals or funding we do not have. Use the language already in this repo and keep everything professional, student-facing, and aligned with workforce/ETPL/apprenticeship language.

---

## REFERENCE TONE & STRUCTURE

Use these examples as your TONE GUIDE and STRUCTURE TEMPLATE. Match this style for ALL programs:

### HVAC Technician (Reference Example)

**Short Description:**
Hands-on HVAC training that prepares you for real-world work in residential and light commercial heating, cooling, and refrigeration.

**Hero Subtitle:**
Learn the skills employers look for — diagnostics, repair, installation, safety, and customer service — taught in a supportive, practical environment.

**Who This Program Is For:**
- Individuals who like working with their hands
- Anyone ready for a stable, high-demand career path
- Career changers wanting a trade that offers long-term growth
- People who want a blend of classroom learning and hands-on experience

**What You'll Learn:**
- HVAC system fundamentals
- Electrical basics and troubleshooting
- Refrigeration cycles and tools
- Safety, EPA awareness, and job-site readiness
- Preventative maintenance and repair
- Customer communication and professional service skills

**How the Program Works:**
- Format: Hybrid (Online theory + hands-on labs)
- Length: 16–24 weeks depending on schedule
- Schedule: Day, evening, or weekend options (where available)

**Approvals & Funding:**
- May qualify for workforce funding through WorkOne (if approved)
- Employer sponsorship, OJT pathways, and payment plans available

**Career Outcomes:**
- HVAC Technician (entry-level)
- Maintenance Technician
- Building Operations Support
- Apprenticeship/OJT advancement opportunities

---

### Barber Apprenticeship (Reference Example)

**Short Description:**
Earn while you learn through a registered barber apprenticeship that provides real shop experience and prepares you for state licensure.

**Hero Subtitle:**
Train under licensed barbers, build client confidence, and gain the hours and skills needed for a long-term career in the barbering industry.

**Who This Program Is For:**
- Anyone who enjoys working with people and mastering a craft
- Individuals wanting a licensed career without high tuition costs
- Career starters, youth, adults, or entrepreneurs ready for a trade
- Those who want to learn in a real barbershop environment

**What You'll Learn:**
- Cutting, shaping, shaving, and grooming techniques
- Client consultation and customer service
- Shop sanitation, infection control, and safety
- Business basics and shop professionalism
- Milady RISE modules: DV awareness, human trafficking, infection control

**How the Program Works:**
- Format: On-the-job training + required related instruction
- Length: 9–18 months depending on hours
- Schedule: Flexible based on partner barbershop placement

**Approvals & Funding:**
- Registered with DOL RAPIDS
- Eligible for workforce partnerships where approved
- Employers may sponsor or offset training costs

**Career Outcomes:**
- Licensed Barber (after meeting state requirements)
- Shop Manager
- Future Barber Shop Owner / Educator

---

### CNA (Reference Example)

**Short Description:**
Short-term CNA training that prepares you for entry-level healthcare roles in long-term care, hospitals, and home health.

**Hero Subtitle:**
Learn essential patient care skills through structured training and supportive, hands-on instruction.

**Who This Program Is For:**
- Individuals wanting to start a healthcare career quickly
- Students who enjoy helping people
- Individuals seeking a stepping stone to QMA, LPN, or RN pathways
- Career changers seeking stable employment

**What You'll Learn:**
- Vital signs and basic patient care
- Infection prevention and safety
- Daily living support and mobility assistance
- Medical professionalism and communication
- Clinical skills practice before on-site clinicals

**How the Program Works:**
- Format: Classroom + clinicals
- Length: 4–8 weeks
- Schedule: Day, evening, and weekend options (partner-based)

**Approvals & Funding:**
- Delivered through an approved provider (Choice Medical Institute)
- May be eligible for WorkOne funding depending on location

**Career Outcomes:**
- CNA in long-term care
- Patient Care Technician (with additional credentials)
- Home Health Aide

---

## EXECUTION STEPS

### 1️⃣ FIND ALL PROGRAM PAGES

Scan the codebase for all program-related routes/pages:
- `/app/programs/*` directories
- Any program detail pages
- Look for these programs (and any others you find):
  - HVAC / HVAC Technician
  - Barber / Barber Apprenticeship
  - CNA
  - CDL / Truck Driving
  - Building Maintenance
  - Building Technician
  - Medical Assistant
  - Phlebotomy
  - EKG Technician
  - Pharmacy Technician
  - Dental Assistant
  - Patient Care Technician
  - Sterile Processing
  - CPR Certification
  - Childcare
  - Workforce Readiness
  - Youth Programs
  - Any others

Make a list of all unique program slugs and where their content lives.

---

### 2️⃣ UPDATE/CREATE CENTRALIZED DATA FILE

Check if `app/data/programs.ts` exists. If it does, enhance it. If not, create it.

The file should export:
```typescript
export type Program = {
  slug: string;
  name: string;
  heroTitle: string;
  heroSubtitle: string;
  shortDescription: string;
  heroImage: string;
  heroImageAlt: string;
  duration: string;
  schedule: string;
  delivery: string;
  credential: string;
  approvals: string[];
  fundingOptions: string[];
  highlights: string[];
  whatYouLearn: string[];
  outcomes: string[];
  requirements: string[];
  ctaPrimary: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
};

export const programs: Program[] = [
  // ... program entries
];

export function getProgramBySlug(slug: string): Program | undefined {
  return programs.find((p) => p.slug === slug);
}
```

For EACH program you find:
1. Pull existing content from the current page
2. Rewrite it using the REFERENCE EXAMPLES above as your tone guide
3. Keep it:
   - Clear and human
   - Professional and workforce-friendly
   - Focused on outcomes
   - Free of fluff and jargon
4. Preserve any specific partner names, approval details, or funding info that's already accurate

---

### 3️⃣ REWRITE & HUMANIZE ALL DESCRIPTIONS

For EVERY program, create entries that match this structure:

**A. HERO SECTION**
- `heroTitle`: Clear program name + "Training" or "Apprenticeship" or "Certification"
- `heroSubtitle`: 1-2 sentences explaining what the program is and what it leads to
- `shortDescription`: 1 sentence summary for cards/listings

**B. WHO THIS PROGRAM IS FOR** (`requirements` array)
- 3-5 bullets describing the ideal student
- Use plain language: "You like working with your hands" not "Candidates must demonstrate manual dexterity"

**C. WHAT YOU'LL LEARN** (`whatYouLearn` array)
- 5-7 specific skills or knowledge areas
- Mix technical skills with soft skills (safety, communication, professionalism)

**D. HOW THE PROGRAM WORKS**
- `duration`: Weeks or months
- `schedule`: Day/evening/weekend/flexible
- `delivery`: In-person/hybrid/online/apprenticeship

**E. APPROVALS & FUNDING**
- `approvals`: List real approvals (WIOA, RAPIDS, state-approved, etc.)
- `fundingOptions`: WorkOne, employer sponsorship, self-pay, payment plans
- If unsure, use: "Funding options may be available for eligible students"

**F. CAREER OUTCOMES** (`outcomes` array)
- 3-5 job titles or career pathways
- Start with entry-level, show growth potential

**G. CTAs**
- `ctaPrimary`: "Start [Program] Application" → `/apply?program=[slug]`
- `ctaSecondary`: "Talk to a Career Coach" or "Request Info Session" → `/contact?topic=[slug]`

---

### 4️⃣ UPDATE PROGRAM PAGES TO USE NEW DATA

For each program page (e.g., `app/programs/hvac/page.tsx`):

1. Import the program data:
```typescript
import { getProgramBySlug } from '@/app/data/programs';
```

2. Fetch the program:
```typescript
const program = getProgramBySlug('hvac-technician');
if (!program) return notFound();
```

3. Replace hardcoded text with program data:
```typescript
<h1>{program.heroTitle}</h1>
<p>{program.heroSubtitle}</p>
// etc.
```

4. Ensure consistent layout across all pages:
   - Hero section with image
   - Who This Program Is For
   - What You'll Learn
   - How the Program Works
   - Approvals & Funding
   - Career Outcomes
   - Two clear CTAs

---

### 5️⃣ FIX CTAS

For each program:

**Primary CTA:**
- Label: "Start [Program Name] Application" or "Apply for [Program Name]"
- Link: `/apply?program=[slug]`

**Secondary CTA:**
- Label: "Talk to a Career Coach" or "Request Info Session"
- Link: `/contact?topic=[slug]`

Verify these routes exist in the repo. If `/apply` or `/contact` don't exist, use the closest equivalent.

---

### 6️⃣ QUALITY CHECK

When done:

1. Run `pnpm dev` and check:
   - All program pages load without errors
   - Descriptions are clear, human, and professional
   - No lorem ipsum or placeholder text
   - CTAs work and make sense
   - Images display properly

2. Provide me a summary with:
   - List of all program slugs updated
   - For each program, 1-2 sentence summary of the new description
   - Any programs where information was missing or unclear
   - Any CTAs that need manual review

---

## TONE GUIDELINES

✅ DO:
- Use short, clear sentences
- Write like you're talking to a real person
- Focus on outcomes and real jobs
- Be supportive and encouraging
- Use active voice
- Be specific about what students will learn

❌ DON'T:
- Use jargon or corporate speak
- Make promises you can't keep
- Invent approvals or funding sources
- Use fluffy marketing language
- Write long, complex sentences
- Use passive voice

---

## SCRIPT END

Execute this script now and provide me with a detailed summary when complete.
