/**
 * Program Page Template
 * Reusable template for all program detail pages
 * Matches elevateforhumanity.org program pages exactly
 */

import { Helmet } from 'react-helmet-async';
import Navigation from './Navigation';
import Hero from './Hero';
import Section from './Section';
import Footer from './Footer';

interface ProgramPageProps {
  title: string;
  icon: string;
  duration: string;
  description: string;
  funding: string;
  metaDescription: string;
  overview: string;
  benefits: string[];
  curriculum: string[];
  requirements: string[];
  outcomes: string[];
}

export default function ProgramPageTemplate({
  title,
  icon,
  duration,
  description,
  funding,
  metaDescription,
  overview,
  benefits,
  curriculum,
  requirements,
  outcomes,
}: ProgramPageProps) {
  return (
    <div>
      <Helmet>
        <title>{title} | Elevate for Humanity</title>
        <meta name="description" content={metaDescription} />
      </Helmet>
      <Navigation />
      <Hero
        title={`${icon} ${title}`}
        subtitle={description}
        badges={[
          { icon: '⏱️', text: duration },
          { icon: '💰', text: funding },
          { icon: '📍', text: 'Marion County, IN' },
        ]}
        primaryButton={{ text: 'Apply Now', href: '/apply' }}
        secondaryButton={{ text: 'Contact Us', href: '/contact' }}
      />
      <Section background="white">
        <div className="mx-auto max-w-[800px]">
          <h2 className="section-title">Program Overview</h2>
          <p className="body-large">{overview}</p>
        </div>
      </Section>
      <Section background="green">
        <div className="mx-auto max-w-[800px]">
          <h2 className="section-title text-center">Program Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>
      <Section background="white">
        <div className="mx-auto max-w-[800px]">
          <h2 className="section-title">What You'll Learn</h2>
          <div className="space-y-3 mt-6">
            {curriculum.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="text-[var(--color-green-600)] font-bold">
                  •
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>
      <Section background="beige">
        <div className="mx-auto max-w-[800px]">
          <h2 className="section-title">Requirements</h2>
          <div className="space-y-3 mt-6">
            {requirements.map((req, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="text-[var(--color-brown)]">▸</span>
                <span>{req}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>
      <Section background="white">
        <div className="mx-auto max-w-[800px]">
          <h2 className="section-title">Career Outcomes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {outcomes.map((outcome, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="text-2xl">🎯</span>
                <span>{outcome}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>
      <Section background="brown">
        <div className="mx-auto max-w-[800px] text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Apply now for {title} and transform your career with 100% funded
            training.
          </p>
          <div className="flex flex-wrap gap-6 justify-center">
            <a href="/apply" className="button-white button-large">
              Apply Now
            </a>
            <a href="/programs" className="button-outline-white">
              View All Programs
            </a>
          </div>
        </div>
      </Section>
      <Footer />
    </div>
  );
}
