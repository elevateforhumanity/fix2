import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { WelcomeAudio } from "@/components/WelcomeAudio";
import VideoTestimonials from "@/components/VideoTestimonials";
import TrustBadges from "@/components/TrustBadges";
import EmployerPartners from "@/components/EmployerPartners";
import EnrollmentCounter from "@/components/EnrollmentCounter";
import ProgramFinder from "@/components/ProgramFinder";
import LiveChat from "@/components/LiveChat";

export const metadata = {
  title: "Elevate for Humanity | Free Career Training Indianapolis",
  description:
    "100% free workforce training through WIOA funding. CNA, HVAC, Barber, CDL and more. Real jobs, real credentials, no tuition.",
  alternates: {
    canonical: "https://www.elevateforhumanity.org",
  },
};

export default function HomePage() {
  return (
    <main className="bg-white">
      {/* Welcome Audio - Plays once on page load */}
      <WelcomeAudio />
      {/* HERO - VIDEO BANNER WITH SOUND */}
      <section className="relative overflow-hidden bg-slate-900">
        <div className="mx-auto max-w-7xl">
          <div className="relative w-full aspect-[16/9] max-h-[700px] overflow-hidden">
            <video
              autoPlay
              loop
              playsInline
              preload="auto"
              controls
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/videos/hero-home.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* Overlay with CTA */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
              <div className="w-full p-8 sm:p-12 md:p-16">
                <div className="max-w-4xl">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 drop-shadow-lg">
                    Transform Your Life Through Free Career Training
                  </h1>
                  <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 sm:mb-8 drop-shadow-lg">
                    100% funded training in high-demand careers. No cost. Real jobs. Real future.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/apply"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold text-white bg-orange-500 rounded-full hover:bg-orange-600 transition-all hover:scale-105 shadow-xl"
                    >
                      Apply Now
                      <ArrowRight size={20} />
                    </Link>
                    <Link
                      href="/programs"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold text-white bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all border-2 border-white/50"
                    >
                      View Programs
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR STORY - WHO WE ARE - WITH IMAGES */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
              Breaking Barriers, Building Futures
            </h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto mb-6 sm:mb-8"></div>
          </div>
          
          {/* First Section - Text + Image */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center mb-8 sm:mb-12 md:mb-16">
            <div className="space-y-4 sm:space-y-6">
              <p className="text-lg sm:text-xl leading-relaxed text-slate-700">
                <strong>We see you.</strong> Not your mistakes. Not your struggles. Not your zip code or your past. 
                We see your potential, your determination, and your right to a better future.
              </p>
              
              <p className="text-base sm:text-lg leading-relaxed text-slate-700">
                Elevate For Humanity was born from a simple truth: everyone deserves a chance to earn a living wage, 
                support their family, and build a life they're proud of.
              </p>
            </div>
            
            <div className="relative w-full max-w-xl mx-auto">
              <Image
                src="/images/programs/cna-hero.jpg"
                alt="CNA career training program"
                width={600}
                height={450}
                className="w-full h-auto rounded-xl shadow-xl"
                quality={90}
                loading="lazy"
              />
            </div>
          </div>

          {/* Second Section - Image + Text */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center mb-8 sm:mb-12 md:mb-16">
            <div className="relative w-full max-w-xl mx-auto md:order-first">
              <Image
                src="/images/programs/hvac-hero.jpg"
                alt="HVAC professional training environment"
                width={600}
                height={450}
                className="w-full h-auto rounded-xl shadow-xl"
                quality={90}
                loading="lazy"
              />
            </div>
            
            <div className="space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg leading-relaxed text-slate-700">
                <strong>We're breaking that cycle.</strong> Through partnerships with workforce boards, justice programs, 
                and employers who believe in second chances, we've created a pathway that actually works.
              </p>
              
              <p className="text-base sm:text-lg leading-relaxed text-slate-700">
                Free training in high-demand careers. Real credentials that employers respect. Job placement support 
                that doesn't stop until you're hired.
              </p>
            </div>
          </div>

          {/* Third Section - Text + Image */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center mb-8 sm:mb-12">
            <div className="space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg leading-relaxed text-slate-700">
                Whether you're coming home from incarceration, working two jobs but still can't pay rent, or just need 
                someone to believe in you—<strong>we're that someone.</strong>
              </p>
              
              <p className="text-lg sm:text-xl font-semibold text-slate-900 leading-relaxed">
                This isn't a handout. It's an investment in people who are ready to work hard and change their lives. 
                When we give someone the tools and training they need, they don't just get a job—they transform their entire future.
              </p>
            </div>
            
            <div className="relative w-full max-w-xl mx-auto">
              <Image
                src="/images/programs/cdl-hero.jpg"
                alt="CDL commercial driver training success"
                width={600}
                height={400}
                className="w-full h-auto rounded-xl shadow-xl"
                quality={90}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* VALUE PROPOSITIONS - WITH IMAGES */}
      <section className="py-12 sm:py-16 bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Prop 1 - Free Training */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src="/images/facilities-new/facility-3.jpg"
                  alt="Free Training Facility"
                  fill
                  className="object-cover object-center"
                  quality={75}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-4 sm:p-6 text-center">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 mb-2 sm:mb-3">
                  No Cost. No Debt. No Excuses.
                </h3>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  Through WIOA, WRG, JRI, and employer partnerships, we cover everything—tuition, books, 
                  supplies, even transportation and childcare support.
                </p>
              </div>
            </div>

            {/* Prop 2 - Real Credentials */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src="/images/healthcare/cpr-certification-group.jpg"
                  alt="Real Credentials and Certifications"
                  fill
                  className="object-cover object-center"
                  quality={75}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-4 sm:p-6 text-center">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 mb-2 sm:mb-3">
                  Credentials That Open Doors
                </h3>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  State licenses. Industry certifications. Credentials that employers actually respect and hire for.
                </p>
              </div>
            </div>

            {/* Prop 3 - Job Connections */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg sm:col-span-2 lg:col-span-1">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src="/images/business/program-tax-preparation.jpg"
                  alt="Job Connections and Career Placement"
                  fill
                  className="object-cover object-center"
                  quality={75}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-4 sm:p-6 text-center">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 mb-2 sm:mb-3">
                  We Don't Stop at Training
                </h3>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  We connect you with employers who are actively hiring and support you through your first 90 days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REAL IMPACT - TESTIMONIAL WITH IMAGE */}
      <section className="py-12 sm:py-16 md:py-20 bg-blue-600 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center mb-8 sm:mb-12 md:mb-16">
            <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/beauty/program-barber-training.jpg"
                alt="Success Story - Barber Graduate"
                fill
                className="object-cover object-center"
                quality={75}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <div className="text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6">"</div>
              <blockquote className="text-base sm:text-lg md:text-xl font-light leading-relaxed mb-4 sm:mb-6">
                I was unemployed for 18 months after getting out. Nobody would hire me. 
                Elevate didn't just train me—they believed in me. Now I'm a licensed barber 
                making $50,000 a year, and I can finally support my family.
              </blockquote>
              <div className="text-base sm:text-lg font-semibold">— Marcus, Barber Apprenticeship Graduate</div>
              <div className="text-blue-200 text-xs sm:text-sm mt-2">From unemployed to employed in 12 weeks</div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">85%</div>
              <div className="text-blue-200">Job Placement Rate</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">$45K+</div>
              <div className="text-blue-200">Average Starting Salary</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">500+</div>
              <div className="text-blue-200">Lives Changed</div>
            </div>
          </div>
        </div>
      </section>





      {/* CREDENTIALED PROGRAMS - HYBRID - SHORT TERM */}
      {/* SUCCESS IMAGES - LARGE GALLERY */}
      <section className="py-12 sm:py-16 md:py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Your Future Starts Here
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
            <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/healthcare/hero-healthcare-professionals.jpg"
                alt="Healthcare Training Success"
                fill
                className="object-cover object-center hover:scale-105 transition-transform duration-700"
                quality={75}
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
            <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/beauty/hero-barber-training.jpg"
                alt="Barber Training Success"
                fill
                className="object-cover object-center hover:scale-105 transition-transform duration-700"
                quality={75}
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/trades/hero-program-hvac.jpg"
                alt="HVAC Training Success"
                fill
                className="object-cover object-center hover:scale-105 transition-transform duration-700"
                quality={75}
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
            <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/trades/hero-program-cdl.jpg"
                alt="CDL Training Success"
                fill
                className="object-cover object-center hover:scale-105 transition-transform duration-700"
                quality={75}
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
          </div>


        </div>
      </section>

      {/* IMAGE GALLERY - TRAINING IN ACTION */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 sm:mb-4">
              Training That Works
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-6 sm:mb-8">
              Real students. Real skills. Real careers.
            </p>
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 text-base sm:text-lg md:text-xl font-bold text-white bg-orange-500 rounded-full hover:bg-orange-600 transition-all hover:scale-105 shadow-xl"
            >
              View All Programs →
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12">
            <div className="relative aspect-square w-full rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/healthcare/program-cna-training.jpg"
                alt="CNA Healthcare Training"
                fill
                className="object-cover object-center hover:scale-110 transition-transform duration-500"
                quality={75}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="relative aspect-square w-full rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/trades/program-hvac-technician.jpg"
                alt="HVAC Technician Training"
                fill
                className="object-cover object-center hover:scale-110 transition-transform duration-500"
                quality={75}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="relative aspect-square w-full rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/trades/program-cdl-commercial-driving.jpg"
                alt="CDL Commercial Driver Training"
                fill
                className="object-cover object-center hover:scale-110 transition-transform duration-500"
                quality={75}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="relative aspect-square w-full rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/beauty/program-beauty-training.jpg"
                alt="Beauty and Barber Training"
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
                quality={75}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="relative aspect-square w-full rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/trades/program-electrical-training.jpg"
                alt="Electrical Apprentice Training"
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
                quality={75}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="relative aspect-square w-full rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/healthcare/cpr-individual-practice.jpg"
                alt="CPR and First Aid Training"
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
                quality={75}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF - IMPACT NUMBERS */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Real Results
            </h2>
            <p className="text-xl text-blue-100">
              Changing lives through workforce training
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-6xl font-bold mb-2">500+</div>
              <p className="text-xl text-blue-100">Students Trained</p>
            </div>
            <div>
              <div className="text-6xl font-bold mb-2">85%</div>
              <p className="text-xl text-blue-100">Job Placement</p>
            </div>
            <div>
              <div className="text-6xl font-bold mb-2">100+</div>
              <p className="text-xl text-blue-100">Hiring Partners</p>
            </div>
            <div>
              <div className="text-6xl font-bold mb-2">$45K</div>
              <p className="text-xl text-blue-100">Avg Starting Salary</p>
            </div>
          </div>
        </div>
      </section>

      {/* FUNDING EXPLAINED */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                How Is This Free?
              </h2>
              <p className="text-xl text-slate-700 mb-8">
                Government workforce programs pay for everything. You qualify if you're:
              </p>
              <ul className="space-y-4 mb-8">
                {qualifications.map((qual, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-600 flex-shrink-0 mt-2"></div>
                    <div>
                      <p className="font-bold text-slate-900">{qual.title}</p>
                      <p className="text-slate-600">{qual.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Link
                href="/funding"
                className="inline-flex items-center gap-2 px-8 py-4 text-lg font-bold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all hover:scale-105 shadow-xl"
              >
                Learn About Funding
                <ArrowRight size={20} />
              </Link>
            </div>
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/general/hero-slide-healthcare.jpg"
                alt="Professional training programs"
                fill
                className="object-cover"
                quality={75}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>



      {/* REAL TRAINING PHOTOS */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Hands-On Training
            </h2>
            <p className="text-xl text-slate-600">
              Real students learning real skills
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/healthcare/cpr-group-training-session.jpg"
                alt="CPR training - Real students learning life-saving skills"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/healthcare/program-cna-training.jpg"
                alt="CNA training - Real healthcare students"
                fill
                className="object-cover"
                quality={75}
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/beauty/program-beauty-training.jpg"
                alt="Beauty training - Real beauty students"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/healthcare/cpr-certification-group.jpg"
                alt="CPR certification - Real students getting certified"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          </div>
        </div>
      </section>



      {/* FINAL CTA - BIG & BOLD */}
      <section className="py-24 bg-orange-500 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Ready to Start?
          </h2>
          <p className="text-2xl md:text-3xl text-orange-100 mb-10">
            Apply now and begin training within 2 weeks
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-3 px-12 py-6 text-2xl font-bold text-orange-600 bg-white rounded-full hover:bg-orange-50 transition-all hover:scale-105 shadow-2xl"
            >
              Apply Now
              <ArrowRight size={28} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 px-12 py-6 text-2xl font-bold text-white bg-orange-700 rounded-full hover:bg-orange-800 transition-all hover:scale-105 border-4 border-white/30"
            >
              Talk to Advisor
            </Link>
          </div>
          <p className="mt-8 text-lg text-orange-100">
            Questions? Call us at <strong className="text-white">(317) 123-4567</strong> or email <strong className="text-white">info@elevateforhumanity.org</strong>
          </p>
        </div>
      </section>

      {/* TRUST BADGES - Show credibility */}
      <TrustBadges />

      {/* VIDEO TESTIMONIALS - Real student success stories */}
      <VideoTestimonials />

      {/* ENROLLMENT COUNTER - Live social proof */}
      <EnrollmentCounter />

      {/* EMPLOYER PARTNERS - Show hiring companies */}
      <EmployerPartners />

      {/* PROGRAM FINDER - Interactive quiz */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Not Sure Which Program is Right for You?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Take our quick 2-minute quiz to find your perfect career path
          </p>
          <Link
            href="/program-finder"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg text-lg"
          >
            Find My Program
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* LIVE CHAT WIDGET */}
      <LiveChat />
    </main>
  );
}

const programs = [
  {
    title: "CNA",
    description: "Certified Nursing Assistant - Healthcare career in 4-6 weeks",
    duration: "4-6 weeks",
    salary: "$35K-$45K",
    image: "/media/programs/cna-hd.jpg",
    link: "/programs/cna",
  },
  {
    title: "HVAC",
    description: "Heating & cooling technician - High-demand trade",
    duration: "8-12 weeks",
    salary: "$45K-$65K",
    image: "/media/programs/hvac-hd.jpg",
    link: "/programs/hvac",
  },
  {
    title: "Barber",
    description: "Licensed barber - Build your own business",
    duration: "12 weeks",
    salary: "$30K-$55K",
    image: "/media/programs/barber-hd.jpg",
    link: "/programs/barber",
  },
  {
    title: "CDL",
    description: "Commercial driver - Trucking career with benefits",
    duration: "4-6 weeks",
    salary: "$50K-$70K",
    image: "/media/programs/cdl-hd.jpg",
    link: "/programs/cdl",
  },
  {
    title: "Medical Assistant",
    description: "Clinical support role in healthcare settings",
    duration: "8-10 weeks",
    salary: "$32K-$42K",
    image: "/media/programs/medical-assistant-hd.jpg",
    link: "/programs/medical-assistant",
  },
  {
    title: "Building Tech",
    description: "Maintenance technician for commercial properties",
    duration: "6-8 weeks",
    salary: "$38K-$52K",
    image: "/media/programs/building-tech-hd.jpg",
    link: "/programs/building-maintenance",
  },
];

const qualifications = [
  {
    title: "Unemployed or Underemployed",
    description: "Looking for better career opportunities",
  },
  {
    title: "Marion County Resident",
    description: "Or surrounding Indiana counties",
  },
  {
    title: "Eligible to Work in US",
    description: "Legal work authorization required",
  },
  {
    title: "Committed to Success",
    description: "Ready to complete training and get hired",
  },
];
