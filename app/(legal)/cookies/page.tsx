// app/(legal)/cookies/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy - How We Use Cookies",
  description: "Learn about how Elevate for Humanity uses cookies and similar technologies. Understand your rights and how to control cookie preferences.",
  keywords: ["cookie policy", "privacy", "cookies", "data protection", "user privacy"],
  openGraph: {
    title: "Cookie Policy | Elevate for Humanity",
    description: "Learn about how we use cookies and similar technologies. Understand your rights and cookie preferences.",
    images: ["/images/hero-banner-new.png"],
    type: "website",
  },
};

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-4xl rounded-xl bg-white p-8 shadow">
        <h1 className="mb-4 text-3xl font-bold">Cookie Policy</h1>
        <p className="mb-4 text-sm text-slate-500">
          Last updated: November 18, 2025
        </p>
        
        <div className="prose prose-slate max-w-none">
          <p className="mb-4">
            This Cookie Policy explains how Elevate for Humanity uses cookies and
            similar technologies to recognize you when you visit our platform. It
            explains what these technologies are and why we use them, as well as your
            rights to control our use of them.
          </p>
          <h2 className="mt-6 text-xl font-semibold">1. What Are Cookies?</h2>
          <p className="mb-4">
            Cookies are small data files that are placed on your computer or mobile
            device when you visit a website. Cookies are widely used by website
            owners to make their websites work, or to work more efficiently, as well
            as to provide reporting information.
          </p>
          <h2 className="mt-6 text-xl font-semibold">2. Why We Use Cookies</h2>
          <p className="mb-4">We use cookies for several reasons:</p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Essential Cookies:</strong> Required for the platform to function properly</li>
            <li><strong>Security Cookies:</strong> Help us detect and prevent security threats</li>
            <li><strong>Performance Cookies:</strong> Help us understand how visitors interact with our platform</li>
            <li><strong>Functionality Cookies:</strong> Remember your preferences and settings</li>
          </ul>
          <h2 className="mt-6 text-xl font-semibold">3. Types of Cookies We Use</h2>
          <h3 className="mt-4 text-lg font-semibold">3.1 Essential Cookies</h3>
          <p className="mb-4">
            These cookies are strictly necessary for the platform to function and
            cannot be switched off in our systems. They are usually only set in
            response to actions made by you which amount to a request for services,
            such as setting your privacy preferences, logging in, or filling in forms.
          </p>
          <table className="min-w-full border border-slate-200 mb-4">
            <thead className="bg-slate-50">
              <tr>
                <th className="border border-slate-200 px-4 py-2 text-left">Cookie Name</th>
                <th className="border border-slate-200 px-4 py-2 text-left">Purpose</th>
                <th className="border border-slate-200 px-4 py-2 text-left">Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-200 px-4 py-2">session_last_active</td>
                <td className="border border-slate-200 px-4 py-2">Session management and timeout</td>
                <td className="border border-slate-200 px-4 py-2">Session</td>
              </tr>
              <tr>
                <td className="border border-slate-200 px-4 py-2">sb-access-token</td>
                <td className="border border-slate-200 px-4 py-2">Authentication token</td>
                <td className="border border-slate-200 px-4 py-2">1 hour</td>
              </tr>
              <tr>
                <td className="border border-slate-200 px-4 py-2">sb-refresh-token</td>
                <td className="border border-slate-200 px-4 py-2">Refresh authentication</td>
                <td className="border border-slate-200 px-4 py-2">30 days</td>
              </tr>
            </tbody>
          </table>
          <h3 className="mt-4 text-lg font-semibold">3.2 Performance and Analytics Cookies</h3>
          <p className="mb-4">
            These cookies allow us to count visits and traffic sources so we can
            measure and improve the performance of our platform. They help us know
            which pages are the most and least popular and see how visitors move
            around the site.
          </p>
          <h3 className="mt-4 text-lg font-semibold">3.3 Functionality Cookies</h3>
          <p className="mb-4">
            These cookies enable the platform to provide enhanced functionality and
            personalization. They may be set by us or by third-party providers whose
            services we have added to our pages.
          </p>
          <h2 className="mt-6 text-xl font-semibold">4. Third-Party Cookies</h2>
          <p className="mb-4">
            In addition to our own cookies, we may also use various third-party
            cookies to report usage statistics of the platform and deliver
            advertisements on and through the platform.
          </p>
          <h2 className="mt-6 text-xl font-semibold">5. How to Control Cookies</h2>
          <p className="mb-4">
            You have the right to decide whether to accept or reject cookies. You can
            exercise your cookie preferences by clicking on the appropriate opt-out
            links provided in the cookie banner.
          </p>
          <p className="mb-4">
            You can also set or amend your web browser controls to accept or refuse
            cookies. If you choose to reject cookies, you may still use our platform
            though your access to some functionality and areas may be restricted.
          </p>
          <h3 className="mt-4 text-lg font-semibold">Browser Controls</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
            <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
            <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
            <li><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
          </ul>
          <h2 className="mt-6 text-xl font-semibold">6. Do Not Track Signals</h2>
          <p className="mb-4">
            Some browsers incorporate a "Do Not Track" (DNT) feature that signals to
            websites that you do not want to have your online activity tracked. We
            currently do not respond to DNT signals.
          </p>
          <h2 className="mt-6 text-xl font-semibold">7. Updates to This Policy</h2>
          <p className="mb-4">
            We may update this Cookie Policy from time to time to reflect changes to
            the cookies we use or for other operational, legal, or regulatory reasons.
          </p>
          <h2 className="mt-6 text-xl font-semibold">8. Contact Us</h2>
          <p className="mb-4">
            If you have questions about our use of cookies, please contact us at:
          </p>
          <p className="mb-4">
            <strong>Elevate for Humanity</strong><br />
            Email: elizabethpowell6262@gmail.com<br />
            Phone: (555) 123-4567
          </p>
        </div>
      </div>
    </main>
  );
}
