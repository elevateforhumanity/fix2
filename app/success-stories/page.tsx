import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import Image from 'next/image';
import { Quote } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Success Stories - Real People, Real Results",
  description: "Read inspiring stories from graduates who transformed their lives through our career training programs and found meaningful employment.",
  keywords: ["success stories", "graduate testimonials", "career transformation", "job placement", "student success"],
  openGraph: {
    title: "Success Stories - Real People, Real Results | Elevate for Humanity",
    description: "Read inspiring stories from graduates who transformed their lives through our career training programs.",
    images: ["/images/success-new/success-4.jpg"],
    type: "website",
  },
};

export default function SuccessStoriesPage() {
  const stories = [
    {
      id: 1,
      name: 'Marcus J.',
      program: 'Barber Apprenticeship',
      image: '/images/success-new/success-5.jpg',
      quote: 'From incarceration to owning my own chair. Elevate gave me the structure and support I needed. The JRI funding covered everything, and my mentor believed in me when no one else did.',
      outcome: 'Now owns his own chair at a busy barbershop',
      beforeJob: 'Recently Released',
      afterJob: 'Licensed Barber',
    },
    {
      id: 2,
      name: 'Sarah M.',
      program: 'Medical Assistant',
      image: '/images/success-new/success-6.jpg',
      quote: 'Single mom to certified MA in 5 months. Now working at a clinic with benefits for my family. WIOA covered my tuition, childcare, and transportation. I couldn\'t have done it without that support.',
      outcome: 'Earning $38,000/year with full benefits',
      beforeJob: 'Unemployed Single Mom',
      afterJob: 'Certified Medical Assistant',
    },
    {
      id: 3,
      name: 'James T.',
      program: 'HVAC Technician',
      image: '/images/success-new/success-7.jpg',
      quote: 'Went from warehouse work to skilled trades. Making 2x my old salary with room to grow. The DOL apprenticeship let me earn while I learned, and now I\'m on track to start my own HVAC company.',
      outcome: 'Earning $55,000/year, planning to start own business',
      beforeJob: 'Warehouse Worker',
      afterJob: 'HVAC Technician',
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
