/**
 * Home Page - Professional LMS Landing
 * Copyright (c) 2025 Elevate for Humanity
 * Commercial License. No resale, sublicensing, or redistribution allowed.
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Award, Briefcase, DollarSign, CheckCircle, Users, TrendingUp } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { ApprovalBanner } from '../components/ApprovalBadge';

const trustMetrics = [
  {
    icon: Award,
    title: 'WIOA / WRG Eligible',
    description: 'Pathways to tuition assistance for qualifying learners.',
  },
  {
    icon: Briefcase,
    title: 'Earn While You Learn',
    description: 'Work-based learning, stipends, and apprenticeships.',
  },
  {
    icon: Users,
    title: 'Employer Placement',
    description: 'Regional partners ready to hire program completers.',
  },
];

const featuredPrograms = [
  {
    id: 'barber-apprenticeship',
    title: 'Barber Apprenticeship',
    duration: '1500 hours',
    modality: 'In-Person • Paid',
    badge: 'DOL Registered',
    funding: true,
    image: '/images/barber.jpg',
    description: 'Indiana DOL-registered apprenticeship; earn while you learn with licensure prep.',
  },
  {
    id: 'building-tech',
    title: 'Building Maintenance Technician',
    duration: '6 months',
    modality: 'Hybrid',
    badge: 'WIOA Eligible',
    funding: true,
    image: '/images/building.jpg',
    description: 'Hands-on HVAC, electrical, and basic construction skills for entry roles.',
  },
  {
    id: 'healthcare-cna',
    title: 'Healthcare CNA/QMA',
    duration: '8 weeks',
    modality: 'In-Person',
    badge: 'State Certified',
    funding: true,
    image: '/images/healthcare.jpg',
    description: 'Fast-track to healthcare careers with state certification and clinical hours.',
  },
];

const outcomes = [
  { label: '92% Job Placement Rate', value: '92%' },
  { label: 'Average Time to Employment', value: '45 days' },
  { label: 'Students Served Annually', value: '500+' },
  { label: 'Employer Partners', value: '75+' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-surface-base">
      <Helmet>
        <title>Elevate for Humanity | Workforce Training & Career Development</title>
        <meta
          name="description"
          content="WRG & ETPL Approved! Career-ready training powered by apprenticeships, WIOA/WRG funding, and employer partnerships in Indiana. Enroll, learn, and get placed into real jobs."
        />
      </Helmet>

      <Navigation />

      <main id="main-content">
        {/* Hero Section */}
        <section className="bg-gradient-brand text-white py-20 md:py-28">
          <div className="container-efh text-center">
            <h1 className="heading-display text-white mb-6">
              Workforce Training That Leads to Real Jobs
            </h1>
            
            {/* WRG & ETPL Approval Banner */}
            <div className="max-w-4xl mx-auto mb-8">
              <ApprovalBanner />
            </div>
            
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-95">
              Learn with state-aligned programs, access WIOA/WRG/JRI funding, and step into paid apprenticeships and employment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/programs" className="btn btn-light text-lg px-8 py-4">
                Explore Programs
              </Link>
              <Link to="/apply" className="btn btn-secondary text-lg px-8 py-4">
                Start Application
              </Link>
            </div>
          </div>
        </section>

        {/* Trust Metrics */}
        <section className="section-spacing bg-surface-elevated">
          <div className="container-efh">
            <div className="grid md:grid-cols-3 gap-8">
              {trustMetrics.map((metric, index) => (
                <div key={index} className="card text-center">
                  <metric.icon className="w-12 h-12 mx-auto mb-4 text-brand" />
                  <h3 className="heading-3 mb-3">{metric.title}</h3>
                  <p className="body-base">{metric.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="section-spacing">
          <div className="container-efh">
            <h2 className="heading-2 text-center mb-12">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-brand text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="heading-3 mb-3">Enroll</h3>
                <p className="body-base">
                  Apply online and work with our team to determine funding eligibility (WIOA/WRG/JRI).
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-brand text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="heading-3 mb-3">Train</h3>
                <p className="body-base">
                  Complete hands-on training with industry experts, earn credentials, and build your portfolio.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-brand text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="heading-3 mb-3">Get Placed</h3>
                <p className="body-base">
                  Step into apprenticeships or direct employment with our network of regional employer partners.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Programs */}
        <section className="section-spacing bg-surface-elevated">
          <div className="container-efh">
            <div className="text-center mb-12">
              <h2 className="heading-2 mb-4">Featured Programs</h2>
              <p className="body-large max-w-2xl mx-auto">
                Career-ready training programs designed with employer input and state alignment.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {featuredPrograms.map((program) => (
                <div key={program.id} className="card group">
                  <div className="relative mb-4 overflow-hidden rounded-xl">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23F9FAFB" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%236B7280" font-size="18"%3E${program.title}%3C/text%3E%3C/svg%3E`;
                      }}
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="badge badge-primary">{program.badge}</span>
                      {program.funding && (
                        <span className="badge badge-success">Funding Eligible</span>
                      )}
                    </div>
                  </div>
                  <h3 className="heading-3 mb-2">{program.title}</h3>
                  <p className="body-small mb-3 text-text-secondary">
                    {program.duration} • {program.modality}
                  </p>
                  <p className="body-base mb-4">{program.description}</p>
                  <Link
                    to={`/programs/${program.id}`}
                    className="btn btn-outline w-full"
                  >
                    Learn More
                  </Link>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link to="/programs" className="btn btn-primary text-lg">
                View All Programs
              </Link>
            </div>
          </div>
        </section>

        {/* Outcomes */}
        <section className="section-spacing bg-brand text-white">
          <div className="container-efh">
            <h2 className="heading-2 text-center text-white mb-12">Our Impact</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {outcomes.map((outcome, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold mb-2">{outcome.value}</div>
                  <div className="text-lg opacity-90">{outcome.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-spacing">
          <div className="container-efh">
            <div className="card card-spacious text-center max-w-3xl mx-auto bg-surface-elevated">
              <h2 className="heading-2 mb-4">Ready to Start Your Journey?</h2>
              <p className="body-large mb-8">
                Join hundreds of students who have transformed their careers through our programs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/apply" className="btn btn-primary text-lg">
                  Apply Now
                </Link>
                <Link to="/contact" className="btn btn-outline text-lg">
                  Talk to an Advisor
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
