export const dynamic = 'force-dynamic';

// Image asset: /images/students-new/student-30.jpg
// Prevent static generation for all portal pages
export const revalidate = 0;

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
