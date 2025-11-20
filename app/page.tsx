import Link from 'next/link';
import Image from 'next/image';

const programs = [
  {
    slug: 'medical-assistant',
    name: 'Medical Assistant',
    blurb:
      'Hands-on clinical training that prepares you for entry-level MA roles in clinics, hospitals, and specialty practices.',
    funding: 'WRG • WIOA • Workforce Grants',
    duration: '4–6 Months • Hybrid',
    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80',
  },
  {
    slug: 'barber-apprenticeship',
    name: 'Barber Apprenticeship',
    blurb:
      'State-approved apprenticeship – train in real barbershops while earning hours toward your barber license.',
    funding: 'Apprenticeship • WIOA',
    duration: '12–18 Months • On-the-Job + Classroom',
    image:
      'https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?w=600&q=80',
  },
  {
    slug: 'hvac-technician',
    name: 'HVAC Technician',
    blurb:
      'Learn heating, cooling, and refrigeration systems and prepare for in-demand technician roles.',
    funding: 'Workforce Grants • Employer Sponsors',
    duration: '4–9 Months • Lab + Field',
    image:
      'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&q=80',
  },
  {
    slug: 'building-maintenance',
    name: 'Building Maintenance Technician',
    blurb:
      'Training for building systems, repairs, and facility maintenance to keep properties safe and functional.',
    funding: 'Workforce Grants • Apprenticeship',
    duration: '4–9 Months • Hands-On',
    image:
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
  },
  {
    slug: 'truck-driving',
    name: 'CDL / Truck Driving',
    blurb:
      "Get your Commercial Driver's License and start a career in transportation with high demand and competitive pay.",
    funding: 'Workforce Grants • Employer Sponsors',
    duration: '3–8 Weeks • Range + Road',
    image:
      'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&q=80',
  },
  {
    slug: 'workforce-readiness',
    name: 'Workforce Readiness & Re-Entry',
    blurb:
      'Rebuild, reset, and re-enter the workforce with coaching, skills training, and real employment connections.',
    funding: 'Support Services • Referrals',
    duration: '4–12 Weeks • Coaching + Workshops',
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80',
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* HERO SECTION - Clean Professional Design */}
      <section className="relative bg-gradient-to-br from-slate-50 to-blue-50 py-24 md:py-32 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
                100% Funded Training Programs
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight mb-6">
                Ignite Your Future:
                <span className="block text-blue-600">Fund Training Today</span>
              </h1>

              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Empower Dreams: Support Skills Development and Transform Lives
                at Elevate for Humanity. Invest in Growth, Today! Marion County.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href="/start"
                  className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
                >
                  Get Started Free
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
                <Link
                  href="/programs"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-all border-2 border-slate-200"
                >
                  Explore Programs
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center gap-6 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  No Cost to You
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Job Placement Support
                </div>
              </div>
            </div>

            {/* Right: Clean image - Business training/education event */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
                  alt="Business professionals in training session - diverse group learning together"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                  priority
                />
                {/* Floating stat card */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-slate-900">
                        $0
                      </div>
                      <div className="text-sm text-slate-600">
                        Cost to Students
                      </div>
                    </div>
                    <div className="h-12 w-px bg-slate-200"></div>
                    <div>
                      <div className="text-2xl font-bold text-slate-900">
                        100%
                      </div>
                      <div className="text-sm text-slate-600">
                        Funded Programs
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION SECTION */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80"
                alt="Students collaborating and learning together in modern classroom setting"
                width={600}
                height={400}
                className="rounded-2xl shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Empowering Futures Through Skill Development
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                At Elevate for Humanity Career and Technical Institute, we are
                dedicated to bridging the gap between education and employment
                by funding innovative apprenticeship and training programs.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Located in Marion County, IN, our mission is to empower
                individuals with the skills they need to excel in today's
                dynamic workforce. By investing in human potential, we aim to
                transform lives and build a more skilled, sustainable community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMS SECTION */}
      <section id="programs" className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Empower Your Future Today
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Join our transformative programs and unlock career opportunities
              that align with industry demands. Flexible, grant-funded options
              mean more possibilities for growth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((program, index) => {
              const programImages = [
                'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80', // Medical Assistant
                'https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?w=400&q=80', // Barber
                'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&q=80', // HVAC
                'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80', // Building Maintenance
                'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&q=80', // CDL/Truck Driving
                'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80', // Workforce Readiness
              ];
              return (
                <Link
                  key={program.slug}
                  href={`/programs/${program.slug}`}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={programImages[index] || programImages[0]}
                      alt={program.name}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {program.name}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      {program.blurb}
                    </p>
                    <div className="inline-flex items-center text-blue-600 font-semibold text-sm">
                      Learn More
                      <svg
                        className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/programs"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-lg"
            >
              View All Programs
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Partnering For Futures: Testimonials That Inspire
            </h2>
            <p className="text-xl text-slate-600">
              Transforming futures through hands-on learning and career pathways
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Jordan Lee',
                text: 'The support from Elevate for Humanity has been transformative. Their funding allowed me to enroll in a high-quality apprenticeship program, setting me on a path to a fulfilling career.',
                image:
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
              },
              {
                name: 'Alex Morgan',
                text: 'Elevate for Humanity provided essential funding that opened doors to my dream apprenticeship. Their commitment to empowering individuals with career opportunities is truly inspiring.',
                image:
                  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80',
              },
              {
                name: 'Taylor Rivers',
                text: "Elevate for Humanity's funding was a game-changer for me. It enabled my participation in an incredible training program that propelled my career forward.",
                image:
                  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
              },
            ].map((testimonial, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={60}
                    height={60}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-slate-900">
                      {testimonial.name}
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-4 h-4 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 bg-blue-600">
        <div className="mx-auto max-w-4xl px-6 md:px-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of students who have launched successful careers
            through our funded training programs.
          </p>
          <Link
            href="/start"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all shadow-lg"
          >
            Get Started Today
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </section>

      {/* HOW IT WORKS - Coursera Style */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              How it works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We make the process simple. Our team walks with you from interest
              to employment.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full text-2xl font-bold">
                1
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">
                Connect & Explore
              </h3>
              <p className="text-gray-600">
                Complete a short interest form. Our team reviews funding options
                and program fit with you.
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full text-2xl font-bold">
                2
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">
                Enroll & Train
              </h3>
              <p className="text-gray-600">
                Enroll with our training partners. Receive coaching, case
                management, and support.
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full text-2xl font-bold">
                3
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">
                Elevate & Advance
              </h3>
              <p className="text-gray-600">
                Transition into jobs, apprenticeships, or next-level credentials
                with ongoing support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SUCCESS STORIES - With Photos */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Success Stories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real people, real results. See how our graduates are building
              careers.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative h-64">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80"
                  alt="Marcus - Barber Graduate"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl text-gray-900 mb-2">
                  Marcus J.
                </h3>
                <p className="text-sm text-blue-600 font-semibold mb-3">
                  Barber Apprenticeship Graduate
                </p>
                <p className="text-gray-600 text-sm">
                  "From incarceration to owning my own chair. Elevate gave me
                  the structure and support I needed."
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative h-64">
                <Image
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80"
                  alt="Sarah - Medical Assistant"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl text-gray-900 mb-2">
                  Sarah M.
                </h3>
                <p className="text-sm text-blue-600 font-semibold mb-3">
                  Medical Assistant Graduate
                </p>
                <p className="text-gray-600 text-sm">
                  "Single mom to certified MA in 5 months. Now working at a
                  clinic with benefits for my family."
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative h-64">
                <Image
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80"
                  alt="James - HVAC Technician"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl text-gray-900 mb-2">
                  James T.
                </h3>
                <p className="text-sm text-blue-600 font-semibold mb-3">
                  HVAC Technician Graduate
                </p>
                <p className="text-gray-600 text-sm">
                  "Went from warehouse work to skilled trades. Making 2x my old
                  salary with room to grow."
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/success-stories"
              className="inline-block px-8 py-3 border-2 border-blue-600 text-blue-600 font-bold rounded-lg hover:bg-blue-600 hover:text-white transition"
            >
              Read More Stories
            </Link>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION - Coursera Style */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="mb-4 text-3xl md:text-4xl font-bold text-white">
            Ready to get started?
          </h2>
          <p className="mb-8 text-lg text-blue-100 max-w-2xl mx-auto">
            Join thousands of learners who are advancing their careers with
            free, funded training programs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/apply"
              className="px-8 py-4 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition shadow-lg text-lg"
            >
              Join for Free
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition text-lg"
            >
              Talk to an Advisor
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
