/**
 * Skeleton Loader Component
 * Beautiful skeleton screens for loading states
 */

interface SkeletonLoaderProps {
  variant?: 'text' | 'card' | 'avatar' | 'image' | 'list' | 'table';
  count?: number;
  className?: string;
}

export default function SkeletonLoader({
  variant = 'text',
  count = 1,
  className = '',
}: SkeletonLoaderProps) {
  const renderSkeleton = () => {
    switch (variant) {
      case 'text':
        return (
          <div className="space-y-3">
            {Array.from({ length: count }).map((_, i) => (
              <div
                key={i}
                className="h-4 bg-gray-200 rounded animate-shimmer"
                style={{ width: `${Math.random() * 30 + 70}%` }}
              />
            ))}
          </div>
        );

      case 'card':
        return (
          <div className="space-y-4">
            {Array.from({ length: count }).map((_, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-lg p-6 space-y-4"
              >
                <div className="h-48 bg-gray-200 rounded animate-shimmer" />
                <div className="h-6 bg-gray-200 rounded animate-shimmer w-3/4" />
                <div className="h-4 bg-gray-200 rounded animate-shimmer w-full" />
                <div className="h-4 bg-gray-200 rounded animate-shimmer w-5/6" />
              </div>
            ))}
          </div>
        );

      case 'avatar':
        return (
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full animate-shimmer" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-shimmer w-1/3" />
              <div className="h-3 bg-gray-200 rounded animate-shimmer w-1/4" />
            </div>
          </div>
        );

      case 'image':
        return (
          <div className="space-y-4">
            {Array.from({ length: count }).map((_, i) => (
              <div
                key={i}
                className="aspect-video bg-gray-200 rounded-lg animate-shimmer"
              />
            ))}
          </div>
        );

      case 'list':
        return (
          <div className="space-y-3">
            {Array.from({ length: count }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded animate-shimmer" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-shimmer w-3/4" />
                  <div className="h-3 bg-gray-200 rounded animate-shimmer w-1/2" />
                </div>
              </div>
            ))}
          </div>
        );

      case 'table':
        return (
          <div className="space-y-2">
            {/* Header */}
            <div className="grid grid-cols-4 gap-4 p-4 bg-gray-100 rounded">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-4 bg-gray-200 rounded animate-shimmer"
                />
              ))}
            </div>
            {/* Rows */}
            {Array.from({ length: count }).map((_, i) => (
              <div key={i} className="grid grid-cols-4 gap-4 p-4 border-b">
                {Array.from({ length: 4 }).map((_, j) => (
                  <div
                    key={j}
                    className="h-4 bg-gray-200 rounded animate-shimmer"
                  />
                ))}
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return <div className={className}>{renderSkeleton()}</div>;
}
