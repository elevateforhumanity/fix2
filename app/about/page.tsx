import EnrollmentProcess from '@/components/EnrollmentProcess';
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Award, Users, Target, Heart } from "lucide-react";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.elevateforhumanity.org/about",
  },
  title: "About | Elevate For Humanity",
  description: "Discover more about Elevate For Humanity and our mission to connect individuals with life-changing career opportunities through free workforce training.",
};

export default function Page() {
  return (
    <main className="bg-white">
      {/* Hero Section with Background Image */}
      <section className="relative h-[400px] sm:h-[500px] md:h-[600px] w-full overflow-hidden bg-white">
        <Image
          src="/media/about-what-we-do.jpg"
          alt="Team collaboration"
          fill
          className="object-cover"
          priority
          quality={95}
          sizes="100vw"
        />
      </section>

      {/* Title Section - Below Hero */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-4">
            About Elevate
          </h1>
          <p className="text-xl sm:text-2xl text-slate-700">
            Connecting people to free workforce training
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-4xl font-extrabold mb-6">Our Mission</h2>
              <p className="text-xl text-slate-700 leading-relaxed mb-6">
                At Elevate for Humanity, we connect everyday people to 100% free workforce training that leads to real careers. No tuition, no debt—just direct pathways to employment through government-funded programs.
              </p>
              <p className="text-xl text-slate-700 leading-relaxed mb-6">
                Through partnerships with government agencies, training providers, and employers, we create a seamless journey from unemployment to career success. Our dedicated team guides you through eligibility, enrollment, training, and job placement.
              </p>
              <p className="text-xl text-slate-700 leading-relaxed">
                We serve Indianapolis and Marion County with a focus on underserved communities, providing not just training but wraparound support including housing assistance, mental health services, life coaching, and direct employer connections.
              </p>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/media/team-collaboration.png"
                alt="Elevate for Humanity training facility"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw" quality={100}
              />
            </div>
          </div>

          {/* What Makes Us Different */}
          <div className="   rounded-2xl p-8 lg:p-12 shadow-xl">
            <h3 className="text-3xl font-extrabold mb-4 text-center">What Makes Us Different</h3>
            <p className="text-xl text-slate-600 text-center mb-12 max-w-3xl mx-auto">
              We're not just a training provider—we're a comprehensive workforce ecosystem that addresses every barrier to employment.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h4 className="text-xl font-bold mb-3 text-blue-900">State & Federal Approvals</h4>
                <p className="text-slate-700 leading-relaxed mb-4">
                  We're officially approved by Indiana's Department of Workforce Development (INTraining Program Location ID: 10004621), eligible for WIOA funding (ETP), approved for Workforce Ready Grants (WRG), Job Ready Indy (JRI) partner, and registered with the U.S. Department of Labor as an apprenticeship sponsor (RAPIDS ID: 2025-IN-132301).
                </p>
                <p className="text-slate-700 leading-relaxed">
                  This means your training is legitimate, recognized by employers nationwide, and can be funded through multiple government programs at absolutely no cost to you. No tuition, no fees, no debt.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h4 className="text-xl font-bold mb-3 text-blue-900">Wraparound Support Services</h4>
                <p className="text-slate-700 leading-relaxed mb-4">
                  We understand that barriers to employment go far beyond just skills training. That's why we provide comprehensive support: housing assistance through our Director of Housing & Supportive Services, mental health services through our licensed PMHNP, life coaching from certified professionals, transportation support, and direct connections to employers.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  Our team doesn't just train you—we walk with you through every challenge, every setback, and every victory on your career journey.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h4 className="text-xl font-bold mb-3 text-blue-900">Indusstart Partnerships</h4>
                <p className="text-slate-700 leading-relaxed mb-4">
                  We partner with over 100 leading employers in healthcare, skilled trades, technology, beauty, and transportation. Our programs are designed with direct input from hiring managers to ensure you learn exactly what the job market demands—not outdated curriculum from textbooks.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  Many of our students receive job offers before they even complete training. We don't just prepare you for the job market—we connect you directly to it.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h4 className="text-xl font-bold mb-3 text-blue-900">Proven Track Record</h4>
                <p className="text-slate-700 leading-relaxed mb-4" />
                <p className="text-slate-700 leading-relaxed">
                  Every number represents a real person who transformed their life: single parents achieving financial stability, returning citizens rebuilding their lives, and career changers finding their true calling.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-center mb-8">Our Core Values</h2>
          <p className="text-xl text-slate-600 text-center mb-16 max-w-3xl mx-auto">
            These principles guide everything we do, from program design to student support to employer partnerships.
          </p>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
              <div className="relative w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src="/media-backup-20251128-043832/hero-elevate-learners.jpg"
                  alt="Accessibility"
                  fill
                  className="object-cover"
                  sizes="80px" quality={100}
                />
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">Accessibility</h3>
              <p className="text-slate-600 text-center leading-relaxed">
                100% free training for everyone, regardless of background, education level, or financial situation. No hidden fees, no debt, no barriers.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
              <div className="relative w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src="/media-backup-20251128-043832/hero-elevate-learners.jpg"
                  alt="Quality"
                  fill
                  className="object-cover"
                  sizes="80px" quality={100}
                />
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">Quality</h3>
              <p className="text-slate-600 text-center leading-relaxed">
                State-approved, federally recognized programs that meet industry-standard standards. Our certifications are recognized by employers nationwide.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
              <div className="relative w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src="/media-backup-20251128-043832/hero-elevate-learners.jpg"
                  alt="Community"
                  fill
                  className="object-cover"
                  sizes="80px" quality={100}
                />
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">Community</h3>
              <p className="text-slate-600 text-center leading-relaxed">
                Building stronger communities by connecting local residents to local employers. Every placement strengthens our entire community.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
              <div className="relative w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src="/media-backup-20251128-043832/hero-elevate-learners.jpg"
                  alt="Impact"
                  fill
                  className="object-cover"
                  sizes="80px" quality={100}
                />
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">Impact</h3>
              <p className="text-slate-600 text-center leading-relaxed">
                Transforming lives through career opportunities. We measure success by the number of families we help achieve financial stability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-extrabold mb-12 text-center">Meet Our Founder</h2>
            <div className="   rounded-2xl p-8 lg:p-12 border border-slate-200">
              <div className="grid md:grid-cols-3 gap-8 items-start">
                <div className="md:col-span-1">
                  <div className="relative w-48 h-48 mx-auto rounded-xl overflow-hidden shadow-lg mb-4">
                    <Image
                      src="/images/elizabeth-greene-founder.jpg"
                      alt="Elizabeth L. Greene"
                      fill
                      className="object-cover object-top"
                      sizes="192px" quality={100}
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
                  <h4 className="text-2xl font-bold mb-4 text-blue-900">A Vision Born from Community Need</h4>
                  <p className="text-lg text-slate-700 leading-relaxed mb-6">
                    Elizabeth L. Greene founded Elevate For Humanity after witnessing a critical gap in Indianapolis: thousands of people wanted to work, thousands of employers needed workers, but the connection wasn't happening. Traditional education was too expensive, too slow, or didn't teach the right skills. Meanwhile, millions in government workforce funding went underutilized because the system was too complex to navigate.
                  </p>
                  <p className="text-lg text-slate-700 leading-relaxed mb-6">
                    Elizabeth set out to build a bridge. She spent years navigating the bureaucracy to secure every major workforce funding approval—INTraining Provider, Workforce Ready Grant provider, Eligible Training Provider for WIOA, Job Ready Indy partner, and U.S. Department of Labor Registered Apprenticeship sponsor. This wasn't just paperwork—it was creating pathways for people to access training at zero cost.
                  </p>
                  
                  <h4 className="text-2xl font-bold mb-4 text-blue-900">Building a Comprehensive Ecosystem</h4>
                  <p className="text-lg text-slate-700 leading-relaxed mb-6">
                    But Elizabeth quickly learned that skills training alone wasn't enough. Students faced barriers like unstable housing, mental health challenges, lack of transportation, and no professional network. So she built something unprecedented: a workforce ecosystem that addresses every barrier to employment.
                  </p>
                  <p className="text-lg text-slate-700 leading-relaxed mb-6">
                    Under her leadership, Elevate For Humanity assembled a team that includes housing specialists, a licensed Psychiatric Mental Health Nurse Practitioner (PMHNP), certified life coaches, employer relations staff, and program directors across multiple industries. This team doesn't just train people—they walk with students through every challenge that stands between unemployment and career success.
                  </p>
                  
                  <h4 className="text-2xl font-bold mb-4 text-blue-900">Creating Sustainable Impact</h4>
                  <p className="text-lg text-slate-700 leading-relaxed mb-6">
                    Through Selfish Inc, the 501(c)(3) nonprofit parent organization, Elizabeth has created a sustainable model that serves students, employers, and the community simultaneously. The organization is a registered federal contractor (SAM.gov UEI: VX2GK5S8SZH8), ByBlack certified Black-owned business, Certiport Authorized Testing Center, and Milady RISE Partner School.
                  </p>
                  <p className="text-lg text-slate-700 leading-relaxed mb-6" />
                  
                  <div className="bg-white rounded-lg p-6 border-l-4 border-blue-600 shadow-md">
                    <p className="text-slate-700 italic text-lg mb-4">
                      "Our mission is simple but powerful: connect people to free training that leads to real jobs. Every person deserves the opportunity to build a career they can be proud of."
                    </p>
                    <p className="text-slate-700 italic text-lg">
                      "We don't just train people—we transform lives. We don't just place people in jobs—we build careers. We don't just serve individuals—we strengthen entire communities."
                    </p>
                    <p className="text-slate-600 text-sm mt-4">— Elizabeth L. Greene, Founder & CEO</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-extrabold mb-8 text-center">Our Story</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-slate-700 leading-relaxed mb-6">
                Elevate For Humanity was born from a simple observation: thousands of people in Indianapolis want to work, and thousands of employers need workers—but the connection wasn't happening. Traditional education was too expensive, too slow, or didn't teach the right skills. Meanwhile, government funding for workforce training existed but was difficult to access.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed mb-6">
                We set out to bridge that gap. By becoming approved for every major workforce funding stream—WIOA, WRG, INTraining, JRI, and DOL Apprenticeships—we made it possible for students to access training at zero cost. By partnering directly with employers, we ensured our programs taught exactly what the job market needed.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed mb-6">
                But we quickly learned that skills training alone wasn't enough. Students faced barriers like unstable housing, mental health challenges, lack of transportation, and no professional network. So we built a team that will address all of these issues—housing specialists, mental health professionals, life coaches, and employer relations staff.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                Today, Elevate For Humanity is more than a training provider. We're a comprehensive workforce ecosystem that takes people from unemployment to career success, providing every support they need along the way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold mb-12 text-center">Our Approach</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 rounded-xl p-8 hover:shadow-lg transition-all">
              <div className="relative w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden">
                <Image
                  src="/media-backup-20251128-043832/hero-elevate-learners.jpg"
                  alt="Employer-Driven Training"
                  fill
                  className="object-cover"
                  sizes="96px" quality={100}
                />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">Employer-Driven Training</h3>
              <p className="text-slate-700 leading-relaxed">
                We don't guess what employers want—we ask them. Our programs are designed with direct input from hiring managers in healthcare, trades, technology, beauty, and transportation. Students learn exactly what they need to get hired.
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-8 hover:shadow-lg transition-all">
              <div className="relative w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden">
                <Image
                  src="/media-backup-20251128-043832/hero-elevate-learners.jpg"
                  alt="Wraparound Support"
                  fill
                  className="object-cover"
                  sizes="96px" quality={100}
                />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">Wraparound Support</h3>
              <p className="text-slate-700 leading-relaxed">
                Career success requires more than skills. We provide housing assistance, mental health services, life coaching, transportation support, and professional development. Our team addresses every barrier that stands between you and employment.
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-8 hover:shadow-lg transition-all">
              <div className="relative w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden">
                <Image
                  src="/media-backup-20251128-043832/hero-elevate-learners.jpg"
                  alt="Direct Employer Connections"
                  fill
                  className="object-cover"
                  sizes="96px" quality={100}
                />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">Direct Employer Connections</h3>
              <p className="text-slate-700 leading-relaxed">
                We don't just train you and wish you luck. We connect you directly with employers who are actively hiring. Many students receive job offers before completing training. Our 95% placement rate speaks for itself.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Impact */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold mb-12 text-center">Community Impact</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-4">Serving Indianapolis & Marion County</h3>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                We're deeply rooted in Indianapolis, with a special focus on underserved communities. Our students come from every neighborhood, every background, and every circumstance. What they have in common is the desire to work and build a better future.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                By connecting local residents to local employers, we strengthen the entire community. Every person we place in a career is one less person struggling with unemployment, one more family with stable income, and one more contributor to our local economy.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Breaking Barriers</h3>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                We specialize in serving populations that face the highest barriers to employment: returning citizens, individuals experiencing homelessness, single parents, people with mental health challenges, and those without traditional education credentials.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                Our wraparound services model ensures that no barrier is insurmountable. Housing unstable? We connect you with housing resources. Mental health challenges? Our PMHNP provides support. Need life skills? Our coaches work with you one-on-one.
              </p>
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
    
      {/* CTA Section */}
      <section className="py-20 bg-orange-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-white/90 mb-8">
            100% free training. No tuition, no fees, no debt. Just a direct pathway to your career.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/apply" className="px-10 py-5 bg-white text-orange-600 font-bold rounded-full hover:bg-slate-100 transition-all shadow-2xl text-lg">
              Apply Now - It's Free
            </Link>
            <Link href="/contact" className="px-10 py-5 bg-white/10 backdrop-blur-sm text-white font-bold rounded-full hover:bg-white/20 border-2 border-white transition-all shadow-2xl text-lg">
              Contact Us
            </Link>
          </div>
          <p className="text-white/80 mt-8 text-sm">
            Questions? Call <a href="tel:317-314-3757" className="underline font-semibold">317-314-3757</a> or email <a href="mailto:info@elevateforhumanity.org" className="underline font-semibold">info@elevateforhumanity.org</a>
          </p>
        </div>
      </section>

    
      <EnrollmentProcess />
    </main>
  );
}
