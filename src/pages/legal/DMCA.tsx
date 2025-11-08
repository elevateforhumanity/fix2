import { Helmet } from 'react-helmet-async';
import Navigation from '../../components/Navigation';
import Section from '../../components/Section';
import Footer from '../../components/Footer';

export default function DMCA() {
  return (
    <div>
      <Helmet>
        <title>DMCA Policy | Elevate for Humanity</title>
      </Helmet>
      <Navigation />
      <Section background="white">
        <div className="mx-auto max-w-[800px]">
          <h1 className="section-title">DMCA Policy</h1>
          <div className="space-y-4 mt-6">
            <p>
              Elevate for Humanity respects the intellectual property rights of
              others and expects users to do the same.
            </p>
            <h2 className="text-2xl font-bold mt-8">Filing a DMCA Notice</h2>
            <p>
              If you believe that content on our site infringes your copyright,
              please send a notice to Elizabethpowell6262@gmail.com with the
              following information:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Identification of the copyrighted work</li>
              <li>Identification of the infringing material</li>
              <li>Your contact information</li>
              <li>A statement of good faith belief</li>
              <li>Your physical or electronic signature</li>
            </ul>
          </div>
        </div>
      </Section>
      <Footer />
    </div>
  );
}
