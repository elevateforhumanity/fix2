// components/layout/Footer.tsx
import Link from "next/link";
import Image from "next/image";
import { Facebook, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { ObfuscatedEmail } from "@/components/ui/ObfuscatedEmail";

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
            <div className="mb-4 flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Elevate For Humanity"
                width={48}
                height={48}
                className="h-12 w-12"
              />
              <div>
                <div className="text-base font-bold text-slate-900">
                  Elevate For Humanity
                </div>
                <div className="text-xs text-slate-600">
                  Career & Technical Institute
                </div>
              </div>
            </div>
            <p className="text-sm text-slate-700 max-w-md mb-4 leading-relaxed font-medium">
              100% FREE career training through WIOA, WRG, and JRI funding. No tuition, no debt. Real jobs waiting in Indianapolis, IN.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-slate-700">
                <MapPin size={18} className="text-teal-600 flex-shrink-0" />
                <span className="text-sm font-semibold">8888 Keystone Crossing Suite 1300, Indianapolis, IN 46240</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700">
                <Phone size={18} className="text-teal-600 flex-shrink-0" />
                <a href="tel:+13173143757" className="text-sm hover:text-teal-600 transition font-bold">
                  (317) 314-3757
                </a>
              </div>
              <div className="flex items-center gap-3 text-slate-700">
                <Mail size={18} className="text-teal-600 flex-shrink-0" />
                <Link href="/contact" className="text-sm hover:text-teal-600 transition font-bold">
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
                  className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-all hover:scale-105 shadow-lg"
                  aria-label="Instagram"
                >
                  <Instagram size={20} strokeWidth={2.5} />
                </a>
              </div>
              <p className="text-xs text-slate-600 mt-3">Get updates & success stories!</p>
            </div>
          </div>

          {/* Programs */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-900">
              Programs
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/programs" className="text-orange-600 hover:text-orange-700 transition text-sm font-bold">
                  View All Programs →
                </Link>
              </li>
              <li>
                <Link href="/programs/cna" className="text-slate-700 hover:text-orange-600 transition text-sm font-medium">
                  Healthcare
                </Link>
              </li>
              <li>
                <Link href="/programs/hvac-technician" className="text-slate-700 hover:text-orange-600 transition text-sm font-medium">
                  Skilled Trades
                </Link>
              </li>
              <li>
                <Link href="/programs/barber-apprenticeship" className="text-slate-700 hover:text-orange-600 transition text-sm font-medium">
                  Beauty & Barbering
                </Link>
              </li>
              <li>
                <Link href="/programs/truck-driving" className="text-slate-700 hover:text-orange-600 transition text-sm font-medium">
                  Transportation
                </Link>
              </li>
            </ul>
          </div>

          {/* Get Started */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-900">
              Get Started
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/apply" className="text-orange-600 hover:text-orange-700 transition text-sm font-bold">
                  Apply Now →
                </Link>
              </li>
              <li>
                <Link href="/getstarted" className="text-slate-700 hover:text-orange-600 transition text-sm font-medium">
                  How to Get Started
                </Link>
              </li>
              <li>
                <Link href="/funding" className="text-slate-700 hover:text-orange-600 transition text-sm font-medium">
                  Funding Options
                </Link>
              </li>
              <li>
                <Link href="/jri" className="text-slate-700 hover:text-orange-600 transition text-sm font-medium">
                  JRI Funding
                </Link>
              </li>
              <li>
                <Link href="/advising" className="text-slate-700 hover:text-orange-600 transition text-sm font-medium">
                  Talk to an Advisor
                </Link>
              </li>
            </ul>
          </div>

          {/* Portals */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-900">
              Portals
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/student/dashboard" className="text-slate-700 hover:text-orange-600 transition text-sm font-medium">
                  Student Portal
                </Link>
              </li>
              <li>
                <Link href="/lms" className="text-slate-700 hover:text-orange-600 transition text-sm font-medium">
                  LMS
                </Link>
              </li>
              <li>
                <Link href="/staff-portal" className="text-slate-700 hover:text-orange-600 transition text-sm font-medium">
                  Staff Portal
                </Link>
              </li>
              <li>
                <Link href="/admin/dashboard" className="text-slate-700 hover:text-orange-600 transition text-sm font-medium">
                  Admin Portal
                </Link>
              </li>
              <li>
                <Link href="/workforce-board/dashboard" className="text-slate-700 hover:text-orange-600 transition text-sm font-medium">
                  Workforce Board
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
                <Link href="/privacy-policy" className="text-slate-700 hover:text-orange-600 transition text-sm font-medium">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-slate-700 hover:text-orange-600 transition text-sm font-medium">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/dmca" className="text-slate-700 hover:text-orange-600 transition text-sm font-medium">
                  DMCA Policy
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="text-slate-700 hover:text-orange-600 transition text-sm font-medium">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/accessibility" className="text-slate-700 hover:text-orange-600 transition text-sm font-medium">
                  Accessibility
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-slate-700 hover:text-orange-600 transition text-sm font-medium">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-900">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-slate-700 hover:text-orange-600 transition text-sm font-medium">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/founder" className="text-slate-700 hover:text-orange-600 transition text-sm font-medium">
                  Our Founder
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-slate-700 hover:text-teal-600 transition text-sm font-medium">
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="/success-stories" className="text-slate-700 hover:text-teal-600 transition text-sm font-medium">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-700 hover:text-teal-600 transition text-sm font-medium">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-900">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/student/dashboard" className="text-slate-700 hover:text-teal-600 transition text-sm font-medium">
                  Student Portal
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-slate-700 hover:text-teal-600 transition text-sm font-medium">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-slate-700 hover:text-teal-600 transition text-sm font-medium">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/accessibility" className="text-slate-700 hover:text-teal-600 transition text-sm font-medium">
                  Accessibility
                </Link>
              </li>
              <li className="pt-2 mt-1 border-t border-slate-200">
                <Link href="/privacy-policy" className="text-slate-600 hover:text-teal-600 transition text-xs">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-slate-600 hover:text-teal-600 transition text-xs">
                  Terms of Service
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
                © {currentYear} Elevate For Humanity Career & Technical Institute. All rights reserved.
              </p>
              <p className="text-xs text-slate-600 mt-1">
                All content, logos, and materials are protected by U.S. Copyright Law. Unauthorized reproduction prohibited.
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
