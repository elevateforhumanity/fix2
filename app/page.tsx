import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { WelcomeAudio } from "@/components/WelcomeAudio";

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
      {/* HERO - VIDEO BANNER */}
      <section className="relative text-white overflow-hidden h-[500px] sm:h-[600px] md:h-[700px]">
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ 
              objectFit: 'cover',
              width: '100%',
              height: '100%',
              filter: 'brightness(1.1) contrast(1.05) saturate(1.1)'
            }}
          >
            <source src="/videos/barber-hero.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Content */}
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-32">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-green-500 px-6 py-3 text-sm font-bold mb-6 animate-pulse">
              <span className="text-lg">✓</span>
              <span>100% FREE - GOVERNMENT FUNDED</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              We Believe in<br />
              <span className="text-orange-400">Second Chances</span>
            </h1>

            {/* Subheadline - STORY */}
            <p className="text-xl md:text-2xl text-slate-200 mb-4 font-light leading-relaxed">
              Your past doesn't define your future. Whether you're returning from incarceration, 
              struggling to make ends meet, or just need a fresh start—we're here to help you 
              build the career and life you deserve.
            </p>
            <p className="text-lg md:text-xl text-slate-300 mb-8 font-light">
              100% free training. Real jobs waiting. No barriers, just opportunity.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/apply"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 text-xl font-bold text-white bg-orange-500 rounded-full hover:bg-orange-600 transition-all hover:scale-105 shadow-2xl"
              >
                Apply Now - It's Free
                <ArrowRight size={24} />
              </Link>
              <Link
                href="/funding"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 text-xl font-bold text-white bg-blue-600 rounded-full hover:bg-blue-500 transition-all hover:scale-105 border-2 border-white/20"
              >
                Check Your Funding
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* OUR STORY - WHO WE ARE */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Breaking Barriers, Building Futures
            </h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto mb-8"></div>
          </div>
          
          <div className="prose prose-lg max-w-none text-slate-700 space-y-6">
            <p className="text-xl leading-relaxed">
              <strong>We see you.</strong> Not your mistakes. Not your struggles. Not your zip code or your past. 
              We see your potential, your determination, and your right to a better future.
            </p>
            
            <p className="text-lg leading-relaxed">
              Elevate For Humanity was born from a simple truth: everyone deserves a chance to earn a living wage, 
              support their family, and build a life they're proud of. But for too many people in Indianapolis, 
              the system has failed them. Traditional education is too expensive. Job training programs have waiting lists. 
              Employers won't hire without experience. It's a cycle that keeps people trapped.
            </p>
            
            <p className="text-lg leading-relaxed">
              <strong>We're breaking that cycle.</strong> Through partnerships with workforce boards, justice programs, 
              and employers who believe in second chances, we've created a pathway that actually works. Free training 
              in high-demand careers. Real credentials that employers respect. Job placement support that doesn't stop 
              until you're hired.
            </p>
            
            <p className="text-lg leading-relaxed">
              Whether you're coming home from incarceration, working two jobs but still can't pay rent, or just need 
              someone to believe in you—<strong>we're that someone.</strong> We'll help you navigate the paperwork, 
              cover your training costs, teach you the skills, and connect you with employers ready to hire.
            </p>
            
            <p className="text-xl font-semibold text-slate-900 leading-relaxed">
              This isn't charity. This is justice. This is what happens when a community decides that everyone—
              regardless of their past—deserves a shot at a better future.
            </p>
          </div>
        </div>
      </section>

      {/* VALUE PROPOSITIONS - WITH IMAGES */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Prop 1 - Free Training */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="relative h-64">
                <Image
                  src="/images/location-8.jpg"
                  alt="Free Training Facility"
                  fill
                  className="object-cover object-center"
                  quality={90}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  No Cost. No Debt. No Excuses.
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  Through WIOA, WRG, JRI, and employer partnerships, we cover everything—tuition, books, 
                  supplies, even transportation and childcare support. Your only job is to show up and learn.
                </p>
              </div>
            </div>

            {/* Prop 2 - Real Credentials */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="relative h-64">
                <Image
                  src="/images/medical-assistant-1.jpg"
                  alt="Real Credentials"
                  fill
                  className="object-cover object-center"
                  quality={100}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  Credentials That Open Doors
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  State licenses. Industry certifications. Credentials that employers actually respect and hire for. 
                  Not just a certificate—a ticket to a real career with real earning potential.
                </p>
              </div>
            </div>

            {/* Prop 3 - Job Connections */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="relative h-64">
                <Image
                  src="/images/ameco-martin.jpg"
                  alt="Job Connections"
                  fill
                  className="object-cover object-center"
                  quality={90}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  We Don't Stop at Training
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  Our job is to get you hired. We connect you with employers who are actively hiring, 
                  help you prepare for interviews, and support you through your first 90 days on the job. 
                  Your success is our success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REAL IMPACT - TESTIMONIAL */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-12">
            <div className="text-6xl mb-6">"</div>
            <blockquote className="text-2xl md:text-3xl font-light leading-relaxed mb-8">
              I was unemployed for 18 months after getting out. Nobody would hire me. 
              Elevate didn't just train me—they believed in me. Now I'm a licensed barber 
              making $50,000 a year, and I can finally support my family.
            </blockquote>
            <div className="text-lg font-semibold">— Marcus, Barber Apprenticeship Graduate</div>
            <div className="text-blue-200 text-sm mt-2">From unemployed to employed in 12 weeks</div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 text-center mt-16">
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

      {/* FACILITY SHOWCASE */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Modern Training Facilities
            </h2>
            <p className="text-xl text-slate-600">
              Professional environment designed for hands-on learning and career success
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/images/location-9.jpg"
                alt="Elevate For Humanity training facility"
                fill
                className="object-cover object-center"
                quality={95}
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            </div>
          </div>
        </div>
      </section>



      {/* CREDENTIALED PROGRAMS - HYBRID - SHORT TERM */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Credentialed Programs
            </h2>
            <p className="text-xl text-slate-600">
              Hybrid learning • Short-term training • Industry-recognized credentials
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Hybrid Learning */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="relative h-48">
                <Image
                  src="/images/location-7.jpg"
                  alt="Hybrid Learning Format"
                  fill
                  className="object-cover object-center"
                  quality={90}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-3 text-center">
                  Hybrid Format
                </h3>
                <p className="text-slate-700 text-center">
                  Learn online at your own pace, then practice hands-on skills at our modern training facility with expert instructors.
                </p>
              </div>
            </div>

            {/* Short-Term */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="relative h-64">
                <Image
                  src="/images/barber-highlight-2.jpg"
                  alt="Short-Term Training"
                  fill
                  className="object-cover object-center"
                  quality={100}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-3 text-center">
                  Short-Term Training
                </h3>
                <p className="text-slate-700 text-center">
                  Complete programs in weeks, not years. Get job-ready fast with focused, intensive training designed for quick career entry.
                </p>
              </div>
            </div>

            {/* Credentialed */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="relative h-48">
                <Image
                  src="/images/medical-assistant-2.jpg"
                  alt="Industry Credentials"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-3 text-center">
                  Industry Credentials
                </h3>
                <p className="text-slate-700 text-center">
                  Earn state licenses, national certifications, and industry-recognized credentials that employers value and trust.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 px-10 py-5 text-xl font-bold text-white bg-orange-500 rounded-full hover:bg-orange-600 transition-all hover:scale-105 shadow-xl"
            >
              Explore Programs
              <ArrowRight size={24} />
            </Link>
          </div>
        </div>
      </section>

      {/* PROGRAMS - CLEAN GRID */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Most Popular Programs
            </h2>
            <p className="text-xl text-slate-600">
              High-demand careers with great pay
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <Link
                key={index}
                href={program.link}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all hover:-translate-y-2"
              >
                <div className="relative h-56">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500" quality={100} sizes="100vw"
                  />
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    FREE
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-orange-500 transition-colors">
                    {program.title}
                  </h3>
                  <div className="mb-4 space-y-2">
                    <div className="text-sm">
                      <span className="text-slate-700 font-semibold">{program.duration}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-slate-700 font-semibold">{program.salary}</span>
                    </div>
                  </div>
                  <p className="text-slate-600 mb-4">{program.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-orange-500 font-bold group-hover:underline">
                      Learn More →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-slate-700 bg-white rounded-full hover:bg-slate-100 transition-all border-2 border-slate-300 hover:border-orange-500 shadow-md"
            >
              View All Programs
            </Link>
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
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/gallery/image6.jpg"
                alt="Training facility"
                fill
                className="object-cover" quality={100} sizes="100vw"
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
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/media/programs/cpr-group-training-hd.jpg"
                alt="CPR training - Real students learning life-saving skills"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/media/programs/cna-hd.jpg"
                alt="CNA training - Real healthcare students"
                fill
                className="object-cover"
                quality={100}
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/media/programs/medical-esthetics-training-hd.jpg"
                alt="Medical esthetics training - Real beauty students"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/media/programs/cpr-certification-group-hd.jpg"
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
