import Link from "next/link";

export default function OnboardingHub() {
  const roles = [
    {
      title: "Learner / Participant",
      description: "Enroll in training programs and apprenticeships",
      href: "/onboarding/learner",
      icon: "🎓",
    },
    {
      title: "Staff / Contractor",
      description: "Join the Elevate team as instructor, coach, or admin",
      href: "/onboarding/staff",
      icon: "👥",
    },
    {
      title: "Training Provider / School",
      description: "Partner with us to deliver workforce training",
      href: "/onboarding/school",
      icon: "🏫",
    },
    {
      title: "Employer Partner",
      description: "Hire trained talent and offer job opportunities",
      href: "/onboarding/employer",
      icon: "💼",
    },
    {
      title: "Referral Partner",
      description: "Refer learners from WorkOne, re-entry, or community orgs",
      href: "/onboarding/partner",
      icon: "🤝",
    },
  ];

  const resources = [
    {
      title: "Universal Handbook",
      description: "Responsibilities & expectations for everyone",
      href: "/onboarding/handbook",
    },
    {
      title: "Code of Conduct",
      description: "Standards for professional behavior",
      href: "/onboarding/handbook#code-of-conduct",
    },
    {
      title: "MOU Template",
      description: "Partnership agreement template",
      href: "/onboarding/mou",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* HEADER */}
      <header className="border-b border-white/10 bg-black">
        <div className="mx-auto max-w-6xl px-6 py-6 md:px-12">
          <Link href="/" className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300">
            ← Back to Home
          </Link>
          <h1 className="mt-4 text-3xl md:text-4xl font-bold">
            Elevate For Humanity™
          </h1>
          <p className="mt-2 text-lg text-slate-300">
            Digital Onboarding System
          </p>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <section className="mx-auto max-w-6xl px-6 py-12 md:px-12 md:py-16">
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Select Your Role
          </h2>
          <p className="text-slate-300">
            Choose the onboarding form that matches your role with Elevate For Humanity.
          </p>
        </div>

        {/* ROLE CARDS */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {roles.map((role) => (
            <Link
              key={role.href}
              href={role.href}
              className="group rounded-2xl border-2 border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-6 transition-all hover:border-orange-400 hover:shadow-2xl hover:shadow-orange-500/20"
            >
              <div className="mb-4 text-4xl">{role.icon}</div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-orange-300">
                {role.title}
              </h3>
              <p className="text-sm text-slate-400">
                {role.description}
              </p>
              <div className="mt-4 flex items-center text-orange-400 text-sm font-semibold">
                Start Onboarding
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* RESOURCES */}
        <div className="border-t border-white/10 pt-12">
          <h2 className="text-2xl font-bold mb-6">
            Resources & Documents
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {resources.map((resource) => (
              <Link
                key={resource.href}
                href={resource.href}
                className="rounded-xl border border-white/10 bg-slate-900 p-5 hover:border-orange-400/50 transition-all"
              >
                <h3 className="font-semibold mb-1">{resource.title}</h3>
                <p className="text-sm text-slate-400">{resource.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-black py-8 mt-12">
        <div className="mx-auto max-w-6xl px-6 md:px-12 text-center">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} Elevate For Humanity™. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
