import type { Recommendation } from '@/lib/types';
import { RecommendationCard } from './RecommendationCard';

interface RecommendationGridProps {
  recommendations: Recommendation[];
  selectedIds: Set<string>;
  onToggle: (rec: Recommendation) => void;
}

export function RecommendationGrid({ recommendations, selectedIds, onToggle }: RecommendationGridProps) {
  if (recommendations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <svg
          className="mb-4 h-16 w-16 text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-lg font-medium text-gray-500">No places found</p>
        <p className="mt-1 text-sm text-gray-400">Try a different search or category</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {recommendations.map((rec) => (
        <RecommendationCard
          key={rec.id}
          recommendation={rec}
          isSelected={selectedIds.has(rec.id)}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

// Made with Bob
