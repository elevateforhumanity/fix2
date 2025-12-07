import { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.elevateforhumanity.org/equal-opportunity",
  },
  title: 'Equal Opportunity Statement | Elevate For Humanity',
  description: 'Equal opportunity employer and program provider. We do not discriminate on the basis of race, color, religion, sex, national origin, age, disability, or political affiliation.',
};

export default function EqualOpportunityPage() {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Equal Opportunity Statement
        </h1>

        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8">
          <p className="text-lg font-semibold text-gray-900 mb-4">
            Elevate for Humanity is an equal opportunity employer and program provider.
          </p>
          <p className="text-gray-700">
            We do not discriminate on the basis of race, color, religion, sex, national origin, age, disability, political affiliation or belief, and for beneficiaries only, citizenship or participation in any WIOA Title I-financially assisted program or activity.
          </p>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Auxiliary Aids and Services
          </h2>
          <p className="text-gray-700 mb-4">
            Auxiliary aids and services are available upon request to individuals with disabilities.
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>Sign language interpreters</li>
            <li>Materials in alternative formats (Braille, large print, audio)</li>
            <li>Assistive technology</li>
            <li>Reasonable accommodations for training participation</li>
          </ul>
          <p className="font-semibold text-gray-900">
            TDD/TTY: 1-800-743-3333
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Language Assistance
          </h2>
          <p className="text-gray-700 mb-4">
            Free language interpretation and translation services are available upon request for individuals with limited English proficiency.
          </p>
          <p className="text-gray-700">
            Call <a href="tel:+13173143757" className="text-blue-600 hover:underline">(317) 314-3757</a> to request language assistance.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Filing a Complaint
          </h2>
          <p className="text-gray-700 mb-4">
            If you believe you have experienced discrimination, you have the right to file a complaint within 180 days of the alleged discrimination.
          </p>
          <div className="bg-gray-50 p-6 rounded-lg mb-4">
            <p className="text-gray-700 mb-2">
              <strong className="text-gray-900">Contact:</strong>
            </p>
            <p className="text-gray-700">
              Equal Opportunity Officer<br />
              Elevate for Humanity<br />
              Indianapolis, IN<br />
              Phone: <a href="tel:+13173143757" className="text-blue-600 hover:underline">(317) 314-3757</a><br />
              Email: <a href="mailto:eeo@elevateforhumanity.org" className="text-blue-600 hover:underline">eeo@elevateforhumanity.org</a>
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Additional Resources
          </h2>
          <div className="space-y-4">
            <div>
              <p className="font-semibold text-gray-900">Indiana Civil Rights Commission</p>
              <p className="text-gray-700">
                Phone: (317) 232-2600<br />
                Website: <a href="https://www.in.gov/icrc" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.in.gov/icrc</a>
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">U.S. Department of Labor</p>
              <p className="text-gray-700">
                Civil Rights Center<br />
                Phone: 1-877-889-5627<br />
                Website: <a href="https://www.dol.gov/crc" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.dol.gov/crc</a>
              </p>
            </div>
          </div>
        </section>

        <div className="text-sm text-gray-600 mt-8 pt-8 border-t">
          <p>Last Updated: {new Date().toLocaleDateString()}</p>
          <p>Effective Date: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}
