import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Licensing | Elevate for Humanity",
  description:
    "License Elevate for Humanity's proprietary workforce training platform for schools, training providers, and workforce operators.",
};

const TIERS = [
  {
    name: "Operator License (Single Location)",
    price: "$1,500 setup + $499/month",
    forWho: "Best for one school, one site, or a single operator.",
    bullets: [
      "Student portal + enrollment + progress tracking",
      "Program pages + application flow",
      "Partner LMS links + structured workflows",
      "Basic reporting + compliance-ready structure",
    ],
    tag: "Fastest launch",
  },
  {
    name: "Multi-Site License (Up to 5 Locations)",
    price: "$3,500 setup + $1,250/month",
    forWho: "Best for organizations operating multiple sites.",
    bullets: [
      "Everything in Operator License",
      "Multi-site reporting and management",
      "Role-based access for staff teams",
      "Expanded program/operator controls",
    ],
    tag: "Scale-ready",
  },
  {
    name: "Enterprise / White Label",
    price: "$10,000–$25,000 setup + $2,500+/month",
    forWho: "Best for workforce agencies or large training networks.",
    bullets: [
      "White-label branding + domain alignment",
      "Custom workflows + program structures",
      "Advanced reporting + governance options",
      "Priority support + implementation planning",
    ],
    tag: "Institutional",
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
            {LICENSING_TIERS.map((tier) => {
              const Icon = tier.icon;
              return (
                <div
                  key={tier.id}
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden ${
                    tier.popular ? 'ring-2 ring-blue-600' : ''
                  }`}
                >
                  {tier.popular && (
                    <div className="bg-blue-600 text-white text-center py-2 text-sm font-bold">
                      MOST POPULAR
                    </div>
                  )}
                  
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">
                          {tier.name}
                        </h3>
                        <p className="text-sm text-slate-600">{tier.subtitle}</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-slate-900">
                          {tier.price}
                        </span>
                        <span className="text-slate-600">{tier.period}</span>
                      </div>
                      <p className="text-sm text-slate-600 mt-1">{tier.setup}</p>
                    </div>

                    <p className="text-slate-700 mb-6">{tier.description}</p>

                    <ul className="space-y-3 mb-8">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => setSelectedTier(tier.id)}
                      className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition"
                    >
                      Request {tier.name}
                    </button>
                  </div>
                </div>
              );
            })}
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
            All systems, workflows, and platform infrastructure remain proprietary to Elevate for Humanity.
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
                <Shield className="w-8 h-8 text-blue-600" />
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
                <Check className="w-8 h-8 text-green-600" />
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
                <Building2 className="w-8 h-8 text-purple-600" />
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
                <Globe className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Partner Integrations
              </h3>
              <p className="text-slate-600">
                Access to partner course catalog
              </p>
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

      {/* Modal for selected tier */}
      {selectedTier && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Request License Access
            </h3>
            <p className="text-slate-600 mb-6">
              You've selected: <strong>{LICENSING_TIERS.find(t => t.id === selectedTier)?.name}</strong>
            </p>
            <p className="text-slate-700 mb-6">
              Please complete our partner inquiry form to proceed with licensing.
            </p>
            <div className="flex gap-4">
              <Link
                href="/partner-with-us"
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition text-center"
              >
                Continue to Form
              </Link>
              <button
                onClick={() => setSelectedTier(null)}
                className="flex-1 bg-slate-100 text-slate-900 px-6 py-3 rounded-lg font-bold hover:bg-slate-200 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
