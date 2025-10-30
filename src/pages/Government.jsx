import React from 'react';
import {
  Building2,
  Users,
  DollarSign,
  Award,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';

export default function Government() {
  const fundingPrograms = [
    {
      name: 'WIOA (Workforce Innovation & Opportunity Act)',
      description: 'Federal funding for job training and employment services',
      eligibility: 'Unemployed, underemployed, or dislocated workers',
      coverage: 'Full tuition + support services',
      icon: <Building2 className="h-8 w-8 text-brand-info" />,
    },
    {
      name: 'WRG (Workforce Ready Grant)',
      description: 'State-funded short-term training for high-demand careers',
      eligibility: 'Indiana residents seeking career advancement',
      coverage: 'Up to $5,000 per participant',
      icon: <Award className="h-8 w-8 text-brand-info" />,
    },
    {
      name: 'OJT (On-the-Job Training)',
      description: 'Employer reimbursement for training new hires',
      eligibility: 'Employers hiring WIOA-eligible participants',
      coverage: '50% wage reimbursement up to 6 months',
      icon: <Users className="h-8 w-8 text-brand-info" />,
    },
    {
      name: 'Apprenticeship Programs',
      description: 'DOL-registered apprenticeships with paid training',
      eligibility: 'Ages 16+ with high school diploma or equivalent',
      coverage: 'Full tuition + competitive wages',
      icon: <DollarSign className="h-8 w-8 text-brand-info" />,
    },
  ];

  const benefits = [
    'Zero cost to participants',
    'Industry-recognized credentials',
    '92% job placement rate',
    'Support services included',
    'Flexible scheduling options',
    'Career coaching & mentorship',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-brand-surface">
      {/* Hero Section */}
      <section className="bg-brand-primary text-white py-16">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Workforce Funding & Public Partnerships
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Elevate for Humanity is an approved ETPL provider delivering
              WIOA-compliant workforce development programs across Indiana.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/programs"
                className="btn bg-white text-brand-primary hover:bg-brand-surface-dark"
              >
                View Programs
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
      {/* Funding Programs */}
      <section className="section">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-text mb-4">
              Available Funding Programs
            </h2>
            <p className="text-xl text-brand-text-muted max-w-2xl mx-auto">
              Multiple pathways to access free workforce training
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {fundingPrograms.map((program, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 shadow-sm border border-brand-border hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-brand-info/10 rounded-lg flex items-center justify-center">
                    {program.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-brand-text mb-2">
                      {program.name}
                    </h3>
                    <p className="text-brand-text-muted mb-3">
                      {program.description}
                    </p>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium text-brand-text">
                          Eligibility:
                        </span>{' '}
                        <span className="text-brand-text-muted">
                          {program.eligibility}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-brand-text">
                          Coverage:
                        </span>{' '}
                        <span className="text-brand-text-muted">
                          {program.coverage}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Benefits */}
      <section className="section bg-white">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-brand-text mb-8 text-center">
              Why Partner With Elevate for Humanity?
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-brand-success flex-shrink-0" />
                  <span className="text-brand-text">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Stats */}
      <section className="section">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-brand-border">
              <div className="text-4xl font-bold text-brand-info mb-2">
                106+
              </div>
              <div className="text-brand-text-muted">
                Certification Programs
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-brand-border">
              <div className="text-4xl font-bold text-brand-info mb-2">92%</div>
              <div className="text-brand-text-muted">Job Placement Rate</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-brand-border">
              <div className="text-4xl font-bold text-brand-info mb-2">
                $4.7K
              </div>
              <div className="text-brand-text-muted">Avg. Tuition Value</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-brand-border">
              <div className="text-4xl font-bold text-brand-info mb-2">
                100%
              </div>
              <div className="text-brand-text-muted">WIOA Compliant</div>
            </div>
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="section bg-gradient-to-r from-orange-50 to-blue-50">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-brand-text mb-4">
            Ready to Partner?
          </h2>
          <p className="text-xl text-brand-text-muted mb-8">
            Contact us to discuss how Elevate for Humanity can support your
            workforce development goals.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/contact" className="btn inline-flex items-center gap-2">
              Contact Us <ArrowRight className="h-4 w-4" />
            </a>
            <a href="/programs" className="btn-outline">
              View All Programs
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
