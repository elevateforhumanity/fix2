interface ProgressBarProps {
  progress: number; // 0-100
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
  color?: 'green' | 'blue' | 'orange' | 'purple';
  className?: string;
}

export default function ProgressBar({
  progress,
  size = 'md',
  showLabel = true,
  label,
  color = 'green',
  className = '',
}: ProgressBarProps) {
  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  const colorClasses = {
    green: 'bg-green-600',
    blue: 'bg-blue-600',
    orange: 'bg-orange-600',
    purple: 'bg-purple-600',
  };

  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className={className}>
      {showLabel && (
        <div className="flex items-center justify-between text-sm text-brown-600 mb-2">
          <span>{label || 'Progress'}</span>
          <span className="font-semibold">{Math.round(clampedProgress)}%</span>
        </div>
      )}
      <div
        className={`w-full bg-beige-200 rounded-full overflow-hidden ${sizeClasses[size]}`}
      >
        <div
          className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full transition-all duration-300 ease-out`}
          style={{ width: `${clampedProgress}%` }}
          role="progressbar"
          aria-valuenow={clampedProgress}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}
