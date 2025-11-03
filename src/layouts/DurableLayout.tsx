import React from 'react';
import DurableNav from '../components/DurableNav';
import DurableFooter from '../components/DurableFooter';
import '../styles/durable-design.css';

interface DurableLayoutProps {
  children: React.ReactNode;
}

export default function DurableLayout({ children }: DurableLayoutProps) {
  return (
    <div className="durable-layout">
      <DurableNav />
      <main>{children}</main>
      <DurableFooter />
    </div>
  );
}
