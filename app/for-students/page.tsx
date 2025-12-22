import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, DollarSign, Clock, ArrowRight } from 'lucide-react';
import { EligibilityChecker } from '@/components/for-you/EligibilityChecker';
import { JourneyChecklist } from '@/components/for-you/JourneyChecklist';
import {
  Container,
  Section,
  Button,
  Card,
} from '@/components/ui/design-system';

export const metadata: Metadata = {
  title: 'Free Job Training | No Debt | Indiana Residents',
  description:
    'Free job training for Indiana residents. $0 tuition. Real careers. Start in 2-4 weeks. WIOA funded.',
};

export default function ForStudentsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* 1. Hero - Problem + Anxiety Reduction */}
      <Section
        variant="blue"
        className="relative h-[400px] flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 text-white"
        noPadding
      >
        <Container size="lg">
          <div className="text-center">
            <h1 className="text-display-md md:text-display-lg mb-6">
              Free Job Training. Real Careers. No Debt.
            </h1>
            <p className="text-body-lg md:text-h4 text-blue-100">
              You qualify if you live in Indiana and want a better job.
            </p>
          </div>
        </Container>
      </Section>

      {/* 2. Three Questions - Anxiety Reduction */}
      <Section variant="white">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-green-50 border-2 border-green-600 rounded-lg p-8 text-center">
            <DollarSign className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Will this cost me?
            </h3>
            <p className="text-lg text-slate-900 font-semibold">
              $0. Funded for eligible participants.
            </p>
          </div>

          <div className="bg-blue-50 border-2 border-blue-600 rounded-lg p-8 text-center">
            <CheckCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Am I eligible?
            </h3>
            <p className="text-lg text-slate-900 font-semibold">
              Indiana resident, 18+, want a career change.
            </p>
          </div>

          <div className="bg-purple-50 border-2 border-purple-600 rounded-lg p-8 text-center">
            <Clock className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              What happens next?
            </h3>
            <p className="text-lg text-slate-900 font-semibold">
              Apply → We call in 24hrs → Start in 1-2 weeks.
            </p>
          </div>
        </div>
      </Section>

      {/* 3. What You Get - Outcomes */}
      <Section variant="slate" containerSize="md">
        <h2 className="text-h2 text-slate-900 mb-12 text-center">
          What You Get
        </h2>
        <div className="space-y-4">
          <div className="bg-white border-2 border-slate-200 rounded-lg p-6 flex items-start gap-4">
            <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Industry Credential
              </h3>
              <p className="text-slate-700">
                State-licensed or nationally recognized certification (barber
                license, CDL, CNA, HVAC, welding, etc.)
              </p>
            </div>
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-lg p-6 flex items-start gap-4">
            <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Starting Salary: $35,000-$60,000/year
              </h3>
              <p className="text-slate-700">
                Depending on program. Most graduates earn $40,000-$50,000 in
                first year.
              </p>
            </div>
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-lg p-6 flex items-start gap-4">
            <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Job Placement Support
              </h3>
              <p className="text-slate-700">
                Connect with partner employers hiring trained workers in your
                field.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* 4. Programs - Scannable List */}
      <Section variant="white">
        <h2 className="text-h2 text-slate-900 mb-4 text-center">
          Choose Your Program
        </h2>
        <p className="text-center text-slate-600 mb-12 text-body-lg">
          All programs are $0 tuition for eligible participants
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: 'Barber Apprenticeship',
              duration: '15-17 months',
              salary: '$45,000/year',
              slug: 'barber-apprenticeship',
            },
            {
              name: 'CNA (Nursing Assistant)',
              duration: '4-6 weeks',
              salary: '$37,000/year',
              slug: 'cna-certified-nursing-assistant',
            },
            {
              name: 'HVAC Technician',
              duration: '6-12 months',
              salary: '$52,000/year',
              slug: 'hvac-technician',
            },
            {
              name: 'CDL (Truck Driver)',
              duration: '3-4 weeks',
              salary: '$60,000/year',
              slug: 'cdl-commercial-drivers-license',
            },
            {
              name: 'Welding Certification',
              duration: '6-9 months',
              salary: '$52,000/year',
              slug: 'welding-certification',
            },
            {
              name: 'Medical Assistant',
              duration: '9-12 months',
              salary: '$40,000/year',
              slug: 'medical-assistant',
            },
            {
              name: 'Phlebotomy Technician',
              duration: '4-8 weeks',
              salary: '$37,000/year',
              slug: 'phlebotomy-technician',
            },
            {
              name: 'Pharmacy Technician',
              duration: '6-9 months',
              salary: '$40,000/year',
              slug: 'pharmacy-technician',
            },
            {
              name: 'Electrical Apprenticeship',
              duration: '4-5 years',
              salary: '$62,000/year',
              slug: 'electrical-apprenticeship',
            },
            {
              name: 'Plumbing Apprenticeship',
              duration: '4-5 years',
              salary: '$65,000/year',
              slug: 'plumbing-apprenticeship',
            },
            {
              name: 'Carpentry Apprenticeship',
              duration: '3-4 years',
              salary: '$52,000/year',
              slug: 'carpentry-apprenticeship',
            },
            {
              name: 'IT Support Specialist',
              duration: '6-9 months',
              salary: '$52,000/year',
              slug: 'it-support-specialist',
            },
          ].map((program) => (
            <Link
              key={program.slug}
              href={`/programs/${program.slug}`}
              className="bg-slate-50 border border-slate-200 rounded-lg p-6 hover:border-blue-600 hover:shadow-lg transition group"
            >
              <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-blue-600">
                {program.name}
              </h3>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{program.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  <span className="font-semibold">{program.salary}</span>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                <span>Learn More</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button href="/programs" variant="tertiary" size="lg">
            View All 20 Programs →
          </Button>
        </div>
      </Section>

      {/* 5. Eligibility Checker */}
      <Section variant="blue" className="bg-blue-50">
        <h2 className="text-h2 text-slate-900 mb-4 text-center">
          Check Your Eligibility
        </h2>
        <p className="text-center text-slate-600 mb-12 text-body-lg">
          Answer 5 quick questions to see if you qualify
        </p>
        <EligibilityChecker />
      </Section>

      {/* 6. Journey Checklist */}
      <Section variant="white">
        <h2 className="text-h2 text-slate-900 mb-4 text-center">
          What Happens Next
        </h2>
        <p className="text-center text-slate-600 mb-12 text-body-lg">
          From application to first day of training
        </p>
        <JourneyChecklist />
      </Section>

      {/* 7. ONE CTA */}
      <Section
        variant="blue"
        className="bg-blue-600 text-white"
        containerSize="md"
      >
        <div className="text-center">
          <h2 className="text-h1 md:text-display-sm mb-6">Ready to Start?</h2>
          <p className="text-body-lg text-blue-100 mb-8">
            Apply now. An advisor will call you within 24 hours.
          </p>
          <Button href="/apply" size="lg" variant="secondary">
            Apply Now
          </Button>
          <p className="mt-6 text-blue-100">
            Questions?{' '}
            <a
              href="tel:+13173143757"
              className="underline font-semibold hover:text-white"
            >
              Call (317) 314-3757
            </a>
          </p>
        </div>
      </Section>
    </main>
  );
}
