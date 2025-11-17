import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  FileText,
  Users,
  Briefcase,
  TrendingUp,
  CheckCircle,
  Target,
} from 'lucide-react';

export default function CareerServicesPage() {
  const services = [
    {
      icon: FileText,
      title: 'Resume & Cover Letter',
      description: 'Professional resume writing and cover letter assistance',
      features: [
        'One-on-one consultations',
        'Industry-specific templates',
        'ATS optimization',
        'Unlimited revisions',
      ],
    },
    {
      icon: Users,
      title: 'Interview Preparation',
      description: 'Mock interviews and coaching to boost your confidence',
      features: [
        'Practice interviews',
        'Feedback and tips',
        'Common questions prep',
        'Virtual and in-person options',
      ],
    },
    {
      icon: Briefcase,
      title: 'Job Search Support',
      description: 'Guidance and resources for your job search',
      features: [
        'Job board access',
        'Application tracking',
        'Networking strategies',
        'Company research',
      ],
    },
    {
      icon: TrendingUp,
      title: 'Career Counseling',
      description: 'Personalized guidance for your career path',
      features: [
        'Career assessments',
        'Goal setting',
        'Skills evaluation',
        'Industry insights',
      ],
    },
  ];

  const placementStats = [
    { label: 'Job Placement Rate', value: '85%' },
    { label: 'Average Starting Salary', value: '$45,000' },
    { label: 'Employer Partners', value: '50+' },
    { label: 'Jobs Posted Monthly', value: '200+' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="primary" className="mb-4">
              Career Services
            </Badge>
            <h1 className="text-5xl font-bold text-slate-900 mb-6">
              We Don't Just Train You—We Help You Get Hired
            </h1>
            <p className="text-xl text-slate-600">
              Comprehensive career support from training through job placement
              and beyond
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Our Services
              </h2>
              <p className="text-xl text-slate-600">
                Everything you need to land your dream job
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <Card key={service.title}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-slate-900 mb-2">
                            {service.title}
                          </h3>
                          <p className="text-slate-600 mb-4">
                            {service.description}
                          </p>
                          <ul className="space-y-2">
                            {service.features.map((feature) => (
                              <li
                                key={feature}
                                className="flex items-start gap-2"
                              >
                                <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-slate-700">
                                  {feature}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Placement Stats */}
        <section className="py-20 px-4 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Our Track Record
              </h2>
              <p className="text-xl text-slate-600">
                Proven results in job placement and career advancement
              </p>
            </div>
            <div className="grid md:grid-cols-4 gap-8">
              {placementStats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-5xl font-bold text-blue-600 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-slate-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                How We Help You Get Hired
              </h2>
              <p className="text-xl text-slate-600">
                A proven process from training to employment
              </p>
            </div>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    Career Assessment
                  </h3>
                  <p className="text-slate-600">
                    We start by understanding your goals, skills, and interests
                    to create a personalized career plan.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    Skills Development
                  </h3>
                  <p className="text-slate-600">
                    Complete your training program while building job search
                    skills through workshops and one-on-one coaching.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    Job Search Launch
                  </h3>
                  <p className="text-slate-600">
                    We help you create a strong resume, practice interviews, and
                    connect with employers actively hiring.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    Placement & Follow-Up
                  </h3>
                  <p className="text-slate-600">
                    We support you through the application and interview
                    process, and check in after you're hired to ensure your
                    success.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Employer Connections */}
        <section className="py-20 px-4 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="primary" className="mb-4">
                  Employer Network
                </Badge>
                <h2 className="text-4xl font-bold text-slate-900 mb-6">
                  Direct Connections to Hiring Companies
                </h2>
                <p className="text-lg text-slate-600 mb-6">
                  We've built strong relationships with 50+ employers across
                  Wisconsin who actively recruit our graduates.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Target className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-slate-900">
                        Exclusive Job Postings
                      </div>
                      <div className="text-slate-600">
                        Access jobs posted only to our students
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Target className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-slate-900">
                        On-Campus Interviews
                      </div>
                      <div className="text-slate-600">
                        Meet employers at our regular hiring events
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Target className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-slate-900">
                        Direct Referrals
                      </div>
                      <div className="text-slate-600">
                        We recommend top students directly to employers
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">
                    Featured Employers
                  </h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center p-4 bg-slate-50 rounded-lg">
                      <div className="font-semibold text-slate-900">
                        Healthcare
                      </div>
                      <div className="text-sm text-slate-600 mt-1">
                        15+ hospitals & clinics
                      </div>
                    </div>
                    <div className="text-center p-4 bg-slate-50 rounded-lg">
                      <div className="font-semibold text-slate-900">
                        Manufacturing
                      </div>
                      <div className="text-sm text-slate-600 mt-1">
                        20+ companies
                      </div>
                    </div>
                    <div className="text-center p-4 bg-slate-50 rounded-lg">
                      <div className="font-semibold text-slate-900">
                        Technology
                      </div>
                      <div className="text-sm text-slate-600 mt-1">
                        10+ tech firms
                      </div>
                    </div>
                    <div className="text-center p-4 bg-slate-50 rounded-lg">
                      <div className="font-semibold text-slate-900">Trades</div>
                      <div className="text-sm text-slate-600 mt-1">
                        25+ contractors
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-blue-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <Briefcase className="h-16 w-16 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-6">
              Ready to Launch Your Career?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Get the training and support you need to land a great job
            </p>
            <a
              href="/apply"
              className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition text-lg"
            >
              Start Your Application
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
