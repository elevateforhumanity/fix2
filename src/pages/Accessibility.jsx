/*
  Copyright (c) 2025 Elevate for Humanity
  Commercial License. No resale, sublicensing, or redistribution allowed.
  See LICENSE file for details.
*/

/*
  Copyright (c) 2025 Elevate for Humanity
  Commercial License. No resale, sublicensing, or redistribution allowed.
  See LICENSE file for details.
*/

/*
  Copyright (c) 2025 Elevate for Humanity
  Commercial License. No resale, sublicensing, or redistribution allowed.
  See LICENSE file for details.
*/

import React from 'react';

export default function Accessibility() {
  return (
    <main
      role="main"
      id="main-content"
      style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}
    >
      <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1
          style={{
            fontSize: '2.5rem',
            marginBottom: '1rem',
            color: 'var(--brand-info)',
          }}
        >
          Accessibility Statement
        </h1>
        <p
          style={{
            fontSize: '1.2rem',
            color: 'var(--brand-text-muted)',
            marginBottom: '2rem',
          }}
        >
          Elevate for Humanity is committed to ensuring digital accessibility
          for all users
        </p>
        {/* WCAG 2.1 AA Accessibility Badge */}
        <div
          style={{
            display: 'inline-block',
            backgroundColor: '#10b981',
            color: 'white',
            padding: '1rem 2rem',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            marginBottom: '1rem',
          }}
        >
          <div
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginBottom: '0.5rem',
            }}
          >
            ✓ WCAG 2.1 AA
          </div>
          <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
            Accessibility Committed
          </div>
        </div>
        <p
          style={{
            fontSize: '1rem',
            color: 'var(--brand-text-muted)',
            maxWidth: '800px',
            margin: '1rem auto 0',
            lineHeight: '1.6',
          }}
        >
          Our website is actively moving toward full WCAG 2.1 AA compliance —
          ensuring every visitor, including those using screen readers or
          keyboard navigation, can experience Elevate for Humanity's content
          with ease. We're improving color contrast, text clarity, form labels,
          and navigation structure to make the site accessible, inclusive, and
          welcoming for all.
        </p>
      </header>
      <section style={{ marginBottom: '3rem' }}>
        <h2
          style={{
            fontSize: '1.8rem',
            marginBottom: '1rem',
            color: 'var(--brand-text)',
          }}
        >
          Our Commitment
        </h2>
        <p
          style={{
            fontSize: '1.1rem',
            lineHeight: '1.6',
            color: 'var(--brand-text)',
            marginBottom: '1rem',
          }}
        >
          Elevate for Humanity is committed to ensuring digital accessibility
          for all users, including those with disabilities. We believe that
          everyone should have equal access to information, education, and
          opportunities regardless of their abilities.
        </p>
        <p
          style={{
            fontSize: '1.1rem',
            lineHeight: '1.6',
            color: 'var(--brand-text)',
          }}
        >
          We continuously work to improve the accessibility of our digital
          platforms and services, following established guidelines and best
          practices to create an inclusive experience for all users.
        </p>
      </section>
      <section style={{ marginBottom: '3rem' }}>
        <h2
          style={{
            fontSize: '1.8rem',
            marginBottom: '1rem',
            color: 'var(--brand-text)',
          }}
        >
          Standards & Guidelines
        </h2>
        <div
          style={{
            backgroundColor: 'var(--brand-surface)',
            padding: '1.5rem',
            borderRadius: '8px',
            marginBottom: '1rem',
            border: '2px solid #10b981',
          }}
        >
          <h3
            style={{
              fontSize: '1.3rem',
              marginBottom: '0.5rem',
              color: 'var(--brand-info)',
            }}
          >
            🌟 WCAG 2.1 AA Accessibility Commitment
          </h3>
          <p
            style={{
              color: 'var(--brand-text)',
              marginBottom: '1rem',
              fontWeight: '500',
            }}
          >
            Our website is in the process of becoming fully accessible —
            designed so everyone, including people with vision, hearing, or
            mobility challenges, can use it easily.
          </p>
          <p style={{ color: 'var(--brand-text)', marginBottom: '1rem' }}>
            <strong>What this means:</strong>
          </p>
          <ul
            style={{
              color: 'var(--brand-text)',
              paddingLeft: '1.5rem',
              marginBottom: '1rem',
            }}
          >
            <li style={{ marginBottom: '0.5rem' }}>
              It speaks clearly to screen readers
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              It shows enough color contrast so everyone can read it
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              It works just as well with a keyboard as with a mouse
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              It's predictable, easy to navigate, and friendly to all users
            </li>
          </ul>
          <div
            style={{
              backgroundColor: '#f0fdf4',
              padding: '1rem',
              borderRadius: '6px',
              marginTop: '1rem',
            }}
          >
            <p style={{ color: '#166534', fontSize: '0.95rem', margin: 0 }}>
              <strong>Breaking it down:</strong>
              <br />• <strong>WCAG 2.1</strong> → The official rulebook for
              accessibility (set by the World Wide Web Consortium)
              <br />• <strong>AA Level</strong> → The "gold standard" most
              professional and government websites aim for
              <br />• <strong>Accessibility Committed</strong> → We actively
              maintain and improve accessibility standards across our platform
            </p>
          </div>
        </div>
        <div
          style={{
            backgroundColor: '#f0fdf4',
            padding: '1.5rem',
            borderRadius: '8px',
          }}
        >
          <h3
            style={{
              fontSize: '1.3rem',
              marginBottom: '0.5rem',
              color: '#166534',
            }}
          >
            Section 508 Compliance
          </h3>
          <p style={{ color: 'var(--brand-text)' }}>
            We also adhere to Section 508 of the Rehabilitation Act, ensuring
            our digital content is accessible to federal employees and members
            of the public with disabilities.
          </p>
        </div>
      </section>
      <section style={{ marginBottom: '3rem' }}>
        <h2
          style={{
            fontSize: '1.8rem',
            marginBottom: '1rem',
            color: 'var(--brand-text)',
          }}
        >
          Accessibility Features
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem',
          }}
        >
          <div
            style={{
              padding: '1rem',
              border: '1px solid var(--brand-border)',
              borderRadius: '6px',
            }}
          >
            <h4
              style={{
                fontSize: '1.1rem',
                marginBottom: '0.5rem',
                color: 'var(--brand-text)',
              }}
            >
              🎯 Keyboard Navigation
            </h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--brand-text-muted)' }}>
              Full keyboard navigation support for users who cannot use a mouse
            </p>
          </div>
          <div
            style={{
              padding: '1rem',
              border: '1px solid var(--brand-border)',
              borderRadius: '6px',
            }}
          >
            <h4
              style={{
                fontSize: '1.1rem',
                marginBottom: '0.5rem',
                color: 'var(--brand-text)',
              }}
            >
              📖 Screen Reader Support
            </h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--brand-text-muted)' }}>
              Compatible with popular screen readers like JAWS, NVDA, and
              VoiceOver
            </p>
          </div>
          <div
            style={{
              padding: '1rem',
              border: '1px solid var(--brand-border)',
              borderRadius: '6px',
            }}
          >
            <h4
              style={{
                fontSize: '1.1rem',
                marginBottom: '0.5rem',
                color: 'var(--brand-text)',
              }}
            >
              🎨 High Contrast
            </h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--brand-text-muted)' }}>
              High contrast color schemes for users with visual impairments
            </p>
          </div>
          <div
            style={{
              padding: '1rem',
              border: '1px solid var(--brand-border)',
              borderRadius: '6px',
            }}
          >
            <h4
              style={{
                fontSize: '1.1rem',
                marginBottom: '0.5rem',
                color: 'var(--brand-text)',
              }}
            >
              📝 Alternative Text
            </h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--brand-text-muted)' }}>
              Descriptive alt text for all images and visual content
            </p>
          </div>
          <div
            style={{
              padding: '1rem',
              border: '1px solid var(--brand-border)',
              borderRadius: '6px',
            }}
          >
            <h4
              style={{
                fontSize: '1.1rem',
                marginBottom: '0.5rem',
                color: 'var(--brand-text)',
              }}
            >
              📺 Captions & Transcripts
            </h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--brand-text-muted)' }}>
              Closed captions and transcripts for all video and audio content
            </p>
          </div>
          <div
            style={{
              padding: '1rem',
              border: '1px solid var(--brand-border)',
              borderRadius: '6px',
            }}
          >
            <h4
              style={{
                fontSize: '1.1rem',
                marginBottom: '0.5rem',
                color: 'var(--brand-text)',
              }}
            >
              🔍 Scalable Text
            </h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--brand-text-muted)' }}>
              Text can be resized up to 200% without loss of functionality
            </p>
          </div>
        </div>
      </section>
      <section style={{ marginBottom: '3rem' }}>
        <h2
          style={{
            fontSize: '1.8rem',
            marginBottom: '1rem',
            color: 'var(--brand-text)',
          }}
        >
          Assistive Technology Support
        </h2>
        <p
          style={{
            fontSize: '1.1rem',
            lineHeight: '1.6',
            color: 'var(--brand-text)',
            marginBottom: '1rem',
          }}
        >
          Our website is designed to work with a variety of assistive
          technologies, including:
        </p>
        <ul
          style={{
            fontSize: '1rem',
            color: 'var(--brand-text)',
            paddingLeft: '2rem',
          }}
        >
          <li style={{ marginBottom: '0.5rem' }}>
            Screen readers (JAWS, NVDA, VoiceOver, TalkBack)
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            Voice recognition software (Dragon NaturallySpeaking)
          </li>
          <li style={{ marginBottom: '0.5rem' }}>Switch navigation devices</li>
          <li style={{ marginBottom: '0.5rem' }}>Eye-tracking systems</li>
          <li style={{ marginBottom: '0.5rem' }}>Magnification software</li>
        </ul>
      </section>
      <section style={{ marginBottom: '3rem' }}>
        <h2
          style={{
            fontSize: '1.8rem',
            marginBottom: '1rem',
            color: 'var(--brand-text)',
          }}
        >
          Ongoing Efforts
        </h2>
        <div
          style={{
            backgroundColor: '#fef3c7',
            padding: '1.5rem',
            borderRadius: '8px',
          }}
        >
          <p style={{ color: '#92400e', marginBottom: '1rem' }}>
            We regularly review and test our website for accessibility
            compliance. Our ongoing efforts include:
          </p>
          <ul style={{ color: '#92400e', paddingLeft: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>
              Regular accessibility audits by third-party experts
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              User testing with individuals who use assistive technologies
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              Staff training on accessibility best practices
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              Continuous monitoring and improvement of our digital platforms
            </li>
          </ul>
        </div>
      </section>
      <section
        style={{
          backgroundColor: '#f3f4f6',
          padding: '2rem',
          borderRadius: '8px',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontSize: '1.5rem',
            marginBottom: '1rem',
            color: 'var(--brand-text)',
          }}
        >
          Need Help or Have Feedback?
        </h2>
        <p style={{ color: 'var(--brand-text-muted)', marginBottom: '1.5rem' }}>
          If you encounter any accessibility barriers or have suggestions for
          improvement, please don't hesitate to contact us.
        </p>
        <div style={{ marginBottom: '1rem' }}>
          <strong style={{ color: 'var(--brand-text)' }}>Contact:</strong>{' '}
          <a href="/connect" style={{ color: 'var(--brand-info)' }}>
            Use our contact form
          </a>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <strong style={{ color: 'var(--brand-text)' }}>Phone:</strong>{' '}
          <span style={{ color: 'var(--brand-text)' }}>(317) 314-3757</span>
        </div>
        <div
          style={{
            fontSize: '0.9rem',
            color: 'var(--brand-text-muted)',
            marginTop: '1.5rem',
          }}
        >
          We aim to respond to accessibility feedback within 2 business days.
        </div>
      </section>
      <footer
        style={{
          marginTop: '3rem',
          textAlign: 'center',
          color: 'var(--brand-text-muted)',
          fontSize: '0.9rem',
        }}
      >
        <div
          style={{
            borderTop: '1px solid var(--brand-border)',
            paddingTop: '1rem',
          }}
        >
          <a
            href="/privacy-policy"
            style={{
              color: 'var(--brand-info)',
              textDecoration: 'none',
              margin: '0 0.5rem',
            }}
          >
            Privacy Policy
          </a>
          |
          <a
            href="/refund-policy"
            style={{
              color: 'var(--brand-info)',
              textDecoration: 'none',
              margin: '0 0.5rem',
            }}
          >
            Refund Policy
          </a>
          |
          <a
            href="/terms-of-service"
            style={{
              color: 'var(--brand-info)',
              textDecoration: 'none',
              margin: '0 0.5rem',
            }}
          >
            Terms of Service
          </a>
          |
          <a
            href="/compliance"
            style={{
              color: 'var(--brand-info)',
              textDecoration: 'none',
              margin: '0 0.5rem',
            }}
          >
            Compliance
          </a>
          |
          <a
            href="/sitemap"
            style={{
              color: 'var(--brand-info)',
              textDecoration: 'none',
              margin: '0 0.5rem',
            }}
          >
            Sitemap
          </a>
        </div>
        <div style={{ marginTop: '1rem' }}>Last updated: January 15, 2025</div>
      </footer>
    </main>
  );
}
