/**
 * State Programs Page - WIOA, WRG, JRI Details
 * Complete information about state-funded training programs
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { CheckCircle, FileText, Users, DollarSign, Clock, ArrowRight, Download } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const programs = [
  {
    id: 'wioa',
    name: 'WIOA',
    fullName: 'Workforce Innovation and Opportunity Act',
    description: 'Federal program providing job training and employment services to eligible adults, dislocated workers, and youth.',
    eligibility: [
      'U.S. Citizen or authorized to work in the U.S.',
      'Registered with Selective Service (if applicable)',
      'Meet income guidelines or receive public assistance',
      'Facing barriers to employment',
      'Indiana resident'
    ],
    benefits: [
      '100% tuition coverage',
      'Books and supplies included',
      'Transportation assistance available',
      'Childcare support (if eligible)',
      'Job placement assistance'
    ],
    color: 'blue'
  },
  {
    id: 'wrg',
    name: 'WRG',
    fullName: 'Workforce Ready Grant',
    description: 'Indiana state program providing tuition assistance for high-value certificates and degrees in high-demand fields.',
    eligibility: [
      'Indiana resident for 12+ months',
      'U.S. Citizen or eligible non-citizen',
      'High school diploma or equivalent',
      'Not currently enrolled in college',
      'Pursuing eligible certificate or degree'
    ],
    benefits: [
      'Up to $7,500 per year',
      'Covers tuition and fees',
      'Renewable for multiple years',
      'No repayment required',
      'Fast-track career training'
    ],
    color: 'green'
  },
  {
    id: 'jri',
    name: 'JRI',
    fullName: 'Justice Reinvestment Initiative',
    description: 'Program supporting individuals with criminal justice involvement to gain skills and employment.',
    eligibility: [
      'Currently or previously incarcerated',
      'On probation or parole',
      'Indiana resident',
      'Committed to rehabilitation',
      'Referred by case manager or court'
    ],
    benefits: [
      'Full tuition coverage',
      'Wraparound support services',
      'Job placement assistance',
      'Mentorship programs',
      'Second chance employment'
    ],
    color: 'purple'
  }
];

const currentPrograms = [
  {
    name: 'Barber Apprenticeship',
    duration: '12-18 months',
    funding: ['WIOA', 'WRG', 'JRI'],
    placement: '95%'
  },
  {
    name: 'Building Maintenance Technician',
    duration: '6-12 months',
    funding: ['WIOA', 'WRG'],
    placement: '92%'
  },
  {
    name: 'Healthcare CNA/QMA',
    duration: '4-8 weeks',
    funding: ['WIOA', 'WRG', 'JRI'],
    placement: '98%'
  },
  {
    name: 'HVAC Technician',
    duration: '6-12 months',
    funding: ['WIOA', 'WRG'],
    placement: '94%'
  },
  {
    name: 'Welding Certification',
    duration: '6-9 months',
    funding: ['WIOA', 'WRG', 'JRI'],
    placement: '96%'
  },
  {
    name: 'CDL Training',
    duration: '4-6 weeks',
    funding: ['WIOA', 'WRG'],
    placement: '97%'
  }
];

const enrollmentSteps = [
  {
    step: 1,
    title: 'Check Eligibility',
    description: 'Review program requirements and determine which funding source you qualify for.',
    action: 'Use our eligibility checker',
    icon: CheckCircle
  },
  {
    step: 2,
    title: 'Gather Documents',
    description: 'Collect required documentation including ID, proof of residency, income verification, and education records.',
    action: 'Download document checklist',
    icon: FileText
  },
  {
    step: 3,
    title: 'Visit WorkOne',
    description: 'Schedule an appointment with your local WorkOne office for intake and assessment.',
    action: 'Find your WorkOne office',
    icon: Users
  },
  {
    step: 4,
    title: 'Complete Application',
    description: 'Work with your case manager to complete the funding application and select your training program.',
    action: 'Start application',
    icon: DollarSign
  },
  {
    step: 5,
    title: 'Attend Orientation',
    description: 'Participate in program orientation and meet with instructors to plan your training schedule.',
    action: 'Schedule orientation',
    icon: Clock
  },
  {
    step: 6,
    title: 'Begin Training',
    description: 'Start your training program with full funding support and begin your career transformation.',
    action: 'Get started now',
    icon: ArrowRight
  }
];

const requiredDocuments = [
  'Valid government-issued photo ID (Driver\'s License, State ID, or Passport)',
  'Social Security Card or proof of SSN',
  'Proof of Indiana residency (utility bill, lease agreement, or bank statement)',
  'High school diploma, GED, or transcripts',
  'Proof of income (pay stubs, tax returns, or benefit statements)',
  'Selective Service registration (males 18-25)',
  'Work authorization documents (if applicable)',
  'Criminal background check consent form (for JRI applicants)'
];

export default function StatePrograms() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>State Programs - WIOA, WRG, JRI | Elevate for Humanity</title>
        <meta
          name="description"
          content="Learn about WIOA, WRG, and JRI funding programs. Get 100% funded training in high-demand careers. Complete guide to eligibility, application process, and enrollment."
        />
      </Helmet>

      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              State-Funded Training Programs
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              100% Funded Career Training Through WIOA, WRG, and JRI
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/apply"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Get Started Now
              </Link>
              <a
                href="#eligibility"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
              >
                Check Eligibility
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Available Funding Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Multiple pathways to 100% funded career training
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((program) => (
              <div
                key={program.id}
                className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition"
              >
                <div className={`inline-block px-4 py-2 rounded-full text-white font-semibold mb-4 bg-${program.color}-600`}>
                  {program.name}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {program.fullName}
                </h3>
                <p className="text-gray-600 mb-6">
                  {program.description}
                </p>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Eligibility:</h4>
                  <ul className="space-y-2">
                    {program.eligibility.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Benefits:</h4>
                  <ul className="space-y-2">
                    {program.benefits.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to={`/apply?program=${program.id}`}
                  className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Apply for {program.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Highlights */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Program Highlights
            </h2>
            <p className="text-xl text-gray-600">
              See how state-funded training transforms lives
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* WIOA Overview Video */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="aspect-video">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="WIOA Program Overview"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">WIOA Program Overview</h3>
                <p className="text-sm text-gray-600">Learn how WIOA funding can help you start a new career</p>
              </div>
            </div>

            {/* WRG Success Story */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="aspect-video">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="WRG Success Story"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">WRG Success Stories</h3>
                <p className="text-sm text-gray-600">Real students share their Workforce Ready Grant experiences</p>
              </div>
            </div>

            {/* JRI Transformation */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="aspect-video">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="JRI Program Impact"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">Second Chance Success</h3>
                <p className="text-sm text-gray-600">How JRI funding provides pathways to employment</p>
              </div>
            </div>

            {/* How to Apply */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="aspect-video">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="How to Apply"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">How to Apply</h3>
                <p className="text-sm text-gray-600">Step-by-step guide to applying for state funding</p>
              </div>
            </div>

            {/* WorkOne Services */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="aspect-video">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="WorkOne Services"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">WorkOne Services</h3>
                <p className="text-sm text-gray-600">Discover the support services available to you</p>
              </div>
            </div>

            {/* Career Pathways */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="aspect-video">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Career Pathways"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">Career Pathways</h3>
                <p className="text-sm text-gray-600">Explore high-demand careers and training options</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Programs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Current Training Programs
            </h2>
            <p className="text-xl text-gray-600">
              All programs eligible for state funding
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentPrograms.map((program, idx) => (
              <div
                key={idx}
                className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {program.name}
                </h3>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-semibold">{program.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Job Placement:</span>
                    <span className="font-semibold text-green-600">{program.placement}</span>
                  </div>
                </div>
                <div className="mb-4">
                  <span className="text-sm text-gray-600 block mb-2">Funding Available:</span>
                  <div className="flex flex-wrap gap-2">
                    {program.funding.map((fund) => (
                      <span
                        key={fund}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold"
                      >
                        {fund}
                      </span>
                    ))}
                  </div>
                </div>
                <Link
                  to="/apply"
                  className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition text-sm"
                >
                  Get Started Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enrollment Process */}
      <section id="enrollment-process" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How to Get Started
            </h2>
            <p className="text-xl text-gray-600">
              Simple 6-step process to begin your funded training
            </p>
          </div>

          <div className="space-y-8">
            {enrollmentSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className="bg-white rounded-lg shadow-md p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start"
                >
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                      {step.step}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-3">
                      <Icon className="w-6 h-6 text-blue-600" />
                      <h3 className="text-2xl font-bold text-gray-900">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 mb-4">
                      {step.description}
                    </p>
                    <button className="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-2">
                      {step.action}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/apply"
              className="inline-block bg-blue-600 text-white px-12 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition"
            >
              Start Your Application Now
            </Link>
          </div>
        </div>
      </section>

      {/* Required Documents */}
      <section id="documents" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Required Documents
            </h2>
            <p className="text-xl text-gray-600">
              Gather these documents before your WorkOne appointment
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-8">
            <ul className="space-y-4">
              {requiredDocuments.map((doc, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{doc}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 p-6 bg-blue-50 rounded-lg">
              <div className="flex items-start gap-3">
                <Download className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Download Document Checklist
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Print this checklist to ensure you have everything you need
                  </p>
                  <button className="text-blue-600 font-semibold hover:text-blue-700">
                    Download PDF Checklist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl mb-8">
            100% funded training is waiting for you. Start your application today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/apply"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition"
            >
              Apply Now
            </Link>
            <Link
              to="/student-portal"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-600 transition"
            >
              Student Portal Login
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
