import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MapPin, Clock, DollarSign, Briefcase } from 'lucide-react';

export default function CareersPage() {
  const openings = [
    {
      id: 1,
      title: 'Program Coordinator',
      department: 'Operations',
      location: 'Milwaukee, WI',
      type: 'Full-time',
      salary: '$45,000 - $55,000',
      description:
        'Coordinate WIOA training programs and support student success',
    },
    {
      id: 2,
      title: 'Career Counselor',
      department: 'Student Services',
      location: 'Madison, WI',
      type: 'Full-time',
      salary: '$50,000 - $60,000',
      description:
        'Provide career guidance and job placement support to students',
    },
    {
      id: 3,
      title: 'HVAC Instructor',
      department: 'Training',
      location: 'Green Bay, WI',
      type: 'Full-time',
      salary: '$55,000 - $70,000',
      description: 'Teach hands-on HVAC technician training courses',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="primary" className="mb-4">
              Join Our Team
            </Badge>
            <h1 className="text-5xl font-bold text-slate-900 mb-6">
              Careers at Elevate Connects
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
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Why Work With Us
              </h2>
              <p className="text-xl text-slate-600">
                Make a difference while building your career
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">💼</div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    Meaningful Work
                  </h3>
                  <p className="text-slate-600">
                    Help people transform their lives through education and
                    career training
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">🌟</div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    Great Benefits
                  </h3>
                  <p className="text-slate-600">
                    Competitive salary, health insurance, 401(k), and generous
                    PTO
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">📈</div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    Growth Opportunities
                  </h3>
                  <p className="text-slate-600">
                    Professional development, training, and clear career
                    advancement paths
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
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Open Positions
              </h2>
              <p className="text-xl text-slate-600">
                {openings.length} opportunities available
              </p>
            </div>
            <div className="space-y-6">
              {openings.map((job) => (
                <Card
                  key={job.id}
                  className="hover:border-blue-500 transition-colors"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl font-bold text-slate-900">
                            {job.title}
                          </h3>
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
                        <Button variant="primary">Apply Now</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-blue-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <Briefcase className="h-16 w-16 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-6">
              Don't See the Right Role?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              We're always looking for talented people. Send us your resume and
              we'll keep you in mind for future opportunities.
            </p>
            <Button size="lg" variant="secondary">
              Submit General Application
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
