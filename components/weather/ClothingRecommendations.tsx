import { type ClothingItem } from "@/lib/types";

interface ClothingRecommendationsProps {
  items: ClothingItem[];
}

const categoryStyles: Record<ClothingItem["category"], { card: string; badge: string }> = {
  clothing: {
    card: "from-[#2A7BFF]/10 to-[#2A7BFF]/5 border-[#2A7BFF]/20",
    badge: "bg-[#2A7BFF]/10 text-[#2A7BFF]",
  },
  accessory: {
    card: "from-[#FF8C42]/10 to-[#FF8C42]/5 border-[#FF8C42]/20",
    badge: "bg-[#FF8C42]/10 text-[#FF8C42]",
  },
};

export function ClothingRecommendations({ items }: ClothingRecommendationsProps) {
  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#6DD3B0] to-[#4ac299] text-xl">
          👗
        </div>
        <div>
          <h2 className="text-xl font-bold text-[#3D4852]">What to Pack</h2>
          <p className="text-sm text-[#6c757d]">Rule-based suggestions from the forecast</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item, i) => {
          const styles = categoryStyles[item.category];
          return (
            <div
              key={i}
              className={`rounded-2xl border bg-gradient-to-b p-4 ${styles.card}`}
            >
              <div className="mb-2 text-3xl">{item.icon}</div>
              <div className="mb-1 text-sm font-semibold text-[#3D4852]">{item.name}</div>
              <span
                className={`mb-2 inline-block rounded-full px-2 py-0.5 text-xs font-medium capitalize ${styles.badge}`}
              >
                {item.category}
              </span>
              <p className="text-xs leading-relaxed text-[#6c757d]">{item.description}</p>
              {item.warning && (
                <div className="mt-2 rounded-lg bg-[#FF8C42]/10 p-2 text-xs text-[#FF8C42]">
                  ⚠️ {item.warning}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Made with Bob
