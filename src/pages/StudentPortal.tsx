/**
 * Student Portal - Hub Page
 * Central access point for all student resources
 * Copyright (c) 2025 Elevate for Humanity
 */

import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  BookOpen,
  Award,
  Calendar,
  Users,
  MessageSquare,
  FileText,
  GraduationCap,
  CreditCard,
} from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function StudentPortal() {
  const portalLinks = [
    {
      title: 'Student Dashboard',
      description: 'Access your courses, track progress, and view assignments',
      icon: BookOpen,
      to: '/lms/dashboard',
      color: 'bg-brand',
    },
    {
      title: 'My Courses',
      description: 'Continue learning and access course materials',
      icon: GraduationCap,
      to: '/lms/courses',
      color: 'bg-brand-secondary',
    },
    {
      title: 'My Certificates',
      description: 'View and download your earned certificates',
      icon: Award,
      to: '/certificates',
      color: 'bg-status-success',
    },
    {
      title: 'Course Catalog',
      description: 'Browse available courses and enroll in new programs',
      icon: FileText,
      to: '/programs',
      color: 'bg-brand-accent',
    },
    {
      title: 'Events Calendar',
      description: 'View upcoming classes, workshops, and events',
      icon: Calendar,
      to: '/calendar',
      color: 'bg-efh-orange',
    },
    {
      title: 'Community Hub',
      description: 'Connect with fellow students and join study groups',
      icon: Users,
      to: '/community',
      color: 'bg-efh-blue',
    },
    {
      title: 'AI Tutor',
      description: 'Get instant help with your coursework',
      icon: MessageSquare,
      to: '/ai-tutor',
      color: 'bg-status-info',
    },
    {
      title: 'Billing & Funding',
      description: 'View invoices, payments, and funding status',
      icon: CreditCard,
      to: '/account',
      color: 'bg-efh-charcoal',
    },
  ];

  return (
    <div className="min-h-screen bg-surface-base">
      <Helmet>
        <title>Student Portal | Elevate for Humanity</title>
        <meta
          name="description"
          content="Access your courses, certificates, and student resources. Your central hub for learning at Elevate for Humanity."
        />
      </Helmet>

      <Navigation />

      <main id="main-content">
        {/* Hero Section */}
        <section className="bg-gradient-brand text-white py-16 md:py-20">
          <div className="container-efh text-center">
            <h1 className="heading-display text-white mb-4">
              Student Portal
            </h1>
            <p className="text-xl md:text-2xl opacity-95 max-w-2xl mx-auto">
              Access all your learning resources, courses, and student services in one place
            </p>
          </div>
        </section>

        {/* Quick Links Grid */}
        <section className="section-spacing">
          <div className="container-efh">
            <h2 className="heading-2 text-center mb-12">Quick Access</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {portalLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="card group hover:shadow-card-hover transition-all"
                  >
                    <div
                      className={`${link.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="heading-3 mb-2 group-hover:text-brand transition-colors">
                      {link.title}
                    </h3>
                    <p className="body-base text-text-secondary">{link.description}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section className="section-spacing bg-surface-elevated">
          <div className="container-efh">
            <h2 className="heading-2 text-center mb-12">
              Student Resources
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="card">
                <h3 className="heading-3 mb-3">
                  Student Handbook
                </h3>
                <p className="body-base text-text-secondary mb-4">
                  Review policies, procedures, and important information for students
                </p>
                <Link
                  to="/student-handbook"
                  className="text-brand hover:text-brand-primary-hover font-medium inline-flex items-center gap-2"
                >
                  View Handbook →
                </Link>
              </div>
              
              <div className="card">
                <h3 className="heading-3 mb-3">
                  Support Center
                </h3>
                <p className="body-base text-text-secondary mb-4">
                  Get help with technical issues, course questions, and more
                </p>
                <Link
                  to="/support"
                  className="text-brand hover:text-brand-primary-hover font-medium inline-flex items-center gap-2"
                >
                  Get Support →
                </Link>
              </div>

              <div className="card">
                <h3 className="heading-3 mb-3">
                  Contact Advisor
                </h3>
                <p className="body-base text-text-secondary mb-4">
                  Speak with an academic advisor about your program
                </p>
                <Link
                  to="/contact"
                  className="text-brand hover:text-brand-primary-hover font-medium inline-flex items-center gap-2"
                >
                  Contact Us →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Sign In CTA */}
        <section className="section-spacing">
          <div className="container-efh">
            <div className="card card-spacious text-center max-w-3xl mx-auto bg-surface-elevated">
              <h2 className="heading-2 mb-4">
                New to Elevate for Humanity?
              </h2>
              <p className="body-large mb-8 max-w-2xl mx-auto">
                Create an account to access your courses and start your learning journey
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/login" className="btn btn-primary text-lg">
                  Sign In
                </Link>
                <Link to="/apply" className="btn btn-secondary text-lg">
                  Create Account
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
