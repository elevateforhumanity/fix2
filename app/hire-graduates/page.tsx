import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Hire Job-Ready Graduates | Elevate for Humanity",
  description: "Access pre-screened, certified talent trained in healthcare, skilled trades, beauty, and business. Reduce hiring costs with workforce funding.",
};

export default function HireGraduatesPage() {
  const talentPools = [
    {
      title: "Healthcare Professionals",
      roles: ["Certified Nursing Assistants (CNA)", "Medical Assistants", "Patient Care Technicians", "Phlebotomists"],
      certifications: ["State-certified", "CPR/First Aid", "HIPAA trained", "Clinical experience completed"],
      image: "/images/programs-new/program-1.jpg",
      avgPlacementTime: "2-3 weeks",
    },
    {
      title: "Skilled Trades",
      roles: ["HVAC Technicians", "Building Maintenance Techs", "CDL Drivers", "Construction Workers"],
      certifications: ["EPA 608 certified", "OSHA 10/30", "Industry credentials", "Hands-on training completed"],
      image: "/images/programs-new/program-16.jpg",
      avgPlacementTime: "1-2 weeks",
    },
    {
      title: "Beauty & Personal Care",
      roles: ["Licensed Barbers", "Cosmetologists", "Estheticians", "Salon Managers"],
      certifications: ["State licensed", "1500+ hours training", "Client-ready skills", "Business fundamentals"],
      image: "/images/programs-new/program-11.jpg",
      avgPlacementTime: "1-3 weeks",
    },
    {
      title: "Business & Finance",
      roles: ["Tax Preparers", "Bookkeepers", "Customer Service Reps", "Administrative Assistants"],
      certifications: ["IRS VITA certified", "QuickBooks trained", "Professional communication", "Office software proficient"],
      image: "/images/programs-new/program-5.jpg",
      avgPlacementTime: "2-4 weeks",
    },
  ];

  const benefits = [
    {
      icon: "💰",
      title: "Get 240-480 FREE Hours of Work",
      description: "Through OJT grants, receive 50-75% wage reimbursement for 3-6 months. That's up to 480 hours of essentially FREE labor while training your new hire.",
      highlight: "Save $3,000-$8,000 per hire",
    },
    {
      icon: "🎁",
      title: "Workforce Grants Cover Training Costs",
      description: "WIOA, WRG, and employer training grants pay for employee training, certifications, and onboarding. You pay nothing upfront.",
      highlight: "Zero training costs",
    },
    {
      icon: "⏱️",
      title: "Try Before You Commit",
      description: "WEX (Work Experience) programs let you evaluate candidates for 120-240 hours with 100% wage reimbursement before making a permanent hire.",
      highlight: "Risk-free trial period",
    },
    {
      icon: "✅",
      title: "Pre-Screened & Certified",
      description: "All candidates complete background checks, drug screening, and industry certifications before placement. No screening costs for you.",
      highlight: "Ready to work day 1",
    },
    {
      icon: "📋",
      title: "We Handle All Paperwork",
      description: "We manage all grant applications, compliance reporting, and reimbursement processing. You just focus on training your new employee.",
      highlight: "Zero administrative burden",
    },
    {
      icon: "🤝",
      title: "Retention Bonuses Available",
      description: "Some programs offer additional bonuses ($500-$2,000) when you retain employees for 6-12 months. More savings for successful hires.",
      highlight: "Extra cash for retention",
    },
  ];

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-500 to-red-600 text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div>
              <div className="inline-flex items-center rounded-full bg-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-wide mb-4">
                For Employers
              </div>
              <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">
                Hire Job-Ready Graduates Today
              </h1>
              <p className="mt-4 text-lg text-white/90 md:text-xl">
                Access pre-screened, certified talent trained in high-demand careers. Reduce hiring costs by up to 75% with workforce funding.
              </p>
              
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/contact?topic=hire-graduates"
                  className="rounded-full bg-white px-8 py-4 text-base font-semibold text-orange-600 hover:bg-orange-50 shadow-xl"
                >
                  Request Candidates
                </Link>
                <Link
                  href="/employer/opportunities"
                  className="rounded-full border-2 border-white bg-white/10 backdrop-blur px-8 py-4 text-base font-semibold text-white hover:bg-white/20"
                >
                  View Talent Pools
                </Link>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-3xl font-bold">500+</p>
                  <p className="text-sm text-white/80">Graduates Annually</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">85%</p>
                  <p className="text-sm text-white/80">Placement Rate</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">90%</p>
                  <p className="text-sm text-white/80">Retention at 6 Months</p>
                </div>
              </div>
            </div>

            <div className="relative aspect-square max-w-lg mx-auto">
              <Image
                src="/images/artlist/hero-training-2.jpg"
                alt="Job-ready graduates"
                fill
                className="rounded-2xl object-cover shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Grants Highlight Section */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-4">
          <div className="rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center rounded-full bg-green-500 px-4 py-2 text-sm font-bold text-white mb-4">
                💰 EMPLOYER GRANTS AVAILABLE
              </div>
              <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
                Hire for FREE with Workforce Grants
              </h2>
              <p className="mt-3 text-lg text-slate-700">
                Government-funded programs reimburse 50-100% of wages during training
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="text-3xl font-bold text-green-600">240-480</div>
                <div className="text-sm font-semibold text-slate-900 mt-1">FREE Hours of Work</div>
                <p className="text-xs text-slate-600 mt-2">
                  OJT grants reimburse 50-75% of wages for 3-6 months while you train new hires
                </p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="text-3xl font-bold text-green-600">$3K-$8K</div>
                <div className="text-sm font-semibold text-slate-900 mt-1">Savings Per Hire</div>
                <p className="text-xs text-slate-600 mt-2">
                  Average employer savings through wage reimbursement and training grants
                </p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="text-3xl font-bold text-green-600">100%</div>
                <div className="text-sm font-semibold text-slate-900 mt-1">WEX Reimbursement</div>
                <p className="text-xs text-slate-600 mt-2">
                  Try candidates for 120-240 hours with full wage reimbursement before hiring
                </p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/contact?topic=employer-grants"
                className="inline-flex items-center rounded-full bg-green-600 px-8 py-3 text-base font-semibold text-white hover:bg-green-700 shadow-lg"
              >
                Learn About Available Grants
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
              Why Hire Our Graduates?
            </h2>
            <p className="mt-3 text-lg text-slate-600">
              Reduce costs, minimize risk, and build a reliable talent pipeline
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-3">{benefit.icon}</div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  {benefit.description}
                </p>
                <div className="mt-3 inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  {benefit.highlight}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Talent Pools Section */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
              Available Talent Pools
            </h2>
            <p className="mt-3 text-lg text-slate-600">
              Certified professionals ready to join your team
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {talentPools.map((pool) => (
              <div
                key={pool.title}
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={pool.image}
                    alt={pool.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900">
                    {pool.title}
                  </h3>
                  
                  <div className="mt-4">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Available Roles
                    </p>
                    <ul className="mt-2 space-y-1">
                      {pool.roles.map((role) => (
                        <li key={role} className="text-sm text-slate-700">
                          • {role}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Certifications & Training
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {pool.certifications.map((cert) => (
                        <span
                          key={cert}
                          className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-500">Avg. Placement Time</p>
                      <p className="text-sm font-semibold text-slate-900">{pool.avgPlacementTime}</p>
                    </div>
                    <Link
                      href={`/contact?topic=hire-${pool.title.toLowerCase().replace(/\s+/g, '-')}`}
                      className="rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
                    >
                      Request Candidates
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
              How It Works
            </h2>
            <p className="mt-3 text-lg text-slate-600">
              Simple 4-step process to hire qualified talent
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                step: 1,
                title: "Submit Your Hiring Needs",
                description: "Tell us about your open positions, required skills, and timeline. We'll match you with qualified candidates from our talent pool.",
              },
              {
                step: 2,
                title: "Review Pre-Screened Candidates",
                description: "Receive profiles of certified graduates who meet your requirements. All candidates are background-checked and skills-verified.",
              },
              {
                step: 3,
                title: "Interview & Select",
                description: "Interview candidates and make your selection. We coordinate schedules and provide additional candidate information as needed.",
              },
              {
                step: 4,
                title: "Onboard with Funding Support",
                description: "We handle OJT/WEX paperwork and compliance. You receive wage reimbursements while training your new hire.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex gap-6 rounded-2xl border border-slate-200 bg-white p-6"
              >
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-xl font-bold text-white">
                    {item.step}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Ready to Build Your Team?
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            Connect with our employer services team to discuss your hiring needs and available funding options.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact?topic=hire-graduates"
              className="rounded-full bg-orange-500 px-8 py-4 text-base font-semibold text-white hover:bg-orange-600 shadow-xl"
            >
              Schedule a Call
            </Link>
            <Link
              href="/employers"
              className="rounded-full border-2 border-white bg-white/10 backdrop-blur px-8 py-4 text-base font-semibold text-white hover:bg-white/20"
            >
              Learn About Partnerships
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
