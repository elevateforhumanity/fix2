import { ReactNode, ButtonHTMLAttributes } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

/**
 * LOCKED Button Component
 *
 * Only 2 variants allowed: primary or secondary
 * Enforces CTA hierarchy
 */

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  href?: string;
  arrow?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  href,
  arrow = false,
  className = '',
  ...props
}: ButtonProps) {
  const baseClass =
    'inline-flex items-center justify-center gap-2 px-8 py-4 font-bold rounded-lg transition';

  const variantClass = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary:
      'bg-white text-slate-900 border-2 border-slate-200 hover:bg-slate-50',
  }[variant];

  const fullClass = `${baseClass} ${variantClass} ${className}`;

  const content = (
    <>
      {children}
      {arrow && <ArrowRight className="h-5 w-5" />}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={fullClass}>
        {content}
      </Link>
    );
  }

  return (
    <button className={fullClass} {...props}>
      {content}
    </button>
  );
}

/**
 * LOCKED Text Link
 *
 * For secondary actions that don't need button weight
 */
export function TextLink({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
    >
      {children}
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}
