import * as React from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function createTestQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0 },
      mutations: { retry: false },
    },
  });
}

function TestProviders({ children }: { children: React.ReactNode }): React.JSX.Element {
  const queryClient = createTestQueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

function customRender(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) {
  return render(ui, { wrapper: TestProviders, ...options });
}

export {
  screen,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
  within,
  act,
  cleanup,
  renderHook,
  type RenderResult,
} from "@testing-library/react";
export { customRender as render };
