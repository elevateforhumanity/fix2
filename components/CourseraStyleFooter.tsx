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
                <Link href="/about" className="text-sm text-gray-600 hover:text-blue-600">
                  About
                </Link>
              </li>
              <li>
                <Link href="/programs" className="text-sm text-gray-600 hover:text-blue-600">
                  What We Offer
                </Link>
              </li>
              <li>
                <Link href="/partners" className="text-sm text-gray-600 hover:text-blue-600">
                  Partners
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-sm text-gray-600 hover:text-blue-600">
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
                <Link href="/student/dashboard" className="text-sm text-gray-600 hover:text-blue-600">
                  Learners
                </Link>
              </li>
              <li>
                <Link href="/employers" className="text-sm text-gray-600 hover:text-blue-600">
                  Employers
                </Link>
              </li>
              <li>
                <Link href="/program-holder/dashboard" className="text-sm text-gray-600 hover:text-blue-600">
                  Training Providers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-gray-600 hover:text-blue-600">
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
                <Link href="/contact" className="text-sm text-gray-600 hover:text-blue-600">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-gray-600 hover:text-blue-600">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/financial-aid" className="text-sm text-gray-600 hover:text-blue-600">
                  Financial Aid
                </Link>
              </li>
              <li>
                <Link href="/success-stories" className="text-sm text-gray-600 hover:text-blue-600">
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-4">Programs</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/programs/medical-assistant" className="text-sm text-gray-600 hover:text-blue-600">
                  Medical Assistant
                </Link>
              </li>
              <li>
                <Link href="/programs/hvac" className="text-sm text-gray-600 hover:text-blue-600">
                  HVAC Technician
                </Link>
              </li>
              <li>
                <Link href="/programs/barber" className="text-sm text-gray-600 hover:text-blue-600">
                  Barber Apprenticeship
                </Link>
              </li>
              <li>
                <Link href="/programs/truck-driving" className="text-sm text-gray-600 hover:text-blue-600">
                  CDL Training
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5 - Mobile App */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-4">Mobile App</h3>
            <div className="space-y-3">
              <a href="#" className="block">
                <img
                  src="https://www.coursera.org/images/app-store-badge.svg"
                  alt="Download on App Store"
                  className="h-10"
                />
              </a>
              <a href="#" className="block">
                <img
                  src="https://www.coursera.org/images/google-play-badge.svg"
                  alt="Get it on Google Play"
                  className="h-10"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Logo and Copyright */}
            <div className="flex items-center gap-4">
              <div className="text-xl font-bold text-blue-600">Elevate</div>
              <span className="text-sm text-gray-500">
                © {new Date().getFullYear()} Elevate for Humanity
              </span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-400 hover:text-blue-600 transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition">
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
