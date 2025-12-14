import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Licensing | Elevate for Humanity',
  description:
    "License Elevate for Humanity's proprietary workforce training platform for schools, training providers, and workforce operators.",
};

const TIERS = [
  {
    name: 'Operator License (Single Location)',
    price: '$1,500 setup + $499/month',
    forWho: 'Best for one school, one site, or a single operator.',
    bullets: [
      'Student portal + enrollment + progress tracking',
      'Program pages + application flow',
      'Partner LMS links + structured workflows',
      'Basic reporting + compliance-ready structure',
    ],
    tag: 'Fastest launch',
  },
  {
    name: 'Multi-Site License (Up to 5 Locations)',
    price: '$3,500 setup + $1,250/month',
    forWho: 'Best for organizations operating multiple sites.',
    bullets: [
      'Everything in Operator License',
      'Multi-site reporting and management',
      'Role-based access for staff teams',
      'Expanded program/operator controls',
    ],
    tag: 'Scale-ready',
  },
  {
    name: 'Enterprise / White Label',
    price: '$10,000–$25,000 setup + $2,500+/month',
    forWho: 'Best for workforce agencies or large training networks.',
    bullets: [
      'White-label branding + domain alignment',
      'Custom workflows + program structures',
      'Advanced reporting + governance options',
      'Priority support + implementation planning',
    ],
    tag: 'Institutional',
  },
];

export default function LicensingPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <section className="max-w-3xl">
        <h1 className="text-3xl font-bold text-zinc-900">Platform Licensing</h1>
        <p className="mt-3 text-zinc-700">
          Elevate for Humanity operates a proprietary workforce training and
          apprenticeship platform. Licensing provides defined access under EFH
          ownership and terms — without exposing internal architecture, prompts,
          or operational tradecraft.
        </p>

        <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
          <h2 className="text-lg font-semibold text-zinc-900">
            IP & Access Boundary
          </h2>
          <p className="mt-2 text-sm text-zinc-700">
            Licensing grants platform usage under written terms. It does not
            grant ownership, duplication rights, or permission to replicate EFH
            workflows, automation, or instructional systems.
          </p>
        </div>
      </section>

      {/* Licensing Tiers */}
      <section id="tiers" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Choose Your License
            </h2>
            <p className="text-xl text-slate-600">
              Select the tier that matches your operational needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {TIERS.map((tier, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200"
              >
                <div className="bg-blue-50 px-6 py-3">
                  <span className="text-sm font-bold text-blue-600">
                    {tier.tag}
                  </span>
                </div>

                <div className="p-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {tier.name}
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">{tier.forWho}</p>

                  <div className="mb-6">
                    <div className="text-2xl font-bold text-slate-900">
                      {tier.price}
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {tier.bullets.map((bullet, bulletIdx) => (
                      <li key={bulletIdx} className="flex items-start gap-2">
                        <svg
                          className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-slate-700">{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/partner-with-us"
                    className="block w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition text-center"
                  >
                    Request {tier.name}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Rule */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Key Rule</h2>
          <p className="text-xl text-slate-300">
            You pay for access, not our intellectual property.
          </p>
          <p className="text-lg text-slate-400 mt-4">
            All systems, workflows, and platform infrastructure remain
            proprietary to Elevate for Humanity.
          </p>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            What's Included in All Licenses
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Platform Access
              </h3>
              <p className="text-slate-600">
                Full access to EFH platform infrastructure
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Compliance Ready
              </h3>
              <p className="text-slate-600">
                WIOA, WRG, and apprenticeship workflows
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Onboarding Support
              </h3>
              <p className="text-slate-600">
                Training and setup assistance included
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Partner Integrations
              </h3>
              <p className="text-slate-600">Access to partner course catalog</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Request licensing information or schedule a consultation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/partner-with-us"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700 transition"
            >
              Request License Access
            </Link>
            <a
              href="mailto:licensing@elevateforhumanity.org"
              className="bg-white text-slate-900 px-8 py-4 rounded-lg font-bold hover:bg-slate-100 transition border-2 border-slate-300"
            >
              Contact Licensing Team
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
