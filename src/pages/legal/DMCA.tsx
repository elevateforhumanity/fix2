// =============================
// File: src/pages/legal/DMCA.tsx
// Description: DMCA Takedown Policy and Agent
// Route: /legal/dmca
// =============================
export function DMCA() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-semibold tracking-tight">
        DMCA Takedown Policy
      </h1>
      <div className="prose prose-gray max-w-none">
        <p>
          If you believe content on EFH infringes your copyright, send a notice
          containing the following to our designated agent:
        </p>
        <ol>
          <li>Your physical or electronic signature</li>
          <li>
            Identification of the copyrighted work claimed to have been
            infringed
          </li>
          <li>
            Identification of the material that is claimed to be infringing and
            information reasonably sufficient to permit us to locate the
            material
          </li>
          <li>
            Your contact information (name, address, telephone, and email)
          </li>
          <li>
            A statement that you have a good-faith belief that use of the
            material is not authorized by the copyright owner, its agent, or the
            law
          </li>
          <li>
            A statement, under penalty of perjury, that the information in the
            notice is accurate and that you are the copyright owner or
            authorized to act on the owner's behalf
          </li>
        </ol>
        <h2>Designated Agent</h2>
        <p>
          <strong>Legal Team – Elevate for Humanity</strong>
          <br />
          9465 Counselors Row, Suite 200
          <br />
          Indianapolis, IN 46240
          <br />
          Email:{' '}
          <a href="mailto:legal@elevateforhumanity.org">
            legal@elevateforhumanity.org
          </a>
          <br />
          Phone: <a href="tel:+13173143757">(317) 314-3757</a>
        </p>
        <h2>Counter-Notification</h2>
        <p>
          If you believe your content was removed in error, you may submit a
          counter-notification containing:
        </p>
        <ol>
          <li>Your physical or electronic signature</li>
          <li>
            Identification of the material that was removed and its location
            before removal
          </li>
          <li>
            A statement under penalty of perjury that you have a good-faith
            belief the material was removed by mistake or misidentification
          </li>
          <li>
            Your name, address, telephone number, and a statement that you
            consent to the jurisdiction of the Federal District Court for the
            judicial district in which your address is located
          </li>
        </ol>
        <h2>Repeat Infringer Policy</h2>
        <p>
          EFH will terminate the accounts of users who are repeat infringers of
          intellectual property rights.
        </p>
        <h2>False Claims</h2>
        <p>
          Under Section 512(f) of the DMCA, any person who knowingly materially
          misrepresents that material is infringing may be subject to liability
          for damages.
        </p>
      </div>
    </main>
  );
}
