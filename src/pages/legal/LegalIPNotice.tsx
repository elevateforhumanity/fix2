// =============================
// File: src/pages/legal/LegalIPNotice.tsx
// Description: Intellectual Property Notice page
// Route: /legal/ip-notice
// =============================
export default function LegalIPNotice() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-semibold tracking-tight">
        Intellectual Property Notice
      </h1>
      <div className="prose prose-gray max-w-none">
        <p>
          Elevate for Humanity ("EFH") owns all rights, title, and interest in
          and to the EFH platform, including software code, architecture,
          schemas, data models, content, graphics, workflows, and automation
          scripts (collectively, the "EFH Technology"). The EFH Technology is
          protected by U.S. and international copyright, trademark, and other
          laws. No license is granted by implication, estoppel, or otherwise,
          unless expressly stated in a written agreement signed by EFH.
        </p>
        <h2>Prohibited Uses</h2>
        <ul>
          <li>
            Copying, reproducing, or distributing EFH Technology or any
            substantial part of it
          </li>
          <li>
            Reverse engineering, decompiling, or attempting to derive source
            code, data models, or schemas
          </li>
          <li>
            Scraping, harvesting, or bulk extracting course data, certificates,
            or API responses
          </li>
          <li>
            Reselling, white-labeling, sublicensing, or offering competing
            services using EFH Technology without a written license
          </li>
        </ul>
        <h2>Trademarks</h2>
        <p>
          "Elevate for Humanity," the EFH logo, and related marks are trademarks
          of EFH. You may not use EFH marks without prior written permission.
        </p>
        <h2>Licensing and Partnerships</h2>
        <p>
          Organizations interested in legitimate partnerships, white-label
          licenses, or API access may contact{' '}
          <a href="mailto:legal@elevateforhumanity.org">
            legal@elevateforhumanity.org
          </a>
          .
        </p>
        <h2>Reporting Concerns</h2>
        <p>
          To report unauthorized use, contact our DMCA agent listed on the{' '}
          <a href="/legal/dmca">DMCA page</a>.
        </p>
      </div>
    </main>
  );
}
