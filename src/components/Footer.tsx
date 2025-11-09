/**
 * Footer Component
 * Professional footer with contact info, social links, and navigation
 */

import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Linkedin, Youtube, Instagram, Twitter } from 'lucide-react';
import { footerSections, socialLinks as defaultSocialLinks, branding } from '../config/navigation';

interface FooterProps {
  logo?: string;
  logoAlt?: string;
  sections?: typeof footerSections;
  socialLinks?: typeof defaultSocialLinks;
  className?: string;
}

export default function Footer({
  logo = '/logo.svg',
  logoAlt = branding.name,
  sections = footerSections,
  socialLinks = defaultSocialLinks,
  className = '',
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  const socialIcons = {
    facebook: Facebook,
    linkedin: Linkedin,
    youtube: Youtube,
    instagram: Instagram,
    twitter: Twitter,
  };

  return (
    <footer className={`bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white ${className}`}>
      <div className="container py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-12">
          {/* Company Info - Takes 4 columns */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block mb-6">
              <img
                src={logo}
                alt={logoAlt}
                className="h-8 w-auto brightness-0 invert"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = `
                    <span class="text-xl font-bold">${logoAlt}</span>
                  `;
                }}
              />
            </Link>
            <h2 className="text-2xl font-bold mb-2">{branding.name}</h2>
            <p className="text-sm text-orange-400 mb-4">{branding.subtitle}</p>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              {branding.tagline}. 100% funded programs for {branding.location}.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a 
                href={`tel:${branding.phoneRaw}`}
                className="flex items-center gap-3 text-sm text-gray-300 hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-orange-600/20 flex items-center justify-center group-hover:bg-orange-600/30 transition-colors">
                  <Phone className="h-5 w-5 text-orange-400" />
                </div>
                <div>
                  <div className="text-xs text-gray-500">Call Us</div>
                  <div className="font-medium">{branding.phone}</div>
                </div>
              </a>
              
              <a 
                href={`mailto:${branding.email}`}
                className="flex items-center gap-3 text-sm text-gray-300 hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-orange-600/20 flex items-center justify-center group-hover:bg-orange-600/30 transition-colors">
                  <Mail className="h-5 w-5 text-orange-400" />
                </div>
                <div>
                  <div className="text-xs text-gray-500">Email Us</div>
                  <div className="font-medium">{branding.email}</div>
                </div>
              </a>
              
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <div className="w-10 h-10 rounded-lg bg-orange-600/20 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-orange-400" />
                </div>
                <div>
                  <div className="text-xs text-gray-500">Location</div>
                  <div className="font-medium">{branding.location}</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer Sections - Takes 8 columns */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {sections.map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-orange-400">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="text-sm text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        {/* Social Media & Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <p className="text-sm text-gray-400">
              © {currentYear} {branding.name}. All rights reserved.
            </p>
            
            {/* Social Links with Icons */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500 mr-2">Follow Us:</span>
              {Object.entries(socialLinks).map(([platform, url]) => {
                const Icon = socialIcons[platform as keyof typeof socialIcons];
                return Icon ? (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-800 hover:bg-orange-600 flex items-center justify-center transition-all hover:scale-110"
                    aria-label={platform.charAt(0).toUpperCase() + platform.slice(1)}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ) : null;
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
