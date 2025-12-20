# Page Polish Checklist

## Quality Standards for All Pages

### 1. Content Quality

- [ ] **No duplicate content** - Each page has unique, valuable information
- [ ] **Student-friendly tone** - Conversational, encouraging, empowering
- [ ] **Clear storytelling** - Problem → Solution → Outcome structure
- [ ] **Facts and data** - Specific numbers, timelines, outcomes
- [ ] **Humanized** - Real stories, testimonials, relatable scenarios

### 2. Visual Structure

- [ ] **Hero section** - Compelling headline + subheadline + CTA
- [ ] **Breadcrumbs** - Navigation path (Home > Section > Page)
- [ ] **Proper headings** - H1 (once), H2, H3 hierarchy
- [ ] **White space** - Not cramped, easy to scan
- [ ] **Responsive** - Mobile-first design

### 3. Images & Media

- [ ] **Proper sizing** - Next.js Image component with sizes prop
- [ ] **Alt text** - Descriptive, accessible
- [ ] **Aspect ratios** - Consistent (16:9 for heroes, 4:3 for cards)
- [ ] **Loading** - Lazy load below fold, priority for hero
- [ ] **Quality** - High resolution, compressed

### 4. Videos

- [ ] **Proper embed** - Responsive iframe or video tag
- [ ] **Aspect ratio** - 16:9 maintained
- [ ] **Controls** - Play/pause visible
- [ ] **Autoplay** - Only for background videos (muted)
- [ ] **Fallback** - Poster image for loading

### 5. CTAs (Call-to-Actions)

- [ ] **Clear action** - "Apply Now", "Get Started", "Learn More"
- [ ] **Prominent placement** - Hero, mid-page, bottom
- [ ] **Contrasting colors** - Orange/blue on white
- [ ] **Button sizing** - Large enough to tap (min 44px height)
- [ ] **Hover states** - Visual feedback

### 6. Highlights & Features

- [ ] **Key benefits** - 3-4 main points with icons
- [ ] **Stats/numbers** - "100% Free", "4-12 Weeks", "$0 Debt"
- [ ] **Visual hierarchy** - Most important info first
- [ ] **Scannable** - Bullet points, short paragraphs

### 7. Page Structure

- [ ] **Semantic HTML** - header, main, section, article, footer
- [ ] **Metadata** - Title, description, OG tags
- [ ] **Schema.org** - Structured data where applicable
- [ ] **Accessibility** - ARIA labels, keyboard navigation

### 8. Alignment & Spacing

- [ ] **Consistent margins** - py-16 for sections, py-8 for subsections
- [ ] **Max width** - max-w-7xl for content, max-w-4xl for text
- [ ] **Grid alignment** - Proper gap spacing (gap-6, gap-8)
- [ ] **Text alignment** - Left for body, center for headlines

### 9. Tone & Voice

- [ ] **Empowering** - "You can do this" not "You should do this"
- [ ] **Direct** - Second person ("You", "Your")
- [ ] **Honest** - No overpromising, realistic expectations
- [ ] **Supportive** - Acknowledge barriers, offer solutions
- [ ] **Action-oriented** - Clear next steps

### 10. Technical

- [ ] **No console errors** - Clean browser console
- [ ] **Fast loading** - < 3s LCP
- [ ] **No broken links** - All hrefs valid
- [ ] **Forms work** - Validation, submission, success states
- [ ] **Mobile tested** - Works on small screens

---

## Page Categories to Audit

### Priority 1: High-Traffic Pages

1. Homepage (/)
2. Programs (/programs)
3. Apply (/apply)
4. Funding pages (/funding/\*)
5. Individual program pages (/programs/\*)

### Priority 2: Student Journey

6. Application success (/apply/success)
7. Application tracking (/apply/track)
8. LMS landing (/lms)
9. Student dashboard (/student/dashboard)
10. Login/signup (/login, /signup)

### Priority 3: Community & Engagement

11. Forums (/forums)
12. Community hub (/community)
13. Study groups (/study-groups)
14. Success stories (/success-stories)
15. Blog (/blog)

### Priority 4: Information Pages

16. About (/about)
17. Team (/team)
18. Platform (/platform)
19. Features (/features)
20. Pricing (/pricing)

### Priority 5: Services

21. Marketplace (/marketplace)
22. Booking (/booking)
23. Career services (/career-services)
24. Mentorship (/mentorship)
25. Tax services (/tax-services)

---

## Common Issues to Fix

### Content Issues

- ❌ Lorem ipsum placeholder text
- ❌ Duplicate content across pages
- ❌ Overly technical jargon
- ❌ Missing CTAs
- ❌ No clear value proposition

### Visual Issues

- ❌ Images without proper sizing
- ❌ Broken image links
- ❌ Inconsistent spacing
- ❌ Poor mobile layout
- ❌ Missing hero sections

### Technical Issues

- ❌ Missing metadata
- ❌ Broken links
- ❌ Console errors
- ❌ Slow loading
- ❌ Accessibility issues

---

## Polish Process

1. **Audit** - Review page against checklist
2. **Document** - Note issues found
3. **Prioritize** - Critical > Important > Nice-to-have
4. **Fix** - Update code
5. **Test** - Verify on live site
6. **Iterate** - Refine based on feedback

---

## Example: Well-Polished Page Structure

```tsx
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Page Title | Elevate for Humanity',
  description: 'Clear, compelling description under 160 characters',
};

export default function PageName() {
  return (
    <main className="min-h-screen">
      {/* Breadcrumbs */}
      <nav className="bg-slate-50 py-3">
        <div className="max-w-7xl mx-auto px-4">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link href="/" className="text-slate-600 hover:text-slate-900">
                Home
              </Link>
            </li>
            <li className="text-slate-400">/</li>
            <li className="text-slate-900 font-semibold">Page Name</li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center">
        <Image
          src="/images/hero.jpg"
          alt="Descriptive alt text"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Clear, Compelling Headline
          </h1>
          <p className="text-xl mb-8">
            Supporting subheadline that explains the value
          </p>
          <Link
            href="/apply"
            className="inline-flex items-center gap-2 px-8 py-4 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition"
          >
            Apply Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose This Program?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="text-center">
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-slate-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8">
            Join hundreds of students who've transformed their careers
          </p>
          <Link
            href="/apply"
            className="inline-flex items-center gap-2 px-8 py-4 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition"
          >
            Apply Now - It's Free <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
```

---

## Next Steps

1. Run automated audit on all pages
2. Prioritize fixes by traffic and importance
3. Create batch update plan
4. Implement fixes systematically
5. Test and verify
6. Deploy and monitor
