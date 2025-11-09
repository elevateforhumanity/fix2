/**
 * Durable Footer Component
 * Professional footer matching the main Footer component style
 */

import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Linkedin, Youtube, Instagram, Twitter } from 'lucide-react';
import { footerSections, socialLinks as defaultSocialLinks, branding } from '../config/navigation';
import '../styles/durable-design.css';

export default function DurableFooter() {
  const currentYear = new Date().getFullYear();

  const socialIcons = {
    facebook: Facebook,
    linkedin: Linkedin,
    youtube: Youtube,
    instagram: Instagram,
    twitter: Twitter,
  };

  return (
    <footer className="footer" style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)' }}>
      <div className="container" style={{ padding: '4rem 1rem' }}>
        {/* Top Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
          {/* Company Info */}
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'white' }}>
              {branding.name}
            </h2>
            <p style={{ fontSize: '0.875rem', color: '#fb923c', marginBottom: '1rem' }}>
              {branding.subtitle}
            </p>
            <p style={{ fontSize: '0.875rem', color: '#9ca3af', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              {branding.tagline}. 100% funded programs for {branding.location}.
            </p>
            
            {/* Contact Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a 
                href={`tel:${branding.phoneRaw}`}
                style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#d1d5db', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#d1d5db'}
              >
                <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.5rem', background: 'rgba(251, 146, 60, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Phone style={{ width: '1.25rem', height: '1.25rem', color: '#fb923c' }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Call Us</div>
                  <div style={{ fontWeight: '500' }}>{branding.phone}</div>
                </div>
              </a>
              
              <a 
                href={`mailto:${branding.email}`}
                style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#d1d5db', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#d1d5db'}
              >
                <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.5rem', background: 'rgba(251, 146, 60, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Mail style={{ width: '1.25rem', height: '1.25rem', color: '#fb923c' }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Email Us</div>
                  <div style={{ fontWeight: '500' }}>{branding.email}</div>
                </div>
              </a>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#d1d5db' }}>
                <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.5rem', background: 'rgba(251, 146, 60, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MapPin style={{ width: '1.25rem', height: '1.25rem', color: '#fb923c' }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Location</div>
                  <div style={{ fontWeight: '500' }}>{branding.location}</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem', color: '#fb923c' }}>
                {section.title}
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {section.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      style={{ fontSize: '0.875rem', color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Social Media & Bottom Section */}
        <div style={{ borderTop: '1px solid #374151', paddingTop: '2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
            {/* Copyright */}
            <p style={{ fontSize: '0.875rem', color: '#9ca3af', textAlign: 'center' }}>
              © {currentYear} {branding.name}. All rights reserved.
            </p>
            
            {/* Social Links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <span style={{ fontSize: '0.875rem', color: '#6b7280', marginRight: '0.5rem' }}>Follow Us:</span>
              {Object.entries(defaultSocialLinks).map(([platform, url]) => {
                const Icon = socialIcons[platform as keyof typeof socialIcons];
                return Icon ? (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ 
                      width: '2.5rem', 
                      height: '2.5rem', 
                      borderRadius: '50%', 
                      background: '#1f2937', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      transition: 'all 0.2s',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#ea580c';
                      e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#1f2937';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                    aria-label={platform.charAt(0).toUpperCase() + platform.slice(1)}
                  >
                    <Icon style={{ width: '1.25rem', height: '1.25rem', color: 'white' }} />
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
