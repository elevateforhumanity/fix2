// components/layout/Footer.tsx
import Link from "next/link";
import Image from "next/image";
import { Facebook, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { ObfuscatedEmail } from "@/components/ui/ObfuscatedEmail";

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
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5 text-xs text-white">
          {/* Brand & Contact */}
          <div className="md:col-span-2 lg:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500 text-white text-xs font-black uppercase">
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
                <Link href="/contact" className="text-sm hover:text-orange-300 transition font-bold">
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <p className="text-sm font-bold text-orange-400 mb-3">FOLLOW US</p>
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
              <p className="text-xs text-slate-400 mt-3">Get updates & success stories!</p>
            </div>
          </div>

          {/* Programs */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
              Programs
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/programs" className="text-orange-400 hover:text-orange-300 transition text-sm font-bold">
                  All Programs
                </Link>
              </li>
              <li>
                <Link href="/programs/medical-administrative-assistant" className="text-slate-200 hover:text-orange-300 transition text-sm font-medium">
                  Medical Assistant
                </Link>
              </li>
              <li>
                <Link href="/programs/cna-certification" className="text-slate-200 hover:text-orange-300 transition text-sm font-medium">
                  CNA
                </Link>
              </li>
              <li>
                <Link href="/programs/barber-apprenticeship" className="text-slate-200 hover:text-orange-300 transition text-sm font-medium">
                  Barber
                </Link>
              </li>
              <li>
                <Link href="/programs/hvac-technician" className="text-slate-200 hover:text-orange-300 transition text-sm font-medium">
                  HVAC
                </Link>
              </li>
              <li>
                <Link href="/programs/cdl-training" className="text-slate-200 hover:text-orange-300 transition text-sm font-medium">
                  CDL
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/about" className="text-slate-200 hover:text-orange-300 transition text-sm font-medium">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-200 hover:text-orange-300 transition text-sm font-medium">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-slate-200 hover:text-orange-300 transition text-sm font-medium">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/students" className="text-slate-200 hover:text-orange-300 transition text-sm font-medium">
                  For Students
                </Link>
              </li>
              <li>
                <Link href="/employers" className="text-slate-200 hover:text-orange-300 transition text-sm font-medium">
                  For Employers
                </Link>
              </li>
              <li>
                <Link href="/training-providers" className="text-slate-200 hover:text-orange-300 transition text-sm font-medium">
                  Training Providers
                </Link>
              </li>
              <li>
                <Link href="/workforce-partners" className="text-slate-200 hover:text-orange-300 transition text-sm font-medium">
                  Workforce Partners
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-slate-200 hover:text-orange-300 transition text-sm font-medium">
                  Course Catalog
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-slate-200 hover:text-orange-300 transition text-sm font-medium">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Portals & Tools */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
              Portals
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/portal/student/dashboard" className="text-slate-200 hover:text-orange-300 transition text-sm font-medium">
                  Student Portal
                </Link>
              </li>
              <li>
                <Link href="/lms/dashboard" className="text-slate-200 hover:text-orange-300 transition text-sm font-medium">
                  LMS
                </Link>
              </li>
              <li>
                <Link href="/admin/dashboard" className="text-slate-200 hover:text-orange-300 transition text-sm font-medium">
                  Admin
                </Link>
              </li>
              <li>
                <Link href="/careers/job-board" className="text-slate-200 hover:text-orange-300 transition text-sm font-medium">
                  Job Board
                </Link>
              </li>
              <li>
                <Link href="/careers/resume-builder" className="text-slate-200 hover:text-orange-300 transition text-sm font-medium">
                  Resume Builder
                </Link>
              </li>
              <li>
                <Link href="/careers/interview-prep" className="text-slate-200 hover:text-orange-300 transition text-sm font-medium">
                  Interview Prep
                </Link>
              </li>
              <li>
                <Link href="/webinars" className="text-slate-200 hover:text-orange-300 transition text-sm font-medium">
                  Webinars
                </Link>
              </li>
              <li>
                <Link href="/alumni" className="text-slate-200 hover:text-orange-300 transition text-sm font-medium">
                  Alumni Network
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
                <Link href="/sitemap-page" className="hover:text-orange-300 transition font-bold text-orange-400 text-sm">
                  View All 479 Pages →
                </Link>
              </li>
              <li>
                <Link href="/getstarted" className="text-slate-200 hover:text-orange-300 transition text-sm font-medium">
                  Get Started
                </Link>
              </li>
              <li>
                <a href="https://elevateforhumanityeducation.com" target="_blank" rel="noopener noreferrer"
className="text-slate-200 hover:text-orange-300 transition text-sm font-medium">
                  LMS Dashboard
                </a>
              </li>
              <li>
                <Link href="/admin" className="text-slate-200 hover:text-orange-300 transition text-sm font-medium">
                  Admin Console
                </Link>
              </li>
              <li>
                <Link href="/success-stories" className="text-slate-200 hover:text-orange-300 transition text-sm font-medium">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link href="/career-fair" className="text-slate-200 hover:text-orange-300 transition text-sm font-medium">
                  Career Fair
                </Link>
              </li>
              <li>
                <Link href="/financial-aid" className="text-slate-200 hover:text-orange-300 transition text-sm font-medium">
                  Financial Aid
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-slate-200 hover:text-orange-300 transition text-sm font-medium">
                  Community
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-slate-200 hover:text-orange-300 transition text-sm font-medium">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-slate-200 hover:text-orange-300 transition text-sm font-medium">
                  Support
                </Link>
              </li>
              <li>
                <Link href="/accessibility" className="text-slate-200 hover:text-orange-300 transition text-sm font-medium">
                  Accessibility
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-slate-200 hover:text-orange-300 transition text-sm font-medium">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/partners" className="text-slate-200 hover:text-orange-300 transition text-sm font-medium">
                  Partners
                </Link>
              </li>
              <li className="pt-3 mt-1 border-t border-slate-700">
                <Link href="/privacy-policy" className="text-slate-200 hover:text-orange-300 transition text-sm font-medium">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-slate-200 hover:text-orange-300 transition text-sm font-medium">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="text-slate-200 hover:text-orange-300 transition text-sm font-medium">
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
