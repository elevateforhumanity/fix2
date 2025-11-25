"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu, X, ChevronDown, ChevronRight, 
  GraduationCap, Briefcase, DollarSign, Users,
  Phone, Mail, MapPin, ExternalLink, Home,
  BookOpen, Award, Settings, LogIn, UserPlus
} from "lucide-react";
import { ObfuscatedEmail } from "@/components/ui/ObfuscatedEmail";

interface NavSection {
  title: string;
  icon: any;
  links: { href: string; label: string; }[];
}

export function PremiumMobileNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on route change
  useEffect(() => {
    setIsOpen(false);
    setExpandedSection(null);
  }, [pathname]);

  const sections: NavSection[] = [
    {
      title: "Programs",
      icon: GraduationCap,
      links: [
        { href: "/programs/barber-apprenticeship", label: "Barber Apprenticeship" },
        { href: "/programs/hvac-technician", label: "HVAC Technician" },
        { href: "/programs/medical-assistant", label: "Medical Assistant" },
        { href: "/programs/cna", label: "CNA Training" },
        { href: "/programs/cdl", label: "CDL Training" },
        { href: "/programs/phlebotomy", label: "Phlebotomy" },
        { href: "/programs/dental-assistant", label: "Dental Assistant" },
        { href: "/programs/ekg-technician", label: "EKG Technician" },
        { href: "/micro-classes", label: "Micro Classes" },
        { href: "/programs", label: "View All Programs" },
      ],
    },
    {
      title: "Funding",
      icon: DollarSign,
      links: [
        { href: "/funding/wioa", label: "WIOA Funding" },
        { href: "/funding/wrg", label: "WRG Funding" },
        { href: "/funding/jri", label: "JRI Funding" },
        { href: "/funding/dol", label: "DOL Programs" },
        { href: "/funding/federal-programs", label: "Federal Programs" },
        { href: "/funding/state-programs", label: "State Programs" },
        { href: "/funding", label: "All Funding Options" },
      ],
    },
    {
      title: "Resources",
      icon: BookOpen,
      links: [
        { href: "/students", label: "For Students" },
        { href: "/employers", label: "For Employers" },
        { href: "/about", label: "About Us" },
        { href: "/success-stories", label: "Success Stories" },
        { href: "/faq", label: "FAQ" },
        { href: "/blog", label: "Blog" },
        { href: "/help", label: "Help Center" },
      ],
    },
  ];

  const toggleSection = (title: string) => {
    setExpandedSection(expandedSection === title ? null : title);
  };

  return (
    <>
      {/* Mobile Menu Button - Only visible on mobile */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
        aria-label="Open menu"
      >
        <Menu size={24} className="text-slate-700" />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] md:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Slide-out Menu */}
      <div
        className={`
          fixed top-0 right-0 bottom-0 w-[320px] max-w-[85vw] bg-white z-[101] md:hidden
          transform transition-transform duration-300 ease-out shadow-2xl
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-gradient-to-r from-red-600 to-blue-600">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
                <span className="text-red-600 font-black text-sm">EFH</span>
              </div>
              <div className="text-white">
                <div className="font-bold text-sm">Elevate</div>
                <div className="text-xs opacity-90">For Humanity</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg hover:bg-white/20 transition-colors"
              aria-label="Close menu"
            >
              <X size={24} className="text-white" />
            </button>
          </div>

          {/* Quick Actions */}
          <div className="p-4 bg-slate-50 border-b border-slate-200">
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/apply"
                className="flex items-center justify-center gap-2 px-4 py-3 bg-red-600 rounded-xl font-bold text-sm hover:bg-red-700 transition-colors shadow-lg"
                style={{ color: '#FFFFFF' }}
                onClick={() => setIsOpen(false)}
              >
                <UserPlus size={18} style={{ color: '#FFFFFF' }} />
                <span style={{ color: '#FFFFFF' }}>Apply Now</span>
              </Link>
              <a
                href="https://elevateforhumanityeducation.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors shadow-lg"
              >
                <BookOpen size={18} />
                LMS
              </a>
            </div>
          </div>

          {/* Navigation Sections */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {/* Home Link */}
            <Link
              href="/"
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                ${pathname === "/" 
                  ? "bg-red-50 text-red-600 font-semibold" 
                  : "text-slate-700 hover:bg-slate-100"
                }
              `}
              onClick={() => setIsOpen(false)}
            >
              <Home size={20} />
              <span>Home</span>
            </Link>

            {/* Expandable Sections */}
            {sections.map((section) => {
              const Icon = section.icon;
              const isExpanded = expandedSection === section.title;
              
              return (
                <div key={section.title} className="space-y-1">
                  <button
                    onClick={() => toggleSection(section.title)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-100 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={20} />
                      <span className="font-semibold">{section.title}</span>
                    </div>
                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-200 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  
                  {/* Animated Dropdown */}
                  <div
                    className={`
                      overflow-hidden transition-all duration-300 ease-in-out
                      ${isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
                    `}
                  >
                    <div className="pl-4 space-y-1 py-1">
                      {section.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={`
                            flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all
                            ${pathname === link.href
                              ? "bg-red-50 text-red-600 font-medium"
                              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            }
                          `}
                          onClick={() => setIsOpen(false)}
                        >
                          <ChevronRight size={14} />
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Direct Links */}
            <Link
              href="/admin"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-100 transition-all"
              onClick={() => setIsOpen(false)}
            >
              <Settings size={20} />
              <span className="font-semibold">Admin</span>
            </Link>

            <Link
              href="/contact"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-100 transition-all"
              onClick={() => setIsOpen(false)}
            >
              <Mail size={20} />
              <span className="font-semibold">Contact</span>
            </Link>
          </nav>

          {/* Contact Info Footer */}
          <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-3">
            <a
              href="tel:+13173143757"
              className="flex items-center gap-3 text-slate-700 hover:text-red-600 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                <Phone size={18} className="text-red-600" />
              </div>
              <div>
                <div className="text-xs text-slate-500">Call Us</div>
                <div className="font-bold text-sm">(317) 314-3757</div>
              </div>
            </a>

            <Link
              href="/contact"
              className="flex items-center gap-3 text-slate-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Mail size={18} className="text-blue-600" />
              </div>
              <div>
                <div className="text-xs text-slate-500">Email Us</div>
                <div className="font-bold text-sm">Contact Form</div>
              </div>
            </Link>

            <a
              href="https://indianaconnect.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-red-600 to-blue-600 text-white rounded-xl font-bold text-sm hover:shadow-lg transition-all"
            >
              Schedule Appointment
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
