import { Metadata } from 'next';
import Link from 'next/link';
import { Briefcase, Users, TrendingUp, FileCheck, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'For Employers | Workforce Solutions & Talent Pipeline',
  description:
    'Access trained workers, apprenticeship partnerships, and workforce development solutions.',
};

export default function ForEmployersPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-white text-white py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <Briefcase className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">For Employers</h1>
          <p className="text-xl text-purple-100 mb-8">
            Access trained workers, build apprenticeship programs, and
            strengthen your talent pipeline.
          </p>
          <a
            href="tel:+13173143757"
            className="inline-block px-8 py-4 bg-white text-purple-600 rounded-lg font-bold hover:bg-purple-50"
          >
            Call (317) 314-3757
          </a>
        </div>
      </section>

      {/* What We Offer Employers */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            How We Support Employers
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Users className="w-10 h-10 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">
                Trained Talent Pipeline
              </h3>
              <p className="text-gray-700">
                Connect with graduates from accredited training programs in
                HVAC, welding, CDL, medical assistant, and more.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <TrendingUp className="w-10 h-10 text-brand-green-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">
                Apprenticeship Partnerships
              </h3>
              <p className="text-gray-700">
                Build registered apprenticeship programs with support for
                compliance, tracking, and funding coordination.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <FileCheck className="w-10 h-10 text-brand-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Workforce Coordination</h3>
              <p className="text-gray-700">
                We handle eligibility verification, funding coordination, and
                compliance reporting so you can focus on hiring.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works for Employers */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Contact Us</h3>
                <p className="text-gray-700">
                  Call (317) 314-3757 to discuss your hiring needs and workforce
                  development goals.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Define Requirements</h3>
                <p className="text-gray-700">
                  We work with you to identify skills, certifications, and
                  training pathways needed.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">
                  Connect with Candidates
                </h3>
                <p className="text-gray-700">
                  We match you with trained candidates or help you build an
                  apprenticeship program.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-brand-green-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Hire & Grow</h3>
                <p className="text-gray-700">
                  Onboard trained workers and build a sustainable talent
                  pipeline for your business.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Are NOT */}
      <section className="py-16 bg-purple-50">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Important to Know
          </h2>
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg mb-2">
                ✅ We Coordinate Talent Access
              </h3>
              <p className="text-gray-700">
                We connect you with trained workers and help build
                apprenticeship programs.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg mb-2">
                ❌ We're Not a Staffing Agency
              </h3>
              <p className="text-gray-700">
                We don't place temporary workers. We connect you with trained
                candidates for direct hire.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg mb-2">
                ❌ We Don't Guarantee Hires
              </h3>
              <p className="text-gray-700">
                We facilitate connections. Hiring decisions and employment
                relationships are between you and the candidate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Let's Build Your Workforce
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Call us to discuss your hiring needs and workforce development
            goals.
          </p>
          <a
            href="tel:+13173143757"
            className="inline-block px-8 py-4 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700"
          >
            Call (317) 314-3757
          </a>
        </div>
      </section>
    </main>
  );
}
