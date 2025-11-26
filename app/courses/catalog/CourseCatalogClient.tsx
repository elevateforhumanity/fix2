'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, BookOpen, Clock, Users, Star, Award, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';

interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  level: string;
  duration: string;
  total_students: number;
  rating: number;
  funding_programs: string[];
  certified: boolean;
  trending: boolean;
}

interface Props {
  courses: Course[];
}

export default function CourseCatalogClient({ courses }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const filteredCourses = (courses || []).filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Explore Our Course Catalog
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Industry-leading courses in healthcare, skilled trades, and technology. All fully funded through WIOA, WRG, and JRI programs.
            </p>
            
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl text-slate-900 text-lg focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Content */}
      <section className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 sticky top-6">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Filter size={20} />
                Filters
              </h3>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="all">All Categories</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="trades">Skilled Trades</option>
                  <option value="technology">Technology</option>
                  <option value="business">Business</option>
                </select>
              </div>

              {/* Level Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Level
                </label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="all">All Levels</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest First</option>
                  <option value="rating">Highest Rated</option>
                  <option value="duration">Duration</option>
                </select>
              </div>

              {/* Quick Stats */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                <div className="text-sm text-slate-600 space-y-2">
                  <div className="flex justify-between">
                    <span>Total Courses:</span>
                    <span className="font-semibold text-slate-900">{courses?.length || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Students:</span>
                    <span className="font-semibold text-slate-900">2,847</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Certificates Issued:</span>
                    <span className="font-semibold text-slate-900">1,523</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Course Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">
                {filteredCourses?.length || 0} Courses Available
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredCourses.map((course) => (
                <Link
                  key={course.id}
                  href={`/courses/${course.slug}`}
                  className="group bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl transition-all"
                >
                  {/* Course Thumbnail */}
                  <div className="relative h-48 bg-gradient-to-br from-red-100 to-blue-100 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-white/90 flex items-center justify-center">
                        <BookOpen size={32} className="text-red-600" />
                      </div>
                      <div className="text-sm font-semibold text-slate-700 bg-white/90 px-3 py-1 rounded-full inline-block capitalize">
                        {course.category}
                      </div>
                    </div>
                    {course.trending && (
                      <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                        <TrendingUp size={12} />
                        Trending
                      </div>
                    )}
                  </div>

                  {/* Course Info */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded capitalize">
                        {course.level}
                      </span>
                      {course.certified && (
                        <span className="text-xs font-semibold text-brandPrimary bg-blue-50 px-2 py-1 rounded flex items-center gap-1">
                          <Award size={12} />
                          Certified
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-red-600 transition-colors">
                      {course.title}
                    </h3>
                    
                    <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                      {course.description}
                    </p>

                    {/* Course Meta */}
                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        {course.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users size={14} />
                        {course.total_students}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star size={14} className="fill-yellow-400 text-yellow-400" />
                        {course.rating}
                      </div>
                    </div>

                    {/* Funding Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {course.funding_programs?.map((fund) => (
                        <span
                          key={fund}
                          className="text-xs font-semibold text-brandPrimary bg-blue-50 px-2 py-1 rounded"
                        >
                          {fund}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-green-600">
                        100% Funded
                      </span>
                      <span className="text-sm font-semibold text-red-600 group-hover:gap-2 flex items-center gap-1 transition-all">
                        Enroll Now
                        <ArrowRight size={16} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
                  <Search size={32} className="text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No courses found</h3>
                <p className="text-slate-600 mb-6">Try adjusting your filters or search query</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedLevel('all');
                  }}
                  className="text-red-600 font-semibold hover:text-red-700"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Learning Paths */}
      <section className="bg-white py-16 border-t border-slate-200">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Featured Learning Paths</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {learningPaths.map((path, index) => (
              <div key={index} className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-6 border border-slate-200">
                <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center mb-4">
                  <path.icon size={24} className="text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{path.title}</h3>
                <p className="text-slate-600 mb-4">{path.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">{path.courses} courses</span>
                  <Link href={path.link} className="text-red-600 font-semibold hover:text-red-700 flex items-center gap-1">
                    Explore
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

const learningPaths = [
  {
    title: 'Healthcare Career Path',
    description: 'Start as a CNA, advance to Medical Assistant, then pursue nursing or specialized roles.',
    courses: 5,
    icon: Users,
    link: '/learning-paths/healthcare',
  },
  {
    title: 'Skilled Trades Path',
    description: 'Master HVAC, electrical, or plumbing. Build a career in high-demand trades.',
    courses: 6,
    icon: Award,
    link: '/learning-paths/trades',
  },
  {
    title: 'Business & Technology',
    description: 'Develop digital skills, tax preparation, and business administration expertise.',
    courses: 4,
    icon: TrendingUp,
    link: '/learning-paths/business',
  },
];
