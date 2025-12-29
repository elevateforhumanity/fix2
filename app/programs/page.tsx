import Link from 'next/link';
import Image from 'next/image';
import { programs } from '@/app/data/programs';
import { Metadata } from 'next';
import { ChevronRight, Phone, Mail, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free Career Training Programs in Indiana | Indiana Career Connect',
  description:
    'Find your path to a better career. 100% free training programs in healthcare, skilled trades, and business. Funded by Indiana Career Connect and WIOA. Start today.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/programs',
  },
};

export default function ProgramsPage() {
  return (
    <main className="bg-white">
      {/* Breadcrumbs */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav role="navigation" aria-label="Main navigation" className="flex items-center gap-2 text-sm text-slate-600">
            <Link href="/" aria-label="Link" className="hover:text-brand-orange-600 transition">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-900 font-medium">Programs</span>
          </nav>
        </div>
      </div>

      {/* Hero Section - Video Background */}
      <section className="relative text-white overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          loop
          playsInline
          muted
          className="absolute inset-0 w-full h-full object-cover"
          poster="/images/artlist/hero-training-1.jpg"
        >
          <source
            src="/videos/programs-overview-video-with-narration.mp4"
            type="video/mp4"
          />
        </video>

        {/* Content Container */}
        <div className="relative py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-4">
            <div className="max-w-4xl">
              {/* Indiana Career Connect Badge */}
              <a
                href="https://www.in.gov/dwd/career-connect/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md hover:bg-white/20 px-6 py-3 rounded-full mb-8 transition border border-white/20 group"
              >
                <MapPin className="w-5 h-5 text-white" />
                <span className="text-sm font-bold text-white">
                  Funded by Indiana Career Connect
                </span>
                <ChevronRight className="w-4 h-4 text-white group-hover:translate-x-1 transition" />
              </a>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                Your Future Starts Here
              </h1>

              {/* Key Highlights */}
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-xl font-bold text-lg">
                  ✓ 100% Free Training
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-xl font-bold text-lg">
                  ✓ No Student Debt
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-xl font-bold text-lg">
                  ✓ Real Jobs Waiting
                </div>
              </div>

              <p className="text-2xl md:text-3xl text-white/90 mb-8 leading-relaxed font-medium">
                Real training. Real jobs. Real support. And it's 100% free.
              </p>

              {/* Story Box */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 mb-10">
                <p className="text-lg text-white leading-relaxed mb-4">
                  <strong className="text-yellow-300">Here's the truth:</strong>{' '}
                  You don't need a college degree to build a great career. You
                  need the right training, the right support, and someone who
                  believes in you.
                </p>
                <p className="text-lg text-white/90 leading-relaxed">
                  Whether you're starting fresh, changing careers, or getting
                  back on your feet—we're here to help you build the life you
                  want. Every program is fully funded through{' '}
                  <strong className="text-yellow-300">
                    Indiana Career Connect
                  </strong>{' '}
                  and WIOA. No tuition. No debt. Just opportunity.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mb-8">
                <Link
                  href="/apply"
                  className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 px-10 py-5 rounded-xl font-bold text-lg transition shadow-2xl hover:shadow-3xl hover:scale-105"
                >
                  Apply Now - It's Free
                  <ChevronRight className="w-5 h-5" />
                </Link>
                <a
                  href="tel:3173143757"
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md hover:bg-white/20 border-2 border-white text-white px-10 py-5 rounded-xl font-bold text-lg transition"
                >
                  <Phone className="w-5 h-5" />
                  (317) 314-3757
                </a>
              </div>

              {/* Trust Signals */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-white/80">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span>500+ Students Enrolled</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span>90% Job Placement Rate</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span>Top Employer Partners</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Simple & Clear */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We make it simple. Here's what happens when you apply:
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Apply',
                description:
                  'Fill out a quick application. Takes 5 minutes. No commitment.',
              },
              {
                step: '2',
                title: 'Talk to Us',
                description:
                  'An advisor calls you within 24 hours to discuss your goals and options.',
              },
              {
                step: '3',
                title: 'Get Enrolled',
                description:
                  'We handle the paperwork, funding, and enrollment. You just show up.',
              },
              {
                step: '4',
                title: 'Start Training',
                description:
                  'Begin your program with full support. Graduate with a real credential.',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-brand-orange-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Choose Your Path
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              All programs are 100% free and lead to industry-recognized
              certifications. We offer training in four key areas.
            </p>
          </div>

          {/* All Programs - Visual Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => {
              const gradients = [
                'from-blue-500 to-blue-700',
                'from-orange-500 to-orange-700',
                'from-green-500 to-green-700',
                'from-purple-500 to-purple-700',
                'from-red-500 to-red-700',
                'from-yellow-500 to-yellow-700',
              ];
              const gradient = gradients[index % gradients.length];
              
              return (
                <Link
                  key={program.slug}
                  href={`/programs/${program.slug}`}
                  className="group block bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className={`aspect-video relative bg-gradient-to-br ${gradient} overflow-hidden`}>
                    {program.heroImage && (
                      <Image
                        src={program.heroImage}
                        alt={program.name}
                        fill
                        className="object-cover opacity-70 group-hover:opacity-90 group-hover:scale-110 transition-all duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white mb-1">
                        {program.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-white/90">
                        <span>{program.duration}</span>
                        {program.format && (
                          <>
                            <span>•</span>
                            <span>{program.format}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="p-6 bg-white">
                    <p className="text-orange-500 font-bold text-lg group-hover:text-orange-600 transition-colors flex items-center gap-2">
                      Learn More
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>


        </div>
      </section>

      {/* CTA Section - Modern & Encouraging */}
      <section className="py-20 bg-brand-orange-600 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-white/10" />

        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Change Your Life?
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-6 leading-relaxed max-w-3xl mx-auto">
            You don't need to figure this out alone. Our advisors are here to
            help you find the right program, get funding, and start training.
          </p>
          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
            Call us today or apply online. Either way, we'll be in touch within
            24 hours to help you get started.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 bg-white text-orange-600 hover:bg-orange-50 px-10 py-5 rounded-xl font-bold text-lg transition shadow-2xl hover:scale-105"
            >
              Apply Now - It's Free
              <ChevronRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:3173143757"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md hover:bg-white/20 border-2 border-white text-white px-10 py-5 rounded-xl font-bold text-lg transition"
            >
              <Phone className="w-5 h-5" />
              (317) 314-3757
            </a>
            <a
              href="mailto:info@elevateforhumanity.org"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md hover:bg-white/20 border-2 border-white text-white px-10 py-5 rounded-xl font-bold text-lg transition"
            >
              <Mail className="w-5 h-5" />
              Email Us
            </a>
          </div>

          {/* Trust Signals */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
              <div className="text-4xl font-bold mb-2">24hrs</div>
              <div className="text-white/80">Response Time</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
              <div className="text-4xl font-bold mb-2">$0</div>
              <div className="text-white/80">Out of Pocket</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
              <div className="text-4xl font-bold mb-2">90%</div>
              <div className="text-white/80">Job Placement</div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/20">
            <p className="text-sm text-white/70">
              Funded by Indiana Career Connect and WIOA • Serving Indianapolis
              and surrounding areas • Equal Opportunity Provider
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
