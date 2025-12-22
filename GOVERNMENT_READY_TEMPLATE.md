# 🏛️ Government-Ready Program Page Template

**For:** Workforce boards, government agencies, professional partners  
**Goal:** Clean, professional, scannable, credible

---

## ✅ WHAT GOVERNMENT AGENCIES WANT TO SEE

### 1. Program Credentials
- DOL registration number (if apprenticeship)
- State approval/licensing
- Accreditation
- Compliance certifications

### 2. Clear Metrics
- Duration (exact hours/weeks)
- Cost (exact dollar amount)
- Starting salary range (with sources)
- Job placement rate (if available)
- Completion rate (if available)

### 3. Funding Eligibility
- WIOA eligible? (Yes/No)
- WRG eligible? (Yes/No)
- JRI eligible? (Yes/No)
- What's covered, what's not

### 4. Requirements
- Age requirements
- Education requirements
- Background check requirements
- Drug screening requirements
- Physical requirements (if any)

### 5. Outcomes
- Industry certifications earned
- License obtained
- Job titles graduates qualify for
- Employer partners (if any)

---

## 📐 PROFESSIONAL TEMPLATE

```tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, Clock, DollarSign, Award, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Program Name | Elevate for Humanity',
  description: 'One-line description',
};

export default function ProgramPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Official Credentials Banner */}
      <div className="bg-green-50 border-b border-green-200 py-2">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm">
          <strong>WIOA Approved</strong> | State Licensed | 
          <a href="#" className="text-blue-600 underline ml-1">
            Program #12345
          </a>
        </div>
      </div>

      {/* Hero - Clean & Professional */}
      <section className="py-8 md:py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-2 mb-4">
            <span className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded">
              WIOA Approved
            </span>
            <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded">
              State Licensed
            </span>
          </div>
          
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            Program Name
          </h1>
          
          <p className="text-xl text-slate-600 mb-6">
            One clear sentence describing what this program does
          </p>
          
          {/* Key Metrics - Scannable */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-slate-50 rounded-lg mb-6">
            <div>
              <div className="text-sm text-slate-600 mb-1">Duration</div>
              <div className="text-2xl font-bold text-slate-900">4 weeks</div>
            </div>
            <div>
              <div className="text-sm text-slate-600 mb-1">Cost</div>
              <div className="text-2xl font-bold text-slate-900">$3,200</div>
              <div className="text-xs text-green-600">100% funded</div>
            </div>
            <div>
              <div className="text-sm text-slate-600 mb-1">Starting Pay</div>
              <div className="text-2xl font-bold text-slate-900">$16-20/hr</div>
            </div>
            <div>
              <div className="text-sm text-slate-600 mb-1">Job Growth</div>
              <div className="text-2xl font-bold text-slate-900">8%</div>
              <div className="text-xs text-slate-600">BLS 2023</div>
            </div>
          </div>
          
          <div className="flex gap-4">
            <Link
              href="/apply"
              className="px-8 py-3 bg-brand-orange-600 text-white font-bold rounded-lg hover:bg-brand-orange-700 transition"
            >
              Apply Now
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 bg-white text-slate-900 font-bold rounded-lg border-2 border-slate-300 hover:bg-slate-50 transition"
            >
              Request Information
            </Link>
          </div>
        </div>
      </section>

      {/* Program Overview - Factual */}
      <section className="py-8 md:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* What You'll Learn */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Curriculum
              </h2>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span>Skill or competency</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span>Skill or competency</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span>Skill or competency</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span>Skill or competency</span>
                </li>
              </ul>
            </div>

            {/* Credentials Earned */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Credentials Earned
              </h2>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Award className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                  <span>State License or Certification</span>
                </li>
                <li className="flex items-start gap-2">
                  <Award className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                  <span>Industry Certification</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Funding - Critical for Government */}
      <section className="py-8 md:py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Funding Options
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border-2 border-green-200">
              <h3 className="font-bold text-slate-900 mb-2">WIOA</h3>
              <p className="text-sm text-slate-600 mb-3">
                For low-income adults, dislocated workers, and youth ages 16-24
              </p>
              <div className="text-sm">
                <strong>Covers:</strong> Tuition, books, fees, certifications
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border-2 border-blue-200">
              <h3 className="font-bold text-slate-900 mb-2">WRG</h3>
              <p className="text-sm text-slate-600 mb-3">
                Workforce Ready Grant for Indiana residents
              </p>
              <div className="text-sm">
                <strong>Covers:</strong> Tuition, books, fees
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border-2 border-purple-200">
              <h3 className="font-bold text-slate-900 mb-2">JRI</h3>
              <p className="text-sm text-slate-600 mb-3">
                Justice Reinvestment Initiative for reentry
              </p>
              <div className="text-sm">
                <strong>Covers:</strong> Tuition, books, fees, wraparound support
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements - Clear Checklist */}
      <section className="py-8 md:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Eligibility Requirements
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
              <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center text-white text-sm flex-shrink-0">
                ✓
              </div>
              <span>18+ years old</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
              <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center text-white text-sm flex-shrink-0">
                ✓
              </div>
              <span>High school diploma or GED</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
              <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center text-white text-sm flex-shrink-0">
                ✓
              </div>
              <span>Background check</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
              <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center text-white text-sm flex-shrink-0">
                ✓
              </div>
              <span>Drug screening</span>
            </div>
          </div>
        </div>
      </section>

      {/* Employment Outcomes - Data Driven */}
      <section className="py-8 md:py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Career Outcomes
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">$16-20/hr</div>
              <div className="text-sm text-slate-600">Entry-level salary</div>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">8%</div>
              <div className="text-sm text-slate-600">Job growth (BLS 2023)</div>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">4 weeks</div>
              <div className="text-sm text-slate-600">Time to employment</div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-bold text-slate-900 mb-3">Job Titles</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-white border border-slate-200 rounded text-sm">
                Job Title 1
              </span>
              <span className="px-3 py-1 bg-white border border-slate-200 rounded text-sm">
                Job Title 2
              </span>
              <span className="px-3 py-1 bg-white border border-slate-200 rounded text-sm">
                Job Title 3
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* How to Apply - Simple Steps */}
      <section className="py-8 md:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Application Process
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="w-12 h-12 rounded-full bg-brand-orange-600 text-white flex items-center justify-center text-xl font-bold mb-4">
                1
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Submit Application</h3>
              <p className="text-sm text-slate-600">
                Complete online application form
              </p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-full bg-brand-orange-600 text-white flex items-center justify-center text-xl font-bold mb-4">
                2
              </div>
              <h3 className="font-bold text-slate-900 mb-2">WorkOne Appointment</h3>
              <p className="text-sm text-slate-600">
                Schedule appointment on IndianaCareerConnect.com
              </p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-full bg-brand-orange-600 text-white flex items-center justify-center text-xl font-bold mb-4">
                3
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Start Training</h3>
              <p className="text-sm text-slate-600">
                Begin program within 2-4 weeks
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Professional */}
      <section className="py-8 md:py-12 bg-brand-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Apply?
          </h2>
          <p className="text-xl mb-6 text-white/90">
            Start your application today
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

## 🎯 KEY DIFFERENCES FROM CURRENT PAGES

### What's REMOVED:
- ❌ Marcus's 8,500-word story
- ❌ Personal testimonials
- ❌ Marketing fluff
- ❌ Long paragraphs
- ❌ Excessive spacing (py-20)

### What's ADDED:
- ✅ Official credentials banner
- ✅ Clear metrics (scannable)
- ✅ Funding options (critical for government)
- ✅ Requirements checklist
- ✅ Employment outcomes (data-driven)
- ✅ Professional design
- ✅ Consistent spacing (py-8 md:py-12)

---

## ⚡ IMPLEMENTATION - RIGHT NOW

I'll create this template and apply it to your top 10 programs in the next hour.

**Which programs do you need cleaned up FIRST for your government meetings?**

Give me the list and I'll fix them immediately.