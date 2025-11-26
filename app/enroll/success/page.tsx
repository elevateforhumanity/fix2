import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Success - Apply Now - Start Your Career Training | Elevate for Humanity",
  description: "Apply for free WIOA-funded career training in healthcare, skilled trades, CDL, or barbering. Check eligibility and start your application today.",
  keywords: ["apply for training", "WIOA application", "career training enrollment", "free training"],
  openGraph: {
    title: "Success - Apply Now - Start Your Career Training | Elevate for Humanity",
    description: "Apply for free WIOA-funded career training in healthcare, skilled trades, CDL, or barbering. Check eligibility and start your application today.",
    images: ["/images/programs-new/program-14.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Success - Apply Now - Start Your Career Training | Elevate for Humanity",
    description: "Apply for free WIOA-funded career training in healthcare, skilled trades, CDL, or barbering. Check eligibility and start your application today.",
    images: ["/images/homepage/apply-now.png"],
  },
};



export default function EnrollmentSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <Card className="max-w-2xl w-full">
        <CardContent className="p-12 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          <h1 className="text-4xl font-black text-gray-900 mb-4">
            Application Submitted!
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            Thank you for applying. We've received your application and will
            contact you within 24-48 hours.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left">
            <h2 className="font-bold text-gray-900 mb-3">What Happens Next?</h2>
            <ol className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="font-bold text-blue-600">1.</span>
                <span>Our enrollment team will review your application</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-blue-600">2.</span>
                <span>We'll contact you to verify eligibility and funding</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-blue-600">3.</span>
                <span>
                  You'll receive your login credentials and start date
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-blue-600">4.</span>
                <span>Begin your training and start your new career!</span>
              </li>
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/">Return to Homepage</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/programs">Browse Programs</Link>
            </Button>
          </div>

          <p className="text-sm text-gray-600 mt-8">
            Questions? Call us at{' '}
            <a href="tel:317-555-0100" className="text-blue-600 font-semibold">
              (317) 555-0100
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
