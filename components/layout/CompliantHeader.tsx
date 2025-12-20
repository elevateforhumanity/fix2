"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, Phone, Mail } from "lucide-react";
import { SiteLogo } from "@/components/site/logo";

export default function CompliantHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const navigation = [
    {
      label: "Programs",
      href: "/programs",
      items: [
        { label: "All Programs", href: "/programs" },
        { label: "Healthcare", href: "/programs?category=healthcare" },
        { label: "Skilled Trades", href: "/programs?category=trades" },
        { label: "Business & Technology", href: "/programs?category=business" },
        { label: "Apprenticeships", href: "/apprenticeships" },
      ]
    },
    {
      label: "Eligibility & Funding",
      href: "/funding",
      items: [
        { label: "WIOA Eligibility", href: "/funding/wioa" },
        { label: "Workforce Ready Grant", href: "/funding/wrg" },
        { label: "Financial Aid", href: "/financial-aid" },
        { label: "Check Eligibility", href: "/eligibility" },
      ]
    },
    {
      label: "For Employers",
      href: "/employers",
      items: [
        { label: "Hire Our Graduates", href: "/employers" },
        { label: "On-the-Job Training", href: "/employers/ojt" },
        { label: "Apprenticeships", href: "/employers/apprenticeships" },
        { label: "Employer Portal", href: "/employer/dashboard" },
      ]
    },
    {
      label: "Student Services",
      href: "/student",
      items: [
        { label: "Student Dashboard", href: "/student/dashboard" },
        { label: "Career Counseling", href: "/services/career-counseling" },
        { label: "Job Placement", href: "/services/job-placement" },
        { label: "Support Services", href: "/services/support" },
      ]
    },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Top Bar - Contact Info */}
      <div className="bg-blue-600 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <a href="tel:+13173143757" className="flex items-center gap-2 hover:text-blue-200">
                <Phone className="w-4 h-4" />
                <span>(317) 314-3757</span>
              </a>
              <a href="mailto:Elevate4humanityedu@gmail.com" className="hidden md:flex items-center gap-2 hover:text-blue-200">
                <Mail className="w-4 h-4" />
                <span>Elevate4humanityedu@gmail.com</span>
              </a>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs">ETPL Approved Provider • DOL Registered</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <SiteLogo className="h-14 w-auto" />
              <div className="leading-tight">
                <div className="font-bold text-gray-900 text-lg">
                  Elevate For Humanity
                </div>
                <div className="text-xs text-gray-600">
                  Career & Technical Institute
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navigation.map((section) => {
                const isActive = pathname?.startsWith(section.href || "");

                if (!section.items || section.items.length === 0) {
                  return (
                    <Link
                      key={section.label}
                      href={section.href || "/"}
                      className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                        isActive
                          ? "text-blue-600 bg-blue-50"
                          : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                      }`}
                    >
                      {section.label}
                    </Link>
                  );
                }

                const isOpen = openMenu === section.label;

                return (
                  <div
                    key={section.label}
                    className="relative"
                    onMouseEnter={() => setOpenMenu(section.label)}
                    onMouseLeave={() => setOpenMenu(null)}
                  >
                    <button
                      className={`flex items-center gap-1 px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                        isActive
                          ? "text-blue-600 bg-blue-50"
                          : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                      }`}
                    >
                      {section.label}
                      <ChevronDown className="w-4 h-4" />
                    </button>

                    {/* Dropdown */}
                    {isOpen && (
                      <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                        {section.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                href="/apply"
                className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
              >
                Apply Now
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-gray-700"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileOpen && (
            <div className="lg:hidden py-4 border-t">
              <nav className="flex flex-col gap-2">
                {navigation.map((section) => (
                  <div key={section.label}>
                    <Link
                      href={section.href || "/"}
                      className="block px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-lg"
                      onClick={() => setMobileOpen(false)}
                    >
                      {section.label}
                    </Link>
                    {section.items && section.items.length > 0 && (
                      <div className="ml-4 mt-1 space-y-1">
                        {section.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                            onClick={() => setMobileOpen(false)}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <Link
                  href="/apply"
                  className="mt-4 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg text-center"
                  onClick={() => setMobileOpen(false)}
                >
                  Apply Now
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
