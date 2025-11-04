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

/*
  Copyright (c) 2025 Elevate for Humanity
  Commercial License. No resale, sublicensing, or redistribution allowed.
  See LICENSE file for details.
*/
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function Home() {
  // Load chat widget (Tidio public key is present)
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//code.tidio.co/3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Blog posts - static for now (Durable API removed due to 404)
  const blogs = [];

  return (
    <main role="main" style={{ padding: 32, maxWidth: 900, margin: '0 auto' }}>
      <Helmet>
        <title>
          Elevate for Humanity | 501(c)(3) Nonprofit | ByBlack Certified |
          Government Contractor
        </title>
        <meta
          name="description"
          content="501(c)(3) nonprofit, ByBlack Certified Business, SAM.gov registered government contractor. DOL-compliant workforce training, IRS VITA partner. Serving communities through federal and state contracts."
        />
        <meta
          name="keywords"
          content="501c3 nonprofit, ByBlack certified, government contractor, SAM.gov, DOL compliant, VITA partner, workforce training, Indiana state bidder, minority owned business, Learn2Earn, online courses, federal contracts"
        />
        <meta
          property="og:title"
          content="Elevate for Humanity | 501(c)(3) Nonprofit | ByBlack Certified | Government Contractor"
        />
        <meta
          property="og:description"
          content="501(c)(3) nonprofit, ByBlack Certified Business, SAM.gov registered government contractor serving communities through workforce training and education."
        />
        <meta property="og:url" content="https://elevateforhumanity.org/" />
      </Helmet>
      <header>
        <div
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: 16,
            borderRadius: 12,
            margin: '16px 0',
            fontWeight: 'bold',
            textAlign: 'center',
            color: 'white',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          }}
        >
          <div style={{ fontSize: 18, marginBottom: 8 }}>
            <span role="img" aria-label="nonprofit">
              🏛️
            </span>{' '}
            501(c)(3) Nonprofit Organization{' '}
            <span role="img" aria-label="certified">
              ✅
            </span>{' '}
            ByBlack Certified Business
          </div>
          <div style={{ fontSize: 14, opacity: 0.95 }}>
            SAM.gov Registered (3 Entities) | Indiana State Bidder | IRS VITA
            Partner (SIDN: S28011182)
          </div>
          <div style={{ fontSize: 14, opacity: 0.95, marginTop: 4 }}>
            DOL/DOE/DWD Compliant | Official U.S. Government Contractor
          </div>
        </div>
        <nav
          role="navigation"
          style={{ marginBottom: 32, textAlign: 'center' }}
        >
          <Link to="/" style={{ margin: '0 12px', fontWeight: 'bold' }}>
            Home
          </Link>
          <Link to="/ecosystem" style={{ margin: '0 12px' }}>
            Ecosystem
          </Link>
          <Link to="/student" style={{ margin: '0 12px' }}>
            Student
          </Link>
          <Link to="/instructor" style={{ margin: '0 12px' }}>
            Instructor
          </Link>
          <Link to="/analytics" style={{ margin: '0 12px' }}>
            Analytics
          </Link>
          <Link to="/courses" style={{ margin: '0 12px' }}>
            Course Library
          </Link>
        </nav>
      </header>
      <section
        style={{
          background: '#fffde7',
          padding: 24,
          borderRadius: 12,
          marginBottom: 32,
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: 36, marginBottom: 12 }}>Elevate for Humanity</h1>
        <h2 style={{ fontSize: 24, marginBottom: 8, color: '#1976d2' }}>
          Selfish Inc. / Rise Forward Foundation
        </h2>
        <h3
          style={{
            fontSize: 18,
            marginBottom: 12,
            color: '#7c3aed',
            fontWeight: 'bold',
          }}
        >
          501(c)(3) Nonprofit | ByBlack Certified | Government Contractor
        </h3>
        <p style={{ fontSize: 18, color: '#444' }}>
          Our 501(c)(3) nonprofit delivers accessible, DOL-compliant online
          learning and Elevate Learn2Earn Workforce solutions. As a ByBlack
          Certified Business with 3 active SAM.gov registrations, we're
          positioned to serve communities through federal and state contracts.
          Powered by a Google Ad Grant, we reach more learners nationwide.
        </p>
        <div style={{ marginTop: 16 }}>
          <a
            href="https://selfishinc.org"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: '#1976d2',
              color: '#fff',
              padding: '12px 24px',
              borderRadius: 8,
              fontWeight: 'bold',
              textDecoration: 'none',
              fontSize: 18,
              marginRight: 12,
            }}
          >
            Learn More About Selfish Inc. dba
          </a>
          <Link
            to="/courses"
            style={{
              background: '#388e3c',
              color: '#fff',
              padding: '12px 24px',
              borderRadius: 8,
              fontWeight: 'bold',
              textDecoration: 'none',
              fontSize: 18,
            }}
          >
            Explore Courses
          </Link>
        </div>
      </section>
      {/* ENROLLMENT PROGRAMS SECTION */}
      <section
        style={{
          marginTop: 48,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: 48,
          borderRadius: 16,
          color: '#fff',
          textAlign: 'center',
        }}
      >
        <h2 style={{ fontSize: 32, marginBottom: 16, color: '#fff' }}>
          🎓 Enroll in Our Programs Today
        </h2>
        <p
          style={{
            fontSize: 18,
            marginBottom: 32,
            maxWidth: 700,
            margin: '0 auto 32px',
          }}
        >
          Transform your career with our DOL-compliant workforce training
          programs. Federal funding available for eligible participants.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              background: 'rgba(255,255,255,0.15)',
              padding: 24,
              borderRadius: 12,
              backdropFilter: 'blur(10px)',
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 12 }}>💻</div>
            <h3 style={{ fontSize: 20, marginBottom: 8 }}>
              AI & Machine Learning
            </h3>
            <p style={{ fontSize: 14, marginBottom: 16 }}>
              12-week intensive program with industry certifications
            </p>
            <div style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}>
              $1,997
            </div>
            <div style={{ fontSize: 12, marginBottom: 16 }}>
              89% job placement rate
            </div>
            <Link
              to="/programs"
              style={{
                background: '#fff',
                color: '#667eea',
                padding: '10px 20px',
                borderRadius: 8,
                fontWeight: 'bold',
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              Enroll Now
            </Link>
          </div>
          <div
            style={{
              background: 'rgba(255,255,255,0.15)',
              padding: 24,
              borderRadius: 12,
              backdropFilter: 'blur(10px)',
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 12 }}>📊</div>
            <h3 style={{ fontSize: 20, marginBottom: 8 }}>
              Data Science Bootcamp
            </h3>
            <p style={{ fontSize: 14, marginBottom: 16 }}>
              16-week comprehensive analytics training
            </p>
            <div style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}>
              $4,950
            </div>
            <div style={{ fontSize: 12, marginBottom: 16 }}>
              92% job placement rate
            </div>
            <Link
              to="/programs"
              style={{
                background: '#fff',
                color: '#667eea',
                padding: '10px 20px',
                borderRadius: 8,
                fontWeight: 'bold',
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              Enroll Now
            </Link>
          </div>
          <div
            style={{
              background: 'rgba(255,255,255,0.15)',
              padding: 24,
              borderRadius: 12,
              backdropFilter: 'blur(10px)',
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔒</div>
            <h3 style={{ fontSize: 20, marginBottom: 8 }}>
              Cybersecurity Specialist
            </h3>
            <p style={{ fontSize: 14, marginBottom: 16 }}>
              20-week certification program
            </p>
            <div style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}>
              $3,495
            </div>
            <div style={{ fontSize: 12, marginBottom: 16 }}>
              95% job placement rate
            </div>
            <Link
              to="/programs"
              style={{
                background: '#fff',
                color: '#667eea',
                padding: '10px 20px',
                borderRadius: 8,
                fontWeight: 'bold',
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              Enroll Now
            </Link>
          </div>
        </div>
        <div style={{ marginTop: 32 }}>
          <Link
            to="/programs"
            style={{
              background: '#fff',
              color: '#667eea',
              padding: '16px 32px',
              borderRadius: 8,
              fontWeight: 'bold',
              textDecoration: 'none',
              fontSize: 18,
              display: 'inline-block',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            }}
          >
            View All 50+ Programs →
          </Link>
        </div>
        <div
          style={{
            marginTop: 32,
            padding: 16,
            background: 'rgba(255,255,255,0.1)',
            borderRadius: 8,
            fontSize: 14,
          }}
        >
          ✅ Federal Funding Available | ✅ DOL Compliant | ✅ Industry
          Certifications
        </div>
      </section>
      <section style={{ marginTop: 32, textAlign: 'center' }}>
        <h2>Contact Us</h2>
        <p>
          Chat with us using the chat assistant (bottom right) or text us at{' '}
          <strong>(555) 123-4567</strong> (powered by Twilio).
        </p>
      </section>
      <section style={{ marginTop: 48 }}>
        <h2>Latest News & Updates</h2>
        <ul>
          <li>
            <a href="/about" rel="noopener noreferrer">
              How Elevate for Humanity Empowers Communities
            </a>
          </li>
          <li>
            <a href="/partners" rel="noopener noreferrer">
              Selfish Inc. dba Partnership: Expanding Our Impact
            </a>
          </li>
          <li>
            <a href="/compliance" rel="noopener noreferrer">
              DOL Compliance: What It Means for Our Learners
            </a>
          </li>
        </ul>
      </section>
      <footer style={{ marginTop: 48, textAlign: 'center', color: '#888' }}>
        <div>
          <a
            href="https://linkedin.com/company/elevateforhumanity"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>{' '}
          |{' '}
          <a
            href="https://facebook.com/elevateforhumanity"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>{' '}
          |{' '}
          <a
            href="https://www.youtube.com/@elevateforhumanity"
            target="_blank"
            rel="noopener noreferrer"
          >
            YouTube
          </a>
        </div>
        <div style={{ marginTop: 8 }}>
          &copy; {new Date().getFullYear()} Elevate for Humanity &amp; Selfish
          Inc. dba. All rights reserved.
        </div>
      </footer>
      <div
        style={{
          background: '#fff3cd',
          padding: 16,
          borderRadius: 8,
          marginTop: 32,
          textAlign: 'center',
          color: '#856404',
        }}
      >
        <strong>License Notice:</strong> By purchasing, you agree not to resell,
        sublicense, or redistribute this codebase. All rights reserved.
        Violators will be prosecuted. See the LICENSE file for full terms.
      </div>
    </main>
  );
}
