/**
 * Apprenticeship Programs Page
 * Complete information about all apprenticeship opportunities
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { CheckCircle, DollarSign, Clock, Award, Users, TrendingUp, ArrowRight, Briefcase } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const apprenticeshipPrograms = [
  {
    id: 'barber',
    name: 'Barber Apprenticeship',
    category: 'Personal Services',
    duration: '12-18 months',
    hours: '1,500 hours',
    wage: '$12-18/hour',
    finalWage: '$25-35/hour',
    description: 'Master the professional art of barbering through comprehensive hands-on training in licensed shop environments. This registered apprenticeship combines classroom instruction with real-world client experience, teaching you classic and modern cutting techniques, business operations, and customer service excellence. Upon completion, you\'ll be prepared for state licensure and ready to work in established shops or start your own business.',
    jobs: [
      'Licensed Barber',
      'Master Barber',
      'Shop Manager',
      'Barber Shop Owner',
      'Mobile Barber',
      'Salon Specialist'
    ],
    skills: [
      'Classic and modern hair cutting techniques',
      'Beard trimming, shaping, and hot towel shaves',
      'Client consultation and style recommendations',
      'Sanitation, sterilization, and safety protocols',
      'Business management and shop operations',
      'Customer service and client retention'
    ],
    requirements: [
      'High school diploma or GED',
      'Valid Indiana driver\'s license',
      'Pass background check',
      'Professional appearance and demeanor',
      'Strong communication and interpersonal skills',
      'Age 18 or older'
    ],
    outcomes: [
      '95% job placement rate',
      'Average starting wage: $25/hour',
      'License exam pass rate: 98%',
      'Many open their own shops within 3 years'
    ],
    funding: ['WIOA', 'WRG', 'JRI', 'Apprenticeship Grants']
  },
  {
    id: 'building-maintenance',
    name: 'Building Maintenance Technician',
    category: 'Construction & Facilities',
    duration: '6-12 months',
    hours: '2,000 hours',
    wage: '$14-20/hour',
    finalWage: '$22-32/hour',
    description: 'Gain comprehensive expertise in maintaining, troubleshooting, and repairing building systems for commercial and residential properties. This program covers electrical, plumbing, HVAC basics, carpentry, and preventive maintenance. You\'ll work alongside experienced technicians in real facilities, learning to diagnose problems, perform repairs, and maintain safe, functional buildings. Graduates are prepared for multiple industry certifications and advancement to supervisory roles.',
    jobs: [
      'Building Maintenance Technician',
      'Facilities Maintenance Worker',
      'Property Maintenance Specialist',
      'Maintenance Supervisor',
      'Facility Manager',
      'Commercial Building Technician'
    ],
    skills: [
      'HVAC system basics and troubleshooting',
      'Electrical system maintenance and repair',
      'Plumbing repairs and fixture installation',
      'Carpentry, drywall, and painting',
      'Preventive maintenance scheduling and execution',
      'Safety protocols and OSHA compliance'
    ],
    requirements: [
      'High school diploma or GED',
      'Basic math skills and mechanical aptitude',
      'Physical ability to lift 50+ lbs',
      'Valid driver\'s license',
      'Pass drug screening and background check'
    ],
    outcomes: [
      '92% job placement rate',
      'Average starting wage: $22/hour',
      'High demand in commercial sector',
      'Advancement to facility manager roles'
    ],
    funding: ['WIOA', 'WRG', 'Apprenticeship Grants']
  },
  {
    id: 'healthcare-cna',
    name: 'Healthcare CNA/QMA',
    category: 'Healthcare',
    duration: '4-8 weeks',
    hours: '120 hours',
    wage: '$15-20/hour',
    finalWage: '$18-25/hour',
    description: 'Fast-track your healthcare career with our Certified Nursing Assistant and Qualified Medication Aide certification program. This intensive training prepares you to provide essential patient care in hospitals, nursing homes, and assisted living facilities. You\'ll learn hands-on patient care skills, medication administration, vital signs monitoring, and professional healthcare communication. With Indiana\'s growing healthcare needs, CNAs and QMAs are in high demand across all care settings.',
    jobs: [
      'Certified Nursing Assistant (CNA)',
      'Qualified Medication Aide (QMA)',
      'Home Health Aide',
      'Patient Care Technician',
      'Medical Assistant',
      'Long-Term Care Specialist'
    ],
    skills: [
      'Patient care fundamentals and daily living assistance',
      'Vital signs monitoring and recording',
      'Medication administration and documentation',
      'Medical charting and electronic health records',
      'Infection control and universal precautions',
      'Patient communication and compassionate care'
    ],
    requirements: [
      'High school diploma or GED',
      'Pass criminal background check',
      'Current immunizations (Hepatitis B, MMR, Varicella)',
      'TB test (within 12 months)',
      'CPR certification (can be obtained during program)',
      'Age 18 or older'
    ],
    outcomes: [
      '98% job placement rate',
      'Average starting wage: $18/hour',
      'Certification exam pass rate: 96%',
      'Pathway to LPN and RN programs'
    ],
    funding: ['WIOA', 'WRG', 'JRI', 'Healthcare Grants']
  },
  {
    id: 'hvac',
    name: 'HVAC Technician',
    category: 'Skilled Trades',
    duration: '6-12 months',
    hours: '2,000 hours',
    wage: '$16-22/hour',
    finalWage: '$28-40/hour',
    description: 'Launch a rewarding career in heating, ventilation, air conditioning, and refrigeration with comprehensive hands-on training. This registered apprenticeship teaches you to install, maintain, troubleshoot, and repair HVAC systems in residential and commercial settings. You\'ll earn EPA 608 certification for refrigerant handling, learn electrical systems, and master customer service skills. With year-round demand and excellent earning potential, HVAC technicians enjoy job security and opportunities for advancement.',
    jobs: [
      'HVAC Technician',
      'HVAC Installer',
      'Service Technician',
      'Refrigeration Specialist',
      'HVAC Service Manager',
      'Commercial HVAC Technician'
    ],
    skills: [
      'HVAC system installation and commissioning',
      'Troubleshooting and diagnostic procedures',
      'Refrigerant handling and EPA 608 certification',
      'Electrical systems and controls',
      'Customer service and communication',
      'Energy efficiency and system optimization'
    ],
    requirements: [
      'High school diploma or GED',
      'Strong math skills (algebra, geometry)',
      'Mechanical aptitude and problem-solving ability',
      'Valid driver\'s license and reliable transportation',
      'Pass background check and drug screening',
      'Physical ability to work in various conditions'
    ],
    outcomes: [
      '94% job placement rate',
      'Average starting wage: $28/hour',
      'EPA 608 certification included',
      'High demand year-round in all sectors'
    ],
    funding: ['WIOA', 'WRG', 'Apprenticeship Grants']
  },
  {
    id: 'welding',
    name: 'Welding Certification',
    category: 'Manufacturing',
    duration: '6-9 months',
    hours: '1,800 hours',
    wage: '$15-22/hour',
    finalWage: '$25-38/hour',
    description: 'Master the art and science of welding with comprehensive training in multiple welding processes. This program teaches MIG, TIG, and Stick welding techniques, blueprint reading, metal fabrication, and quality inspection. You\'ll work in a professional welding lab, earning American Welding Society (AWS) certifications that are recognized nationwide. Indiana\'s strong manufacturing sector offers excellent opportunities for skilled welders in automotive, aerospace, construction, and industrial fabrication.',
    jobs: [
      'Certified Welder',
      'MIG/TIG/Stick Welder',
      'Fabrication Welder',
      'Structural Welder',
      'Pipe Welder',
      'Welding Inspector'
    ],
    skills: [
      'MIG, TIG, and Stick welding processes',
      'Blueprint reading and interpretation',
      'Metal fabrication and fitting',
      'Quality inspection and testing',
      'Safety procedures and PPE usage',
      'Welding metallurgy and joint design'
    ],
    requirements: [
      'High school diploma or GED',
      'Pass vision test (correctable to 20/40)',
      'Physical dexterity and hand-eye coordination',
      'Safety-conscious mindset',
      'Pass drug screening and background check',
      'Ability to work in various positions (overhead, vertical)'
    ],
    outcomes: [
      '96% job placement rate',
      'Average starting wage: $25/hour',
      'AWS certification included',
      'Opportunities nationwide in multiple industries'
    ],
    funding: ['WIOA', 'WRG', 'JRI', 'Manufacturing Grants']
  },
  {
    id: 'cdl',
    name: 'CDL Training',
    category: 'Transportation',
    duration: '4-6 weeks',
    hours: '160 hours',
    wage: '$18-25/hour',
    finalWage: '$55,000-75,000/year',
    description: 'Launch a stable, well-paying career in professional trucking with our comprehensive Commercial Driver\'s License training program. This intensive course combines classroom instruction with behind-the-wheel training, teaching you vehicle inspection, safe driving techniques, backing and maneuvering, hours of service regulations, and cargo securement. With a nationwide driver shortage, CDL holders enjoy excellent job security, competitive wages, and often receive sign-on bonuses. Many carriers offer benefits and home-time options.',
    jobs: [
      'Class A CDL Driver',
      'Long-Haul Truck Driver',
      'Regional Truck Driver',
      'Local Delivery Driver',
      'Tanker Driver',
      'Flatbed Driver'
    ],
    skills: [
      'Pre-trip vehicle inspection procedures',
      'Safe driving techniques and defensive driving',
      'Backing, parking, and maneuvering',
      'Hours of service regulations and logbook management',
      'Cargo securement and weight distribution',
      'Trip planning and route optimization'
    ],
    requirements: [
      'Age 21+ for interstate (18+ for intrastate only)',
      'Valid driver\'s license with clean record',
      'No major traffic violations in past 3 years',
      'Pass DOT physical examination',
      'Pass drug screening and background check',
      'Able to read and speak English'
    ],
    outcomes: [
      '97% job placement rate',
      'Average starting salary: $55,000/year',
      'CDL exam pass rate: 95%',
      'Sign-on bonuses of $3,000-$10,000 common'
    ],
    funding: ['WIOA', 'WRG', 'Employer-Sponsored']
  }
];

const apprenticeshipBenefits = [
  {
    icon: DollarSign,
    title: 'Earn While You Learn',
    description: 'Get paid from day one while gaining valuable skills and experience'
  },
  {
    icon: Award,
    title: 'Industry Certifications',
    description: 'Earn nationally recognized credentials that employers value'
  },
  {
    icon: Users,
    title: 'Mentorship',
    description: 'Learn from experienced professionals in real work environments'
  },
  {
    icon: TrendingUp,
    title: 'Career Advancement',
    description: 'Clear pathway from apprentice to journeyman to master'
  },
  {
    icon: Briefcase,
    title: 'Job Placement',
    description: '90%+ placement rate with partner employers'
  },
  {
    icon: Clock,
    title: 'Flexible Scheduling',
    description: 'Balance work, training, and personal commitments'
  }
];

const enrollmentProcess = [
  {
    step: 1,
    title: 'Choose Your Program',
    description: 'Review apprenticeship options and select the career path that interests you most.'
  },
  {
    step: 2,
    title: 'Check Eligibility',
    description: 'Ensure you meet the basic requirements and have necessary documentation.'
  },
  {
    step: 3,
    title: 'Apply for Funding',
    description: 'Work with WorkOne to secure WIOA, WRG, or other funding sources.'
  },
  {
    step: 4,
    title: 'Complete Application',
    description: 'Submit your apprenticeship application and required documents.'
  },
  {
    step: 5,
    title: 'Interview & Assessment',
    description: 'Meet with program coordinators and complete skills assessments.'
  },
  {
    step: 6,
    title: 'Start Your Apprenticeship',
    description: 'Begin earning and learning with your employer sponsor.'
  }
];

export default function ApprenticeshipPrograms() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Apprenticeship Programs | Elevate for Humanity</title>
        <meta
          name="description"
          content="Earn while you learn with registered apprenticeship programs. 100% funded training in high-demand careers. Get paid from day one."
        />
      </Helmet>

      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Registered Apprenticeship Programs
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Earn While You Learn - Get Paid to Train for Your New Career
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/apply"
                className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Apply Now
              </Link>
              <a
                href="#programs"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition"
              >
                View Programs
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Apprenticeship?
            </h2>
            <p className="text-xl text-gray-600">
              The smart way to start your career
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {apprenticeshipBenefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div key={idx} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 text-orange-600 rounded-full mb-4">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Video Highlights */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Apprenticeship Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              See how apprenticeships transform careers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="aspect-video">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="What is an Apprenticeship?"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">What is an Apprenticeship?</h3>
                <p className="text-sm text-gray-600">Learn the basics of registered apprenticeships</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="aspect-video">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Apprentice Success Story"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">From Apprentice to Journeyman</h3>
                <p className="text-sm text-gray-600">Real stories from successful apprentices</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="aspect-video">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Employer Perspective"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">Employer Benefits</h3>
                <p className="text-sm text-gray-600">Why companies invest in apprenticeships</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Available Apprenticeship Programs
            </h2>
            <p className="text-xl text-gray-600">
              Choose your career path
            </p>
          </div>

          <div className="space-y-8">
            {apprenticeshipPrograms.map((program) => (
              <div
                key={program.id}
                className="bg-white border-2 border-gray-200 rounded-lg p-8 hover:border-orange-500 hover:shadow-xl transition"
              >
                <div className="grid md:grid-cols-3 gap-8">
                  {/* Left Column - Program Info */}
                  <div className="md:col-span-1">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-semibold">{program.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Training Hours:</span>
                        <span className="font-semibold">{program.hours}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Starting Wage:</span>
                        <span className="font-semibold text-green-600">{program.wage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Final Wage:</span>
                        <span className="font-semibold text-green-600">{program.finalWage}</span>
                      </div>
                    </div>
                  </div>

                  {/* Middle Column - Details */}
                  <div className="md:col-span-2">
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-semibold mb-2">
                        {program.category}
                      </span>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {program.name}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {program.description}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Career Opportunities:</h4>
                      <div className="flex flex-wrap gap-2">
                        {program.jobs.map((job, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
                          >
                            {job}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Skills You'll Learn:</h4>
                        <ul className="space-y-2">
                          {program.skills.map((skill, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span>{skill}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Requirements:</h4>
                        <ul className="space-y-2">
                          {program.requirements.map((req, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Career Outcomes:</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {program.outcomes.map((outcome, idx) => (
                          <div key={idx} className="text-center p-3 bg-gray-50 rounded-lg">
                            <p className="text-xs text-gray-600">{outcome}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-sm text-gray-600">Funding Available:</span>
                      {program.funding.map((fund) => (
                        <span
                          key={fund}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold"
                        >
                          {fund}
                        </span>
                      ))}
                    </div>

                    <Link
                      to={`/apply?program=${program.id}`}
                      className="inline-flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition"
                    >
                      Apply for {program.name}
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enrollment Process */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How to Get Started
            </h2>
            <p className="text-xl text-gray-600">
              6 simple steps to begin your apprenticeship
            </p>
          </div>

          <div className="space-y-6">
            {enrollmentProcess.map((step) => (
              <div
                key={step.step}
                className="bg-white rounded-lg shadow-md p-6 flex gap-6 items-start"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                    {step.step}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/apply"
              className="inline-block bg-orange-600 text-white px-12 py-4 rounded-lg font-bold text-lg hover:bg-orange-700 transition"
            >
              Start Your Application
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Earn While You Learn?
          </h2>
          <p className="text-xl mb-8">
            Start your apprenticeship today and get paid to train for your new career.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/apply"
              className="bg-white text-orange-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition"
            >
              Apply Now
            </Link>
            <Link
              to="/state-programs"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-orange-600 transition"
            >
              View Funding Options
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
