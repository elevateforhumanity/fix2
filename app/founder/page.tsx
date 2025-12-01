import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Elizabeth Greene - Founder & Executive Director | Elevate For Humanity',
  description: 'Meet Elizabeth Greene, founder of Elevate for Humanity. Learn about her mission to connect everyday people to free workforce training that leads to real careers.',
};

export default function FounderPage() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-orange-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/elizabeth-greene-founder.jpg"
                alt="Elizabeth Greene - Founder & Executive Director, Elevate for Humanity"
                fill
                className="object-cover object-center"
                quality={95}
                priority
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-teal-600 uppercase tracking-wide mb-3">
                Meet Our Founder
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
                Elizabeth Greene
              </h1>
              <p className="text-xl text-orange-600 font-semibold mb-6">
                Founder & Executive Director
              </p>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                Elizabeth founded Elevate for Humanity with a simple mission: connect everyday people to free workforce training that leads to real careers.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                After seeing too many talented individuals held back by lack of access to training and opportunity, she built a system that removes every barrier—no tuition, no debt, just direct pathways to employment.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed mb-6">
                Today, Elevate for Humanity partners with government agencies, training providers, and employers to create a seamless journey from unemployment to career success.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors shadow-lg"
                >
                  Learn More About Our Mission
                  <ChevronRight size={20} />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-teal-600 text-teal-600 font-semibold rounded-lg hover:bg-teal-50 transition-colors"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">
              Vision & Mission
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h3>
                <p className="text-lg text-slate-700 leading-relaxed">
                  A community where every person has access to quality workforce training and a clear pathway to meaningful employment, regardless of their background or financial situation.
                </p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h3>
                <p className="text-lg text-slate-700 leading-relaxed">
                  To eliminate barriers to career advancement by connecting individuals with 100% funded training programs, supportive services, and direct employer partnerships.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Our Impact
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Under Elizabeth's leadership, Elevate for Humanity has transformed lives across Indianapolis
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-teal-600 mb-2">500+</div>
              <p className="text-slate-700 font-semibold">Students Trained</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-orange-600 mb-2">85%</div>
              <p className="text-slate-700 font-semibold">Job Placement Rate</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">20+</div>
              <p className="text-slate-700 font-semibold">Training Programs</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-600 mb-2">100+</div>
              <p className="text-slate-700 font-semibold">Employer Partners</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-blue-600">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join hundreds of graduates who have transformed their lives through our free training programs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-teal-700 font-bold rounded-lg hover:bg-teal-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
            >
              Apply Now - It's Free
            </Link>
            <Link
              href="/programs"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all"
            >
              View Programs
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}