import { ComplianceBar } from '@/components/ComplianceBar';
import Link from 'next/link';

export default function AgenciesPage() {
  return (
    <main className="bg-white">
      <ComplianceBar />
      
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">
          For Workforce Agencies & Partners
        </h1>

        <p className="text-xl mb-8 text-gray-700 leading-relaxed">
          License our government-aligned workforce infrastructure to deliver compliant, funded programs without building technology from scratch.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">What We Provide</h2>
          <p className="text-gray-700 mb-6">
            A complete workforce development platform that handles training delivery, compliance reporting, employer partnerships, and funding navigation—all in one system.
          </p>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">✓</span>
              <span><strong>DOL Registered Apprenticeship Sponsor</strong> - Official U.S. Department of Labor registration</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">✓</span>
              <span><strong>WIOA/WRG Eligible Programs</strong> - All programs qualify for workforce funding</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">✓</span>
              <span><strong>ETPL Approved Provider</strong> - Eligible Training Provider List approved in Indiana</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">✓</span>
              <span><strong>Multi-Tenant SaaS Platform</strong> - White-label licensing available</span>
            </li>
          </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-3 text-gray-900">For WorkOne Regions</h3>
            <p className="text-gray-700 mb-4">
              Track WIOA and WRG funded participants, monitor outcomes, and generate compliance reports automatically.
            </p>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• Real-time dashboards</li>
              <li>• Automated RAPIDS reporting</li>
              <li>• Outcome tracking</li>
              <li>• Audit-ready documentation</li>
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-3 text-gray-900">For Training Providers</h3>
            <p className="text-gray-700 mb-4">
              License our platform to deliver workforce-funded programs without building your own LMS and compliance systems.
            </p>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• White-label LMS</li>
              <li>• Mobile app included</li>
              <li>• AI tutoring system</li>
              <li>• Certificate generation</li>
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-3 text-gray-900">For State Agencies</h3>
            <p className="text-gray-700 mb-4">
              Monitor statewide workforce initiatives, track performance metrics, and ensure compliance across multiple providers.
            </p>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• Multi-provider oversight</li>
              <li>• Performance analytics</li>
              <li>• Compliance monitoring</li>
              <li>• Custom reporting</li>
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-3 text-gray-900">For Nonprofits</h3>
            <p className="text-gray-700 mb-4">
              Deliver accredited training programs with built-in funding navigation and employer connections.
            </p>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• Grant-ready programs</li>
              <li>• Employer partnerships</li>
              <li>• Student support tools</li>
              <li>• Outcome tracking</li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Platform Capabilities</h2>
          <div className="grid md:grid-cols-3 gap-4 text-gray-700">
            <div>• RAPIDS integration</div>
            <div>• ETPL reporting</div>
            <div>• Multi-tenant architecture</div>
            <div>• Mobile app (iOS/Android)</div>
            <div>• AI-powered tutoring</div>
            <div>• Gamification & badges</div>
            <div>• Push notifications</div>
            <div>• Offline learning mode</div>
            <div>• Certificate generation</div>
            <div>• Employer dashboards</div>
            <div>• Compliance automation</div>
            <div>• Real-time analytics</div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Why Partner With Us?</h2>
          <div className="grid md:grid-cols-2 gap-6 text-gray-700">
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Government-Aligned</h3>
              <p>Built specifically for DOL, WIOA, and state workforce requirements. Not adapted—designed from the ground up.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Proven Compliance</h3>
              <p>Active DOL registration, ETPL approval, and WIOA eligibility. We maintain all credentials and documentation.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Fast Deployment</h3>
              <p>Launch in weeks, not years. No custom development required. White-label ready.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Modern Technology</h3>
              <p>Mobile app, AI tutoring, gamification, and push notifications—features students expect and agencies need.</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/licensing"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition mr-4"
          >
            View Licensing Options
          </Link>
          <Link
            href="/contact"
            className="inline-block bg-white hover:bg-gray-50 border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-bold text-lg transition"
          >
            Schedule a Demo
          </Link>
          <p className="mt-6 text-gray-600">
            Questions? Call (317) 314-3757 or email elevate4humanityedu@gmail.com
          </p>
        </div>
      </div>
    </main>
  );
}
