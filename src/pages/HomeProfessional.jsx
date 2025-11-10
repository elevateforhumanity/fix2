import { useState } from "react";
import { Helmet } from 'react-helmet-async';

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="bg-white/90 sticky top-0 z-40 backdrop-blur border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-4 lg:px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-sm">EFH</div>
          <span className="font-semibold text-slate-900">Elevate for Humanity</span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#programs" className="text-slate-700 hover:text-slate-900">Programs</a>
          <a href="#how" className="text-slate-700 hover:text-slate-900">How it works</a>
          <a href="#outcomes" className="text-slate-700 hover:text-slate-900">Outcomes</a>
          <a href="#contact" className="text-slate-700 hover:text-slate-900">Contact</a>
          <a href="/get-started" className="inline-flex items-center rounded-md bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700">Apply</a>
        </nav>
        <button className="md:hidden p-2" aria-label="Toggle menu" onClick={() => setOpen(v=>!v)}>
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
        {open && (
          <div className="absolute left-0 right-0 top-16 border-t border-slate-100 bg-white md:hidden">
            <div className="px-4 py-3 grid gap-2">
              <a href="#programs" className="py-2" onClick={() => setOpen(false)}>Programs</a>
              <a href="#how" className="py-2" onClick={() => setOpen(false)}>How it works</a>
              <a href="#outcomes" className="py-2" onClick={() => setOpen(false)}>Outcomes</a>
              <a href="#contact" className="py-2" onClick={() => setOpen(false)}>Contact</a>
              <a href="/get-started" className="mt-2 inline-flex items-center justify-center rounded-md bg-red-600 px-4 py-2 font-medium text-white">Apply</a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 lg:px-6 py-16 lg:py-24 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
            Workforce training that pays you to learn.
          </h1>
          <p className="mt-4 text-lg text-slate-700">
            ETPL-approved programs and DOL-registered apprenticeships in Indiana:
            Barber, HVAC, CNA/HHA, CDL, Business & more. Earn-while-you-learn with real employers.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/get-started" className="inline-flex items-center rounded-lg bg-red-600 px-6 py-3 text-base font-semibold text-white shadow-lg hover:bg-red-700 transition">
              Apply now
            </a>
            <a href="#programs" className="inline-flex items-center rounded-lg border-2 border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-700 hover:border-slate-400 hover:bg-slate-50 transition">
              View programs
            </a>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">ETPL Approved</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">WorkOne Partner</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">DOL Registered</span>
            </div>
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden bg-slate-200 aspect-[4/3] shadow-2xl">
          <img
            src="/images/hero-training.jpg"
            alt="Learners in hands-on training"
            className="h-full w-full object-cover"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}

function Programs() {
  const items = [
    { title: "Barber Apprenticeship", desc: "Earn while you learn with a licensed shop. DOL registered.", href: "/programs/barber" },
    { title: "Building Tech / HVAC", desc: "Facilities, HVAC basics, safety, tools, paid site hours.", href: "/programs/building-tech" },
    { title: "CNA / HHA", desc: "Clinical skills + job placement assistance.", href: "/programs/healthcare" },
    { title: "CDL Prep", desc: "Permit prep, skills coaching, employer partners.", href: "/programs/cdl" },
    { title: "Business & Tax Prep", desc: "Bookkeeping, VITA pathways, career ladders.", href: "/programs/tax-business" },
    { title: "Digital Skills", desc: "AI, office suite, customer service, job readiness.", href: "/programs/digital-skills" }
  ];
  return (
    <section id="programs" className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 lg:px-6 py-16 lg:py-24">
        <h2 className="text-3xl font-bold text-slate-900">Programs</h2>
        <p className="mt-2 text-lg text-slate-700">Short, stackable, and work-aligned tracks.</p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it) => (
            <a key={it.title} href={it.href} className="group rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-lg transition">
              <h3 className="text-lg font-semibold text-slate-900 group-hover:text-red-700">{it.title}</h3>
              <p className="mt-2 text-slate-600">{it.desc}</p>
              <span className="mt-4 inline-flex text-red-700 text-sm font-medium">Learn more →</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "1", t: "Apply", d: "Tell us your goal and location; we check funding options (WIOA, WRG, JRI, OJT/WEX)." },
    { n: "2", t: "Match & Enroll", d: "We place you with a training partner and employer host." },
    { n: "3", t: "Earn & Certify", d: "Paid hours + credential. Job placement help on completion." }
  ];
  return (
    <section id="how" className="bg-white">
      <div className="mx-auto max-w-7xl px-4 lg:px-6 py-16 lg:py-24">
        <h2 className="text-3xl font-bold text-slate-900">How it works</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {steps.map(s => (
            <div key={s.n} className="rounded-2xl border border-slate-200 p-6 bg-slate-50">
              <div className="h-12 w-12 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-xl">{s.n}</div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{s.t}</h3>
              <p className="mt-2 text-slate-600">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Outcomes() {
  const stats = [
    { k: "80%+", v: "Job placement support" },
    { k: "$15–$27", v: "Typical starting hourly range" },
    { k: "6–24 mo", v: "Program duration" }
  ];
  return (
    <section id="outcomes" className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 lg:px-6 py-16 lg:py-24">
        <h2 className="text-3xl font-bold text-slate-900">Outcomes</h2>
        <div className="mt-6 grid sm:grid-cols-3 gap-6">
          {stats.map(x => (
            <div key={x.k} className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
              <div className="text-4xl font-extrabold text-red-700">{x.k}</div>
              <div className="mt-2 text-slate-600 font-medium">{x.v}</div>
            </div>
          ))}
        </div>
        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-slate-700">
            Funding may be available via WorkOne/Next Level Jobs. We also support employer OJT/WEX and apprenticeship wage share models.
          </p>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="bg-white">
      <div className="mx-auto max-w-7xl px-4 lg:px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Let's get you enrolled</h2>
            <p className="mt-2 text-lg text-slate-700">
              Tell us your goal and we'll match funding and a host employer.
            </p>
            <div className="mt-6 space-y-3 text-slate-700">
              <a className="flex items-center gap-2 hover:text-red-700" href="tel:+13173143757">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                (317) 314-3757
              </a>
              <a className="flex items-center gap-2 hover:text-red-700" href="mailto:info@elevateforhumanity.org">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                info@elevateforhumanity.org
              </a>
              <p className="flex items-start gap-2">
                <svg className="h-5 w-5 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                Keystone at the Crossing, Indianapolis, IN
              </p>
            </div>
          </div>

          {/* Netlify Form */}
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            className="rounded-2xl border border-slate-200 p-6 bg-slate-50"
          >
            <input type="hidden" name="form-name" value="contact" />
            <p className="hidden">
              <label>Don't fill this out: <input name="bot-field" /></label>
            </p>
            <div className="grid gap-4">
              <label className="text-sm font-medium text-slate-700">
                Name *
                <input name="name" required className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500" />
              </label>
              <label className="text-sm font-medium text-slate-700">
                Email *
                <input name="email" type="email" required className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500" />
              </label>
              <label className="text-sm font-medium text-slate-700">
                Program interest
                <select name="program" className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500">
                  <option>Barber Apprenticeship</option>
                  <option>Building Tech / HVAC</option>
                  <option>CNA / HHA</option>
                  <option>CDL Prep</option>
                  <option>Business & Tax Prep</option>
                  <option>Digital Skills</option>
                </select>
              </label>
              <label className="text-sm font-medium text-slate-700">
                Message
                <textarea name="message" rows="4" className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500" />
              </label>
              <button type="submit" className="mt-2 inline-flex items-center justify-center rounded-lg bg-red-600 px-6 py-3 text-base font-semibold text-white hover:bg-red-700 transition">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 lg:px-6 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-xs">EFH</div>
              <span className="font-semibold text-white">Elevate for Humanity</span>
            </div>
            <p className="mt-3 text-sm">Workforce training, apprenticeships, and job placement in Indiana.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white">Programs</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a href="/programs/barber" className="hover:text-red-400">Barber Apprenticeship</a></li>
              <li><a href="/programs/building-tech" className="hover:text-red-400">Building Tech / HVAC</a></li>
              <li><a href="/programs/healthcare" className="hover:text-red-400">CNA / HHA</a></li>
              <li><a href="/programs/cdl" className="hover:text-red-400">CDL Prep</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white">Organization</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a href="/about" className="hover:text-red-400">About</a></li>
              <li><a href="/partners" className="hover:text-red-400">Partners</a></li>
              <li><a href="/legal/privacy" className="hover:text-red-400">Privacy</a></li>
              <li><a href="/legal/terms-of-use" className="hover:text-red-400">Terms</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white">Contact</h4>
            <p className="mt-3 text-sm">Keystone at the Crossing<br/>Indianapolis, IN</p>
            <a className="block mt-2 text-sm hover:text-red-400" href="tel:+13173143757">(317) 314-3757</a>
            <a className="block text-sm hover:text-red-400" href="mailto:info@elevateforhumanity.org">info@elevateforhumanity.org</a>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-800 pt-6 text-xs text-slate-400">
          © {new Date().getFullYear()} Elevate for Humanity. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default function HomeProfessional() {
  return (
    <>
      <Helmet>
        <title>Elevate for Humanity — Workforce Training & Apprenticeships | Indianapolis</title>
        <meta name="description" content="State-approved workforce training, apprenticeships, and earn-while-you-learn programs in Indiana. ETPL-approved tracks: Barber, HVAC, CNA, CDL, Business & more." />
      </Helmet>
      <Header />
      <Hero />
      <Programs />
      <HowItWorks />
      <Outcomes />
      <Contact />
      <Footer />
    </>
  );
}
