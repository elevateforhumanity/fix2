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
import VideoEmbed from './VideoEmbed';

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
  heroImage?: string;
  cardImage?: string;
  ogImage?: string;
  highlights?: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  videoUrl?: string;
  videoTitle?: string;
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
  heroImage,
  cardImage,
  ogImage,
  highlights,
  videoUrl,
  videoTitle,
}: ProgramPageProps) {
  return (
    <div>
      <Helmet>
        <title>{title} | Elevate for Humanity</title>
        <meta name="description" content={metaDescription} />
        {heroImage && <link rel="preload" as="image" href={heroImage} />}
        {ogImage && (
          <>
            <meta property="og:image" content={ogImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:image" content={ogImage} />
          </>
        )}
      </Helmet>
      <Navigation />
      <Hero
        title={`${icon} ${title}`}
        subtitle={description}
        backgroundImage={heroImage}
        badges={[
          { icon: '⏱️', text: duration },
          { icon: '💰', text: funding },
          { icon: '📍', text: 'Marion County, IN' },
        ]}
        primaryButton={{ text: 'Apply Now', href: '/apply' }}
        secondaryButton={{ text: 'Contact Us', href: '/contact' }}
      />
      {highlights && highlights.length > 0 && (
        <Section background="beige">
          <div className="mx-auto max-w-[1200px]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="text-5xl mb-4">{highlight.icon}</div>
                  <h3 className="text-2xl font-bold mb-3 text-[var(--color-brown)]">
                    {highlight.title}
                  </h3>
                  <p className="text-gray-700">{highlight.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>
      )}
      <Section background="white">
        <div className="mx-auto max-w-[1200px]">
          <div
            className={`grid grid-cols-1 ${videoUrl ? 'lg:grid-cols-2' : ''} gap-12 items-center`}
          >
            <div className={videoUrl ? '' : 'max-w-[800px] mx-auto'}>
              <h2 className="section-title">Program Overview</h2>
              <p className="body-large">{overview}</p>
            </div>
            {videoUrl && (
              <div>
                <VideoEmbed
                  url={videoUrl}
                  title={videoTitle || `${title} Program Video`}
                  controls
                  autoplay={false}
                />
              </div>
            )}
          </div>
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
