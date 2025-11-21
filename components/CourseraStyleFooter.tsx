import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';

export default function CourseraStyleFooter() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-8">
          {/* Column 1 */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-4">Elevate</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-600 hover:text-blue-600"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/programs"
                  className="text-sm text-gray-600 hover:text-blue-600"
                >
                  What We Offer
                </Link>
              </li>
              <li>
                <Link
                  href="/partners"
                  className="text-sm text-gray-600 hover:text-blue-600"
                >
                  Partners
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-sm text-gray-600 hover:text-blue-600"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-4">Community</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/student/dashboard"
                  className="text-sm text-gray-600 hover:text-blue-600"
                >
                  Learners
                </Link>
              </li>
              <li>
                <Link
                  href="/employers"
                  className="text-sm text-gray-600 hover:text-blue-600"
                >
                  Employers
                </Link>
              </li>
              <li>
                <Link
                  href="/program-holder/dashboard"
                  className="text-sm text-gray-600 hover:text-blue-600"
                >
                  Training Providers
                </Link>
              </li>
              <li>
                <Link
                  href="/philanthropy"
                  className="text-sm text-gray-600 hover:text-blue-600"
                >
                  Community Impact
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-gray-600 hover:text-blue-600"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-4">More</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-600 hover:text-blue-600"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-gray-600 hover:text-blue-600"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/success-stories"
                  className="text-sm text-gray-600 hover:text-blue-600"
                >
                  Success Stories
                </Link>
              </li>
              <li>
                <Link
                  href="/directory"
                  className="text-sm text-gray-600 hover:text-blue-600"
                >
                  Directory
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-4">Funding</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/funding/wioa"
                  className="text-sm text-gray-600 hover:text-blue-600"
                >
                  WIOA Funding
                </Link>
              </li>
              <li>
                <Link
                  href="/funding/wrg"
                  className="text-sm text-gray-600 hover:text-blue-600"
                >
                  Workforce Ready Grant
                </Link>
              </li>
              <li>
                <Link
                  href="/funding/jri"
                  className="text-sm text-gray-600 hover:text-blue-600"
                >
                  Justice Reinvestment
                </Link>
              </li>
              <li>
                <Link
                  href="/funding/dol"
                  className="text-sm text-gray-600 hover:text-blue-600"
                >
                  DOL Apprenticeships
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5 - Resources */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-gray-600 hover:text-blue-600"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-sm text-gray-600 hover:text-blue-600"
                >
                  Support
                </Link>
              </li>
              <li>
                <Link
                  href="/apply"
                  className="text-sm text-gray-600 hover:text-blue-600"
                >
                  Apply Now
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-600 hover:text-blue-600"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Logo and Copyright */}
            <div className="flex flex-col items-start gap-2">
              <div className="flex items-center gap-4">
                <div className="text-xl font-bold text-blue-600">Elevate</div>
                <span className="text-sm text-gray-500">
                  © {new Date().getFullYear()} Elevate for Humanity
                </span>
              </div>
              <div className="text-xs text-gray-500">
                A program of <strong>Selfish Inc</strong>, a 501(c)(3) nonprofit organization | Government Contractor | ETPL-Approved Provider
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://facebook.com/elevateforhumanity"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 transition"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/elevate4humanity"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 transition"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/company/elevate-for-humanity"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 transition"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/elevateforhumanity"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 transition"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com/@elevateforhumanity"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 transition"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <Link href="/privacy-policy" className="hover:text-blue-600">
                Privacy
              </Link>
              <Link href="/terms-of-service" className="hover:text-blue-600">
                Terms
              </Link>
              <Link href="/accessibility" className="hover:text-blue-600">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
