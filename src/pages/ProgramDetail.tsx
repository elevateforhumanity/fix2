/**
 * Program Detail Page - Professional LMS Style with Tabs
 * Copyright (c) 2025 Elevate for Humanity
 */

import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Clock, 
  MapPin, 
  DollarSign, 
  Award, 
  Calendar,
  Download,
  Phone,
  Mail,
  CheckCircle
} from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { programs } from '../data/programs';

const APPLICATION_URL =
  import.meta.env.VITE_APPLICATION_FORM_URL ||
  'https://www.indianacareerconnect.com';

const tabs = ['Overview', 'Curriculum', 'Schedule', 'Funding', 'FAQs', 'Outcomes'];

export default function ProgramDetail() {
  const { slug } = useParams();
  const [activeTab, setActiveTab] = useState('Overview');
  const p = programs.find((x) => x.slug === slug);

  if (!p) {
    return (
      <div className="min-h-screen bg-surface-base">
        <Navigation />
        <div className="container-efh py-20 text-center">
          <Helmet>
            <title>Program Not Found | Elevate for Humanity</title>
            <meta name="robots" content="noindex, nofollow" />
          </Helmet>
          <h1 className="heading-1 mb-4">Program Not Found</h1>
          <p className="body-large mb-8">The program you're looking for doesn't exist.</p>
          <Link to="/programs" className="btn btn-primary">
            View All Programs
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const pageTitle = `${p.name} | Elevate for Humanity`;
  const pageDescription = `${p.tagline} - ${p.summary}`;
  const pageUrl = `https://elevateproduction.netlify.app/programs/${p.slug}`;
  const imageUrl = `https://elevateproduction.netlify.app${p.cardSrc}`;

  return (
    <div className="min-h-screen bg-surface-base">
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta name="description" content={pageDescription} />
        {/* Canonical URL */}
        <link rel="canonical" href={pageUrl} />
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:site_name" content="Elevate for Humanity" />
        {/* Additional SEO */}
        <meta
          name="keywords"
          content={`${p.name}, workforce development, training program, ${p.funding.join(', ')}, Indianapolis`}
        />
        <meta name="author" content="Elevate for Humanity" />
        {/* Structured Data - JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: p.name,
            description: p.summary,
            provider: {
              '@type': 'Organization',
              name: 'Elevate for Humanity',
              url: 'https://elevateproduction.netlify.app',
            },
            image: imageUrl,
            offers: {
              '@type': 'Offer',
              category: 'Educational',
            },
          })}
        </script>
      </Helmet>

      <Navigation />

      <main id="main-content" className="py-12">
        <div className="container-efh">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Hero Image */}
              <img
                src={p.heroSrc}
                alt={p.name}
                className="w-full h-80 object-cover rounded-2xl shadow-card mb-8"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="400"%3E%3Crect fill="%23F9FAFB" width="800" height="400"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%236B7280" font-size="24"%3E${p.name}%3C/text%3E%3C/svg%3E`;
                }}
              />

              {/* Title & Badges */}
              <h1 className="heading-1 mb-2">{p.name}</h1>
              <p className="text-xl text-text-secondary mb-4">{p.tagline}</p>
              <div className="flex flex-wrap gap-3 mb-6">
                {p.funding.map((f) => (
                  <span key={f} className="badge badge-primary">{f}</span>
                ))}
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 mb-8">
                <div className="flex gap-6 overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-4 px-2 font-medium transition-colors whitespace-nowrap ${
                        activeTab === tab
                          ? 'border-b-2 border-brand text-brand'
                          : 'text-text-secondary hover:text-brand'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="prose max-w-none">
                {activeTab === 'Overview' && (
                  <div>
                    <p className="body-large mb-6">{p.summary}</p>
                  </div>
                )}

                {activeTab === 'Curriculum' && (
                  <div>
                    <h3 className="heading-3 mb-4">What You'll Learn</h3>
                    <ul className="space-y-3">
                      {p.bullets.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-brand mt-1 flex-shrink-0" />
                          <span className="body-base">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === 'Schedule' && (
                  <div>
                    <h3 className="heading-3 mb-4">Program Schedule</h3>
                    <p className="body-base mb-4">
                      Flexible scheduling options available. Contact an advisor to discuss the best schedule for your needs.
                    </p>
                    <div className="card bg-surface-elevated">
                      <div className="flex items-center gap-3 mb-2">
                        <Calendar className="w-5 h-5 text-brand" />
                        <span className="font-semibold">Enrollment:</span>
                      </div>
                      <p className="body-base">Rolling enrollment - start when you're ready!</p>
                    </div>
                  </div>
                )}

                {activeTab === 'Funding' && (
                  <div>
                    <h3 className="heading-3 mb-4">Funding Options</h3>
                    <p className="body-base mb-6">
                      We help you determine eligibility for programs like {p.funding.join(', ')} and connect you with employer partners for paid on-the-job training.
                    </p>
                    <div className="space-y-4">
                      {p.funding.map((fund) => (
                        <div key={fund} className="card bg-surface-elevated">
                          <div className="flex items-center gap-3 mb-2">
                            <DollarSign className="w-5 h-5 text-brand" />
                            <span className="font-semibold">{fund}</span>
                          </div>
                          <p className="body-small text-text-secondary">
                            Funding assistance available for eligible participants.
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'FAQs' && (
                  <div>
                    <h3 className="heading-3 mb-6">Frequently Asked Questions</h3>
                    <div className="space-y-6">
                      <div className="card">
                        <h4 className="font-semibold text-lg mb-2">Who is eligible for this program?</h4>
                        <p className="body-base text-text-secondary">
                          Most programs are open to adults 18+ with a high school diploma or GED. Specific prerequisites vary by program.
                        </p>
                      </div>
                      <div className="card">
                        <h4 className="font-semibold text-lg mb-2">How do I apply for funding?</h4>
                        <p className="body-base text-text-secondary">
                          Our enrollment team will help you determine eligibility and complete all funding applications during the intake process.
                        </p>
                      </div>
                      <div className="card">
                        <h4 className="font-semibold text-lg mb-2">What happens after I complete the program?</h4>
                        <p className="body-base text-text-secondary">
                          You'll receive job placement assistance, resume support, and connections to our network of employer partners.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'Outcomes' && (
                  <div>
                    <h3 className="heading-3 mb-4">What You'll Earn</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <Award className="w-5 h-5 text-status-success mt-1 flex-shrink-0" />
                        <span className="body-base">Industry-recognized credentials and certifications</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Award className="w-5 h-5 text-status-success mt-1 flex-shrink-0" />
                        <span className="body-base">Hands-on experience and portfolio development</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Award className="w-5 h-5 text-status-success mt-1 flex-shrink-0" />
                        <span className="body-base">Job placement assistance with partner employers</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Award className="w-5 h-5 text-status-success mt-1 flex-shrink-0" />
                        <span className="body-base">Resume and interview preparation support</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* CTA Card */}
                <div className="card">
                  <h3 className="heading-3 mb-4">Ready to Get Started?</h3>
                  <a
                    href={APPLICATION_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary w-full mb-3"
                  >
                    Apply Now
                  </a>
                  <Link to="/contact" className="btn btn-outline w-full mb-4">
                    Talk to an Advisor
                  </Link>
                  <a
                    href={`/syllabi/${p.slug}.pdf`}
                    className="flex items-center justify-center gap-2 text-brand hover:underline"
                    download
                  >
                    <Download className="w-4 h-4" />
                    Download Syllabus (PDF)
                  </a>
                </div>

                {/* Program Details */}
                <div className="card">
                  <h4 className="font-semibold mb-4">Program Details</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-text-secondary">Location:</span>
                      <p className="font-medium">Indianapolis, IN</p>
                    </div>
                    <div>
                      <span className="text-text-secondary">Funding Options:</span>
                      <p className="font-medium">{p.funding.join(', ')}</p>
                    </div>
                    <div>
                      <span className="text-text-secondary">Enrollment:</span>
                      <p className="font-medium">Rolling - Start Anytime</p>
                    </div>
                  </div>
                </div>

                {/* Contact Card */}
                <div className="card bg-surface-elevated">
                  <h4 className="font-semibold mb-4">Questions?</h4>
                  <div className="space-y-3">
                    <a
                      href="tel:3173143757"
                      className="flex items-center gap-3 text-text-primary hover:text-brand transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                      <span>(317) 314-3757</span>
                    </a>
                    <a
                      href="mailto:info@elevateforhumanity.org"
                      className="flex items-center gap-3 text-text-primary hover:text-brand transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                      <span>info@elevateforhumanity.org</span>
                    </a>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
