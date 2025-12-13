// components/layout/Footer.tsx
import Link from 'next/link';
import Image from 'next/image';
import {
  Facebook,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import { ObfuscatedEmail } from '@/components/ui/ObfuscatedEmail';
import { SiteLogo } from '@/components/site/logo';

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-slate-200 bg-white overflow-hidden">
      {/* Watermark Background */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <Image
          src="/media/elevate-watermark.png"
          alt="Elevate For Humanity"
          fill
          className="object-cover"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5 text-xs text-slate-900">
          {/* Brand & Contact */}
          <div className="md:col-span-2 lg:col-span-1">
            <div className="mb-4">
              <SiteLogo className="h-12 w-auto mb-2" />
              <div className="text-xs text-slate-600">
                Career & Technical Institute
              </div>
            </div>
            <p className="text-sm text-slate-700 max-w-md mb-4 leading-relaxed font-medium">
              100% FREE career training through WIOA, WRG, and JRI funding. No
              tuition, no debt. Real jobs waiting in Indianapolis, IN.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-slate-700">
                <MapPin size={18} className="text-teal-600 flex-shrink-0" />
                <span className="text-sm font-semibold">
                  8888 Keystone Crossing Suite 1300, Indianapolis, IN 46240
                </span>
              </div>
              <div className="flex items-center gap-3 text-slate-700">
                <Phone size={18} className="text-teal-600 flex-shrink-0" />
                <a
                  href="tel:+13173143757"
                  className="text-sm hover:text-teal-600 transition font-bold"
                >
                  (317) 314-3757
                </a>
              </div>
              <div className="flex items-center gap-3 text-slate-700">
                <Mail size={18} className="text-teal-600 flex-shrink-0" />
                <Link
                  href="/contact"
                  className="text-sm hover:text-teal-600 transition font-bold"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <p className="text-sm font-bold text-slate-900 mb-3">FOLLOW US</p>
              <div className="flex gap-3">
                <a
                  href="https://www.facebook.com/profile.php?id=61571046346179"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-all hover:scale-105 shadow-lg"
                  aria-label="Facebook"
                >
                  <Facebook size={20} strokeWidth={2.5} />
                </a>

                <a
                  href="https://www.linkedin.com/in/elevate-for-humanity-b5a2b3339/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-700 hover:bg-blue-800 text-white transition-all hover:scale-105 shadow-lg"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} strokeWidth={2.5} />
                </a>
                <a
                  href="https://instagram.com/elevateforhumanity"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 text-white transition-all hover:scale-105 shadow-lg"
                  aria-label="Instagram"
                >
                  <Instagram size={20} strokeWidth={2.5} />
                </a>
              </div>
              <p className="text-xs text-slate-600 mt-3">
                Get updates & success stories!
              </p>
            </div>
          </div>

          {/* Portals */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-900">
              Portals
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/student/dashboard"
                  className="text-slate-700 hover:text-orange-600 transition text-sm font-medium"
                >
                  Student Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/instructor/dashboard"
                  className="text-slate-700 hover:text-orange-600 transition text-sm font-medium"
                >
                  Instructor Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="text-slate-700 hover:text-orange-600 transition text-sm font-medium"
                >
                  Admin Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/lms"
                  className="text-slate-700 hover:text-orange-600 transition text-sm font-medium"
                >
                  LMS Portal
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-blue-600 hover:text-blue-700 transition text-sm font-bold"
                >
                  Login →
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Actions */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-900">
              Get Started
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/contact"
                  className="text-orange-600 hover:text-orange-700 transition text-sm font-bold"
                >
                  Apply Now →
                </Link>
              </li>
              <li>
                <Link
                  href="/programs"
                  className="text-slate-700 hover:text-orange-600 transition text-sm font-medium"
                >
                  View Programs
                </Link>
              </li>
              <li>
                <Link
                  href="/funding"
                  className="text-slate-700 hover:text-orange-600 transition text-sm font-medium"
                >
                  Funding Options
                </Link>
              </li>
              <li>
                <Link
                  href="/store"
                  className="text-slate-700 hover:text-orange-600 transition text-sm font-medium"
                >
                  Store
                </Link>
              </li>
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-900">
              Get Involved
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/volunteer"
                  className="text-slate-700 hover:text-orange-600 transition text-sm font-medium"
                >
                  Volunteer
                </Link>
              </li>
              <li>
                <Link
                  href="/donate"
                  className="text-slate-700 hover:text-orange-600 transition text-sm font-medium"
                >
                  Donate
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-slate-700 hover:text-orange-600 transition text-sm font-medium"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="text-slate-700 hover:text-orange-600 transition text-sm font-medium"
                >
                  News
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-slate-700 hover:text-orange-600 transition text-sm font-medium"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Info */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-900">
              Legal & Info
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-slate-700 hover:text-orange-600 transition text-sm font-medium"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="text-slate-700 hover:text-orange-600 transition text-sm font-medium"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/dmca"
                  className="text-slate-700 hover:text-orange-600 transition text-sm font-medium"
                >
                  DMCA Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/refund-policy"
                  className="text-slate-700 hover:text-orange-600 transition text-sm font-medium"
                >
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/accessibility"
                  className="text-slate-700 hover:text-orange-600 transition text-sm font-medium"
                >
                  Accessibility
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-slate-700 hover:text-orange-600 transition text-sm font-medium"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Partner Organizations */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-900">
              Partner Organizations
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/rise-foundation"
                  className="text-slate-700 hover:text-orange-600 transition text-sm font-medium"
                >
                  RISE Foundation
                </Link>
              </li>
              <li>
                <Link
                  href="/rise-foundation/about"
                  className="text-slate-600 hover:text-orange-600 transition text-xs"
                >
                  About RISE
                </Link>
              </li>
              <li>
                <Link
                  href="/rise-foundation/programs"
                  className="text-slate-600 hover:text-orange-600 transition text-xs"
                >
                  RISE Programs
                </Link>
              </li>
              <li className="pt-2 mt-1 border-t border-slate-200">
                <Link
                  href="/supersonic-fast-cash"
                  className="text-slate-700 hover:text-orange-600 transition text-sm font-medium"
                >
                  Supersonic Fast Cash
                </Link>
              </li>
              <li>
                <Link
                  href="/supersonic-fast-cash/how-it-works"
                  className="text-slate-600 hover:text-orange-600 transition text-xs"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/supersonic-fast-cash/services"
                  className="text-slate-600 hover:text-orange-600 transition text-xs"
                >
                  Services
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <div className="text-center md:text-left">
              <p className="text-slate-700 font-semibold">
                © {currentYear} Elevate For Humanity Career & Technical
                Institute. All rights reserved.
              </p>
              <p className="text-xs text-slate-600 mt-1">
                All content, logos, and materials are protected by U.S.
                Copyright Law. Unauthorized reproduction prohibited.
              </p>
            </div>
            <p className="text-center md:text-right text-slate-600">
              Empowering communities through workforce development
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
