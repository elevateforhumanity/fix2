// components/layout/Footer.tsx
import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-10 lg:px-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5 text-xs text-slate-300">
          {/* Brand & Contact */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-slate-950 text-xs font-black uppercase">
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
            <p className="text-sm text-slate-400 max-w-md mb-4">
              100% FREE career training through WIOA, WRG, and JRI funding. No tuition, no debt. Real jobs waiting in Marion County, Indiana.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin size={14} className="text-emerald-500" />
                <span className="text-xs">Marion County, Indiana</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Phone size={14} className="text-emerald-500" />
                <a href="tel:+13175551234" className="text-xs hover:text-emerald-300 transition">
                  (317) 555-1234
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Mail size={14} className="text-emerald-500" />
                <a href="mailto:info@elevateforhumanity.org" className="text-xs hover:text-emerald-300 transition">
                  info@elevateforhumanity.org
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a 
                href="https://facebook.com/elevateforhumanity" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-800 hover:bg-emerald-500 text-slate-400 hover:text-white transition"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a 
                href="https://twitter.com/elevate4humanity" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-800 hover:bg-emerald-500 text-slate-400 hover:text-white transition"
                aria-label="Twitter"
              >
                <Twitter size={16} />
              </a>
              <a 
                href="https://linkedin.com/company/elevateforhumanity" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-800 hover:bg-emerald-500 text-slate-400 hover:text-white transition"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
              <a 
                href="https://instagram.com/elevateforhumanity" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-800 hover:bg-emerald-500 text-slate-400 hover:text-white transition"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
            </div>
          </div>

          {/* Programs */}
          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-white">
              Programs
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/programs/medical-assistant" className="hover:text-emerald-300 transition">
                  Medical Assistant
                </Link>
              </li>
              <li>
                <Link href="/programs/phlebotomy" className="hover:text-emerald-300 transition">
                  Phlebotomy Technician
                </Link>
              </li>
              <li>
                <Link href="/programs/ekg-technician" className="hover:text-emerald-300 transition">
                  EKG Technician
                </Link>
              </li>
              <li>
                <Link href="/programs/pharmacy-technician" className="hover:text-emerald-300 transition">
                  Pharmacy Technician
                </Link>
              </li>
              <li>
                <Link href="/programs/dental-assistant" className="hover:text-emerald-300 transition">
                  Dental Assistant
                </Link>
              </li>
              <li>
                <Link href="/programs/patient-care-technician" className="hover:text-emerald-300 transition">
                  Patient Care Technician
                </Link>
              </li>
              <li>
                <Link href="/programs/sterile-processing" className="hover:text-emerald-300 transition">
                  Sterile Processing
                </Link>
              </li>
              <li>
                <Link href="/programs/healthcare-administration" className="hover:text-emerald-300 transition">
                  Healthcare Administration
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-white">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/students" className="hover:text-emerald-300 transition">
                  For Students
                </Link>
              </li>
              <li>
                <Link href="/employers" className="hover:text-emerald-300 transition">
                  For Employers
                </Link>
              </li>
              <li>
                <Link href="/funding/state-programs" className="hover:text-emerald-300 transition">
                  State Funding
                </Link>
              </li>
              <li>
                <Link href="/funding/federal-programs" className="hover:text-emerald-300 transition">
                  Federal Funding
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-emerald-300 transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-300 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-300 transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-white">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/apply" className="hover:text-emerald-300 transition font-semibold text-emerald-400">
                  Apply Now
                </Link>
              </li>
              <li>
                <Link href="/portal" className="hover:text-emerald-300 transition">
                  Student Portal
                </Link>
              </li>
              <li>
                <Link href="/success-stories" className="hover:text-emerald-300 transition">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-emerald-300 transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-emerald-300 transition">
                  Help Center
                </Link>
              </li>
              <li className="pt-2 border-t border-slate-800">
                <Link href="/privacy-policy" className="hover:text-emerald-300 transition text-slate-500">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-emerald-300 transition text-slate-500">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-emerald-300 transition text-slate-500">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>
              © {currentYear} Elevate For Humanity. All rights reserved.
            </p>
            <p className="text-center md:text-right">
              Empowering communities through workforce development and career training.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
