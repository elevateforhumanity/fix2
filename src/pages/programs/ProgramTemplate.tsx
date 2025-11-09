import { Link } from 'react-router-dom';
import DurableLayout from '../../layouts/DurableLayout';
import '../../styles/durable-design.css';

interface ProgramData {
  slug: string;
  title: string;
  subtitle: string;
  duration: string;
  format: string;
  certification: string;
  cost: string;
  badges: string[];
  overview: string;
  skills: string[];
  eligibility: string[];
  careers: Array<{
    title: string;
    description: string;
    salary: string;
  }>;
  isLaunching?: boolean;
  launchDate?: string;
}

interface ProgramTemplateProps {
  program?: ProgramData;
}

// Default program data for when no program is provided
const defaultProgram: ProgramData = {
  slug: 'sample-program',
  title: 'Sample Program',
  subtitle: 'Professional Training Program',
  duration: '12 weeks',
  format: 'Hybrid',
  certification: 'Certificate of Completion',
  cost: 'Free',
  badges: ['DOL Approved', 'WIOA Eligible'],
  overview: 'This is a sample program template.',
  skills: ['Skill 1', 'Skill 2', 'Skill 3'],
  eligibility: ['18+ years old', 'High school diploma or equivalent'],
  careers: [
    {
      title: 'Sample Career',
      description: 'Career description',
      salary: '$40,000 - $60,000',
    },
  ],
};

export default function ProgramTemplate({ program = defaultProgram }: ProgramTemplateProps) {
  return (
    <DurableLayout>
      <div className="program-page">
        {/* Hero Section */}
        <section className="hero">
          <div className="container">
            <div className="mx-auto text-center" style={{ maxWidth: '900px' }}>
              {program.isLaunching && (
                <div
                  style={{
                    background: 'var(--color-brown)',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    display: 'inline-block',
                    marginBottom: '1rem',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                  }}
                >
                  🎯 Launching {program.launchDate}
                </div>
              )}
              <h1 className="heading-xlarge" style={{ marginBottom: '1.5rem' }}>
                {program.title}
              </h1>
              <p className="body-large" style={{ marginBottom: '2rem' }}>
                {program.subtitle}
              </p>
              <div className="flex flex-wrap gap-6 justify-center">
                {program.badges.map((badge, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 rounded"
                    style={{
                      background: 'var(--color-beige)',
                      color: 'var(--color-brown)',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                    }}
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* Program Details Section */}
        <section className="section">
          <div className="container">
            <div
              className="flex flex-wrap gap-8"
              style={{ alignItems: 'flex-start' }}
            >
              {/* Left Column - Overview & Skills */}
              <div style={{ flex: '1 1 400px' }}>
                <div className="rich-text-block">
                  <h2>Program Overview</h2>
                  <p>{program.overview}</p>
                  <h3>What You'll Learn</h3>
                  <ul>
                    {program.skills.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* Right Column - Details & Eligibility */}
              <div style={{ flex: '1 1 400px' }}>
                <div className="rich-text-block">
                  <h2>Program Details</h2>
                  <p>
                    <strong>Duration:</strong> {program.duration}
                  </p>
                  <p>
                    <strong>Format:</strong> {program.format}
                  </p>
                  <p>
                    <strong>Certification:</strong> {program.certification}
                  </p>
                  <p>
                    <strong>Cost:</strong> {program.cost}
                  </p>
                  <h3>Eligibility Requirements</h3>
                  <ul>
                    {program.eligibility.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Career Outcomes Section */}
        <section
          className="section"
          style={{ background: 'var(--color-green)' }}
        >
          <div className="container">
            <div className="mx-auto" style={{ maxWidth: '900px' }}>
              <h2 className="section-title text-center">Career Outcomes</h2>
              <p
                className="text-center body-large"
                style={{ marginBottom: '3rem' }}
              >
                Upon completion, you'll be qualified for:
              </p>
              <div className="flex flex-wrap gap-8">
                {program.careers.map((career, index) => (
                  <div
                    key={index}
                    className="card"
                    style={{
                      flex: '1 1 calc(33.333% - 2rem)',
                      minWidth: '250px',
                    }}
                  >
                    <h3 className="heading-medium mb-4">{career.title}</h3>
                    <p style={{ marginBottom: '1rem' }}>{career.description}</p>
                    <p style={{ color: 'var(--color-brown)', fontWeight: 600 }}>
                      {career.salary}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* Funding Section */}
        <section className="section">
          <div className="container">
            <div
              className="mx-auto"
              style={{
                maxWidth: '900px',
                background: 'var(--color-cream)',
                padding: '3rem',
                borderRadius: '12px',
              }}
            >
              <h2 className="section-title text-center">
                100% Funded Training Available
              </h2>
              <p
                className="text-center body-large"
                style={{ marginBottom: '2rem' }}
              >
                This program is eligible for full funding through:
              </p>
              <div className="flex flex-wrap gap-6 justify-center">
                <div
                  style={{
                    background: 'white',
                    padding: '2rem',
                    borderRadius: '8px',
                    flex: '1 1 300px',
                  }}
                >
                  <h3
                    style={{
                      color: 'var(--color-brown)',
                      marginBottom: '1rem',
                    }}
                  >
                    WIOA Funding
                  </h3>
                  <p>
                    Workforce Innovation and Opportunity Act provides funding
                    for eligible individuals seeking career training.
                  </p>
                </div>
                <div
                  style={{
                    background: 'white',
                    padding: '2rem',
                    borderRadius: '8px',
                    flex: '1 1 300px',
                  }}
                >
                  <h3
                    style={{
                      color: 'var(--color-brown)',
                      marginBottom: '1rem',
                    }}
                  >
                    WRG Funding
                  </h3>
                  <p>
                    Workforce Ready Grant covers tuition, fees, and materials
                    for approved training programs.
                  </p>
                </div>
              </div>
              <p
                className="text-center"
                style={{ marginTop: '2rem', fontSize: '1.125rem' }}
              >
                <strong>You pay $0 if approved for funding.</strong>
              </p>
            </div>
          </div>
        </section>
        {/* Enrollment Steps Section */}
        <section
          className="section"
          style={{ background: 'var(--color-white)' }}
        >
          <div className="container">
            <div className="mx-auto" style={{ maxWidth: '900px' }}>
              <h2 className="section-title text-center">How to Enroll</h2>
              <div
                className="flex flex-col gap-6"
                style={{ marginTop: '3rem' }}
              >
                {[
                  {
                    step: '1',
                    title: 'Create Your Profile',
                    description:
                      'Sign up on Indiana Career Connect and complete your profile.',
                  },
                  {
                    step: '2',
                    title: 'Meet with Career Advisor',
                    description:
                      'Schedule a meeting with a WorkOne Career Advisor to discuss eligibility and funding options.',
                  },
                  {
                    step: '3',
                    title: 'Apply for Funding',
                    description:
                      'Your advisor will help you apply for WIOA or WRG funding and gather required documents.',
                  },
                  {
                    step: '4',
                    title: 'Get Approved & Start',
                    description:
                      "Once approved, you'll receive your training authorization and start date for the next cohort.",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-6 items-start">
                    <div
                      style={{
                        background: 'var(--color-brown)',
                        color: 'white',
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        fontSize: '1.5rem',
                        fontWeight: 700,
                      }}
                    >
                      {item.step}
                    </div>
                    <div>
                      <h3 style={{ marginBottom: '0.5rem' }}>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* CTA Section */}
        <section
          className="section"
          style={{ background: 'var(--color-brown)', color: 'white' }}
        >
          <div className="container">
            <div className="mx-auto text-center" style={{ maxWidth: '700px' }}>
              <h2
                style={{
                  fontSize: '2.5rem',
                  marginBottom: '1.5rem',
                  color: 'white',
                }}
              >
                Ready to Get Started?
              </h2>
              <p
                style={{
                  fontSize: '1.25rem',
                  marginBottom: '2rem',
                  opacity: 0.9,
                }}
              >
                Start your application on Indiana Career Connect today and take
                the first step toward your new career.
              </p>
              <div className="flex flex-wrap gap-6 justify-center">
                <a
                  href="https://www.indianacareerconnect.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button"
                  style={{
                    background: 'white',
                    color: 'var(--color-brown)',
                    borderColor: 'white',
                    padding: '1.25rem 3rem',
                    fontSize: '1.125rem',
                  }}
                >
                  Start Your Application →
                </a>
                <Link
                  to="/contact"
                  className="button button-secondary"
                  style={{
                    borderColor: 'white',
                    color: 'white',
                    padding: '1.25rem 3rem',
                    fontSize: '1.125rem',
                  }}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DurableLayout>
  );
}
