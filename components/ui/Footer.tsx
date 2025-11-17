import React from 'react';
import Link from 'next/link';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    programs: [
      { name: 'Healthcare Programs', href: '/programs?category=healthcare' },
      { name: 'Skilled Trades', href: '/programs?category=trades' },
      { name: 'Technology', href: '/programs?category=technology' },
      { name: 'Business & Admin', href: '/programs?category=business' },
      { name: 'All Programs', href: '/programs' },
    ],
    resources: [
      { name: 'WIOA Eligibility', href: '/wioa-eligibility' },
      { name: 'Financial Aid', href: '/financial-aid' },
      { name: 'Career Services', href: '/career-services' },
      { name: 'Success Stories', href: '/success-stories' },
      { name: 'FAQ', href: '/faq' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Mission', href: '/about#mission' },
      { name: 'Partners', href: '/about#partners' },
      { name: 'Contact', href: '/contact' },
      { name: 'Careers', href: '/careers' },
    ],
    employers: [
      { name: 'Hire Our Graduates', href: '/employers' },
      { name: 'Partner With Us', href: '/employers/partner' },
      { name: 'Post a Job', href: '/employers/post-job' },
      { name: 'Employer Resources', href: '/employers/resources' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Accessibility', href: '/accessibility' },
      { name: 'Non-Discrimination', href: '/non-discrimination' },
    ],
  };

  const socialLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      href: 'https://facebook.com/elevateconnects',
    },
    {
      name: 'Twitter',
      icon: Twitter,
      href: 'https://twitter.com/elevateconnects',
    },
    {
      name: 'Instagram',
      icon: Instagram,
      href: 'https://instagram.com/elevateconnects',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://linkedin.com/company/elevateconnects',
    },
    {
      name: 'YouTube',
      icon: Youtube,
      href: 'https://youtube.com/@elevateconnects',
    },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Newsletter Section */}
      <div className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:max-w-xl">
              <h3 className="text-2xl font-bold text-white mb-2">
                Stay Connected
              </h3>
              <p className="text-slate-400">
                Get updates on new programs, success stories, and career
                opportunities.
              </p>
            </div>
            <div className="mt-6 lg:mt-0 lg:ml-8">
              <form className="sm:flex sm:max-w-md">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  type="email"
                  name="email-address"
                  id="email-address"
                  autoComplete="email"
                  required
                  className="w-full px-4 py-3 border border-slate-700 rounded-lg bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
                <button
                  type="submit"
                  className="mt-3 sm:mt-0 sm:ml-3 w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-medium rounded-lg hover:from-red-600 hover:to-orange-600 transition-all whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Programs */}
          <div>
            <h4 className="text-white font-semibold mb-4">Programs</h4>
            <ul className="space-y-3">
              {footerLinks.programs.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Employers */}
          <div>
            <h4 className="text-white font-semibold mb-4">For Employers</h4>
            <ul className="space-y-3">
              {footerLinks.employers.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="lg:flex lg:items-center lg:justify-between">
            {/* Logo & Description */}
            <div className="lg:max-w-md">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-10 w-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">E</span>
                </div>
                <div>
                  <span className="text-lg font-bold text-white">
                    Elevate Connects Directory
                  </span>
                </div>
              </div>
              <p className="text-sm text-slate-400">
                Empowering Wisconsin's workforce through WIOA-funded training
                programs. Building careers, strengthening communities.
              </p>
              <p className="text-sm text-slate-500 mt-2">
                An Equal Opportunity Employer/Program. Auxiliary aids and
                services available upon request to individuals with
                disabilities.
              </p>
            </div>

            {/* Social Links */}
            <div className="mt-6 lg:mt-0">
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-white transition-colors"
                      aria-label={social.name}
                    >
                      <Icon className="h-6 w-6" />
                    </a>
                  );
                })}
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-slate-400">
                <Mail className="h-4 w-4" />
                <a
                  href="mailto:info@elevateconnects.org"
                  className="hover:text-white transition-colors"
                >
                  info@elevateconnects.org
                </a>
              </div>
              <p className="text-sm text-slate-400 mt-2">(608) 555-0100</p>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
            <p>
              © {currentYear} Elevate Connects Directory. All rights reserved.
              {' | '}
              Funded by the Workforce Innovation and Opportunity Act (WIOA)
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
