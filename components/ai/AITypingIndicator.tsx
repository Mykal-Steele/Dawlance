"use client";

export function AITypingIndicator(): React.ReactElement {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      <span className="mr-1 text-xs text-gray-500">AI is thinking</span>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#2A7BFF]"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}
