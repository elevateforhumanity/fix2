import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/about',
  },
  title: 'About | Elevate For Humanity',
  description:
    "We believe your past doesn't define your future. Free career training for people who need a second chance.",
};

export default function AboutPage() {
  const stats = [
    { number: '2,500+', label: 'Students Trained', icon: '🎓' },
    { number: '85%', label: 'Job Placement Rate', icon: '💼' },
    { number: '$0', label: 'Average Student Debt', icon: '💰' },
    { number: '15+', label: 'Career Programs', icon: '📚' },
  ];

  const team = [
    {
      name: 'Elizabeth Greene',
      role: 'Founder & CEO',
      image: '/images/team/founder/elizabeth-greene-founder-hero-01.jpg',
      linkedin: '#',
    },
    // Add more team members as needed
  ];

  return (
    <main className="bg-white overflow-hidden">
      {/* Hero with Diagonal Split */}
      <section className="relative min-h-[600px] bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-block px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <span className="text-white font-bold text-sm uppercase tracking-wider">
                About Us
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Meet people where they are to deliver a better future.
            </h1>
            <p className="text-base md:text-lg text-white/90 leading-relaxed">
              We believe your past doesn't define your future. Everyone deserves
              a shot at a better life.
            </p>
          </div>
        </div>

        {/* Diagonal bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 bg-white"
          style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }}
        />
      </section>

      {/* Stats Section with Icons */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  <span className="text-4xl">{stat.icon}</span>
                </div>
                <div className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-slate-600 font-semibold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section - Large Typography */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100 relative overflow-hidden">
        {/* Decorative shape */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200 opacity-20 rounded-full blur-3xl" />

        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="text-center">
            <div className="text-6xl md:text-8xl text-brand-orange-600 mb-6">
              "
            </div>
            <blockquote className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-8">
              Thoroughly professional and thoughtfully designed, Elevate's
              training programs support people of all backgrounds and stages.
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="h-1 w-16 bg-brand-orange-600 rounded-full" />
              <p className="text-lg text-slate-600 font-semibold">
                ELIZABETH GREENE, FOUNDER & CEO
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story - Two Column */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://cms-artifacts.artlist.io/content/generated-image-v1/image__1/generated-image-76ea4a68-9d0c-4075-8ca3-751c9bbe9343.png?Expires=2080932211&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=NrpdhDLgfSAkPpPz6risOCDn983VSzofzVn9miv~CiTY55m93dNC6TywrCYLYZsjWfD8JEy6sdrWeNTp5ApKGGvPksT~RzmTGe5HCBU~W6GQuFPgTq6Gin9EqzAPtPElB9intIGuTCXVS1kgPi6pZSGYUxQ4~Nv9hRDtV8rfrKEnnkcoGyzLLN0KYe6dY8Es~VYzgCXj3LbTk9Z4W4jfLKJyVsPSCPG3vTp1izFEgMA41W2gqgwXlE~xjnAhnOatlPE7k-kkDiN~a1iiy133g1-5aSoSAJVtexduiO8cB7GvlQKJv5qUfU4eMl-hNvr5A8w8MTMH20EbUCn~-g1F8w__"
                alt="Our Story"
                fill
                className="object-cover"
                quality={75}
              />
            </div>

            {/* Content */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-16 h-1 bg-brand-orange-600 rounded-full" />
                <h2 className="text-2xl md:text-2xl md:text-3xl md:text-3xl md:text-2xl md:text-3xl font-bold text-slate-900">
                  Our Story
                </h2>
              </div>

              <p className="text-base md:text-lg text-slate-700 mb-6 leading-relaxed">
                Elevate For Humanity started with a simple question: Why are
                talented, hardworking people stuck in dead-end jobs?
              </p>

              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                The answer wasn't lack of potential. It was lack of access—to
                training, to funding, to employers willing to give them a
                chance.
              </p>

              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                So we built something different. Not just training, but real
                support: funding assistance, career coaching, job placement, and
                connections to employers who hire based on skills, not resumes.
              </p>

              <Link
                href="/programs"
                className="inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                See Our Programs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-2xl md:text-3xl md:text-3xl md:text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Meet the team behind our mission
            </h2>
            <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto">
              Dedicated professionals committed to changing lives through
              education and opportunity.
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="group">
                <div className="relative h-80 rounded-3xl overflow-hidden shadow-lg mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    quality={75}
                  />
                  {/* LinkedIn overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    <a
                      href={member.linkedin}
                      className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center hover:scale-110 transition-transform"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="text-brand-blue-600 text-2xl">in</span>
                    </a>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-slate-600">{member.role}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/about/team"
              className="inline-flex items-center text-brand-orange-600 font-bold text-lg hover:gap-2 transition-all"
            >
              See Full Leadership Team
              <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-2xl md:text-3xl md:text-3xl md:text-2xl md:text-3xl font-bold text-slate-900 mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {[
              {
                category: 'General',
                questions: [
                  {
                    q: 'What is Elevate for Humanity?',
                    a: "We're a workforce training organization that provides free career training programs to help people build better futures.",
                  },
                  {
                    q: 'How much does training cost?',
                    a: 'Most students pay nothing out of pocket through funding partnerships with WIOA, WRG, JRI, and registered apprenticeships.',
                  },
                  {
                    q: 'How long are the programs?',
                    a: 'Programs range from 4 weeks to 18 months depending on the career path.',
                  },
                ],
              },
              {
                category: 'Enrollment',
                questions: [
                  {
                    q: 'How do I apply?',
                    a: 'Start by filling out our application form or calling 317-314-3757 to speak with an advisor.',
                  },
                  {
                    q: 'What are the requirements?',
                    a: 'Requirements vary by program, but most require a high school diploma or GED and a willingness to learn.',
                  },
                  {
                    q: 'Can I work while training?',
                    a: 'Yes! Many programs are designed for working adults with flexible schedules.',
                  },
                ],
              },
            ].map((section, idx) => (
              <div key={idx} className="border-b border-slate-200 pb-6">
                <h3 className="text-lg md:text-lg font-bold text-slate-900 mb-4">
                  {section.category}
                </h3>
                <div className="space-y-4">
                  {section.questions.map((item, qIdx) => (
                    <details key={qIdx} className="group">
                      <summary className="flex items-center justify-between cursor-pointer list-none p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition">
                        <span className="font-semibold text-slate-900">
                          {item.q}
                        </span>
                        <span className="text-brand-orange-600 group-open:rotate-180 transition-transform">
                          ▼
                        </span>
                      </summary>
                      <div className="p-4 text-slate-600 leading-relaxed">
                        {item.a}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-orange-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Ready to start your journey?
          </h2>
          <p className="text-base md:text-lg text-slate-700 mb-8">
            Talk to an advisor about your goals and which program is right for
            you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-orange-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all"
            >
              Apply Now
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-white text-slate-900 px-10 py-4 rounded-2xl font-bold text-lg hover:shadow-xl hover:scale-105 transition-all border-2 border-slate-200"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
