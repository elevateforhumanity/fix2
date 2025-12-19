import Link from 'next/link';

type Props = {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'ghost';
  className?: string;
};

export function Button({
  href,
  onClick,
  children,
  variant = 'primary',
  className = '',
}: Props) {
  const base =
    'inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition shadow-soft';
  const styles =
    variant === 'primary'
      ? 'bg-brand-500 text-white hover:bg-brand-600'
      : 'bg-white text-slate-900 hover:bg-slate-50 border border-slate-200 shadow-none';

  const Comp: any = href ? Link : 'button';
  return (
    <Comp
      href={href}
      onClick={onClick}
      className={`${base} ${styles} ${className}`}
      type={href ? undefined : 'button'}
    >
      {children}
    </Comp>
  );
}
