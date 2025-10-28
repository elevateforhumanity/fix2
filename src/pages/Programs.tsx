import { useState, useEffect } from 'react';
import { Building, Clock, Users, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { addBreadcrumbSchema } from '../utils/addCourseSchema';

export default function Programs() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Add breadcrumb schema for SEO
  useEffect(() => {
    addBreadcrumbSchema([
      { name: 'Home', url: 'https://elevateforhumanity.org/' },
      {
        name: 'Programs',
        url: 'https://elevateforhumanity.org/programs',
      },
    ]);
  }, []);

  const programCategories = [
    { id: 'all', name: 'All Programs', count: 50 },
    { id: 'wio', name: 'WIO (Workforce Innovation)', count: 12 },
    { id: 'wex', name: 'WEX (Work Experience)', count: 8 },
    { id: 'wrg', name: 'WRG (Workforce Readiness)', count: 15 },
    { id: 'ojt', name: 'OJT (On-the-Job Training)', count: 10 },
    { id: 'etpl', name: 'ETPL (Eligible Training Provider)', count: 5 },
  ];

  const featuredPrograms = [
    {
      id: 'ai-fundamentals',
      title: 'AI Fundamentals & Machine Learning',
      category: 'wio',
      duration: '12 weeks',
      cost: '$1,997',
      participants: 24,
      description:
        'Master artificial intelligence and machine learning foundations with hands-on projects and industry certifications.',
      features: [
        'Python Programming',
        'TensorFlow & PyTorch',
        'Data Science',
        'Neural Networks',
        'Real-world Projects',
      ],
      certifications: ['CompTIA AI+', 'Google Cloud ML', 'Microsoft Azure AI'],
      jobPlacementRate: 89,
      averageSalary: '$75,000',
      federalFunding: true,
      image: '/api/placeholder/400/200',
    },
    {
      id: 'data-science-bootcamp',
      title: 'Data Science & Analytics Bootcamp',
      category: 'wex',
      duration: '16 weeks',
      cost: '$4,950',
      participants: 18,
      description:
        'Comprehensive data science training covering statistics, machine learning, and big data technologies.',
      features: [
        'Statistical Analysis',
        'Python & R',
        'SQL & Databases',
        'Machine Learning',
        'Data Visualization',
      ],
      certifications: [
        'IBM Data Science',
        'Microsoft Azure Data Scientist',
        'Tableau Certified',
      ],
      jobPlacementRate: 92,
      averageSalary: '$85,000',
      federalFunding: true,
      image: '/api/placeholder/400/200',
    },
    {
      id: 'cybersecurity-specialist',
      title: 'Cybersecurity Specialist Certification',
      category: 'wrg',
      duration: '20 weeks',
      cost: '$3,495',
      participants: 20,
      description:
        'Intensive cybersecurity training covering network security, ethical hacking, and compliance frameworks.',
      features: [
        'Network Security',
        'Ethical Hacking',
        'Risk Assessment',
        'Incident Response',
        'Compliance',
      ],
      certifications: [
        'CompTIA Security+',
        'Certified Ethical Hacker',
        'CISSP',
      ],
      jobPlacementRate: 95,
      averageSalary: '$95,000',
      federalFunding: true,
      image: '/api/placeholder/400/200',
    },
    {
      id: 'advanced-manufacturing',
      title: 'Advanced Manufacturing & Automation',
      category: 'ojt',
      duration: '14 weeks',
      cost: '$2,750',
      participants: 16,
      description:
        'Learn cutting-edge manufacturing technologies including robotics, CNC programming, and quality control.',
      features: [
        'CNC Programming',
        'Robotics',
        'Quality Control',
        'Lean Manufacturing',
        'Safety Protocols',
      ],
      certifications: [
        'NIMS Machining',
        'FANUC Robotics',
        'Six Sigma Green Belt',
      ],
      jobPlacementRate: 88,
      averageSalary: '$65,000',
      federalFunding: true,
      image: '/api/placeholder/400/200',
    },
    {
      id: 'healthcare-administration',
      title: 'Healthcare Administration & Management',
      category: 'etpl',
      duration: '18 weeks',
      cost: '$3,200',
      participants: 22,
      description:
        'Comprehensive healthcare administration training covering medical billing, coding, and practice management.',
      features: [
        'Medical Billing',
        'ICD-10 Coding',
        'HIPAA Compliance',
        'Practice Management',
        'Electronic Health Records',
      ],
      certifications: [
        'CPC (Certified Professional Coder)',
        'CMA (Certified Medical Assistant)',
        'RHIA',
      ],
      jobPlacementRate: 90,
      averageSalary: '$55,000',
      federalFunding: true,
      image: '/api/placeholder/400/200',
    },
    {
      id: 'digital-marketing',
      title: 'Digital Marketing & E-commerce',
      category: 'wio',
      duration: '10 weeks',
      cost: '$1,495',
      participants: 28,
      description:
        'Master digital marketing strategies including SEO, social media, PPC advertising, and analytics.',
      features: [
        'SEO & SEM',
        'Social Media Marketing',
        'Google Ads',
        'Analytics',
        'E-commerce Platforms',
      ],
      certifications: [
        'Google Ads Certified',
        'Facebook Blueprint',
        'HubSpot Content Marketing',
      ],
      jobPlacementRate: 85,
      averageSalary: '$50,000',
      federalFunding: true,
      image: '/api/placeholder/400/200',
    },
  ];

  const filteredPrograms =
    selectedCategory === 'all'
      ? featuredPrograms
      : featuredPrograms.filter(
          (program) => program.category === selectedCategory
        );

  return (
    <div className="min-h-screen bg-brand-surface">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-brand-text">
                Elevate Learn2Earn Workforce Programs
              </h1>
              <p className="text-brand-text-muted mt-2">
                Federal DOL/DWD compliant training programs with guaranteed job
                placement support
              </p>
            </div>
            <div className="bg-brand-surface text-brand-success px-4 py-2 rounded-full text-sm font-medium">
              💰 Federal Funding Available
            </div>
          </div>
        </div>
      </div>
      {/* Category Filter */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex space-x-1 overflow-x-auto">
            {programCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-brand-info text-white'
                    : 'bg-brand-surface-dark text-brand-text hover:bg-brand-border'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Programs Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPrograms.map((program) => (
            <Link
              key={program.id}
              to={`/programs/${program.id}`}
              className="group cursor-pointer"
            >
              {/* Course Cover Image */}
              <div className="relative overflow-hidden rounded-lg shadow-md group-hover:shadow-xl transition-all duration-300">
                <div className="aspect-[16/10] bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    <Building className="h-16 w-16 opacity-20" />
                  </div>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/90 backdrop-blur-sm text-brand-info text-xs font-semibold px-3 py-1 rounded-full">
                      {program.category.toUpperCase()}
                    </span>
                  </div>
                  {program.federalFunding && (
                    <div className="absolute top-3 right-3">
                      <span className="bg-green-500/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
                        FREE
                      </span>
                    </div>
                  )}
                </div>
              </div>
              {/* Course Info */}
              <div className="p-4 bg-white">
                <h3 className="font-semibold text-brand-text mb-1 line-clamp-2 group-hover:text-brand-info transition-colors">
                  {program.title}
                </h3>
                <p className="text-sm text-brand-text-muted mb-3 line-clamp-2">
                  {program.description}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-brand-text-muted">
                    <Clock className="h-4 w-4 mr-1" />
                    {program.duration}
                  </div>
                  <div className="flex items-center text-brand-text-muted">
                    <Users className="h-4 w-4 mr-1" />
                    {program.participants}
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-brand-border">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-brand-text-muted">
                      <Award className="h-3 w-3 inline mr-1" />
                      {program.jobPlacementRate}% placement
                    </span>
                    <span className="text-brand-info font-semibold text-sm group-hover:underline">
                      Learn More →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {/* Federal Compliance Notice */}
      <div className="bg-orange-50 border-t-4 border-orange-400 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Award className="h-8 w-8 text-orange-500" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-orange-900">
                100% Federal DOL/DWD Compliance
              </h3>
              <p className="text-orange-700">
                All programs meet federal Elevate Learn2Earn Workforce standards
                with complete eligibility verification, Individual Employment
                Plans (IEP), PIRL reporting, and performance tracking systems.
              </p>
            </div>
            <div className="ml-auto">
              <Link
                to="/compliance"
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
              >
                View Compliance Portal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
