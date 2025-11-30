import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Enroll | Elevate For Humanity",
  description: "Start your journey with Elevate For Humanity. Enroll in workforce training programs and unlock career opportunities.",
};

export default function EnrollPage() {
  return (
    <main>
      {/* Hero Banner */}
      <div 
        className="relative bg-slate-900 text-white overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=500&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/90 px-3 py-1 text-[11px] font-semibold text-white border border-blue-400 uppercase tracking-wide mb-4">
            Enrollment
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            Start Your Journey Today
          </h1>
          
          <p className="text-xl sm:text-2xl text-blue-300 font-semibold mb-4">
            Transform Your Future with Workforce Training
          </p>
          
          <p className="text-base sm:text-lg text-slate-100 max-w-3xl mb-8">
            Enroll in Elevate For Humanity programs and unlock your potential with education, training, and career opportunities that lead to real employment.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="#programs"
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-blue-700 transition-colors"
            >
              View Programs
            </a>
            <a
              href="#process"
              className="inline-flex items-center justify-center rounded-full border-2 border-white bg-white/10 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
            >
              How to Enroll
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border-2 border-white bg-white/10 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>

      {/* Tagline */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mt-6 mb-3 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
          <span className="uppercase tracking-wide">
            ORIGINAL-SITE-EFH-ORIGINAL-2024 • OWNER: Elizabeth L. Greene
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">

        {/* Why Enroll */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            Why Enroll With Us?
          </h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm">
              <div 
                className="h-48 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop')`
                }}
              />
              <div className="p-5">
                <div className="text-3xl mb-2">🏆</div>
                <h3 className="font-semibold text-slate-900 mb-2">Accredited Programs</h3>
                <p className="text-sm text-slate-700">
                  All programs are fully accredited and recognized by industry leaders.
                </p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm">
              <div 
                className="h-48 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop')`
                }}
              />
              <div className="p-5">
                <div className="text-3xl mb-2">👥</div>
                <h3 className="font-semibold text-slate-900 mb-2">Expert Instructors</h3>
                <p className="text-sm text-slate-700">
                  Learn from industry professionals with real-world experience.
                </p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm">
              <div 
                className="h-48 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop')`
                }}
              />
              <div className="p-5">
                <div className="text-3xl mb-2">💼</div>
                <h3 className="font-semibold text-slate-900 mb-2">Career Support</h3>
                <p className="text-sm text-slate-700">
                  Get job placement assistance and career counseling.
                </p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm">
              <div 
                className="h-48 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&h=400&fit=crop')`
                }}
              />
              <div className="p-5">
                <div className="text-3xl mb-2">📅</div>
                <h3 className="font-semibold text-slate-900 mb-2">Flexible Schedule</h3>
                <p className="text-sm text-slate-700">
                  Choose from full-time, part-time, and online options.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Available Programs */}
        <section id="programs" className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            Choose Your Program
          </h2>
          <p className="text-center text-slate-700 mb-8 max-w-3xl mx-auto">
            Select from our wide range of programs designed to meet your career goals
          </p>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Link href="/elevatelearn2earn" className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-lg transition-shadow">
              <div 
                className="h-48 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop')`
                }}
              />
              <div className="p-5">
                <h3 className="font-semibold text-slate-900 mb-2">ElevateLearn2Earn</h3>
                <p className="text-sm text-slate-700 mb-3">
                  Earn while you learn with paid internships and on-the-job training.
                </p>
                <span className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                  Learn More →
                </span>
              </div>
            </Link>

            <Link href="/healthcare" className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-lg transition-shadow">
              <div 
                className="h-48 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop')`
                }}
              />
              <div className="p-5">
                <h3 className="font-semibold text-slate-900 mb-2">Healthcare Training</h3>
                <p className="text-sm text-slate-700 mb-3">
                  Prepare for a rewarding career in the healthcare industry.
                </p>
                <span className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                  Learn More →
                </span>
              </div>
            </Link>

            <Link href="/technology" className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-lg transition-shadow">
              <div 
                className="h-48 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop')`
                }}
              />
              <div className="p-5">
                <h3 className="font-semibold text-slate-900 mb-2">Technology Programs</h3>
                <p className="text-sm text-slate-700 mb-3">
                  Master in-demand tech skills and launch your IT career.
                </p>
                <span className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                  Learn More →
                </span>
              </div>
            </Link>

            <Link href="/business" className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-lg transition-shadow">
              <div 
                className="h-48 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop')`
                }}
              />
              <div className="p-5">
                <h3 className="font-semibold text-slate-900 mb-2">Business & Finance</h3>
                <p className="text-sm text-slate-700 mb-3">
                  Build expertise in business management and financial services.
                </p>
                <span className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                  Learn More →
                </span>
              </div>
            </Link>

            <Link href="/trades" className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-lg transition-shadow">
              <div 
                className="h-48 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop')`
                }}
              />
              <div className="p-5">
                <h3 className="font-semibold text-slate-900 mb-2">Skilled Trades</h3>
                <p className="text-sm text-slate-700 mb-3">
                  Learn hands-on skills in construction, electrical, and more.
                </p>
                <span className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                  Learn More →
                </span>
              </div>
            </Link>

            <Link href="/hospitality" className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-lg transition-shadow">
              <div 
                className="h-48 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop')`
                }}
              />
              <div className="p-5">
                <h3 className="font-semibold text-slate-900 mb-2">Hospitality & Culinary</h3>
                <p className="text-sm text-slate-700 mb-3">
                  Excel in the hospitality industry with professional training.
                </p>
                <span className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                  Learn More →
                </span>
              </div>
            </Link>
          </div>
        </section>

        {/* Enrollment Process */}
        <section id="process" className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            Simple Enrollment Process
          </h2>
          <p className="text-center text-slate-700 mb-8 max-w-3xl mx-auto">
            Get started in just 4 easy steps
          </p>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm">
                <div 
                  className="h-48 bg-cover bg-center relative"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop')`
                  }}
                >
                  <div className="absolute top-4 left-4 bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
                    1
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-slate-900 mb-2">Choose Program</h3>
                  <p className="text-sm text-slate-700">
                    Select the program that matches your career goals.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm">
                <div 
                  className="h-48 bg-cover bg-center relative"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=400&fit=crop')`
                  }}
                >
                  <div className="absolute top-4 left-4 bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
                    2
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-slate-900 mb-2">Submit Application</h3>
                  <p className="text-sm text-slate-700">
                    Complete our simple online application form.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm">
                <div 
                  className="h-48 bg-cover bg-center relative"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop')`
                  }}
                >
                  <div className="absolute top-4 left-4 bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
                    3
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-slate-900 mb-2">Meet Advisor</h3>
                  <p className="text-sm text-slate-700">
                    Schedule a meeting with our enrollment advisor.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm">
                <div 
                  className="h-48 bg-cover bg-center relative"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop')`
                  }}
                >
                  <div className="absolute top-4 left-4 bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
                    4
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-slate-900 mb-2">Start Learning</h3>
                  <p className="text-sm text-slate-700">
                    Begin your journey to a brighter future.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="mb-10">
          <div className="rounded-2xl border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-white p-8 text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Ready to Transform Your Future?
            </h2>
            <p className="text-slate-700 mb-6 max-w-2xl mx-auto">
              Take the first step towards a rewarding career. Our enrollment advisors are here to help you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-3 text-sm font-semibold text-white shadow-lg hover:bg-blue-700 transition-colors"
              >
                Start Application
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border-2 border-blue-600 bg-white px-8 py-3 text-sm font-semibold text-blue-600 hover:bg-blue-50 transition-colors"
              >
                Schedule Consultation
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="text-center py-6 border-t border-slate-200">
          <p className="text-slate-600 mb-3">
            Have questions? Our enrollment team is here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
            <span className="font-semibold text-slate-700">📞 Call: (555) 123-4567</span>
            <span className="font-semibold text-slate-700">📧 Email: enroll@elevateforhumanity.org</span>
          </div>
        </section>

      </div>
    </main>
  );
}
