import React from 'react';
import { Award, BookOpen, CheckCircle, HardHat, Users, Wrench, ExternalLink, Phone, Mail, Building } from 'lucide-react';

/**
 * NCCER CareerStarter Program
 * National Center for Construction Education and Research
 * Elevate for Humanity Career and Training Institute
 * Program Manager: Karina Kuchta
 */

const NCCERCareerStarter = () => {
  const nccerUrl = 'https://www.nccer.org';
  const careerStarterUrl = 'https://www.nccer.org/workforce-development/careerstarter';

  const constructionPathways = [
    {
      title: 'Carpentry',
      description: 'Build structures, frameworks, and finish work',
      icon: '🔨',
      careers: ['Carpenter', 'Framer', 'Finish Carpenter'],
      salary: '$35,000 - $65,000/year'
    },
    {
      title: 'Electrical',
      description: 'Install and maintain electrical systems',
      icon: '⚡',
      careers: ['Electrician', 'Electrical Technician', 'Wireman'],
      salary: '$40,000 - $75,000/year'
    },
    {
      title: 'HVAC',
      description: 'Heating, ventilation, and air conditioning systems',
      icon: '❄️',
      careers: ['HVAC Technician', 'HVAC Installer', 'Service Tech'],
      salary: '$38,000 - $70,000/year'
    },
    {
      title: 'Plumbing',
      description: 'Install and repair water and drainage systems',
      icon: '🚰',
      careers: ['Plumber', 'Pipefitter', 'Steamfitter'],
      salary: '$40,000 - $75,000/year'
    },
    {
      title: 'Welding',
      description: 'Join metal parts using various welding techniques',
      icon: '🔥',
      careers: ['Welder', 'Fabricator', 'Welding Inspector'],
      salary: '$35,000 - $70,000/year'
    },
    {
      title: 'Heavy Equipment',
      description: 'Operate construction machinery and equipment',
      icon: '🚜',
      careers: ['Equipment Operator', 'Crane Operator', 'Excavator Operator'],
      salary: '$40,000 - $80,000/year'
    }
  ];

  const programBenefits = [
    {
      title: 'Industry-Recognized Credentials',
      description: 'Earn NCCER certifications recognized nationwide',
      icon: Award
    },
    {
      title: 'Hands-On Training',
      description: 'Learn through practical, real-world construction projects',
      icon: Wrench
    },
    {
      title: 'Job Placement Support',
      description: 'Connect with entry-level construction job opportunities',
      icon: Building
    },
    {
      title: 'Career Exploration',
      description: 'Explore multiple construction trades before specializing',
      icon: HardHat
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <HardHat className="w-20 h-20" />
            </div>
            <h1 className="text-5xl font-bold mb-4">
              NCCER CareerStarter Program
            </h1>
            <p className="text-2xl mb-6">
              National Center for Construction Education and Research
            </p>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Explore construction careers and connect with entry-level job opportunities. 
              Earn industry-recognized NCCER credentials.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#explore"
                className="bg-white text-orange-600 px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition"
              >
                Explore Careers
              </a>
              <a
                href={careerStarterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-white hover:text-orange-600 transition flex items-center"
              >
                Visit NCCER
                <ExternalLink className="w-5 h-5 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">About NCCER CareerStarter</h2>
          <p className="text-lg text-gray-700 mb-6 text-center max-w-3xl mx-auto">
            NCCER CareerStarter is a workforce development program that helps students explore 
            construction careers and connect with entry-level job opportunities. Through hands-on 
            training and industry-recognized credentials, participants gain the skills needed to 
            succeed in the construction industry.
          </p>

          <div className="grid md:grid-cols-4 gap-6 mt-8">
            {programBenefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="font-bold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Construction Pathways */}
        <div id="explore" className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Construction Career Pathways</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {constructionPathways.map((pathway, index) => (
              <div key={index} className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
                <div className="text-5xl mb-4 text-center">{pathway.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-center">{pathway.title}</h3>
                <p className="text-gray-700 mb-4 text-center">{pathway.description}</p>
                <div className="space-y-2 mb-4">
                  <p className="font-semibold text-sm">Career Options:</p>
                  <ul className="space-y-1">
                    {pathway.careers.map((career, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                        {career}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-green-50 p-3 rounded text-center">
                  <p className="text-sm font-semibold text-green-800">{pathway.salary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Program Features */}
        <div className="bg-orange-50 rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Program Features</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-bold mb-4">Training Components</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-orange-600 mr-3 mt-1 flex-shrink-0" />
                  <span>Core construction fundamentals</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-orange-600 mr-3 mt-1 flex-shrink-0" />
                  <span>Safety training and OSHA certification</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-orange-600 mr-3 mt-1 flex-shrink-0" />
                  <span>Hands-on skills development</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-orange-600 mr-3 mt-1 flex-shrink-0" />
                  <span>Tool and equipment training</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-orange-600 mr-3 mt-1 flex-shrink-0" />
                  <span>Blueprint reading and math</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Career Support</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <span>Job placement assistance</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <span>Employer connections and networking</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <span>Resume and interview preparation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <span>Apprenticeship opportunities</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <span>Ongoing career guidance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* NCCER Credentials */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">NCCER Credentials</h2>
          <p className="text-center text-gray-700 mb-8 max-w-2xl mx-auto">
            Earn industry-recognized NCCER credentials that are valued by employers nationwide
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border-2 border-orange-200 rounded-lg p-6 text-center">
              <Award className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Core Curriculum</h3>
              <p className="text-gray-700">
                Foundation skills required for all construction trades
              </p>
            </div>
            <div className="border-2 border-orange-200 rounded-lg p-6 text-center">
              <Award className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Trade Certifications</h3>
              <p className="text-gray-700">
                Specialized credentials in specific construction trades
              </p>
            </div>
            <div className="border-2 border-orange-200 rounded-lg p-6 text-center">
              <Award className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Safety Certifications</h3>
              <p className="text-gray-700">
                OSHA and construction safety credentials
              </p>
            </div>
          </div>
        </div>

        {/* Eligibility */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Who Can Participate?</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-bold mb-4">Ideal Candidates</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <span>High school students exploring careers</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <span>Career changers interested in construction</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <span>Veterans transitioning to civilian careers</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <span>Individuals seeking skilled trade careers</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Requirements</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <span>18 years or older (or enrolled in high school)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <span>Physical ability to perform construction work</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <span>Commitment to complete training program</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <span>Pass background check and drug screening</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Funding */}
        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-4 text-center text-green-900">Funding Available</h2>
          <p className="text-center text-gray-700 mb-6 max-w-2xl mx-auto">
            Training may be available at no cost through WIOA/WRG funding for eligible participants
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="bg-white p-6 rounded-lg">
              <h3 className="font-bold mb-2">WIOA Funding</h3>
              <p className="text-gray-700">
                Workforce Innovation and Opportunity Act funding for eligible individuals
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <h3 className="font-bold mb-2">Workforce Ready Grant</h3>
              <p className="text-gray-700">
                Indiana's WRG program covers training costs for high-demand occupations
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg p-12 mb-12">
          <h2 className="text-4xl font-bold mb-4 text-center">Start Your Construction Career</h2>
          <p className="text-xl mb-8 text-center">
            Join NCCER CareerStarter and explore rewarding construction career opportunities
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:elevateforhumanity@gmail.com?subject=NCCER CareerStarter Inquiry"
              className="bg-white text-orange-600 px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition text-center flex items-center justify-center"
            >
              <Mail className="w-5 h-5 mr-2" />
              Contact Us
            </a>
            <a
              href={nccerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-white hover:text-orange-600 transition text-center flex items-center justify-center"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              Learn More at NCCER
            </a>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Get Started Today</h2>
          <p className="text-lg text-gray-700 mb-6">
            Contact us to learn more about NCCER CareerStarter opportunities
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <a
              href="mailto:elevateforhumanity@gmail.com"
              className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition flex items-center justify-center"
            >
              <Mail className="w-5 h-5 mr-2" />
              elevateforhumanity@gmail.com
            </a>
            <a
              href="tel:+13173143757"
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center"
            >
              <Phone className="w-5 h-5 mr-2" />
              (317) 314-3757
            </a>
          </div>
          <div className="pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              <strong>NCCER Program Manager:</strong> Karina Kuchta<br />
              Phone: 386-518-6500 ext. 6938
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NCCERCareerStarter;
