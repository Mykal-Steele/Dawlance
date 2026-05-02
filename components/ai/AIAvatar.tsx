"use client";

export function AIAvatar(): React.ReactElement {
  return (
    <div className="shrink-0">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-[#2A7BFF] to-[#6DD3B0] shadow-md">
        <svg
          className="h-5 w-5 text-white"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"
            fill="currentColor"
            opacity="0.3"
          />
          <circle cx="12" cy="12" r="3" fill="currentColor" />
          <path
            d="M12 6l1.5 3h-3L12 6zM12 18l-1.5-3h3L12 18zM6 12l3-1.5v3L6 12zM18 12l-3 1.5v-3L18 12z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
}
