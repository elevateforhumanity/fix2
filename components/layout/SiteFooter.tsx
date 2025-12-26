import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';
import {
  footerNavigation,
  socialLinks,
  contactInfo,
} from '@/lib/navigation/site-nav.config';

/**
 * SITE FOOTER
 *
 * Global footer for marketing site with:
 * - 6 columns of links
 * - Social media links
 * - Contact information
 * - Newsletter signup
 * - Copyright and legal
 */

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Programs Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              {footerNavigation.programs.title}
            </h3>
            <ul className="space-y-2">
              {footerNavigation.programs.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Students Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              {footerNavigation.students.title}
            </h3>
            <ul className="space-y-2">
              {footerNavigation.students.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Partners Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              {footerNavigation.partners.title}
            </h3>
            <ul className="space-y-2">
              {footerNavigation.partners.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              {footerNavigation.company.title}
            </h3>
            <ul className="space-y-2">
              {footerNavigation.company.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              {footerNavigation.resources.title}
            </h3>
            <ul className="space-y-2">
              {footerNavigation.resources.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              {footerNavigation.legal.title}
            </h3>
            <ul className="space-y-2">
              {footerNavigation.legal.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact & Social Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <p>
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="hover:text-white transition"
                  >
                    {contactInfo.phone}
                  </a>
                </p>
                <p>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="hover:text-white transition"
                  >
                    {contactInfo.email}
                  </a>
                </p>
                <p>
                  {contactInfo.address.street}
                  <br />
                  {contactInfo.address.city}, {contactInfo.address.state}{' '}
                  {contactInfo.address.zip}
                </p>
              </div>
            </div>

            {/* Social Media & Newsletter */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Stay Connected</h3>

              {/* Social Links */}
              <div className="flex gap-4 mb-6">
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition"
                  aria-label="Facebook"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition"
                  aria-label="Twitter"
                >
                  <Twitter className="w-6 h-6" />
                </a>
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition"
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition"
                  aria-label="YouTube"
                >
                  <Youtube className="w-6 h-6" />
                </a>
              </div>

              {/* Newsletter Signup */}
              <div>
                <p className="text-sm text-gray-400 mb-2">
                  Subscribe to our newsletter
                </p>
                <form className="flex gap-2">
                  <input
                    type="email"
                    Content="Your email"
                    className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm font-medium transition"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <p>© {currentYear} Elevate for Humanity. All rights reserved.</p>
            <div className="flex gap-6">
              <Link
                href="/privacy-policy"
                className="hover:text-white transition"
              >
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-white transition">
                Terms
              </Link>
              <Link
                href="/accessibility"
                className="hover:text-white transition"
              >
                Accessibility
              </Link>
              <Link href="/sitemap" className="hover:text-white transition">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
