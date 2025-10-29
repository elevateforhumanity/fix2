// =============================
// File: src/pages/legal/TermsOfUse.tsx
// Description: Terms of Use with anti-copying, anti-reverse engineering, and anti-scraping clauses
// Route: /legal/terms
// =============================
export default function TermsOfUse() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-semibold tracking-tight">
        Terms of Use
      </h1>
      <div className="prose prose-gray max-w-none">
        <p>
          These Terms of Use ("Terms") govern your access to and use of the
          Elevate for Humanity platform. By using the site, you agree to these
          Terms.
        </p>
        <h2>Limited License</h2>
        <p>
          EFH grants you a limited, non-exclusive, non-transferable license to
          access and use the platform for legitimate educational or training
          purposes. All rights not expressly granted are reserved by EFH.
        </p>
        <h2>Restrictions</h2>
        <ul>
          <li>
            No copying, reproduction, republication, framing, or distribution of
            EFH Technology or content except as permitted through the platform's
            normal features
          </li>
          <li>
            No reverse engineering, decompiling, or attempting to derive source
            code, data models, or certificate pipelines
          </li>
          <li>
            No automated scraping or harvesting, including without limitation
            bots that collect course, program, or user data
          </li>
          <li>
            No reselling, licensing, or offering competing services built on EFH
            Technology without a separate written agreement
          </li>
        </ul>
        <h2>Ownership</h2>
        <p>
          EFH retains full ownership of the EFH Technology, including but not
          limited to code, schemas, buckets, workers, functions, and
          AI/autopilot workflows.
        </p>
        <h2>User Content</h2>
        <p>
          You retain ownership of your own content. You grant EFH a license to
          host and process it to operate the service.
        </p>
        <h2>DMCA</h2>
        <p>
          We respect intellectual property rights. See our{' '}
          <a href="/legal/dmca">DMCA page</a> for takedown instructions.
        </p>
        <h2>Termination</h2>
        <p>
          We may suspend or terminate access for violations of these Terms. Upon
          termination, all rights granted to you cease.
        </p>
        <h2>Governing Law</h2>
        <p>
          These Terms are governed by the laws of the State of Indiana, without
          regard to conflict-of-law principles.
        </p>
        <h2>Contact</h2>
        <p>
          Questions:{' '}
          <a href="mailto:legal@elevateforhumanity.org">
            legal@elevateforhumanity.org
          </a>
        </p>
      </div>
    </main>
  );
}
