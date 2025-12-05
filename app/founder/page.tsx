import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Award, Briefcase, GraduationCap, Heart, Users, Target } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Elizabeth Greene - Founder & CEO | Elevate For Humanity',
  description: 'Meet Elizabeth Greene, Founder & CEO of Elevate For Humanity. Learn how she built a platform connecting thousands to free workforce training and career opportunities.',
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
                <p className="text-sm uppercase tracking-wide text-blue-600 mb-2">Founder & CEO</p>
                <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
                  Elizabeth Greene
                </h1>
                <p className="text-xl text-slate-700 mb-6 leading-relaxed">
                  Building pathways from poverty to prosperity through technology, training, and human connection.
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
                    alt="Elizabeth Greene, Founder & CEO"
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

      {/* My Story */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-slate-900 mb-8">My Story</h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-slate-700 leading-relaxed mb-6">
                I didn't build Elevate For Humanity from a boardroom or a business plan. I built it from lived experience—navigating systems that weren't designed for people like me, watching talented individuals get trapped by barriers that had nothing to do with their ability, and realizing that the gap between poverty and prosperity isn't about intelligence or work ethic. It's about access.
              </p>

              <p className="text-lg text-slate-700 leading-relaxed mb-6">
                For years, I worked in workforce development, watching the same cycle repeat: people wanted to work, employers needed workers, but the connection never happened. Training programs existed, but they were fragmented. Funding was available, but navigating it required expertise most people didn't have. Support services were scattered across agencies that didn't talk to each other.
              </p>

              <p className="text-lg text-slate-700 leading-relaxed mb-6">
                So I built the platform I wish had existed when I needed it. Elevate For Humanity isn't just a training provider—it's an ecosystem. We connect government funding, training partners, employers, and support services into one seamless pathway. We handle the complexity so our students can focus on learning and building their futures.
              </p>

              <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6">Building the Technology</h3>
              
              <p className="text-lg text-slate-700 leading-relaxed mb-6">
                I taught myself to code because I couldn't afford to hire developers. I spent nights learning Next.js, TypeScript, and database architecture. I built every feature of this platform myself—the student portal, the LMS integration, the partner APIs, the automated enrollment system, the grant tracking tools.
              </p>

              <p className="text-lg text-slate-700 leading-relaxed mb-6">
                This platform handles everything: WIOA eligibility verification, partner course enrollment, certificate generation, job placement tracking, and wraparound support coordination. It's not perfect, but it works. And it's helped thousands of people access training they couldn't have found on their own.
              </p>

              <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6">The Mission</h3>
              
              <p className="text-lg text-slate-700 leading-relaxed mb-6">
                Every person who comes through our doors has a story. Single parents working two jobs. People reentering society after incarceration. Veterans transitioning to civilian careers. Young adults who couldn't afford college. They're not looking for handouts—they're looking for a shot.
              </p>

              <p className="text-lg text-slate-700 leading-relaxed mb-6">
                We give them that shot. 100% free training. Real credentials. Direct connections to employers. And support that addresses the real barriers—housing instability, transportation, childcare, mental health.
              </p>

              <p className="text-lg text-slate-700 leading-relaxed mb-6">
                This isn't charity. It's investment. Every person we train becomes a taxpayer, a homeowner, a parent who can provide for their kids. That's how communities transform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials & Expertise */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">Credentials & Expertise</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-xl p-8">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <GraduationCap className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Education & Certifications</h3>
                <ul className="space-y-2 text-slate-700">
                  <li>• VITA Site Coordinator (IRS Certified)</li>
                  <li>• WIOA Program Administrator</li>
                  <li>• DOL Registered Apprenticeship Sponsor</li>
                  <li>• Self-taught Full-Stack Developer</li>
                  <li>• Workforce Development Specialist</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-8">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Briefcase className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Technical Skills</h3>
                <ul className="space-y-2 text-slate-700">
                  <li>• Next.js & React Development</li>
                  <li>• TypeScript & JavaScript</li>
                  <li>• Database Architecture (Supabase/PostgreSQL)</li>
                  <li>• API Integration & Automation</li>
                  <li>• LMS Platform Integration</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-8">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Partnerships & Networks</h3>
                <ul className="space-y-2 text-slate-700">
                  <li>• HSI Safety Training Partner</li>
                  <li>• NRF Foundation RISE Up Partner</li>
                  <li>• Milady Beauty Education Partner</li>
                  <li>• CareerSafe OSHA Training Partner</li>
                  <li>• JRI Reentry Services Partner</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-8">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Impact & Scale</h3>
                <ul className="space-y-2 text-slate-700">
                  <li>• 2,500+ Students Trained</li>
                  <li>• 95% Job Placement Rate</li>
                  <li>• 28+ Career Programs</li>
                  <li>• $0 Student Debt</li>
                  <li>• 100% Government Funded</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Target className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-4xl font-bold mb-6">The Vision</h2>
            <p className="text-xl leading-relaxed mb-8 text-blue-100">
              I'm building a model that can scale nationally. A platform where anyone, anywhere can access free training, connect with employers, and build a career—regardless of their starting point. Where technology removes barriers instead of creating them. Where workforce development actually works.
            </p>
            <p className="text-xl leading-relaxed text-blue-100">
              This is just the beginning. We're proving that with the right tools, the right partnerships, and the right heart, we can transform how America trains its workforce.
            </p>
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