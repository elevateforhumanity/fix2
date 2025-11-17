import Link from 'next/link';

export const metadata = {
  title: 'FAQ | Elevate for Humanity',
  description:
    'Frequently asked questions about WIOA training programs and workforce development',
};

export default function FAQPage() {
  const faqs = [
    {
      question: 'What is WIOA?',
      answer:
        'The Workforce Innovation and Opportunity Act (WIOA) provides FREE training to help Americans get high-quality jobs in high-demand industries. WIOA funding covers tuition, training materials, and support services for eligible participants.',
    },
    {
      question: 'Who qualifies for WIOA funding?',
      answer:
        'Adults seeking career advancement, dislocated workers needing retraining, youth ages 16-24 entering the workforce, and individuals with barriers to employment may qualify. Eligibility is determined by local workforce boards based on income, employment status, and other factors.',
    },
    {
      question: 'How do I enroll in a program?',
      answer:
        'Click "Check Your Eligibility" on our homepage to start the enrollment process. You\'ll complete an eligibility assessment, choose your program, and work with a case manager to finalize your enrollment.',
    },
    {
      question: 'Are the programs really 100% free?',
      answer:
        'Yes! WIOA covers 100% of tuition and training materials for eligible participants. Some programs may also provide support for childcare, transportation, and other barriers to training.',
    },
    {
      question: 'What programs are available?',
      answer:
        'We offer 16+ career training programs including Barber Apprenticeship, HVAC Technician, CNA Certification, Medical Assistant, Phlebotomy, EKG Technician, Tax Preparation, Business Start-Up, and more. All programs lead to industry-recognized certifications.',
    },
    {
      question: 'How long do programs take?',
      answer:
        'Program length varies by career path. Most programs range from 160 to 2,000 hours. Barber Apprenticeship is 2,000 hours, HVAC is 640 hours, CNA is 120 hours, and other programs vary. Check individual program pages for specific details.',
    },
    {
      question: 'Will I get job placement help?',
      answer:
        'Yes! All programs include job placement support. We work with local employers, provide resume assistance, interview preparation, and connect you with hiring partners. Our job placement rate is 85% within 6 months of completion.',
    },
    {
      question: 'Can I work while in training?',
      answer:
        'Many programs are designed to accommodate working students with flexible schedules. Registered Apprenticeship programs like Barber Apprenticeship include paid on-the-job training where you earn while you learn.',
    },
    {
      question: 'What is a Registered Apprenticeship?',
      answer:
        'A Registered Apprenticeship is a DOL-approved program that combines paid on-the-job training with classroom instruction. Apprentices earn a wage while learning, and employers receive tax credits and skilled workers.',
    },
    {
      question: 'Do I need a high school diploma?',
      answer:
        'Requirements vary by program. Some programs require a high school diploma or GED, while others accept students working toward their GED. Contact us to discuss your specific situation and program requirements.',
    },
    {
      question: 'What certifications will I earn?',
      answer:
        'All programs lead to industry-recognized certifications. Examples include Indiana State Barber License, EPA 608 Certification (HVAC), State Nursing Assistant Certification (CNA), National Certification (Medical Assistant), and more.',
    },
    {
      question: "How do I know if I'm eligible?",
      answer:
        'Eligibility depends on factors like income, employment status, age, and barriers to employment. The best way to find out is to complete our eligibility assessment or contact your local WorkOne center.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="elevate-nav">
        <div className="elevate-logo">
          <div className="elevate-logo-mark">E</div>
          <div className="flex flex-col">
            <span className="font-bold text-lg">Elevate for Humanity</span>
            <span className="text-xs text-gray-600">
              Elevate Connects Directory
            </span>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <Link
            href="/programs"
            className="text-gray-700 hover:text-red-600 font-medium"
          >
            Programs
          </Link>
          <Link href="/" className="elevate-btn-secondary">
            Back to Home
          </Link>
        </div>
      </header>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-16">
        <div className="elevate-container text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about WIOA-funded training programs
          </p>
        </div>
      </section>
      {/* FAQ Content */}
      <main className="elevate-container py-16">
        <div className="max-w-4xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="elevate-card">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                {faq.question}
              </h2>
              <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="elevate-card max-w-2xl mx-auto bg-gradient-to-br from-red-50 to-orange-50">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h2>
            <p className="text-gray-700 mb-6">
              Our team is here to help you find the right training program for
              your career goals.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact" className="elevate-btn-primary">
                Contact Us
              </Link>
              <Link href="/enroll" className="elevate-btn-secondary">
                Check Your Eligibility
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
