import Link from 'next/link';

// Fetch programs data
async function getPrograms() {
  // In production, this would fetch from API
  // For now, return static data
  return [
    {
      id: 'barber',
      slug: 'barber',
      name: 'Barber Apprenticeship',
      category: 'skilled_trades',
      duration: '2000 hours',
      funding: ['WRG', 'WIOA', 'Apprenticeship'],
      status: 'active',
      enrollment: 'open',
      icon: '🪒',
      shortDescription: 'Earn while you learn. Master professional barbering skills and qualify for Indiana State Licensure.'
    },
    {
      id: 'building-services',
      slug: 'building-services',
      name: 'Building Services Technician',
      category: 'skilled_trades',
      duration: 'Flexible',
      funding: ['WRG', 'WIOA'],
      status: 'active',
      enrollment: 'open',
      icon: '🔧',
      shortDescription: 'Learn essential building maintenance and repair skills for commercial and residential properties.'
    },
    {
      id: 'hvac-welding',
      slug: 'hvac-welding',
      name: 'HVAC & Welding',
      category: 'skilled_trades',
      duration: 'Flexible',
      funding: ['WRG', 'WIOA'],
      status: 'active',
      enrollment: 'open',
      icon: '🔥',
      shortDescription: 'Master two in-demand trades with comprehensive training in heating, ventilation, air conditioning, and welding.'
    },
    {
      id: 'healthcare',
      slug: 'healthcare',
      name: 'Healthcare (CNA/QMA)',
      category: 'healthcare',
      duration: 'Flexible',
      funding: ['WRG', 'WIOA'],
      status: 'active',
      enrollment: 'open',
      icon: '🏥',
      shortDescription: 'Start your healthcare career with certified nursing assistant and qualified medication aide training.'
    },
    {
      id: 'drug-testing',
      slug: 'drug-testing',
      name: 'Drug Testing Business',
      category: 'business',
      duration: 'Flexible',
      funding: ['WRG', 'WIOA'],
      status: 'active',
      enrollment: 'open',
      icon: '🧪',
      shortDescription: 'Launch your own drug testing business with comprehensive training and certification.'
    },
    {
      id: 'digital-skills',
      slug: 'digital-skills',
      name: 'Digital Skills',
      category: 'technology',
      duration: 'Flexible',
      funding: ['WRG', 'WIOA'],
      status: 'active',
      enrollment: 'open',
      icon: '💻',
      shortDescription: 'Build essential digital skills for today\'s technology-driven workplace.'
    },
    {
      id: 'leadership',
      slug: 'leadership',
      name: 'Leadership Development',
      category: 'professional',
      duration: 'Flexible',
      funding: ['WRG', 'WIOA'],
      status: 'active',
      enrollment: 'open',
      icon: '👔',
      shortDescription: 'Develop leadership skills and advance your career with professional development training.'
    },
    {
      id: 'peer-recovery',
      slug: 'peer-recovery',
      name: 'Certified Peer Recovery Specialist',
      category: 'healthcare',
      duration: 'Flexible',
      funding: ['WRG', 'WIOA'],
      status: 'active',
      enrollment: 'open',
      icon: '🤝',
      shortDescription: 'Help others on their recovery journey with certified peer recovery specialist training.'
    }
  ];
}

export default async function ProgramsPage() {
  const programs = await getPrograms();

  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-orange-50 to-white border-b border-orange-200">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700 ring-1 ring-orange-300">
                Indiana Workforce Development
              </span>
              <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
                Our Programs
              </h1>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                State-funded pathways with real employer partners and paid
                on-the-job training. Start your career without the debt.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 text-sm">
                <span className="rounded-full bg-white px-3 py-1 text-gray-900 font-medium shadow-sm">
                  Paid Apprenticeships
                </span>
                <span className="rounded-full bg-white px-3 py-1 text-gray-900 font-medium shadow-sm">
                  Stackable Credentials
                </span>
                <span className="rounded-full bg-white px-3 py-1 text-gray-900 font-medium shadow-sm">
                  Employer Partnerships
                </span>
              </div>
            </div>
            <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl border border-orange-200 shadow-lg">
              <img
                src="/images/programs-banner.jpg"
                alt="Elevate for Humanity Programs"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {programs.map((program) => (
            <div
              key={program.slug}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{program.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {program.name}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {program.duration} • {program.category}
              </p>
              <p className="text-gray-700 mb-4">
                {program.shortDescription}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {program.funding.map((fund) => (
                  <span
                    key={fund}
                    className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded"
                  >
                    💰 {fund}
                  </span>
                ))}
              </div>
              <Link
                href={`/programs/${program.slug}`}
                className="inline-block bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors"
              >
                Learn More →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Start Your Career Journey?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            All programs are 100% funded through WIOA and WRG. No cost to you.
          </p>
          <Link
            href="/apply"
            className="inline-block bg-orange-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-700 transition-colors"
          >
            Apply Now
          </Link>
        </div>
      </section>
    </div>
  );
}
