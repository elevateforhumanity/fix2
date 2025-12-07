import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Grievance Procedure | Elevate For Humanity',
  description: 'File a grievance if you believe you were denied services, experienced discrimination, or were treated unfairly in our WIOA programs.',
};

export default function GrievancePage() {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Grievance Procedure
        </h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Your Right to File a Grievance
          </h2>
          <p className="text-gray-700 mb-4">
            As a WIOA participant, you have the right to file a grievance if you believe:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>You were denied services you are entitled to</li>
            <li>You experienced discrimination</li>
            <li>Program rules were not followed</li>
            <li>You were treated unfairly</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            How to File a Grievance
          </h2>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Step 1: Informal Resolution
              </h3>
              <p className="text-gray-700 mb-2">
                Start to resolve the issue with your case manager or instructor first.
              </p>
              <p className="text-sm text-gray-600">
                Timeline: Within 5 business days
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Step 2: Formal Written Grievance
              </h3>
              <p className="text-gray-700 mb-2">
                If informal resolution doesn't work, submit a written grievance:
              </p>
              <ul className="list-disc pl-6 mb-2 text-gray-700 space-y-1">
                <li>Your name and contact information</li>
                <li>Description of the issue</li>
                <li>Date(s) the issue occurred</li>
                <li>Names of people involved</li>
                <li>What resolution you are seeking</li>
              </ul>
              <p className="text-sm text-gray-600">
                Timeline: Within 30 days of the incident
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Step 3: Investigation
              </h3>
              <p className="text-gray-700 mb-2">
                We will investigate your grievance and provide a written response.
              </p>
              <p className="text-sm text-gray-600">
                Timeline: Within 30 days of receiving your grievance
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Step 4: Appeal
              </h3>
              <p className="text-gray-700 mb-2">
                If you disagree with our decision, you can appeal to the state workforce board.
              </p>
              <p className="text-sm text-gray-600">
                Timeline: Within 15 days of receiving our decision
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Submit Your Grievance
          </h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-gray-900 mb-2">Mail:</p>
                <p className="text-gray-700">
                  Grievance Officer<br />
                  Elevate for Humanity<br />
                  Indianapolis, IN
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-2">Email:</p>
                <p className="text-gray-700">
                  <a href="mailto:grievance@elevateforhumanity.org" className="text-blue-600 hover:underline">
                    grievance@elevateforhumanity.org
                  </a>
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-2">Phone:</p>
                <p className="text-gray-700">
                  <a href="tel:+13173143757" className="text-blue-600 hover:underline">
                    (317) 314-3757
                  </a>
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-2">In Person:</p>
                <p className="text-gray-700">
                  Visit our office Monday-Friday, 9am-5pm
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            No Retaliation
          </h2>
          <p className="text-gray-700 mb-4">
            You will not face retaliation for filing a grievance. Your services will continue while your grievance is being resolved.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Additional Support
          </h2>
          <p className="text-gray-700 mb-4">
            If you need assistance filing a grievance or have questions about the process, contact:
          </p>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-700">
              <strong className="text-gray-900">Student Support Services</strong><br />
              Phone: <a href="tel:+13173143757" className="text-blue-600 hover:underline">(317) 314-3757</a><br />
              Email: <a href="mailto:support@elevateforhumanity.org" className="text-blue-600 hover:underline">support@elevateforhumanity.org</a>
            </p>
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
