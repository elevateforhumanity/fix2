import Image from "next/image";

export const metadata = {
  title: 'About Us | Elevate for Humanity',
  description: 'Elevate For Humanity is a workforce training and community development initiative focused on real people, real barriers, and real opportunity. Learn about our mission and impact.',
  openGraph: {
    title: 'About Elevate for Humanity',
    description: 'Workforce training and community development for real people with real barriers.',
    images: ['/media/hero/hero-learners.jpg'],
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <main className="bg-white">
      {/* Hero Section with Image */}
      <section className="relative bg-slate-900">
        <div className="relative h-64 md:h-80">
          <Image
            src="/media/hero/hero-learners.jpg"
            alt="About Elevate for Humanity"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-900/40" />
        </div>
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto max-w-6xl px-4 w-full">
            <h1 className="text-3xl font-bold text-white md:text-5xl">
              About Elevate For Humanity
            </h1>
            <p className="mt-3 max-w-2xl text-base text-slate-100 md:text-lg">
              Elevate For Humanity is a workforce training and community
              development initiative focused on real people, real barriers, and
              real opportunity.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-6 mb-8">
            <h2 className="text-lg font-semibold text-slate-900">
              Legal Structure
            </h2>
            <p className="mt-3 text-sm text-slate-700">
              <strong>Elevate for Humanity Training Center</strong> is the workforce development program of{" "}
              <strong>SELFISH INC</strong>, a 501(c)(3) tax-exempt nonprofit organization 
              (EIN: 99-3483511) dedicated to holistic support for individuals and families.
            </p>
            <p className="mt-3 text-sm text-slate-700">
              SELFISH INC operates two primary programs:
            </p>
            <ul className="mt-2 ml-6 list-disc text-sm text-slate-700">
              <li><strong>Elevate for Humanity Training Center</strong> - Workforce development and career training</li>
              <li><strong>Selfish Inc Mental Wellness</strong> - Trauma, divorce, and addiction support</li>
            </ul>
            <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4">
              <p className="text-xs font-semibold text-green-900">
                ✅ ETPL Approved Training Provider
              </p>
              <p className="mt-2 text-xs text-green-800">
                <strong>Provider Name:</strong> Elevate for Humanity Training Center<br/>
                <strong>Provider Location ID:</strong> 10000949<br/>
                <strong>Status:</strong> Approved for Indiana's Eligible Training Provider List (INTraining)
              </p>
            </div>
          </div>

          <h2 className="text-xl font-semibold text-slate-900">
            Our Mission
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-700">
            Through our Elevate for Humanity program, we connect individuals to career training, 
            supportive services, and job placement by partnering with workforce boards, employers,
            schools, and community-based organizations. Our goal is to break cycles, build skills, 
            and elevate families and communities.
          </p>

          <h2 className="mt-10 text-xl font-semibold text-slate-900">
            What We Offer
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-sm text-slate-700">
            <li>Free and funded training in high-demand careers</li>
            <li>Support with workforce grants and funding eligibility</li>
            <li>Partnerships with employers and workforce boards</li>
            <li>Guidance from application through job placement</li>
            <li>Special pathways for adults, parents, youth, and returning citizens</li>
          </ul>

          <h2 className="mt-10 text-xl font-semibold text-slate-900">
            Government Approvals & Authorizations
          </h2>
          <div className="mt-4 rounded-xl border-2 border-blue-200 bg-blue-50 p-6">
            <h3 className="text-lg font-semibold text-slate-900">
              Approved Workforce Training Provider
            </h3>
            <p className="mt-3 text-sm text-slate-700">
              <strong>Elevate for Humanity Training Center</strong> (Provider ID: 10000949) is an 
              approved training provider authorized to deliver workforce development programs 
              funded by federal and state agencies.
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-4">
              <div className="rounded-lg border border-green-300 bg-white p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">ETPL</span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-900">ETPL Approved</h4>
                </div>
                <p className="text-xs text-slate-700">
                  Indiana Eligible Training Provider List (Provider ID: 10000949)
                </p>
              </div>
              <div className="rounded-lg border border-blue-300 bg-white p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">DOL</span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-900">DOL Sponsored</h4>
                </div>
                <p className="text-xs text-slate-700">
                  U.S. Department of Labor approved training provider for workforce programs
                </p>
              </div>
              <div className="rounded-lg border border-blue-300 bg-white p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-900">WIOA Approved</h4>
                </div>
                <p className="text-xs text-slate-700">
                  Authorized provider for Workforce Innovation and Opportunity Act programs
                </p>
              </div>
              <div className="rounded-lg border border-blue-300 bg-white p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">WRG</span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-900">WRG Authorized</h4>
                </div>
                <p className="text-xs text-slate-700">
                  Approved for Indiana Workforce Ready Grants program delivery
                </p>
              </div>
            </div>
            <p className="mt-4 text-xs text-slate-600">
              These approvals allow us to offer 100% free training to eligible participants 
              through federal and state workforce funding programs.
            </p>
          </div>

          <h2 className="mt-10 text-xl font-semibold text-slate-900">
            Certifications & Partnerships
          </h2>
          <div className="mt-4 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-lg font-semibold text-slate-900">
                ByBlack Certified Business
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                Elevate for Humanity is officially certified as a Black-Owned and 
                Operated business by U.S. Black Chambers, Inc. and ByBlack.us. 
                This certification recognizes our commitment to economic empowerment 
                and community development.
              </p>
              <div className="mt-4 flex items-center gap-3">
                <a
                  href="https://www.byblack.us"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-red-600 hover:underline"
                >
                  Learn More About ByBlack →
                </a>
              </div>
              <p className="mt-3 text-xs text-slate-500">
                Certified by U.S. Black Chambers, Inc. | #ByBlackBusiness
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-lg font-semibold text-slate-900">
                NRF Foundation RISE Up Partner
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                As an approved training partner with the National Retail Federation 
                Foundation, we deliver industry-backed RISE Up credentials that provide 
                foundational employability skills for retail and customer service careers.
              </p>
              <div className="mt-4 flex items-center gap-3">
                <a
                  href="/programs/rise-up"
                  className="text-xs font-semibold text-red-600 hover:underline"
                >
                  View RISE Up Program →
                </a>
              </div>
              <p className="mt-3 text-xs text-slate-500">
                Official NRF Foundation Training Partner
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-lg font-semibold text-slate-900">
                Indiana Registered Bidder
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                Registered with the Indiana Department of Administration as an approved 
                bidder for state contracts and procurement opportunities.
              </p>
              <p className="mt-3 text-xs text-slate-500">
                Bidder ID: 0000067741 | Indiana Dept. of Administration
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-lg font-semibold text-slate-900">
                Google for Nonprofits
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                Approved for Google Ad Grants providing $10,000/month in free advertising 
                to promote our workforce training programs and reach more individuals in need.
              </p>
              <p className="mt-3 text-xs text-slate-500">
                Charity ID: 99-3483511 | Google for Nonprofits Partner
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-lg font-semibold text-slate-900">
                VA-Approved Training Provider
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                Certified School Certifying Official (SCO) for On-the-Job Training & 
                Apprenticeship Programs under the Harry W. Colmery Educational Assistance Act.
              </p>
              <p className="mt-3 text-xs text-slate-500">
                Facility Code: 11111111 | VA-Approved Training
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-lg font-semibold text-slate-900">
                501(c)(3) Nonprofit Status
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                SELFISH INC operates as a registered 501(c)(3) nonprofit organization 
                dedicated to workforce development and mental wellness support.
              </p>
              <p className="mt-3 text-xs text-slate-500">
                EIN: 99-3483511 | Tax-Exempt Nonprofit
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-lg font-semibold text-slate-900">
                IRS VITA Site
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                IRS-certified VITA (Volunteer Income Tax Assistance) site providing 
                free tax preparation services and tax preparer certification training.
              </p>
              <p className="mt-3 text-xs text-slate-500">
                VITA SDIN: 99420837 | IRS-Certified Tax Preparation
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-lg font-semibold text-slate-900">
                Veteran-Owned Business
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                Proudly owned and operated by U.S. Army veteran Elizabeth Greene 
                (2000-2007, Honorable Discharge). Veteran-friendly training programs 
                with GI Bill acceptance and VA partnerships.
              </p>
              <p className="mt-3 text-xs text-slate-500">
                U.S. Army Veteran | VOSB Eligible | Veteran-Friendly Employer
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-lg font-semibold text-slate-900">
                Licensed Educator
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                Licensed substitute teacher with expertise in youth and adult education. 
                Qualified to deliver school-based programs and educational partnerships.
              </p>
              <p className="mt-3 text-xs text-slate-500">
                Indiana Licensed Educator | Youth Program Qualified
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-6">
            <h3 className="text-base font-semibold text-slate-900">
              Supplier Diversity & Contracting
            </h3>
            <p className="mt-2 text-sm text-slate-700">
              Our ByBlack certification enables us to participate in supplier diversity 
              programs and contracting opportunities. Organizations seeking to work with 
              certified Black-owned businesses can find us in the{" "}
              <a
                href="https://www.byblack.us/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 hover:underline"
              >
                ByBlack.us national database
              </a>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
