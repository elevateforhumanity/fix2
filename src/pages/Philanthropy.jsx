import React from 'react';
import {
  Heart,
  Users,
  TrendingUp,
  Award,
  DollarSign,
  ArrowRight,
} from 'lucide-react';

export default function Philanthropy() {
  const impactAreas = [
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Scholarships & Grants',
      description:
        'Direct financial support for students pursuing career training',
      impact: '$250K+ awarded annually',
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Community Hubs',
      description: 'Physical spaces for learning, mentorship, and networking',
      impact: '3 locations across Indianapolis',
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: 'Career Pathways',
      description: 'End-to-end support from training to employment',
      impact: '92% job placement rate',
    },
    {
      icon: <DollarSign className="h-8 w-8" />,
      title: 'Emergency Assistance',
      description: 'Support for transportation, childcare, and basic needs',
      impact: '500+ families supported',
    },
  ];

  const partners = [
    'Selfish Inc Foundation',
    'Indiana Department of Workforce Development',
    'Indianapolis Urban League',
    'Local Employer Partners',
    'Community Development Corporations',
    'Faith-Based Organizations',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-beige-50">
      <section className="bg-gradient-to-r from-orange-500 to-blue-600 text-white py-16">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 mb-6">
              <Heart className="h-5 w-5" />
              <span className="font-medium">Powered by Selfish Inc</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Philanthropy & Community Impact
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Funding pathways that convert learning into livelihoods.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/donate"
                className="btn bg-white text-green-600 hover:bg-beige-100"
              >
                Donate Now
              </a>
              <a
                href="/contact"
                className="btn-outline border-white text-white hover:bg-white/10"
              >
                Partner With Us
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brown-900 mb-4">
              How We Steward Funding
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {impactAreas.map((area, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 shadow-sm border border-brown-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-orange-500 to-blue-600 text-white rounded-lg flex items-center justify-center">
                    {area.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-brown-900 mb-2">
                      {area.title}
                    </h3>
                    <p className="text-brown-600 mb-3">{area.description}</p>
                    <div className="inline-flex items-center gap-2 text-sm font-medium text-green-600">
                      <TrendingUp className="h-4 w-4" />
                      {area.impact}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section bg-white">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                1,200+
              </div>
              <div className="text-brown-600">Students Served</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                $2.5M
              </div>
              <div className="text-brown-600">Scholarships Awarded</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">92%</div>
              <div className="text-brown-600">Job Placement Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">$45K</div>
              <div className="text-brown-600">Avg. Starting Salary</div>
            </div>
          </div>
        </div>
      </section>
      <section className="section bg-gradient-to-r from-orange-50 to-blue-50">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-brown-900 mb-4">
            Sponsor a Cohort
          </h2>
          <p className="text-xl text-brown-600 mb-8">
            Your contribution directly funds training, credentials, and career
            placement.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/donate" className="btn inline-flex items-center gap-2">
              Make a Donation <ArrowRight className="h-4 w-4" />
            </a>
            <a href="/contact" className="btn-outline">
              Discuss Partnership
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
