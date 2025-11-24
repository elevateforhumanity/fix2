// components/layout/Footer.tsx
import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative border-t border-slate-700 bg-slate-900 overflow-hidden">
      {/* Watermark Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <Image
          src="/media/elevate-watermark.png"
          alt="Elevate For Humanity"
          fill
          className="object-cover"
        />
      </div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 md:px-10 lg:px-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5 text-xs text-white">
          {/* Brand & Contact */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500 text-slate-950 text-xs font-black uppercase">
                EFH
              </div>
              <div>
                <div className="text-base font-bold text-white">
                  Elevate For Humanity
                </div>
                <div className="text-xs text-slate-400">
                  Career & Technical Institute
                </div>
              </div>
            </div>
            <p className="text-sm text-white max-w-md mb-4 leading-relaxed font-medium">
              100% FREE career training through WIOA, WRG, and JRI funding. No tuition, no debt. Real jobs waiting in Indianapolis, IN.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-white">
                <MapPin size={18} className="text-orange-400 flex-shrink-0" />
                <span className="text-sm font-semibold">8888 Keystone Crossing Suite 1300, Indianapolis, IN 46240</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <Phone size={18} className="text-orange-400 flex-shrink-0" />
                <a href="tel:+13173143757" className="text-sm hover:text-orange-300 transition font-bold">
                  (317) 314-3757
                </a>
              </div>
              <div className="flex items-center gap-3 text-white">
                <Mail size={18} className="text-orange-400 flex-shrink-0" />
                <a href="mailto:elevais4humanityedu@gmail.com" className="text-sm hover:text-orange-300 transition font-bold">
                  elevais4humanityedu@gmail.com
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a 
                href="https://facebook.com/elevateforhumanity" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-slate-700 hover:bg-red-500 text-white hover:text-white transition-all hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook size={20} strokeWidth={2.5} />
              </a>
              <a 
                href="https://twitter.com/elevate4humanity" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-slate-700 hover:bg-red-500 text-white hover:text-white transition-all hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter size={20} strokeWidth={2.5} />
              </a>
              <a 
                href="https://linkedin.com/company/elevateforhumanity" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-slate-700 hover:bg-red-500 text-white hover:text-white transition-all hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} strokeWidth={2.5} />
              </a>
              <a 
                href="https://instagram.com/elevateforhumanity" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-slate-700 hover:bg-red-500 text-white hover:text-white transition-all hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram size={20} strokeWidth={2.5} />
              </a>
            </div>
          </div>

          {/* Programs */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
              Main Programs
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/programs/medical-assistant" className="text-white hover:text-orange-300 transition text-sm font-medium">
                  Medical Assistant
                </Link>
              </li>
              <li>
                <Link href="/programs/barber-apprenticeship" className="text-white hover:text-orange-300 transition text-sm font-medium">
                  Barber Apprenticeship
                </Link>
              </li>
              <li>
                <Link href="/programs/hvac" className="text-white hover:text-orange-300 transition text-sm font-medium">
                  HVAC Technician
                </Link>
              </li>
              <li>
                <Link href="/programs/building-tech" className="text-white hover:text-orange-300 transition text-sm font-medium">
                  Building Maintenance
                </Link>
              </li>
              <li>
                <Link href="/programs/cdl" className="text-white hover:text-orange-300 transition text-sm font-medium">
                  CDL / Transportation
                </Link>
              </li>
              <li>
                <Link href="/programs/workforce-readiness" className="text-white hover:text-orange-300 transition text-sm font-medium">
                  Workforce Readiness
                </Link>
              </li>
              <li>
                <Link href="/micro-classes" className="text-white hover:text-orange-300 transition text-sm font-medium">
                  Micro Classes →
                </Link>
              </li>
              <li>
                <Link href="/programs" className="text-orange-400 hover:text-orange-300 transition text-sm font-bold">
                  View All Programs
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
              Resources
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/students" className="text-white hover:text-orange-300 transition text-sm font-medium">
                  For Students
                </Link>
              </li>
              <li>
                <Link href="/employers" className="text-white hover:text-orange-300 transition text-sm font-medium">
                  For Employers
                </Link>
              </li>
              <li>
                <Link href="/funding/state-programs" className="text-white hover:text-orange-300 transition text-sm font-medium">
                  State Funding
                </Link>
              </li>
              <li>
                <Link href="/funding/federal-programs" className="text-white hover:text-orange-300 transition text-sm font-medium">
                  Federal Funding
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-white hover:text-orange-300 transition text-sm font-medium">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white hover:text-orange-300 transition text-sm font-medium">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white hover:text-orange-300 transition text-sm font-medium">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
              Company
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/apply" className="hover:text-orange-300 transition font-bold text-orange-400 text-sm">
                  Apply Now
                </Link>
              </li>
              <li>
                <Link href="/portal" className="text-white hover:text-orange-300 transition text-sm font-medium">
                  Student Portal
                </Link>
              </li>
              <li>
                <Link href="/success-stories" className="text-white hover:text-orange-300 transition text-sm font-medium">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-white hover:text-orange-300 transition text-sm font-medium">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-white hover:text-orange-300 transition text-sm font-medium">
                  Help Center
                </Link>
              </li>
              <li className="pt-3 mt-1 border-t border-slate-700">
                <Link href="/privacy-policy" className="text-white hover:text-orange-300 transition text-sm font-medium">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-white hover:text-orange-300 transition text-sm font-medium">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="text-white hover:text-orange-300 transition text-sm font-medium">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-white">
              © {currentYear} Elevate For Humanity. All rights reserved.
            </p>
            <p className="text-center md:text-right text-white">
              Empowering communities through workforce development
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
