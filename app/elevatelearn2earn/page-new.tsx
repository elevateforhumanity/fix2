import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "ElevateLearn2Earn - Staffing Solutions | Elevate For Humanity",
  description:
    "Post-graduation staffing service connecting trained graduates with employer partners for internships, OJT, and permanent positions.",
};

export default function ElevateLearn2EarnPage() {
  return (
    <main>
      {/* Hero Banner */}
      <div 
        className="relative bg-slate-900 text-white overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&h=500&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/90 px-3 py-1 text-xs font-semibold text-white border border-orange-400 uppercase tracking-wide mb-4">
            Staffing & Talent Solutions
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            ElevateLearn2Earn
          </h1>
          
          <p className="text-xl sm:text-2xl text-orange-300 font-semibold mb-4">
            Connecting Graduates to Careers
          </p>
          
          <p className="text-base sm:text-lg text-slate-100 max-w-3xl mb-8">
            Post-graduation staffing for internships, on-the-job training, and permanent employment.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/employers/hire-graduates"
              className="inline-flex items-center justify-center rounded-full bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-orange-700"
            >
              Hire Graduates
            </Link>
            <Link
              href="/student/portal"
              className="inline-flex items-center justify-center rounded-full border-2 border-white bg-white/10 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-white hover:bg-white/20"
            >
              Student Portal
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
            How It Works
          </h2>
          <p className="text-center text-slate-600 mb-10 max-w-2xl mx-auto">
            We bridge training completion and career placement
          </p>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
              <div 
                className="h-48 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop')`
                }}
              />
              <div className="p-6 bg-white">
                <h3 className="font-bold text-lg text-slate-900 mb-2">Complete Training</h3>
                <p className="text-sm text-slate-700">
                  Students finish programs with certifications and job-ready skills.
                </p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
              <div 
                className="h-48 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop')`
                }}
              />
              <div className="p-6 bg-white">
                <h3 className="font-bold text-lg text-slate-900 mb-2">Match & Place</h3>
                <p className="text-sm text-slate-700">
                  We align graduates with employer partners for internships and OJT.
                </p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
              <div 
                className="h-48 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=400&fit=crop')`
                }}
              />
              <div className="p-6 bg-white">
                <h3 className="font-bold text-lg text-slate-900 mb-2">Ongoing Support</h3>
                <p className="text-sm text-slate-700">
                  Case managers support both graduates and employers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Placement Types */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">
            Placement Options
          </h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
              <div 
                className="h-56 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop')`
                }}
              />
              <div className="p-6 bg-white">
                <h3 className="font-bold text-xl text-slate-900 mb-3">Internships</h3>
                <p className="text-sm text-slate-700 mb-4">
                  3-6 month placements where graduates gain real-world experience with mentorship.
                </p>
                <Link href="/employers/placements" className="text-sm font-semibold text-orange-600 hover:text-orange-700">
                  Learn more →
                </Link>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
              <div 
                className="h-56 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=600&fit=crop')`
                }}
              />
              <div className="p-6 bg-white">
                <h3 className="font-bold text-xl text-slate-900 mb-3">On-the-Job Training</h3>
                <p className="text-sm text-slate-700 mb-4">
                  Paid training positions with potential OJT reimbursement for employers.
                </p>
                <Link href="/employers/ojt-funding" className="text-sm font-semibold text-orange-600 hover:text-orange-700">
                  Learn more →
                </Link>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
              <div 
                className="h-56 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&h=600&fit=crop')`
                }}
              />
              <div className="p-6 bg-white">
                <h3 className="font-bold text-xl text-slate-900 mb-3">Direct Hire</h3>
                <p className="text-sm text-slate-700 mb-4">
                  Permanent positions with ongoing case management support.
                </p>
                <Link href="/employers/hire-graduates" className="text-sm font-semibold text-orange-600 hover:text-orange-700">
                  Learn more →
                </Link>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
              <div 
                className="h-56 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop')`
                }}
              />
              <div className="p-6 bg-white">
                <h3 className="font-bold text-xl text-slate-900 mb-3">Apprenticeships</h3>
                <p className="text-sm text-slate-700 mb-4">
                  DOL-registered programs where graduates earn while learning advanced skills.
                </p>
                <Link href="/funding/apprenticeships" className="text-sm font-semibold text-orange-600 hover:text-orange-700">
                  Learn more →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-16">
          <div 
            className="rounded-3xl overflow-hidden relative"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=400&fit=crop')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="p-10 sm:p-16 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Partner with Us?
              </h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto">
                Connect with our staffing team to hire trained graduates or access placement support.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/employers/hire-graduates"
                  className="inline-flex items-center justify-center rounded-full bg-orange-600 px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-orange-700"
                >
                  Hire Graduates
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border-2 border-white bg-white/10 backdrop-blur-sm px-8 py-4 text-base font-semibold text-white hover:bg-white/20"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-slate-700 mb-6">
              8888 Keystone Crossing Suite 1300, Indianapolis, IN 46240<br />
              (317) 314-3757
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/employers" className="text-sm font-semibold text-orange-600 hover:text-orange-700">
                Employer Overview →
              </Link>
              <Link href="/programs" className="text-sm font-semibold text-orange-600 hover:text-orange-700">
                View Programs →
              </Link>
              <Link href="/student/portal" className="text-sm font-semibold text-orange-600 hover:text-orange-700">
                Student Portal →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
