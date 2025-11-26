import Link from "next/link";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mobile Page.Tsx - Workforce Development Platform | Elevate for Humanity",
  description: "Elevate for Humanity connects job seekers with free career training and employers with skilled talent.",
  keywords: ["workforce development", "career training", "job placement", "WIOA"],
  openGraph: {
    title: "Mobile Page.Tsx - Workforce Development Platform | Elevate for Humanity",
    description: "Elevate for Humanity connects job seekers with free career training and employers with skilled talent.",
    images: ["/images/hero-new/hero-10.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mobile Page.Tsx - Workforce Development Platform | Elevate for Humanity",
    description: "Elevate for Humanity connects job seekers with free career training and employers with skilled talent.",
    images: ["/images/hero-banner-new.png"],
  },
};



export default function MobileAppPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-slate-50 to-white py-20 border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">
            Elevate Mobile App
          </h1>
          <p className="mt-4 text-xl text-slate-600">
            Access your training, track progress, and stay connected — all from your phone
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6">
          <div className="prose prose-slate max-w-none">
            <h2>Coming Soon</h2>
            <p>
              The Elevate For Humanity mobile app is currently in development. Soon you'll be able to:
            </p>
            <ul>
              <li>Access your courses and training materials on the go</li>
              <li>Track your progress and milestones</li>
              <li>Communicate with coaches and instructors</li>
              <li>View your schedule and upcoming events</li>
              <li>Submit assignments and complete quizzes</li>
              <li>Receive notifications about important updates</li>
            </ul>

            <h2>Stay Updated</h2>
            <p>
              Want to be notified when the mobile app launches? Sign up for updates through your student portal.
            </p>

            <div className="mt-12 rounded-lg bg-red-50 p-8 border border-red-200">
              <h3 className="text-xl font-bold text-slate-900">In the meantime</h3>
              <p className="mt-2 text-slate-600">
                Access all your training materials through the student portal on any device.
              </p>
              <div className="mt-6">
                <Link
                  href="/app"
                  className="inline-flex items-center justify-center rounded-lg bg-red-600 px-6 py-3 text-base font-semibold text-white hover:bg-red-700"
                >
                  Go to Student Portal
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
