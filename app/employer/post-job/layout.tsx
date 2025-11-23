import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Post a Job - Hire Skilled Workers",
  description: "Post job openings and connect with qualified candidates trained in healthcare, skilled trades, CDL, and more. Access our talent pipeline.",
  keywords: ["post job", "hire workers", "job posting", "talent acquisition", "workforce hiring"],
  openGraph: {
    title: "Post a Job - Hire Skilled Workers | Elevate for Humanity",
    description: "Post job openings and connect with qualified candidates trained in healthcare and skilled trades.",
    images: ["/images/homepage/employer-partnerships.png"],
    type: "website",
  },
};

export default function PostJobLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
