import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'What is Elevate for Humanity?',
      answer:
        'Elevate for Humanity is a 501(c)(3) nonprofit Career and Technical Institute dedicated to funding innovative apprenticeship and training programs in Marion County, IN. We bridge the gap between education and employment by empowering individuals with the skills they need to excel in today\'s dynamic workforce.',
    },
    {
      question: 'Who can apply for your programs?',
      answer:
        'Our programs are open to individuals in Marion County, IN who are seeking career training and development. We serve job seekers, career changers, and those looking to upskill in various industries including healthcare, trades, technology, and business.',
    },
    {
      question: 'Are your programs free?',
      answer:
        'Many of our programs are grant-funded and available at no cost to eligible participants. We work with WIOA funding, scholarships, and other financial assistance programs to make training accessible. Contact us to learn about funding options for specific programs.',
    },
    {
      question: 'What types of programs do you offer?',
      answer:
        'We offer comprehensive training in multiple sectors including Barber Apprenticeship, CNA Training, Building Services Technology, CPR/AED/First Aid, Business Startup, Tax Office Management, Esthetician Services, Beauty Education, and Public Safety Reentry programs.',
    },
    {
      question: 'How long do programs typically last?',
      answer:
        'Program duration varies depending on the specific training. Some certifications can be completed in a few weeks, while comprehensive apprenticeships may take several months to a year. Each program page provides detailed timeline information.',
    },
    {
      question: 'Do you provide job placement assistance?',
      answer:
        'Yes! We maintain strong partnerships with local employers and provide job placement assistance to program graduates. Our 92% job placement rate reflects our commitment to connecting trained individuals with meaningful employment opportunities.',
    },
    {
      question: 'What certifications will I earn?',
      answer:
        'Participants earn industry-recognized certifications upon program completion. Specific certifications vary by program and may include state licenses, national certifications, and professional credentials recognized by employers.',
    },
    {
      question: 'Can I take classes online?',
      answer:
        'Many of our programs offer hybrid learning options that combine online coursework with hands-on practical training. This flexible approach allows you to balance education with other responsibilities while gaining essential skills.',
    },
    {
      question: 'How do I apply?',
      answer:
        'You can apply through our online application form or contact us directly. Our team will guide you through the application process, help determine your eligibility for funding, and answer any questions about specific programs.',
    },
    {
      question: 'What support services do you provide?',
      answer:
        'Beyond training, we offer comprehensive support including mentorship, career counseling, financial aid guidance, study groups, and access to our student community. We\'re committed to your success throughout your learning journey and beyond.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-600 to-brand-700 text-white py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl opacity-90 max-w-2xl">
            Find answers to common questions about our programs and services
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container max-w-3xl">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-brand-border rounded-lg overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-brand-surface transition-colors"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="font-semibold text-brand-text pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-brand-600 flex-shrink-0 transition-transform ${
                      openIndex === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-6 py-4 bg-brand-surface border-t border-brand-border">
                    <p className="text-brand-text-muted leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-brand-surface py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-brand-text mb-4">
            Still Have Questions?
          </h2>
          <p className="text-lg text-brand-text-muted mb-8 max-w-2xl mx-auto">
            Our team is here to help. Reach out to us and we'll be happy to provide more information.
          </p>
          <a href="/connect" className="btn inline-block">
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}
