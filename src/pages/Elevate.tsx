export default function Elevate() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brown-700 to-brown-800 text-white py-20">
        <div className="container">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Elevate Your Future
          </h1>
          <p className="text-2xl opacity-90 max-w-3xl">
            Empowering individuals through skill development and career training
            that transforms lives
          </p>
        </div>
      </section>
      {/* Mission Section */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-brown-900 mb-6 text-center">
              Our Mission
            </h2>
            <p className="text-lg text-brown-600 leading-relaxed mb-8">
              At Elevate for Humanity Career and Technical Institute, we are
              dedicated to bridging the gap between education and employment by
              funding innovative apprenticeship and training programs. Located
              in Marion County, IN, our mission is to empower individuals with
              the skills they need to excel in today's dynamic workforce.
            </p>
            <p className="text-lg text-brown-600 leading-relaxed">
              By investing in human potential, we aim to transform lives and
              build a more skilled, sustainable community. Join us as we pave
              the way for brighter futures through quality education and
              hands-on experience.
            </p>
          </div>
        </div>
      </section>
      {/* Impact Stats */}
      <section className="bg-beige-50 py-16">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-green-600 mb-2">
                5,000+
              </div>
              <div className="text-brown-600">Lives Impacted</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-green-600 mb-2">92%</div>
              <div className="text-brown-600">Job Placement Rate</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-green-600 mb-2">13+</div>
              <div className="text-brown-600">Training Programs</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-green-600 mb-2">$2M+</div>
              <div className="text-brown-600">Funding Distributed</div>
            </div>
          </div>
        </div>
      </section>
      {/* Values Section */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-brown-900 mb-12 text-center">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-brown-900 mb-3">
                Excellence
              </h3>
              <p className="text-brown-600">
                We strive for the highest quality in education and training,
                ensuring our students receive industry-leading instruction.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold text-brown-900 mb-3">
                Community
              </h3>
              <p className="text-brown-600">
                We build strong partnerships with employers, educators, and
                community organizations to create opportunities for all.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">💡</div>
              <h3 className="text-xl font-semibold text-brown-900 mb-3">
                Innovation
              </h3>
              <p className="text-brown-600">
                We embrace new technologies and teaching methods to provide
                cutting-edge training that meets evolving industry needs.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="bg-gradient-to-r from-brown-700 to-brown-800 text-white py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Elevate Your Career?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of individuals who have transformed their lives
            through our programs
          </p>
          <a
            href="/programs"
            className="inline-block bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Explore Programs
          </a>
        </div>
      </section>
    </div>
  );
}
