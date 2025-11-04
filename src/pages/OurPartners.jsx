import React from 'react';
import { Award, Building, CheckCircle, ExternalLink, Users } from 'lucide-react';

/**
 * Our Partners Page
 * Showcasing all partner organizations and integrations
 * Elevate for Humanity Career and Training Institute
 */

const OurPartners = () => {
  const partners = [
    {
      name: 'EmployIndy',
      category: 'Workforce Development',
      description: 'Job Ready Indy program facilitator providing workforce readiness training and digital badges',
      programs: ['Job Ready Indy', '6 Badge Courses', 'Career Readiness'],
      url: 'https://www.employindy.org',
      page: '/job-ready-indy',
      color: 'blue'
    },
    {
      name: 'Certiport',
      category: 'Testing & Certification',
      description: 'Authorized Testing Center for Microsoft, Adobe, Autodesk, and IC3 certifications',
      programs: ['Microsoft Office Specialist', 'Adobe Certified Professional', 'Autodesk Certified User', 'IC3 Digital Literacy'],
      url: 'https://www.certiport.com',
      page: '/certiport-testing-center',
      color: 'red'
    },
    {
      name: 'NCCER',
      category: 'Construction Training',
      description: 'CareerStarter program for construction career exploration and NCCER credentials',
      programs: ['CareerStarter', 'Construction Trades', 'OSHA Safety', 'Core Curriculum'],
      url: 'https://www.nccer.org',
      page: '/nccer-careerstarter',
      color: 'orange'
    },
    {
      name: 'Link+Learn / IRS VITA',
      category: 'Tax Certification',
      description: 'VITA tax certification training through Link+Learn platform',
      programs: ['VITA Certification', 'Basic Tax', 'Intermediate Tax', 'Advanced Tax'],
      url: 'https://linklearncertification.com',
      page: '/vita-tax-certification',
      color: 'green'
    },
    {
      name: 'Intuit',
      category: 'Tax & Bookkeeping',
      description: 'Tax and Bookkeeping Expert community for TurboTax Live and QuickBooks Live',
      programs: ['TurboTax Live Expert', 'QuickBooks Live Expert', 'Tax Professional Training'],
      url: 'https://www.intuit.com',
      page: '/intuit-tax-bookkeeping',
      color: 'blue'
    },
    {
      name: 'Milady (Internal)',
      category: 'Barbering Curriculum',
      description: 'Industry-leading barbering curriculum for DOL-registered apprenticeship program',
      programs: ['Barber Apprenticeship', '2,000 Hour Program', 'State Licensure Prep'],
      url: 'https://www.milady.com',
      page: '/lms/barber-apprenticeship',
      color: 'purple',
      internal: true
    },
    {
      name: 'Indiana DWD',
      category: 'Workforce Development',
      description: 'WIOA and Workforce Ready Grant funding partner',
      programs: ['WIOA Funding', 'Workforce Ready Grant', 'ETPL Approved Programs'],
      url: 'https://www.in.gov/dwd',
      page: '/programs',
      color: 'indigo'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'border-blue-300 bg-blue-50',
      red: 'border-red-300 bg-red-50',
      orange: 'border-orange-300 bg-orange-50',
      green: 'border-green-300 bg-green-50',
      purple: 'border-purple-300 bg-purple-50',
      indigo: 'border-indigo-300 bg-indigo-50'
    };
    return colors[color] || colors.blue;
  };

  const categories = [...new Set(partners.map(p => p.category))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Users className="w-20 h-20" />
            </div>
            <h1 className="text-5xl font-bold mb-4">
              Our Partners
            </h1>
            <p className="text-2xl mb-6">
              Elevate for Humanity Career and Training Institute
            </p>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              We partner with leading organizations to provide industry-recognized training, 
              certifications, and career pathways for our students.
            </p>
          </div>
        </div>
      </div>

      {/* Partners Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Partner Organizations</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {partners.map((partner, index) => (
              <div key={index} className={`border-2 rounded-lg p-6 ${getColorClasses(partner.color)} hover:shadow-lg transition`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{partner.name}</h3>
                    <span className="inline-block bg-white px-3 py-1 rounded-full text-sm font-semibold">
                      {partner.category}
                    </span>
                    {partner.internal && (
                      <span className="inline-block bg-gray-200 px-3 py-1 rounded-full text-sm font-semibold ml-2">
                        Internal Use
                      </span>
                    )}
                  </div>
                  <Building className="w-8 h-8 text-gray-600" />
                </div>
                
                <p className="text-gray-700 mb-4">{partner.description}</p>
                
                <div className="mb-4">
                  <p className="font-semibold mb-2 text-sm">Programs & Services:</p>
                  <ul className="space-y-1">
                    {partner.programs.map((program, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                        {program}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-3">
                  <a
                    href={partner.page}
                    className="flex-1 bg-white border-2 border-gray-300 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-50 transition text-center"
                  >
                    Learn More
                  </a>
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center bg-white border-2 border-gray-300 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-50 transition"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* By Category */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Partners by Category</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => {
              const categoryPartners = partners.filter(p => p.category === category);
              return (
                <div key={index} className="border-2 border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4">{category}</h3>
                  <ul className="space-y-2">
                    {categoryPartners.map((partner, idx) => (
                      <li key={idx} className="flex items-center">
                        <Award className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                        <span className="text-sm">{partner.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Partnership Benefits */}
        <div className="bg-blue-50 rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Partnership Benefits</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg text-center">
              <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Industry Recognition</h3>
              <p className="text-sm text-gray-700">
                Earn credentials recognized by employers nationwide
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg text-center">
              <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Career Pathways</h3>
              <p className="text-sm text-gray-700">
                Access to job placement and career advancement opportunities
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg text-center">
              <Building className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Quality Training</h3>
              <p className="text-sm text-gray-700">
                Learn from industry-leading curriculum and expert instructors
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Explore Our Programs</h2>
          <p className="text-xl mb-8">
            Discover training opportunities through our partner organizations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/programs"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition"
            >
              View All Programs
            </a>
            <a
              href="/contact"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-white hover:text-blue-600 transition"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurPartners;
