import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, BookOpen, Award, Play } from 'lucide-react';

export default function LMSCourses() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Courses', count: 12 },
    { id: 'technology', name: 'Technology', count: 4 },
    { id: 'healthcare', name: 'Healthcare', count: 3 },
    { id: 'business', name: 'Business', count: 3 },
    { id: 'trades', name: 'Skilled Trades', count: 2 },
  ];

  const courses = [
    {
      id: 'ai-fundamentals',
      title: 'AI Fundamentals & Machine Learning',
      category: 'technology',
      instructor: 'Dr. Sarah Chen',
      duration: '12 weeks',
      lessons: 48,
      students: 1247,
      level: 'Beginner',
      progress: 0,
      enrolled: false,
      coverImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      description:
        'Master AI and machine learning fundamentals with hands-on projects',
    },
    {
      id: 'data-science',
      title: 'Data Science & Analytics Bootcamp',
      category: 'technology',
      instructor: 'Prof. Michael Rodriguez',
      duration: '16 weeks',
      lessons: 64,
      students: 892,
      level: 'Intermediate',
      progress: 0,
      enrolled: false,
      coverImage: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      description:
        'Comprehensive data science training with real-world applications',
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity Specialist Certification',
      category: 'technology',
      instructor: 'James Wilson, CISSP',
      duration: '20 weeks',
      lessons: 80,
      students: 654,
      level: 'Advanced',
      progress: 0,
      enrolled: false,
      coverImage: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      description:
        'Advanced cybersecurity training for enterprise environments',
    },
    {
      id: 'web-development',
      title: 'Full Stack Web Development',
      category: 'technology',
      instructor: 'Emily Zhang',
      duration: '24 weeks',
      lessons: 96,
      students: 2103,
      level: 'Beginner',
      progress: 0,
      enrolled: false,
      coverImage: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      description: 'Build modern web applications from scratch',
    },
    {
      id: 'cna-training',
      title: 'Certified Nursing Assistant (CNA)',
      category: 'healthcare',
      instructor: 'Linda Martinez, RN',
      duration: '8 weeks',
      lessons: 32,
      students: 543,
      level: 'Beginner',
      progress: 0,
      enrolled: false,
      coverImage: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      description: 'Get certified and start your healthcare career',
    },
    {
      id: 'medical-billing',
      title: 'Medical Billing & Coding',
      category: 'healthcare',
      instructor: 'Robert Johnson',
      duration: '12 weeks',
      lessons: 48,
      students: 421,
      level: 'Beginner',
      progress: 0,
      enrolled: false,
      coverImage: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
      description: 'Master medical billing, coding, and insurance claims',
    },
    {
      id: 'pharmacy-tech',
      title: 'Pharmacy Technician Certification',
      category: 'healthcare',
      instructor: 'Dr. Amanda Lee',
      duration: '16 weeks',
      lessons: 56,
      students: 312,
      level: 'Beginner',
      progress: 0,
      enrolled: false,
      coverImage: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      description: 'Prepare for PTCB certification exam',
    },
    {
      id: 'digital-marketing',
      title: 'Digital Marketing Mastery',
      category: 'business',
      instructor: 'David Kim',
      duration: '10 weeks',
      lessons: 40,
      students: 1876,
      level: 'Beginner',
      progress: 0,
      enrolled: false,
      coverImage: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
      description: 'Master SEO, social media, and digital advertising',
    },
    {
      id: 'project-management',
      title: 'Project Management Professional (PMP)',
      category: 'business',
      instructor: 'Susan Taylor, PMP',
      duration: '14 weeks',
      lessons: 56,
      students: 765,
      level: 'Intermediate',
      progress: 0,
      enrolled: false,
      coverImage: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      description: 'Prepare for PMP certification and lead projects',
    },
    {
      id: 'business-analytics',
      title: 'Business Analytics & Intelligence',
      category: 'business',
      instructor: 'Mark Anderson',
      duration: '12 weeks',
      lessons: 48,
      students: 543,
      level: 'Intermediate',
      progress: 0,
      enrolled: false,
      coverImage: 'linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)',
      description: 'Turn data into actionable business insights',
    },
    {
      id: 'welding',
      title: 'Professional Welding (AWS SENSE)',
      category: 'trades',
      instructor: 'Tom Harrison',
      duration: '10 weeks',
      lessons: 40,
      students: 234,
      level: 'Beginner',
      progress: 0,
      enrolled: false,
      coverImage: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
      description:
        'Learn professional welding techniques and get AWS certified',
    },
    {
      id: 'hvac',
      title: 'HVAC Technician Certification',
      category: 'trades',
      instructor: 'Carlos Rivera',
      duration: '16 weeks',
      lessons: 64,
      students: 187,
      level: 'Beginner',
      progress: 0,
      enrolled: false,
      coverImage: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
      description: 'Install, maintain, and repair HVAC systems',
    },
  ];

  const filteredCourses =
    selectedCategory === 'all'
      ? courses
      : courses.filter((course) => course.category === selectedCategory);

  return (
    <div className="min-h-screen bg-brand-surface">
      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-brand-text mb-4">
            Explore Our Courses
          </h1>
          <p className="text-xl text-brand-text-muted max-w-3xl">
            Choose from 100+ industry-recognized certification programs. All
            courses are 100% free with federal funding.
          </p>
        </div>
      </div>
      {/* Category Filter */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-brand-info text-white shadow-md'
                    : 'bg-brand-surface-dark text-brand-text hover:bg-brand-border'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Courses Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <Link
              key={course.id}
              to={`/lms/course/${course.id}`}
              className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Course Cover */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <div
                  className="absolute inset-0"
                  style={{ background: course.coverImage }}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-4">
                    <Play className="h-8 w-8 text-brand-info fill-blue-600" />
                  </div>
                </div>
                {/* Level Badge */}
                <div className="absolute top-3 left-3">
                  <span className="bg-white/90 backdrop-blur-sm text-brand-text text-xs font-semibold px-3 py-1 rounded-full">
                    {course.level}
                  </span>
                </div>
                {/* FREE Badge */}
                <div className="absolute top-3 right-3">
                  <span className="bg-green-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
                    FREE
                  </span>
                </div>
              </div>
              {/* Course Info */}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-brand-info uppercase tracking-wide">
                    {categories.find((c) => c.id === course.category)?.name}
                  </span>
                </div>
                <h3 className="font-semibold text-brand-text mb-2 line-clamp-2 group-hover:text-brand-info transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-brand-text-muted mb-3 line-clamp-2">
                  {course.description}
                </p>
                <div className="flex items-center gap-1 text-xs text-brand-text-light mb-3">
                  <Award className="h-3 w-3" />
                  <span>{course.instructor}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-brand-text-muted pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{course.lessons} lessons</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-brand-text-light mt-2">
                  <Users className="h-3 w-3" />
                  <span>{course.students.toLocaleString()} students</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
