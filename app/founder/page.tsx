import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Award, Briefcase, GraduationCap, Heart, Users, Target } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Elizabeth L. Greene - Founder & Chief Visionary Officer | Elevate For Humanity',
  description: 'Meet Elizabeth L. Greene, Founder & Chief Visionary Officer of Elevate For Humanity. A builder of people, systems, pathways, and community—designing workforce ecosystems that remove barriers and unlock earning potential.',
  openGraph: {
    title: 'Elizabeth L. Greene - Founder & Chief Visionary Officer',
    description: 'Building pathways from poverty to prosperity through technology, training, and human connection.',
    images: ['/images/team/founder/elizabeth-greene-founder-hero-01.jpg'],
  },
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-sm uppercase tracking-wide text-blue-600 mb-2">Founder & Chief Visionary Officer</p>
                <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
                  Elizabeth L. Greene
                </h1>
                <p className="text-xl text-slate-700 mb-6 leading-relaxed">
                  Elizabeth L. Greene is a builder—of people, of systems, of pathways, and of community. As the Founder of Elevate For Humanity, she has dedicated her life's work to designing workforce and training ecosystems that remove barriers, unlock earning potential, and create equitable access to high-demand careers.
                </p>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  Her leadership brings together innovation, compassion, and compliance-driven excellence to provide life-changing opportunities for job seekers, employers, and underserved communities across the country.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                  >
                    Get in Touch
                  </Link>
                  <Link
                    href="/programs"
                    className="px-8 py-3 bg-gray-100 text-slate-900 font-semibold rounded-lg hover:bg-gray-200 transition border-2 border-gray-300"
                  >
                    View Programs
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/team/founder/elizabeth-greene-founder-hero-01.jpg"
                    alt="Elizabeth L. Greene, Founder & Chief Visionary Officer"
                    width={600}
                    height={700}
                    className="w-full h-auto"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Message From the Founder */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-slate-900 mb-8 text-center">A Message From the Founder</h2>
            
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border-l-4 border-blue-600">
              <p className="text-lg text-slate-700 leading-relaxed mb-6 italic">
                "I built Elevate For Humanity because I saw the gaps. I saw the people who had the drive, the skill, and the desire to work—but lacked access, guidance, credentials, or someone who believed in them. I saw employers struggling to find talent. I saw systems that required more navigation than support.
              </p>

              <p className="text-lg text-slate-700 leading-relaxed mb-6 italic">
                So I created the solution.
              </p>

              <p className="text-lg text-slate-700 leading-relaxed mb-6 italic">
                EFH is not just a platform. It's an opportunity engine. It's a bridge between where people are and where they deserve to be—professionally, financially, and personally.
              </p>

              <p className="text-lg text-slate-700 leading-relaxed mb-6 italic">
                Every program, every partnership, every apprenticeship, every piece of technology we build serves one purpose: to elevate people, families, and communities through meaningful workforce transformation."
              </p>

              <p className="text-right text-slate-900 font-semibold text-lg">
                — Elizabeth L. Greene
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Founder */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">Meet the Founder</h2>
            
            <p className="text-xl text-slate-700 leading-relaxed mb-12 text-center max-w-4xl mx-auto">
              Elizabeth brings a unique blend of experience across workforce development, apprenticeship creation, training program design, WIOA and ETPL compliance, federal and state workforce grants, SaaS platform development, community partnerships, employer engagement, career pathway mapping, and real-world program implementation.
            </p>

            <p className="text-lg text-slate-600 leading-relaxed text-center max-w-3xl mx-auto">
              Her ability to merge technology, training, compliance, and human-centered support is what sets Elevate For Humanity apart in the workforce space.
            </p>
          </div>
        </div>
      </section>

      {/* A Decade of Impact */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">A Decade of Impact</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-sm border">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Technology & Infrastructure</h3>
                <ul className="space-y-3 text-slate-700">
                  <li>• Full-scale LMS aligned with state and federal workforce requirements</li>
                  <li>• Ecosystem integrating WIOA, WRG, JRI, WEX, OJT, and DOL Registered Apprenticeships</li>
                  <li>• Tech infrastructure leveraging Next.js, React, Supabase, Stripe, and secure cloud automation</li>
                  <li>• AI-driven automation, training personalization, and auto-compliant documentation workflows</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-sm border">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Partnerships & Programs</h3>
                <ul className="space-y-3 text-slate-700">
                  <li>• Partnerships with Choice Medical Institute, Certiport, Milady, AHLEI, and National Apprenticeship networks</li>
                  <li>• High-demand training: CNA, Barbering, Building Maintenance, HVAC, Digital Skills, CDL pathways</li>
                  <li>• Recognition across workforce boards, educational institutions, nonprofit partners, and state agencies</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why EFH Exists */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-slate-900 mb-8">Why Elevate For Humanity Exists</h2>
            
            <p className="text-2xl text-slate-700 mb-12 font-semibold">
              People deserve access to opportunities that lead to careers—not just jobs.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="font-bold text-slate-900 mb-2">Equity</h3>
                <p className="text-slate-600 text-sm">Equal access for all</p>
              </div>
              <div className="bg-green-50 rounded-xl p-6">
                <h3 className="font-bold text-slate-900 mb-2">Accessibility</h3>
                <p className="text-slate-600 text-sm">Removing barriers</p>
              </div>
              <div className="bg-purple-50 rounded-xl p-6">
                <h3 className="font-bold text-slate-900 mb-2">Community Uplift</h3>
                <p className="text-slate-600 text-sm">Transforming lives</p>
              </div>
              <div className="bg-orange-50 rounded-xl p-6">
                <h3 className="font-bold text-slate-900 mb-2">Real Outcomes</h3>
                <p className="text-slate-600 text-sm">Measurable impact</p>
              </div>
              <div className="bg-pink-50 rounded-xl p-6">
                <h3 className="font-bold text-slate-900 mb-2">Streamlined Pathways</h3>
                <p className="text-slate-600 text-sm">Simplified navigation</p>
              </div>
              <div className="bg-indigo-50 rounded-xl p-6">
                <h3 className="font-bold text-slate-900 mb-2">Wraparound Support</h3>
                <p className="text-slate-600 text-sm">Holistic care</p>
              </div>
            </div>

            <p className="text-lg text-slate-700 mt-12 leading-relaxed">
              EFH combines innovation + compassion, ensuring no student is left behind and no employer is left without talent.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership With Heart */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-slate-900 mb-8">A Founder Who Leads With Heart and Vision</h2>
            
            <p className="text-xl text-slate-700 leading-relaxed mb-12">
              Elizabeth's leadership reflects deep understanding of generational barriers, lived experiences that shaped her mission, commitment to excellence, passion for transforming lives through workforce development, and a belief that education and opportunity should be free, accessible, and attainable.
            </p>

            <p className="text-lg text-slate-600 leading-relaxed">
              Her strength is her ability to design advanced systems while keeping people—real people—at the center of every solution.
            </p>
          </div>
        </div>
      </section>

      {/* Community, Technology, and Transformation */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Target className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-4xl font-bold mb-8">Community, Technology, and Transformation</h2>
            
            <p className="text-xl leading-relaxed mb-8 text-blue-100">
              Under Elizabeth's direction, EFH is evolving into a national workforce training platform, a compliance-ready system for workforce boards, a partner to schools and training institutions, a digital hub for apprenticeships and credentials, a dedicated resource for job seekers and career changers, a scalable SaaS solution for states, nonprofits, and employers, and a human-centered ecosystem that uplifts communities across America.
            </p>

            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 mt-12">
              <p className="text-2xl font-semibold mb-4">Closing Statement</p>
              <p className="text-lg leading-relaxed text-blue-50">
                Elizabeth L. Greene continues to lead Elevate For Humanity with vision, purpose, and a relentless commitment to empowering individuals—ensuring that workforce development is not just a system, but a lifeline that elevates generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Heart className="w-16 h-16 mx-auto mb-6 text-blue-600" />
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Let's Connect</h2>
            <p className="text-xl text-slate-700 mb-8">
              Whether you're looking for training, want to partner with us, or are interested in replicating this model in your community—I want to hear from you.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition text-lg"
              >
                Contact Me
              </Link>
              <Link
                href="/apply"
                className="px-8 py-4 bg-gray-100 text-slate-900 font-semibold rounded-lg hover:bg-gray-200 transition border-2 border-gray-300 text-lg"
              >
                Apply for Training
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}