"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

/**
 * React Query Provider
 * 
 * Wraps the application with React Query's QueryClientProvider.
 * Configured with sensible defaults for caching and retry behavior.
 * 
 * Configuration:
 * - staleTime: 5 minutes (data considered fresh for 5 min)
 * - gcTime: 10 minutes (unused data garbage collected after 10 min)
 * - retry: 3 attempts with exponential backoff
 * - refetchOnWindowFocus: false (prevent unnecessary refetches)
 */
export function QueryProvider({ children }: { children: ReactNode }): React.ReactElement {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Data is considered fresh for 5 minutes
            staleTime: 5 * 60 * 1000,
            // Unused data is garbage collected after 10 minutes
            gcTime: 10 * 60 * 1000,
            // Retry failed requests 3 times with exponential backoff
            retry: 3,
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
            // Don't refetch on window focus to reduce API calls
            refetchOnWindowFocus: false,
            // Refetch on mount if data is stale
            refetchOnMount: true,
            // Don't refetch on reconnect by default
            refetchOnReconnect: false,
          },
          mutations: {
            // Retry mutations once on failure
            retry: 1,
            retryDelay: 1000,
          },
        },
      })
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

// Made with Bob
