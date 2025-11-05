export default function Services() {
  const services = [
    {
      title: 'Apprenticeship Funding',
      description:
        'We provide funding for innovative apprenticeship programs that bridge the gap between education and employment.',
      icon: '💰',
    },
    {
      title: 'Career Training Programs',
      description:
        'Access comprehensive training programs in healthcare, trades, technology, and business sectors.',
      icon: '📚',
    },
    {
      title: 'Job Placement Assistance',
      description:
        'Connect with employers and receive support in securing employment after program completion.',
      icon: '🤝',
    },
    {
      title: 'Certification Support',
      description:
        'Earn industry-recognized certifications that validate your skills and enhance career prospects.',
      icon: '🏆',
    },
    {
      title: 'Mentorship Programs',
      description:
        'Benefit from experienced mentors who guide you through your career development journey.',
      icon: '👥',
    },
    {
      title: 'Financial Aid Guidance',
      description:
        'Navigate funding options including WIOA, grants, and scholarships to make training accessible.',
      icon: '📋',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-600 to-brand-700 text-white py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl opacity-90 max-w-2xl">
            Comprehensive support for your career development journey in Marion County, IN
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="border border-brand-border rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-brand-text mb-3">
                  {service.title}
                </h3>
                <p className="text-brand-text-muted">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-surface py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-brand-text mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-brand-text-muted mb-8 max-w-2xl mx-auto">
            Contact us today to learn more about our services and how we can help you achieve your career goals.
          </p>
          <a
            href="/connect"
            className="btn inline-block"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}
