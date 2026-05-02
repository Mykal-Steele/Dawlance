import { cn } from '@/lib/utils';

interface RecommendationSkeletonProps {
  className?: string;
}

export function RecommendationSkeleton({ className }: RecommendationSkeletonProps) {
  return (
    <div className={cn('overflow-hidden rounded-2xl bg-white shadow-sm', className)}>
      {/* Image placeholder */}
      <div className="aspect-[4/3] animate-pulse bg-gray-200" />

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Badge */}
        <div className="h-5 w-20 animate-pulse rounded-full bg-gray-200" />
        {/* Title */}
        <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />
        {/* Description */}
        <div className="space-y-1.5">
          <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
        </div>
        {/* Meta row */}
        <div className="flex gap-3">
          <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-12 animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export function RecommendationSkeletonGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <RecommendationSkeleton key={i} />
      ))}
    </div>
  );
}

// Made with Bob
