"use client";

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getMyPartnerContext } from '@/lib/partner/access';
import PartnerShell from '@/components/partner/PartnerShell';

export default function PartnerLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const [ctx, setCtx] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyPartnerContext().then((context) => {
      if (!context?.user) {
        router.push('/partners/login');
      } else {
        setCtx(context);
        setLoading(false);
      }
    });
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <PartnerShell ctx={ctx}>{children}</PartnerShell>;
}
