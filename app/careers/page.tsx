import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MapPin, Clock, DollarSign, Briefcase, Heart, Users, TrendingUp } from 'lucide-react';

export const metadata = {
  title: 'Careers at Elevate for Humanity | Join Our Team',
  description: 'Join our mission to transform lives through workforce development. Open positions in 7009 E 56th St Ste F, Indianapolis, IN 46226.',
};

export default function CareersPage() {
  const openings = [
    {
      id: 1,
      title: 'Program Coordinator',
      department: 'Operations',
      location: 'Indianapolis, IN (Marion County)',
      type: 'Full-time',
      salary: '$45,000 - $55,000',
      description: 'Coordinate WIOA, WRG, and JRI training programs. Support student success from enrollment through job placement. Work directly with case managers, training partners, and employers.',
      responsibilities: [
        'Manage student enrollment and WIOA/WRG paperwork',
        'Track student progress and attendance',
        'Coordinate with training partners and employers',
        'Maintain compliance with state and federal requirements',
        'Provide case management support to students',
      ],
      qualifications: [
        'Bachelor\'s degree or 3+ years workforce development experience',
        'Knowledge of WIOA, WRG, or workforce funding programs',
        'Strong organizational and communication skills',
        'Experience working with diverse populations',
        'Proficiency in Microsoft Office and database systems',
      ],
    },
    {
      id: 2,
      title: 'Career Counselor / Job Developer',
      department: 'Student Services',
      location: 'Indianapolis, IN (Marion County)',
      type: 'Full-time',
      salary: '$48,000 - $58,000',
      description: 'Provide career guidance, job placement support, and employer outreach. Help students transition from training to employment. Build relationships with employers actively hiring.',
      responsibilities: [
        'Conduct career assessments and develop employment plans',
        'Provide resume writing and interview coaching',
        'Connect students with job opportunities',
        'Build and maintain employer partnerships',
        'Track job placement outcomes and follow-up',
      ],
      qualifications: [
        'Bachelor\'s degree in counseling, social work, or related field',
        'Experience in career counseling or job development',
        'Knowledge of local labor market and employers',
        'Strong networking and relationship-building skills',
        'Experience with re-entry or second-chance populations preferred',
      ],
    },
    {
      id: 3,
      title: 'HVAC Instructor',
      department: 'Training',
      location: 'Indianapolis, IN (Marion County)',
      type: 'Full-time or Part-time',
      salary: '$55,000 - $70,000 (Full-time)',
      description: 'Teach hands-on HVAC technician training courses. Provide lab instruction, safety training, and EPA certification prep. Work with students from diverse backgrounds including re-entry participants.',
      responsibilities: [
        'Deliver HVAC curriculum including theory and hands-on labs',
        'Prepare students for EPA 608 certification',
        'Teach residential and commercial HVAC systems',
        'Assess student progress and provide feedback',
        'Maintain safe and organized training environment',
      ],
      qualifications: [
        'EPA 608 Universal certification required',
        '5+ years HVAC field experience',
        'Teaching or training experience preferred',
        'Strong communication and patience',
        'Ability to work with adult learners and diverse populations',
      ],
    },
    {
      id: 4,
      title: 'Case Manager',
      department: 'Student Services',
      location: 'Indianapolis, IN (Marion County)',
      type: 'Full-time',
      salary: '$42,000 - $52,000',
      description: 'Provide wraparound support services to students. Help remove barriers to training completion. Connect students to resources for transportation, childcare, housing, and mental health.',
      responsibilities: [
        'Conduct intake assessments and identify barriers',
        'Develop individualized support plans',
        'Connect students to community resources',
        'Monitor student progress and attendance',
        'Provide crisis intervention and problem-solving',
      ],
      qualifications: [
        'Bachelor\'s degree in social work or related field',
        'Experience with case management or social services',
        'Knowledge of community resources in Marion County',
        'Strong empathy and cultural competency',
        'Experience with trauma-informed care preferred',
      ],
    },
    {
      id: 5,
      title: 'Barber Instructor / Apprenticeship Coordinator',
      department: 'Training',
      location: 'Indianapolis, IN (Marion County)',
      type: 'Part-time',
      salary: '$30 - $45/hour',
      description: 'Coordinate barber apprenticeship program. Teach Milady curriculum, oversee shop placements, and prepare students for Indiana State Board exam. Work with partner barbershops.',
      responsibilities: [
        'Deliver Milady Standard Barbering curriculum',
        'Coordinate apprentice placements in partner shops',
        'Track apprenticeship hours and competencies',
        'Prepare students for state board licensing exam',
        'Maintain relationships with barbershop partners',
      ],
      qualifications: [
        'Indiana Master Barber license required',
        '5+ years barbering experience',
        'Teaching or mentoring experience',
        'Knowledge of Indiana barber licensing requirements',
        'Passion for helping re-entry and career-change students',
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="primary" className="mb-4">Join Our Team</Badge>
            <h1 className="text-5xl font-bold text-slate-900 mb-6">
              Careers at Elevate for Humanity
            </h1>
            <p className="text-xl text-slate-600">
              Help transform lives through workforce development and education
            </p>
          </div>
        </section>

        {/* Why Work Here */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Why Work With Us</h2>
              <p className="text-xl text-slate-600">
                Make a difference while building your career
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">💼</div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">Meaningful Work</h3>
                  <p className="text-slate-600">
                    Help people transform their lives through education and career training
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">🌟</div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">Great Benefits</h3>
                  <p className="text-slate-600">
                    Competitive salary, health insurance, 401(k), and generous PTO
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">📈</div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">Growth Opportunities</h3>
                  <p className="text-slate-600">
                    Professional development, training, and clear career advancement paths
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-20 px-4 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Open Positions</h2>
              <p className="text-xl text-slate-600">
                {openings.length} opportunities available
              </p>
            </div>
            <div className="space-y-6">
              {openings.map((job) => (
                <Card key={job.id} className="hover:border-orange-500 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl font-bold text-slate-900">{job.title}</h3>
                          <Badge variant="primary">{job.department}</Badge>
                        </div>
                        <p className="text-slate-600 mb-4">{job.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            {job.type}
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4" />
                            {job.salary}
                          </div>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <Button variant="primary">
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-red-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <Briefcase className="h-16 w-16 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-6">Don't See the Right Role?</h2>
            <p className="text-xl mb-8 text-blue-100">
              We're always looking for talented people. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <Button size="lg" variant="secondary">
              Submit General Application
            </Button>
          </div>
        </section>
    </main>
  );
}
