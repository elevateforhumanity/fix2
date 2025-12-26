'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';

const footerLinks = {
  programs: {
    title: 'Programs',
    links: [
      { name: 'All Programs', href: '/programs' },
      { name: 'Healthcare', href: '/programs?category=healthcare' },
      { name: 'Skilled Trades', href: '/programs?category=trades' },
      { name: 'Beauty & Wellness', href: '/programs?category=beauty' },
      { name: 'Business & Finance', href: '/programs?category=business' },
      { name: 'Compare Programs', href: '/compare-programs' },
    ],
  },
  students: {
    title: 'For Students',
    links: [
      { name: 'Apply Now', href: '/apply' },
      { name: 'Student Portal', href: '/student-portal' },
      { name: 'Career Services', href: '/career-services' },
      { name: 'Financial Aid', href: '/funding' },
      { name: 'Student Handbook', href: '/student-handbook' },
      { name: 'Support & FAQs', href: '/faq' },
    ],
  },
  partners: {
    title: 'Partners',
    links: [
      { name: 'For Employers', href: '/employers' },
      { name: 'Hire Graduates', href: '/hire-graduates' },
      { name: 'Training Providers', href: '/training-providers' },
      { name: 'Workforce Boards', href: '/workforce-partners' },
      { name: 'Partner Portal', href: '/partner' },
      { name: 'Partner With Us', href: '/partner-with-us' },
    ],
  },
  company: {
    title: 'Company',
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Team', href: '/team' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Blog & News', href: '/blog' },
      { name: 'Careers', href: '/careers' },
      { name: 'Annual Report', href: '/annual-report' },
    ],
  },
  legal: {
    title: 'Legal',
    links: [
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms of Service', href: '/terms-of-service' },
      { name: 'Accessibility', href: '/accessibility' },
      { name: 'Refund Policy', href: '/refund-policy' },
      { name: 'FERPA Compliance', href: '/ferpa' },
      { name: 'Academic Integrity', href: '/academic-integrity' },
    ],
  },
};

const socialLinks = [
  {
    name: 'Facebook',
    href: 'https://facebook.com/elevateforhumanity',
    icon: Facebook,
  },
  {
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/elevateforhumanity',
    icon: Instagram,
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/elevate-for-humanity',
    icon: Linkedin,
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@elevateforhumanity',
    icon: Youtube,
  },
];

export function ModernFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-3 mb-6 group"
            >
              <div className="relative w-12 h-12">
                <Image
                  src="/images/logo.png"
                  alt="Elevate for Humanity"
                  fill
                  className="object-contain group-hover:scale-110 transition-transform"
                />
              </div>
              <div>
                <div className="font-black text-xl">Elevate</div>
                <div className="text-sm text-slate-400 -mt-1">For Humanity</div>
              </div>
            </Link>

            <p className="text-slate-400 mb-6 leading-relaxed">
              Transforming lives through 100% funded career training. No debt.
              Real jobs. Start earning fast.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <a
                href="mailto:Elevate4humanityedu@gmail.com"
                className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">Elevate4humanityedu@gmail.com</span>
              </a>
              <a
                href="tel:+13175551234"
                className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors"
              >
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">(317) 314-3757</span>
              </a>
              <div className="flex items-start gap-3 text-slate-400">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Indianapolis, IN</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-slate-800 hover:bg-brand-orange-600 rounded-lg transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Programs Column */}
          <div>
            <h3 className="font-bold text-white mb-4">
              {footerLinks.programs.title}
            </h3>
            <ul className="space-y-3">
              {footerLinks.programs.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Students Column */}
          <div>
            <h3 className="font-bold text-white mb-4">
              {footerLinks.students.title}
            </h3>
            <ul className="space-y-3">
              {footerLinks.students.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Partners Column */}
          <div>
            <h3 className="font-bold text-white mb-4">
              {footerLinks.partners.title}
            </h3>
            <ul className="space-y-3">
              {footerLinks.partners.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-bold text-white mb-4">
              {footerLinks.company.title}
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-slate-800 rounded-2xl p-8 mb-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-2">Stay Updated</h3>
            <p className="text-slate-400 mb-6">
              Get the latest program updates, success stories, and career tips
              delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                Content="Enter your email"
                className="flex-1 px-6 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white Content-slate-500 focus:outline-none focus:border-red-500 transition-colors"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-brand-orange-600 hover:bg-brand-orange-700 text-white font-bold rounded-lg transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 pb-12 border-b border-slate-800">
          <div className="text-center">
            <div className="text-3xl font-black text-white mb-1">30+</div>
            <div className="text-sm text-slate-400">Training Programs</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-white mb-1">100%</div>
            <div className="text-sm text-slate-400">Funded Training</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-white mb-1">$0</div>
            <div className="text-sm text-slate-400">Cost to Students</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-white mb-1">1000+</div>
            <div className="text-sm text-slate-400">Graduates Placed</div>
          </div>
        </div>

        {/* Legal Links */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8">
          {footerLinks.legal.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-slate-500">
          <p>© {currentYear} Elevate for Humanity. All rights reserved.</p>
          <p className="mt-2">
            A 501(c)(3) nonprofit organization dedicated to workforce
            development and career training.
          </p>
        </div>
      </div>

      {/* Accreditation Bar */}
      <div className="bg-slate-950 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 text-xs text-slate-500">
            <span>WIOA Approved Provider</span>
            <span>•</span>
            <span>State Licensed</span>
            <span>•</span>
            <span>Nationally Accredited Programs</span>
            <span>•</span>
            <span>FERPA Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
