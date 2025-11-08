interface ProgressIndicatorProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'green' | 'brown' | 'white';
  message?: string;
  fullScreen?: boolean;
}

export default function ProgressIndicator({
  size = 'md',
  color = 'green',
  message,
  fullScreen = false,
}: ProgressIndicatorProps) {
  const sizeClasses = {
    sm: 'h-6 w-6 border-2',
    md: 'h-12 w-12 border-2',
    lg: 'h-16 w-16 border-4',
  };

  const colorClasses = {
    green: 'border-green-600',
    brown: 'border-brown-600',
    white: 'border-white',
  };

  const spinner = (
    <div className="text-center">
      <div
        className={`inline-block animate-spin rounded-full border-b-transparent ${sizeClasses[size]} ${colorClasses[color]}`}
        role="status"
        aria-label="Loading"
      />
      {message && <p className="mt-4 text-brown-600">{message}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-beige-50">
        {spinner}
      </div>
    );
  }

  return spinner;
}
