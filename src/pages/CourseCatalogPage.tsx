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
    description: 'Master professional barbering with hands-on training in licensed shops. Earn while you learn.',
    outcomes: ['State License', '95% Job Placement', '$25-35/hour'],
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
    description: 'Learn HVAC, electrical, plumbing, and building systems maintenance.',
    outcomes: ['Multiple Certifications', '92% Job Placement', '$22-32/hour'],
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
    description: 'Fast-track to healthcare careers with state certification and clinical hours.',
    outcomes: ['State Certification', '98% Job Placement', '$18-25/hour'],
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
    description: 'Comprehensive HVAC training with EPA 608 certification included.',
    outcomes: ['EPA Certified', '94% Job Placement', '$28-40/hour'],
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
    description: 'Master MIG, TIG, and Stick welding with AWS certification.',
    outcomes: ['AWS Certified', '96% Job Placement', '$25-38/hour'],
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
    description: 'Earn your Commercial Driver\'s License and start a trucking career.',
    outcomes: ['CDL License', '97% Job Placement', '$55k-75k/year'],
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
    description: 'Learn essential computer skills, Microsoft Office, and digital literacy.',
    outcomes: ['Industry Certifications', '88% Job Placement', '$15-22/hour'],
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
    description: 'Master customer service skills for retail, hospitality, and call centers.',
    outcomes: ['Professional Certificate', '85% Job Placement', '$14-20/hour'],
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
