'use client';

import { useState } from 'react';
import { Metadata } from 'next';

const faqs = [
  {
    category: 'Getting Started',
    questions: [
      {
        q: 'How do I apply for training?',
        a: 'Call us at 317-314-3757 or fill out our contact form. An advisor will discuss your goals and help you find the right program and funding options.'
      },
      {
        q: 'Is training really free?',
        a: 'Yes! Most students qualify for 100% free training through WIOA, WRG, JRI, or apprenticeship programs. We help you navigate the funding process.'
      },
      {
        q: 'What programs do you offer?',
        a: 'We offer training in Barber/Cosmetology, CNA, Medical Assistant, HVAC, CDL, Tax Preparation, Business Startup, and more. All programs lead to industry certifications.'
      },
      {
        q: 'How long does training take?',
        a: 'Most programs are 4-12 weeks. Some apprenticeships run longer but you get paid while you train.'
      }
    ]
  },
  {
    category: 'Eligibility & Funding',
    questions: [
      {
        q: 'Who qualifies for WIOA funding?',
        a: 'WIOA serves adults, dislocated workers, and youth who need training to get or keep employment. Income requirements vary. We help you determine eligibility.'
      },
      {
        q: 'What is WRG?',
        a: 'Workforce Ready Grant covers tuition for high-demand careers in Indiana. No income limits. We help with the application process.'
      },
      {
        q: 'Can I get training if I have a criminal record?',
        a: 'Yes! We work with JRI (Justice Reinvestment Initiative) and other programs specifically designed to help people with criminal backgrounds get training and jobs.'
      },
      {
        q: 'Do I need a high school diploma?',
        a: 'Not always. Some programs accept GED or equivalent. We can help you get your GED while training.'
      }
    ]
  },
  {
    category: 'Support Services',
    questions: [
      {
        q: 'What if I need childcare during training?',
        a: 'We can help connect you with childcare assistance programs. This is one of the barriers we help students overcome.'
      },
      {
        q: 'Do you help with transportation?',
        a: 'Yes. We can help with gas cards, bus passes, or connecting you with transportation resources.'
      },
      {
        q: 'What if I need housing assistance?',
        a: 'Our Director of Housing Stability works with students facing eviction or housing instability to keep them housed while they complete training.'
      },
      {
        q: 'Do you offer mental health support?',
        a: 'Yes. We partner with licensed mental health professionals who provide assessment and support services to students.'
      }
    ]
  },
  {
    category: 'After Training',
    questions: [
      {
        q: 'Will I get a job after training?',
        a: 'We connect you with employers who are hiring. Many of our programs have direct employer partnerships and job placement assistance.'
      },
      {
        q: 'What kind of salary can I expect?',
        a: 'Most of our programs lead to jobs paying $35K-$60K+ annually. Specific salaries vary by field and experience.'
      },
      {
        q: 'Do you help with job applications and interviews?',
        a: 'Yes! We provide resume help, interview prep, and direct connections to employers who are actively hiring.'
      },
      {
        q: 'What if I need help after I get hired?',
        a: 'We provide ongoing support even after you start working. Our goal is your long-term success, not just job placement.'
      }
    ]
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleQuestion = (categoryIndex: number, questionIndex: number) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenIndex(openIndex === key ? null : key);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-white border-b border-slate-200 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-slate-600">
            Get answers to common questions about our training programs, funding, and support services.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b-2 border-orange-600">
                {category.category}
              </h2>
              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => {
                  const key = `${categoryIndex}-${questionIndex}`;
                  const isOpen = openIndex === key;
                  
                  return (
                    <div key={questionIndex} className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                      <button
                        onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-50 transition"
                      >
                        <span className="font-semibold text-slate-900 pr-4">{faq.q}</span>
                        <span className={`text-2xl text-orange-600 transition-transform ${isOpen ? 'rotate-45' : ''}`}>
                          +
                        </span>
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-4 text-slate-700">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-orange-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Still Have Questions?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Call us at <a href="tel:3173143757" className="font-bold underline">317-314-3757</a> or send us a message.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-orange-600 font-bold rounded-lg hover:bg-slate-50 transition text-lg"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}
