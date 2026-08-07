import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

const SITE_URL = 'https://www.elevateforhumanity.org';
const FOUNDER_URL = `${SITE_URL}/founder`;

export const metadata: Metadata = {
  title: 'Elizabeth Greene | Founder & CEO of Elevate for Humanity',
  description:
    'Elizabeth Greene is the Founder and CEO of Elevate for Humanity, an Indianapolis workforce development and career training organization focused on funded training, registered apprenticeships, testing, and career pathways.',
  alternates: {
    canonical: FOUNDER_URL,
  },
  openGraph: {
    title: 'Elizabeth Greene | Founder & CEO of Elevate for Humanity',
    description:
      'Meet Elizabeth Greene, Founder and CEO of Elevate for Humanity in Indianapolis, Indiana.',
    url: FOUNDER_URL,
    siteName: 'Elevate for Humanity',
    type: 'profile',
    images: [
      {
        url: `${SITE_URL}/images/team/founder/elizabeth-greene-founder-hero-01.jpg`,
        width: 1200,
        height: 630,
        alt: 'Elizabeth Greene, Founder and CEO of Elevate for Humanity',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elizabeth Greene | Founder & CEO of Elevate for Humanity',
    description:
      'Founder and CEO of Elevate for Humanity, an Indianapolis workforce development and career training organization.',
    images: [`${SITE_URL}/images/team/founder/elizabeth-greene-founder-hero-01.jpg`],
  },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${FOUNDER_URL}#person`,
  name: 'Elizabeth Greene',
  url: FOUNDER_URL,
  image: `${SITE_URL}/images/team/founder/elizabeth-greene-founder-hero-01.jpg`,
  jobTitle: 'Founder and Chief Executive Officer',
  worksFor: {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Elevate for Humanity',
    url: SITE_URL,
  },
  founder: {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Elevate for Humanity',
    url: SITE_URL,
  },
  knowsAbout: [
    'Workforce development',
    'Career and technical education',
    'Registered apprenticeships',
    'Workforce funding navigation',
    'Career certification programs',
  ],
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'Elevate for Humanity',
  url: SITE_URL,
  founder: {
    '@id': `${FOUNDER_URL}#person`,
  },
  areaServed: {
    '@type': 'State',
    name: 'Indiana',
  },
};

export default function FounderPage() {
  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />

      <section className="border-b border-gray-200 bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-[0.85fr_1.15fr] md:items-center md:py-20">
          <div className="relative min-h-[420px] overflow-hidden rounded-2xl bg-slate-900 shadow-2xl">
            <Image
              src="/images/team/founder/elizabeth-greene-founder-hero-01.jpg"
              alt="Elizabeth Greene, Founder and CEO of Elevate for Humanity"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 42vw"
              className="object-cover"
            />
          </div>

          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-orange-300">
              Founder & Chief Executive Officer
            </p>
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Elizabeth Greene
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-200">
              Elizabeth Greene is the Founder and CEO of Elevate for Humanity,
              an Indianapolis workforce development and career training
              organization focused on connecting people with training,
              certifications, apprenticeships, testing, funding pathways, and
              employment preparation.
            </p>
            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300">
              Her work centers on making workforce systems easier to navigate for
              students, employers, apprenticeship partners, training providers,
              and public workforce agencies.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 font-bold text-slate-950 transition hover:bg-slate-100"
              >
                About Elevate
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/programs"
                className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-5 py-3 font-bold text-white transition hover:bg-white/10"
              >
                View Programs
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_0.65fr]">
          <article>
            <h2 className="text-3xl font-black text-slate-950">
              Leadership in workforce development
            </h2>
            <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
              <p>
                Greene founded Elevate for Humanity to create a more direct path
                between career training, public workforce resources, industry
                credentials, apprenticeship opportunities, and employment.
              </p>
              <p>
                Elevate for Humanity operates as a career and technical workforce
                organization rather than a traditional degree-granting college.
                Its model emphasizes occupational training, credential preparation,
                registered apprenticeship coordination, testing services, and
                navigation of eligible workforce funding programs.
              </p>
              <p>
                Elevate is approved to participate in Job Ready Indy and maintains
                workforce and apprenticeship activities that are documented on
                the organization&apos;s program, funding, apprenticeship, and
                compliance pages.
              </p>
            </div>

            <h2 className="mt-12 text-3xl font-black text-slate-950">
              Areas of responsibility
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                'Workforce program development and administration',
                'Registered apprenticeship sponsorship and coordination',
                'Career certification and testing partnerships',
                'Workforce funding navigation and participant access',
                'Employer and training-provider partnerships',
                'Technology systems supporting enrollment and training operations',
              ].map((item) => (
                <div
                  key={item}
                  className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-emerald-700" />
                  <span className="font-medium text-slate-800">{item}</span>
                </div>
              ))}
            </div>
          </article>

          <aside className="h-fit rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-7 w-7 text-blue-700" />
              <h2 className="text-xl font-black text-slate-950">
                Verify Elevate
              </h2>
            </div>
            <p className="mt-4 leading-7 text-slate-700">
              Public claims about approvals, funding, apprenticeships, testing,
              and programs should be verified through Elevate&apos;s official
              compliance pages and the responsible issuing agency or credentialing
              organization.
            </p>
            <div className="mt-6 space-y-3">
              <Link
                href="/compliance/center"
                className="block rounded-lg border border-slate-300 bg-white px-4 py-3 font-bold text-slate-900 hover:border-slate-400"
              >
                Compliance Center
              </Link>
              <Link
                href="/apprenticeships"
                className="block rounded-lg border border-slate-300 bg-white px-4 py-3 font-bold text-slate-900 hover:border-slate-400"
              >
                Registered Apprenticeships
              </Link>
              <Link
                href="/jri"
                className="block rounded-lg border border-slate-300 bg-white px-4 py-3 font-bold text-slate-900 hover:border-slate-400"
              >
                Job Ready Indy / JRI
              </Link>
              <Link
                href="/contact"
                className="block rounded-lg border border-slate-300 bg-white px-4 py-3 font-bold text-slate-900 hover:border-slate-400"
              >
                Contact Elevate
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-5xl px-4 py-12 text-center">
          <h2 className="text-2xl font-black text-slate-950">
            Elevate for Humanity
          </h2>
          <p className="mx-auto mt-3 max-w-3xl leading-7 text-slate-700">
            Workforce development, career training, apprenticeships, testing,
            funding navigation, and employment preparation in Indianapolis,
            Indiana.
          </p>
        </div>
      </section>
    </main>
  );
}
