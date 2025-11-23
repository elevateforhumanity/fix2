import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wioa Eligibility - Workforce Development Platform | Elevate for Humanity",
  description: "Elevate for Humanity connects job seekers with free career training and employers with skilled talent.",
  keywords: ["workforce development", "career training", "job placement", "WIOA"],
  openGraph: {
    title: "Wioa Eligibility - Workforce Development Platform | Elevate for Humanity",
    description: "Elevate for Humanity connects job seekers with free career training and employers with skilled talent.",
    images: ["/images/hero-banner-new.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wioa Eligibility - Workforce Development Platform | Elevate for Humanity",
    description: "Elevate for Humanity connects job seekers with free career training and employers with skilled talent.",
    images: ["/images/hero-banner-new.png"],
  },
};



export default function WIOAEligibilityPage() {
  const eligibilityCriteria = [
    {
      category: 'Adults (18+)',
      requirements: [
        'U.S. citizen or authorized to work in the U.S.',
        'Registered with Selective Service (if applicable)',
        'Low income OR receiving public assistance OR basic skills deficient',
        'Unemployed, underemployed, or facing barriers to employment',
      ],
    },
    {
      category: 'Dislocated Workers',
      requirements: [
        'Lost job due to layoff, plant closure, or company downsizing',
        'Unlikely to return to previous occupation',
        'Eligible for or exhausted unemployment benefits',
        'Self-employed but now unemployed due to economic conditions',
      ],
    },
    {
      category: 'Youth (16-24)',
      requirements: [
        'Low income',
        'One or more barriers: basic skills deficient, homeless, foster care, pregnant/parenting, offender, or requires additional assistance',
        'Attending school or out of school',
      ],
    },
  ];

  const incomeLimits = [
    { familySize: 1, limit: '$15,060' },
    { familySize: 2, limit: '$20,440' },
    { familySize: 3, limit: '$25,820' },
    { familySize: 4, limit: '$31,200' },
    { familySize: 5, limit: '$36,580' },
    { familySize: 6, limit: '$41,960' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-green-50 to-white">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="success" className="mb-4">WIOA Eligibility</Badge>
            <h1 className="text-5xl font-bold text-slate-900 mb-6">
              Am I Eligible for WIOA?
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              Find out if you qualify for free workforce training through the Workforce Innovation and Opportunity Act
            </p>
            <Button size="lg" variant="primary">
              Check Your Eligibility
            </Button>
          </div>
        </section>

        {/* What is WIOA */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">What is WIOA?</h2>
            <div className="prose prose-lg max-w-none text-slate-600">
              <p>
                The Workforce Innovation and Opportunity Act (WIOA) is a federal program that provides funding for job training and education to help Americans find good jobs and build careers. WIOA is administered by the U.S. Department of Labor and implemented at the state and local level.
              </p>
              <p>
                If you're eligible, WIOA can cover the full cost of training programs, including tuition, books, supplies, and support services like transportation and childcare.
              </p>
            </div>
          </div>
        </section>

        {/* Eligibility Criteria */}
        <section className="py-20 px-4 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Eligibility Requirements</h2>
              <p className="text-xl text-slate-600">
                WIOA serves three main populations
              </p>
            </div>
            <div className="grid lg:grid-cols-3 gap-8">
              {eligibilityCriteria.map((group) => (
                <Card key={group.category}>
                  <CardHeader>
                    <CardTitle>{group.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {group.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-slate-700">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Income Limits */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Income Guidelines</h2>
            <p className="text-lg text-slate-600 mb-8">
              For adults and youth, "low income" is defined as income at or below the poverty line. Here are the 2024 federal poverty guidelines:
            </p>
            <Card>
              <CardContent className="p-0">
                <table className="w-full">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                        Family Size
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                        Annual Income Limit
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {incomeLimits.map((row) => (
                      <tr key={row.familySize}>
                        <td className="px-6 py-4 text-slate-900">{row.familySize}</td>
                        <td className="px-6 py-4 text-slate-900 font-semibold">{row.limit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
            <p className="text-sm text-slate-500 mt-4">
              * Add $5,380 for each additional family member
            </p>
          </div>
        </section>

        {/* Documentation */}
        <section className="py-20 px-4 bg-slate-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Required Documentation</h2>
            <p className="text-lg text-slate-600 mb-8">
              To apply for WIOA, you'll need to provide:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-slate-900 mb-4">Identity & Eligibility</h3>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      Driver's license or state ID
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      Social Security card
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      Proof of citizenship or work authorization
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      Selective Service registration (males 18-25)
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-slate-900 mb-4">Income & Employment</h3>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      Recent pay stubs or tax returns
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      Unemployment benefits documentation
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      Public assistance records (if applicable)
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      Layoff notice (dislocated workers)
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-slate-900 mb-12">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-2">
                        What if I'm not sure if I qualify?
                      </h3>
                      <p className="text-slate-600">
                        Apply anyway! Our eligibility specialists will review your situation and help determine if you qualify. There are many pathways to eligibility.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-2">
                        How long does the application process take?
                      </h3>
                      <p className="text-slate-600">
                        Most applications are processed within 2-3 weeks. Once approved, you can start training right away.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-2">
                        Can I work while in training?
                      </h3>
                      <p className="text-slate-600">
                        Yes! Many of our students work part-time while completing their training. We offer flexible schedules to accommodate your needs.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-green-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8 text-green-100">
              Check your eligibility and start your journey to a better career today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Apply Now
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-green-700">
                Contact Us
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
