import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Section from '../components/Section';

export default function DurableFeatures() {
  const features = [
    {
      title: 'Interactive Learning',
      description: 'Engage with hands-on exercises and real-world projects',
      icon: '🎮',
    },
    {
      title: 'Expert Instructors',
      description: 'Learn from industry professionals with years of experience',
      icon: '👨‍🏫',
    },
    {
      title: 'Flexible Schedule',
      description: 'Study at your own pace, anytime and anywhere',
      icon: '⏰',
    },
    {
      title: 'Certificates',
      description: 'Earn recognized certificates upon course completion',
      icon: '🎓',
    },
    {
      title: 'Community Support',
      description: 'Connect with peers and mentors in our learning community',
      icon: '👥',
    },
    {
      title: 'Career Services',
      description: 'Get job placement assistance and career guidance',
      icon: '💼',
    },
  ];

  return (
    <div>
      <Helmet>
        <title>Platform Features | Elevate for Humanity</title>
        <meta
          name="description"
          content="Everything you need to succeed in your learning journey. Interactive learning, expert instructors, flexible schedules, and more."
        />
      </Helmet>

      <Navigation />

      <Section background="beige">
        <div className="text-center mb-12">
          <h1 className="section-title">Platform Features</h1>
          <p className="section-subtitle max-w-2xl mx-auto">
            Everything you need to succeed in your learning journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card p-8 hover:shadow-lg transition">
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-brown-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-brown-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Footer />
    </div>
  );
}
