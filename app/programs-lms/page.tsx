'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Search, Filter, BookOpen, Clock, DollarSign, Users, Star,
  Award, TrendingUp, CheckCircle, ArrowRight, Play, Target,
  Briefcase, GraduationCap, Heart, Wrench, Code, Stethoscope
} from 'lucide-react';

export default function ProgramsLMSPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFunding, setSelectedFunding] = useState('all');

  const filteredPrograms = programs.filter((program) => {
    const matchesSearch =
      program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || program.category === selectedCategory;
    const matchesFunding =
      selectedFunding === 'all' || program.funding.includes(selectedFunding);
    return matchesSearch && matchesCategory && matchesFunding;
  });

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-600 via-red-700 to-orange-600 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Choose Your Career Path
            </h1>
            <p className="text-xl text-white/90 mb-8">
              All programs are 100% funded through WIOA, WRG, and JRI. No tuition, no debt. Real
              jobs waiting.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search programs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl text-slate-900 text-lg focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">$0</div>
                <div className="text-sm text-white/80">Tuition Cost</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">8+</div>
                <div className="text-sm text-white/80">Career Programs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">85%</div>
                <div className="text-sm text-white/80">Job Placement</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-slate-600" />
              <span className="font-semibold text-slate-900">Filter by:</span>
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="all">All Categories</option>
              <option value="healthcare">Healthcare</option>
              <option value="trades">Skilled Trades</option>
              <option value="business">Business & Finance</option>
              <option value="technology">Technology</option>
            </select>

            <select
              value={selectedFunding}
              onChange={(e) => setSelectedFunding(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="all">All Funding</option>
              <option value="WIOA">WIOA</option>
              <option value="WRG">WRG</option>
              <option value="JRI">JRI</option>
              <option value="Next Level Jobs">Next Level Jobs</option>
            </select>

            <div className="ml-auto text-sm text-slate-600">
              Showing {filteredPrograms.length} of {programs.length} programs
            </div>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="container mx-auto px-6 py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPrograms.map((program) => (
            <div
              key={program.id}
              className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl transition-all group"
            >
              {/* Program Header */}
              <div className="relative h-48 bg-gradient-to-br from-red-100 to-blue-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-white/90 flex items-center justify-center">
                    <program.icon size={40} className="text-red-600" />
                  </div>
                  <div className="text-sm font-semibold text-slate-700 bg-white/90 px-3 py-1 rounded-full inline-block">
                    {program.category}
                  </div>
                </div>
                {program.trending && (
                  <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <TrendingUp size={12} />
                    Trending
                  </div>
                )}
              </div>

              {/* Program Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-red-600 transition-colors">
                  {program.title}
                </h3>
                <p className="text-sm text-slate-600 mb-4 line-clamp-2">{program.description}</p>

                {/* Program Meta */}
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock size={16} className="text-slate-400" />
                    <span>{program.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <DollarSign size={16} className="text-slate-400" />
                    <span className="font-semibold text-green-600">
                      {program.salary} avg. salary
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Users size={16} className="text-slate-400" />
                    <span>{program.students} students enrolled</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Star size={16} className="text-yellow-400 fill-yellow-400" />
                    <span>{program.rating} rating</span>
                  </div>
                </div>

                {/* Funding Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {program.funding.map((fund) => (
                    <span
                      key={fund}
                      className="text-xs font-semibold text-brandPrimary bg-blue-50 px-2 py-1 rounded"
                    >
                      {fund}
                    </span>
                  ))}
                </div>

                {/* Key Features */}
                <div className="space-y-2 mb-4 pb-4 border-b border-slate-200">
                  {program.features.slice(0, 3).map((feature, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm text-slate-700">
                      <CheckCircle size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex gap-3">
                  <Link
                    href={`/programs/${program.slug}`}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold text-sm"
                  >
                    Learn More
                    <ArrowRight size={16} />
                  </Link>
                  <Link
                    href={`/enroll/${program.slug}`}
                    className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-semibold text-sm"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPrograms.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
              <Search size={32} className="text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No programs found</h3>
            <p className="text-slate-600 mb-6">Try adjusting your filters or search query</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedFunding('all');
              }}
              className="text-red-600 font-semibold hover:text-red-700"
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-white py-16 border-t border-slate-200">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose Our Programs?</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              We're committed to your success from enrollment through job placement.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                  <benefit.icon size={32} className="text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-slate-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your New Career?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join hundreds of students who have transformed their lives through our free training
            programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-red-600 rounded-full font-bold hover:bg-slate-50 transition-all hover:scale-105 shadow-lg"
            >
              Check My Eligibility
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

// Data
const programs = [
  {
    id: 'vita-tax-prep',
    slug: 'vita',
    title: 'VITA Tax Preparation',
    description: 'Become an IRS-certified tax preparer. Help families file taxes and earn income year-round.',
    category: 'business',
    icon: Briefcase,
    duration: '8-12 weeks',
    salary: '$35K-$55K',
    students: '342',
    rating: '4.8',
    funding: ['WIOA', 'WRG'],
    trending: true,
    features: [
      'IRS certification included',
      'Flexible online learning',
      'Real-world practice returns',
      'Job placement assistance',
    ],
  },
  {
    id: 'barber',
    slug: 'barber',
    title: 'Barber Apprenticeship',
    description: 'Learn barbering in a real shop. Get licensed and start your own business or work anywhere.',
    category: 'trades',
    icon: Wrench,
    duration: '12 months',
    salary: '$30K-$60K+',
    students: '289',
    rating: '4.9',
    funding: ['WIOA', 'Apprenticeship'],
    trending: false,
    features: [
      'State licensing prep',
      'Hands-on training',
      '1500 hours experience',
      'Business management skills',
    ],
  },
  {
    id: 'medical-assistant',
    slug: 'medical-assistant',
    title: 'Medical Assistant',
    description: 'Work in clinics and hospitals. Take vitals, assist doctors, manage patient records.',
    category: 'healthcare',
    icon: Stethoscope,
    duration: '8-12 weeks',
    salary: '$35K-$45K',
    students: '456',
    rating: '4.7',
    funding: ['WIOA', 'WRG'],
    trending: true,
    features: [
      'Clinical procedures training',
      'EHR certification',
      'Externship included',
      'National certification prep',
    ],
  },
  {
    id: 'hvac',
    slug: 'hvac',
    title: 'HVAC Technician',
    description: 'Install and repair heating and cooling systems. High demand, great pay, work anywhere.',
    category: 'trades',
    icon: Wrench,
    duration: '12 weeks',
    salary: '$40K-$65K',
    students: '378',
    rating: '4.8',
    funding: ['WIOA', 'WRG'],
    trending: true,
    features: [
      'EPA certification prep',
      'Hands-on lab training',
      'NATE-ready curriculum',
      'Tool kit included',
    ],
  },
  {
    id: 'cna',
    slug: 'cna',
    title: 'Certified Nursing Assistant',
    description: 'Provide basic patient care in hospitals and nursing homes. State certification included.',
    category: 'healthcare',
    icon: Heart,
    duration: '6 weeks',
    salary: '$28K-$38K',
    students: '612',
    rating: '4.8',
    funding: ['WIOA', 'WRG'],
    trending: false,
    features: [
      'State certification exam',
      'Clinical rotations',
      'CPR certification',
      'Job placement support',
    ],
  },
  {
    id: 'digital-skills',
    slug: 'digital-skills',
    title: 'Digital Skills Training',
    description: 'Master Microsoft Office, Google Workspace, email, and essential computer skills.',
    category: 'technology',
    icon: Code,
    duration: '6-8 weeks',
    salary: '$30K-$45K',
    students: '789',
    rating: '4.6',
    funding: ['WIOA', 'WRG'],
    trending: false,
    features: [
      'Microsoft Office certification',
      'Google Workspace training',
      'Professional communication',
      'Remote work skills',
    ],
  },
];

const benefits = [
  {
    icon: DollarSign,
    title: '100% Funded',
    description: 'No tuition costs. We handle all funding paperwork for you.',
  },
  {
    icon: Award,
    title: 'Industry Certifications',
    description: 'Earn recognized credentials that employers value.',
  },
  {
    icon: Target,
    title: 'Job Placement',
    description: '85% of graduates find employment within 90 days.',
  },
  {
    icon: Users,
    title: 'Expert Support',
    description: 'Dedicated case managers and career counselors.',
  },
];
