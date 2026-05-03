export function ItinerarySkeleton(): React.ReactElement {
  return (
    <div className="animate-pulse space-y-6">
      {/* Summary line */}
      <div className="flex items-start justify-between gap-4">
        <div className="h-4 w-72 rounded-full bg-gray-200" />
        <div className="h-9 w-36 rounded-xl bg-gray-200" />
      </div>

      {/* Day selector strip */}
      <div className="flex gap-2 overflow-hidden">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-9 w-20 shrink-0 rounded-xl bg-gray-200" />
        ))}
      </div>

      {/* Activity cards */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
            >
              {/* Image placeholder */}
              <div className="h-20 w-24 shrink-0 rounded-xl bg-gray-200" />
              {/* Text placeholders */}
              <div className="flex-1 space-y-2 py-1">
                <div className="h-4 w-3/4 rounded-full bg-gray-200" />
                <div className="h-3 w-full rounded-full bg-gray-100" />
                <div className="h-3 w-2/3 rounded-full bg-gray-100" />
              </div>
            </div>
          ))}
        </div>

        {/* Map placeholder */}
        <div className="hidden h-64 rounded-2xl bg-gray-200 lg:block" />
      </div>
    </div>
  );
}
