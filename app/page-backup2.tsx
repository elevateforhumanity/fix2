import Link from "next/link";

function PrimaryButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold bg-red-600 text-white shadow-md hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 transition"
    >
      {children}
    </Link>
  );
}

function SecondaryButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold border border-slate-300 text-slate-800 bg-white/80 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 transition"
    >
      {children}
    </Link>
  );
}

export default function HomePage() {
  return (
    <main className="bg-white">

      {/* SECTION 1: HERO BANNER */}
      <section className="relative min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-banner.jpg"
            alt="Elevate For Humanity Career Training"
            fill
            className="object-cover"
            priority
            quality={90}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-800/90 to-slate-900/95" />
        </div>
        
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-5xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 drop-shadow-2xl leading-tight">
              Your Pathway to Skills, Success, and a Better Future Starts Here
            </h1>
            <p className="text-xl md:text-2xl mb-8 drop-shadow-lg leading-relaxed max-w-4xl mx-auto">
              Free and fundable career training, state-approved programs, Registered Apprenticeships, and full wrap-around support for students, families, and communities across Indiana.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                href="/apply" 
                className="bg-red-600 text-white px-10 py-5 rounded-full font-bold hover:bg-red-700 text-lg shadow-2xl transition-all inline-flex items-center gap-2"
              >
                Apply Now
                <ArrowRight size={20} />
              </Link>
              <Link 
                href="/programs" 
                className="bg-white text-slate-900 px-10 py-5 rounded-full font-bold hover:bg-slate-100 text-lg shadow-2xl transition-all"
              >
                Explore Programs
              </Link>
              <Link 
                href="/contact" 
                className="bg-white/10 backdrop-blur-sm text-white px-10 py-5 rounded-full font-bold hover:bg-white/20 border-2 border-white text-lg shadow-2xl transition-all"
              >
                Talk With an Advisor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: WHO WE ARE */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Who We Are</h2>
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              <strong>Elevate for Humanity Technical & Career Institute</strong> is a workforce training institute focused on breaking generational barriers, rebuilding lives, and preparing individuals for in-demand careers.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              We are <strong>WIOA-funded</strong>, <strong>WRG-approved</strong>, <strong>JRI-approved</strong>, and a <strong>federally aligned Registered Apprenticeship Sponsor</strong> with programs listed on <strong>RAPIDS</strong> and the <strong>Indiana ETPL</strong>.
            </p>
            <div className="inline-block bg-red-50 rounded-lg p-8 mt-6">
              <p className="text-2xl font-bold text-red-600">
                Our mission is simple:<br />
                <span className="text-slate-900">Create pathways. Remove barriers. Elevate humanity—one life at a time.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: PROGRAM PATHWAYS */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Our Program Pathways</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              
              {/* Card 1 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                  <Briefcase size={64} className="text-white" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">Career Training Programs</h3>
                  <p className="text-gray-700 mb-4">
                    Gain in-demand skills in Barbering, CNA, HVAC, CDL, Building Maintenance, Phlebotomy, and more.
                  </p>
                  <p className="text-sm text-green-600 font-semibold">WIOA/WRG/JRI funding available</p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center">
                  <Award size={64} className="text-white" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">Registered Apprenticeships</h3>
                  <p className="text-gray-700 mb-4">
                    Earn while you learn through federally aligned DOL apprenticeships.
                  </p>
                  <p className="text-sm text-green-600 font-semibold">Programs listed in RAPIDS with direct employer pathways</p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center">
                  <Users size={64} className="text-white" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">Beauty & Barber Institute</h3>
                  <p className="text-gray-700 mb-4">
                    State-approved Barber Apprenticeship + Esthetics + Nail Tech training delivered by licensed instructors with 20+ years industry experience.
                  </p>
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-br from-orange-600 to-orange-800 flex items-center justify-center">
                  <Heart size={64} className="text-white" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">Support Services & Coaching</h3>
                  <p className="text-gray-700 mb-4">
                    Life coaching, workforce case management, digital literacy, mental health support, and re-entry navigation to help you succeed personally and professionally.
                  </p>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: FUNDING & APPROVALS */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Funding & Approvals</h2>
            
            <div className="grid md:grid-cols-2 gap-12 mb-12">
              
              {/* Funding Column */}
              <div>
                <h3 className="text-2xl font-bold mb-6 text-center">Funding You May Qualify For</h3>
                <div className="space-y-4">
                  <div className="flex items-start bg-green-50 rounded-lg p-4">
                    <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h4 className="font-bold">WIOA (WorkOne) Funding</h4>
                      <p className="text-sm text-gray-600">Federal workforce development funding</p>
                    </div>
                  </div>
                  <div className="flex items-start bg-green-50 rounded-lg p-4">
                    <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h4 className="font-bold">Workforce Ready Grant (WRG)</h4>
                      <p className="text-sm text-gray-600">Indiana state training grants</p>
                    </div>
                  </div>
                  <div className="flex items-start bg-green-50 rounded-lg p-4">
                    <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h4 className="font-bold">JRI (Jobs for Re-Entry Initiative)</h4>
                      <p className="text-sm text-gray-600">Support for justice-involved individuals</p>
                    </div>
                  </div>
                  <div className="flex items-start bg-green-50 rounded-lg p-4">
                    <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h4 className="font-bold">Employer Sponsorship</h4>
                      <p className="text-sm text-gray-600">Company-paid training programs</p>
                    </div>
                  </div>
                  <div className="flex items-start bg-green-50 rounded-lg p-4">
                    <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h4 className="font-bold">Registered Apprenticeship Funding Streams</h4>
                      <p className="text-sm text-gray-600">Earn while you learn programs</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Approvals Column */}
              <div>
                <h3 className="text-2xl font-bold mb-6 text-center">We Are Officially Approved Through</h3>
                <div className="space-y-4">
                  <div className="flex items-start bg-blue-50 rounded-lg p-4">
                    <CheckCircle className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h4 className="font-bold">U.S. Department of Labor</h4>
                      <p className="text-sm text-gray-600">Registered Apprenticeship Sponsor</p>
                    </div>
                  </div>
                  <div className="flex items-start bg-blue-50 rounded-lg p-4">
                    <CheckCircle className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h4 className="font-bold">RAPIDS</h4>
                      <p className="text-sm text-gray-600">Active Program Listings</p>
                    </div>
                  </div>
                  <div className="flex items-start bg-blue-50 rounded-lg p-4">
                    <CheckCircle className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h4 className="font-bold">Indiana Eligible Training Provider List (ETPL)</h4>
                      <p className="text-sm text-gray-600">State-approved training provider</p>
                    </div>
                  </div>
                  <div className="flex items-start bg-blue-50 rounded-lg p-4">
                    <CheckCircle className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h4 className="font-bold">State Workforce Agencies</h4>
                      <p className="text-sm text-gray-600">WorkOne, EmployIndy partnerships</p>
                    </div>
                  </div>
                  <div className="flex items-start bg-blue-50 rounded-lg p-4">
                    <CheckCircle className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h4 className="font-bold">Community & Employer Partners</h4>
                      <p className="text-sm text-gray-600">Direct hiring pipelines</p>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>

            <div className="text-center">
              <Link 
                href="/funding" 
                className="inline-block bg-red-600 text-white px-10 py-4 rounded-full font-bold hover:bg-red-700 text-lg shadow-xl transition-all"
              >
                Check Your Eligibility
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: FEATURED PROGRAM - BARBER APPRENTICESHIP */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/programs/efh-barber-hero.jpg"
            alt="Barber Apprenticeship Program"
            fill
            className="object-cover"
            quality={85}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-800/90 to-slate-900/95" />
        </div>
        
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Featured Program: Barber Apprenticeship
            </h2>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed">
              Become a licensed barber through Elevate's state-approved, federally aligned Barber Apprenticeship Program. Earn while you learn, gain hands-on shop experience, and complete all training for licensure with expert instructors.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <p className="font-bold text-lg">✔ WIOA</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <p className="font-bold text-lg">✔ JRI</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <p className="font-bold text-lg">✔ ETPL</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <p className="font-bold text-lg">✔ RAPIDS</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <p className="font-bold text-lg">✔ DOL</p>
              </div>
            </div>
            
            <Link 
              href="/programs/barber-apprenticeship" 
              className="inline-block bg-white text-red-600 px-10 py-5 rounded-full font-bold hover:bg-red-50 text-lg shadow-2xl transition-all"
            >
              Enroll in Barber Apprenticeship
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 6: STUDENT EXPERIENCE */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">What You Can Expect</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="text-red-600" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">Personalized Support</h3>
                <p className="text-gray-700">From enrollment to graduation, you have a dedicated team</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="text-red-600" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">Licensed Instructors</h3>
                <p className="text-gray-700">Learn from industry professionals with real-world experience</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="text-red-600" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">Modern LMS</h3>
                <p className="text-gray-700">Digital learning experience with 24/7 access</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="text-red-600" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">Small Class Sizes</h3>
                <p className="text-gray-700">Hands-on training with individual attention</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="text-red-600" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">Job Placement Assistance</h3>
                <p className="text-gray-700">Career support and employer connections</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="text-red-600" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">Trauma-Informed Services</h3>
                <p className="text-gray-700">Safe, inclusive environment for all learners</p>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: HOW TO GET STARTED */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">How to Get Started</h2>
            
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              
              <div className="text-center">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl font-bold text-red-600">1</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Apply Online</h3>
                <p className="text-gray-700">Fill out the free application form—takes 2 minutes</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl font-bold text-red-600">2</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Meet Your Advisor</h3>
                <p className="text-gray-700">We review your goals, funding, and enrollment options</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl font-bold text-red-600">3</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Get Approved for Funding</h3>
                <p className="text-gray-700">WIOA, WRG, JRI, or employer sponsorship</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl font-bold text-red-600">4</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Begin Training</h3>
                <p className="text-gray-700">Start your journey in a supportive, hands-on environment</p>
              </div>
              
            </div>

            <div className="text-center">
              <Link 
                href="/apply" 
                className="inline-block bg-red-600 text-white px-12 py-5 rounded-full font-bold hover:bg-red-700 text-xl shadow-2xl transition-all"
              >
                Start Your Application
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: PARTNER WITH US */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">Partner With Us</h2>
            <p className="text-xl text-gray-700 text-center mb-12 max-w-3xl mx-auto">
              We collaborate with barber & beauty schools, healthcare facilities, skilled trades employers, training providers, community organizations, re-entry programs, workforce boards, and apprenticeship sponsors.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <h3 className="font-bold text-lg mb-2">✔ Training</h3>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <h3 className="font-bold text-lg mb-2">✔ Co-Enrollment</h3>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <h3 className="font-bold text-lg mb-2">✔ Apprenticeships</h3>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <h3 className="font-bold text-lg mb-2">✔ Work-Based Learning</h3>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <h3 className="font-bold text-lg mb-2">✔ Hiring Pipelines</h3>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <h3 className="font-bold text-lg mb-2">✔ Employer Partnerships</h3>
              </div>
            </div>

            <div className="text-center">
              <Link 
                href="/employers" 
                className="inline-block bg-red-600 text-white px-10 py-4 rounded-full font-bold hover:bg-red-700 text-lg shadow-xl transition-all"
              >
                Become a Partner
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: LOCATION & CONTACT */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Visit Us</h2>
            
            <div className="bg-gray-50 rounded-lg p-8 mb-8">
              <h3 className="text-2xl font-bold mb-4">Elevate for Humanity Technical & Career Institute</h3>
              <p className="text-xl text-gray-700 mb-2">8888 Keystone Crossing, Suite 1400</p>
              <p className="text-xl text-gray-700 mb-6">Indianapolis, IN 46240</p>
              
              <div className="flex flex-wrap gap-6 justify-center text-lg">
                <a href="tel:317-314-3757" className="text-red-600 font-semibold hover:underline">
                  📞 317-314-3757
                </a>
                <a href="mailto:elevateforhumanity.edu@gmail.com" className="text-red-600 font-semibold hover:underline">
                  📧 elevateforhumanity.edu@gmail.com
                </a>
              </div>
            </div>

            <Link 
              href="/contact" 
              className="inline-block bg-red-600 text-white px-10 py-4 rounded-full font-bold hover:bg-red-700 text-lg shadow-xl transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/cta-banner.jpg"
            alt="Start your journey"
            fill
            className="object-cover"
            quality={85}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/95 to-red-700/95" />
        </div>
        
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Future?
            </h2>
            <p className="text-xl md:text-2xl mb-8">
              Apply today for free training and start building the career you deserve
            </p>
            
            <Link 
              href="/apply" 
              className="inline-block bg-white text-red-600 px-12 py-6 rounded-full font-bold hover:bg-red-50 text-xl shadow-2xl transition-all"
            >
              Apply Now - It's Free
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
