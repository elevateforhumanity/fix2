/*
  Copyright (c) 2025 Elevate for Humanity
  Commercial License. No resale, sublicensing, or redistribution allowed.
  See LICENSE file for details.
*/

import React from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import { useAnalytics } from '../hooks/useAnalytics';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import {
  DollarSign,
  FileText,
  GraduationCap,
  Users,
  CheckCircle2,
  Award,
  TrendingUp,
  Heart,
} from 'lucide-react';

export default function VITAProgram() {
  useAnalytics('VITA Program');

  const services = [
    {
      icon: FileText,
      title: 'Free Tax Preparation',
      description:
        'IRS-certified volunteers provide free tax preparation services for individuals and families earning $64,000 or less per year.',
    },
    {
      icon: DollarSign,
      title: 'Financial Education',
      description:
        'Comprehensive financial literacy programs covering budgeting, saving, credit management, and long-term financial planning.',
    },
    {
      icon: TrendingUp,
      title: 'Asset Building',
      description:
        'Programs designed to help individuals and families build wealth through savings, homeownership, and investment education.',
    },
    {
      icon: GraduationCap,
      title: 'Volunteer Training',
      description:
        'IRS-certified training for volunteers who want to help their community with tax preparation and financial education.',
    },
  ];

  const benefits = [
    'Free federal and state tax return preparation',
    'Electronic filing for faster refunds',
    'Direct deposit options',
    'Financial literacy workshops',
    'Asset building counseling',
    'Credit counseling and repair guidance',
    'Savings and investment education',
    'Homeownership preparation',
  ];

  const eligibility = [
    'Individuals earning $64,000 or less annually',
    'Families with children',
    'Seniors and retirees',
    'People with disabilities',
    'Limited English speakers',
    'Military personnel and veterans',
  ];

  return (
    <AppLayout title="VITA Program - Free Tax Help & Financial Education">
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-green-700 via-emerald-600 to-teal-700 text-white py-24 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div className="relative max-w-6xl mx-auto text-center">
            <Badge className="mb-6 text-base px-6 py-2 bg-white/20 backdrop-blur-sm border-white/30">
              <Award className="h-4 w-4 mr-2" />
              IRS Recognized Partner
            </Badge>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
              VITA Program
              <br />
              <span className="text-yellow-300">
                Free Tax Help & Financial Education
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-green-100 mb-12 max-w-3xl mx-auto">
              Recognized IRS Financial Education and Asset Building Partner
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-green-700 hover:bg-green-50 text-lg px-8 py-6"
                asChild
              >
                <Link to="/apply">Get Free Tax Help</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 text-lg px-8 py-6"
                asChild
              >
                <Link to="/programs">View All Programs</Link>
              </Button>
            </div>
          </div>
        </section>
        {/* Recognition Section */}
        <section className="py-16 px-4 bg-green-50">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center gap-4 bg-white rounded-2xl px-8 py-6 shadow-lg">
              <Award className="h-12 w-12 text-green-600" />
              <div className="text-left">
                <div className="text-2xl font-bold text-gray-900">
                  IRS Recognized Partner
                </div>
                <div className="text-gray-600">
                  Financial Education & Asset Building
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Services Section */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 text-base px-6 py-2">Our Services</Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                How We Help You
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive financial services to help you succeed
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, idx) => (
                <Card
                  key={idx}
                  className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2"
                >
                  <CardHeader>
                    <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <service.icon className="h-8 w-8 text-green-600" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription className="text-base">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>
        {/* Benefits & Eligibility Section */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Benefits */}
              <Card className="border-2 shadow-xl">
                <CardHeader>
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-4">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-3xl">What You Get</CardTitle>
                  <CardDescription className="text-base">
                    Free services available to eligible individuals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              {/* Eligibility */}
              <Card className="border-2 shadow-xl">
                <CardHeader>
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-3xl">Who Qualifies</CardTitle>
                  <CardDescription className="text-base">
                    VITA services are available to:
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {eligibility.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-green-700 to-emerald-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <Heart className="h-16 w-16 mx-auto mb-6 text-yellow-300" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Get Started Today
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Join thousands of individuals and families who have benefited from
              our free tax preparation and financial education services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-green-700 hover:bg-green-50 text-lg px-8 py-6"
                asChild
              >
                <Link to="/apply">Apply Now</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 text-lg px-8 py-6"
                asChild
              >
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
