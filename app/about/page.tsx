import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  const team = [
    { name: 'Sarah Johnson', role: 'Executive Director', image: '/media/team/person1.jpg' },
    { name: 'Michael Chen', role: 'Program Director', image: '/media/team/person2.jpg' },
    { name: 'Jennifer Martinez', role: 'Student Services Manager', image: '/media/team/person3.jpg' },
    { name: 'David Williams', role: 'Employer Relations', image: '/media/team/person4.jpg' },
  ];

  const stats = [
    { number: '2,500+', label: 'Students Trained' },
    { number: '85%', label: 'Job Placement Rate' },
    { number: '50+', label: 'Partner Employers' },
    { number: '12', label: 'Training Programs' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative py-20 px-4 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">About Elevate for Humanity</h1>
            <p className="text-xl text-slate-300">
              Connecting Indiana residents with free workforce training and career opportunities through WIOA-funded programs and registered apprenticeships.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Mission</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                To elevate communities by providing accessible, high-quality workforce training that empowers individuals to achieve economic mobility and career success.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Vision</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                A future where every Indiana resident has access to the training and support needed to build a thriving career in high-demand industries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-sm text-slate-600 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Story</h2>
          <div className="prose prose-lg max-w-none text-slate-600">
            <p>
              Founded in 2020, Elevate for Humanity emerged from a simple belief: that access to quality workforce training should not be limited by financial barriers. We recognized that many Indiana residents faced significant obstacles in accessing career training programs, despite the availability of WIOA funding and other workforce development resources.
            </p>
            <p>
              Today, we serve as a registered apprenticeship sponsor and WIOA-approved training provider, connecting students with programs in healthcare, skilled trades, technology, and business. Our partnerships with employers, training providers, and state agencies ensure that our programs meet real workforce needs and lead to meaningful employment opportunities.
            </p>
            <p>
              Through our Elevate Connects Directory platform, we've streamlined the process of finding, applying for, and enrolling in funded training programs. We provide comprehensive support services including eligibility screening, application assistance, case management, and job placement support.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Team</h2>
            <p className="text-lg text-slate-600">
              Dedicated professionals committed to your success
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-bold text-slate-900 mb-1">{member.name}</h3>
                <p className="text-sm text-slate-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Partners</h2>
            <p className="text-lg text-slate-600">
              Working together to build Indiana's workforce
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            <div className="text-center font-bold text-slate-400">Indiana DWD</div>
            <div className="text-center font-bold text-slate-400">WorkOne</div>
            <div className="text-center font-bold text-slate-400">DOL</div>
            <div className="text-center font-bold text-slate-400">Local Employers</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of Indiana residents advancing their careers through our programs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="px-8 py-3 bg-white text-blue-600 font-semibold hover:bg-blue-50 transition"
            >
              Apply Now
            </Link>
            <Link
              href="/programs"
              className="px-8 py-3 bg-blue-700 text-white font-semibold hover:bg-blue-800 transition"
            >
              View Programs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
