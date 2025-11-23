import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Admin Portal - Manage Programs & Operations",
  description: "Manage programs, students, certificates, compliance, and workforce development operations. Admin dashboard for Elevate for Humanity.",
  keywords: ["admin portal", "program management", "workforce administration", "compliance", "operations"],
  openGraph: {
    title: "Admin Portal | Elevate for Humanity",
    description: "Manage programs, students, certificates, and workforce development operations.",
    images: ["/images/hero-banner-new.png"],
    type: "website",
  },
};

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
