// app/page.tsx - Polished Professional Homepage
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* THREE HERO BANNERS */}
      <section className="grid md:grid-cols-3 gap-0">
        {/* Hero Banner 1 - Barber Apprenticeship */}
        <div className="relative h-[400px] overflow-hidden group">
          <Image
            src="/images/hero/hero-barber.jpg"
            alt="Barber Apprenticeship Training"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-end p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-3">
              Barber Apprenticeship
            </h2>
            <p className="text-slate-200 text-sm mb-4 max-w-xs">
              DOL Registered. 2,000-hour program. Earn while you learn.
            </p>
            <Link
              href="/programs/barber-apprenticeship"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-slate-900 font-semibold rounded hover:bg-slate-100 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Hero Banner 2 - Healthcare Training */}
        <div className="relative h-[400px] overflow-hidden group">
          <Image
            src="/images/hero/hero-healthcare.jpg"
            alt="Healthcare Training Programs"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-end p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-3">
              Healthcare Training
            </h2>
            <p className="text-slate-200 text-sm mb-4 max-w-xs">
              CNA certification. State-approved. High-demand careers.
            </p>
            <Link
              href="/programs/barber-apprenticeship"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-slate-900 font-semibold rounded hover:bg-slate-100 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Hero Banner 3 - Skilled Trades */}
        <div className="relative h-[400px] overflow-hidden group">
          <Image
            src="/images/hero/hero-skilled-trades.jpg"
            alt="Skilled Trades Training"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-end p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-3">
              Skilled Trades
            </h2>
            <p className="text-slate-200 text-sm mb-4 max-w-xs">
              HVAC, electrical, plumbing. Hands-on training for high wages.
            </p>
            <Link
              href="/programs/barber-apprenticeship"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-slate-900 font-semibold rounded hover:bg-slate-100 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* HIGHLIGHT STRIP */}
      <section className="py-10 bg-white px-6">
        <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-3">
          <div className="text-center">
            <h3 className="text-sm font-semibold text-slate-900">
              100% Fundable Programs
            </h3>
            <p className="mt-1 text-xs text-slate-600">
              WIOA • WRG • JRI • ETPL Approved
            </p>
          </div>

          <div className="text-center">
            <h3 className="text-sm font-semibold text-slate-900">
              DOL Registered Apprenticeships
            </h3>
            <p className="mt-1 text-xs text-slate-600">
              Barber • Healthcare • Skilled Trades
            </p>
          </div>

          <div className="text-center">
            <h3 className="text-sm font-semibold text-slate-900">
              State + Federal Alignment
            </h3>
            <p className="mt-1 text-xs text-slate-600">
              Indiana Workforce Development + National Compliance
            </p>
          </div>
        </div>
      </section>

      {/* PROGRAM CARDS WITH IMAGES */}
      <section className="py-14 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-semibold text-slate-900">Our Programs</h2>
            <p className="mt-2 text-sm text-slate-600">
              State-approved, federally aligned career pathways
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl bg-white shadow border overflow-hidden">
              <div className="relative h-36 w-full bg-slate-200">
                <Image 
                  src="/images/efh/programs/barber.jpg" 
                  alt="Barber Apprenticeship Training"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold text-slate-900">Barber Apprenticeship</h3>
                <p className="mt-2 text-xs text-slate-700">
                  2,000-hour DOL Registered Apprenticeship. ETPL Fundable. Earn while you learn.
                </p>
                <Link 
                  href="/programs/barber-apprenticeship" 
                  className="text-indigo-600 text-xs mt-2 block font-semibold hover:underline"
                >
                  Learn More →
                </Link>
              </div>
            </div>

            <div className="rounded-xl bg-white shadow border overflow-hidden">
              <div className="relative h-36 w-full bg-slate-200">
                <Image 
                  src="/images/efh/programs/cna.jpg" 
                  alt="CNA Healthcare Training"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold text-slate-900">CNA Training (Choice Med)</h3>
                <p className="mt-2 text-xs text-slate-700">
                  State-approved, workforce fundable healthcare training with clinical placement.
                </p>
                <Link 
                  href="/programs/barber-apprenticeship" 
                  className="text-indigo-600 text-xs mt-2 block font-semibold hover:underline"
                >
                  Learn More →
                </Link>
              </div>
            </div>

            <div className="rounded-xl bg-white shadow border overflow-hidden">
              <div className="relative h-36 w-full bg-slate-200">
                <Image 
                  src="/images/efh/programs/beauty.jpg" 
                  alt="Beauty and Esthetics Training"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold text-slate-900">Beauty & Esthetics Programs</h3>
                <p className="mt-2 text-xs text-slate-700">
                  Nails, esthetics, and beauty pathways with 20+ year instructors.
                </p>
                <Link 
                  href="/programs/barber-apprenticeship" 
                  className="text-indigo-600 text-xs mt-2 block font-semibold hover:underline"
                >
                  Learn More →
                </Link>
              </div>
            </div>

            <div className="rounded-xl bg-white shadow border overflow-hidden">
              <div className="relative h-36 w-full bg-slate-200">
                <Image 
                  src="/images/efh/programs/trades.jpg" 
                  alt="Skilled Trades Training"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold text-slate-900">Building Technician & Trades</h3>
                <p className="mt-2 text-xs text-slate-700">
                  HVAC, electrical, plumbing. Hands-on training for high-wage careers.
                </p>
                <Link 
                  href="/programs/barber-apprenticeship" 
                  className="text-indigo-600 text-xs mt-2 block font-semibold hover:underline"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="py-14 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-slate-900">Who We Serve</h2>
            <p className="mt-2 text-sm text-slate-600">
              Elevate is built for people navigating real barriers
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="text-sm font-semibold text-slate-900">Re-Entry & Justice-Involved</h3>
              <p className="mt-2 text-xs text-slate-700">
                JRI-fundable programs designed for individuals rebuilding after incarceration. 
                We partner with re-entry programs and probation/parole.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="text-sm font-semibold text-slate-900">Career Changers & Underemployed</h3>
              <p className="mt-2 text-xs text-slate-700">
                WIOA and WRG funding available for adults seeking better wages, stability, 
                and career advancement.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="text-sm font-semibold text-slate-900">Young Adults & First-Generation</h3>
              <p className="mt-2 text-xs text-slate-700">
                Skip college debt. Start earning right away with hands-on training and 
                apprenticeships that lead to real jobs.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="text-sm font-semibold text-slate-900">Women, Veterans & Families</h3>
              <p className="mt-2 text-xs text-slate-700">
                Wraparound support including life coaching, mental health referrals, 
                childcare navigation, and housing assistance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-slate-900">What Our Students Say</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl p-5 bg-white border border-slate-200 shadow-sm">
              <p className="text-xs text-slate-700 leading-relaxed">
                "Elevate helped me restart my life. I went from struggling to becoming
                a licensed barber apprentice. They believed in me when no one else did."
              </p>
              <p className="mt-3 text-xs font-semibold text-slate-900">— J. Moore</p>
              <p className="text-xs text-slate-600">Barber Apprentice</p>
            </div>

            <div className="rounded-xl p-5 bg-white border border-slate-200 shadow-sm">
              <p className="text-xs text-slate-700 leading-relaxed">
                "The staff is amazing. They helped me get funding, childcare support,
                and confidence. I'm now working in healthcare and supporting my family."
              </p>
              <p className="mt-3 text-xs font-semibold text-slate-900">— L. Anderson</p>
              <p className="text-xs text-slate-600">CNA Graduate</p>
            </div>
          </div>
        </div>
      </section>

      {/* FUNDING & SUPPORT */}
      <section className="py-14 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-slate-900">
            Funding & Support Available
          </h2>
          <p className="mt-3 text-sm text-slate-600 max-w-2xl mx-auto">
            Most students pay $0 out of pocket. We help you navigate WIOA, Workforce Ready Grant, 
            Justice Reinvestment Initiative, and other funding sources.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3 text-left">
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
              <h3 className="text-xs font-semibold text-slate-900">WIOA Funding</h3>
              <p className="mt-1 text-xs text-slate-700">
                Workforce Innovation & Opportunity Act funding for eligible adults
              </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
              <h3 className="text-xs font-semibold text-slate-900">WRG (Workforce Ready Grant)</h3>
              <p className="mt-1 text-xs text-slate-700">
                Indiana state grant for high-demand career training
              </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
              <h3 className="text-xs font-semibold text-slate-900">JRI Funding</h3>
              <p className="mt-1 text-xs text-slate-700">
                Justice Reinvestment Initiative for justice-involved individuals
              </p>
            </div>
          </div>

          <div className="mt-8">
            <Link 
              href="/funding"
              className="inline-flex items-center text-sm font-semibold text-indigo-600 hover:underline"
            >
              Learn More About Funding Options →
            </Link>
          </div>
        </div>
      </section>

      {/* STRONG CTA */}
      <section className="py-16 bg-indigo-600 text-white text-center px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold">
            Ready to Start Your Career Journey?
          </h2>
          <p className="mt-3 text-sm text-indigo-100">
            Funding is available. Programs fill fast. Take the first step today.
          </p>

          <div className="mt-6 flex justify-center gap-3 flex-wrap">
            <Link 
              href="/apply"
              className="inline-block bg-white text-indigo-700 px-8 py-3 rounded-full text-xs font-semibold shadow hover:bg-slate-100 transition"
            >
              Apply Now
            </Link>
            <Link 
              href="/advising"
              className="inline-block border border-white text-white px-8 py-3 rounded-full text-xs font-semibold hover:bg-white/10 transition"
            >
              Talk to an Advisor
            </Link>
          </div>

          <p className="mt-6 text-xs text-indigo-200">
            Questions? Call <a href="tel:317-314-3757" className="underline font-semibold">317-314-3757</a> or 
            email <a href="mailto:elevateforhumanity.edu@gmail.com" className="underline font-semibold">elevateforhumanity.edu@gmail.com</a>
          </p>
        </div>
      </section>
    </main>
  );
}
