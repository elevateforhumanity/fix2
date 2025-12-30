import { LiveChatWidget } from '@/components/LiveChatWidget';
import { SupersonicHeader } from './components/Header';

export default function SupersonicFastCashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SupersonicHeader />
      {children}
      <LiveChatWidget />
    </>
  );
}
