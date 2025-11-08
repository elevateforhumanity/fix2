/**
 * Programs Page
 * Matches elevateforhumanity.org programs page exactly
 * Copyright (c) 2025 Elevate for Humanity
 */

import { Helmet } from 'react-helmet-async';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Section from '../components/Section';
import ProgramCard from '../components/ProgramCard';
import Footer from '../components/Footer';

export default function ProgramsPage() {
  return (
    <div>
      <Helmet>
        <title>Career Programs | Elevate for Humanity</title>
        <meta
          name="description"
          content="Choose from 8 high-demand career pathways with 100% funding available. Barber, HVAC, Healthcare, and more."
        />
      </Helmet>
      <Navigation />
      <Hero
        title="Our Career Programs"
        subtitle="Choose from 8 high-demand career pathways with 100% funding available"
        badges={[
          { icon: '💰', text: '100% Funded' },
          { icon: '📜', text: '8 Programs' },
          { icon: '🎓', text: 'Industry Certifications' },
          { icon: '📍', text: 'Marion County' },
        ]}
        primaryButton={{ text: 'Apply Now', href: '/apply' }}
        secondaryButton={{ text: 'Contact Us', href: '/contact' }}
      />
      <Section>
        <div className="flex flex-wrap gap-8">
          <ProgramCard
            icon="🪒"
            title="Barber Apprenticeship"
            duration="2,000 hours • State Licensure"
            description="Earn while you learn. Master professional barbering skills and qualify for Indiana State Licensure."
            funding="💰 WRG • WIOA • Apprenticeship"
            href="/programs/barber"
          />
          <ProgramCard
            icon="🔧"
            title="Building Services Technician"
            duration="Flexible • Industry Certification"
            description="Learn essential building maintenance and repair skills for commercial and residential properties."
            funding="💰 WRG • WIOA"
            href="/programs/building-services"
          />
          <ProgramCard
            icon="🔥"
            title="HVAC & Welding"
            duration="Dual Certification • High Demand"
            description="Master two in-demand trades with comprehensive training in heating, ventilation, air conditioning, and welding."
            funding="💰 WRG • WIOA"
            href="/programs/hvac-welding"
          />
          <ProgramCard
            icon="🏥"
            title="Healthcare Training"
            duration="Certification Programs • High Demand"
            description="Enter the healthcare field with comprehensive training in patient care, medical terminology, and clinical skills."
            funding="💰 WRG • WIOA"
            href="/programs/healthcare"
          />
          <ProgramCard
            icon="🧪"
            title="Drug Testing Specialist"
            duration="Certification • Compliance Training"
            description="Become a certified drug testing specialist with training in collection procedures, chain of custody, and compliance."
            funding="💰 WRG • WIOA"
            href="/programs/drug-testing"
          />
          <ProgramCard
            icon="💻"
            title="Digital Skills"
            duration="Self-Paced • Multiple Certifications"
            description="Build essential digital literacy skills including Microsoft Office, Google Workspace, and online communication."
            funding="💰 WRG • WIOA"
            href="/programs/digital-skills"
          />
          <ProgramCard
            icon="👔"
            title="Leadership Development"
            duration="Professional Development • Soft Skills"
            description="Develop leadership, communication, and professional skills to advance your career and lead teams effectively."
            funding="💰 WRG • WIOA"
            href="/programs/leadership"
          />
          <ProgramCard
            icon="🤝"
            title="Peer Recovery Support"
            duration="Certification • Community Impact"
            description="Train to become a certified peer recovery support specialist and help others on their recovery journey."
            funding="💰 WRG • WIOA"
            href="/programs/peer-recovery"
          />
        </div>
      </Section>
      <Section background="green">
        <div className="mx-auto max-w-[800px] text-center">
          <h2 className="section-title">Why Choose Our Programs?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div>
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-2">100% Funded</h3>
              <p>
                No cost to eligible participants through WIOA and WRG funding
              </p>
            </div>
            <div>
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-2">Job Placement</h3>
              <p>92% of graduates secure employment within 6 months</p>
            </div>
            <div>
              <div className="text-4xl mb-4">📜</div>
              <h3 className="text-xl font-bold mb-2">Certifications</h3>
              <p>Industry-recognized credentials that employers value</p>
            </div>
          </div>
        </div>
      </Section>
      <Footer />
    </div>
  );
}
