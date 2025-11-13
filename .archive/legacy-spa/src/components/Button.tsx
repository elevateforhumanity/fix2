/**
 * Button Component
 * Matches elevateforhumanity.org button styles exactly
 * Extracted from: https://elevateproduction.netlify.app
 *
 * Variants:
 * - primary (default): Green background, white text
 * - secondary: White background, green border
 * - white: White background, brown text
 * - outline-white: Transparent background, white border
 * - large: Larger padding and text
 */

import React from 'react';
import { Link } from 'react-router-dom';

type ButtonVariant = 'primary' | 'secondary' | 'white' | 'outline-white';
type ButtonSize = 'default' | 'large';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  to?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'default',
  href,
  to,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
}: ButtonProps) {
  // Build class names based on variant and size
  const baseClass = 'button';
  const variantClass = variant === 'primary' ? '' : `button-${variant}`;
  const sizeClass = size === 'large' ? 'button-large' : '';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : '';

  const fullClassName =
    `${baseClass} ${variantClass} ${sizeClass} ${disabledClass} ${className}`.trim();

  // External link
  if (href) {
    return (
      <a
        href={href}
        className={fullClassName}
        onClick={disabled ? (e) => e.preventDefault() : undefined}
        aria-disabled={disabled}
      >
        {children}
      </a>
    );
  }

  // Internal link (React Router)
  if (to) {
    return (
      <Link
        to={to}
        className={fullClassName}
        onClick={disabled ? (e) => e.preventDefault() : undefined}
        aria-disabled={disabled}
      >
        {children}
      </Link>
    );
  }

  // Button element
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={fullClassName}
    >
      {children}
    </button>
  );
}

// Export convenience components for each variant
export function ButtonPrimary(props: Omit<ButtonProps, 'variant'>) {
  return <Button {...props} variant="primary" />;
}

export function ButtonSecondary(props: Omit<ButtonProps, 'variant'>) {
  return <Button {...props} variant="secondary" />;
}

export function ButtonWhite(props: Omit<ButtonProps, 'variant'>) {
  return <Button {...props} variant="white" />;
}

export function ButtonOutlineWhite(props: Omit<ButtonProps, 'variant'>) {
  return <Button {...props} variant="outline-white" />;
}

export function ButtonLarge(props: Omit<ButtonProps, 'size'>) {
  return <Button {...props} size="large" />;
}
