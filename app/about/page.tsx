export default function AboutPage() {
  return (
    <main className="bg-white">
      <section className="border-b border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-16">
          <h1 className="text-2xl font-bold text-slate-900 md:text-4xl">
            About Elevate For Humanity
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-700 md:text-base">
            Elevate For Humanity is a workforce training and community
            development initiative focused on real people, real barriers, and
            real opportunity.
          </p>
        </div>
      </section>

      <section className="py-10 md:py-12">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-xl font-semibold text-slate-900">
            Our Mission
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-700">
            We connect individuals to career training, supportive services, and
            job placement by partnering with workforce boards, employers,
            schools, and community-based organizations. Our goal is to break
            cycles, build skills, and elevate families and communities.
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
