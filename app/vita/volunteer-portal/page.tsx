import { Metadata } from 'next';
import Link from 'next/link';
import { Users, Award, Calendar, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/vita/volunteer-portal',
  },
  title: 'VITA Volunteer Portal | Elevate For Humanity',
  description: 'Apply to become a VITA volunteer tax preparer.',
};

export default async function VolunteerPortalPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Become a VITA Volunteer</h1>
          <p className="text-xl text-green-100">
            Help your community by providing free tax preparation services
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-blue-900 mb-3">
            Official IRS VITA/TCE Volunteer Signup
          </h2>
          <p className="text-blue-800 mb-4">
            All VITA volunteers must complete the official IRS signup process
            and training.
          </p>
          <a
            href="https://freetaxassistance.for.irs.gov/s/sign-up-form"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <ExternalLink className="h-5 w-5" />
            Complete Official IRS Signup
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 text-center">
            <Users className="h-12 w-12 text-green-600 mx-auto mb-3" />
            <h3 className="font-bold text-slate-900 mb-2">
              Help Your Community
            </h3>
            <p className="text-slate-600 text-sm">
              Assist families and individuals with their tax returns
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 text-center">
            <Award className="h-12 w-12 text-green-600 mx-auto mb-3" />
            <h3 className="font-bold text-slate-900 mb-2">Get Certified</h3>
            <p className="text-slate-600 text-sm">
              Receive IRS certification and training
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 text-center">
            <Calendar className="h-12 w-12 text-green-600 mx-auto mb-3" />
            <h3 className="font-bold text-slate-900 mb-2">Flexible Schedule</h3>
            <p className="text-slate-600 text-sm">
              Choose hours that work for you
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            How to Become a Volunteer
          </h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">
                  Complete IRS Signup
                </h3>
                <p className="text-slate-600">
                  Visit the official IRS VITA/TCE volunteer signup form and
                  submit your application.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">
                  Complete Training
                </h3>
                <p className="text-slate-600">
                  Take the IRS Link & Learn Taxes online training course at your
                  own pace.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">
                  Pass Certification
                </h3>
                <p className="text-slate-600">
                  Complete the certification test to become an IRS-certified
                  volunteer tax preparer.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">
                  Start Volunteering
                </h3>
                <p className="text-slate-600">
                  We'll contact you about local volunteer opportunities at our
                  VITA sites.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-slate-50 rounded-lg">
            <h3 className="font-bold text-slate-900 mb-2">Questions?</h3>
            <p className="text-slate-600 mb-3">
              Contact us for more information about volunteering with our VITA
              program.
            </p>
            <Link
              href="/contact"
              className="inline-block px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
