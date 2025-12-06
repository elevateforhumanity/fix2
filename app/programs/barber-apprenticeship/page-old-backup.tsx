// app/programs/barber-apprenticeship/page.tsx
import Link from "next/link";
import Image from "next/image";

export default function BarberApprenticeshipPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Banner with Image */}
      <section className="relative h-[500px] w-full overflow-hidden bg-white">
        <Image
          src="/images/beauty/hero-program-barber.jpg"
          alt="Barber Apprenticeship Training"
          fill
          className="object-cover brightness-105"
          priority
          quality={90}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/75 via-white/50 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-12 h-full flex items-center">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-orange-600 mb-3">
              DOL Registered Apprenticeship
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 tracking-tight">
              Barber Apprenticeship
            </h1>
            <p className="text-xl md:text-2xl text-slate-700 mb-6">
              Earn while you learn. 2,000 hours. 100% funded.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/apply" className="bg-orange-500 text-white px-8 py-3 rounded-md font-semibold hover:bg-orange-600 transition-all">
                Apply Now
              </Link>
              <Link href="/contact" className="bg-white text-slate-900 px-8 py-3 rounded-md font-semibold hover:bg-slate-50 border-2 border-slate-300 transition-all">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">

        {/* Overview */}
        <section className="mb-8 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">We Offer Both Pathways</h2>
          <p className="mt-3 text-sm text-slate-700">
            Elevate for Humanity provides <strong>two complete pathways</strong> to becoming a licensed barber in Indiana. 
            Choose the <span className="font-medium">DOL Registered Apprenticeship</span> (2,000 hours, earn while you learn) 
            or our <span className="font-medium">Traditional Barber School</span> (1,500 hours, structured classroom). 
            Both programs meet Indiana state requirements and qualify you for the barber licensing exam.
          </p>
          
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
              <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-green-600">🎓</span> Apprenticeship Program
              </h3>
              <dl className="space-y-2 text-xs">
                <div>
                  <dt className="font-semibold text-slate-900">Format:</dt>
                  <dd className="text-slate-700">On-the-job training in real barbershops</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-900">Hours:</dt>
                  <dd className="text-slate-700">2,000 hours (DOL Registered)</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-900">Income:</dt>
                  <dd className="text-slate-700">Earn wages + tips while training</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-900">Cost:</dt>
                  <dd className="text-slate-700">$0 with WIOA/WRG/JRI funding</dd>
                </div>
              </dl>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
              <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">🏫</span> Traditional School
              </h3>
              <dl className="space-y-2 text-xs">
                <div>
                  <dt className="font-semibold text-slate-900">Format:</dt>
                  <dd className="text-slate-700">Structured classroom instruction</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-900">Hours:</dt>
                  <dd className="text-slate-700">1,500 hours (State requirement)</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-900">Schedule:</dt>
                  <dd className="text-slate-700">Full-time, faster completion</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-900">Cost:</dt>
                  <dd className="text-slate-700">Financial aid assistance available</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-xs text-slate-700">
              <strong>📍 Location:</strong> Indianapolis, IN and partner locations • 
              <strong> 💰 Funding:</strong> WIOA, Workforce Ready Grant, JRI, Pell Grants, and payment plans available for both programs
            </p>
          </div>
        </section>

        {/* How to Get Licensed & Earn While You Learn */}
        <section className="mb-8 grid md:grid-cols-2 gap-6">
          {/* Get Licensed in a Barbershop */}
          <div className="rounded-2xl bg-gradient-to-br from-red-50 to-orange-50 p-6 shadow-sm ring-1 ring-red-100">
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Get Licensed in a Real Barbershop</h3>
                <p className="text-xs text-slate-600 mt-1">Train where professionals work</p>
              </div>
            </div>
            <div className="space-y-3 text-sm text-slate-700">
              <p>
                <span className="font-semibold text-red-700">Complete your 2,000 hours</span> of training directly in active barbershops alongside licensed professionals.
              </p>
              <p>
                Work with real clients, learn shop operations, and build your portfolio while completing Indiana's licensure requirements.
              </p>
              <p>
                <span className="font-semibold text-red-700">Upon completion:</span> You'll be eligible to take the Indiana State Board of Barber Examiners licensing exam and start your career as a licensed barber.
              </p>
              <div className="pt-3 border-t border-red-200">
                <p className="text-xs font-semibold text-red-700 mb-2">Pathway to Licensure:</p>
                <ol className="text-xs space-y-1 text-slate-600">
                  <li>✓ Complete 2,000 apprenticeship hours</li>
                  <li>✓ Pass state board written exam</li>
                  <li>✓ Pass state board practical exam</li>
                  <li>✓ Receive Indiana Barber License</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Earn While You Learn */}
          <div className="rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 p-6 shadow-sm ring-1 ring-green-100">
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Earn While You Learn</h3>
                <p className="text-xs text-slate-600 mt-1">Get paid as you train</p>
              </div>
            </div>
            <div className="space-y-3 text-sm text-slate-700">
              <p>
                <span className="font-semibold text-green-700">Start earning from day one.</span> As a registered apprentice, you'll receive wages while completing your training hours.
              </p>
              <p>
                Your pay increases as you gain skills and experience. Many apprentices earn tips from clients as they progress through the program.
              </p>
              <p>
                <span className="font-semibold text-green-700">No student loan debt.</span> With WIOA, WRG, and JRI funding options, most students complete the program with zero tuition costs while earning income.
              </p>
              <div className="pt-3 border-t border-green-200">
                <p className="text-xs font-semibold text-green-700 mb-2">Income Opportunities:</p>
                <ul className="text-xs space-y-1 text-slate-600">
                  <li>✓ Hourly wages during training</li>
                  <li>✓ Client tips as you advance</li>
                  <li>✓ Commission on services performed</li>
                  <li>✓ Full income potential after licensure</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* What you'll learn */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-slate-900">
            What You&apos;ll Learn
          </h2>
          <p className="mt-3 text-sm text-slate-700">
            This apprenticeship prepares you with the technical, professional,
            and business skills needed to succeed as a licensed barber and
            potential shop or suite owner.
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2 text-xs">
            <ul className="space-y-1.5 text-slate-700">
              <li>• Classic and modern haircuts, fades, tapers, and designs</li>
              <li>• Beard shaping, shaving, and grooming services</li>
              <li>• Sanitation, infection control, and state board standards</li>
              <li>• Client consultation and customer service</li>
            </ul>
            <ul className="space-y-1.5 text-slate-700">
              <li>• Shop management, scheduling, and managing client flow</li>
              <li>• Intro to marketing, branding, and building clientele</li>
              <li>• Suite ownership and small business basics</li>
              <li>• State licensing exam preparation and practice</li>
            </ul>
          </div>
        </section>

        {/* Two Pathways to Licensure */}
        <section className="mb-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 p-6 shadow-sm ring-1 ring-indigo-100">
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Choose Your Path to Becoming a Licensed Barber
          </h2>
          <p className="text-sm text-slate-700 mb-6">
            We offer <strong>two pathways</strong> to Indiana barber licensure. Both programs qualify you for the state licensing exam and include financial aid assistance.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Apprenticeship Path */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 shadow-sm ring-2 ring-green-300">
              <div className="inline-block bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                RECOMMENDED
              </div>
              <h3 className="font-bold text-slate-900 mb-2 text-lg flex items-center gap-2">
                <span className="text-green-500">✓</span> Apprenticeship Program
              </h3>
              <p className="text-xs text-slate-600 mb-3 italic">2,000 hours • DOL Registered</p>
              
              <ul className="space-y-2 text-xs text-slate-700 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Earn while you learn:</strong> Get paid hourly wages + tips from day one</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Zero tuition:</strong> WIOA, WRG, and JRI funding covers all costs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Real shop training:</strong> Work with actual clients in professional barbershops</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Build clientele:</strong> Establish your customer base while training</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>2,000 hours experience:</strong> Graduate with extensive real-world skills</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Job ready:</strong> Already employed with income and established clients</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>DOL credential:</strong> Federally recognized apprenticeship certificate</span>
                </li>
              </ul>

              <div className="bg-white rounded-lg p-3 border border-green-200">
                <p className="text-xs font-semibold text-green-900 mb-1">Total Value:</p>
                <p className="text-xs text-slate-700">
                  <strong>$0 tuition + $20,000-$40,000 earned income</strong> during training = Graduate debt-free with savings
                </p>
              </div>
            </div>

            {/* Traditional School Path */}
            <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-slate-200">
              <h3 className="font-bold text-slate-900 mb-2 text-lg flex items-center gap-2">
                <span className="text-blue-500">✓</span> Traditional Barber School
              </h3>
              <p className="text-xs text-slate-600 mb-3 italic">1,500 hours • Classroom-Based</p>
              
              <ul className="space-y-2 text-xs text-slate-700 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">✓</span>
                  <span><strong>Structured schedule:</strong> Full-time classroom instruction</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">✓</span>
                  <span><strong>Financial aid available:</strong> We help you access grants, loans, and funding</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">✓</span>
                  <span><strong>Faster completion:</strong> Complete in 12-15 months with full-time attendance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">✓</span>
                  <span><strong>Controlled environment:</strong> Practice techniques in a school setting</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">✓</span>
                  <span><strong>1,500 hours:</strong> Meets Indiana state requirements for licensure</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">✓</span>
                  <span><strong>State exam prep:</strong> Focused preparation for licensing exams</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">✓</span>
                  <span><strong>Job placement support:</strong> Career services after graduation</span>
                </li>
              </ul>

              <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                <p className="text-xs font-semibold text-slate-900 mb-1">Investment:</p>
                <p className="text-xs text-slate-700">
                  Tuition costs with <strong>financial aid assistance available</strong> through WIOA, Pell Grants, and payment plans
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-5 bg-white rounded-lg border-l-4 border-indigo-600">
            <h4 className="text-sm font-bold text-indigo-900 mb-3">Why Choose Apprenticeship? The Value Proposition:</h4>
            <div className="grid md:grid-cols-3 gap-4 text-xs">
              <div>
                <p className="font-semibold text-slate-900 mb-1">💰 Financial Advantage</p>
                <p className="text-slate-600">
                  Apprentices earn $20K-$40K during training while traditional students pay tuition. That's a <strong>$30K-$60K swing</strong> in your favor.
                </p>
              </div>
              <div>
                <p className="font-semibold text-slate-900 mb-1">🎯 Real Experience</p>
                <p className="text-slate-600">
                  2,000 hours with real clients vs. 1,500 hours on mannequins. Graduate with an <strong>established clientele</strong> and proven skills.
                </p>
              </div>
              <div>
                <p className="font-semibold text-slate-900 mb-1">🚀 Career Ready</p>
                <p className="text-slate-600">
                  You're already employed and earning. No job search needed. <strong>Start your career on day one</strong> of training.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-indigo-600 text-white rounded-lg">
            <p className="text-sm font-bold mb-2">✓ We Offer Both Programs</p>
            <p className="text-xs">
              <strong>Elevate for Humanity operates both the DOL Registered Apprenticeship AND Traditional Barber School.</strong> 
              The apprenticeship offers financial advantages and real-world experience, while traditional school provides a structured 
              classroom environment. We help you choose the best path for your situation and provide financial aid assistance for both options. 
              Both programs lead to Indiana barber licensure.
            </p>
          </div>
        </section>

        {/* Why this program is different */}
        <section className="mb-8 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">
            Additional Program Benefits
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            <li>
              <span className="font-semibold">Federally aligned:</span> Structured
              as a DOL Registered Apprenticeship and listed in RAPIDS.
            </li>
            <li>
              <span className="font-semibold">State-licensure focused:</span>{" "}
              Built to meet Indiana barbering requirements and prepare you for
              the licensing exam.
            </li>
            <li>
              <span className="font-semibold">Workforce-funded:</span> Eligible
              for WIOA, WRG (where applicable), JRI, and other workforce funding
              streams, potentially reducing or eliminating tuition costs.
            </li>
            <li>
              <span className="font-semibold">Second-chance friendly:</span>{" "}
              Structured to work with re-entry programs and justice-involved
              participants who qualify for JRI support.
            </li>
          </ul>
        </section>

        {/* Who it's for */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-slate-900">
            Who This Program is For
          </h2>
          <p className="mt-3 text-sm text-slate-700">
            This program is designed for individuals who:
          </p>
          <ul className="mt-2 space-y-1.5 text-xs text-slate-700">
            <li>• Want a hands-on, creative career in the grooming industry</li>
            <li>• Are serious about earning a state-recognized barber license</li>
            <li>• Prefer earning while learning instead of traditional student
              loans</li>
            <li>• May be re-entering the workforce or rebuilding after setbacks</li>
            <li>• Dream of owning a barbershop, suite, or mobile grooming brand</li>
          </ul>
        </section>

        {/* CTAs with Pictures */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Why Choose Our Barber Apprenticeship?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* CTA 1 - Hands-On Training */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all">
              <div className="relative h-64">
                <Image
                  src="/images/beauty/program-barber-training.jpg"
                  alt="Hands-On Barber Training"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-bold mb-2">Hands-On Training</h3>
                <p className="text-sm text-white/90 mb-4">Learn from experienced barbers in real shop environments</p>
                <Link href="/apply" className="inline-block bg-red-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-red-700 transition">
                  Start Training
                </Link>
              </div>
            </div>

            {/* CTA 2 - Earn While You Learn */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all">
              <div className="relative h-64">
                <Image
                  src="/images/programs/efh-barber-card.jpg"
                  alt="Earn While You Learn"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-bold mb-2">Earn While You Learn</h3>
                <p className="text-sm text-white/90 mb-4">Get paid as you complete your 2,000-hour apprenticeship</p>
                <Link href="/apply" className="inline-block bg-red-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-red-700 transition">
                  Apply Now
                </Link>
              </div>
            </div>

            {/* CTA 3 - State Licensed */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all">
              <div className="relative h-64">
                <Image
                  src="/images/beauty/hero-program-barber.jpg"
                  alt="State Licensed Barber"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-bold mb-2">State Licensed</h3>
                <p className="text-sm text-white/90 mb-4">Graduate ready to take your Indiana barber license exam</p>
                <Link href="/advising" className="inline-block bg-red-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-red-700 transition">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How to enroll */}
        <section className="mb-10 rounded-2xl bg-slate-900 p-6 text-white">
          <h2 className="text-xl font-bold mb-4">How to Get Started</h2>
          
          <div className="bg-red-600 rounded-xl p-5 mb-6">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <span className="text-2xl">📞</span> Step 1: Call to Express Interest
            </h3>
            <p className="text-sm mb-4">
              Before applying, <strong>call us first</strong> to discuss which program path is right for you 
              (Apprenticeship or Traditional School) and learn about funding options.
            </p>
            <a 
              href="tel:317-314-3757" 
              className="inline-flex items-center gap-2 bg-white text-red-600 px-6 py-3 rounded-full font-bold hover:bg-slate-100 transition text-base"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call 317-314-3757
            </a>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 mb-6">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <span className="text-2xl">🌐</span> Step 2: Apply Through Indiana Connect Now
            </h3>
            <p className="text-sm mb-4">
              After speaking with us, you'll apply through the official Indiana workforce portal to access 
              WIOA, WRG, and other funding programs.
            </p>
            <a 
              href="https://www.indianaconnectnow.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-full font-bold hover:bg-slate-100 transition text-base"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Go to IndianaConnectNow.com
            </a>
          </div>

          <div className="space-y-3 text-sm">
            <h3 className="font-bold text-base mb-3">Complete Enrollment Process:</h3>
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">3</span>
              <div>
                <p className="font-semibold">Meet with an advisor</p>
                <p className="text-xs text-white/80">Review your goals, background, and eligibility for funding options</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">4</span>
              <div>
                <p className="font-semibold">Secure funding & enroll</p>
                <p className="text-xs text-white/80">We work with workforce partners to help reduce or eliminate tuition costs</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">5</span>
              <div>
                <p className="font-semibold">Begin your training</p>
                <p className="text-xs text-white/80">Start your chosen program with a clear plan for licensure and career success</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/20">
            <p className="text-xs text-white/70 mb-3">Have questions? Our team is here to help:</p>
            <div className="flex flex-wrap gap-3">
              <a
                href="tel:317-314-3757"
                className="inline-flex items-center justify-center rounded-full border border-white/50 px-5 py-2 text-xs font-semibold text-white hover:bg-white/10"
              >
                📞 Call Us
              </a>
              <a
                href="mailto:elevate4humanityedu@gmail.com"
                className="inline-flex items-center justify-center rounded-full border border-white/50 px-5 py-2 text-xs font-semibold text-white hover:bg-white/10"
              >
                Talk With an Advisor
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
