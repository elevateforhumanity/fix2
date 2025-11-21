import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import Image from 'next/image';
import { Quote } from 'lucide-react';

export default function SuccessStoriesPage() {
  const stories = [
    {
      id: 1,
      name: 'Maria Rodriguez',
      program: 'CNA Training',
      image: '/media/testimonials/person-1.jpg',
      quote: 'The WIOA program changed my life. I went from unemployed to working as a CNA at a top hospital in just 8 weeks.',
      outcome: 'Now earning $42,000/year with full benefits',
      beforeJob: 'Unemployed',
      afterJob: 'Certified Nursing Assistant',
    },
    {
      id: 2,
      name: 'James Thompson',
      program: 'HVAC Technician',
      image: '/media/testimonials/person-2.jpg',
      quote: 'I never thought I could afford training. WIOA covered everything and now I have a career I love.',
      outcome: 'Started own HVAC business after 2 years',
      beforeJob: 'Retail Worker',
      afterJob: 'HVAC Business Owner',
    },
    {
      id: 3,
      name: 'Sarah Chen',
      program: 'Web Development',
      image: '/media/testimonials/person-3.jpg',
      quote: 'The instructors were amazing and the job placement support helped me land my dream job.',
      outcome: 'Hired as Junior Developer at tech startup',
      beforeJob: 'Restaurant Server',
      afterJob: 'Software Developer',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="primary" className="mb-4">Success Stories</Badge>
            <h1 className="text-5xl font-bold text-slate-900 mb-6">
              Real People, Real Results
            </h1>
            <p className="text-xl text-slate-600">
              See how WIOA-funded training has transformed lives and careers across Indiana
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">2,500+</div>
                <div className="text-slate-600">Students Trained</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">85%</div>
                <div className="text-slate-600">Job Placement Rate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">$45K</div>
                <div className="text-slate-600">Average Starting Salary</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">50+</div>
                <div className="text-slate-600">Employer Partners</div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-20 px-4 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="space-y-12">
              {stories.map((story, index) => (
                <Card key={story.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className={`grid md:grid-cols-2 gap-8 ${index % 2 === 1 ? 'md:grid-flow-dense' : ''}`}>
                      <div className={`relative h-96 ${index % 2 === 1 ? 'md:col-start-2' : ''}`}>
                        <Image
                          src={story.image}
                          alt={story.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-8 flex flex-col justify-center">
                        <Badge variant="primary" className="w-fit mb-4">{story.program}</Badge>
                        <Quote className="h-8 w-8 text-red-600 mb-4" />
                        <blockquote className="text-xl text-slate-700 mb-6 italic">
                          "{story.quote}"
                        </blockquote>
                        <div className="space-y-3">
                          <div>
                            <div className="text-sm text-slate-500">Student</div>
                            <div className="text-lg font-semibold text-slate-900">{story.name}</div>
                          </div>
                          <div className="flex gap-4">
                            <div>
                              <div className="text-sm text-slate-500">Before</div>
                              <div className="font-medium text-slate-900">{story.beforeJob}</div>
                            </div>
                            <div className="text-2xl text-slate-300">→</div>
                            <div>
                              <div className="text-sm text-slate-500">After</div>
                              <div className="font-medium text-red-600">{story.afterJob}</div>
                            </div>
                          </div>
                          <div className="pt-4 border-t border-slate-200">
                            <div className="text-sm font-semibold text-green-600">{story.outcome}</div>
                          </div>
                        </div>
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
            <h2 className="text-4xl font-bold mb-6">Ready to Write Your Success Story?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of Indiana residents who have transformed their careers through WIOA-funded training
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/apply"
                className="px-8 py-4 bg-white text-red-600 rounded-lg font-semibold hover:bg-red-50 transition"
              >
                Check Your Eligibility
              </a>
              <a
                href="/programs"
                className="px-8 py-4 bg-red-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition"
              >
                Browse Programs
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
