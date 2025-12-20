import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Students | Elevate For Humanity',
  description:
    'Learn more about Students inside the Elevate For Humanity workforce ecosystem.',
};

export default async function Page() {
  // Public page - no auth required

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner with Background Image */}
      <section className="relative h-[400px] w-full overflow-hidden">
        <Image
          src="/images/programs/efh-cna-hero.jpg"
          alt="Students learning together"
          fill
          className="object-cover"
          priority
          quality={85}
          sizes="100vw"
        />

        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-2xl">
              Your Journey Starts Here
            </h1>
            <p className="text-base md:text-lg mb-8 text-green-100 drop-shadow-lg">
              Access free training, earn certifications, and launch your career
            </p>
            <Link
              href="/apply"
              className="bg-white text-brand-green-600 px-8 py-4 rounded-full font-bold hover:bg-green-50 text-lg inline-block shadow-2xl transition-all"
            >
              Start Your Application
            </Link>
          </div>
        </div>
      </section>

      {/* JRI Callout */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 border-l-4 border-brand-blue-600">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Job Ready Indy (JRI) Partner – Marion County
            </h2>
            <p className="text-lg text-slate-700 mb-6 leading-relaxed">
              Elevate For Humanity Career and Training Institute is an approved
              Job Ready Indy (JRI) partner in Marion County. JRI helps youth and
              adults build:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-2xl">💼</span>
                <span className="text-lg font-semibold">Work ethic</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🤝</span>
                <span className="text-lg font-semibold">Professionalism</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">💬</span>
                <span className="text-lg font-semibold">Communication</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎯</span>
                <span className="text-lg font-semibold">Self-management</span>
              </div>
            </div>
            <p className="text-slate-700 leading-relaxed">
              Eligible learners can access JRI modules through EmployIndy's
              Tovuti LMS, with Elevate For Humanity providing local training,
              coaching, and wraparound support.
            </p>
          </div>
        </div>
      </section>

      {/* What We Offer Students */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-2xl md:text-3xl font-bold text-center mb-4 text-2xl md:text-3xl lg:text-2xl md:text-3xl">
            What We Offer You
          </h2>
          <p className="text-base md:text-lg text-slate-600 text-center mb-16 max-w-3xl mx-auto">
            We provide everything you need to launch a successful career—at
            absolutely no cost to you.
          </p>

          <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="   rounded-xl p-8 shadow-lg">
              <div className="relative w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden">
                <Image
                  src="/images/programs/efh-cna-hero.jpg"
                  alt="100% Free Training"
                  fill
                  className="object-cover"
                  sizes="80px"
                  quality={85}
                />
              </div>
              <h3 className="text-lg md:text-lg font-bold mb-4 text-center">
                100% Free Training
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Zero tuition, zero fees, zero debt. All our programs are fully
                funded through government workforce programs (WIOA, WRG, JRI).
                You pay nothing—ever.
              </p>
            </div>

            <div className="   rounded-xl p-8 shadow-lg">
              <div className="relative w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden">
                <Image
                  src="/images/programs/efh-cna-hero.jpg"
                  alt="Industry Certifications"
                  fill
                  className="object-cover"
                  sizes="80px"
                  quality={85}
                />
              </div>
              <h3 className="text-lg md:text-lg font-bold mb-4 text-center">
                Industry Certifications
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Earn nationally recognized certifications that employers
                actually want. From healthcare licenses to IT certifications to
                trade credentials—we help you get certified.
              </p>
            </div>

            <div className="   rounded-xl p-8 shadow-lg">
              <div className="relative w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden">
                <Image
                  src="/images/programs/efh-cna-hero.jpg"
                  alt="Housing Assistance"
                  fill
                  className="object-cover"
                  sizes="80px"
                  quality={85}
                />
              </div>
              <h3 className="text-lg md:text-lg font-bold mb-4 text-center">
                Housing Assistance
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Unstable housing shouldn't stop you from training. Our Director
                of Housing & Supportive Services connects you with housing
                resources, emergency assistance, and transitional housing
                options.
              </p>
            </div>

            <div className="   rounded-xl p-8 shadow-lg">
              <div className="relative w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden">
                <Image
                  src="/images/healthcare/video-thumbnail-cna-training.jpg"
                  alt="Mental Health Support"
                  fill
                  className="object-cover"
                  sizes="80px"
                  quality={85}
                />
              </div>
              <h3 className="text-lg md:text-lg font-bold mb-4 text-center">
                Mental Health Support
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Our licensed Psychiatric Mental Health Nurse Practitioner
                (PMHNP) provides mental health services, counseling, and
                medication management at no cost to students.
              </p>
            </div>

            <div className="   rounded-xl p-8 shadow-lg">
              <div className="relative w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden">
                <Image
                  src="/images/programs/efh-cna-hero.jpg"
                  alt="Life Coaching"
                  fill
                  className="object-cover"
                  sizes="80px"
                  quality={85}
                />
              </div>
              <h3 className="text-lg md:text-lg font-bold mb-4 text-center">
                Life Coaching
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Our certified life coaches work with you one-on-one to build
                confidence, develop professional skills, overcome barriers, and
                create a plan for long-term success.
              </p>
            </div>

            <div className="   rounded-xl p-8 shadow-lg">
              <div className="relative w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden">
                <Image
                  src="/images/programs/efh-cna-hero.jpg"
                  alt="Direct Employer Connections"
                  fill
                  className="object-cover"
                  sizes="80px"
                  quality={85}
                />
              </div>
              <h3 className="text-lg md:text-lg font-bold mb-4 text-center">
                Direct Employer Connections
              </h3>
              <p className="text-slate-700 leading-relaxed">
                We don't just train you and wish you luck. We connect you
                directly with employers who are actively hiring. Many students
                receive job offers before completing training.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Your Journey */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-2xl md:text-3xl font-bold text-center mb-16 text-2xl md:text-3xl lg:text-2xl md:text-3xl">
            Your Journey to Career Success
          </h2>
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-brand-green-600 text-white rounded-full flex items-center justify-center font-bold text-base">
                1
              </div>
              <div>
                <h3 className="text-lg md:text-lg font-bold mb-3">
                  Apply & Get Approved
                </h3>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Complete our simple application. We'll help you check
                  eligibility for government funding (WIOA, WRG, JRI) and get
                  you approved. Most students qualify for 100% free training.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-brand-green-600 text-white rounded-full flex items-center justify-center font-bold text-base">
                2
              </div>
              <div>
                <h3 className="text-lg md:text-lg font-bold mb-3">
                  Choose Your Program
                </h3>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Meet with our advisors to explore programs in healthcare,
                  trades, technology, beauty, transportation, and more. We'll
                  help you choose a career path that matches your interests and
                  goals.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-brand-green-600 text-white rounded-full flex items-center justify-center font-bold text-base">
                3
              </div>
              <div>
                <h3 className="text-lg md:text-lg font-bold mb-3">
                  Complete Training
                </h3>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Attend hands-on training with expert instructors. Programs
                  range from 4-12 weeks depending on the field. We provide
                  flexible scheduling, wraparound support, and everything you
                  need to succeed.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-brand-green-600 text-white rounded-full flex items-center justify-center font-bold text-base">
                4
              </div>
              <div>
                <h3 className="text-lg md:text-lg font-bold mb-3">
                  Get Certified
                </h3>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Earn industry-recognized certifications and licenses. We cover
                  exam fees and provide test prep. You'll graduate with
                  credentials that employers recognize and value.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-brand-green-600 text-white rounded-full flex items-center justify-center font-bold text-base">
                5
              </div>
              <div>
                <h3 className="text-lg md:text-lg font-bold mb-3">Get Hired</h3>
                <p className="text-lg text-slate-700 leading-relaxed">
                  We connect you directly with employers who are actively
                  hiring. Our 95% placement rate means you're not just
                  trained—you're employed. Average starting salary:
                  $35,000-$65,000.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20   ">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-2xl md:text-3xl font-bold text-white mb-6 text-2xl md:text-3xl lg:text-2xl md:text-3xl">
            Ready to Start Your Career Journey?
          </h2>
          <p className="text-base md:text-lg text-slate-600 mb-8">
            Join thousands of students who transformed their lives through free
            workforce training.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="px-10 py-5 bg-white text-brand-green-600 font-bold rounded-full hover:bg-slate-100 transition-all shadow-2xl text-lg"
            >
              Apply Now - It's Free
            </Link>
            <Link
              href="/programs"
              className="px-10 py-5 bg-white/10 backdrop-blur-sm text-white font-bold rounded-full hover:bg-white/20 border-2 border-white transition-all shadow-2xl text-lg"
            >
              View Programs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
