import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/durable-design.css';

export default function HomeDurable() {
  return (
    <div className="home-durable">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Ignite Your Future: Transform Your Career Today
            </h1>
            <p className="hero-subtitle">
              Empower your dreams with federally-funded workforce training
              programs. Build in-demand skills, earn industry certifications,
              and launch a rewarding career—at $0 cost with approved funding.
            </p>
            <div className="flex flex-wrap gap-6 justify-center mb-8">
              <span
                className="px-4 py-2 rounded"
                style={{
                  background: 'var(--color-beige)',
                  color: 'var(--color-brown)',
                  fontWeight: 500,
                }}
              >
                💰 100% Funded
              </span>
              <span
                className="px-4 py-2 rounded"
                style={{
                  background: 'var(--color-beige)',
                  color: 'var(--color-brown)',
                  fontWeight: 500,
                }}
              >
                📜 8 Career Pathways
              </span>
              <span
                className="px-4 py-2 rounded"
                style={{
                  background: 'var(--color-beige)',
                  color: 'var(--color-brown)',
                  fontWeight: 500,
                }}
              >
                🎯 92% Job Placement
              </span>
              <span
                className="px-4 py-2 rounded"
                style={{
                  background: 'var(--color-beige)',
                  color: 'var(--color-brown)',
                  fontWeight: 500,
                }}
              >
                📍 Marion County, IN
              </span>
            </div>
            <div className="flex flex-wrap gap-6 justify-center">
              <Link to="/apply" className="button">
                Start Your Application
              </Link>
              <Link to="/programs" className="button button-secondary">
                Explore Programs
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="section" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <div className="flex flex-wrap gap-8 justify-center">
            <div className="text-center" style={{ flex: '1 1 200px' }}>
              <div
                style={{
                  fontSize: '3rem',
                  fontWeight: 700,
                  color: 'var(--color-brown)',
                }}
              >
                5,000+
              </div>
              <div style={{ fontSize: '1.125rem', opacity: 0.8 }}>
                Graduates
              </div>
            </div>
            <div className="text-center" style={{ flex: '1 1 200px' }}>
              <div
                style={{
                  fontSize: '3rem',
                  fontWeight: 700,
                  color: 'var(--color-brown)',
                }}
              >
                92%
              </div>
              <div style={{ fontSize: '1.125rem', opacity: 0.8 }}>
                Job Placement Rate
              </div>
            </div>
            <div className="text-center" style={{ flex: '1 1 200px' }}>
              <div
                style={{
                  fontSize: '3rem',
                  fontWeight: 700,
                  color: 'var(--color-brown)',
                }}
              >
                8
              </div>
              <div style={{ fontSize: '1.125rem', opacity: 0.8 }}>
                Career Programs
              </div>
            </div>
            <div className="text-center" style={{ flex: '1 1 200px' }}>
              <div
                style={{
                  fontSize: '3rem',
                  fontWeight: 700,
                  color: 'var(--color-brown)',
                }}
              >
                $0
              </div>
              <div style={{ fontSize: '1.125rem', opacity: 0.8 }}>
                Cost with Funding
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Mission Section */}
      <section className="section" style={{ background: 'var(--color-green)' }}>
        <div className="container">
          <div className="mx-auto" style={{ maxWidth: '800px' }}>
            <h2 className="section-title text-center">
              Empowering Futures Through Skill Development
            </h2>
            <p className="body-large text-center">
              At Elevate for Humanity Career and Technical Institute, we bridge
              the gap between education and employment by providing innovative
              apprenticeship and training programs. Located in Marion County,
              IN, our mission is to empower individuals with the skills they
              need to excel in today's dynamic workforce. By investing in human
              potential, we transform lives and build a more skilled,
              sustainable community.
            </p>
          </div>
        </div>
      </section>
      {/* Programs Preview */}
      <section className="section">
        <div className="container">
          <h2 className="section-title text-center">Our Career Programs</h2>
          <p className="section-subtitle text-center">
            Choose from 8 high-demand career pathways with 100% funding
            available
          </p>
          <div className="flex flex-wrap gap-8" style={{ marginTop: '3rem' }}>
            {/* Barber Apprenticeship */}
            <div
              className="program-card"
              style={{ flex: '1 1 calc(33.333% - 2rem)', minWidth: '280px' }}
            >
              <div className="program-icon">🪒</div>
              <h3 className="program-title">Barber Apprenticeship</h3>
              <p
                className="body-small"
                style={{ opacity: 0.8, marginBottom: '1rem' }}
              >
                2,000 hours • State Licensure
              </p>
              <p style={{ marginBottom: '1rem' }}>
                Earn while you learn. Master professional barbering skills and
                qualify for Indiana State Licensure.
              </p>
              <div className="program-funding">
                💰 WRG • WIOA • Apprenticeship
              </div>
              <Link
                to="/programs/barber"
                className="button"
                style={{ marginTop: '1.5rem', width: '100%' }}
              >
                Learn More →
              </Link>
            </div>
            {/* Building Services */}
            <div
              className="program-card"
              style={{ flex: '1 1 calc(33.333% - 2rem)', minWidth: '280px' }}
            >
              <div className="program-icon">🏗️</div>
              <h3 className="program-title">Building Services Technician</h3>
              <p
                className="body-small"
                style={{ opacity: 0.8, marginBottom: '1rem' }}
              >
                8-16 weeks • Multi-Trade
              </p>
              <p style={{ marginBottom: '1rem' }}>
                Cross-trained in electrical, HVAC, plumbing, welding, and
                construction.
              </p>
              <div className="program-funding">💰 WRG • WIOA</div>
              <Link
                to="/programs/building-tech"
                className="button"
                style={{ marginTop: '1.5rem', width: '100%' }}
              >
                Learn More →
              </Link>
            </div>
            {/* HVAC & Welding */}
            <div
              className="program-card"
              style={{ flex: '1 1 calc(33.333% - 2rem)', minWidth: '280px' }}
            >
              <div className="program-icon">🔥</div>
              <h3 className="program-title">HVAC & Welding</h3>
              <p
                className="body-small"
                style={{ opacity: 0.8, marginBottom: '1rem' }}
              >
                8-16 weeks • EPA Certified
              </p>
              <p style={{ marginBottom: '1rem' }}>
                Master heating, ventilation, AC systems and professional welding
                techniques.
              </p>
              <div className="program-funding">💰 WRG • WIOA</div>
              <Link
                to="/programs/hvac"
                className="button"
                style={{ marginTop: '1.5rem', width: '100%' }}
              >
                Learn More →
              </Link>
            </div>
            {/* Healthcare CNA/QMA */}
            <div
              className="program-card"
              style={{ flex: '1 1 calc(33.333% - 2rem)', minWidth: '280px' }}
            >
              <div className="program-icon">🏥</div>
              <h3 className="program-title">Healthcare (CNA/QMA)</h3>
              <p
                className="body-small"
                style={{ opacity: 0.8, marginBottom: '1rem' }}
              >
                4-8 weeks • State Licensed
              </p>
              <p style={{ marginBottom: '1rem' }}>
                Launch your healthcare career as a Certified Nursing Assistant.
              </p>
              <div className="program-funding">💰 WRG • WIOA</div>
              <Link
                to="/programs/healthcare"
                className="button"
                style={{ marginTop: '1.5rem', width: '100%' }}
              >
                Learn More →
              </Link>
            </div>
            {/* Drug Testing Business */}
            <div
              className="program-card"
              style={{ flex: '1 1 calc(33.333% - 2rem)', minWidth: '280px' }}
            >
              <div className="program-icon">💼</div>
              <h3 className="program-title">Drug Testing Business</h3>
              <p
                className="body-small"
                style={{ opacity: 0.8, marginBottom: '1rem' }}
              >
                2-4 weeks • Entrepreneurship
              </p>
              <p style={{ marginBottom: '1rem' }}>
                Start your own mobile drug testing business serving employers
                and courts.
              </p>
              <div className="program-funding">💰 WRG • WIOA</div>
              <Link
                to="/programs/drug-testing"
                className="button"
                style={{ marginTop: '1.5rem', width: '100%' }}
              >
                Learn More →
              </Link>
            </div>
            {/* Digital Skills */}
            <div
              className="program-card"
              style={{ flex: '1 1 calc(33.333% - 2rem)', minWidth: '280px' }}
            >
              <div className="program-icon">💻</div>
              <h3 className="program-title">Digital Skills</h3>
              <p
                className="body-small"
                style={{ opacity: 0.8, marginBottom: '1rem' }}
              >
                4-8 weeks • Tech Skills
              </p>
              <p style={{ marginBottom: '1rem' }}>
                Master essential digital tools and prepare for remote work
                opportunities.
              </p>
              <div className="program-funding">💰 WRG • WIOA</div>
              <Link
                to="/programs/digital"
                className="button"
                style={{ marginTop: '1.5rem', width: '100%' }}
              >
                Learn More →
              </Link>
            </div>
            {/* Leadership Development */}
            <div
              className="program-card"
              style={{ flex: '1 1 calc(33.333% - 2rem)', minWidth: '280px' }}
            >
              <div className="program-icon">👔</div>
              <h3 className="program-title">Leadership Development</h3>
              <p
                className="body-small"
                style={{ opacity: 0.8, marginBottom: '1rem' }}
              >
                6-12 weeks • Management
              </p>
              <p style={{ marginBottom: '1rem' }}>
                Develop essential leadership skills and advance your career.
              </p>
              <div className="program-funding">💰 WRG • WIOA</div>
              <Link
                to="/programs/leadership"
                className="button"
                style={{ marginTop: '1.5rem', width: '100%' }}
              >
                Learn More →
              </Link>
            </div>
            {/* CPRS */}
            <div
              className="program-card"
              style={{
                flex: '1 1 calc(33.333% - 2rem)',
                minWidth: '280px',
                border: '2px solid var(--color-brown)',
              }}
            >
              <div
                style={{
                  background: 'var(--color-brown)',
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '4px',
                  display: 'inline-block',
                  marginBottom: '1rem',
                  fontSize: '0.875rem',
                }}
              >
                Launching Dec 2025
              </div>
              <div className="program-icon">🎯</div>
              <h3 className="program-title">
                Certified Peer Recovery Specialist
              </h3>
              <p
                className="body-small"
                style={{ opacity: 0.8, marginBottom: '1rem' }}
              >
                80 hours • State Certified
              </p>
              <p style={{ marginBottom: '1rem' }}>
                Help others overcome addiction through peer support and recovery
                coaching.
              </p>
              <div className="program-funding">💰 WRG • WIOA</div>
              <Link
                to="/programs/cprs"
                className="button"
                style={{ marginTop: '1.5rem', width: '100%' }}
              >
                Learn More →
              </Link>
            </div>
          </div>
          <div className="text-center" style={{ marginTop: '3rem' }}>
            <Link
              to="/programs"
              className="button"
              style={{ padding: '1.25rem 3rem', fontSize: '1.125rem' }}
            >
              View All Programs
            </Link>
          </div>
        </div>
      </section>
      {/* Testimonials */}
      <section className="section" style={{ background: 'var(--color-cream)' }}>
        <div className="container">
          <h2 className="section-title text-center">Success Stories</h2>
          <p className="section-subtitle text-center">
            Hear from graduates who transformed their careers
          </p>
          <div className="flex flex-wrap gap-8" style={{ marginTop: '3rem' }}>
            <div
              className="testimonial-card"
              style={{ flex: '1 1 calc(33.333% - 2rem)', minWidth: '280px' }}
            >
              <div
                style={{ color: 'var(--color-brown)', marginBottom: '1rem' }}
              >
                ⭐⭐⭐⭐⭐
              </div>
              <p className="testimonial-text">
                "The support from Elevate for Humanity has been transformative.
                Their funding allowed me to enroll in a high-quality
                apprenticeship program, setting me on a path to a fulfilling
                career. Their dedication to student success is unmatched."
              </p>
              <div className="testimonial-author">
                <strong>Jordan Lee</strong>
                <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>
                  Barber Apprenticeship Graduate
                </div>
              </div>
            </div>
            <div
              className="testimonial-card"
              style={{ flex: '1 1 calc(33.333% - 2rem)', minWidth: '280px' }}
            >
              <div
                style={{ color: 'var(--color-brown)', marginBottom: '1rem' }}
              >
                ⭐⭐⭐⭐⭐
              </div>
              <p className="testimonial-text">
                "Elevate for Humanity provided essential funding that opened
                doors to my dream apprenticeship. Their commitment to empowering
                individuals with career opportunities is truly inspiring, and
                their support has been pivotal in advancing my professional
                journey."
              </p>
              <div className="testimonial-author">
                <strong>Alex Morgan</strong>
                <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>
                  HVAC Technician
                </div>
              </div>
            </div>
            <div
              className="testimonial-card"
              style={{ flex: '1 1 calc(33.333% - 2rem)', minWidth: '280px' }}
            >
              <div
                style={{ color: 'var(--color-brown)', marginBottom: '1rem' }}
              >
                ⭐⭐⭐⭐⭐
              </div>
              <p className="testimonial-text">
                "Elevate for Humanity's funding was a game-changer for me. It
                enabled my participation in an incredible training program that
                propelled my career forward. Their unwavering support and
                commitment to individual growth are exceptional."
              </p>
              <div className="testimonial-author">
                <strong>Taylor Rivers</strong>
                <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>
                  Building Services Technician
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section
        className="section"
        style={{ background: 'var(--color-brown)', color: 'white' }}
      >
        <div className="container">
          <div className="mx-auto text-center" style={{ maxWidth: '800px' }}>
            <h2
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                marginBottom: '1.5rem',
                color: 'white',
              }}
            >
              Ready to Transform Your Career?
            </h2>
            <p
              style={{
                fontSize: '1.25rem',
                marginBottom: '2rem',
                opacity: 0.9,
              }}
            >
              Join thousands of successful graduates who launched rewarding
              careers through our programs. Apply today and start your
              journey—100% funded training available for qualified applicants.
            </p>
            <div className="flex flex-wrap gap-6 justify-center">
              <Link
                to="/apply"
                className="button"
                style={{
                  background: 'white',
                  color: 'var(--color-brown)',
                  borderColor: 'white',
                }}
              >
                Start Application
              </Link>
              <Link
                to="/contact"
                className="button button-secondary"
                style={{ borderColor: 'white', color: 'white' }}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
