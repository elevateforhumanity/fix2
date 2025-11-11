/**
 * Course Catalog Page
 * Complete listing of all available courses and programs
 */

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Search, Filter, Clock, Users, Award, DollarSign, CheckCircle } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

interface Course {
  id: string;
  title: string;
  category: string;
  duration: string;
  students: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  price: string;
  funding: string[];
  description: string;
  outcomes: string[];
  image?: string;
}

const courses: Course[] = [
  {
    id: 'barber-apprenticeship',
    title: 'Barber Apprenticeship',
    category: 'Personal Services',
    duration: '12-18 months',
    students: 45,
    level: 'Beginner',
    price: '$0',
    funding: ['WIOA', 'WRG', 'JRI'],
    description: 'Launch your career in professional barbering through our comprehensive registered apprenticeship program. Train in real licensed barbershops under master barbers, learning classic and modern cutting techniques, beard trimming, hot towel shaves, and client consultation. This hands-on program combines 1,500 hours of practical experience with classroom instruction covering sanitation, safety protocols, business management, and customer service. Earn while you learn with paid apprenticeship wages starting at $12-18/hour. Upon completion, you\'ll be fully prepared for Indiana state licensure and ready to work in established shops or start your own business. Many graduates open their own shops within 3 years.',
    outcomes: ['Indiana State Barber License', 'Earn $25-35/hour', '1,500 Hours Hands-On Training', 'Business Ownership Path'],
    image: '/images/barber.jpg'
  },
  {
    id: 'building-maintenance',
    title: 'Building Maintenance Technician',
    category: 'Facilities',
    duration: '6-12 months',
    students: 38,
    level: 'Beginner',
    price: '$0',
    funding: ['WIOA', 'WRG'],
    description: 'Become a skilled building maintenance technician with comprehensive training in all major building systems. This program covers HVAC basics and troubleshooting, electrical system maintenance and repair, plumbing repairs and fixture installation, carpentry and drywall work, preventive maintenance scheduling, and OSHA safety compliance. Work alongside experienced technicians in real commercial and residential facilities, learning to diagnose problems, perform repairs, and maintain safe, functional buildings. Gain multiple industry certifications including EPA and OSHA credentials. High demand in commercial real estate, property management, healthcare facilities, and educational institutions. Clear pathway to facility manager and supervisory roles.',
    outcomes: ['EPA & OSHA Certifications', 'Earn $22-32/hour', 'Multiple Building Systems', 'Facility Manager Track'],
    image: '/images/building.jpg'
  },
  {
    id: 'healthcare-cna',
    title: 'Healthcare CNA/QMA',
    category: 'Healthcare',
    duration: '4-8 weeks',
    students: 62,
    level: 'Beginner',
    price: '$0',
    funding: ['WIOA', 'WRG', 'JRI'],
    description: 'Fast-track your healthcare career with our intensive Certified Nursing Assistant and Qualified Medication Aide certification program. This accelerated training prepares you to provide essential patient care in hospitals, nursing homes, assisted living facilities, and home health settings. Learn hands-on patient care skills including daily living assistance, vital signs monitoring and recording, medication administration and documentation, medical charting with electronic health records, infection control and universal precautions, and compassionate patient communication. Complete required clinical hours in real healthcare settings. With Indiana\'s growing healthcare needs and aging population, CNAs and QMAs are in high demand across all care settings. This program serves as an excellent foundation for advancing to LPN and RN programs.',
    outcomes: ['State CNA/QMA Certification', 'Earn $18-25/hour', 'Clinical Hours Included', 'Pathway to LPN/RN'],
    image: '/images/healthcare.jpg'
  },
  {
    id: 'hvac-technician',
    title: 'HVAC Technician',
    category: 'Skilled Trades',
    duration: '6-12 months',
    students: 41,
    level: 'Beginner',
    price: '$0',
    funding: ['WIOA', 'WRG'],
    description: 'Launch a rewarding career in heating, ventilation, air conditioning, and refrigeration with comprehensive hands-on training. This registered apprenticeship teaches you to install, maintain, troubleshoot, and repair HVAC systems in residential and commercial settings. Master HVAC system installation and commissioning, troubleshooting and diagnostic procedures, refrigerant handling with EPA 608 certification, electrical systems and controls, customer service and communication, and energy efficiency optimization. Work with experienced technicians on real job sites, learning industry best practices and safety protocols. With year-round demand and excellent earning potential, HVAC technicians enjoy job security and opportunities for advancement to service manager and business ownership roles. Indiana\'s construction boom and aging infrastructure create strong demand.',
    outcomes: ['EPA 608 Certification', 'Earn $28-40/hour', 'Residential & Commercial', 'Year-Round Work'],
    image: '/images/hvac.jpg'
  },
  {
    id: 'welding-certification',
    title: 'Welding Certification',
    category: 'Manufacturing',
    duration: '6-9 months',
    students: 35,
    level: 'Beginner',
    price: '$0',
    funding: ['WIOA', 'WRG', 'JRI'],
    description: 'Master the art and science of welding with comprehensive training in multiple welding processes. This program teaches MIG, TIG, and Stick welding techniques, blueprint reading and interpretation, metal fabrication and fitting, quality inspection and testing, safety procedures and PPE usage, and welding metallurgy and joint design. Work in a professional welding lab with industry-standard equipment, earning American Welding Society (AWS) certifications that are recognized nationwide. Indiana\'s strong manufacturing sector offers excellent opportunities for skilled welders in automotive, aerospace, construction, industrial fabrication, shipbuilding, and pipeline work. Many welders advance to welding inspector, supervisor, or start their own fabrication businesses. Specialized certifications in pipe welding and underwater welding can command premium wages.',
    outcomes: ['AWS Certification', 'Earn $25-38/hour', 'MIG, TIG & Stick Welding', 'Manufacturing & Construction'],
    image: '/images/welding.jpg'
  },
  {
    id: 'cdl-training',
    title: 'CDL Training',
    category: 'Transportation',
    duration: '4-6 weeks',
    students: 52,
    level: 'Beginner',
    price: '$0',
    funding: ['WIOA', 'WRG'],
    description: 'Launch a stable, well-paying career in professional trucking with our comprehensive Commercial Driver\'s License training program. This intensive course combines classroom instruction with extensive behind-the-wheel training, teaching you pre-trip vehicle inspection procedures, safe driving techniques and defensive driving, backing, parking, and maneuvering in tight spaces, hours of service regulations and electronic logbook management, cargo securement and weight distribution, and trip planning and route optimization. Train on modern commercial vehicles with experienced instructors. With a nationwide driver shortage, CDL holders enjoy excellent job security, competitive wages, and often receive sign-on bonuses of $3,000-$10,000. Many carriers offer benefits, home-time options, and tuition reimbursement. Opportunities in long-haul, regional, and local delivery. Clear pathway to owner-operator status.',
    outcomes: ['Class A CDL License', 'Earn $55k-75k/year', 'Behind-the-Wheel Training', 'Sign-On Bonuses Available'],
    image: '/images/cdl.jpg'
  },
  {
    id: 'digital-skills',
    title: 'Digital Skills Bootcamp',
    category: 'Technology',
    duration: '8-12 weeks',
    students: 28,
    level: 'Beginner',
    price: '$0',
    funding: ['WIOA', 'WRG'],
    description: 'Build essential digital literacy skills for today\'s technology-driven workplace. This comprehensive bootcamp covers computer fundamentals and operating systems, Microsoft Office Suite (Word, Excel, PowerPoint, Outlook), internet research and online communication, email etiquette and professional correspondence, cloud storage and file management, basic troubleshooting and tech support, cybersecurity awareness and data protection, and social media for professional networking. Perfect for career changers, returning workers, or anyone looking to enhance their technology skills. Hands-on training in modern computer labs with individual workstations. Earn industry-recognized certifications in Microsoft Office Specialist and IC3 Digital Literacy. These foundational skills are required for virtually every modern job and open doors to administrative, customer service, data entry, and office support positions.',
    outcomes: ['Microsoft Office Specialist', 'Earn $15-22/hour', 'Word, Excel & PowerPoint', 'IT Career Foundation'],
    image: '/images/digital.jpg'
  },
  {
    id: 'customer-service',
    title: 'Customer Service Professional',
    category: 'Business',
    duration: '4-6 weeks',
    students: 31,
    level: 'Beginner',
    price: '$0',
    funding: ['WIOA', 'WRG'],
    description: 'Master the essential skills needed to excel in customer-facing roles across retail, hospitality, call centers, and service industries. This intensive program covers effective communication and active listening, conflict resolution and de-escalation techniques, problem-solving and critical thinking, phone etiquette and email communication, point-of-sale systems and cash handling, customer relationship management (CRM) software, time management and multitasking, and professional appearance and workplace conduct. Learn through role-playing exercises, real-world scenarios, and interactive workshops. Understand customer psychology, build rapport, handle difficult situations with grace, and turn complaints into opportunities. High demand in retail stores, restaurants, hotels, banks, healthcare facilities, and call centers. Many customer service professionals advance to team leader, supervisor, and management positions. Strong customer service skills are transferable across all industries.',
    outcomes: ['Professional Certificate', 'Earn $14-20/hour', 'Retail & Hospitality Skills', 'Management Track'],
    image: '/images/customer-service.jpg'
  }
];

const categories = ['All', 'Personal Services', 'Facilities', 'Healthcare', 'Skilled Trades', 'Manufacturing', 'Transportation', 'Technology', 'Business'];

export default function CourseCatalogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Course Catalog | Elevate for Humanity</title>
        <meta
          name="description"
          content="Browse our complete catalog of workforce training programs. 100% funded courses in healthcare, skilled trades, technology, and more."
        />
      </Helmet>

      <Navigation />

      <main id="main-content">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Course Catalog
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-95">
                Explore our complete range of 100% funded training programs
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="bg-white border-b sticky top-0 z-10 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-gray-600" />
                <span className="font-semibold text-gray-700">Filters:</span>
              </div>
              
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              {/* Level Filter */}
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>

              <div className="ml-auto text-gray-600">
                {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'} found
              </div>
            </div>
          </div>
        </section>

        {/* Course Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  {/* Course Image */}
                  <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                    <div className="text-white text-6xl font-bold opacity-20">
                      {course.title.charAt(0)}
                    </div>
                  </div>

                  {/* Course Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                        {course.category}
                      </span>
                      <span className="text-2xl font-bold text-green-600">{course.price}</span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {course.title}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {course.description}
                    </p>

                    {/* Course Meta */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="h-4 w-4" />
                        <span>{course.students} students enrolled</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Award className="h-4 w-4" />
                        <span>{course.level}</span>
                      </div>
                    </div>

                    {/* Funding Options */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {course.funding.map((fund) => (
                        <span
                          key={fund}
                          className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-semibold"
                        >
                          {fund}
                        </span>
                      ))}
                    </div>

                    {/* Outcomes */}
                    <div className="space-y-1 mb-4">
                      {course.outcomes.map((outcome, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span>{outcome}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <Link
                      to={`/apply?program=${course.id}`}
                      className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                      Apply Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600 mb-4">No courses found matching your criteria</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                    setSelectedLevel('All');
                  }}
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Your Training?
            </h2>
            <p className="text-xl mb-8 opacity-95">
              All programs are 100% funded. No cost to you.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/apply"
                className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Apply Now
              </Link>
              <Link
                to="/student-portal"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition"
              >
                Student Portal
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
