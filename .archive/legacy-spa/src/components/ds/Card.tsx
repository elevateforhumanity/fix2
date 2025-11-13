import { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'elevated' | 'bordered';
}

export function Card({ children, variant = 'default', className = '', ...props }: CardProps) {
  const variants = {
    default: 'rounded-2xl border border-slate-200 bg-slate-50 p-6',
    elevated: 'rounded-2xl bg-white shadow-lg p-6',
    bordered: 'rounded-2xl border-2 border-slate-300 bg-white p-6',
  };

  return (
    <div className={`${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
}

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function CardHeader({ title, subtitle, className = '' }: CardHeaderProps) {
  return (
    <div className={className}>
      <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
      {subtitle && <p className="mt-1 text-sm text-slate-600">{subtitle}</p>}
    </div>
  );
}

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function CardContent({ children, className = '', ...props }: CardContentProps) {
  return (
    <div className={`mt-4 ${className}`} {...props}>
      {children}
    </div>
  );
}
