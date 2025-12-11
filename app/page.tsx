import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import VoiceoverPlayer from "@/components/VoiceoverPlayer";

export const metadata = {
  title: "Elevate for Humanity | Free Career Training Indianapolis",
  description: "100% free workforce training. CNA, HVAC, Beauty, CDL and more. Real jobs, real credentials, no tuition.",
  alternates: {
    canonical: "https://www.elevateforhumanity.org",
  },
};

const HOMEPAGE_VOICEOVER = "At Elevate for Humanity, we believe education should change your life—without putting you in debt. That's why our programs are connected to JRI, WRG, WIOA, and federally registered apprenticeships, giving you real access to free training, paid opportunities, and true workforce advancement. Every program is designed with hybrid learning in mind. You can train online, practice hands-on, complete modules at your own pace, and still have full instructor support. Whether you're a parent, working, or starting over—our system is built to fit your life. Through our Registered Apprenticeship Programs you can earn while you learn. Gain real work experience, build your hours, and step into a career path with confidence. You're not just studying—you're working, growing, and getting paid to build your future. Our partnership with JRI opens doors for justice-involved individuals to receive training, certifications, and wrap-around support at no cost. We believe everyone deserves a second chance and a clear path to employment. With the Workforce Ready Grant (WRG), eligible students can complete high-demand certifications—completely tuition-free. WRG was designed to help you reskill fast and step into high-wage, high-opportunity careers. Through WIOA, students receive funding for training, case management, career coaching, supportive services, and job placement assistance. This makes your education more than a class—it becomes a career plan. Many of our programs include internships, externships, or on-the-job learning. You will build your résumé, work with real employers, and prepare for a role that's ready the day you graduate. Elevate for Humanity offers stacked credentials across healthcare, trades, beauty, business, technology, and more. You can start with one certification and continue to build your skills—creating a pathway to long-term earnings, promotions, and entrepreneurship. If you're ready for a brand-new future, start your journey with Elevate for Humanity. Free training. Real certifications. True career pathways. You don't need perfect circumstances—just the courage to begin. Apply today at ElevateForHumanity.org";

export default function HomePage() {
  return (
    <main className="bg-white">
      <VoiceoverPlayer text={HOMEPAGE_VOICEOVER} autoPlay={true} />
      {/* Video Hero - Preload video before page starts */}
      <section className="relative overflow-hidden bg-slate-900">
        <div className="mx-auto max-w-7xl">
          <div className="relative w-full aspect-[16/9] min-h-[500px] md:min-h-[700px] overflow-hidden">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="/images/hero-poster.jpg"
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/videos/hero-home.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Breaking Barriers, Building Futures
          </h1>
          <p className="text-xl text-slate-700 leading-relaxed mb-8">
            We see your potential, not your past. 100% free career training through government funding. 
            No tuition. No debt. Real credentials. Real jobs waiting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-all"
            >
              Contact Us
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/programs"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-slate-900 bg-white border-2 border-slate-900 rounded-lg hover:bg-slate-50 transition-all"
            >
              View Programs
            </Link>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Programs</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Healthcare */}
            <Link href="/programs/medical-assistant" className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all">
              <div className="relative h-48">
                <Image
                  src="/images/healthcare-highlight.png"
                  alt="Healthcare Training"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Healthcare</h3>
                <p className="text-slate-600 text-sm">Medical Assistant, CPR, Emergency Health & Safety</p>
              </div>
            </Link>

            {/* Skilled Trades */}
            <Link href="/programs/hvac-technician" className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all">
              <div className="relative h-48">
                <Image
                  src="/images/hvac-highlight.png"
                  alt="Skilled Trades Training"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Skilled Trades</h3>
                <p className="text-slate-600 text-sm">HVAC Technician</p>
              </div>
            </Link>


          </div>

          <div className="text-center mt-8">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 text-orange-600 font-semibold hover:text-orange-700"
            >
              View All Programs
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* How We Help You Succeed */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Short-Term Training, Real Credentials</h2>
          <p className="text-xl text-center text-slate-300 mb-4">
            Our hybrid programs combine online learning with hands-on training. Most programs take 4-12 weeks, not years.
          </p>
          <p className="text-lg text-center text-orange-400 mb-12 font-semibold">
            100% FREE if you qualify for government funding.
          </p>
          
          <div className="space-y-8">
            <div className="bg-slate-800 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">1</div>
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-green-400">WRG - Workforce Ready Grant</h3>
                  <p className="text-slate-300 mb-2">
                    Indiana residents get 100% FREE short-term training (4-12 weeks). Study online at your own pace, 
                    complete hands-on requirements, earn industry credentials. No income limits. No age limits.
                  </p>
                  <p className="text-sm text-slate-400">Examples: CNA, HVAC, CDL, Medical Assistant</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">2</div>
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-blue-400">WIOA - Workforce Innovation</h3>
                  <p className="text-slate-300 mb-2">
                    Federal funding for unemployed or underemployed workers. Covers tuition, books, transportation, 
                    and support services. Hybrid format: online coursework + in-person skills training. Get certified fast.
                  </p>
                  <p className="text-sm text-slate-400">Timeline: 4-16 weeks depending on program</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">3</div>
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-orange-400">Registered Apprenticeships</h3>
                  <p className="text-slate-300 mb-2">
                    Longer programs (12-18 months) where you earn while you learn. Work in real jobs, get paid, 
                    complete online coursework, and graduate with experience + credentials. No student debt.
                  </p>
                  <p className="text-sm text-slate-400">Examples: HVAC Technician, Building Maintenance</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-slate-300 mb-4">Not sure which path is right for you?</p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-all"
            >
              Talk to an Advisor
            </Link>
          </div>
        </div>
      </section>



      {/* Business & Entrepreneurship */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/images/business-highlight.jpg"
                alt="Business & Entrepreneurship"
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Build Your Business, Build Your Future
              </h2>
              <p className="text-xl text-slate-300 mb-6 leading-relaxed">
                Our programs don't just teach you a skill—they prepare you to become an entrepreneur. 
                Whether you want to open your own barbershop, start a mobile grooming business, 
                or launch a healthcare practice, we give you the tools to succeed.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-semibold text-white">Business Planning & Strategy</p>
                    <p className="text-sm text-slate-400">Learn how to create a business plan, manage finances, and grow your brand</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-semibold text-white">Marketing & Client Acquisition</p>
                    <p className="text-sm text-slate-400">Master social media, networking, and customer retention strategies</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-semibold text-white">Licensing & Legal Compliance</p>
                    <p className="text-sm text-slate-400">Navigate permits, insurance, and regulations with confidence</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-semibold text-white">Ongoing Mentorship</p>
                    <p className="text-sm text-slate-400">Connect with successful entrepreneurs and get guidance as you grow</p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4 mb-6">
                <p className="text-sm text-orange-300">
                  <strong className="text-orange-400">Success Story:</strong> 73% of our barber graduates 
                  either own their own chair or have opened their own shop within 2 years of graduation.
                </p>
              </div>

              <Link
                href="/programs"
                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-all"
              >
                Explore Programs
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories / Testimonials */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900">
            Real Stories, Real Success
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Testimonial Image */}
            <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/testimonial-hero.jpg"
                alt="Success Story"
                fill
                className="object-cover"
              />
            </div>

            {/* Testimonial Content */}
            <div className="space-y-6">
              <div className="bg-slate-50 rounded-lg p-8 border-l-4 border-orange-500">
                <div className="flex items-start gap-4 mb-4">
                  <svg className="w-12 h-12 text-orange-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <div>
                    <p className="text-lg text-slate-700 leading-relaxed mb-4">
                      "Elevate for Humanity changed my life. I went from working two jobs and barely making ends meet to becoming a licensed barber with my own chair. The training was free through WIOA, and I started earning while I learned through the apprenticeship program. Now I'm making more than I ever thought possible, and I have a skill no one can take away from me."
                    </p>
                    <div className="border-t border-slate-200 pt-4">
                      <p className="font-bold text-slate-900">Marcus Johnson</p>
                      <p className="text-sm text-slate-600">Barber Apprenticeship Graduate</p>
                      <p className="text-sm text-orange-600 font-semibold mt-1">Now earning $65,000+/year</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <div className="text-3xl font-bold text-green-600">95%</div>
                  <div className="text-xs text-slate-600 mt-1">Job Placement Rate</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="text-3xl font-bold text-blue-600">$0</div>
                  <div className="text-xs text-slate-600 mt-1">Average Student Debt</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <div className="text-3xl font-bold text-purple-600">500+</div>
                  <div className="text-xs text-slate-600 mt-1">Lives Changed</div>
                </div>
              </div>

              <Link
                href="/success-stories"
                className="inline-flex items-center gap-2 text-orange-600 font-semibold hover:text-orange-700"
              >
                Read More Success Stories
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start?</h2>
          <p className="text-xl mb-8">Contact us and begin training within 2 weeks</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-white text-orange-600 font-bold rounded-lg hover:bg-gray-100 transition-all"
            >
              Contact Us
            </Link>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-orange-700 text-white font-bold rounded-lg hover:bg-orange-800 border-2 border-white transition-all"
            >
              Talk to Advisor
            </Link>
          </div>
          <p className="mt-6 text-white/90">
            Questions? Call <a href="tel:3173143757" className="font-bold underline">317-314-3757</a>
          </p>
        </div>
      </section>
    </main>
  );
}
