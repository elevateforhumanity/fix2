import React from 'react';
import { Metadata } from 'next';
// Image asset: /images/programs-new/program-23.jpg

export const metadata: Metadata = {
  title: "Employer Dashboard - Manage Jobs & Candidates",
  description: "Post jobs, review candidates, and manage your workforce pipeline. Connect with job-ready talent trained in healthcare, skilled trades, and more.",
  keywords: ["employer dashboard", "post jobs", "hire talent", "workforce pipeline", "candidate management"],
  openGraph: {
    title: "Employer Dashboard | Elevate for Humanity",
    description: "Post jobs, review candidates, and manage your workforce pipeline.",
    images: ["/images/homepage/employer-partnerships.png"],
    type: "website",
  },
};

export default function EmployerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
