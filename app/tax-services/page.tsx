import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/tax-services',
  },
  title:
    'Tax Services Directory | Free & Professional Tax Preparation | Elevate For Humanity',
  description:
    'Complete directory of all tax services: Free VITA tax prep, professional tax filing, refund advances, and tax preparation training programs.',
};

const taxServices = [
  {
    category: 'Free Tax Services',
    services: [
      {
        name: 'Free Tax Prep VITA Center',
        description:
          'IRS Volunteer Income Tax Assistance - 100% free for individuals earning $64,000 or less',
        link: '/vita',
        icon: '🆓',
        features: [
          'IRS-certified volunteers',
          'E-file included',
          'No fees ever',
        ],
      },
      {
        name: 'Tax Self-Prep',
        description: 'Free online tax preparation software and guidance',
        link: '/tax-self-prep',
        icon: '💻',
        features: [
          'DIY tax filing',
          'Step-by-step guidance',
          'Free federal filing',
        ],
      },
    ],
  },
  {
    category: 'Professional Tax Services',
    services: [
      {
        name: 'SupersonicFastCash Tax Prep',
        description:
          'Professional tax preparation by certified experts with maximum refund guarantee',
        link: '/supersonicfastcash',
        icon: '⚡',
        features: ['Certified tax pros', 'Maximum refund', 'Fast processing'],
      },
      {
        name: 'Supersonic Tax Filing',
        description: 'Quick and accurate professional tax filing services',
        link: '/supersonic',
        icon: '🚀',
        features: [
          'Same-day service',
          'Accuracy guaranteed',
          'Refund tracking',
        ],
      },
      {
        name: 'Enhanced Tax Services',
        description: 'Premium tax preparation with audit protection',
        link: '/tax-filing/enhanced',
        icon: '⭐',
        features: ['Audit protection', 'Tax planning', 'Year-round support'],
      },
    ],
  },
  {
    category: 'Refund Services',
    services: [
      {
        name: 'Supersonic Cash Advance',
        description: 'Get your refund faster with our cash advance program',
        link: '/supersonic-cash',
        icon: '💵',
        features: ['Fast cash', 'No credit check', 'Same-day funding'],
      },
      {
        name: 'Supersonic Fast Cash',
        description: 'Rapid refund advance up to $6,000',
        link: '/supersonic-fast-cash',
        icon: '💰',
        features: ['Up to $6,000', 'Instant approval', '24-hour funding'],
      },
      {
        name: 'Refund Policy',
        description: 'Learn about our refund policies and guarantees',
        link: '/refund-policy',
        icon: '📋',
        features: [
          'Money-back guarantee',
          'Refund protection',
          'Clear policies',
        ],
      },
    ],
  },
  {
    category: 'Tax Training & Careers',
    services: [
      {
        name: 'Tax Preparation Training',
        description:
          'Become a certified tax preparer with our comprehensive training program',
        link: '/programs/tax-prep',
        icon: '🎓',
        features: ['IRS certification', 'Job placement', 'Flexible schedule'],
      },
      {
        name: 'Tax Prep & Financial Services',
        description:
          'Advanced training in tax preparation and financial services',
        link: '/programs/tax-prep-financial-services',
        icon: '📊',
        features: [
          'Advanced certification',
          'Financial planning',
          'Business tax',
        ],
      },
      {
        name: 'Join Our Tax Team',
        description: 'Career opportunities in tax preparation',
        link: '/tax-filing/join-team',
        icon: '👥',
        features: ['Competitive pay', 'Flexible hours', 'Training provided'],
      },
    ],
  },
  {
    category: 'Tax Filing Locations',
    services: [
      {
        name: 'Tax Filing Centers',
        description: 'Find a tax filing location near you',
        link: '/tax-filing',
        icon: '📍',
        features: ['Multiple locations', 'Walk-ins welcome', 'Evening hours'],
      },
      {
        name: 'State Tax Locations',
        description: 'State-specific tax filing centers',
        link: '/tax-filing/locations',
        icon: '🗺️',
        features: ['All 50 states', 'Local expertise', 'State tax specialists'],
      },
    ],
  },
];

export default function TaxServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/media-backup-20251128-043832/programs/tax-prep-hd.jpg"
          alt="Tax Services"
          fill
          className="object-cover"
          quality={100}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0   " />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-2xl">
            Complete Tax Services Directory
          </h1>
          <p className="text-base md:text-lg mb-8 text-gray-100 drop-shadow-lg">
            Free VITA tax prep, professional filing, refund advances, and tax
            career training - all in one place
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/vita"
              className="bg-brand-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all shadow-2xl"
            >
              Free Tax Prep (VITA)
            </Link>
            <Link
              href="/supersonicfastcash"
              className="bg-white hover:bg-gray-100 text-brand-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all shadow-2xl"
            >
              Professional Services
            </Link>
          </div>
        </div>
      </section>

      {/* Tax Office Highlights */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-2xl md:text-3xl font-bold text-slate-900 mb-4 text-2xl md:text-3xl lg:text-2xl md:text-3xl">
              Our Tax Services Office
            </h2>
            <p className="text-base md:text-lg text-slate-600">
              Professional environment for all your tax preparation needs
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/tax-office-1.jpg"
                alt="Tax services office"
                fill
                className="object-cover"
                quality={100}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/tax-office-2.jpg"
                alt="Professional tax preparation area"
                fill
                className="object-cover"
                quality={100}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Directory */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto space-y-16">
            {taxServices.map((category) => (
              <div key={category.category}>
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900">
                  {category.category}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.services.map((service) => (
                    <Link
                      key={service.link}
                      href={service.link}
                      className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-lg transition group"
                    >
                      <div className="text-4xl mb-4 text-2xl md:text-3xl lg:text-4xl">
                        {service.icon}
                      </div>
                      <h3 className="text-lg font-bold mb-3 text-gray-900 group-hover:text-brand-blue-600">
                        {service.name}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {service.description}
                      </p>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-center text-sm text-gray-700"
                          >
                            <svg
                              className="w-4 h-4 text-brand-green-600 mr-2"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 text-brand-blue-600 font-semibold group-hover:underline">
                        Learn More →
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Comparison */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              Which Service is Right for You?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 border-2 border-green-200 rounded-xl">
                <div className="text-5xl mb-4 text-3xl md:text-4xl lg:text-5xl">
                  🆓
                </div>
                <h3 className="text-lg md:text-lg font-bold mb-4 text-green-700">
                  Free VITA
                </h3>
                <p className="text-gray-600 mb-4">Best for:</p>
                <ul className="text-left space-y-2 text-gray-700">
                  <li>• Income under $64,000</li>
                  <li>• Simple tax returns</li>
                  <li>• W-2 employees</li>
                  <li>• Students</li>
                </ul>
                <Link
                  href="/vita"
                  className="mt-6 inline-block bg-brand-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700"
                >
                  Get Free Help
                </Link>
              </div>

              <div className="text-center p-6 border-2 border-blue-200 rounded-xl">
                <div className="text-5xl mb-4 text-3xl md:text-4xl lg:text-5xl">
                  ⚡
                </div>
                <h3 className="text-lg md:text-lg font-bold mb-4 text-blue-700">
                  Professional
                </h3>
                <p className="text-gray-600 mb-4">Best for:</p>
                <ul className="text-left space-y-2 text-gray-700">
                  <li>• Complex returns</li>
                  <li>• Self-employed</li>
                  <li>• Multiple income sources</li>
                  <li>• Maximum refund needed</li>
                </ul>
                <Link
                  href="/supersonicfastcash"
                  className="mt-6 inline-block bg-brand-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-blue-700"
                >
                  Get Started
                </Link>
              </div>

              <div className="text-center p-6 border-2 border-purple-200 rounded-xl">
                <div className="text-5xl mb-4 text-3xl md:text-4xl lg:text-5xl">
                  🎓
                </div>
                <h3 className="text-lg md:text-lg font-bold mb-4 text-purple-700">
                  Training
                </h3>
                <p className="text-gray-600 mb-4">Best for:</p>
                <ul className="text-left space-y-2 text-gray-700">
                  <li>• Career changers</li>
                  <li>• New tax preparers</li>
                  <li>• IRS certification</li>
                  <li>• Job placement</li>
                </ul>
                <Link
                  href="/programs/tax-prep-financial-services"
                  className="mt-6 inline-block bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700"
                >
                  Start Training
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16    text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Need Help Choosing?
            </h2>
            <p className="text-base md:text-lg mb-8 text-blue-100">
              Contact us and we'll help you find the perfect tax service for
              your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-blue-700 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 text-lg shadow-2xl transition-all"
              >
                Contact Us
              </Link>
              <Link
                href="/contact"
                className="bg-brand-orange-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-brand-orange-700 text-lg shadow-2xl transition-all"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
