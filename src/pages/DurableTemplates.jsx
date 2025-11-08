import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Section from '../components/Section';

export default function DurableTemplates() {
  const templates = [
    { name: 'Career Development', icon: '💼', courses: 12 },
    { name: 'Technical Skills', icon: '💻', courses: 18 },
    { name: 'Leadership', icon: '👔', courses: 8 },
    { name: 'Communication', icon: '💬', courses: 10 },
    { name: 'Project Management', icon: '📊', courses: 15 },
    { name: 'Entrepreneurship', icon: '🚀', courses: 9 },
  ];

  return (
    <div>
      <Helmet>
        <title>Program Templates | Elevate for Humanity</title>
        <meta
          name="description"
          content="Pre-built learning paths designed by industry experts"
        />
      </Helmet>
      <Navigation />
      <Section background="beige">
        <div className="text-center mb-12">
          <h1 className="section-title">Program Templates</h1>
          <p className="section-subtitle max-w-2xl mx-auto">
            Pre-built learning paths designed by industry experts
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template, index) => (
            <div key={index} className="card p-8 hover:shadow-lg transition">
              <div className="text-6xl mb-4">{template.icon}</div>
              <h3 className="text-2xl font-bold text-brown-900 mb-2">
                {template.name}
              </h3>
              <p className="text-brown-600 mb-4">
                {template.courses} courses included
              </p>
              <Link
                to="/programs"
                className="text-green-600 font-semibold hover:text-green-700"
              >
                View Template →
              </Link>
            </div>
          ))}
        </div>
      </Section>
      <Footer />
    </div>
  );
}
