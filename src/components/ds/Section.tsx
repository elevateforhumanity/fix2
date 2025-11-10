import { HTMLAttributes, ReactNode } from 'react';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  background?: 'white' | 'gray' | 'dark';
  spacing?: 'sm' | 'md' | 'lg';
}

export function Section({ 
  children, 
  background = 'white', 
  spacing = 'md',
  className = '',
  ...props 
}: SectionProps) {
  const backgrounds = {
    white: 'bg-white',
    gray: 'bg-slate-50',
    dark: 'bg-slate-900 text-white',
  };

  const spacings = {
    sm: 'py-8 lg:py-12',
    md: 'py-12 lg:py-16',
    lg: 'py-16 lg:py-24',
  };

  return (
    <section 
      className={`${backgrounds[background]} ${spacings[spacing]} ${className}`}
      {...props}
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        {children}
      </div>
    </section>
  );
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeader({ 
  title, 
  subtitle, 
  align = 'left',
  className = '' 
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center' : '';

  return (
    <div className={`${alignClass} ${className}`}>
      <h2 className="text-3xl font-bold text-slate-900">{title}</h2>
      {subtitle && (
        <p className="mt-2 text-lg text-slate-700">{subtitle}</p>
      )}
    </div>
  );
}
