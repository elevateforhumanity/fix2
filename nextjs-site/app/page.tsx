import Link from 'next/link';

export default function Home() {
  return (
    <div className="home-durable">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Ignite Your Future: Transform Your Career Today
            </h1>
            <p className="hero-subtitle">
              Empower your dreams with federally-funded workforce training
              programs. Build in-demand skills, earn industry certifications,
              and launch a rewarding career—at $0 cost with approved funding.
            </p>
            <div className="flex flex-wrap gap-6 justify-center mb-8">
              <span className="px-4 py-2 rounded bg-[var(--color-beige)] text-[var(--color-brown)] font-medium">
                💰 100% Funded
              </span>
              <span className="px-4 py-2 rounded bg-[var(--color-beige)] text-[var(--color-brown)] font-medium">
                📜 8 Career Pathways
              </span>
              <span className="px-4 py-2 rounded bg-[var(--color-beige)] text-[var(--color-brown)] font-medium">
                🎯 92% Job Placement
              </span>
              <span className="px-4 py-2 rounded bg-[var(--color-beige)] text-[var(--color-brown)] font-medium">
                📍 Marion County, IN
              </span>
            </div>
            <div className="flex flex-wrap gap-6 justify-center">
              <Link href="/apply" className="button">
                Start Your Application
              </Link>
              <Link href="/programs" className="button button-secondary">
                Explore Programs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="flex flex-wrap gap-8 justify-center">
            <div className="text-center flex-1 min-w-[200px]">
              <div className="text-5xl font-bold text-[var(--color-brown)]">
                5,000+
              </div>
              <div className="text-lg opacity-80">Graduates</div>
            </div>
            <div className="text-center flex-1 min-w-[200px]">
              <div className="text-5xl font-bold text-[var(--color-brown)]">
                92%
              </div>
              <div className="text-lg opacity-80">Job Placement Rate</div>
            </div>
            <div className="text-center flex-1 min-w-[200px]">
              <div className="text-5xl font-bold text-[var(--color-brown)]">
                8
              </div>
              <div className="text-lg opacity-80">Career Programs</div>
            </div>
            <div className="text-center flex-1 min-w-[200px]">
              <div className="text-5xl font-bold text-[var(--color-brown)]">
                $0
              </div>
              <div className="text-lg opacity-80">Cost with Funding</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section bg-[var(--color-green)]">
        <div className="container">
          <div className="mx-auto max-w-[800px]">
            <h2 className="section-title text-center">
              Empowering Futures Through Skill Development
            </h2>
            <p className="body-large text-center">
              At Elevate for Humanity Career and Technical Institute, we
              bridge the gap between education and employment by providing
              innovative apprenticeship and training programs. Located in
              Marion County, IN, our mission is to empower individuals with
              the skills they need to excel in today's dynamic workforce. By
              investing in human potential, we transform lives and build a
              more skilled, sustainable community.
            </p>
          </div>
        </div>
      </section>

      {/* Programs Preview */}
      <section className="section">
        <div className="container">
          <h2 className="section-title text-center">Our Career Programs</h2>
          <p className="section-subtitle text-center">
            Choose from 8 high-demand career pathways with 100% funding available
          </p>
          <div className="flex flex-wrap gap-8 mt-12">
            {/* Barber Apprenticeship */}
            <div className="program-card flex-1 min-w-[280px]">
              <div className="program-icon">🪒</div>
              <h3 className="program-title">Barber Apprenticeship</h3>
              <p className="body-small opacity-80 mb-4">
                2,000 hours • State Licensure
              </p>
              <p className="mb-4">
                Earn while you learn. Master professional barbering skills and
                qualify for Indiana State Licensure.
              </p>
              <div className="program-funding">
                💰 WRG • WIOA • Apprenticeship
              </div>
              <Link href="/programs/barber" className="button mt-6 w-full">
                Learn More →
              </Link>
            </div>

            {/* Building Services */}
            <div className="program-card flex-1 min-w-[280px]">
              <div className="program-icon">🔧</div>
              <h3 className="program-title">Building Services Technician</h3>
              <p className="body-small opacity-80 mb-4">
                Flexible • Industry Certification
              </p>
              <p className="mb-4">
                Learn essential building maintenance and repair skills for
                commercial and residential properties.
              </p>
              <div className="program-funding">
                💰 WRG • WIOA
              </div>
              <Link href="/programs/building-services" className="button mt-6 w-full">
                Learn More →
              </Link>
            </div>

            {/* HVAC & Welding */}
            <div className="program-card flex-1 min-w-[280px]">
              <div className="program-icon">🔥</div>
              <h3 className="program-title">HVAC & Welding</h3>
              <p className="body-small opacity-80 mb-4">
                Dual Certification • High Demand
              </p>
              <p className="mb-4">
                Master two in-demand trades with comprehensive training in
                heating, ventilation, air conditioning, and welding.
              </p>
              <div className="program-funding">
                💰 WRG • WIOA
              </div>
              <Link href="/programs/hvac-welding" className="button mt-6 w-full">
                Learn More →
              </Link>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/programs" className="button button-large">
              View All Programs →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-[var(--color-brown)] text-white">
        <div className="container">
          <div className="mx-auto max-w-[800px] text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of graduates who have launched successful careers
              through our federally-funded training programs.
            </p>
            <div className="flex flex-wrap gap-6 justify-center">
              <Link href="/apply" className="button button-white">
                Apply Now
              </Link>
              <Link href="/contact" className="button button-outline-white">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
