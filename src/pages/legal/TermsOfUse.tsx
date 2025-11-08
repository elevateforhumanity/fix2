import { Helmet } from 'react-helmet-async';
import Navigation from '../../components/Navigation';
import Section from '../../components/Section';
import Footer from '../../components/Footer';

export default function TermsOfUse() {
  return (
    <div>
      <Helmet>
        <title>Terms of Use | Elevate for Humanity</title>
      </Helmet>
      <Navigation />
      <Section background="white">
        <div className="mx-auto max-w-[800px]">
          <h1 className="section-title">Terms of Use</h1>
          <div className="space-y-4 mt-6">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <h2 className="text-2xl font-bold mt-8">Acceptance of Terms</h2>
            <p>
              By accessing and using this website, you accept and agree to be
              bound by the terms and provision of this agreement.
            </p>
            <h2 className="text-2xl font-bold mt-8">Use License</h2>
            <p>
              Permission is granted to temporarily access the materials on
              Elevate for Humanity's website for personal, non-commercial
              transitory viewing only.
            </p>
            <h2 className="text-2xl font-bold mt-8">Contact</h2>
            <p>
              Questions about the Terms of Use should be sent to us at
              Elizabethpowell6262@gmail.com
            </p>
          </div>
        </div>
      </Section>
      <Footer />
    </div>
  );
}
