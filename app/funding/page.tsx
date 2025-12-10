import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.elevateforhumanity.org/funding",
  },
  title: 'Free Training Funding | Elevate For Humanity',
  description: '100% free career training through WRG, WIOA, and other funding programs. No tuition, no debt. Real stories from real students.',
};

export default function FundingPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/images/heroes/success-story-1.jpg"
          alt="Students succeeding with free training"
          fill
          className="object-cover"
          quality={100}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-slate-900/60" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            "I Thought I Couldn't Afford Training"
          </h1>
          <p className="text-xl mb-8">
            Then I learned about free funding. Now I'm a Medical Assistant making $42,000/year.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-2xl text-slate-700 mb-6 leading-relaxed">
            Most people don't know this: <strong>You can get career training for FREE.</strong>
          </p>
          <p className="text-lg text-slate-600 mb-6">
            Not "free with a catch." Not "free if you work for us for 5 years." Actually free. The government pays for it. Employers pay for it. Grants pay for it. You just have to know where to look.
          </p>
          <p className="text-lg text-slate-600 mb-6">
            We've helped thousands of students access 100% free training through programs like WRG (Workforce Ready Grant), WIOA (Workforce Innovation and Opportunity Act), and employer partnerships. No loans. No debt. Just training that leads to real jobs.
          </p>
        </div>
      </section>

      {/* Funding Options */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">3 Ways to Get Free Training</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* WRG */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg">
              <div className="relative h-48">
                <Image
                  src="/images/heroes/student-career.jpg"
                  alt="WRG Workforce Ready Grant"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-green-700">WRG - Workforce Ready Grant</h3>
                <p className="text-slate-700 mb-4">
                  <strong>Who qualifies:</strong> Indiana residents with a high school diploma or GED. No income limits. No age limits.
                </p>
                <p className="text-slate-600 mb-4">
                  <strong>What it covers:</strong> 100% of tuition for short-term training (4-12 weeks). Books, fees, certifications included.
                </p>
                <div className="bg-green-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-green-900">
                    <strong>Real Example:</strong> Maria, 34, single mom. Used WRG to become a Medical Assistant in 21 days. Now earning $42K/year at a clinic in Indianapolis.
                  </p>
                </div>
                <Link
                  href="/funding/wrg"
                  className="block text-center px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all"
                >
                  Learn More About WRG
                </Link>
              </div>
            </div>

            {/* WIOA */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg">
              <div className="relative h-48">
                <Image
                  src="/images/heroes/success-story-2.jpg"
                  alt="WIOA Workforce Innovation"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-blue-700">WIOA - Workforce Innovation</h3>
                <p className="text-slate-700 mb-4">
                  <strong>Who qualifies:</strong> Unemployed, underemployed, or facing barriers to employment (laid off, low income, disability, etc.)
                </p>
                <p className="text-slate-600 mb-4">
                  <strong>What it covers:</strong> Tuition, books, transportation, childcare, and support services. Longer programs (up to 2 years).
                </p>
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-blue-900">
                    <strong>Real Example:</strong> James, 28, laid off from factory job. WIOA paid for his HVAC training. Now earning $55K/year with benefits.
                  </p>
                </div>
                <Link
                  href="/funding/wioa"
                  className="block text-center px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all"
                >
                  Learn More About WIOA
                </Link>
              </div>
            </div>

            {/* Employer Partnerships */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg">
              <div className="relative h-48">
                <Image
                  src="/images/heroes/training-provider-1.jpg"
                  alt="Employer-Paid Training"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-orange-700">Employer-Paid Training</h3>
                <p className="text-slate-700 mb-4">
                  <strong>Who qualifies:</strong> Anyone willing to work for a hiring employer after training. No experience required.
                </p>
                <p className="text-slate-600 mb-4">
                  <strong>What it covers:</strong> Employer pays for training upfront. You get hired immediately after graduation. Earn while you learn.
                </p>
                <div className="bg-orange-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-orange-900">
                    <strong>Real Example:</strong> Keisha, 25, no college degree. Local hospital paid for her CNA training. Started working 3 weeks later at $18/hour.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="block text-center px-6 py-3 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-all"
                >
                  Ask About Employer Programs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How to Get Free Training (Step-by-Step)</h2>
          
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">1</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Contact Us</h3>
                <p className="text-slate-600">
                  Call <a href="tel:3173143757" className="text-orange-600 font-bold">317-314-3757</a> or fill out our contact form. Tell us what program you're interested in.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">2</div>
              <div>
                <h3 className="text-xl font-bold mb-2">We Check Your Eligibility</h3>
                <p className="text-slate-600">
                  We'll ask a few questions (Indiana resident? High school diploma? Employment status?) and tell you which funding you qualify for.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">3</div>
              <div>
                <h3 className="text-xl font-bold mb-2">We Handle the Paperwork</h3>
                <p className="text-slate-600">
                  We help you apply for WRG, WIOA, or employer funding. We know the process inside and out. Most students get approved within 1-2 weeks.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">4</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Start Training (For Free)</h3>
                <p className="text-slate-600">
                  Once approved, you start training immediately. No tuition bills. No loans. Just focus on learning and getting certified.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Common Questions</h2>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">Do I have to pay it back?</h3>
              <p className="text-slate-600">
                No. WRG and WIOA are grants, not loans. You never pay them back. Employer-paid training may require you to work for that employer for a certain period (usually 6-12 months), but there's no debt.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">What if I have bad credit or past debt?</h3>
              <p className="text-slate-600">
                Doesn't matter. WRG and WIOA don't check credit. They're based on eligibility criteria like residency, employment status, and barriers to employment.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">Can I work while in training?</h3>
              <p className="text-slate-600">
                Yes. Most of our programs are hybrid (online + hands-on), so you can study around your work schedule. Some programs like Registered Apprenticeships actually pay you while you train.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">What if I don't qualify for any funding?</h3>
              <p className="text-slate-600">
                We offer payment plans and accept Affirm, Klarna, Afterpay, PayPal, and other flexible payment options. Most programs cost $4,000-$5,000 total, which you can split into monthly payments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Find Out If You Qualify</h2>
          <p className="text-xl mb-8">Takes 5 minutes. No commitment required.</p>
          <Link
            href="/contact"
            className="inline-block px-10 py-5 bg-white text-orange-600 font-bold rounded-lg hover:bg-gray-100 transition-all text-lg shadow-xl"
          >
            Check My Eligibility
          </Link>
          <p className="mt-6 text-white/90">
            Or call us: <a href="tel:3173143757" className="font-bold underline">317-314-3757</a>
          </p>
        </div>
      </section>
    </main>
  );
}
