import React from 'react';
import {
  Award,
  BookOpen,
  CheckCircle,
  DollarSign,
  Users,
  Calculator,
  ExternalLink,
  Phone,
  Mail,
  TrendingUp,
} from 'lucide-react';

/**
 * Intuit Tax & Bookkeeping Expert Program
 * TurboTax Live & QuickBooks Live Training
 * Elevate for Humanity Career and Training Institute
 */

const IntuitTaxBookkeeping = () => {
  const intuitUrl = 'https://www.intuit.com';
  const turboTaxUrl = 'https://turbotax.intuit.com/expert';
  const quickBooksUrl = 'https://quickbooks.intuit.com/live';

  const programs = [
    {
      title: 'TurboTax Live Expert',
      description: 'Provide tax preparation and advice to TurboTax customers',
      icon: '📊',
      skills: [
        'Individual tax preparation',
        'Tax law knowledge',
        'Customer service',
        'Virtual consultation',
      ],
      earnings: '$15 - $30/hour',
      season: 'Seasonal (Jan - Apr)',
      color: 'blue',
    },
    {
      title: 'QuickBooks Live Expert',
      description: 'Help small business owners with bookkeeping and QuickBooks',
      icon: '📚',
      skills: [
        'Bookkeeping fundamentals',
        'QuickBooks software',
        'Small business accounting',
        'Financial reporting',
      ],
      earnings: '$18 - $35/hour',
      season: 'Year-round',
      color: 'green',
    },
  ];

  const benefits = [
    {
      title: 'Work from Home',
      description: 'Flexible remote work opportunities',
      icon: Users,
    },
    {
      title: 'Set Your Schedule',
      description: 'Choose hours that work for you',
      icon: TrendingUp,
    },
    {
      title: 'Paid Training',
      description: 'Comprehensive training provided by Intuit',
      icon: BookOpen,
    },
    {
      title: 'Career Growth',
      description: 'Advance your tax and bookkeeping career',
      icon: Award,
    },
  ];

  const requirements = {
    turboTax: [
      'Active PTIN (Preparer Tax Identification Number)',
      'Minimum 2 seasons of paid tax preparation experience',
      'Strong knowledge of federal and state tax laws',
      'Excellent customer service skills',
      'Reliable internet connection and quiet workspace',
      'Available during peak tax season hours',
    ],
    quickBooks: [
      'Bookkeeping or accounting experience',
      'QuickBooks Online proficiency',
      'Understanding of small business accounting',
      'Strong communication skills',
      'Reliable internet connection and quiet workspace',
      'Flexible availability',
    ],
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-50 border-blue-300',
      green: 'bg-green-50 border-green-300',
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Calculator className="w-20 h-20" />
            </div>
            <h1 className="text-5xl font-bold mb-4">
              Intuit Tax & Bookkeeping Expert Program
            </h1>
            <p className="text-2xl mb-6">TurboTax Live • QuickBooks Live</p>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join Intuit's community of tax and bookkeeping experts. Work
              remotely, set your own schedule, and help millions of customers
              with TurboTax and QuickBooks.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#programs"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition"
              >
                Explore Programs
              </a>
              <a
                href={intuitUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-white hover:text-blue-600 transition flex items-center"
              >
                Visit Intuit
                <ExternalLink className="w-5 h-5 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* About Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">
            About Intuit Expert Programs
          </h2>
          <p className="text-lg text-gray-700 mb-6 text-center max-w-3xl mx-auto">
            Intuit brings TurboTax, QuickBooks, Credit Karma, and Mailchimp to
            market—trusted products used by over 100 million customers globally.
            As a Tax or Bookkeeping Expert, you'll help customers succeed while
            building your own career.
          </p>
          <div className="grid md:grid-cols-4 gap-6 mt-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
        {/* Programs */}
        <div id="programs" className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Expert Programs
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {programs.map((program, index) => (
              <div
                key={index}
                className={`border-2 rounded-lg p-8 ${getColorClasses(program.color)}`}
              >
                <div className="text-6xl mb-4 text-center">{program.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-center">
                  {program.title}
                </h3>
                <p className="text-gray-700 mb-6 text-center">
                  {program.description}
                </p>
                <div className="space-y-4 mb-6">
                  <div>
                    <p className="font-semibold mb-2">Skills You'll Use:</p>
                    <ul className="space-y-2">
                      {program.skills.map((skill, idx) => (
                        <li key={idx} className="flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-600 mb-1">Earnings</p>
                    <p className="font-bold text-green-600">
                      {program.earnings}
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-600 mb-1">Schedule</p>
                    <p className="font-bold text-blue-600">{program.season}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Requirements */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Requirements</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-blue-600">
                TurboTax Live Expert
              </h3>
              <ul className="space-y-3">
                {requirements.turboTax.map((req, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-green-600">
                QuickBooks Live Expert
              </h3>
              <ul className="space-y-3">
                {requirements.quickBooks.map((req, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {/* Training & Support */}
        <div className="bg-blue-50 rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Training & Support
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg">
              <BookOpen className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Comprehensive Training</h3>
              <p className="text-gray-700">
                Paid training on Intuit products, tax law updates, and customer
                service best practices
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <Users className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Expert Community</h3>
              <p className="text-gray-700">
                Join a supportive community of tax and bookkeeping professionals
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <Award className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Career Development</h3>
              <p className="text-gray-700">
                Access to webinars, newsletters, blogs, and professional
                development resources
              </p>
            </div>
          </div>
        </div>
        {/* Preparation Path */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Prepare for Intuit Expert Roles
          </h2>
          <p className="text-center text-gray-700 mb-8 max-w-2xl mx-auto">
            Build the skills you need through our training programs
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-2 border-blue-200 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">For TurboTax Live</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                  <span>Complete our VITA Tax Certification program</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                  <span>Gain experience through volunteer tax preparation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                  <span>Obtain your PTIN from the IRS</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                  <span>Build 2+ seasons of paid experience</span>
                </li>
              </ul>
            </div>
            <div className="border-2 border-green-200 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">For QuickBooks Live</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span>Take bookkeeping and accounting courses</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span>Get certified in QuickBooks Online</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span>Gain small business accounting experience</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span>Build your client portfolio</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* Why Experts Return */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Why Experts Come Back Year After Year
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="text-center">
              <DollarSign className="w-12 h-12 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Competitive Pay</h3>
              <p className="text-sm">
                Earn competitive hourly rates with flexible scheduling
              </p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Work-Life Balance</h3>
              <p className="text-sm">Set your own hours and work from home</p>
            </div>
            <div className="text-center">
              <TrendingUp className="w-12 h-12 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Career Growth</h3>
              <p className="text-sm">
                Continuous learning and advancement opportunities
              </p>
            </div>
          </div>
        </div>
        {/* CTA Section */}
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Join Intuit?</h2>
          <p className="text-xl text-gray-700 mb-8">
            Start your journey as a tax or bookkeeping expert with Intuit
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href={turboTaxUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-blue-700 transition flex items-center justify-center"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              TurboTax Live Careers
            </a>
            <a
              href={quickBooksUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-green-700 transition flex items-center justify-center"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              QuickBooks Live Careers
            </a>
          </div>
          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-xl font-bold mb-4">Need Help Preparing?</h3>
            <p className="text-gray-700 mb-6">
              Contact us about our tax and bookkeeping training programs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:elevateforhumanity@gmail.com?subject=Intuit Expert Training"
                className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition flex items-center justify-center"
              >
                <Mail className="w-5 h-5 mr-2" />
                Email Us
              </a>
              <a
                href="tel:+13173143757"
                className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition flex items-center justify-center"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call (317) 314-3757
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntuitTaxBookkeeping;
