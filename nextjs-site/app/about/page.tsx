export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-50 to-white border-b border-orange-200">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            About Elevate for Humanity
          </h1>
          <p className="mt-4 text-lg text-gray-600 leading-relaxed max-w-2xl">
            Empowering communities through workforce development and career
            training.
          </p>
        </div>
      </section>
      {/* Mission Section */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              At Elevate for Humanity Career and Technical Institute, we bridge
              the gap between education and employment by providing innovative
              apprenticeship and training programs.
            </p>
            <p className="text-lg text-gray-600 mb-4">
              Located in Marion County, IN, our mission is to empower
              individuals with the skills they need to excel in today's dynamic
              workforce.
            </p>
            <p className="text-lg text-gray-600">
              By investing in human potential, we transform lives and build a
              more skilled, sustainable community.
            </p>
          </div>
          <div className="bg-orange-50 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Our Impact
            </h3>
            <div className="space-y-4">
              <div>
                <div className="text-4xl font-bold text-orange-600">5,000+</div>
                <div className="text-gray-600">Graduates</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-orange-600">92%</div>
                <div className="text-gray-600">Job Placement Rate</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-orange-600">8</div>
                <div className="text-gray-600">Career Programs</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-orange-600">$0</div>
                <div className="text-gray-600">Cost with Funding</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Values Section */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Excellence
              </h3>
              <p className="text-gray-600">
                We strive for excellence in everything we do, from our
                curriculum to our student support services.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Community
              </h3>
              <p className="text-gray-600">
                We believe in building strong communities through education,
                employment, and empowerment.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Innovation
              </h3>
              <p className="text-gray-600">
                We embrace innovative approaches to workforce development and
                career training.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Programs Overview */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          What We Offer
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Paid Apprenticeships
            </h3>
            <p className="text-gray-600">
              Earn while you learn with our paid apprenticeship programs. Get
              hands-on experience with real employers while building your
              skills.
            </p>
          </div>
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Industry Certifications
            </h3>
            <p className="text-gray-600">
              Earn recognized industry certifications that employers value. Our
              programs prepare you for state licensure and professional
              credentials.
            </p>
          </div>
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Job Placement Assistance
            </h3>
            <p className="text-gray-600">
              We don't just train you—we help you find employment. Our 92% job
              placement rate speaks to our commitment to your success.
            </p>
          </div>
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              100% Funded Programs
            </h3>
            <p className="text-gray-600">
              All our programs are fully funded through WIOA and WRG. No
              tuition, no debt—just opportunity.
            </p>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="bg-orange-600 text-white py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of graduates who have launched successful careers
            through our programs.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/programs"
              className="inline-block bg-white text-orange-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              View Programs
            </a>
            <a
              href="/apply"
              className="inline-block bg-orange-700 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-800 transition-colors border-2 border-white"
            >
              Apply Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
