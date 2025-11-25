import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/auth';
import AdminNav from '@/components/AdminNav';
import AdminHeader from '@/components/AdminHeader';
import { SiteFooter } from '@/components/layout/Footer';

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

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Require admin authentication
  try {
    await requireAdmin();
  } catch (error) {
    // Redirect to admin login with return URL
    redirect('/admin/login?redirect=/admin');
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <AdminNav />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header with Sign Out */}
        <AdminHeader />
        
        {/* Page Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
