import { WorkOneBanner } from '@/components/banners/WorkOneBanner';

export default function ProgramsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <WorkOneBanner />
      {children}
    </>
  );
}
