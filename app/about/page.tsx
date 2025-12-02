import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Award, Users, Target, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "About | Elevate For Humanity",
  description: "Learn more about Elevate For Humanity and our mission to connect individuals with life-changing career opportunities through free workforce training.",
};

export default function Page() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
              About Elevate For Humanity
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Connecting people to 100% free workforce training that leads to real careers
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-extrabold mb-6">Our Mission</h2>
              <p className="text-xl text-slate-700 leading-relaxed mb-6">
                At Elevate for Humanity, we connect everyday people to 100% free workforce training that leads to real careers. No tuition, no debt—just direct pathways to employment through government-funded programs.
              </p>
              <p className="text-xl text-slate-700 leading-relaxed">
                Through partnerships with government agencies, training providers, and employers, we create a seamless journey from unemployment to career success. Our dedicated team guides you through eligibility, enrollment, training, and job placement.
              </p>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/facilities-new/facility-1.jpg"
                alt="Elevate for Humanity training facility"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-center mb-16">Our Values</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Accessibility</h3>
              <p className="text-slate-600">Free training for everyone, regardless of background</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Quality</h3>
              <p className="text-slate-600">State-approved, industry-recognized programs</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Community</h3>
              <p className="text-slate-600">Building stronger communities through employment</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Impact</h3>
              <p className="text-slate-600">Transforming lives through career opportunities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-extrabold mb-12 text-center">Meet Our Founder</h2>
            <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 lg:p-12 border border-slate-200">
              <div className="grid md:grid-cols-3 gap-8 items-start">
                <div className="md:col-span-1">
                  <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg mb-4">
                    <Image
                      src="/images/team/elizabeth-greene.jpg"
                      alt="Elizabeth L. Greene"
                      fill
                      className="object-cover"
                      sizes="300px"
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Elizabeth L. Greene</h3>
                  <p className="text-lg text-slate-700 font-semibold mb-1">
                    Founder, President & Chief Executive Officer
                  </p>
                  <p className="text-slate-600">
                    Elevate For Humanity™ / Selfish Inc (501(c)(3))
                  </p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-lg text-slate-700 leading-relaxed mb-6">
                    Elizabeth L. Greene founded Elevate For Humanity with a vision to create accessible pathways to meaningful careers for underserved communities. Her leadership has transformed the organization into a trusted workforce development partner.
                  </p>
                  <p className="text-lg text-slate-700 leading-relaxed mb-6">
                    Under her leadership, Elevate For Humanity has become an INTraining, WRG, ETPL, JRI, and DOL Registered Apprenticeship provider, combining real-world licensing partners with a modern LMS and a community-first mission.
                  </p>
                  <div className="bg-white rounded-lg p-6 border-l-4 border-blue-600">
                    <p className="text-slate-700 italic">
                      "Our mission is simple: connect people to free training that leads to real jobs. Every person deserves the opportunity to build a career they can be proud of."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-white text-center mb-16">Our Impact</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-extrabold text-white mb-2">2500+</div>
              <p className="text-xl text-blue-100">Graduates Placed</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-extrabold text-white mb-2">95%</div>
              <p className="text-xl text-blue-100">Job Placement Rate</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-extrabold text-white mb-2">28+</div>
              <p className="text-xl text-blue-100">Career Programs</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-extrabold text-white mb-2">100+</div>
              <p className="text-xl text-blue-100">Employer Partners</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold mb-6">Ready to Transform Your Future?</h2>
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            Join thousands of students who have launched successful careers through our state-approved training programs.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/apply"
              className="px-8 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all shadow-lg"
            >
              Apply Now
            </Link>
            <Link
              href="/programs"
              className="px-8 py-4 bg-slate-100 text-slate-900 font-bold rounded-full hover:bg-slate-200 transition-all shadow-lg"
            >
              View Programs
            </Link>
            <Link
              href="/approvals"
              className="px-8 py-4 bg-slate-100 text-slate-900 font-bold rounded-full hover:bg-slate-200 transition-all shadow-lg"
            >
              View Approvals
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
