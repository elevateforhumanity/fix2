/**
 * Enhanced Loading Spinner Component
 * Beautiful animated loading states with multiple variants
 */

import { Loader2 } from 'lucide-react';

interface EnhancedLoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'spinner' | 'dots' | 'pulse' | 'bars';
  text?: string;
  fullScreen?: boolean;
  className?: string;
}

export default function EnhancedLoadingSpinner({
  size = 'md',
  variant = 'spinner',
  text,
  fullScreen = false,
  className = '',
}: EnhancedLoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const containerClasses = fullScreen
    ? 'fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50'
    : 'flex items-center justify-center';

  const renderSpinner = () => {
    switch (variant) {
      case 'spinner':
        return (
          <Loader2
            className={`${sizeClasses[size]} text-blue-600 animate-spin`}
          />
        );

      case 'dots':
        return (
          <div className="flex gap-2">
            <div
              className={`${sizeClasses[size]} bg-blue-600 rounded-full animate-bounce`}
              style={{ animationDelay: '0ms' }}
            />
            <div
              className={`${sizeClasses[size]} bg-blue-600 rounded-full animate-bounce`}
              style={{ animationDelay: '150ms' }}
            />
            <div
              className={`${sizeClasses[size]} bg-blue-600 rounded-full animate-bounce`}
              style={{ animationDelay: '300ms' }}
            />
          </div>
        );

      case 'pulse':
        return (
          <div className="relative">
            <div
              className={`${sizeClasses[size]} bg-blue-600 rounded-full animate-ping absolute`}
            />
            <div
              className={`${sizeClasses[size]} bg-blue-600 rounded-full relative`}
            />
          </div>
        );

      case 'bars':
        return (
          <div className="flex gap-1 items-end">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-2 bg-blue-600 rounded-full animate-pulse"
                style={{
                  height:
                    size === 'sm'
                      ? '16px'
                      : size === 'md'
                        ? '24px'
                        : size === 'lg'
                          ? '32px'
                          : '40px',
                  animationDelay: `${i * 100}ms`,
                }}
              />
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`${containerClasses} ${className}`}>
      <div className="flex flex-col items-center gap-4">
        {renderSpinner()}
        {text && (
          <p className="text-gray-600 font-medium animate-pulse">{text}</p>
        )}
      </div>
    </div>
  );
}
