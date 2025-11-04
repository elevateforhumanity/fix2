import React from 'react';
import { Award, BookOpen, CheckCircle, DollarSign, Users, FileText, ExternalLink, Phone, Mail, Calculator } from 'lucide-react';

/**
 * VITA Tax Certification Program
 * IRS Volunteer Income Tax Assistance
 * Link+Learn Integration
 * Elevate for Humanity Career and Training Institute
 */

const VITATaxCertification = () => {
  const linkLearnUrl = 'https://linklearncertification.com';
  const irsVitaUrl = 'https://www.irs.gov/individuals/irs-tax-volunteers';

  const certificationLevels = [
    {
      level: 'Basic',
      title: 'Basic Tax Certification',
      description: 'Prepare simple tax returns for individuals and families',
      topics: [
        'Filing status and exemptions',
        'Standard deduction',
        'Earned Income Tax Credit (EITC)',
        'Child Tax Credit',
        'Basic income reporting',
        'Form 1040 preparation'
      ],
      color: 'blue'
    },
    {
      level: 'Intermediate',
      title: 'Intermediate Tax Certification',
      description: 'Handle more complex tax situations',
      topics: [
        'Itemized deductions',
        'Self-employment income',
        'Rental property income',
        'Education credits',
        'Retirement income',
        'Capital gains and losses'
      ],
      color: 'green'
    },
    {
      level: 'Advanced',
      title: 'Advanced Tax Certification',
      description: 'Prepare complex returns with specialized situations',
      topics: [
        'Business income and expenses',
        'Depreciation',
        'Foreign income',
        'Alternative Minimum Tax',
        'Complex investments',
        'Multi-state returns'
      ],
      color: 'purple'
    }
  ];

  const benefits = [
    {
      title: 'IRS Certification',
      description: 'Earn official IRS VITA certification',
      icon: Award
    },
    {
      title: 'Free Training',
      description: 'Complete training at no cost through Link+Learn',
      icon: BookOpen
    },
    {
      title: 'Help Your Community',
      description: 'Provide free tax preparation services to those in need',
      icon: Users
    },
    {
      title: 'Career Skills',
      description: 'Build valuable tax preparation and accounting skills',
      icon: Calculator
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-50 border-blue-300 text-blue-900',
      green: 'bg-green-50 border-green-300 text-green-900',
      purple: 'bg-purple-50 border-purple-300 text-purple-900'
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
              VITA Tax Certification Program
            </h1>
            <p className="text-2xl mb-6">
              IRS Volunteer Income Tax Assistance
            </p>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Get certified to provide free tax preparation services through the IRS VITA program. 
              Training powered by Link+Learn Taxes.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={linkLearnUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition flex items-center"
              >
                Access Link+Learn
                <ExternalLink className="w-5 h-5 ml-2" />
              </a>
              <a
                href="#enroll"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-white hover:text-blue-600 transition"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Program Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">About VITA</h2>
          <p className="text-lg text-gray-700 mb-6 text-center max-w-3xl mx-auto">
            The Volunteer Income Tax Assistance (VITA) program offers free tax help to people who 
            generally make $64,000 or less, persons with disabilities, and limited English-speaking 
            taxpayers. IRS-certified volunteers provide free basic income tax return preparation.
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

        {/* Certification Levels */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Certification Levels</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {certificationLevels.map((cert, index) => (
              <div key={index} className={`border-2 rounded-lg p-6 ${getColorClasses(cert.color)}`}>
                <div className="text-center mb-4">
                  <span className="inline-block bg-white px-4 py-2 rounded-full font-bold text-lg">
                    {cert.level}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">{cert.title}</h3>
                <p className="text-sm mb-4 text-center">{cert.description}</p>
                <div className="space-y-2">
                  <p className="font-semibold text-sm">Topics Covered:</p>
                  <ul className="space-y-1">
                    {cert.topics.map((topic, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <CheckCircle className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Link+Learn Platform */}
        <div className="bg-blue-50 rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Link+Learn Taxes Platform</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Training Features</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <span>Interactive online training modules</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <span>Practice tax scenarios and returns</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <span>IRS certification exams</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <span>Self-paced learning</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <span>Current tax law updates</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Certification Process</h3>
              <ol className="space-y-3">
                <li className="flex items-start">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0 text-sm font-bold">
                    1
                  </span>
                  <span>Register on Link+Learn platform</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0 text-sm font-bold">
                    2
                  </span>
                  <span>Complete training modules</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0 text-sm font-bold">
                    3
                  </span>
                  <span>Pass certification exam (80% required)</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0 text-sm font-bold">
                    4
                  </span>
                  <span>Receive IRS VITA certification</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0 text-sm font-bold">
                    5
                  </span>
                  <span>Begin volunteering at VITA sites</span>
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Who Can Benefit */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Who Should Get Certified?</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-bold mb-4">Perfect For:</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <span>Accounting and finance students</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <span>Career changers entering tax field</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <span>Community volunteers</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <span>Retirees with financial background</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <span>Anyone wanting to help their community</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Requirements:</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <span>18 years or older</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <span>Basic computer skills</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <span>Good math and reading comprehension</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <span>Commitment to volunteer hours</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <span>Pass background check</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Career Opportunities */}
        <div className="bg-green-50 rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Career Pathways</h2>
          <p className="text-center text-gray-700 mb-8 max-w-2xl mx-auto">
            VITA certification can lead to paid positions in tax preparation and accounting
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">Tax Preparer</h3>
              <p className="text-gray-700 mb-4">
                Work for tax preparation firms during tax season
              </p>
              <p className="text-lg font-semibold text-green-600">$25,000 - $45,000/season</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">Enrolled Agent</h3>
              <p className="text-gray-700 mb-4">
                Advance to IRS Enrolled Agent certification
              </p>
              <p className="text-lg font-semibold text-green-600">$45,000 - $75,000/year</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">Tax Consultant</h3>
              <p className="text-gray-700 mb-4">
                Start your own tax preparation business
              </p>
              <p className="text-lg font-semibold text-green-600">$50,000 - $100,000+/year</p>
            </div>
          </div>
        </div>

        {/* Enroll Section */}
        <div id="enroll" className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg p-12 mb-12">
          <h2 className="text-4xl font-bold mb-4 text-center">Get Started Today</h2>
          <p className="text-xl mb-8 text-center">
            Register for VITA certification training through Link+Learn
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={linkLearnUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition text-center flex items-center justify-center"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              Access Link+Learn Platform
            </a>
            <a
              href={irsVitaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-white hover:text-blue-600 transition text-center flex items-center justify-center"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              IRS VITA Program Info
            </a>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Questions About VITA Certification?</h2>
          <p className="text-lg text-gray-700 mb-6">
            Contact us for more information about the VITA tax certification program
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:elevateforhumanity@gmail.com?subject=VITA Tax Certification"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center"
            >
              <Mail className="w-5 h-5 mr-2" />
              Email Us
            </a>
            <a
              href="tel:+13173143757"
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call (317) 314-3757
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VITATaxCertification;
