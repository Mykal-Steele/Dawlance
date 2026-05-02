"use client";

const QUICK_ACTIONS = [
  { label: "☕ Find nearby cafe", message: "Can you find a nearby cafe for me?" },
  { label: "⏰ Adjust timing", message: "Can you help me adjust the timing of my activities?" },
  {
    label: "🔄 Suggest alternative",
    message: "Can you suggest an alternative for one of my planned activities?",
  },
  {
    label: "🏛 Cultural context",
    message: "Can you explain the cultural context for my destination?",
  },
  { label: "🗺 Optimize route", message: "Can you help optimize the route between my activities?" },
] as const;

interface AIQuickActionsProps {
  onActionClick: (message: string) => void;
  disabled?: boolean;
}

export function AIQuickActions({
  onActionClick,
  disabled = false,
}: AIQuickActionsProps): React.ReactElement {
  return (
    <div className="scrollbar-none flex gap-2 overflow-x-auto border-t border-gray-100 px-4 py-2">
      {QUICK_ACTIONS.map((action) => (
        <button
          key={action.label}
          onClick={() => onActionClick(action.message)}
          disabled={disabled}
          className="shrink-0 rounded-full bg-[#F8F9FA] px-3 py-1.5 text-xs whitespace-nowrap text-gray-600 transition-colors hover:bg-[#2A7BFF] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {action.label}
        </button>
      ))}
    </div>
  );
}
