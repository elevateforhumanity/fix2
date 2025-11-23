import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Student Dashboard - My Learning",
  description: "Access your courses, track progress, view assignments, and manage your learning journey in one place.",
  keywords: ["student dashboard", "learning management", "course progress", "online learning", "my courses"],
  openGraph: {
    title: "Student Dashboard - My Learning | Elevate for Humanity",
    description: "Access your courses, track progress, view assignments, and manage your learning journey.",
    images: ["/images/homepage/student-portal.png"],
    type: "website",
  },
};

export default function LMSDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
