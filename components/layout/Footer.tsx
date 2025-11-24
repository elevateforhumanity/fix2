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
            <p className="text-sm text-slate-300 max-w-md mb-4 leading-relaxed">
              100% FREE career training through WIOA, WRG, and JRI funding. No tuition, no debt. Real jobs waiting in Marion County, Indiana.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-slate-300">
                <MapPin size={16} className="text-emerald-400 flex-shrink-0" />
                <span className="text-sm">Marion County, Indiana</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <Phone size={16} className="text-emerald-400 flex-shrink-0" />
                <a href="tel:+13175551234" className="text-sm hover:text-emerald-300 transition font-medium">
                  (317) 555-1234
                </a>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <Mail size={16} className="text-emerald-400 flex-shrink-0" />
                <a href="mailto:info@elevateforhumanity.org" className="text-sm hover:text-emerald-300 transition font-medium">
                  info@elevateforhumanity.org
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a 
                href="https://facebook.com/elevateforhumanity" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-slate-800 hover:bg-emerald-500 text-slate-300 hover:text-white transition-all hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook size={20} strokeWidth={2.5} />
              </a>
              <a 
                href="https://twitter.com/elevate4humanity" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-slate-800 hover:bg-emerald-500 text-slate-300 hover:text-white transition-all hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter size={20} strokeWidth={2.5} />
              </a>
              <a 
                href="https://linkedin.com/company/elevateforhumanity" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-slate-800 hover:bg-emerald-500 text-slate-300 hover:text-white transition-all hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} strokeWidth={2.5} />
              </a>
              <a 
                href="https://instagram.com/elevateforhumanity" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-slate-800 hover:bg-emerald-500 text-slate-300 hover:text-white transition-all hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram size={20} strokeWidth={2.5} />
              </a>
            </div>
          </div>

          {/* Programs */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
              Programs
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/programs/medical-assistant" className="text-slate-300 hover:text-emerald-300 transition text-sm">
                  Medical Assistant
                </Link>
              </li>
              <li>
                <Link href="/programs/phlebotomy" className="text-slate-300 hover:text-emerald-300 transition text-sm">
                  Phlebotomy Technician
                </Link>
              </li>
              <li>
                <Link href="/programs/ekg-technician" className="text-slate-300 hover:text-emerald-300 transition text-sm">
                  EKG Technician
                </Link>
              </li>
              <li>
                <Link href="/programs/pharmacy-technician" className="text-slate-300 hover:text-emerald-300 transition text-sm">
                  Pharmacy Technician
                </Link>
              </li>
              <li>
                <Link href="/programs/dental-assistant" className="text-slate-300 hover:text-emerald-300 transition text-sm">
                  Dental Assistant
                </Link>
              </li>
              <li>
                <Link href="/programs/patient-care-technician" className="text-slate-300 hover:text-emerald-300 transition text-sm">
                  Patient Care Technician
                </Link>
              </li>
              <li>
                <Link href="/programs/sterile-processing" className="text-slate-300 hover:text-emerald-300 transition text-sm">
                  Sterile Processing
                </Link>
              </li>
              <li>
                <Link href="/programs/healthcare-administration" className="text-slate-300 hover:text-emerald-300 transition text-sm">
                  Healthcare Administration
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
                <Link href="/students" className="text-slate-300 hover:text-emerald-300 transition text-sm">
                  For Students
                </Link>
              </li>
              <li>
                <Link href="/employers" className="text-slate-300 hover:text-emerald-300 transition text-sm">
                  For Employers
                </Link>
              </li>
              <li>
                <Link href="/funding/state-programs" className="text-slate-300 hover:text-emerald-300 transition text-sm">
                  State Funding
                </Link>
              </li>
              <li>
                <Link href="/funding/federal-programs" className="text-slate-300 hover:text-emerald-300 transition text-sm">
                  Federal Funding
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-slate-300 hover:text-emerald-300 transition text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-300 hover:text-emerald-300 transition text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-300 hover:text-emerald-300 transition text-sm">
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
                <Link href="/apply" className="hover:text-emerald-300 transition font-bold text-emerald-400 text-sm">
                  Apply Now
                </Link>
              </li>
              <li>
                <Link href="/portal" className="text-slate-300 hover:text-emerald-300 transition text-sm">
                  Student Portal
                </Link>
              </li>
              <li>
                <Link href="/success-stories" className="text-slate-300 hover:text-emerald-300 transition text-sm">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-slate-300 hover:text-emerald-300 transition text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-slate-300 hover:text-emerald-300 transition text-sm">
                  Help Center
                </Link>
              </li>
              <li className="pt-3 mt-1 border-t border-slate-800">
                <Link href="/privacy-policy" className="text-slate-400 hover:text-emerald-300 transition text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-slate-400 hover:text-emerald-300 transition text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="text-slate-400 hover:text-emerald-300 transition text-sm">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
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
