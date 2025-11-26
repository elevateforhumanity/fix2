'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import {
  GraduationCap,
  Users,
  Scale,
  Building,
  Award,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

const programs = [
  {
    code: 'wrg',
    title: 'Workforce Ready Grant (WRG)',
    description: 'Free training for Indiana residents in high-demand careers',
    icon: GraduationCap,
    color: 'bg-red-500',
    eligibility: ['Indiana resident', 'Age 18+', 'High school diploma or GED'],
    benefits: [
      '100% tuition covered',
      'No out-of-pocket costs',
      'Fast-track training',
    ],
  },
  {
    code: 'wioa',
    title: 'WorkOne / WIOA',
    description:
      'Workforce Innovation and Opportunity Act funding for eligible adults',
    icon: Users,
    color: 'bg-green-500',
    eligibility: [
      'Low income or unemployed',
      'Dislocated worker',
      'Youth (16-24)',
    ],
    benefits: [
      'Training assistance',
      'Career counseling',
      'Job placement support',
    ],
  },
  {
    code: 'jri',
    title: 'Justice Reinvestment Initiative (JRI)',
    description:
      'Training for justice-involved individuals reentering the workforce',
    icon: Scale,
    color: 'bg-purple-500',
    eligibility: [
      'Currently on probation/parole',
      'Referred by PO',
      'Committed to reentry',
    ],
    benefits: [
      'Second chance training',
      'Supportive services',
      'Job readiness',
    ],
  },
  {
    code: 'employindy',
    title: 'EmployIndy',
    description: 'Marion County workforce development programs',
    icon: Building,
    color: 'bg-orange-500',
    eligibility: [
      'Marion County resident',
      'Age 16+',
      'Eligible for specific tracks',
    ],
    benefits: ['Local support', 'Youth programs', 'Apprenticeship tracks'],
  },
  {
    code: 'dol',
    title: 'DOL Apprenticeship',
    description: 'Department of Labor Registered Apprenticeship programs',
    icon: Award,
    color: 'bg-red-500',
    eligibility: [
      'Employer sponsor',
      'Age 16+',
      'Meets occupation requirements',
    ],
    benefits: [
      'Earn while you learn',
      'Industry certification',
      'Career pathway',
    ],
  },
];

export default function EnrollIndexPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-purple-600 to-pink-500 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center text-primary font-bold text-4xl mx-auto mb-6 shadow-xl">
            E
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Choose Your Funding Program
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Select the program that matches your eligibility to start your
            enrollment journey
          </p>
        </div>
        {/* Programs Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {programs.map((program) => {
            const Icon = program.icon;
            return (
              <Card
                key={program.code}
                className="hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group"
                onClick={() => router.push(`/enroll/${program.code}`)}
              >
                <CardHeader>
                  <div
                    className={`w-14 h-14 ${program.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-2">
                    {program.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {program.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Eligibility */}
                  <div>
                    <h4 className="font-semibold text-sm mb-2 text-muted-foreground">
                      Eligibility:
                    </h4>
                    <ul className="space-y-1">
                      {program.eligibility.map((item, idx) => (
                        <li
                          key={idx}
                          className="text-sm flex items-start gap-2"
                        >
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Benefits */}
                  <div>
                    <h4 className="font-semibold text-sm mb-2 text-muted-foreground">
                      Benefits:
                    </h4>
                    <ul className="space-y-1">
                      {program.benefits.map((item, idx) => (
                        <li
                          key={idx}
                          className="text-sm flex items-start gap-2"
                        >
                          <CheckCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Apply Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
        {/* Help Section */}
        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          <Card className="bg-white/95 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Not Sure Which Program?
              </CardTitle>
              <CardDescription>
                Our enrollment specialists can help you find the right funding
                option for your situation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full"
                variant="outline"
                onClick={() => router.push('/contact')}
              >
                Contact Us for Guidance
              </Button>
            </CardContent>
          </Card>
          <Card className="bg-white/95 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Explore Training Programs
              </CardTitle>
              <CardDescription>
                View all available training programs before choosing your
                funding source
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full"
                variant="outline"
                onClick={() => router.push('/programs')}
              >
                View All Programs
              </Button>
            </CardContent>
          </Card>
        </div>
        {/* Info Banner */}
        <div className="mt-12 max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-red-500 to-purple-500 text-white border-0">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">
                  Ready to Transform Your Career?
                </h3>
                <p className="text-blue-100 mb-4">
                  Join thousands of students who have successfully completed our
                  training programs
                </p>
                <div className="flex flex-wrap justify-center gap-8 text-center">
                  <div>
                    <div className="text-3xl font-bold">5,000+</div>
                    <div className="text-sm text-blue-100">
                      Students Trained
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">85%</div>
                    <div className="text-sm text-blue-100">
                      Job Placement Rate
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">50+</div>
                    <div className="text-sm text-blue-100">
                      Partner Employers
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
