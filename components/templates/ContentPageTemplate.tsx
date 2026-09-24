// Template for 90% of pages - NO HERO, text-first
import { ReactNode } from 'react';

interface ContentPageTemplateProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export default function ContentPageTemplate({
  title,
  description,
  children,
}: ContentPageTemplateProps) {
  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-slate-200 bg-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-950">{title}</h1>
          {description && (
            <p className="text-xl text-slate-600 max-w-3xl">{description}</p>
          )}
        </div>
      </div>

      {/* Content area */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {children}
      </div>
    </div>
  );
}
