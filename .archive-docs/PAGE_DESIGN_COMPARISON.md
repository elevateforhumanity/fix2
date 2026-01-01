# Page Design Comparison: SkillUp vs Elevate

## The Problem You're Seeing

**SkillUp Pages:** Clean, visual, card-based, lots of images, clear sections  
**Your Pages:** Text-heavy, generic styling, looks like a document

---

## SKILLUP HEALTHCARE PAGE BREAKDOWN

### 1. Hero Section

```
[Large Hero Image with Overlay]
├── Big Headline: "Explore Some of the Best-Paying Healthcare Careers"
├── Subheading: Clear value proposition
└── CTA Button: "Find Your Next Career"
```

**Visual Elements:**

- Full-width hero image
- Professional healthcare photo
- Clear typography hierarchy
- Single prominent CTA

### 2. Career Cards Grid

```
[Grid of Career Cards - 3 columns]

Each Card:
├── Professional Photo (person in role)
├── Job Title (large, bold)
├── Salary: "Avg $48,000/year"
├── Training Time: "Train within 12-24 months"
└── Clickable card (hover effect)
```

**Visual Elements:**

- Real photos of people working
- Consistent card design
- Clear salary info
- Training time prominent
- Hover animations

### 3. Tools Section

```
[3-Column Grid]

Each Tool Card:
├── Relevant Image
├── Tool Name
└── Link to tool
```

**Visual Elements:**

- Icon or image for each tool
- Clean card layout
- Clear purpose

### 4. Testimonials Carousel

```
[Testimonial Cards with Photos]

Each Testimonial:
├── User Photo (circular)
├── Quote (large text)
├── Name
└── Title: "SkillUp User"
```

**Visual Elements:**

- Real user photos
- Circular photo frames
- Quote formatting
- Carousel/slider

### 5. FAQ Section

```
[Accordion-style FAQ]

Each Question:
├── Question (bold, clickable)
└── Answer (expands on click)
```

**Visual Elements:**

- Expandable sections
- Clean typography
- Easy to scan

### 6. Footer

```
[Multi-column Footer]
├── Logo + Nonprofit badges
├── Location links (30+ cities)
├── Navigation columns
└── Social media icons
```

**Visual Elements:**

- Trust badges (Charity Navigator, Candid)
- Clean organization
- Lots of white space

---

## YOUR PROGRAMS PAGE BREAKDOWN

### What You Have (Good)

```
✅ Video background hero
✅ Clear headline
✅ Key highlights (badges)
✅ Story box
✅ Warning boxes (but these are bad)
✅ Category sections
```

### What's Missing (Problems)

#### 1. **No Visual Program Cards**

Your programs are listed as text links, not visual cards.

**SkillUp:**

```
[Card with Image]
├── Photo of person in role
├── Job title
├── Salary
└── Training time
```

**Yours:**

```
Text link: "CNA Certification"
```

#### 2. **No Real Photos**

SkillUp uses real photos of people working. You use generic stock images or no images.

#### 3. **Too Much Text**

Your pages have long paragraphs. SkillUp uses short, scannable sections.

#### 4. **No Salary Information**

SkillUp shows salary on every card. You don't.

#### 5. **No Training Time Badges**

SkillUp shows "Train in Under 12 months". You don't.

#### 6. **Warning Boxes Kill Conversion**

Your 3 warning boxes about appointments create friction. SkillUp has none.

#### 7. **Only Shows 8 Programs**

You have 17 programs but only show 8 examples. SkillUp shows all careers.

---

## WHAT YOU NEED TO ADD

### 1. Program Cards Component

Create `/components/ProgramCard.tsx`:

```tsx
interface ProgramCardProps {
  slug: string;
  name: string;
  image: string;
  salary: string;
  duration: string;
  category: string;
}

export function ProgramCard({
  slug,
  name,
  image,
  salary,
  duration,
  category,
}: ProgramCardProps) {
  return (
    <Link
      href={`/programs/${slug}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-orange-600 transition">
          {name}
        </h3>

        {/* Salary */}
        <div className="flex items-center gap-2 mb-2">
          <DollarSign className="w-5 h-5 text-green-600" />
          <span className="text-lg font-semibold text-slate-700">{salary}</span>
        </div>

        {/* Duration */}
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-blue-600" />
          <span className="text-slate-600">Train in {duration}</span>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-2 text-orange-600 font-semibold group-hover:gap-3 transition-all">
          Learn More
          <ChevronRight className="w-5 h-5" />
        </div>
      </div>
    </Link>
  );
}
```

### 2. Programs Grid Layout

Update `/app/programs/page.tsx`:

```tsx
export default function ProgramsPage() {
  return (
    <main>
      {/* Hero Section - Keep your video hero, it's good */}

      {/* Programs Grid - NEW */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Explore All Programs
            </h2>
            <p className="text-xl text-slate-600">
              Choose from 17 career training programs
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button className="px-6 py-3 bg-orange-500 text-white rounded-full font-semibold">
              All Programs
            </button>
            <button className="px-6 py-3 bg-white text-slate-700 rounded-full font-semibold hover:bg-slate-100">
              Healthcare
            </button>
            <button className="px-6 py-3 bg-white text-slate-700 rounded-full font-semibold hover:bg-slate-100">
              Skilled Trades
            </button>
            <button className="px-6 py-3 bg-white text-slate-700 rounded-full font-semibold hover:bg-slate-100">
              Beauty & Wellness
            </button>
            <button className="px-6 py-3 bg-white text-slate-700 rounded-full font-semibold hover:bg-slate-100">
              Business & Finance
            </button>
          </div>

          {/* Programs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program) => (
              <ProgramCard
                key={program.slug}
                slug={program.slug}
                name={program.name}
                image={program.heroImage}
                salary="$45,000/year avg"
                duration={program.duration}
                category="Healthcare"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Remove Warning Boxes - Put in FAQ instead */}

      {/* Keep your other sections */}
    </main>
  );
}
```

### 3. Add Salary Data to Programs

Update `/app/data/programs.ts`:

```typescript
export type Program = {
  // ... existing fields
  averageSalary: string; // "ADD THIS"
  salaryRange: string; // "ADD THIS"
  jobGrowth: string; // "ADD THIS"
  // ... rest
};

export const programs: Program[] = [
  {
    slug: 'cna-certification',
    name: 'Certified Nursing Assistant (CNA)',
    averageSalary: '$35,000/year', // ADD
    salaryRange: '$28,000 - $42,000', // ADD
    jobGrowth: '+8% (Faster than average)', // ADD
    // ... rest
  },
  // ... other programs
];
```

### 4. Add Real Photos

**Current:** Generic stock photos  
**Need:** Real photos of people in these careers

**Where to get them:**

- Unsplash (free, high quality)
- Pexels (free, high quality)
- Your own students (with permission)
- Partner organizations

**Photo Requirements:**

- Real people working in the role
- Professional but authentic
- Diverse representation
- High resolution (at least 1200px wide)

### 5. Testimonials Section

Add to programs page:

```tsx
<section className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-4">
    <h2 className="text-4xl font-bold text-center mb-12">Success Stories</h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {testimonials.map((testimonial) => (
        <div key={testimonial.id} className="bg-slate-50 rounded-2xl p-8">
          <div className="flex items-center gap-4 mb-4">
            <Image
              src={testimonial.photo}
              alt={testimonial.name}
              width={60}
              height={60}
              className="rounded-full"
            />
            <div>
              <div className="font-bold text-slate-900">{testimonial.name}</div>
              <div className="text-sm text-slate-600">
                {testimonial.program}
              </div>
            </div>
          </div>
          <p className="text-slate-700 leading-relaxed">
            "{testimonial.quote}"
          </p>
        </div>
      ))}
    </div>
  </div>
</section>
```

### 6. FAQ Section (Move Warning Boxes Here)

```tsx
<section className="py-20 bg-slate-50">
  <div className="max-w-4xl mx-auto px-4">
    <h2 className="text-4xl font-bold text-center mb-12">
      Frequently Asked Questions
    </h2>

    <div className="space-y-4">
      <details className="bg-white rounded-xl p-6 cursor-pointer">
        <summary className="font-bold text-lg text-slate-900">
          Do I need to schedule a WorkOne appointment?
        </summary>
        <p className="mt-4 text-slate-600">
          Yes, for WIOA-funded programs, you'll need to schedule an appointment
          with your local WorkOne office. We'll help you with this process after
          you apply.
        </p>
      </details>

      <details className="bg-white rounded-xl p-6 cursor-pointer">
        <summary className="font-bold text-lg text-slate-900">
          Is this really 100% free?
        </summary>
        <p className="mt-4 text-slate-600">
          Yes! All programs are fully funded through WIOA, Workforce Ready
          Grant, or other workforce development funding. No tuition. No student
          debt.
        </p>
      </details>

      {/* More FAQs */}
    </div>
  </div>
</section>
```

---

## VISUAL DESIGN PRINCIPLES

### SkillUp Uses:

1. **Cards everywhere** - Everything is a card with image, title, description
2. **Real photos** - People working, not generic stock
3. **White space** - Lots of breathing room
4. **Clear hierarchy** - Big headlines, smaller subheads, body text
5. **Consistent spacing** - Same padding/margins everywhere
6. **Hover effects** - Cards lift on hover
7. **Color coding** - Categories have colors
8. **Icons** - Visual indicators for salary, time, etc.
9. **Badges** - Trust signals, certifications
10. **Testimonials** - Real user photos and quotes

### You Need to Add:

1. ✅ **Program cards** with images
2. ✅ **Salary information** on every card
3. ✅ **Training duration** badges
4. ✅ **Real photos** of people working
5. ✅ **Hover effects** on cards
6. ✅ **Filter/category** tabs
7. ✅ **Show all 17 programs** not just 8
8. ✅ **Remove warning boxes** (move to FAQ)
9. ✅ **Add testimonials** with photos
10. ✅ **More white space** less text

---

## QUICK WINS (Do These First)

### 1. Create Program Cards (1 day)

- Design card component
- Add to programs page
- Show all 17 programs

### 2. Add Salary Data (2 hours)

- Research average salaries
- Add to program data
- Display on cards

### 3. Get Better Photos (1 day)

- Download from Unsplash/Pexels
- Or take photos of your students
- Replace generic images

### 4. Remove Warning Boxes (30 minutes)

- Delete from programs page
- Move to FAQ section
- Reduce friction

### 5. Add Testimonials (1 day)

- Get student photos and quotes
- Create testimonial component
- Add to programs page

---

## BEFORE & AFTER COMPARISON

### BEFORE (Current)

```
Programs Page:
├── Video hero (good)
├── Warning box (bad)
├── Warning box (bad)
├── Warning box (bad)
├── Healthcare section
│   ├── Text: "CNA Certification"
│   └── Text: "Medical Assistant"
├── Skilled Trades section
│   ├── Text: "HVAC Technician"
│   └── Text: "CDL Training"
└── Contact info
```

**Problems:**

- Only 8 of 17 programs shown
- No images
- No salary info
- Warning boxes create friction
- Looks like a text document

### AFTER (Proposed)

```
Programs Page:
├── Video hero (keep)
├── Filter tabs (Healthcare, Trades, Beauty, Business)
├── Programs Grid (17 cards)
│   ├── [Card: CNA - Photo, $35K/year, 4-8 weeks]
│   ├── [Card: Medical Assistant - Photo, $44K/year, 21 days]
│   ├── [Card: HVAC - Photo, $52K/year, 4-9 months]
│   └── [15 more cards...]
├── Success Stories (3 testimonials with photos)
├── Tools Section (Program Finder, Compare, Apply)
└── FAQ (warning info moved here)
```

**Improvements:**

- All 17 programs visible
- Visual cards with photos
- Salary info on every card
- No friction (warnings in FAQ)
- Looks professional and polished

---

## IMPLEMENTATION PLAN

### Week 1: Core Components

- [ ] Create ProgramCard component
- [ ] Add salary data to all programs
- [ ] Download/source better photos
- [ ] Update programs page layout

### Week 2: Visual Polish

- [ ] Add hover effects
- [ ] Add filter tabs
- [ ] Create testimonials section
- [ ] Move warnings to FAQ

### Week 3: Content

- [ ] Write better program descriptions
- [ ] Get real student testimonials
- [ ] Take photos of students (with permission)
- [ ] Add success metrics

### Week 4: Testing

- [ ] Test on mobile
- [ ] Test all links
- [ ] Get user feedback
- [ ] A/B test layouts

---

## KEY TAKEAWAY

**Your content is good. Your design is generic.**

SkillUp looks professional because:

- Visual cards with images
- Clear salary information
- Real photos of people
- Lots of white space
- Consistent design system

You need to:

- Make everything visual (cards, not text)
- Add salary info everywhere
- Get better photos
- Remove friction (warning boxes)
- Show all programs, not just samples

**It's not about having more content. It's about presenting it better.**
