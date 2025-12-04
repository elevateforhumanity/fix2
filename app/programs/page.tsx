import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

async function getPrograms() {
  const supabase = await createClient();
  
  const { data: programs, error } = await supabase
    .from("programs")
    .select("slug, name, title, description, category, duration_weeks, salary_min, salary_max, image_url, featured")
    .eq("is_active", true)
    .order("featured", { ascending: false })
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching programs:", error);
    return [];
  }

  return programs || [];
}

// Map program categories to high-quality, properly sized images
function getProgramImage(slug: string, category: string): string {
  // High-quality program-specific images (600x400 aspect ratio)
  const customImages: Record<string, string> = {
    "medical-assistant": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1920&h=1000&fit=crop&q=85",
    "phlebotomy-technician": "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=1920&h=1000&fit=crop&q=85",
    "pharmacy-technician": "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=1920&h=1000&fit=crop&q=85",
    "dental-assistant": "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1920&h=1000&fit=crop&q=85",
    "it-support-specialist": "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1920&h=1000&fit=crop&q=85",
    "cybersecurity-analyst": "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1920&h=1000&fit=crop&q=85",
    "web-development": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1920&h=1000&fit=crop&q=85",
    "data-analytics": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1000&fit=crop&q=85",
    "customer-service-representative": "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&h=1000&fit=crop&q=85",
    "administrative-assistant": "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=1920&h=1000&fit=crop&q=85",
    "bookkeeping": "https://images.unsplash.com/photo-1554224311-beee4ece3c5d?w=1920&h=1000&fit=crop&q=85",
    "real-estate-agent": "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1920&h=1000&fit=crop&q=85",
    "insurance-agent": "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=1920&h=1000&fit=crop&q=85",
    "solar-panel-installation": "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1920&h=1000&fit=crop&q=85",
    "automotive-technician": "https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=1920&h=1000&fit=crop&q=85",
    "diesel-mechanic": "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1920&h=1000&fit=crop&q=85",
    "forklift-operator": "https://images.unsplash.com/photo-1553413077-190dd305871c?w=1920&h=1000&fit=crop&q=85",
    "manufacturing-technician": "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1920&h=1000&fit=crop&q=85",
    "entrepreneurship-small-business": "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1920&h=1000&fit=crop&q=85",
    // Additional programs
    "cna": "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=1920&h=1000&fit=crop&q=85",
    "certified-nursing-assistant": "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=1920&h=1000&fit=crop&q=85",
    "hvac-technician": "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1920&h=1000&fit=crop&q=85",
    "cdl": "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1920&h=1000&fit=crop&q=85",
    "commercial-truck-driving": "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1920&h=1000&fit=crop&q=85",
    "barber-apprenticeship": "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1920&h=1000&fit=crop&q=85",
    "building-maintenance-technician": "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1920&h=1000&fit=crop&q=85",
  };

  if (customImages[slug]) {
    return customImages[slug];
  }

  // High-quality category fallback images
  const categoryImages: Record<string, string> = {
    "Healthcare": "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1920&h=1000&fit=crop&q=85",
    "Technology": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1920&h=1000&fit=crop&q=85",
    "Business": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1920&h=1000&fit=crop&q=85",
    "Sales": "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1920&h=1000&fit=crop&q=85",
    "Skilled Trades": "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1920&h=1000&fit=crop&q=85",
    "Transportation": "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1920&h=1000&fit=crop&q=85",
    "trades": "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1920&h=1000&fit=crop&q=85",
    "healthcare": "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1920&h=1000&fit=crop&q=85",
    "transportation": "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1920&h=1000&fit=crop&q=85",
    "barber_beauty": "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1920&h=1000&fit=crop&q=85",
    "professional": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1920&h=1000&fit=crop&q=85",
  };

  return categoryImages[category] || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&h=1000&fit=crop&q=85";
}

export const metadata = {
  title: "Programs | Elevate For Humanity",
  description:
    "Explore free career training programs in healthcare, trades, transportation, and workforce readiness funded through WIOA, WRG, and partner programs.",
};

export default async function ProgramsPage() {
  const programs = await getPrograms();

  return (
    <main className="min-h-screen bg-white">
      {/* HERO SECTION - Humanized */}
      <section className="relative py-20 bg-gradient-to-br from-red-50 via-white to-blue-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z"/>
              </svg>
              {programs.length} Career Paths Available
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
              Find Your Path to a Better Career
            </h1>

            <p className="text-xl sm:text-2xl text-slate-700 leading-relaxed">
              Real training for real jobs. Whether you want to work in healthcare, learn a trade, or start your own business—we've got you covered. And yes, it's 100% free.
            </p>

            <div className="flex flex-wrap gap-6 justify-center pt-6">
              <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-slate-900">100%</div>
                  <div className="text-sm text-slate-600">Free Training</div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-slate-900">$35K-$75K</div>
                  <div className="text-sm text-slate-600">Starting Salary</div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-slate-900">8-16</div>
                  <div className="text-sm text-slate-600">Weeks to Complete</div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center pt-8">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-orange-600 text-white text-lg font-bold rounded-full hover:bg-orange-700 transition-colors shadow-lg"
              >
                Talk to Someone Today
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/book-appointment"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 text-lg font-bold rounded-full hover:bg-slate-50 transition-colors border-2 border-slate-200 shadow-lg"
              >
                Book a Free Appointment
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAM HIGHLIGHTS */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Program Highlights</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Explore our most popular career training programs with 100% funding available through WIOA, WRG, and partner grants.
            </p>
          </div>

          <div className="space-y-16">
            {/* Healthcare Programs */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/programs/efh-cna-hero.jpg"
                  alt="Healthcare Training Programs"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-4">
                  Healthcare
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">Healthcare Training</h3>
                <p className="text-lg text-slate-600 mb-6">
                  Launch your healthcare career with programs in Medical Assistant, CNA, Pharmacy Tech, Phlebotomy, and more. Get hands-on clinical training and graduate job-ready in 8-24 weeks.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-700"><strong>Clinical Experience:</strong> Real hospital and clinic placements</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-700"><strong>High Demand:</strong> $35K-$55K starting salaries</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-700"><strong>Fast Track:</strong> Complete in 8-24 weeks</span>
                  </li>
                </ul>
                <div className="flex flex-wrap gap-4">
                  <Link href="/programs/medical-assistant" className="px-6 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition">
                    View Healthcare Programs
                  </Link>
                  <Link href="/apply" className="px-6 py-3 border-2 border-blue-600 text-blue-600 font-bold rounded-full hover:bg-blue-50 transition">
                    Apply Now
                  </Link>
                </div>
              </div>
            </div>

            {/* Barber & Beauty Programs - Earn While You Learn */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <div className="inline-block px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold mb-4">
                  Earn While You Learn
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">Barber & Beauty Apprenticeship</h3>
                <p className="text-lg text-slate-700 mb-6">
                  Get paid to learn! Our DOL Registered Apprenticeship lets you work in a real barbershop or salon while earning your Indiana license. No student debt, just real paychecks.
                </p>
                
                <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
                  <h4 className="font-bold text-blue-900 mb-2">How to Enroll:</h4>
                  <ol className="space-y-2 text-sm text-blue-900">
                    <li><strong>1.</strong> Book a free appointment or call us at (317) 314-3757</li>
                    <li><strong>2.</strong> We'll help you find a barbershop/salon sponsor</li>
                    <li><strong>3.</strong> Start working and earning immediately</li>
                    <li><strong>4.</strong> Complete 1,500 hours while getting paid</li>
                    <li><strong>5.</strong> Take your state board exam (we cover the cost)</li>
                  </ol>
                </div>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-900"><strong>$15-$25/hour</strong> while training + tips</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-900"><strong>Indiana State License</strong> upon completion</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-900"><strong>Suite Ownership Training</strong> - start your own business</span>
                  </li>
                </ul>
                <div className="flex flex-wrap gap-4">
                  <Link href="/book-appointment" className="px-6 py-3 bg-orange-600 text-white font-bold rounded-full hover:bg-orange-700 transition">
                    Book Free Appointment
                  </Link>
                  <Link href="/programs/barber-apprenticeship" className="px-6 py-3 border-2 border-orange-600 text-orange-600 font-bold rounded-full hover:bg-orange-50 transition">
                    Learn More
                  </Link>
                </div>
              </div>
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl order-1 md:order-2">
                <Image
                  src="/images/efh/programs/barber.jpg"
                  alt="Barber Apprenticeship - Earn While You Learn"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Skilled Trades Programs */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/hero/hero-skilled-trades.jpg"
                  alt="Skilled Trades Training"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="inline-block px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-semibold mb-4">
                  Skilled Trades
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">Skilled Trades Training</h3>
                <p className="text-lg text-slate-600 mb-6">
                  Build a high-paying career in HVAC, building maintenance, and construction trades. Hands-on training with industry certifications and job placement support.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-700"><strong>High Wages:</strong> $45K-$75K+ earning potential</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-700"><strong>Industry Certs:</strong> EPA, OSHA, and trade certifications</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-700"><strong>Job Ready:</strong> Immediate employment opportunities</span>
                  </li>
                </ul>
                <div className="flex flex-wrap gap-4">
                  <Link href="/programs/hvac-technician" className="px-6 py-3 bg-orange-600 text-white font-bold rounded-full hover:bg-orange-700 transition">
                    View Trades Programs
                  </Link>
                  <Link href="/apply" className="px-6 py-3 border-2 border-orange-600 text-orange-600 font-bold rounded-full hover:bg-orange-50 transition">
                    Apply Now
                  </Link>
                </div>
              </div>
            </div>

            {/* Business & Professional Programs */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <div className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-4">
                  Business & Professional
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">Business & Workforce Training</h3>
                <p className="text-lg text-slate-600 mb-6">
                  Start your own business or advance your professional career with programs in tax preparation, entrepreneurship, and workforce readiness.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-700"><strong>Quick Start:</strong> Programs as short as 5-10 weeks</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-700"><strong>Certifications:</strong> IRS VITA, QuickBooks, Microsoft 365</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-700"><strong>Startup Support:</strong> Business mentorship and funding</span>
                  </li>
                </ul>
                <div className="flex flex-wrap gap-4">
                  <Link href="/programs/tax-prep" className="px-6 py-3 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 transition">
                    View Business Programs
                  </Link>
                  <Link href="/apply" className="px-6 py-3 border-2 border-green-600 text-green-600 font-bold rounded-full hover:bg-green-50 transition">
                    Apply Now
                  </Link>
                </div>
              </div>
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl order-1 md:order-2">
                <Image
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1920&h=1000&fit=crop&q=85"
                  alt="Business Training Programs"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>
          </div>

          {/* View All Programs CTA */}
          <div className="mt-16 text-center bg-slate-50 rounded-2xl p-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Explore All {programs.length}+ Programs</h3>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              We offer training in healthcare, trades, transportation, beauty, business, and more. All programs include funding assistance and job placement support.
            </p>
            <Link href="/contact" className="inline-block px-8 py-4 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition text-lg">
              Talk to an Advisor
            </Link>
          </div>
        </div>
      </section>

      {/* Milady RISE Callout for Beauty & Barber */}
      <section className="py-20 bg-gradient-to-r from-pink-50 to-purple-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-pink-600">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 text-4xl">💇</div>
              <div>
                <h2 className="text-3xl font-extrabold mb-4">Milady RISE Partner – Client Safety & Well-Being</h2>
                <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                  Our beauty and barber students gain access to Milady RISE training in:
                </p>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-pink-50 rounded-lg p-4">
                    <div className="font-semibold text-pink-900 mb-1">Domestic Violence Awareness</div>
                    <p className="text-sm text-slate-600">Recognize signs and provide support</p>
                  </div>
                  <div className="bg-pink-50 rounded-lg p-4">
                    <div className="font-semibold text-pink-900 mb-1">Human Trafficking Awareness</div>
                    <p className="text-sm text-slate-600">Identify and respond appropriately</p>
                  </div>
                  <div className="bg-pink-50 rounded-lg p-4">
                    <div className="font-semibold text-pink-900 mb-1">Infection Control</div>
                    <p className="text-sm text-slate-600">2-hour safety certification course</p>
                  </div>
                </div>
                <p className="text-slate-700 mb-4">
                  Students and staff who complete all modules earn a <strong>Client Well-Being & Safety Certification</strong> and can apply for Milady's <strong>$500 RISE scholarships</strong>.
                </p>
                <p className="text-slate-600">
                  To enroll, students visit Milady's training portal and use our school code: <code className="bg-slate-100 px-3 py-1 rounded font-mono text-pink-700">efhcti-rise295</code>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border-2 border-orange-200 bg-gradient-to-br from-orange-50 via-white to-blue-50 p-8 lg:p-12 shadow-lg">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Unsure Which Program Fits You Best?
              </h2>
              <p className="text-lg text-slate-700 mb-8">
                You don&apos;t have to figure it out alone. Our team can help you
                explore options based on your interests, work history, and funding
                eligibility.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-orange-600 px-8 py-4 text-lg font-semibold text-white hover:bg-orange-700 transition-colors shadow-lg"
                >
                  Get Matched to a Program
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center rounded-full border-2 border-orange-600 px-8 py-4 text-lg font-semibold text-orange-600 hover:bg-orange-50 transition-colors"
                >
                  Learn How Funding Works
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600">
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
            Questions? Call <a href="tel:317-314-3757" className="underline font-semibold">317-314-3757</a> or email <a href="mailto:elevateforhumanity.edu@gmail.com" className="underline font-semibold">elevateforhumanity.edu@gmail.com</a>
          </p>
        </div>
      </section>

    </main>
  );
}
