/**
 * Cookie Policy Page
 * Comprehensive cookie policy for GDPR compliance
 */

import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Cookie, Shield, Eye, Settings } from 'lucide-react';

export default function CookiePolicy() {
  return (
    <>
      <Helmet>
        <title>Cookie Policy | Elevate for Humanity</title>
        <meta
          name="description"
          content="Learn about how Elevate for Humanity uses cookies and similar technologies to improve your experience."
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Cookie className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900">
                  Cookie Policy
                </h1>
                <p className="text-gray-600 mt-2">
                  Last Updated: November 12, 2025
                </p>
              </div>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed">
              This Cookie Policy explains how Elevate for Humanity ("we," "us," or "our") uses cookies and similar technologies when you visit our website and learning management system.
            </p>
          </div>

          {/* What Are Cookies */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                What Are Cookies?
              </h2>
            </div>

            <p className="text-gray-700 mb-4">
              Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
            </p>

            <p className="text-gray-700">
              We use cookies and similar technologies to enhance your experience, analyze site usage, and assist in our marketing efforts.
            </p>
          </div>

          {/* Types of Cookies */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Types of Cookies We Use
            </h2>

            <div className="space-y-6">
              {/* Essential Cookies */}
              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  1. Essential Cookies (Required)
                </h3>
                <p className="text-gray-700 mb-3">
                  These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility.
                </p>
                <div className="bg-gray-50 p-4 rounded">
                  <p className="font-medium text-gray-900 mb-2">Examples:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Authentication cookies (session management)</li>
                    <li>Security cookies (CSRF protection)</li>
                    <li>Load balancing cookies</li>
                    <li>User interface customization</li>
                  </ul>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="border-l-4 border-green-600 pl-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  2. Analytics Cookies (Optional)
                </h3>
                <p className="text-gray-700 mb-3">
                  These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
                </p>
                <div className="bg-gray-50 p-4 rounded">
                  <p className="font-medium text-gray-900 mb-2">Examples:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Google Analytics (GA4) - G-EFHWORKFORCE01</li>
                    <li>Page view tracking</li>
                    <li>User behavior analysis</li>
                    <li>Performance monitoring</li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-2">
                    <strong>Data Collected:</strong> Pages visited, time on site, browser type, device type, geographic location (anonymized)
                  </p>
                </div>
              </div>

              {/* Functional Cookies */}
              <div className="border-l-4 border-purple-600 pl-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  3. Functional Cookies (Optional)
                </h3>
                <p className="text-gray-700 mb-3">
                  These cookies enable enhanced functionality and personalization, such as remembering your preferences.
                </p>
                <div className="bg-gray-50 p-4 rounded">
                  <p className="font-medium text-gray-900 mb-2">Examples:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Language preferences</li>
                    <li>Theme preferences (light/dark mode)</li>
                    <li>Course progress tracking</li>
                    <li>Video playback settings</li>
                  </ul>
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="border-l-4 border-orange-600 pl-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  4. Marketing Cookies (Optional)
                </h3>
                <p className="text-gray-700 mb-3">
                  These cookies track your online activity to help advertisers deliver more relevant advertising or to limit how many times you see an ad.
                </p>
                <div className="bg-gray-50 p-4 rounded">
                  <p className="font-medium text-gray-900 mb-2">Examples:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Social media cookies (Facebook, LinkedIn)</li>
                    <li>Advertising network cookies</li>
                    <li>Conversion tracking</li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-2">
                    <strong>Note:</strong> We currently do not use marketing cookies, but may in the future with your consent.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Third-Party Cookies */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Third-Party Cookies
            </h2>

            <p className="text-gray-700 mb-4">
              We use services from third-party companies that may set cookies on your device:
            </p>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Google Analytics
                </h3>
                <p className="text-gray-700 text-sm mb-2">
                  We use Google Analytics to understand how users interact with our site.
                </p>
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  Google Privacy Policy →
                </a>
              </div>

              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Supabase (Database & Authentication)
                </h3>
                <p className="text-gray-700 text-sm mb-2">
                  We use Supabase for secure data storage and user authentication.
                </p>
                <a
                  href="https://supabase.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  Supabase Privacy Policy →
                </a>
              </div>

              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Cloudflare (CDN & Security)
                </h3>
                <p className="text-gray-700 text-sm mb-2">
                  We use Cloudflare for content delivery and security.
                </p>
                <a
                  href="https://www.cloudflare.com/privacypolicy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  Cloudflare Privacy Policy →
                </a>
              </div>
            </div>
          </div>

          {/* Managing Cookies */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Settings className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                Managing Your Cookie Preferences
              </h2>
            </div>

            <p className="text-gray-700 mb-4">
              You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences in several ways:
            </p>

            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  1. Cookie Consent Banner
                </h3>
                <p className="text-gray-700 text-sm">
                  When you first visit our site, you'll see a cookie consent banner where you can accept or reject optional cookies.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  2. Browser Settings
                </h3>
                <p className="text-gray-700 text-sm mb-2">
                  Most web browsers allow you to control cookies through their settings:
                </p>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 ml-4">
                  <li>
                    <a
                      href="https://support.google.com/chrome/answer/95647"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Google Chrome
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Mozilla Firefox
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Safari
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Microsoft Edge
                    </a>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  3. Opt-Out Tools
                </h3>
                <p className="text-gray-700 text-sm mb-2">
                  You can opt out of Google Analytics tracking:
                </p>
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  Google Analytics Opt-out Browser Add-on →
                </a>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
              <p className="text-sm text-gray-700">
                <strong>Important:</strong> If you block or delete essential cookies, some features of our website may not function properly, and you may not be able to access certain areas of the site.
              </p>
            </div>
          </div>

          {/* Your Rights */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                Your Privacy Rights
              </h2>
            </div>

            <p className="text-gray-700 mb-4">
              Under GDPR and other privacy laws, you have the following rights:
            </p>

            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span className="text-gray-700">
                  <strong>Right to Access:</strong> Request a copy of the data we hold about you
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span className="text-gray-700">
                  <strong>Right to Rectification:</strong> Request correction of inaccurate data
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span className="text-gray-700">
                  <strong>Right to Erasure:</strong> Request deletion of your data
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span className="text-gray-700">
                  <strong>Right to Object:</strong> Object to processing of your data
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span className="text-gray-700">
                  <strong>Right to Data Portability:</strong> Receive your data in a portable format
                </span>
              </li>
            </ul>
          </div>

          {/* Updates */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Updates to This Policy
            </h2>

            <p className="text-gray-700 mb-4">
              We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons.
            </p>

            <p className="text-gray-700">
              We will notify you of any material changes by posting the new Cookie Policy on this page and updating the "Last Updated" date.
            </p>
          </div>

          {/* Contact */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Questions or Concerns?
            </h2>

            <p className="text-gray-700 mb-4">
              If you have any questions about our use of cookies or this Cookie Policy, please contact us:
            </p>

            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Email:</strong>{' '}
                <a
                  href="mailto:privacy@elevateforhumanity.org"
                  className="text-blue-600 hover:underline"
                >
                  privacy@elevateforhumanity.org
                </a>
              </p>
              <p>
                <strong>Phone:</strong>{' '}
                <a
                  href="tel:3173143757"
                  className="text-blue-600 hover:underline"
                >
                  (317) 314-3757
                </a>
              </p>
              <p>
                <strong>Address:</strong> Marion County, Indiana
              </p>
            </div>

            <div className="mt-6 flex gap-4">
              <Link
                to="/privacy"
                className="text-blue-600 hover:underline font-medium"
              >
                Privacy Policy →
              </Link>
              <Link
                to="/terms"
                className="text-blue-600 hover:underline font-medium"
              >
                Terms of Service →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
