import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Users, TrendingUp, Award, DollarSign, CheckCircle, Briefcase } from 'lucide-react';

export default function EmployersPage() {
  const benefits = [
    {
      icon: Users,
      title: 'Access Qualified Talent',
      description: 'Connect with job-ready candidates who have completed industry-recognized training programs',
    },
    {
      icon: DollarSign,
      title: 'Reduce Hiring Costs',
      description: 'Save on recruitment and training expenses with pre-trained, motivated workers',
    },
    {
      icon: TrendingUp,
      title: 'Fill Critical Positions',
      description: 'Address workforce shortages in high-demand industries like healthcare, trades, and technology',
    },
    {
      icon: Award,
      title: 'Tax Credits Available',
      description: 'Qualify for Work Opportunity Tax Credits (WOTC) when hiring WIOA participants',
    },
  ];

  const services = [
    'Post job openings to our job board',
    'Access resume database of qualified candidates',
    'Participate in job fairs and hiring events',
    'Provide input on curriculum development',
    'Offer internships and apprenticeships',
    'Partner on customized training programs',
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="success" className="mb-4 bg-white text-red-600">For Employers</Badge>
            <h1 className="text-5xl font-bold mb-6">
              Hire Skilled, Job-Ready Workers
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Partner with us to access a pipeline of trained talent ready to contribute to your business
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Post a Job
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-red-700">
                Become a Partner
              </Button>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Why Partner With Us</h2>
              <p className="text-xl text-slate-600">
                Access Wisconsin's premier workforce development program
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <Card key={benefit.title} className="text-center">
                    <CardContent className="p-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                        <Icon className="h-8 w-8 text-red-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-slate-600 text-sm">
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 px-4 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="primary" className="mb-4">Employer Services</Badge>
                <h2 className="text-4xl font-bold text-slate-900 mb-6">
                  Comprehensive Hiring Support
                </h2>
                <p className="text-lg text-slate-600 mb-8">
                  We provide end-to-end support to help you find, hire, and retain qualified workers
                </p>
                <div className="space-y-4">
                  {services.map((service) => (
                    <div key={service} className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{service}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Partner Success Story</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                        <Briefcase className="h-8 w-8 text-red-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">ABC Manufacturing</div>
                        <div className="text-sm text-slate-600">Milwaukee, WI</div>
                      </div>
                    </div>
                    <blockquote className="text-slate-700 italic border-l-4 border-orange-500 pl-4">
                      "We've hired 15 graduates from the HVAC program over the past year. They come to us with hands-on experience and are productive from day one. This partnership has been invaluable for our growth."
                    </blockquote>
                    <div className="pt-4 border-t border-slate-200">
                      <div className="text-sm text-slate-600">Results</div>
                      <div className="font-semibold text-slate-900">15 hires • 95% retention rate • $200K saved in training costs</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Impact</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-8 bg-red-50 rounded-lg">
                <div className="text-5xl font-bold text-red-600 mb-2">50+</div>
                <div className="text-lg text-slate-700">Employer Partners</div>
              </div>
              <div className="text-center p-8 bg-green-50 rounded-lg">
                <div className="text-5xl font-bold text-green-600 mb-2">2,500+</div>
                <div className="text-lg text-slate-700">Graduates Placed</div>
              </div>
              <div className="text-center p-8 bg-orange-50 rounded-lg">
                <div className="text-5xl font-bold text-orange-600 mb-2">85%</div>
                <div className="text-lg text-slate-700">Retention After 1 Year</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-slate-900 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Build Your Workforce?</h2>
            <p className="text-xl mb-8 text-slate-300">
              Connect with qualified candidates and strengthen your team today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
                Post a Job Opening
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-slate-800">
                Schedule a Consultation
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
