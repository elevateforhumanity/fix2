import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { DollarSign, CheckCircle, Book, Home, Baby, Bus } from 'lucide-react';

export default function FinancialAidPage() {
  const fundingOptions = [
    {
      icon: DollarSign,
      title: 'WIOA Funding',
      description: 'Full tuition coverage for eligible participants',
      coverage: [
        'Tuition & fees',
        'Books & supplies',
        'Certification exams',
        'Support services',
      ],
    },
    {
      icon: Book,
      title: 'Pell Grants',
      description: 'Federal grants for low-income students',
      coverage: [
        'Up to $7,395/year',
        'No repayment required',
        'Based on financial need',
        'Apply via FAFSA',
      ],
    },
    {
      icon: Home,
      title: 'State Grants',
      description: 'Wisconsin-specific financial aid programs',
      coverage: [
        'Wisconsin Grant',
        'Talent Incentive Program',
        'Indian Student Assistance',
        'Minority Retention Grant',
      ],
    },
  ];

  const supportServices = [
    {
      icon: Bus,
      title: 'Transportation',
      description: 'Gas cards, bus passes, or mileage reimbursement',
    },
    {
      icon: Baby,
      title: 'Childcare',
      description: 'Assistance with childcare costs during training',
    },
    {
      icon: Book,
      title: 'Books & Supplies',
      description: 'Coverage for required course materials',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-green-50 to-white">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="success" className="mb-4">
              Financial Aid
            </Badge>
            <h1 className="text-5xl font-bold text-slate-900 mb-6">
              Training at No Cost to You
            </h1>
            <p className="text-xl text-slate-600">
              Multiple funding options available to cover your training expenses
            </p>
          </div>
        </section>

        {/* Funding Options */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Funding Options
              </h2>
              <p className="text-xl text-slate-600">
                We'll help you find the right funding for your situation
              </p>
            </div>
            <div className="grid lg:grid-cols-3 gap-8">
              {fundingOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <Card key={option.title}>
                    <CardContent className="p-6">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                        <Icon className="h-6 w-6 text-green-600" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">
                        {option.title}
                      </h3>
                      <p className="text-slate-600 mb-4">
                        {option.description}
                      </p>
                      <div className="space-y-2">
                        {option.coverage.map((item) => (
                          <div key={item} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-slate-700">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Support Services */}
        <section className="py-20 px-4 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Support Services
              </h2>
              <p className="text-xl text-slate-600">
                Additional assistance to help you succeed
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {supportServices.map((service) => {
                const Icon = service.icon;
                return (
                  <Card key={service.title}>
                    <CardContent className="p-6 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                        <Icon className="h-8 w-8 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">
                        {service.title}
                      </h3>
                      <p className="text-slate-600">{service.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* How to Apply */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">
              How to Apply for Financial Aid
            </h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    Complete WIOA Application
                  </h3>
                  <p className="text-slate-600">
                    Fill out our online application to determine your
                    eligibility for WIOA funding. This is the primary funding
                    source for most students.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    Submit FAFSA (Optional)
                  </h3>
                  <p className="text-slate-600">
                    If you're interested in Pell Grants or other federal aid,
                    complete the Free Application for Federal Student Aid
                    (FAFSA) at fafsa.gov.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    Meet with Financial Aid Advisor
                  </h3>
                  <p className="text-slate-600">
                    Our advisors will review your options and help you maximize
                    your funding. We'll create a personalized financial aid
                    package.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    Start Training
                  </h3>
                  <p className="text-slate-600">
                    Once your funding is approved, you can begin your training
                    program immediately. All costs are covered upfront.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-green-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <DollarSign className="h-16 w-16 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-6">
              Don't Let Cost Hold You Back
            </h2>
            <p className="text-xl mb-8 text-green-100">
              With WIOA and other funding options, you can get the training you
              need at no cost
            </p>
            <a
              href="/apply"
              className="inline-block px-8 py-4 bg-white text-green-600 rounded-lg font-semibold hover:bg-green-50 transition text-lg"
            >
              Apply for Funding
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
