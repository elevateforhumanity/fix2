// components/layout/MobileOptimizedNav.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Menu, X, Phone, Mail, MapPin, 
  GraduationCap, Briefcase, Users, Heart,
  ChevronRight, ExternalLink, Award
} from "lucide-react";
import { ObfuscatedEmail } from "@/components/ui/ObfuscatedEmail";

export function MobileOptimizedNav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="border-b border-slate-200 bg-white sticky top-0 z-50 shadow-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-orange-600 text-white text-sm font-black">
              EFH
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-bold text-slate-900">
                Elevate For Humanity
              </span>
              <span className="text-xs text-slate-600">
                100% Funded Training
              </span>
            </div>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-brand-orange-600 text-white hover:bg-brand-orange-700 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Quick Action Bar - Always Visible on Mobile */}
        <div className="bg-slate-50 border-t border-slate-200 px-4 py-2 flex items-center justify-between text-xs">
          <a href="tel:+13173143757" className="flex items-center gap-1 text-slate-700 hover:text-brand-orange-600">
            <Phone size={14} />
            <span className="font-semibold">(317) 314-3757</span>
          </a>
          <a 
            href="https://indianaconnect.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-brand-orange-600 font-bold hover:text-red-700"
          >
            <span>Schedule Now</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </header>

      {/* Full-Screen Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white overflow-y-auto">
          <div className="min-h-screen pb-20">
            {/* Header Spacer */}
            <div className="h-16" />

            {/* Main CTA Section */}
            <div className="   text-white p-6">
              <h2 className="text-2xl font-bold mb-2">Ready to Start?</h2>
              <p className="text-white/90 mb-4 text-sm">
                100% funded training. No cost to you.
              </p>
              <a
                href="https://indianaconnect.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-white text-brand-orange-600 text-center py-3 rounded-lg font-bold hover:bg-yellow-300 transition-colors"
              >
                Schedule at Indiana Connect →
              </a>
            </div>

            {/* Quick Info Cards */}
            <div className="p-4 space-y-3">
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                    <Award size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Ranked #15</h3>
                    <p className="text-sm text-slate-700">Among Indiana's WRG providers</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                    <Users size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">85% Job Placement</h3>
                    <p className="text-sm text-slate-700">Within 90 days of completion</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Programs Section */}
            <div className="p-4">
              <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                <GraduationCap size={20} className="text-brand-orange-600" />
                Training Programs
              </h3>
              <div className="space-y-2">
                {programs.map((program, index) => (
                  <Link
                    key={index}
                    href={program.href}
                    className="block bg-white border border-slate-200 rounded-lg p-4 hover:border-red-500 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-900 mb-1">{program.name}</h4>
                        <p className="text-xs text-slate-600">{program.duration} • {program.funding}</p>
                      </div>
                      <ChevronRight size={20} className="text-slate-400" />
                    </div>
                  </Link>
                ))}
              </div>
              <Link
                href="/programs"
                className="block mt-3 text-center py-3 bg-slate-100 text-brand-orange-600 font-bold rounded-lg hover:bg-slate-200 transition-colors"
              >
                View All Programs
              </Link>
            </div>

            {/* Quick Links */}
            <div className="p-4">
              <h3 className="text-lg font-bold text-slate-900 mb-3">Quick Links</h3>
              <div className="grid grid-cols-2 gap-3">
                {quickLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="flex flex-col items-center justify-center p-4 bg-white border border-slate-200 rounded-lg hover:border-red-500 hover:shadow-md transition-all"
                  >
                    <link.icon size={24} className="text-brand-orange-600 mb-2" />
                    <span className="text-sm font-semibold text-slate-900 text-center">{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="p-4 bg-slate-50 border-t border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-3">Contact Us</h3>
              <div className="space-y-3">
                <a href="tel:+13173143757" className="flex items-center gap-3 text-slate-700 hover:text-brand-orange-600">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                    <Phone size={18} className="text-brand-orange-600" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-600">Call Us</div>
                    <div className="font-bold">(317) 314-3757</div>
                  </div>
                </a>
                <a href="mailto:elevate4humanityedu@gmail.com" className="flex items-center gap-3 text-slate-700 hover:text-brand-orange-600">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                    <Mail size={18} className="text-brand-orange-600" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-600">Email Us</div>
                    <div className="font-bold text-sm">elevate4humanityedu@gmail.com</div>
                  </div>
                </a>
                <div className="flex items-start gap-3 text-slate-700">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} className="text-brand-orange-600" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-600">Visit Us</div>
                    <div className="font-bold text-sm">8888 Keystone Crossing Suite 1300</div>
                    <div className="text-sm">Indianapolis, IN 46240</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Notice */}
            <div className="p-4">
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                <h4 className="font-bold text-blue-900 mb-2">How to Get Started:</h4>
                <ol className="space-y-2 text-sm text-blue-800">
                  <li className="flex gap-2">
                    <span className="font-bold">1.</span>
                    <span>Visit <a href="https://indianaconnect.com" target="_blank" rel="noopener noreferrer"
className="underline font-bold">IndianaConnect.com</a></span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold">2.</span>
                    <span>WorkOne handles intake & funding</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold">3.</span>
                    <span>We provide the training structure</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Data
const programs = [
  { name: "Barber Apprenticeship", duration: "2,000 hrs", funding: "WIOA, DOL", href: "/programs/barber-apprenticeship" },
  { name: "Medical Assistant", duration: "10 weeks", funding: "WIOA, WRG", href: "/programs/medical-assistant" },
  { name: "HVAC Technician", duration: "12 weeks", funding: "WIOA, WRG", href: "/programs/hvac-technician" },
  { name: "CNA Training", duration: "6 weeks", funding: "WIOA, WRG", href: "/programs/cna" },
  { name: "Building Maintenance", duration: "10 weeks", funding: "WIOA, WRG", href: "/programs/building-maintenance" },
  { name: "CDL Training", duration: "4 weeks", funding: "WIOA", href: "/programs/cdl" },
];

const quickLinks = [
  { label: "For Students", href: "/learners", icon: GraduationCap },
  { label: "For Employers", href: "/employers", icon: Briefcase },
  { label: "About Us", href: "/about", icon: Heart },
  { label: "Contact", href: "/contact", icon: Phone },
];
