import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '../../components/Navigation';
import Section from '../../components/Section';
import Footer from '../../components/Footer';

export default function LegalIPNotice() {
  return (
    <div>
      <Helmet>
        <title>Intellectual Property Notice | Elevate for Humanity</title>
      </Helmet>
      <Navigation />
      <Section background="white">
        <div className="mx-auto max-w-[800px]">
          <h1 className="section-title">Intellectual Property Notice</h1>
          <div className="space-y-4 mt-6">
            <p>
              All content, trademarks, and data on this website, including but
              not limited to software, databases, text, graphics, icons,
              hyperlinks, private information, designs, and agreements, are the
              property of or licensed to Elevate for Humanity.
            </p>
            <h2 className="text-2xl font-bold mt-8">Copyright</h2>
            <p>
              © {new Date().getFullYear()} Elevate for Humanity. All rights
              reserved.
            </p>
            <h2 className="text-2xl font-bold mt-8">Proprietary Platform</h2>
            <p>
              This platform operates on proprietary technology. Unauthorized
              reproduction, distribution, or use of our intellectual property is
              strictly prohibited.
            </p>
          </div>
        </div>
      </Section>
      <Footer />
    </div>
  );
}
